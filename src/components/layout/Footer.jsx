import { Link } from 'react-router-dom';
import { GitBranch, MessageCircle, Send } from 'lucide-react';
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
      { name: 'Status', href: '/' },
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
            <div className="mt-6 flex items-center gap-3">
              {[GitBranch, MessageCircle, Send].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-gray-300 transition-colors hover:border-gray-600 hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
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
