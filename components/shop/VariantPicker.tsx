"use client";

import { Swatch } from "@/components/ui/Swatch";
import { RESISTANCE_BY_ID } from "@/data/resistance";
import { cn } from "@/lib/format";
import type { Variant } from "@/lib/types";

export function VariantPicker({
  variants,
  value,
  onChange,
}: {
  variants: Variant[];
  value: string;
  onChange: (id: string) => void;
}) {
  const current = variants.find((v) => v.id === value);
  const colored = variants.every((v) => v.resistance);
  const name = colored ? "Ellenállás" : "Változat";

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = variants[(index + dir + variants.length) % variants.length];
    onChange(next.id);
    (e.currentTarget.parentElement?.querySelector(`[data-id="${next.id}"]`) as HTMLElement | null)?.focus();
  };

  return (
    <fieldset>
      <legend className="mb-3 flex w-full items-baseline justify-between text-sm">
        <span className="font-semibold">{name}</span>
        {current && <span className="text-muted">{current.label}</span>}
      </legend>
      <div role="radiogroup" aria-label={name} className={cn("flex flex-wrap", colored ? "gap-2.5" : "gap-2")}>
        {variants.map((v, i) => {
          const selected = v.id === value;
          if (colored && v.resistance) {
            const r = RESISTANCE_BY_ID[v.resistance];
            return (
              <button
                key={v.id}
                data-id={v.id}
                type="button"
                role="radio"
                aria-checked={selected}
                aria-label={`${v.label}${v.stock === "backorder" ? ", beszerzési idő kb. 1 hét" : ""}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => onChange(v.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={cn(
                  "relative flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-300",
                  selected ? "scale-110" : "hover:scale-105",
                )}
                title={`${r.name} – ${r.level}`}
              >
                <span
                  className="absolute inset-0 rounded-full transition-shadow"
                  style={{ boxShadow: selected ? `0 0 0 2px #fff, 0 0 0 4px ${r.id === "beige" ? "#a68b5b" : r.color}` : "none" }}
                  aria-hidden="true"
                />
                <Swatch level={v.resistance} size={40} />
                {v.stock === "backorder" && (
                  <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-[#d99a1e]" aria-hidden="true" />
                )}
              </button>
            );
          }
          return (
            <button
              key={v.id}
              data-id={v.id}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(v.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors",
                selected ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-ink/40",
              )}
            >
              {v.resistance && <Swatch level={v.resistance} size={12} />}
              {v.label}
              {v.stock === "backorder" && <span className="h-2 w-2 rounded-full bg-[#d99a1e]" aria-label="beszerzési idő kb. 1 hét" />}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
