import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, LayoutGrid } from 'lucide-react';
import { containerVariants, itemVariants } from '../animations/variants';
import ProjectCard from '../components/ui/ProjectCard';
import CategoryIcon from '../components/ui/CategoryIcon';
import Button from '../components/ui/Button';
import projects from '../data/projects.json';
import { categories, fundingStages, constructionStatuses, riskLevels } from '../data/platform';
import { formatNumber, cn } from '../utils/cn';

export default function Marketplace() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(params.get('category') || 'all');
  const [risk, setRisk] = useState('all');
  const [stage, setStage] = useState('all');
  const [status, setStatus] = useState('all');
  const [sortBy, setSortBy] = useState('funding');

  useEffect(() => {
    const c = params.get('category');
    if (c) setCategory(c);
  }, [params]);

  const setCat = (key) => {
    setCategory(key);
    if (key === 'all') setParams({});
    else setParams({ category: key });
  };

  const filtered = useMemo(() => {
    return projects
      .filter((p) => category === 'all' || p.category === category)
      .filter((p) => risk === 'all' || p.risk === risk)
      .filter((p) => stage === 'all' || p.fundingStage === stage)
      .filter((p) => status === 'all' || p.constructionStatus === status)
      .filter((p) => {
        if (!query.trim()) return true;
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.state.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (sortBy === 'funding') return b.fundingPct - a.fundingPct;
        if (sortBy === 'power') return b.powerCapacityMw - a.powerCapacityMw;
        if (sortBy === 'capital') return b.capitalNeeded - a.capitalNeeded;
        return 0;
      });
  }, [category, risk, stage, status, query, sortBy]);

  const totalCapital = filtered.reduce((s, p) => s + p.capitalNeeded, 0);
  const totalPower = filtered.reduce((s, p) => s + p.powerCapacityMw, 0);
  const activeFilters = [risk, stage, status].filter((f) => f !== 'all').length + (category !== 'all' ? 1 : 0);

  const resetFilters = () => {
    setCat('all');
    setRisk('all');
    setStage('all');
    setStatus('all');
    setQuery('');
  };

  return (
    <div>
      {/* Header */}
      <div className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
        <div className="relative mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400">Marketplace</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tightest text-gray-900 dark:text-white sm:text-5xl">
            Infrastructure marketplace
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Discover, compare and track verified infrastructure projects across America.
          </p>
          <div className="mt-6 flex flex-wrap gap-8">
            <HeaderStat label="Projects" value={filtered.length} />
            <HeaderStat label="Combined Power" value={`${totalPower.toLocaleString()} MW`} />
            <HeaderStat label="Capital Tracked" value={formatNumber(totalCapital)} />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Filters */}
          <aside className="col-span-12 lg:col-span-3">
            <div className="lg:sticky lg:top-24 space-y-4">
              {/* Search */}
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search projects, cities, states…"
                  className="w-full rounded-lg border border-gray-300 dark:border-line bg-white dark:bg-surface py-2.5 pl-9 pr-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus-visible:border-gray-600 focus-visible:ring-2 focus-visible:ring-white/20"
                />
              </div>

              <div className="card p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                    <SlidersHorizontal size={15} className="text-gray-500 dark:text-gray-400" />
                    Filters
                  </h3>
                  {activeFilters > 0 && (
                    <button
                      onClick={resetFilters}
                      className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:text-white"
                    >
                      <X size={12} /> Clear ({activeFilters})
                    </button>
                  )}
                </div>

                {/* Category */}
                <FilterGroup label="Category">
                  <div className="max-h-56 space-y-1 overflow-y-auto pr-1 no-scrollbar">
                    <CatRow active={category === 'all'} onClick={() => setCat('all')} label="All categories" />
                    {categories.map((c) => (
                      <button
                        key={c.key}
                        onClick={() => setCat(c.key)}
                        className={cn(
                          'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors',
                          category === c.key
                            ? 'bg-white dark:bg-surface-hover text-gray-900 dark:text-white'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-white dark:bg-surface hover:text-gray-900 dark:text-white'
                        )}
                      >
                        <CategoryIcon category={c.key} size={15} className="text-gray-500 dark:text-gray-400" />
                        {c.label}
                      </button>
                    ))}
                  </div>
                </FilterGroup>

                {/* Risk */}
                <FilterGroup label="Risk">
                  <div className="flex flex-wrap gap-2">
                    <Pill active={risk === 'all'} onClick={() => setRisk('all')}>All</Pill>
                    {riskLevels.map((r) => (
                      <Pill key={r} active={risk === r} onClick={() => setRisk(r)}>
                        {r}
                      </Pill>
                    ))}
                  </div>
                </FilterGroup>

                {/* Stage */}
                <FilterGroup label="Funding stage">
                  <Select value={stage} onChange={setStage} options={fundingStages} allLabel="Any stage" />
                </FilterGroup>

                {/* Status */}
                <FilterGroup label="Construction status" last>
                  <Select value={status} onChange={setStatus} options={constructionStatuses} allLabel="Any status" />
                </FilterGroup>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="col-span-12 lg:col-span-9">
            <div className="mb-6 flex items-center justify-between">
              <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <LayoutGrid size={15} className="text-gray-500 dark:text-gray-400" />
                <span className="font-mono font-medium text-gray-900 dark:text-white">{filtered.length}</span> projects
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-gray-300 dark:border-line bg-white dark:bg-surface px-3 py-2 text-sm text-gray-100 transition-colors hover:border-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                <option value="funding">Sort by funding</option>
                <option value="power">Sort by power</option>
                <option value="capital">Sort by capital</option>
              </select>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${category}-${risk}-${stage}-${status}-${sortBy}-${query}`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
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
                <Search size={40} className="mx-auto mb-4 text-gray-600" />
                <p className="text-gray-500 dark:text-gray-400">No projects match your filters.</p>
                <Button variant="secondary" className="mt-4" onClick={resetFilters}>
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function HeaderStat({ label, value }) {
  return (
    <div>
      <p className="font-mono text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
    </div>
  );
}

function FilterGroup({ label, children, last }) {
  return (
    <div className={cn('py-4', !last && 'border-b border-line')}>
      <p className="mb-2.5 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">{label}</p>
      {children}
    </div>
  );
}

function CatRow({ active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors',
        active ? 'bg-white dark:bg-surface-hover text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-white dark:bg-surface hover:text-gray-900 dark:text-white'
      )}
    >
      <LayoutGrid size={15} className="text-gray-500 dark:text-gray-400" />
      {label}
    </button>
  );
}

function Pill({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
        active
          ? 'border-gray-500 bg-white dark:bg-surface-hover text-gray-900 dark:text-white'
          : 'border-line text-gray-600 dark:text-gray-300 hover:border-gray-600 hover:text-gray-900 dark:text-white'
      )}
    >
      {children}
    </button>
  );
}

function Select({ value, onChange, options, allLabel }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-gray-300 dark:border-line bg-white dark:bg-surface px-3 py-2 text-sm text-gray-100 transition-colors hover:border-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
    >
      <option value="all">{allLabel}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}
