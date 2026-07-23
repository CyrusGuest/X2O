import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Users,
  Layers,
  Sparkles,
  HeartHandshake,
  Code2,
  Boxes,
  ShieldCheck,
  FileCheck2,
  Lock,
  Network,
  Server,
  EyeOff,
  Snowflake,
  Zap,
  Cable,
  CircuitBoard,
} from 'lucide-react';
import Button from '../components/ui/Button';
import TiltCard from '../components/ui/TiltCard';
import TokenObject from '../components/token/TokenObject';
import LivingNetwork from '../components/token/LivingNetwork';
import GenomeStack from '../components/token/GenomeStack';
import ProjectStory from '../components/token/ProjectStory';
import BlueprintNetwork from '../components/token/BlueprintNetwork';
import SectionConnector from '../components/token/SectionConnector';
import CursorGlow from '../components/token/CursorGlow';
import JupiterSwap from '../components/trading/JupiterSwap';

/* ── Hero background infrastructure nodes (percent coords around center) ── */
const heroNodes = [
  { x: 14, y: 24, label: 'Power', icon: Zap },
  { x: 82, y: 22, label: 'Data Centers', icon: Server },
  { x: 8, y: 66, label: 'Fiber', icon: Cable },
  { x: 88, y: 62, label: 'Cooling', icon: Snowflake },
  { x: 50, y: 12, label: 'Semiconductors', icon: CircuitBoard },
];

const flowModules = [
  'Marketplace',
  'Infrastructure Registry',
  'Project Identity',
  'Governance Features',
  'Community',
  'Developer Tools',
  'Platform Services',
];

const utilities = [
  { icon: Users, text: 'Access community features' },
  { icon: Layers, text: 'Unlock advanced platform functionality' },
  { icon: Sparkles, text: 'Participate in ecosystem experiences' },
  { icon: HeartHandshake, text: 'Support community initiatives' },
  { icon: Code2, text: 'Access developer resources' },
  { icon: Boxes, text: 'Interact with future platform services' },
];

const audiences = ['Builders', 'Developers', 'Infrastructure Professionals', 'Researchers', 'Community Members'];

const principles = [
  { icon: FileCheck2, title: 'Verified interactions', desc: 'Actions across the platform can be verified and attributed.' },
  { icon: Layers, title: 'Transparent records', desc: 'A clear, auditable history of platform activity.' },
  { icon: Lock, title: 'Modern cryptographic security', desc: 'Contemporary cryptographic primitives protect records.' },
  { icon: Network, title: 'Interoperable architecture', desc: 'Designed to connect with existing systems and standards.' },
  { icon: Server, title: 'Reliable infrastructure', desc: 'Built on resilient, production-grade infrastructure.' },
  { icon: EyeOff, title: 'Privacy-conscious design', desc: 'Data handling designed with privacy in mind.' },
];

