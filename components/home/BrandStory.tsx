import { ButtonLink } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { PhotoPlaceholder } from "@/components/brand/PhotoPlaceholder";
import { TIMELINE } from "@/data/site";

const STATS = [
  { to: 30, suffix: "+", label: "év tapasztalat" },
  { to: 15000, suffix: "+", label: "elégedett vásárló*" },
  { to: 1200, suffix: "+", label: "termék a kínálatban*" },
  { to: 350, suffix: "+", label: "intézményi partner*" },
];

/** Timeline dots climb the resistance scale, like the company's growth. */
const DOTS = ["#d9c5a0", "#f5c928", "#e03a3e", "#2563c9", "#c99a2e"];

export function BrandStory() {
  return (
    <section className="on-dark relative overflow-hidden bg-ink py-20 text-white lg:py-28" aria-labelledby="tortenet">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <Reveal>
            <p className="eyebrow mb-4 flex items-center gap-3 text-r-yellow">
              <span className="spectrum-rule inline-block w-8" aria-hidden="true" /> 30 év, 1995 óta
            </p>
            <h2 id="tortenet" className="text-h1 font-extrabold">
              Három évtizede <span className="text-spectrum">ugyanazért</span> dolgozunk: hogy mozogni öröm legyen.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-lg leading-relaxed text-white/75">
              1995-ben azzal a céllal hoztuk el Magyarországra a TheraBand termékeit, hogy a gyógytornászok a világ legjobb eszközeivel dolgozhassanak.
              Ma kórházak, sportklubok, óvodák és családok ezrei bíznak bennünk, de a hozzáállásunk ugyanaz: szakértő tanács, személyes kiszolgálás.
            </p>
            <ButtonLink href="/rolunk" variant="outline-light" className="mt-8">
              Ismerd meg a történetünket
            </ButtonLink>
          </Reveal>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/10 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-ink p-6 sm:p-8">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-4xl font-extrabold sm:text-5xl lg:text-6xl">
                  <Counter to={s.to} suffix={s.suffix} />
                </span>
                <span className="mt-2 block text-sm text-white/65" aria-hidden="true">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs text-white/50">* Illusztratív adatok, a valós számokkal cserélendők.</p>

        <div className="mt-20 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <PhotoPlaceholder caption="archív fotó, az első iroda 1995-ből" tone="#c99a2e" dark className="aspect-[4/5] max-h-[32rem] w-full" />
          <ol className="relative space-y-10 border-l border-white/10 pl-8">
            {TIMELINE.map((t, i) => (
              <Reveal as="li" key={t.year} delay={i * 80} className="relative">
                <span
                  className="absolute -left-[2.45rem] top-1 h-4 w-4 rounded-full ring-4 ring-ink"
                  style={{ background: DOTS[i % DOTS.length] }}
                  aria-hidden="true"
                />
                <p className="font-display text-3xl font-extrabold text-white/90">{t.year}</p>
                <h3 className="mt-1 text-xl font-bold">{t.title}</h3>
                <p className="mt-2 max-w-lg text-white/70">{t.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
