"use client";

import { useCartStore } from "@/store/cartStore";
import { ArrowLeft, Trash2, Plus, Minus, CreditCard } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const total = getTotal();

  return (
    <main className="container pb-24 min-h-screen">
      <header className="flex justify-between items-center py-4 sticky top-0 bg-background z-40">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 rounded-full bg-surface shadow-sm text-text">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-bold">Your Cart</h1>
        </div>
        <ThemeToggle />
      </header>

      {items.length === 0 ? (
        <div className="mt-20 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center text-muted mb-4 shadow-sm">
            <ShoppingBagIcon />
          </div>
          <h2 className="text-lg font-bold">Your cart is empty</h2>
          <p className="text-muted text-sm mt-2 max-w-xs">Looks like you haven't added any premium cleaning products yet.</p>
          <Link href="/products" className="mt-8 bg-primary text-white font-bold px-6 py-3 rounded-md shadow-sm">
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          <div className="lg:grid lg:grid-cols-3 lg:gap-8 items-start">
          <div className="mt-4 flex flex-col gap-4 lg:col-span-2 lg:mt-0">
            {items.map((item) => (
              <div key={item.id} className="bg-surface rounded-md shadow-sm border p-4 flex gap-4" style={{ borderColor: "var(--border)" }}>
                <div className="relative w-20 aspect-square rounded-md overflow-hidden bg-blue-50/50 dark:bg-blue-900/10 flex-shrink-0 flex items-center justify-center p-1 border border-border/50">
                  <Image src={item.image || "/product-1.png"} alt={item.name} width={80} height={80} className="w-full h-full object-contain" sizes="80px" />
                </div>
                
                <div className="flex flex-col justify-between flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-bold line-clamp-2 pr-4">{item.name}</h3>
                    <button onClick={() => removeItem(item.id)} className="text-muted hover:text-red-500">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold">₹{item.price * item.quantity}</span>
                    
                    <div className="flex items-center gap-3 bg-background border border-border rounded-md px-2 py-1">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-primary"><Minus size={14} /></button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-primary"><Plus size={14} /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 lg:mt-0 bg-surface border border-border rounded-md p-4 shadow-sm lg:sticky lg:top-24">
            <h3 className="font-bold mb-4">Bill Details</h3>
            <div className="flex justify-between text-sm mb-2 text-muted">
              <span>Item Total</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between text-sm mb-2 text-muted">
              <span>Delivery Fee</span>
              <span className="text-green-600">FREE</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-border">
              <span>To Pay</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>

          <div className="fixed bottom-0 left-0 right-0 p-4 bg-surface border-t border-border z-50 shadow-float">
            <div className="container flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-muted font-bold">TOTAL</span>
                <span className="text-xl font-bold">₹{total}</span>
              </div>
              <Link href="/checkout" className="bg-primary text-white font-bold px-8 py-3 rounded-md shadow-md flex items-center gap-2">
                Checkout <CreditCard size={18} />
              </Link>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

function ShoppingBagIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
