
export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
  companyId: string;
}

export interface Company {
  id: string;
  name: string;
  address: string;
}

export interface Material {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  groupId: string;
}

export interface MaterialGroup {
  id: string;
  name: string;
}

export interface CartItem {
  materialId: string;
  material: Material;
  quantity: number;
}

export interface Address {
  id?: string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  district?: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export type DeliveryMethod = 'next-day' | 'two-day' | 'standard';

export interface DeliveryOption {
  id: DeliveryMethod;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

export interface Order {
  id: string;
  userId: string;
  user?: User;
  companyId: string;
  items: CartItem[];
  address: Address;
  deliveryMethod: DeliveryMethod;
  status: 'pending' | 'approved' | 'rejected' | 'processing' | 'shipped' | 'delivered';
  total: number;
  createdAt: Date;
  approvedById?: string;
  approvedBy?: User;
}

export interface Report {
  id: string;
  name: string;
  description: string;
  type: 'order' | 'inventory' | 'user';
}
