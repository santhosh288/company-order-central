
import {
  MaterialGroup,
  Material,
  User,
  Company,
  Address,
  Order,
  DeliveryOption,
  Report, ShipNotification
} from '../types';

// Material Groups
export const materialGroups: MaterialGroup[] = [
  { id: 'g1', name: 'Office Supplies' },
  { id: 'g2', name: 'Electronics' },
  { id: 'g3', name: 'Furniture' },
  { id: 'g4', name: 'Safety Equipment' },
  { id: 'g5', name: 'Cleaning Supplies' },
];

// Materials
export const materials: Material[] = [
  {
    id: 'm1',
    name: 'Ballpoint Pens (Box of 50)',
    description: 'Black ink ballpoint pens, medium point',
    price: 15.99,
    quantity: 120,
    image: 'https://cdn.pixabay.com/photo/2020/09/17/13/09/pen-5579144_1280.png',
    groupId: 'g1',
  },
  {
    id: 'm2',
    name: 'Sticky Notes (Pack of 12)',
    description: 'Assorted colors, 3x3 inches',
    price: 9.99,
    quantity: 200,
    image: 'https://cdn.pixabay.com/photo/2013/07/12/12/17/note-145514_1280.png',
    groupId: 'g1',
  },
  {
    id: 'm3',
    name: 'Wireless Mouse',
    description: 'Ergonomic design with 2.4GHz wireless technology',
    price: 24.99,
    quantity: 45,
    image: 'https://cdn.pixabay.com/photo/2012/04/13/19/17/mouse-33336_1280.png',
    groupId: 'g2',
  },
  {
    id: 'm4',
    name: 'USB-C Cable (6ft)',
    description: 'Fast charging and data transfer',
    price: 12.99,
    quantity: 80,
    image: 'https://cdn.pixabay.com/photo/2013/07/12/19/25/usb-cable-154767_1280.png',
    groupId: 'g2',
  },
  {
    id: 'm5',
    name: 'Office Chair',
    description: 'Adjustable height and lumbar support',
    price: 149.99,
    quantity: 15,
    image: 'https://cdn.pixabay.com/photo/2014/04/02/17/01/chair-307694_1280.png',
    groupId: 'g3',
  },
  {
    id: 'm6',
    name: 'Desk Lamp',
    description: 'LED desk lamp with adjustable brightness',
    price: 34.99,
    quantity: 30,
    image: 'https://cdn.pixabay.com/photo/2022/03/03/18/14/desk-lamp-7045824_1280.png',
    groupId: 'g3',
  },
  {
    id: 'm7',
    name: 'Safety Goggles',
    description: 'Impact resistant with anti-fog coating',
    price: 19.99,
    quantity: 50,
    image: 'https://cdn.pixabay.com/photo/2017/12/27/15/14/goggle-3042888_1280.png',
    groupId: 'g4',
  },
  {
    id: 'm8',
    name: 'Hard Hat',
    description: 'ANSI certified with adjustable fit',
    price: 29.99,
    quantity: 25,
    image: 'https://cdn.pixabay.com/photo/2013/07/13/12/14/hat-159463_1280.png',
    groupId: 'g4',
  },
  {
    id: 'm9',
    name: 'All-Purpose Cleaner (1 Gallon)',
    description: 'Industrial strength cleaner for all surfaces',
    price: 22.99,
    quantity: 40,
    image: 'https://cdn.pixabay.com/photo/2020/06/29/02/49/distilled-water-5351167_1280.png',
    groupId: 'g5',
  },
  {
    id: 'm10',
    name: 'Microfiber Cloths (Pack of 24)',
    description: 'Reusable cloths for dust-free cleaning',
    price: 17.99,
    quantity: 60,
    image: 'https://cdn.pixabay.com/photo/2016/04/01/09/58/bathroom-1299704_1280.png',
    groupId: 'g5',
  },
  {
    id: 'm11',
    name: 'Printer Paper (Case of 10)',
    description: '8.5 x 11 inch, 20lb, 5000 sheets total',
    price: 45.99,
    quantity: 30,
    image: 'https://cdn.pixabay.com/photo/2014/12/21/23/56/papers-576385_1280.png',
    groupId: 'g1',
  },
  {
    id: 'm12',
    name: 'Mechanical Keyboard',
    description: 'Cherry MX Brown switches with backlight',
    price: 89.99,
    quantity: 0, // Out of stock
    image: 'https://cdn.pixabay.com/photo/2013/07/13/11/50/computer-158770_1280.png',
    groupId: 'g2',
  },
];

