import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const CATS = ['Power', 'Cooling', 'Fiber', 'Data', 'Compute', 'Supplier'];
const MAX = 26;

let uid = 0;
const rand = (a, b) => a + Math.random() * (b - a);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

function seed() {
  const arr = [];
  for (let i = 0; i < 6; i++) {
    const ang = (i / 6) * Math.PI * 2;
    arr.push({
      id: ++uid,
      x: 50 + Math.cos(ang) * 15,
      y: 50 + Math.sin(ang) * 15,
      px: 50,
      py: 50,
      cat: CATS[i % CATS.length],
    });
  }
  return arr;
}

export default function LivingNetwork() {
  const [nodes, setNodes] = useState(seed);
  const [pulses, setPulses] = useState([]);
  const [added, setAdded] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setNodes((prev) => {
        const base = prev.length >= MAX ? prev.slice(prev.length - (MAX - 8)) : prev;
        const parent = base[Math.floor(Math.random() * base.length)] || { x: 50, y: 50 };
        const ang = rand(0, Math.PI * 2);
        const r = rand(9, 20);
        return [
          ...base,
          {
            id: ++uid,
            x: clamp(parent.x + Math.cos(ang) * r, 7, 93),
            y: clamp(parent.y + Math.sin(ang) * r, 9, 91),
            px: parent.x,
            py: parent.y,
            cat: CATS[Math.floor(Math.random() * CATS.length)],
          },
        ];
      });
      const pid = ++uid;
      setPulses((p) => [...p, pid]);
      setAdded((a) => a + 1);
    }, 1700);
    return () => clearInterval(iv);
  }, []);

  const removePulse = (id) => setPulses((p) => p.filter((x) => x !== id));

  const projects = nodes.length;
  const connections = nodes.length;
  const suppliers = 5100 + added * 7;
  const flows = connections * 3;

  return (
    <div>
      <div className="relative h-[460px] w-full overflow-hidden rounded-2xl border border-line bg-canvas sm:h-[520px]">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,114,245,0.14),transparent_65%)]" />

        {/* Live badge */}
        <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1 text-[11px] font-medium text-gray-200 backdrop-blur-sm">
          <span className="flex h-1.5 w-1.5 animate-pulse rounded-full bg-status-live" />
          Network growing — live
        </div>

        {/* Edges + data flows */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {nodes.map((n) => (
            <motion.line
              key={`e-${n.id}`}
              x1={n.px}
              y1={n.py}
              x2={n.x}
              y2={n.y}
              stroke="rgba(50,145,255,0.32)"
              strokeWidth="0.25"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          ))}
          {nodes.map((n) => (
            <motion.circle
              key={`f-${n.id}`}
              r="0.55"
              fill="#a9cdff"
              animate={{ cx: [n.px, n.x], cy: [n.py, n.y], opacity: [0, 1, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: (n.id % 6) * 0.35 }}
            />
          ))}
        </svg>

        {/* Nodes */}
        {nodes.map((n) => (
          <div
            key={`n-${n.id}`}
            className="absolute"
            style={{ left: `${n.x}%`, top: `${n.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 15 }}
              className="block h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(50,145,255,0.9)]"
            />
          </div>
        ))}

        {/* Central token + pulse rings */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {pulses.map((id) => (
            <motion.span
              key={id}
              className="absolute left-1/2 top-1/2 rounded-full border border-primary-light/50"
              initial={{ width: 24, height: 24, x: '-50%', y: '-50%', opacity: 0.55 }}
              animate={{ width: 260, height: 260, x: '-50%', y: '-50%', opacity: 0 }}
              transition={{ duration: 1.9, ease: 'easeOut' }}
              onAnimationComplete={() => removePulse(id)}
            />
          ))}
          <motion.div
            className="relative flex h-16 w-16 items-center justify-center rounded-full"
            style={{
              background:
                'radial-gradient(circle at 40% 35%, #eaf3ff 0%, #58a6ff 32%, #0a4fb0 68%, #06264f 100%)',
            }}
            animate={{
              boxShadow: [
                '0 0 24px rgba(50,145,255,0.5), inset 0 0 14px rgba(255,255,255,0.5)',
                '0 0 46px rgba(50,145,255,0.85), inset 0 0 18px rgba(255,255,255,0.65)',
                '0 0 24px rgba(50,145,255,0.5), inset 0 0 14px rgba(255,255,255,0.5)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <path
                d="M4 3.5h5.4L14 10.2 18.6 3.5H24l-7.2 10.5L24 24.5h-5.4L14 17.8 9.4 24.5H4l7.2-10.5L4 3.5Z"
                fill="rgba(255,255,255,0.95)"
              />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Live counters */}
      <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
        <LiveStat value={projects} label="Active projects" />
        <LiveStat value={connections} label="Connections" />
        <LiveStat value={suppliers} label="Suppliers" />
        <LiveStat value={flows} label="Data flows / min" />
      </div>
    </div>
  );
}

function LiveStat({ value, label }) {
  const spring = useSpring(value, { stiffness: 60, damping: 18 });
  const text = useTransform(spring, (v) => Math.round(v).toLocaleString());
  useEffect(() => {
    spring.set(value);
  }, [value, spring]);
  return (
    <div className="bg-canvas px-5 py-5">
      <motion.p className="font-mono text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{text}</motion.p>
      <p className="mt-1 text-[13px] text-gray-400">{label}</p>
    </div>
  );
}
