"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { ArrowLeft, Banknote, Building, Check, CreditCard, Package, ShieldCheck, Store, Truck } from "lucide-react";
import { ProductArt, artBackground } from "@/components/brand/ProductArt";
import { Button } from "@/components/ui/Button";
import { ChoiceCard, Field } from "@/components/ui/Field";
import { SITE } from "@/data/site";
import { cn, formatPrice } from "@/lib/format";
import { cartTotals, resolveLines, useHydrated, useShop } from "@/lib/store";
import { OrderSummary } from "./OrderSummary";

const STEPS = ["Szállítás", "Fizetés", "Áttekintés"];

const DELIVERY = [
  { id: "gls", title: "GLS házhoz szállítás", text: "1–2 munkanap", fee: SITE.shippingFee, icon: Truck },
  { id: "foxpost", title: "Foxpost csomagautomata", text: "Válassz automatát a következő lépésben", fee: 1290, icon: Package },
  { id: "pickup", title: "Személyes átvétel", text: "Budapesti bemutatóterem, előzetes egyeztetéssel", fee: 0, icon: Store },
] as const;

const PAYMENT = [
  { id: "card", title: "Bankkártya", text: "Demó: nem jelenik meg valódi fizetési felület", fee: 0, icon: CreditCard },
  { id: "transfer", title: "Banki átutalás", text: "Intézményeknek és cégeknek ajánlott", fee: 0, icon: Building },
  { id: "cod", title: "Utánvét", text: "Fizetés a futárnál", fee: 490, icon: Banknote },
] as const;

type DeliveryId = (typeof DELIVERY)[number]["id"];
type PaymentId = (typeof PAYMENT)[number]["id"];

export const ORDER_KEY = "thera-team-last-order";

