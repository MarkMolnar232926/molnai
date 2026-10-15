export const SITE = {
  name: "Thera-Team",
  legalName: "Thera-Team Kft.",
  tagline: "Társ a mozgásban!",
  phone: "+36 30 / 474 6055",
  phoneHref: "tel:+36304746055",
  email: "info@thera-team.hu",
  address: "[Cím helye – a valós címmel cserélendő]",
  since: 1995,
  freeShippingFrom: 30000,
  shippingFee: 1990,
};

export const NAV = [
  { href: "/termekek", label: "Termékek", mega: true },
  { href: "/szakembereknek", label: "Szakembereknek" },
  { href: "/intezmenyeknek", label: "Intézményeknek" },
  { href: "/rolunk", label: "Rólunk" },
  { href: "/blog", label: "Blog" },
  { href: "/kapcsolat", label: "Kapcsolat" },
] as const;

/** Milestones other than 1995 are placeholders and should be verified with the client. */
export const TIMELINE = [
  { year: "1995", title: "Az indulás", text: "Megalakul a Thera-Team, és megkezdi a TheraBand termékek kizárólagos magyarországi forgalmazását." },
  { year: "2003", title: "Szakmai hálózat", text: "Országos partnerhálózat épül gyógytornászokkal, kórházakkal és rehabilitációs intézetekkel." },
  { year: "2011", title: "Gyerek fejlesztés", text: "A kínálat bővül: megérkeznek a Gonge és a szenzoros integrációs eszközök." },
  { year: "2018", title: "Funkcionális tréning", text: "Kettlebell, Gymstick és agility eszközök a sport és a fitnesz világából." },
  { year: "2025", title: "30 év", text: "Három évtized, több tízezer elégedett vásárló és egy változatlan ígéret: társ a mozgásban." },
];

export const REVIEWS = [
  {
    name: "Kovács Anna",
    role: "Gyógytornász, Budapest",
    text: "Évek óta innen rendelem a rendelő szalagjait. Gyors szállítás, és ha kérdésem van, valódi szakembert érek el a telefonban.",
    rating: 5,
  },
  {
    name: "Szabó Gergely",
    role: "Erőnléti edző",
    text: "A CLX szalag teljesen átalakította a csapat bemelegítését. A színkódok miatt mindenki pontosan tudja, melyiket kell felvennie.",
    rating: 5,
  },
  {
    name: "Tóth Eszter",
    role: "Óvodapedagógus",
    text: "A szenzoros ösvény a csoport kedvence lett. Az intézményi ajánlatkérés egyszerű volt, és pontosan azt kaptuk, amire szükségünk volt.",
    rating: 5,
  },
  {
    name: "Nagy Péter",
    role: "Hobbifutó",
    text: "Bokasérülés után a gyógytornászom ajánlotta a stabilitási párnát. Hasznos leírást is kaptam mellé.",
    rating: 4,
  },
];
