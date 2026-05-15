"use client";

import Link from "next/link";
import { ShoppingBag, MapPin, User, Search, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { usePathname } from "next/navigation";

export default function TopNav() {
  const pathname = usePathname();
  const cartCount = useCartStore((s) => s.items.reduce((a, i) => a + i.quantity, 0));

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-50 bg-[#FFF9F0]/80 backdrop-blur-xl border-b border-[#F1E5D1]">
      <div className="container py-4">
        {/* Top Row: Brand & Profile */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="bg-[#600B14] w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#600B14]/20">
              <MapPin size={22} />
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="font-black text-[#282C3F] text-xl leading-none">Home</span>
                <ChevronDown size={16} className="text-[#FF5200]" />
              </div>
              <p className="text-[#686B78] text-[11px] font-bold tracking-tight uppercase opacity-70">
                PMP Fast Clean • Phase 3, City Center
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="bg-white p-2.5 rounded-2xl border border-[#F1E5D1] shadow-sm hover:border-[#FF5200] transition-colors">
              <Search size={20} className="text-[#282C3F]" />
            </button>
            <button className="bg-white p-2.5 rounded-2xl border border-[#F1E5D1] shadow-sm">
              <User size={20} className="text-[#282C3F]" />
            </button>
          </div>
        </div>

        {/* Search Bar (Static placeholder for pro feel) */}
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ADB1B7] group-focus-within:text-[#FF5200] transition-colors">
            <Search size={18} strokeWidth={2.5} />
          </div>
          <input 
            type="text" 
            placeholder="Search for cleaners, gels, sprays..." 
            className="w-full bg-white border-2 border-[#F1E5D1] focus:border-[#FF5200] rounded-[20px] py-3.5 pl-12 pr-4 text-sm font-bold text-[#282C3F] placeholder:text-[#ADB1B7] outline-none transition-all shadow-sm"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <div className="h-4 w-[2px] bg-[#F1E5D1]" />
            <div className="w-2 h-2 rounded-full bg-[#FF5200] animate-pulse" />
          </div>
        </div>
      </div>
    </header>
  );
}
