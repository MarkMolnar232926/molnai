import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { INFO_PAGES } from "@/data/info";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return INFO_PAGES.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = INFO_PAGES.find((p) => p.slug === slug);
  return page ? { title: page.title } : {};
}

export default async function InfoPage({ params }: Props) {
  const { slug } = await params;
  const page = INFO_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();
  return (
    <div className="container-x pb-24 pt-6 sm:pt-8">
      <Breadcrumbs items={[{ label: page.title }]} />
      <div className="mx-auto mt-10 max-w-3xl">
        <span className="brand-rule block w-16" aria-hidden="true" />
        <h1 className="mt-6 text-h1 font-extrabold">{page.title}</h1>
        <p className="mt-5 text-xl text-muted">{page.lead}</p>
        <div className="mt-12 space-y-4">
          {page.sections.map((s) => (
            <section key={s.h} className="rounded-3xl bg-white p-6 sm:p-8">
              <h2 className="text-xl font-bold">{s.h}</h2>
              <p className="mt-3 leading-relaxed text-ink/80">{s.p}</p>
            </section>
          ))}
        </div>
        <p className="mt-8 rounded-2xl bg-brand-sky/10 p-4 text-sm">Ez az oldal a koncepció része, jogilag nem kötelező érvényű helyőrző tartalom.</p>
      </div>
    </div>
  );
}
