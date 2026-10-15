import type { ArtKind } from "@/lib/types";
import { ribbon } from "@/lib/ribbon";

const HI = { fill: "#fff", opacity: 0.35 };
const SH = { fill: "#0a2540", opacity: 0.1 };

function Shape({ kind, tone }: { kind: ArtKind; tone: string }) {
  switch (kind) {
    case "band":
      return (
        <>
          <ellipse cx="100" cy="168" rx="70" ry="8" {...SH} />
          <path d={ribbon(18, 182, 100, 34, 46, 0.4, 1.1)} fill={tone} />
          <path d={ribbon(18, 182, 94, 34, 12, 0.4, 1.1)} {...HI} />
        </>
      );
    case "clx":
      return (
        <>
          <ellipse cx="100" cy="170" rx="72" ry="7" {...SH} />
          <path d="M14 104 C 50 70, 80 140, 112 100 S 170 70, 188 98" fill="none" stroke={tone} strokeWidth="22" strokeLinecap="round" />
          {[34, 66, 98, 130, 162].map((x, i) => (
            <ellipse key={x} cx={x} cy={i % 2 ? 122 : 78} rx="13" ry="17" fill="none" stroke={tone} strokeWidth="9" />
          ))}
          <path d="M14 98 C 50 64, 80 134, 112 94 S 170 64, 188 92" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="5" strokeLinecap="round" />
        </>
      );
    case "tube":
      return (
        <>
          <ellipse cx="100" cy="172" rx="66" ry="7" {...SH} />
          <path d="M52 64 C 40 150, 160 150, 148 64" fill="none" stroke={tone} strokeWidth="12" strokeLinecap="round" />
          <rect x="34" y="38" width="36" height="30" rx="10" fill="#0a2540" />
          <rect x="130" y="38" width="36" height="30" rx="10" fill="#0a2540" />
          <rect x="40" y="44" width="10" height="18" rx="5" fill="#fff" opacity=".18" />
          <rect x="136" y="44" width="10" height="18" rx="5" fill="#fff" opacity=".18" />
        </>
      );
    case "loop":
      return (
        <>
          <ellipse cx="100" cy="168" rx="62" ry="7" {...SH} />
          <ellipse cx="100" cy="104" rx="66" ry="44" fill="none" stroke={tone} strokeWidth="22" />
          <ellipse cx="100" cy="98" rx="66" ry="44" fill="none" stroke="#fff" strokeOpacity=".3" strokeWidth="5" strokeDasharray="120 300" />
        </>
      );
    case "ball":
      return (
        <>
          <ellipse cx="100" cy="174" rx="58" ry="8" {...SH} />
          <circle cx="100" cy="102" r="64" fill={tone} />
          <path d="M40 92 C 80 120, 120 120, 162 90" fill="none" stroke="#0a2540" strokeOpacity=".14" strokeWidth="3" />
          <path d="M70 46 C 90 80, 92 130, 76 160" fill="none" stroke="#0a2540" strokeOpacity=".1" strokeWidth="3" />
          <ellipse cx="78" cy="72" rx="20" ry="13" transform="rotate(-30 78 72)" {...HI} />
        </>
      );
    case "roller":
      return (
        <>
          <ellipse cx="100" cy="164" rx="76" ry="8" {...SH} />
          <g transform="rotate(-14 100 100)">
            <rect x="30" y="68" width="140" height="64" rx="32" fill={tone} />
            {[56, 78, 100, 122, 144].map((x) => (
              <rect key={x} x={x} y="70" width="8" height="60" rx="4" fill="#0a2540" opacity=".16" />
            ))}
            <rect x="40" y="76" width="120" height="10" rx="5" {...HI} />
          </g>
        </>
      );
    case "disc":
      return (
        <>
          <ellipse cx="100" cy="146" rx="78" ry="22" fill="#0a2540" opacity=".1" />
          <ellipse cx="100" cy="128" rx="74" ry="24" fill={tone} />
          <ellipse cx="100" cy="116" rx="74" ry="24" fill={tone} />
          <ellipse cx="100" cy="116" rx="74" ry="24" fill="#fff" opacity=".18" />
          {[-44, -22, 0, 22, 44].map((dx) =>
            [-8, 8].map((dy) => <circle key={`${dx}${dy}`} cx={100 + dx} cy={116 + dy} r="3.5" fill="#0a2540" opacity=".18" />),
          )}
        </>
      );
    case "flexbar":
      return (
        <>
          <ellipse cx="100" cy="164" rx="70" ry="7" {...SH} />
          <path d="M30 128 Q 100 40, 170 128" fill="none" stroke={tone} strokeWidth="28" strokeLinecap="round" />
          <path d="M30 128 Q 100 40, 170 128" fill="none" stroke="#0a2540" strokeOpacity=".18" strokeWidth="28" strokeDasharray="3 9" />
          <path d="M40 116 Q 100 44, 160 116" fill="none" stroke="#fff" strokeOpacity=".3" strokeWidth="4" strokeLinecap="round" />
        </>
      );
    case "handgrip":
      return (
        <>
          <ellipse cx="100" cy="170" rx="54" ry="7" {...SH} />
          <rect x="58" y="70" width="84" height="92" rx="26" fill={tone} />
          {[64, 84, 104, 124].map((x) => (
            <rect key={x} x={x} y="40" width="14" height="40" rx="7" fill="#0a2540" opacity=".85" />
          ))}
          <rect x="68" y="84" width="14" height="60" rx="7" {...HI} />
        </>
      );
    case "tape":
      return (
        <>
          <ellipse cx="100" cy="166" rx="66" ry="7" {...SH} />
          <path d="M126 140 L 186 170 L 180 184 L 118 154 Z" fill={tone} opacity=".9" />
          <circle cx="92" cy="100" r="58" fill={tone} />
          <circle cx="92" cy="100" r="58" fill="none" stroke="#0a2540" strokeOpacity=".12" strokeWidth="1.5" strokeDasharray="1 4" />
          <circle cx="92" cy="100" r="26" fill="#f7f5f0" />
          <circle cx="92" cy="100" r="26" fill="none" stroke="#0a2540" strokeOpacity=".15" strokeWidth="4" />
          <path d="M52 70 A 50 50 0 0 1 90 48" fill="none" stroke="#fff" strokeOpacity=".4" strokeWidth="6" strokeLinecap="round" />
        </>
      );
    case "cream":
      return (
        <>
          <ellipse cx="100" cy="172" rx="50" ry="7" {...SH} />
          <path d="M64 40 L 136 40 L 128 150 Q 100 164 72 150 Z" fill={tone} />
          <rect x="80" y="150" width="40" height="18" rx="4" fill="#0a2540" />
          <rect x="60" y="34" width="80" height="10" rx="3" fill="#0a2540" opacity=".85" />
          <rect x="78" y="74" width="44" height="40" rx="6" fill="#fff" opacity=".85" />
          <rect x="86" y="84" width="28" height="4" rx="2" fill={tone} />
          <rect x="86" y="94" width="20" height="4" rx="2" fill="#0a2540" opacity=".3" />
          <rect x="70" y="50" width="8" height="90" rx="4" {...HI} />
        </>
      );
    case "insole":
      return (
        <>
          <ellipse cx="100" cy="174" rx="44" ry="7" {...SH} />
          <path d="M100 26 C 140 26, 146 70, 136 102 C 128 128, 132 168, 104 170 C 74 172, 70 140, 70 112 C 70 82, 60 26, 100 26 Z" fill={tone} />
          <path d="M100 40 C 126 40, 130 70, 124 96" fill="none" stroke="#fff" strokeOpacity=".4" strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="102" cy="146" rx="18" ry="14" fill="#f5c928" opacity=".85" />
          <ellipse cx="104" cy="58" rx="22" ry="16" fill="#e03a3e" opacity=".55" />
        </>
      );
    case "mat":
      return (
        <>
          <ellipse cx="100" cy="164" rx="80" ry="8" {...SH} />
          <path d="M20 152 L 132 152 L 132 120 L 20 120 Z" fill={tone} opacity=".75" />
          <circle cx="140" cy="118" r="38" fill={tone} />
          <circle cx="140" cy="118" r="26" fill="none" stroke="#0a2540" strokeOpacity=".2" strokeWidth="3" />
          <circle cx="140" cy="118" r="14" fill="none" stroke="#0a2540" strokeOpacity=".2" strokeWidth="3" />
          <path d="M112 92 A 38 38 0 0 1 152 82" fill="none" stroke="#fff" strokeOpacity=".4" strokeWidth="5" strokeLinecap="round" />
        </>
      );
    case "kettlebell":
      return (
        <>
          <ellipse cx="100" cy="172" rx="56" ry="8" {...SH} />
          <path d="M70 84 C 62 30, 138 30, 130 84" fill="none" stroke={tone} strokeWidth="16" />
          <circle cx="100" cy="116" r="54" fill={tone} />
          <rect x="72" y="150" width="56" height="16" rx="6" fill={tone} />
          <ellipse cx="80" cy="96" rx="14" ry="20" transform="rotate(20 80 96)" {...HI} />
          <circle cx="100" cy="118" r="16" fill="#f5c928" />
        </>
      );
    case "dumbbell":
      return (
        <>
          <ellipse cx="100" cy="160" rx="76" ry="8" {...SH} />
          <rect x="56" y="94" width="88" height="14" rx="7" fill="#0a2540" opacity=".8" />
          <polygon points="18,76 46,64 58,98 46,134 18,124 8,100" fill={tone} />
          <polygon points="182,76 154,64 142,98 154,134 182,124 192,100" fill={tone} />
          <polygon points="20,80 44,70 50,88 22,94" {...HI} />
          <polygon points="180,80 156,70 150,88 178,94" {...HI} />
        </>
      );
    case "rope":
      return (
        <>
          <ellipse cx="100" cy="170" rx="80" ry="7" {...SH} />
          <path d="M10 80 C 40 30, 60 150, 100 100 S 160 40, 190 120" fill="none" stroke={tone} strokeWidth="20" strokeLinecap="round" />
          <path d="M10 80 C 40 30, 60 150, 100 100 S 160 40, 190 120" fill="none" stroke="#fff" strokeOpacity=".3" strokeWidth="20" strokeDasharray="4 8" />
          <rect x="0" y="70" width="22" height="30" rx="6" fill="#0a2540" transform="rotate(-30 10 80)" />
        </>
      );
    case "box":
      return (
        <>
          <ellipse cx="100" cy="172" rx="70" ry="8" {...SH} />
          <polygon points="100,40 170,70 100,100 30,70" fill={tone} />
          <polygon points="100,40 170,70 100,100 30,70" fill="#fff" opacity=".3" />
          <polygon points="30,70 100,100 100,166 30,136" fill={tone} />
          <polygon points="170,70 100,100 100,166 170,136" fill={tone} />
          <polygon points="170,70 100,100 100,166 170,136" fill="#0a2540" opacity=".2" />
        </>
      );
    case "vest":
      return (
        <>
          <ellipse cx="100" cy="174" rx="56" ry="7" {...SH} />
          <path d="M66 30 L 84 30 Q 100 56 116 30 L 134 30 L 150 64 L 150 162 L 50 162 L 50 64 Z" fill={tone} />
          {[0, 1, 2].map((r) => (
            <rect key={r} x="62" y={80 + r * 26} width="76" height="18" rx="4" fill="#fff" opacity=".12" />
          ))}
          <rect x="96" y="70" width="8" height="92" fill="#0a2540" opacity=".25" />
        </>
      );
    case "tiles": {
      const cols = ["#f5c928", "#e03a3e", "#2e9b57", "#2563c9", tone, "#d9c5a0", "#2e9b57", "#f5c928", "#2563c9"];
      return (
        <>
          <ellipse cx="100" cy="176" rx="74" ry="7" {...SH} />
          <g transform="translate(100 104) skewX(-12) translate(-100 -104)">
            {cols.map((c, i) => (
              <g key={i}>
                <rect x={34 + (i % 3) * 46} y={44 + Math.floor(i / 3) * 42} width="40" height="36" rx="8" fill={c} />
                {[0, 1, 2].map((d) => (
                  <circle key={d} cx={44 + (i % 3) * 46 + d * 10} cy={62 + Math.floor(i / 3) * 42} r="2.6" fill="#0a2540" opacity=".18" />
                ))}
              </g>
            ))}
          </g>
        </>
      );
    }
    case "spinner":
      return (
        <>
          <ellipse cx="100" cy="172" rx="40" ry="6" {...SH} />
          {[0, 45, 90, 135].map((a) => (
            <rect key={a} x="97" y="18" width="6" height="26" rx="3" fill={tone} opacity=".35" transform={`rotate(${a} 100 100)`} />
          ))}
          <rect x="94" y="44" width="12" height="24" rx="5" fill="#0a2540" />
          <path d="M40 100 L 100 64 L 160 100 L 100 164 Z" fill={tone} />
          <path d="M40 100 L 100 64 L 160 100 Z" fill="#fff" opacity=".3" />
          <circle cx="100" cy="100" r="8" fill="#f5c928" />
        </>
      );
    case "beanbag":
      return (
        <>
          <ellipse cx="100" cy="170" rx="72" ry="8" {...SH} />
          <rect x="30" y="96" width="70" height="62" rx="20" fill="#2e9b57" transform="rotate(-8 65 127)" />
          <rect x="94" y="100" width="70" height="60" rx="20" fill="#2563c9" transform="rotate(10 129 130)" />
          <rect x="60" y="44" width="76" height="66" rx="22" fill={tone} />
          <rect x="70" y="52" width="40" height="12" rx="6" {...HI} />
        </>
      );
    case "cone":
      return (
        <>
          <ellipse cx="100" cy="166" rx="40" ry="8" {...SH} />
          <path d="M28 66 L 84 158 L 116 158 L 172 66 Z" fill={tone} />
          <path d="M28 66 L 84 158 L 96 158 L 60 66 Z" fill="#fff" opacity=".2" />
          <ellipse cx="100" cy="66" rx="72" ry="20" fill={tone} />
          <ellipse cx="100" cy="66" rx="60" ry="14" fill="#0a2540" opacity=".25" />
        </>
      );
    case "stick":
      return (
        <>
          <ellipse cx="100" cy="166" rx="76" ry="7" {...SH} />
          <rect x="20" y="92" width="160" height="14" rx="7" fill={tone} transform="rotate(-18 100 99)" />
          <rect x="24" y="94" width="150" height="4" rx="2" {...HI} transform="rotate(-18 100 99)" />
          {["#e03a3e", "#2e9b57", "#2563c9"].map((c, i) => (
            <circle key={c} cx={60 + i * 38} cy={146 - i * 4} r="14" fill={c} />
          ))}
        </>
      );
    case "frog":
      return (
        <>
          <ellipse cx="100" cy="170" rx="58" ry="8" {...SH} />
          <ellipse cx="100" cy="122" rx="62" ry="44" fill={tone} />
          <circle cx="72" cy="78" r="20" fill={tone} />
          <circle cx="128" cy="78" r="20" fill={tone} />
          <circle cx="72" cy="76" r="10" fill="#fff" />
          <circle cx="128" cy="76" r="10" fill="#fff" />
          <circle cx="74" cy="78" r="5" fill="#0a2540" />
          <circle cx="130" cy="78" r="5" fill="#0a2540" />
          <path d="M76 128 Q 100 146 124 128" fill="none" stroke="#0a2540" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="82" cy="104" rx="16" ry="8" {...HI} />
        </>
      );
    case "pencil":
      return (
        <>
          <ellipse cx="100" cy="174" rx="40" ry="6" {...SH} />
          <g transform="rotate(24 100 100)">
            <rect x="88" y="66" width="24" height="90" fill="#f5c928" />
            <polygon points="88,156 112,156 100,182" fill="#d9c5a0" />
            <polygon points="96,174 104,174 100,182" fill="#0a2540" />
            <path d="M80 70 C 80 20, 120 20, 120 70 Z" fill={tone} />
            <circle cx="92" cy="40" r="4" fill="#fff" opacity=".4" />
            <circle cx="104" cy="50" r="4" fill="#fff" opacity=".4" />
          </g>
        </>
      );
    case "pedal":
      return (
        <>
          <ellipse cx="100" cy="166" rx="74" ry="9" {...SH} />
          <path d="M30 150 L 170 150 L 150 98 L 50 98 Z" fill={tone} />
          <path d="M50 98 L 150 98 L 146 88 L 54 88 Z" fill="#fff" opacity=".3" />
          <rect x="54" y="70" width="40" height="14" rx="5" fill="#0a2540" transform="rotate(-12 74 77)" />
          <rect x="106" y="80" width="40" height="14" rx="5" fill="#0a2540" transform="rotate(12 126 87)" />
          <rect x="84" y="114" width="32" height="14" rx="4" fill="#0a2540" opacity=".7" />
        </>
      );
    case "dog":
      return (
        <>
          <ellipse cx="100" cy="164" rx="70" ry="16" fill={tone} opacity=".6" />
          <ellipse cx="100" cy="152" rx="70" ry="16" fill={tone} />
          <ellipse cx="100" cy="94" rx="42" ry="40" fill="#0a2540" />
          <ellipse cx="62" cy="82" rx="14" ry="30" fill="#0a2540" transform="rotate(18 62 82)" />
          <ellipse cx="138" cy="82" rx="14" ry="30" fill="#0a2540" transform="rotate(-18 138 82)" />
          <ellipse cx="100" cy="112" rx="22" ry="16" fill="#d9c5a0" />
          <circle cx="86" cy="88" r="5" fill="#fff" />
          <circle cx="114" cy="88" r="5" fill="#fff" />
          <ellipse cx="100" cy="104" rx="8" ry="6" fill="#0a2540" />
        </>
      );
    case "brace":
      return (
        <>
          <ellipse cx="100" cy="172" rx="62" ry="7" {...SH} />
          <path d="M70 30 L 120 30 L 122 112 C 150 116, 168 130, 166 160 L 64 160 C 60 130, 70 110, 70 90 Z" fill={tone} />
          {[50, 72, 94].map((y) => (
            <path key={y} d={`M76 ${y} L 116 ${y + 10}`} stroke="#fff" strokeOpacity=".7" strokeWidth="3" strokeLinecap="round" />
          ))}
          <rect x="76" y="34" width="10" height="110" rx="5" {...HI} />
        </>
      );
    case "hopscotch": {
      const cells: [number, number, string][] = [
        [80, 140, "#e03a3e"], [80, 104, "#f5c928"], [52, 68, "#2e9b57"], [108, 68, "#2563c9"], [80, 32, tone],
      ];
      return (
        <>
          <ellipse cx="100" cy="182" rx="56" ry="5" {...SH} />
          {cells.map(([x, y, c], i) => (
            <g key={i}>
              <rect x={x} y={y} width="40" height="32" rx="6" fill={c} />
              <text x={x + 20} y={y + 22} textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff" opacity=".9" fontFamily="system-ui">
                {i + 1}
              </text>
            </g>
          ))}
        </>
      );
    }
  }
}

export function ProductArt({
  kind,
  tone,
  className,
  label,
}: {
  kind: ArtKind;
  tone: string;
  className?: string;
  /** Accessible name; omit to render decoratively */
  label?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <Shape kind={kind} tone={tone} />
    </svg>
  );
}

/** Soft, tinted backdrop for a product illustration. */
export function artBackground(tone: string): React.CSSProperties {
  return {
    background: `radial-gradient(120% 90% at 30% 20%, color-mix(in oklab, ${tone} 22%, #ffffff) 0%, color-mix(in oklab, ${tone} 10%, #f3f0e9) 55%, #ece8de 100%)`,
  };
}
