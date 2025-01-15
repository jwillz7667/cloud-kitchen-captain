export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
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
}

export interface OrderItem {
  menuItemId: string;
  quantity: number;
  notes?: string;
  price: number;
}

export interface Staff {
  id: string;
  name: string;
  role: 'server' | 'kitchen' | 'manager' | 'admin';
  active: boolean;
}