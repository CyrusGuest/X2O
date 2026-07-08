import { Link, useLocation } from 'react-router-dom';
import { Globe, Building2, Briefcase, Star, BarChart3, Activity, Box } from 'lucide-react';
import { cn } from '../../utils/cn';
import datacenters from '../../data/datacenters.json';
import { formatNumber, formatMetric } from '../../utils/cn';

const navigation = [
  { name: 'Global Map', href: '/', icon: Globe },
  { name: 'All Data Centers', href: '/all', icon: Building2 },
  { name: 'My Investments', href: '/investments', icon: Briefcase },
  { name: 'Watchlist', href: '/watchlist', icon: Star },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Activity', href: '/activity', icon: Activity },
];

export default function Sidebar() {
  const location = useLocation();

  const totalTVL = datacenters.reduce((sum, dc) => sum + dc.tvl, 0);
  const totalInvestors = 24852;
  const totalRevenue = 18600000;

  return (
    <div className="w-64 bg-gray-50 min-h-screen border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white">
            <Box size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">X2O</h1>
            <p className="text-xs text-gray-500">Tokenized AI Data Centers</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary-light text-primary'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Stats */}
      <div className="p-6 border-t border-gray-200 space-y-4">
        <div>
          <p className="text-xs text-gray-400 uppercase font-medium mb-1">
            Total Value Locked
          </p>
          <p className="text-2xl font-bold text-gray-900">
            {formatNumber(totalTVL)}
          </p>
          <p className="text-xs text-status-live font-medium mt-0.5">+8.24%</p>
        </div>

        <div className="space-y-2 pt-2 border-t border-gray-200">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Total Data Centers</span>
            <span className="font-semibold text-gray-900">{datacenters.length}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Total Investors</span>
            <span className="font-semibold text-gray-900">{formatMetric(totalInvestors)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Total Monthly Revenue</span>
            <span className="font-semibold text-gray-900">{formatNumber(totalRevenue)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
