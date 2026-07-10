import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Menu, X } from 'lucide-react';
import { cn } from '../../utils/cn';
import Button from '../ui/Button';
import Logo from './Logo';

const navigation = [
  { name: 'Marketplace', href: '/marketplace' },
  { name: 'Infrastructure Map', href: '/map' },
  { name: 'Token', href: '/token' },
  { name: 'Intelligence', hash: '#intelligence' },
  { name: 'Categories', hash: '#categories' },
];

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (href) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  const handleHash = (e, hash) => {
    const el = document.querySelector(hash);
    if (el && location.pathname === '/') {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-colors duration-300',
        scrolled
          ? 'border-line bg-canvas/80 backdrop-blur-xl'
          : 'border-transparent bg-canvas/30 backdrop-blur-md'
      )}
    >
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Logo />

        <div className="hidden items-center gap-1 md:flex">
          {navigation.map((item) =>
            item.hash ? (
              <a
                key={item.name}
                href={`/${item.hash}`}
                onClick={(e) => handleHash(e, item.hash)}
                className="rounded-md px-3 py-2 text-sm text-gray-300 transition-colors hover:text-white"
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'relative rounded-md px-3 py-2 text-sm transition-colors',
                  isActive(item.href) ? 'text-white' : 'text-gray-300 hover:text-white'
                )}
              >
                {item.name}
                {isActive(item.href) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-[17px] h-px bg-white"
                  />
                )}
              </Link>
            )
          )}
        </div>

        <div className="flex flex-1 items-center justify-end gap-3">
          {/* Tagline slid to the right to balance the wordmark on the left */}
          <span className="hidden items-center gap-3 xl:flex">
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-gray-500">
              Infrastructure
            </span>
            <span className="h-4 w-px bg-line" />
          </span>

          <button className="hidden items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-sm text-gray-400 transition-colors hover:border-gray-600 hover:text-gray-200 lg:flex">
            <Search size={15} />
            <span>Search infrastructure…</span>
            <kbd className="ml-3 rounded border border-line bg-canvas px-1.5 py-0.5 font-mono text-[11px] text-gray-400">
              ⌘K
            </kbd>
          </button>

          <Link to="/marketplace" className="hidden sm:block">
            <Button variant="ghost" size="md">
              Sign in
            </Button>
          </Link>
          <Link to="/marketplace" className="hidden sm:block">
            <Button size="md">
              Join Early Access
              <ArrowRight size={15} />
            </Button>
          </Link>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-line text-gray-200 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-line bg-canvas md:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {navigation.map((item) =>
                item.hash ? (
                  <a
                    key={item.name}
                    href={`/${item.hash}`}
                    onClick={(e) => handleHash(e, item.hash)}
                    className="block rounded-lg px-3 py-2.5 text-sm text-gray-300 hover:bg-surface hover:text-white"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block rounded-lg px-3 py-2.5 text-sm text-gray-300 hover:bg-surface hover:text-white"
                  >
                    {item.name}
                  </Link>
                )
              )}
              <div className="mt-4 space-y-2 border-t border-line pt-4">
                <Link to="/marketplace">
                  <Button variant="ghost" className="w-full justify-center">
                    Sign in
                  </Button>
                </Link>
                <Link to="/marketplace">
                  <Button className="w-full justify-center">
                    Join Early Access
                    <ArrowRight size={15} />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
