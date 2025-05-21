
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { formatCurrency, formatDate } from '@/utils/helpers';
import { Order } from '@/types';

interface RecentOrdersProps {
  orders: Order[];
  title?: string;
  limit?: number;
  actionLabel?: string;
  actionLink?: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'approved':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'processing':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'shipped':
      return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    case 'delivered':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'rejected':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const RecentOrders: React.FC<RecentOrdersProps> = ({ 
  orders, 
  title = "Recent Orders",
  limit = 5,
  actionLabel = "View All Orders",
  actionLink = "/orders"
}) => {
  const displayOrders = orders.slice(0, limit);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        {actionLink && (
          <Button variant="ghost" asChild>
            <Link to={actionLink}>{actionLabel}</Link>
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {displayOrders.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            No orders found
          </div>
        ) : (
          <div className="space-y-4">
            {displayOrders.map((order) => (
              <div key={order.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex flex-col mb-2 sm:mb-0">
                  <Link to={`/orders/${order.id}`} className="font-medium text-blue-600 hover:underline">
                    {order.id}
                  </Link>
                  <span className="text-sm text-gray-500">
                    {formatDate(order.createdAt)}
                  </span>
                </div>
                
                <div className="flex flex-col items-start sm:items-end">
                  <span className="font-medium">{formatCurrency(order.total)}</span>
                  <Badge className={`mt-1 ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentOrders;
