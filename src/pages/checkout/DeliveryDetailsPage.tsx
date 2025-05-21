
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
import { addresses } from '@/data/mockData';
import { formatAddress } from '@/utils/helpers';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const DeliveryDetailsPage = () => {
  const { selectedAddress, setAddress } = useCart();
  const { user } = useAuth();
  const [userAddresses] = useState<Address[]>(addresses);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    selectedAddress?.id || (userAddresses.length > 0 ? userAddresses[0].id : null)
  );
  const [isAddingNew, setIsAddingNew] = useState(!userAddresses.length);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAddressSelect = (addressId: string) => {
    setSelectedAddressId(addressId);
    const selected = userAddresses.find(addr => addr.id === addressId);
    if (selected) {
      setAddress(selected);
    }
  };

  const handleAddressSubmit = (address: Address) => {
    // In a real app, this would save to the backend
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

  return (
    <Layout requireAuth={true}>
      <div className="container px-4 py-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Delivery Details</h1>
          <p className="text-gray-500">Choose where you want your order delivered.</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {userAddresses.length > 0 && !isAddingNew && (
            <Card>
              <CardHeader>
                <CardTitle>Select Delivery Address</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedAddressId || undefined}
                  onValueChange={handleAddressSelect}
                >
                  {userAddresses.map((address) => (
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
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setIsAddingNew(true)}
                  >
                    Add New Address
                  </Button>

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

          {(isAddingNew || userAddresses.length === 0) && (
            <Card>
              <CardHeader>
                <CardTitle>Add New Address</CardTitle>
              </CardHeader>
              <CardContent>
                <AddressForm
                  onSave={handleAddressSubmit}
                  hasExistingAddresses={userAddresses.length > 0}
                  onCancel={
                    userAddresses.length > 0
                      ? () => setIsAddingNew(false)
                      : undefined
                  }
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DeliveryDetailsPage;
