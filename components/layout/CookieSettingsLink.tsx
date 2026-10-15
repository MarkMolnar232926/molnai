"use client";

export function CookieSettingsLink() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}
      className="inline-flex min-h-9 items-center text-[0.95rem] text-white/75 transition-colors hover:text-white"
    >
      Süti beállítások
    </button>
  );
}
