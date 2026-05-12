"use client";

import Link from "next/link";
import { ShoppingBag, Package, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { usePathname } from "next/navigation";

export default function TopNav() {
  const pathname = usePathname();
  const cartCount = useCartStore((s) => s.items.reduce((a, i) => a + i.quantity, 0));

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "rgba(255,255,255,0.85)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      borderBottom: "1px solid #e5e7eb",
      display: "none"
    }}
      className="md-flex"
    >
      <style>{`.md-flex { display: none; } @media(min-width:768px){.md-flex{display:block;}}`}</style>

      <div className="container" style={{ height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", flexDirection: "column" }}>
          <span className="font-display" style={{ fontSize: 20, fontWeight: 900, color: "#111827", lineHeight: 1 }}>
            PMP <span style={{ color: "#6366f1" }}>Fast Clean</span>
          </span>
          <span style={{ fontSize: 10, color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase" }}>Premium Range</span>
        </Link>

        {/* Nav Links */}
        <nav style={{ display: "flex", gap: 32, fontSize: 14, fontWeight: 600 }}>
          {[{href:"/",label:"Home"},{href:"/products",label:"Products"}].map(item => (
            <Link key={item.href} href={item.href} style={{
              color: pathname === item.href ? "#6366f1" : "#374151",
              paddingBottom: 2,
              borderBottom: pathname === item.href ? "2px solid #6366f1" : "2px solid transparent",
              transition: "color 0.2s, border-color 0.2s"
            }}>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Cart */}
        <Link href="/cart">
          <button style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "9px 20px", borderRadius: 99,
            background: cartCount > 0 ? "#6366f1" : "transparent",
            border: `1.5px solid ${cartCount > 0 ? "#6366f1" : "#e5e7eb"}`,
            color: cartCount > 0 ? "white" : "#374151",
            fontWeight: 700, fontSize: 13,
            position: "relative",
            transition: "all 0.2s"
          }}>
            <ShoppingBag size={16} />
            {cartCount > 0 ? `${cartCount} item${cartCount>1?"s":""}` : "Cart"}
          </button>
        </Link>
      </div>
    </header>
  );
}
