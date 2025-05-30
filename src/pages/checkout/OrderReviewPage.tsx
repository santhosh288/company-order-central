
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import OrderSummary from '@/components/checkout/OrderSummary';
import DeliveryOptions from '@/components/checkout/DeliveryOptions';
import PaymentButton from '@/components/checkout/PaymentButton';
import { deliveryOptions } from '@/data/mockData';
import { formatAddress, getDeliveryOption } from '@/utils/helpers';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Shield } from 'lucide-react';

const OrderReviewPage = () => {
  const { 
    items, 
    selectedAddress, 
    deliveryMethod, 
    setDeliveryMethod, 
    clearCart,
    total
  } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [paymentId, setPaymentId] = useState<string | null>(null);

  // If cart is empty or address is not selected, redirect to appropriate page
  React.useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    } else if (!selectedAddress) {
      navigate('/checkout/address');
    }
  }, [items, selectedAddress, navigate]);

  const deliveryPrice = deliveryMethod ? getDeliveryOption(deliveryMethod).price : 0;
  const finalTotal = total + deliveryPrice;

  const handlePaymentSuccess = (id: string) => {
    setPaymentCompleted(true);
    setPaymentId(id);
    
    toast({
      title: "Payment Successful!",
      description: "Your payment has been processed. Placing your order...",
    });

    // Automatically place order after successful payment
    setTimeout(() => {
      handlePlaceOrder(id);
    }, 1000);
  };

  const handlePlaceOrder = (paymentId: string) => {
    // Generate order ID for demo
    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    
    // In a real app, you would submit the order to the backend with payment confirmation
    console.log('Order placed with payment ID:', paymentId);
    
    // Redirect to confirmation page with the order ID
    navigate(`/checkout/confirmation?orderId=${orderId}&paymentId=${paymentId}`);
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel your order? This will clear your cart.')) {
      clearCart();
      navigate('/');
    }
  };

  const isReadyForPayment = deliveryMethod && selectedAddress && !paymentCompleted;

  if (!selectedAddress) {
    return null; // Will redirect in the useEffect
  }

  return (
    <Layout requireAuth={true}>
      <div className="container px-4 py-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Review Your Order</h1>
          <p className="text-gray-500">Please review your order details and complete payment.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Delivery Address</CardTitle>
                {!paymentCompleted && (
                  <Button variant="outline" size="sm" onClick={() => navigate('/checkout/address')}>
                    Change
                  </Button>
                )}
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
                  onSelectMethod={paymentCompleted ? () => {} : setDeliveryMethod}
                />
              </CardContent>
            </Card>

            {/* Payment Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Payment
                </CardTitle>
              </CardHeader>
              <CardContent>
                {paymentCompleted ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <Shield className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-green-800">Payment Completed</p>
                        <p className="text-sm text-green-600">Payment ID: {paymentId}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-700">
                        <Shield className="h-4 w-4 inline mr-1" />
                        Your payment is secured with industry-standard encryption.
                      </p>
                    </div>
                    
                    <PaymentButton
                      total={finalTotal}
                      onPaymentSuccess={handlePaymentSuccess}
                      disabled={!isReadyForPayment}
                    />
                    
                    {!deliveryMethod && (
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Please select a delivery method before proceeding to payment.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:justify-between space-y-4 sm:space-y-0">
              <Button variant="outline" onClick={handleCancel} disabled={paymentCompleted}>
                Cancel Order
              </Button>
              
              <div className="space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/checkout/address')}
                  disabled={paymentCompleted}
                >
                  Back
                </Button>
              </div>
            </div>
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
