import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Droplet, Recycle, Cloud, Heart, BarChart3, DollarSign, Star, TrendingUp, TrendingDown, Activity, Server, Zap, Shield, Clock, Users, Award, AlertCircle, Cpu, HardDrive, Wifi } from 'lucide-react';
import { fadeUpVariants, containerVariants, itemVariants } from '../animations/variants';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import datacenters from '../data/datacenters.json';
import { formatNumber, formatMetric } from '../utils/cn';

export default function DataCenterDetail() {
  const { id } = useParams();
  const datacenter = datacenters.find(dc => dc.id === id);

  if (!datacenter) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Datacenter not found</h1>
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="px-12 py-6 bg-white border-b border-gray-200">
        <Link to="/" className="text-primary hover:text-primary-dark flex items-center gap-2 text-sm font-medium">
          <ArrowLeft size={16} />
          Back to All Data Centers
        </Link>
      </div>

      {/* Hero Section with Image and Quick Stats */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative"
      >
        {/* Hero Image */}
        <div className="relative h-[500px] bg-gray-900">
          <img
            src={datacenter.image}
            alt={datacenter.name}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

          {/* Overlay Content */}
          <div className="absolute bottom-0 left-0 right-0 px-12 pb-12">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-start justify-between">
                <div>
                  <Badge status={datacenter.status} />
                  <h1 className="text-6xl font-bold text-white mb-3 mt-4">{datacenter.name}</h1>
                  <p className="text-2xl text-gray-300 flex items-center gap-2">
                    <MapPin size={24} />
                    {datacenter.location}
                  </p>
                </div>

                {/* Quick Stats Cards */}
                <div className="flex gap-4">
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 min-w-[180px]">
                    <p className="text-sm text-gray-500 mb-1">Total Value Locked</p>
                    <p className="text-3xl font-bold text-gray-900">{formatNumber(datacenter.tvl)}</p>
                    <div className="flex items-center gap-1 mt-2 text-status-live">
                      <TrendingUp size={14} />
                      <span className="text-sm font-medium">+{datacenter.apy}% APY</span>
                    </div>
                  </div>
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 min-w-[180px]">
                    <p className="text-sm text-gray-500 mb-1">Token Price</p>
                    <p className="text-3xl font-bold text-gray-900">${datacenter.tokenPrice}</p>
                    <div className="flex items-center gap-1 mt-2 text-status-live">
                      <TrendingUp size={14} />
                      <span className="text-sm font-medium">+12.4%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="px-12 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-8">
            {/* Left Column - Main Content */}
            <div className="col-span-8 space-y-8">
              {/* Overview Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-8 shadow-card"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed">
                    {datacenter.name} is a state-of-the-art AI infrastructure facility located in {datacenter.location}.
                    This cutting-edge datacenter provides high-performance computing resources for artificial intelligence
                    workloads, offering investors tokenized ownership in real-world AI infrastructure.
                  </p>
                  <p className="leading-relaxed">
                    With a current TVL of {formatNumber(datacenter.tvl)} and an attractive APY of {datacenter.apy}%,
                    this facility represents a compelling opportunity for investors seeking exposure to the rapidly
                    growing AI economy through tokenized real-world assets.
                  </p>
                </div>
              </motion.div>

              {/* Infrastructure Specifications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-card"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Server size={28} className="text-primary" />
                  Infrastructure Specifications
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Cpu size={24} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">GPU Capacity</p>
                      <p className="text-xl font-bold text-gray-900">{formatNumber(datacenter.infrastructure.gpuCount)} {datacenter.infrastructure.gpuModel}</p>
                      <p className="text-xs text-gray-500 mt-1">High-performance AI accelerators</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-12 h-12 bg-status-live/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Zap size={24} className="text-status-live" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Power Capacity</p>
                      <p className="text-xl font-bold text-gray-900">{datacenter.infrastructure.powerCapacity} {datacenter.infrastructure.powerUnit}</p>
                      <p className="text-xs text-gray-500 mt-1">{datacenter.infrastructure.coolingType}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-12 h-12 bg-status-upcoming/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <HardDrive size={24} className="text-status-upcoming" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Storage Capacity</p>
                      <p className="text-xl font-bold text-gray-900">{datacenter.infrastructure.storageCapacity} {datacenter.infrastructure.storageUnit}</p>
                      <p className="text-xs text-gray-500 mt-1">NVMe flash storage</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Wifi size={24} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Network Bandwidth</p>
                      <p className="text-xl font-bold text-gray-900">{formatNumber(datacenter.infrastructure.networkBandwidth)} {datacenter.infrastructure.networkUnit}</p>
                      <p className="text-xs text-gray-500 mt-1">Low-latency InfiniBand</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Performance Metrics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-card"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Activity size={28} className="text-primary" />
                  Performance Metrics
                </h2>
                <div className="grid grid-cols-3 gap-6">
                  {datacenter.infrastructure.uptime && (
                    <div className="text-center p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl">
                      <p className="text-sm text-gray-500 mb-2">Uptime</p>
                      <p className="text-4xl font-bold text-gray-900">{datacenter.infrastructure.uptime}%</p>
                      <div className="flex items-center justify-center gap-1 mt-2 text-status-live">
                        <TrendingUp size={14} />
                        <span className="text-xs font-medium">{datacenter.infrastructure.uptime >= 99.99 ? 'Tier IV' : datacenter.infrastructure.uptime >= 99.95 ? 'Tier III' : 'High availability'}</span>
                      </div>
                    </div>
                  )}
                  {!datacenter.infrastructure.uptime && (
                    <div className="text-center p-6 bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl">
                      <p className="text-sm text-gray-500 mb-2">Uptime</p>
                      <p className="text-4xl font-bold text-gray-400">--</p>
                      <div className="flex items-center justify-center gap-1 mt-2 text-gray-400">
                        <Clock size={14} />
                        <span className="text-xs font-medium">Not yet operational</span>
                      </div>
                    </div>
                  )}
                  <div className="text-center p-6 bg-gradient-to-br from-status-live/5 to-status-live/10 rounded-xl">
                    <p className="text-sm text-gray-500 mb-2">Rack Density</p>
                    <p className="text-4xl font-bold text-gray-900">{datacenter.infrastructure.rackDensity} {datacenter.infrastructure.rackDensityUnit}</p>
                    <div className="flex items-center justify-center gap-1 mt-2 text-status-live">
                      <TrendingUp size={14} />
                      <span className="text-xs font-medium">{datacenter.infrastructure.rackDensity >= 100 ? 'Liquid cooled' : 'Optimized'}</span>
                    </div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-status-upcoming/5 to-status-upcoming/10 rounded-xl">
                    <p className="text-sm text-gray-500 mb-2">PUE Score</p>
                    <p className="text-4xl font-bold text-gray-900">{datacenter.infrastructure.pue}</p>
                    <div className="flex items-center justify-center gap-1 mt-2 text-status-live">
                      <Award size={14} />
                      <span className="text-xs font-medium">{datacenter.infrastructure.pue < 1.1 ? 'World-class' : datacenter.infrastructure.pue < 1.2 ? 'Excellent' : 'Good'}</span>
                    </div>
                  </div>
                </div>

                {/* Performance Chart Placeholder */}
                <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">30-Day Performance</h3>
                    <span className="text-sm text-gray-500">Revenue Generation</span>
                  </div>
                  <div className="h-48 flex items-end gap-2">
                    {[65, 72, 68, 78, 82, 79, 88, 91, 85, 93, 97, 89, 95, 98, 94, 100, 96, 92, 98, 100, 97, 94, 99, 100, 96, 98, 100, 99, 97, 100].map((height, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-primary to-primary-light rounded-t" style={{ height: `${height}%` }} />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Water Usage Metrics (Only for Live centers) */}
              {datacenter.status === 'live' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-2xl p-8 shadow-card"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                      <Droplet size={28} className="text-primary" />
                      Sustainability Metrics
                    </h2>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
                        <Cloud size={16} className="text-primary" />
                        <span className="text-sm font-semibold text-primary">WUE: {datacenter.infrastructure.wue} {datacenter.infrastructure.wueUnit}</span>
                      </div>
                      {datacenter.infrastructure.wue < 0.5 && (
                        <div className="flex items-center gap-2 px-4 py-2 bg-status-live/10 rounded-lg">
                          <Award size={16} className="text-status-live" />
                          <span className="text-sm font-semibold text-status-live">
                            {datacenter.infrastructure.wue === 0 ? 'Zero-Water Design' : 'LEED Platinum'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-5 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <Droplet size={32} className="text-primary" />
                      </div>
                      <p className="text-sm text-gray-500 uppercase mb-1">Water Used</p>
                      <p className="text-2xl font-bold text-gray-900">{formatMetric(datacenter.metrics.waterUsed)}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Gallons/month</p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-status-live/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <Recycle size={32} className="text-status-live" />
                      </div>
                      <p className="text-sm text-gray-500 uppercase mb-1">Water Recycled</p>
                      <p className="text-2xl font-bold text-gray-900">{formatMetric(datacenter.metrics.waterRecycled)}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Gallons/month</p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <Cloud size={32} className="text-primary" />
                      </div>
                      <p className="text-sm text-gray-500 uppercase mb-1">Rainwater Collected</p>
                      <p className="text-2xl font-bold text-gray-900">{formatMetric(datacenter.metrics.rainwaterCollected)}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Gallons/month</p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-status-live/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <Heart size={32} className="text-status-live" />
                      </div>
                      <p className="text-sm text-gray-500 uppercase mb-1">Water Saved</p>
                      <p className="text-2xl font-bold text-gray-900">{formatMetric(datacenter.metrics.waterSaved)}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Gallons/month</p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-status-upcoming/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <BarChart3 size={32} className="text-status-upcoming" />
                      </div>
                      <p className="text-sm text-gray-500 uppercase mb-1">Efficiency Score</p>
                      <p className="text-2xl font-bold text-gray-900">{datacenter.metrics.efficiencyScore}/100</p>
                      <p className="text-xs text-status-live font-medium mt-0.5">Excellent</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="col-span-4 space-y-6">
              {/* Investment Action Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-6 shadow-card sticky top-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-6">Investment Summary</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Current APY</span>
                    <span className="text-lg font-bold text-status-live">{datacenter.apy}%</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Token Price</span>
                    <span className="text-lg font-bold text-gray-900">${datacenter.tokenPrice}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Min Investment</span>
                    <span className="text-lg font-bold text-gray-900">$1,000</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Total Investors</span>
                    <span className="text-lg font-bold text-gray-900">{formatNumber(Math.floor(datacenter.tvl / 50000))}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full">
                    <span className="flex items-center justify-center gap-2">
                      <DollarSign size={16} />
                      Invest Now
                    </span>
                  </Button>
                  <Button variant="outline" className="w-full">
                    <span className="flex items-center justify-center gap-2">
                      <Star size={16} />
                      Add to Watchlist
                    </span>
                  </Button>
                </div>
              </motion.div>

              {/* Key Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-card"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Key Statistics</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Users size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Active Users</p>
                      <p className="text-lg font-bold text-gray-900">12.4K</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-status-live/10 rounded-lg flex items-center justify-center">
                      <Clock size={20} className="text-status-live" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Avg Response Time</p>
                      <p className="text-lg font-bold text-gray-900">2.1ms</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-status-upcoming/10 rounded-lg flex items-center justify-center">
                      <Shield size={20} className="text-status-upcoming" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Security Rating</p>
                      <p className="text-lg font-bold text-gray-900">AAA</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Risk Assessment */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-card"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertCircle size={20} />
                  Risk Assessment
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Market Risk</span>
                      <span className="font-medium text-status-live">Low</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-status-live rounded-full h-2" style={{ width: '25%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Liquidity Risk</span>
                      <span className="font-medium text-status-live">Low</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-status-live rounded-full h-2" style={{ width: '30%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Technical Risk</span>
                      <span className="font-medium text-status-building">Medium</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-status-building rounded-full h-2" style={{ width: '45%' }} />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Operational Status */}
              {datacenter.status === 'live' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-status-live/10 to-status-live/5 rounded-2xl p-6 border border-status-live/20"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 bg-status-live rounded-full animate-pulse" />
                    <h3 className="text-lg font-bold text-gray-900">Operational Status</h3>
                  </div>
                  <p className="text-sm text-gray-700 mb-4">
                    All systems operational. Last checked 2 minutes ago.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">GPU Clusters</span>
                      <span className="font-medium text-status-live">Online</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Network</span>
                      <span className="font-medium text-status-live">Online</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cooling Systems</span>
                      <span className="font-medium text-status-live">Online</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
