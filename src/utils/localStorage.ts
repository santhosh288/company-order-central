
import { Order, ShipNotification } from '@/types';
import { orders, shipNotifications } from '@/data/mockData';

const STORAGE_KEYS = {
  ORDERS: 'logisa_orders',
  SHIP_NOTIFICATIONS: 'logisa_ship_notifications',
  INITIALIZED: 'logisa_initialized',
} as const;

// Generic localStorage functions
const getFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage for key ${key}:`, error);
    return defaultValue;
  }
};

const setToStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage for key ${key}:`, error);
  }
};

// Initialize localStorage with mock data if not already initialized
export const initializeLocalStorage = (): void => {
  const isInitialized = localStorage.getItem(STORAGE_KEYS.INITIALIZED);
  
  if (!isInitialized) {
    console.log('Initializing localStorage with mock data...');
    
    // Save mock data to localStorage
    setToStorage(STORAGE_KEYS.ORDERS, orders);
    setToStorage(STORAGE_KEYS.SHIP_NOTIFICATIONS, shipNotifications);
    
    // Mark as initialized
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
    
    console.log('Mock data loaded into localStorage');
  }
};

// Orders functions
export const getOrdersFromStorage = (): Order[] => {
  const orders = getFromStorage<Order[]>(STORAGE_KEYS.ORDERS, []);
  // Convert date strings back to Date objects
  return orders.map(order => ({
    ...order,
    createdAt: new Date(order.createdAt),
  }));
};

export const saveOrdersToStorage = (orders: Order[]): void => {
  setToStorage(STORAGE_KEYS.ORDERS, orders);
};

export const addOrderToStorage = (order: Order): void => {
  const existingOrders = getOrdersFromStorage();
  const updatedOrders = [...existingOrders, order];
  saveOrdersToStorage(updatedOrders);
};

// Ship Notifications functions
export const getShipNotificationsFromStorage = (): ShipNotification[] => {
  const notifications = getFromStorage<ShipNotification[]>(STORAGE_KEYS.SHIP_NOTIFICATIONS, []);
  // Convert date strings back to Date objects
  return notifications.map(notification => ({
    ...notification,
    createdAt: new Date(notification.createdAt),
    items: notification.items.map(item => ({
      ...item,
      deliveryDate: new Date(item.deliveryDate),
      receipts: item.receipts.map(receipt => ({
        ...receipt,
        receiptDate: new Date(receipt.receiptDate),
      })),
    })),
  }));
};

export const saveShipNotificationsToStorage = (notifications: ShipNotification[]): void => {
  setToStorage(STORAGE_KEYS.SHIP_NOTIFICATIONS, notifications);
};

export const addShipNotificationToStorage = (notification: ShipNotification): void => {
  const existingNotifications = getShipNotificationsFromStorage();
  const updatedNotifications = [...existingNotifications, notification];
  saveShipNotificationsToStorage(updatedNotifications);
};

// Clear all data
export const clearAllStorage = (): void => {
  localStorage.removeItem(STORAGE_KEYS.ORDERS);
  localStorage.removeItem(STORAGE_KEYS.SHIP_NOTIFICATIONS);
  localStorage.removeItem(STORAGE_KEYS.INITIALIZED);
};
