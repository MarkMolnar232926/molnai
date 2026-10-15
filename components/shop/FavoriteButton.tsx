"use client";

import { Heart } from "lucide-react";
import { cn } from "@/lib/format";
import { useHydrated, useShop } from "@/lib/store";

export function FavoriteButton({ slug, name, className }: { slug: string; name: string; className?: string }) {
  const hydrated = useHydrated();
  const active = useShop((s) => s.favorites.includes(slug)) && hydrated;
  const toggle = useShop((s) => s.toggleFavorite);
  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-pressed={active}
      aria-label={active ? `${name} eltávolítása a kedvencekből` : `${name} hozzáadása a kedvencekhez`}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/85 backdrop-blur transition-transform hover:scale-110",
        className,
      )}
    >
      <Heart className={cn("h-[1.1rem] w-[1.1rem] transition-colors", active ? "fill-r-red text-r-red" : "text-ink")} />
    </button>
  );
}
