import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Plus, Users, Edit, Trash2 } from 'lucide-react';
import { tables } from '@/data/mockData';

const Tables = () => {
  console.log('Rendering Tables page');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-pos-text">Table Management</h1>
        <Button className="bg-pos-accent hover:bg-amber-600">
          <Plus className="mr-2" size={16} />
          Add Table
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tables.map((table) => (
          <Card key={table.id} className="bg-slate-800 text-pos-text">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">Table {table.number}</CardTitle>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-pos-text">
                  <Edit size={18} />
                </Button>
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-destructive">
                  <Trash2 size={18} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <Users size={18} className="mr-2 text-slate-400" />
                  <span>{table.seats} Seats</span>
                </div>
                <div
                  className={`rounded-full px-3 py-1 text-sm ${
                    table.status === 'available'
                      ? 'bg-pos-success/20 text-pos-success'
                      : table.status === 'occupied'
                      ? 'bg-destructive/20 text-destructive'
                      : 'bg-pos-accent/20 text-pos-accent'
                  }`}
                >
                  {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
                </div>
              </div>
              {table.currentOrder && (
                <div className="mt-2 rounded-md bg-slate-700/50 p-2">
                  <p className="text-sm text-slate-300">Current Order: #{table.currentOrder.id}</p>
                  <p className="text-sm text-slate-400">
                    Items: {table.currentOrder.items.length} | Status: {table.currentOrder.status}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6 bg-slate-800">
        <CardHeader>
          <CardTitle>Table Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Table Number</TableHead>
                <TableHead>Seats</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Current Order</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tables.map((table) => (
                <TableRow key={table.id}>
                  <TableCell>Table {table.number}</TableCell>
                  <TableCell>{table.seats}</TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        table.status === 'available'
                          ? 'bg-pos-success/20 text-pos-success'
                          : table.status === 'occupied'
                          ? 'bg-destructive/20 text-destructive'
                          : 'bg-pos-accent/20 text-pos-accent'
                      }`}
                    >
                      {table.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {table.currentOrder ? `Order #${table.currentOrder.id}` : 'No active order'}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="h-8">
                        <Edit size={16} className="mr-2" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 text-destructive hover:text-destructive">
                        <Trash2 size={16} className="mr-2" />
                        Delete
                      </Button>
                    </div>
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

export default Tables;