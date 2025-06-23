
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../contexts/AuthContext';
import ProductsView from './ProductsView';
import OrdersView from './OrdersView';
import { LogOut, Calendar, User } from 'lucide-react';

const CustomerDashboard: React.FC = () => {
  const [activePanel, setActivePanel] = useState<'dashboard' | 'products' | 'orders'>('dashboard');
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  if (activePanel === 'products') {
    return <ProductsView onBack={() => setActivePanel('dashboard')} />;
  }

  if (activePanel === 'orders') {
    return <OrdersView onBack={() => setActivePanel('dashboard')} />;
  }

  const userOrders = JSON.parse(localStorage.getItem('orders') || '[]').filter(
    (order: any) => order.customerId === user?.id
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Customer Portal</h1>
              <p className="text-gray-600 mt-1">Welcome back, {user?.name}</p>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Orders</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userOrders.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userOrders.filter((order: any) => order.status === 'pending').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Orders</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userOrders.filter((order: any) => order.status === 'approved').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActivePanel('products')}>
            <CardHeader>
              <CardTitle className="text-xl">Browse Products</CardTitle>
              <CardDescription>
                View available oil products and add them to your cart
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">View Products</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActivePanel('orders')}>
            <CardHeader>
              <CardTitle className="text-xl">My Orders & Status</CardTitle>
              <CardDescription>
                Track your orders and view approval status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">View Orders</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
