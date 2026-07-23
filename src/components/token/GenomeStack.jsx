import { motion } from 'framer-motion';
import { Sparkles, Cpu, BrainCircuit, Store, Fingerprint } from 'lucide-react';

// Top → bottom. The token is the base layer everything else is built on.
const layers = [
  { label: 'AI Applications', note: 'Agents, copilots, products', icon: Sparkles },
  { label: 'AI Compute', note: 'GPU clusters & training', icon: Cpu },
  { label: 'Infrastructure Intelligence', note: 'Data, benchmarks & predictions', icon: BrainCircuit },
  { label: 'Marketplace', note: 'Discovery, funding & tracking', icon: Store },
  { label: 'Identity Layer', note: 'Verified project records', icon: Fingerprint },
  { label: 'XSolut Token', note: 'The connective base layer', base: true },
];

export default function GenomeStack() {
  const n = layers.length;
  return (
    <div className="mx-auto max-w-2xl [perspective:1200px]">
      <div className="space-y-2.5" style={{ transformStyle: 'preserve-3d' }}>
        {layers.map((l, i) => {
          const fromBottom = n - 1 - i; // bottom assembles first
          const Icon = l.icon;
          return (
            <motion.div
              key={l.label}
              initial={{ opacity: 0, y: 34, rotateX: -14 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: fromBottom * 0.12, duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
              className={
                'relative flex items-center justify-between rounded-xl border px-5 py-4 ' +
                (l.base
                  ? 'border-primary/40 bg-primary/[0.08]'
                  : 'border-line bg-surface')
              }
              style={{ transformStyle: 'preserve-3d' }}
            >
              {l.base && (
                <div className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(ellipse_at_center,rgba(0,114,245,0.18),transparent_70%)]" />
              )}
              <div className="relative flex items-center gap-3">
                <span
                  className={
                    'flex h-9 w-9 items-center justify-center rounded-lg border ' +
                    (l.base ? 'border-primary/40 text-primary-light' : 'border-line text-gray-200')
                  }
                >
                  {l.base ? (
                    <svg width="16" height="16" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                      <path
                        d="M4 3.5h5.4L14 10.2 18.6 3.5H24l-7.2 10.5L24 24.5h-5.4L14 17.8 9.4 24.5H4l7.2-10.5L4 3.5Z"
                        fill="currentColor"
                      />
                    </svg>
                  ) : (
                    <Icon size={17} />
                  )}
                </span>
                <div>
                  <p className={'text-[15px] font-semibold tracking-tight ' + (l.base ? 'text-primary dark:text-primary-light' : 'text-gray-900 dark:text-white')}>
                    {l.label}
                  </p>
                  <p className="text-[12px] text-gray-400">{l.note}</p>
                </div>
              </div>
              <span className="relative font-mono text-[11px] uppercase tracking-widest text-gray-500">
                {l.base ? 'Base' : `L${fromBottom + 1}`}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
