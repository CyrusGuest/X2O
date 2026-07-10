import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import DottedGlobe from './DottedGlobe';

export default function CommandGlobe({ size = 460 }) {
  const ref = useRef(null);

  // Direction toward cursor (-1..1) and nearness (0..1).
  const dirX = useMotionValue(0);
  const dirY = useMotionValue(0);
  const prox = useMotionValue(0);

  const sx = useSpring(dirX, { stiffness: 80, damping: 18, mass: 0.5 });
  const sy = useSpring(dirY, { stiffness: 80, damping: 18, mass: 0.5 });
  const sp = useSpring(prox, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const onMove = (e) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy);
      const near = Math.max(0, 1 - dist / (r.width * 1.05));
      const mag = Math.max(1, dist);
      prox.set(near * near);
      dirX.set(dx / mag);
      dirY.set(dy / mag);
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [dirX, dirY, prox]);

  // Subtle parallax toward the cursor.
  const rotateY = useTransform([sx, sp], ([x, p]) => x * 8 * p);
  const rotateX = useTransform([sy, sp], ([y, p]) => -y * 8 * p);

  // Directional backlight behind the globe → bright rim on the near side.
  const backX = useTransform([sx, sp], ([x, p]) => x * (0.34 + p * 0.16) * size);
  const backY = useTransform([sy, sp], ([y, p]) => y * (0.34 + p * 0.16) * size);
  const backOpacity = useTransform(sp, (p) => 0.35 + p * 0.65);

  return (
    <div
      ref={ref}
      className="relative mx-auto"
      style={{ width: size, height: size, perspective: 1000 }}
    >
      {/* Base halo (present on open, gentle breathing) */}
      <motion.div
        className="pointer-events-none absolute inset-[-14%] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,114,245,0.16), transparent 62%)' }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.7, 0.95, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Directional rim backlight — behind the globe, hugs the near perimeter */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.div
          className="rounded-full"
          style={{
            width: size * 0.96,
            height: size * 0.96,
            x: backX,
            y: backY,
            opacity: backOpacity,
            background:
              'radial-gradient(circle, rgba(170,205,255,0.95) 0%, rgba(50,145,255,0.7) 34%, rgba(50,145,255,0.15) 60%, transparent 72%)',
            filter: 'blur(26px)',
            mixBlendMode: 'screen',
          }}
        />
      </div>

      {/* Tilt layer: dark sphere body (masks backlight to a rim) + dotted globe */}
      <motion.div
        className="absolute inset-0"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        <div
          className="absolute inset-0 overflow-hidden rounded-full"
          style={{
            background: 'radial-gradient(circle at 38% 32%, #141416 0%, #0a0a0b 55%, #050506 100%)',
            boxShadow:
              '0 0 50px -28px rgba(0,114,245,0.4), inset 0 0 90px rgba(0,0,0,0.9), inset 0 0 26px rgba(120,170,255,0.10)',
            border: '1px solid rgba(255,255,255,0.09)',
          }}
        >
          {/* Rotating dotted world + glowing project markers */}
          <DottedGlobe />
        </div>
      </motion.div>
    </div>
  );
}
