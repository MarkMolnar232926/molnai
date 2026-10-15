"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field, FormSuccess } from "@/components/ui/Field";

export function LoginForm() {
  const [sent, setSent] = useState(false);
  if (sent) {
    return (
      <div className="mt-8">
        <FormSuccess title="Demó bejelentkezés">A koncepcióban nincs valódi felhasználói fiók, de itt jelenne meg a vezérlőpult.</FormSuccess>
      </div>
    );
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="mt-8 space-y-4 rounded-[2rem] bg-white p-6 sm:p-8"
    >
      <Field label="E-mail cím" type="email" name="email" required autoComplete="email" />
      <Field label="Jelszó" type="password" name="password" required autoComplete="current-password" />
      <Button type="submit" className="w-full">
        Bejelentkezés
      </Button>
      <p className="text-center text-sm text-muted">Demó űrlap, adatot nem továbbítunk.</p>
    </form>
  );
}
