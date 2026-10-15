"use client";

import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { Swatch } from "@/components/ui/Swatch";
import { RESISTANCE } from "@/data/resistance";
import { cn, formatPrice } from "@/lib/format";
import type { ResistanceLevel } from "@/lib/types";

export interface FilterState {
  subs: string[];
  brands: string[];
  levels: ResistanceLevel[];
  inStock: boolean;
  sale: boolean;
  min: number | null;
  max: number | null;
}

export const EMPTY_FILTERS: FilterState = { subs: [], brands: [], levels: [], inStock: false, sale: false, min: null, max: null };

export interface FilterOptions {
  subs: { slug: string; name: string; count: number }[];
  subLabel: string;
  brands: { name: string; count: number }[];
  levels: ResistanceLevel[];
  priceMax: number;
}

const PRICE_PRESETS: [number | null, number | null, string][] = [
  [null, 5000, "5 000 Ft alatt"],
  [5000, 15000, "5 000 – 15 000 Ft"],
  [15000, 50000, "15 000 – 50 000 Ft"],
  [50000, null, "50 000 Ft felett"],
];

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="border-b border-line py-6 first:pt-0">
      {/* Floated legend sits in normal flow instead of on the fieldset border. */}
      <legend className="float-left mb-4 w-full font-display text-base font-bold">{title}</legend>
      <div className="clear-both">{children}</div>
    </fieldset>
  );
}

function CheckRow({ checked, onChange, label, count }: { checked: boolean; onChange: () => void; label: ReactNode; count?: number }) {
  return (
    <label className="group flex min-h-10 cursor-pointer items-center gap-3 rounded-lg text-sm">
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        className={cn(
          "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-brand peer-focus-visible:ring-offset-2",
          checked ? "border-ink bg-ink text-white" : "border-ink/25 bg-white group-hover:border-ink/50",
        )}
        aria-hidden="true"
      >
        {checked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
      </span>
      <span className="flex-1">{label}</span>
      {count !== undefined && <span className="text-xs tabular-nums text-muted">{count}</span>}
    </label>
  );
}

function Switch({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex min-h-11 cursor-pointer items-center justify-between gap-3 text-sm font-medium">
      {label}
      <input type="checkbox" role="switch" checked={checked} onChange={(e) => onChange(e.target.checked)} className="peer sr-only" />
      <span
        className={cn(
          "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-brand peer-focus-visible:ring-offset-2",
          checked ? "bg-brand-green-dark" : "bg-ink/20",
        )}
        aria-hidden="true"
      >
        <span className={cn("inline-block h-5 w-5 rounded-full bg-white shadow transition-transform", checked ? "translate-x-6" : "translate-x-1")} />
      </span>
    </label>
  );
}

const toggle = <T,>(arr: T[], v: T) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

export function Filters({ state, onChange, options }: { state: FilterState; onChange: (s: FilterState) => void; options: FilterOptions }) {
  const set = (patch: Partial<FilterState>) => onChange({ ...state, ...patch });

  return (
    <div>
      <Group title="Elérhetőség">
        <Switch checked={state.inStock} onChange={(inStock) => set({ inStock })} label="Csak raktáron lévő" />
        <Switch checked={state.sale} onChange={(sale) => set({ sale })} label="Csak akciós termékek" />
      </Group>

      {options.levels.length > 0 && (
        <Group title="Ellenállás-szint">
          <div className="grid grid-cols-4 gap-2">
            {RESISTANCE.filter((r) => options.levels.includes(r.id)).map((r) => {
              const on = state.levels.includes(r.id);
              return (
                <button
                  key={r.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => set({ levels: toggle(state.levels, r.id) })}
                  className={cn(
                    "flex min-h-16 flex-col items-center justify-center gap-1.5 rounded-xl border text-[0.7rem] font-semibold transition-colors",
                    on ? "border-ink bg-white" : "border-transparent bg-white/60 hover:bg-white",
                  )}
                >
                  <Swatch level={r.id} size={22} ring={on} />
                  {r.name}
                </button>
              );
            })}
          </div>
        </Group>
      )}

      {options.subs.length > 1 && (
        <Group title={options.subLabel}>
          <div className="max-h-72 space-y-0.5 overflow-y-auto pr-1">
            {options.subs.map((s) => (
              <CheckRow key={s.slug} checked={state.subs.includes(s.slug)} onChange={() => set({ subs: toggle(state.subs, s.slug) })} label={s.name} count={s.count} />
            ))}
          </div>
        </Group>
      )}

      <Group title="Ár">
        <div className="flex items-center gap-2">
          <label className="flex-1">
            <span className="sr-only">Minimum ár (Ft)</span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              placeholder="0"
              value={state.min ?? ""}
              onChange={(e) => set({ min: e.target.value === "" ? null : Number(e.target.value) })}
              className="h-11 w-full rounded-xl border border-line bg-white px-3 text-sm"
            />
          </label>
          <span className="text-muted" aria-hidden="true">–</span>
          <label className="flex-1">
            <span className="sr-only">Maximum ár (Ft)</span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              placeholder={formatPrice(options.priceMax).replace(/\s?Ft$/, "")}
              value={state.max ?? ""}
              onChange={(e) => set({ max: e.target.value === "" ? null : Number(e.target.value) })}
              className="h-11 w-full rounded-xl border border-line bg-white px-3 text-sm"
            />
          </label>
          <span className="text-sm text-muted">Ft</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {PRICE_PRESETS.map(([min, max, label]) => {
            const on = state.min === min && state.max === max;
            return (
              <button
                key={label}
                type="button"
                aria-pressed={on}
                onClick={() => set(on ? { min: null, max: null } : { min, max })}
                className={cn("min-h-9 rounded-full border px-3 text-xs font-medium", on ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-ink/40")}
              >
                {label}
              </button>
            );
          })}
        </div>
      </Group>

      <Group title="Márka">
        <div className="space-y-0.5">
          {options.brands.map((b) => (
            <CheckRow key={b.name} checked={state.brands.includes(b.name)} onChange={() => set({ brands: toggle(state.brands, b.name) })} label={b.name} count={b.count} />
          ))}
        </div>
      </Group>
    </div>
  );
}
