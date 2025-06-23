
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import LandingPage from '../components/LandingPage';
import LoginForm from '../components/LoginForm';
import AdminDashboard from '../components/admin/AdminDashboard';
import CustomerDashboard from '../components/customer/CustomerDashboard';

const Index = () => {
  const [selectedRole, setSelectedRole] = useState<'admin' | 'customer' | null>(null);
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is logged in, show appropriate dashboard
  if (user) {
    if (user.role === 'admin') {
      return <AdminDashboard />;
    } else {
      return <CustomerDashboard />;
    }
  }

  // If role is selected but not logged in, show login form
  if (selectedRole) {
    return (
      <LoginForm 
        role={selectedRole} 
        onBack={() => setSelectedRole(null)} 
      />
    );
  }

  // Show landing page for role selection
  return <LandingPage onSelectRole={setSelectedRole} />;
};

export default Index;
