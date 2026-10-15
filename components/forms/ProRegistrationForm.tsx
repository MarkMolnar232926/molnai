"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, FormSuccess, SelectField } from "@/components/ui/Field";

export function ProRegistrationForm() {
  const [sent, setSent] = useState(false);
  const [file, setFile] = useState<string | null>(null);

  if (sent) {
    return (
      <FormSuccess title="Köszönjük a regisztrációt!">
        Kollégánk egy munkanapon belül ellenőrzi az adataidat, és e-mailben küldi a szakmai kedvezményed aktiválását.
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
      <Field label="Teljes név" name="name" required autoComplete="name" />
      <Field label="E-mail cím" name="email" type="email" required autoComplete="email" />
      <Field label="Telefonszám" name="phone" type="tel" autoComplete="tel" />
      <SelectField label="Szakterület" name="role" required defaultValue="">
        <option value="" disabled>
          Válassz…
        </option>
        <option>Gyógytornász, fizioterapeuta</option>
        <option>Orvos</option>
        <option>Személyi edző, erőnléti edző</option>
        <option>Masszőr</option>
        <option>Gyógypedagógus, fejlesztő pedagógus</option>
        <option>Egyéb sportszakember</option>
      </SelectField>
      <Field label="Működési nyilvántartási szám" name="license" hint="Gyógytornászoknak és orvosoknak, a 15%-os kedvezményhez." />
      <Field label="Munkahely / rendelő" name="workplace" />
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-sm font-semibold">Végzettséget igazoló dokumentum</span>
        <label className="flex min-h-24 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-line bg-paper/50 p-4 text-center text-sm text-muted transition-colors hover:border-ink/30 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-r-blue/20">
          <Upload className="h-5 w-5" aria-hidden="true" />
          {file ? <span className="font-semibold text-ink">{file}</span> : <span>Húzd ide a fájlt, vagy kattints a tallózáshoz (PDF, JPG)</span>}
          <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="sr-only" onChange={(e) => setFile(e.target.files?.[0]?.name ?? null)} />
        </label>
        <p className="mt-1.5 text-xs text-muted">Demó: a fájl nem kerül feltöltésre.</p>
      </div>
      <label className="flex items-start gap-3 text-sm sm:col-span-2">
        <input type="checkbox" required className="mt-0.5 h-5 w-5 shrink-0 accent-[#0b1530]" />
        Hozzájárulok, hogy a Thera-Team a megadott adataimat a szakmai státuszom ellenőrzése céljából kezelje.
      </label>
      <div className="sm:col-span-2">
        <Button type="submit" variant="primary" className="w-full sm:w-auto sm:px-10">
          Szakmai regisztráció beküldése
        </Button>
      </div>
    </form>
  );
}
