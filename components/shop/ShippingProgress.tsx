import { Truck } from "lucide-react";
import { SITE } from "@/data/site";
import { formatPrice } from "@/lib/format";

export function ShippingProgress({ subtotal }: { subtotal: number }) {
  const left = Math.max(0, SITE.freeShippingFrom - subtotal);
  const pct = Math.min(100, (subtotal / SITE.freeShippingFrom) * 100);
  return (
    <div className="rounded-2xl bg-white p-4">
      <p className="flex items-center gap-2 text-sm">
        <Truck className="h-4 w-4 shrink-0 text-r-green" aria-hidden="true" />
        {left > 0 ? (
          <span>
            Még <strong>{formatPrice(left)}</strong> és a szállítás <strong>ingyenes</strong>.
          </span>
        ) : (
          <span>
            <strong>Ingyenes szállítás</strong>: a kosarad elérte a {formatPrice(SITE.freeShippingFrom)}-ot.
          </span>
        )}
      </p>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-paper-2" role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100} aria-label="Ingyenes szállításig">
        <div className="h-full rounded-full bg-spectrum transition-[width] duration-700 ease-[var(--ease-out-expo)]" style={{ width: `${pct}%`, backgroundSize: `${(100 / Math.max(pct, 1)) * 100}% 100%` }} />
      </div>
    </div>
  );
}
