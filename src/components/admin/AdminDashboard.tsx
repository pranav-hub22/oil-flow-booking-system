
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../contexts/AuthContext';
import ProductsPanel from './ProductsPanel';
import OrdersPanel from './OrdersPanel';
import CustomersPanel from './CustomersPanel';
import { LogOut, User, Calendar, Plus } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [activePanel, setActivePanel] = useState<'dashboard' | 'products' | 'orders' | 'customers'>('dashboard');
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  if (activePanel === 'products') {
    return <ProductsPanel onBack={() => setActivePanel('dashboard')} />;
  }

  if (activePanel === 'orders') {
    return <OrdersPanel onBack={() => setActivePanel('dashboard')} />;
  }

  if (activePanel === 'customers') {
    return <CustomersPanel onBack={() => setActivePanel('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Plus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {JSON.parse(localStorage.getItem('products') || '[]').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {JSON.parse(localStorage.getItem('orders') || '[]').filter((order: any) => order.status === 'pending').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {JSON.parse(localStorage.getItem('customers') || '[]').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$0</div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActivePanel('products')}>
            <CardHeader>
              <CardTitle className="text-xl">Products Management</CardTitle>
              <CardDescription>
                Create, edit, and manage oil products including pricing and inventory
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Manage Products</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActivePanel('orders')}>
            <CardHeader>
              <CardTitle className="text-xl">Orders Management</CardTitle>
              <CardDescription>
                Review and approve/reject customer order requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">View Orders</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActivePanel('customers')}>
            <CardHeader>
              <CardTitle className="text-xl">Customer Details</CardTitle>
              <CardDescription>
                View registered customer information and activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">View Customers</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
