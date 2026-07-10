import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * A premium, 3D-feel token object.
 * Black-titanium finish, blue/white edge lighting, engraved circuit detail,
 * an illuminated core. Slow rotation that eases on hover; connection lines
 * animate outward when hovered.
 */
export default function TokenObject({ size = 320, interactive = true }) {
  const [hovered, setHovered] = useState(false);
  const active = interactive && hovered;

  // Circuit spokes (deterministic)
  const spokes = Array.from({ length: 12 }, (_, i) => (i * 360) / 12);

  return (
    <div
      className="relative select-none"
      style={{ width: size, height: size, perspective: 900 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Ambient glow */}
      <motion.div
        className="pointer-events-none absolute rounded-full"
        style={{
          inset: '-30%',
          background: 'radial-gradient(circle, rgba(0,114,245,0.35), transparent 62%)',
        }}
        animate={{ opacity: active ? 0.9 : 0.55, scale: active ? 1.08 : 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* 3D tilt shell */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotateX: active ? 8 : 12, rotateZ: 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Base titanium disc */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'radial-gradient(circle at 38% 30%, #2a2a2e 0%, #161618 40%, #0b0b0d 70%, #050506 100%)',
            boxShadow:
              'inset 0 2px 14px rgba(255,255,255,0.10), inset 0 -18px 40px rgba(0,0,0,0.9), 0 30px 80px -20px rgba(0,0,0,0.9)',
            border: '1px solid rgba(255,255,255,0.09)',
          }}
        />

        {/* Rotating edge light */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.0) 40deg, rgba(50,145,255,0.55) 90deg, rgba(255,255,255,0.85) 120deg, rgba(50,145,255,0.4) 150deg, transparent 210deg, transparent 360deg)',
            WebkitMask: 'radial-gradient(circle, transparent 61%, #000 62%, #000 100%)',
            mask: 'radial-gradient(circle, transparent 61%, #000 62%, #000 100%)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: active ? 26 : 12, repeat: Infinity, ease: 'linear' }}
        />

        {/* Engraved concentric rings + circuit traces */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
          <g fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="0.3">
            <circle cx="50" cy="50" r="46" />
            <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.07)" />
            <circle cx="50" cy="50" r="30" />
            <circle cx="50" cy="50" r="22" stroke="rgba(50,145,255,0.22)" />
          </g>
          {/* Rotating detail ring (tick marks) */}
          <motion.g
            style={{ transformOrigin: '50px 50px' }}
            animate={{ rotate: 360 }}
            transition={{ duration: active ? 60 : 40, repeat: Infinity, ease: 'linear' }}
          >
            {Array.from({ length: 60 }, (_, i) => {
              const a = (i * 6 * Math.PI) / 180;
              const r1 = 43;
              const r2 = i % 5 === 0 ? 39.5 : 41.5;
              return (
                <line
                  key={i}
                  x1={50 + r1 * Math.cos(a)}
                  y1={50 + r1 * Math.sin(a)}
                  x2={50 + r2 * Math.cos(a)}
                  y2={50 + r2 * Math.sin(a)}
                  stroke="rgba(255,255,255,0.14)"
                  strokeWidth="0.25"
                />
              );
            })}
          </motion.g>
          {/* Circuit spokes */}
          {spokes.map((deg, i) => {
            const a = (deg * Math.PI) / 180;
            const x = 50 + 22 * Math.cos(a);
            const y = 50 + 22 * Math.sin(a);
            const x2 = 50 + 30 * Math.cos(a);
            const y2 = 50 + 30 * Math.sin(a);
            return (
              <g key={i}>
                <line x1={x} y1={y} x2={x2} y2={y2} stroke="rgba(50,145,255,0.3)" strokeWidth="0.3" />
                <circle cx={x2} cy={y2} r="0.8" fill="rgba(120,180,255,0.7)" />
              </g>
            );
          })}
        </svg>

        {/* Illuminated core */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'translateZ(24px)' }}>
          <motion.div
            className="animate-core flex items-center justify-center rounded-full"
            style={{
              width: '34%',
              height: '34%',
              background:
                'radial-gradient(circle at 40% 35%, #eaf3ff 0%, #58a6ff 30%, #0a4fb0 65%, #06264f 100%)',
              boxShadow:
                '0 0 40px rgba(50,145,255,0.7), inset 0 0 18px rgba(255,255,255,0.55)',
            }}
            animate={{ boxShadow: active
              ? '0 0 60px rgba(50,145,255,0.9), inset 0 0 22px rgba(255,255,255,0.7)'
              : '0 0 40px rgba(50,145,255,0.7), inset 0 0 18px rgba(255,255,255,0.55)' }}
            transition={{ duration: 0.5 }}
          >
            {/* XSolut mark */}
            <svg width="42%" height="42%" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <path
                d="M4 3.5h5.4L14 10.2 18.6 3.5H24l-7.2 10.5L24 24.5h-5.4L14 17.8 9.4 24.5H4l7.2-10.5L4 3.5Z"
                fill="rgba(255,255,255,0.92)"
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Connection lines outward (on hover) */}
      {interactive && (
        <svg className="pointer-events-none absolute inset-[-24%] h-[148%] w-[148%]" viewBox="0 0 100 100">
          {Array.from({ length: 6 }, (_, i) => {
            const a = ((i * 60 + 30) * Math.PI) / 180;
            const x = 50 + 46 * Math.cos(a);
            const y = 50 + 46 * Math.sin(a);
            return (
              <motion.g
                key={i}
                initial={false}
                animate={{ opacity: active ? 1 : 0 }}
                transition={{ duration: 0.4, delay: active ? i * 0.05 : 0 }}
              >
                <line x1="50" y1="50" x2={x} y2={y} stroke="rgba(50,145,255,0.5)" strokeWidth="0.3" strokeDasharray="1 1.5" />
                <circle cx={x} cy={y} r="1.1" fill="#3291ff">
                  <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" repeatCount="indefinite" />
                </circle>
              </motion.g>
            );
          })}
        </svg>
      )}
    </div>
  );
}
