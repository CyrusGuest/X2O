import { motion } from 'framer-motion';
import { ArrowUpRight, Heart } from 'lucide-react';
import { containerVariants, itemVariants } from '../animations/variants';
import TiltCard from '../components/ui/TiltCard';
import { featured, people, more } from '../data/endorsements';

function Mark({ letter, color, size = 'lg' }) {
  const dim = size === 'lg' ? 'h-16 w-16 text-3xl' : 'h-12 w-12 text-xl';
  return (
    <div
      className={`flex ${dim} shrink-0 items-center justify-center rounded-xl font-semibold`}
      style={{
        background: `linear-gradient(135deg, ${color}26, transparent)`,
        border: `1px solid ${color}59`,
        color,
        boxShadow: `0 0 24px -8px ${color}66`,
      }}
    >
      {letter}
    </div>
  );
}

export default function Endorsements() {
  return (
    <div>
      {/* Header */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,114,245,0.12),transparent_65%)]" />
        <div className="relative mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-300 dark:border-line bg-white dark:bg-surface px-3 py-1 text-[13px] text-gray-200">
              <Heart size={13} className="text-primary-light" />
              Endorsements
            </div>
            <h1 className="mt-6 text-balance text-5xl font-semibold tracking-tightest text-gray-900 dark:text-white sm:text-6xl">
              Companies we're <span className="text-gradient-accent">inspired by</span>.
            </h1>
            <p className="mt-6 text-balance text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              XSolut stands on the shoulders of companies that redefined what infrastructure and
              marketplaces can be. These are a few we admire — and the ideas we've borrowed as we
              build the coordination layer for AI infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8">
          <p className="mb-8 text-sm font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400">
            Featured
          </p>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid gap-6 lg:grid-cols-2"
          >
            {featured.map((c) => (
              <motion.div key={c.name} variants={itemVariants}>
                <TiltCard className="card glow-border card-hover h-full p-8" max={5}>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-full flex-col"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <Mark letter={c.letter} color={c.color} />
                        <div>
                          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            {c.name}
                          </h2>
                          <p className="mt-1 text-sm" style={{ color: c.color }}>
                            {c.tag}
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight
                        size={20}
                        className="text-gray-500 transition-all duration-200 group-hover:text-gray-900 dark:text-white"
                      />
                    </div>
                    <p className="mt-6 text-[15px] leading-relaxed text-gray-600 dark:text-gray-300">{c.blurb}</p>
                  </a>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Influential People */}
      <section className="border-b border-line bg-gradient-to-br from-primary/5 to-transparent">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8">
          <p className="mb-8 text-sm font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400">
            Visionary Leaders
          </p>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid gap-6 lg:grid-cols-2"
          >
            {people.map((p) => (
              <motion.div key={p.name} variants={itemVariants}>
                <TiltCard className="card glow-border card-hover h-full p-8" max={5}>
                  <div className="flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <Mark letter={p.letter} color={p.color} />
                        <div>
                          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            {p.name}
                          </h2>
                          <p className="mt-1 text-sm" style={{ color: p.color }}>
                            {p.tag}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="mt-6 text-[15px] leading-relaxed text-gray-600 dark:text-gray-300">{p.blurb}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* More */}
      <section className="border-b border-line bg-white dark:bg-surface/20">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8">
          <p className="mb-8 text-sm font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400">
            Also on our wall
          </p>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {more.map((c) => (
              <motion.div key={c.name} variants={itemVariants}>
                <TiltCard className="card glow-border card-hover h-full p-6" max={6}>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-full flex-col"
                  >
                    <div className="flex items-center justify-between">
                      <Mark letter={c.letter} color={c.color} size="sm" />
                      <ArrowUpRight size={16} className="text-gray-500" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                      {c.name}
                    </h3>
                    <p className="mt-1 text-[13px]" style={{ color: c.color }}>
                      {c.tag}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{c.blurb}</p>
                  </a>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Disclaimer */}
      <section>
        <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
          <p className="max-w-3xl text-xs leading-relaxed text-gray-500">
            These endorsements reflect our genuine admiration and inspiration only. They do not
            imply affiliation, partnership, sponsorship, or any endorsement of XSolut by the named
            companies. All company names and trademarks are the property of their respective
            owners.
          </p>
        </div>
      </section>
    </div>
  );
}
