const NBSP = " ";

/** Hungarian price format: 28 990 Ft (grouping applies from 4 digits, unlike Intl's hu-HU). */
export function formatPrice(value: number): string {
  const rounded = Math.round(value);
  const digits = Math.abs(rounded).toString().replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
  return `${rounded < 0 ? "−" : ""}${digits}${NBSP}Ft`;
}

export function discountPercent(price: number, oldPrice?: number): number | null {
  if (!oldPrice || oldPrice <= price) return null;
  return Math.round((1 - price / oldPrice) * 100);
}

const ACCENTS: Record<string, string> = {
  á: "a", é: "e", í: "i", ó: "o", ö: "o", ő: "o", ú: "u", ü: "u", ű: "u",
};

/** Lowercase and strip Hungarian diacritics, used for search and slugs. */
export function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/[áéíóöőúüű]/g, (c) => ACCENTS[c] ?? c)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function slugify(input: string): string {
  return normalize(input)
    .replace(/&/g, " es ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatDate(iso: string): string {
  const months = [
    "január", "február", "március", "április", "május", "június",
    "július", "augusztus", "szeptember", "október", "november", "december",
  ];
  const d = new Date(iso + "T12:00:00");
  return `${d.getFullYear()}. ${months[d.getMonth()]} ${d.getDate()}.`;
}

export function cn(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}
