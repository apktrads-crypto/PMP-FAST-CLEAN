"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { Search, Calculator, ShoppingCart, Trash2, ShieldCheck, AlertCircle, TrendingUp, Printer } from "lucide-react";

export default function AdminBilling() {
  const [products, setProducts] = useState<any[]>([]);
  const [billItems, setBillItems] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const role = typeof window !== 'undefined' ? localStorage.getItem("adminRole") : null;
    setIsAdmin(role === "ADMIN");
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

  const sendWhatsApp = () => {
    const message = `*PMP FAST CLEAN - Order Summary*%0A` +
      `--------------------------------%0A` +
      billItems.map(i => `${i.qty} x ${i.name} = ₹${i.price * i.qty}`).join('%0A') +
      `%0A--------------------------------%0A` +
      `*Total Amount: ₹${finalPrice}*%0A` +
      `Discount Applied: ₹${discount}%0A%0A` +
      `Thank you for shopping with PMP!%0A` +
      `Cleanliness, redefined. ✨`;
    
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const getStatus = () => {
    if (totalProfit > 40) return { color: 'text-green-500', bg: 'bg-green-100', label: 'SAFE PROFIT', icon: <ShieldCheck /> };
    if (totalProfit >= 20) return { color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'LOW PROFIT', icon: <AlertCircle /> };
    return { color: 'text-red-500', bg: 'bg-red-100', label: 'LOSS RISK', icon: <AlertCircle /> };
  };

  const status = getStatus();

  return (
    <div className="bg-[#F9FAFB] min-h-screen p-6 md:p-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
        
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
                        {isAdmin && <p className="text-[9px] font-bold text-gray-400">Cost: ₹{item.costPrice}</p>}
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

              {isAdmin && (
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
              )}

              <div className="grid grid-cols-2 gap-4">
                <button className="bg-gray-900 text-white py-6 rounded-[24px] font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-black/20 hover:scale-[1.02] active:scale-[0.97] transition-all flex items-center justify-center gap-3">
                  <Printer size={16} /> Print
                </button>
                <button 
                  onClick={sendWhatsApp}
                  className="bg-[#25D366] text-white py-6 rounded-[24px] font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-[#25D366]/20 hover:scale-[1.02] active:scale-[0.97] transition-all flex items-center justify-center gap-3"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.067 2.877 1.215 3.076.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                   WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
