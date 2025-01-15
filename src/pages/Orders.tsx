import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Plus, MoreVertical } from 'lucide-react';

const Orders = () => {
  // Temporary mock data for orders
  const orders = [
    {
      id: '1',
      tableId: '2',
      status: 'preparing',
      total: 45.99,
      items: [
        { menuItemId: '1', quantity: 2, price: 12.99 },
        { menuItemId: '4', quantity: 1, price: 4.99 },
      ],
      createdAt: new Date(),
    },
    {
      id: '2',
      tableId: '6',
      status: 'served',
      total: 29.99,
      items: [
        { menuItemId: '3', quantity: 1, price: 14.99 },
        { menuItemId: '2', quantity: 1, price: 9.99 },
      ],
      createdAt: new Date(),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Orders</h1>
        <Button size="lg" className="gap-2">
          <Plus className="h-5 w-5" />
          New Order
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">
              Pending Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">3</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">
              Preparing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">2</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">
              Ready to Serve
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">1</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">
              Today's Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">$523.45</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Table</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="cursor-pointer hover:bg-slate-700">
                  <TableCell className="font-medium">#{order.id}</TableCell>
                  <TableCell>Table {order.tableId}</TableCell>
                  <TableCell>{order.items.reduce((acc, item) => acc + item.quantity, 0)} items</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        order.status === 'preparing'
                          ? 'bg-amber-500/10 text-amber-500'
                          : 'bg-green-500/10 text-green-500'
                      }`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    {order.createdAt.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;