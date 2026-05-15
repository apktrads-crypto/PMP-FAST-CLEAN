"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { Package, MapPin, Phone, Calendar, CheckCircle, Clock, FileText, Printer } from "lucide-react";

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const generateInvoice = (order: any) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const invoiceHtml = `
      <html>
        <head>
          <title>Invoice - ${order.id}</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #333; }
            .header { display: flex; justify-between; border-bottom: 2px solid #600B14; padding-bottom: 20px; margin-bottom: 30px; }
            .brand { color: #600B14; font-size: 24px; font-weight: 900; }
            .invoice-details { text-align: right; }
            .section { margin-bottom: 30px; }
            .section-title { font-weight: bold; text-transform: uppercase; font-size: 12px; color: #999; margin-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; }
            th { text-align: left; background: #f9f9f9; padding: 10px; }
            td { padding: 10px; border-bottom: 1px solid #eee; }
            .total-row { font-weight: bold; font-size: 18px; text-align: right; margin-top: 20px; }
            .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #999; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="brand">PMP FAST CLEAN</div>
            <div class="invoice-details">
              <div>Invoice #: ${order.id.slice(-6).toUpperCase()}</div>
              <div>Date: ${new Date(order.createdAt).toLocaleDateString()}</div>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Customer Details</div>
            <div><strong>${order.customerName}</strong></div>
            <div>${order.customerPhone}</div>
            <div>${order.address}</div>
          </div>

          <div class="section">
            <div class="section-title">Order Items</div>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${order.items.map((item: any) => `
                  <tr>
                    <td>${item.product.name}</td>
                    <td>${item.quantity}</td>
                    <td>₹${item.price}</td>
                    <td>₹${item.price * item.quantity}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="total-row">
            Total Amount: ₹${order.totalAmount}
          </div>

          <div class="footer">
            Thank you for choosing PMP Fast Clean!<br/>
            Contact us: support@pmpfastclean.com | +91 9876543210
          </div>
          
          <script>window.print();</script>
        </body>
      </html>
    `;
    printWindow.document.write(invoiceHtml);
    printWindow.document.close();
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tighter">Orders</h1>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mt-1">Real-time Sales Tracking</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
              <Package size={20} className="text-[#600B14]" />
              <span className="text-sm font-black text-gray-900">{orders.length} Total Orders</span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="p-20 text-center text-gray-400 font-bold">Loading Orders...</div>
        ) : orders.length === 0 ? (
          <div className="bg-white p-20 rounded-[40px] text-center border border-dashed border-gray-200">
            <Package size={48} className="mx-auto mb-4 opacity-10" />
            <p className="text-gray-400 font-black uppercase tracking-widest">No Orders Yet</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-xl shadow-black/5 hover:shadow-black/10 transition-all group">
                <div className="flex flex-col lg:flex-row justify-between gap-8">
                  {/* Left: Customer & Status */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${order.status === 'PENDING' ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>
                        {order.status}
                      </div>
                      <span className="text-[10px] text-gray-300 font-bold uppercase tracking-tighter">ID: {order.id.slice(-8)}</span>
                    </div>
                    
                    <div>
                      <h2 className="text-2xl font-black text-gray-900">{order.customerName}</h2>
                      <div className="flex items-center gap-4 mt-2 text-gray-400">
                        <div className="flex items-center gap-1">
                          <Phone size={14} />
                          <span className="text-xs font-bold">{order.customerPhone}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span className="text-xs font-bold">{new Date(order.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-gray-500 bg-gray-50 p-4 rounded-2xl">
                      <MapPin size={16} className="mt-0.5 text-[#600B14]" />
                      <p className="text-xs font-medium leading-relaxed">{order.address}</p>
                    </div>
                  </div>

                  {/* Center: Items */}
                  <div className="flex-1 lg:border-x lg:border-gray-50 lg:px-8">
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Order Items</div>
                    <div className="space-y-3">
                      {order.items.map((item: any) => (
                        <div key={item.id} className="flex items-center justify-between group-hover:bg-gray-50 p-2 rounded-xl transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center p-1">
                              <img src={item.product.image} className="w-full h-full object-contain" />
                            </div>
                            <div>
                              <p className="text-xs font-black text-gray-900">{item.product.name}</p>
                              <p className="text-[10px] text-gray-400 font-bold">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <span className="text-xs font-black text-gray-900">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="w-full lg:w-48 flex flex-col justify-between items-end">
                    <div className="text-right mb-4 lg:mb-0">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Amount</p>
                      <p className="text-3xl font-black text-[#600B14]">₹{order.totalAmount}</p>
                    </div>
                    
                    <div className="flex flex-col gap-2 w-full">
                      <button 
                        onClick={() => generateInvoice(order)}
                        className="w-full bg-gray-900 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#600B14] transition-all"
                      >
                        <FileText size={14} /> Invoice
                      </button>
                      
                      {order.status === 'PENDING' ? (
                        <button 
                          onClick={() => updateStatus(order.id, 'COMPLETED')}
                          className="w-full bg-green-500 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-green-600 transition-all shadow-lg shadow-green-500/20"
                        >
                          <CheckCircle size={14} /> Deliver
                        </button>
                      ) : (
                        <div className="text-center py-3 text-green-500 font-black text-[10px] uppercase tracking-widest border-2 border-green-500/10 rounded-xl">
                          Delivered
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
