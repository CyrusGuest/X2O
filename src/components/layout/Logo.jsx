import { Link } from 'react-router-dom';

export default function Logo({ withText = true }) {
  return (
    <Link to="/" className="group flex items-center gap-2.5">
      {/* XSolut mark — interlocking X built from two chevrons */}
      <span className="relative flex h-7 w-7 items-center justify-center">
        <svg
          width="26"
          height="26"
          viewBox="0 0 28 28"
          fill="none"
          className="transition-transform duration-300 group-hover:scale-105"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="xs-mark" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffffff" />
              <stop offset="1" stopColor="#8f8f8f" />
            </linearGradient>
          </defs>
          <path
            d="M4 3.5h5.4L14 10.2 18.6 3.5H24l-7.2 10.5L24 24.5h-5.4L14 17.8 9.4 24.5H4l7.2-10.5L4 3.5Z"
            fill="url(#xs-mark)"
          />
        </svg>
      </span>
      {withText && (
        <span className="text-[17px] font-semibold tracking-tight text-white">XSolut</span>
      )}
    </Link>
  );
}
