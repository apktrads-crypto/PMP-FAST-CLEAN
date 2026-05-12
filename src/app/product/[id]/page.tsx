import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star, ShieldCheck, Truck } from "lucide-react";
import { prisma } from "@/lib/prisma";
import AddToCartBar from "@/components/AddToCartBar";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = await prisma.product.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!product) {
    notFound();
  }

  // Parse features string back to array (or split by comma)
  const featureList = product.features.split(",");

  return (
    <main className="bg-background min-h-screen pb-24">
      {/* Header */}
      <header className="fixed top-0 w-full z-40 bg-transparent flex justify-between p-4">
        <Link href="/" className="bg-white/80 backdrop-blur-md text-black p-2 rounded-full shadow-sm">
          <ArrowLeft size={24} />
        </Link>
      </header>

      {/* Product Image */}
      <div className="relative w-full h-64 bg-gradient-to-b from-blue-50/50 to-surface dark:from-blue-900/10 dark:to-surface flex items-center justify-center pt-8">
        <div className="relative w-48 aspect-square drop-shadow-2xl">
          <Image
            src={product.image || "/product-1.png"}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-full object-contain"
            sizes="(max-width: 768px) 192px, 192px"
            priority
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="container mt-4 bg-surface p-4 rounded-t-lg -mt-4 relative z-10 shadow-float pt-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center bg-green-100 text-green-700 px-2 py-0.5 rounded-sm text-xs font-bold">
                {product.rating} <Star size={12} className="ml-1 fill-current" />
              </div>
              <span className="text-xs text-muted">{product.reviews} ratings</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-end gap-2">
          <span className="text-2xl font-bold">₹{product.price}</span>
          <span className="text-sm text-muted line-through mb-1">₹{product.originalPrice}</span>
          <span className="text-sm font-bold text-primary mb-1">50% OFF</span>
        </div>

        <p className="mt-4 text-sm text-muted leading-relaxed">
          {product.description}
        </p>

        {/* Features list */}
        <ul className="mt-4 flex flex-col gap-2">
          {featureList.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              <ShieldCheck size={16} className="text-secondary" />
              <span>{feature.trim()}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center gap-3 bg-blue-50/50 dark:bg-blue-900/20 p-3 rounded-md border border-blue-100 dark:border-blue-800">
          <Truck size={20} className="text-blue-500" />
          <span className="text-xs text-blue-700 dark:text-blue-300">Free delivery within 2 hours</span>
        </div>
      </div>

      <AddToCartBar product={product as any} />
    </main>
  );
}
