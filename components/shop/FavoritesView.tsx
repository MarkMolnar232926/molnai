"use client";

import { Heart } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { PRODUCTS } from "@/data/products";
import { useHydrated, useShop } from "@/lib/store";
import { ProductCard } from "./ProductCard";

export function FavoritesView() {
  const hydrated = useHydrated();
  const favorites = useShop((s) => s.favorites);
  const items = hydrated ? PRODUCTS.filter((p) => favorites.includes(p.slug)) : [];

  if (items.length === 0) {
    // Before hydration the empty state is rendered invisibly so its size is reserved (no layout shift).
    return (
      <div
        className={`mt-10 flex flex-col items-center rounded-[2rem] bg-white px-6 py-20 text-center ${hydrated ? "" : "invisible"}`}
        aria-hidden={!hydrated || undefined}
      >
        <Heart className="h-12 w-12 text-r-red" aria-hidden="true" />
        <p className="mt-6 font-display text-2xl font-bold">Még nincs kedvenced</p>
        <p className="mt-2 max-w-md text-muted">A termékkártyák szív ikonjával mentheted el, amire később visszatérnél.</p>
        <ButtonLink href="/termekek" className="mt-8">
          Termékek böngészése
        </ButtonLink>
      </div>
    );
  }

  return (
    <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
      {items.map((p) => (
        <li key={p.slug}>
          <ProductCard product={p} />
        </li>
      ))}
    </ul>
  );
}
