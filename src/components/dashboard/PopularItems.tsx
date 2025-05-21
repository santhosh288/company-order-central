
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { formatCurrency } from '@/utils/helpers';
import { Material } from '@/types';

interface PopularItemsProps {
  items: Material[];
  title: string;
  emptyMessage: string;
  actionLabel?: string;
  actionLink?: string;
  onAddToCart?: (material: Material) => void;
}

const PopularItems: React.FC<PopularItemsProps> = ({
  items,
  title,
  emptyMessage,
  actionLabel,
  actionLink,
  onAddToCart
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        {actionLink && (
          <Button variant="ghost" size="sm" asChild>
            <Link to={actionLink}>
              {actionLabel || 'View All'}
            </Link>
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            {emptyMessage}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex space-x-4 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{item.name}</h4>
                  <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-medium text-blue-600">{formatCurrency(item.price)}</span>
                    {onAddToCart && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        disabled={item.quantity <= 0}
                        onClick={() => onAddToCart(item)}
                      >
                        {item.quantity <= 0 ? 'Out of stock' : 'Add to Cart'}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PopularItems;
