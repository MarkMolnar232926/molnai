"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Newsletter() {
  const [sent, setSent] = useState(false);

  return (
    <section className="container-x pb-20 lg:pb-28" aria-labelledby="hirlevel">
      <div className="on-dark relative overflow-hidden rounded-[2rem] bg-ink px-6 py-12 text-white sm:px-12 lg:px-16 lg:py-16">
        <div className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-[40rem] rotate-[-12deg] rounded-full bg-spectrum opacity-40 blur-3xl" aria-hidden="true" />
        <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 id="hirlevel" className="text-h2 font-bold">Gyakorlatok, akciók, szakmai tippek. Havonta egyszer.</h2>
            <p className="mt-4 text-white/75">Iratkozz fel, és ajándékba küldjük a 12 oldalas TheraBand gyakorlatgyűjteményünket.</p>
          </div>
          {sent ? (
            <div className="flex items-center gap-4 rounded-3xl bg-white/10 p-6" role="status">
              <CheckCircle2 className="h-10 w-10 shrink-0 text-r-green" aria-hidden="true" />
              <div>
                <p className="font-display text-xl font-bold">Köszönjük a feliratkozást!</p>
                <p className="text-sm text-white/70">Ez egy demó: valójában nem küldtünk adatot sehová.</p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="flex flex-col gap-3"
            >
              <div className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor="nl-email" className="sr-only">
                  E-mail cím
                </label>
                <input
                  id="nl-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="email@cimed.hu"
                  className="min-h-14 flex-1 rounded-full border border-white/20 bg-white/5 px-6 text-white placeholder:text-white/50 focus:border-r-yellow focus:outline-none"
                />
                <Button type="submit" variant="secondary" className="min-h-14 px-8">
                  Feliratkozom <Send className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
              <label className="flex items-start gap-3 text-sm text-white/70">
                <input type="checkbox" required className="mt-0.5 h-5 w-5 shrink-0 accent-[#f5c928]" />
                Elfogadom az adatvédelmi tájékoztatót, és hozzájárulok a hírlevél küldéséhez.
              </label>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
