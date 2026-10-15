import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ProductArt, artBackground } from "@/components/brand/ProductArt";
import { BlogCard } from "@/components/shop/BlogCard";
import { ProductCard } from "@/components/shop/ProductCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { POSTS, getPost, type Block } from "@/data/blog";
import { PRODUCTS } from "@/data/products";
import { RESISTANCE } from "@/data/resistance";
import { formatDate } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

const RELATED: Record<string, string[]> = {
  "hogyan-valaszd-ki-a-megfelelo-erosito-gumiszalagot": ["theraband-erosito-gumiszalag-2-5m", "theraband-clx-11-hurkos-szalag"],
  "5-gyakorlat-home-office-hoz": ["theraband-dinamikus-uloparna", "theraband-loop-szett"],
  "szenzoros-integracio-otthon": ["muffik-szenzoros-osveny-11-reszes", "gonge-egyensulyozo-tolcser-80"],
  "bokaserules-utan-visszateres-a-sporthoz": ["theraband-stabilitasi-trener", "cramer-ankle-brace"],
};

function renderBlock(b: Block, i: number) {
  switch (b.type) {
    case "p":
      return <p key={i}>{b.text}</p>;
    case "h2":
      return (
        <h2 key={i} className="!mt-12 text-h3 font-bold">
          {b.text}
        </h2>
      );
    case "list":
      return (
        <ul key={i} className="space-y-3">
          {b.items.map((it) => (
            <li key={it} className="flex gap-3">
              <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-r-red" aria-hidden="true" />
              {it}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <figure key={i} className="!my-12 border-l-4 border-r-yellow pl-6">
          <blockquote className="font-display text-2xl font-semibold leading-snug">„{b.text}”</blockquote>
          {b.cite && <figcaption className="mt-3 text-sm text-muted">{b.cite}</figcaption>}
        </figure>
      );
    case "spectrum":
      return (
        <div key={i} className="!my-10 grid grid-cols-4 gap-2 sm:grid-cols-8" aria-label="A TheraBand színskála">
          {RESISTANCE.map((r) => (
            <div key={r.id} className="rounded-xl p-3 text-center text-xs font-semibold" style={{ background: r.color, color: r.ink }}>
              {r.name}
              <span className="block font-normal opacity-80">{r.level}</span>
            </div>
          ))}
        </div>
      );
  }
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const products = (RELATED[post.slug] ?? []).map((s) => PRODUCTS.find((p) => p.slug === s)!).filter(Boolean);
  const more = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article className="pb-24">
      <header className="container-x pt-6 sm:pt-8">
        <Breadcrumbs items={[{ href: "/blog", label: "Blog" }, { label: post.title }]} />
        <div className="mx-auto mt-10 max-w-3xl text-center">
          <p className="inline-flex rounded-full bg-white px-3 py-1 text-sm font-semibold">{post.category}</p>
          <h1 className="mt-5 text-h1 font-extrabold">{post.title}</h1>
          <p className="mt-5 text-muted">
            {post.author} · <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readMinutes} perc olvasás
          </p>
        </div>
        <div className="relative mx-auto mt-10 aspect-[21/9] max-w-5xl overflow-hidden rounded-[2rem]" style={artBackground(post.tone)}>
          <ProductArt kind={post.art} tone={post.tone} className="absolute inset-0 m-auto h-full w-1/2" />
        </div>
      </header>

      <div className="container-x">
        <div className="mx-auto mt-12 max-w-2xl space-y-6 text-[1.125rem] leading-relaxed text-ink/85">
          <p className="text-xl font-medium text-ink">{post.excerpt}</p>
          {post.body.map(renderBlock)}
          <p className="rounded-2xl bg-r-yellow/20 p-4 text-sm">Demó cikk: a tartalom a koncepció illusztrálására készült.</p>
        </div>

        {products.length > 0 && (
          <aside className="mx-auto mt-16 max-w-2xl" aria-labelledby="cikk-termekek">
            <h2 id="cikk-termekek" className="font-display text-xl font-bold">
              A cikkben említett eszközök
            </h2>
            <ul className="mt-5 grid grid-cols-2 gap-4">
              {products.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </aside>
        )}

        <div className="mx-auto mt-16 max-w-2xl">
          <Link href="/blog" className="inline-flex min-h-11 items-center gap-2 font-semibold">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Vissza a bloghoz
          </Link>
        </div>

        <section className="mt-20" aria-labelledby="tovabbi">
          <h2 id="tovabbi" className="text-h3 font-bold">
            További cikkek
          </h2>
          <ul className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => (
              <li key={p.slug}>
                <BlogCard post={p} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
