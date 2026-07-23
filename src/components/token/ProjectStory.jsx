import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, FileCheck2, Zap, HardHat, Snowflake, CheckCircle2, ShieldCheck } from 'lucide-react';

const milestones = [
  { t: 'Land Secured', icon: MapPin, note: 'Site acquired and surveyed' },
  { t: 'Permits Approved', icon: FileCheck2, note: 'Zoning & environmental cleared' },
  { t: 'Power Contract', icon: Zap, note: 'Grid interconnect secured' },
  { t: 'Construction', icon: HardHat, note: 'Vertical build underway' },
  { t: 'Cooling Installed', icon: Snowflake, note: 'Thermal systems commissioned' },
  { t: 'Operational', icon: CheckCircle2, note: 'Live and serving compute' },
];

export default function ProjectStory() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 75%', 'end 55%'],
  });
  const fillHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div ref={ref} className="relative mx-auto max-w-2xl">
      {/* Rail */}
      <div className="absolute left-[19px] top-2 bottom-2 w-px bg-line" />
      <motion.div
        className="absolute left-[19px] top-2 w-px bg-gradient-to-b from-primary-light to-primary"
        style={{ height: fillHeight }}
      />

      <div className="space-y-5">
        {milestones.map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={m.t}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="relative flex items-start gap-5 pl-1"
            >
              {/* Dot */}
              <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-primary-light">
                <Icon size={17} />
              </span>

              {/* Content */}
              <div className="flex flex-1 items-center justify-between gap-4 rounded-xl border border-line bg-surface p-4">
                <div>
                  <p className="text-[15px] font-semibold tracking-tight text-gray-900 dark:text-white">{m.t}</p>
                  <p className="mt-0.5 text-[13px] text-gray-400">{m.note}</p>
                </div>
                <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-status-live/25 bg-status-live/10 px-2.5 py-1 text-[11px] font-medium text-status-live">
                  <ShieldCheck size={12} />
                  Verified on XSolut
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
