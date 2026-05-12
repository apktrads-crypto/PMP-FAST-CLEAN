"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const total = getTotal();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "COD",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [qrUrl, setQrUrl] = useState("/qr-placeholder.png");

  useEffect(() => {
    fetch("/api/admin/settings")
      .then(res => res.json())
      .then(data => {
        if (data.qrCodeUrl) setQrUrl(data.qrCodeUrl);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formData.name,
          customerPhone: formData.phone,
          address: formData.address,
          paymentMethod: formData.paymentMethod,
          items: items.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price
          })),
          totalAmount: total,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        clearCart();
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error placing order.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="container min-h-screen flex flex-col items-center justify-center text-center">
        <CheckCircle2 size={64} className="text-secondary mb-4" />
        <h1 className="text-2xl font-bold">Order Placed!</h1>
        <p className="text-muted mt-2">Thank you for your purchase.</p>
        <p className="text-sm mt-4 text-primary font-medium">Redirecting to home...</p>
      </main>
    );
  }

  return (
    <main className="container pb-40 min-h-screen">
      <header className="flex justify-between items-center py-4 sticky top-0 bg-background z-40">
        <div className="flex items-center gap-3">
          <Link href="/cart" className="p-2 rounded-full bg-surface shadow-sm text-text">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-bold">Checkout</h1>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="mt-8 lg:grid lg:grid-cols-3 lg:gap-12 items-start">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <section className="bg-surface p-6 sm:p-8 rounded-2xl shadow-sm border border-border">
            <h2 className="font-bold mb-6 text-xl flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">1</span>
              Delivery Details
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="text-sm font-semibold text-text mb-1.5 block">Full Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-semibold text-text mb-1.5 block">Phone Number</label>
                <input 
                  required
                  type="tel" 
                  placeholder="+91 98765 43210"
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-semibold text-text mb-1.5 block">Complete Address</label>
                <textarea 
                  required
                  placeholder="House/Flat No., Building Name, Street, Landmark, City, Pincode"
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all min-h-[120px] resize-y"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>
            </div>
          </section>

          <section className="bg-surface p-6 sm:p-8 rounded-2xl shadow-sm border border-border">
            <h2 className="font-bold mb-6 text-xl flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">2</span>
              Payment Method
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { id: "COD", label: "Cash on Delivery", icon: "💵" },
                { id: "PAYTM", label: "Paytm UPI", icon: "📱" },
                { id: "PHONEPE", label: "PhonePe", icon: "💳" }
              ].map(method => (
                <label key={method.id} className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.paymentMethod === method.id ? "border-primary bg-primary/5 shadow-sm" : "border-border bg-background hover:border-primary/30"}`}>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value={method.id} 
                    checked={formData.paymentMethod === method.id}
                    onChange={() => setFormData({...formData, paymentMethod: method.id})}
                    className="sr-only"
                  />
                  <span className="text-3xl">{method.icon}</span>
                  <span className="font-semibold text-sm text-center">{method.label}</span>
                </label>
              ))}
            </div>
            
            {formData.paymentMethod !== "COD" && (
              <div className="mt-6 flex flex-col items-center gap-4 p-6 bg-white dark:bg-slate-900 rounded-xl border-2 border-primary/20 shadow-inner">
                <p className="text-sm font-bold text-center text-primary">Scan to Pay via UPI</p>
                <div className="relative w-48 h-48 bg-white p-2 rounded-lg shadow-md border border-border">
                  <img src={qrUrl} alt="Payment QR Code" className="w-full h-full object-contain" />
                </div>
                <div className="text-[10px] text-muted text-center max-w-[200px]">
                  After scanning and paying, click "Place Order" to confirm your booking.
                </div>
              </div>
            )}
          </section>
        </div>

        <div className="lg:col-span-1 mt-8 lg:mt-0 lg:sticky lg:top-24 bg-surface p-6 sm:p-8 rounded-2xl shadow-sm border border-border">
          <h2 className="font-bold mb-6 text-xl border-b border-border pb-4">Order Summary</h2>
          
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex justify-between items-center text-muted text-sm">
              <span>Items ({items.length})</span>
              <span className="font-semibold text-text">₹{total}</span>
            </div>
            <div className="flex justify-between items-center text-muted text-sm">
              <span>Delivery</span>
              <span className="font-bold text-accent">FREE</span>
            </div>
            <div className="flex justify-between items-center text-muted text-sm border-b border-border pb-4">
              <span>Taxes</span>
              <span className="font-semibold text-text">₹0</span>
            </div>
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total to Pay</span>
              <span className="text-primary text-2xl">₹{total}</span>
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={loading || items.length === 0}
            className="w-full bg-primary text-white font-bold text-lg px-8 py-4 rounded-xl shadow-md disabled:opacity-50 hover:bg-primary-hover hover:shadow-lg transition-all flex justify-center items-center gap-2"
          >
            {loading ? "Processing..." : `Place Order`}
          </button>
          <p className="text-center text-xs text-muted mt-4">Safe & Secure Payments.</p>
        </div>
      </form>
    </main>
  );
}
