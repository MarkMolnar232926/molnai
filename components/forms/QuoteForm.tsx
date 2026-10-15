"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, FormSuccess, SelectField } from "@/components/ui/Field";
import { CATEGORIES } from "@/data/categories";
import { cn } from "@/lib/format";

export function QuoteForm() {
  const [sent, setSent] = useState(false);
  const [interests, setInterests] = useState<string[]>([]);

  if (sent) {
    return (
      <FormSuccess title="Megkaptuk az ajánlatkérést!">
        Intézményi kapcsolattartónk 24 órán belül jelentkezik egy személyre szabott ajánlattal.
      </FormSuccess>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="grid gap-4 rounded-[2rem] bg-white p-6 sm:grid-cols-2 sm:p-10"
    >
      <Field label="Intézmény neve" name="org" required className="sm:col-span-2" />
      <SelectField label="Intézmény típusa" name="type" required defaultValue="">
        <option value="" disabled>
          Válassz…
        </option>
        <option>Bölcsőde</option>
        <option>Óvoda</option>
        <option>Általános vagy középiskola</option>
        <option>Fejlesztő központ, EGYMI</option>
        <option>Sportegyesület, klub</option>
        <option>Kórház, rehabilitációs intézet</option>
        <option>Vállalat (munkahelyi egészség)</option>
      </SelectField>
      <Field label="Adószám" name="tax" placeholder="12345678-1-12" />
      <Field label="Kapcsolattartó neve" name="name" required autoComplete="name" />
      <Field label="E-mail cím" name="email" type="email" required autoComplete="email" />
      <Field label="Telefonszám" name="phone" type="tel" autoComplete="tel" />
      <SelectField label="Tervezett keretösszeg" name="budget" defaultValue="">
        <option value="">Még nem tudom</option>
        <option>100 000 Ft alatt</option>
        <option>100 000 – 500 000 Ft</option>
        <option>500 000 – 2 000 000 Ft</option>
        <option>2 000 000 Ft felett</option>
      </SelectField>
      <fieldset className="sm:col-span-2">
        <legend className="mb-2 text-sm font-semibold">Mely területek érdekelnek?</legend>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const on = interests.includes(c.slug);
            return (
              <label
                key={c.slug}
                className={cn(
                  "inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-r-blue/20",
                  on ? "border-ink bg-ink text-white" : "border-line hover:border-ink/40",
                )}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={on}
                  onChange={() => setInterests((s) => (on ? s.filter((x) => x !== c.slug) : [...s, c.slug]))}
                />
                {on && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
                {c.short}
              </label>
            );
          })}
        </div>
      </fieldset>
      <Field label="Határidő" name="deadline" type="date" />
      <Field label="Darabszám, létszám" name="size" placeholder="pl. 3 csoport, 60 gyerek" />
      <Field label="Részletek, terméklista" name="message" textarea className="sm:col-span-2" placeholder="Írd le, mire van szükségetek, vagy másold be a terméklistát." />
      <label className="flex items-start gap-3 text-sm sm:col-span-2">
        <input type="checkbox" required className="mt-0.5 h-5 w-5 shrink-0 accent-[#0b1530]" />
        Hozzájárulok, hogy a Thera-Team az ajánlatadás céljából felvegye velem a kapcsolatot.
      </label>
      <div className="sm:col-span-2">
        <Button type="submit" className="w-full sm:w-auto sm:px-10">
          Ajánlatot kérek
        </Button>
      </div>
    </form>
  );
}
