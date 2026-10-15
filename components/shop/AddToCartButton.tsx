"use client";

import { Check, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/format";
import { useShop, useUI } from "@/lib/store";
import type { Product } from "@/lib/types";

/**
 * Compact add-to-cart for product cards. Products with variants open the quick view
 * so the customer picks a resistance/size first.
 */
export function AddToCartButton({ product, variant = "icon" }: { product: Product; variant?: "icon" | "full" }) {
  const addToCart = useShop((s) => s.addToCart);
  const setQuickView = useUI((s) => s.setQuickView);
  const showToast = useUI((s) => s.showToast);
  const [done, setDone] = useState(false);
  const needsChoice = !!product.variants?.length;

  const onClick = () => {
    if (needsChoice) {
      setQuickView(product.slug);
      return;
    }
    addToCart(product.slug);
    showToast(`${product.name} a kosárba került`);
    setDone(true);
    window.setTimeout(() => setDone(false), 1400);
  };

  const label = needsChoice ? `Változat választása: ${product.name}` : `${product.name} kosárba`;

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className={cn(
          "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-all duration-300",
          done ? "bg-ok text-white" : "bg-ink text-white hover:bg-ink-3",
        )}
      >
        {done ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
        {done ? "Kosárban" : needsChoice ? "Változat választása" : "Kosárba"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-300 ease-[var(--ease-out-expo)]",
        done ? "scale-110 bg-ok text-white" : "bg-ink text-white hover:scale-105 hover:bg-ink-3",
      )}
    >
      <span className={cn("absolute transition-all duration-300", done ? "scale-0 opacity-0" : "scale-100 opacity-100")}>
        {needsChoice ? <ShoppingBag className="h-[1.1rem] w-[1.1rem]" /> : <Plus className="h-5 w-5" />}
      </span>
      <span className={cn("absolute transition-all duration-300", done ? "scale-100 opacity-100" : "scale-0 opacity-0")}>
        <Check className="h-5 w-5" />
      </span>
      {done && <span className="absolute inset-0 animate-ping rounded-full bg-ok/40" aria-hidden="true" />}
    </button>
  );
}
