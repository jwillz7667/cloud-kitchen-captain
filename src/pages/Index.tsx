import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { menuItems, tables, staff } from '../data/mockData';

const Index = () => {
  const stats = [
    {
      label: 'Active Tables',
      value: tables.filter((t) => t.status === 'occupied').length,
      total: tables.length,
      color: 'text-blue-500',
    },
    {
      label: 'Open Orders',
      value: 5,
      total: 12,
      color: 'text-amber-500',
    },
    {
      label: 'Today\'s Sales',
      value: '$1,234',
      total: '$2,000',
      color: 'text-emerald-500',
    },
    {
      label: 'Active Staff',
      value: staff.filter((s) => s.active).length,
      total: staff.length,
      color: 'text-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-slate-400">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-slate-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline space-x-2">
                <span className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </span>
                {typeof stat.total === 'number' && (
                  <span className="text-sm text-slate-400">
                    / {stat.total}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-slate-800">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tables
                .filter((t) => t.status === 'occupied')
                .slice(0, 5)
                .map((table) => (
                  <div
                    key={table.id}
                    className="flex items-center justify-between rounded-lg bg-slate-700 p-4"
                  >
                    <div>
                      <p className="font-medium">Table {table.number}</p>
                      <p className="text-sm text-slate-400">{table.seats} seats</p>
                    </div>
                    <span className="rounded-full bg-amber-500/10 px-3 py-1 text-sm text-amber-500">
                      {table.status}
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800">
          <CardHeader>
            <CardTitle>Popular Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {menuItems.slice(0, 5).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg bg-slate-700 p-4"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-slate-400">{item.category}</p>
                  </div>
                  <span className="font-medium text-pos-accent">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;