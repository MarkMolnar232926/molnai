"use client";

import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { ArrowRight, BadgePercent } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { getProduct, fromPrice } from "@/data/products";
import { ProductArt, artBackground } from "@/components/brand/ProductArt";
import { Price } from "@/components/ui/Price";

const FEATURED = getProduct("theraband-clx-11-hurkos-szalag")!;

export function MegaMenu({ open, onEnter, onClose }: { open: boolean; onEnter: () => void; onClose: () => void }) {
  const fp = fromPrice(FEATURED);
  return (
    <AnimatePresence>
      {open && (
        <m.div
          id="mega-menu"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={onEnter}
          className="absolute inset-x-0 top-full hidden border-b border-line bg-paper/95 backdrop-blur-xl lg:block"
        >
          <div className="container-x grid grid-cols-[1fr_18rem] gap-8 py-8">
            <ul className="grid grid-cols-3 gap-3">
              {CATEGORIES.map((c) => (
                <li key={c.slug} className="group rounded-2xl border border-line bg-white p-4 transition-shadow hover:shadow-[0_20px_40px_-24px_rgb(10_37_64/0.35)]">
                  <Link href={`/termekek/${c.slug}`} className="flex items-center gap-3" onClick={onClose}>
                    <span className="h-14 w-14 shrink-0 overflow-hidden rounded-xl" style={artBackground(c.accent)}>
                      <ProductArt kind={c.art} tone={c.accent} className="h-full w-full p-1.5 transition-transform duration-500 group-hover:scale-110" />
                    </span>
                    <span className="font-display text-[1.05rem] font-bold leading-tight">{c.name}</span>
                  </Link>
                  <ul className="mt-3 space-y-0.5 border-t border-line pt-3">
                    {c.highlight.map((slug) => {
                      const sub = c.subs.find((s) => s.slug === slug)!;
                      return (
                        <li key={slug}>
                          <Link
                            href={`/termekek/${c.slug}?al=${slug}`}
                            onClick={onClose}
                            className="block rounded-lg px-2 py-1.5 text-sm text-ink/75 transition-colors hover:bg-paper hover:text-ink"
                          >
                            {sub.name}
                          </Link>
                        </li>
                      );
                    })}
                    <li>
                      <Link
                        href={`/termekek/${c.slug}`}
                        onClick={onClose}
                        className="inline-flex items-center gap-1 px-2 py-1.5 text-sm font-semibold text-ink"
                      >
                        Összes alkategória ({c.subs.length}) <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    </li>
                  </ul>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3">
              <Link
                href={`/termek/${FEATURED.slug}`}
                onClick={onClose}
                className="group relative flex flex-1 flex-col overflow-hidden rounded-2xl bg-ink p-5 text-white on-dark"
              >
                <span className="eyebrow text-brand-lime">Kiemelt termék</span>
                <span className="mt-3 flex-1">
                  <ProductArt kind={FEATURED.art} tone={FEATURED.tone} className="mx-auto h-36 w-36 transition-transform duration-700 group-hover:rotate-[-6deg] group-hover:scale-105" />
                </span>
                <span className="font-display text-lg font-bold leading-tight">{FEATURED.name}</span>
                <Price price={fp.price} oldPrice={FEATURED.oldPrice} from={fp.hasRange} size="sm" dark className="mt-2" />
                <span className="brand-rule absolute inset-x-0 bottom-0 !rounded-none" aria-hidden="true" />
              </Link>
              <Link
                href="/termekek/akciok"
                onClick={onClose}
                className="flex items-center gap-3 rounded-2xl bg-sale px-5 py-4 font-display font-bold text-white transition-transform hover:-translate-y-0.5"
              >
                <BadgePercent className="h-6 w-6" aria-hidden="true" />
                <span className="flex-1">
                  AKCIÓK
                  <span className="block font-sans text-xs font-medium text-white">Outlet, bemutató darabok, mennyiségi kedvezmény</span>
                </span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
