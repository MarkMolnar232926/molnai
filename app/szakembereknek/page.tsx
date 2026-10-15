import type { Metadata } from "next";
import { ArrowDown, BookOpen, Check, ClipboardCheck, Headphones, Minus, PackageOpen, Percent, Presentation, Truck, UserCheck } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { ProRegistrationForm } from "@/components/forms/ProRegistrationForm";
import { PhotoPlaceholder } from "@/components/brand/PhotoPlaceholder";
import { ButtonLink } from "@/components/ui/Button";
import { Faq } from "@/components/ui/Faq";
import { Reveal } from "@/components/ui/Reveal";
import { Spotlight } from "@/components/ui/Spotlight";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LOYALTY, PRO_TIERS } from "@/data/programs";

export const metadata: Metadata = {
  title: "Szakembereknek",
  description: "Szakmai kedvezmény gyógytornászoknak, edzőknek és rendelőknek. Rendelői kiszerelések, oktatás, dedikált kapcsolattartó.",
};

const BENEFITS = [
  { icon: Percent, title: "Szakmai árak", text: "Akár 20% kedvezmény a teljes kínálatra, a státuszodtól függően." },
  { icon: PackageOpen, title: "Rendelői kiszerelés", text: "45 méteres TheraBand tekercsek, gyűjtőcsomagok, latexmentes változatok." },
  { icon: BookOpen, title: "Páciens-gyakorlatlapok", text: "Letölthető, magyar nyelvű gyakorlatleírások a pácienseidnek." },
  { icon: Presentation, title: "Workshopok", text: "Gyakorlati képzések a TheraBand rendszer terápiás alkalmazásáról." },
  { icon: Headphones, title: "Szakmai vonal", text: "Telefonos tanácsadás termékválasztáshoz, szakemberektől." },
  { icon: Truck, title: "Gyors utánpótlás", text: "Raktárról, akár másnapi szállítással, hogy ne fogyj ki." },
];

const STEPS = [
  { icon: UserCheck, title: "Regisztrálj", text: "Töltsd ki az űrlapot néhány perc alatt." },
  { icon: ClipboardCheck, title: "Ellenőrizzük", text: "Egy munkanapon belül jóváhagyjuk a szakmai státuszodat." },
  { icon: Percent, title: "Vásárolj kedvezménnyel", text: "A kedvezmény automatikusan megjelenik minden áron." },
];

const COMPARE: { label: string; values: [boolean | string, boolean | string, boolean | string] }[] = [
  { label: "Kedvezmény mértéke", values: ["10%", "15%", "akár 20%"] },
  { label: "Hűségpont gyűjtés", values: [true, true, true] },
  { label: "Rendelői kiszerelések", values: [false, true, true] },
  { label: "Páciens-gyakorlatlapok", values: [true, true, true] },
  { label: "Átutalásos fizetés, halasztott határidővel", values: [false, false, true] },
  { label: "Dedikált kapcsolattartó", values: [false, false, true] },
];

const FAQ = [
  { q: "Kik jogosultak a szakmai kedvezményre?", a: "Gyógytornászok, fizioterapeuták, orvosok, edzők, masszőrök, gyógypedagógusok és sportszakemberek, a végzettség igazolásával." },
  { q: "Mennyi idő alatt aktiválódik a kedvezmény?", a: "A regisztrációt általában egy munkanapon belül ellenőrizzük. Az aktiválásról e-mailben értesítünk." },
  { q: "Összevonható a kedvezmény az akciókkal?", a: "A szakmai kedvezmény az akciós árakkal nem vonható össze, a kettő közül mindig a kedvezőbb érvényes. (Minta feltétel.)" },
  { q: "Rendelhetek a rendelőm nevére számlát?", a: "Igen, a pénztárban céges vagy intézményi számlát kérhetsz, partnereinknek átutalásos fizetést is biztosítunk." },
];

function Cell({ v }: { v: boolean | string }) {
  if (typeof v === "string") return <span className="font-display font-bold">{v}</span>;
  return v ? <Check className="mx-auto h-5 w-5 text-ok" aria-label="Igen" /> : <Minus className="mx-auto h-5 w-5 text-muted/60" aria-label="Nem" />;
}

