"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { ProductArt, artBackground } from "@/components/brand/ProductArt";
import { Swatch } from "@/components/ui/Swatch";
import { StockLabel } from "@/components/ui/StockLabel";
import { getProduct, getVariant } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { useShop, type ResolvedLine } from "@/lib/store";
import { QtyStepper } from "./QtyStepper";

export function CartLineItem({ line, onNavigate }: { line: ResolvedLine; onNavigate?: () => void }) {
  const setQty = useShop((s) => s.setQty);
  const removeLine = useShop((s) => s.removeLine);
  const product = getProduct(line.slug);
  const resistance = product && getVariant(product, line.variantId)?.resistance;

  return (
    <li className="flex gap-4 py-4">
      <Link
        href={`/termek/${line.slug}`}
        onClick={onNavigate}
        className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl"
        style={artBackground(line.tone)}
        tabIndex={-1}
        aria-hidden="true"
      >
        <ProductArt kind={line.art} tone={line.tone} className="h-full w-full p-2" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-start justify-between gap-3">
          <Link href={`/termek/${line.slug}`} onClick={onNavigate} className="line-clamp-2 text-sm font-semibold leading-snug hover:underline">
            {line.name}
          </Link>
          <button
            type="button"
            onClick={() => removeLine(line.key)}
            className="-mr-2 -mt-2 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted hover:bg-ink/5 hover:text-sale"
            aria-label={`${line.name} eltávolítása a kosárból`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        {line.variantLabel && (
          <span className="inline-flex items-center gap-1.5 text-xs text-muted">
            {resistance && <Swatch level={resistance} size={12} />}
            {line.variantLabel}
          </span>
        )}
        <StockLabel stock={line.stock} />
        <div className="mt-auto flex items-center justify-between gap-2">
          <QtyStepper size="sm" value={line.qty} onChange={(v) => setQty(line.key, v)} label={line.name} />
          <div className="text-right">
            <div className="font-display font-bold tabular-nums">{formatPrice(line.unitPrice * line.qty)}</div>
            {line.oldPrice && <div className="text-xs text-muted line-through">{formatPrice(line.oldPrice * line.qty)}</div>}
          </div>
        </div>
      </div>
    </li>
  );
}
