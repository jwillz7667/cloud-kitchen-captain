import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Utensils, Users, BarChart3 } from 'lucide-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/tables', icon: Utensils, label: 'Tables' },
    { path: '/staff', icon: Users, label: 'Staff' },
    { path: '/reports', icon: BarChart3, label: 'Reports' },
  ];

  return (
    <div className="min-h-screen bg-pos-surface text-pos-text">
      <nav className="fixed bottom-0 left-0 w-full bg-slate-800 p-4 md:left-0 md:top-0 md:h-full md:w-20">
        <div className="flex justify-around md:flex-col md:space-y-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center space-y-1 rounded-lg p-2 transition-colors hover:bg-slate-700 ${
                  location.pathname === item.path ? 'text-pos-accent' : 'text-slate-300'
                }`}
              >
                <Icon size={24} />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
      <main className="pb-20 md:ml-20 md:pb-0">
        <div className="container mx-auto p-4">{children}</div>
      </main>
    </div>
  );
};

export default Layout;