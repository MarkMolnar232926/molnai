"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { LayoutGrid, List, SlidersHorizontal, X } from "lucide-react";
import { Sheet } from "@/components/ui/Sheet";
import { Button } from "@/components/ui/Button";
import { SearchParam } from "@/components/ui/SearchParam";
import { CATEGORIES, getCategory } from "@/data/categories";
import { PRODUCTS, fromPrice, inSub, isOnSale, productsInCategory } from "@/data/products";
import { RESISTANCE_BY_ID } from "@/data/resistance";
import { cn, discountPercent, formatPrice } from "@/lib/format";
import type { Product, ResistanceLevel } from "@/lib/types";
import { EMPTY_FILTERS, Filters, type FilterOptions, type FilterState } from "./Filters";
import { ProductCard } from "./ProductCard";

type Sort = "popular" | "price-asc" | "price-desc" | "discount" | "name";

const SORTS: { id: Sort; label: string }[] = [
  { id: "popular", label: "Népszerűség" },
  { id: "price-asc", label: "Ár szerint növekvő" },
  { id: "price-desc", label: "Ár szerint csökkenő" },
  { id: "discount", label: "Legnagyobb kedvezmény" },
  { id: "name", label: "Név (A–Z)" },
];

const VIEW_KEY = "thera-team-view";

const levelsOf = (p: Product): ResistanceLevel[] =>
  (p.variants?.map((v) => v.resistance).filter(Boolean) as ResistanceLevel[]) ?? [];

const discountOf = (p: Product) => {
  const fp = fromPrice(p);
  return discountPercent(p.price, p.oldPrice) ?? discountPercent(fp.price, fp.oldPrice) ?? (isOnSale(p) ? 1 : 0);
};

