
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Package, Clock, Check } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

const StatsCard = ({ title, value, description, icon, trend, trendValue }: StatsCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        <div className="p-2 bg-blue-50 rounded-md">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
        {trend && (
          <div className={`flex items-center mt-2 text-xs ${
            trend === 'up' ? 'text-green-600' : 
            trend === 'down' ? 'text-red-600' : 'text-gray-500'
          }`}>
            {trend === 'up' && (
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            )}
            {trend === 'down' && (
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
            <span>{trendValue}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const DashboardStats: React.FC<{ isAdmin?: boolean }> = ({ isAdmin = false }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Orders"
        value={isAdmin ? "124" : "12"}
        description="All time orders"
        icon={<ShoppingCart className="h-4 w-4 text-blue-600" />}
        trend="up"
        trendValue="12% from last month"
      />
      
      <StatsCard
        title="Pending Orders"
        value={isAdmin ? "18" : "2"}
        description="Awaiting processing"
        icon={<Clock className="h-4 w-4 text-amber-500" />}
      />
      
      <StatsCard
        title={isAdmin ? "Items in Inventory" : "Items in Cart"}
        value={isAdmin ? "1,254" : "5"}
        description={isAdmin ? "Across all categories" : "Ready for checkout"}
        icon={<Package className="h-4 w-4 text-green-600" />}
      />
      
      <StatsCard
        title="Completed Orders"
        value={isAdmin ? "98" : "10"}
        description="Successfully delivered"
        icon={<Check className="h-4 w-4 text-green-600" />}
        trend="up"
        trendValue="24% from last month"
      />
    </div>
  );
};

export default DashboardStats;
