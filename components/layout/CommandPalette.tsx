"use client";

import { AnimatePresence, m } from "framer-motion";
import { ArrowRight, CornerDownLeft, FileText, LayoutGrid, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ProductArt, artBackground } from "@/components/brand/ProductArt";
import { useDialogBehavior } from "@/components/ui/Sheet";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS, fromPrice } from "@/data/products";
import { POSTS } from "@/data/blog";
import { cn, formatPrice, normalize } from "@/lib/format";
import { useUI } from "@/lib/store";

type Result =
  | { kind: "product"; href: string; title: string; meta: string; slug: string }
  | { kind: "category"; href: string; title: string; meta: string }
  | { kind: "page"; href: string; title: string; meta: string };

const PAGES: Result[] = [
  { kind: "page", href: "/szakembereknek", title: "Szakembereknek", meta: "Kedvezményprogram" },
  { kind: "page", href: "/intezmenyeknek", title: "Intézményeknek", meta: "Ajánlatkérés" },
  { kind: "page", href: "/termekek/akciok", title: "Akciók", meta: "Outlet és kedvezmények" },
  { kind: "page", href: "/rolunk", title: "Rólunk", meta: "1995 óta" },
  { kind: "page", href: "/kapcsolat", title: "Kapcsolat", meta: "Telefon, e-mail" },
  { kind: "page", href: "/info/szallitas-es-fizetes", title: "Szállítás és fizetés", meta: "Információ" },
  ...POSTS.map((p) => ({ kind: "page" as const, href: `/blog/${p.slug}`, title: p.title, meta: "Blog" })),
];

const INDEX = PRODUCTS.map((p) => ({
  p,
  hay: normalize(`${p.name} ${p.brand} ${p.short} ${p.sub}`),
}));

const SUGGESTED = ["gumiszalag", "Gonge", "Biofreeze", "szenzoros", "kettlebell"];

function search(q: string): Result[] {
  const terms = normalize(q).split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  const products = INDEX.filter(({ hay }) => terms.every((t) => hay.includes(t)))
    .slice(0, 6)
    .map(({ p }) => {
      const fp = fromPrice(p);
      return {
        kind: "product" as const,
        href: `/termek/${p.slug}`,
        title: p.name,
        meta: `${p.brand} · ${formatPrice(fp.price)}${fp.hasRange ? "-tól" : ""}`,
        slug: p.slug,
      };
    });
  const cats: Result[] = CATEGORIES.flatMap((c) => [
    { kind: "category" as const, href: `/termekek/${c.slug}`, title: c.name, meta: "Kategória" },
    ...c.subs.map((s) => ({ kind: "category" as const, href: `/termekek/${c.slug}?al=${s.slug}`, title: s.name, meta: c.short })),
  ])
    .filter((r) => terms.every((t) => normalize(r.title).includes(t)))
    .slice(0, 4);
  const pages = PAGES.filter((r) => terms.every((t) => normalize(r.title).includes(t))).slice(0, 3);
  return [...products, ...cats, ...pages];
}

export function CommandPalette() {
  const open = useUI((s) => s.searchOpen);
  const setOpen = useUI((s) => s.setSearchOpen);
  const router = useRouter();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const close = () => setOpen(false);
  useDialogBehavior(open, close, panel);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!useUI.getState().searchOpen);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  useEffect(() => {
    if (!open) setQ("");
  }, [open]);

  const results = useMemo(() => search(q), [q]);
  useEffect(() => setActive(0), [q]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const go = (href: string) => {
    close();
    router.push(href);
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(results.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active].href);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-start justify-center px-3 pt-[8vh] sm:pt-[12vh]">
          <m.div className="absolute inset-0 bg-ink/55 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close} />
          <m.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label="Keresés a termékek között"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-paper shadow-[0_40px_120px_-30px_rgb(11_21_48/0.7)]"
          >
            <div className="spectrum-rule !rounded-none" aria-hidden="true" />
            <div className="flex items-center gap-3 border-b border-line px-5">
              <Search className="h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
              <input
                data-autofocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Keress terméket, márkát, kategóriát…"
                className="h-16 w-full bg-transparent text-lg outline-none placeholder:text-muted/80"
                role="combobox"
                aria-expanded={results.length > 0}
                aria-controls="search-results"
                aria-activedescendant={results[active] ? `search-opt-${active}` : undefined}
                aria-label="Keresés"
              />
              <kbd className="hidden rounded-md border border-line bg-white px-2 py-1 text-xs font-semibold text-muted sm:inline">Esc</kbd>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {!q && (
                <div className="p-4">
                  <p className="eyebrow mb-3 text-muted">Népszerű keresések</p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTED.map((s) => (
                      <button key={s} type="button" onClick={() => setQ(s)} className="min-h-10 rounded-full border border-line bg-white px-4 text-sm font-medium hover:border-ink/40">
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {q && results.length === 0 && (
                <p className="p-8 text-center text-muted">
                  Nincs találat erre: <strong className="text-ink">„{q}”</strong>. Próbáld rövidebben, vagy hívj minket!
                </p>
              )}
              {results.length > 0 && (
                <ul id="search-results" role="listbox" ref={listRef} aria-label="Találatok">
                  {results.map((r, i) => {
                    const product = r.kind === "product" ? PRODUCTS.find((p) => p.slug === r.slug) : undefined;
                    return (
                      <li
                        key={r.href + i}
                        id={`search-opt-${i}`}
                        data-index={i}
                        role="option"
                        aria-selected={i === active}
                        onMouseMove={() => setActive(i)}
                        onClick={() => go(r.href)}
                        className={cn("flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-2.5", i === active && "bg-white shadow-sm")}
                      >
                        {product ? (
                          <span className="h-12 w-12 shrink-0 overflow-hidden rounded-xl" style={artBackground(product.tone)}>
                            <ProductArt kind={product.art} tone={product.tone} className="h-full w-full p-1" />
                          </span>
                        ) : (
                          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-paper-2 text-muted">
                            {r.kind === "category" ? <LayoutGrid className="h-5 w-5" aria-hidden="true" /> : <FileText className="h-5 w-5" aria-hidden="true" />}
                          </span>
                        )}
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-medium">{r.title}</span>
                          <span className="block truncate text-xs text-muted">{r.meta}</span>
                        </span>
                        {i === active ? (
                          <CornerDownLeft className="h-4 w-4 text-muted" aria-hidden="true" />
                        ) : (
                          <ArrowRight className="h-4 w-4 text-line" aria-hidden="true" />
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            <div className="hidden items-center gap-4 border-t border-line px-5 py-3 text-xs text-muted sm:flex">
              <span><kbd className="font-semibold">↑↓</kbd> navigálás</span>
              <span><kbd className="font-semibold">Enter</kbd> megnyitás</span>
              <span className="ml-auto">{PRODUCTS.length} termék a demó katalógusban</span>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}
