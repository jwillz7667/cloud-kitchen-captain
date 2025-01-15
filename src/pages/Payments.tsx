import { Card } from "@/components/ui/card";
import { CreditCard, DollarSign, Receipt, History } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const Payments = () => {
  const paymentStats = [
    { title: "Today's Sales", amount: "$2,458.50", icon: DollarSign },
    { title: "Card Payments", amount: "$1,985.20", icon: CreditCard },
    { title: "Cash Payments", amount: "$473.30", icon: Receipt },
    { title: "Pending", amount: "$125.00", icon: History },
  ];

  const recentTransactions = [
    { id: "T001", table: "12", amount: 84.50, method: "Card", status: "completed" },
    { id: "T002", table: "05", amount: 156.75, method: "Cash", status: "completed" },
    { id: "T003", table: "08", amount: 125.00, method: "Card", status: "pending" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-pos-text">Payments</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {paymentStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="p-6 bg-slate-800 hover:bg-slate-700 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-pos-accent rounded-full">
                  <Icon className="h-6 w-6 text-slate-900" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-pos-text">{stat.amount}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Transactions */}
      <Card className="p-6 bg-slate-800">
        <h2 className="text-xl font-semibold text-pos-text mb-4">Recent Transactions</h2>
        <ScrollArea className="h-[400px] w-full rounded-md">
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <Card 
                key={transaction.id}
                className="p-4 bg-slate-700 hover:bg-slate-600 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-slate-400">Transaction ID: {transaction.id}</p>
                    <p className="text-lg font-semibold text-pos-text">Table {transaction.table}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-pos-text">${transaction.amount.toFixed(2)}</p>
                    <p className={`text-sm ${
                      transaction.status === 'completed' ? 'text-pos-success' : 'text-pos-accent'
                    }`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default Payments;