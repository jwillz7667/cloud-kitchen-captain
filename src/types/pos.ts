export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  image?: string;
  available?: boolean;
}

export interface TableStatus {
  id: string;
  number: number;
  status: 'available' | 'occupied' | 'reserved';
  seats: number;
  currentOrder?: Order;
}

export interface Order {
  id: string;
  tableId: string;
  items: OrderItem[];
  status: 'pending' | 'preparing' | 'ready' | 'served' | 'paid';
  total: number;
  createdAt: Date;
  updatedAt: Date;
  customerName?: string;
  specialInstructions?: string;
}

export interface OrderItem {
  menuItemId: string;
  quantity: number;
  notes?: string;
  price: number;
  modifications?: string[];
}

export interface Staff {
  id: string;
  name: string;
  role: 'server' | 'kitchen' | 'manager' | 'admin';
  active: boolean;
  email?: string;
  phone?: string;
  startDate?: Date;
  schedule?: StaffSchedule[];
}

export interface StaffSchedule {
  day: string;
  startTime: string;
  endTime: string;
}

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  method: 'cash' | 'credit' | 'debit' | 'mobile';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  timestamp: Date;
  reference?: string;
}