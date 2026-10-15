/** Twisting ribbon polygon sampled from a sine curve; reads as a stretched resistance band. */
export function ribbon(x0: number, x1: number, cy: number, amp: number, w: number, phase = 0, freq = 1) {
  const top: string[] = [];
  const bottom: string[] = [];
  const steps = 40;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = x0 + (x1 - x0) * t;
    const a = t * Math.PI * 2 * freq + phase;
    const y = cy + Math.sin(a) * amp;
    const half = (w / 2) * (0.25 + 0.75 * Math.abs(Math.cos(a * 0.75 + 0.6)));
    top.push(`${x.toFixed(1)},${(y - half).toFixed(1)}`);
    bottom.unshift(`${x.toFixed(1)},${(y + half).toFixed(1)}`);
  }
  return `M${top.join(" L")} L${bottom.join(" L")} Z`;
}
