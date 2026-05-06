/**
 * LuxuryBackground
 *
 * Shared animated backdrop used across all dark sections.
 * Each variant shifts orb positions so sections feel unique
 * while sharing the same royal-green brand identity.
 *
 * Keyframes are defined once in globals.css:
 *   orb-drift-a, orb-drift-b, orb-drift-c
 */

type Variant = 'villas' | 'gallery' | 'floorplans' | 'register';

interface Props {
  variant?: Variant;
}

interface OrbConfig {
  size: string;
  color: string;
  opacity: number;
  style: React.CSSProperties;
  animation: string;
}

const configs: Record<Variant, OrbConfig[]> = {
  // ── Villas: gold top-left, teal center-right, green bottom
  villas: [
    {
      size: 'w-[700px] h-[700px]',
      color: 'radial-gradient(circle, #c9a14a 0%, #7a5a18 45%, transparent 70%)',
      opacity: 0.22,
      style: { top: '-20%', left: '-8%' },
      animation: 'orb-drift-a 22s ease-in-out infinite alternate',
    },
    {
      size: 'w-[900px] h-[900px]',
      color: 'radial-gradient(circle, #05a84e 0%, #023d1e 50%, transparent 70%)',
      opacity: 0.14,
      style: { top: '30%', right: '-15%' },
      animation: 'orb-drift-b 28s ease-in-out infinite alternate',
    },
    {
      size: 'w-[500px] h-[500px]',
      color: 'radial-gradient(circle, #016632 0%, transparent 70%)',
      opacity: 0.20,
      style: { bottom: '-10%', left: '30%' },
      animation: 'orb-drift-c 19s ease-in-out infinite alternate',
    },
  ],

  // ── Gallery: teal wide wash left, gold accent right
  gallery: [
    {
      size: 'w-[1000px] h-[1000px]',
      color: 'radial-gradient(circle, #025c2e 0%, #013319 50%, transparent 70%)',
      opacity: 0.30,
      style: { top: '-30%', left: '-20%' },
      animation: 'orb-drift-b 26s ease-in-out infinite alternate',
    },
    {
      size: 'w-[600px] h-[600px]',
      color: 'radial-gradient(circle, #b8923a 0%, #7a5a18 45%, transparent 70%)',
      opacity: 0.18,
      style: { bottom: '-15%', right: '-5%' },
      animation: 'orb-drift-a 20s ease-in-out infinite alternate',
    },
    {
      size: 'w-[400px] h-[400px]',
      color: 'radial-gradient(circle, #05a84e 0%, transparent 70%)',
      opacity: 0.12,
      style: { top: '40%', right: '25%' },
      animation: 'orb-drift-c 17s ease-in-out infinite alternate',
    },
  ],

  // ── Floor Plans: deep centered glow, warm gold top-right
  floorplans: [
    {
      size: 'w-[800px] h-[800px]',
      color: 'radial-gradient(circle, #04833d 0%, #023d1e 45%, transparent 70%)',
      opacity: 0.18,
      style: { top: '50%', left: '50%', transform: 'translate(-50%,-50%)' },
      animation: 'orb-drift-c 30s ease-in-out infinite alternate',
    },
    {
      size: 'w-[600px] h-[600px]',
      color: 'radial-gradient(circle, #c9a14a 0%, #8a6520 40%, transparent 70%)',
      opacity: 0.22,
      style: { top: '-15%', right: '-5%' },
      animation: 'orb-drift-a 21s ease-in-out infinite alternate',
    },
    {
      size: 'w-[450px] h-[450px]',
      color: 'radial-gradient(circle, #014d30 0%, transparent 70%)',
      opacity: 0.25,
      style: { bottom: '-10%', left: '-5%' },
      animation: 'orb-drift-b 18s ease-in-out infinite alternate',
    },
  ],

  // ── Register Interest: gold top-right, lime center, teal bottom-left
  register: [
    {
      size: 'w-[650px] h-[650px]',
      color: 'radial-gradient(circle, #c9a14a 0%, #8a6520 40%, transparent 70%)',
      opacity: 0.30,
      style: { top: '-20%', right: '-10%' },
      animation: 'orb-drift-a 20s ease-in-out infinite alternate',
    },
    {
      size: 'w-[800px] h-[800px]',
      color: 'radial-gradient(circle, #05a84e 0%, #03612c 40%, transparent 70%)',
      opacity: 0.20,
      style: { top: '50%', left: '50%', transform: 'translate(-50%,-50%)' },
      animation: 'orb-drift-b 24s ease-in-out infinite alternate',
    },
    {
      size: 'w-[500px] h-[500px]',
      color: 'radial-gradient(circle, #014d30 0%, transparent 70%)',
      opacity: 0.25,
      style: { bottom: '-15%', left: '-5%' },
      animation: 'orb-drift-c 17s ease-in-out infinite alternate',
    },
  ],
};

export default function LuxuryBackground({ variant = 'villas' }: Props) {
  const orbs = configs[variant];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Royal green base */}
      <div className="absolute inset-0 bg-[#012a17]" />

      {/* Animated orbs */}
      {orbs.map((orb, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${orb.size}`}
          style={{
            background: orb.color,
            opacity: orb.opacity,
            ...orb.style,
            animation: orb.animation,
          }}
        />
      ))}

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), ' +
            'linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Top edge vignette — blends with section above */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/20" />
    </div>
  );
}
