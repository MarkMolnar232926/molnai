import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import { DemoRibbon } from "@/components/layout/DemoRibbon";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/layout/Providers";

const display = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-bricolage",
  display: "swap",
});

const body = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.thera-team.hu"),
  title: {
    default: "Thera-Team – Társ a mozgásban! | TheraBand forgalmazó 1995 óta",
    template: "%s | Thera-Team",
  },
  description:
    "Rehabilitációs, gyógytorna-, fitnesz- és gyerekfejlesztő eszközök. A TheraBand kizárólagos magyarországi forgalmazója 1995 óta. (Design koncepció)",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0b1530",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu" className={`${display.variable} ${body.variable}`}>
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
