"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Star, ArrowRight } from "lucide-react";
import ProductCard, { Product } from "@/components/ProductCard";

const CATEGORIES = [
  { id: "all",     name: "All Collection", emoji: "🛍️" },
  { id: "floor",   name: "Floor Care",     emoji: "🧹" },
  { id: "toilet",  name: "Hygiene",        emoji: "🚿" },
  { id: "kitchen", name: "Kitchen",        emoji: "🍽️" },
  { id: "glass",   name: "Glass",          emoji: "🪟" },
  { id: "laundry", name: "Fabric",         emoji: "👕" },
];

export default function AnimatedHome({ products }: { products: Product[] }) {
  const [activeCat, setActiveCat] = useState("all");

  return (
    <main className="bg-white">
      {/* ── HERO BANNER (CLEAN & PRO) ─────────────────────────── */}
      <section className="container py-8 md:py-12">
        <div className="relative h-[300px] md:h-[400px] w-full rounded-[40px] overflow-hidden bg-gray-900 group">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1581578731548-c64695ce6958?auto=format&fit=crop&q=80&w=2070" 
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center px-10 md:px-20">
            <span className="text-[#FF5200] font-black text-xs uppercase tracking-[0.4em] mb-4">
              Premium 2026 Edition
            </span>
            <h1 className="text-white text-4xl md:text-6xl font-black mb-6 leading-[0.9] tracking-tighter max-w-xl">
              REDEFINING <br />
              <span className="text-gray-400">CLEANLINESS.</span>
            </h1>
            <div className="flex gap-4">
              <Link href="/products" className="bg-white text-black px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#FF5200] hover:text-white transition-all shadow-xl">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container pb-24">
        {/* ── CATEGORY SECTION (PRECISE) ────────────────────────── */}
        <section className="section-spacing">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[#600B14] font-black text-[10px] uppercase tracking-[0.3em] mb-3">Essentials</p>
              <h2 className="text-4xl font-black text-gray-900">Expert Solutions.</h2>
            </div>
            <Link href="/products" className="group flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-all">
              See All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
            {CATEGORIES.map((cat) => (
              <button 
                key={cat.id} 
                onClick={() => setActiveCat(cat.id)}
                className={`flex-shrink-0 px-8 py-5 rounded-3xl border-2 transition-all duration-300 flex items-center gap-4 ${activeCat === cat.id ? "bg-[#600B14] border-[#600B14] text-white shadow-2xl shadow-[#600B14]/20 scale-105" : "bg-white border-gray-100 text-gray-500 hover:border-gray-200"}`}
              >
                <span className="text-2xl">{cat.emoji}</span>
                <span className="text-sm font-black tracking-tight">{cat.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ── PRODUCT GRID (MODULAR) ───────────────────────────── */}
        <section className="section-spacing border-t border-gray-50">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-black text-gray-900">Featured Products</h2>
            <div className="flex items-center gap-1.5 px-4 py-2 bg-gray-50 rounded-full">
              <Star size={14} className="text-[#FF5200] fill-[#FF5200]" />
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Top Rated 2026</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* ── PROMO (LUXURY FEEL) ───────────────────────────────── */}
        <section className="mt-20">
          <div className="bg-[#F9FAFB] rounded-[60px] p-12 md:p-24 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
            <div className="relative z-10 max-w-md">
              <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                Quality that <br /> speaks for itself.
              </h3>
              <p className="text-gray-500 font-bold mb-10 leading-relaxed">
                Experience the science of cleaning. Our advanced formulas are designed for those who don't compromise.
              </p>
              <button className="bg-gray-900 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#600B14] transition-all">
                Learn our story
              </button>
            </div>
            <div className="relative z-10 w-full max-w-sm aspect-square bg-white rounded-[40px] shadow-2xl p-8 flex items-center justify-center group">
              <img 
                src="/product-1.png" 
                alt="Feature" 
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute -top-4 -right-4 bg-[#FF5200] text-white w-20 h-20 rounded-full flex items-center justify-center font-black text-xs uppercase text-center leading-tight rotate-12">
                Sale <br /> Live
              </div>
            </div>
            
            {/* Background Detail */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#600B14]/5 rounded-full -mr-32 -mt-32 blur-3xl" />
          </div>
        </section>
      </div>
    </main>
  );
}
