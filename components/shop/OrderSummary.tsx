import { Coins } from "lucide-react";
import { formatPrice } from "@/lib/format";
import type { cartTotals } from "@/lib/store";

export function OrderSummary({ totals, shippingLabel, children }: { totals: ReturnType<typeof cartTotals>; shippingLabel?: string; children?: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-white p-6">
      <h2 className="font-display text-xl font-bold">Összesítő</h2>
      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted">Részösszeg ({totals.count} termék)</dt>
          <dd className="font-semibold tabular-nums">{formatPrice(totals.subtotal)}</dd>
        </div>
        {totals.savings > 0 && (
          <div className="flex justify-between text-ok">
            <dt>Akciós megtakarítás</dt>
            <dd className="font-semibold tabular-nums">−{formatPrice(totals.savings)}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt className="text-muted">Szállítás{shippingLabel ? ` (${shippingLabel})` : ""}</dt>
          <dd className="font-semibold tabular-nums">{totals.shipping === 0 ? "Ingyenes" : formatPrice(totals.shipping)}</dd>
        </div>
        <div className="flex items-baseline justify-between border-t border-line pt-4">
          <dt className="font-semibold">Fizetendő</dt>
          <dd className="font-display text-3xl font-bold tabular-nums">{formatPrice(totals.total)}</dd>
        </div>
      </dl>
      <p className="mt-4 flex items-center gap-2 rounded-2xl bg-brand-lime/20 p-3 text-sm">
        <Coins className="h-4 w-4 shrink-0 text-brand-green-dark" aria-hidden="true" />
        <span>
          <strong>{totals.points} Hűségpont</strong> jár ezért a rendelésért.
        </span>
      </p>
      {children}
    </div>
  );
}
