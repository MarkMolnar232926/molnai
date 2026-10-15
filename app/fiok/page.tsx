import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/forms/LoginForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = { title: "Fiókom" };

export default function AccountPage() {
  return (
    <div className="container-x pb-24 pt-6 sm:pt-8">
      <Breadcrumbs items={[{ label: "Fiókom" }]} />
      <div className="mx-auto mt-10 grid max-w-5xl gap-8 lg:grid-cols-2">
        <div>
          <h1 className="text-h1 font-extrabold">Bejelentkezés</h1>
          <p className="mt-4 text-lg text-muted">Rendeléseid, Hűségpontjaid és szakmai kedvezményed egy helyen.</p>
          <LoginForm />
        </div>
        <div className="on-dark flex flex-col justify-between rounded-[2rem] bg-ink p-8 text-white sm:p-10">
          <div>
            <p className="eyebrow text-r-yellow">Szakember vagy?</p>
            <h2 className="mt-4 text-h3 font-bold">Regisztrálj szakmai fiókot, és vásárolj akár 20% kedvezménnyel.</h2>
          </div>
          <Link href="/szakembereknek#regisztracio" className="mt-10 inline-flex min-h-12 items-center justify-center rounded-full bg-r-yellow px-6 font-semibold text-ink">
            Szakmai regisztráció
          </Link>
        </div>
      </div>
    </div>
  );
}
