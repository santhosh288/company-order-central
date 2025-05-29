
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, ArrowRight } from 'lucide-react';
import { Material } from '@/types';
import { Link } from 'react-router-dom';

interface PopularItemsProps {
  items: Material[];
  title: string;
  emptyMessage: string;
  actionLink?: string;
  actionLabel?: string;
  onAddToCart?: (material: Material) => void;
  limit?: number;
}

const PopularItems: React.FC<PopularItemsProps> = ({
  items,
  title,
  emptyMessage,
  actionLink,
  actionLabel,
  onAddToCart,
  limit
}) => {
  const displayItems = limit ? items.slice(0, limit) : items;

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {actionLink && actionLabel && (
          <Link to={actionLink}>
            <Button variant="ghost" size="sm">
              {actionLabel}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {displayItems.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">{emptyMessage}</p>
        ) : (
          displayItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border hover:bg-muted transition-colors">
              <div className="flex items-center space-x-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded-lg border"
                />
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">£{item.price.toFixed(2)}</p>
                </div>
              </div>
              {onAddToCart && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onAddToCart(item)}
                  className="h-8 w-8 p-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default PopularItems;
