"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { Plus, Trash2, Receipt, TrendingDown, DollarSign, Calendar } from "lucide-react";

export default function AdminExpenses() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "Misc",
    description: "",
    date: new Date().toISOString().split('T')[0],
  });

  const fetchExpenses = async () => {
    try {
      const res = await fetch("/api/admin/expenses");
      const data = await res.json();
      setExpenses(data.expenses || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setShowForm(false);
        setFormData({ title: "", amount: "", category: "Misc", description: "", date: new Date().toISOString().split('T')[0] });
        fetchExpenses();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this expense?")) return;
    try {
      await fetch(`/api/admin/expenses?id=${id}`, { method: "DELETE" });
      fetchExpenses();
    } catch (err) {
      console.error(err);
    }
  };

  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="bg-[#F9FAFB] min-h-screen p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tighter flex items-center gap-3">
              <Receipt className="text-[#600B14]" /> BUSINESS EXPENSES
            </h1>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-1">Track every rupee spent</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-white p-4 px-6 rounded-[24px] shadow-sm border border-gray-100 hidden md:block">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Monthly Spend</p>
              <p className="text-xl font-black text-red-500 tracking-tighter">₹{totalExpenses.toLocaleString()}</p>
            </div>
            <button 
              onClick={() => setShowForm(!showForm)}
              className="bg-gray-900 text-white px-8 py-4 rounded-[20px] font-black text-xs uppercase tracking-widest shadow-xl shadow-black/10 hover:scale-105 transition-all flex items-center gap-2"
            >
              {showForm ? "Cancel" : <><Plus size={16} /> Add Expense</>}
            </button>
          </div>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-2xl mb-12 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Expense Title</label>
                  <input required type="text" placeholder="Rent, Electricity, Tea..." className="w-full bg-gray-50 border-2 border-transparent rounded-[20px] px-6 py-4 font-bold text-gray-900 focus:border-[#600B14] outline-none transition-all" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Amount (₹)</label>
                    <input required type="number" className="w-full bg-gray-50 border-2 border-transparent rounded-[20px] px-6 py-4 font-bold text-gray-900 focus:border-[#600B14] outline-none transition-all" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Category</label>
                    <select className="w-full bg-gray-50 border-2 border-transparent rounded-[20px] px-6 py-4 font-bold text-gray-900 focus:border-[#600B14] outline-none transition-all appearance-none" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                      <option>Rent</option>
                      <option>Salary</option>
                      <option>Utility</option>
                      <option>Stock Purchase</option>
                      <option>Misc</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Date</label>
                  <input required type="date" className="w-full bg-gray-50 border-2 border-transparent rounded-[20px] px-6 py-4 font-bold text-gray-900 focus:border-[#600B14] outline-none transition-all" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Notes (Optional)</label>
                  <input type="text" className="w-full bg-gray-50 border-2 border-transparent rounded-[20px] px-6 py-4 font-bold text-gray-900 focus:border-[#600B14] outline-none transition-all" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                </div>
                <button type="submit" className="w-full bg-[#600B14] text-white py-5 rounded-[20px] font-black text-xs uppercase tracking-widest shadow-xl shadow-[#600B14]/20 hover:scale-[1.02] transition-all">
                  Record Expense
                </button>
              </div>
            </div>
          </form>
        )}

        <div className="bg-white rounded-[40px] border border-gray-100 shadow-2xl overflow-hidden">
          {loading ? (
            <div className="p-20 text-center animate-pulse text-gray-300 font-black uppercase tracking-widest">Loading Records...</div>
          ) : expenses.length === 0 ? (
            <div className="p-20 text-center text-gray-300">
              <TrendingDown size={48} className="mx-auto mb-4 opacity-10" />
              <p className="font-black uppercase tracking-widest">No Expenses Recorded</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date / Category</th>
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Title</th>
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Amount</th>
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {expenses.map((exp) => (
                    <tr key={exp.id} className="hover:bg-gray-50/30 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-xs font-black text-gray-900 flex items-center gap-1">
                            <Calendar size={12} className="text-[#600B14]" />
                            {new Date(exp.date).toLocaleDateString()}
                          </span>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{exp.category}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <p className="font-black text-gray-900">{exp.title}</p>
                        {exp.description && <p className="text-[10px] text-gray-400 font-medium">{exp.description}</p>}
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className="font-black text-red-500 text-lg">₹{exp.amount.toLocaleString()}</span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button onClick={() => handleDelete(exp.id)} className="text-gray-200 hover:text-red-500 p-2 transition-colors">
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
    </div>
  );
}