/** "all" = every product (grouped by category), "akciok" = sale, otherwise a category slug. */
export function CategoryView({ slug }: { slug: string }) {
  const category = getCategory(slug);
  const base = useMemo(() => (slug === "all" ? PRODUCTS : productsInCategory(slug)), [slug]);
  const byCategory = !category;

  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [sort, setSort] = useState<Sort>("popular");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [drawer, setDrawer] = useState(false);

  const onSubParam = useCallback((sub: string | null) => {
    setFilters((f) => ({ ...f, subs: sub ? [sub] : [] }));
  }, []);

  useEffect(() => {
    try {
      const v = localStorage.getItem(VIEW_KEY);
      if (v === "list" || v === "grid") setView(v);
    } catch {
      /* ignore */
    }
  }, []);

  const changeView = (v: "grid" | "list") => {
    setView(v);
    try {
      localStorage.setItem(VIEW_KEY, v);
    } catch {
      /* ignore */
    }
  };

  const subKey = (p: Product) => (byCategory ? p.category : p.sub);

  const options: FilterOptions = useMemo(() => {
    const subs = byCategory
      ? CATEGORIES.map((c) => ({ slug: c.slug as string, name: c.name, count: base.filter((p) => p.category === c.slug).length }))
      : category!.subs.map((s) => ({ ...s, count: base.filter((p) => inSub(p, slug, s.slug)).length }));
    const brandCounts = new Map<string, number>();
    base.forEach((p) => brandCounts.set(p.brand, (brandCounts.get(p.brand) ?? 0) + 1));
    return {
      subs: subs.filter((s) => s.count > 0),
      subLabel: byCategory ? "Kategória" : "Alkategória",
      brands: [...brandCounts].map(([name, count]) => ({ name, count })).sort((a, b) => a.name.localeCompare(b.name, "hu")),
      levels: Array.from(new Set(base.flatMap(levelsOf))),
      priceMax: Math.max(...base.map((p) => fromPrice(p).price)),
    };
  }, [base, byCategory, category, slug]);

  const results = useMemo(() => {
    const f = filters;
    const list = base.filter((p) => {
      const price = fromPrice(p).price;
      if (f.subs.length && !f.subs.some((s) => (byCategory ? p.category === s : inSub(p, slug, s)))) return false;
      if (f.brands.length && !f.brands.includes(p.brand)) return false;
      if (f.levels.length && !levelsOf(p).some((l) => f.levels.includes(l))) return false;
      if (f.inStock && !(p.stock === "in_stock" || p.variants?.some((v) => v.stock === "in_stock"))) return false;
      if (f.sale && !isOnSale(p)) return false;
      if (f.min !== null && price < f.min) return false;
      if (f.max !== null && price > f.max) return false;
      return true;
    });
    const sorted = [...list];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => fromPrice(a).price - fromPrice(b).price);
        break;
      case "price-desc":
        sorted.sort((a, b) => fromPrice(b).price - fromPrice(a).price);
        break;
      case "discount":
        sorted.sort((a, b) => discountOf(b) - discountOf(a));
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name, "hu"));
        break;
      default:
        sorted.sort((a, b) => b.rating * Math.log(b.reviews + 2) - a.rating * Math.log(a.reviews + 2));
    }
    return sorted;
  }, [base, filters, sort, byCategory, slug]);

  const chips: { label: string; clear: () => void }[] = [
    ...filters.subs.map((s) => ({
      label: options.subs.find((o) => o.slug === s)?.name ?? s,
      clear: () => setFilters({ ...filters, subs: filters.subs.filter((x) => x !== s) }),
    })),
    ...filters.brands.map((b) => ({ label: b, clear: () => setFilters({ ...filters, brands: filters.brands.filter((x) => x !== b) }) })),
    ...filters.levels.map((l) => ({
      label: RESISTANCE_BY_ID[l].name,
      clear: () => setFilters({ ...filters, levels: filters.levels.filter((x) => x !== l) }),
    })),
    ...(filters.inStock ? [{ label: "Raktáron", clear: () => setFilters({ ...filters, inStock: false }) }] : []),
    ...(filters.sale ? [{ label: "Akciós", clear: () => setFilters({ ...filters, sale: false }) }] : []),
    ...(filters.min !== null || filters.max !== null
      ? [
          {
            label: `${filters.min !== null ? formatPrice(filters.min) : "0 Ft"} – ${filters.max !== null ? formatPrice(filters.max) : "∞"}`,
            clear: () => setFilters({ ...filters, min: null, max: null }),
          },
        ]
      : []),
  ];

  const quickSubs = options.subs.slice(0, 14);

  return (
    <div className="container-x pb-24">
      <SearchParam name="al" onValue={onSubParam} />
      {/* Quick sub chips */}
      {quickSubs.length > 1 && (
        <div className="no-scrollbar -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1" role="group" aria-label={options.subLabel}>
          <button
            type="button"
            onClick={() => setFilters({ ...filters, subs: [] })}
            aria-pressed={filters.subs.length === 0}
            className={cn(
              "min-h-11 shrink-0 rounded-full px-4 text-sm font-semibold transition-colors",
              filters.subs.length === 0 ? "bg-ink text-white" : "bg-white hover:bg-paper-2",
            )}
          >
            Mind
          </button>
          {quickSubs.map((s) => {
            const on = filters.subs.includes(s.slug);
            return (
              <button
                key={s.slug}
                type="button"
                aria-pressed={on}
                onClick={() => setFilters({ ...filters, subs: on ? filters.subs.filter((x) => x !== s.slug) : [s.slug] })}
                className={cn("min-h-11 shrink-0 rounded-full px-4 text-sm font-medium transition-colors", on ? "bg-ink text-white" : "bg-white hover:bg-paper-2")}
              >
                {s.name} <span className={cn("ml-1 text-xs", on ? "text-white/60" : "text-muted")}>{s.count}</span>
              </button>
            );
          })}
        </div>
      )}

      <div className="grid gap-10 lg:grid-cols-[17rem_1fr]">
        <aside className="hidden lg:block" aria-label="Szűrők">
          <div className="sticky top-[calc(var(--header-h)+1.5rem)] max-h-[calc(100vh-var(--header-h)-3rem)] overflow-y-auto pr-2">
            <Filters state={filters} onChange={setFilters} options={options} />
          </div>
        </aside>

        <div>
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <Button variant="ghost" className="min-h-11 px-4 lg:hidden" onClick={() => setDrawer(true)}>
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" /> Szűrők
              {chips.length > 0 && <span className="rounded-full bg-ink px-2 py-0.5 text-xs text-white">{chips.length}</span>}
            </Button>
            <p className="text-sm text-muted" aria-live="polite">
              <strong className="text-ink">{results.length}</strong> termék
            </p>
            <div className="ml-auto flex items-center gap-2">
              <label className="sr-only" htmlFor="sort">
                Rendezés
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="h-11 rounded-full border border-line bg-white pl-4 pr-9 text-sm font-medium"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
              <div className="hidden rounded-full border border-line bg-white p-1 sm:flex" role="group" aria-label="Nézet">
                {(["grid", "list"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => changeView(v)}
                    aria-pressed={view === v}
                    aria-label={v === "grid" ? "Rács nézet" : "Lista nézet"}
                    className={cn("inline-flex h-9 w-9 items-center justify-center rounded-full", view === v ? "bg-ink text-white" : "text-muted hover:text-ink")}
                  >
                    {v === "grid" ? <LayoutGrid className="h-4 w-4" /> : <List className="h-4 w-4" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {chips.length > 0 && (
            <div className="mb-6 flex flex-wrap items-center gap-2">
              {chips.map((c) => (
                <button
                  key={c.label}
                  type="button"
                  onClick={c.clear}
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-ink/5 pl-3 pr-2 text-sm font-medium hover:bg-ink/10"
                  aria-label={`Szűrő törlése: ${c.label}`}
                >
                  {c.label} <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              ))}
              <button type="button" onClick={() => setFilters(EMPTY_FILTERS)} className="min-h-9 px-2 text-sm font-semibold underline underline-offset-4">
                Összes törlése
              </button>
            </div>
          )}

          {results.length === 0 ? (
            <div className="rounded-[var(--radius-card)] bg-white p-12 text-center">
              <p className="font-display text-2xl font-bold">Nincs a szűrésnek megfelelő termék</p>
              <p className="mt-2 text-muted">Lazíts a feltételeken, vagy kérj tanácsot telefonon, szívesen segítünk.</p>
              <Button className="mt-6" onClick={() => setFilters(EMPTY_FILTERS)}>
                Szűrők törlése
              </Button>
            </div>
          ) : (
            <ul className={cn("grid gap-4", view === "grid" ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4" : "grid-cols-1")}>
              {results.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} layout={view} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <Sheet
        open={drawer}
        onClose={() => setDrawer(false)}
        side="left"
        title="Szűrők"
        footer={
          <div className="flex gap-3">
            <Button variant="ghost" className="flex-1" onClick={() => setFilters(EMPTY_FILTERS)}>
              Törlés
            </Button>
            <Button className="flex-[2]" onClick={() => setDrawer(false)}>
              {results.length} termék mutatása
            </Button>
          </div>
        }
      >
        <div className="px-5 py-6">
          <Filters state={filters} onChange={setFilters} options={options} />
        </div>
      </Sheet>
    </div>
  );
}
