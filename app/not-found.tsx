import Link from "next/link";
import { ProductArt } from "@/components/brand/ProductArt";
import { ButtonLink } from "@/components/ui/Button";
import { CATEGORIES } from "@/data/categories";

export default function NotFound() {
  return (
    <section className="container-x flex flex-col items-center py-20 text-center sm:py-28">
      <div className="relative">
        <p className="font-display text-[clamp(7rem,5rem+12vw,14rem)] font-extrabold leading-none tracking-tighter text-ink/[0.06]" aria-hidden="true">
          404
        </p>
        <ProductArt kind="band" tone="#e03a3e" className="absolute inset-0 m-auto h-full w-full animate-[pulse_3s_ease-in-out_infinite]" />
      </div>
      <h1 className="mt-4 text-h2 font-extrabold">Ez a szalag elszakadt.</h1>
      <p className="mt-4 max-w-md text-lg text-muted">
        A keresett oldal nem található, vagy időközben elköltözött. Visszasegítünk a mozgásba.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/">Vissza a főoldalra</ButtonLink>
        <ButtonLink href="/termekek" variant="ghost">
          Termékek böngészése
        </ButtonLink>
      </div>
      <ul className="mt-12 flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((c) => (
          <li key={c.slug}>
            <Link href={`/termekek/${c.slug}`} className="inline-flex min-h-10 items-center rounded-full bg-white px-4 text-sm font-medium hover:bg-paper-2">
              {c.short}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
