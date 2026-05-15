"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, MapPin, ChevronRight, Star, Plus } from "lucide-react";
import ProductCard, { Product } from "@/components/ProductCard";

const CATEGORIES = [
  { id: "all",     name: "All",         emoji: "🛍️", active: true },
  { id: "floor",   name: "Floor Clean", emoji: "🧹" },
  { id: "toilet",  name: "Toilet",      emoji: "🚿" },
  { id: "kitchen", name: "Kitchen",     emoji: "🍽️" },
  { id: "glass",   name: "Glass",       emoji: "🪟" },
  { id: "laundry", name: "Laundry",     emoji: "👕" },
];

const BANNERS = [
  { id: 1, title: "Fasting Picks", sub: "Clean with PMP", color: "#FFF3E0", accent: "#FFB74D" },
  { id: 2, title: "50% Off", sub: "Cleaning Kits", color: "#E1F5FE", accent: "#4FC3F7" },
];

export default function AnimatedHome({ products }: { products: Product[] }) {
  const [activeCat, setActiveCat] = useState("all");

  return (
    <main className="bg-[#FFF9F0] min-h-screen">
      <div className="container py-4">
        
        {/* ── HORIZONTAL CATEGORY BAR ───────────────────────────── */}
        <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar -mx-4 px-4 sticky top-0 bg-[#FFF9F0] z-10 py-2 border-b border-[#F1E5D1]">
          {CATEGORIES.map((cat) => (
            <button 
              key={cat.id} 
              onClick={() => setActiveCat(cat.id)}
              className={`flex flex-col items-center gap-1 min-w-[70px] transition-all ${activeCat === cat.id ? "scale-105" : "opacity-70"}`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm border ${activeCat === cat.id ? "bg-[#F7EEDD] border-[#FF5200]" : "bg-white border-[#F1E5D1]"}`}>
                {cat.emoji}
              </div>
              <span className={`text-[11px] font-bold ${activeCat === cat.id ? "text-[#282C3F]" : "text-[#686B78]"}`}>
                {cat.name}
              </span>
              {activeCat === cat.id && <div className="w-6 h-0.5 bg-[#FF5200] rounded-full" />}
            </button>
          ))}
        </div>

        {/* ── PROMO BANNERS ─────────────────────────────────────── */}
        <div className="flex gap-4 overflow-x-auto py-6 no-scrollbar -mx-4 px-4">
          {BANNERS.map((banner) => (
            <div 
              key={banner.id}
              className="min-w-[280px] h-[160px] rounded-[32px] p-6 flex justify-between items-center relative overflow-hidden"
              style={{ backgroundColor: banner.color }}
            >
              <div className="relative z-10">
                <h3 className="text-[#282C3F] font-black text-xl leading-tight">{banner.title}</h3>
                <p className="text-[#686B78] text-xs mt-1 font-bold">{banner.sub}</p>
                <button className="mt-4 bg-[#600B14] text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">
                  Shop Now
                </button>
              </div>
              <div 
                className="w-32 h-32 rounded-full blur-2xl absolute -right-8 -bottom-8 opacity-50"
                style={{ backgroundColor: banner.accent }}
              />
            </div>
          ))}
        </div>

        {/* ── FEATURED PRODUCTS ─────────────────────────────────── */}
        <section className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-[#282C3F] font-black text-xl">Top Picks for You</h2>
              <div className="flex items-center gap-1 text-[#686B78] text-xs font-bold">
                <Star size={12} className="text-[#FF5200] fill-[#FF5200]" />
                <span>Bestselling Cleaners</span>
              </div>
            </div>
            <Link href="/products" className="bg-white p-2 rounded-full border border-[#F1E5D1] shadow-sm">
              <ChevronRight size={18} className="text-[#282C3F]" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* ── STORE BANNER ──────────────────────────────────────── */}
        <div className="mt-10 bg-white border border-[#F1E5D1] rounded-[32px] p-6 shadow-sm overflow-hidden relative">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-[#FF5200] p-3 rounded-2xl text-white">
              <Plus size={24} />
            </div>
            <div>
              <h3 className="font-black text-2xl text-[#282C3F]">PMP Store</h3>
              <p className="text-[#686B78] text-xs font-bold italic">Clean homes, happy lives.</p>
            </div>
          </div>
          <p className="text-[#282C3F] text-sm font-medium leading-relaxed max-w-[200px]">
            Explore our full range of premium cleaning solutions.
          </p>
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-[#FDECEC] rounded-full -z-1" />
        </div>
      </div>
    </main>
  );
}
