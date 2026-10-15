import { discountPercent, formatPrice, cn } from "@/lib/format";

export function Price({
  price,
  oldPrice,
  from = false,
  size = "md",
  className,
  dark = false,
}: {
  price: number;
  oldPrice?: number;
  from?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  dark?: boolean;
}) {
  const pct = discountPercent(price, oldPrice);
  const sizes = { sm: "text-base", md: "text-lg", lg: "text-3xl sm:text-4xl" };
  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-2 gap-y-0.5", className)}>
      <span className={cn("font-display font-bold tracking-tight", sizes[size], pct ? (dark ? "text-[#ff9a9d]" : "text-sale") : dark ? "text-white" : "text-ink")}>
        {formatPrice(price)}
        {from && <span className={cn("text-[0.7em] font-semibold", dark ? "text-white/60" : "text-muted")}>-tól</span>}
      </span>
      {pct && oldPrice && (
        <>
          <span className={cn("line-through", dark ? "text-white/60" : "text-muted", size === "lg" ? "text-lg" : "text-sm")}>
            <span className="sr-only">Eredeti ár: </span>
            {formatPrice(oldPrice)}
          </span>
          {size === "lg" && (
            <span className="rounded-full bg-sale px-2.5 py-1 text-sm font-bold text-white">−{pct}%</span>
          )}
        </>
      )}
    </div>
  );
}
