"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tag?: string | null;
  originalPrice?: number | null;
}

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <Link href={`/product/${product.id}`} className="card" style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Image */}
      <div style={{
        background: "linear-gradient(145deg, #f8f9ff, #eef2ff)",
        position: "relative", aspectRatio: "1/1",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24, overflow: "hidden"
      }}>
        <Image
          src={product.image || "/product-1.png"}
          alt={product.name}
          width={180} height={180}
          style={{ objectFit: "contain", transition: "transform 0.35s ease", maxHeight: "100%", width: "auto" }}
          sizes="220px"
          onMouseEnter={e => ((e.target as HTMLElement).style.transform = "scale(1.08)")}
          onMouseLeave={e => ((e.target as HTMLElement).style.transform = "scale(1)")}
        />

        {/* Badges */}
        {product.tag && (
          <span style={{
            position: "absolute", top: 10, left: 10,
            background: "#6366f1", color: "white",
            fontSize: 10, fontWeight: 700, padding: "3px 8px",
            borderRadius: 99, textTransform: "uppercase", letterSpacing: "0.05em"
          }}>{product.tag}</span>
        )}
        {discount && discount > 0 && (
          <span style={{
            position: "absolute", top: 10, right: 10,
            background: "#fef2f2", color: "#ef4444",
            fontSize: 10, fontWeight: 800, padding: "3px 8px",
            borderRadius: 99, border: "1px solid #fecaca"
          }}>-{discount}%</span>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "16px 16px 14px", display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
        <h3 className="font-display" style={{
          fontSize: 14, fontWeight: 700, color: "#111827",
          lineHeight: 1.4, display: "-webkit-box",
          WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden"
        }}>
          {product.name}
        </h3>
        <p style={{
          fontSize: 12, color: "#9ca3af", lineHeight: 1.5,
          display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical", overflow: "hidden"
        }}>
          {product.description}
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 12, borderTop: "1px solid #f3f4f6" }}>
          <div>
            {product.originalPrice && (
              <span style={{ fontSize: 11, color: "#d1d5db", textDecoration: "line-through", display: "block" }}>
                ₹{product.originalPrice}
              </span>
            )}
            <span className="font-display" style={{ fontSize: 18, fontWeight: 800, color: "#6366f1" }}>
              ₹{product.price}
            </span>
          </div>

          <button onClick={handleAdd}
            style={{
              display: "flex", alignItems: "center", gap: 4,
              padding: "8px 16px", borderRadius: 99,
              background: "#6366f1", color: "white",
              fontSize: 12, fontWeight: 700,
              boxShadow: "0 4px 12px rgba(99,102,241,0.35)",
              transition: "background 0.2s, transform 0.15s, box-shadow 0.2s"
            }}
            onMouseEnter={e => { const b = e.currentTarget; b.style.background="#4f46e5"; b.style.transform="translateY(-1px)"; b.style.boxShadow="0 6px 16px rgba(99,102,241,0.45)"; }}
            onMouseLeave={e => { const b = e.currentTarget; b.style.background="#6366f1"; b.style.transform=""; b.style.boxShadow="0 4px 12px rgba(99,102,241,0.35)"; }}
            onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = "scale(0.95)"; }}
            onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = ""; }}
          >
            ADD <Plus size={14} strokeWidth={3} />
          </button>
        </div>
      </div>
    </Link>
  );
}
