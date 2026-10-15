import { ProductFinder } from "@/components/engage/ProductFinder";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FinderSection() {
  return (
    <section className="container-x pb-20 lg:pb-28" aria-labelledby="termekvalaszto">
      <SectionHeading
        eyebrow="Termékválasztó"
        title={<span id="termekvalaszto">Nem tudod, hol kezdd? Három kérdés.</span>}
        text="Válaszolj, és 60 másodperc alatt összeállítjuk a hozzád illő csomagot, a megfelelő ellenállással."
      />
      <ProductFinder />
    </section>
  );
}
