const BRANDS = ["TheraBand", "Gonge", "Cramer", "Meru", "Biofreeze", "Sorbothane", "Gymstick", "Cubii", "Flexbar", "Digi-Flex", "Muffik", "Eduplay"];

/** Endless ticker of the brands Thera-Team carries (text wordmarks, no third-party logos). */
export function BrandMarquee() {
  const row = [...BRANDS, ...BRANDS];
  return (
    <section className="marquee overflow-hidden border-y border-line bg-white py-6" aria-label="Forgalmazott márkák">
      <ul className="sr-only">
        {BRANDS.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
      <div className="marquee-track flex w-max items-center gap-12 pr-12" aria-hidden="true">
        {row.map((b, i) => (
          <span key={i} className="flex items-center gap-12 whitespace-nowrap font-display text-2xl font-bold tracking-tight text-[#6b7891] transition-colors hover:text-brand sm:text-3xl">
            {b}
            <span className="h-2 w-2 rounded-full bg-brand-gradient" />
          </span>
        ))}
      </div>
    </section>
  );
}
