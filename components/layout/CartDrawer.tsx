"use client";

import { ShoppingBag } from "lucide-react";
import { Sheet } from "@/components/ui/Sheet";
import { ButtonLink } from "@/components/ui/Button";
import { CartLineItem } from "@/components/shop/CartLineItem";
import { ShippingProgress } from "@/components/shop/ShippingProgress";
import { SITE } from "@/data/site";
import { formatPrice } from "@/lib/format";
import { cartTotals, resolveLines, useHydrated, useShop, useUI } from "@/lib/store";

export function CartDrawer() {
  const open = useUI((s) => s.cartOpen);
  const setOpen = useUI((s) => s.setCartOpen);
  const cart = useShop((s) => s.cart);
  const hydrated = useHydrated();
  const lines = hydrated ? resolveLines(cart) : [];
  const t = cartTotals(lines, SITE.freeShippingFrom, SITE.shippingFee);
  const close = () => setOpen(false);

  return (
    <Sheet
      open={open}
      onClose={close}
      title={
        <span>
          Kosár {t.count > 0 && <span className="ml-1 text-base font-semibold text-muted">({t.count})</span>}
        </span>
      }
      footer={
        lines.length > 0 && (
          <div className="space-y-3">
            {t.savings > 0 && (
              <div className="flex justify-between text-sm text-ok">
                <span>Megtakarítás</span>
                <span className="font-semibold">−{formatPrice(t.savings)}</span>
              </div>
            )}
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted">Részösszeg</span>
              <span className="font-display text-2xl font-bold">{formatPrice(t.subtotal)}</span>
            </div>
            <ButtonLink href="/penztar" onClick={close} className="w-full">
              Tovább a pénztárhoz
            </ButtonLink>
            <ButtonLink href="/kosar" onClick={close} variant="ghost" className="w-full">
              Kosár megtekintése
            </ButtonLink>
          </div>
        )
      }
    >
      {lines.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-4 px-8 py-16 text-center">
          <span className="relative inline-flex h-20 w-20 items-center justify-center rounded-full bg-white">
            <ShoppingBag className="h-8 w-8 text-muted" aria-hidden="true" />
            <span className="brand-rule absolute -bottom-2 w-12" aria-hidden="true" />
          </span>
          <p className="font-display text-xl font-bold">A kosarad még üres</p>
          <p className="text-sm text-muted">Kezdd a legnépszerűbb TheraBand szalagokkal, vagy böngéssz a kategóriák között.</p>
          <ButtonLink href="/termekek" onClick={close} variant="primary">
            Termékek felfedezése
          </ButtonLink>
        </div>
      ) : (
        <div className="px-5 py-4">
          <ShippingProgress subtotal={t.subtotal} />
          <ul className="divide-y divide-line">
            {lines.map((l) => (
              <CartLineItem key={l.key} line={l} onNavigate={close} />
            ))}
          </ul>
        </div>
      )}
    </Sheet>
  );
}
