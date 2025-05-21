
import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { CheckCircle } from 'lucide-react';

const OrderConfirmationPage = () => {
  const { clearCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get('orderId');

  // Clear cart on successful order
  useEffect(() => {
    if (orderId) {
      clearCart();
    } else {
      // If there's no order ID, redirect to home
      navigate('/');
    }
  }, [orderId, clearCart, navigate]);

  return (
    <Layout requireAuth={true}>
      <div className="container px-4 py-12 max-w-2xl mx-auto">
        <Card className="text-center">
          <CardContent className="pt-10 pb-6 px-8">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-3">Order Confirmed!</h1>
            <p className="text-gray-600 mb-6">
              Your order has been successfully placed.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h2 className="text-lg font-medium mb-2">Order Number</h2>
              <p className="text-2xl font-bold text-blue-600">{orderId}</p>
              <p className="text-sm text-gray-500 mt-2">
                Please save this order number for your reference.
              </p>
            </div>
            
            <div className="text-left space-y-4 mb-8">
              <h3 className="font-medium">What happens next?</h3>
              <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                <li>Your order will be processed by our team.</li>
                <li>You will receive an email confirmation shortly.</li>
                <li>Another email will be sent when your order ships.</li>
                <li>Your items will arrive based on the selected delivery option.</li>
              </ol>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4 pb-8">
            <Button asChild>
              <Link to="/">Back to Dashboard</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/catalog">Continue Shopping</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default OrderConfirmationPage;
