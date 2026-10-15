"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Baby, Building2, Dumbbell, Stethoscope } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/format";

const AUDIENCES = [
  {
    id: "sport",
    icon: Dumbbell,
    title: "Sportoló",
    lead: "Erő, robbanékonyság, regeneráció.",
    points: ["CLX és gumikötelek", "Kettlebell és battle rope", "SMR hengerek, Biofreeze"],
    href: "/termekek/funkcionalis",
    cta: "Sport és fitnesz",
    color: "#2563c9",
    light: "#8fb6ff",
  },
  {
    id: "pro",
    icon: Stethoscope,
    title: "Gyógytornász és szakember",
    lead: "Rendelői minőség, szakmai kedvezmény.",
    points: ["45 m-es TheraBand tekercsek", "Egyensúlyozó és neuro eszközök", "Akár 15% szakmai kedvezmény"],
    href: "/szakembereknek",
    cta: "Szakmai program",
    color: "#2e9b57",
    light: "#6fd39a",
  },
  {
    id: "family",
    icon: Baby,
    title: "Szülő és pedagógus",
    lead: "Játék, ami fejleszt.",
    points: ["Szenzoros ösvények", "GONGE egyensúlyozók", "Montessori és logopédia"],
    href: "/termekek/gyerek-fejleszto",
    cta: "Gyerek fejlesztés",
    color: "#f5c928",
    light: "#f5c928",
  },
  {
    id: "org",
    icon: Building2,
    title: "Intézmény és vállalkozás",
    lead: "Egy partner a teljes felszereléshez.",
    points: ["Mennyiségi kedvezmény", "Egyedi árajánlat 24 órán belül", "Átutalásos fizetés, számlára"],
    href: "/intezmenyeknek",
    cta: "Intézményi program",
    color: "#e03a3e",
    light: "#ff8a8d",
  },
];

export function AudienceSelector() {
  const [active, setActive] = useState(1);

  return (
    <section className="container-x py-20 lg:py-28" aria-labelledby="ki-vagy-te">
      <SectionHeading
        eyebrow="Személyre szabva"
        title={<span id="ki-vagy-te">Ki vagy te?</span>}
        text="Válaszd ki, mire készülsz, és mi megmutatjuk a hozzád illő eszközöket, kedvezményeket és tudást."
      />
      <ul className="flex flex-col gap-3 lg:h-[28rem] lg:flex-row">
        {AUDIENCES.map((a, i) => {
          const isActive = active === i;
          const Icon = a.icon;
          return (
            <li
              key={a.id}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className={cn(
                "group relative overflow-hidden rounded-[var(--radius-card)] transition-[flex-grow,background-color] duration-700 ease-[var(--ease-out-expo)] lg:min-w-0",
                isActive ? "bg-ink text-white lg:flex-[2.4]" : "bg-white text-ink lg:flex-1",
              )}
            >
              <Link href={a.href} className={cn("flex h-full flex-col p-6 sm:p-7", isActive && "on-dark")}>
                <span
                  className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl transition-opacity duration-700"
                  style={{ background: a.color, opacity: isActive ? 0.45 : 0 }}
                  aria-hidden="true"
                />
                <span className="relative flex items-start justify-between gap-4">
                  <span
                    className="inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-colors duration-500"
                    style={{ background: isActive ? a.color : `color-mix(in oklab, ${a.color} 18%, white)`, color: isActive && a.id !== "family" ? "#fff" : "#0b1530" }}
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <ArrowUpRight
                    className={cn("h-6 w-6 transition-transform duration-500", isActive ? "translate-x-0 rotate-0" : "-rotate-45 opacity-40")}
                    aria-hidden="true"
                  />
                </span>
                <span className="relative mt-auto block pt-10">
                  <span className="block font-display text-2xl font-bold leading-tight sm:text-[1.75rem]">{a.title}</span>
                  <span className={cn("mt-2 block", isActive ? "text-white/75" : "text-muted")}>{a.lead}</span>
                  <span
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-700 ease-[var(--ease-out-expo)]",
                      isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 lg:grid-rows-[0fr]",
                    )}
                  >
                    <span className="overflow-hidden">
                      <span className="mt-5 flex flex-wrap gap-2">
                        {a.points.map((p) => (
                          <span key={p} className="rounded-full border border-white/20 px-3 py-1.5 text-sm text-white/90">
                            {p}
                          </span>
                        ))}
                      </span>
                      <span className="mt-6 inline-flex items-center gap-2 font-semibold" style={{ color: a.light }}>
                        {a.cta} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
