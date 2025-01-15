import { MenuItem, TableStatus, Staff } from '../types/pos';

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Classic Burger',
    price: 12.99,
    category: 'Mains',
    description: 'Beef patty with lettuce, tomato, and special sauce',
  },
  {
    id: '2',
    name: 'Caesar Salad',
    price: 9.99,
    category: 'Starters',
    description: 'Romaine lettuce, croutons, parmesan, caesar dressing',
  },
  {
    id: '3',
    name: 'Margherita Pizza',
    price: 14.99,
    category: 'Mains',
    description: 'Fresh tomatoes, mozzarella, basil',
  },
  {
    id: '4',
    name: 'French Fries',
    price: 4.99,
    category: 'Sides',
    description: 'Crispy golden fries with sea salt',
  },
  {
    id: '5',
    name: 'Chocolate Cake',
    price: 6.99,
    category: 'Desserts',
    description: 'Rich chocolate cake with ganache',
  },
];

export const tables: TableStatus[] = [
  { id: '1', number: 1, status: 'available', seats: 4 },
  { id: '2', number: 2, status: 'occupied', seats: 2 },
  { id: '3', number: 3, status: 'available', seats: 6 },
  { id: '4', number: 4, status: 'reserved', seats: 4 },
  { id: '5', number: 5, status: 'available', seats: 2 },
  { id: '6', number: 6, status: 'occupied', seats: 4 },
];

export const staff: Staff[] = [
  { id: '1', name: 'John Smith', role: 'server', active: true },
  { id: '2', name: 'Sarah Johnson', role: 'manager', active: true },
  { id: '3', name: 'Mike Wilson', role: 'kitchen', active: true },
  { id: '4', name: 'Emily Brown', role: 'server', active: false },
];