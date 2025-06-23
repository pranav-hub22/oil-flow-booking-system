
export interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
  unit: 'Barrel' | 'MMBTU';
  description?: string;
  createdAt: Date;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  registeredAt: Date;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  products: CartItem[];
  totalAmount: number;
  status: 'pending' | 'approved' | 'rejected';
  orderDate: Date;
  notes?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
}
