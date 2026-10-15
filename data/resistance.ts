import type { ResistanceLevel } from "@/lib/types";

export interface ResistanceInfo {
  id: ResistanceLevel;
  name: string;
  level: string;
  color: string;
  /** Readable foreground on top of the color */
  ink: string;
  /** Approximate force at 100% elongation, kg (illustrative value) */
  kg: number;
  forWhom: string;
  uses: string[];
  tip: string;
}

/**
 * The TheraBand colour progression. Force values are illustrative approximations
 * for the concept and must be verified against the official TheraBand charts.
 */
export const RESISTANCE: ResistanceInfo[] = [
  {
    id: "beige",
    name: "Bézs",
    level: "Extra könnyű",
    color: "#d9c5a0",
    ink: "#0a2540",
    kg: 1.1,
    forWhom: "Műtét utáni korai rehabilitáció, idősek, nagyon gyenge izomzat",
    uses: ["Ujj- és csuklómobilizálás", "Óvatos vállátmozgatás", "Légzéssel összehangolt gyakorlatok"],
    tip: "Itt a mozdulat minősége számít, nem az erő. Lassan, fájdalommentes tartományban dolgozz.",
  },
  {
    id: "yellow",
    name: "Sárga",
    level: "Könnyű",
    color: "#f5c928",
    ink: "#0a2540",
    kg: 1.4,
    forWhom: "Kezdők, rehabilitáció, gyerekek és idősebb korosztály",
    uses: ["Vállrotáció", "Bokastabilizálás", "Testtartásjavító gyakorlatok"],
    tip: "A legtöbb gyógytornász ezzel a színnel indítja a terápiát.",
  },
  {
    id: "red",
    name: "Piros",
    level: "Közepes",
    color: "#e03a3e",
    ink: "#ffffff",
    kg: 1.7,
    forWhom: "Aktív felnőttek, általános erősítés, otthoni edzés",
    uses: ["Evezés ülve", "Oldalsó emelés", "Csípőtávolítás hurokkal"],
    tip: "Ha a sárgával már 15 ismétlés is könnyen megy, itt az ideje a pirosnak.",
  },
  {
    id: "green",
    name: "Zöld",
    level: "Erős",
    color: "#2e9b57",
    ink: "#ffffff",
    kg: 2.1,
    forWhom: "Rendszeresen edzők, nagyobb izomcsoportok erősítése",
    uses: ["Guggolás szalaggal", "Mellből nyomás", "Bicepsz és tricepsz"],
    tip: "A legnépszerűbb szín a fitneszben: sokoldalú és mégis kihívást jelent.",
  },
  {
    id: "blue",
    name: "Kék",
    level: "Extra erős",
    color: "#2563c9",
    ink: "#ffffff",
    kg: 2.6,
    forWhom: "Sportolók, haladók, sportspecifikus felkészítés",
    uses: ["Lábtolás", "Robbanékonysági drillek", "Felsőtest-húzások"],
    tip: "Rövidebb szalaggal még tovább növelheted az ellenállást.",
  },
  {
    id: "black",
    name: "Fekete",
    level: "Különösen erős",
    color: "#1a1a1f",
    ink: "#ffffff",
    kg: 3.3,
    forWhom: "Versenysportolók, erős felnőttek, funkcionális tréning",
    uses: ["Asszisztált húzódzkodás", "Gyorsasági ellenállásos futás", "Erőkifejtő mozgások"],
    tip: "Itt már a rögzítés is számít: használj ajtórögzítőt vagy stabil kapaszkodót.",
  },
  {
    id: "silver",
    name: "Ezüst",
    level: "Szuper erős",
    color: "#a9b0ba",
    ink: "#0a2540",
    kg: 4.6,
    forWhom: "Élsport, erőedzés, nagy izomcsoportok terhelése",
    uses: ["Felhúzás szalaggal", "Csípőtolás", "Erőemelő kiegészítő gyakorlatok"],
    tip: "Kombináld szabadsúlyokkal a változó ellenállás érdekében.",
  },
  {
    id: "gold",
    name: "Arany",
    level: "Maximális",
    color: "#c99a2e",
    ink: "#0a2540",
    kg: 6.4,
    forWhom: "Profi sportolók, maximális ellenállást igénylő edzés",
    uses: ["Teljes test erőkifejtés", "Plyometriás kiegészítés", "Csúcsterheléses szériák"],
    tip: "A skála csúcsa. Ide eljutni már önmagában eredmény.",
  },
];

export const RESISTANCE_BY_ID = Object.fromEntries(RESISTANCE.map((r) => [r.id, r])) as Record<
  ResistanceLevel,
  ResistanceInfo
>;
