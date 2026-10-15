"use client";

import { m, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PhotoPlaceholder } from "@/components/brand/PhotoPlaceholder";
import { Reveal } from "@/components/ui/Reveal";
import { TIMELINE } from "@/data/site";
import { BRAND_SHADES } from "@/lib/brand";

const PHOTOS = [
  "archív fotó, az első iroda 1995-ből",
  "szakmai rendezvény gyógytornászokkal",
  "gyerekek GONGE eszközökön",
  "funkcionális edzés sportklubban",
  "a csapat a 30. évfordulón",
];

/**
 * Desktop: the section pins while the milestones scroll sideways (scroll-linked).
 * Mobile and reduced motion: a plain vertical timeline. Switching is pure CSS, so nothing shifts on hydration.
 */
export function HorizontalTimeline() {
  return (
    <>
      <VerticalTimeline />
      <PinnedTimeline />
    </>
  );
}

function VerticalTimeline() {
  return (
    <ol className="container-x relative mt-20 space-y-10 lg:hidden motion-reduce:lg:block">
      {TIMELINE.map((t, i) => (
        <Reveal as="li" key={t.year} delay={i * 80} className="relative border-l border-white/10 pl-8">
          <span
            className="absolute -left-2 top-1 h-4 w-4 rounded-full ring-4 ring-ink"
            style={{ background: BRAND_SHADES[(i * 2 + 2) % BRAND_SHADES.length] }}
            aria-hidden="true"
          />
          <p className="font-display text-3xl font-extrabold text-white/90">{t.year}</p>
          <h3 className="mt-1 text-xl font-bold">{t.title}</h3>
          <p className="mt-2 max-w-lg text-white/70">{t.text}</p>
        </Reveal>
      ))}
    </ol>
  );
}

function PinnedTimeline() {
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -distance]);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div ref={outer} className="relative mt-24 hidden lg:block motion-reduce:lg:hidden" style={{ height: `${TIMELINE.length * 70}vh` }}>
      <div className="sticky top-[var(--header-h)] flex h-[calc(100vh-var(--header-h))] flex-col justify-center overflow-hidden">
        <div className="container-x mb-8 flex items-end justify-between gap-6">
          <h3 className="font-display text-2xl font-bold text-white/90">Mérföldkövek</h3>
          <div className="h-1 w-64 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
            <m.div className="h-full origin-left bg-brand-gradient" style={{ scaleX: scrollYProgress }} />
          </div>
        </div>
        <m.ol ref={track} style={{ x }} className="flex w-max gap-8 pl-[max(2.5rem,calc((100vw-88rem)/2+2.5rem))] pr-[20vw]">
          {TIMELINE.map((t, i) => (
            <li key={t.year} className="grid w-[44rem] grid-cols-[1fr_1.1fr] items-center gap-8 rounded-[2rem] bg-white/[0.04] p-6 ring-1 ring-white/10">
              <PhotoPlaceholder caption={PHOTOS[i]} tone={BRAND_SHADES[(i * 2 + 1) % BRAND_SHADES.length]} dark className="aspect-[4/5] w-full" />
              <div>
                <p
                  className="font-display text-[7rem] font-extrabold leading-none tracking-tighter text-transparent"
                  style={{ WebkitTextStroke: `1.5px ${BRAND_SHADES[(i * 2 + 3) % BRAND_SHADES.length]}` }}
                >
                  {t.year}
                </p>
                <p className="mt-4 text-2xl font-bold">{t.title}</p>
                <p className="mt-3 text-lg leading-relaxed text-white/70">{t.text}</p>
              </div>
            </li>
          ))}
        </m.ol>
      </div>
    </div>
  );
}
