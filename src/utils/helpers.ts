
import { Address, CartItem, DeliveryMethod, DeliveryOption } from "../types";
import { deliveryOptions } from "../data/mockData";

// Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount);
};

// Format date
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Get delivery option details
export const getDeliveryOption = (method: DeliveryMethod): DeliveryOption => {
  const option = deliveryOptions.find(option => option.id === method);
  if (!option) {
    throw new Error(`Delivery method not found: ${method}`);
  }
  return option;
};

// Format address to string
export const formatAddress = (address: Address): string => {
  const parts = [
    address.addressLine1,
    address.addressLine2,
    address.city,
    address.district,
    address.postalCode,
    address.country,
  ].filter(Boolean);
  
  return parts.join(', ');
};

// Calculate subtotal for cart
export const calculateSubtotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + (item.material.price * item.quantity), 0);
};

// Calculate total including delivery
export const calculateTotal = (items: CartItem[], deliveryMethod: DeliveryMethod): number => {
  const subtotal = calculateSubtotal(items);
  const deliveryOption = getDeliveryOption(deliveryMethod);
  return subtotal + deliveryOption.price;
};

// Generate an order ID
export const generateOrderId = (): string => {
  const prefix = 'ORD';
  const randomNum = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
  return `${prefix}-${randomNum}`;
};

// Helper function to handle API errors
export const handleApiError = (error: any): string => {
  console.error('API Error:', error);
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }
  return error.message || 'An unexpected error occurred';
};

// Filter items by search term
export const filterBySearchTerm = <T extends { name: string }>(
  items: T[],
  searchTerm: string
): T[] => {
  if (!searchTerm.trim()) return items;
  
  const lowerCaseSearch = searchTerm.toLowerCase();
  return items.filter(item => 
    item.name.toLowerCase().includes(lowerCaseSearch)
  );
};

// Group orders by status
export const groupOrdersByStatus = (orders: any[]) => {
  return orders.reduce((acc, order) => {
    const status = order.status;
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(order);
    return acc;
  }, {} as Record<string, any[]>);
};
