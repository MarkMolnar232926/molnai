import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/layout/PageHero";
import { SITE } from "@/data/site";

export const metadata: Metadata = { title: "Kapcsolat", description: "Telefon, e-mail, nyitvatartás. Szakmai tanácsadás termékválasztáshoz." };

const HOURS = [
  ["Hétfő – Csütörtök", "8:00 – 16:30"],
  ["Péntek", "8:00 – 14:00"],
  ["Szombat – Vasárnap", "Zárva"],
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Kapcsolat"
        title="Beszéljünk a mozgásról."
        text="Termékválasztásban, rendelésben vagy intézményi ajánlatban is segítünk. Telefonon szakembert érsz el."
        crumbs={[{ label: "Kapcsolat" }]}
      />
      <section className="container-x py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          <div className="space-y-4">
            <a href={SITE.phoneHref} className="group flex items-center gap-5 rounded-[var(--radius-card)] bg-ink p-6 text-white on-dark">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-green-dark">
                <Phone className="h-6 w-6" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm text-white/65">Hívj minket</span>
                <span className="block font-display text-2xl font-bold group-hover:underline">{SITE.phone}</span>
              </span>
            </a>
            <a href={`mailto:${SITE.email}`} className="group flex items-center gap-5 rounded-[var(--radius-card)] bg-white p-6">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-paper">
                <Mail className="h-6 w-6" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm text-muted">Írj nekünk</span>
                <span className="block font-display text-xl font-bold group-hover:underline">{SITE.email}</span>
              </span>
            </a>
            <div className="rounded-[var(--radius-card)] bg-white p-6">
              <p className="flex items-center gap-3 font-display text-lg font-bold">
                <Clock className="h-5 w-5" aria-hidden="true" /> Ügyfélszolgálat
              </p>
              <dl className="mt-4 divide-y divide-line text-sm">
                {HOURS.map(([d, h]) => (
                  <div key={d} className="flex justify-between py-2.5">
                    <dt className="text-muted">{d}</dt>
                    <dd className="font-semibold">{h}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-xs text-muted">[Nyitvatartás helyőrző, a valós adatokkal cserélendő.]</p>
            </div>
            <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-[#e3e9ef]" style={{ aspectRatio: "4/3" }}>
              <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" aria-hidden="true">
                <g stroke="#fff" strokeWidth="10" fill="none" opacity=".9">
                  <path d="M-10 80 L410 120" />
                  <path d="M-10 210 L410 180" />
                  <path d="M120 -10 L160 310" />
                  <path d="M300 -10 L260 310" />
                </g>
                <g stroke="#fff" strokeWidth="4" fill="none" opacity=".7">
                  <path d="M-10 150 C 100 140, 300 160, 410 150" />
                  <path d="M60 -10 L80 310" />
                </g>
                <path d="M-10 260 C 100 230, 200 290, 410 250" stroke="#9cc3e6" strokeWidth="18" fill="none" />
              </svg>
              <span className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-full">
                <span className="flex h-12 w-12 items-center justify-center rounded-full rounded-bl-none bg-brand text-white shadow-lg" style={{ transform: "rotate(-45deg)" }}>
                  <MapPin className="h-5 w-5" style={{ transform: "rotate(45deg)" }} aria-hidden="true" />
                </span>
              </span>
              <p className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/90 p-3 text-sm backdrop-blur">
                <strong>{SITE.legalName}</strong>
                <br />
                <span className="text-muted">{SITE.address} · [Térkép helyőrző]</span>
              </p>
            </div>
          </div>
          <div>
            <h2 className="mb-6 text-h3 font-bold">Írj nekünk</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
