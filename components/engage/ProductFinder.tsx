"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { ArrowLeft, Baby, Check, Dumbbell, HeartPulse, Home, Laptop, RotateCcw, ShoppingBag, Sparkles } from "lucide-react";
import { ProductArt, artBackground } from "@/components/brand/ProductArt";
import { Button } from "@/components/ui/Button";
import { Swatch } from "@/components/ui/Swatch";
import { BUDGETS, GOALS, LEVELS, recommend, type Budget, type Goal, type Level } from "@/data/finder";
import { getProduct, getVariant } from "@/data/products";
import { RESISTANCE_BY_ID } from "@/data/resistance";
import { burst } from "@/lib/confetti";
import { cn, formatPrice } from "@/lib/format";
import { useShop, useUI } from "@/lib/store";

const GOAL_ICON = { rehab: HeartPulse, fitness: Home, sport: Dumbbell, kids: Baby, office: Laptop } as const;
const STEPS = ["Cél", "Szint", "Keret"];

/** Three questions → a personal, add-to-cart-ready bundle. */
/** `headingLevel` keeps the document outline valid: h3 under a home-page section, h2 on its own page. */
export function ProductFinder({ compact = false, headingLevel = "h3" }: { compact?: boolean; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [level, setLevel] = useState<Level | null>(null);
  const [budget, setBudget] = useState<Budget | null>(null);
  const [added, setAdded] = useState(false);
  const addToCart = useShop((s) => s.addToCart);
  const showToast = useUI((s) => s.showToast);
  const setCartOpen = useUI((s) => s.setCartOpen);
  const addRef = useRef<HTMLButtonElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const result = useMemo(() => (goal && level && budget ? recommend(goal, level, budget) : null), [goal, level, budget]);
  const total = result?.items.reduce((s, i) => s + i.price, 0) ?? 0;

  const next = (n: number) => {
    setStep(n);
    window.setTimeout(() => headingRef.current?.focus({ preventScroll: true }), 20);
  };

  const reset = () => {
    setGoal(null);
    setLevel(null);
    setBudget(null);
    setAdded(false);
    next(0);
  };

  const addAll = () => {
    if (!result) return;
    result.items.forEach((i) => addToCart(i.slug, i.variantId));
    burst(addRef.current, 28);
    setAdded(true);
    showToast(`${result.items.length} ajánlott termék a kosárba került`);
    window.setTimeout(() => setCartOpen(true), 700);
  };

  const option = (selected: boolean) =>
    cn(
      "group relative flex w-full items-start gap-4 rounded-2xl border bg-white p-4 text-left transition-all duration-300 sm:p-5",
      selected ? "border-brand shadow-[0_0_0_1px_var(--color-brand)]" : "border-line hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg",
    );

  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-paper-2 p-5 sm:p-8 lg:p-10">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-sky/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-brand-lime/25 blur-3xl" aria-hidden="true" />

      <div className="relative">
        {/* Progress */}
        <ol className="flex items-center gap-2" aria-label="A termékválasztó lépései">
          {[...STEPS, "Ajánlat"].map((s, i) => (
            <li key={s} className="flex flex-1 items-center gap-2" aria-current={i === step ? "step" : undefined}>
              <span
                className={cn(
                  "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors duration-500",
                  i < step ? "bg-brand-green-dark text-white" : i === step ? "bg-brand text-white" : "bg-white text-muted",
                )}
              >
                {i < step ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : i + 1}
              </span>
              <span className={cn("hidden text-sm font-semibold sm:inline", i <= step ? "text-ink" : "text-muted")}>{s}</span>
              {i < 3 && (
                <span className="h-1 flex-1 overflow-hidden rounded-full bg-white" aria-hidden="true">
                  <span className={cn("block h-full bg-brand-gradient transition-[width] duration-700", i < step ? "w-full" : "w-0")} />
                </span>
              )}
            </li>
          ))}
        </ol>

        <div key={step} className="mt-8 animate-[finder-in_.5s_var(--ease-out-expo)]">
          {step === 0 && (
            <>
              <H ref={headingRef} tabIndex={-1} className="text-h3 font-bold focus:outline-none">
                Mire keresel eszközt?
              </H>
              <div className={cn("mt-6 grid gap-3", compact ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-5")}>
                {GOALS.map((g) => {
                  const Icon = GOAL_ICON[g.id];
                  return (
                    <button
                      key={g.id}
                      type="button"
                      aria-pressed={goal === g.id}
                      onClick={() => {
                        setGoal(g.id);
                        next(1);
                      }}
                      className={cn(option(goal === g.id), !compact && "lg:flex-col")}
                    >
                      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block font-display text-lg font-bold leading-tight">{g.title}</span>
                        <span className="mt-1 block text-sm text-muted">{g.text}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <H ref={headingRef} tabIndex={-1} className="text-h3 font-bold focus:outline-none">
                Hol tartasz most?
              </H>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {LEVELS.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    aria-pressed={level === l.id}
                    onClick={() => {
                      setLevel(l.id);
                      next(2);
                    }}
                    className={option(level === l.id)}
                  >
                    <span>
                      <span className="block font-display text-lg font-bold">{l.title}</span>
                      <span className="mt-1 block text-sm text-muted">{l.text}</span>
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <H ref={headingRef} tabIndex={-1} className="text-h3 font-bold focus:outline-none">
                Mekkora keretben gondolkodsz?
              </H>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {BUDGETS.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    aria-pressed={budget === b.id}
                    onClick={() => {
                      setBudget(b.id);
                      next(3);
                    }}
                    className={option(budget === b.id)}
                  >
                    <span>
                      <span className="block font-display text-lg font-bold">{b.title}</span>
                      <span className="mt-1 block text-sm text-muted">{b.text}</span>
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 3 && result && (
            <>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="eyebrow flex items-center gap-2 text-brand">
                    <Sparkles className="h-4 w-4" aria-hidden="true" /> A te csomagod
                  </p>
                  <H ref={headingRef} tabIndex={-1} className="mt-2 text-h3 font-bold focus:outline-none">
                    {GOALS.find((g) => g.id === goal)?.title}: ezt ajánljuk
                  </H>
                  <p className="mt-2 flex items-center gap-2 text-sm text-muted">
                    Javasolt ellenállás: <Swatch level={result.color} size={16} />
                    <strong className="text-ink">
                      {RESISTANCE_BY_ID[result.color].name} · {RESISTANCE_BY_ID[result.color].level}
                    </strong>
                  </p>
                </div>
                <button type="button" onClick={reset} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline">
                  <RotateCcw className="h-4 w-4" aria-hidden="true" /> Újrakezdem
                </button>
              </div>

              <ul className="mt-6 grid gap-3 md:grid-cols-3">
                {result.items.map((item, i) => {
                  const p = getProduct(item.slug)!;
                  const v = getVariant(p, item.variantId);
                  const tone = v?.resistance ? RESISTANCE_BY_ID[v.resistance].color : p.tone;
                  return (
                    <li
                      key={item.slug}
                      className="flex flex-col overflow-hidden rounded-2xl bg-white opacity-0 animate-[finder-in_.6s_var(--ease-out-expo)_forwards]"
                      style={{ animationDelay: `${120 + i * 120}ms` }}
                    >
                      <Link href={`/termek/${p.slug}${item.variantId ? `?valtozat=${item.variantId}` : ""}`} className="group flex flex-1 flex-col">
                        <span className="relative block aspect-[4/3]" style={artBackground(tone)}>
                          <ProductArt kind={p.art} tone={tone} className="absolute inset-0 m-auto h-4/5 w-4/5 transition-transform duration-700 group-hover:scale-110" />
                        </span>
                        <span className="flex flex-1 flex-col p-4">
                          <span className="font-semibold leading-snug group-hover:underline">{p.name}</span>
                          {v && <span className="mt-1 text-xs text-muted">{v.label}</span>}
                          <span className="mt-2 flex-1 text-sm text-muted">{item.why}</span>
                          <span className="mt-3 font-display text-lg font-bold">{formatPrice(item.price)}</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-muted">Csomag összesen</p>
                  <p className="font-display text-3xl font-bold">{formatPrice(total)}</p>
                </div>
                <Button ref={addRef} onClick={addAll} className={cn("sm:px-8", added && "!bg-brand-green-dark")}>
                  {added ? <Check className="h-4 w-4" aria-hidden="true" /> : <ShoppingBag className="h-4 w-4" aria-hidden="true" />}
                  {added ? "Kosárban" : "Mindet a kosárba"}
                </Button>
              </div>
            </>
          )}

          {step > 0 && step < 3 && (
            <button type="button" onClick={() => next(step - 1)} className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Vissza
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
