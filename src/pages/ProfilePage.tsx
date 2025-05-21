
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { addresses } from '@/data/mockData';
import { Address } from '@/types';
import AddressForm from '@/components/checkout/AddressForm';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const ProfilePage = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [userAddresses, setUserAddresses] = useState<Address[]>(addresses);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  
  const { toast } = useToast();

  const handleUserDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would update the user profile via an API
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated",
    });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userData.newPassword !== userData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "The new password and confirmation must match",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would update the password via an API
    setUserData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }));
    
    toast({
      title: "Password changed",
      description: "Your password has been successfully changed",
    });
  };

  const handleEditAddress = (addressId: string) => {
    setEditingAddressId(addressId);
    setIsAddingAddress(false);
  };

  const handleAddressSave = (address: Address) => {
    if (editingAddressId) {
      // Update existing address
      setUserAddresses(prev =>
        prev.map(addr => (addr.id === editingAddressId ? { ...address, id: addr.id } : addr))
      );
      setEditingAddressId(null);
      toast({
        title: "Address updated",
        description: "Your address has been successfully updated",
      });
    } else {
      // Add new address
      const newAddress = {
        ...address,
        id: `address-${Date.now()}`,
      };
      setUserAddresses(prev => [...prev, newAddress]);
      setIsAddingAddress(false);
      toast({
        title: "Address added",
        description: "Your new address has been added",
      });
    }
  };

  const handleDeleteAddress = (addressId: string) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setUserAddresses(prev => prev.filter(addr => addr.id !== addressId));
      toast({
        title: "Address deleted",
        description: "The address has been removed",
      });
    }
  };

  const handleSetDefaultAddress = (addressId: string) => {
    setUserAddresses(prev =>
      prev.map(addr => ({
        ...addr,
        isDefault: addr.id === addressId,
      }))
    );
    toast({
      title: "Default address set",
      description: "Your default address has been updated",
    });
  };

  const editingAddress = editingAddressId
    ? userAddresses.find(addr => addr.id === editingAddressId)
    : undefined;

  return (
    <Layout requireAuth={true}>
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-gray-500">View and edit your account information.</p>
        </div>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList>
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="password">Change Password</TabsTrigger>
            <TabsTrigger value="addresses">Delivery Addresses</TabsTrigger>
          </TabsList>

          {/* Personal Information */}
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleUserDataChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleUserDataChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={userData.email}
                        onChange={handleUserDataChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={userData.phone}
                        onChange={handleUserDataChange}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Change Password */}
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={userData.currentPassword}
                      onChange={handleUserDataChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={userData.newPassword}
                      onChange={handleUserDataChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={userData.confirmPassword}
                      onChange={handleUserDataChange}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit">Update Password</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Delivery Addresses */}
          <TabsContent value="addresses">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Delivery Addresses</CardTitle>
                {!isAddingAddress && !editingAddressId && (
                  <Button onClick={() => setIsAddingAddress(true)}>Add New Address</Button>
                )}
              </CardHeader>
              <CardContent>
                {isAddingAddress ? (
                  <AddressForm
                    onSave={handleAddressSave}
                    hasExistingAddresses={userAddresses.length > 0}
                    onCancel={() => setIsAddingAddress(false)}
                  />
                ) : editingAddressId ? (
                  <AddressForm
                    initialAddress={editingAddress}
                    onSave={handleAddressSave}
                    hasExistingAddresses={true}
                    onCancel={() => setEditingAddressId(null)}
                  />
                ) : (
                  <div className="space-y-4">
                    {userAddresses.length === 0 ? (
                      <p className="text-center py-4 text-gray-500">
                        You don't have any saved addresses yet.
                      </p>
                    ) : (
                      userAddresses.map((address) => (
                        <div
                          key={address.id}
                          className={`border rounded-lg p-4 ${
                            address.isDefault ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">
                                {address.firstName} {address.lastName}
                                {address.isDefault && (
                                  <span className="ml-2 text-xs bg-blue-100 text-blue-800 py-0.5 px-2 rounded-full">
                                    Default
                                  </span>
                                )}
                              </p>
                              <p className="text-sm text-gray-600">{address.addressLine1}</p>
                              {address.addressLine2 && (
                                <p className="text-sm text-gray-600">{address.addressLine2}</p>
                              )}
                              <p className="text-sm text-gray-600">
                                {address.city},
                                {address.district && ` ${address.district},`}
                                {' '}
                                {address.postalCode}
                              </p>
                              <p className="text-sm text-gray-600">{address.country}</p>
                            </div>

                            <div className="space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditAddress(address.id!)}
                              >
                                Edit
                              </Button>
                              {!address.isDefault && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeleteAddress(address.id!)}
                                >
                                  Delete
                                </Button>
                              )}
                              {!address.isDefault && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleSetDefaultAddress(address.id!)}
                                >
                                  Set as Default
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ProfilePage;
