import type { ReactNode } from "react";
import { SpectrumWaves } from "@/components/brand/SpectrumWaves";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export function PageHero({
  eyebrow,
  title,
  text,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  text: ReactNode;
  crumbs: { href?: string; label: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="on-dark grain relative isolate overflow-hidden bg-ink text-white">
      <SpectrumWaves className="absolute -right-40 top-0 -z-10 h-full w-[60rem] max-w-none opacity-80 sm:-right-24 lg:right-[-8rem] lg:w-[70rem]" />
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(11_21_48/0.9),rgb(11_21_48/0.7))] lg:bg-[linear-gradient(90deg,rgb(11_21_48/1)_0%,rgb(11_21_48/0.9)_45%,rgb(11_21_48/0.1)_85%)]"
        aria-hidden="true"
      />
      <div className="container-x py-10 sm:py-14 lg:py-20">
        <Breadcrumbs items={crumbs} dark />
        <div className="mt-10 max-w-3xl lg:mt-14">
          <p className="eyebrow flex items-center gap-3 text-r-yellow">
            <span className="spectrum-rule inline-block w-8" aria-hidden="true" /> {eyebrow}
          </p>
          <h1 className="mt-5 text-h1 font-extrabold">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">{text}</p>
          {children && <div className="mt-10">{children}</div>}
        </div>
      </div>
    </section>
  );
}
