import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { DemoRibbon } from "@/components/layout/DemoRibbon";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/layout/Providers";

/*
 * Self-hosted variable fonts (SIL OFL), subset to Latin-1 + Latin Extended-A + punctuation:
 * everything Hungarian needs (ő, ű) in one ~50 KB file per family instead of several Google subsets.
 */
const display = localFont({
  src: "./fonts/bricolage-var.woff2",
  weight: "200 800",
  variable: "--font-bricolage",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "Arial"],
});

// "optional" avoids a late swap repaint on slow connections; the metric-adjusted fallback is close to Inter.
const body = localFont({
  src: "./fonts/inter-var.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "optional",
  fallback: ["ui-sans-serif", "system-ui", "Arial"],
});

/** Hides the server-rendered cookie banner before first paint if consent is already stored. */
const CONSENT_SCRIPT = `try{if(localStorage.getItem("thera-team-consent"))document.documentElement.classList.add("consented")}catch(e){}`;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.thera-team.hu"),
  title: {
    default: "Thera-Team – Társ a mozgásban! | TheraBand forgalmazó 1995 óta",
    template: "%s | Thera-Team",
  },
  description:
    "Rehabilitációs, gyógytorna-, fitnesz- és gyerekfejlesztő eszközök. A TheraBand kizárólagos magyarországi forgalmazója 1995 óta. (Design koncepció)",
  // Set CONCEPT_NOINDEX=1 when hosting the pitch publicly so the concept is not indexed.
  robots: process.env.CONCEPT_NOINDEX === "1" ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#0a2540",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: CONSENT_SCRIPT }} />
      </head>
      <body className="min-h-dvh">
        <a
          href="#tartalom"
          className="sr-only z-[100] rounded-full bg-ink px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Ugrás a tartalomra
        </a>
        <Providers>
          <DemoRibbon />
          <Header />
          <main id="tartalom">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
