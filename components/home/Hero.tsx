import { ArrowRight, Award, Building2, ShieldCheck, Truck } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { RESISTANCE } from "@/data/resistance";
import { HeroBands } from "./HeroBands";

const TRUST = [
  { icon: Award, title: "30+ év tapasztalat", text: "1995 óta a mozgás szolgálatában" },
  { icon: ShieldCheck, title: "Kizárólagos TheraBand forgalmazó", text: "Eredeti termékek, garanciával" },
  { icon: Truck, title: "Gyors szállítás", text: "Raktárról akár 1–2 munkanap" },
  { icon: Building2, title: "Intézményi partnerek", text: "Kórházak, iskolák, sportklubok" },
];

function AnniversarySeal() {
  const text = "1995 ÓTA · TÁRS A MOZGÁSBAN · 30 ÉV · ";
  return (
    <div className="pointer-events-none absolute right-6 top-8 hidden h-32 w-32 lg:block xl:right-12 xl:top-12" aria-hidden="true">
      <svg viewBox="0 0 120 120" className="h-full w-full animate-[spin_28s_linear_infinite]">
        <defs>
          <path id="seal-circle" d="M60 60 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0" />
        </defs>
        <text fill="#fff" fontSize="9.4" fontWeight="600" letterSpacing="2.4" opacity=".8">
          <textPath href="#seal-circle">{text}</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-r-gold font-display text-2xl font-extrabold text-ink">
        30
      </span>
    </div>
  );
}

export function Hero() {
  return (
    <section className="on-dark grain relative isolate overflow-hidden bg-ink text-white" aria-labelledby="hero-title">
      <HeroBands className="absolute inset-0 -z-10 h-full w-full" />
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(11_21_48/0.92)_0%,rgb(11_21_48/0.75)_45%,rgb(11_21_48/0.15)_100%)] lg:bg-[linear-gradient(90deg,rgb(11_21_48/0.97)_0%,rgb(11_21_48/0.85)_38%,rgb(11_21_48/0)_70%)]"
        aria-hidden="true"
      />
      <AnniversarySeal />

      <div className="container-x relative flex min-h-[calc(100svh-var(--header-h)-2.25rem)] flex-col justify-center pb-10 pt-14 lg:min-h-[44rem] lg:py-24">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-ink-2/80 px-4 py-2 text-sm font-medium text-white/85">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-r-yellow opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-r-yellow" />
            </span>
            Kizárólagos TheraBand forgalmazó · 1995 óta
          </p>
          <h1 id="hero-title" className="mt-7 text-display font-extrabold">
            Társ a<br />
            <span className="text-spectrum animate-flow">mozgásban!</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
            Rehabilitációs, sport- és fejlesztőeszközök gyógytornászoknak, sportolóknak, intézményeknek és családoknak.
            Harminc év szakmai tapasztalattal, az első lépéstől a csúcsteljesítményig.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Magnetic>
              <ButtonLink href="/termekek" variant="secondary" className="w-full px-8 sm:w-auto">
                Termékek felfedezése <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink href="/szakembereknek" variant="outline-light" className="w-full px-8 sm:w-auto">
                Szakértői kedvezmény
              </ButtonLink>
            </Magnetic>
          </div>
          <div className="mt-10 flex items-center gap-4 text-sm text-white/65">
            <div className="flex -space-x-1.5" aria-hidden="true">
              {RESISTANCE.map((r) => (
                <span key={r.id} className="h-5 w-5 rounded-full ring-2 ring-ink" style={{ background: r.color }} />
              ))}
            </div>
            <span>Bézstől az aranyig: 8 ellenállás-szint, egy rendszer.</span>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-ink/85">
        <ul className="container-x grid grid-cols-2 gap-x-4 gap-y-6 py-6 lg:grid-cols-4 lg:py-7">
          {TRUST.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-r-yellow">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-semibold leading-tight sm:text-[0.95rem]">{title}</span>
                <span className="mt-0.5 block text-xs text-white/65 sm:text-sm">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
