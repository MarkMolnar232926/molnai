"use client";

import { AnimatePresence, m } from "framer-motion";
import { Cookie } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

type Consent = { necessary: true; analytics: boolean; marketing: boolean; preferences: boolean };

const KEY = "thera-team-consent";

const GROUPS: { id: keyof Omit<Consent, "necessary">; title: string; text: string }[] = [
  { id: "preferences", title: "Beállítások", text: "Megjegyezzük például a választott nézetet és szűrőket." },
  { id: "analytics", title: "Statisztika", text: "Névtelen látogatottsági adatok, hogy jobbá tegyük az oldalt." },
  { id: "marketing", title: "Marketing", text: "Személyre szabott ajánlatok más felületeken." },
];

function Toggle({ checked, onChange, label, disabled }: { checked: boolean; onChange?: (v: boolean) => void; label: string; disabled?: boolean }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors ${checked ? "bg-r-green" : "bg-ink/20"} disabled:opacity-60`}
    >
      <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [details, setDetails] = useState(false);
  const [consent, setConsent] = useState<Consent>({ necessary: true, analytics: false, marketing: false, preferences: true });

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) {
        const t = window.setTimeout(() => setVisible(true), 1200);
        return () => window.clearTimeout(t);
      }
    } catch {
      /* storage unavailable: keep the banner hidden */
    }
  }, []);

  useEffect(() => {
    const reopen = () => {
      setDetails(true);
      setVisible(true);
    };
    window.addEventListener("open-cookie-settings", reopen);
    return () => window.removeEventListener("open-cookie-settings", reopen);
  }, []);

  const save = (value: Consent) => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ ...value, date: new Date().toISOString() }));
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <m.section
          role="region"
          aria-label="Süti beállítások"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-3 bottom-3 z-[55] mx-auto max-w-xl overflow-hidden rounded-3xl bg-ink text-white shadow-[0_30px_80px_-20px_rgb(11_21_48/0.8)] on-dark sm:inset-x-auto sm:left-6"
        >
          <div className="spectrum-rule !rounded-none" aria-hidden="true" />
          <div className="p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Cookie className="mt-0.5 h-6 w-6 shrink-0 text-r-yellow" aria-hidden="true" />
              <div>
                <h2 className="font-display text-lg font-bold">Sütiket használunk</h2>
                <p className="mt-1 text-sm text-muted-dark">
                  A működéshez szükséges sütik mellett, a hozzájárulásoddal, statisztikai és marketing célú sütiket is használnánk.
                  Részletek az <Link href="/info/adatvedelem" className="underline underline-offset-2 hover:text-white">Adatvédelmi tájékoztatóban</Link>.
                </p>
              </div>
            </div>

            {details && (
              <ul className="mt-5 space-y-3">
                <li className="flex items-center justify-between gap-4 rounded-2xl bg-white/5 p-3">
                  <div>
                    <p className="text-sm font-semibold">Szükséges</p>
                    <p className="text-xs text-muted-dark">Kosár, bejelentkezés, biztonság. Nem kapcsolható ki.</p>
                  </div>
                  <Toggle checked disabled label="Szükséges sütik (mindig aktív)" />
                </li>
                {GROUPS.map((g) => (
                  <li key={g.id} className="flex items-center justify-between gap-4 rounded-2xl bg-white/5 p-3">
                    <div>
                      <p className="text-sm font-semibold">{g.title}</p>
                      <p className="text-xs text-muted-dark">{g.text}</p>
                    </div>
                    <Toggle checked={consent[g.id]} onChange={(v) => setConsent((c) => ({ ...c, [g.id]: v }))} label={`${g.title} sütik`} />
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <Button variant="secondary" className="sm:flex-1" onClick={() => save({ necessary: true, analytics: true, marketing: true, preferences: true })}>
                Összes elfogadása
              </Button>
              {details ? (
                <Button variant="outline-light" className="sm:flex-1" onClick={() => save(consent)}>
                  Választás mentése
                </Button>
              ) : (
                <Button variant="outline-light" className="sm:flex-1" onClick={() => setDetails(true)}>
                  Beállítások
                </Button>
              )}
              <Button
                variant="outline-light"
                className="border-transparent sm:w-auto"
                onClick={() => save({ necessary: true, analytics: false, marketing: false, preferences: false })}
              >
                Elutasítom
              </Button>
            </div>
          </div>
        </m.section>
      )}
    </AnimatePresence>
  );
}
