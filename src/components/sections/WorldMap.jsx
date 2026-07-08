import { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import Badge from '../ui/Badge';
import { formatNumber } from '../../utils/cn';

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

export default function WorldMap({ datacenters, onMarkerClick }) {
  const [tooltipContent, setTooltipContent] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleMarkerHover = (dc, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
    setTooltipContent(dc);
  };

  const handleMarkerLeave = () => {
    setTooltipContent(null);
  };

  return (
    <div className="relative w-full" style={{ height: '500px' }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 140,
          center: [10, 20]
        }}
        className="w-full h-full"
      >
        <ZoomableGroup center={[10, 20]} zoom={1}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#E8EBFF"
                  stroke="#3B5FFF"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none' },
                    hover: { fill: '#D1D5F7', outline: 'none' },
                    pressed: { outline: 'none' }
                  }}
                />
              ))
            }
          </Geographies>

          {/* Datacenter Markers */}
          {datacenters.map((dc) => {
            const markerColor =
              dc.status === 'live' ? '#2ECC71' :
              dc.status === 'building' ? '#FF9F43' : '#5865F2';

            return (
              <Marker
                key={dc.id}
                coordinates={[dc.coordinates[1], dc.coordinates[0]]}
                onMouseEnter={(e) => handleMarkerHover(dc, e)}
                onMouseLeave={handleMarkerLeave}
                onClick={() => onMarkerClick && onMarkerClick(dc)}
                style={{ cursor: 'pointer' }}
              >
                {/* Outer pulse ring for live status */}
                {dc.status === 'live' && (
                  <circle
                    r={8}
                    fill={markerColor}
                    fillOpacity={0.2}
                    className="animate-ping"
                  />
                )}

                {/* Main marker */}
                <circle
                  r={5}
                  fill={markerColor}
                  stroke="white"
                  strokeWidth={2}
                  className="transition-all hover:r-7"
                />

                {/* Inner dot */}
                <circle
                  r={2}
                  fill="white"
                  fillOpacity={0.8}
                />
              </Marker>
            );
          })}
        </ZoomableGroup>
      </ComposableMap>

      {/* Tooltip */}
      {tooltipContent && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed z-50 pointer-events-none"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <div className="bg-white rounded-lg shadow-xl p-3 min-w-[200px] border border-gray-100">
            <div className="flex items-start justify-between gap-2 mb-2">
              <p className="font-semibold text-sm text-gray-900">{tooltipContent.name}</p>
              <Badge status={tooltipContent.status} />
            </div>
            <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
              <MapPin size={10} />
              {tooltipContent.location}
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-gray-400">TVL</p>
                <p className="font-semibold text-gray-900">{formatNumber(tooltipContent.tvl)}</p>
              </div>
              <div>
                <p className="text-gray-400">APY</p>
                <p className="font-semibold text-status-live">{tooltipContent.apy}%</p>
              </div>
            </div>
          </div>
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
