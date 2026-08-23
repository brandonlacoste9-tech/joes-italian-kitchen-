type Props = {
  className?: string;
};

function ArcLetters({
  text,
  radius,
  side,
  fontSize,
}: {
  text: string;
  radius: number;
  side: 'top' | 'bottom';
  fontSize: number;
}) {
  const chars = Array.from(text);
  const spread = side === 'top' ? 58 : 54;
  return (
    <>
      {chars.map((ch, i) => {
        const t = chars.length === 1 ? 0 : i / (chars.length - 1) - 0.5;
        const deg = t * spread;
        const rad = (deg * Math.PI) / 180;
        const x = 100 + radius * Math.sin(rad);
        const y = side === 'top' ? 100 - radius * Math.cos(rad) : 100 + radius * Math.cos(rad);
        return (
          <text
            key={`${side}-${i}`}
            x={x}
            y={y}
            dy={side === 'top' ? '0.35em' : '0.35em'}
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
        <linearGradient id="gold-foil" x1="0.22" y1="0.08" x2="0.78" y2="1">
          <stop offset="0%" stopColor="#fff8d2" />
          <stop offset="22%" stopColor="#ffe27a" />
          <stop offset="48%" stopColor="#f0c94a" />
          <stop offset="78%" stopColor="#d4a017" />
          <stop offset="100%" stopColor="#a67c0c" />
        </linearGradient>
      </defs>

      <circle cx="100" cy="100" r="93" fill="none" stroke="url(#gold-foil)" strokeWidth="3.4" />

      <ArcLetters text="ITALIAN" radius={78} side="top" fontSize={15} />

      <rect x="78" y="66" width="44" height="5" rx="1.6" fill="url(#gold-foil)" />

      <text
        x="100"
        y="117"
        fill="url(#gold-foil)"
        fontFamily="var(--font-mark), Impact, sans-serif"
        fontSize="34"
        fontWeight="700"
        letterSpacing="1.6"
        textAnchor="middle"
      >
        JOE’S
      </text>

      <rect x="82" y="124" width="36" height="4.2" rx="1.2" fill="url(#gold-foil)" />

      <ArcLetters text="KITCHEN" radius={76} side="bottom" fontSize={15} />
    </svg>
  );
}
