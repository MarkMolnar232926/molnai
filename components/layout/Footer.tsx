import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { CATEGORIES } from "@/data/categories";
import { SITE } from "@/data/site";
import { CookieSettingsLink } from "./CookieSettingsLink";

const SOCIAL = [
  {
    label: "Facebook",
    path: "M14 8h3V4h-3c-2.8 0-4 1.8-4 4.3V10H7v4h3v8h4v-8h3l1-4h-4V8.6c0-.4.3-.6.6-.6Z",
  },
  {
    label: "Instagram",
    path: "M12 7.4A4.6 4.6 0 1 0 12 16.6 4.6 4.6 0 0 0 12 7.4Zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm5.9-7.8a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM12 3.6c2.7 0 3 0 4.1.1 2.7.1 4 1.4 4.1 4.1.1 1.1.1 1.4.1 4.2s0 3-.1 4.1c-.1 2.7-1.4 4-4.1 4.1-1.1.1-1.4.1-4.1.1s-3.1 0-4.2-.1c-2.7-.1-4-1.4-4.1-4.1C3.6 15 3.6 14.7 3.6 12s0-3.1.1-4.2c.1-2.7 1.4-4 4.1-4.1 1.1-.1 1.5-.1 4.2-.1Z",
  },
  {
    label: "YouTube",
    path: "M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15V9l5.2 3L10 15Z",
  },
];

const COLUMNS = [
  {
    title: "Termékek",
    links: [...CATEGORIES.map((c) => ({ href: `/termekek/${c.slug}`, label: c.name })), { href: "/termekek/akciok", label: "Akciók" }],
  },
  {
    title: "Szakmai partnereknek",
    links: [
      { href: "/szakembereknek", label: "Kedvezmény szakértőknek" },
      { href: "/szakembereknek#regisztracio", label: "Szakmai regisztráció" },
      { href: "/intezmenyeknek", label: "Intézményi Partner Program" },
      { href: "/intezmenyeknek#ajanlatkeres", label: "Ajánlatkérés" },
      { href: "/blog", label: "Oktatás és blog" },
    ],
  },
  {
    title: "Vásárlói információk",
    links: [
      { href: "/info/szallitas-es-fizetes", label: "Szállítás és fizetés" },
      { href: "/info/aszf", label: "ÁSZF" },
      { href: "/info/adatvedelem", label: "Adatvédelem" },
      { href: "/rolunk", label: "Rólunk" },
      { href: "/kapcsolat", label: "Kapcsolat" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden bg-ink text-white">
      <div className="brand-rule !h-1.5 !rounded-none" aria-hidden="true" />
      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1.3fr_2fr] lg:py-20">
        <div className="max-w-sm">
          <Logo dark size="lg" />
          <p className="mt-6 font-display text-3xl font-bold leading-tight">{SITE.tagline}</p>
          <p className="mt-3 text-muted-dark">
            A TheraBand kizárólagos magyarországi forgalmazója {SITE.since} óta. Szakmai tudás, megbízható eszközök, személyes kiszolgálás.
          </p>
          <div className="mt-8 space-y-3">
            <a href={SITE.phoneHref} className="flex min-h-11 items-center gap-3 text-lg font-semibold hover:text-brand-lime">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                <Phone className="h-5 w-5" aria-hidden="true" />
              </span>
              {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className="flex min-h-11 items-center gap-3 hover:text-brand-lime">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </span>
              {SITE.email}
            </a>
          </div>
          <ul className="mt-8 flex gap-2" aria-label="Közösségi média">
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a
                  href="#"
                  aria-label={`${s.label} (demó link)`}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-white hover:bg-white/10"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                    <path d={s.path} fillRule="evenodd" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-10 sm:grid-cols-3">
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="eyebrow text-brand-lime">{col.title}</h2>
              <ul className="mt-5 space-y-1">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="inline-flex min-h-9 items-center text-[0.95rem] text-white/75 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
                {col.title === "Vásárlói információk" && (
                  <li>
                    <CookieSettingsLink />
                  </li>
                )}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-4 py-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {SITE.legalName} · Minden jog fenntartva.</p>
          <p className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-brand-lime/50 px-2.5 py-1 text-xs font-semibold text-brand-lime">Design koncepció / demó</span>
            <span>Nem a hivatalos webáruház. A fotók és a szövegek egy része helyőrző.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
