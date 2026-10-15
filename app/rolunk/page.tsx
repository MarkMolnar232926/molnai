import type { Metadata } from "next";
import { Award, HeartHandshake, Lightbulb, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PhotoPlaceholder } from "@/components/brand/PhotoPlaceholder";
import { ButtonLink } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RESISTANCE } from "@/data/resistance";
import { TIMELINE } from "@/data/site";

export const metadata: Metadata = {
  title: "Rólunk",
  description: "A Thera-Team 1995 óta a TheraBand kizárólagos magyarországi forgalmazója. Történetünk, értékeink, csapatunk.",
};

const VALUES = [
  { icon: ShieldCheck, title: "Szakmai hitelesség", text: "Csak olyan eszközt forgalmazunk, amelyet gyógytornászok és edzők nyugodt szívvel ajánlanak." },
  { icon: HeartHandshake, title: "Személyes kapcsolat", text: "Telefonon is valódi embert érsz el, aki érti, mire van szükséged." },
  { icon: Lightbulb, title: "Tudásmegosztás", text: "Útmutatók, workshopok és gyakorlatlapok, hogy az eszköz valóban hasznos legyen." },
  { icon: Award, title: "Hosszú távú partnerség", text: "Sok partnerünk az első évek óta velünk van. Ez a legnagyobb elismerés." },
];

const TEAM = [
  { role: "Ügyvezető", caption: "ügyvezető portréja" },
  { role: "Szakmai tanácsadó, gyógytornász", caption: "szakmai tanácsadó portréja" },
  { role: "Intézményi kapcsolattartó", caption: "intézményi kapcsolattartó portréja" },
  { role: "Ügyfélszolgálat és logisztika", caption: "ügyfélszolgálati munkatárs portréja" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Rólunk · 1995 óta"
        title={
          <>
            Harminc éve <span className="text-spectrum">társ a mozgásban.</span>
          </>
        }
        text="Egy szalaggal kezdődött. Ma a rehabilitáció, a sport és a gyerekfejlesztés teljes eszköztárát kínáljuk, változatlan szakmai alázattal."
        crumbs={[{ label: "Rólunk" }]}
      />

      <section className="container-x py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow mb-4 text-muted">A történetünk</p>
            <h2 className="text-h2 font-bold">A legjobb eszközöket a magyar szakembereknek</h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink/80">
              <p>
                1995-ben, amikor a Thera-Team megkezdte működését, a színkódolt erősítő gumiszalag még újdonságnak számított Magyarországon. Azóta a TheraBand
                a gyógytorna egyik alapeszközévé vált, mi pedig a márka kizárólagos hazai forgalmazójaként kísérjük végig ezt az utat.
              </p>
              <p>
                Kínálatunk az évek során a rehabilitáció, a funkcionális edzés és a gyermekek mozgásfejlesztése felé is bővült, de a lényeg ugyanaz maradt: megbízható
                eszközök, szakértő tanács, személyes kiszolgálás.
              </p>
            </div>
            <p className="mt-6 text-xs text-muted">Minta szöveg, a cég valós történetével pontosítandó.</p>
          </Reveal>
          <PhotoPlaceholder caption="a Thera-Team csapata a raktárban" tone="#e03a3e" className="aspect-[4/3] w-full" />
        </div>

        <dl className="mt-20 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { to: 1995, label: "az alapítás éve", plain: true },
            { to: 30, suffix: "+", label: "év tapasztalat" },
            { to: 8, label: "ellenállás-szint, egy rendszer" },
            { to: 350, suffix: "+", label: "intézményi partner*" },
          ].map((s) => (
            <div key={s.label} className="rounded-[var(--radius-card)] bg-white p-6">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-5xl font-extrabold">
                  {s.plain ? s.to : <Counter to={s.to} suffix={s.suffix} />}
                </span>
                <span className="mt-2 block text-sm text-muted" aria-hidden="true">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="on-dark bg-ink py-20 text-white lg:py-28" aria-labelledby="partner">
        <div className="container-x grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <SectionHeading dark eyebrow="TheraBand partnerség" title={<span id="partner">Kizárólagos forgalmazó, 1995 óta</span>} />
            <p className="text-lg leading-relaxed text-white/75">
              A TheraBand a világ egyik legismertebb rehabilitációs márkája, amelynek színkódolt ellenállás-rendszerét kórházak, sportcsapatok és
              gyógytornászok használják szerte a világon. Magyarországon kizárólagos forgalmazóként garantáljuk az eredeti termékeket, a teljes
              választékot és a szakmai hátteret.
            </p>
            <p className="mt-4 text-xs text-white/50">[A TheraBand hivatalos partnerlogója ide kerül, a márkatulajdonos jóváhagyásával.]</p>
          </div>
          <div className="flex flex-col gap-3" aria-hidden="true">
            {RESISTANCE.map((r, i) => (
              <div key={r.id} className="flex items-center gap-4">
                <span className="h-4 rounded-full" style={{ background: r.color, width: `${30 + i * 10}%`, boxShadow: r.id === "black" ? "inset 0 0 0 1px #3a3a44" : undefined }} />
                <span className="text-sm text-white/70">{r.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-20 lg:py-28" aria-labelledby="idovonal">
        <SectionHeading eyebrow="Mérföldkövek" title={<span id="idovonal">Az utunk</span>} />
        <ol className="grid gap-4 md:grid-cols-5">
          {TIMELINE.map((t, i) => (
            <Reveal as="li" key={t.year} delay={i * 80} className="relative rounded-[var(--radius-card)] bg-white p-6">
              <span className="absolute inset-x-0 top-0 h-1.5 rounded-t-[var(--radius-card)]" style={{ background: RESISTANCE[i + 1].color }} aria-hidden="true" />
              <p className="font-display text-3xl font-extrabold">{t.year}</p>
              <h3 className="mt-2 text-lg font-bold">{t.title}</h3>
              <p className="mt-2 text-sm text-muted">{t.text}</p>
            </Reveal>
          ))}
        </ol>
        <p className="mt-4 text-xs text-muted">Az 1995 utáni mérföldkövek helyőrzők, a cég adataival pontosítandók.</p>
      </section>

      <section className="bg-paper-2 py-20 lg:py-28" aria-labelledby="ertekek">
        <div className="container-x">
          <SectionHeading eyebrow="Értékeink" title={<span id="ertekek">Amiben hiszünk</span>} />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={i * 80} className="rounded-[var(--radius-card)] bg-white p-7">
                <Icon className="h-8 w-8 text-r-red" aria-hidden="true" />
                <h3 className="mt-5 text-xl font-bold">{title}</h3>
                <p className="mt-2 text-muted">{text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x py-20 lg:py-28" aria-labelledby="csapat">
        <SectionHeading eyebrow="Csapatunk" title={<span id="csapat">Az emberek a szalagok mögött</span>} />
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {TEAM.map((m, i) => (
            <li key={m.role}>
              <PhotoPlaceholder caption={m.caption} tone={RESISTANCE[i + 2].color} className="aspect-[3/4] w-full" />
              <p className="mt-4 font-display text-lg font-bold">[Név]</p>
              <p className="text-sm text-muted">{m.role}</p>
            </li>
          ))}
        </ul>
        <div className="mt-16 flex flex-col items-start gap-4 rounded-[2rem] bg-white p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <p className="font-display text-2xl font-bold">Kérdésed van? Hívj minket, szívesen segítünk.</p>
          <ButtonLink href="/kapcsolat">Kapcsolat</ButtonLink>
        </div>
      </section>
    </>
  );
}
