"use client";

import { useRef, useState } from "react";
import { Award, Check, Clock, Copy, Lock, Play, RotateCcw } from "lucide-react";
import { Swatch } from "@/components/ui/Swatch";
import { CHALLENGE, CHALLENGE_COUPON, dayMinutes } from "@/data/challenge";
import { RESISTANCE_BY_ID } from "@/data/resistance";
import { cn } from "@/lib/format";
import { useChallenge, useHydrated } from "@/lib/store";
import { WorkoutPlayer } from "./WorkoutPlayer";

/** 7-day band challenge: calendar with sequential unlock, guided player, reward on completion. */
export function Challenge() {
  const hydrated = useHydrated();
  const completed = useChallenge((s) => s.completed);
  const complete = useChallenge((s) => s.complete);
  const reset = useChallenge((s) => s.reset);
  const [active, setActive] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);

  const done = hydrated ? completed : [];
  const nextDay = CHALLENGE.find((d) => !done.includes(d.day))?.day ?? null;
  const allDone = done.length === CHALLENGE.length;

  const start = (day: number) => {
    setActive(day);
    window.setTimeout(() => playerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CHALLENGE_COUPON);
      setCopied(true);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-muted">A haladásod</p>
          <p className="font-display text-3xl font-bold">
            {done.length} / {CHALLENGE.length} nap
          </p>
        </div>
        <div className="flex flex-1 basis-64 items-center gap-1.5" aria-hidden="true">
          {CHALLENGE.map((d) => (
            <span key={d.day} className={cn("h-2.5 flex-1 rounded-full transition-colors duration-500", done.includes(d.day) ? "bg-brand-gradient" : "bg-line")} />
          ))}
        </div>
        {done.length > 0 && (
          <button type="button" onClick={reset} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted hover:text-ink">
            <RotateCcw className="h-4 w-4" aria-hidden="true" /> Újrakezdés
          </button>
        )}
      </div>

      <ol className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {CHALLENGE.map((d) => {
          const isDone = done.includes(d.day);
          const unlocked = isDone || d.day === nextDay;
          return (
            <li key={d.day}>
              <button
                type="button"
                disabled={!unlocked}
                onClick={() => start(d.day)}
                className={cn(
                  "group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300",
                  isDone && "border-brand-green/40 bg-brand-green/10",
                  !isDone && unlocked && "border-brand bg-white shadow-[0_18px_40px_-24px_var(--color-brand)] hover:-translate-y-1",
                  !unlocked && "cursor-not-allowed border-line bg-white/60 opacity-70",
                  active === d.day && "ring-2 ring-brand ring-offset-2 ring-offset-paper",
                )}
              >
                <span className="flex items-center justify-between">
                  <span className="font-display text-3xl font-extrabold">{d.day}.</span>
                  <span
                    className={cn(
                      "inline-flex h-8 w-8 items-center justify-center rounded-full",
                      isDone ? "bg-brand-green-dark text-white" : unlocked ? "bg-brand text-white" : "bg-paper-2 text-muted",
                    )}
                  >
                    {isDone ? <Check className="h-4 w-4" /> : unlocked ? <Play className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
                  </span>
                </span>
                <span className="mt-3 block font-semibold leading-tight">{d.title}</span>
                <span className="mt-1 block text-xs text-muted">{d.focus}</span>
                <span className="mt-3 flex items-center gap-2 text-xs text-muted">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {dayMinutes(d)} perc
                  <Swatch level={d.band} size={12} />
                  <span className="sr-only">{RESISTANCE_BY_ID[d.band].name} szalag</span>
                </span>
                <span className="sr-only">{isDone ? "Teljesítve" : unlocked ? "Indítható" : "Zárolva, előbb teljesítsd az előző napot"}</span>
              </button>
            </li>
          );
        })}
      </ol>

      <div ref={playerRef} className="scroll-mt-28">
        {active !== null && (
          <div className="mt-10">
            <WorkoutPlayer
              key={active}
              day={CHALLENGE.find((d) => d.day === active)!}
              onFinish={() => complete(active)}
              onClose={() => setActive(null)}
            />
          </div>
        )}
      </div>

      {allDone && (
        <div className="relative mt-10 overflow-hidden rounded-[2rem] bg-white p-8 text-center sm:p-12" role="status">
          <span className="brand-rule absolute inset-x-0 top-0 !rounded-none" aria-hidden="true" />
          <Award className="mx-auto h-14 w-14 text-brand" aria-hidden="true" />
          <p className="mt-4 font-display text-3xl font-extrabold">Kihívás teljesítve!</p>
          <p className="mx-auto mt-2 max-w-md text-muted">Megérdemelt jutalom: 10% kedvezmény a következő rendelésedből.</p>
          <button
            type="button"
            onClick={copy}
            className="mt-6 inline-flex min-h-12 items-center gap-3 rounded-full border-2 border-dashed border-brand px-6 font-display text-xl font-bold tracking-widest text-brand"
            aria-label={`Kuponkód másolása: ${CHALLENGE_COUPON}`}
          >
            {CHALLENGE_COUPON} <Copy className="h-4 w-4" aria-hidden="true" />
          </button>
          <p className="mt-2 text-xs text-muted" aria-live="polite">
            {copied ? "Kimásolva a vágólapra." : "Demó kupon, a valódi kampánnyal cserélendő."}
          </p>
        </div>
      )}
    </div>
  );
}
