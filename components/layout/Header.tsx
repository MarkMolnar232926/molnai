"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Heart, Menu, Phone, Search, ShoppingBag, User } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { NAV, SITE } from "@/data/site";
import { useHydrated, useShop, useUI } from "@/lib/store";
import { cn } from "@/lib/format";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";

export function Header() {
  const pathname = usePathname();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const hoverTimer = useRef<number | undefined>(undefined);
  const hydrated = useHydrated();
  const count = useShop((s) => s.cart.reduce((n, l) => n + l.qty, 0));
  const favCount = useShop((s) => s.favorites.length);
  const setCartOpen = useUI((s) => s.setCartOpen);
  const setSearchOpen = useUI((s) => s.setSearchOpen);
  const [bump, setBump] = useState(false);
  const prevCount = useRef(count);

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMegaOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [megaOpen]);

  useEffect(() => {
    if (hydrated && count > prevCount.current) {
      setBump(true);
      const t = window.setTimeout(() => setBump(false), 600);
      prevCount.current = count;
      return () => window.clearTimeout(t);
    }
    prevCount.current = count;
  }, [count, hydrated]);

  const openSoon = () => {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setMegaOpen(true), 120);
  };
  const closeSoon = () => {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setMegaOpen(false), 180);
  };

  // Display is set per use (inline-flex or hidden sm:inline-flex) since classes are concatenated, not merged.
  const iconBtn = "relative h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5";

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300",
          scrolled || megaOpen
            ? "border-line bg-paper/90 shadow-[0_8px_30px_-20px_rgb(11_21_48/0.4)] backdrop-blur-xl"
            : "border-transparent bg-paper",
        )}
        onMouseLeave={closeSoon}
      >
        <div className="container-x flex h-[var(--header-h)] items-center gap-2 sm:gap-4">
          <button
            type="button"
            className={cn(iconBtn, "-ml-2 inline-flex lg:hidden")}
            aria-label="Menü megnyitása"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <Logo />

          <nav aria-label="Fő navigáció" className="ml-4 hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + "/");
                if ("mega" in item) {
                  return (
                    <li key={item.href} onMouseMove={megaOpen ? undefined : openSoon}>
                      <button
                        type="button"
                        aria-expanded={megaOpen}
                        aria-controls="mega-menu"
                        onClick={() => setMegaOpen((v) => !v)}
                        className={cn(
                          "inline-flex h-11 items-center gap-1 rounded-full px-3.5 text-[0.95rem] font-semibold transition-colors hover:bg-ink/5",
                          (active || megaOpen) && "bg-ink/5",
                        )}
                      >
                        {item.label}
                        <ChevronDown className={cn("h-4 w-4 transition-transform", megaOpen && "rotate-180")} aria-hidden="true" />
                      </button>
                    </li>
                  );
                }
                return (
                  <li key={item.href} onMouseEnter={closeSoon}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative inline-flex h-11 items-center rounded-full px-3 text-[0.95rem] font-medium text-ink/80 transition-colors hover:bg-ink/5 hover:text-ink",
                        active && "text-ink",
                      )}
                    >
                      {item.label}
                      {active && <span className="spectrum-rule absolute inset-x-3 bottom-1.5 !h-[3px]" aria-hidden="true" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="hidden h-11 items-center gap-3 rounded-full border border-line bg-white/70 pl-4 pr-2 text-sm text-muted transition-colors hover:border-ink/30 md:inline-flex lg:max-xl:pr-4 2xl:min-w-56"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              <span>Keresés</span>
              <kbd className="whitespace-nowrap rounded-md lg:max-xl:hidden 2xl:ml-auto border border-line bg-paper px-1.5 py-0.5 font-sans text-[0.7rem] font-semibold text-muted">Ctrl K</kbd>
            </button>
            <button type="button" onClick={() => setSearchOpen(true)} className={cn(iconBtn, "inline-flex md:hidden")} aria-label="Keresés">
              <Search className="h-5 w-5" />
            </button>

            <a
              href={SITE.phoneHref}
              className="mx-1 hidden items-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold text-ink sm:inline-flex"
              aria-label={`Hívjon minket: ${SITE.phone}`}
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-r-green/10 text-r-green 2xl:h-9 2xl:w-9">
                <Phone className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="hidden 2xl:inline">{SITE.phone}</span>
            </a>

            <Link href="/fiok" className={cn(iconBtn, "hidden sm:inline-flex")} aria-label="Fiókom">
              <User className="h-5 w-5" />
            </Link>
            <Link href="/kedvencek" className={cn(iconBtn, "hidden sm:inline-flex")} aria-label={`Kedvencek${hydrated && favCount ? `, ${favCount} termék` : ""}`}>
              <Heart className="h-5 w-5" />
              {hydrated && favCount > 0 && (
                <span className="absolute right-1 top-1 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-r-red px-1 text-[0.65rem] font-bold text-white">
                  {favCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className={cn(iconBtn, "inline-flex bg-ink text-white hover:bg-ink-3", bump && "scale-110")}
              style={{ transition: "transform .4s var(--ease-out-expo), background-color .2s" }}
              aria-label={`Kosár${hydrated ? `, ${count} termék` : ""}`}
            >
              <ShoppingBag className="h-5 w-5" />
              {hydrated && count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-r-yellow px-1 text-[0.7rem] font-bold text-ink ring-2 ring-paper">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        <MegaMenu open={megaOpen} onEnter={openSoon} onClose={() => setMegaOpen(false)} />
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
