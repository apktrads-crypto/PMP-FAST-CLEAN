"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { Search, Calculator, ShoppingCart, Trash2, ShieldCheck, AlertCircle, TrendingUp, Printer } from "lucide-react";

export default function AdminBilling() {
  const [products, setProducts] = useState<any[]>([]);
  const [billItems, setBillItems] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data.products || []));
  }, []);

  const addToBill = (product: any) => {
    const existing = billItems.find(i => i.id === product.id);
    if (existing) {
      setBillItems(billItems.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setBillItems([...billItems, { ...product, qty: 1 }]);
    }
  };

  const removeFromBill = (id: string) => {
    setBillItems(billItems.filter(i => i.id !== id));
  };

  const totalMRP = billItems.reduce((acc, i) => acc + (i.price * i.qty), 0);
  const totalCost = billItems.reduce((acc, i) => acc + (i.costPrice * i.qty), 0);
  const finalPrice = totalMRP - discount;
  const totalProfit = finalPrice - totalCost;

  // Safe Discount Alert Logic
  const getStatus = () => {
    if (totalProfit > 40) return { color: 'text-green-500', bg: 'bg-green-100', label: 'SAFE PROFIT', icon: <ShieldCheck /> };
    if (totalProfit >= 20) return { color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'LOW PROFIT', icon: <AlertCircle /> };
    return { color: 'text-red-500', bg: 'bg-red-100', label: 'LOSS RISK', icon: <AlertCircle /> };
  };

  const status = getStatus();

  return (
    <div className="bg-[#F9FAFB] min-h-screen p-6 md:p-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
        
        {/* Left: Product Selector */}
        <div className="flex-[1.5] space-y-8">
          <div className="bg-white p-8 rounded-[40px] shadow-2xl shadow-black/5 border border-gray-100">
            <h1 className="text-3xl font-black text-gray-900 tracking-tighter mb-6 flex items-center gap-3">
              <Calculator className="text-[#600B14]" /> QUICK BILLING
            </h1>
            
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search Product Code or Name..." 
                className="w-full bg-gray-50 border-2 border-transparent rounded-[24px] px-14 py-5 font-bold text-gray-900 focus:border-[#600B14] outline-none transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 max-h-[500px] overflow-y-auto no-scrollbar">
              {products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.productCode.toLowerCase().includes(search.toLowerCase())).map(product => (
                <div 
                  key={product.id} 
                  onClick={() => addToBill(product)}
                  className="bg-gray-50 p-5 rounded-[24px] border border-transparent hover:border-[#600B14] hover:bg-white transition-all cursor-pointer group flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-1 shadow-sm">
                      <img src={product.image} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <p className="font-black text-gray-900 text-sm tracking-tighter">{product.name}</p>
                      <p className="text-[10px] font-bold text-gray-400">{product.productCode}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-[#600B14] text-lg">₹{product.price}</p>
                    <p className="text-[9px] font-black text-green-500">Stock: {product.stock}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Live Bill & Profit Calculator */}
        <div className="flex-1 space-y-8">
          <div className="bg-white rounded-[40px] shadow-2xl shadow-black/5 border border-gray-100 overflow-hidden flex flex-col h-full sticky top-10">
            <div className="p-8 border-b border-gray-50 bg-gray-50/50">
              <h2 className="text-xl font-black text-gray-900 tracking-tighter flex items-center gap-2">
                <ShoppingCart size={20} className="text-[#600B14]" /> CURRENT BILL
              </h2>
            </div>

            <div className="flex-1 p-8 space-y-4 overflow-y-auto max-h-[400px]">
              {billItems.length === 0 ? (
                <p className="text-center text-gray-300 font-bold uppercase tracking-widest py-10">No items added</p>
              ) : (
                billItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center font-black text-[10px]">{item.qty}x</div>
                      <div>
                        <p className="text-xs font-black text-gray-900">{item.name}</p>
                        <p className="text-[9px] font-bold text-gray-400">Cost: ₹{item.costPrice}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-black text-gray-900 text-sm">₹{item.price * item.qty}</span>
                      <button onClick={() => removeFromBill(item.id)} className="text-gray-200 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-8 bg-gray-50 space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                  <span>Total MRP</span>
                  <span>₹{totalMRP}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Special Discount</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-lg">-</span>
                    <input 
                      type="number" 
                      className="w-20 bg-white border border-gray-200 rounded-xl px-3 py-1.5 font-black text-gray-900 outline-none focus:border-[#600B14]"
                      value={discount}
                      onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200 flex justify-between items-end">
                  <span className="text-xs font-black text-gray-900 uppercase tracking-widest">Final Amount</span>
                  <span className="text-4xl font-black text-[#600B14] tracking-tighter">₹{finalPrice}</span>
                </div>
              </div>

              {/* Secret Profit Box */}
              <div className={`p-6 rounded-[32px] ${status.bg} transition-all duration-500`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <div className={status.color}>{status.icon}</div>
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${status.color}`}>{status.label}</span>
                  </div>
                  <TrendingUp size={16} className={status.color} />
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Live Profit</p>
                    <p className={`text-2xl font-black ${status.color}`}>₹{totalProfit}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Margin</p>
                    <p className={`font-black ${status.color}`}>{totalMRP ? Math.round((totalProfit / finalPrice) * 100) : 0}%</p>
                  </div>
                </div>
              </div>

              <button className="w-full bg-gray-900 text-white py-6 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-black/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                <Printer size={18} /> Print Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
