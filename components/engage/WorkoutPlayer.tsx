"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, SkipForward, Volume2, VolumeX, X } from "lucide-react";
import { ProductArt } from "@/components/brand/ProductArt";
import { Swatch } from "@/components/ui/Swatch";
import type { ChallengeDay } from "@/data/challenge";
import { RESISTANCE_BY_ID } from "@/data/resistance";
import { celebrate, haptic } from "@/lib/confetti";
import { cn } from "@/lib/format";

type Phase = "ready" | "work" | "done";

const READY_SECONDS = 3;
const R = 92;
const C = 2 * Math.PI * R;

/** Guided workout: 3-second get-ready, timed exercises with a progress ring, optional beeps. */
export function WorkoutPlayer({ day, onFinish, onClose }: { day: ChallengeDay; onFinish: () => void; onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("ready");
  const [left, setLeft] = useState(READY_SECONDS);
  const [paused, setPaused] = useState(false);
  const [sound, setSound] = useState(true);
  const audio = useRef<AudioContext | null>(null);
  const finished = useRef(false);
  const exercise = day.exercises[index];
  const band = RESISTANCE_BY_ID[day.band];
  const total = phase === "ready" ? READY_SECONDS : exercise.seconds;

  const beep = useCallback(
    (freq = 660, ms = 120) => {
      if (!sound) return;
      try {
        audio.current ??= new AudioContext();
        const ctx = audio.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + ms / 1000);
        osc.connect(gain).connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + ms / 1000);
      } catch {
        /* audio unavailable */
      }
    },
    [sound],
  );

  const advance = useCallback(() => {
    if (phase === "ready") {
      setPhase("work");
      setLeft(exercise.seconds);
      beep(880, 180);
      haptic(30);
      return;
    }
    if (index < day.exercises.length - 1) {
      setIndex(index + 1);
      setPhase("ready");
      setLeft(READY_SECONDS);
      return;
    }
    setPhase("done");
    if (!finished.current) {
      finished.current = true;
      beep(988, 260);
      celebrate();
      onFinish();
    }
  }, [phase, index, day.exercises.length, exercise.seconds, beep, onFinish]);

  useEffect(() => {
    if (phase === "done" || paused) return;
    if (left <= 0) {
      advance();
      return;
    }
    const t = window.setTimeout(() => {
      if (left <= 4 && left > 1) beep(phase === "ready" ? 520 : 660);
      setLeft((l) => l - 1);
    }, 1000);
    return () => window.clearTimeout(t);
  }, [left, paused, phase, advance, beep]);

  useEffect(() => () => void audio.current?.close(), []);

  const progress = phase === "done" ? 1 : 1 - left / total;

  return (
    <div className="on-dark relative overflow-hidden rounded-[2rem] bg-ink p-6 text-white sm:p-10" role="region" aria-label={`${day.day}. nap edzése`}>
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-sky/25 blur-3xl" aria-hidden="true" />
      <div className="relative flex items-center justify-between gap-3">
        <p className="text-sm text-white/70">
          {day.day}. nap · {day.title} · {Math.min(index + 1, day.exercises.length)}/{day.exercises.length}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setSound((s) => !s)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
            aria-label={sound ? "Hang kikapcsolása" : "Hang bekapcsolása"}
            aria-pressed={sound}
          >
            {sound ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </button>
          <button type="button" onClick={onClose} className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20" aria-label="Edzés bezárása">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {phase === "done" ? (
        <div className="relative py-10 text-center" role="status">
          <p className="eyebrow text-brand-lime">Szép munka!</p>
          <p className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">{day.day}. nap teljesítve</p>
          <p className="mx-auto mt-3 max-w-md text-white/75">Holnap új gyakorlatok várnak. A sorozatod a böngésződben mentjük.</p>
          <button type="button" onClick={onClose} className="mt-8 inline-flex min-h-12 items-center rounded-full bg-brand-lime px-8 font-semibold text-ink">
            Vissza a naptárhoz
          </button>
        </div>
      ) : (
        <div className="relative mt-6 grid items-center gap-8 md:grid-cols-[auto_1fr]">
          <div className="relative mx-auto h-56 w-56 sm:h-64 sm:w-64">
            <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90" aria-hidden="true">
              <circle cx="100" cy="100" r={R} fill="none" stroke="rgb(255 255 255 / .1)" strokeWidth="10" />
              <circle
                cx="100"
                cy="100"
                r={R}
                fill="none"
                stroke={phase === "ready" ? "#5bb8ea" : "#8ec85e"}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={C * (1 - progress)}
                style={{ transition: "stroke-dashoffset 1s linear, stroke .3s" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-white/60">{phase === "ready" ? "Készülj" : "Hajrá"}</span>
              <span className="font-display text-7xl font-extrabold tabular-nums" aria-live="off">
                {left}
              </span>
              <span className="text-xs text-white/60">másodperc</span>
            </div>
          </div>

          <div>
            <p className="text-sm text-white/60">{phase === "ready" ? "Következik" : "Most"}</p>
            <h3 className="mt-1 text-h2 font-extrabold" aria-live="polite">
              {exercise.name}
            </h3>
            <p className="mt-3 max-w-lg text-lg text-white/80">{exercise.cue}</p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm">
              <Swatch level={day.band} size={14} /> {band.name} szalag · {band.level}
            </p>
            <div className={cn("mt-6 h-16 w-40 origin-left", phase === "work" && !paused && "animate-[rep_2.4s_ease-in-out_infinite]")} aria-hidden="true">
              <ProductArt kind="band" tone={band.color} className="h-full w-full" />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 font-semibold text-ink"
              >
                {paused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
                {paused ? "Folytatás" : "Szünet"}
              </button>
              <button
                type="button"
                onClick={advance}
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/30 px-6 font-semibold hover:bg-white/10"
              >
                <SkipForward className="h-4 w-4" aria-hidden="true" /> {phase === "ready" ? "Indítás most" : "Következő"}
              </button>
            </div>
          </div>
        </div>
      )}

      <ol className="relative mt-8 flex gap-1.5" aria-hidden="true">
        {day.exercises.map((e, i) => (
          <li key={e.name + i} className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
            <span
              className="block h-full bg-brand-lime transition-[width] duration-1000 ease-linear"
              style={{ width: i < index || phase === "done" ? "100%" : i === index && phase === "work" ? `${progress * 100}%` : "0%" }}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}
