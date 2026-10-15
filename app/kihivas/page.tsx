import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Challenge } from "@/components/engage/Challenge";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "7 napos Mozgás-kihívás",
  description: "Napi 3 perc egy TheraBand szalaggal: vezetett gyakorlatok, időzítővel, jutalommal. Ingyenes, regisztráció nélkül.",
};

export default function ChallengePage() {
  return (
    <>
      <PageHero
        eyebrow="7 napos Mozgás-kihívás"
        title={
          <>
            Napi 3 perc. <span className="text-brand-gradient">Egy szalag.</span>
          </>
        }
        text="Hét rövid, vezetett edzés otthonra: időzítővel, hangjelzéssel és egy kis jutalommal a végén. Regisztráció nélkül, a haladásodat a böngésződ megjegyzi."
        crumbs={[{ label: "Mozgás-kihívás" }]}
      >
        <ButtonLink href="#naptar" variant="secondary">
          Kezdjük!
        </ButtonLink>
      </PageHero>
      <section id="naptar" className="container-x scroll-mt-24 py-16 lg:py-24" aria-label="A kihívás napjai">
        <Challenge />
        <p className="mt-10 max-w-2xl text-sm text-muted">
          A gyakorlatok általános tájékoztató jellegűek. Sérülés, fájdalom vagy krónikus betegség esetén előbb kérd gyógytornász vagy orvos tanácsát.
          Fájdalom esetén hagyd abba a gyakorlatot.
        </p>
      </section>
    </>
  );
}
