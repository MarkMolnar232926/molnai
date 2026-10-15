import { ProductArt, artBackground } from "@/components/brand/ProductArt";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import type { ArtKind } from "@/lib/types";

export function CategoryHeader({
  title,
  description,
  count,
  art,
  tone,
  crumbs,
}: {
  title: string;
  description: string;
  count: number;
  art: ArtKind;
  tone: string;
  crumbs: { href?: string; label: string }[];
}) {
  return (
    <header className="container-x pb-8 pt-6 sm:pt-8">
      <Breadcrumbs items={crumbs} />
      <div className="relative mt-6 overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14" style={artBackground(tone)}>
        <ProductArt
          kind={art}
          tone={tone}
          className="pointer-events-none absolute -right-6 -top-4 h-48 w-48 opacity-90 sm:right-6 sm:h-64 sm:w-64 lg:right-16 lg:h-72 lg:w-72"
        />
        <div className="relative max-w-2xl">
          <p className="eyebrow text-muted">{count} termék</p>
          <h1 className="mt-3 text-h1 font-extrabold">{title}</h1>
          <p className="mt-4 max-w-xl text-lg text-ink/75">{description}</p>
        </div>
        <span className="brand-rule absolute inset-x-0 bottom-0 !rounded-none" aria-hidden="true" />
      </div>
    </header>
  );
}
