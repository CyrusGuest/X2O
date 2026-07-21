import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, ArrowUpRight, Zap } from 'lucide-react';
import CategoryIcon from './CategoryIcon';
import { categoryMap } from '../../data/platform';
import { cn } from '../../utils/cn';

const riskStyles = {
  Low: 'text-status-live border-status-live/25 bg-status-live/10',
  Medium: 'text-status-building border-status-building/25 bg-status-building/10',
  High: 'text-red-400 border-red-500/25 bg-red-500/10',
};

const powerStyles = {
  Secured: 'text-status-live',
  Generating: 'text-status-live',
  Pending: 'text-status-building',
};

export default function ProjectCard({ project }) {
  const cat = categoryMap[project.category];

  return (
    <Link to={`/project/${project.id}`} className="block h-full">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className="group card glow-border card-hover relative flex h-full flex-col overflow-hidden"
      >
        {/* Image */}
        <div className="relative h-44 overflow-hidden border-b border-gray-200 dark:border-line">
          <img
            src={project.image}
            alt={project.name}
            loading="lazy"
            className="h-full w-full object-cover opacity-70 grayscale transition-all duration-500 group-hover:opacity-90 group-hover:grayscale-0 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent dark:from-surface dark:via-surface/20" />
          <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm dark:border-white/15 dark:bg-black/50">
            <CategoryIcon category={project.category} size={12} />
            {cat?.label}
          </div>
          <div
            className={cn(
              'absolute right-3 top-3 rounded-full border px-2.5 py-1 text-[11px] font-medium backdrop-blur-sm',
              riskStyles[project.risk]
            )}
          >
            {project.risk} risk
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-[15px] font-semibold tracking-tight text-gray-900 dark:text-white">{project.name}</h3>
              <p className="mt-1 flex items-center gap-1.5 text-[13px] text-gray-600 dark:text-gray-300">
                <MapPin size={13} className="text-gray-500 dark:text-gray-400" />
                {project.city}, {project.stateCode}
              </p>
            </div>
            <ArrowUpRight
              size={18}
              className="shrink-0 text-gray-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gray-900 dark:text-gray-500 dark:group-hover:text-white"
            />
          </div>

          {/* Funding */}
          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between text-[11px]">
              <span className="uppercase tracking-wide text-gray-500 dark:text-gray-400">Funding · {project.fundingStage}</span>
              <span className="font-mono text-gray-700 dark:text-gray-200">{project.fundingPct}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-300 dark:bg-surface-hover">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light"
                style={{ width: `${project.fundingPct}%` }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="mt-auto grid grid-cols-3 gap-3 border-t border-gray-200 pt-4 dark:border-line">
            <Stat label="Power">
              {project.powerCapacityMw ? (
                <span className="flex items-center gap-1">
                  <Zap size={11} className="text-status-building" />
                  {project.powerCapacityMw} MW
                </span>
              ) : (
                '—'
              )}
            </Stat>
            <Stat label="Grid" valueClass={powerStyles[project.power] || 'text-gray-300'}>
              {project.power}
            </Stat>
            <Stat label="Online">{project.timeline}</Stat>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

function Stat({ label, children, valueClass }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">{label}</p>
      <p className={cn('mt-1 font-mono text-[13px] font-medium', valueClass || 'text-gray-900 dark:text-white')}>
        {children}
      </p>
    </div>
  );
}
