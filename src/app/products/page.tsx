import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import ThemeToggle from "@/components/ThemeToggle";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="container pb-24 min-h-screen">
      <header className="flex justify-between items-center py-4 sticky top-0 bg-background z-40">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 rounded-full bg-surface shadow-sm text-text">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-bold">All Products</h1>
        </div>
        <ThemeToggle />
      </header>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.length === 0 ? (
          <div className="text-center py-10 text-muted">No products found.</div>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </main>
  );
}
