import { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import CategoryIcon from '../ui/CategoryIcon';
import { categoryMap, phaseOf, phaseMeta } from '../../data/platform';

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

export default function WorldMap({ projects, onMarkerClick, height = 520 }) {
  const [tooltip, setTooltip] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleHover = (p, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPos({ x: rect.left + rect.width / 2, y: rect.top - 10 });
    setTooltip(p);
  };

  return (
    <div className="relative w-full bg-canvas bg-dots" style={{ height }}>
      <ComposableMap
        projection="geoAlbersUsa"
        projectionConfig={{ scale: 1000 }}
        className="h-full w-full"
      >
        <ZoomableGroup zoom={1} center={[0, 0]}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#141414"
                  stroke="#2e2e2e"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none' },
                    hover: { fill: '#1f1f1f', outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {projects.map((p) => {
            const phase = phaseOf(p);
            const color = phaseMeta[phase].color;
            return (
              <Marker
                key={p.id}
                coordinates={[p.coordinates[1], p.coordinates[0]]}
                onMouseEnter={(e) => handleHover(p, e)}
                onMouseLeave={() => setTooltip(null)}
                onClick={() => onMarkerClick && onMarkerClick(p)}
                style={{ cursor: 'pointer' }}
              >
                {phase === 'live' && (
                  <circle r={9} fill={color} fillOpacity={0.18} className="animate-ping" />
                )}
                <circle r={5.5} fill={color} stroke="#000" strokeWidth={1.5} />
                <circle r={2} fill="#fff" fillOpacity={0.95} />
              </Marker>
            );
          })}
        </ZoomableGroup>
      </ComposableMap>

      {tooltip && (
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          className="pointer-events-none fixed z-50"
          style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -100%)' }}
        >
          <div className="min-w-[220px] rounded-xl border border-line bg-surface-raised p-3.5 shadow-glow">
            <div className="mb-2 flex items-start justify-between gap-2">
              <p className="text-sm font-semibold tracking-tight text-white">{tooltip.name}</p>
              <span className="flex items-center gap-1 rounded-full border border-line bg-canvas px-2 py-0.5 text-[10px] text-gray-200">
                <CategoryIcon category={tooltip.category} size={10} />
                {categoryMap[tooltip.category]?.label}
              </span>
            </div>
            <p className="mb-3 flex items-center gap-1 text-xs text-gray-300">
              <MapPin size={11} className="text-gray-400" />
              {tooltip.city}, {tooltip.stateCode}
            </p>
            <div className="grid grid-cols-2 gap-2 border-t border-line pt-2.5 text-xs">
              <div>
                <p className="text-gray-400">Power</p>
                <p className="mt-0.5 font-mono font-medium text-white">
                  {tooltip.powerCapacityMw ? `${tooltip.powerCapacityMw} MW` : '—'}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Funding</p>
                <p className="mt-0.5 font-mono font-medium text-primary-light">{tooltip.fundingPct}%</p>
              </div>
            </div>
          </div>
          <div className="absolute left-1/2 top-full -mt-px -translate-x-1/2">
            <div className="h-0 w-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-line" />
          </div>
        </motion.div>
      )}
    </div>
  );
}
