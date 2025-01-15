import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { tables } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

const Tables = () => {
  const navigate = useNavigate();
  console.log('Rendering Tables page');

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Tables</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tables.map((table) => (
          <Card 
            key={table.id}
            className={`cursor-pointer transition-colors ${
              table.status === 'available' ? 'bg-green-900/20' :
              table.status === 'occupied' ? 'bg-red-900/20' :
              'bg-yellow-900/20'
            }`}
            onClick={() => navigate(`/orders/new?table=${table.id}`)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Table {table.number}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{table.seats} Seats</p>
              <p className={`mt-2 font-semibold capitalize ${
                table.status === 'available' ? 'text-green-500' :
                table.status === 'occupied' ? 'text-red-500' :
                'text-yellow-500'
              }`}>
                {table.status}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Tables;