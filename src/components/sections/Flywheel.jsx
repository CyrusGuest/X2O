import { motion } from 'framer-motion';

const steps = [
  { name: 'Projects', metric: '50+', color: 'from-blue-500/20 to-blue-600/20' },
  { name: 'Marketplace', metric: '$2B+', color: 'from-cyan-500/20 to-cyan-600/20' },
  { name: 'Data', metric: '1M+', color: 'from-indigo-500/20 to-indigo-600/20' },
  { name: 'AI Intelligence', metric: '99.9%', color: 'from-purple-500/20 to-purple-600/20' },
  { name: 'Better Decisions', metric: '10x', color: 'from-violet-500/20 to-violet-600/20' },
  { name: 'More Projects', metric: '∞', color: 'from-primary/20 to-primary-light/20' },
];

export default function Flywheel({ size = 380 }) {
  const isMobile = size <= 280;

  return (
    <div className="relative mx-auto w-full max-w-sm">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,114,245,0.1),transparent_70%)]" />

      {/* Cascading flow visualization */}
      <div className="relative space-y-3">
        {steps.map((step, i) => (
          <motion.div
            key={step.name}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="relative"
          >
            {/* Connection line to next step */}
            {i < steps.length - 1 && (
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 top-full h-3 w-px bg-gradient-to-b from-primary/40 to-transparent"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
              />
            )}

            {/* Step card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`relative overflow-hidden rounded-xl border ${
                i === steps.length - 1
                  ? 'border-primary/40 bg-gradient-to-br from-primary/10 to-primary-light/10'
                  : 'border-line bg-surface/80'
              } backdrop-blur-sm p-4 transition-all`}
            >
              {/* Animated background gradient */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-100 transition-opacity`}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Step number */}
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    i === steps.length - 1
                      ? 'bg-gradient-to-br from-primary to-primary-light'
                      : 'bg-surface border border-primary/30'
                  }`}>
                    <span className={`text-xs font-bold ${
                      i === steps.length - 1 ? 'text-white' : 'text-primary-light'
                    }`}>
                      {i + 1}
                    </span>
                  </div>

                  {/* Step name */}
                  <div>
                    <p className={`text-sm font-medium ${
                      i === steps.length - 1 ? 'text-white' : 'text-gray-200'
                    }`}>
                      {step.name}
                    </p>
                    {isMobile && (
                      <p className="text-[10px] text-gray-500 mt-0.5">{step.metric}</p>
                    )}
                  </div>
                </div>

                {/* Metric badge */}
                {!isMobile && (
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                    className={`rounded-full px-3 py-1 ${
                      i === steps.length - 1
                        ? 'bg-primary/20 border border-primary/40'
                        : 'bg-surface border border-line'
                    }`}
                  >
                    <span className={`text-xs font-mono font-bold ${
                      i === steps.length - 1 ? 'text-primary-light' : 'text-gray-400'
                    }`}>
                      {step.metric}
                    </span>
                  </motion.div>
                )}

                {/* Flow indicator */}
                {i < steps.length - 1 && (
                  <motion.div
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" className="text-primary-light opacity-60">
                      <path d="M6 0L12 8H0L6 0Z" fill="currentColor"/>
                    </svg>
                  </motion.div>
                )}
              </div>

              {/* Progress bar for each step */}
              <motion.div
                className="mt-3 h-0.5 bg-surface rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + i * 0.1 }}
              >
                <motion.div
                  className={`h-full ${
                    i === steps.length - 1
                      ? 'bg-gradient-to-r from-primary to-primary-light'
                      : 'bg-primary/40'
                  }`}
                  initial={{ width: '0%' }}
                  whileInView={{ width: `${85 + i * 3}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.7 + i * 0.1 }}
                />
              </motion.div>
            </motion.div>

            {/* Loop back indicator for last item */}
            {i === steps.length - 1 && (
              <motion.div
                className="absolute -right-4 top-1/2 -translate-y-1/2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="text-primary-light opacity-40"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M4 12V9C4 5.68629 6.68629 3 10 3H14C17.3137 3 20 5.68629 20 9V12M20 12L17 9M20 12L17 15"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Central title overlay */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
      >
        <div className="bg-canvas/90 backdrop-blur-md rounded-full px-4 py-2 border border-primary/30">
          <p className="text-[10px] uppercase tracking-wider text-primary-light font-bold">
            The Flywheel
          </p>
        </div>
      </motion.div>
    </div>
  );
}