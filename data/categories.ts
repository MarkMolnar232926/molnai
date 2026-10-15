import type { Category, CategorySlug, SubCategory } from "@/lib/types";
import { slugify } from "@/lib/format";

const subs = (names: string[]): SubCategory[] => names.map((name) => ({ name, slug: slugify(name) }));

export const CATEGORIES: Category[] = [
  {
    slug: "theraband",
    name: "TheraBand termékek",
    short: "TheraBand",
    description:
      "Az eredeti, színkódolt ellenállás-rendszer. Gumiszalagok, kötelek, labdák és egyensúlyozó eszközök a rehabilitációtól a csúcssportig.",
    accent: "#1162a9",
    art: "band",
    subs: subs([
      "Erősítő gumiszalagok",
      "Gumikötelek",
      "CLX",
      "Hurkok, loop",
      "Kézerősítő eszközök",
      "Kineziológiai tape",
      "Masszírozó hengerek",
      "Dinamikus ülőpárnák",
      "Egyensúlyozó eszközök",
      "Fitness labdák",
      "Tornaszőnyegek",
      "Vector",
      "Professzionális mozgásfejlesztő rendszerek",
    ]),
    highlight: ["erosito-gumiszalagok", "clx", "kezerosito-eszkozok", "egyensulyozo-eszkozok"],
  },
  {
    slug: "rehabilitacio",
    name: "Rehabilitáció, gyógytorna",
    short: "Rehabilitáció",
    description:
      "Rögzítők, tape-ek, hűsítő krémek és fasciaterápiás eszközök: minden, ami a gyógyulás útját támogatja.",
    accent: "#3aa062",
    art: "brace",
    subs: subs([
      "Ízületi rögzítők",
      "Cramer sport tape",
      "Meru sportkrém",
      "Biofreeze",
      "Sorbothane talpbetétek",
      "Neuro eszközök",
      "Fasciaterápia",
      "Vibrációs és kompressziós masszázs",
      "Stretching",
    ]),
    highlight: ["izuleti-rogzitok", "cramer-sport-tape", "biofreeze", "fasciaterapia"],
  },
  {
    slug: "funkcionalis",
    name: "Funkcionális eszközök",
    short: "Funkcionális",
    description:
      "Kettlebellek, battle rope, plyobox és agility eszközök a robbanékony, mindennapokban is használható erőért.",
    accent: "#1a8fd0",
    art: "kettlebell",
    subs: subs([
      "Agility és robbanékonyság",
      "Kettlebell",
      "Súlyzók",
      "Súlymellény",
      "Sandbag",
      "Battle rope",
      "Plyobox",
      "SMR hengerek",
      "Cubii",
      "Gymstick",
      "Ugrálókötelek",
      "Fitness gépek",
    ]),
    highlight: ["kettlebell", "battle-rope", "plyobox", "gymstick"],
  },
  {
    slug: "edzes-tipus",
    name: "Edzés típus szerint",
    short: "Edzés típus",
    description: "Sportágra és edzésformára szabott válogatás, hogy elsőre a megfelelő eszközt találd meg.",
    accent: "#237a46",
    art: "ball",
    subs: subs([
      "Röplabda",
      "Tollaslabda",
      "Aquafitness",
      "Labdarúgás",
      "Box és MMA",
      "Crossfit",
      "Kosárlabda",
      "Otthoni edzés",
      "Fitness",
      "Funkcionális tréning",
      "Nyújtás",
      "Pilates, jóga",
      "Kézilabda",
    ]),
    highlight: ["otthoni-edzes", "pilates-joga", "funkcionalis-trening", "labdarugas"],
  },
  {
    slug: "gyerek-fejleszto",
    name: "Gyerek fejlesztő eszközök",
    short: "Gyerek fejlesztés",
    description:
      "GONGE, Montessori és szenzoros integrációs eszközök otthonra, óvodába, iskolába: játékos mozgás, tudatos fejlődés.",
    accent: "#8ec85e",
    art: "tiles",
    subs: subs([
      "GONGE",
      "Montessori",
      "Szenzoros integráció",
      "Motoros készségfejlesztés",
      "Logopédia",
      "Bölcsődéknek, óvodáknak, iskoláknak",
      "Kültéri eszközök",
      "Gyerekjáték",
    ]),
    highlight: ["gonge", "szenzoros-integracio", "motoros-keszsegfejlesztes", "logopedia"],
  },
  {
    slug: "kutya-terapia",
    name: "Kutya terápia",
    short: "Kutya terápia",
    description: "Egyensúlyozó és erősítő eszközök kutyák rehabilitációjához és kondicionálásához.",
    accent: "#5bb8ea",
    art: "dog",
    subs: subs(["Egyensúlyozó eszközök", "Erősítés és kondicionálás"]),
    highlight: ["egyensulyozo-eszkozok", "erosites-es-kondicionalas"],
  },
];

export const CATEGORY_BY_SLUG = Object.fromEntries(CATEGORIES.map((c) => [c.slug, c])) as Record<
  CategorySlug,
  Category
>;

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function subName(category: CategorySlug, sub: string): string {
  return CATEGORY_BY_SLUG[category].subs.find((s) => s.slug === sub)?.name ?? sub;
}

/** The "three worlds" used on the home page bento. */
export const WORLDS = [
  {
    title: "Rehabilitáció",
    text: "Gyógytornászok által választott eszközök a teljes felépülési úthoz.",
    href: "/termekek/rehabilitacio",
    art: "band" as const,
    tone: "#3aa062",
  },
  {
    title: "Sport és fitnesz",
    text: "Funkcionális erő, robbanékonyság és mobilitás, otthon és a teremben.",
    href: "/termekek/funkcionalis",
    art: "kettlebell" as const,
    tone: "#1162a9",
  },
  {
    title: "Gyerek fejlesztés",
    text: "Szenzoros és mozgásfejlesztő eszközök, amelyek játéknak tűnnek.",
    href: "/termekek/gyerek-fejleszto",
    art: "tiles" as const,
    tone: "#8ec85e",
  },
];
