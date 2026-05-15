"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, ShoppingBag, Bell } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const NAV = [
  { href: "/",             label: "PMP",      Icon: Home },
  { href: "/products",     label: "Products", Icon: Package },
  { href: "/cart",         label: "Cart",     Icon: ShoppingBag },
  { href: "/notifications",label: "Alerts",   Icon: Bell },
];

export default function BottomNavigation() {
  const pathname = usePathname();
  const cartCount = useCartStore((s) => s.items.length);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#F1E5D1] flex pb-[env(safe-area-inset-bottom)] md:hidden">
      {NAV.map(({ href, label, Icon }) => {
        const active = pathname === href;
        return (
          <Link key={href} href={href} className="flex-1 flex flex-col items-center justify-center py-2.5 gap-1 relative">
            <div className="relative">
              <Icon
                size={22}
                strokeWidth={active ? 2.5 : 1.8}
                className={active ? "text-[#FF5200]" : "text-[#686B78]"}
              />
              {label === "Cart" && cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#FF5200] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className={`text-[10px] font-semibold tracking-wide ${active ? "text-[#282C3F]" : "text-[#7E818C]"}`}>
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
