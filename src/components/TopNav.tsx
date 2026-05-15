"use client";

import Link from "next/link";
import { Search, MapPin, User, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { usePathname } from "next/navigation";

export default function TopNav() {
  const pathname = usePathname();
  const cartCount = useCartStore((s) => s.items.reduce((a, i) => a + i.quantity, 0));

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="container flex items-center justify-between h-20 md:h-24">
        {/* Left: Location/Brand */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter leading-none text-gray-900">
              PMP <span className="text-[#600B14]">CLEAN</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-2 pl-6 border-l border-gray-100 h-10">
            <MapPin size={18} className="text-[#600B14]" />
            <div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-gray-900">Phase 3, City Center</span>
                <ChevronDown size={14} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Center/Right: Actions */}
        <div className="flex items-center gap-4 md:gap-8">
          <button className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors">
            <Search size={20} />
            <span className="hidden lg:inline">Search</span>
          </button>
          
          <Link href="/cart" className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors relative">
            <div className="bg-gray-100 p-2.5 rounded-full">
              <User size={20} />
            </div>
            <span className="hidden lg:inline">Profile</span>
          </Link>

          <Link href="/cart" className="relative group">
            <div className="bg-[#600B14] text-white px-5 py-2.5 rounded-xl flex items-center gap-3 shadow-lg shadow-[#600B14]/10 group-hover:scale-105 transition-all">
              <span className="text-xs font-black uppercase tracking-widest">Cart</span>
              {cartCount > 0 && (
                <span className="bg-white text-[#600B14] w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
