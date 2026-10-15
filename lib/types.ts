export type ResistanceLevel =
  | "beige"
  | "yellow"
  | "red"
  | "green"
  | "blue"
  | "black"
  | "silver"
  | "gold";

export type CategorySlug =
  | "theraband"
  | "rehabilitacio"
  | "funkcionalis"
  | "edzes-tipus"
  | "gyerek-fejleszto"
  | "kutya-terapia";

export type StockStatus = "in_stock" | "backorder";

export type ArtKind =
  | "band"
  | "tube"
  | "loop"
  | "clx"
  | "ball"
  | "roller"
  | "disc"
  | "flexbar"
  | "handgrip"
  | "tape"
  | "cream"
  | "insole"
  | "mat"
  | "kettlebell"
  | "dumbbell"
  | "rope"
  | "box"
  | "vest"
  | "tiles"
  | "spinner"
  | "beanbag"
  | "cone"
  | "stick"
  | "frog"
  | "pencil"
  | "pedal"
  | "dog"
  | "brace"
  | "hopscotch";

export type Tag = "uj" | "bestseller" | "szakmai";

export interface Variant {
  id: string;
  label: string;
  resistance?: ResistanceLevel;
  price: number;
  oldPrice?: number;
  stock: StockStatus;
}

export interface Product {
  slug: string;
  name: string;
  brand: Brand;
  category: CategorySlug;
  /** Subcategory slug within the category */
  sub: string;
  price: number;
  oldPrice?: number;
  stock: StockStatus;
  short: string;
  description: string[];
  specs: [string, string][];
  exercises?: string[];
  variants?: Variant[];
  art: ArtKind;
  /** Accent color for the illustration (CSS color) */
  tone: string;
  rating: number;
  reviews: number;
  tags?: Tag[];
  /** Also listed under these "Edzés típus szerint" subcategories */
  training?: string[];
  /**
   * true = the product, its price and its content were invented for this concept.
   * false = real product name and price taken from the client's brief (copy is still newly written).
   */
  mock: boolean;
}

export type Brand =
  | "TheraBand"
  | "Gonge"
  | "Cramer"
  | "Meru"
  | "Biofreeze"
  | "Sorbothane"
  | "Equa"
  | "Cubii"
  | "Gymstick"
  | "Flexbar"
  | "Digi-Flex"
  | "Eduplay"
  | "Muffik"
  | "ARK's";

export interface SubCategory {
  slug: string;
  name: string;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  short: string;
  description: string;
  accent: string;
  art: ArtKind;
  subs: SubCategory[];
  /** Subcategory slugs highlighted in the mega-menu */
  highlight: string[];
}

export interface CartLine {
  key: string;
  slug: string;
  variantId?: string;
  qty: number;
}
