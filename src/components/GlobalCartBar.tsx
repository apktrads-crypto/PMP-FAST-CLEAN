"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBag, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function GlobalCartBar() {
  const { items } = useCartStore();
  const pathname = usePathname();
  
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Don't show on Cart, Checkout, or Admin pages
  const hiddenRoutes = ["/cart", "/checkout", "/admin"];
  if (hiddenRoutes.some(route => pathname?.startsWith(route))) return null;
  
  if (totalItems === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-24 left-4 right-4 z-[55] md:bottom-10 md:left-auto md:right-10 md:w-96"
      >
        <Link href="/cart">
          <div className="bg-[#600B14] text-white p-5 rounded-[24px] shadow-2xl shadow-[#600B14]/40 flex items-center justify-between group overflow-hidden relative">
            {/* Animated Glow Detail */}
            <motion.div 
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-1/2 skew-x-12"
            />
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <ShoppingBag size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/60">{totalItems} Item{totalItems > 1 ? 's' : ''} added</p>
                <p className="text-xl font-black tracking-tighter">₹{totalPrice}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl group-hover:bg-white/30 transition-all relative z-10">
              <span className="text-[10px] font-black uppercase tracking-widest">View Cart</span>
              <ChevronRight size={14} />
            </div>
          </div>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}
