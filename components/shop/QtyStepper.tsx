"use client";

import { Minus, Plus } from "lucide-react";

export function QtyStepper({
  value,
  onChange,
  label,
  size = "md",
}: {
  value: number;
  onChange: (v: number) => void;
  label: string;
  size?: "sm" | "md";
}) {
  const h = size === "sm" ? "h-10" : "h-12";
  const btn = `inline-flex ${h} w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 disabled:opacity-40`;
  return (
    <div className={`inline-flex ${h} items-center rounded-full border border-line bg-white`} role="group" aria-label={`Mennyiség: ${label}`}>
      <button type="button" className={btn} onClick={() => onChange(value - 1)} aria-label="Mennyiség csökkentése">
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-7 text-center text-sm font-semibold tabular-nums" aria-live="polite">
        {value}
      </span>
      <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= 99} aria-label="Mennyiség növelése">
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
