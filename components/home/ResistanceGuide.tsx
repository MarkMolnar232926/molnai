"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { useId, useState } from "react";
import { ArrowRight, Lightbulb } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RESISTANCE } from "@/data/resistance";
import { cn } from "@/lib/format";

const MAX_KG = RESISTANCE[RESISTANCE.length - 1].kg;
const L = 74;
const CY = 112;

function bandPath(i: number, right: number) {
  const th = 16 + i * 2.6;
  const sag = 26 - i * 2.6;
  const t = CY - th / 2;
  const b = CY + th / 2;
  return `M${L} ${t} C ${L + 90} ${t + sag}, ${right - 90} ${t + sag}, ${right} ${t} L ${right} ${b} C ${right - 90} ${b + sag}, ${L + 90} ${b + sag}, ${L} ${b} Z`;
}

function highlightPath(i: number, right: number) {
  const th = 16 + i * 2.6;
  const sag = 26 - i * 2.6;
  const y = CY - th / 2 + 4;
  return `M${L + 6} ${y} C ${L + 90} ${y + sag}, ${right - 90} ${y + sag}, ${right - 6} ${y}`;
}

const ease = [0.34, 1.56, 0.64, 1] as const;

export function ResistanceGuide() {
  const [index, setIndex] = useState(2);
  const r = RESISTANCE[index];
  const sliderId = useId();
  const restRight = 326;
  const pulled = 354 - index * 2;
  const light = r.ink !== "#ffffff";

  return (
    <section id="ellenallas" className="bg-paper-2 py-20 lg:py-28" aria-labelledby="ellenallas-title">
      <div className="container-x">
        <SectionHeading
          eyebrow="A TheraBand színkódja"
          title={<span id="ellenallas-title">Válaszd ki az ellenállást</span>}
          text="Nyolc szín, nyolc erősség: a bézstől az aranyig. Húzd a csúszkát, és megmutatjuk, kinek és mire való az adott szalag."
        />

        <div
          className="relative overflow-hidden rounded-[2rem] p-5 transition-[background-color] duration-700 sm:p-8 lg:p-12"
          style={{ backgroundColor: `color-mix(in oklab, ${r.color} 16%, #ffffff)` }}
        >
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full blur-3xl transition-[background-color] duration-700"
            style={{ backgroundColor: r.color, opacity: 0.35 }}
            aria-hidden="true"
          />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            {/* Info */}
            <div aria-live="polite">
              <p className="font-display text-sm font-bold tabular-nums text-muted">
                {String(index + 1).padStart(2, "0")} / {String(RESISTANCE.length).padStart(2, "0")}
              </p>
              <m.div key={r.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                <h3 className="mt-2 flex items-center gap-4 text-[clamp(3rem,2rem+5vw,5.5rem)] font-extrabold leading-none">
                  <span
                    className="inline-block h-[0.7em] w-[0.7em] shrink-0 rounded-full shadow-[inset_0_-6px_12px_rgb(0_0_0/0.15)]"
                    style={{ background: r.id === "silver" || r.id === "gold" ? `linear-gradient(135deg, ${r.color}, #fff 50%, ${r.color})` : r.color }}
                    aria-hidden="true"
                  />
                  {r.name}
                </h3>
                <p className="mt-2 font-display text-2xl font-semibold text-ink/70">{r.level}</p>

                <dl className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-semibold text-muted">Ellenállás 100%-os nyújtásnál</dt>
                    <dd className="mt-2 flex items-center gap-4">
                      <span className="font-display text-3xl font-bold tabular-nums">kb. {r.kg.toString().replace(".", ",")} kg</span>
                      <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/70">
                        <span
                          className="block h-full rounded-full transition-[width,background-color] duration-700 ease-[var(--ease-out-expo)]"
                          style={{ width: `${(r.kg / MAX_KG) * 100}%`, backgroundColor: r.id === "beige" ? "#b59a6a" : r.color }}
                        />
                      </span>
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-semibold text-muted">Kinek ajánljuk?</dt>
                    <dd className="mt-1 text-lg">{r.forWhom}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-semibold text-muted">Jellemző gyakorlatok</dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {r.uses.map((u) => (
                        <span key={u} className="rounded-full bg-white/80 px-3.5 py-1.5 text-sm font-medium">
                          {u}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
                <p className="mt-8 flex gap-3 rounded-2xl bg-white/70 p-4 text-sm leading-relaxed">
                  <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-r-gold" aria-hidden="true" />
                  <span>
                    <strong>Szakértői tipp:</strong> {r.tip}
                  </span>
                </p>
              </m.div>
            </div>

            {/* Visual */}
            <div className="flex flex-col">
              <div className="relative rounded-3xl bg-white/60 p-4 backdrop-blur-sm">
                <svg viewBox="0 0 400 220" className="w-full" role="img" aria-label={`${r.name} szalag kifeszítve`}>
                  <line x1="40" y1="190" x2="360" y2="190" stroke="#0b1530" strokeOpacity=".08" strokeWidth="2" strokeDasharray="4 6" />
                  <m.path
                    key={`b-${r.id}`}
                    initial={{ d: bandPath(index, pulled) }}
                    animate={{ d: bandPath(index, restRight) }}
                    transition={{ duration: 1.1, ease }}
                    style={{ fill: r.color, transition: "fill .5s" }}
                    stroke={r.id === "black" ? "#3a3a44" : "none"}
                  />
                  <m.path
                    key={`h-${r.id}`}
                    initial={{ d: highlightPath(index, pulled) }}
                    animate={{ d: highlightPath(index, restRight) }}
                    transition={{ duration: 1.1, ease }}
                    fill="none"
                    stroke="#fff"
                    strokeOpacity={light ? 0.6 : 0.3}
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <rect x={L - 34} y={CY - 26} width="34" height="52" rx="12" fill="#0b1530" />
                  <m.rect
                    key={`r-${r.id}`}
                    initial={{ x: pulled }}
                    animate={{ x: restRight }}
                    transition={{ duration: 1.1, ease }}
                    y={CY - 26}
                    width="34"
                    height="52"
                    rx="12"
                    fill="#0b1530"
                  />
                  <text x="200" y="210" textAnchor="middle" fontSize="11" fill="#5b6275" fontFamily="var(--font-inter)">
                    Illusztráció · a vastagság az ellenállást jelzi
                  </text>
                </svg>
              </div>

              <div className="mt-6 flex h-36 items-end gap-1.5 sm:gap-2" aria-hidden="true">
                {RESISTANCE.map((lvl, i) => (
                  <button
                    key={lvl.id}
                    type="button"
                    tabIndex={-1}
                    onClick={() => setIndex(i)}
                    className="group flex flex-1 flex-col items-center gap-2"
                  >
                    <span
                      className={cn("w-full rounded-t-lg transition-all duration-500", i === index ? "opacity-100" : "opacity-35 group-hover:opacity-70")}
                      style={{
                        height: `${(lvl.kg / MAX_KG) * 96 + 12}px`,
                        background: lvl.id === "silver" || lvl.id === "gold" ? `linear-gradient(180deg, #fff, ${lvl.color})` : lvl.color,
                        boxShadow: i === index ? `0 10px 24px -8px ${lvl.color}` : "none",
                      }}
                    />
                    <span className={cn("text-[0.65rem] font-semibold sm:text-xs", i === index ? "text-ink" : "text-muted")}>{lvl.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Slider */}
          <div className="relative mt-10">
            <label htmlFor={sliderId} className="sr-only">
              Ellenállás-szint kiválasztása
            </label>
            <input
              id={sliderId}
              type="range"
              min={0}
              max={RESISTANCE.length - 1}
              step={1}
              value={index}
              onChange={(e) => setIndex(Number(e.target.value))}
              aria-valuetext={`${r.name}, ${r.level}, körülbelül ${r.kg.toString().replace(".", ",")} kilogramm`}
              className="range-spectrum"
            />
            <div className="mt-1 flex justify-between px-[3px]">
              {RESISTANCE.map((lvl, i) => (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  className="flex min-h-11 min-w-11 flex-col items-center justify-start gap-1"
                  aria-label={`${lvl.name} – ${lvl.level}`}
                  aria-pressed={i === index}
                >
                  <span
                    className={cn("h-3 w-3 rounded-full transition-transform", i === index && "scale-150")}
                    style={{ background: lvl.color, boxShadow: "inset 0 0 0 1px rgb(11 21 48/.2)" }}
                  />
                  <span className="hidden text-xs font-medium text-muted sm:block">{lvl.level}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={`/termek/theraband-erosito-gumiszalag-2-5m?valtozat=tb25-${r.id}`} className="sm:w-auto">
              {r.name} szalag megtekintése <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <Link
              href="/blog/hogyan-valaszd-ki-a-megfelelo-erosito-gumiszalagot"
              className="inline-flex min-h-12 items-center justify-center gap-1 px-4 font-semibold underline-offset-4 hover:underline"
            >
              Részletes választási útmutató
            </Link>
            <p className="text-xs text-muted sm:ml-auto sm:max-w-56 sm:text-right">
              Az értékek tájékoztató jellegűek, a hivatalos TheraBand táblázat alapján véglegesítendők.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
