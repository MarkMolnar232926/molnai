import { Star } from "lucide-react";

export function Stars({ rating, count, className = "" }: { rating: number; count?: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 text-xs text-muted ${className}`}>
      <span className="flex" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className="h-3.5 w-3.5"
            strokeWidth={0}
            fill={i <= Math.round(rating) ? "#c99a2e" : "#d8d3c6"}
          />
        ))}
      </span>
      <span className="sr-only">Értékelés: {rating.toString().replace(".", ",")} az 5-ből</span>
      {count !== undefined && <span aria-hidden="true">({count})</span>}
    </span>
  );
}
