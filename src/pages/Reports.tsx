import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, Printer } from "lucide-react";

const Reports = () => {
  const salesData = [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 2780 },
    { name: 'Thu', sales: 4890 },
    { name: 'Fri', sales: 6390 },
    { name: 'Sat', sales: 7480 },
    { name: 'Sun', sales: 5300 },
  ];

  const categoryData = [
    { name: 'Main Course', value: 4500 },
    { name: 'Beverages', value: 2300 },
    { name: 'Desserts', value: 1800 },
    { name: 'Appetizers', value: 2100 },
    { name: 'Specials', value: 1500 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-pos-text">Reports</h1>
        <div className="flex space-x-4">
          <Card className="p-3 bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer">
            <Download className="h-6 w-6 text-pos-text" />
          </Card>
          <Card className="p-3 bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer">
            <Printer className="h-6 w-6 text-pos-text" />
          </Card>
        </div>
      </div>

      {/* Weekly Sales Chart */}
      <Card className="p-6 bg-slate-800">
        <h2 className="text-xl font-semibold text-pos-text mb-4">Weekly Sales</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none' }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#f59e0b" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Category Sales Chart */}
      <Card className="p-6 bg-slate-800">
        <h2 className="text-xl font-semibold text-pos-text mb-4">Sales by Category</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none' }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Bar dataKey="value" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default Reports;