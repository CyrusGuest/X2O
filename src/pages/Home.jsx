import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BarChart3, Zap, Gem, ArrowRight } from 'lucide-react';
import { heroVariants, heroTitleVariants, heroGlobeVariants, containerVariants, itemVariants } from '../animations/variants';
import Button from '../components/ui/Button';
import DataCenterCard from '../components/ui/DataCenterCard';
import Globe3D from '../components/sections/Globe3D';
import datacenters from '../data/datacenters.json';
import { formatNumber, formatMetric } from '../utils/cn';

export default function Home() {
  const totalTVL = datacenters.reduce((sum, dc) => sum + dc.tvl, 0);

  return (
    <div>
      {/* Hero Section */}
      <motion.section
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        className="relative px-12 py-20 bg-gradient-to-br from-white to-primary-light/20"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div variants={heroTitleVariants}>
            <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
              The global network powering the AI economy.
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Tokenized ownership in the world's most advanced AI data centers.
            </p>
            <div className="flex gap-4">
              <Button>
                <span className="flex items-center gap-2">
                  Explore Datacenters
                  <ArrowRight size={16} />
                </span>
              </Button>
              <Button variant="outline">Learn More</Button>
            </div>
          </motion.div>

          {/* Right - 3D Globe */}
          <motion.div
            variants={heroGlobeVariants}
            className="relative h-96 rounded-3xl overflow-hidden"
          >
            <Globe3D height={384} />

            {/* Stats Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Total Data Centers</p>
                  <p className="text-2xl font-bold text-gray-900">+{datacenters.length}</p>
                </div>
                <div className="h-8 w-px bg-gray-200" />
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Live & Operating</p>
                  <p className="text-2xl font-bold text-status-live">
                    {datacenters.filter(dc => dc.status === 'live').length}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Bar */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="bg-white border-y border-gray-200 px-12 py-8"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-8">
          <motion.div variants={itemVariants} className="flex items-center gap-4">
            <div className="w-14 h-14 bg-primary-light rounded-xl flex items-center justify-center">
              <BarChart3 size={28} className="text-primary" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">{formatNumber(totalTVL)}</p>
              <p className="text-sm text-gray-500">Total Value Locked</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-4">
            <div className="w-14 h-14 bg-status-live/10 rounded-xl flex items-center justify-center">
              <Zap size={28} className="text-status-live" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">5+</p>
              <p className="text-sm text-gray-500">Countries Supported</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-4">
            <div className="w-14 h-14 bg-status-upcoming/10 rounded-xl flex items-center justify-center">
              <Gem size={28} className="text-status-upcoming" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">{formatNumber(totalTVL * 0.15)}</p>
              <p className="text-sm text-gray-500">Total Rewards Distributed</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* All Data Centers */}
      <section className="px-12 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">All Data Centers</h2>
              <p className="text-gray-600">Invest in tokenized AI infrastructure worldwide</p>
            </div>
            <Link to="/all">
              <Button variant="outline">View on Map →</Button>
            </Link>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-3 gap-6"
          >
            {datacenters.map((datacenter) => (
              <motion.div key={datacenter.id} variants={itemVariants}>
                <DataCenterCard datacenter={datacenter} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
