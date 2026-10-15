import { BRAND_SHADES } from "@/lib/brand";
import { ribbon } from "@/lib/ribbon";

/** Static, decorative version of the hero bands for inner pages (no JS). */
export function SpectrumWaves({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <g transform="rotate(-14 400 200)">
        {BRAND_SHADES.map((color, i) => (
          <path key={color} d={ribbon(-120, 920, 60 + i * 40, 34 + i * 2, 30 + i * 1.5, i * 0.6, 1.1)} fill={color} opacity={0.95} />
        ))}
      </g>
    </svg>
  );
}
