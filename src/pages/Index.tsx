
import React from 'react';
import Layout from '@/components/layout/Layout';
import DashboardStats from '@/components/dashboard/DashboardStats';
import RecentOrders from '@/components/dashboard/RecentOrders';
import PopularItems from '@/components/dashboard/PopularItems';
import { orders, materials } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Material } from '@/types';

const Index = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const { addToCart } = useCart();

  // Get recent orders for the current user
  const userOrders = orders.slice(0, 3);

  // Get popular items (most ordered)
  const popularItems = materials.filter(m => m.id === 'm1' || m.id === 'm3' || m.id === 'm5').slice(0, 4);

  // Get favorite items (based on order frequency)
  const favoriteItems = materials.filter(m => m.id === 'm2' || m.id === 'm9' || m.id === 'm4').slice(0, 4);

  // Get new items (based on most recently added)
  const newItems = materials.filter(m => m.id === 'm11' || m.id === 'm8' || m.id === 'm10').slice(0, 4);

  // Pending approvals for admin
  const pendingApprovals = orders.filter(o => o.status === 'pending');

  const handleAddToCart = (material: Material) => {
    addToCart(material, 1);
  };

  return (
    <Layout requireAuth={true}>
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">LogISA</h1>
          <p className="text-gray-500">Welcome back! Here's an overview of your activities.</p>
        </div>

        <DashboardStats isAdmin={isAdmin} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <RecentOrders 
              orders={userOrders} 
              title={isAdmin ? "Recent Company Orders" : "Your Recent Orders"} 
              actionLink={isAdmin ? "/admin/orders" : "/orders"}
            />
          </div>

          {/* Admin Panel */}
          {isAdmin && (
            <div className="lg:col-span-2">
              <RecentOrders 
                orders={pendingApprovals} 
                title="Pending Approvals" 
                actionLink="/admin/approvals"
                actionLabel="View All Pending"
                limit={3}
              />
            </div>
          )}

          {/* User's Favorite Items */}
          {!isAdmin && (
            <div className="lg:col-span-2">
              <PopularItems 
                items={favoriteItems}
                title="Your Favorites"
                emptyMessage="You haven't ordered anything yet"
                onAddToCart={handleAddToCart}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Most Ordered Items */}
          <PopularItems 
            items={popularItems}
            title="Popular Items"
            emptyMessage="No popular items found"
            actionLink="/catalog"
            actionLabel="Browse Catalog"
            onAddToCart={handleAddToCart}
          />
            
          {/* New Items */}
          <PopularItems 
            items={newItems}
            title="New Items"
            emptyMessage="No new items available"
            actionLink="/catalog"
            actionLabel="Browse Catalog"
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
