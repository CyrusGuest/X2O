import { useState, useEffect } from 'react';
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
  Zap,
  Server,
  TrendingUp,
  ChevronDown,
  Shield,
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
  const featuredMobile = projects.slice(0, 3); // Only 3 for mobile
  const [globeSize, setGlobeSize] = useState(480);
  const [flywheelSize, setFlywheelSize] = useState(400);

  useEffect(() => {
    const updateSizes = () => {
      if (window.innerWidth < 640) {
        setGlobeSize(280);
        setFlywheelSize(280);
      } else if (window.innerWidth < 1024) {
        setGlobeSize(380);
        setFlywheelSize(340);
      } else {
        setGlobeSize(480);
        setFlywheelSize(400);
      }
    };

    updateSizes();
    window.addEventListener('resize', updateSizes);
    return () => window.removeEventListener('resize', updateSizes);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* ══ Hero ══════════════════════════════════════════ */}
      <section className="relative border-b border-line">
        <div className="pointer-events-none absolute inset-0 starfield opacity-70" />
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,114,245,0.14),transparent_65%)]" />

        <div className="relative mx-auto grid max-w-[1400px] items-center gap-8 px-4 py-16 sm:gap-10 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-2.5 py-1 text-[11px] sm:px-3 sm:text-[13px] text-gray-200"
            >
              <span className="flex h-1.5 w-1.5 rounded-full bg-yellow-500" />
              Coming Soon: The infrastructure operating system for the AI era
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mt-4 sm:mt-6 text-balance text-[2.5rem] font-semibold leading-[1.1] tracking-tightest text-white sm:text-5xl md:text-6xl lg:text-[80px]"
            >
              Building America's <span className="text-gradient-accent">AI Future</span>.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-4 sm:mt-6 max-w-xl text-balance text-base sm:text-lg leading-relaxed text-gray-200"
            >
              The world's largest tokenized marketplace helping accelerate AI
              infrastructure — from data centers and power generation to cooling,
              semiconductors, fiber, land, construction and security.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
              <Link to="/marketplace" className="sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto justify-center">
                  Explore Marketplace
                  <ArrowRight size={16} />
                </Button>
              </Link>
              <Link to="/map" className="sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto justify-center">
                  <MapIcon size={16} />
                  View Map
                </Button>
              </Link>
              <Link to="/marketplace" className="sm:w-auto">
                <Button variant="ghost" size="lg" className="w-full sm:w-auto justify-center">
                  Join Early Access
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className="mt-8 lg:mt-0 flex justify-center"
          >
            <CommandGlobe size={globeSize} />
          </motion.div>
        </div>
      </section>

      {/* ══ Preview dashboard ════════════════════════════════ */}
      <section className="relative border-b border-line bg-surface/30 overflow-hidden">
        {/* Animated background gradient for visual interest */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary-light/20 blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-4 py-8 sm:py-10 sm:px-6 lg:px-8">
          {/* Enhanced header with animated badge */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <span className="absolute inset-0 flex h-2 w-2 animate-ping rounded-full bg-yellow-500 opacity-75" />
                  <span className="relative flex h-2 w-2 rounded-full bg-yellow-500" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-medium text-white">Preview: Network Dashboard</h3>
                  <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400">
                    Coming soon - Sample data preview
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-gray-500">
                <span className="px-2 py-0.5 rounded-full bg-surface/50 border border-line">
                  Last updated: 2 min ago
                </span>
              </div>
            </div>
          </div>

          {/* Mobile-optimized metrics cards */}
          <div className="grid grid-cols-2 gap-3 md:hidden">
            {dashboardMetrics.slice(0, 4).map((m, index) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-canvas/80 backdrop-blur-sm border border-line rounded-xl p-4">
                  {/* Icon based on metric type */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="h-8 w-8 rounded-lg bg-surface/80 flex items-center justify-center">
                      {m.prefix === '$' ? (
                        <span className="text-primary-light text-sm font-bold">$</span>
                      ) : m.suffix.includes('GW') ? (
                        <Zap size={14} className="text-yellow-400" />
                      ) : m.label.includes('Project') ? (
                        <Layers size={14} className="text-blue-400" />
                      ) : (
                        <Server size={14} className="text-gray-400" />
                      )}
                    </div>
                    {/* Trend indicator */}
                    <span className="text-[10px] text-status-live flex items-center gap-0.5">
                      <TrendingUp size={10} />
                      +{Math.floor(Math.random() * 20 + 5)}%
                    </span>
                  </div>
                  <AnimatedCounter
                    value={m.value}
                    prefix={m.prefix}
                    suffix={m.suffix}
                    decimals={m.decimals}
                    className="font-mono text-2xl font-bold tracking-tight text-white"
                  />
                  <p className="mt-1 text-[11px] text-gray-400 line-clamp-1">{m.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Show more metrics expandable on mobile */}
          <details className="md:hidden mt-3">
            <summary className="flex items-center justify-center gap-2 py-2 text-xs text-gray-400 cursor-pointer hover:text-white transition-colors">
              <span>View all metrics</span>
              <ChevronDown size={14} />
            </summary>
            <div className="grid grid-cols-2 gap-3 mt-3">
              {dashboardMetrics.slice(4).map((m, index) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-canvas/80 backdrop-blur-sm border border-line rounded-xl p-4"
                >
                  <AnimatedCounter
                    value={m.value}
                    prefix={m.prefix}
                    suffix={m.suffix}
                    decimals={m.decimals}
                    className="font-mono text-xl font-semibold tracking-tight text-white"
                  />
                  <p className="mt-1 text-[11px] text-gray-400">{m.label}</p>
                </motion.div>
              ))}
            </div>
          </details>

          {/* Desktop grid - enhanced */}
          <div className="hidden md:grid grid-cols-4 gap-px overflow-hidden rounded-xl border border-line bg-line">
            {dashboardMetrics.map((m, index) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="relative bg-canvas px-5 py-6 group hover:bg-surface/50 transition-colors"
              >
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] text-status-live flex items-center gap-0.5">
                    <TrendingUp size={10} />
                    +{Math.floor(Math.random() * 20 + 5)}%
                  </span>
                </div>
                <AnimatedCounter
                  value={m.value}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  decimals={m.decimals}
                  className="font-mono text-3xl font-semibold tracking-tight text-white"
                />
                <p className="mt-2 text-[13px] text-gray-300">{m.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Mobile-only interactive footer */}
          <div className="md:hidden mt-6 p-3 bg-surface/30 rounded-lg border border-line/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-yellow-500 animate-pulse" />
                <span className="text-[10px] text-gray-400">Network launching soon</span>
              </div>
              <Link to="/map">
                <button className="text-[10px] text-primary-light hover:text-primary flex items-center gap-1">
                  View live map
                  <ArrowRight size={10} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ Problem ═══════════════════════════════════════ */}
      <section id="problem" className="relative border-b border-line">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs sm:text-sm font-medium uppercase tracking-widest text-gray-400">The bottleneck</p>
            <h2 className="mt-3 text-balance text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tightest text-white">
              The AI race has a physical bottleneck.
            </h2>
            <p className="mt-4 sm:mt-5 text-balance text-base sm:text-lg leading-relaxed text-gray-300">
              AI doesn't run on ideas — it runs on infrastructure. The next generation of AI
              requires massive investment into physical assets, yet projects still rely on
              spreadsheets, email, PDFs, phone calls, disconnected databases and legacy finance.
              They spend years coordinating information before construction even begins.
            </p>
          </div>

          <div className="mt-10 sm:mt-16 grid items-center gap-6 sm:gap-8 lg:grid-cols-[1fr_auto_1fr]">
            {/* Fragmented */}
            <div className="card p-4 sm:p-6">
              <p className="mb-3 sm:mb-4 text-[10px] sm:text-xs font-medium uppercase tracking-widest text-gray-400">
                Today · fragmented
              </p>
              <div className="space-y-2">
                {fragmentedChain.map((node) => (
                  <div
                    key={node}
                    className="flex items-center justify-between rounded-lg border border-dashed border-line bg-canvas px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm text-gray-300"
                  >
                    {node}
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-700" />
                  </div>
                ))}
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-line bg-surface text-primary-light lg:rotate-0">
                <ArrowRight size={18} className="hidden lg:block" />
                <ArrowDown size={18} className="lg:hidden" />
              </div>
            </div>

            {/* Unified */}
            <div className="glass relative overflow-hidden rounded-xl p-4 sm:p-6">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,114,245,0.18),transparent_60%)]" />
              <p className="relative mb-3 sm:mb-4 text-[10px] sm:text-xs font-medium uppercase tracking-widest text-primary-light">
                With XSolut · unified
              </p>
              <div className="relative flex h-[calc(100%-2.5rem)] flex-col items-center justify-center rounded-lg border border-line bg-canvas/60 px-4 py-8 sm:px-6 sm:py-12 text-center">
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl border border-line bg-surface">
                  <Layers size={22} className="text-white sm:hidden" />
                  <Layers size={26} className="hidden text-white sm:block" />
                </div>
                <p className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold tracking-tight text-white">
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
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:py-24 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-xs sm:text-sm font-medium uppercase tracking-widest text-gray-400">
                The marketplace
              </p>
              <h2 className="mt-3 text-balance text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tightest text-white">
                Every project, verified and discoverable.
              </h2>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-300">
                Browse real infrastructure the way you'd browse real estate — location, power,
                funding, timeline and risk, all in one place.
              </p>
            </div>
            <Link to="/marketplace" className="inline-block">
              <Button variant="secondary" className="w-full sm:w-auto justify-center">
                Open marketplace
                <ArrowUpRight size={16} />
              </Button>
            </Link>
          </div>

          {/* Mobile view - 3 projects only */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="mt-8 sm:hidden grid gap-4"
          >
            {featuredMobile.map((p) => (
              <motion.div key={p.id} variants={itemVariants}>
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </motion.div>

          {/* Desktop view - 6 projects */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="hidden sm:grid mt-12 gap-5 sm:grid-cols-2 lg:grid-cols-3"
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
      <section id="categories" className="relative border-b border-line bg-gradient-to-b from-canvas to-surface/30 overflow-hidden">
        {/* Subtle animated background - mobile optimized */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid opacity-10" />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-4 py-12 sm:py-24 sm:px-6 lg:px-8">
          {/* Compact header for mobile */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-1 w-12 bg-gradient-to-r from-primary to-primary-light rounded-full" />
              <p className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.15em] text-gray-400">
                Coverage
              </p>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Every layer of{' '}
              <span className="relative">
                <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-light/20 blur-2xl" />
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
                  infrastructure
                </span>
              </span>
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              14 categories · 5,184+ suppliers · 50 states
            </p>
          </div>

          {/* MOBILE: Clean grid layout */}
          <div className="sm:hidden">
            {/* Featured categories in a clean 2x3 grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {categories.slice(0, 6).map((c, index) => (
                <motion.div
                  key={c.key}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <Link
                    to={`/marketplace?category=${c.key}`}
                    className="group relative block h-full"
                  >
                    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-surface/80 to-canvas/80 backdrop-blur-sm border border-line/50 p-4 hover:border-primary/30 active:scale-[0.98] transition-all">
                      {/* Glow effect */}
                      <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                      {/* Content */}
                      <div className="relative">
                        {/* Icon */}
                        <div className="h-10 w-10 rounded-xl bg-canvas/60 border border-line/50 flex items-center justify-center mb-3 group-hover:border-primary/30 group-hover:bg-primary/5 transition-all">
                          <CategoryIcon
                            category={c.key}
                            size={18}
                            className="text-gray-300 group-hover:text-primary-light transition-colors"
                          />
                        </div>

                        {/* Text */}
                        <h3 className="text-sm font-semibold text-white group-hover:text-primary-light transition-colors line-clamp-1">
                          {c.label}
                        </h3>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          {Math.floor(Math.random() * 200 + 50)} projects
                        </p>
                      </div>

                      {/* Active indicator */}
                      {index < 3 && (
                        <div className="absolute top-2 right-2">
                          <span className="flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-live opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-status-live" />
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* More categories in compact list */}
            <details className="group">
              <summary className="flex items-center justify-between p-3 bg-surface/50 rounded-xl border border-line/50 cursor-pointer hover:bg-surface/80 transition-colors">
                <span className="text-sm font-medium text-white">View all categories</span>
                <ChevronDown size={16} className="text-gray-400 group-open:rotate-180 transition-transform" />
              </summary>

              <div className="mt-3 grid grid-cols-2 gap-2">
                {categories.slice(6).map((c) => (
                  <Link
                    key={c.key}
                    to={`/marketplace?category=${c.key}`}
                    className="flex items-center gap-2 p-2.5 bg-canvas/50 rounded-lg border border-line/30 hover:bg-surface/50 hover:border-primary/30 transition-all"
                  >
                    <CategoryIcon category={c.key} size={14} className="text-gray-400" />
                    <span className="text-xs text-gray-300 line-clamp-1">{c.label}</span>
                  </Link>
                ))}
              </div>
            </details>

            {/* Quick stats for mobile */}
            <div className="mt-6 grid grid-cols-3 gap-2">
              <div className="text-center p-3 bg-surface/30 rounded-lg border border-line/30">
                <p className="text-lg font-bold text-white">1.3K</p>
                <p className="text-[10px] text-gray-500">Projects</p>
              </div>
              <div className="text-center p-3 bg-surface/30 rounded-lg border border-line/30">
                <p className="text-lg font-bold text-white">38GW</p>
                <p className="text-[10px] text-gray-500">Power</p>
              </div>
              <div className="text-center p-3 bg-surface/30 rounded-lg border border-line/30">
                <p className="text-lg font-bold text-white">$842B</p>
                <p className="text-[10px] text-gray-500">Value</p>
              </div>
            </div>
          </div>

          {/* DESKTOP: Keep existing enhanced grid */}
          <div className="hidden sm:grid mt-12 grid-cols-3 lg:grid-cols-4 gap-3">
            {categories.map((c, index) => (
              <motion.div
                key={c.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(index * 0.03, 0.3) }}
              >
                <Link
                  to={`/marketplace?category=${c.key}`}
                  className="group relative block h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary-light/0 group-hover:from-primary/5 group-hover:to-primary-light/5 rounded-xl transition-all duration-500" />

                  <div className="relative h-full card glow-border card-hover flex items-start gap-3 p-4 hover:border-primary/30 transition-all duration-300">
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-primary/30 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <span className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-canvas to-surface border border-line group-hover:border-primary/30 transition-all duration-300">
                        <CategoryIcon
                          category={c.key}
                          size={18}
                          className="text-gray-300 group-hover:text-primary-light transition-colors duration-300"
                        />
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white group-hover:text-primary-light transition-colors line-clamp-1">
                        {c.label}
                      </p>
                      <p className="mt-0.5 text-[11px] text-gray-500 group-hover:text-gray-400 transition-colors">
                        {Math.floor(Math.random() * 300 + 50)} active projects
                      </p>
                    </div>

                    <ArrowRight
                      size={14}
                      className="flex-shrink-0 text-gray-600 opacity-0 group-hover:opacity-100 group-hover:text-primary-light transition-all duration-300 transform translate-x-0 group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Tokenization ══════════════════════════════════ */}
      <section className="relative border-b border-line bg-gradient-to-b from-surface/20 via-canvas to-surface/30 overflow-hidden">
        {/* Animated token visualization background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid opacity-5" />
          {/* Floating tokens animation */}
          <div className="absolute top-1/4 left-1/4 h-32 w-32 rounded-full bg-primary/10 blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 h-40 w-40 rounded-full bg-primary-light/10 blur-3xl animate-pulse delay-700" />
          <div className="absolute top-1/2 right-1/3 h-24 w-24 rounded-full bg-primary/5 blur-2xl animate-pulse delay-1000" />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-4 py-16 sm:py-24 sm:px-6 lg:px-8">
          {/* MOBILE FIRST: Visual token concept at top */}
          <div className="sm:hidden mb-8">
            {/* Animated token visual */}
            <div className="relative mx-auto w-48 h-48">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="absolute inset-0"
              >
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-spin-slow" />

                {/* Middle ring with dots */}
                <div className="absolute inset-4 rounded-full border border-dashed border-primary-light/40 animate-spin-reverse">
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-primary-light" />
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-primary-light" />
                  <span className="absolute -left-1 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-primary-light" />
                  <span className="absolute -right-1 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-primary-light" />
                </div>

                {/* Core token */}
                <div className="absolute inset-8 rounded-full bg-gradient-to-br from-primary/20 to-primary-light/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center">
                  <div className="text-center">
                    <Fingerprint size={32} className="text-primary-light mx-auto mb-2" />
                    <p className="text-[10px] font-bold text-white uppercase tracking-wider">Token</p>
                  </div>
                </div>

                {/* Pulse effect */}
                <div className="absolute inset-8 rounded-full bg-primary/20 animate-ping" />
              </motion.div>
            </div>
          </div>

          {/* Compact header */}
          <div className="text-center sm:text-left mb-8 sm:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary" />
                <p className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.2em] text-primary-light">
                  Tokenization
                </p>
                <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary" />
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white max-w-2xl">
                Secure digital{' '}
                <span className="relative inline-block">
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary-light/30 blur-xl" />
                  <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-light to-primary animate-gradient">
                    representation
                  </span>
                </span>{' '}
                of real infrastructure
              </h2>
            </motion.div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* MOBILE: Benefits as visual cards */}
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {tokenBenefits.slice(0, 4).map((b, index) => {
                  const Icon = b.icon;
                  return (
                    <motion.div
                      key={b.text}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-transparent rounded-xl transition-all duration-300" />

                      <div className="relative overflow-hidden rounded-xl bg-surface/60 backdrop-blur-sm border border-line/50 p-4 hover:border-primary/30 transition-all">
                        {/* Icon with glow */}
                        <div className="relative mb-3">
                          <div className="absolute inset-0 bg-primary/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="relative h-10 w-10 rounded-lg bg-gradient-to-br from-canvas to-surface border border-line/50 flex items-center justify-center group-hover:border-primary/30 transition-colors">
                            <Icon size={18} className="text-primary-light" />
                          </div>
                        </div>

                        {/* Text */}
                        <p className="text-xs sm:text-sm font-medium text-gray-200 line-clamp-2">
                          {b.text}
                        </p>

                        {/* Active indicator for first 2 */}
                        {index < 2 && (
                          <div className="absolute top-2 right-2">
                            <span className="flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary-light" />
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Additional benefits in compact format */}
              <div className="mt-3 grid grid-cols-1 gap-2">
                {tokenBenefits.slice(4).concat([
                  { icon: Layers, text: 'Improved interoperability across systems' }
                ]).map((b, index) => {
                  const Icon = b.icon;
                  return (
                    <motion.div
                      key={b.text}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-canvas/40 border border-line/30 hover:bg-surface/50 hover:border-primary/30 transition-all"
                    >
                      <Icon size={14} className="text-primary-light flex-shrink-0" />
                      <span className="text-xs text-gray-300">{b.text}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Info section with visual hierarchy */}
            <div className="order-1 lg:order-2">
              {/* Desktop token visual */}
              <div className="hidden sm:block mb-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative w-32 h-32"
                >
                  <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-spin-slow" />
                  <div className="absolute inset-4 rounded-full border border-dashed border-primary-light/40 animate-spin-reverse" />
                  <div className="absolute inset-8 rounded-full bg-gradient-to-br from-primary/20 to-primary-light/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center">
                    <Fingerprint size={24} className="text-primary-light" />
                  </div>
                </motion.div>
              </div>

              <p className="text-sm sm:text-base leading-relaxed text-gray-300 mb-4">
                Tokenization creates a secure digital record of real-world infrastructure,
                enabling transparent tracking, compliant participation, and streamlined asset management.
              </p>

              {/* Key points as visual badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary-light">
                  <ShieldCheck size={12} />
                  Secure
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary-light">
                  <Database size={12} />
                  Verifiable
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary-light">
                  <History size={12} />
                  Auditable
                </span>
              </div>

              {/* Compliance note with better visual treatment */}
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-surface/80 to-canvas/60 backdrop-blur-sm border border-line/50 p-4">
                <div className="absolute top-0 right-0 h-20 w-20 bg-primary/5 rounded-full blur-2xl" />
                <div className="relative flex gap-3">
                  <Shield size={16} className="text-gray-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    <span className="font-semibold text-gray-300">Compliance First:</span> Any investment functionality requires appropriate legal
                    and regulatory compliance. XSolut is infrastructure software, not a speculative token.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ Intelligence layer ════════════════════════════ */}
      <section id="intelligence" className="relative border-b border-line bg-gradient-to-b from-canvas via-surface/40 to-canvas overflow-hidden">
        {/* Neural network visualization background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid opacity-10" />
          {/* Animated data flow lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d="M10,50 Q30,20 50,50 T90,50"
              stroke="url(#intelligence-gradient)"
              strokeWidth="0.1"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <motion.path
              d="M20,30 Q40,60 60,30 T90,30"
              stroke="url(#intelligence-gradient)"
              strokeWidth="0.1"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
            />
            <defs>
              <linearGradient id="intelligence-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(0, 114, 245)" stopOpacity="0" />
                <stop offset="50%" stopColor="rgb(0, 114, 245)" stopOpacity="1" />
                <stop offset="100%" stopColor="rgb(0, 114, 245)" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          {/* Floating data particles */}
          <div className="absolute top-1/3 left-1/4 h-2 w-2 rounded-full bg-primary-light/40 animate-float" />
          <div className="absolute bottom-1/3 right-1/4 h-3 w-3 rounded-full bg-primary/30 animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 h-2 w-2 rounded-full bg-primary-light/20 animate-float-slow" />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-4 py-16 sm:py-24 sm:px-6 lg:px-8">
          {/* MOBILE FIRST: Visual brain/data concept */}
          <div className="sm:hidden mb-10">
            <div className="relative mx-auto w-56 h-56">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="absolute inset-0"
              >
                {/* Central intelligence core */}
                <div className="absolute inset-12 rounded-full bg-gradient-to-br from-primary/30 to-primary-light/30 blur-xl animate-pulse" />
                <div className="absolute inset-16 rounded-full bg-canvas border-2 border-primary/30 flex items-center justify-center">
                  <Database size={28} className="text-primary-light" />
                </div>

                {/* Orbiting data points */}
                {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                  <motion.div
                    key={angle}
                    className="absolute inset-0"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20 + i * 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <div
                      className="absolute h-3 w-3 rounded-full bg-primary-light/60 border border-primary/40"
                      style={{
                        top: '10%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                      }}
                    />
                  </motion.div>
                ))}

                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="35%"
                    fill="none"
                    stroke="url(#orbit-gradient)"
                    strokeWidth="1"
                    strokeDasharray="2 4"
                    opacity="0.3"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="25%"
                    fill="none"
                    stroke="url(#orbit-gradient)"
                    strokeWidth="1"
                    strokeDasharray="1 3"
                    opacity="0.2"
                  />
                  <defs>
                    <linearGradient id="orbit-gradient">
                      <stop offset="0%" stopColor="rgb(0, 114, 245)" />
                      <stop offset="100%" stopColor="rgb(51, 144, 255)" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            </div>
          </div>

          {/* Enhanced header with reveal effect */}
          <div className="mx-auto max-w-3xl text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="h-6 w-6 rounded-full border border-dashed border-primary-light/40 flex items-center justify-center"
                >
                  <Database size={12} className="text-primary-light" />
                </motion.div>
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
                  The Secret
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                The marketplace creates{' '}
                <span className="relative">
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary-light/30 blur-2xl animate-pulse" />
                  <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-light to-primary animate-gradient">
                    intelligence
                  </span>
                </span>
              </h2>

              <p className="mt-4 text-sm sm:text-base text-gray-400 max-w-xl mx-auto">
                Every project generates operational data. Together, they form the world's largest infrastructure intelligence network.
              </p>
            </motion.div>
          </div>

          {/* MOBILE: Data signals as flowing cards */}
          <div className="sm:hidden">
            {/* Featured signals in grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {intelligenceSignals.slice(0, 6).map((signal, i) => (
                <motion.div
                  key={signal}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-lg opacity-0 group-active:opacity-100 transition-opacity" />
                  <div className="relative bg-surface/60 backdrop-blur-sm border border-line/50 rounded-lg p-3 hover:border-primary/30 transition-all">
                    <div className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary-light mt-1.5 animate-pulse" />
                      <span className="text-xs text-gray-300 font-medium">{signal}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Scrollable remaining signals */}
            <div className="overflow-x-auto pb-3 -mx-4 px-4">
              <div className="flex gap-2" style={{ width: 'max-content' }}>
                {intelligenceSignals.slice(6).map((signal, i) => (
                  <motion.span
                    key={signal}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-canvas/80 border border-line/50 text-xs text-gray-400 whitespace-nowrap"
                  >
                    <span className="h-1 w-1 rounded-full bg-primary/60" />
                    {signal}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Live data counter */}
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-surface/50 border border-line/50">
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse" />
                  <span className="text-[10px] uppercase tracking-wider text-gray-500">Preview</span>
                </div>
                <div className="h-4 w-px bg-line" />
                <div className="flex items-baseline gap-1">
                  <motion.span
                    className="text-lg font-bold text-white font-mono"
                    animate={{ opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {Math.floor(Math.random() * 900 + 100)}K
                  </motion.span>
                  <span className="text-[10px] text-gray-500">data points/hr</span>
                </div>
              </div>
            </div>
          </div>

          {/* DESKTOP: Enhanced flowing signals cloud */}
          <div className="hidden sm:block mt-12">
            <div className="flex flex-wrap justify-center gap-3">
              {intelligenceSignals.map((signal, i) => (
                <motion.div
                  key={signal}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 8) * 0.08 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-canvas border border-line/50 text-sm text-gray-200 hover:border-primary/30 hover:text-white transition-all cursor-default">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary-light/60 group-hover:bg-primary-light animate-pulse" />
                    {signal}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Desktop data visualization */}
            <div className="mt-10 flex justify-center">
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-6 px-6 py-3 rounded-2xl bg-surface/50 border border-line/50 backdrop-blur-sm"
                >
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">19</p>
                    <p className="text-xs text-gray-500">Signals</p>
                  </div>
                  <div className="h-8 w-px bg-line" />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">5.2M</p>
                    <p className="text-xs text-gray-500">Data points</p>
                  </div>
                  <div className="h-8 w-px bg-line" />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">24/7</p>
                    <p className="text-xs text-gray-500">Collection</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ AI layer ══════════════════════════════════════ */}
      <section id="ai" className="relative border-b border-line bg-gradient-to-b from-canvas via-surface/20 to-canvas overflow-hidden">
        {/* Animated background - neural network effect */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid opacity-10" />
          {/* Animated prediction paths */}
          <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d="M10,30 Q30,10 50,30 T90,30"
              stroke="url(#ai-gradient)"
              strokeWidth="0.1"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <motion.path
              d="M10,70 Q30,90 50,70 T90,70"
              stroke="url(#ai-gradient)"
              strokeWidth="0.1"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 2 }}
            />
            <defs>
              <linearGradient id="ai-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(0, 114, 245)" stopOpacity="0" />
                <stop offset="50%" stopColor="rgb(0, 114, 245)" stopOpacity="1" />
                <stop offset="100%" stopColor="rgb(0, 114, 245)" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="relative mx-auto max-w-[1400px] px-4 py-16 sm:py-24 sm:px-6 lg:px-8">
          {/* MOBILE FIRST: Data processing visualization */}
          <div className="sm:hidden mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative mx-auto max-w-[320px]"
            >
              {/* Network grid visualization */}
              <div className="relative rounded-xl border border-primary/20 bg-surface/50 backdrop-blur-sm p-6">
                {/* Processing bars */}
                <div className="space-y-3">
                  {[
                    { label: 'Data Collection', progress: 95 },
                    { label: 'Pattern Analysis', progress: 78 },
                    { label: 'Prediction Model', progress: 62 }
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-gray-400">{item.label}</span>
                        <motion.span
                          className="text-[10px] font-mono text-primary-light"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 + i * 0.2 }}
                        >
                          {item.progress}%
                        </motion.span>
                      </div>
                      <div className="h-1 bg-surface rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-primary-light"
                          initial={{ width: '0%' }}
                          whileInView={{ width: `${item.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 + i * 0.2 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Central status */}
                <motion.div
                  className="mt-4 pt-4 border-t border-line"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse" />
                      <span className="text-xs text-gray-300">AI Coming Soon</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="h-3 w-0.5 bg-primary-light rounded-full"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Data flow indicators */}
              <motion.div
                className="mt-4 flex justify-center gap-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
              >
                <div className="text-center">
                  <div className="text-lg font-mono font-bold text-primary-light">1M+</div>
                  <div className="text-[9px] text-gray-500 uppercase">Data Points</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-mono font-bold text-primary-light">24/7</div>
                  <div className="text-[9px] text-gray-500 uppercase">Processing</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-mono font-bold text-primary-light">99.9%</div>
                  <div className="text-[9px] text-gray-500 uppercase">Accuracy</div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div className="grid gap-8 sm:gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[13px] text-primary-light">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <BrainCircuit size={13} />
                </motion.div>
                The AI layer
              </div>
              <h2 className="mt-4 text-balance text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tightest text-white">
                As the dataset grows,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
                  XSolut begins to predict
                </span>
              </h2>
              <p className="mt-4 sm:mt-5 text-base sm:text-lg leading-relaxed text-gray-300">
                This transforms XSolut from a marketplace into an infrastructure intelligence
                platform — the system that knows where to build, what it costs, and when it
                will be done.
              </p>

              {/* Mobile: Live prediction counter */}
              <div className="sm:hidden mt-6">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-surface/50 border border-primary/20">
                  <span className="h-2 w-2 rounded-full bg-primary-light animate-pulse" />
                  <span className="text-sm text-gray-300">
                    <motion.span
                      className="font-bold text-primary-light font-mono"
                      animate={{ opacity: [1, 0.7, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {Math.floor(Math.random() * 900 + 100)}
                    </motion.span>
                    {' '}predictions/sec
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Prediction cards - mobile optimized */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-3">
              {aiPredictions.map((p, i) => (
                <motion.div
                  key={p}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary-light/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative card glow-border flex items-start gap-2 p-3 sm:p-3.5 hover:border-primary/30 transition-all">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles size={12} className="shrink-0 text-primary-light mt-0.5" />
                    </motion.div>
                    <span className="text-[11px] sm:text-[13px] text-gray-200 leading-tight">
                      {p}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Desktop: Additional floating prediction bubbles */}
          <div className="hidden lg:block absolute top-20 right-10">
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="bg-surface/60 backdrop-blur-sm border border-primary/20 rounded-lg px-3 py-2 text-xs text-primary-light"
            >
              Analyzing patterns...
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ Flywheel ══════════════════════════════════════ */}
      <section className="relative border-b border-line bg-surface/30 overflow-hidden">
        {/* Background gradient effect */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,114,245,0.08),transparent_70%)]" />

        <div className="relative mx-auto grid max-w-[1400px] items-center gap-8 sm:gap-12 px-4 py-16 sm:py-24 sm:px-6 lg:grid-cols-2 lg:px-8">
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[13px] text-primary-light">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="h-3 w-3"
              >
                <svg viewBox="0 0 24 24" fill="none" className="text-primary-light">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 2 L12 8 M12 16 L12 22 M2 12 L8 12 M16 12 L22 12" stroke="currentColor" strokeWidth="2" />
                </svg>
              </motion.div>
              The flywheel
            </div>
            <h2 className="mt-4 text-balance text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tightest text-white">
              A <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">compounding</span> advantage.
            </h2>
            <p className="mt-4 sm:mt-5 text-base sm:text-lg leading-relaxed text-gray-300">
              Projects attract the marketplace. The marketplace generates data. Data powers AI
              intelligence. Intelligence drives better decisions — which attracts even more
              projects. The loop compounds, forever.
            </p>

            {/* Mobile: Flow stages list */}
            <div className="mt-6 sm:hidden space-y-2">
              {['Projects → Marketplace', 'Marketplace → Data', 'Data → AI Intelligence', 'AI → Better Decisions', 'Decisions → More Projects'].map((flow, i) => (
                <motion.div
                  key={flow}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-2 text-sm text-gray-400"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-[10px] font-bold text-primary-light">
                    {i + 1}
                  </span>
                  <span>{flow}</span>
                </motion.div>
              ))}
            </div>

            {/* Desktop: Compound growth indicator */}
            <motion.div
              className="hidden lg:flex mt-8 items-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface/50 border border-primary/20">
                <div className="h-2 w-2 rounded-full bg-primary-light animate-pulse" />
                <span className="text-sm text-gray-300">
                  Compound growth rate: <span className="font-mono font-bold text-primary-light">∞</span>
                </span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Flywheel size={flywheelSize} />
          </motion.div>
        </div>
      </section>

      {/* ══ Why it matters ════════════════════════════════ */}
      <section className="relative border-b border-line overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,114,245,0.05),transparent_50%)]" />

        <div className="relative mx-auto max-w-[1400px] px-4 py-16 sm:py-24 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[13px] text-primary-light">
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-primary-light">
                  <path d="M12 2L3 7V12C3 16.5 6.84 20.74 12 22C17.16 20.74 21 16.5 21 12V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.span>
              Why this matters
            </div>
            <h2 className="mt-4 text-balance text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tightest text-white">
              Eventually, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">XSolut knows</span>.
            </h2>

            {/* Mobile: Intelligence indicator */}
            <div className="mt-6 sm:hidden">
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-surface/50 border border-primary/20">
                <div className="flex items-center gap-1">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-1 w-6 rounded-full bg-primary-light"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-400">Learning continuously</span>
              </div>
            </div>
          </motion.div>

          {/* Question cards with enhanced visuals */}
          <div className="mt-8 sm:mt-12 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary-light/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative card p-4 sm:p-6 hover:border-primary/30 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <span className="font-mono text-xs sm:text-sm text-primary-light font-bold">0{i + 1}</span>
                    {/* Animated dot indicator */}
                    <div className="flex items-center gap-1">
                      {[...Array(3)].map((_, idx) => (
                        <motion.div
                          key={idx}
                          className="h-1.5 w-1.5 rounded-full bg-primary-light"
                          animate={{ opacity: [0.2, 1, 0.2] }}
                          transition={{ duration: 2, delay: idx * 0.3, repeat: Infinity }}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-base sm:text-lg font-medium leading-snug text-white">
                    {q}
                  </p>
                  {/* Data processing indicator */}
                  <motion.div
                    className="mt-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider">Processing</span>
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop: Floating insight bubble */}
          <motion.div
            className="hidden lg:block absolute top-20 right-10"
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="bg-surface/80 backdrop-blur-sm border border-primary/20 rounded-lg px-3 py-2 text-xs text-primary-light">
              <span className="opacity-75">Insights from</span>
              <span className="font-mono font-bold ml-1">1M+</span>
              <span className="opacity-75"> data points</span>
            </div>
          </motion.div>

          {/* Mobile: Bottom CTA */}
          <motion.div
            className="mt-8 sm:hidden text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm text-gray-400">
              The system that knows the answers before you ask
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══ Long-term vision ══════════════════════════════ */}
      <section className="relative border-b border-line bg-surface/30 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,114,245,0.06),transparent_65%)]" />

        <div className="relative mx-auto max-w-[1400px] px-4 py-16 sm:py-24 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[13px] text-primary-light">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-primary-light">
                  <path d="M22 12L19 9V11H7V13H19V15L22 12Z" fill="currentColor"/>
                  <path d="M4 12C4 16.4183 7.58172 20 12 20M12 4C7.58172 4 4 7.58172 4 12" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </motion.div>
              Trajectory
            </div>
            <h2 className="mt-4 text-balance text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tightest text-white">
              From <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">AI infrastructure</span> to everything physical.
            </h2>

            {/* Mobile: Evolution indicator */}
            <motion.div
              className="mt-6 sm:hidden flex justify-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>2025</span>
                <div className="w-20 h-px bg-gradient-to-r from-primary/30 via-primary/60 to-primary/30" />
                <span>2030</span>
                <div className="w-20 h-px bg-gradient-to-r from-primary/30 via-primary/60 to-primary/30" />
                <span>∞</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Timeline cards with enhanced visuals */}
          <div className="mt-8 sm:mt-12 grid gap-4 md:grid-cols-3">
            {/* Today card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary-light/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative card p-6 sm:p-8 border-primary/30 hover:border-primary/50 transition-all">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,114,245,0.14),transparent_60%)] rounded-xl" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-medium uppercase tracking-widest text-primary-light">Today</p>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="h-2 w-2 rounded-full bg-primary-light"
                    />
                  </div>
                  <p className="text-lg sm:text-xl font-semibold text-white">AI Infrastructure</p>
                  <div className="mt-3 h-1 w-full bg-surface rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-primary-light"
                      initial={{ width: '0%' }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                  <p className="mt-2 text-[10px] text-gray-500">Initial focus</p>
                </div>
              </div>
            </motion.div>

            {/* Tomorrow card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary-light/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative card p-6 sm:p-8 hover:border-primary/30 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-medium uppercase tracking-widest text-gray-400">Tomorrow</p>
                  <div className="flex items-center gap-1">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="h-1 w-1 rounded-full bg-gray-500"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  {['Energy', 'Defense', 'Robotics', 'Manufacturing', 'Transportation', 'Water', 'Cities'].map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="flex items-center gap-2"
                    >
                      <div className="h-1 w-1 rounded-full bg-primary/40" />
                      <p className="text-sm sm:text-base text-gray-200">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Eventually card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary-light/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative card p-6 sm:p-8 hover:border-primary/30 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-medium uppercase tracking-widest text-gray-400">Eventually</p>
                  <motion.div
                    animate={{ scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-primary-light text-lg"
                  >
                    ∞
                  </motion.div>
                </div>
                <p className="text-xl sm:text-2xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
                  Everything physical
                </p>
                <motion.p
                  className="mt-4 text-xs text-gray-500"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                >
                  The complete infrastructure OS
                </motion.p>
              </div>
            </motion.div>
          </div>

          {/* Desktop: Timeline connector */}
          <div className="hidden md:block relative mt-8">
            <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2" />
            <motion.div
              className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              <div className="h-full w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ Business model ════════════════════════════════ */}
      <section id="business" className="relative border-b border-line overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-dots opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,114,245,0.05),transparent_50%)]" />

        <div className="relative mx-auto max-w-[1400px] px-4 py-16 sm:py-24 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[13px] text-primary-light">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-primary-light">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
                  <path d="M12.5 7H11V12L15.5 14.5L16.2 13.2L12.5 11.2V7Z" fill="currentColor"/>
                </svg>
              </motion.div>
              Business model
            </div>
            <h2 className="mt-4 text-balance text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tightest text-white">
              Many ways to monetize a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">system of record</span>.
            </h2>

            {/* Mobile: Revenue indicator */}
            <motion.div
              className="mt-6 sm:hidden"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-3 px-3 py-2 rounded-lg bg-surface/50 border border-primary/20">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 uppercase">Revenue Streams</span>
                  <span className="text-sm font-mono text-primary-light font-bold">{businessModel.length}</span>
                </div>
                <div className="h-8 w-px bg-line" />
                <div className="flex items-center gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-2 w-2 rounded-full bg-primary-light opacity-60"
                      style={{ animationDelay: `${i * 200}ms` }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Revenue streams grid */}
          <div className="mt-8 sm:mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {businessModel.map((b, i) => {
              // Group by category
              const isTransaction = b.includes('Transaction') || b.includes('Marketplace');
              const isData = b.includes('Data') || b.includes('API') || b.includes('Analytics');
              const isEnterprise = b.includes('Enterprise') || b.includes('Compliance') || b.includes('Insurance');

              return (
                <motion.div
                  key={b}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary-light/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative rounded-xl border border-line bg-surface/80 backdrop-blur-sm p-4 hover:border-primary/30 transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-[10px] font-mono text-primary-light opacity-60">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {/* Category indicator */}
                      <div className="flex items-center gap-1">
                        <div className={`h-1.5 w-1.5 rounded-full ${
                          isTransaction ? 'bg-green-400' :
                          isData ? 'bg-blue-400' :
                          isEnterprise ? 'bg-purple-400' :
                          'bg-gray-400'
                        }`} />
                      </div>
                    </div>
                    <p className="text-sm sm:text-base text-gray-200 group-hover:text-white transition-colors">
                      {b}
                    </p>
                    {/* Mobile: Revenue potential indicator */}
                    <div className="mt-3 sm:hidden h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Desktop: Category legend */}
          <motion.div
            className="hidden sm:flex justify-center mt-8 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
              <span>Transaction</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              <span>Data</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="h-1.5 w-1.5 rounded-full bg-purple-400" />
              <span>Enterprise</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="h-1.5 w-1.5 rounded-full bg-gray-400" />
              <span>Other</span>
            </div>
          </motion.div>

          {/* Mobile: Swipe indicator */}
          <motion.p
            className="sm:hidden mt-6 text-center text-xs text-gray-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            Multiple revenue streams ensure sustainability
          </motion.p>
        </div>
      </section>

      {/* ══ Acquisition / strategic fit ═══════════════════ */}
      <section className="relative border-b border-line bg-surface/30 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,114,245,0.04),transparent_60%)]" />
        <div className="absolute inset-0 bg-grid opacity-20" />

        <div className="relative mx-auto max-w-[1400px] px-4 py-16 sm:py-24 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[13px] text-primary-light">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-primary-light">
                  <path d="M4 8V6C4 5.45 4.45 5 5 5H7C7.55 5 8 4.55 8 4C8 3.45 7.55 3 7 3H5C3.35 3 2 4.35 2 6V8C2 8.55 2.45 9 3 9C3.55 9 4 8.55 4 8Z" fill="currentColor"/>
                  <path d="M20 8V6C20 4.35 18.65 3 17 3H15C14.45 3 14 3.45 14 4C14 4.55 14.45 5 15 5H17C17.55 5 18 5.45 18 6V8C18 8.55 18.45 9 19 9C19.55 9 20 8.55 20 8Z" fill="currentColor"/>
                  <path d="M20 16V18C20 18.55 19.55 19 19 19H17C16.45 19 16 19.45 16 20C16 20.55 16.45 21 17 21H19C20.65 21 22 19.65 22 18V16C22 15.45 21.55 15 21 15C20.45 15 20 15.45 20 16Z" fill="currentColor"/>
                  <path d="M4 16V18C4 19.65 5.35 21 7 21H9C9.55 21 10 20.55 10 20C10 19.45 9.55 19 9 19H7C6.45 19 6 18.55 6 18V16C6 15.45 5.55 15 5 15C4.45 15 4 15.45 4 16Z" fill="currentColor"/>
                </svg>
              </motion.div>
              Strategic fit
            </div>
            <h2 className="mt-4 text-balance text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tightest text-white">
              A <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">coordination layer</span> many will want.
            </h2>
            <p className="mt-4 sm:mt-5 text-base sm:text-lg leading-relaxed text-gray-300">
              Strategic interest could come from organizations that need infrastructure
              coordination or data — cloud providers, enterprise software companies,
              construction technology firms, infrastructure investors and government
              contractors. This is a potential fit, not an expectation.
            </p>

            {/* Mobile: Potential acquirers indicator */}
            <motion.div
              className="mt-6 sm:hidden flex justify-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-surface/50 border border-primary/20">
                <span className="text-xs text-gray-500">Potential Strategic Partners</span>
                <div className="flex items-center gap-1">
                  <motion.div
                    className="h-1 w-3 rounded-full bg-primary-light"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="h-1 w-3 rounded-full bg-primary-light"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
                  />
                  <motion.div
                    className="h-1 w-3 rounded-full bg-primary-light"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, delay: 1, repeat: Infinity }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Strategic partners grid */}
          <div className="mt-8 sm:mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { name: 'Cloud Providers', icon: '☁️', strength: 95 },
              { name: 'Enterprise Software', icon: '💼', strength: 88 },
              { name: 'Construction Tech', icon: '🏗️', strength: 82 },
              { name: 'Infrastructure Funds', icon: '💰', strength: 78 },
              { name: 'Industrial Technology', icon: '⚙️', strength: 75 },
              { name: 'Government Contractors', icon: '🏛️', strength: 70 },
            ].map((org, i) => (
              <motion.div
                key={org.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary-light/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative glass rounded-xl p-4 sm:p-5 text-center hover:border-primary/30 transition-all">
                  {/* Connection strength indicator */}
                  <div className="absolute top-2 right-2">
                    <div className="flex gap-0.5">
                      {[...Array(3)].map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-1 w-1 rounded-full ${
                            idx < Math.floor(org.strength / 33)
                              ? 'bg-primary-light'
                              : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Icon placeholder (using text for now) */}
                  <div className="mb-3 flex justify-center">
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface/50 border border-primary/20"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-primary-light">
                        <path d="M12 2L2 7V12C2 16.5 5.84 20.74 11 22C16.16 20.74 20 16.5 20 12V7L12 2Z"
                              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.div>
                  </div>

                  <p className="text-xs sm:text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                    {org.name}
                  </p>

                  {/* Mobile: Fit score */}
                  <motion.div
                    className="mt-2 sm:hidden"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <div className="h-0.5 w-full bg-surface rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-primary-light"
                        initial={{ width: '0%' }}
                        whileInView={{ width: `${org.strength}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop: Connection visualization */}
          <motion.div
            className="hidden lg:block relative mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex justify-center items-center gap-4">
              <span className="text-xs text-gray-500">Weak fit</span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-2 w-12 rounded-full"
                    style={{
                      background: `linear-gradient(90deg,
                        rgba(0, 114, 245, ${0.2 + i * 0.2}) 0%,
                        rgba(50, 145, 255, ${0.2 + i * 0.2}) 100%)`
                    }}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">Strong fit</span>
            </div>
          </motion.div>

          {/* Mobile: Bottom message */}
          <motion.p
            className="sm:hidden mt-8 text-center text-xs text-gray-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          >
            Multiple paths to strategic partnership or acquisition
          </motion.p>
        </div>
      </section>

      {/* ══ Final CTA ═════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-canvas">
        {/* Enhanced background layers */}
        <div className="pointer-events-none absolute inset-0 starfield opacity-40" />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] sm:h-[420px] sm:w-[600px] lg:w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="h-full w-full rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,114,245,0.2),transparent_65%)]" />
        </motion.div>

        {/* Floating particles for mobile */}
        <div className="sm:hidden absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-primary-light opacity-40"
              style={{
                left: `${20 + i * 30}%`,
                top: `${20 + i * 25}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                x: [-5, 5, -5],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        <div className="relative mx-auto max-w-4xl px-4 py-20 sm:py-32 text-center sm:px-6">
          {/* OS Badge */}
          <motion.div
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-primary-light">
                <circle cx="12" cy="12" r="3" fill="currentColor"/>
                <path d="M12 1V5M12 19V23M23 12H19M5 12H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M20.5 7.5L17.5 10.5M6.5 13.5L3.5 16.5M20.5 16.5L17.5 13.5M6.5 10.5L3.5 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </motion.div>
            <span className="text-sm font-medium text-primary-light">Infrastructure OS</span>
          </motion.div>

          <motion.h2
            className="text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tightest text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            The operating system for building{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
              AI infrastructure
            </span>
            .
          </motion.h2>

          <motion.p
            className="mx-auto mt-4 sm:mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            XSolut doesn't replace governments, builders or utilities — it becomes the digital
            layer that helps them work together.
          </motion.p>

          {/* Mobile: Key metrics */}
          <motion.div
            className="sm:hidden mt-8 flex justify-center gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-light font-mono">1M+</div>
              <div className="text-[10px] text-gray-500 uppercase">Data Points</div>
            </div>
            <div className="h-12 w-px bg-line" />
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-light font-mono">50+</div>
              <div className="text-[10px] text-gray-500 uppercase">Projects</div>
            </div>
            <div className="h-12 w-px bg-line" />
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-light font-mono">2025</div>
              <div className="text-[10px] text-gray-500 uppercase">Launch</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="mt-8 sm:mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/marketplace" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto group">
                <span>Explore Marketplace</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/map" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto group">
                <MapIcon size={16} />
                <span>View Infrastructure Map</span>
              </Button>
            </Link>
          </motion.div>

          {/* Desktop: Status indicator */}
          <motion.div
            className="hidden sm:flex justify-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/50 border border-primary/20">
              <div className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse" />
              <span className="text-sm text-gray-400">System launching soon • Get early access</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ Disclaimer ═════════════════════════════════════ */}
      <section className="relative border-t border-line bg-surface/20">
        <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs sm:text-sm text-gray-500">
              <span className="font-medium">Note:</span> XSolut is currently under development and not yet operational.
              This platform is being built to transform how AI infrastructure is deployed and managed.
            </p>
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
