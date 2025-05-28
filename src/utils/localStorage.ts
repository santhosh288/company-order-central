
import { Order, ShipNotification } from '@/types';

const STORAGE_KEYS = {
  ORDERS: 'logisa_orders',
  SHIP_NOTIFICATIONS: 'logisa_ship_notifications',
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
};
