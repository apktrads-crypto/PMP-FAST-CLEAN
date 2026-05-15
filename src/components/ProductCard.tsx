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
    <Link href={`/product/${product.id}`} className="bg-white rounded-[24px] border border-[#F1E5D1] shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all active:scale-[0.98]">
      {/* Image Area */}
      <div className="relative aspect-square bg-[#F7EEDD] p-6 flex items-center justify-center">
        <Image
          src={product.image || "/product-1.png"}
          alt={product.name}
          width={160} height={160}
          className="object-contain drop-shadow-md"
          sizes="200px"
        />
        
        {discount && discount > 0 && (
          <div className="absolute top-3 left-3 bg-[#FF5200] text-white text-[10px] font-black px-2 py-1 rounded-lg uppercase">
            {discount}% OFF
          </div>
        )}
      </div>

      {/* Info Area */}
      <div className="p-4 flex flex-col gap-1 flex-1 relative">
        <div className="flex items-center gap-1 text-[10px] text-[#686B78] font-bold">
          <Star size={10} className="text-[#FF5200] fill-[#FF5200]" />
          <span>4.5 • 25 mins</span>
        </div>
        
        <h3 className="text-[#282C3F] font-bold text-sm leading-tight line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-[#7E818C] text-[11px] line-clamp-1 mb-2 font-medium">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-[10px] text-[#ADB1B7] line-through font-bold">
                ₹{product.originalPrice}
              </span>
            )}
            <span className="text-[#282C3F] font-black text-base">
              ₹{product.price}
            </span>
          </div>

          <button 
            onClick={handleAdd}
            className="bg-white border border-[#F1E5D1] text-[#600B14] px-4 py-1.5 rounded-xl text-xs font-black shadow-sm hover:border-[#FF5200] hover:text-[#FF5200] transition-colors"
          >
            ADD
          </button>
        </div>
      </div>
    </Link>
  );
}
