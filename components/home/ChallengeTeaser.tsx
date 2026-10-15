"use client";

import { ArrowRight, Flame } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { CHALLENGE } from "@/data/challenge";
import { useChallenge, useHydrated } from "@/lib/store";
import { useSpotlight } from "@/lib/useTilt";
import { cn } from "@/lib/format";

export function ChallengeTeaser() {
  const hydrated = useHydrated();
  const completed = useChallenge((s) => s.completed);
  const done = hydrated ? completed.length : 0;
  const ref = useSpotlight<HTMLDivElement>();

  return (
    <section className="container-x py-20 lg:py-28" aria-labelledby="kihivas-teaser">
      <div ref={ref} className="spotlight on-dark grain overflow-hidden rounded-[2rem] bg-ink p-8 text-white sm:p-12 lg:p-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow flex items-center gap-2 text-brand-lime">
              <Flame className="h-4 w-4" aria-hidden="true" /> Ingyenes · regisztráció nélkül
            </p>
            <h2 id="kihivas-teaser" className="mt-4 text-h2 font-extrabold">
              7 napos Mozgás-kihívás. <span className="text-brand-gradient">Napi 3 perc.</span>
            </h2>
            <p className="mt-4 max-w-xl text-lg text-white/75">
              Vezetett, időzített gyakorlatok egyetlen szalaggal. Teljesítsd mind a hét napot, és jutalmul 10% kedvezményt kapsz.
            </p>
            <ButtonLink href="/kihivas" variant="secondary" className="mt-8">
              {done === 0 ? "Elindítom a kihívást" : done === CHALLENGE.length ? "Megnézem a jutalmam" : `Folytatom: ${done + 1}. nap`}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
          <ol className="grid grid-cols-7 gap-2" aria-label={`${done} nap teljesítve a hétből`}>
            {CHALLENGE.map((d, i) => (
              <li key={d.day} className="flex flex-col items-center gap-2">
                <span
                  className={cn(
                    "flex aspect-[1/2.4] w-full items-end overflow-hidden rounded-full bg-white/10",
                    i < done && "shadow-[0_0_24px_-4px_var(--color-brand-lime)]",
                  )}
                  aria-hidden="true"
                >
                  <span
                    className="block w-full rounded-full bg-brand-gradient transition-[height] duration-1000 ease-[var(--ease-out-expo)]"
                    style={{ height: i < done ? "100%" : `${18 + i * 6}%`, opacity: i < done ? 1 : 0.35, transitionDelay: `${i * 80}ms` }}
                  />
                </span>
                <span className={cn("text-xs font-semibold", i < done ? "text-brand-lime" : "text-white/60")}>{d.day}.</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
