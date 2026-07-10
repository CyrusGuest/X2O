import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, SlidersHorizontal, X, Zap, Building2, Activity } from 'lucide-react';
import { containerVariants, itemVariants } from '../animations/variants';
import ProjectCard from '../components/ui/ProjectCard';
import WorldMap from '../components/sections/WorldMap';
import projects from '../data/projects.json';
import { phaseOf, phaseMeta } from '../data/platform';
import { formatNumber, cn } from '../utils/cn';

const phases = ['all', 'live', 'building', 'upcoming'];
const phaseLabel = { all: 'All projects', live: 'Operational', building: 'In Construction', upcoming: 'Planning' };

export default function GlobalMap() {
  const [phase, setPhase] = useState('all');
  const [selectedState, setSelectedState] = useState(null);
  const [sortBy, setSortBy] = useState('power');

  const withPhase = useMemo(() => projects.map((p) => ({ ...p, phase: phaseOf(p) })), []);

  const filtered = useMemo(
    () =>
      withPhase
        .filter((p) => phase === 'all' || p.phase === phase)
        .filter((p) => !selectedState || p.stateCode === selectedState)
        .sort((a, b) =>
          sortBy === 'power' ? b.powerCapacityMw - a.powerCapacityMw : b.capitalNeeded - a.capitalNeeded
        ),
    [withPhase, phase, selectedState, sortBy]
  );

  const phaseCounts = {
    all: projects.length,
    live: withPhase.filter((p) => p.phase === 'live').length,
    building: withPhase.filter((p) => p.phase === 'building').length,
    upcoming: withPhase.filter((p) => p.phase === 'upcoming').length,
  };

  const stateStats = projects.reduce((acc, p) => {
    if (!acc[p.stateCode]) acc[p.stateCode] = { code: p.stateCode, state: p.state, count: 0, capital: 0 };
    acc[p.stateCode].count++;
    acc[p.stateCode].capital += p.capitalNeeded;
    return acc;
  }, {});
  const topStates = Object.values(stateStats).sort((a, b) => b.count - a.count).slice(0, 6);

  const totalCapital = projects.reduce((s, p) => s + p.capitalNeeded, 0);
  const totalPower = projects.reduce((s, p) => s + p.powerCapacityMw, 0);
  const totalStates = Object.keys(stateStats).length;

  return (
    <div>
      {/* Header */}
      <div className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
        <div className="relative mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-gray-400">
                Infrastructure Map
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tightest text-white sm:text-5xl">
                America's AI infrastructure
              </h1>
              <p className="mt-3 max-w-xl text-lg text-gray-300">
                A live map of the projects rebuilding the country for the AI era.
              </p>
            </div>
            <div className="flex gap-8">
              <HeaderStat label="Total Power" value={`${totalPower.toLocaleString()} MW`} />
              <HeaderStat label="Capital" value={formatNumber(totalCapital)} valueClass="text-primary-light" />
              <HeaderStat label="States" value={totalStates} />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Rail */}
          <div className="col-span-12 space-y-4 lg:col-span-3">
            <div className="card p-5">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
                <SlidersHorizontal size={15} className="text-gray-400" />
                Phase
              </h3>
              <div className="space-y-1.5">
                {phases.map((ph) => (
                  <button
                    key={ph}
                    onClick={() => setPhase(ph)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-sm transition-colors',
                      phase === ph
                        ? 'border-gray-600 bg-surface-hover text-white'
                        : 'border-transparent text-gray-300 hover:bg-surface hover:text-white'
                    )}
                  >
                    <span className="flex items-center gap-2.5">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: ph === 'all' ? '#fff' : phaseMeta[ph].color }}
                      />
                      {phaseLabel[ph]}
                    </span>
                    <span className="font-mono text-xs text-gray-300">{phaseCounts[ph]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
                <MapPin size={15} className="text-gray-400" />
                Top states
              </h3>
              <div className="space-y-2">
                {topStates.map((s) => (
                  <button
                    key={s.code}
                    onClick={() => setSelectedState(selectedState === s.code ? null : s.code)}
                    className={cn(
                      'w-full rounded-lg border px-3 py-2.5 text-left transition-colors',
                      selectedState === s.code
                        ? 'border-primary/40 bg-primary/10'
                        : 'border-transparent hover:bg-surface'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white">{s.state}</span>
                      <span className="rounded border border-line bg-canvas px-1.5 py-0.5 font-mono text-[11px] text-gray-300">
                        {s.count}
                      </span>
                    </div>
                    <p className="mt-1 font-mono text-xs text-gray-400">{formatNumber(s.capital)}</p>
                  </button>
                ))}
              </div>
              {selectedState && (
                <button
                  onClick={() => setSelectedState(null)}
                  className="mt-3 flex w-full items-center justify-center gap-1 text-sm text-gray-300 hover:text-white"
                >
                  <X size={13} /> Clear filter
                </button>
              )}
            </div>
          </div>

          {/* Main */}
          <div className="col-span-12 lg:col-span-9">
            <div className="card overflow-hidden">
              <div className="relative">
                <WorldMap projects={filtered} />
                <div className="absolute bottom-5 right-5 z-10 rounded-xl border border-line bg-surface-raised/90 p-4 backdrop-blur-sm">
                  <p className="mb-3 text-xs font-semibold text-white">Phase</p>
                  <div className="space-y-2">
                    {['live', 'building', 'upcoming'].map((ph) => (
                      <div key={ph} className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full" style={{ background: phaseMeta[ph].color }} />
                        <span className="text-xs text-gray-300">
                          {phaseMeta[ph].label} ({phaseCounts[ph]})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-line px-6 py-5 sm:grid-cols-4">
                <MapStat icon={Building2} label="Operational" value={phaseCounts.live} />
                <MapStat icon={Zap} label="Total Power" value={`${totalPower.toLocaleString()} MW`} />
                <MapStat icon={MapPin} label="States" value={totalStates} />
                <MapStat icon={Activity} label="Avg Funding" value={`${Math.round(projects.reduce((s, p) => s + p.fundingPct, 0) / projects.length)}%`} valueClass="text-status-live" />
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <p className="text-sm text-gray-300">
                <span className="font-mono font-medium text-white">{filtered.length}</span> projects
                {selectedState && ` in ${selectedState}`}
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-line bg-surface px-3 py-2 text-sm text-gray-100 transition-colors hover:border-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                <option value="power">Sort by power</option>
                <option value="capital">Sort by capital</option>
              </select>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${phase}-${selectedState}-${sortBy}`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="mt-6 grid gap-5 sm:grid-cols-2"
              >
                {filtered.map((p) => (
                  <motion.div key={p.id} variants={itemVariants} layout>
                    <ProjectCard project={p} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filtered.length === 0 && (
              <div className="py-20 text-center">
                <Building2 size={40} className="mx-auto mb-4 text-gray-600" />
                <p className="text-gray-400">No projects match the current filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function HeaderStat({ label, value, valueClass }) {
  return (
    <div className="text-right">
      <p className={cn('font-mono text-2xl font-semibold', valueClass || 'text-white')}>{value}</p>
      <p className="text-xs text-gray-400">{label}</p>
    </div>
  );
}

function MapStat({ icon: Icon, label, value, valueClass }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-canvas text-gray-300">
        <Icon size={16} />
      </div>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className={cn('font-mono text-sm font-semibold', valueClass || 'text-white')}>{value}</p>
      </div>
    </div>
  );
}
