"use client";

import Link from "next/link";
import { Search, ArrowRight, ShieldCheck, Zap, Leaf, ChevronRight } from "lucide-react";
import ProductCard, { Product } from "@/components/ProductCard";

const CATEGORIES = [
  { id: "floor",   name: "Floor Clean", emoji: "🧹", bg: "#eef2ff", color: "#6366f1" },
  { id: "toilet",  name: "Toilet",      emoji: "🚿", bg: "#ecfdf5", color: "#10b981" },
  { id: "kitchen", name: "Kitchen",     emoji: "🍽️", bg: "#fff7ed", color: "#f59e0b" },
  { id: "glass",   name: "Glass",       emoji: "🪟", bg: "#f0f9ff", color: "#0ea5e9" },
  { id: "laundry", name: "Laundry",     emoji: "👕", bg: "#fdf4ff", color: "#a855f7" },
];

const TRUST = [
  { icon: ShieldCheck, label: "Safe Formula",   sub: "Tested & certified" },
  { icon: Zap,          label: "Fast Action",    sub: "Works in seconds"   },
  { icon: Leaf,         label: "Eco Friendly",   sub: "Biodegradable"      },
];

export default function AnimatedHome({ products }: { products: Product[] }) {
  return (
    <main>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(135deg, #eef2ff 0%, #f0fdf4 50%, #fffbeb 100%)",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <div className="container" style={{ paddingTop: 56, paddingBottom: 64 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
            {/* Left */}
            <div>
              <div className="anim-fade-up" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#eef2ff", border: "1px solid #c7d2fe", borderRadius: 99, padding: "5px 14px", marginBottom: 24 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#6366f1", display: "inline-block", animation: "pulse 2s infinite" }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: "#6366f1", letterSpacing: "0.06em", textTransform: "uppercase" }}>New 2026 Collection</span>
              </div>

              <h1 className="font-display anim-fade-up delay-1"
                style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, lineHeight: 1.1, color: "#111827", marginBottom: 20 }}>
                Clean Smarter,<br />
                <span className="text-gradient">Live Better.</span>
              </h1>

              <p className="anim-fade-up delay-2"
                style={{ fontSize: 17, color: "#6b7280", lineHeight: 1.7, maxWidth: 420, marginBottom: 36 }}>
                India's most trusted cleaning range. Powerful formulas, gentle on your home and family.
              </p>

              <div className="anim-fade-up delay-3" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="/products">
                  <button className="btn-primary">
                    Shop Now <ArrowRight size={16} />
                  </button>
                </Link>
                <Link href="/products">
                  <button className="btn-outline">
                    View All Products
                  </button>
                </Link>
              </div>

              {/* Stats */}
              <div className="anim-fade-up delay-4"
                style={{ display: "flex", gap: 32, marginTop: 44, paddingTop: 32, borderTop: "1px solid #e5e7eb" }}>
                {[["50K+","Happy Customers"], ["4.9★","Average Rating"], ["100%","Safe & Certified"]].map(([val, lbl]) => (
                  <div key={lbl}>
                    <div className="font-display" style={{ fontSize: 24, fontWeight: 800, color: "#111827" }}>{val}</div>
                    <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Floating product */}
            <div className="anim-scale-in delay-2" style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* Decorative ring */}
              <div style={{
                position: "absolute", width: 360, height: 360, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
              }} />
              <div style={{
                position: "absolute", width: 280, height: 280, borderRadius: "50%",
                border: "1.5px dashed rgba(99,102,241,0.2)"
              }} />

              <img
                src="/product-1.png"
                alt="PMP Cleaner"
                className="anim-float"
                style={{ width: 260, height: 260, objectFit: "contain", position: "relative", zIndex: 1,
                  filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.15))" }}
              />

              {/* Floating card 1 */}
              <div className="anim-fade-up delay-4" style={{
                position: "absolute", top: 30, right: -10,
                background: "white", borderRadius: 14, padding: "10px 16px",
                boxShadow: "0 8px 30px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb",
                fontSize: 13, fontWeight: 600
              }}>
                🌟 Top Rated
              </div>
              {/* Floating card 2 */}
              <div className="anim-fade-up delay-5" style={{
                position: "absolute", bottom: 40, left: -10,
                background: "white", borderRadius: 14, padding: "10px 16px",
                boxShadow: "0 8px 30px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb",
                fontSize: 13, fontWeight: 600, color: "#10b981"
              }}>
                ✓ Eco Certified
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BADGES ──────────────────────────────────────── */}
      <div style={{ background: "#fff", borderBottom: "1px solid #f3f4f6" }}>
        <div className="container" style={{ paddingTop: 20, paddingBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap" }}>
            {TRUST.map(({ icon: Icon, label, sub }, i) => (
              <div key={label} className={`anim-fade-up delay-${i+1}`}
                style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: "#eef2ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={18} color="#6366f1" />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>{label}</div>
                  <div style={{ fontSize: 11, color: "#9ca3af" }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>

        {/* ── SEARCH ────────────────────────────────────────────── */}
        <div className="anim-fade-up" style={{ maxWidth: 560, margin: "0 auto 52px", position: "relative" }}>
          <Search size={18} style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
          <input
            className="input"
            style={{ paddingLeft: 48, fontSize: 15, borderRadius: 99, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
            placeholder="Search cleaners, gels, sprays..."
          />
        </div>

        {/* ── CATEGORIES ────────────────────────────────────────── */}
        <section style={{ marginBottom: 56 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
            <h2 className="font-display" style={{ fontSize: 22, fontWeight: 800, color: "#111827" }}>Shop by Category</h2>
            <Link href="/products" style={{ fontSize: 13, fontWeight: 600, color: "#6366f1", display: "flex", alignItems: "center", gap: 2 }}>
              See all <ChevronRight size={14} />
            </Link>
          </div>
          <div className="scroll-x" style={{ gap: 12, paddingBottom: 8 }}>
            {CATEGORIES.map((cat, i) => (
              <button key={cat.id} className={`snap-start anim-fade-up delay-${i+1}`}
                style={{
                  flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                  padding: "16px 20px", borderRadius: 18, background: cat.bg,
                  border: `1.5px solid ${cat.color}22`, minWidth: 90, cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s"
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 20px ${cat.color}22`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
              >
                <span style={{ fontSize: 28 }}>{cat.emoji}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: cat.color, whiteSpace: "nowrap" }}>{cat.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ── PRODUCTS ──────────────────────────────────────────── */}
        <section>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
            <div>
              <h2 className="font-display" style={{ fontSize: 22, fontWeight: 800, color: "#111827" }}>Featured Products</h2>
              <p style={{ fontSize: 13, color: "#9ca3af", marginTop: 4 }}>Bestsellers picked for you</p>
            </div>
            <Link href="/products" style={{ fontSize: 13, fontWeight: 600, color: "#6366f1", display: "flex", alignItems: "center", gap: 2 }}>
              View all <ChevronRight size={14} />
            </Link>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 20
          }}>
            {products.map((product, i) => (
              <div key={product.id}
                className={`anim-fade-up delay-${Math.min(i+1, 6)}`}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
