/** Discount programme figures are illustrative for the concept (mock). */
export const PRO_TIERS = [
  {
    id: "szakerto",
    name: "Kedvezmény szakértőknek",
    discount: "10%",
    who: "Személyi edzők, masszőrök, sportszakemberek",
    perks: ["10% kedvezmény a teljes kínálatra", "Szakmai hírlevél és termékbemutatók", "Kiemelt telefonos tanácsadás"],
    color: "#f5c928",
  },
  {
    id: "gyogytornasz",
    name: "Gyógytornászoknak",
    discount: "15%",
    who: "Gyógytornászok, fizioterapeuták, orvosok",
    perks: ["15% kedvezmény működési nyilvántartási számmal", "Rendelői kiszerelések (45 m-es tekercsek)", "Ingyenes páciens-gyakorlatlapok"],
    color: "#2e9b57",
    featured: true,
  },
  {
    id: "partner",
    name: "Partneri kedvezmény",
    discount: "akár 20%",
    who: "Rendelők, sportklubok, viszonteladók",
    perks: ["Egyedi árlista és keretszerződés", "Dedikált kapcsolattartó", "Fizetés átutalással, 15 napos határidővel"],
    color: "#2563c9",
  },
] as const;

export const LOYALTY = {
  name: "Hűségpont rendszer",
  rule: "Minden 100 Ft vásárlás után 1 Hűségpont, 1 pont = 1 Ft kedvezmény a következő rendelésnél.",
};
