
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/utils/helpers';
import { CartItem as CartItemType } from '@/types';
import { Trash2 } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
  onRemove: (materialId: string) => void;
  onUpdateQuantity: (materialId: string, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove, onUpdateQuantity }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (isNaN(newQuantity) || newQuantity < 1) return;
    
    if (newQuantity > item.material.quantity) {
      setQuantity(item.material.quantity);
      onUpdateQuantity(item.materialId, item.material.quantity);
    } else {
      setQuantity(newQuantity);
      onUpdateQuantity(item.materialId, newQuantity);
    }
  };

  const itemTotal = item.material.price * item.quantity;

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border-b">
      <div className="flex items-center mb-4 md:mb-0">
        <img
          src={item.material.image}
          alt={item.material.name}
          className="w-16 h-16 rounded-md object-cover mr-4"
        />
        <div>
          <h3 className="font-medium">{item.material.name}</h3>
          <p className="text-sm text-gray-500">{item.material.description}</p>
          <p className="text-blue-600 font-medium">{formatCurrency(item.material.price)} each</p>
        </div>
      </div>
      
      <div className="flex items-center mt-2 md:mt-0">
        <div className="w-24 mr-4">
          <Input
            type="number"
            min="1"
            max={item.material.quantity}
            value={quantity}
            onChange={handleQuantityChange}
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-1">{item.material.quantity} available</p>
        </div>
        
        <div className="text-right mr-4">
          <p className="font-medium">{formatCurrency(itemTotal)}</p>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(item.materialId)}
          className="text-red-500"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
