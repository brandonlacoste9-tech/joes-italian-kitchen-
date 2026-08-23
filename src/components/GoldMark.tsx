type Props = {
  className?: string;
};

function ArcWord({
  text,
  radius,
  from,
  to,
  fontSize,
  upright = false,
}: {
  text: string;
  radius: number;
  from: number;
  to: number;
  fontSize: number;
  upright?: boolean;
}) {
  const chars = Array.from(text);
  return (
    <>
      {chars.map((ch, i) => {
        const t = chars.length === 1 ? 0.5 : i / (chars.length - 1);
        const angle = from + t * (to - from);
        const rad = (angle * Math.PI) / 180;
        const x = 100 + radius * Math.sin(rad);
        const y = 100 - radius * Math.cos(rad);
        const rot = upright ? 0 : angle;
        return (
          <text
            key={`${text}-${i}`}
            x={x}
            y={y}
            dy="0.35em"
            transform={rot ? `rotate(${rot} ${x} ${y})` : undefined}
            fill="url(#gold-foil)"
            fontFamily="var(--font-mark), Impact, sans-serif"
            fontSize={fontSize}
            fontWeight="600"
            textAnchor="middle"
          >
            {ch}
          </text>
        );
      })}
    </>
  );
}

function Beads({ radius, count }: { radius: number; count: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const a = (i / count) * Math.PI * 2 - Math.PI / 2;
        return (
          <circle
            key={i}
            cx={100 + radius * Math.cos(a)}
            cy={100 + radius * Math.sin(a)}
            r={i % 8 === 0 ? 1.5 : 0.85}
            fill="url(#gold-foil)"
          />
        );
      })}
    </>
  );
}

export function GoldMark({ className }: Props) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="Joe's Italian Kitchen"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gold-foil" x1="0.18" y1="0.05" x2="0.82" y2="1">
          <stop offset="0%" stopColor="#fff8d2" />
          <stop offset="18%" stopColor="#ffe27a" />
          <stop offset="46%" stopColor="#f0c94a" />
          <stop offset="72%" stopColor="#d4a017" />
          <stop offset="100%" stopColor="#8a6808" />
        </linearGradient>
        <radialGradient id="gold-disc" cx="38%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#3a2410" />
          <stop offset="55%" stopColor="#1a100c" />
          <stop offset="100%" stopColor="#0d0806" />
        </radialGradient>
      </defs>

      <circle cx="100" cy="100" r="97" fill="url(#gold-disc)" />
      <circle cx="100" cy="100" r="96.2" fill="none" stroke="url(#gold-foil)" strokeWidth="1.1" />
      <circle cx="100" cy="100" r="90.5" fill="none" stroke="url(#gold-foil)" strokeWidth="3.4" />
      <circle cx="100" cy="100" r="86.4" fill="none" stroke="url(#gold-foil)" strokeWidth="0.7" opacity="0.85" />
      <Beads radius={93.4} count={40} />

      <ArcWord text="ITALIAN" radius={76} from={-38} to={38} fontSize={14.5} />

      <g fill="url(#gold-foil)">
        <rect x="70" y="70.4" width="24" height="4.4" rx="1.3" />
        <rect x="93.5" y="68.2" width="2.5" height="8.8" rx="0.55" />
        <rect x="97.4" y="67.4" width="2.5" height="10.4" rx="0.55" />
        <rect x="101.3" y="67.4" width="2.5" height="10.4" rx="0.55" />
        <rect x="105.2" y="67.4" width="2.5" height="10.4" rx="0.55" />
        <rect x="109.1" y="68.2" width="2.5" height="8.8" rx="0.55" />
      </g>

      <text
        x="100"
        y="116"
        fill="url(#gold-foil)"
        fontFamily="var(--font-mark), Impact, sans-serif"
        fontSize="33"
        fontWeight="700"
        letterSpacing="1.5"
        textAnchor="middle"
      >
        JOE’S
      </text>

      <g fill="url(#gold-foil)">
        <rect x="74" y="123.6" width="16" height="4.6" rx="1.1" />
        <path d="M90 123.4 L126 125.2 L90 127.8 Z" />
      </g>

      <ArcWord text="KITCHEN" radius={74} from={214} to={146} fontSize={14.5} upright />

      <circle cx="28" cy="100" r="2.1" fill="url(#gold-foil)" />
      <circle cx="172" cy="100" r="2.1" fill="url(#gold-foil)" />
    </svg>
  );
}

export function GoldFlourish({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 28" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="gold-flourish" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a67c0c" />
          <stop offset="40%" stopColor="#f0c94a" />
          <stop offset="100%" stopColor="#fff1b0" />
        </linearGradient>
      </defs>
      <path
        d="M4 14 H86"
        fill="none"
        stroke="url(#gold-flourish)"
        strokeWidth="1.15"
      />
      <path
        d="M86 14 C94 6 102 6 110 14 C102 22 94 22 86 14 Z"
        fill="url(#gold-flourish)"
      />
      <path
        d="M108 14 C118 4 130 4 142 14 C130 24 118 24 108 14 Z"
        fill="url(#gold-flourish)"
        opacity="0.92"
      />
      <circle cx="154" cy="14" r="2.4" fill="url(#gold-flourish)" />
      <circle cx="166" cy="14" r="1.3" fill="url(#gold-flourish)" />
    </svg>
  );
}
