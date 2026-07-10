import { useEffect, useRef } from 'react';

/**
 * A subtle radial glow that follows the cursor. Blurred, low-opacity, uses
 * `screen` blending so it softly brightens whatever card/surface sits beneath
 * it — light moving across brushed metal. Never distracts.
 */
export default function CursorGlow({ size = 380 }) {
  const ref = useRef(null);
  const raf = useRef(0);
  const target = useRef({ x: -9999, y: -9999 });
  const pos = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return; // skip touch

    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('pointermove', onMove);

    const tick = () => {
      // Ease toward the cursor for weight
      pos.current.x += (target.current.x - pos.current.x) * 0.16;
      pos.current.y += (target.current.y - pos.current.y) * 0.16;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${pos.current.x - size / 2}px, ${
          pos.current.y - size / 2
        }px, 0)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, [size]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-40 rounded-full"
      style={{
        width: size,
        height: size,
        mixBlendMode: 'screen',
        background:
          'radial-gradient(circle, rgba(120,180,255,0.10) 0%, rgba(50,145,255,0.06) 35%, transparent 70%)',
        filter: 'blur(28px)',
        willChange: 'transform',
      }}
    />
  );
}
