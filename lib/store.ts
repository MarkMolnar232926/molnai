"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useEffect, useState } from "react";
import type { CartLine } from "./types";
import { getProduct, getVariant } from "@/data/products";

interface ShopState {
  cart: CartLine[];
  favorites: string[];
  addToCart: (slug: string, variantId?: string, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  removeLine: (key: string) => void;
  clearCart: () => void;
  toggleFavorite: (slug: string) => void;
}

const lineKey = (slug: string, variantId?: string) => (variantId ? `${slug}::${variantId}` : slug);

export const useShop = create<ShopState>()(
  persist(
    (set) => ({
      cart: [],
      favorites: [],
      addToCart: (slug, variantId, qty = 1) =>
        set((s) => {
          const key = lineKey(slug, variantId);
          const existing = s.cart.find((l) => l.key === key);
          if (existing) {
            return { cart: s.cart.map((l) => (l.key === key ? { ...l, qty: Math.min(99, l.qty + qty) } : l)) };
          }
          return { cart: [...s.cart, { key, slug, variantId, qty }] };
        }),
      setQty: (key, qty) =>
        set((s) => ({
          cart: qty <= 0 ? s.cart.filter((l) => l.key !== key) : s.cart.map((l) => (l.key === key ? { ...l, qty: Math.min(99, qty) } : l)),
        })),
      removeLine: (key) => set((s) => ({ cart: s.cart.filter((l) => l.key !== key) })),
      clearCart: () => set({ cart: [] }),
      toggleFavorite: (slug) =>
        set((s) => ({
          favorites: s.favorites.includes(slug) ? s.favorites.filter((f) => f !== slug) : [...s.favorites, slug],
        })),
    }),
    {
      name: "thera-team-shop",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    },
  ),
);

/** Transient UI state: overlays and toasts. Not persisted. */
interface UIState {
  cartOpen: boolean;
  searchOpen: boolean;
  quickView: string | null;
  toast: { id: number; text: string } | null;
  setCartOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setQuickView: (slug: string | null) => void;
  showToast: (text: string) => void;
}

export const useUI = create<UIState>()((set) => ({
  cartOpen: false,
  searchOpen: false,
  quickView: null,
  toast: null,
  setCartOpen: (cartOpen) => set({ cartOpen }),
  setSearchOpen: (searchOpen) => set({ searchOpen }),
  setQuickView: (quickView) => set({ quickView }),
  showToast: (text) => set({ toast: { id: Date.now(), text } }),
}));

/** True once persisted state has been rehydrated on the client (avoids SSR mismatches). Rehydration is triggered in <Providers>. */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(() => useShop.persist?.hasHydrated() ?? false);
  useEffect(() => {
    const unsub = useShop.persist.onFinishHydration(() => setHydrated(true));
    if (useShop.persist.hasHydrated()) setHydrated(true);
    return unsub;
  }, []);
  return hydrated;
}

export interface ResolvedLine extends CartLine {
  name: string;
  variantLabel?: string;
  unitPrice: number;
  oldPrice?: number;
  stock: "in_stock" | "backorder";
  art: import("./types").ArtKind;
  tone: string;
}

export function resolveLines(cart: CartLine[]): ResolvedLine[] {
  return cart.flatMap((line) => {
    const product = getProduct(line.slug);
    if (!product) return [];
    const variant = getVariant(product, line.variantId);
    return [
      {
        ...line,
        name: product.name,
        variantLabel: variant?.label,
        unitPrice: variant?.price ?? product.price,
        oldPrice: variant?.oldPrice ?? (variant ? undefined : product.oldPrice),
        stock: variant?.stock ?? product.stock,
        art: product.art,
        tone: product.tone,
      },
    ];
  });
}

export function cartTotals(lines: ResolvedLine[], freeFrom: number, fee: number) {
  const subtotal = lines.reduce((s, l) => s + l.unitPrice * l.qty, 0);
  const savings = lines.reduce((s, l) => s + (l.oldPrice ? (l.oldPrice - l.unitPrice) * l.qty : 0), 0);
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const shipping = subtotal === 0 || subtotal >= freeFrom ? 0 : fee;
  return { subtotal, savings, count, shipping, total: subtotal + shipping, points: Math.floor(subtotal / 100) };
}

/** 7-day challenge progress, persisted per browser. */
interface ChallengeState {
  completed: number[];
  complete: (day: number) => void;
  reset: () => void;
}

export const useChallenge = create<ChallengeState>()(
  persist(
    (set) => ({
      completed: [],
      complete: (day) => set((s) => ({ completed: s.completed.includes(day) ? s.completed : [...s.completed, day].sort((a, b) => a - b) })),
      reset: () => set({ completed: [] }),
    }),
    { name: "thera-team-challenge", storage: createJSONStorage(() => localStorage), skipHydration: true },
  ),
);
