"use client";

import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { useRef, useState } from "react";
import { ProductArt, artBackground } from "@/components/brand/ProductArt";
import { Price } from "@/components/ui/Price";
import { Stars } from "@/components/ui/Stars";
import { StockLabel } from "@/components/ui/StockLabel";
import { Button } from "@/components/ui/Button";
import { useDialogBehavior } from "@/components/ui/Sheet";
import { getProduct, getVariant } from "@/data/products";
import { RESISTANCE_BY_ID } from "@/data/resistance";
import { useShop, useUI } from "@/lib/store";
import { burst } from "@/lib/confetti";
import { ProductBadges } from "./ProductBadges";
import { QtyStepper } from "./QtyStepper";
import { VariantPicker } from "./VariantPicker";

export function QuickView() {
  const slug = useUI((s) => s.quickView);
  const setQuickView = useUI((s) => s.setQuickView);
  const product = slug ? getProduct(slug) : undefined;
  const close = () => setQuickView(null);
  const panel = useRef<HTMLDivElement>(null);
  useDialogBehavior(!!product, close, panel);

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-[65] flex items-end justify-center sm:items-center sm:p-6">
          <m.div className="absolute inset-0 bg-ink/55 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close} />
          <m.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="qv-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative grid max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl bg-paper sm:grid-cols-2 sm:rounded-3xl"
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 hover:bg-white"
              aria-label="Gyorsnézet bezárása"
            >
              <X className="h-5 w-5" />
            </button>
            <QuickViewBody key={product.slug} slug={product.slug} onDone={close} />
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function QuickViewBody({ slug, onDone }: { slug: string; onDone: () => void }) {
  const product = getProduct(slug)!;
  const firstAvailable = product.variants?.find((v) => v.stock === "in_stock") ?? product.variants?.[0];
  const [variantId, setVariantId] = useState(firstAvailable?.id);
  const [qty, setQty] = useState(1);
  const addToCart = useShop((s) => s.addToCart);
  const showToast = useUI((s) => s.showToast);
  const setCartOpen = useUI((s) => s.setCartOpen);
  const v = getVariant(product, variantId);
  const price = v?.price ?? product.price;
  const oldPrice = v ? v.oldPrice : product.oldPrice;
  const stock = v?.stock ?? product.stock;
  const tone = v?.resistance ? RESISTANCE_BY_ID[v.resistance].color : product.tone;

  return (
    <>
      <div className="relative aspect-square sm:aspect-auto" style={artBackground(tone)}>
        <ProductArt kind={product.art} tone={tone} className="h-full w-full p-[14%]" label={product.name} />
        <div className="absolute left-4 top-4">
          <ProductBadges product={product} />
        </div>
      </div>
      <div className="flex flex-col gap-5 p-6 sm:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">{product.brand}</p>
          <h2 id="qv-title" className="mt-1 text-h3 font-bold">{product.name}</h2>
          <Stars rating={product.rating} count={product.reviews} className="mt-2" />
        </div>
        <p className="text-muted">{product.short}</p>
        <Price price={price} oldPrice={oldPrice} size="lg" />
        {product.variants && variantId && <VariantPicker variants={product.variants} value={variantId} onChange={setVariantId} />}
        <StockLabel stock={stock} />
        <div className="flex items-center gap-3">
          <QtyStepper value={qty} onChange={(n) => setQty(Math.max(1, n))} label={product.name} />
          <Button
            className="flex-1"
            onClick={(e) => {
              addToCart(product.slug, variantId, qty);
              burst(e.currentTarget, 24);
              showToast(`${product.name} a kosárba került`);
              onDone();
              setCartOpen(true);
            }}
          >
            Kosárba
          </Button>
        </div>
        <Link href={`/termek/${product.slug}`} onClick={onDone} className="inline-flex items-center gap-1 text-sm font-semibold underline-offset-4 hover:underline">
          Teljes termékoldal <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </>
  );
}