export function Checkout() {
  const router = useRouter();
  const hydrated = useHydrated();
  const cart = useShop((s) => s.cart);
  const clearCart = useShop((s) => s.clearCart);
  const [step, setStep] = useState(0);
  const [delivery, setDelivery] = useState<DeliveryId>("gls");
  const [payment, setPayment] = useState<PaymentId>("card");
  const [company, setCompany] = useState(false);
  const [data, setData] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const lines = hydrated ? resolveLines(cart) : [];
  const base = cartTotals(lines, SITE.freeShippingFrom, SITE.shippingFee);
  const d = DELIVERY.find((x) => x.id === delivery)!;
  const p = PAYMENT.find((x) => x.id === payment)!;
  const shipping = base.subtotal >= SITE.freeShippingFrom ? 0 : d.fee;
  const totals = { ...base, shipping: shipping + p.fee, total: base.subtotal + shipping + p.fee };

  const field = (name: string) => ({
    name,
    value: data[name] ?? "",
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setData((s) => ({ ...s, [name]: e.target.value })),
  });

  const goTo = (n: number) => {
    setStep(n);
    window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    window.setTimeout(() => headingRef.current?.focus(), 50);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current?.reportValidity()) return;
    if (step < 2) return goTo(step + 1);
    try {
      sessionStorage.setItem(
        ORDER_KEY,
        JSON.stringify({ id: `DEMO-${Math.floor(100000 + Math.random() * 900000)}`, total: totals.total, points: totals.points, name: data.name ?? "", email: data.email ?? "" }),
      );
    } catch {
      /* ignore */
    }
    clearCart();
    router.push("/penztar/visszaigazolas");
  };

  if (hydrated && lines.length === 0) {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="text-h2 font-bold">A kosarad üres</h1>
        <p className="mt-3 text-muted">A pénztárhoz előbb tegyél terméket a kosárba.</p>
        <Link href="/termekek" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-ink px-6 font-semibold text-white">
          Vissza a termékekhez
        </Link>
      </div>
    );
  }

  return (
    <div className="container-x pb-24 pt-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-4">
          <Link href="/kosar" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Vissza a kosárhoz
          </Link>
          <span className="inline-flex items-center gap-2 rounded-full bg-r-yellow/30 px-3 py-1.5 text-xs font-semibold">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" /> Demó pénztár
          </span>
        </div>

        <ol className="mt-8 grid grid-cols-3 gap-2" aria-label="Rendelés lépései">
          {STEPS.map((s, i) => (
            <li key={s}>
              <button
                type="button"
                disabled={i > step}
                onClick={() => goTo(i)}
                className="group w-full text-left disabled:cursor-default"
                aria-current={i === step ? "step" : undefined}
              >
                <span className="block h-1.5 overflow-hidden rounded-full bg-line">
                  <span className={cn("block h-full bg-spectrum transition-[width] duration-700", i <= step ? "w-full" : "w-0")} />
                </span>
                <span className={cn("mt-3 flex items-center gap-2 text-sm font-semibold", i <= step ? "text-ink" : "text-muted")}>
                  <span
                    className={cn(
                      "inline-flex h-6 w-6 items-center justify-center rounded-full text-xs",
                      i < step ? "bg-ok text-white" : i === step ? "bg-ink text-white" : "bg-line text-muted",
                    )}
                  >
                    {i < step ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : i + 1}
                  </span>
                  {s}
                </span>
              </button>
            </li>
          ))}
        </ol>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_24rem]">
          <form ref={formRef} onSubmit={onSubmit} noValidate={false} className="space-y-8">
            <h1 ref={headingRef} tabIndex={-1} className="text-h2 font-extrabold focus:outline-none">
              {["Szállítási adatok", "Fizetési mód", "Rendelés áttekintése"][step]}
            </h1>

            {step === 0 && (
              <>
                <fieldset className="grid gap-4 sm:grid-cols-2">
                  <legend className="sr-only">Kapcsolattartó adatok</legend>
                  <Field label="Teljes név" required autoComplete="name" {...field("name")} className="sm:col-span-2" />
                  <Field label="E-mail cím" type="email" required autoComplete="email" {...field("email")} />
                  <Field label="Telefonszám" type="tel" required autoComplete="tel" placeholder="+36 30 123 4567" {...field("phone")} />
                  <Field label="Irányítószám" required inputMode="numeric" pattern="[0-9]{4}" autoComplete="postal-code" {...field("zip")} hint="4 számjegy" />
                  <Field label="Város" required autoComplete="address-level2" {...field("city")} />
                  <Field label="Utca, házszám" required autoComplete="street-address" {...field("street")} className="sm:col-span-2" />
                </fieldset>
                <fieldset className="space-y-3">
                  <legend className="mb-3 font-display text-lg font-bold">Szállítási mód</legend>
                  {DELIVERY.map((o) => (
                    <ChoiceCard
                      key={o.id}
                      name="delivery"
                      value={o.id}
                      checked={delivery === o.id}
                      onChange={(v) => setDelivery(v as DeliveryId)}
                      title={o.title}
                      text={o.text}
                      icon={<o.icon className="h-6 w-6 text-muted" aria-hidden="true" />}
                      aside={o.fee === 0 || base.subtotal >= SITE.freeShippingFrom ? "Ingyenes" : formatPrice(o.fee)}
                    />
                  ))}
                </fieldset>
              </>
            )}

            {step === 1 && (
              <>
                <fieldset className="space-y-3">
                  <legend className="sr-only">Fizetési mód</legend>
                  {PAYMENT.map((o) => (
                    <ChoiceCard
                      key={o.id}
                      name="payment"
                      value={o.id}
                      checked={payment === o.id}
                      onChange={(v) => setPayment(v as PaymentId)}
                      title={o.title}
                      text={o.text}
                      icon={<o.icon className="h-6 w-6 text-muted" aria-hidden="true" />}
                      aside={o.fee ? `+${formatPrice(o.fee)}` : undefined}
                    />
                  ))}
                </fieldset>
                <div className="rounded-3xl bg-white p-5">
                  <label className="flex min-h-11 cursor-pointer items-center gap-3 font-semibold">
                    <input type="checkbox" checked={company} onChange={(e) => setCompany(e.target.checked)} className="h-5 w-5 accent-[#0b1530]" />
                    Céges / intézményi számlát kérek
                  </label>
                  {company && (
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <Field label="Cég / intézmény neve" required {...field("company")} />
                      <Field label="Adószám" required placeholder="12345678-1-12" pattern="[0-9]{8}-[0-9]-[0-9]{2}" {...field("tax")} hint="Formátum: 12345678-1-12" />
                    </div>
                  )}
                </div>
              </>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white p-5 text-sm">
                    <p className="font-display text-base font-bold">Szállítás</p>
                    <p className="mt-2">{data.name}</p>
                    <p className="text-muted">
                      {data.zip} {data.city}, {data.street}
                    </p>
                    <p className="text-muted">
                      {data.email} · {data.phone}
                    </p>
                    <p className="mt-2 font-semibold">{d.title}</p>
                    <button type="button" onClick={() => goTo(0)} className="mt-3 min-h-9 font-semibold underline underline-offset-4">
                      Módosítás
                    </button>
                  </div>
                  <div className="rounded-3xl bg-white p-5 text-sm">
                    <p className="font-display text-base font-bold">Fizetés</p>
                    <p className="mt-2 font-semibold">{p.title}</p>
                    {company && <p className="text-muted">Számla: {data.company}, {data.tax}</p>}
                    <button type="button" onClick={() => goTo(1)} className="mt-3 min-h-9 font-semibold underline underline-offset-4">
                      Módosítás
                    </button>
                  </div>
                </div>
                <ul className="divide-y divide-line rounded-3xl bg-white px-5">
                  {lines.map((l) => (
                    <li key={l.key} className="flex items-center gap-4 py-3">
                      <span className="h-14 w-14 shrink-0 overflow-hidden rounded-xl" style={artBackground(l.tone)}>
                        <ProductArt kind={l.art} tone={l.tone} className="h-full w-full p-1" />
                      </span>
                      <span className="min-w-0 flex-1 text-sm">
                        <span className="block truncate font-semibold">{l.name}</span>
                        <span className="text-muted">
                          {l.qty} db {l.variantLabel ? `· ${l.variantLabel}` : ""}
                        </span>
                      </span>
                      <span className="font-semibold tabular-nums">{formatPrice(l.unitPrice * l.qty)}</span>
                    </li>
                  ))}
                </ul>
                <Field label="Megjegyzés a rendeléshez" textarea rows={3} name="note" />
                <label className="flex cursor-pointer items-start gap-3 text-sm">
                  <input type="checkbox" required className="mt-0.5 h-5 w-5 shrink-0 accent-[#0b1530]" />
                  <span>
                    Elolvastam és elfogadom az{" "}
                    <Link href="/info/aszf" className="font-semibold underline underline-offset-4">
                      ÁSZF
                    </Link>
                    -et és az{" "}
                    <Link href="/info/adatvedelem" className="font-semibold underline underline-offset-4">
                      Adatvédelmi tájékoztatót
                    </Link>
                    .
                  </span>
                </label>
              </div>
            )}

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
              {step > 0 ? (
                <Button type="button" variant="ghost" onClick={() => goTo(step - 1)}>
                  Vissza
                </Button>
              ) : (
                <span />
              )}
              <Button type="submit" variant={step === 2 ? "secondary" : "primary"} className="sm:min-w-64">
                {step === 2 ? `Rendelés leadása (demó) · ${formatPrice(totals.total)}` : "Tovább"}
              </Button>
            </div>
          </form>

          <aside className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start" aria-label="Rendelés összesítő">
            <OrderSummary totals={totals} shippingLabel={p.fee ? `${d.title}, utánvét díjjal` : d.title} />
          </aside>
        </div>
      </div>
    </div>
  );
}
