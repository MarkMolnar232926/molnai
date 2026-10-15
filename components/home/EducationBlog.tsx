import Link from "next/link";
import { ArrowUpRight, CalendarDays, GraduationCap } from "lucide-react";
import { BlogCard } from "@/components/shop/BlogCard";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { POSTS } from "@/data/blog";

const WORKSHOPS = [
  { date: "Nov. 14.", title: "TheraBand alapok gyógytornászoknak", place: "Budapest · 6 óra" },
  { date: "Dec. 5.", title: "Funkcionális tréning CLX szalaggal", place: "Online · 3 óra" },
];

export function EducationBlog() {
  return (
    <section className="bg-paper-2 py-20 lg:py-28" aria-labelledby="tudastar">
      <div className="container-x">
        <SectionHeading
          eyebrow="Oktatás és tudástár"
          title={<span id="tudastar">Tudás, ami mozgásba hoz</span>}
          action={
            <Link href="/blog" className="inline-flex min-h-11 items-center gap-2 font-semibold underline-offset-4 hover:underline">
              Összes cikk <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          }
        />
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <aside className="on-dark flex h-full flex-col rounded-[var(--radius-card)] bg-ink p-7 text-white sm:p-8" aria-labelledby="oktatas">
              <GraduationCap className="h-10 w-10 text-r-yellow" aria-hidden="true" />
              <h3 id="oktatas" className="mt-6 text-h3 font-bold">Oktatás szakembereknek</h3>
              <p className="mt-3 text-white/75">
                Gyakorlati workshopok a TheraBand rendszer terápiás és edzésmódszertani alkalmazásáról. Kreditpontos képzések előkészítés alatt.
              </p>
              <ul className="mt-8 space-y-3">
                {WORKSHOPS.map((w) => (
                  <li key={w.title} className="flex items-center gap-4 rounded-2xl bg-white/5 p-4">
                    <span className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-r-yellow text-ink">
                      <CalendarDays className="h-4 w-4" aria-hidden="true" />
                      <span className="text-[0.65rem] font-bold">{w.date}</span>
                    </span>
                    <span>
                      <span className="block font-semibold leading-tight">{w.title}</span>
                      <span className="text-sm text-white/65">{w.place}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-white/50">Minta időpontok.</p>
              <div className="mt-auto pt-8">
                <ButtonLink href="/szakembereknek" variant="light" className="w-full">
                  Érdekel a képzés
                </ButtonLink>
              </div>
            </aside>
          </Reveal>
          <div className="grid gap-8 sm:grid-cols-2">
            {POSTS.slice(0, 2).map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <BlogCard post={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
