
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { users } from '@/data/mockData';
import { CollectionDetails, Address } from '@/types';
import {addCollectionToStorage, getCollectionsFromStorage, getShipNotificationsFromStorage} from '@/utils/localStorage';
import { useToast } from '@/hooks/use-toast';
import {useAuth} from "@/contexts/AuthContext.tsx";

const CreateCollectionPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const storedCollections = getCollectionsFromStorage();
  const collectionId = storedCollections.length > 0 ?storedCollections.pop().id:1001;
  const loggedInUser = useAuth().user;

  const [formData, setFormData] = useState({
    id: collectionId,
    userId: loggedInUser.id,
    status: 'processing' as CollectionDetails['status'],
    requestedQuote: false,
    collectionDate: '',
    price: 0,
  });

  const [address, setAddress] = useState<Address>({
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    district: '',
    postalCode: '',
    country: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.id || !formData.userId || !formData.collectionDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (!address.firstName || !address.lastName || !address.addressLine1 || !address.city || !address.postalCode || !address.country) {
      toast({
        title: "Error",
        description: "Please fill in all required address fields",
        variant: "destructive",
      });
      return;
    }

    // Find user
    const user = users.find(u => u.id === formData.userId);

    
    const newCollection: CollectionDetails = {
      id: formData.id,
      userId: formData.userId,
      user: user,
      companyId: user?.companyId || '1',
      status: formData.status,
      createdAt: new Date(),
      requestedQuote: formData.requestedQuote,
      collectionDate: new Date(formData.collectionDate),
      price: formData.price,
      collectionAddress: address,
    };

    // Save to localStorage
    addCollectionToStorage(newCollection);

    toast({
      title: "Success",
      description: "Collection request created successfully",
    });

    // Navigate back to collections list
    navigate('/admin/collections');
  };




  return (
    <Layout requireAuth={true}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Collection Request</h1>
          <p className="text-gray-500">Create a new collection request for material pickup.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Collection Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="id">Notification ID</Label>
                  <Label> {formData.id}</Label>
                </div>
                <div>
                  <Label htmlFor="userId">User : </Label>
                  <Label>  {loggedInUser.firstName+" "+loggedInUser.lastName} </Label>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="collectionDate">Collection Date *</Label>
                  <Input
                    id="collectionDate"
                    type="date"
                    value={formData.collectionDate}
                    onChange={(e) => setFormData({...formData, collectionDate: e.target.value})}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                      id="requestedQuote"
                      checked={formData.requestedQuote}
                      onCheckedChange={(checked) => {
                        setFormData({...formData, requestedQuote: checked as boolean, status: 'awaiting quote'})
                      }}
                  />
                  <Label htmlFor="requestedQuote">Request Quote</Label>
                </div>
                {/*<div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value: CollectionDetails['status']) => setFormData({...formData, status: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="awaiting quote">Awaiting Quote</SelectItem>
                      <SelectItem value="awaiting approval">Awaiting Approval</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="collected">Collected</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>*/}
              </div>

              {/*<div className="flex items-center space-x-2">

              </div>*/}

              {/*{formData.requestedQuote && (
                <div>
                  <Label htmlFor="price">Quoted Price</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
                    placeholder="0.00"
                  />
                </div>
              )}*/}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Collection Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={address.firstName}
                    onChange={(e) => setAddress({...address, firstName: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={address.lastName}
                    onChange={(e) => setAddress({...address, lastName: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="addressLine1">Address Line 1 *</Label>
                <Input
                  id="addressLine1"
                  value={address.addressLine1}
                  onChange={(e) => setAddress({...address, addressLine1: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="addressLine2">Address Line 2</Label>
                <Input
                  id="addressLine2"
                  value={address.addressLine2}
                  onChange={(e) => setAddress({...address, addressLine2: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={address.city}
                    onChange={(e) => setAddress({...address, city: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="district">District</Label>
                  <Input
                    id="district"
                    value={address.district}
                    onChange={(e) => setAddress({...address, district: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode">Postal Code *</Label>
                  <Input
                    id="postalCode"
                    value={address.postalCode}
                    onChange={(e) => setAddress({...address, postalCode: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  value={address.country}
                  onChange={(e) => setAddress({...address, country: e.target.value})}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => navigate('/admin/collections')}>
              Cancel
            </Button>
            <Button type="submit">
              Create Collection Request
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateCollectionPage;
