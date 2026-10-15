"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import { ProductArt, artBackground } from "@/components/brand/ProductArt";
import { Price } from "@/components/ui/Price";
import { Stars } from "@/components/ui/Stars";
import { StockLabel } from "@/components/ui/StockLabel";
import { Swatch } from "@/components/ui/Swatch";
import { fromPrice } from "@/data/products";
import { cn } from "@/lib/format";
import { useUI } from "@/lib/store";
import type { Product } from "@/lib/types";
import { AddToCartButton } from "./AddToCartButton";
import { FavoriteButton } from "./FavoriteButton";
import { ProductBadges } from "./ProductBadges";

export function ProductCard({ product, layout = "grid", tinted = false }: { product: Product; layout?: "grid" | "list"; tinted?: boolean }) {
  const setQuickView = useUI((s) => s.setQuickView);
  const fp = fromPrice(product);
  const swatches = product.variants?.map((v) => v.resistance).filter((r): r is NonNullable<typeof r> => !!r) ?? [];
  const href = `/termek/${product.slug}`;
  const list = layout === "list";

  return (
    <article
      className={cn(
        "group relative flex h-full rounded-[var(--radius-card)] p-2 transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgb(10_37_64/0.35)]",
        list ? "flex-row gap-4" : "flex-col",
        tinted ? "bg-paper" : "bg-white",
      )}
    >
      <div
        className={cn("relative overflow-hidden rounded-[1.1rem]", list ? "w-32 shrink-0 sm:w-48" : "aspect-square")}
        style={artBackground(product.tone)}
      >
        <Link href={href} tabIndex={-1} aria-hidden="true" className="absolute inset-0">
          <ProductArt
            kind={product.art}
            tone={product.tone}
            className="h-full w-full p-[12%] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.07] group-hover:-rotate-2"
          />
        </Link>
        <div className="pointer-events-none absolute left-3 right-14 top-3">
          <ProductBadges product={product} compact />
        </div>
        <FavoriteButton slug={product.slug} name={product.name} className="absolute right-2.5 top-2.5 z-10" />
        {!list && (
          <button
            type="button"
            onClick={() => setQuickView(product.slug)}
            className="absolute inset-x-3 bottom-3 z-10 hidden min-h-10 translate-y-2 items-center justify-center gap-2 rounded-full bg-white/90 text-sm font-semibold opacity-0 backdrop-blur transition-all duration-300 focus-visible:translate-y-0 focus-visible:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 sm:flex"
          >
            <Eye className="h-4 w-4" aria-hidden="true" /> Gyorsnézet
            <span className="sr-only">: {product.name}</span>
          </button>
        )}
      </div>

      <div className={cn("flex flex-1 flex-col gap-2", list ? "py-2 pr-2" : "px-2 pb-2 pt-4")}>
        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">{product.brand}</span>
          <Stars rating={product.rating} count={product.reviews} className="[&>span:last-child]:hidden sm:[&>span:last-child]:inline" />
        </div>
        <h3 className="font-sans text-[0.95rem] font-semibold leading-snug tracking-normal">
          <Link href={href} className="line-clamp-2 after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {product.name}
          </Link>
        </h3>
        {list && <p className="hidden text-sm text-muted sm:block">{product.short}</p>}
        {swatches.length > 0 && (
          <div className="flex items-center gap-1" role="img" aria-label={`${swatches.length} ellenállás-szint`}>
            {swatches.map((s) => (
              <Swatch key={s} level={s} size={14} />
            ))}
          </div>
        )}
        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div className="flex flex-col gap-1">
            <Price price={fp.price} oldPrice={fp.oldPrice} from={fp.hasRange} className="[&>span:first-child]:text-base sm:[&>span:first-child]:text-lg" />
            <StockLabel stock={product.variants?.some((v) => v.stock === "in_stock") ? "in_stock" : product.stock} />
          </div>
          <div className="relative z-10">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </article>
  );
}
