
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/helpers';
import { Material } from '@/types';
import { Input } from '@/components/ui/input';

interface MaterialListProps {
  materials: Material[];
  onAddToCart: (material: Material, quantity: number) => void;
}

const MaterialList: React.FC<MaterialListProps> = ({ materials, onAddToCart }) => {
  // State to track quantity for each material
  const [quantities, setQuantities] = React.useState<Record<string, number>>(
    materials.reduce((acc, material) => {
      acc[material.id] = 1;
      return acc;
    }, {} as Record<string, number>)
  );

  const handleQuantityChange = (materialId: string, value: string) => {
    const quantity = parseInt(value);
    if (!isNaN(quantity) && quantity > 0) {
      setQuantities(prev => ({ ...prev, [materialId]: quantity }));
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {materials.map(material => (
        <Card key={material.id} className="card-hover">
          <CardContent className="p-4">
            <div className="flex flex-col h-full">
              <div className="relative pb-3/4 mb-4">
                <img
                  src={material.image}
                  alt={material.name}
                  className="rounded-md w-full h-40 object-cover"
                />
              </div>
              
              <h3 className="text-lg font-medium">{material.name}</h3>
              <p className="text-sm text-gray-500 mb-2 flex-grow">{material.description}</p>
              
              <div className="mt-auto">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-blue-600">{formatCurrency(material.price)}</span>
                  <span className={`text-sm ${material.quantity > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {material.quantity > 0 ? `${material.quantity} in stock` : 'Out of stock'}
                  </span>
                </div>
                
                <div className="flex space-x-2">
                  <div className="w-24">
                    <Input
                      type="number"
                      min="1"
                      max={material.quantity}
                      value={quantities[material.id]}
                      onChange={(e) => handleQuantityChange(material.id, e.target.value)}
                      disabled={material.quantity <= 0}
                      className="w-full"
                    />
                  </div>
                  <Button
                    onClick={() => onAddToCart(material, quantities[material.id])}
                    disabled={material.quantity <= 0}
                    className="flex-grow"
                  >
                    {material.quantity <= 0 ? 'Out of Stock' : 'Add to Cart'}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {materials.length === 0 && (
        <div className="col-span-full text-center py-20">
          <h3 className="text-xl text-gray-500 mb-2">No materials found</h3>
          <p className="text-gray-400">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default MaterialList;
