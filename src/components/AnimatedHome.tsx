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
    <main className="min-h-screen bg-[#FFF9F0] pb-24">
      <div className="container py-6">
        
        {/* ── HORIZONTAL CATEGORY BAR ───────────────────────────── */}
        <section className="mb-8 overflow-hidden">
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-[#282C3F] font-black text-xl tracking-tight">Shop by Category</h2>
            <Link href="/products" className="text-[#FF5200] text-xs font-black uppercase tracking-widest hover:opacity-80 transition-opacity">
              See All
            </Link>
          </div>
          <div className="flex overflow-x-auto gap-5 pb-4 no-scrollbar -mx-5 px-5">
            {CATEGORIES.map((cat) => (
              <button 
                key={cat.id} 
                onClick={() => setActiveCat(cat.id)}
                className="flex flex-col items-center group"
              >
                <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center text-3xl transition-all duration-300 border-2 ${activeCat === cat.id ? "bg-white border-[#FF5200] shadow-lg shadow-[#FF5200]/10 scale-105" : "bg-white border-[#F1E5D1] opacity-60 group-hover:opacity-100 group-hover:border-[#FF5200]/30"}`}>
                  {cat.emoji}
                </div>
                <span className={`mt-2.5 text-[11px] font-bold tracking-tight transition-colors ${activeCat === cat.id ? "text-[#282C3F]" : "text-[#7E818C]"}`}>
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* ── PROMO BANNERS ─────────────────────────────────────── */}
        <section className="mb-10">
          <div className="flex gap-5 overflow-x-auto pb-4 no-scrollbar -mx-5 px-5 snap-x">
            {BANNERS.map((banner) => (
              <div 
                key={banner.id}
                className="min-w-[300px] h-[180px] rounded-[40px] p-8 flex flex-col justify-center relative overflow-hidden snap-center shadow-md border border-white/20"
                style={{ backgroundColor: banner.color }}
              >
                <div className="relative z-10">
                  <span className="bg-[#600B14] text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest mb-3 inline-block">
                    Limited Offer
                  </span>
                  <h3 className="text-[#282C3F] font-black text-2xl leading-tight mb-1">{banner.title}</h3>
                  <p className="text-[#686B78] text-[13px] font-bold opacity-80">{banner.sub}</p>
                  <button className="mt-5 bg-white text-[#282C3F] px-5 py-2 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-sm hover:scale-105 transition-transform">
                    Explore Now
                  </button>
                </div>
                {/* Decorative CSS shapes for pro feel */}
                <div 
                  className="w-48 h-48 rounded-full blur-3xl absolute -right-10 -bottom-10 opacity-40 mix-blend-multiply"
                  style={{ backgroundColor: banner.accent }}
                />
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-xl" />
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURED PRODUCTS ─────────────────────────────────── */}
        <section className="mb-12">
          <div className="flex items-end justify-between mb-8 px-1">
            <div>
              <h2 className="text-[#282C3F] font-black text-2xl tracking-tight">Best Sellers</h2>
              <div className="flex items-center gap-2 mt-1.5">
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map(i => <Star key={i} size={12} className="text-[#FF5200] fill-[#FF5200]" />)}
                </div>
                <span className="text-[#686B78] text-[11px] font-bold uppercase tracking-widest opacity-60">Trusted by 50k+ Homes</span>
              </div>
            </div>
            <Link href="/products" className="bg-white w-12 h-12 rounded-2xl border border-[#F1E5D1] flex items-center justify-center shadow-sm hover:border-[#FF5200] transition-colors">
              <ChevronRight size={20} className="text-[#282C3F]" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* ── FOOTER-ISH BANNER ─────────────────────────────────── */}
        <section className="mt-8 bg-[#600B14] rounded-[48px] p-10 shadow-2xl relative overflow-hidden group">
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mb-6 border border-white/20 group-hover:scale-110 transition-transform duration-500">
              <Plus size={32} className="text-white" />
            </div>
            <h3 className="text-white font-black text-3xl mb-3 tracking-tight">PMP Fast Clean</h3>
            <p className="text-white/70 text-sm font-bold max-w-[240px] leading-relaxed mb-8">
              Join India's fastest growing community for smart cleaning.
            </p>
            <button className="bg-[#FF5200] text-white px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-[#FF5200]/20 hover:bg-white hover:text-[#600B14] transition-all">
              Become a Member
            </button>
          </div>
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-[#FF5200]/20 rounded-full blur-3xl" />
        </section>
      </div>
    </main>
  );
}
