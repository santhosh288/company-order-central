
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { orders, users } from '@/data/mockData';
import OrderApprovalCard from '@/components/admin/OrderApprovalCard';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatCurrency } from '@/utils/helpers';
import { useToast } from '@/hooks/use-toast';
import { Order } from '@/types';

const OrderApprovalPage = () => {
  const [pendingOrders] = useState(orders.filter(order => order.status === 'pending'));
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [dialogAction, setDialogAction] = useState<'approve' | 'reject' | null>(null);
  
  const { toast } = useToast();

  const handleViewDetails = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      setViewingOrder(order);
    }
  };

  const handleShowApproveDialog = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      setViewingOrder(order);
      setDialogAction('approve');
    }
  };

  const handleShowRejectDialog = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      setViewingOrder(order);
      setDialogAction('reject');
    }
  };

  const handleConfirmAction = () => {
    if (!viewingOrder || !dialogAction) return;
    
    // In a real app, this would update the order status via an API
    const actionText = dialogAction === 'approve' ? 'approved' : 'rejected';
    
    toast({
      title: `Order ${actionText}`,
      description: `Order ${viewingOrder.id} has been ${actionText} successfully.`,
    });
    
    setViewingOrder(null);
    setDialogAction(null);
  };

  const closeDialogs = () => {
    setViewingOrder(null);
    setDialogAction(null);
  };

  // Get user data for each order
  const getOrderUser = (userId: string) => {
    return users.find(user => user.id === userId) || {
      firstName: 'Unknown',
      lastName: 'User',
      email: '',
    };
  };

  return (
    <Layout requireAuth={true} requireAdmin={true}>
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Order Approvals</h1>
          <p className="text-gray-500">Review and approve orders from your company members.</p>
        </div>

        {pendingOrders.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium text-gray-600 mb-2">
              No orders pending approval
            </h2>
            <p className="text-gray-500">
              All orders have been processed. Check back later for new orders.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingOrders.map(order => {
              const orderUser = getOrderUser(order.userId);
              return (
                <OrderApprovalCard
                  key={order.id}
                  order={order}
                  user={{
                    ...orderUser,
                    id: order.userId,
                    role: 'user',
                    phone: '',
                    companyId: order.companyId,
                  }}
                  onApprove={handleShowApproveDialog}
                  onReject={handleShowRejectDialog}
                  onViewDetails={handleViewDetails}
                />
              );
            })}
          </div>
        )}

        {/* View Order Details Dialog */}
        <Dialog open={viewingOrder !== null && dialogAction === null} onOpenChange={closeDialogs}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
              <DialogDescription>
                Reviewing order {viewingOrder?.id}
              </DialogDescription>
            </DialogHeader>

            {viewingOrder && (
              <div className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Requester Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {viewingOrder.userId && (
                        <div className="space-y-1">
                          <p>
                            <span className="font-medium">Name: </span>
                            {getOrderUser(viewingOrder.userId).firstName}{' '}
                            {getOrderUser(viewingOrder.userId).lastName}
                          </p>
                          <p>
                            <span className="font-medium">Email: </span>
                            {getOrderUser(viewingOrder.userId).email}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Delivery Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>
                        <span className="font-medium">Address: </span>
                        {viewingOrder.address.addressLine1}
                        {viewingOrder.address.addressLine2 && `, ${viewingOrder.address.addressLine2}`}
                      </p>
                      <p>
                        <span className="font-medium">City: </span>
                        {viewingOrder.address.city}
                        {viewingOrder.address.district && `, ${viewingOrder.address.district}`}
                      </p>
                      <p>
                        <span className="font-medium">Postal Code: </span>
                        {viewingOrder.address.postalCode}
                      </p>
                      <p>
                        <span className="font-medium">Country: </span>
                        {viewingOrder.address.country}
                      </p>
                      <p className="mt-2">
                        <span className="font-medium">Delivery Method: </span>
                        {viewingOrder.deliveryMethod.replace('-', ' ')}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Order Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {viewingOrder.items.map((item) => (
                          <TableRow key={item.materialId}>
                            <TableCell>{item.material.name}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{formatCurrency(item.material.price)}</TableCell>
                            <TableCell className="text-right">
                              {formatCurrency(item.material.price * item.quantity)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    
                    <div className="flex justify-end mt-4">
                      <div className="w-1/3">
                        <div className="flex justify-between py-1">
                          <span>Subtotal:</span>
                          <span>
                            {formatCurrency(viewingOrder.items.reduce(
                              (sum, item) => sum + item.material.price * item.quantity,
                              0
                            ))}
                          </span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span>Shipping:</span>
                          <span>{formatCurrency(10)}</span>
                        </div>
                        <div className="flex justify-between py-1 border-t border-gray-200 font-medium">
                          <span>Total:</span>
                          <span>{formatCurrency(viewingOrder.total)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <DialogFooter className="mt-6 space-x-2">
                  <Button variant="outline" onClick={closeDialogs}>
                    Close
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={() => setDialogAction('reject')}
                  >
                    Reject Order
                  </Button>
                  <Button onClick={() => setDialogAction('approve')}>
                    Approve Order
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Confirmation Dialog */}
        <Dialog
          open={dialogAction !== null}
          onOpenChange={(open) => !open && setDialogAction(null)}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {dialogAction === 'approve' ? 'Approve Order' : 'Reject Order'}
              </DialogTitle>
              <DialogDescription>
                {dialogAction === 'approve'
                  ? 'Are you sure you want to approve this order?'
                  : 'Are you sure you want to reject this order?'}
              </DialogDescription>
            </DialogHeader>
            <p className="py-2">
              Order ID: <span className="font-medium">{viewingOrder?.id}</span>
            </p>
            <p className="py-2">
              Total Amount: <span className="font-medium">{viewingOrder && formatCurrency(viewingOrder.total)}</span>
            </p>
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={closeDialogs}>
                Cancel
              </Button>
              <Button
                variant={dialogAction === 'approve' ? 'default' : 'destructive'}
                onClick={handleConfirmAction}
              >
                {dialogAction === 'approve' ? 'Approve' : 'Reject'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default OrderApprovalPage;
