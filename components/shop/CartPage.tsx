"use client";

import { ShieldCheck, ShoppingBag } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SITE } from "@/data/site";
import { cartTotals, resolveLines, useHydrated, useShop } from "@/lib/store";
import { CartLineItem } from "./CartLineItem";
import { OrderSummary } from "./OrderSummary";
import { ShippingProgress } from "./ShippingProgress";

export function CartPage() {
  const hydrated = useHydrated();
  const cart = useShop((s) => s.cart);
  const lines = hydrated ? resolveLines(cart) : [];
  const totals = cartTotals(lines, SITE.freeShippingFrom, SITE.shippingFee);

  return (
    <div className="container-x min-h-[80vh] pb-24 pt-6 sm:pt-8">
      <Breadcrumbs items={[{ label: "Kosár" }]} />
      <h1 className="mt-6 text-h1 font-extrabold">Kosár</h1>

      {!hydrated || lines.length === 0 ? (
        // Before hydration the empty state is rendered invisibly so its size is reserved (no layout shift).
        <div
          className={`mt-10 flex flex-col items-center rounded-[2rem] bg-white px-6 py-20 text-center ${hydrated ? "" : "invisible"}`}
          aria-hidden={!hydrated || undefined}
        >
          <ShoppingBag className="h-12 w-12 text-muted" aria-hidden="true" />
          <p className="mt-6 font-display text-2xl font-bold">A kosarad üres</p>
          <p className="mt-2 max-w-md text-muted">Nézz körül a kínálatban, vagy kezdd a TheraBand ellenállás-útmutatóval.</p>
          <ButtonLink href="/termekek" className="mt-8">
            Termékek felfedezése
          </ButtonLink>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_24rem]">
          <div>
            <ShippingProgress subtotal={totals.subtotal} />
            <ul className="mt-4 divide-y divide-line rounded-3xl bg-white px-5">
              {lines.map((l) => (
                <CartLineItem key={l.key} line={l} />
              ))}
            </ul>
          </div>
          <div className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
            <OrderSummary totals={totals}>
              <ButtonLink href="/penztar" className="mt-6 w-full">
                Tovább a pénztárhoz
              </ButtonLink>
              <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" /> Demó pénztár, valódi fizetés nem történik
              </p>
            </OrderSummary>
          </div>
        </div>
      )}
    </div>
  );
}
