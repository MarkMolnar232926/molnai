"use client";

import { useEffect, useRef } from "react";
import { RESISTANCE } from "@/data/resistance";

/**
 * Canvas animation: the eight TheraBand resistance colours as flowing, twisting bands.
 * Bands lean toward the pointer, as if being stretched. Pauses off-screen; static for reduced motion.
 */
export function HeroBands({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const colors = RESISTANCE.map((r) => r.color);
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = true;
    const pointer = { x: 0.72, y: 0.45, tx: 0.72, ty: 0.45 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduced || !running) draw(clock);
    };

    const N = 48;
    const top = new Float32Array((N + 1) * 2);
    const bot = new Float32Array((N + 1) * 2);
    const fac = new Float32Array(N + 1);

    function draw(t: number) {
      if (!ctx) return;
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      const mobile = w < 768;
      ctx.translate(w * (mobile ? 0.5 : 0.62), h * (mobile ? 0.7 : 0.52));
      ctx.rotate(-0.24);
      const span = Math.max(w, h) * 1.5;
      const gap = Math.min(h, 900) * (mobile ? 0.055 : 0.075);
      const px = (pointer.x - (mobile ? 0.5 : 0.62)) * w;
      const py = (pointer.y - 0.5) * h;

      for (let i = 0; i < colors.length; i++) {
        const baseY = (i - (colors.length - 1) / 2) * gap;
        const amp = gap * (0.9 + i * 0.06);
        const thick = gap * (0.62 + i * 0.035);
        const speed = 0.00032 * (1 + i * 0.07);
        const phase = i * 0.62;

        for (let s = 0; s <= N; s++) {
          const u = s / N;
          const x = -span / 2 + u * span;
          const a = u * Math.PI * 2.2 + t * speed + phase;
          const dx = (x - px) / span;
          const pull = Math.exp(-dx * dx * 26) * (py - baseY) * 0.28;
          const y = baseY + Math.sin(a) * amp + pull;
          const f = 0.16 + 0.84 * Math.abs(Math.cos(a * 0.7 + i * 0.9 + t * 0.00018));
          const half = (thick / 2) * f;
          top[s * 2] = x;
          top[s * 2 + 1] = y - half;
          bot[s * 2] = x;
          bot[s * 2 + 1] = y + half;
          fac[s] = f;
        }

        ctx.beginPath();
        ctx.moveTo(top[0], top[1]);
        for (let s = 1; s <= N; s++) ctx.lineTo(top[s * 2], top[s * 2 + 1]);
        for (let s = N; s >= 0; s--) ctx.lineTo(bot[s * 2], bot[s * 2 + 1]);
        ctx.closePath();
        ctx.fillStyle = colors[i];
        ctx.fill();

        // Shade only the twisting (narrow) parts; flat parts keep the pure colour.
        for (let s = 0; s < N; s++) {
          const f = (fac[s] + fac[s + 1]) / 2;
          if (f >= 0.55) continue;
          ctx.beginPath();
          ctx.moveTo(top[s * 2], top[s * 2 + 1]);
          ctx.lineTo(top[s * 2 + 2], top[s * 2 + 3]);
          ctx.lineTo(bot[s * 2 + 2], bot[s * 2 + 3]);
          ctx.lineTo(bot[s * 2], bot[s * 2 + 1]);
          ctx.closePath();
          ctx.fillStyle = `rgba(11,21,48,${(0.55 - f) * 0.7})`;
          ctx.fill();
        }

        if (i === 5) {
          // Keep the black band legible on the ink background.
          ctx.beginPath();
          ctx.moveTo(top[0], top[1]);
          for (let s = 1; s <= N; s++) ctx.lineTo(top[s * 2], top[s * 2 + 1]);
          ctx.strokeStyle = "rgba(169,176,186,.35)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
      ctx.restore();
    }

    // ~30 fps is plenty for slow-moving bands and halves the main-thread cost.
    // The bands settle after a while without interaction (saves battery, lets the page go idle)
    // and wake up again on pointer movement or scroll.
    const ACTIVE_MS = 9000;
    let last = 0;
    let prevT = 0;
    let clock = 4000; // animation time, advances only while running so resuming doesn't jump
    let activeUntil = 0;
    let visible = false;
    const loop = (t: number) => {
      if (!running) return;
      clock += prevT ? Math.min(64, t - prevT) : 16;
      prevT = t;
      if (t - last > 32) {
        last = t;
        draw(clock);
      }
      if (t > activeUntil) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    const wake = () => {
      activeUntil = performance.now() + ACTIVE_MS;
      if (visible && !running) {
        running = true;
        prevT = 0;
        raf = requestAnimationFrame(loop);
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = (e.clientX - rect.left) / rect.width;
      pointer.ty = (e.clientY - rect.top) / rect.height;
      wake();
    };

    let io: IntersectionObserver | undefined;
    let idle = 0;
    if (reduced) {
      draw(4000);
    } else {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("scroll", wake, { passive: true });
      io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) wake();
        else {
          running = false;
          cancelAnimationFrame(raf);
        }
      });
      // Paint one static frame now; start the loop once the page is idle so it doesn't compete with loading.
      draw(4000);
      running = false;
      const start = () => {
        io!.observe(canvas);
      };
      const hasIdle = typeof window.requestIdleCallback === "function";
      idle = hasIdle ? window.requestIdleCallback(start, { timeout: 2500 }) : window.setTimeout(start, 1200);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idle);
      window.clearTimeout(idle);
      ro.disconnect();
      io?.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", wake);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
