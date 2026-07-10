import { motion } from 'framer-motion';
import TokenObject from './TokenObject';

const categories = [
  'Data Centers',
  'Cooling',
  'Power',
  'Construction',
  'Fiber',
  'Semiconductors',
  'Security',
  'Robotics',
];

// Deterministic node field arranged in elliptical rings around the center.
const W = 200;
const H = 100;
const CX = 100;
const CY = 50;
const rings = [
  { r: 24, count: 8, xScale: 1.7 },
  { r: 36, count: 12, xScale: 1.7 },
  { r: 46, count: 18, xScale: 1.75 },
];

const nodes = [];
rings.forEach((ring, ri) => {
  for (let i = 0; i < ring.count; i++) {
    const a = (i / ring.count) * Math.PI * 2 + ri * 0.4;
    const x = CX + ring.r * ring.xScale * Math.cos(a);
    const y = CY + ring.r * Math.sin(a);
    nodes.push({
      x: Math.max(4, Math.min(W - 4, x)),
      y: Math.max(5, Math.min(H - 5, y)),
      ring: ri,
      cat: (i + ri) % categories.length,
      delay: (i % 6) * 0.3,
    });
  }
});

const innerNodes = nodes.filter((n) => n.ring === 0);

export default function BlueprintNetwork() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-line bg-canvas">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,114,245,0.14),transparent_65%)]" />

      <div className="relative" style={{ aspectRatio: '2 / 1' }}>
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMid slice"
        >
          {/* faint node-to-node links */}
          {nodes.map((n, i) => {
            const next = nodes[(i * 7 + 3) % nodes.length];
            return (
              <line
                key={`l-${i}`}
                x1={n.x}
                y1={n.y}
                x2={next.x}
                y2={next.y}
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="0.2"
              />
            );
          })}

          {/* energy lines from center to inner ring */}
          {innerNodes.map((n, i) => (
            <g key={`e-${i}`}>
              <line x1={CX} y1={CY} x2={n.x} y2={n.y} stroke="rgba(50,145,255,0.14)" strokeWidth="0.4" />
              <line
                x1={CX}
                y1={CY}
                x2={n.x}
                y2={n.y}
                stroke="rgba(120,180,255,0.8)"
                strokeWidth="0.5"
                strokeDasharray="1.5 40"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="41.5;0"
                  dur={`${2 + (i % 4) * 0.6}s`}
                  repeatCount="indefinite"
                />
              </line>
            </g>
          ))}

          {/* nodes */}
          {nodes.map((n, i) => (
            <g key={`n-${i}`}>
              <circle cx={n.x} cy={n.y} r={n.ring === 0 ? 1.1 : 0.8} fill={n.ring === 0 ? '#8fc0ff' : '#5c5c66'}>
                <animate
                  attributeName="opacity"
                  values="0.35;1;0.35"
                  dur={`${2.6 + (i % 5) * 0.5}s`}
                  begin={`${n.delay}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          ))}
        </svg>

        {/* Center token */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <TokenObject size={150} />
        </div>
      </div>

      {/* Category legend */}
      <div className="flex flex-wrap justify-center gap-2 border-t border-line px-4 py-4">
        {categories.map((c) => (
          <span
            key={c}
            className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1 text-[12px] text-gray-200"
          >
            <span className="h-1 w-1 rounded-full bg-primary-light" />
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}
