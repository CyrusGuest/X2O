import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, MapPin, Zap, ChevronRight, Server } from 'lucide-react';
import projects from '../data/projects.json';
import CategoryIcon from './ui/CategoryIcon';
import { cn } from '../utils/cn';

export default function SearchModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Filter projects based on search query
  const filteredProjects = useMemo(() => {
    if (!query.trim()) {
      // Show recent or featured projects when no query
      return projects.slice(0, 5);
    }

    const q = query.toLowerCase();
    return projects.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.city.toLowerCase().includes(q) ||
      p.state.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.developer?.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [query]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredProjects.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredProjects[selectedIndex]) {
          handleSelectProject(filteredProjects[selectedIndex]);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredProjects, onClose]);

  const handleSelectProject = (project) => {
    navigate(`/project/${project.id}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-[10%] z-50 mx-auto max-w-2xl"
          >
            <div className="overflow-hidden rounded-2xl border border-line bg-canvas shadow-2xl">
              {/* Search Header */}
              <div className="relative border-b border-line">
                <Search
                  size={20}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search infrastructure projects..."
                  className="w-full bg-transparent py-5 pl-14 pr-14 text-lg text-white placeholder-gray-500 focus:outline-none"
                />
                <button
                  onClick={onClose}
                  className="absolute right-5 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-400 hover:bg-surface hover:text-white"
                  aria-label="Close search"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {filteredProjects.length > 0 ? (
                  <div className="p-2">
                    {!query && (
                      <p className="mb-2 px-3 py-2 text-xs font-medium uppercase tracking-widest text-gray-500">
                        Featured Projects
                      </p>
                    )}
                    {filteredProjects.map((project, index) => (
                      <button
                        key={project.id}
                        onClick={() => handleSelectProject(project)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={cn(
                          "group flex w-full items-center gap-4 rounded-lg px-3 py-3 text-left transition-colors",
                          selectedIndex === index
                            ? "bg-surface/80 text-white"
                            : "text-gray-300 hover:bg-surface/50 hover:text-white"
                        )}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface/80">
                          <CategoryIcon category={project.category} className="h-5 w-5" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium truncate">{project.name}</span>
                            {project.constructionStatus === 'Operational' && (
                              <span className="h-1.5 w-1.5 rounded-full bg-status-live" />
                            )}
                          </div>
                          <div className="mt-0.5 flex items-center gap-3 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                              <MapPin size={12} />
                              {project.city}, {project.stateCode}
                            </span>
                            <span className="flex items-center gap-1">
                              <Zap size={12} />
                              {project.powerCapacityMw} MW
                            </span>
                            <span className="flex items-center gap-1">
                              <Server size={12} />
                              {project.constructionStatus}
                            </span>
                          </div>
                        </div>

                        <ChevronRight
                          size={16}
                          className={cn(
                            "text-gray-500 transition-transform",
                            selectedIndex === index && "translate-x-1"
                          )}
                        />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <Server size={48} className="mb-4 text-gray-600" />
                    <p className="text-lg font-medium text-gray-400">No projects found</p>
                    <p className="mt-1 text-sm text-gray-500">
                      Try searching for a different location or project name
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-line px-5 py-3">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <kbd className="rounded border border-line bg-surface px-1.5 py-0.5 font-mono">↑</kbd>
                      <kbd className="rounded border border-line bg-surface px-1.5 py-0.5 font-mono">↓</kbd>
                      Navigate
                    </span>
                    <span className="flex items-center gap-1.5">
                      <kbd className="rounded border border-line bg-surface px-1.5 py-0.5 font-mono">↵</kbd>
                      Select
                    </span>
                    <span className="flex items-center gap-1.5">
                      <kbd className="rounded border border-line bg-surface px-1.5 py-0.5 font-mono">esc</kbd>
                      Close
                    </span>
                  </div>
                  <span>{filteredProjects.length} results</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}