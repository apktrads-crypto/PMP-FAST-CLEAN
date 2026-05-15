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
    <header className="sticky top-0 z-50 bg-[#FFF9F0] border-b border-[#F1E5D1]">
      <div className="container py-3">
        {/* Top Row: Address & Profile */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="bg-[#600B14] p-2 rounded-xl text-white">
              <MapPin size={18} />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-[#282C3F] text-lg">Home</span>
                <ChevronDown size={14} className="text-[#FF5200]" />
              </div>
              <p className="text-[#686B78] text-xs truncate max-w-[200px]">
                Phase 3, Near City Center, PMP Cleaners...
              </p>
            </div>
          </div>
          
          <button className="bg-white p-2 rounded-full border border-[#F1E5D1] shadow-sm">
            <User size={20} className="text-[#282C3F]" />
          </button>
        </div>

        {/* Bottom Row: Search Bar */}
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search for PMP Cleaners..." 
            className="w-full bg-white border border-[#F1E5D1] rounded-2xl py-3 pl-11 pr-4 text-sm font-medium focus:outline-none focus:border-[#FF5200] shadow-sm"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#686B78]" size={18} />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 border-l border-[#F1E5D1] pl-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF5200] animate-pulse" />
          </div>
        </div>
      </div>
    </header>
  );
}
