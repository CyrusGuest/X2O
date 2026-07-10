import { motion } from 'framer-motion';

const steps = [
  'Projects',
  'Marketplace',
  'Data',
  'AI Intelligence',
  'Better Decisions',
  'More Projects',
];

export default function Flywheel({ size = 380 }) {
  const r = size / 2 - 46;
  const center = size / 2;

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(0,114,245,0.12),transparent_65%)]" />

      {/* Rotating dashed ring */}
      <motion.svg
        className="absolute inset-0"
        width={size}
        height={size}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <circle
          cx={center}
          cy={center}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
        {/* Traveling comet */}
        <circle cx={center} cy={center - r} r="4" fill="#3291ff">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
        </circle>
      </motion.svg>

      {/* Center hub */}
      <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-line bg-surface text-center">
        <span className="text-[11px] uppercase tracking-widest text-gray-400">The</span>
        <span className="text-sm font-semibold text-white">Flywheel</span>
      </div>

      {/* Step nodes */}
      {steps.map((label, i) => {
        const angle = (i / steps.length) * Math.PI * 2 - Math.PI / 2;
        const x = center + r * Math.cos(angle);
        const y = center + r * Math.sin(angle);
        return (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.4 }}
            className="absolute flex items-center gap-2"
            style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
          >
            <span className="whitespace-nowrap rounded-full border border-line bg-surface-raised px-3 py-1.5 text-[12px] font-medium text-white shadow-glow">
              <span className="mr-1.5 font-mono text-primary-light">{i + 1}</span>
              {label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
