import React from 'react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/helpers';
import { Gift } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface FreeItemProps {
  item: {
    materialId: string;
    material: {
      id: string;
      name: string;
      description: string,
      price: number;
      image: string;
    };
    quantity: number;
  };
}


const FreeItem = ({ item }: FreeItemProps) => {
  return (
    <div className="flex items-center p-3 border-b border-green-100 bg-green-50">
      <div className="flex items-center space-x-3 flex-1">
        <div className="relative">
          <img
            src={item.material.image}
            alt={item.material.name}
            className="w-12 h-12 object-cover rounded"
          />
          <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1">
            <Gift size={12} />
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-sm font-medium text-green-800">{item.material.name}</h3>
          <p className="text-xs text-green-600">{item.material.description}</p>
        </div>
        <div className="text-right">
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Free Item</Badge>
        </div>
        <div className="text-right px-12">
          <div className="text-sm font-bold text-green-600">FREE</div>
          <div className="text-xs text-gray-400 line-through">
            {formatCurrency(item.material.price)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeItem;
