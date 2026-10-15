import { BRAND_SHADES } from "./brand";

/**
 * Tiny dependency-free particle effects in the brand colours.
 * No-ops when the user prefers reduced motion.
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  vr: number;
  color: string;
  shape: 0 | 1;
  life: number;
}

const reduced = () => typeof window === "undefined" || matchMedia("(prefers-reduced-motion: reduce)").matches;

function run(particles: Particle[], gravity: number, duration: number) {
  const canvas = document.createElement("canvas");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  canvas.setAttribute("aria-hidden", "true");
  Object.assign(canvas.style, { position: "fixed", inset: "0", width: "100vw", height: "100vh", pointerEvents: "none", zIndex: "90" });
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d")!;
  ctx.scale(dpr, dpr);
  const start = performance.now();
  let prev = start;

  const frame = (now: number) => {
    const dt = Math.min(32, now - prev) / 16.7;
    prev = now;
    const t = (now - start) / duration;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (const p of particles) {
      p.vy += gravity * dt;
      p.vx *= 0.985;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.rot += p.vr * dt;
      ctx.save();
      ctx.globalAlpha = Math.max(0, 1 - Math.max(0, t - p.life));
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      if (p.shape === 0) ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
    if (t < 1.4) requestAnimationFrame(frame);
    else canvas.remove();
  };
  requestAnimationFrame(frame);
}

const pick = () => BRAND_SHADES[Math.floor(Math.random() * BRAND_SHADES.length)];

/** Small radial burst from an element, e.g. an add-to-cart button. */
export function burst(el: Element | null, count = 18) {
  if (!el || reduced()) return;
  const r = el.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  const particles: Particle[] = Array.from({ length: count }, (_, i) => {
    const a = (i / count) * Math.PI * 2 + Math.random() * 0.4;
    const speed = 3 + Math.random() * 3.5;
    return {
      x: cx,
      y: cy,
      vx: Math.cos(a) * speed,
      vy: Math.sin(a) * speed - 1.5,
      size: 6 + Math.random() * 5,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.4,
      color: pick(),
      shape: Math.random() > 0.5 ? 0 : 1,
      life: 0.35 + Math.random() * 0.3,
    };
  });
  run(particles, 0.18, 700);
}

/** Full-screen celebration, e.g. finishing a challenge day. */
export function celebrate() {
  if (reduced()) return;
  const particles: Particle[] = Array.from({ length: 160 }, (_, i) => {
    const fromLeft = i % 2 === 0;
    return {
      x: fromLeft ? -10 : innerWidth + 10,
      y: innerHeight * (0.55 + Math.random() * 0.3),
      vx: (fromLeft ? 1 : -1) * (6 + Math.random() * 9),
      vy: -(9 + Math.random() * 9),
      size: 7 + Math.random() * 7,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.35,
      color: pick(),
      shape: Math.random() > 0.35 ? 0 : 1,
      life: 0.7 + Math.random() * 0.3,
    };
  });
  run(particles, 0.32, 2200);
}

/** Short vibration on supporting phones (ignored elsewhere). */
export function haptic(ms = 12) {
  if (!reduced() && typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate?.(ms);
}
