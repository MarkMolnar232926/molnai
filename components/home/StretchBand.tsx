"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Hand } from "lucide-react";
import { haptic } from "@/lib/confetti";
import { cn } from "@/lib/format";

/**
 * "Húzd meg!": a TheraBand-style band the visitor can stretch by dragging the right handle.
 * Shows elongation and approximate force live, then springs back with a little wobble.
 * Keyboard: the handle is a slider (arrow keys stretch, release by leaving the control).
 */

const L = 74; // left handle edge
const CY = 104;
const REST = 178; // right edge at rest
const MAX = 352; // right edge at maximum stretch
const REST_LEN = REST - L;
const MAX_ELONGATION = Math.round(((MAX - L - REST_LEN) / REST_LEN) * 100);

function elongation(x: number) {
  return Math.max(0, ((x - L - REST_LEN) / REST_LEN) * 100);
}

function bandPath(level: number, right: number) {
  const e = elongation(right) / MAX_ELONGATION;
  const th = (16 + level * 2.6) * (1 - 0.38 * Math.min(1, e));
  const sag = Math.max(0, (26 - level * 2.6) * (1 - 1.2 * e)) + (right < REST ? (REST - right) * 0.3 : 0);
  const t = CY - th / 2;
  const b = CY + th / 2;
  const c1 = L + (right - L) * 0.3;
  const c2 = L + (right - L) * 0.7;
  return {
    d: `M${L} ${t} C ${c1} ${t + sag}, ${c2} ${t + sag}, ${right} ${t} L ${right} ${b} C ${c2} ${b + sag}, ${c1} ${b + sag}, ${L} ${b} Z`,
    hi: `M${L + 6} ${t + 4} C ${c1} ${t + 4 + sag}, ${c2} ${t + 4 + sag}, ${right - 6} ${t + 4}`,
  };
}

