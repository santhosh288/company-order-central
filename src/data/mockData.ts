import {
  MaterialGroup,
  Material,
  User,
  Company,
  Address,
  Order,
  DeliveryOption,
  Report, ShipNotification, CollectionDetails
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
    detailedDescription: 'Premium quality ballpoint pens with smooth writing experience. Features include comfortable grip, consistent ink flow, and durable construction. Perfect for everyday office use, note-taking, and document signing.',
    price: 15.99,
    quantity: 120,
    image: 'https://cdn.pixabay.com/photo/2020/09/17/13/09/pen-5579144_1280.png',
    images: [
      'https://cdn.pixabay.com/photo/2020/09/17/13/09/pen-5579144_1280.png',
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400'
    ],
    specifications: {
      'Ink Color': 'Black',
      'Point Size': 'Medium (1.0mm)',
      'Pack Size': '50 pens',
      'Material': 'Plastic barrel',
      'Brand': 'Office Pro'
    },
    pdfUrl: '/docs/ballpoint-pens-guide.pdf',
    groupId: 'g1',
  },
  {
    id: 'm2',
    name: 'Sticky Notes (Pack of 12)',
    description: 'Assorted colors, 3x3 inches',
    detailedDescription: 'High-quality sticky notes in vibrant colors. Strong adhesive that sticks well and removes cleanly. Perfect for reminders, bookmarking, and organizing.',
    price: 9.99,
    quantity: 200,
    image: 'https://cdn.pixabay.com/photo/2013/07/12/12/17/note-145514_1280.png',
    images: [
      'https://cdn.pixabay.com/photo/2013/07/12/12/17/note-145514_1280.png',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400'
    ],
    specifications: {
      'Size': '3x3 inches',
      'Colors': 'Yellow, Pink, Blue, Green',
      'Pack Size': '12 pads',
      'Sheets per pad': '100'
    },
    pdfUrl: '/docs/sticky-notes-guide.pdf',
    groupId: 'g1',
  },
  {
    id: 'm3',
    name: 'Wireless Mouse',
    description: 'Ergonomic design with 2.4GHz wireless technology',
    detailedDescription: 'Advanced wireless mouse with ergonomic design for comfortable all-day use. Features precise optical tracking, long battery life, and plug-and-play connectivity.',
    price: 24.99,
    quantity: 45,
    image: 'https://cdn.pixabay.com/photo/2012/04/13/19/17/mouse-33336_1280.png',
    images: [
      'https://cdn.pixabay.com/photo/2012/04/13/19/17/mouse-33336_1280.png',
      'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400'
    ],
    specifications: {
      'Connectivity': '2.4GHz Wireless',
      'Range': 'Up to 10 meters',
      'Battery': '2 AA batteries',
      'DPI': '1600',
      'Compatibility': 'Windows, Mac, Linux'
    },
    pdfUrl: '/docs/wireless-mouse-manual.pdf',
    groupId: 'g2',
  },
  {
    id: 'm4',
    name: 'USB-C Cable (6ft)',
    description: 'Fast charging and data transfer',
    detailedDescription: 'High-speed USB-C cable for fast charging and data transfer. Durable construction with reinforced connectors.',
    price: 12.99,
    quantity: 80,
    image: 'https://cdn.pixabay.com/photo/2013/07/12/19/25/usb-cable-154767_1280.png',
    images: ['https://cdn.pixabay.com/photo/2013/07/12/19/25/usb-cable-154767_1280.png'],
    specifications: { 'Length': '6ft', 'Type': 'USB-C' },
    pdfUrl: '/docs/usb-cable-guide.pdf',
    groupId: 'g2',
  },
  {
    id: 'm5',
    name: 'Office Chair',
    description: 'Adjustable height and lumbar support',
    detailedDescription: 'Ergonomic office chair with adjustable height and lumbar support for comfortable seating.',
    price: 149.99,
    quantity: 15,
    image: 'https://cdn.pixabay.com/photo/2014/04/02/17/01/chair-307694_1280.png',
    images: ['https://cdn.pixabay.com/photo/2014/04/02/17/01/chair-307694_1280.png'],
    specifications: { 'Material': 'Mesh and fabric', 'Weight capacity': '250 lbs' },
    pdfUrl: '/docs/office-chair-assembly.pdf',
    groupId: 'g3',
  },
  {
    id: 'm6',
    name: 'Desk Lamp',
    description: 'LED desk lamp with adjustable brightness',
    detailedDescription: 'Modern LED desk lamp with adjustable brightness and flexible positioning.',
    price: 34.99,
    quantity: 30,
    image: 'https://cdn.pixabay.com/photo/2022/03/03/18/14/desk-lamp-7045824_1280.png',
    images: ['https://cdn.pixabay.com/photo/2022/03/03/18/14/desk-lamp-7045824_1280.png'],
    specifications: { 'Power': '12W LED', 'Brightness levels': '3' },
    pdfUrl: '/docs/desk-lamp-manual.pdf',
    groupId: 'g3',
  },
  {
    id: 'm7',
    name: 'Safety Goggles',
    description: 'Impact resistant with anti-fog coating',
    detailedDescription: 'Professional safety goggles with impact resistance and anti-fog coating.',
    price: 19.99,
    quantity: 50,
    image: 'https://cdn.pixabay.com/photo/2017/12/27/15/14/goggle-3042888_1280.png',
    images: ['https://cdn.pixabay.com/photo/2017/12/27/15/14/goggle-3042888_1280.png'],
    specifications: { 'Protection': 'Impact resistant', 'Coating': 'Anti-fog' },
    pdfUrl: '/docs/safety-goggles-guide.pdf',
    groupId: 'g4',
  },
  {
    id: 'm8',
    name: 'Hard Hat',
    description: 'ANSI certified with adjustable fit',
    detailedDescription: 'ANSI certified hard hat with adjustable fit for maximum safety.',
    price: 29.99,
    quantity: 25,
    image: 'https://cdn.pixabay.com/photo/2013/07/13/12/14/hat-159463_1280.png',
    images: ['https://cdn.pixabay.com/photo/2013/07/13/12/14/hat-159463_1280.png'],
    specifications: { 'Certification': 'ANSI Z89.1', 'Adjustment': 'Ratchet suspension' },
    pdfUrl: '/docs/hard-hat-manual.pdf',
    groupId: 'g4',
  },
  {
    id: 'm9',
    name: 'All-Purpose Cleaner (1 Gallon)',
    description: 'Industrial strength cleaner for all surfaces',
    detailedDescription: 'Industrial strength all-purpose cleaner effective on all surfaces.',
    price: 22.99,
    quantity: 40,
    image: 'https://cdn.pixabay.com/photo/2020/06/29/02/49/distilled-water-5351167_1280.png',
    images: ['https://cdn.pixabay.com/photo/2020/06/29/02/49/distilled-water-5351167_1280.png'],
    specifications: { 'Volume': '1 Gallon', 'Type': 'All-purpose' },
    pdfUrl: '/docs/cleaner-safety.pdf',
    groupId: 'g5',
  },
  {
    id: 'm10',
    name: 'Microfiber Cloths (Pack of 24)',
    description: 'Reusable cloths for dust-free cleaning',
    detailedDescription: 'High-quality microfiber cloths for effective dust-free cleaning.',
    price: 17.99,
    quantity: 60,
    image: 'https://cdn.pixabay.com/photo/2016/04/01/09/58/bathroom-1299704_1280.png',
    images: ['https://cdn.pixabay.com/photo/2016/04/01/09/58/bathroom-1299704_1280.png'],
    specifications: { 'Material': 'Microfiber', 'Pack size': '24 cloths' },
    pdfUrl: '/docs/microfiber-care.pdf',
    groupId: 'g5',
  },
  {
    id: 'm11',
    name: 'Printer Paper (Case of 10)',
    description: '8.5 x 11 inch, 20lb, 5000 sheets total',
    detailedDescription: 'Premium printer paper for high-quality printing and copying.',
    price: 45.99,
    quantity: 30,
    image: 'https://cdn.pixabay.com/photo/2014/12/21/23/56/papers-576385_1280.png',
    images: ['https://cdn.pixabay.com/photo/2014/12/21/23/56/papers-576385_1280.png'],
    specifications: { 'Size': '8.5 x 11 inch', 'Weight': '20lb', 'Sheets': '5000' },
    pdfUrl: '/docs/printer-paper-specs.pdf',
    groupId: 'g1',
  },
  {
    id: 'm12',
    name: 'Mechanical Keyboard',
    description: 'Cherry MX Brown switches with backlight',
    detailedDescription: 'Professional mechanical keyboard with Cherry MX Brown switches and RGB backlight.',
    price: 89.99,
    quantity: 0,
    image: 'https://cdn.pixabay.com/photo/2013/07/13/11/50/computer-158770_1280.png',
    images: ['https://cdn.pixabay.com/photo/2013/07/13/11/50/computer-158770_1280.png'],
    specifications: { 'Switches': 'Cherry MX Brown', 'Backlight': 'RGB' },
    pdfUrl: '/docs/keyboard-manual.pdf',
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
    id: 1234,
    userId: '2',
    user: users.find(u => u.id === '2'),
    companyId: '1',
    items: [
      {
        id: 1,
        shipId: 1234,
        materialId: 'm2',
        material: materials.find(m => m.id === 'm2')!,
        quantity: 10,
        deliveryDate: new Date('2025-05-01'),
        batchNumber: 'Batch1',
        receipts: [
          {
            id: 1,
            shipItemId: 1,
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
    deliveryDate: new Date('2025-05-01')
  },
  {
    id: 1235,
    userId: '4',
    user: users.find(u => u.id === '4'),
    companyId: '1',
    items: [
      {
        id: 2,
        materialId: 'm9',
        material: materials.find(m => m.id === 'm9')!,
        quantity: 50,
        deliveryDate: new Date('2025-05-11'),
        batchNumber: 'Batch-100',
        receipts: [],
        shipId: 1235
      },
      {
        id: 3,
        materialId: 'm6',
        material: materials.find(m => m.id === 'm6')!,
        quantity: 50,
        deliveryDate: new Date('2025-05-11'),
        batchNumber: 'Batch-200',
        receipts: [],
        shipId: 1235
      }
    ],
    status: 'processing',
    createdAt: new Date("2025-05-10"),
    deliveryDate: new Date('2025-05-11')
  },
  {
    id: 1236,
    userId: '2',
    user: users.find(u => u.id === '2'),
    companyId: '1',
    items: [
      {
        id: 4,
        materialId: 'm4',
        material: materials.find(m => m.id === 'm4')!,
        quantity: 100,
        deliveryDate: new Date('2025-05-07'),
        batchNumber: 'Batch111',
        receipts: [
          {
            id: 1,
            shipItemId: 4,
            quantity: 50,
            receiptDate: new Date('2025-05-11'),
            batchNumber: 'Batch111',
            stockStatus: 'unrestricted'
          },
          {
            id: 2,
            shipItemId: 4,
            quantity: 50,
            receiptDate: new Date('2025-05-12'),
            batchNumber: 'Batch112',
            stockStatus: 'blocked'
          }
        ],
        shipId: 1236
      }
    ],
    status: 'goods received',
    createdAt: new Date("2025-05-02"),
    deliveryDate: new Date('2025-05-07')
  }
];

export const collections: CollectionDetails[] = [
  {
    id: "123",
    actualCollectionDate: undefined,
    collectionDate: new Date("2025-05-07"),
    companyId: "1",
    createdAt: new Date("2025-05-01"),
    price: 0,
    quoteBy: undefined,
    quoteDate: undefined,
    requestedQuote: true,
    status: "awaiting quote",
    user: users.find(u => u.id === '2'),
    userId: "2",
    collectionAddress: {
      addressLine1: "CPG Logistics",
      addressLine2: "166 Fareham Road",
      city: "Gosport",
      country: "United Kingdom",
      district: "Hamshire",
      firstName: "Santhosh",
      id: "1",
      isDefault: false,
      lastName: "Murugesan",
      postalCode: "PO13 0FW"
    }},

    {
    id: "124",
    actualCollectionDate: undefined,
    collectionDate: new Date("2025-05-10"),
    companyId: "1",
    createdAt: new Date("2025-05-04"),
    price: 0,
    quoteBy: undefined,
    quoteDate: undefined,
    requestedQuote: false,
    status: "completed",
    user: users.find(u => u.id === '4'),
    userId: "4",
    collectionAddress: {
      addressLine1: "33 Kennet Close",
      addressLine2: "Westend",
      city: "Southampton",
      country: "United Kingdom",
      district: "Hamshire",
      firstName: "Suzy",
      id: "1",
      isDefault: false,
      lastName: "Lord",
      postalCode: "SO18 3LL"
    }},

  {
    id: "125",
    actualCollectionDate: undefined,
    collectionDate: new Date("2025-05-10"),
    companyId: "1",
    createdAt: new Date("2025-05-04"),
    price: 59.99,
    quoteBy: users.find(u => u.id === '2'),
    quoteDate: new Date("2025-05-05"),
    requestedQuote: true,
    status: "awaiting approval",
    user: users.find(u => u.id === '4'),
    userId: "4",
    collectionAddress: {
      addressLine1: "47 The Avenue",
      addressLine2: "Maybush",
      city: "Southampton",
      country: "United Kingdom",
      district: "Hamshire",
      firstName: "Suzy",
      id: "1",
      isDefault: false,
      lastName: "Lord",
      postalCode: "SO16 9RD"
    }},

];
