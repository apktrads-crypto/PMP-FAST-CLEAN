"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, ShoppingBag, Bell } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const NAV = [
  { href: "/",             label: "Home",     Icon: Home },
  { href: "/products",     label: "Products", Icon: Package },
  { href: "/cart",         label: "Cart",     Icon: ShoppingBag },
  { href: "/notifications",label: "Alerts",   Icon: Bell },
];

export default function BottomNavigation() {
  const pathname = usePathname();
  const cartCount = useCartStore((s) => s.items.length);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      {/* Only show on mobile */}
      <style>{`@media(min-width:768px){#bottom-nav{display:none;}}`}</style>
      <nav id="bottom-nav" style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid #f3f4f6",
        display: "flex",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}>
        {NAV.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} style={{
              flex: 1, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              padding: "10px 4px", gap: 4,
              position: "relative"
            }}>
              {/* Active pill bg */}
              {active && (
                <span style={{
                  position: "absolute", top: 6, left: "50%", transform: "translateX(-50%)",
                  width: 40, height: 36, borderRadius: 12,
                  background: "#eef2ff", zIndex: 0
                }} />
              )}

              {/* Icon */}
              <span style={{ position: "relative", zIndex: 1 }}>
                <Icon
                  size={20}
                  strokeWidth={active ? 2.5 : 1.8}
                  color={active ? "#6366f1" : "#9ca3af"}
                />
                {label === "Cart" && cartCount > 0 && (
                  <span style={{
                    position: "absolute", top: -5, right: -5,
                    width: 15, height: 15, borderRadius: "50%",
                    background: "#ef4444", color: "white",
                    fontSize: 9, fontWeight: 800,
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>{cartCount}</span>
                )}
              </span>

              <span style={{
                fontSize: 10, fontWeight: active ? 700 : 500,
                color: active ? "#6366f1" : "#9ca3af",
                letterSpacing: "0.04em"
              }}>{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
