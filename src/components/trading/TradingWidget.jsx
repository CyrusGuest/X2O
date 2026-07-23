import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight, Activity, Info } from 'lucide-react';
import Button from '../ui/Button';
import { cn, formatNumber } from '../../utils/cn';

const mockOrderBook = {
  buy: [
    { price: 2.45, amount: 15000, total: 36750 },
    { price: 2.44, amount: 8500, total: 20740 },
    { price: 2.43, amount: 12000, total: 29160 },
    { price: 2.42, amount: 5000, total: 12100 },
    { price: 2.41, amount: 9500, total: 22895 },
  ],
  sell: [
    { price: 2.46, amount: 10000, total: 24600 },
    { price: 2.47, amount: 7500, total: 18525 },
    { price: 2.48, amount: 13000, total: 32240 },
    { price: 2.49, amount: 6000, total: 14940 },
    { price: 2.50, amount: 11000, total: 27500 },
  ],
};

const recentTrades = [
  { time: '14:32:45', price: 2.45, amount: 500, type: 'buy' },
  { time: '14:32:12', price: 2.46, amount: 1200, type: 'sell' },
  { time: '14:31:58', price: 2.45, amount: 750, type: 'buy' },
  { time: '14:31:23', price: 2.44, amount: 2000, type: 'buy' },
  { time: '14:30:45', price: 2.46, amount: 800, type: 'sell' },
];

