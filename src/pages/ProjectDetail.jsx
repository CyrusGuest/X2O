import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  MapPin,
  Zap,
  Snowflake,
  DollarSign,
  Star,
  TrendingUp,
  ShieldCheck,
  FileCheck2,
  Truck,
  Database,
  Layers,
  Landmark,
  Ruler,
  Cable,
  CheckCircle2,
  Clock,
  Circle,
} from 'lucide-react';
import Button from '../components/ui/Button';
import CategoryIcon from '../components/ui/CategoryIcon';
import WorldMap from '../components/sections/WorldMap';
import projects from '../data/projects.json';
import { categoryMap, phaseOf, phaseMeta, intelligenceSignals } from '../data/platform';
import { formatNumber, cn } from '../utils/cn';

const tabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'funding', label: 'Funding' },
  { key: 'infrastructure', label: 'Infrastructure' },
  { key: 'suppliers', label: 'Suppliers' },
  { key: 'permits', label: 'Permits' },
  { key: 'risk', label: 'Risk' },
  { key: 'tokenization', label: 'Tokenization' },
  { key: 'intelligence', label: 'Intelligence' },
];

const riskProfile = {
  Low: { market: 20, regulatory: 25, technical: 30, supply: 22 },
  Medium: { market: 45, regulatory: 40, technical: 48, supply: 44 },
  High: { market: 70, regulatory: 65, technical: 72, supply: 60 },
};

const suppliersByCat = (cat) => {
  const base = [
    { name: 'Turnkey EPC Group', role: 'Construction', status: 'Contracted', lead: '4 wks' },
    { name: 'Grid Interconnect Partners', role: 'Power', status: 'In diligence', lead: '18 wks' },
    { name: 'ThermalCore Systems', role: 'Cooling', status: 'Shortlisted', lead: '12 wks' },
    { name: 'Meridian Fiber', role: 'Connectivity', status: 'Contracted', lead: '6 wks' },
    { name: 'Apex Switchgear', role: 'Electrical', status: 'RFQ', lead: '22 wks' },
  ];
  if (cat === 'semiconductors') base[2] = { name: 'UltraPure Water Co', role: 'Process water', status: 'Contracted', lead: '10 wks' };
  if (cat === 'energy') base[1] = { name: 'Reactor Modules Inc', role: 'Generation', status: 'In diligence', lead: '52 wks' };
  return base;
};

const permitsList = [
  { name: 'Land use & zoning', status: 'Approved' },
  { name: 'Environmental review', status: 'In review' },
  { name: 'Grid interconnection', status: 'Filed' },
  { name: 'Water rights', status: 'Approved' },
  { name: 'Building permits', status: 'Pending' },
  { name: 'Air quality', status: 'In review' },
];

