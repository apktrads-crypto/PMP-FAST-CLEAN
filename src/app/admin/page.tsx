import { prisma } from "@/lib/prisma";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
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

  const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-surface p-4 rounded-md border border-border shadow-sm">
          <h3 className="text-muted text-sm font-bold">Total Orders</h3>
          <p className="text-3xl font-bold text-primary mt-2">{orders.length}</p>
        </div>
        <div className="bg-surface p-4 rounded-md border border-border shadow-sm">
          <h3 className="text-muted text-sm font-bold">Total Revenue</h3>
          <p className="text-3xl font-bold text-green-500 mt-2">₹{totalRevenue}</p>
        </div>
        <div className="bg-surface p-4 rounded-md border border-border shadow-sm">
          <h3 className="text-muted text-sm font-bold">Pending Orders</h3>
          <p className="text-3xl font-bold text-orange-500 mt-2">
            {orders.filter((o) => o.status === "PENDING").length}
          </p>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
      
      <div className="bg-surface rounded-md border border-border shadow-sm overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-8 text-center text-muted">No orders yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-background border-b border-border">
                <tr>
                  <th className="p-4 font-bold">Order ID</th>
                  <th className="p-4 font-bold">Date</th>
                  <th className="p-4 font-bold">Customer</th>
                  <th className="p-4 font-bold">Amount</th>
                  <th className="p-4 font-bold">Method</th>
                  <th className="p-4 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-background/50">
                    <td className="p-4 font-mono text-xs">{order.id.slice(-8)}</td>
                    <td className="p-4">{format(order.createdAt, 'MMM d, yyyy HH:mm')}</td>
                    <td className="p-4">
                      <p className="font-bold">{order.customerName}</p>
                      <p className="text-xs text-muted">{order.customerPhone}</p>
                    </td>
                    <td className="p-4 font-bold">₹{order.totalAmount}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-sm text-xs font-bold ${
                        order.paymentMethod === 'COD' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {order.paymentMethod}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-sm text-xs font-bold ${
                        order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                        order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 
                        'bg-blue-100 text-blue-800'
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
  );
}
