import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { TrendingUp, TrendingDown, Package, CreditCard, ShoppingBag, Receipt } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  // Fetch Orders
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  // Fetch Expenses
  const expenses = await prisma.expense.findMany();

  // Calculations
  const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);
  
  const totalCost = orders.reduce((acc, order) => {
    const orderCost = order.items.reduce((itemAcc, item) => {
      // Use CP from product at time of order or current CP
      return itemAcc + (item.product.costPrice * item.quantity);
    }, 0);
    return acc + orderCost;
  }, 0);

  const grossProfit = totalRevenue - totalCost;
  const totalExpenses = expenses.reduce((acc, exp) => acc + exp.amount, 0);
  const netProfit = grossProfit - totalExpenses;

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">Operations Dashboard</h1>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Real-time business intelligence</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-full border border-gray-100 shadow-sm flex items-center gap-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Live System Active</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-xl shadow-black/5 group hover:scale-[1.02] transition-all">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-blue-50 rounded-[18px] flex items-center justify-center text-blue-500">
              <CreditCard size={24} />
            </div>
            <span className="text-[10px] font-black text-green-500 bg-green-50 px-3 py-1 rounded-full uppercase">+12%</span>
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Revenue</p>
          <p className="text-3xl font-black text-gray-900 tracking-tighter">₹{totalRevenue.toLocaleString()}</p>
        </div>

        {/* Gross Profit */}
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-xl shadow-black/5 group hover:scale-[1.02] transition-all">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-green-50 rounded-[18px] flex items-center justify-center text-green-500">
              <TrendingUp size={24} />
            </div>
            <span className="text-[10px] font-black text-blue-500 bg-blue-50 px-3 py-1 rounded-full uppercase">Gross</span>
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Profit</p>
          <p className="text-3xl font-black text-green-600 tracking-tighter">₹{grossProfit.toLocaleString()}</p>
        </div>

        {/* Expenses */}
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-xl shadow-black/5 group hover:scale-[1.02] transition-all">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-red-50 rounded-[18px] flex items-center justify-center text-red-500">
              <Receipt size={24} />
            </div>
            <span className="text-[10px] font-black text-red-500 bg-red-50 px-3 py-1 rounded-full uppercase">Expenses</span>
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Expenses</p>
          <p className="text-3xl font-black text-red-500 tracking-tighter">₹{totalExpenses.toLocaleString()}</p>
        </div>

        {/* Net Profit */}
        <div className="bg-gray-900 p-8 rounded-[40px] border border-gray-800 shadow-2xl shadow-black/20 group hover:scale-[1.05] transition-all">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-white/10 rounded-[18px] flex items-center justify-center text-white">
              <ShoppingBag size={24} />
            </div>
            <div className="flex flex-col items-end">
               <span className="text-[10px] font-black text-yellow-400 uppercase tracking-widest mb-1">Net Income</span>
               <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
                 <div className="h-full bg-yellow-400 w-[70%]" />
               </div>
            </div>
          </div>
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Actual Net Profit</p>
          <p className="text-3xl font-black text-white tracking-tighter">₹{netProfit.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
             <h2 className="text-xl font-black text-gray-900 tracking-tighter uppercase">Recent Activity</h2>
             <button className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-[#600B14] transition-colors">View All Orders</button>
          </div>
          
          <div className="bg-white rounded-[40px] border border-gray-100 shadow-2xl overflow-hidden">
            {orders.length === 0 ? (
              <div className="p-20 text-center text-gray-300 font-black uppercase tracking-widest">No orders yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50/50">
                      <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Order ID</th>
                      <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Customer</th>
                      <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Amount</th>
                      <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50/30 transition-colors">
                        <td className="px-8 py-6">
                           <p className="font-mono text-xs font-bold text-gray-400">#{order.id.slice(-8).toUpperCase()}</p>
                           <p className="text-[9px] font-bold text-gray-300 mt-1">{format(order.createdAt, 'MMM d, HH:mm')}</p>
                        </td>
                        <td className="px-8 py-6">
                          <p className="font-black text-gray-900 text-sm">{order.customerName}</p>
                          <p className="text-[10px] font-bold text-gray-400">{order.customerPhone}</p>
                        </td>
                        <td className="px-8 py-6 text-center">
                          <span className="font-black text-gray-900">₹{order.totalAmount}</span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                            order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 
                            order.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-black text-gray-900 tracking-tighter uppercase">Quick Stats</h2>
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-2xl space-y-8">
             <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-gray-50 rounded-[22px] flex items-center justify-center text-gray-400">
                   <Package size={24} />
                </div>
                <div>
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Orders</p>
                   <p className="text-2xl font-black text-gray-900 tracking-tighter">{orders.length}</p>
                </div>
             </div>
             
             <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-gray-50 rounded-[22px] flex items-center justify-center text-gray-400">
                   <TrendingDown size={24} className="text-red-400" />
                </div>
                <div>
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Expenses</p>
                   <p className="text-2xl font-black text-gray-900 tracking-tighter">{expenses.length}</p>
                </div>
             </div>

             <div className="pt-8 border-t border-gray-50">
                <p className="text-[10px] font-black text-[#600B14] uppercase tracking-widest mb-4">Stock Alerts</p>
                <div className="space-y-3">
                   <div className="flex justify-between items-center bg-red-50 p-4 rounded-[18px]">
                      <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">Low Stock Items</span>
                      <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-[10px] font-black">5</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
