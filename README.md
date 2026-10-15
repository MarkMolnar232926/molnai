# Thera-Team – design koncepció (mock webáruház)

A "this is what your brand could look like" pitch for **Thera-Team Kft.**, exclusive Hungarian TheraBand distributor since 1995.
Front-end only: no backend, no real payments, no data leaves the browser. All copy is in Hungarian.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (83 static pages)
npm start        # serve the production build
npm run lint     # TypeScript check
```

Requires Node 20+. Set `CONCEPT_NOINDEX=1` at build time if the pitch is hosted publicly, so search engines do not index it.

## Stack

Next.js 16 (App Router, static generation) · TypeScript · Tailwind CSS 4 · Framer Motion (overlays, lazy-loaded features) ·
Zustand (cart and favourites, persisted to `localStorage`) · lucide-react icons · self-hosted variable fonts through `next/font/local`.

## Design system

The identity is built on the **TheraBand colour-coded resistance scale**: beige → yellow → red → green → blue → black → silver → gold.

- **Tokens** (`app/globals.css`, `@theme`): ink `#0b1530`, paper `#f7f5f0`, the eight `r-*` resistance colours, semantic `sale` / `ok` / `warn`, a fluid type scale (`text-display`, `text-h1…h3`), radii, easing.
- **Typography**: Bricolage Grotesque (display) + Inter (body). Both are subset to Latin-1 + Latin Extended-A, which covers ő and ű, at about 50 KB each.
- **Motifs**: spectrum rules and dividers, the animated canvas band hero (`HeroBands`), colour swatches on products, the resistance slider.
- **Imagery**: there is no photography. Products use SVG illustrations (`ProductArt`), and every photo slot is a labelled `PhotoPlaceholder` (`[Fotó: …]`).
- **Motion**: CSS scroll-driven reveals that need no JS and degrade to static content. Hover states, magnetic CTAs and counters are included, and everything respects `prefers-reduced-motion`.

## Structure

```
app/                  routes (Hungarian URLs)
  page.tsx            Home
  termekek/[kategoria]  category list (+ /termekek, /termekek/akciok)
  termek/[slug]       product page
  kosar, penztar      cart, 3-step demo checkout, /penztar/visszaigazolas
  szakembereknek, intezmenyeknek, rolunk, blog/[slug], kapcsolat, info/[slug], fiok, kedvencek, not-found
components/
  brand/              Logo, ProductArt (SVG illustrations), PhotoPlaceholder, SpectrumWaves
  layout/             Header + MegaMenu, MobileNav, Footer, CartDrawer, CommandPalette (Ctrl/Cmd+K), CookieBanner, Toast, PageHero
  home/               Hero, AudienceSelector, ResistanceGuide, CategoryBento, ProductCarousel, BrandStory, ProProgram, EducationBlog, Reviews, Newsletter
  shop/               ProductCard, CategoryView + Filters, ProductDetail + tabs, VariantPicker, QuickView, cart & checkout parts
  forms/              registration, quote, contact and login mockups (success state only)
  ui/                 Button, Sheet (focus trap), Field, Price, StockLabel, Stars, Swatch, Reveal, Counter, …
data/                 typed mock data: products, categories, resistance levels, blog, programmes, site config
lib/                  store (Zustand), Hungarian formatting (28 990 Ft), ribbon geometry, types
```

## Mock data

- **54 products** across all 6 categories, plus the AKCIÓK view. TheraBand bands carry their real colour/resistance variants.
- `mock: false` marks the 10 products and prices taken from the brief, such as Muffik, Gonge and Sorbothane. Their descriptions were still newly written.
- `mock: true` marks anything invented: products, prices and copy. Product pages show a "Demó termék" note for these.
- The resistance force values, discount percentages, statistics (15 000+ customers and so on), timeline years after 1995, reviews, workshops and opening hours are all illustrative and labelled as such on the page.

## To replace before going live

1. **Logo**: `components/brand/Logo.tsx` and `app/icon.svg` are placeholder wordmarks with a "30" badge.
2. **Photography**: every `[Fotó: …]` slot (hero worlds, about/team, product "in use" views). Real product photos should go through `next/image`.
3. **Copy and figures**: company history, statistics, discount tiers (`data/programs.ts`), timeline (`data/site.ts`), address and opening hours, and the TheraBand partner logo (with brand-owner approval).
4. **Legal texts**: ÁSZF, Adatvédelem, and shipping/payment terms (`data/info.ts`) are placeholders.
5. **Resistance chart**: the kg values in `data/resistance.ts` must be checked against the official TheraBand table.
6. **Catalogue**: connect to the real product feed or ShopRenter export instead of `data/products.ts`.

## Quality notes

- All pages were checked at 390 / 768 / 1440 px: no horizontal overflow, no console errors or hydration warnings in the production build.
- Lighthouse (mobile, production build): Accessibility, Best Practices and SEO score 100. Performance is 94–100 on inner pages and 88–94 on Home in Lighthouse's simulated mode. With applied throttling (real slow 4G + 4× CPU), LCP is about 1.9 s.
- Accessibility: semantic landmarks, skip link, keyboard-operable mega-menu, palette, tabs and radio groups, focus traps in dialogs, visible focus states, WCAG AA contrast.
