
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Order, User } from '@/types';
import { formatCurrency, formatDate } from '@/utils/helpers';
import { Badge } from '@/components/ui/badge';

interface OrderApprovalCardProps {
  order: Order;
  user: User;
  onApprove: (orderId: string) => void;
  onReject: (orderId: string) => void;
  onViewDetails: (orderId: string) => void;
}

const OrderApprovalCard: React.FC<OrderApprovalCardProps> = ({
  order,
  user,
  onApprove,
  onReject,
  onViewDetails,
}) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-medium">{order.id}</h3>
            <p className="text-sm text-gray-500">Ordered on {formatDate(order.createdAt)}</p>
          </div>
          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
            Pending Approval
          </Badge>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Requester:</span>
            <span className="font-medium">{user.firstName} {user.lastName}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Items:</span>
            <span className="font-medium">{order.items.length} items</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Delivery:</span>
            <span className="font-medium">{order.deliveryMethod}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total:</span>
            <span className="font-medium text-blue-600">{formatCurrency(order.total)}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-4">
        <Button
          variant="outline"
          onClick={() => onViewDetails(order.id)}
        >
          View Details
        </Button>
        <div className="space-x-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onReject(order.id)}
          >
            Reject
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => onApprove(order.id)}
          >
            Approve
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default OrderApprovalCard;
