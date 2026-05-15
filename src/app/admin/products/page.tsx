"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { Plus, Trash2, ShieldAlert, TrendingUp, Package, Calculator, Search } from "lucide-react";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [command, setCommand] = useState("");
  
  const [formData, setFormData] = useState({
    productCode: "",
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    costPrice: "",
    minSellPrice: "",
    maxDiscount: "",
    image: "",
    tag: "",
    features: "",
    stock: "",
  });

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      alert("Please upload a product image");
      return;
    }
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
          costPrice: parseFloat(formData.costPrice),
          minSellPrice: parseFloat(formData.minSellPrice),
          maxDiscount: parseFloat(formData.maxDiscount),
          stock: parseInt(formData.stock),
        }),
      });
      if (res.ok) {
        setShowForm(false);
        setFormData({ productCode: "", name: "", description: "", price: "", originalPrice: "", costPrice: "", minSellPrice: "", maxDiscount: "", image: "", tag: "", features: "", stock: "" });
        fetchProducts();
      } else {
        alert("Failed to add product");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchProducts();
      } else {
        alert("Failed to delete product");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Command Console Logic
  const executeCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const [cmd, ...args] = command.trim().split(" ");
    
    if (cmd === "/search") {
      const found = products.find(p => p.productCode === args[0]);
      if (found) alert(`Product: ${found.name}\nCost: ₹${found.costPrice}\nStock: ${found.stock}`);
      else alert("Product not found");
    } else if (cmd === "/profit") {
      const [sell, cost] = args[0].split("-").map(parseFloat);
      const profit = sell - cost;
      alert(`Profit: ₹${profit} (${profit > 40 ? 'SAFE' : profit > 20 ? 'LOW' : 'RISK'})`);
    } else {
      alert("Unknown command. Try /search [code] or /profit [sell-cost]");
    }
    setCommand("");
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Admin Header with Stats */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter">PMP <span className="text-[#600B14]">SECRET</span> SYSTEM</h1>
            <p className="text-gray-400 text-xs font-black uppercase tracking-[0.3em] mt-2">Internal Business Operations Only</p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="bg-white p-4 px-6 rounded-[24px] shadow-xl shadow-black/5 border border-gray-100">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Live Inventory</p>
              <div className="flex items-center gap-2">
                <Package size={16} className="text-[#600B14]" />
                <span className="text-xl font-black text-gray-900">{products.length} Items</span>
              </div>
            </div>
            <button 
              onClick={() => setShowForm(!showForm)}
              className="bg-[#600B14] text-white px-10 py-4 rounded-[24px] font-black text-xs uppercase tracking-widest shadow-2xl shadow-[#600B14]/30 hover:scale-105 transition-all flex items-center gap-3"
            >
              {showForm ? "Close Form" : <><Plus size={18} /> New Entry</>}
            </button>
          </div>
        </div>

        {/* Command Bar */}
        <div className="mb-10 group">
          <form onSubmit={executeCommand} className="relative">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#600B14] transition-colors">
              <Search size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Enter Command: /search [code], /profit [sell-cost], /stk, /low..." 
              className="w-full bg-white border-2 border-gray-50 rounded-[30px] px-16 py-6 font-bold text-gray-900 shadow-2xl shadow-black/5 focus:border-[#600B14] outline-none transition-all placeholder:text-gray-300"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:block">
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">Press Enter</span>
            </div>
          </form>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white p-10 md:p-14 rounded-[50px] border border-gray-100 shadow-2xl mb-16 animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              < ShieldAlert size={120} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Product Core */}
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#600B14] rounded-full flex items-center justify-center text-white text-xs font-black">1</div>
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Identification</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Secret Product Code</label>
                    <input required type="text" placeholder="PMP-FC-P-WH-1L" className="w-full bg-gray-50 border-2 border-gray-50 rounded-[20px] px-6 py-4 font-bold text-gray-900 focus:border-[#600B14] outline-none transition-all" value={formData.productCode} onChange={e => setFormData({...formData, productCode: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Market Name</label>
                    <input required type="text" className="w-full bg-gray-50 border-2 border-gray-50 rounded-[20px] px-6 py-4 font-bold text-gray-900 focus:border-[#600B14] outline-none transition-all" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Initial Stock</label>
                    <input required type="number" className="w-full bg-gray-50 border-2 border-gray-50 rounded-[20px] px-6 py-4 font-bold text-gray-900 focus:border-[#600B14] outline-none transition-all" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
                  </div>
                </div>
              </div>

              {/* Secret Financials */}
              <div className="space-y-8 bg-gray-50/50 p-8 md:p-10 rounded-[40px] border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#FF5200] rounded-full flex items-center justify-center text-white text-xs font-black">2</div>
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Financials</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white p-5 rounded-[24px] shadow-sm">
                    <label className="text-[10px] font-black text-[#FF5200] uppercase tracking-widest mb-2 block">Actual Cost (CP)</label>
                    <input required type="number" className="w-full bg-transparent border-none p-0 font-black text-2xl text-gray-900 outline-none placeholder:text-gray-200" placeholder="00" value={formData.costPrice} onChange={e => setFormData({...formData, costPrice: e.target.value})} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-5 rounded-[24px] shadow-sm">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">MRP</label>
                      <input required type="number" className="w-full bg-transparent border-none p-0 font-black text-xl text-gray-900 outline-none" value={formData.originalPrice} onChange={e => setFormData({...formData, originalPrice: e.target.value})} />
                    </div>
                    <div className="bg-white p-5 rounded-[24px] shadow-sm">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Sell Price</label>
                      <input required type="number" className="w-full bg-transparent border-none p-0 font-black text-xl text-[#600B14] outline-none" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Min Selling</label>
                      <input required type="number" className="w-full bg-white border-2 border-transparent rounded-[20px] px-5 py-4 font-bold text-gray-900 focus:border-[#FF5200] outline-none transition-all" value={formData.minSellPrice} onChange={e => setFormData({...formData, minSellPrice: e.target.value})} />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Max Discount</label>
                      <input required type="number" className="w-full bg-white border-2 border-transparent rounded-[20px] px-5 py-4 font-bold text-gray-900 focus:border-[#FF5200] outline-none transition-all" value={formData.maxDiscount} onChange={e => setFormData({...formData, maxDiscount: e.target.value})} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Assets & Meta */}
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-xs font-black">3</div>
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Marketing</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="relative group aspect-square bg-gray-50 rounded-[30px] border-2 border-dashed border-gray-200 overflow-hidden hover:border-[#600B14] transition-all">
                    {formData.image ? (
                      <img src={formData.image} alt="Preview" className="w-full h-full object-contain p-6" />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <Plus size={32} className="text-gray-200 group-hover:text-[#600B14] transition-colors mb-2" />
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Drop Photo</span>
                      </div>
                    )}
                    <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Category Tag</label>
                    <input type="text" placeholder="e.g. BESTSELLER" className="w-full bg-gray-50 border-2 border-gray-50 rounded-[20px] px-6 py-4 font-bold text-gray-900 focus:border-[#600B14] outline-none transition-all" value={formData.tag} onChange={e => setFormData({...formData, tag: e.target.value})} />
                  </div>
                  <button type="submit" className="w-full bg-[#600B14] text-white py-6 rounded-[24px] font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-[#600B14]/30 hover:scale-[1.03] active:scale-[0.97] transition-all">
                    Save to Secret Database
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* Database Table */}
        <div className="bg-white rounded-[50px] border border-gray-100 shadow-2xl overflow-hidden animate-fade-in-up">
          {loading ? (
            <div className="p-32 text-center">
              <div className="w-16 h-16 border-4 border-gray-100 border-t-[#600B14] rounded-full animate-spin mx-auto mb-6"></div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Accessing Encrypted Data...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="p-32 text-center text-gray-300">
              <Calculator size={48} className="mx-auto mb-4 opacity-10" />
              <p className="text-sm font-black uppercase tracking-widest">No Records Found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-8 py-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">Product / Code</th>
                    <th className="px-8 py-8 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Cost (CP)</th>
                    <th className="px-8 py-8 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">MRP / Sell</th>
                    <th className="px-8 py-8 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Live Profit</th>
                    <th className="px-8 py-8 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">In Stock</th>
                    <th className="px-8 py-8 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {products.map((product) => {
                    const profit = product.price - product.costPrice;
                    const isLowStock = product.stock < 20;
                    return (
                      <tr key={product.id} className="hover:bg-gray-50/40 transition-colors group">
                        <td className="px-8 py-8">
                          <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-gray-50 rounded-[20px] p-2 flex items-center justify-center border border-gray-100 overflow-hidden">
                              <img src={product.image} className="w-full h-full object-contain" />
                            </div>
                            <div>
                              <p className="font-black text-gray-900 text-lg tracking-tighter leading-tight mb-1">{product.name}</p>
                              <p className="text-[10px] font-black text-[#600B14] uppercase tracking-widest bg-[#600B14]/5 inline-block px-3 py-1 rounded-full">{product.productCode}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-8 text-center">
                          <span className="font-black text-gray-900 text-lg">₹{product.costPrice}</span>
                        </td>
                        <td className="px-8 py-8 text-center">
                          <div className="flex flex-col items-center">
                            <span className="text-[10px] font-black text-gray-300 line-through">₹{product.originalPrice}</span>
                            <span className="font-black text-gray-900 text-lg">₹{product.price}</span>
                          </div>
                        </td>
                        <td className="px-8 py-8 text-center">
                          <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-[16px] font-black text-xs ${
                            profit >= 40 ? 'bg-green-100 text-green-600' : 
                            profit >= 20 ? 'bg-yellow-100 text-yellow-600' : 
                            'bg-red-100 text-red-600'
                          }`}>
                            <TrendingUp size={14} />
                            ₹{profit}
                          </div>
                        </td>
                        <td className="px-8 py-8 text-center">
                          <div className="flex flex-col items-center">
                            <span className={`text-xl font-black ${isLowStock ? 'text-red-500' : 'text-gray-900'}`}>{product.stock}</span>
                            {isLowStock && (
                              <span className="text-[8px] font-black text-red-500 uppercase tracking-widest mt-1.5 animate-pulse bg-red-50 px-2 py-0.5 rounded-full">Low Stock</span>
                            )}
                          </div>
                        </td>
                        <td className="px-8 py-8 text-right">
                          <button onClick={() => handleDelete(product.id)} className="text-gray-200 hover:text-red-500 hover:bg-red-50 w-12 h-12 rounded-2xl flex items-center justify-center transition-all">
                            <Trash2 size={20} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
