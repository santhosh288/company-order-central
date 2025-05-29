
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

export interface ShipNotification {
  id: number;
  userId: string;
  user?: User;
  companyId: string;
  deliveryDate: Date;
  items: ShipItem[];
  status: 'processing' | 'goods received' | 'cancelled';
  createdAt: Date;
  approvedById?: string;
  approvedBy?: User;

}

export interface ShipItem {
  id: number;
  shipId: number;
  materialId: string;
  material: Material;
  quantity: number;
  batchNumber: string;
  receipts: GoodsReceipt[];
  deliveryDate: Date;
}

export interface GoodsReceipt {
  id: number;
  shipItemId: number;
  quantity: number;
  receiptDate: Date;
  batchNumber: string;
  stockStatus: 'unrestricted' | 'blocked' | 'quarantined';
}

export interface CollectionDetails {
  id: string;
  userId: string;
  user?: User;
  companyId: string;
  status: 'processing' |'awaiting quote' |  'awaiting approval' |'approved' |'rejected' |'collected' | 'completed' | 'cancelled';
  createdAt: Date;
  requestedQuote: boolean;
  collectionDate: Date;
  price: number;
  collectionAddress: Address;
  quoteBy: User;
  quoteDate: Date;
  actualCollectionDate: Date;

}