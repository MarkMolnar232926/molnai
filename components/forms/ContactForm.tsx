"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field, FormSuccess, SelectField } from "@/components/ui/Field";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  if (sent) {
    return (
      <FormSuccess title="Üzenet elküldve!">
        Köszönjük, hogy írtál. Munkanapokon általában néhány órán belül válaszolunk.
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
      <Field label="Név" name="name" required autoComplete="name" />
      <Field label="E-mail cím" name="email" type="email" required autoComplete="email" />
      <Field label="Telefonszám" name="phone" type="tel" autoComplete="tel" />
      <SelectField label="Téma" name="topic" defaultValue="Termékválasztás">
        <option>Termékválasztás</option>
        <option>Rendelés, szállítás</option>
        <option>Szakmai partnerprogram</option>
        <option>Intézményi ajánlat</option>
        <option>Garancia, visszaküldés</option>
        <option>Egyéb</option>
      </SelectField>
      <Field label="Üzenet" name="message" textarea required className="sm:col-span-2" />
      <label className="flex items-start gap-3 text-sm sm:col-span-2">
        <input type="checkbox" required className="mt-0.5 h-5 w-5 shrink-0 accent-[#0b1530]" />
        Elfogadom az adatvédelmi tájékoztatót.
      </label>
      <div className="sm:col-span-2">
        <Button type="submit" className="w-full sm:w-auto sm:px-10">
          Üzenet küldése
        </Button>
      </div>
    </form>
  );
}