// Companies
export const companies: Company[] = [
  { id: '1', name: 'Acme Corporation', address: '123 Main St, Anytown, USA' },
  { id: '2', name: 'Globex Industries', address: '456 Tech Blvd, Silicon Valley, USA' },
];

// Users
export const users: User[] = [
  {
    id: '1',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    phone: '123-456-7890',
    role: 'admin',
    companyId: '1',
  },
  {
    id: '2',
    firstName: 'Regular',
    lastName: 'User',
    email: 'user@example.com',
    phone: '098-765-4321',
    role: 'user',
    companyId: '1',
  },
  {
    id: '3',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john@example.com',
    phone: '555-123-4567',
    role: 'user',
    companyId: '1',
  },
  {
    id: '4',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah@example.com',
    phone: '555-987-6543',
    role: 'user',
    companyId: '1',
  },
  {
    id: '5',
    firstName: 'Manager',
    lastName: 'Two',
    email: 'manager2@example.com',
    phone: '555-246-8135',
    role: 'admin',
    companyId: '2',
  },
];

// Sample addresses
export const addresses: Address[] = [
  {
    id: '1',
    firstName: 'Admin',
    lastName: 'User',
    addressLine1: '123 Main St',
    addressLine2: 'Suite 100',
    city: 'Anytown',
    district: 'State',
    postalCode: '12345',
    country: 'US',
    isDefault: true,
  },
  {
    id: '2',
    firstName: 'Admin',
    lastName: 'User',
    addressLine1: '456 Warehouse Blvd',
    city: 'Industry City',
    district: 'State',
    postalCode: '67890',
    country: 'US',
    isDefault: false,
  },
  {
    id: '3',
    firstName: 'Regular',
    lastName: 'User',
    addressLine1: '789 Residential Ln',
    city: 'Hometown',
    district: 'State',
    postalCode: '54321',
    country: 'US',
    isDefault: true,
  },
];

// Delivery Options
export const deliveryOptions: DeliveryOption[] = [
  {
    id: 'next-day',
    name: 'Next Day Delivery',
    description: 'Delivered by end of next business day',
    price: 19.99,
    estimatedDays: '1 business day',
  },
  {
    id: 'two-day',
    name: '2-Day Delivery',
    description: 'Delivered within 2 business days',
    price: 9.99,
    estimatedDays: '2 business days',
  },
  {
    id: 'standard',
    name: 'Standard Shipping',
    description: 'Delivered within 3-5 business days',
    price: 4.99,
    estimatedDays: '3-5 business days',
  },
];

