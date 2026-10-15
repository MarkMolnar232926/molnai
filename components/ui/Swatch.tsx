import type { ResistanceLevel } from "@/lib/types";
import { RESISTANCE_BY_ID } from "@/data/resistance";

export function Swatch({ level, size = 14, ring = false }: { level: ResistanceLevel; size?: number; ring?: boolean }) {
  const r = RESISTANCE_BY_ID[level];
  return (
    <span
      className="inline-block shrink-0 rounded-full"
      style={{
        width: size,
        height: size,
        background:
          level === "silver" || level === "gold"
            ? `linear-gradient(135deg, ${r.color}, #fff 45%, ${r.color})`
            : r.color,
        boxShadow: ring ? "0 0 0 2px #fff, 0 0 0 3.5px rgb(10 37 64 / .25)" : "inset 0 0 0 1px rgb(10 37 64 / .15)",
      }}
      title={r.name}
      aria-hidden="true"
    />
  );
}
