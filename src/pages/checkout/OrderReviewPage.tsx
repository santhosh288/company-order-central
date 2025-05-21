
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import OrderSummary from '@/components/checkout/OrderSummary';
import DeliveryOptions from '@/components/checkout/DeliveryOptions';
import { deliveryOptions } from '@/data/mockData';
import { formatAddress } from '@/utils/helpers';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const OrderReviewPage = () => {
  const { 
    items, 
    selectedAddress, 
    deliveryMethod, 
    setDeliveryMethod, 
    clearCart 
  } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  // If cart is empty or address is not selected, redirect to appropriate page
  React.useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    } else if (!selectedAddress) {
      navigate('/checkout/address');
    }
  }, [items, selectedAddress, navigate]);

  const handlePlaceOrder = () => {
    if (!deliveryMethod) {
      toast({
        title: "Delivery method required",
        description: "Please select a delivery method before placing your order.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would submit the order to the backend
    // For this demo, just clear the cart and navigate to confirmation
    
    // Generate order ID for demo
    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    
    // Redirect to confirmation page with the order ID
    navigate(`/checkout/confirmation?orderId=${orderId}`);
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel your order? This will clear your cart.')) {
      clearCart();
      navigate('/');
    }
  };

  if (!selectedAddress) {
    return null; // Will redirect in the useEffect
  }

  return (
    <Layout requireAuth={true}>
      <div className="container px-4 py-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Review Your Order</h1>
          <p className="text-gray-500">Please review your order details before proceeding.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Delivery Address</CardTitle>
                <Button variant="outline" size="sm" onClick={() => navigate('/checkout/address')}>
                  Change
                </Button>
              </CardHeader>
              <CardContent>
                <div>
                  <p className="font-medium">{selectedAddress.firstName} {selectedAddress.lastName}</p>
                  <p className="text-gray-600">{formatAddress(selectedAddress)}</p>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Options */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Options</CardTitle>
              </CardHeader>
              <CardContent>
                <DeliveryOptions
                  options={deliveryOptions}
                  selectedMethod={deliveryMethod}
                  onSelectMethod={setDeliveryMethod}
                />
              </CardContent>
            </Card>

            {/* Place Order Button */}
            <div className="flex flex-col sm:flex-row sm:justify-between space-y-4 sm:space-y-0">
              <Button variant="outline" onClick={handleCancel}>
                Cancel Order
              </Button>
              
              <div className="space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/checkout/address')}
                >
                  Back
                </Button>
                <Button onClick={handlePlaceOrder}>
                  Place Order
                </Button>
              </div>
            </div>

            {!deliveryMethod && (
              <Alert variant="warning">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Please select a delivery method before placing your order.
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              items={items}
              deliveryMethod={deliveryMethod}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderReviewPage;
