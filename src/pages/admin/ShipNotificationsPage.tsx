
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { shipNotifications } from '@/data/mockData';
import { ShipNotification } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import ShipNotificationDialog from '@/components/ship/ShipNotificationDialog';
import { formatDate } from '@/utils/helpers';

const ShipNotificationPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<ShipNotification[]>(shipNotifications);
  const [selectedNotification, setSelectedNotification] = useState<ShipNotification | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleViewClick = (notification: ShipNotification) => {
    setSelectedNotification(notification);
    setDialogOpen(true);
  };

  const handleCreateNewClick = () => {
    navigate('/admin/ship-notifications/create');
  };

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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold">Ship Notifications</CardTitle>
            <Button onClick={handleCreateNewClick}>
              <Plus className="h-4 w-4 mr-2" />
              Create New
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Created Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>No. of Items</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              {notifications.map((notification) => (
                  <TableRow key={notification.id}>
                    <TableCell className="font-medium">{notification.id}</TableCell>
                    <TableCell>
                      {notification.user ? `${notification.user.firstName} ${notification.user.lastName}` : 'Unknown User'}
                    </TableCell>
                    <TableCell>{formatDate(notification.createdAt)}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(notification.status)}>
                        {notification.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{notification.items.length}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewClick(notification)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {selectedNotification && (
          <ShipNotificationDialog
            notification={selectedNotification}
            open={dialogOpen}
            onOpenChange={setDialogOpen}
          />
        )}

      </div>
    </Layout>
  );
};

export default ShipNotificationPage;