export default function TradingWidget({ project, variant = 'full' }) {
  const [orderType, setOrderType] = useState('buy');
  const [priceType, setPriceType] = useState('market');
  const [amount, setAmount] = useState('');
  const [limitPrice, setLimitPrice] = useState('');
  const [activeTab, setActiveTab] = useState('trade');

  const currentPrice = 2.45;
  const priceChange = 0.12;
  const priceChangePercent = 5.15;
  const volume24h = 1234567;
  const marketCap = project?.capitalNeeded || 5000000000;

  const handleTrade = () => {
    // Mock trade execution
    console.log(`Executing ${orderType} order:`, { amount, limitPrice, priceType });
  };

  if (variant === 'compact') {
    return (
      <div className="card p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            Trade {project?.tokenSymbol || 'TOKEN'}
          </h3>
          <span className={cn(
            'flex items-center gap-1 text-sm font-medium',
            priceChange > 0 ? 'text-status-live' : 'text-red-500'
          )}>
            {priceChange > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {priceChangePercent.toFixed(2)}%
          </span>
        </div>

        <div className="mb-4">
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">
            ${currentPrice.toFixed(2)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Vol: {formatNumber(volume24h * currentPrice)}
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant={orderType === 'buy' ? 'primary' : 'secondary'}
            onClick={() => setOrderType('buy')}
            className="flex-1 justify-center"
            size="sm"
          >
            Buy
          </Button>
          <Button
            variant={orderType === 'sell' ? 'primary' : 'secondary'}
            onClick={() => setOrderType('sell')}
            className="flex-1 justify-center"
            size="sm"
          >
            Sell
          </Button>
        </div>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="mt-3 w-full rounded-lg border border-gray-300 dark:border-line bg-white dark:bg-surface px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus-visible:border-primary"
        />

        <Button
          onClick={handleTrade}
          className={cn(
            'mt-3 w-full justify-center',
            orderType === 'sell' && 'bg-red-500 hover:bg-red-600'
          )}
        >
          {orderType === 'buy' ? 'Buy' : 'Sell'} {project?.tokenSymbol || 'TOKEN'}
        </Button>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div className="border-b border-line p-5">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {project?.tokenSymbol || 'TOKEN'} Trading
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {project?.name || 'Infrastructure Token'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              ${currentPrice.toFixed(2)}
            </p>
            <p className={cn(
              'flex items-center justify-end gap-1 text-sm font-medium',
              priceChange > 0 ? 'text-status-live' : 'text-red-500'
            )}>
              {priceChange > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              ${Math.abs(priceChange).toFixed(2)} ({priceChangePercent.toFixed(2)}%)
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-3 gap-4">
          <Stat label="Market Cap" value={formatNumber(marketCap)} />
          <Stat label="24h Volume" value={formatNumber(volume24h * currentPrice)} />
          <Stat label="Circulating" value="42.5M" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-line">
        {['trade', 'orderbook', 'history'].map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={cn(
              'flex-1 px-4 py-3 text-sm font-medium capitalize transition-colors',
              activeTab === t
                ? 'border-b-2 border-primary text-gray-900 dark:text-white'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:text-white'
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'trade' && (
          <motion.div
            key="trade"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-5"
          >
            {/* Order Type Toggle */}
            <div className="mb-4 flex gap-2">
              <button
                onClick={() => setOrderType('buy')}
                className={cn(
                  'flex-1 rounded-lg py-2.5 text-sm font-medium transition-colors',
                  orderType === 'buy'
                    ? 'bg-status-live/10 text-status-live'
                    : 'bg-gray-300 dark:bg-surface text-gray-600 dark:text-gray-300'
                )}
              >
                Buy
              </button>
              <button
                onClick={() => setOrderType('sell')}
                className={cn(
                  'flex-1 rounded-lg py-2.5 text-sm font-medium transition-colors',
                  orderType === 'sell'
                    ? 'bg-red-500/10 text-red-500'
                    : 'bg-gray-300 dark:bg-surface text-gray-600 dark:text-gray-300'
                )}
              >
                Sell
              </button>
            </div>

            {/* Price Type */}
            <div className="mb-4">
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Order Type
              </label>
              <div className="flex gap-2">
                {['market', 'limit'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setPriceType(t)}
                    className={cn(
                      'flex-1 rounded-lg border px-3 py-2 text-sm font-medium capitalize transition-colors',
                      priceType === t
                        ? 'border-primary bg-primary/5 text-gray-900 dark:text-white'
                        : 'border-line text-gray-600 dark:text-gray-300 hover:border-gray-600'
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs */}
            {priceType === 'limit' && (
              <div className="mb-4">
                <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Limit Price
                </label>
                <div className="relative">
                  <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                  <input
                    type="number"
                    value={limitPrice}
                    onChange={(e) => setLimitPrice(e.target.value)}
                    placeholder="0.00"
                    className="w-full rounded-lg border border-gray-300 dark:border-line bg-white dark:bg-surface py-2.5 pl-9 pr-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus-visible:border-primary"
                  />
                </div>
              </div>
            )}

            <div className="mb-4">
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className="w-full rounded-lg border border-gray-300 dark:border-line bg-white dark:bg-surface py-2.5 px-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus-visible:border-primary"
              />
              <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Available: 10,000 {orderType === 'buy' ? 'USDC' : project?.tokenSymbol || 'TOKEN'}</span>
                <button className="text-primary hover:text-primary-light">Max</button>
              </div>
            </div>

            {/* Summary */}
            {amount && (
              <div className="mb-4 rounded-lg bg-gray-100 dark:bg-surface p-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Total</span>
                  <span className="font-mono font-medium text-gray-900 dark:text-white">
                    ${(parseFloat(amount || 0) * (parseFloat(limitPrice) || currentPrice)).toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              onClick={handleTrade}
              className={cn(
                'w-full justify-center',
                orderType === 'sell' && 'bg-red-500 hover:bg-red-600'
              )}
            >
              {orderType === 'buy' ? 'Buy' : 'Sell'} {project?.tokenSymbol || 'TOKEN'}
            </Button>

            {/* Info */}
            <div className="mt-4 flex items-start gap-2 rounded-lg border border-primary/20 bg-primary/5 p-3">
              <Info size={16} className="mt-0.5 shrink-0 text-primary" />
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Trading fees: 0.25% • Settlement: T+0 • Min order: $100
              </p>
            </div>
          </motion.div>
        )}

        {activeTab === 'orderbook' && (
          <motion.div
            key="orderbook"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-5"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Buy Orders */}
              <div>
                <h4 className="mb-3 text-xs font-medium uppercase tracking-wide text-status-live">
                  Buy Orders
                </h4>
                <div className="space-y-1">
                  {mockOrderBook.buy.map((order, i) => (
                    <div key={i} className="flex justify-between text-xs">
                      <span className="font-mono text-gray-600 dark:text-gray-300">${order.price.toFixed(2)}</span>
                      <span className="font-mono text-gray-900 dark:text-white">{order.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sell Orders */}
              <div>
                <h4 className="mb-3 text-xs font-medium uppercase tracking-wide text-red-500">
                  Sell Orders
                </h4>
                <div className="space-y-1">
                  {mockOrderBook.sell.map((order, i) => (
                    <div key={i} className="flex justify-between text-xs">
                      <span className="font-mono text-gray-600 dark:text-gray-300">${order.price.toFixed(2)}</span>
                      <span className="font-mono text-gray-900 dark:text-white">{order.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Spread */}
            <div className="mt-4 rounded-lg bg-gray-100 dark:bg-surface p-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400">Spread</span>
                <span className="font-mono font-medium text-gray-900 dark:text-white">
                  $0.01 (0.41%)
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'history' && (
          <motion.div
            key="history"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-5"
          >
            <h4 className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Recent Trades
            </h4>
            <div className="space-y-2">
              {recentTrades.map((trade, i) => (
                <div key={i} className="flex items-center justify-between border-b border-line pb-2 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 dark:text-gray-400">{trade.time}</span>
                    <span className={cn(
                      'text-xs font-medium',
                      trade.type === 'buy' ? 'text-status-live' : 'text-red-500'
                    )}>
                      {trade.type.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-xs text-gray-900 dark:text-white">
                      ${trade.price.toFixed(2)}
                    </p>
                    <p className="font-mono text-xs text-gray-500 dark:text-gray-400">
                      {trade.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <p className="mt-0.5 font-mono text-sm font-medium text-gray-900 dark:text-white">{value}</p>
    </div>
  );
}