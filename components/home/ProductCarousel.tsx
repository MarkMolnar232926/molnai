"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/shop/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PRODUCTS, isOnSale } from "@/data/products";
import { cn } from "@/lib/format";

const TABS = [
  { id: "sale", label: "Akciós termékek", items: PRODUCTS.filter(isOnSale).slice(0, 10) },
  { id: "top", label: "Legnépszerűbb", items: [...PRODUCTS].sort((a, b) => b.reviews - a.reviews).slice(0, 10) },
  { id: "pro", label: "Szakmai választás", items: PRODUCTS.filter((p) => p.tags?.includes("szakmai")).slice(0, 10) },
];

export function ProductCarousel() {
  const [tab, setTab] = useState(0);
  const track = useRef<HTMLUListElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = (i + (e.key === "ArrowRight" ? 1 : -1) + TABS.length) % TABS.length;
    setTab(next);
    document.getElementById(`tab-${TABS[next].id}`)?.focus();
  };

  return (
    <section className="overflow-hidden bg-white py-20 lg:py-28" aria-labelledby="kiemelt">
      <div className="container-x">
        <SectionHeading
          eyebrow="Most érdemes"
          title={<span id="kiemelt">Kiemelt ajánlatok</span>}
          action={
            <div className="flex gap-2">
              <button type="button" onClick={() => scroll(-1)} className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line hover:border-ink" aria-label="Előző termékek">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button type="button" onClick={() => scroll(1)} className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-ink text-white hover:bg-ink-3" aria-label="Következő termékek">
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          }
        />
        <div role="tablist" aria-label="Ajánlatok" className="no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4">
          {TABS.map((t, i) => (
            <button
              key={t.id}
              id={`tab-${t.id}`}
              role="tab"
              type="button"
              aria-selected={tab === i}
              aria-controls="carousel-panel"
              tabIndex={tab === i ? 0 : -1}
              onClick={() => {
                setTab(i);
                track.current?.scrollTo({ left: 0 });
              }}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "min-h-11 shrink-0 rounded-full px-5 text-sm font-semibold transition-colors",
                tab === i ? "bg-ink text-white" : "bg-paper text-ink hover:bg-paper-2",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="container-x">
        <ul
          id="carousel-panel"
          role="tabpanel"
          aria-labelledby={`tab-${TABS[tab].id}`}
          ref={track}
          className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-6"
        >
          {TABS[tab].items.map((p) => (
            <li key={p.slug} className="w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-[calc((100%-3rem)/4)]">
              <ProductCard product={p} tinted />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
