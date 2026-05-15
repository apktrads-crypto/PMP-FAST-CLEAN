"use client";

import Link from "next/link";
import { Search, MapPin, User, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { usePathname } from "next/navigation";

export default function TopNav() {
  const pathname = usePathname();
  const cartCount = useCartStore((s) => s.items.reduce((a, i) => a + i.quantity, 0));
  const [address, setAddress] = useState("Detecting Location...");

  useEffect(() => {
    // Initial default or saved address
    setAddress("Phase 3, City Center");
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
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="container flex items-center justify-between h-20 md:h-24">
        {/* Left: Location/Brand */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex flex-col group">
            <span className="text-2xl font-black tracking-tighter leading-none text-gray-900">
              PMP <span className="text-[#600B14] group-hover:text-[#FF5200] transition-colors">CLEAN</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-3 pl-6 border-l border-gray-100 h-10">
            <div className="bg-[#600B14]/5 p-2 rounded-xl text-[#600B14]">
              <MapPin size={18} />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-70 transition-opacity" onClick={detectLocation}>
                <span className="text-sm font-black text-gray-900 leading-none">{address}</span>
                <ChevronDown size={14} className="text-[#FF5200]" />
              </div>
              <button 
                onClick={detectLocation}
                className="text-[9px] font-black text-[#FF5200] uppercase tracking-widest mt-1 hover:underline text-left"
              >
                Detect My Location
              </button>
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
