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
    image: "/product-1.png",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
        }),
      });
      if (res.ok) {
        setShowForm(false);
        setFormData({ name: "", description: "", price: "", image: "/product-1.png", tag: "", features: "" });
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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-primary text-white px-4 py-2 rounded-md font-bold text-sm flex items-center gap-2"
        >
          {showForm ? "Cancel" : <><Plus size={16} /> Add Product</>}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-surface p-6 rounded-md border border-border shadow-sm mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-muted mb-1 block">Product Name</label>
            <input required type="text" className="w-full bg-background border rounded-md px-3 py-2" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div>
            <label className="text-xs font-bold text-muted mb-1 block">Price (₹)</label>
            <input required type="number" className="w-full bg-background border rounded-md px-3 py-2" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs font-bold text-muted mb-1 block">Description</label>
            <textarea required className="w-full bg-background border rounded-md px-3 py-2" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          </div>
          <div>
            <label className="text-xs font-bold text-muted mb-1 block">Features (comma separated)</label>
            <input required type="text" placeholder="Cleans well, Smells good" className="w-full bg-background border rounded-md px-3 py-2" value={formData.features} onChange={e => setFormData({...formData, features: e.target.value})} />
          </div>
          <div>
            <label className="text-xs font-bold text-muted mb-1 block">Tag (e.g., BESTSELLER)</label>
            <input type="text" className="w-full bg-background border rounded-md px-3 py-2" value={formData.tag} onChange={e => setFormData({...formData, tag: e.target.value})} />
          </div>
          <div className="md:col-span-2 flex justify-end mt-2">
            <button type="submit" className="bg-primary text-white px-6 py-2 rounded-md font-bold">Save Product</button>
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
