import { useEffect, useRef } from 'react';
import land from '../../data/worldDots.json';
import projects from '../../data/projects.json';
import { phaseOf, phaseMeta } from '../../data/platform';

const D2R = Math.PI / 180;
const CENTER_LNG = -95; // Americas face the viewer

const hexRgb = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

// Precompute base unit vectors (sphere centered so CENTER_LNG faces +z).
const baseVec = (lng, lat) => {
  const phi = lat * D2R;
  const lam = (lng - CENTER_LNG) * D2R;
  const cp = Math.cos(phi);
  return [cp * Math.sin(lam), Math.sin(phi), cp * Math.cos(lam)];
};

const landVecs = land.map(([lng, lat]) => baseVec(lng, lat));
const markers = projects.map((p) => ({
  v: baseVec(p.coordinates[1], p.coordinates[0]),
  rgb: hexRgb(phaseMeta[phaseOf(p)].color),
}));

const BASE_SPIN = 0.075; // rad/s idle rotation
const BASE_PITCH = 0.32; // tilt north slightly toward viewer

export default function DottedGlobe() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const st = {
      yaw: 0,
      pitch: BASE_PITCH,
      vYaw: BASE_SPIN,
      dragging: false,
      lastX: 0,
      lastY: 0,
      lastT: 0,
      lastVel: 0,
      w: 0,
      dpr: 1,
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width || 1;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      st.w = w;
      st.dpr = dpr;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(w * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
    ro?.observe(canvas);

    // ── Interaction: drag to spin, release with momentum ──
    const SENS = 0.0075;
    const onDown = (e) => {
      st.dragging = true;
      st.lastX = e.clientX;
      st.lastY = e.clientY;
      st.lastT = performance.now();
      st.lastVel = 0;
      canvas.style.cursor = 'grabbing';
      canvas.setPointerCapture?.(e.pointerId);
    };
    const onMove = (e) => {
      if (!st.dragging) return;
      const now = performance.now();
      const dt = Math.max(1, now - st.lastT) / 1000;
      const dx = e.clientX - st.lastX;
      const dy = e.clientY - st.lastY;
      st.yaw += dx * SENS;
      st.pitch = Math.max(-0.75, Math.min(0.75, st.pitch + dy * SENS));
      st.lastVel = (dx * SENS) / dt;
      st.lastX = e.clientX;
      st.lastY = e.clientY;
      st.lastT = now;
    };
    const onUp = (e) => {
      if (!st.dragging) return;
      st.dragging = false;
      // Hand momentum to the spin, clamped.
      st.vYaw = Math.max(-5, Math.min(5, st.lastVel));
      canvas.style.cursor = 'grab';
      canvas.releasePointerCapture?.(e.pointerId);
    };
    canvas.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);

    // ── Render loop ──
    let raf;
    let prev = performance.now();
    const draw = (now) => {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;

      if (!st.dragging) {
        // Ease velocity back to the gentle baseline → momentum then settle.
        st.vYaw += (BASE_SPIN - st.vYaw) * Math.min(1, dt * 2.2);
        st.yaw += st.vYaw * dt;
        // Gently return tilt toward base.
        st.pitch += (BASE_PITCH - st.pitch) * Math.min(1, dt * 0.6);
      }

      const w = st.w;
      const cx = w / 2;
      const cy = w / 2;
      const R = (w / 2) * 0.93;
      const cy_ = Math.cos(st.yaw);
      const sy_ = Math.sin(st.yaw);
      const ca = Math.cos(st.pitch);
      const sa = Math.sin(st.pitch);

      ctx.clearRect(0, 0, w, w);

      // Land dots
      for (let i = 0; i < landVecs.length; i++) {
        const v = landVecs[i];
        const x1 = v[0] * cy_ + v[2] * sy_;
        const z1 = -v[0] * sy_ + v[2] * cy_;
        const y1 = v[1];
        const z2 = y1 * sa + z1 * ca;
        if (z2 <= 0) continue; // back of sphere
        const y2 = y1 * ca - z1 * sa;
        const sx = cx + R * x1;
        const sy = cy - R * y2;
        const depth = z2; // 0 at limb → 1 at center
        const a = 0.12 + depth * 0.5;
        const s = 0.8 + depth * 1.0;
        ctx.fillStyle = `rgba(150,178,224,${a})`;
        ctx.fillRect(sx - s / 2, sy - s / 2, s, s);
      }

      // Project markers (rings + glowing core)
      for (let i = 0; i < markers.length; i++) {
        const m = markers[i];
        const v = m.v;
        const x1 = v[0] * cy_ + v[2] * sy_;
        const z1 = -v[0] * sy_ + v[2] * cy_;
        const y1 = v[1];
        const z2 = y1 * sa + z1 * ca;
        if (z2 <= 0.02) continue;
        const y2 = y1 * ca - z1 * sa;
        const sx = cx + R * x1;
        const sy = cy - R * y2;
        const depth = z2;
        const [r, g, b] = m.rgb;

        // Pulse ring
        const prog = ((now / 1500 + i * 0.13) % 1);
        const rr = 2 + prog * 13;
        ctx.beginPath();
        ctx.arc(sx, sy, rr, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${r},${g},${b},${(1 - prog) * 0.55 * depth})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Glowing core
        ctx.beginPath();
        ctx.arc(sx, sy, 1.6 + depth * 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${0.5 + depth * 0.5})`;
        ctx.shadowColor = `rgba(${r},${g},${b},0.9)`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      canvas.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ cursor: 'grab', touchAction: 'pan-y' }}
    />
  );
}
