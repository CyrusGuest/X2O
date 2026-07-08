import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, TrendingUp, TrendingDown, Building2, Filter, X, ChevronDown } from 'lucide-react';
import { containerVariants, itemVariants, fadeUpVariants } from '../animations/variants';
import DataCenterCard from '../components/ui/DataCenterCard';
import Badge from '../components/ui/Badge';
import WorldMap from '../components/sections/WorldMap';
import datacenters from '../data/datacenters.json';
import { formatNumber } from '../utils/cn';

export default function GlobalMap() {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('tvl');
  const [selectedCountry, setSelectedCountry] = useState(null);

  const filteredDatacenters = datacenters
    .filter(dc => filter === 'all' || dc.status === filter)
    .filter(dc => !selectedCountry || dc.countryCode === selectedCountry)
    .sort((a, b) => {
      if (sortBy === 'tvl') return b.tvl - a.tvl;
      if (sortBy === 'apy') return b.apy - a.apy;
      return 0;
    });

  const statusCounts = {
    all: datacenters.length,
    live: datacenters.filter(dc => dc.status === 'live').length,
    building: datacenters.filter(dc => dc.status === 'building').length,
    upcoming: datacenters.filter(dc => dc.status === 'upcoming').length,
  };

  // Calculate country statistics
  const countryStats = datacenters.reduce((acc, dc) => {
    if (!acc[dc.country]) {
      acc[dc.country] = { count: 0, tvl: 0, code: dc.countryCode };
    }
    acc[dc.country].count++;
    acc[dc.country].tvl += dc.tvl;
    return acc;
  }, {});

  const topCountries = Object.entries(countryStats)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5);

  // Global stats
  const totalTVL = datacenters.reduce((sum, dc) => sum + dc.tvl, 0);
  const avgAPY = (datacenters.reduce((sum, dc) => sum + dc.apy, 0) / datacenters.length).toFixed(1);
  const totalCountries = Object.keys(countryStats).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        className="bg-white border-b border-gray-200 px-12 py-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Global Data Center Network</h1>
              <p className="text-gray-600">Real-time overview of tokenized AI infrastructure worldwide</p>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-6">
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1">Total TVL</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(totalTVL)}</p>
                <p className="text-xs text-status-live font-medium">+8.2%</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1">Avg APY</p>
                <p className="text-2xl font-bold text-primary">{avgAPY}%</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1">Countries</p>
                <p className="text-2xl font-bold text-gray-900">{totalCountries}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-12 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Sidebar - Stats & Filters */}
          <div className="col-span-3 space-y-6">
            {/* Status Breakdown */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-6 shadow-card"
            >
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Filter size={16} />
                Status Filter
              </h3>

              <div className="space-y-2">
                {['all', 'live', 'building', 'upcoming'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                      filter === status
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium capitalize">{status}</span>
                      <span className="text-sm font-semibold">{statusCounts[status]}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Top Countries */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-card"
            >
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin size={16} />
                Top Countries
              </h3>

              <div className="space-y-3">
                {topCountries.map(([country, data], index) => (
                  <button
                    key={country}
                    onClick={() => setSelectedCountry(selectedCountry === data.code ? null : data.code)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedCountry === data.code
                        ? 'bg-primary-light border border-primary'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900">{country}</span>
                      <span className="text-xs font-semibold bg-gray-200 px-2 py-1 rounded">
                        {data.count}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{formatNumber(data.tvl)} TVL</p>
                  </button>
                ))}
              </div>

              {selectedCountry && (
                <button
                  onClick={() => setSelectedCountry(null)}
                  className="w-full mt-3 text-sm text-primary hover:text-primary-dark font-medium flex items-center justify-center gap-1"
                >
                  <X size={14} />
                  Clear Filter
                </button>
              )}
            </motion.div>

            {/* Performance Metrics */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-card"
            >
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Performance</h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-500">Total Investments</span>
                    <TrendingUp size={14} className="text-status-live" />
                  </div>
                  <p className="text-xl font-bold text-gray-900">{formatNumber(totalTVL * 0.65)}</p>
                  <div className="mt-2 w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-status-live rounded-full h-2" style={{ width: '65%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-500">Active Investors</span>
                    <TrendingUp size={14} className="text-primary" />
                  </div>
                  <p className="text-xl font-bold text-gray-900">24.8K</p>
                  <p className="text-xs text-status-live font-medium mt-1">+12.4% this month</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-500">Monthly Revenue</span>
                    <TrendingDown size={14} className="text-gray-400" />
                  </div>
                  <p className="text-xl font-bold text-gray-900">$18.6M</p>
                  <p className="text-xs text-gray-400 font-medium mt-1">-2.1% this month</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            {/* Map Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-card mb-8 overflow-hidden"
            >
              {/* World Map */}
              <div className="relative">
                <WorldMap datacenters={filteredDatacenters} />

                {/* Map Legend */}
                <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg z-10">
                  <p className="text-xs font-semibold text-gray-900 mb-3">Status</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-status-live"></div>
                      <span className="text-xs text-gray-600">Live ({statusCounts.live})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-status-building"></div>
                      <span className="text-xs text-gray-600">Building ({statusCounts.building})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-status-upcoming"></div>
                      <span className="text-xs text-gray-600">Upcoming ({statusCounts.upcoming})</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Stats Bar */}
              <div className="bg-gray-50 border-t border-gray-200 px-8 py-4">
                <div className="grid grid-cols-4 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                      <Building2 size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Active Centers</p>
                      <p className="text-lg font-bold text-gray-900">{statusCounts.live}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-status-live/10 rounded-lg flex items-center justify-center">
                      <TrendingUp size={20} className="text-status-live" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Avg Growth</p>
                      <p className="text-lg font-bold text-status-live">+16.2%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-status-upcoming/10 rounded-lg flex items-center justify-center">
                      <MapPin size={20} className="text-status-upcoming" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Locations</p>
                      <p className="text-lg font-bold text-gray-900">{totalCountries}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <ChevronDown size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Total Capacity</p>
                      <p className="text-lg font-bold text-gray-900">2.4 EH/s</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Sorting & Results */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">{filteredDatacenters.length}</span> data centers
                {selectedCountry && ' in selected country'}
              </p>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-primary-light hover:border-gray-300 transition-colors"
              >
                <option value="tvl">Sort by TVL</option>
                <option value="apy">Sort by APY</option>
              </select>
            </div>

            {/* Data Centers Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${filter}-${selectedCountry}-${sortBy}`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid grid-cols-2 gap-6"
              >
                {filteredDatacenters.map((datacenter) => (
                  <motion.div key={datacenter.id} variants={itemVariants} layout>
                    <DataCenterCard datacenter={datacenter} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredDatacenters.length === 0 && (
              <div className="text-center py-16">
                <Building2 size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No data centers found with current filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
