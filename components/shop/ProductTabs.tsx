"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { Stars } from "@/components/ui/Stars";
import { cn } from "@/lib/format";
import type { Product } from "@/lib/types";

const SAMPLE_REVIEWS = [
  { name: "B. Katalin", rating: 5, text: "Pontosan olyan, amilyet a gyógytornászom ajánlott. Gyorsan megérkezett." },
  { name: "H. Márton", rating: 4, text: "Jó minőség, a leírás alapján könnyű volt a megfelelőt kiválasztani." },
];

export function ProductTabs({ product }: { product: Product }) {
  const tabs = [
    { id: "leiras", label: "Leírás" },
    { id: "specifikacio", label: "Specifikáció" },
    ...(product.exercises?.length ? [{ id: "gyakorlatok", label: "Gyakorlatok" }] : []),
    { id: "velemenyek", label: `Vélemények (${product.reviews})` },
  ];
  const [active, setActive] = useState(tabs[0].id);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = tabs[(i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length];
    setActive(next.id);
    document.getElementById(`${next.id}-tab`)?.focus();
  };

  return (
    <div className="mt-10">
      <div role="tablist" aria-label="Termékinformációk" className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto border-b border-line px-4">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            id={`${t.id}-tab`}
            role="tab"
            type="button"
            aria-selected={active === t.id}
            aria-controls={`${t.id}-panel`}
            tabIndex={active === t.id ? 0 : -1}
            onClick={() => setActive(t.id)}
            onKeyDown={(e) => onKey(e, i)}
            className={cn(
              "relative min-h-12 shrink-0 px-4 text-sm font-semibold transition-colors",
              active === t.id ? "text-ink" : "text-muted hover:text-ink",
            )}
          >
            {t.label}
            {active === t.id && <span className="spectrum-rule absolute inset-x-2 -bottom-px !h-[3px]" aria-hidden="true" />}
          </button>
        ))}
      </div>

      <div id={`${active}-panel`} role="tabpanel" aria-labelledby={`${active}-tab`} className="py-6" tabIndex={0}>
        {active === "leiras" && (
          <div className="space-y-4 text-[1.05rem] leading-relaxed text-ink/85">
            {product.description.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            {product.mock && (
              <p className="flex items-start gap-2 rounded-2xl bg-r-yellow/20 p-3 text-sm text-ink/80">
                <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                Demó termék: a termék, az ár és a leírás a koncepcióhoz készült.
              </p>
            )}
          </div>
        )}
        {active === "specifikacio" && (
          <dl className="divide-y divide-line overflow-hidden rounded-2xl bg-white">
            {[["Márka", product.brand] as [string, string], ...product.specs].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[minmax(8rem,40%)_1fr] gap-4 px-5 py-3.5 text-sm">
                <dt className="text-muted">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        )}
        {active === "gyakorlatok" && product.exercises && (
          <ol className="space-y-3">
            {product.exercises.map((ex, i) => (
              <li key={ex} className="flex gap-4 rounded-2xl bg-white p-4">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink font-display font-bold text-white">{i + 1}</span>
                <span className="pt-1.5 text-[0.95rem]">{ex}</span>
              </li>
            ))}
            <li className="text-sm text-muted">Fájdalom esetén hagyd abba a gyakorlatot, és kérd szakember tanácsát.</li>
          </ol>
        )}
        {active === "velemenyek" && (
          <div>
            <div className="flex items-center gap-4 rounded-2xl bg-white p-5">
              <span className="font-display text-5xl font-extrabold">{product.rating.toString().replace(".", ",")}</span>
              <span>
                <Stars rating={product.rating} />
                <span className="mt-1 block text-sm text-muted">{product.reviews} értékelés alapján</span>
              </span>
            </div>
            <ul className="mt-4 space-y-3">
              {SAMPLE_REVIEWS.map((r) => (
                <li key={r.name} className="rounded-2xl bg-white p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{r.name}</span>
                    <Stars rating={r.rating} />
                  </div>
                  <p className="mt-2 text-ink/80">{r.text}</p>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted">Minta vélemények a koncepcióhoz.</p>
          </div>
        )}
      </div>
    </div>
  );
}
