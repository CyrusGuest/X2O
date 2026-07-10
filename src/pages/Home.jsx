import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  ArrowDown,
  Map as MapIcon,
  Sparkles,
  Database,
  BrainCircuit,
  ShieldCheck,
  FileCheck2,
  History,
  Fingerprint,
  Layers,
  Check,
} from 'lucide-react';
import { containerVariants, itemVariants } from '../animations/variants';
import Button from '../components/ui/Button';
import ProjectCard from '../components/ui/ProjectCard';
import CategoryIcon from '../components/ui/CategoryIcon';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import CommandGlobe from '../components/sections/CommandGlobe';
import Flywheel from '../components/sections/Flywheel';
import projects from '../data/projects.json';
import {
  categories,
  dashboardMetrics,
  intelligenceSignals,
  aiPredictions,
  businessModel,
} from '../data/platform';

const fragmentedChain = [
  'Capital',
  'Lawyers',
  'Banks',
  'Developers',
  'Contractors',
  'Utilities',
  'Suppliers',
  'Government',
  'Construction',
];

const tokenBenefits = [
  { icon: Sparkles, text: 'Faster settlement' },
  { icon: History, text: 'Transparent records' },
  { icon: Fingerprint, text: 'Digital ownership history' },
  { icon: Layers, text: 'Infrastructure identity' },
  { icon: FileCheck2, text: 'Project verification' },
  { icon: Check, text: 'Reduced paperwork' },
];

