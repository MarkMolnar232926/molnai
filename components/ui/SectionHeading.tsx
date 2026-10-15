import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  text,
  dark = false,
  align = "left",
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  dark?: boolean;
  align?: "left" | "center";
  action?: ReactNode;
}) {
  return (
    <Reveal
      className={`mb-10 flex flex-col gap-6 md:mb-14 ${
        align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"
      }`}
    >
      <div className={align === "center" ? "max-w-3xl" : "max-w-2xl"}>
        {eyebrow && (
          <p className={`eyebrow mb-4 flex items-center gap-3 ${dark ? "text-r-yellow" : "text-muted"} ${align === "center" ? "justify-center" : ""}`}>
            <span className="spectrum-rule inline-block w-8" aria-hidden="true" />
            {eyebrow}
          </p>
        )}
        <h2 className={`text-h2 font-bold ${dark ? "text-white" : "text-ink"}`}>{title}</h2>
        {text && <p className={`mt-4 text-lg ${dark ? "text-muted-dark" : "text-muted"}`}>{text}</p>}
      </div>
      {action}
    </Reveal>
  );
}
