import { cn } from '../../utils/cn';

export default function Badge({ status, className }) {
  const statusStyles = {
    live: 'bg-status-live text-white',
    building: 'bg-status-building text-white',
    upcoming: 'bg-status-upcoming text-white',
  };

  const statusText = {
    live: 'Live',
    building: 'Building',
    upcoming: 'Upcoming',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold',
        statusStyles[status],
        status === 'live' && 'animate-pulse-slow',
        className
      )}
    >
      {status === 'live' && (
        <span className="w-2 h-2 bg-white rounded-full animate-ping-slow" />
      )}
      {statusText[status]}
    </span>
  );
}
