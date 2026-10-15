import type { ResistanceLevel } from "@/lib/types";

/** "7 napos Mozgás-kihívás": a short daily routine with a resistance band. Exercises are illustrative. */

export interface Exercise {
  name: string;
  seconds: number;
  cue: string;
}

export interface ChallengeDay {
  day: number;
  title: string;
  focus: string;
  band: ResistanceLevel;
  exercises: Exercise[];
}

const ex = (name: string, seconds: number, cue: string): Exercise => ({ name, seconds, cue });

export const CHALLENGE: ChallengeDay[] = [
  {
    day: 1,
    title: "Ébresztő",
    focus: "Váll és testtartás",
    band: "yellow",
    exercises: [
      ex("Szalagszéthúzás", 40, "Nyújtott karral, mellmagasságban húzd szét a szalagot, lapockák össze."),
      ex("Vállrotáció kifelé", 40, "Könyök a törzs mellett, alkar lassan kifelé fordul."),
      ex("Ülő evezés", 45, "Szalag a talpak körül, húzd a könyököt hátra, egyenes háttal."),
      ex("Mellkasnyitás", 30, "Mély belégzés, karok hátra, nyújtózz."),
    ],
  },
  {
    day: 2,
    title: "Stabil alap",
    focus: "Csípő és farizom",
    band: "red",
    exercises: [
      ex("Oldalazó lépés hurokkal", 45, "Hurok a térd felett, enyhe guggolásban lépj oldalra."),
      ex("Farizomhíd", 45, "Hanyatt fekve emeld a csípőt, a térdeket told szét."),
      ex("Kagylónyitás", 40, "Oldalt fekve nyisd a felső térdet, a sarkak összeérnek."),
      ex("Csípőhajlító nyújtás", 30, "Kitörésben finoman told előre a csípőt."),
    ],
  },
  {
    day: 3,
    title: "Erős törzs",
    focus: "Has és hát",
    band: "red",
    exercises: [
      ex("Pallof-nyomás", 40, "Szalag oldalt rögzítve, nyomd előre a kezed, ne fordulj el."),
      ex("Bird dog", 45, "Négykézláb nyújtsd az ellentétes kart és lábat."),
      ex("Fekvő szalaghúzás", 40, "Hanyatt, szalag a kézben, karok a fej fölé lassan."),
      ex("Gyermekpóz", 30, "Ülj a sarkadra, nyújtózz előre, lazíts."),
    ],
  },
  {
    day: 4,
    title: "Aktív pihenő",
    focus: "Mobilitás",
    band: "yellow",
    exercises: [
      ex("Vállkörzés szalaggal", 40, "Széles fogással vidd a szalagot a fej fölött hátra."),
      ex("Combhajlító nyújtás", 40, "Hanyatt, szalag a talp körül, nyújtott láb felfelé."),
      ex("Gerinccsavarás", 40, "Ülve, a szalaggal rásegítve fordulj lassan oldalra."),
      ex("Bokakörzés", 30, "Szalag a lábfejen, lassú körök mindkét irányba."),
    ],
  },
  {
    day: 5,
    title: "Teljes test",
    focus: "Erő és állóképesség",
    band: "green",
    exercises: [
      ex("Guggolás szalaggal", 45, "Szalag a talp alatt, kezek a vállnál, mély guggolás."),
      ex("Mellből nyomás", 40, "Szalag a hát mögött, nyomd előre a karokat."),
      ex("Bicepsz hajlítás", 40, "Könyök a törzs mellett, lassú vissza fázis."),
      ex("Tricepsz nyújtás", 40, "Kar a fej fölött, nyújtsd ki a könyököt."),
    ],
  },
  {
    day: 6,
    title: "Egyensúly",
    focus: "Boka és térd",
    band: "green",
    exercises: [
      ex("Egylábas állás", 40, "Állj egy lábon, a szalaggal told oldalra a másikat."),
      ex("Bokaerősítés", 45, "Ülve, szalag a lábfejen, lassú talphajlítás."),
      ex("Térdnyújtás szalaggal", 40, "Ülve nyújtsd ki a térdet a szalag ellenében."),
      ex("Vádli nyújtás", 30, "Fal mellett, sarok a földön."),
    ],
  },
  {
    day: 7,
    title: "Csúcsforma",
    focus: "Ismétlés, nagyobb ellenállással",
    band: "blue",
    exercises: [
      ex("Ülő evezés", 45, "Most egy erősebb szalaggal, ugyanolyan tiszta technikával."),
      ex("Guggolás szalaggal", 45, "Lassú lefelé, robbanékony felfelé."),
      ex("Pallof-nyomás", 40, "Tartsd meg a törzset, ne fordulj el."),
      ex("Levezető nyújtás", 40, "Lassú légzés, minden izomcsoport."),
    ],
  },
];

export const CHALLENGE_COUPON = "KIHIVAS10";

export const dayMinutes = (d: ChallengeDay) => Math.round(d.exercises.reduce((s, e) => s + e.seconds, 0) / 60);
