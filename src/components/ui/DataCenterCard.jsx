import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { cardHoverVariants } from '../../animations/variants';
import { formatNumber } from '../../utils/cn';
import Badge from './Badge';

export default function DataCenterCard({ datacenter }) {
  return (
    <Link to={`/datacenter/${datacenter.id}`}>
      <motion.div
        variants={cardHoverVariants}
        initial="rest"
        whileHover="hover"
        className="bg-white rounded-2xl overflow-hidden shadow-card cursor-pointer"
      >
        {/* Image */}
        <div className="relative h-48 bg-gray-100 overflow-hidden">
          <motion.img
            src={datacenter.image}
            alt={datacenter.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute top-4 left-4">
            <Badge status={datacenter.status} />
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {datacenter.name}
          </h3>
          <p className="text-sm text-gray-500 mb-4 flex items-center gap-1.5">
            <MapPin size={14} />
            {datacenter.location}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <p className="text-xs text-gray-400 mb-0.5">TVL</p>
              <p className="text-sm font-semibold text-gray-900">
                {formatNumber(datacenter.tvl)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">APY</p>
              <p className="text-sm font-semibold text-status-live">
                {datacenter.apy}%
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Token Price</p>
              <p className="text-sm font-semibold text-gray-900">
                ${datacenter.tokenPrice}
              </p>
            </div>
          </div>

          {/* View Details */}
          <button className="mt-4 w-full text-center text-sm text-primary font-medium hover:text-primary-dark transition-colors">
            View Details
          </button>
        </div>
      </motion.div>
    </Link>
  );
}
