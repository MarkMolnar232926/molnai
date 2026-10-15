import type { ResistanceLevel } from "@/lib/types";
import { getProduct, fromPrice } from "./products";

/** Product finder quiz ("Termékválasztó"). Recommendation rules are illustrative for the concept. */

export type Goal = "rehab" | "fitness" | "sport" | "kids" | "office";
export type Level = "beginner" | "regular" | "advanced" | "pro";
export type Budget = "low" | "mid" | "high";

export const GOALS: { id: Goal; title: string; text: string }[] = [
  { id: "rehab", title: "Felépülés sérülés után", text: "Rehabilitáció, gyógytorna, mobilizálás" },
  { id: "fitness", title: "Erősítés otthon", text: "Formában maradni, kevés eszközzel" },
  { id: "sport", title: "Sportteljesítmény", text: "Erő, robbanékonyság, regeneráció" },
  { id: "kids", title: "Gyermekfejlesztés", text: "Szenzoros és mozgásfejlesztő játék" },
  { id: "office", title: "Mozgás az íróasztalnál", text: "Testtartás, aktív ülés, home office" },
];

export const LEVELS: { id: Level; title: string; text: string }[] = [
  { id: "beginner", title: "Kezdő vagy újrakezdő", text: "Most ismerkedem a mozgással" },
  { id: "regular", title: "Rendszeresen mozgok", text: "Hetente 2–3 alkalommal edzek" },
  { id: "advanced", title: "Haladó sportoló", text: "Komoly terhelést is bírok" },
  { id: "pro", title: "Szakember vagyok", text: "Pácienseknek, csoportoknak vásárolok" },
];

export const BUDGETS: { id: Budget; title: string; text: string; max: number }[] = [
  { id: "low", title: "15 000 Ft alatt", text: "Okos alapcsomag", max: 15000 },
  { id: "mid", title: "15 000 – 40 000 Ft", text: "Teljes otthoni szett", max: 40000 },
  { id: "high", title: "40 000 Ft felett", text: "Prémium felszerelés", max: Infinity },
];

const LEVEL_COLOR: Record<Level, ResistanceLevel> = { beginner: "yellow", regular: "red", advanced: "blue", pro: "green" };
const REHAB_COLOR: Record<Level, ResistanceLevel> = { beginner: "beige", regular: "yellow", advanced: "red", pro: "yellow" };

interface Pick {
  slug: string;
  /** Variant id template; {c} is replaced by the recommended resistance colour */
  variant?: string;
  why: string;
}

const CANDIDATES: Record<Goal, Pick[]> = {
  rehab: [
    { slug: "theraband-erosito-gumiszalag-2-5m", variant: "tb25-{c}", why: "A gyógytornászok első számú eszköze, a te szintedhez illő színben." },
    { slug: "theraband-stabilitasi-trener", variant: "stab-green", why: "Boka- és térdstabilitás fejlesztése, biztonságos kezdő fokozattal." },
    { slug: "biofreeze-gel-118ml", why: "Hűsítő érzet a mozgásterápia előtt és után." },
    { slug: "fasciaterapias-masszazslabda-duo", why: "Célzott izomlazítás a gerinc mentén." },
    { slug: "stretching-heveder-10-hurkos", why: "Fokozatos, kontrollált nyújtás otthon." },
  ],
  fitness: [
    { slug: "theraband-clx-11-hurkos-szalag", variant: "clx-{c}", why: "Egy szalag, száz gyakorlat: fogantyú és rögzítés nélkül." },
    { slug: "theraband-loop-szett", why: "Farizom- és csípőaktiválás három erősségben." },
    { slug: "theraband-fitness-labda-65", why: "Törzserősítés és aktív ülés egyben." },
    { slug: "gymstick-original", variant: "gs-medium", why: "Teljes test edzés egyetlen eszközzel." },
    { slug: "theraband-tornaszonyeg", why: "Ízületkímélő alap minden gyakorlathoz." },
  ],
  sport: [
    { slug: "theraband-clx-11-hurkos-szalag", variant: "clx-{c}", why: "Bemelegítés és aktiváció, amit az élsportolók is használnak." },
    { slug: "kettlebell-oentvas-12kg", variant: "kb-16", why: "Robbanékony, funkcionális erő a teljes testnek." },
    { slug: "agility-letra-6m", why: "Gyorsaság és lábmunka minden sportághoz." },
    { slug: "smr-henger-mini", why: "Regeneráció edzés után, akár a sporttáskából." },
    { slug: "battle-rope-12m", why: "Állóképesség és vállöv-erő egyszerre." },
  ],
  kids: [
    { slug: "muffik-szenzoros-osveny-11-reszes", why: "Mezítlábas felfedezés a talp és az egyensúly fejlesztésére." },
    { slug: "tapinthato-babzsak-keszlet-10", why: "Tapintás, célzás, egyensúly: tucatnyi játék egy készletben." },
    { slug: "gonge-egyensulyozo-tolcser-80", why: "Pörgés és billegés a vesztibuláris rendszerért." },
    { slug: "ugroiskola-szonyeg-95x200", why: "Számolás, színek és ugrás egyetlen játékban." },
    { slug: "magneses-palca-korongokkal", why: "Montessori szellemű finommotoros játék." },
  ],
  office: [
    { slug: "theraband-dinamikus-uloparna", why: "Aktív ülés: a mélyizmok egész nap dolgoznak." },
    { slug: "theraband-erosito-gumiszalag-2-5m", variant: "tb25-{c}", why: "Lapockazárás és vállgyakorlatok a monitor mellett." },
    { slug: "theraband-loop-szett", why: "Csípőaktiválás két megbeszélés között." },
    { slug: "cubii-move", why: "Halk, ülve végezhető mozgás az asztal alatt." },
  ],
};

export interface Recommendation {
  slug: string;
  variantId?: string;
  why: string;
  price: number;
}

export function recommend(goal: Goal, level: Level, budget: Budget): { items: Recommendation[]; color: ResistanceLevel } {
  const color = goal === "rehab" || goal === "office" ? REHAB_COLOR[level] : LEVEL_COLOR[level];
  const max = BUDGETS.find((b) => b.id === budget)!.max;
  let pool = [...CANDIDATES[goal]];
  if (level === "pro" && goal === "rehab") {
    pool = [{ slug: "theraband-erosito-gumiszalag-45m-tekercs", variant: "tb45-{c}", why: "Rendelői tekercs: minden páciens a saját hosszát kapja." }, ...pool];
  }

  const resolved: Recommendation[] = pool.flatMap((p) => {
    const product = getProduct(p.slug);
    if (!product) return [];
    let variantId = p.variant?.replace("{c}", color);
    // Fall back to the nearest available variant if the colour is not offered.
    if (variantId && !product.variants?.some((v) => v.id === variantId)) variantId = product.variants?.[0]?.id;
    const variant = product.variants?.find((v) => v.id === variantId);
    return [{ slug: p.slug, variantId, why: p.why, price: variant?.price ?? fromPrice(product).price }];
  });

  // Greedy pick of up to three products in priority order that fit the budget.
  const items: Recommendation[] = [];
  let total = 0;
  for (const r of resolved) {
    if (items.length === 3) break;
    if (total + r.price <= max) {
      items.push(r);
      total += r.price;
    }
  }
  if (items.length === 0) items.push([...resolved].sort((a, b) => a.price - b.price)[0]);
  return { items, color };
}
