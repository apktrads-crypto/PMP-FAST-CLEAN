"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/components/ProductCard";
import { useRouter } from "next/navigation";

interface AddToCartBarProps {
  product: Product;
}

export default function AddToCartBar({ product }: AddToCartBarProps) {
  const router = useRouter();
  const { items, addItem, updateQuantity } = useCartStore();
  
  const cartItem = items.find(item => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAdd = () => {
    if (quantity === 0) {
      addItem(product);
    } else {
      updateQuantity(product.id, quantity + 1);
    }
  };

  const handleMinus = () => {
    if (quantity > 0) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  const goToCart = () => {
    router.push("/cart");
  };

  return (
    <div className="fixed bottom-0 w-full bg-surface border-t border-border p-4 flex gap-4 items-center z-50 pb-safe">
      {quantity > 0 ? (
        <>
          <div className="flex items-center justify-between border border-border rounded-md px-4 py-2 w-32">
            <button onClick={handleMinus} className="text-primary"><Minus size={18} /></button>
            <span className="font-bold">{quantity}</span>
            <button onClick={handleAdd} className="text-primary"><Plus size={18} /></button>
          </div>
          <button onClick={goToCart} className="flex-1 bg-primary text-white font-bold py-3 rounded-md shadow-md text-center">
            Go to Cart
          </button>
        </>
      ) : (
        <button onClick={handleAdd} className="w-full bg-primary text-white font-bold py-3 rounded-md shadow-md text-center">
          Add to Cart • ₹{product.price}
        </button>
      )}
    </div>
  );
}
