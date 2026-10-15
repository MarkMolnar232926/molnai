import Link from "next/link";
import { ArrowUpRight, BadgePercent } from "lucide-react";
import { ProductArt, artBackground } from "@/components/brand/ProductArt";
import { PhotoPlaceholder } from "@/components/brand/PhotoPlaceholder";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CATEGORY_BY_SLUG, WORLDS } from "@/data/categories";
import { productsInCategory } from "@/data/products";

const PHOTO = ["gyógytornász a rendelőben, szalagos vállgyakorlat", "sportoló kettlebell-lel edzőteremben", "gyerekek a szenzoros ösvényen"];

export function CategoryBento() {
  return (
    <section className="container-x py-20 lg:py-28" aria-labelledby="vilagok">
      <SectionHeading
        eyebrow="Három világ, egy partner"
        title={<span id="vilagok">Minden, ami mozgás</span>}
        text="A gyógyulástól a teljesítményig, az első lépésektől az iskolai tornateremig."
        action={
          <Link href="/termekek" className="inline-flex min-h-11 items-center gap-2 font-semibold underline-offset-4 hover:underline">
            Összes kategória <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        }
      />

      <div className="grid gap-4 md:grid-cols-6 lg:grid-cols-12 lg:grid-rows-[minmax(17rem,auto)_minmax(17rem,auto)_auto]">
        {WORLDS.map((w, i) => (
          <Reveal
            key={w.title}
            delay={i * 90}
            className={i === 0 ? "md:col-span-6 lg:row-span-2" : "md:col-span-3 lg:col-span-6"}
          >
            <Link
              href={w.href}
              className="group relative flex h-full min-h-[18rem] flex-col overflow-hidden rounded-[var(--radius-card)] bg-ink text-white on-dark"
            >
              <PhotoPlaceholder caption={PHOTO[i]} tone={w.tone} dark className="absolute inset-0 !rounded-none [&_figcaption]:mb-auto [&_figcaption]:mt-5 [&_figcaption]:ml-5" />
              <ProductArt
                kind={w.art}
                tone={w.tone}
                className={`absolute transition-transform duration-1000 ease-[var(--ease-out-expo)] group-hover:-rotate-6 group-hover:scale-110 ${
                  i === 0 ? "-right-8 bottom-24 h-64 w-64 lg:h-96 lg:w-96" : "right-0 top-14 h-28 w-28 sm:-right-4 sm:bottom-4 sm:top-auto sm:h-44 sm:w-44"
                }`}
              />
              <div className="relative mt-auto max-w-md p-6 pt-20 sm:p-8 sm:pt-24">
                <span className="mb-3 block h-1.5 w-12 rounded-full" style={{ background: w.tone }} aria-hidden="true" />
                <h3 className={`font-bold ${i === 0 ? "text-h2" : "text-h3"}`}>{w.title}</h3>
                <p className="mt-2 max-w-sm text-white/75">{w.text}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                  Felfedezem
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:translate-x-1">
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}

        {(["theraband", "kutya-terapia"] as const).map((slug, i) => {
          const c = CATEGORY_BY_SLUG[slug];
          return (
            <Reveal key={slug} delay={200 + i * 90} className="md:col-span-2 lg:col-span-4">
              <Link
                href={`/termekek/${slug}`}
                className="group flex h-full items-center gap-5 overflow-hidden rounded-[var(--radius-card)] p-5"
                style={artBackground(c.accent)}
              >
                <ProductArt kind={c.art} tone={c.accent} className="h-20 w-20 shrink-0 transition-transform duration-700 group-hover:scale-110" />
                <span>
                  <span className="block font-display text-xl font-bold leading-tight">{c.short}</span>
                  <span className="text-sm text-muted">{productsInCategory(slug).length} termék</span>
                </span>
              </Link>
            </Reveal>
          );
        })}
        <Reveal delay={380} className="md:col-span-2 lg:col-span-4">
          <Link
            href="/termekek/akciok"
            className="group flex h-full items-center gap-5 rounded-[var(--radius-card)] bg-sale p-5 text-white on-dark"
          >
            <BadgePercent className="mx-5 h-10 w-10 shrink-0 transition-transform duration-700 group-hover:rotate-12" aria-hidden="true" />
            <span>
              <span className="block font-display text-xl font-bold">Akciók</span>
              <span className="text-sm text-white">Outlet és bemutató darabok</span>
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