export default function Token() {
  return (
    <div className="relative overflow-hidden">
      <CursorGlow />

      {/* Living background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 starfield opacity-50" />
        <div className="animate-drift absolute -left-1/4 top-0 h-[70vh] w-[70vh] rounded-full bg-[radial-gradient(circle,rgba(0,114,245,0.10),transparent_60%)] blur-2xl" />
        <div className="animate-drift-slow absolute -right-1/4 top-1/3 h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle,rgba(138,99,210,0.08),transparent_60%)] blur-2xl" />
      </div>

      {/* ══ Hero ══════════════════════════════════════════ */}
      <section className="relative border-b border-line">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
        <div className="relative mx-auto max-w-[1400px] px-4 pb-20 pt-16 sm:px-6 lg:px-8">
          {/* Token scene */}
          <div className="relative mx-auto flex h-[420px] max-w-3xl items-center justify-center">
            {/* Beams + nodes */}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {heroNodes.map((n, i) => (
                <g key={i}>
                  <line x1="50" y1="50" x2={n.x} y2={n.y} stroke="rgba(50,145,255,0.12)" strokeWidth="0.2" />
                  <line
                    x1="50"
                    y1="50"
                    x2={n.x}
                    y2={n.y}
                    stroke="rgba(120,180,255,0.7)"
                    strokeWidth="0.25"
                    strokeDasharray="1 30"
                  >
                    <animate attributeName="stroke-dashoffset" values="31;0" dur={`${2.4 + i * 0.4}s`} repeatCount="indefinite" />
                  </line>
                </g>
              ))}
            </svg>

            {heroNodes.map((n, i) => {
              const Icon = n.icon;
              return (
                <motion.div
                  key={n.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="absolute flex items-center gap-1.5 rounded-full border border-gray-300 dark:border-line bg-white dark:bg-surface/70 px-2.5 py-1 text-[11px] text-gray-600 dark:text-gray-300 backdrop-blur-sm"
                  style={{ left: `${n.x}%`, top: `${n.y}%`, transform: 'translate(-50%, -50%)' }}
                >
                  <Icon size={11} className="text-primary-light" />
                  {n.label}
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            >
              <TokenObject size={300} />
            </motion.div>
          </div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-8 max-w-3xl text-center"
          >
            <p className="text-sm font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400">The XSolut Token</p>
            <h1 className="mt-4 text-balance text-5xl font-semibold leading-[1.05] tracking-tightest text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
              The Token at the <span className="text-gradient-accent">Center</span> of It All.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-balance text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              A community-powered digital utility that helps connect people, projects, and
              participation across the XSolut ecosystem.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" className="sweep">
                Join the Community
                <ArrowRight size={16} />
              </Button>
              <Button variant="secondary" size="lg" className="sweep">
                Read the Documentation
              </Button>
            </div>
          </motion.div>

          {/* Flow connector */}
          <div className="mt-16">
            <p className="mb-5 text-center text-xs uppercase tracking-widest text-gray-500">
              A connector across every platform module
            </p>
            <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-2">
              {flowModules.map((m, i) => (
                <div key={m} className="flex items-center gap-2">
                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="whitespace-nowrap rounded-lg border border-gray-300 dark:border-line bg-white dark:bg-surface px-3.5 py-2 text-[13px] text-gray-200"
                  >
                    {m}
                  </motion.span>
                  {i < flowModules.length - 1 && (
                    <span className="h-px w-6 shrink-0 bg-gradient-to-r from-primary-light/60 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ Trade Section — Jupiter Swap Integration ══════ */}
      <Section muted>
        <SectionHead eyebrow="Trade" title="Swap tokens instantly." center>
          Get X2O tokens directly through Jupiter's decentralized exchange aggregator —
          the best prices across all Solana DEXs.
        </SectionHead>
        <Reveal className="mx-auto mt-12 max-w-2xl">
          <JupiterSwap
            variant="default"
            defaultInputMint="EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" // USDC as base
            defaultOutputMint="USCRdwZP5UkKhJzhWuD7XjTUviHBtZJbLG7XpbKng9S" // X2O as quote
            fixedOutputMint={false}
          />
        </Reveal>
      </Section>

      {/* ══ Section 2 — Built for Utility ═════════════════ */}
      <Section>
        <SectionHead eyebrow="Utility" title="Built for utility.">
          The XSolut Token is designed to support participation across the XSolut platform —
          presented as conceptual ecosystem functions, not promises.
        </SectionHead>
        <Reveal className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {utilities.map((u) => {
            const Icon = u.icon;
            return (
              <TiltCard key={u.text} className="card glow-border card-hover group flex items-start gap-4 p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-gray-300 dark:border-line bg-white dark:bg-canvas text-primary-light">
                  <Icon size={20} />
                </span>
                <p className="pt-1.5 text-[15px] font-medium leading-snug text-gray-900 dark:text-white">{u.text}</p>
              </TiltCard>
            );
          })}
        </Reveal>
      </Section>

      {/* ══ Section 3 — The Pulse of the Network ══════════ */}
      <Section muted>
        <SectionHead eyebrow="Living network" title="The pulse of the network." center>
          Every project that joins adds a node, forms new connections, and sends data flowing.
          The ecosystem grows — and the network becomes more connected.
        </SectionHead>
        <Reveal className="mt-14">
          <LivingNetwork />
        </Reveal>
      </Section>

      <SectionConnector />

      {/* ══ Section 3b — Infrastructure Genome ════════════ */}
      <Section>
        <SectionHead eyebrow="The stack" title="The infrastructure genome." center>
          The token isn't the destination — it's the base layer. Everything else is assembled on
          top of it.
        </SectionHead>
        <Reveal className="mt-14">
          <GenomeStack />
        </Reveal>
      </Section>

      {/* ══ Section 4 — Designed Around Participation ═════ */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHead eyebrow="Participation" title="Designed around participation.">
              XSolut is building an ecosystem where builders, developers, infrastructure
              professionals, researchers and community members can contribute to the growth of
              the platform. The token is intended to support participation within that
              ecosystem.
            </SectionHead>
          </div>
          <Reveal className="flex flex-wrap gap-3">
            {audiences.map((a) => (
              <span key={a} className="glass sweep flex items-center gap-2 rounded-full px-4 py-2.5 text-sm text-gray-900 dark:text-white">
                <Users size={14} className="text-primary-light" />
                {a}
              </span>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* ══ Every Project Tells a Story ═══════════════════ */}
      <Section>
        <SectionHead eyebrow="Verified record" title="Every project tells a story." center>
          From land to live compute, each milestone becomes part of the project's verified
          record on XSolut.
        </SectionHead>
        <Reveal className="mt-14">
          <ProjectStory />
        </Reveal>
      </Section>

      {/* ══ Section 5 — Technical Visualization ═══════════ */}
      <Section muted>
        <SectionHead eyebrow="The network" title="One token. The entire network." center>
          Every node represents real infrastructure — data centers, cooling, power,
          construction, fiber, semiconductors, security, robotics. Energy flows through the
          network.
        </SectionHead>
        <Reveal className="mt-14">
          <BlueprintNetwork />
        </Reveal>
      </Section>

      {/* ══ Section 6 — Security & Transparency ═══════════ */}
      <Section>
        <SectionHead eyebrow="Trust" title="Security & transparency.">
          Platform principles that keep interactions verifiable and records dependable.
        </SectionHead>
        <Reveal className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p) => {
            const Icon = p.icon;
            return (
              <TiltCard key={p.title} className="card glow-border card-hover p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-300 dark:border-line bg-white dark:bg-canvas text-primary-light">
                  <Icon size={20} />
                </span>
                <h3 className="mt-5 text-[15px] font-semibold tracking-tight text-gray-900 dark:text-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{p.desc}</p>
              </TiltCard>
            );
          })}
        </Reveal>
      </Section>

      {/* ══ CTA ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-t border-line">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,114,245,0.16),transparent_65%)]" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 py-28 text-center sm:px-6">
          <TokenObject size={120} />
          <h2 className="mt-8 text-balance text-4xl font-semibold tracking-tightest text-gray-900 dark:text-white sm:text-5xl">
            One component of a much larger platform.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-gray-600 dark:text-gray-300">
            The token coordinates AI infrastructure and digital participation — a foundation for
            long-term, community-powered growth.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link to="/marketplace">
              <Button size="lg" className="sweep">
                Explore the Platform
                <ArrowRight size={16} />
              </Button>
            </Link>
            <Button variant="secondary" size="lg" className="sweep">
              Read the Documentation
            </Button>
          </div>
          <p className="mt-8 max-w-lg text-xs leading-relaxed text-gray-500">
            The XSolut Token is presented as a utility within the platform. This page describes
            conceptual ecosystem functions and does not describe price, appreciation, investment
            returns, or future financial performance.
          </p>
        </div>
      </section>
    </div>
  );
}

/* ── Layout helpers ─────────────────────────────── */

function Section({ children, muted }) {
  return (
    <section className={'relative border-b border-line ' + (muted ? 'bg-white dark:bg-surface/20' : '')}>
      <div className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

function SectionHead({ eyebrow, title, children, center }) {
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <p className="text-sm font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400">{eyebrow}</p>
      <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tightest text-gray-900 dark:text-white sm:text-5xl">
        {title}
      </h2>
      {children && <p className="mt-5 text-lg leading-relaxed text-gray-600 dark:text-gray-300">{children}</p>}
    </div>
  );
}

function Reveal({ children, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
