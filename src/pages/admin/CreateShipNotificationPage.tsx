
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Plus } from 'lucide-react';
import { materials, users } from '@/data/mockData';
import { ShipNotification, ShipItem, User, Material } from '@/types';
import { addShipNotificationToStorage } from '@/utils/localStorage';
import { useToast } from '@/hooks/use-toast';

const CreateShipNotificationPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    id: '',
    userId: '',
    status: 'processing' as const,
  });

  const [items, setItems] = useState<Array<{
    materialId: string;
    quantity: string;
    deliveryDate: string;
    batchNumber: string;
  }>>([
    {
      materialId: '',
      quantity: '',
      deliveryDate: '',
      batchNumber: '',
    }
  ]);

  const addItem = () => {
    setItems([...items, {
      materialId: '',
      quantity: '',
      deliveryDate: '',
      batchNumber: '',
    }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index: number, field: string, value: string) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };
    setItems(updatedItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.id || !formData.userId) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Validate items
    for (const item of items) {
      if (!item.materialId || !item.quantity || !item.deliveryDate || !item.batchNumber) {
        toast({
          title: "Error",
          description: "Please fill in all item fields",
          variant: "destructive",
        });
        return;
      }
    }

    // Find user and create ship notification
    const user = users.find(u => u.id === formData.userId);
    
    const shipItems: ShipItem[] = items.map((item, index) => ({
      id: String(index + 1),
      materialId: item.materialId,
      material: materials.find(m => m.id === item.materialId)!,
      quantity: parseInt(item.quantity),
      deliveryDate: new Date(item.deliveryDate),
      batchNumber: item.batchNumber,
      receipts: []
    }));

    const newNotification: ShipNotification = {
      id: formData.id,
      userId: formData.userId,
      user: user,
      companyId: user?.companyId || '1',
      items: shipItems,
      status: formData.status,
      createdAt: new Date(),
    };

    // Save to localStorage
    addShipNotificationToStorage(newNotification);

    toast({
      title: "Success",
      description: "Ship notification created successfully",
    });

    // Navigate back to ship notifications list
    navigate('/admin/ship-notifications');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Ship Notification</h1>
          <p className="text-gray-500">Create a new ship notification for incoming materials.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="id">Notification ID *</Label>
                  <Input
                    id="id"
                    value={formData.id}
                    onChange={(e) => setFormData({...formData, id: e.target.value})}
                    placeholder="e.g., PO1237"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="userId">User *</Label>
                  <Select value={formData.userId} onValueChange={(value) => setFormData({...formData, userId: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select user" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.firstName} {user.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value: 'processing' | 'goods received' | 'cancelled') => setFormData({...formData, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="goods received">Goods Received</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Items</CardTitle>
              <Button type="button" onClick={addItem} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item, index) => (
                <Card key={index} className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium">Item {index + 1}</h4>
                    {items.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Material *</Label>
                      <Select value={item.materialId} onValueChange={(value) => updateItem(index, 'materialId', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select material" />
                        </SelectTrigger>
                        <SelectContent>
                          {materials.map((material) => (
                            <SelectItem key={material.id} value={material.id}>
                              {material.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>Quantity *</Label>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                        placeholder="Enter quantity"
                        min="1"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label>Delivery Date *</Label>
                      <Input
                        type="date"
                        value={item.deliveryDate}
                        onChange={(e) => updateItem(index, 'deliveryDate', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label>Batch Number *</Label>
                      <Input
                        value={item.batchNumber}
                        onChange={(e) => updateItem(index, 'batchNumber', e.target.value)}
                        placeholder="Enter batch number"
                        required
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => navigate('/admin/ship-notifications')}>
              Cancel
            </Button>
            <Button type="submit">
              Create Notification
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateShipNotificationPage;
