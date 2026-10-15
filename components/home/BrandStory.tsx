import { ButtonLink } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { HorizontalTimeline } from "./HorizontalTimeline";
import { Reveal } from "@/components/ui/Reveal";

const STATS = [
  { to: 30, suffix: "+", label: "év tapasztalat" },
  { to: 15000, suffix: "+", label: "elégedett vásárló*" },
  { to: 1200, suffix: "+", label: "termék a kínálatban*" },
  { to: 350, suffix: "+", label: "intézményi partner*" },
];

export function BrandStory() {
  return (
    <section className="on-dark relative overflow-x-clip bg-ink py-20 text-white lg:py-28" aria-labelledby="tortenet">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <Reveal>
            <p className="eyebrow mb-4 flex items-center gap-3 text-brand-lime">
              <span className="brand-rule inline-block w-8" aria-hidden="true" /> 30 év, 1995 óta
            </p>
            <h2 id="tortenet" className="text-h1 font-extrabold">
              Három évtizede <span className="text-brand-gradient">ugyanazért</span> dolgozunk: hogy mozogni öröm legyen.
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

      </div>
      <HorizontalTimeline />
    </section>
  );
}
