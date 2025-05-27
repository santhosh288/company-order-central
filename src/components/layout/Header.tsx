
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu, User, LogOut, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import AdminToolsMenu from "@/components/admin/AdminToolsMenu.tsx";

const Header: React.FC = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { items } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Calculate total items in cart
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
      <header className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0">
                {/*<div>LogISA</div>*/}
                <img className="h-12" src="/LOGISA.png" alt="Logisa Icon"/>
              </Link>
              <div className="hidden md:block ml-10">
                <div className="flex items-baseline space-x-4">
                  <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:text-blue-600">Home</Link>
                  <Link to="/catalog" className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-blue-600">Catalog</Link>

                  {isAdmin && (
                      <>
                        {/*<DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <div className="flex items-center">
                              Test
                            </div>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>
                              Admin Tools
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link to="/admin/orders" className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-blue-600">Manage Orders</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to="admin/reports" className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-blue-600">Reports</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={logout}>
                              <LogOut className="mr-2 h-4 w-4" />
                              <span>Logout</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>*/}

                        <AdminToolsMenu/>

                        {/*<Link to="/admin/orders" className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-blue-600">Manage Orders</Link>
                        <Link to="/admin/reports" className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-blue-600">Reports</Link>*/}
                      </>
                  )}
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    <div>
                      <img className="h-12" src="/pfizer.png" alt="Customer Logo"/>
                    </div>
                    <div className="relative">

                      <Link to="/cart" className="p-2 rounded-full hover:bg-gray-100 relative">
                        <ShoppingCart className="h-6 w-6 text-gray-600" />
                        {totalItems > 0 && (
                            <span className="absolute -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center z-10">
                        {totalItems > 99 ? '99+' : totalItems}
                      </span>
                        )}
                      </Link>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                          <User className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>
                          {user?.firstName} {user?.lastName}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to="/profile">Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/orders">My Orders</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={logout}>
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Logout</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
              ) : (
                  <Link to="/login">
                    <Button>Login</Button>
                  </Link>
              )}
            </div>

            <div className="md:hidden">
              <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
            <div className="md:hidden bg-white shadow-lg rounded-b-lg">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                    to="/"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-blue-600 hover:bg-gray-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                    to="/catalog"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                  Catalog
                </Link>

                {isAdmin && (
                    <>
                      <Link
                          to="/admin/orders"
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                          onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Manage Orders
                      </Link>
                      <Link
                          to="/admin/reports"
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                          onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Reports
                      </Link>
                    </>
                )}
              </div>

              {isAuthenticated ? (
                  <div className="pt-4 pb-3 border-t border-gray-200">
                    <div className="flex items-center px-5">
                      <div className="ml-3">
                        <div className="text-base font-medium text-gray-800">
                          {user?.firstName} {user?.lastName}
                        </div>
                        <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                      </div>
                    </div>
                    <div className="mt-3 px-2 space-y-1">
                      <Link
                          to="/profile"
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                          onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                          to="/orders"
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                          onClick={() => setIsMobileMenuOpen(false)}
                      >
                        My Orders
                      </Link>
                      <Link
                          to="/cart"
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-100 relative"
                          onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="flex items-center">
                          <span>Cart</span>
                          {totalItems > 0 && (
                              <span className="ml-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 inline-flex items-center justify-center">
                        {totalItems}
                      </span>
                          )}
                        </div>
                      </Link>
                      <button
                          onClick={() => {
                            logout();
                            setIsMobileMenuOpen(false);
                          }}
                          className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
              ) : (
                  <div className="pt-4 pb-3 border-t border-gray-200">
                    <div className="px-2">
                      <Link
                          to="/login"
                          className="block w-full px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 text-center"
                          onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Login
                      </Link>
                    </div>
                  </div>
              )}
            </div>
        )}
      </header>
  );
};

export default Header;
