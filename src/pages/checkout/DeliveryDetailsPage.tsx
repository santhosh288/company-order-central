
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Address } from '@/types';
import AddressForm from '@/components/checkout/AddressForm';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { addresses, users } from '@/data/mockData';
import { formatAddress } from '@/utils/helpers';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const DeliveryDetailsPage = () => {
  const { selectedAddress, setAddress } = useCart();
  const [userAddresses] = useState<Address[]>(addresses);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    selectedAddress?.id || (userAddresses.length > 0 ? userAddresses[0].id : null)
  );
  const [isAddingNew, setIsAddingNew] = useState(!userAddresses.length);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Admin functionality
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [adminOption, setAdminOption] = useState<string>('delivery-addresses');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUserAddresses, setSelectedUserAddresses] = useState<Address[]>([]);
  const [showAddAddressButton, setShowAddAddressButton] = useState(true);

  const handleAddressSelect = (addressId: string) => {
    setSelectedAddressId(addressId);
    let selected: Address | undefined;
    
    if (adminOption === 'user-contacts' && selectedUserAddresses.length > 0) {
      selected = selectedUserAddresses.find(addr => addr.id === addressId);
    } else {
      selected = userAddresses.find(addr => addr.id === addressId);
    }
    
    if (selected) {
      setAddress(selected);
    }
  };

  const handleUserSelect = (userId: string) => {
    setSelectedUserId(userId);
    // Filter addresses based on selected user - in a real app, you'd have user-specific addresses
    // For now, we'll show all addresses but you can modify this logic
    const userSpecificAddresses = addresses.filter(addr => {
      // This is a simplified logic - in real app, addresses would have userId
      const selectedUser = users.find(u => u.id === userId);
      return selectedUser && (addr.firstName === selectedUser.firstName && addr.lastName === selectedUser.lastName);
    });
    setSelectedUserAddresses(userSpecificAddresses);
    setSelectedAddressId(null);
    //setIsAddingNew(false);
    setShowAddAddressButton(false);
  };

  const handleAdminOptionChange = (value: string) => {
    console.log("Selected Value is... ",value);
    setAdminOption(value);
    setSelectedUserId(null);
    setSelectedUserAddresses([]);
    setSelectedAddressId(null);
    //setIsAddingNew(true);
    //value == 'delivery-addresses' ? showAddAddressButton(true) : showAddAddressButton(false);
    setShowAddAddressButton(value == 'delivery-addresses' ? true : false);
  };

  const handleAddressSubmit = (address: Address) => {
    const newAddress = {
      ...address,
      id: `new-${Date.now()}`,
    };
    
    setAddress(newAddress);
    toast({
      title: "Address saved",
      description: "Your new address has been saved.",
    });
    navigate('/checkout/review');
  };

  const handleContinue = () => {
    if (!selectedAddressId && !isAddingNew) {
      toast({
        title: "No address selected",
        description: "Please select an address or add a new one.",
        variant: "destructive"
      });
      return;
    }
    
    navigate('/checkout/review');
  };

  const getDisplayAddresses = () => {
    if (isAdmin && adminOption === 'user-contacts') {
      return selectedUserAddresses;
    }
    return userAddresses;
  };

  const shouldShowAddresses = () => {
    if (!isAdmin) return userAddresses.length > 0 && !isAddingNew;
    if (adminOption === 'delivery-addresses') return userAddresses.length > 0 && !isAddingNew;
    if (adminOption === 'user-contacts') return selectedUserId && selectedUserAddresses.length > 0 && !isAddingNew;
    return false;
  };

  return (
    <Layout requireAuth={true}>
      <div className="container px-4 py-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Delivery Details</h1>
          <p className="text-gray-500 px-1">Please select the address where you'd like your order to be delivered. 
            You can choose from your saved addresses or add a new one. 
            Make sure all details are correct to ensure smooth and timely delivery.</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {isAdmin && (
            <Card>
              <CardHeader>
                <CardTitle>Admin Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="admin-option">Choose delivery option:</Label>
                    <Select value={adminOption} onValueChange={handleAdminOptionChange}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="delivery-addresses">Choose from delivery addresses</SelectItem>
                        <SelectItem value="user-contacts">Choose from some other contact</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {adminOption === 'user-contacts' && (
                    <div>
                      <Label htmlFor="user-select">Select User:</Label>
                      <Select value={selectedUserId || undefined} onValueChange={handleUserSelect}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select a user" />
                        </SelectTrigger>
                        <SelectContent>
                          {users.map((user) => (
                            <SelectItem key={user.id} value={user.id}>
                              {user.firstName} {user.lastName} ({user.email})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {shouldShowAddresses() && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {isAdmin && adminOption === 'user-contacts' 
                    ? `Addresses for ${users.find(u => u.id === selectedUserId)?.firstName} ${users.find(u => u.id === selectedUserId)?.lastName}`
                    : 'Select Delivery Address'
                  }
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedAddressId || undefined}
                  onValueChange={handleAddressSelect}
                >
                  {getDisplayAddresses().map((address) => (
                    <div
                      key={address.id}
                      className={`flex items-start space-x-3 border rounded-lg p-4 mb-3 cursor-pointer hover:bg-gray-50 ${
                        selectedAddressId === address.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200'
                      }`}
                      onClick={() => handleAddressSelect(address.id!)}
                    >
                      <RadioGroupItem
                        value={address.id!}
                        id={address.id}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor={address.id}
                          className="text-base font-medium cursor-pointer"
                        >
                          {address.firstName} {address.lastName}
                        </Label>
                        <p className="text-gray-600 text-sm">
                          {formatAddress(address)}
                        </p>
                        {address.isDefault && (
                          <span className="text-xs text-blue-600 font-medium">
                            Default address
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </RadioGroup>

                <div className="mt-4 flex justify-between">
                {showAddAddressButton && (
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => setIsAddingNew(true)}
                    >
                      Add New Address
                    </Button>
                  )
                }

                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => navigate('/cart')}
                    >
                      Back to Cart
                    </Button>
                    <Button onClick={handleContinue}>
                      Continue to Review
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {(!shouldShowAddresses() && isAddingNew) && (
            <Card>
              <CardHeader>
                <CardTitle>Add New Address</CardTitle>
              </CardHeader>
              <CardContent>
                <AddressForm
                  onSave={handleAddressSubmit}
                  hasExistingAddresses={getDisplayAddresses().length > 0}
                  onCancel={
                    getDisplayAddresses().length > 0
                      ? () => setIsAddingNew(false)
                      : undefined
                  }
                />
              </CardContent>
            </Card>
          )}

          {isAdmin && adminOption === 'user-contacts' && selectedUserId && selectedUserAddresses.length === 0 && !isAddingNew && (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-500 mb-4">No addresses found for the selected user.</p>
                { showAddAddressButton &&
                <Button onClick={() => setIsAddingNew(true)}>
                  Add New Address
                </Button>
                }
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DeliveryDetailsPage;