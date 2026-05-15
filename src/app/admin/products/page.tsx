"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    image: "",
    tag: "",
    features: "",
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
        }),
      });
      if (res.ok) {
        setShowForm(false);
        setFormData({ name: "", description: "", price: "", originalPrice: "", image: "", tag: "", features: "" });
        fetchProducts();
      } else {
        alert("Failed to add product");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tighter">Inventory</h1>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mt-1">Manage PMP Products</p>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-[#600B14] text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-[#600B14]/20 flex items-center gap-2 hover:scale-105 transition-all"
          >
            {showForm ? "Cancel" : <><Plus size={16} /> Add New Product</>}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-2xl mb-12 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Product Name</label>
                  <input required type="text" className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-5 py-4 font-bold text-gray-900 focus:border-[#600B14] outline-none transition-all" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Price (₹)</label>
                    <input required type="number" className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-5 py-4 font-bold text-gray-900 focus:border-[#600B14] outline-none transition-all" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Original (MRP)</label>
                    <input type="number" className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-5 py-4 font-bold text-gray-900 focus:border-[#600B14] outline-none transition-all" value={formData.originalPrice} onChange={e => setFormData({...formData, originalPrice: e.target.value})} />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Description</label>
                  <textarea required rows={4} className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-5 py-4 font-bold text-gray-900 focus:border-[#600B14] outline-none transition-all" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Product Image</label>
                  <div className="relative group">
                    <div className="w-full h-48 bg-gray-50 border-2 border-dashed border-gray-200 rounded-[32px] flex flex-col items-center justify-center overflow-hidden transition-all group-hover:border-[#600B14]">
                      {formData.image ? (
                        <img src={formData.image} alt="Preview" className="w-full h-full object-contain p-4" />
                      ) : (
                        <>
                          <div className="bg-white p-3 rounded-2xl shadow-sm mb-2">
                            <Plus size={24} className="text-[#600B14]" />
                          </div>
                          <span className="text-[10px] font-black text-gray-400">Click to Upload Photo</span>
                        </>
                      )}
                      <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Tag (e.g. HOT)</label>
                    <input type="text" className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-5 py-4 font-bold text-gray-900 focus:border-[#600B14] outline-none transition-all" value={formData.tag} onChange={e => setFormData({...formData, tag: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Category/Key</label>
                    <input type="text" placeholder="floor, kitchen..." className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-5 py-4 font-bold text-gray-900 focus:border-[#600B14] outline-none transition-all" value={formData.features} onChange={e => setFormData({...formData, features: e.target.value})} />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button type="submit" className="bg-[#600B14] text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-[#600B14]/20 hover:scale-105 transition-all">
                    Publish Product
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}

      <div className="bg-surface rounded-md border border-border shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center text-muted">No products found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-background border-b border-border">
                <tr>
                  <th className="p-4 font-bold w-16">Image</th>
                  <th className="p-4 font-bold">Name</th>
                  <th className="p-4 font-bold">Price</th>
                  <th className="p-4 font-bold">Tag</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-background/50">
                    <td className="p-4">
                      <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded-sm border" />
                    </td>
                    <td className="p-4 font-bold">{product.name}</td>
                    <td className="p-4 font-bold text-primary">₹{product.price}</td>
                    <td className="p-4">
                      {product.tag && <span className="bg-secondary/10 text-secondary px-2 py-1 rounded-sm text-xs font-bold">{product.tag}</span>}
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-md transition-colors">
                        <Trash2 size={18} />
                      </button>
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