const permitIcon = {
  Approved: { Icon: CheckCircle2, cls: 'text-status-live' },
  'In review': { Icon: Clock, cls: 'text-status-building' },
  Filed: { Icon: Circle, cls: 'text-primary-light' },
  Pending: { Icon: Circle, cls: 'text-gray-500' },
};

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const [tab, setTab] = useState('overview');

  if (!project) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-white">Project not found</h1>
          <p className="mt-3 text-gray-300">This project doesn't exist in the marketplace.</p>
          <Link to="/marketplace" className="mt-6 inline-block">
            <Button>Back to marketplace</Button>
          </Link>
        </div>
      </div>
    );
  }

  const cat = categoryMap[project.category];
  const phase = phaseOf(project);
  const rp = riskProfile[project.risk];

  return (
    <div>
      {/* Hero */}
      <div className="relative h-[420px] overflow-hidden border-b border-line">
        <img src={project.image} alt={project.name} className="h-full w-full object-cover opacity-40 grayscale" />
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/70 to-canvas/30" />
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-[1400px] px-4 pb-8 sm:px-6 lg:px-8">
            <Link
              to="/marketplace"
              className="mb-6 inline-flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-white"
            >
              <ArrowLeft size={15} /> Back to marketplace
            </Link>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-[12px] font-medium text-white backdrop-blur-sm">
                    <CategoryIcon category={project.category} size={12} />
                    {cat?.label}
                  </span>
                  <span
                    className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12px] font-medium backdrop-blur-sm"
                    style={{
                      color: phaseMeta[phase].color,
                      borderColor: `${phaseMeta[phase].color}40`,
                      background: `${phaseMeta[phase].color}1a`,
                    }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: phaseMeta[phase].color }} />
                    {phaseMeta[phase].label}
                  </span>
                </div>
                <h1 className="mt-4 text-5xl font-semibold tracking-tightest text-white sm:text-6xl">
                  {project.name}
                </h1>
                <p className="mt-3 flex items-center gap-2 text-lg text-gray-200">
                  <MapPin size={18} className="text-gray-400" />
                  {project.city}, {project.state}
                </p>
              </div>
              <div className="flex gap-3">
                <HeroStat label="Capital Needed" value={formatNumber(project.capitalNeeded)} />
                <HeroStat
                  label="Power"
                  value={project.powerCapacityMw ? `${project.powerCapacityMw} MW` : '—'}
                  sub={project.power}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="sticky top-16 z-30 border-b border-line bg-canvas/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] gap-1 overflow-x-auto px-4 no-scrollbar sm:px-6 lg:px-8">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                'relative whitespace-nowrap px-4 py-3.5 text-sm transition-colors',
                tab === t.key ? 'text-white' : 'text-gray-400 hover:text-gray-200'
              )}
            >
              {t.label}
              {tab === t.key && (
                <motion.span layoutId="tab-underline" className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-white" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8">
            <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              {tab === 'overview' && <Overview project={project} />}
              {tab === 'funding' && <Funding project={project} />}
              {tab === 'infrastructure' && <Infrastructure project={project} />}
              {tab === 'suppliers' && <Suppliers project={project} />}
              {tab === 'permits' && <Permits />}
              {tab === 'risk' && <Risk rp={rp} level={project.risk} />}
              {tab === 'tokenization' && <Tokenization project={project} />}
              {tab === 'intelligence' && <Intelligence />}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="col-span-12 space-y-5 lg:col-span-4">
            <div className="card sticky top-32 p-6">
              <h3 className="text-lg font-semibold tracking-tight text-white">Participate</h3>
              <div className="mt-5 space-y-0">
                <Row label="Funding" value={`${project.fundingPct}%`} valueClass="text-primary-light" />
                <Row label="Stage" value={project.fundingStage} />
                <Row label="Token" value={project.tokenSymbol} mono />
                <Row label="Timeline" value={project.timeline} last />
              </div>
              <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-surface-hover">
                <div className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light" style={{ width: `${project.fundingPct}%` }} />
              </div>
              <div className="mt-6 space-y-3">
                <Button className="w-full">
                  <DollarSign size={16} /> Join Early Access
                </Button>
                <Button variant="secondary" className="w-full">
                  <Star size={16} /> Add to Watchlist
                </Button>
              </div>
              <p className="mt-4 text-[11px] leading-relaxed text-gray-500">
                Participation is illustrative and would require appropriate legal and regulatory
                compliance.
              </p>
            </div>

            <div className="card overflow-hidden">
              <WorldMap projects={[project]} height={220} />
              <div className="border-t border-line px-4 py-3 text-xs text-gray-300">
                {project.city}, {project.state} · {project.utility}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Tab panels ─────────────────────────────── */

function Overview({ project }) {
  const facts = [
    { icon: Landmark, label: 'Developer', value: project.developer },
    { icon: Zap, label: 'Utility', value: project.utility },
    { icon: Ruler, label: 'Land', value: project.landAcres ? `${project.landAcres.toLocaleString()} acres` : '—' },
    { icon: Cable, label: 'Fiber', value: project.fiber },
    { icon: Snowflake, label: 'Cooling', value: project.cooling },
    { icon: FileCheck2, label: 'Incentives', value: project.incentives },
  ];
  return (
    <div className="space-y-6">
      <Panel title="Overview">
        <p className="leading-relaxed text-gray-200">{project.summary}</p>
      </Panel>
      <Panel title="Key facts">
        <div className="grid gap-4 sm:grid-cols-2">
          {facts.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.label} className="flex items-start gap-3 rounded-xl border border-line bg-canvas p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line text-gray-200">
                  <Icon size={16} />
                </span>
                <div>
                  <p className="text-xs text-gray-400">{f.label}</p>
                  <p className="mt-0.5 text-sm font-medium text-white">{f.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Panel>
      <Panel title="30-day activity">
        <Chart />
      </Panel>
    </div>
  );
}

function Funding({ project }) {
  return (
    <div className="space-y-6">
      <Panel title="Funding progress">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-5xl font-semibold text-white">{project.fundingPct}%</p>
            <p className="mt-1 text-sm text-gray-400">committed · {project.fundingStage}</p>
          </div>
          <p className="font-mono text-xl text-primary-light">{formatNumber(project.capitalNeeded)}</p>
        </div>
        <div className="mt-5 h-2.5 w-full overflow-hidden rounded-full bg-surface-hover">
          <div className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light" style={{ width: `${project.fundingPct}%` }} />
        </div>
      </Panel>
      <div className="grid gap-4 sm:grid-cols-3">
        <Tile label="Capital Needed" value={formatNumber(project.capitalNeeded)} />
        <Tile label="Committed" value={formatNumber(project.capitalNeeded * (project.fundingPct / 100))} accent />
        <Tile label="Remaining" value={formatNumber(project.capitalNeeded * (1 - project.fundingPct / 100))} />
      </div>
      <Panel title="Instrument">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-canvas font-mono text-sm text-primary-light">
            {project.tokenSymbol.slice(0, 2)}
          </span>
          <div>
            <p className="font-mono font-medium text-white">{project.tokenSymbol}</p>
            <p className="text-sm text-gray-400">Tokenized infrastructure record · {project.fundingStage}</p>
          </div>
        </div>
      </Panel>
    </div>
  );
}

function Infrastructure({ project }) {
  const specs = [
    { icon: Zap, label: 'Power Capacity', value: project.powerCapacityMw ? `${project.powerCapacityMw} MW` : 'N/A', note: `Grid: ${project.power}` },
    { icon: Snowflake, label: 'Cooling', value: project.cooling, note: 'Thermal management' },
    { icon: Cable, label: 'Connectivity', value: project.fiber, note: 'Network' },
    { icon: Ruler, label: 'Land', value: project.landAcres ? `${project.landAcres.toLocaleString()} acres` : 'N/A', note: 'Site footprint' },
  ];
  return (
    <div className="space-y-6">
      <Panel title="Infrastructure specifications">
        <div className="grid gap-4 sm:grid-cols-2">
          {specs.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="flex items-start gap-4 rounded-xl border border-line bg-canvas p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-line text-gray-200">
                  <Icon size={20} />
                </span>
                <div>
                  <p className="text-xs text-gray-400">{s.label}</p>
                  <p className="mt-0.5 font-medium text-white">{s.value}</p>
                  <p className="mt-0.5 text-xs text-gray-400">{s.note}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Panel>
    </div>
  );
}

function Suppliers({ project }) {
  const rows = suppliersByCat(project.category);
  const statusCls = { Contracted: 'text-status-live', 'In diligence': 'text-status-building', Shortlisted: 'text-primary-light', RFQ: 'text-gray-400' };
  return (
    <Panel title="Required vendors">
      <div className="overflow-hidden rounded-xl border border-line">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-canvas text-left text-xs uppercase tracking-wide text-gray-400">
              <th className="px-4 py-3 font-medium">Vendor</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Lead time</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className={cn('bg-surface', i !== rows.length - 1 && 'border-b border-line')}>
                <td className="px-4 py-3 font-medium text-white">
                  <span className="flex items-center gap-2">
                    <Truck size={14} className="text-gray-400" />
                    {r.name}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-300">{r.role}</td>
                <td className={cn('px-4 py-3 font-medium', statusCls[r.status])}>{r.status}</td>
                <td className="px-4 py-3 text-right font-mono text-gray-200">{r.lead}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

function Permits() {
  return (
    <Panel title="Permits & approvals">
      <div className="space-y-2">
        {permitsList.map((p) => {
          const { Icon, cls } = permitIcon[p.status];
          return (
            <div key={p.name} className="flex items-center justify-between rounded-xl border border-line bg-canvas px-4 py-3">
              <span className="flex items-center gap-3 text-sm text-white">
                <Icon size={16} className={cls} />
                {p.name}
              </span>
              <span className={cn('text-sm font-medium', cls)}>{p.status}</span>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

function Risk({ rp, level }) {
  const bars = [
    { label: 'Market risk', pct: rp.market },
    { label: 'Regulatory risk', pct: rp.regulatory },
    { label: 'Technical risk', pct: rp.technical },
    { label: 'Supply chain risk', pct: rp.supply },
  ];
  const color = (pct) => (pct < 35 ? 'bg-status-live' : pct < 55 ? 'bg-status-building' : 'bg-red-500');
  const label = (pct) => (pct < 35 ? 'Low' : pct < 55 ? 'Medium' : 'High');
  return (
    <Panel title="Risk analysis">
      <div className="mb-6 flex items-center gap-3 rounded-xl border border-line bg-canvas p-4">
        <ShieldCheck size={20} className="text-primary-light" />
        <p className="text-sm text-gray-200">
          Overall risk rating: <span className="font-semibold text-white">{level}</span>
        </p>
      </div>
      <div className="space-y-5">
        {bars.map((b) => (
          <div key={b.label}>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="text-gray-300">{b.label}</span>
              <span className="text-gray-200">{label(b.pct)}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-hover">
              <div className={cn('h-full rounded-full', color(b.pct))} style={{ width: `${b.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function Tokenization({ project }) {
  return (
    <div className="space-y-6">
      <Panel title="Infrastructure token">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-xl border border-line bg-canvas font-mono text-primary-light">
            {project.tokenSymbol.slice(0, 2)}
          </span>
          <div>
            <p className="font-mono text-lg font-medium text-white">{project.tokenSymbol}</p>
            <p className="text-sm text-gray-400">A secure digital representation of this project's records.</p>
          </div>
        </div>
      </Panel>
      <Panel title="What tokenization enables">
        <div className="grid gap-3 sm:grid-cols-2">
          {['Faster settlement', 'Transparent records', 'Digital ownership history', 'Project verification', 'Reduced paperwork', 'Improved interoperability'].map((b) => (
            <div key={b} className="flex items-center gap-3 rounded-xl border border-line bg-canvas p-3.5 text-sm text-gray-200">
              <Layers size={15} className="text-primary-light" />
              {b}
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-xl border border-line bg-canvas p-4 text-xs leading-relaxed text-gray-500">
          Any investment-related functionality would require appropriate legal and regulatory compliance.
        </p>
      </Panel>
    </div>
  );
}

function Intelligence() {
  return (
    <div className="space-y-6">
      <Panel title="Data this project contributes">
        <div className="flex flex-wrap gap-2.5">
          {intelligenceSignals.slice(0, 12).map((s) => (
            <span key={s} className="flex items-center gap-1.5 rounded-full border border-line bg-canvas px-3 py-1.5 text-[13px] text-gray-200">
              <Database size={12} className="text-primary-light" />
              {s}
            </span>
          ))}
        </div>
      </Panel>
      <Panel title="Benchmarked against the network">
        <div className="grid gap-4 sm:grid-cols-3">
          <Tile label="Permitting speed" value="Top 25%" accent />
          <Tile label="Cost / MW" value="−12% vs avg" />
          <Tile label="Est. on-time" value="88%" />
        </div>
      </Panel>
    </div>
  );
}

/* ── Building blocks ─────────────────────────── */

function Panel({ title, children }) {
  return (
    <div className="card p-7">
      <h2 className="text-xl font-semibold tracking-tight text-white">{title}</h2>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function HeroStat({ label, value, sub }) {
  return (
    <div className="min-w-[150px] rounded-xl border border-line bg-surface/80 p-5 backdrop-blur-md">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="mt-1 font-mono text-2xl font-semibold text-white">{value}</p>
      {sub && (
        <p className="mt-1 flex items-center gap-1 text-xs text-status-live">
          <TrendingUp size={12} /> {sub}
        </p>
      )}
    </div>
  );
}

function Tile({ label, value, accent }) {
  return (
    <div className={cn('rounded-xl border border-line bg-canvas p-5 text-center', accent && 'border-primary/30')}>
      <p className="font-mono text-2xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-xs text-gray-400">{label}</p>
    </div>
  );
}

function Row({ label, value, valueClass, mono, last }) {
  return (
    <div className={cn('flex items-center justify-between py-3', !last && 'border-b border-line')}>
      <span className="text-sm text-gray-300">{label}</span>
      <span className={cn('text-sm font-semibold', mono && 'font-mono', valueClass || 'text-white')}>{value}</span>
    </div>
  );
}

function Chart() {
  const bars = [62, 70, 66, 75, 80, 77, 85, 90, 84, 92, 96, 88, 94, 98, 93, 100, 95, 91, 97, 100, 96, 93, 99, 100, 95, 98, 100, 98, 96, 100];
  return (
    <div className="rounded-xl border border-line bg-canvas p-5">
      <div className="flex h-40 items-end gap-1">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ delay: i * 0.015, duration: 0.4 }}
            className="flex-1 rounded-t bg-gradient-to-t from-primary/40 to-primary-light"
          />
        ))}
      </div>
    </div>
  );
}
