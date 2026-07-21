import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import Logo from './Logo';

const columns = [
  {
    title: 'Platform',
    links: [
      { name: 'Marketplace', href: '/marketplace' },
      { name: 'Infrastructure Map', href: '/map' },
      { name: 'Intelligence', href: '/#intelligence' },
      { name: 'Categories', href: '/#categories' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'Vision', href: '/#problem' },
      { name: 'Business Model', href: '/#business' },
      { name: 'Endorsements', href: '/endorsements' },
      { name: 'Early Access', href: '/marketplace' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Documentation', href: '/' },
      { name: 'API Access', href: '/' },
      { name: 'Compliance', href: '/' },
      { name: 'Contact Support', href: 'mailto:support@xsolut.ai' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-canvas">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-300">
              The world's largest tokenized marketplace accelerating the future of AI
              infrastructure — the coordination layer helping capital, builders, utilities
              and governments work together.
            </p>
            <div className="mt-4">
              <a
                href="mailto:support@xsolut.ai"
                className="inline-flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-white"
              >
                <Mail size={14} />
                support@xsolut.ai
              </a>
            </div>
            <div className="mt-6 flex items-center gap-3">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/1MeH5vsb2f/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-gray-300 transition-colors hover:border-gray-600 hover:text-white"
                aria-label="Facebook"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://www.instagram.com/XSolutAI"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-gray-300 transition-colors hover:border-gray-600 hover:text-white"
                aria-label="Instagram"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
                </svg>
              </a>
              {/* Twitter/X */}
              <a
                href="https://twitter.com/XSolutAI"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-gray-300 transition-colors hover:border-gray-600 hover:text-white"
                aria-label="Twitter/X"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[13px] font-medium text-white">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-[13px] text-gray-300 transition-colors hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 space-y-4 border-t border-line pt-8">
          <p className="max-w-3xl text-xs leading-relaxed text-gray-500">
            XSolut is an infrastructure marketplace and intelligence platform. Tokenization
            provides a secure digital representation of real-world infrastructure records.
            Any investment-related functionality would require appropriate legal and
            regulatory compliance. Metrics shown are illustrative demo data.
          </p>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-[13px] text-gray-400">© 2026 XSolut. All rights reserved.</p>
            <div className="flex items-center gap-2 text-[13px] text-gray-400">
              <span className="h-1.5 w-1.5 rounded-full bg-status-live" />
              All systems operational
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
