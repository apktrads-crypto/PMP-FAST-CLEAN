"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Star } from "lucide-react";
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
    <Link href={`/product/${product.id}`} className="group flex flex-col active:scale-[0.98] transition-transform">
      {/* Image Area */}
      <div className="relative aspect-[4/5] bg-white rounded-[32px] border border-[#F1E5D1] overflow-hidden flex items-center justify-center p-6 mb-4 group-hover:shadow-xl transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F7EEDD]/30 opacity-0 group-hover:opacity-100 transition-opacity" />
        <Image
          src={product.image || "/product-1.png"}
          alt={product.name}
          width={180} height={180}
          className="object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-700"
          sizes="200px"
        />
        
        {discount && discount > 0 && (
          <div className="absolute top-4 left-4 bg-[#FF5200] text-white text-[9px] font-black px-2.5 py-1 rounded-xl uppercase tracking-widest shadow-lg shadow-[#FF5200]/20">
            {discount}% OFF
          </div>
        )}

        <button 
          onClick={handleAdd}
          className="absolute bottom-4 right-4 bg-white text-[#282C3F] w-10 h-10 rounded-2xl flex items-center justify-center shadow-xl border border-[#F1E5D1] hover:bg-[#600B14] hover:text-white transition-all group-hover:scale-110"
        >
          <Plus size={20} strokeWidth={3} />
        </button>
      </div>

      {/* Info Area */}
      <div className="px-2">
        <div className="flex items-center gap-2 mb-1.5 opacity-60">
          <div className="flex items-center gap-0.5">
            <Star size={10} className="text-[#FF5200] fill-[#FF5200]" />
            <span className="text-[10px] font-black text-[#282C3F]">4.8</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-[#ADB1B7]" />
          <span className="text-[10px] font-bold text-[#686B78] uppercase tracking-tighter">Fast Action</span>
        </div>
        
        <h3 className="text-[#282C3F] font-black text-sm leading-tight mb-2 group-hover:text-[#FF5200] transition-colors line-clamp-1">
          {product.name}
        </h3>
        
        <div className="flex items-baseline gap-2">
          <span className="text-[#282C3F] font-black text-lg">
            ₹{product.price}
          </span>
          {product.originalPrice && (
            <span className="text-[11px] text-[#ADB1B7] line-through font-bold">
              ₹{product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
