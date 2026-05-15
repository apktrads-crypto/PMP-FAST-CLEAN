"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LogOut, Package, ShoppingCart, Settings as SettingsIcon } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const authStatus = localStorage.getItem("adminAuth");
    if (authStatus) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      if (pathname !== "/admin/login") {
        router.push("/admin/login");
      }
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin/login");
  };

  // Prevent flashing content before auth check
  if (isAuthenticated === null) return null;

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar for Desktop, Topbar for Mobile */}
      <aside className="w-full md:w-64 bg-surface border-b md:border-b-0 md:border-r border-border flex flex-col p-4 z-40 relative">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-primary">PMP Admin</h2>
          <ThemeToggle />
        </div>
        
        <nav className="flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0">
          <Link 
            href="/admin" 
            className={`flex items-center gap-2 p-3 rounded-md transition-colors ${pathname === '/admin' ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-primary/5'}`}
          >
            <ShoppingCart size={20} />
            <span>Orders</span>
          </Link>
          <Link 
            href="/admin/products" 
            className={`flex items-center gap-2 p-3 rounded-md transition-colors ${pathname === '/admin/products' ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-primary/5'}`}
          >
            <Package size={20} />
            <span>Products</span>
          </Link>
          <Link 
            href="/admin/settings" 
            className={`flex items-center gap-2 p-3 rounded-md transition-colors ${pathname === '/admin/settings' ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-primary/5'}`}
          >
            <SettingsIcon size={20} />
            <span>Settings</span>
          </Link>
        </nav>
        
        <div className="mt-auto hidden md:block pt-4">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-muted hover:text-red-500 transition-colors w-full p-3 rounded-md hover:bg-red-500/10"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="flex justify-end md:hidden mb-4">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs font-bold text-muted"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
        {children}
      </main>
    </div>
  );
}
