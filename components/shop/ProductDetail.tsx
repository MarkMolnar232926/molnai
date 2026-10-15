"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Coins, Headphones, RotateCcw, Truck } from "lucide-react";
import { ProductArt, artBackground } from "@/components/brand/ProductArt";
import { PhotoPlaceholder } from "@/components/brand/PhotoPlaceholder";
import { Button } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";
import { SearchParam } from "@/components/ui/SearchParam";
import { Stars } from "@/components/ui/Stars";
import { StockLabel } from "@/components/ui/StockLabel";
import { getVariant } from "@/data/products";
import { RESISTANCE_BY_ID } from "@/data/resistance";
import { SITE } from "@/data/site";
import { cn, formatPrice } from "@/lib/format";
import { useShop, useUI } from "@/lib/store";
import type { Product } from "@/lib/types";
import { FavoriteButton } from "./FavoriteButton";
import { ProductBadges } from "./ProductBadges";
import { ProductTabs } from "./ProductTabs";
import { QtyStepper } from "./QtyStepper";
import { VariantPicker } from "./VariantPicker";

type View = "art" | "detail" | "photo";

export function ProductDetail({ product }: { product: Product }) {
  const inStock = product.variants?.filter((v) => v.stock === "in_stock");
  // Red is the most common starting resistance, so prefer it for colour-coded products.
  const defaultVariant = inStock?.find((v) => v.resistance === "red") ?? inStock?.[0] ?? product.variants?.[0];
  const [variantId, setVariantId] = useState(defaultVariant?.id);
  const [qty, setQty] = useState(1);
  const [view, setView] = useState<View>("art");
  const [added, setAdded] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const buyRef = useRef<HTMLDivElement>(null);
  const addToCart = useShop((s) => s.addToCart);
  const showToast = useUI((s) => s.showToast);

  const variant = getVariant(product, variantId);
  const price = variant?.price ?? product.price;
  const oldPrice = variant ? variant.oldPrice : product.oldPrice;
  const stock = variant?.stock ?? product.stock;
  const tone = variant?.resistance ? RESISTANCE_BY_ID[variant.resistance].color : product.tone;

  const onVariantParam = useCallback(
    (id: string | null) => {
      if (id && product.variants?.some((v) => v.id === id)) setVariantId(id);
    },
    [product.variants],
  );

  useEffect(() => {
    const el = buyRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShowBar(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const add = () => {
    addToCart(product.slug, variantId, qty);
    showToast(`${qty} × ${product.name}${variant ? ` (${variant.label})` : ""} a kosárba került`);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  const views: { id: View; label: string }[] = [
    { id: "art", label: "Termék" },
    { id: "detail", label: "Részlet" },
    { id: "photo", label: "Használat közben" },
  ];

  return (
    <>
      <SearchParam name="valtozat" onValue={onVariantParam} />
      <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
        {/* Gallery */}
        <div className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] transition-[background] duration-700" style={artBackground(tone)}>
            {view === "photo" ? (
              <PhotoPlaceholder caption={`${product.name} használat közben`} tone={tone} className="absolute inset-0 !rounded-none" />
            ) : (
              <ProductArt
                key={view}
                kind={product.art}
                tone={tone}
                label={product.name}
                className={cn(
                  "absolute inset-0 h-full w-full transition-transform duration-700 ease-[var(--ease-out-expo)]",
                  view === "detail" ? "scale-[1.9] p-[10%]" : "p-[13%]",
                )}
              />
            )}
            <div className="absolute left-5 top-5">
              <ProductBadges product={product} />
            </div>
            <FavoriteButton slug={product.slug} name={product.name} className="absolute right-4 top-4 h-12 w-12" />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3" role="group" aria-label="Termékképek">
            {views.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setView(v.id)}
                aria-pressed={view === v.id}
                aria-label={v.label}
                className={cn(
                  "relative aspect-[4/3] overflow-hidden rounded-2xl transition-shadow",
                  view === v.id ? "ring-2 ring-ink ring-offset-2 ring-offset-paper" : "opacity-75 hover:opacity-100",
                )}
                style={artBackground(tone)}
              >
                {v.id === "photo" ? (
                  <span className="absolute inset-0 flex items-center justify-center text-[0.7rem] font-semibold text-ink/70">[Fotó]</span>
                ) : (
                  <ProductArt kind={product.art} tone={tone} className={cn("h-full w-full", v.id === "detail" ? "scale-[1.8] p-2" : "p-3")} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Buy box */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-muted">{product.brand}</p>
          <h1 className="mt-2 text-h2 font-extrabold">{product.name}</h1>
          <Stars rating={product.rating} count={product.reviews} className="mt-3" />
          <p className="mt-5 text-lg text-ink/75">{product.short}</p>

          <div className="mt-7 rounded-3xl bg-white p-5 sm:p-6">
            <Price price={price} oldPrice={oldPrice} size="lg" />
            {oldPrice && (
              <p className="mt-1 text-sm font-semibold text-ok">Megtakarítás: {formatPrice(oldPrice - price)}</p>
            )}
            <p className="mt-1 text-xs text-muted">Az ár bruttó, tartalmazza az áfát.</p>

            {product.variants && variantId && (
              <div className="mt-6 border-t border-line pt-6">
                <VariantPicker variants={product.variants} value={variantId} onChange={setVariantId} />
                {variant?.resistance && (
                  <p className="mt-3 text-sm text-muted">
                    {RESISTANCE_BY_ID[variant.resistance].forWhom}.{" "}
                    <Link href="/#ellenallas" className="font-semibold text-ink underline-offset-4 hover:underline">
                      Melyik szín való nekem?
                    </Link>
                  </p>
                )}
              </div>
            )}

            <div className="mt-6 flex flex-col gap-1 border-t border-line pt-6">
              <StockLabel stock={stock} className="text-sm" />
              <p className="text-sm text-muted">
                {stock === "in_stock"
                  ? "Hétköznap 14:00-ig leadott rendelés esetén akár másnap nálad."
                  : "Rendelésre beszerezzük, a várható szállításról e-mailben értesítünk."}
              </p>
            </div>

            <div ref={buyRef} className="mt-6 flex items-center gap-3">
              <QtyStepper value={qty} onChange={(n) => setQty(Math.max(1, n))} label={product.name} />
              <Button className={cn("flex-1", added && "!bg-ok")} onClick={add}>
                {added ? "Kosárba téve ✓" : "Kosárba"}
              </Button>
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm text-muted">
              <Coins className="h-4 w-4 text-r-gold" aria-hidden="true" />
              Ezzel a vásárlással <strong className="text-ink">{Math.floor((price * qty) / 100)} Hűségpontot</strong> gyűjtesz.
            </p>
          </div>

          <ul className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
            {[
              { icon: Truck, text: `Ingyenes szállítás ${formatPrice(SITE.freeShippingFrom)} felett` },
              { icon: RotateCcw, text: "14 napos elállási jog" },
              { icon: Headphones, text: "Szakmai tanácsadás telefonon" },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2.5 rounded-2xl bg-white/60 p-3">
                <Icon className="h-5 w-5 shrink-0 text-r-green" aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>

          <ProductTabs product={product} />
        </div>
      </div>

      {/* Sticky mobile bar */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl transition-transform duration-500 ease-[var(--ease-out-expo)] lg:hidden",
          showBar ? "translate-y-0" : "translate-y-full",
        )}
        aria-hidden={!showBar}
      >
        <div className="flex items-center gap-3">
          <span className="h-12 w-12 shrink-0 overflow-hidden rounded-xl" style={artBackground(tone)}>
            <ProductArt kind={product.art} tone={tone} className="h-full w-full p-1" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{variant ? variant.label : product.name}</p>
            <Price price={price} oldPrice={oldPrice} size="sm" />
          </div>
          <Button className={cn("px-5", added && "!bg-ok")} onClick={add} tabIndex={showBar ? 0 : -1}>
            {added ? "✓" : "Kosárba"}
          </Button>
        </div>
      </div>
    </>
  );
}
