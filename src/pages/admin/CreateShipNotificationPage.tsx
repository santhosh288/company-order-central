import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import {materials, users} from '@/data/mockData';

export default function CreateShipNotificationPage() {
  const [formData, setFormData] = useState({
    userId: '',
    status: '',
    companyId: '',
    approvedById: '',
  });

  const navigate = useNavigate();

  const [items, setItems] = useState([
    { materialId: '', quantity: 1, deliveryDate: new Date(), batchNumber: '' },
  ]);

  // Example user/material data (replace with props or fetch)
  //const users = []; // Replace with real users
  //const materials = ; // Replace with real materials
  const adminUsers = users.filter(user => user.role==='admin');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      { materialId: '', quantity: 1, deliveryDate: new Date(), batchNumber: '' },
    ]);
  };

  const handleItemChange = (index: number, field: string, value: string) => {
    const newItems = [...items];
    newItems[index][field] = field === 'deliveryDate' ? new Date(value) : value;
    setItems(newItems);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <Layout>
    <div className="container mx-auto py-10 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Create New Ship Notification</h1>
        <p className="text-muted-foreground">
          Fill out the form below to create a new shipping notification with items and delivery details.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">General Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="userId">User</Label>
              <Select
                value={formData.userId}
                onValueChange={(value) => setFormData({ ...formData, userId: value })}
              >
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

            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="goods received">Goods Received</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="companyId">Company ID</Label>
              <Input
                id="companyId"
                value={formData.companyId}
                onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="approvedById">Approved By (Optional)</Label>
              <Select
                value={formData.approvedById}
                onValueChange={(value) =>
                  setFormData({ ...formData, approvedById: value === 'none' ? '' : value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select approver" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {adminUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.firstName} {user.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Items Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Items</CardTitle>
            <Button type="button" onClick={handleAddItem} size="sm">
              Add Item
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-5 gap-4 p-4 border rounded-lg"
              >
                <div>
                  <Label>Material</Label>
                  <Select
                    value={item.materialId}
                    onValueChange={(value) =>
                      handleItemChange(index, 'materialId', value)
                    }
                  >
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
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(index, 'quantity', parseInt(e.target.value))
                    }
                    required
                  />
                </div>

                <div>
                  <Label>Delivery Date</Label>
                  <Input
                    type="date"
                    value={item.deliveryDate.toISOString().split('T')[0]}
                    onChange={(e) =>
                      handleItemChange(index, 'deliveryDate', e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <Label>Batch Number</Label>
                  <Input
                    value={item.batchNumber}
                    onChange={(e) =>
                      handleItemChange(index, 'batchNumber', e.target.value)
                    }
                    required
                  />
                </div>

                <div className="flex items-end">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveItem(index)}
                    disabled={items.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end space-x-2">
          <Button type="reset" variant="outline">
            Cancel
          </Button>
          <Button type="submit" onClick={() => navigate('/admin/ship-notifications')}>Create Ship Notification</Button>
        </div>
      </form>
    </div>
    </Layout>
  );
}
