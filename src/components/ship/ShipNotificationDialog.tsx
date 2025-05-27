import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader, 
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShipNotification } from '@/types';
import { formatDate, formatCurrency } from '@/utils/helpers';

interface ShipNotificationDialogProps {
  notification: ShipNotification;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ShipNotificationDialog = ({ notification, open, onOpenChange }: ShipNotificationDialogProps) => {
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'processing':
        return 'default';
      case 'goods received':
        return 'secondary';
      case 'cancelled':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getStockStatusBadgeVariant = (stockStatus: string) => {
    switch (stockStatus) {
      case 'unrestricted':
        return 'secondary';
      case 'blocked':
        return 'destructive';
      case 'quarantined':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ship Notification Details - {notification.id}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Notification Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notification Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <p><strong>ID:</strong> {notification.id}</p>
                <p><strong>User:</strong> {notification.user ? `${notification.user.firstName} ${notification.user.lastName}` : 'Unknown User'}</p>
                <p><strong>Created:</strong> {formatDate(notification.createdAt)}</p>
              </div>
              <div>
                <p><strong>Status:</strong> 
                  <Badge variant={getStatusBadgeVariant(notification.status)} className="ml-2">
                    {notification.status}
                  </Badge>
                </p>
                <p><strong>Total Items:</strong> {notification.items.length}</p>
              </div>
            </CardContent>
          </Card>

          {/* Items List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Items</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Material</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Delivery Date</TableHead>
                    <TableHead>Batch Number</TableHead>
                    <TableHead>Receipts</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notification.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.material.name}</p>
                          <p className="text-sm text-gray-500">{formatCurrency(item.material.price)}</p>
                        </div>
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{formatDate(item.deliveryDate)}</TableCell>
                      <TableCell>{item.batchNumber}</TableCell>
                      <TableCell>{item.receipts.length}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Receipt Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Receipt Details</CardTitle>
            </CardHeader>
            <CardContent>
              {notification.items.some(item => item.receipts.length > 0) ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Material</TableHead>
                      <TableHead>Receipt Date</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Batch Number</TableHead>
                      <TableHead>Stock Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notification.items.map((item) =>
                      item.receipts.map((receipt) => (
                        <TableRow key={receipt.id}>
                          <TableCell>{item.material.name}</TableCell>
                          <TableCell>{formatDate(receipt.receiptDate)}</TableCell>
                          <TableCell>{receipt.quantity}</TableCell>
                          <TableCell>{receipt.batchNumber}</TableCell>
                          <TableCell>
                            <Badge variant={getStockStatusBadgeVariant(receipt.stockStatus)}>
                              {receipt.stockStatus}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-gray-500 text-center py-4">No receipts available</p>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShipNotificationDialog;
