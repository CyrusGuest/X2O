import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle, ArrowRightLeft, Info } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { cn } from '../../utils/cn';
import { getRPCEndpoint, TOKEN_MINTS, JUPITER_CONFIG } from '../../config/solana';

export default function JupiterSwap({
  variant = 'default',
  defaultInputMint = TOKEN_MINTS.USDC, // Default base token (USDC)
  defaultOutputMint = TOKEN_MINTS.X2O, // Default quote token (X2O)
  fixedOutputMint = false,
  className = ''
}) {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jupiterReady, setJupiterReady] = useState(false);
  const initRef = useRef(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Only initialize once
    if (initRef.current) return;

    const initializeJupiter = async () => {
      try {
        setLoading(true);
        setError(null);

        // Wait for Jupiter script to load
        let attempts = 0;
        while (!window.Jupiter && attempts < 50) {
          await new Promise(resolve => setTimeout(resolve, 100));
          attempts++;
        }

        if (!window.Jupiter) {
          throw new Error('Jupiter Terminal failed to load. Please refresh the page.');
        }

        // CRITICAL: Wait for the container element to be rendered
        let containerAttempts = 0;
        while (!document.getElementById('jupiter-swap-container') && containerAttempts < 30) {
          await new Promise(resolve => setTimeout(resolve, 100));
          containerAttempts++;
        }

        if (!document.getElementById('jupiter-swap-container')) {
          throw new Error('Jupiter Terminal: document.getElementById cannot find jupiter-swap-container');
        }

        // Close any existing instance
        if (window.Jupiter._instance) {
          try {
            window.Jupiter.close();
          } catch (e) {
            console.warn('Could not close existing Jupiter instance:', e);
          }
        }

        // Small delay to ensure DOM is fully ready
        await new Promise(resolve => setTimeout(resolve, 100));

        // Configure Jupiter Plugin
        await window.Jupiter.init({
          displayMode: 'integrated',
          integratedTargetId: 'jupiter-swap-container',

          // Form configuration with token addresses
          formProps: {
            initialInputMint: defaultInputMint,
            initialOutputMint: defaultOutputMint,
            fixedMint: fixedOutputMint ? defaultOutputMint : undefined,
            swapMode: 'ExactIn',
          },

          // Explorer preference
          defaultExplorer: 'Solscan',

          // Success/Error handlers
          onSuccess: ({ txid }) => {
            console.log('Swap successful:', txid);
          },
          onSwapError: ({ error }) => {
            console.error('Swap error:', error);
          },
        });

        setJupiterReady(true);
        setLoading(false);
      } catch (err) {
        console.error('Failed to initialize Jupiter:', err);
        setError(err.message || 'Failed to initialize swap interface');
        setLoading(false);
      }
    };

    // Delay initialization to ensure component is mounted
    const timer = setTimeout(() => {
      initRef.current = true;
      initializeJupiter();
    }, 500); // Give React time to render the container

    // Cleanup on unmount
    return () => {
      clearTimeout(timer);
      if (window.Jupiter && window.Jupiter._instance) {
        try {
          window.Jupiter.close();
        } catch (e) {
          console.error('Error closing Jupiter:', e);
        }
      }
    };
  }, [defaultInputMint, defaultOutputMint, fixedOutputMint, theme, variant]);

  // Inject custom styles for Jupiter Terminal
  useEffect(() => {
    if (!jupiterReady) return;

    const style = document.createElement('style');
    style.textContent = `
      /* Dark theme overrides */
      .jupiter-dark {
        --jupiter-primary: #4A90E2;
        --jupiter-bg: #0a0b0d;
        --jupiter-bg-secondary: #13151a;
        --jupiter-border: #1e2127;
        --jupiter-text: #ffffff;
        --jupiter-text-secondary: #94a3b8;
      }

      /* Light theme overrides */
      .jupiter-light {
        --jupiter-primary: #4A90E2;
        --jupiter-bg: #ffffff;
        --jupiter-bg-secondary: #f8fafc;
        --jupiter-border: #e2e8f0;
        --jupiter-text: #0f172a;
        --jupiter-text-secondary: #64748b;
      }

      /* Additional styling to match X2O design */
      #jupiter-swap-container > div {
        background: var(--jupiter-bg) !important;
        color: var(--jupiter-text) !important;
        font-family: 'Geist', system-ui, sans-serif !important;
      }

      #jupiter-swap-container input {
        font-family: 'Geist Mono', monospace !important;
      }

      /* Smooth transitions */
      #jupiter-swap-container * {
        transition-property: background-color, border-color, color;
        transition-duration: 200ms;
      }

      /* Hide Jupiter branding if needed */
      #jupiter-swap-container [aria-label="Powered by Jupiter"] {
        opacity: 0.5;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [jupiterReady, theme]);

  return (
    <div className={cn('relative', className)}>
      {/* Header info */}
      {variant === 'default' && (
        <div className="mb-4 rounded-xl border border-line bg-white dark:bg-surface/50 p-4">
          <div className="flex items-start gap-3">
            <ArrowRightLeft size={20} className="mt-0.5 text-primary" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Decentralized Token Swap
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                Powered by Jupiter - Solana's leading DEX aggregator for best prices
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Always render the container div - Jupiter needs this */}
      <div className="relative">
        {/* Loading state overlay */}
        {loading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl border border-line bg-white dark:bg-surface">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <Loader2 size={32} className="text-primary" />
            </motion.div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
              Loading swap interface...
            </p>
          </div>
        )}

        {/* Error state overlay */}
        {error && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl border border-red-500/20 bg-red-50 dark:bg-red-500/10 p-8">
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className="mt-0.5 text-red-500" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Unable to load swap interface
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  {error}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-3 text-sm font-medium text-primary hover:text-primary-light"
                >
                  Refresh page to try again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Jupiter Terminal Container - ALWAYS RENDERED */}
        <div
          id="jupiter-swap-container"
          ref={containerRef}
          className={cn(
            'min-h-[400px] rounded-xl',
            (loading || error) && 'opacity-0 pointer-events-none'
          )}
          style={{ minHeight: loading || error ? '400px' : undefined }}
        />
      </div>

      {/* Additional info */}
      {variant === 'default' && !error && (
        <div className="mt-4 flex items-start gap-2 rounded-lg border border-primary/20 bg-primary/5 p-3">
          <Info size={16} className="mt-0.5 shrink-0 text-primary" />
          <p className="text-xs text-gray-600 dark:text-gray-300">
            Connect your Solana wallet to start swapping. Jupiter aggregates liquidity from all major DEXs
            to ensure you get the best price with MEV protection.
          </p>
        </div>
      )}
    </div>
  );
}