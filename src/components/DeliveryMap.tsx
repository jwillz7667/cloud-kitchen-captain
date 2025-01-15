import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MapPin, User } from 'lucide-react';

interface Delivery {
  id: string;
  customerName: string;
  address: string;
  status: 'pending' | 'assigned' | 'in-progress' | 'delivered';
  driver?: string;
  coordinates: [number, number];
}

interface Driver {
  id: string;
  name: string;
  status: 'available' | 'busy';
}

// Mock data - in a real app, this would come from your backend
const mockDeliveries: Delivery[] = [
  {
    id: '1',
    customerName: 'John Doe',
    address: '123 Main St, City',
    status: 'pending',
    coordinates: [40.7128, -74.0060]
  },
  {
    id: '2',
    customerName: 'Jane Smith',
    address: '456 Oak Ave, Town',
    status: 'assigned',
    driver: 'Driver 1',
    coordinates: [40.7589, -73.9851]
  }
];

const mockDrivers: Driver[] = [
  { id: '1', name: 'Driver 1', status: 'available' },
  { id: '2', name: 'Driver 2', status: 'available' },
  { id: '3', name: 'Driver 3', status: 'busy' }
];

const DeliveryMap = () => {
  const [selectedDelivery, setSelectedDelivery] = useState<string | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);

  const assignDriver = (deliveryId: string, driverId: string) => {
    // In a real app, this would make an API call to update the delivery
    console.log(`Assigning delivery ${deliveryId} to driver ${driverId}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
      {/* Deliveries List */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Active Deliveries</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-16rem)]">
            <div className="space-y-4">
              {mockDeliveries.map((delivery) => (
                <div
                  key={delivery.id}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedDelivery === delivery.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-accent hover:bg-accent/80'
                  }`}
                  onClick={() => setSelectedDelivery(delivery.id)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{delivery.customerName}</h3>
                      <p className="text-sm flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {delivery.address}
                      </p>
                      <p className="text-sm mt-2">Status: {delivery.status}</p>
                      {delivery.driver && (
                        <p className="text-sm flex items-center gap-2 mt-1">
                          <User className="h-4 w-4" />
                          {delivery.driver}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Map */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Delivery Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[calc(100vh-20rem)] bg-accent rounded-lg flex items-center justify-center">
            {/* In a real app, this would be replaced with a Google Maps component */}
            <p className="text-muted-foreground">Map would be displayed here</p>
          </div>

          {selectedDelivery && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Assign Driver</h3>
              <div className="flex gap-2 flex-wrap">
                {mockDrivers.map((driver) => (
                  <Button
                    key={driver.id}
                    variant={selectedDriver === driver.id ? 'default' : 'outline'}
                    onClick={() => setSelectedDriver(driver.id)}
                    disabled={driver.status === 'busy'}
                  >
                    {driver.name}
                  </Button>
                ))}
              </div>
              {selectedDriver && (
                <Button
                  className="mt-4 w-full"
                  onClick={() => assignDriver(selectedDelivery, selectedDriver)}
                >
                  Assign Driver
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DeliveryMap;