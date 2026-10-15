import type { StockStatus } from "@/lib/types";
import { cn } from "@/lib/format";

export function StockLabel({ stock, className }: { stock: StockStatus; className?: string }) {
  const inStock = stock === "in_stock";
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-xs font-semibold", inStock ? "text-ok" : "text-warn", className)}>
      <span className={cn("relative flex h-2 w-2", inStock && "")} aria-hidden="true">
        {inStock && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-40" />}
        <span className={cn("relative inline-flex h-2 w-2 rounded-full", inStock ? "bg-ok" : "bg-[#d99a1e]")} />
      </span>
      {inStock ? "Raktáron" : "Beszerzési idő: kb. 1 hét"}
    </span>
  );
}
