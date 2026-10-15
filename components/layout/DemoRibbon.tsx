export function DemoRibbon() {
  return (
    <div className="relative bg-ink text-white">
      <div className="container-x flex min-h-9 items-center justify-center gap-2 py-1.5 text-center text-xs">
        <span className="rounded-full bg-r-yellow px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-ink">Design koncepció</span>
        <span className="text-white/80">
          Demó oldal: a termékek, árak és tartalmak egy része illusztratív, rendelés nem történik.
        </span>
      </div>
      <div className="spectrum-rule !h-[3px] !rounded-none" aria-hidden="true" />
    </div>
  );
}