export default function ProPage() {
  return (
    <>
      <PageHero
        eyebrow="Szakmai partnerprogram"
        title={
          <>
            Te mozgatod a pácienseidet.
            <br />
            <span className="text-brand-gradient">Mi téged.</span>
          </>
        }
        text="Gyógytornászoknak, edzőknek és rendelőknek: szakmai árak, rendelői kiszerelések és harminc év tapasztalata, egy partnernél."
        crumbs={[{ label: "Szakembereknek" }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#regisztracio" variant="secondary">
            Regisztrálok <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href="#szintek" variant="outline-light">
            Kedvezményszintek
          </ButtonLink>
        </div>
      </PageHero>

      <section id="szintek" className="container-x scroll-mt-24 py-20 lg:py-28" aria-labelledby="szintek-title">
        <SectionHeading eyebrow="Kedvezményszintek" title={<span id="szintek-title">Válaszd a hozzád illő szintet</span>} />
        <div className="grid gap-4 lg:grid-cols-3">
          {PRO_TIERS.map((t, i) => (
            <Reveal key={t.id} delay={i * 90}>
              <Spotlight as="article" className={`relative h-full overflow-hidden rounded-[var(--radius-card)] p-8 ${"featured" in t ? "on-dark bg-ink text-white" : "bg-white"}`}>
                <span className="absolute inset-x-0 top-0 h-2" style={{ background: t.color }} aria-hidden="true" />
                {"featured" in t && (
                  <span className="mb-4 inline-block rounded-full bg-brand-green-dark px-3 py-1 text-xs font-bold text-white">Legnépszerűbb</span>
                )}
                <h3 className="text-xl font-bold">{t.name}</h3>
                <p className={`mt-1 text-sm ${"featured" in t ? "text-white/70" : "text-muted"}`}>{t.who}</p>
                <p className="mt-8 font-display text-6xl font-extrabold tracking-tight">{t.discount}</p>
                <ul className="mt-8 space-y-3">
                  {t.perks.map((p) => (
                    <li key={p} className="flex gap-3">
                      <Check className={`mt-0.5 h-5 w-5 shrink-0 ${"featured" in t ? "text-[#8ec85e]" : "text-ok"}`} aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Spotlight>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 overflow-x-auto rounded-3xl bg-white">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <caption className="sr-only">A kedvezményszintek összehasonlítása</caption>
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="p-5 font-semibold text-muted">
                  Szolgáltatás
                </th>
                {PRO_TIERS.map((t) => (
                  <th key={t.id} scope="col" className="p-5 text-center font-display text-base font-bold">
                    {t.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {COMPARE.map((row) => (
                <tr key={row.label}>
                  <th scope="row" className="min-w-48 p-5 font-medium">
                    {row.label}
                  </th>
                  {row.values.map((v, i) => (
                    <td key={i} className="p-5 text-center">
                      <Cell v={v} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-muted">
          <strong className="text-ink">{LOYALTY.name}:</strong> {LOYALTY.rule} A kedvezmények mértéke illusztratív.
        </p>
      </section>

      <section className="bg-paper-2 py-20 lg:py-28" aria-labelledby="elonyok">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <PhotoPlaceholder caption="gyógytornász TheraBand szalaggal dolgozik a pácienssel" tone="#3aa062" className="aspect-[4/5] w-full" />
          <div>
            <SectionHeading eyebrow="Előnyök" title={<span id="elonyok">Több, mint kedvezmény</span>} />
            <ul className="grid gap-6 sm:grid-cols-2">
              {BENEFITS.map(({ icon: Icon, title, text }, i) => (
                <Reveal as="li" key={title} delay={i * 60} className="flex gap-4">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-brand-green-dark">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-display text-lg font-bold">{title}</span>
                    <span className="mt-1 block text-muted">{text}</span>
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-x py-20 lg:py-28" aria-labelledby="hogyan">
        <SectionHeading eyebrow="Így működik" title={<span id="hogyan">Három lépés a szakmai árakig</span>} align="center" />
        <ol className="grid gap-4 md:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 100} className="relative rounded-[var(--radius-card)] bg-white p-8">
              {/* Decorative step number as pseudo-content, so it is not read out or contrast-checked as text. */}
              <span
                data-step={`0${i + 1}`}
                className="block font-display text-7xl font-extrabold leading-none text-brand-sky/15 before:content-[attr(data-step)]"
                aria-hidden="true"
              />
              <Icon className="absolute right-8 top-8 h-7 w-7 text-brand" aria-hidden="true" />
              <h3 className="mt-2 text-xl font-bold">{title}</h3>
              <p className="mt-2 text-muted">{text}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section id="regisztracio" className="scroll-mt-24 bg-paper-2 py-20 lg:py-28" aria-labelledby="reg-title">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading
              eyebrow="Szakmai regisztráció"
              title={<span id="reg-title">Csatlakozz a programhoz</span>}
              text="A regisztráció ingyenes, és nem jár vásárlási kötelezettséggel."
            />
            <Faq items={FAQ} />
          </div>
          <ProRegistrationForm />
        </div>
      </section>
    </>
  );
}
