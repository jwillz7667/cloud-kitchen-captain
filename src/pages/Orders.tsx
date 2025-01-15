import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { menuItems } from '@/data/mockData';
import { Plus, Minus, Trash2, MapPin } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import DeliveryMap from '@/components/DeliveryMap';

interface OrderItem {
  menuItemId: string;
  quantity: number;
  notes: string;
  price: number;
}

interface DeliveryInfo {
  address: string;
  customerName: string;
  phone: string;
  coordinates?: [number, number];
}

interface Order {
  id: string;
  items: OrderItem[];
  type: 'dine-in' | 'pickup' | 'delivery' | 'curbside';
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  deliveryInfo?: DeliveryInfo;
  tableId?: string;
  total: number;
}

const Orders = () => {
  const [searchParams] = useSearchParams();
  const tableId = searchParams.get('table');
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [notes, setNotes] = useState<string>('');
  const [orderType, setOrderType] = useState<Order['type']>(tableId ? 'dine-in' : 'pickup');
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    address: '',
    customerName: '',
    phone: '',
  });
  const { toast } = useToast();

  console.log('Rendering Orders page with table:', tableId);

  const addToOrder = (menuItem: typeof menuItems[0]) => {
    const existingItem = orderItems.find(item => item.menuItemId === menuItem.id);
    
    if (existingItem) {
      setOrderItems(orderItems.map(item =>
        item.menuItemId === menuItem.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setOrderItems([...orderItems, {
        menuItemId: menuItem.id,
        quantity: 1,
        notes: '',
        price: menuItem.price
      }]);
    }
  };

  const updateQuantity = (menuItemId: string, change: number) => {
    setOrderItems(orderItems.map(item => {
      if (item.menuItemId === menuItemId) {
        const newQuantity = Math.max(0, item.quantity + change);
        return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(Boolean) as OrderItem[]);
  };

  const removeItem = (menuItemId: string) => {
    setOrderItems(orderItems.filter(item => item.menuItemId !== menuItemId));
  };

  const calculateTotal = () => {
    return orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleSubmitOrder = () => {
    if (orderItems.length === 0) {
      toast({
        title: "Error",
        description: "Please add items to the order before submitting",
        variant: "destructive"
      });
      return;
    }

    if (orderType === 'delivery' && (!deliveryInfo.address || !deliveryInfo.customerName || !deliveryInfo.phone)) {
      toast({
        title: "Error",
        description: "Please fill in all delivery information",
        variant: "destructive"
      });
      return;
    }

    const order: Order = {
      id: Math.random().toString(36).substr(2, 9),
      items: orderItems,
      type: orderType,
      status: 'pending',
      total: calculateTotal(),
      ...(tableId && { tableId }),
      ...(orderType === 'delivery' && { deliveryInfo })
    };

    console.log('Submitting order:', order);

    toast({
      title: "Order Submitted",
      description: `${orderType.charAt(0).toUpperCase() + orderType.slice(1)} order has been created`
    });

    setOrderItems([]);
    setNotes('');
    if (orderType === 'delivery') {
      setDeliveryInfo({
        address: '',
        customerName: '',
        phone: '',
      });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 h-[calc(100vh-4rem)]">
      <Tabs defaultValue="menu" className="flex-1">
        <TabsList>
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="delivery">Deliveries</TabsTrigger>
        </TabsList>

        <TabsContent value="menu" className="mt-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Menu Section */}
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Menu</CardTitle>
                <RadioGroup
                  value={orderType}
                  onValueChange={(value) => setOrderType(value as Order['type'])}
                  className="flex space-x-4"
                >
                  {!tableId && (
                    <>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pickup" id="pickup" />
                        <label htmlFor="pickup">Pickup</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="delivery" id="delivery" />
                        <label htmlFor="delivery">Delivery</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="curbside" id="curbside" />
                        <label htmlFor="curbside">Curbside</label>
                      </div>
                    </>
                  )}
                </RadioGroup>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-16rem)]">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {menuItems.map((item) => (
                      <Card 
                        key={item.id}
                        className="cursor-pointer hover:bg-accent"
                        onClick={() => addToOrder(item)}
                      >
                        <CardContent className="p-4">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                          <p className="mt-2 font-bold">${item.price.toFixed(2)}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Order Section */}
            <Card className="w-full lg:w-96">
              <CardHeader>
                <CardTitle>
                  {orderType === 'dine-in' 
                    ? `Table ${tableId} Order` 
                    : `${orderType.charAt(0).toUpperCase() + orderType.slice(1)} Order`}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {orderType === 'delivery' && (
                  <div className="space-y-4 mb-4">
                    <Input
                      placeholder="Customer Name"
                      value={deliveryInfo.customerName}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, customerName: e.target.value })}
                    />
                    <Input
                      placeholder="Phone Number"
                      value={deliveryInfo.phone}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })}
                    />
                    <Input
                      placeholder="Delivery Address"
                      value={deliveryInfo.address}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
                    />
                  </div>
                )}

                <ScrollArea className="h-[calc(100vh-24rem)]">
                  <div className="space-y-4">
                    {orderItems.map((item) => {
                      const menuItem = menuItems.find(m => m.id === item.menuItemId);
                      return (
                        <div key={item.menuItemId} className="flex items-center justify-between gap-2 p-2 rounded-lg bg-accent">
                          <div className="flex-1">
                            <p className="font-medium">{menuItem?.name}</p>
                            <p className="text-sm text-muted-foreground">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.menuItemId, -1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.menuItemId, 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => removeItem(item.menuItemId)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>

                <div className="mt-4 space-y-4">
                  <Input
                    placeholder="Order Notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                  
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total:</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>

                  <Button 
                    className="w-full"
                    size="lg"
                    onClick={handleSubmitOrder}
                  >
                    Submit Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="delivery" className="mt-6">
          <DeliveryMap />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Orders;