import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, FileText, HandCoins, Handshake, Timer } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { ProductArt, artBackground } from "@/components/brand/ProductArt";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ArtKind } from "@/lib/types";

export const metadata: Metadata = {
  title: "Intézményeknek",
  description: "Intézményi Partner Program bölcsődéknek, óvodáknak, iskoláknak, sportklubokban és egészségügyi intézményeknek. Mennyiségi kedvezmény, egyedi ajánlat.",
};

const SEGMENTS: { title: string; text: string; href: string; art: ArtKind; tone: string }[] = [
  { title: "Bölcsődék és óvodák", text: "Szenzoros ösvények, GONGE egyensúlyozók, mozgásfejlesztő csomagok.", href: "/termekek/gyerek-fejleszto", art: "tiles", tone: "#f5c928" },
  { title: "Iskolák", text: "Tornatermi eszközök, dinamikus ülőpárnák, gyógytestnevelés.", href: "/termekek/gyerek-fejleszto?al=bolcsodeknek-ovodaknak-iskolaknak", art: "disc", tone: "#2563c9" },
  { title: "Sportklubok", text: "Funkcionális és agility eszközök csapatoknak, rendelői tape-ek.", href: "/termekek/funkcionalis", art: "kettlebell", tone: "#e03a3e" },
  { title: "Egészségügyi intézmények", text: "Rehabilitációs eszközök, 45 m-es tekercsek, latexmentes változatok.", href: "/termekek/rehabilitacio", art: "band", tone: "#2e9b57" },
];

const TIERS = [
  { from: "100\u00a0000\u00a0Ft", pct: "5%", label: "Alap" },
  { from: "300\u00a0000\u00a0Ft", pct: "10%", label: "Bővített" },
  { from: "1\u00a0000\u00a0000\u00a0Ft", pct: "15%", label: "Kiemelt" },
];

const PERKS = [
  { icon: Timer, title: "Ajánlat 24 órán belül", text: "Terméklistád alapján gyorsan, részletesen." },
  { icon: FileText, title: "Pályázatbarát dokumentáció", text: "Árajánlat, termékadatlap, megfelelőségi nyilatkozatok." },
  { icon: HandCoins, title: "Átutalás, 15–30 nap", text: "Fizetési határidő intézményi partnereinknek." },
  { icon: Handshake, title: "Dedikált kapcsolattartó", text: "Egy ember, aki ismeri az intézményed igényeit." },
];

export default function InstitutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Intézményi Partner Program"
        title={
          <>
            Felszerelés egész <span className="text-spectrum">csoportoknak.</span>
          </>
        }
        text="Bölcsődéktől a kórházakig: összeállítjuk a teljes eszközparkot, mennyiségi kedvezménnyel és pályázatbarát dokumentációval."
        crumbs={[{ label: "Intézményeknek" }]}
      >
        <ButtonLink href="#ajanlatkeres" variant="secondary">
          Ajánlatot kérek <ArrowDown className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
      </PageHero>

      <section className="container-x py-20 lg:py-28" aria-labelledby="kinek">
        <SectionHeading eyebrow="Kiknek szól?" title={<span id="kinek">Minden intézménynek más kell</span>} />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SEGMENTS.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 80}>
              <Link href={s.href} className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-white">
                <span className="relative aspect-[4/3]" style={artBackground(s.tone)}>
                  <ProductArt kind={s.art} tone={s.tone} className="absolute inset-0 m-auto h-3/4 w-3/4 transition-transform duration-700 group-hover:scale-110" />
                </span>
                <span className="flex flex-1 flex-col p-6">
                  <span className="font-display text-xl font-bold">{s.title}</span>
                  <span className="mt-2 flex-1 text-muted">{s.text}</span>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold">
                    Eszközök <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="on-dark bg-ink py-20 text-white lg:py-28" aria-labelledby="mennyisegi">
        <div className="container-x">
          <SectionHeading dark eyebrow="Mennyiségi kedvezmény" title={<span id="mennyisegi">Minél többet rendelsz, annál többet spórolsz</span>} />
          <ol className="grid gap-4 md:grid-cols-3">
            {TIERS.map((t, i) => (
              <Reveal as="li" key={t.label} delay={i * 100} className="relative overflow-hidden rounded-[var(--radius-card)] bg-white/5 p-8">
                <span className="absolute inset-x-0 bottom-0 h-2 bg-spectrum" style={{ clipPath: `inset(0 ${100 - (i + 1) * 33.3}% 0 0)` }} aria-hidden="true" />
                <p className="text-sm text-white/65">{t.label} · bruttó {t.from} felett</p>
                <p className="mt-4 font-display text-7xl font-extrabold">{t.pct}</p>
                <p className="mt-2 text-white/75">kedvezmény a teljes rendelésre</p>
              </Reveal>
            ))}
          </ol>
          <p className="mt-4 text-xs text-white/50">Illusztratív kedvezményszintek, a végleges feltételeket a Thera-Team határozza meg.</p>
          <ul className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PERKS.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <Icon className="h-7 w-7 text-r-yellow" aria-hidden="true" />
                <p className="mt-4 font-display text-lg font-bold">{title}</p>
                <p className="mt-1 text-white/70">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="ajanlatkeres" className="container-x scroll-mt-24 py-20 lg:py-28" aria-labelledby="ajanlat-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading
            eyebrow="Ajánlatkérés"
            title={<span id="ajanlat-title">Mondd el, mire van szükségetek</span>}
            text="Küldd el a terméklistát vagy csak a célt (pl. „szenzoros sarok 20 gyereknek”), és mi összeállítjuk az ajánlatot."
          />
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
