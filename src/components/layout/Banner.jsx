import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

export default function Banner() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Calculate date 10 days from now at 5pm PDT
      const now = new Date();
      const targetDate = new Date(now);
      targetDate.setDate(now.getDate() + 10);

      // Set to 5pm PDT (17:00)
      // PDT is UTC-7
      targetDate.setHours(17, 0, 0, 0);

      // Convert to PDT timezone
      const pdt = new Date(targetDate.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));

      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative z-[60] border-b border-gray-200 bg-white/60 backdrop-blur-md dark:border-line dark:bg-surface/60">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,114,245,0.12),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(0,114,245,0.12),transparent_70%)]" />
      <div className="relative mx-auto flex max-w-[1400px] flex-col items-center justify-center gap-x-3 gap-y-0.5 px-4 py-2 text-center sm:flex-row sm:px-6 lg:px-8">
        <span className="flex items-center gap-2 text-[13px] font-medium text-gray-900 dark:text-white">
          <Sparkles size={13} className="text-primary-light" />
          Pay Attention! 10 Days Left to Enter the $100,000 Airdrop!
        </span>
        <span className="hidden h-3 w-px bg-gray-300 dark:bg-line sm:block" />
        <span className="flex items-center gap-1.5 text-[12px] font-mono text-gray-600 dark:text-gray-400">
          <span className="font-semibold">{timeLeft.days}d</span>
          <span>:</span>
          <span className="font-semibold">{String(timeLeft.hours).padStart(2, '0')}h</span>
          <span>:</span>
          <span className="font-semibold">{String(timeLeft.minutes).padStart(2, '0')}m</span>
          <span>:</span>
          <span className="font-semibold">{String(timeLeft.seconds).padStart(2, '0')}s</span>
        </span>
      </div>
    </div>
  );
}
