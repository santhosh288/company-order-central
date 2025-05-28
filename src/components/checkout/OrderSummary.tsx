
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CartItem, DeliveryMethod } from '@/types';
import { formatCurrency, getDeliveryOption } from '@/utils/helpers';

interface OrderSummaryProps {
  items: CartItem[];
  deliveryMethod: DeliveryMethod | null;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items, deliveryMethod }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.material.price * item.quantity), 0);
  
  const deliveryPrice = deliveryMethod 
    ? getDeliveryOption(deliveryMethod).price 
    : 0;
  
  const total = subtotal + deliveryPrice;

  return (
    <Card className="bg-gray-50">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-60 mb-4">
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.materialId} className="flex justify-between">
                <div>
                  <p className="font-medium">{item.material.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium">{formatCurrency(item.material.price * item.quantity)}</p>
              </div>
            ))}
            { subtotal >= 50 &&
            <div className="flex justify-between">
              <div>
                <p className="font-medium">Hard Hat(Free Item)</p>
                <p className="text-sm text-gray-500">Qty: 1</p>
              </div>
              <p className="font-medium">{formatCurrency(0)}</p>
            </div>
            }
          </div>
        </ScrollArea>

        <div className="space-y-2 border-t pt-4">
          <div className="flex justify-between">
            <p className="text-gray-600">Subtotal</p>
            <p className="font-medium">{formatCurrency(subtotal)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Delivery</p>
            <p className="font-medium">
              {deliveryMethod 
                ? formatCurrency(deliveryPrice) 
                : 'Not selected'}
            </p>
          </div>
          <div className="flex justify-between border-t pt-2 mt-2">
            <p className="text-gray-800 font-bold">Total</p>
            <p className="text-blue-600 font-bold text-lg">{formatCurrency(total)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
