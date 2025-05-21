
import React from 'react';
import Layout from '@/components/layout/Layout';
import CartItem from '@/components/cart/CartItem';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency } from '@/utils/helpers';
import { ShoppingCart, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, total } = useCart();
  const navigate = useNavigate();

  const isEmpty = items.length === 0;

  return (
    <Layout requireAuth={true}>
      <div className="container px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        {isEmpty ? (
          <div className="text-center py-16">
            <div className="flex justify-center mb-4">
              <ShoppingCart size={64} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Add some items to your cart to get started.</p>
            <Button asChild>
              <Link to="/catalog">Browse Catalog</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="p-4 border-b">
                <h2 className="text-lg font-medium">Cart Items ({items.length})</h2>
              </div>

              <div>
                {items.map((item) => (
                  <CartItem
                    key={item.materialId}
                    item={item}
                    onRemove={removeFromCart}
                    onUpdateQuantity={updateQuantity}
                  />
                ))}
              </div>

              <div className="p-4 border-t flex flex-col md:flex-row justify-between items-start md:items-center">
                <Button variant="outline" onClick={clearCart} className="mb-4 md:mb-0">
                  Clear Cart
                </Button>

                <div className="text-right">
                  <div className="text-lg mb-2">
                    Subtotal: <span className="font-bold">{formatCurrency(total)}</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Shipping and taxes calculated at checkout
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center">
              <Button variant="outline" asChild className="mb-4 md:mb-0">
                <Link to="/catalog">Continue Shopping</Link>
              </Button>

              <Alert variant="warning" className="mb-4 md:mb-0 md:mx-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Delivery options will be selected in the next step.
                </AlertDescription>
              </Alert>

              <Button onClick={() => navigate('/checkout/address')}>
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
