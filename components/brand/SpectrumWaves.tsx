import { RESISTANCE } from "@/data/resistance";
import { ribbon } from "@/lib/ribbon";

/** Static, decorative version of the hero bands for inner pages (no JS). */
export function SpectrumWaves({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <g transform="rotate(-14 400 200)">
        {RESISTANCE.map((r, i) => (
          <path key={r.id} d={ribbon(-120, 920, 60 + i * 40, 34 + i * 2, 30 + i * 1.5, i * 0.6, 1.1)} fill={r.color} opacity={0.95} />
        ))}
      </g>
    </svg>
  );
}
