import React from 'react';
import { Card } from '@/components/ui/card';
import { menuItems, tables, staff } from '../data/mockData';

const Index = () => {
  const stats = [
    {
      label: 'Active Tables',
      value: tables.filter((t) => t.status === 'occupied').length,
      total: tables.length,
    },
    {
      label: 'Menu Items',
      value: menuItems.length,
      total: menuItems.length,
    },
    {
      label: 'Active Staff',
      value: staff.filter((s) => s.active).length,
      total: staff.length,
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-slate-800 p-6">
            <h3 className="text-slate-400">{stat.label}</h3>
            <div className="mt-2 flex items-baseline space-x-2">
              <span className="text-2xl font-semibold text-pos-accent">{stat.value}</span>
              <span className="text-sm text-slate-400">/ {stat.total}</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-slate-800 p-6">
          <h2 className="mb-4 text-xl font-semibold">Recent Orders</h2>
          <p className="text-slate-400">No recent orders</p>
        </Card>

        <Card className="bg-slate-800 p-6">
          <h2 className="mb-4 text-xl font-semibold">Popular Items</h2>
          <div className="space-y-4">
            {menuItems.slice(0, 3).map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.name}</span>
                <span className="text-pos-accent">${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;