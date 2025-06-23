
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

interface LoginFormProps {
  role: 'admin' | 'customer';
  onBack: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ role, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  
  // Registration fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const { login, register } = useAuth();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(email, password, role);
      if (success) {
        toast({
          title: "Login Successful",
          description: `Welcome to the ${role} portal!`,
        });
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid credentials. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during login.",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await register(name, email, password, phone, address);
      if (success) {
        toast({
          title: "Registration Successful",
          description: "Your account has been created. Please login.",
        });
        setShowRegister(false);
        // Reset form
        setName('');
        setEmail('');
        setPassword('');
        setPhone('');
        setAddress('');
      } else {
        toast({
          title: "Registration Failed",
          description: "Email already exists or invalid data.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during registration.",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          className="text-white hover:text-blue-200 mb-4"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <Card className="bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl capitalize">
              {role} {showRegister ? 'Registration' : 'Login'}
            </CardTitle>
            <CardDescription>
              {showRegister 
                ? 'Create your customer account' 
                : `Enter your ${role} credentials to continue`
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={showRegister ? handleRegister : handleLogin} className="space-y-4">
              {showRegister && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Please wait...' : (showRegister ? 'Register' : 'Login')}
              </Button>
            </form>

            {role === 'customer' && (
              <div className="mt-4 text-center">
                <Button
                  variant="link"
                  onClick={() => setShowRegister(!showRegister)}
                >
                  {showRegister 
                    ? 'Already have an account? Login' 
                    : "Don't have an account? Register"
                  }
                </Button>
              </div>
            )}

            {role === 'admin' && (
              <div className="mt-4 text-center text-sm text-gray-600">
                Demo: admin@oil.com / admin123
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
