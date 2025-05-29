
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  requireAuth = false,
  requireAdmin = false,
}) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();
  
  // Redirect if authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Redirect if admin access is required but user is not an admin
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" />;
  }

  // Dynamic background classes based on route
  const getBackgroundClass = () => {
    const path = location.pathname;
    if (path.includes('/admin')) return 'admin-bg';
    if (path.includes('/catalog')) return 'catalog-bg';
    if (path.includes('/orders')) return 'orders-bg';
    return 'dashboard-bg';
  };

  return (
    <div className={`min-h-screen flex flex-col relative ${getBackgroundClass()}`}>
      {/* Animated background pattern */}
      <div className="fixed inset-0 pattern-dots opacity-30 pointer-events-none" />
      <div className="fixed inset-0 pattern-grid opacity-20 pointer-events-none" />
      
      {/* Floating background elements */}
      <div className="fixed top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
      <div className="fixed top-1/3 right-10 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl" style={{ animation: 'float 15s ease-in-out infinite' }} />
      <div className="fixed bottom-20 left-1/4 w-40 h-40 bg-purple-400/10 rounded-full blur-xl" style={{ animation: 'float 20s ease-in-out infinite reverse' }} />
      
      <Header />
      <main className="flex-grow relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-fade-in">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
