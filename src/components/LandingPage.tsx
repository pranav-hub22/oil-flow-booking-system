
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Users } from 'lucide-react';

interface LandingPageProps {
  onSelectRole: (role: 'admin' | 'customer') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSelectRole }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Oil Booking System
          </h1>
          <p className="text-xl text-blue-100">
            Professional Oil Trading & Management Platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <Card className="bg-white/95 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:scale-105 cursor-pointer" 
                onClick={() => onSelectRole('admin')}>
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl text-gray-800">Admin Portal</CardTitle>
              <CardDescription className="text-gray-600">
                Manage products, orders, and customer details
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => onSelectRole('admin')}
              >
                Login as Admin
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={() => onSelectRole('customer')}>
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-4 bg-green-100 rounded-full w-16 h-16 flex items-center justify-center">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-gray-800">Customer Portal</CardTitle>
              <CardDescription className="text-gray-600">
                Browse products, place orders, and track status
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={() => onSelectRole('customer')}
              >
                Customer Login
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12 text-blue-100">
          <p className="text-sm">
            Demo Credentials - Admin: admin@oil.com / admin123
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
