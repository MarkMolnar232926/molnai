import { ArrowRight, Check, Coins } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Spotlight } from "@/components/ui/Spotlight";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LOYALTY, PRO_TIERS } from "@/data/programs";

export function ProProgram() {
  return (
    <section className="container-x py-20 lg:py-28" aria-labelledby="szakmai">
      <SectionHeading
        eyebrow="Szakmai program"
        title={<span id="szakmai">Neked dolgozunk, ha másokat mozgatsz</span>}
        text="Gyógytornászként, edzőként vagy intézményként kedvezményes áron, szakmai háttértámogatással vásárolhatsz."
        action={
          <ButtonLink href="/szakembereknek" variant="primary">
            Regisztrálok szakemberként <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        }
      />
      <div className="grid gap-4 lg:grid-cols-4">
        {PRO_TIERS.map((t, i) => (
          <Reveal key={t.id} delay={i * 90}>
            <Spotlight
              as="article"
              className={`relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] p-7 ${
                "featured" in t ? "bg-ink text-white on-dark" : "bg-white"
              }`}
            >
              <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: t.color }} aria-hidden="true" />
              <p className={`text-sm font-semibold ${"featured" in t ? "text-white/70" : "text-muted"}`}>{t.who}</p>
              <h3 className="mt-3 text-xl font-bold">{t.name}</h3>
              <p className="mt-5 font-display text-5xl font-extrabold tracking-tight">{t.discount}</p>
              <ul className="mt-6 space-y-2.5 text-sm">
                {t.perks.map((p) => (
                  <li key={p} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "featured" in t ? "#8ec85e" : "#1f7a46" }} aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </Spotlight>
          </Reveal>
        ))}
        <Reveal delay={270}>
          <article className="relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-brand-lime/25 p-7">
            <span className="absolute inset-x-0 top-0 h-1.5 bg-brand-gradient" aria-hidden="true" />
            <Coins className="h-9 w-9 text-ink" aria-hidden="true" />
            <h3 className="mt-5 text-xl font-bold">{LOYALTY.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/80">{LOYALTY.rule}</p>
            <p className="mt-auto pt-6 font-display text-2xl font-bold">Mindenkinek jár.</p>
          </article>
        </Reveal>
      </div>
      <p className="mt-4 text-xs text-muted">A kedvezmények mértéke illusztratív, a végleges feltételeket a Thera-Team határozza meg.</p>
    </section>
  );
}
