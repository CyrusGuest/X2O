import { motion } from 'framer-motion';
import datacenters from '../../data/datacenters.json';

export default function Globe3D({ height = 400 }) {
  const liveCount = datacenters.filter(dc => dc.status === 'live').length;

  return (
    <div
      className="relative flex items-center justify-center overflow-hidden"
      style={{ width: '100%', height: `${height}px` }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary-light/10 to-primary/5" />

      {/* Main globe container */}
      <div className="relative">
        {/* Rotating globe */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="relative w-80 h-80 rounded-full bg-gradient-to-br from-primary/80 to-primary-dark/60 shadow-2xl"
          style={{
            boxShadow: '0 0 60px rgba(59, 95, 255, 0.4), inset 0 0 40px rgba(59, 95, 255, 0.3)'
          }}
        >
          {/* Atmospheric glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-radial from-transparent via-primary/20 to-transparent blur-xl" />

          {/* Grid lines on globe */}
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
            {/* Horizontal lines */}
            <ellipse cx="50" cy="25" rx="45" ry="8" fill="none" stroke="white" strokeWidth="0.3" />
            <ellipse cx="50" cy="50" rx="48" ry="12" fill="none" stroke="white" strokeWidth="0.3" />
            <ellipse cx="50" cy="75" rx="45" ry="8" fill="none" stroke="white" strokeWidth="0.3" />

            {/* Vertical lines */}
            <ellipse cx="50" cy="50" rx="12" ry="48" fill="none" stroke="white" strokeWidth="0.3" />
            <ellipse cx="50" cy="50" rx="24" ry="48" fill="none" stroke="white" strokeWidth="0.3" />
            <ellipse cx="50" cy="50" rx="36" ry="48" fill="none" stroke="white" strokeWidth="0.3" />
            <ellipse cx="50" cy="50" rx="48" ry="48" fill="none" stroke="white" strokeWidth="0.3" />
          </svg>

          {/* Continents - stylized shapes */}
          <div className="absolute inset-0 rounded-full overflow-hidden opacity-30">
            {/* North America */}
            <div className="absolute top-[20%] left-[15%] w-16 h-20 bg-white/40 rounded-bl-3xl rounded-tr-2xl blur-sm" />

            {/* Europe */}
            <div className="absolute top-[25%] right-[30%] w-12 h-14 bg-white/40 rounded-lg blur-sm" />

            {/* Asia */}
            <div className="absolute top-[30%] right-[10%] w-20 h-24 bg-white/40 rounded-2xl blur-sm" />

            {/* South America */}
            <div className="absolute top-[50%] left-[20%] w-10 h-16 bg-white/40 rounded-b-3xl blur-sm" />

            {/* Africa */}
            <div className="absolute top-[45%] right-[35%] w-14 h-18 bg-white/40 rounded-t-2xl blur-sm" />
          </div>

          {/* Shine/highlight */}
          <div className="absolute top-8 left-8 w-24 h-24 bg-white/20 rounded-full blur-2xl" />
        </motion.div>

        {/* Floating datacenter markers */}
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 -right-6 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-xl border-2 border-white"
        >
          {datacenters.length}
        </motion.div>

        <motion.div
          animate={{ y: [5, -5, 5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-16 -left-8 bg-status-live text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-xl border-2 border-white"
        >
          {liveCount}
        </motion.div>

        <motion.div
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-28 -left-4 bg-status-building text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-xl border-2 border-white text-xs"
        >
          {datacenters.filter(dc => dc.status === 'building').length}
        </motion.div>

        <motion.div
          animate={{ y: [4, -4, 4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-8 right-8 bg-status-upcoming text-white w-9 h-9 rounded-full flex items-center justify-center font-bold shadow-xl border-2 border-white text-xs"
        >
          {datacenters.filter(dc => dc.status === 'upcoming').length}
        </motion.div>

        {/* Orbiting particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ rotate: 360 }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.5
            }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ transformOrigin: 'center' }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full bg-primary-light shadow-lg"
              style={{
                position: 'absolute',
                top: '50%',
                left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 50}%`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Connection lines radiating from globe */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="#3B5FFF" strokeWidth="1" strokeDasharray="4 4">
          <animate attributeName="stroke-opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" />
        </line>
        <line x1="50%" y1="50%" x2="20%" y2="30%" stroke="#3B5FFF" strokeWidth="1" strokeDasharray="4 4">
          <animate attributeName="stroke-opacity" values="0.2;0.6;0.2" dur="2.5s" repeatCount="indefinite" />
        </line>
        <line x1="50%" y1="50%" x2="75%" y2="75%" stroke="#3B5FFF" strokeWidth="1" strokeDasharray="4 4">
          <animate attributeName="stroke-opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" />
        </line>
      </svg>
    </div>
  );
}
