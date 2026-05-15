"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, MapPin, User, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { usePathname } from "next/navigation";

export default function TopNav() {
  const pathname = usePathname();
  const cartCount = useCartStore((s) => s.items.reduce((a, i) => a + i.quantity, 0));
  const [address, setAddress] = useState("Detecting Location...");

  useEffect(() => {
    const saved = localStorage.getItem("userLocation");
    if (saved) {
      setAddress(saved.includes(",") ? "Current Location" : saved);
    } else {
      setAddress("Set Location");
    }
  }, []);

  const detectLocation = () => {
    setAddress("Locating...");
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          // In a real app, we would use reverse geocoding (e.g., Google Maps API)
          // For now, we simulate a successful detection
          setTimeout(() => {
            setAddress(`Current Location (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`);
          }, 1000);
        },
        () => {
          setAddress("Location Denied");
          alert("Please enable location access to find your address.");
        }
      );
    }
  };

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-[60] bg-white border-b border-gray-50">
      <div className="container flex items-center justify-between h-24 md:h-28">
        {/* Left: Location Focus */}
        <div className="flex items-center gap-4 flex-1">
          <Link href="/" className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter leading-none text-[#600B14]">PMP</span>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Clean</span>
          </Link>
          
          <div className="flex items-center gap-3 pl-6 border-l border-gray-100 h-12 ml-2">
            <div className="bg-[#600B14] p-2 rounded-xl text-white shadow-lg shadow-[#600B14]/20">
              <MapPin size={18} />
            </div>
            <div className="flex flex-col cursor-pointer" onClick={detectLocation}>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black text-gray-900 leading-none truncate max-w-[120px] md:max-w-[200px]">{address}</span>
                <ChevronDown size={14} className="text-[#600B14]" />
              </div>
              <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest mt-1">Change</span>
            </div>
          </div>
        </div>

        {/* Center: Search (Desktop) */}
        <div className="hidden lg:flex flex-1 max-w-md mx-8 relative">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
           <input 
             type="text" 
             placeholder="Search for cleaners, soaps..." 
             className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-12 py-3.5 font-bold text-sm focus:border-[#600B14] focus:bg-white outline-none transition-all" 
           />
        </div>

        {/* Right: Cart/Profile */}
        <div className="flex items-center gap-4">
          <button className="lg:hidden p-3 bg-gray-50 rounded-xl text-gray-500">
            <Search size={20} />
          </button>
          
          <Link href="/cart" className="relative group">
            <div className="bg-gray-900 text-white px-6 py-3.5 rounded-2xl flex items-center gap-3 shadow-xl shadow-black/10 hover:scale-[1.05] active:scale-[0.95] transition-all">
              <ShoppingCart size={18} />
              <span className="text-xs font-black uppercase tracking-widest hidden md:inline">Cart</span>
              {cartCount > 0 && (
                <span className="bg-[#FF5200] text-white w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black">
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
