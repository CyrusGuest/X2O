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
  const isMobile = size <= 280;
  const isTablet = size > 280 && size <= 340;
  const r = size / 2 - (isMobile ? 35 : 46);
  const center = size / 2;

  // Scale hub size based on flywheel size
  const hubSize = isMobile ? 'h-16 w-16' : isTablet ? 'h-20 w-20' : 'h-24 w-24';
  const theTextSize = isMobile ? 'text-[9px]' : 'text-[11px]';
  const flywheelTextSize = isMobile ? 'text-xs' : 'text-sm';

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
        <circle cx={center} cy={center - r} r={isMobile ? "3" : "4"} fill="#3291ff">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
        </circle>
      </motion.svg>

      {/* Center hub */}
      <div className={`absolute left-1/2 top-1/2 flex ${hubSize} -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-line bg-surface text-center`}>
        <span className={`${theTextSize} uppercase tracking-widest text-gray-400`}>The</span>
        <span className={`${flywheelTextSize} font-semibold text-white`}>Flywheel</span>
      </div>

      {/* Step nodes */}
      {steps.map((label, i) => {
        const angle = (i / steps.length) * Math.PI * 2 - Math.PI / 2;
        const x = center + r * Math.cos(angle);
        const y = center + r * Math.sin(angle);

        // Scale text and padding based on size
        const nodeTextSize = isMobile ? 'text-[10px]' : 'text-[12px]';
        const nodePadding = isMobile ? 'px-2 py-1' : 'px-3 py-1.5';
        const numberMargin = isMobile ? 'mr-1' : 'mr-1.5';

        // Shorten labels on mobile for some items
        const displayLabel = isMobile && label === 'AI Intelligence' ? 'AI Intel' :
                             isMobile && label === 'Better Decisions' ? 'Decisions' :
                             isMobile && label === 'More Projects' ? 'Growth' :
                             label;

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
            <span className={`whitespace-nowrap rounded-full border border-line bg-surface-raised ${nodePadding} ${nodeTextSize} font-medium text-white shadow-glow`}>
              <span className={`${numberMargin} font-mono text-primary-light`}>{i + 1}</span>
              {displayLabel}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
