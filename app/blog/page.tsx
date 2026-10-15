import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { BlogCard } from "@/components/shop/BlogCard";
import { Reveal } from "@/components/ui/Reveal";
import { POSTS } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog és tudástár",
  description: "Útmutatók, gyakorlatok és szakmai cikkek rehabilitációról, sportról és gyerekfejlesztésről.",
};

export default function BlogPage() {
  const [first, ...rest] = POSTS;
  return (
    <>
      <PageHero
        eyebrow="Blog és tudástár"
        title="Tudás, ami mozgásba hoz"
        text="Gyakorlati útmutatók gyógytornászoktól, edzőktől és fejlesztő pedagógusoktól. Minden cikk demó tartalom a koncepcióhoz."
        crumbs={[{ label: "Blog" }]}
      />
      <section className="container-x py-16 lg:py-24">
        <Reveal className="mb-16">
          <BlogCard post={first} large />
        </Reveal>
        <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 80}>
              <BlogCard post={p} />
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