export function StretchBand({ level, color, kg, name }: { level: number; color: string; kg: number; name: string }) {
  const [x, setX] = useState(REST);
  const [dragging, setDragging] = useState(false);
  const [touched, setTouched] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const state = useRef({ x: REST, v: 0, raf: 0, lastMilestone: 0 });

  const set = (nx: number) => {
    state.current.x = nx;
    setX(nx);
  };

  const springBack = useCallback((kick = 0) => {
    const s = state.current;
    cancelAnimationFrame(s.raf);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      s.x = REST;
      setX(REST);
      return;
    }
    s.v = kick;
    const step = () => {
      // Damped spring towards the rest length.
      const a = -0.09 * (s.x - REST) - 0.16 * s.v;
      s.v += a;
      s.x += s.v;
      setX(s.x);
      if (Math.abs(s.x - REST) > 0.3 || Math.abs(s.v) > 0.3) s.raf = requestAnimationFrame(step);
      else {
        s.x = REST;
        setX(REST);
      }
    };
    s.raf = requestAnimationFrame(step);
  }, []);

  // A playful tug whenever the level changes, hinting that the band is interactive.
  useEffect(() => {
    if (!touched) {
      state.current.x = REST + 70;
      springBack(0);
    }
    return () => cancelAnimationFrame(state.current.raf);
  }, [level, touched, springBack]);

  const toSvgX = (clientX: number) => {
    const svg = svgRef.current!;
    const r = svg.getBoundingClientRect();
    return ((clientX - r.left) / r.width) * 400;
  };

  const onDown = (e: React.PointerEvent) => {
    cancelAnimationFrame(state.current.raf);
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    setDragging(true);
    setTouched(true);
    set(Math.min(MAX, Math.max(REST - 20, toSvgX(e.clientX) - 10)));
  };
  const onMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const nx = Math.min(MAX, Math.max(REST - 20, toSvgX(e.clientX) - 10));
    set(nx);
    const milestone = Math.floor(elongation(nx) / 50);
    if (milestone !== state.current.lastMilestone) {
      state.current.lastMilestone = milestone;
      haptic(milestone > 2 ? 22 : 10);
    }
  };
  const onUp = () => {
    if (!dragging) return;
    setDragging(false);
    state.current.lastMilestone = 0;
    springBack(-6);
  };

  const onKey = (e: React.KeyboardEvent) => {
    const delta = e.key === "ArrowRight" || e.key === "ArrowUp" ? 12 : e.key === "ArrowLeft" || e.key === "ArrowDown" ? -12 : 0;
    if (!delta) return;
    e.preventDefault();
    setTouched(true);
    cancelAnimationFrame(state.current.raf);
    set(Math.min(MAX, Math.max(REST, state.current.x + delta)));
  };

  const el = Math.round(elongation(x));
  const force = (kg * el) / 100;
  const { d, hi } = bandPath(level, x);
  const strain = Math.min(1, el / MAX_ELONGATION);
  const over = el > 200;

  return (
    <div className="relative rounded-3xl bg-white/70 p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3 px-2 pt-1 text-sm">
        <span className="inline-flex items-center gap-2 font-semibold">
          <span className={cn("inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand text-white", !touched && "animate-bounce")}>
            <Hand className="h-4 w-4" aria-hidden="true" />
          </span>
          Húzd meg a szalagot!
        </span>
        <span className="tabular-nums text-muted" aria-live="polite">
          Nyújtás <strong className="text-ink">{el}%</strong> · Erő <strong className="text-ink">kb. {force.toFixed(1).replace(".", ",")} kg</strong>
        </span>
      </div>

      <svg
        ref={svgRef}
        viewBox="0 0 400 200"
        className={cn("w-full touch-none select-none", dragging ? "cursor-grabbing" : "cursor-grab")}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        role="img"
        aria-label={`${name} szalag, húzással nyújtható`}
      >
        <line x1="40" y1="170" x2="360" y2="170" stroke="#0a2540" strokeOpacity=".08" strokeWidth="2" strokeDasharray="4 6" />
        {/* Ruler: 100% and 200% elongation marks */}
        {[100, 200].map((p) => {
          const mx = L + REST_LEN * (1 + p / 100);
          return mx <= 400 ? (
            <g key={p}>
              <line x1={mx} y1="160" x2={mx} y2="176" stroke="#0a2540" strokeOpacity=".25" strokeWidth="1.5" />
              <text x={mx} y="192" textAnchor="middle" fontSize="10" fill="#55617a">
                {p}%
              </text>
            </g>
          ) : null;
        })}
        <path d={d} style={{ fill: color, transition: "fill .5s" }} stroke={color === "#1a1a1f" ? "#3a3a44" : "none"} />
        <path d={hi} fill="none" stroke="#fff" strokeOpacity={0.45 - strain * 0.25} strokeWidth="3" strokeLinecap="round" />
        <rect x={L - 34} y={CY - 26} width="34" height="52" rx="12" fill="#0a2540" />
        <g transform={`translate(${x} 0)`}>
          <rect
            y={CY - 26}
            width="34"
            height="52"
            rx="12"
            fill={over ? "#c8202a" : "#0a2540"}
            tabIndex={0}
            role="slider"
            aria-label="Szalag nyújtása"
            aria-valuemin={0}
            aria-valuemax={MAX_ELONGATION}
            aria-valuenow={el}
            aria-valuetext={`${el}% nyújtás, körülbelül ${force.toFixed(1).replace(".", ",")} kilogramm`}
            onKeyDown={onKey}
            onBlur={() => springBack(0)}
            className="outline-none focus-visible:stroke-brand-sky focus-visible:[stroke-width:4]"
            style={{ transition: "fill .3s" }}
          />
          <rect x="13" y={CY - 12} width="3" height="24" rx="1.5" fill="#fff" opacity=".35" pointerEvents="none" />
          <rect x="19" y={CY - 12} width="3" height="24" rx="1.5" fill="#fff" opacity=".35" pointerEvents="none" />
        </g>
      </svg>

      <div className="px-2 pb-1">
        <div className="h-2 overflow-hidden rounded-full bg-paper-2" aria-hidden="true">
          <div
            className="h-full rounded-full"
            style={{ width: `${strain * 100}%`, background: over ? "#c8202a" : "var(--brand-gradient)", transition: dragging ? "none" : "width .2s" }}
          />
        </div>
        <p className="mt-2 text-xs text-muted">
          {over
            ? "Ennyit már ne nyújts! A szalagot legfeljebb a hosszának kétszeresére (200%) érdemes nyújtani."
            : "A vonalak a 100% és 200% nyújtást jelölik. Az erő a nyújtással arányosan nő (illusztratív)."}
        </p>
      </div>
    </div>
  );
}
