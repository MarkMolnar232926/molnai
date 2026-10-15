export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "spectrum" };

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readMinutes: number;
  author: string;
  tone: string;
  art: "band" | "disc" | "tiles" | "ball";
  body: Block[];
  mock: true;
}

export const POSTS: Post[] = [
  {
    slug: "hogyan-valaszd-ki-a-megfelelo-erosito-gumiszalagot",
    title: "Hogyan válaszd ki a megfelelő erősítő gumiszalagot?",
    excerpt:
      "Nyolc szín, nyolc ellenállás. Megmutatjuk, honnan indulj, mikor lépj tovább, és miért nem baj, ha a sárgánál kezdesz.",
    category: "Útmutató",
    date: "2026-09-24",
    readMinutes: 6,
    author: "Thera-Team szakmai csapat",
    tone: "#e03a3e",
    art: "band",
    mock: true,
    body: [
      {
        type: "p",
        text: "A TheraBand színkódolt rendszere azért zseniális, mert a fejlődést láthatóvá teszi. Minden szín egy meghatározott ellenállást jelent, a bézstől egészen az aranyig. A jó választáshoz azonban nem az számít, mennyire vagy erős, hanem hogy milyen célra használod a szalagot.",
      },
      { type: "spectrum" },
      { type: "h2", text: "1. Kezdd a céllal, ne a színnel" },
      {
        type: "p",
        text: "Rehabilitációhoz, például vállműtét vagy bokasérülés után, szinte mindig a világosabb színekkel érdemes indulni. Általános erősítéshez a piros és a zöld a legsokoldalúbb, sportspecifikus edzéshez pedig a kék és a fekete adhat valódi kihívást.",
      },
      { type: "h2", text: "2. A 15 ismétléses szabály" },
      {
        type: "p",
        text: "Akkor jó az ellenállás, ha egy gyakorlatból 10–15 ismétlést tudsz végezni tiszta technikával, és az utolsó kettő már érezhetően nehéz. Ha 20 is könnyen megy, lépj egy színnel feljebb.",
      },
      {
        type: "list",
        items: [
          "Kevesebb mint 8 ismétlés: túl erős a szalag, válts világosabbra.",
          "10–15 ismétlés: ideális tartomány.",
          "Több mint 20 könnyed ismétlés: ideje továbblépni.",
        ],
      },
      { type: "h2", text: "3. Egy színnél többre lesz szükséged" },
      {
        type: "p",
        text: "A nagy izomcsoportok, például a comb vagy a hát, erősebb ellenállást igényelnek, mint a váll kis rotátorizmai. Ezért a legtöbb gyógytornász két-három színt ajánl párhuzamosan.",
      },
      {
        type: "quote",
        text: "A legjobb szalag az, amelyikkel a páciens otthon is szívesen, helyes technikával dolgozik.",
        cite: "Minta idézet, gyógytornász",
      },
    ],
  },
  {
    slug: "5-gyakorlat-home-office-hoz",
    title: "5 gyakorlat home office-hoz, amit az íróasztalnál is megcsinálhatsz",
    excerpt: "Merev nyak, fáradt hát, elzsibbadt csípő? Öt perc és egy szalag elég, hogy újra jól érezd magad.",
    category: "Otthoni edzés",
    date: "2026-09-10",
    readMinutes: 4,
    author: "Thera-Team szakmai csapat",
    tone: "#2563c9",
    art: "disc",
    mock: true,
    body: [
      {
        type: "p",
        text: "A tartós ülés nem a gerinc ellensége, a mozdulatlanság az. Ezt az öt gyakorlatot óránként egyszer, két-három perc alatt elvégezheted.",
      },
      { type: "h2", text: "A gyakorlatok" },
      {
        type: "list",
        items: [
          "Lapockazárás szalaggal: nyújtott karral húzd szét a szalagot mellmagasságban, 12 ismétlés.",
          "Nyakfeszítés: tarkóra tett kézzel finoman told hátra a fejed, 5 × 5 másodperc.",
          "Mellkasnyitás: ülve, kulcsolt kézzel nyújtózz hátra, 3 mély légzés.",
          "Csípőhajlító nyújtás: kitörés a szék mellett, oldalanként 30 másodperc.",
          "Aktív ülés: dinamikus ülőpárnán apró körzés a medencével, 1 perc.",
        ],
      },
      {
        type: "p",
        text: "Tipp: állíts be egy óránkénti emlékeztetőt, és tartsd a szalagot a monitor mellett. Ami szem előtt van, azt használod is.",
      },
    ],
  },
  {
    slug: "szenzoros-integracio-otthon",
    title: "Szenzoros integráció otthon: játékok, amelyek fejlesztenek",
    excerpt: "Mezítlábas ösvények, pörgés, billegés. Így építhetsz egyszerű, mégis hatásos szenzoros játéksarkot.",
    category: "Gyerek fejlesztés",
    date: "2026-08-28",
    readMinutes: 7,
    author: "Thera-Team szakmai csapat",
    tone: "#f5c928",
    art: "tiles",
    mock: true,
    body: [
      {
        type: "p",
        text: "A gyerekek a mozgáson keresztül ismerik meg a világot. A szenzoros integráció azt jelenti, hogy az idegrendszer egységbe rendezi a testből és a környezetből érkező ingereket: ez az alapja a figyelemnek, a koordinációnak és később a tanulásnak is.",
      },
      { type: "h2", text: "Három érzékszerv, amelyre érdemes figyelni" },
      {
        type: "list",
        items: [
          "Tapintás: eltérő felületű szőnyegek, babzsákok, homok és víz.",
          "Egyensúly (vesztibuláris rendszer): billegő, forgó, hintázó mozgások.",
          "Testérzékelés (propriocepció): húzás, tolás, mászás, cipekedés.",
        ],
      },
      {
        type: "p",
        text: "Ha bármilyen fejlődési eltérést tapasztalsz, kérd szakember, például gyógypedagógus vagy fejlesztő terapeuta véleményét. Az otthoni játék kiegészíti, de nem helyettesíti a terápiát.",
      },
    ],
  },
  {
    slug: "bokaserules-utan-visszateres-a-sporthoz",
    title: "Bokasérülés után: így térj vissza biztonságosan a sporthoz",
    excerpt: "A fájdalom elmúlása még nem jelenti a gyógyulást. Az egyensúlytréning a visszatérés kulcsa.",
    category: "Rehabilitáció",
    date: "2026-08-12",
    readMinutes: 5,
    author: "Thera-Team szakmai csapat",
    tone: "#2e9b57",
    art: "ball",
    mock: true,
    body: [
      {
        type: "p",
        text: "A bokaficam a leggyakoribb sportsérülések közé tartozik, és sajnos gyakran ismétlődik. Ennek fő oka, hogy a sérülés után az ízület helyzetérzékelése nem áll helyre magától.",
      },
      { type: "h2", text: "A visszatérés lépcsői" },
      {
        type: "list",
        items: [
          "Mozgásterjedelem visszaállítása, enyhe szalagos gyakorlatokkal.",
          "Erősítés: talp-, boka- és csípőizmok, progresszív ellenállással.",
          "Egyensúlytréning: stabil talajról fokozatosan instabil felületre.",
          "Sportspecifikus mozgások: irányváltás, ugrás, landolás.",
        ],
      },
      {
        type: "p",
        text: "Minden lépést szakemberrel egyeztess. Ez a cikk általános tájékoztatás, nem helyettesíti az egyéni orvosi vagy gyógytornász tanácsot.",
      },
    ],
  },
];

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}
