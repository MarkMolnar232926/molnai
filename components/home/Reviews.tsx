import { Quote } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stars } from "@/components/ui/Stars";
import { REVIEWS } from "@/data/site";

export function Reviews() {
  return (
    <section className="container-x py-20 lg:py-28" aria-labelledby="velemenyek">
      <SectionHeading
        eyebrow="Vásárlói vélemények"
        title={<span id="velemenyek">Akik már velünk mozognak</span>}
        text={
          <>
            <span className="mr-2 rounded-full bg-r-yellow px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-ink">Minta tartalom</span>
            Az alábbi vélemények illusztratívak, a valós értékelésekkel cserélendők.
          </>
        }
      />
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {REVIEWS.map((r, i) => (
          <Reveal as="li" key={r.name} delay={i * 80}>
            <figure className="flex h-full flex-col rounded-[var(--radius-card)] bg-white p-7">
              <Quote className="h-8 w-8 text-r-red" aria-hidden="true" />
              <Stars rating={r.rating} className="mt-5" />
              <blockquote className="mt-4 flex-1 text-[1.05rem] leading-relaxed">„{r.text}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-paper-2 font-display font-bold" aria-hidden="true">
                  {r.name.split(" ").map((n) => n[0]).join("")}
                </span>
                <span>
                  <span className="block font-semibold">{r.name}</span>
                  <span className="text-sm text-muted">{r.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
