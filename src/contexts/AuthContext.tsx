
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser } from '../types';

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string, role: 'admin' | 'customer') => Promise<boolean>;
  register: (name: string, email: string, password: string, phone: string, address: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role: 'admin' | 'customer'): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Default admin credentials
    if (role === 'admin' && email === 'admin@oil.com' && password === 'admin123') {
      const adminUser: AuthUser = {
        id: 'admin-1',
        name: 'Admin User',
        email: 'admin@oil.com',
        role: 'admin'
      };
      setUser(adminUser);
      localStorage.setItem('currentUser', JSON.stringify(adminUser));
      return true;
    }

    // Check registered customers
    const customers = JSON.parse(localStorage.getItem('customers') || '[]');
    const customer = customers.find((c: any) => c.email === email && c.password === password);
    
    if (customer && role === 'customer') {
      const customerUser: AuthUser = {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        role: 'customer'
      };
      setUser(customerUser);
      localStorage.setItem('currentUser', JSON.stringify(customerUser));
      return true;
    }

    return false;
  };

  const register = async (name: string, email: string, password: string, phone: string, address: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const customers = JSON.parse(localStorage.getItem('customers') || '[]');
    
    // Check if email already exists
    if (customers.some((c: any) => c.email === email)) {
      return false;
    }

    const newCustomer = {
      id: `customer-${Date.now()}`,
      name,
      email,
      password,
      phone,
      address,
      registeredAt: new Date()
    };

    customers.push(newCustomer);
    localStorage.setItem('customers', JSON.stringify(customers));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
