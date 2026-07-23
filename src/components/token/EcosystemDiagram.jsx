import { motion } from 'framer-motion';
import {
  Store,
  Database,
  Users,
  BarChart3,
  Vote,
  Code2,
  Fingerprint,
  Compass,
} from 'lucide-react';
import TokenObject from './TokenObject';

const modules = [
  { label: 'Marketplace', icon: Store },
  { label: 'Infrastructure Registry', icon: Database },
  { label: 'Community', icon: Users },
  { label: 'Analytics', icon: BarChart3 },
  { label: 'Governance Features', icon: Vote },
  { label: 'Developer APIs', icon: Code2 },
  { label: 'Identity', icon: Fingerprint },
  { label: 'Project Discovery', icon: Compass },
];

export default function EcosystemDiagram({ size = 500 }) {
  const center = size / 2;
  const radius = size / 2 - 70;

  const points = modules.map((m, i) => {
    const angle = (i / modules.length) * Math.PI * 2 - Math.PI / 2;
    return { ...m, x: center + radius * Math.cos(angle), y: center + radius * Math.sin(angle) };
  });

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(0,114,245,0.10),transparent_65%)]" />

      {/* Connective lines + traveling pulses */}
      <svg className="absolute inset-0 h-full w-full" width={size} height={size}>
        {points.map((p, i) => (
          <g key={i}>
            <line
              x1={center}
              y1={center}
              x2={p.x}
              y2={p.y}
              stroke="rgba(255,255,255,0.10)"
              strokeWidth="1"
            />
            <line
              x1={center}
              y1={center}
              x2={p.x}
              y2={p.y}
              stroke="rgba(50,145,255,0.6)"
              strokeWidth="1"
              strokeDasharray="3 60"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="63;0"
                dur={`${2.4 + (i % 4) * 0.5}s`}
                repeatCount="indefinite"
              />
            </line>
          </g>
        ))}
      </svg>

      {/* Center token */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <TokenObject size={size * 0.34} />
      </div>

      {/* Module nodes */}
      {points.map((p, i) => {
        const Icon = p.icon;
        return (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="absolute"
            style={{ left: p.x, top: p.y, transform: 'translate(-50%, -50%)' }}
          >
            <div className="glass flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 shadow-glow">
              <Icon size={13} className="text-primary-light" />
              <span className="text-[12px] font-medium text-gray-900 dark:text-white">{p.label}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
