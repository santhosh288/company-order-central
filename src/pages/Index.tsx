
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
      <div className="space-y-8">
        {/* Welcome Header with Glassmorphism */}
        <div className="text-center space-y-4 mb-12">
          <div className="glass-card p-8 max-w-4xl mx-auto glow-blue">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Welcome to LogISA
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Your intelligent logistics and supply management platform. Streamline your operations with style and efficiency.
            </p>
          </div>
        </div>

        {/* Dashboard Stats with enhanced styling */}
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <DashboardStats isAdmin={isAdmin} />
        </div>

        {/* Main Content Grid with staggered animations */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <RecentOrders 
              orders={userOrders} 
              title={isAdmin ? "Recent Company Orders" : "Your Recent Orders"} 
              actionLink={isAdmin ? "/admin/orders" : "/orders"}
            />
          </div>

          {/* Admin Panel or User Favorites */}
          <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            {isAdmin ? (
              <RecentOrders 
                orders={pendingApprovals} 
                title="Pending Approvals" 
                actionLink="/admin/approvals"
                actionLabel="View All Pending"
                limit={3}
              />
            ) : (
              <PopularItems 
                items={favoriteItems}
                title="Your Favorites"
                emptyMessage="You haven't ordered anything yet"
                onAddToCart={handleAddToCart}
              />
            )}
          </div>
        </div>

        {/* Popular and New Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <PopularItems 
              items={popularItems}
              title="Popular Items"
              emptyMessage="No popular items found"
              actionLink="/catalog"
              actionLabel="Browse Catalog"
              onAddToCart={handleAddToCart}
            />
          </div>
            
          <div className="animate-fade-in" style={{ animationDelay: '1s' }}>
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
      </div>
    </Layout>
  );
};

export default Index;