export default function Home() {
  const featured = projects.slice(0, 6);

  return (
    <div className="overflow-hidden">
      {/* ══ Hero ══════════════════════════════════════════ */}
      <section className="relative border-b border-line">
        <div className="pointer-events-none absolute inset-0 starfield opacity-70" />
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,114,245,0.14),transparent_65%)]" />

        <div className="relative mx-auto grid max-w-[1400px] items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-[13px] text-gray-200"
            >
              <span className="flex h-1.5 w-1.5 rounded-full bg-status-live" />
              The infrastructure operating system for the AI era
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mt-6 text-balance text-5xl font-semibold leading-[1.02] tracking-tightest text-white sm:text-6xl lg:text-[80px]"
            >
              Building America's <span className="text-gradient-accent">AI Future</span>.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-gray-200"
            >
              The world's largest tokenized marketplace helping accelerate AI
              infrastructure — from data centers and power generation to cooling,
              semiconductors, fiber, land, construction and security.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/marketplace">
                <Button size="lg">
                  Explore Marketplace
                  <ArrowRight size={16} />
                </Button>
              </Link>
              <Link to="/map">
                <Button variant="secondary" size="lg">
                  <MapIcon size={16} />
                  View Infrastructure Map
                </Button>
              </Link>
              <Link to="/marketplace">
                <Button variant="ghost" size="lg">
                  Join Early Access
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          >
            <CommandGlobe size={480} />
          </motion.div>
        </div>
      </section>

      {/* ══ Live dashboard ════════════════════════════════ */}
      <section className="border-b border-line bg-surface/30">
        <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400">
            <span className="flex h-1.5 w-1.5 animate-pulse rounded-full bg-status-live" />
            Live network · illustrative data
          </div>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-4">
            {dashboardMetrics.map((m) => (
              <div key={m.label} className="bg-canvas px-5 py-6">
                <AnimatedCounter
                  value={m.value}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  decimals={m.decimals}
                  className="font-mono text-2xl font-semibold tracking-tight text-white sm:text-3xl"
                />
                <p className="mt-2 text-[13px] text-gray-300">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Problem ═══════════════════════════════════════ */}
      <section id="problem" className="relative border-b border-line">
        <div className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-gray-400">The bottleneck</p>
            <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tightest text-white sm:text-5xl">
              The AI race has a physical bottleneck.
            </h2>
            <p className="mt-5 text-balance text-lg leading-relaxed text-gray-300">
              AI doesn't run on ideas — it runs on infrastructure. The next generation of AI
              requires massive investment into physical assets, yet projects still rely on
              spreadsheets, email, PDFs, phone calls, disconnected databases and legacy finance.
              They spend years coordinating information before construction even begins.
            </p>
          </div>

          <div className="mt-16 grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
            {/* Fragmented */}
            <div className="card p-6">
              <p className="mb-4 text-xs font-medium uppercase tracking-widest text-gray-400">
                Today · fragmented
              </p>
              <div className="space-y-2">
                {fragmentedChain.map((node) => (
                  <div
                    key={node}
                    className="flex items-center justify-between rounded-lg border border-dashed border-line bg-canvas px-4 py-2.5 text-sm text-gray-300"
                  >
                    {node}
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-700" />
                  </div>
                ))}
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface text-primary-light lg:rotate-0">
                <ArrowRight size={20} className="hidden lg:block" />
                <ArrowDown size={20} className="lg:hidden" />
              </div>
            </div>

            {/* Unified */}
            <div className="glass relative overflow-hidden rounded-xl p-6">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,114,245,0.18),transparent_60%)]" />
              <p className="relative mb-4 text-xs font-medium uppercase tracking-widest text-primary-light">
                With XSolut · unified
              </p>
              <div className="relative flex h-[calc(100%-2.5rem)] flex-col items-center justify-center rounded-lg border border-line bg-canvas/60 px-6 py-12 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-line bg-surface">
                  <Layers size={26} className="text-white" />
                </div>
                <p className="mt-4 text-lg font-semibold tracking-tight text-white">
                  One operating layer
                </p>
                <p className="mt-2 text-sm text-gray-300">
                  Capital, builders, utilities, suppliers and government — verified,
                  discovered, funded and tracked in one system of record.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ Marketplace preview ═══════════════════════════ */}
      <section id="marketplace" className="border-b border-line">
        <div className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-widest text-gray-400">
                The marketplace
              </p>
              <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tightest text-white sm:text-5xl">
                Every project, verified and discoverable.
              </h2>
              <p className="mt-4 text-lg text-gray-300">
                Browse real infrastructure the way you'd browse real estate — location, power,
                funding, timeline and risk, all in one place.
              </p>
            </div>
            <Link to="/marketplace">
              <Button variant="secondary">
                Open marketplace
                <ArrowUpRight size={16} />
              </Button>
            </Link>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {featured.map((p) => (
              <motion.div key={p.id} variants={itemVariants}>
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ Categories ════════════════════════════════════ */}
      <section id="categories" className="border-b border-line bg-surface/30">
        <div className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-gray-400">Coverage</p>
            <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tightest text-white sm:text-5xl">
              Every layer of physical infrastructure.
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((c) => (
              <Link
                key={c.key}
                to={`/marketplace?category=${c.key}`}
                className="group card glow-border card-hover flex items-center gap-3 p-4"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-canvas text-gray-200 transition-colors group-hover:text-white">
                  <CategoryIcon category={c.key} size={18} />
                </span>
                <span className="text-sm font-medium text-white">{c.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Tokenization ══════════════════════════════════ */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-gray-400">
                Tokenization
              </p>
              <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tightest text-white sm:text-5xl">
                A secure digital representation of real infrastructure.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-gray-300">
                Tokenization creates a secure digital record of real-world infrastructure and
                can support compliant forms of project participation, tracking and asset
                management.
              </p>
              <p className="mt-4 rounded-xl border border-line bg-surface p-4 text-sm leading-relaxed text-gray-400">
                Note: any investment-related functionality would require appropriate legal and
                regulatory compliance. XSolut is infrastructure software — not a speculative
                token.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {tokenBenefits.map((b) => {
                const Icon = b.icon;
                return (
                  <div key={b.text} className="card flex items-center gap-3 p-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-canvas text-primary-light">
                      <Icon size={16} />
                    </span>
                    <span className="text-sm text-gray-200">{b.text}</span>
                  </div>
                );
              })}
              <div className="card flex items-center gap-3 p-4 sm:col-span-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-canvas text-primary-light">
                  <Layers size={16} />
                </span>
                <span className="text-sm text-gray-200">Improved interoperability across systems</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ Intelligence layer ════════════════════════════ */}
      <section id="intelligence" className="relative border-b border-line bg-surface/30">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
        <div className="relative mx-auto max-w-[1400px] px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-[13px] text-primary-light">
              <Database size={13} /> The secret
            </div>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tightest text-white sm:text-5xl">
              The marketplace creates intelligence.
            </h2>
            <p className="mt-5 text-balance text-lg leading-relaxed text-gray-300">
              Every infrastructure project creates valuable operational data. As projects grow,
              XSolut builds one of the world's largest infrastructure intelligence datasets.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-2.5">
            {intelligenceSignals.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 8) * 0.04 }}
                className="rounded-full border border-line bg-canvas px-3.5 py-1.5 text-[13px] text-gray-200"
              >
                {s}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ AI layer ══════════════════════════════════════ */}
      <section id="ai" className="border-b border-line">
        <div className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-[13px] text-primary-light">
                <BrainCircuit size={13} /> The AI layer
              </div>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tightest text-white sm:text-5xl">
                As the dataset grows, XSolut begins to predict.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-gray-300">
                This transforms XSolut from a marketplace into an infrastructure intelligence
                platform — the system that knows where to build, what it costs, and when it
                will be done.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {aiPredictions.map((p) => (
                <div
                  key={p}
                  className="card glow-border card-hover flex items-center gap-2 p-3.5 text-[13px] text-gray-200"
                >
                  <Sparkles size={13} className="shrink-0 text-primary-light" />
                  {p}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ Flywheel ══════════════════════════════════════ */}
      <section className="border-b border-line bg-surface/30">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-gray-400">The flywheel</p>
            <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tightest text-white sm:text-5xl">
              A compounding advantage.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-gray-300">
              Projects attract the marketplace. The marketplace generates data. Data powers AI
              intelligence. Intelligence drives better decisions — which attracts even more
              projects. The loop compounds, forever.
            </p>
          </div>
          <Flywheel size={400} />
        </div>
      </section>

      {/* ══ Why it matters ════════════════════════════════ */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-gray-400">
              Why this matters
            </p>
            <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tightest text-white sm:text-5xl">
              Eventually, XSolut knows.
            </h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              'Where should the next AI campus be built?',
              'Where is power actually available?',
              'Which contractors finish on time?',
              'Which utility has the shortest wait?',
              'Which cooling system performs best long-term?',
              'Which state has the fastest permitting?',
            ].map((q, i) => (
              <motion.div
                key={q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="card p-6"
              >
                <span className="font-mono text-sm text-primary-light">0{i + 1}</span>
                <p className="mt-3 text-lg font-medium leading-snug text-white">{q}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Long-term vision ══════════════════════════════ */}
      <section className="border-b border-line bg-surface/30">
        <div className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-gray-400">Trajectory</p>
            <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tightest text-white sm:text-5xl">
              From AI infrastructure to everything physical.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <VisionCard tag="Today" items={['AI Infrastructure']} accent />
            <VisionCard
              tag="Tomorrow"
              items={['Energy', 'Defense', 'Robotics', 'Manufacturing', 'Transportation', 'Water', 'Cities']}
            />
            <VisionCard tag="Eventually" items={['Everything physical']} big />
          </div>
        </div>
      </section>

      {/* ══ Business model ════════════════════════════════ */}
      <section id="business" className="border-b border-line">
        <div className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-gray-400">
              Business model
            </p>
            <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tightest text-white sm:text-5xl">
              Many ways to monetize a system of record.
            </h2>
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            {businessModel.map((b) => (
              <div
                key={b}
                className="rounded-lg border border-line bg-surface px-4 py-2.5 text-sm text-gray-200 transition-colors hover:border-gray-600 hover:text-white"
              >
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Acquisition / strategic fit ═══════════════════ */}
      <section className="border-b border-line bg-surface/30">
        <div className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-gray-400">
              Strategic fit
            </p>
            <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tightest text-white sm:text-5xl">
              A coordination layer many will want.
            </h2>
            <p className="mt-5 text-balance text-lg leading-relaxed text-gray-300">
              Strategic interest could come from organizations that need infrastructure
              coordination or data — cloud providers, enterprise software companies,
              construction technology firms, infrastructure investors and government
              contractors. This is a potential fit, not an expectation.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {['Cloud Providers', 'Enterprise Software', 'Construction Tech', 'Infrastructure Funds', 'Industrial Technology', 'Government Contractors'].map(
              (t) => (
                <span key={t} className="glass rounded-full px-4 py-2 text-sm text-gray-200">
                  {t}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* ══ Final CTA ═════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 starfield opacity-60" />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,114,245,0.16),transparent_65%)]" />
        <div className="relative mx-auto max-w-3xl px-4 py-32 text-center sm:px-6">
          <h2 className="text-balance text-4xl font-semibold tracking-tightest text-white sm:text-6xl">
            The operating system for building AI infrastructure.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-gray-300">
            XSolut doesn't replace governments, builders or utilities — it becomes the digital
            layer that helps them work together.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link to="/marketplace">
              <Button size="lg">
                Explore Marketplace
                <ArrowRight size={16} />
              </Button>
            </Link>
            <Link to="/map">
              <Button variant="secondary" size="lg">
                <MapIcon size={16} />
                View Infrastructure Map
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function VisionCard({ tag, items, accent, big }) {
  return (
    <div
      className={
        'card relative overflow-hidden p-8 ' +
        (accent ? 'border-primary/30' : '')
      }
    >
      {accent && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,114,245,0.14),transparent_60%)]" />
      )}
      <p className="relative text-xs font-medium uppercase tracking-widest text-gray-400">{tag}</p>
      <div className="relative mt-4 space-y-2">
        {items.map((it) => (
          <p
            key={it}
            className={
              big
                ? 'text-2xl font-semibold tracking-tight text-gradient-accent'
                : 'text-lg font-medium text-white'
            }
          >
            {it}
          </p>
        ))}
      </div>
    </div>
  );
}
