import { useId, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/format";

const control =
  "w-full rounded-2xl border border-line bg-white px-4 text-[0.95rem] text-ink transition-colors placeholder:text-muted/70 hover:border-ink/30 focus:border-ink focus:outline-none focus-visible:outline-none focus:ring-4 focus:ring-r-blue/15 user-invalid:border-sale";

export function Field({
  label,
  hint,
  className,
  textarea,
  ...props
}: (ComponentProps<"input"> & { textarea?: false } | (ComponentProps<"textarea"> & { textarea: true })) & {
  label: ReactNode;
  hint?: ReactNode;
}) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label}
        {props.required && <span className="text-sale" aria-hidden="true"> *</span>}
      </label>
      {textarea ? (
        <textarea id={id} rows={5} className={cn(control, "py-3")} {...(props as ComponentProps<"textarea">)} />
      ) : (
        <input id={id} className={cn(control, "h-12")} {...(props as ComponentProps<"input">)} />
      )}
      {hint && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
    </div>
  );
}

export function SelectField({ label, children, className, ...props }: ComponentProps<"select"> & { label: ReactNode }) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label}
        {props.required && <span className="text-sale" aria-hidden="true"> *</span>}
      </label>
      <select id={id} className={cn(control, "h-12")} {...props}>
        {children}
      </select>
    </div>
  );
}

export function ChoiceCard({
  name,
  value,
  checked,
  onChange,
  title,
  text,
  aside,
  icon,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (v: string) => void;
  title: ReactNode;
  text?: ReactNode;
  aside?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <label
      className={cn(
        "relative flex cursor-pointer items-center gap-4 rounded-2xl border bg-white p-4 transition-colors has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-r-blue/20",
        checked ? "border-ink shadow-[0_0_0_1px_var(--color-ink)]" : "border-line hover:border-ink/30",
      )}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={() => onChange(value)} className="sr-only" />
      <span className={cn("flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2", checked ? "border-ink" : "border-ink/25")} aria-hidden="true">
        {checked && <span className="h-2.5 w-2.5 rounded-full bg-ink" />}
      </span>
      {icon}
      <span className="flex-1">
        <span className="block font-semibold">{title}</span>
        {text && <span className="block text-sm text-muted">{text}</span>}
      </span>
      {aside && <span className="text-sm font-semibold">{aside}</span>}
    </label>
  );
}

export function FormSuccess({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div role="status" className="relative overflow-hidden rounded-[2rem] bg-white p-8 text-center sm:p-12">
      <span className="spectrum-rule absolute inset-x-0 top-0 !rounded-none" aria-hidden="true" />
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ok text-white">
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
          <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <h3 className="mt-6 font-display text-2xl font-bold">{title}</h3>
      <div className="mx-auto mt-3 max-w-md text-muted">{children}</div>
      <p className="mt-6 text-xs text-muted">Demó űrlap: adat nem került továbbításra.</p>
    </div>
  );
}
