"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Phone } from "lucide-react";
import { Sheet } from "@/components/ui/Sheet";
import { Logo } from "@/components/brand/Logo";
import { ProductArt, artBackground } from "@/components/brand/ProductArt";
import { CATEGORIES } from "@/data/categories";
import { NAV, SITE } from "@/data/site";
import { cn } from "@/lib/format";

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [productsOpen, setProductsOpen] = useState(true);

  return (
    <Sheet
      open={open}
      onClose={onClose}
      side="left"
      title={<Logo />}
      footer={
        <a href={SITE.phoneHref} className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-green-dark font-semibold text-white">
          <Phone className="h-4 w-4" aria-hidden="true" /> {SITE.phone}
        </a>
      }
    >
      <nav aria-label="Mobil navigáció" className="px-3 py-4">
        <button
          type="button"
          className="flex min-h-12 w-full items-center justify-between rounded-xl px-3 font-display text-xl font-bold"
          aria-expanded={productsOpen}
          onClick={() => setProductsOpen((v) => !v)}
        >
          Termékek
          <ChevronDown className={cn("h-5 w-5 transition-transform", productsOpen && "rotate-180")} aria-hidden="true" />
        </button>
        {productsOpen && (
          <ul className="grid grid-cols-2 gap-2 px-1 pb-3">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/termekek/${c.slug}`}
                  onClick={onClose}
                  className="flex h-full flex-col gap-2 rounded-2xl border border-line bg-white p-3 text-sm font-semibold leading-tight"
                >
                  <span className="block h-14 w-14 overflow-hidden rounded-xl" style={artBackground(c.accent)}>
                    <ProductArt kind={c.art} tone={c.accent} className="h-full w-full p-1" />
                  </span>
                  {c.name}
                </Link>
              </li>
            ))}
            <li className="col-span-2">
              <Link href="/termekek/akciok" onClick={onClose} className="flex min-h-12 items-center justify-center rounded-2xl bg-sale font-display font-bold text-white">
                AKCIÓK
              </Link>
            </li>
          </ul>
        )}
        <ul className="mt-2 border-t border-line pt-2">
          {NAV.filter((n) => !("mega" in n)).map((n) => (
            <li key={n.href}>
              <Link href={n.href} onClick={onClose} className="flex min-h-12 items-center rounded-xl px-3 font-display text-xl font-bold hover:bg-ink/5">
                {n.label}
              </Link>
            </li>
          ))}
          <li className="grid grid-cols-2 gap-2 px-1 py-2">
            <Link href="/termekvalaszto" onClick={onClose} className="flex min-h-12 items-center justify-center rounded-2xl bg-brand/10 px-3 text-sm font-semibold text-brand">
              Termékválasztó
            </Link>
            <Link href="/kihivas" onClick={onClose} className="flex min-h-12 items-center justify-center rounded-2xl bg-brand-green/10 px-3 text-sm font-semibold text-brand-green-dark">
              7 napos kihívás
            </Link>
          </li>
          <li>
            <Link href="/kedvencek" onClick={onClose} className="flex min-h-12 items-center rounded-xl px-3 text-base font-semibold text-muted hover:bg-ink/5">
              Kedvencek
            </Link>
          </li>
          <li>
            <Link href="/fiok" onClick={onClose} className="flex min-h-12 items-center rounded-xl px-3 text-base font-semibold text-muted hover:bg-ink/5">
              Fiókom
            </Link>
          </li>
        </ul>
      </nav>
    </Sheet>
  );
}
