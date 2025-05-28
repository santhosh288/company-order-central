import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { orders } from '@/data/mockData';
import { formatDate, formatCurrency } from '@/utils/helpers';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Order } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLocation } from "react-router-dom";
import { getOrdersFromStorage } from '@/utils/localStorage';

const OrdersPage = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [allOrders, setAllOrders] = useState<Order[]>([]);

  const location = useLocation();
  const { status } = location.state || {};

  useEffect(() => {
    // Load orders from localStorage, fallback to mock data if empty
    const storedOrders = getOrdersFromStorage();
    if (storedOrders.length > 0) {
      setAllOrders(storedOrders);
    } else {
      setAllOrders(orders);
    }
  }, []);

  // Filter data based on the status passed
  let filteredOrders = allOrders;
  if (status === 'pending') {
    filteredOrders = allOrders.filter(order => (order.status === 'pending' || order.status === 'approved'));
  } else if (status === 'completed') {
    filteredOrders = allOrders.filter(order => (order.status === 'shipped' || order.status === 'delivered'));
  }
  
  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>;
      case 'processing':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">Processing</Badge>;
      case 'shipped':
        return <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-200">Shipped</Badge>;
      case 'delivered':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Delivered</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Layout requireAuth={true}>
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Orders</h1>
          <p className="text-gray-500">View and track all your orders.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Order History</CardTitle>
            <CardDescription>
              A complete list of all orders you have placed
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredOrders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">You haven't placed any orders yet.</p>
                <Button className="mt-4">Browse Catalog</Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        {order.id}
                      </TableCell>
                      <TableCell>{formatDate(order.createdAt)}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>{formatCurrency(order.total)}</TableCell>
                      <TableCell>{order.items.length}</TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedOrder(order)}
                            >
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>Order Details</DialogTitle>
                              <DialogDescription>
                                Order ID: {selectedOrder?.id} | Date: {selectedOrder && formatDate(selectedOrder.createdAt)}
                              </DialogDescription>
                            </DialogHeader>
                            
                            {selectedOrder && (
                              <div className="mt-4">
                                <div className="flex justify-between items-center mb-4">
                                  <h3 className="font-medium">Status: {getStatusBadge(selectedOrder.status)}</h3>
                                  <p className="font-medium text-lg">{formatCurrency(selectedOrder.total)}</p>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                  <div>
                                    <h4 className="font-medium mb-2">Shipping Address</h4>
                                    <p>{selectedOrder.address.firstName} {selectedOrder.address.lastName}</p>
                                    <p>{selectedOrder.address.addressLine1}</p>
                                    {selectedOrder.address.addressLine2 && (
                                      <p>{selectedOrder.address.addressLine2}</p>
                                    )}
                                    <p>
                                      {selectedOrder.address.city},
                                      {selectedOrder.address.district && ` ${selectedOrder.address.district},`}
                                      {' '}
                                      {selectedOrder.address.postalCode}
                                    </p>
                                    <p>{selectedOrder.address.country}</p>
                                  </div>
                                  
                                  <div>
                                    <h4 className="font-medium mb-2">Delivery Method</h4>
                                    <p className="capitalize">{selectedOrder.deliveryMethod.replace('-', ' ')}</p>
                                  </div>
                                </div>
                                
                                <h4 className="font-medium mb-2">Order Items</h4>
                                <ScrollArea className="h-[200px]">
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>Item</TableHead>
                                        <TableHead className="text-right">Qty</TableHead>
                                        <TableHead className="text-right">Price</TableHead>
                                        <TableHead className="text-right">Subtotal</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {selectedOrder.items.map((item) => (
                                        <TableRow key={item.materialId}>
                                          <TableCell>{item.material.name}</TableCell>
                                          <TableCell className="text-right">{item.quantity}</TableCell>
                                          <TableCell className="text-right">{formatCurrency(item.material.price)}</TableCell>
                                          <TableCell className="text-right">{formatCurrency(item.material.price * item.quantity)}</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </ScrollArea>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default OrdersPage;