// Sample orders
export const orders: Order[] = [
  {
    id: 'ORD-001',
    userId: '2',
    companyId: '1',
    items: [
      {
        materialId: 'm1',
        material: materials.find(m => m.id === 'm1')!,
        quantity: 2,
      },
      {
        materialId: 'm3',
        material: materials.find(m => m.id === 'm3')!,
        quantity: 1,
      },
    ],
    address: addresses.find(a => a.id === '3')!,
    deliveryMethod: 'standard',
    status: 'pending',
    total: 55.97,
    createdAt: new Date('2023-05-15'),
  },
  {
    id: 'ORD-002',
    userId: '3',
    user: users.find(u => u.id === '3'),
    companyId: '1',
    items: [
      {
        materialId: 'm5',
        material: materials.find(m => m.id === 'm5')!,
        quantity: 1,
      },
    ],
    address: addresses.find(a => a.id === '1')!,
    deliveryMethod: 'two-day',
    status: 'pending',
    total: 159.98,
    createdAt: new Date('2023-05-16'),
  },
  {
    id: 'ORD-003',
    userId: '4',
    user: users.find(u => u.id === '4'),
    companyId: '1',
    items: [
      {
        materialId: 'm9',
        material: materials.find(m => m.id === 'm9')!,
        quantity: 3,
      },
      {
        materialId: 'm10',
        material: materials.find(m => m.id === 'm10')!,
        quantity: 2,
      },
    ],
    address: addresses.find(a => a.id === '1')!,
    deliveryMethod: 'next-day',
    status: 'approved',
    total: 108.95,
    createdAt: new Date('2023-05-10'),
    approvedById: '1',
    approvedBy: users.find(u => u.id === '1'),
  },
  {
    id: 'ORD-004',
    userId: '2',
    companyId: '1',
    items: [
      {
        materialId: 'm2',
        material: materials.find(m => m.id === 'm2')!,
        quantity: 5,
      },
    ],
    address: addresses.find(a => a.id === '3')!,
    deliveryMethod: 'standard',
    status: 'delivered',
    total: 54.94,
    createdAt: new Date('2023-05-01'),
  },
];

// Reports
export const reports: Report[] = [
  {
    id: 'r1',
    name: 'Order Report',
    description: 'Summary of all orders by date',
    type: 'order',
  },
  {
    id: 'r2',
    name: 'Inventory Report',
    description: 'Current stock levels for all materials',
    type: 'inventory',
  },
  {
    id: 'r3',
    name: 'Orders by User Report',
    description: 'Summary of orders grouped by user',
    type: 'user',
  }
];

// List of countries for address form
export const countries = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'JP', name: 'Japan' },
  // Add more countries as needed
];

export const shipNotifications: ShipNotification[] = [
  {
    id: "PO1234",
    userId: '2',
    companyId: '1',
    items: [
      {
        id:'1',
        materialId: 'm2',
        material: materials.find(m => m.id === 'm2')!,
        quantity: 10,
        deliveryDate: new Date('2025-05-01'),
        batchNumber: 'Batch1',
        receipts: [
          {
            id: '1',
            shipItemId: '1',
            quantity: 10,
            receiptDate: new Date('2025-05-03'),
            batchNumber: 'Batch1',
            stockStatus: 'unrestricted'
          }
        ]
      }
    ],
    status: 'goods received',
    createdAt: new Date("2025-04-28"),
  },
  {
    id: "PO1235",
    userId: '2',
    companyId: '1',
    items: [
      {
        id:'2',
        materialId: 'm9',
        material: materials.find(m => m.id === 'm9')!,
        quantity: 50,
        deliveryDate: new Date('2025-05-11'),
        batchNumber: 'Batch-100',
        receipts: [
        ]
      },
      {
        id:'3',
        materialId: 'm6',
        material: materials.find(m => m.id === 'm6')!,
        quantity: 50,
        deliveryDate: new Date('2025-05-11'),
        batchNumber: 'Batch-200',
        receipts: [
        ]
      }
    ],
    status: 'processing',
    createdAt: new Date("2025-05-10"),
  },
  {
    id: "PO1236",
    userId: '2',
    companyId: '1',
    items: [
      {
        id:'4',
        materialId: 'm4',
        material: materials.find(m => m.id === 'm4')!,
        quantity: 100,
        deliveryDate: new Date('2025-05-07'),
        batchNumber: 'Batch111',
        receipts: [
          {
            id: '1',
            shipItemId: '4',
            quantity: 50,
            receiptDate: new Date('2025-05-11'),
            batchNumber: 'Batch111',
            stockStatus: 'unrestricted'
          },
          {
            id: '2',
            shipItemId: '4',
            quantity: 50,
            receiptDate: new Date('2025-05-12'),
            batchNumber: 'Batch112',
            stockStatus: 'blocked'
          }
        ]
      }
    ],
    status: 'goods received',
    createdAt: new Date("2025-05-02"),
  }
];
