import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ProductFinder } from "@/components/engage/ProductFinder";

export const metadata: Metadata = {
  title: "Termékválasztó",
  description: "Három kérdés, és összeállítjuk a hozzád illő eszközcsomagot, a megfelelő TheraBand ellenállással.",
};

export default function FinderPage() {
  return (
    <>
      <PageHero
        eyebrow="Termékválasztó"
        title={
          <>
            60 másodperc, <span className="text-brand-gradient">személyre szabva.</span>
          </>
        }
        text="Válaszolj három kérdésre, és összeállítjuk a hozzád illő eszközcsomagot, a megfelelő ellenállással."
        crumbs={[{ label: "Termékválasztó" }]}
      />
      <section className="container-x py-16 lg:py-24" aria-label="Termékválasztó kérdések">
        <ProductFinder headingLevel="h2" />
      </section>
    </>
  );
}
