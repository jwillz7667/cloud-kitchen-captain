import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Utensils, Users, BarChart3, Package, CreditCard, Settings } from 'lucide-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/tables', icon: Utensils, label: 'Tables' },
    { path: '/orders', icon: Package, label: 'Orders' },
    { path: '/staff', icon: Users, label: 'Staff' },
    { path: '/payments', icon: CreditCard, label: 'Payments' },
    { path: '/reports', icon: BarChart3, label: 'Reports' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-pos-surface text-pos-text">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-10 bg-slate-800 px-4 py-2 md:left-20">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-pos-accent">RestaurantPOS</h1>
          <div className="flex items-center space-x-4">
            <button className="rounded-full bg-slate-700 p-2 hover:bg-slate-600">
              <span className="sr-only">Notifications</span>
              <div className="h-2 w-2 rounded-full bg-pos-accent"></div>
            </button>
            <button className="rounded-full bg-slate-700 p-2 hover:bg-slate-600">
              <span className="sr-only">Profile</span>
              <div className="h-6 w-6 rounded-full bg-slate-500"></div>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Sidebar */}
      <nav className="fixed bottom-0 left-0 z-20 w-full bg-slate-800 p-4 md:top-0 md:h-full md:w-20">
        <div className="flex justify-around md:flex-col md:space-y-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center space-y-1 rounded-lg p-2 transition-colors hover:bg-slate-700 ${
                  isActive ? 'text-pos-accent' : 'text-slate-300'
                }`}
              >
                <Icon size={24} />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="mt-16 pb-20 md:ml-20 md:pb-0">
        <div className="container mx-auto p-4">{children}</div>
      </main>
    </div>
  );
};

export default Layout;