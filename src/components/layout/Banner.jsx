import { Sparkles } from 'lucide-react';

export default function Banner() {
  return (
    <div className="relative z-[60] border-b border-line bg-surface/60 backdrop-blur-md">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,114,245,0.12),transparent_70%)]" />
      <div className="relative mx-auto flex max-w-[1400px] flex-col items-center justify-center gap-x-3 gap-y-0.5 px-4 py-2 text-center sm:flex-row sm:px-6 lg:px-8">
        <span className="flex items-center gap-2 text-[13px] font-medium text-white">
          <Sparkles size={13} className="text-primary-light" />
          The fastest-growing marketplace for AI infrastructure
        </span>
        <span className="hidden h-3 w-px bg-line sm:block" />
        <span className="text-[12px] text-gray-400">
          Proof of concept — a live demonstration of the technology we're building.
        </span>
      </div>
    </div>
  );
}
