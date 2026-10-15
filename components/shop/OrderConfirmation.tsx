"use client";

import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { RESISTANCE } from "@/data/resistance";
import { formatPrice } from "@/lib/format";
import { ORDER_KEY } from "./Checkout";

interface Order {
  id: string;
  total: number;
  points: number;
  name: string;
  email: string;
}

export function OrderConfirmation() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(ORDER_KEY);
      if (raw) setOrder(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <section className="container-x py-16 sm:py-24">
      <div className="relative mx-auto max-w-2xl overflow-hidden rounded-[2rem] bg-white px-6 py-14 text-center sm:px-12">
        <div className="absolute inset-x-0 top-0 flex h-2" aria-hidden="true">
          {RESISTANCE.map((r) => (
            <span key={r.id} className="flex-1" style={{ background: r.color }} />
          ))}
        </div>
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-ok text-white">
          <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="eyebrow mt-8 text-muted">Demó visszaigazolás</p>
        <h1 className="mt-3 text-h2 font-extrabold">Köszönjük{order?.name ? `, ${order.name.split(" ").slice(-1)[0]}` : ""}!</h1>
        <p className="mt-4 text-lg text-muted">
          Így nézne ki a rendelés visszaigazolása. Mivel ez egy design koncepció, valódi rendelés és fizetés nem történt, adatot nem továbbítottunk.
        </p>
        {order && (
          <dl className="mx-auto mt-8 grid max-w-md grid-cols-3 gap-3 text-left">
            <div className="rounded-2xl bg-paper p-4">
              <dt className="text-xs text-muted">Rendelésszám</dt>
              <dd className="mt-1 text-sm font-bold">{order.id}</dd>
            </div>
            <div className="rounded-2xl bg-paper p-4">
              <dt className="text-xs text-muted">Végösszeg</dt>
              <dd className="mt-1 text-sm font-bold">{formatPrice(order.total)}</dd>
            </div>
            <div className="rounded-2xl bg-paper p-4">
              <dt className="text-xs text-muted">Hűségpont</dt>
              <dd className="mt-1 text-sm font-bold">+{order.points}</dd>
            </div>
          </dl>
        )}
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/">Vissza a főoldalra</ButtonLink>
          <ButtonLink href="/termekek" variant="ghost">
            Tovább vásárolok
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
