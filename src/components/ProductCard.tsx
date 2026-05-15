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
    <div className="group relative">
      <Link href={`/product/${product.id}`} className="block">
        {/* Image Container (High-end Minimalism) */}
        <div className="aspect-[3/4] bg-[#F9FAFB] rounded-[32px] overflow-hidden flex items-center justify-center p-10 transition-all duration-500 group-hover:bg-gray-100 group-hover:shadow-2xl group-hover:shadow-black/5 relative">
          <Image
            src={product.image || "/product-1.png"}
            alt={product.name}
            width={240} height={240}
            className="object-contain w-full h-full drop-shadow-2xl transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          
          {discount && discount > 0 && (
            <div className="absolute top-6 left-6 bg-[#600B14] text-white text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest">
              {discount}% Off
            </div>
          )}
        </div>

        {/* Content (Precise Typography) */}
        <div className="mt-8 px-2 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
            <div className="flex items-center gap-0.5">
              <Star size={10} className="text-[#FF5200] fill-[#FF5200]" />
              <span className="text-[10px] font-black text-gray-900">4.9</span>
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-l pl-2 border-gray-100">
              Verified
            </span>
          </div>

          <h3 className="text-lg font-black text-gray-900 leading-tight mb-2 group-hover:text-[#600B14] transition-colors">
            {product.name}
          </h3>
          
          <p className="text-gray-400 text-xs font-bold leading-relaxed mb-6 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {product.description}
          </p>

          <div className="flex items-center justify-center sm:justify-start gap-4">
            <span className="text-xl font-black text-gray-900">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-300 line-through font-bold">₹{product.originalPrice}</span>
            )}
          </div>
        </div>
      </Link>

      {/* Action Button (Swiggy Style) */}
      <div className="absolute top-[260px] left-1/2 -translate-x-1/2 z-20">
        <button 
          onClick={handleAdd}
          className="bg-white text-[#600B14] px-8 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl border border-gray-100 hover:bg-gray-50 active:scale-95 transition-all flex items-center gap-2"
        >
          <Plus size={14} strokeWidth={4} />
          ADD
        </button>
      </div>
    </div>
  );
}
