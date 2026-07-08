import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Wallet } from 'lucide-react';
import Button from '../ui/Button';

export default function Navbar() {
  const [walletConnected, setWalletConnected] = useState(false);
  const mockWallet = '0x742d...4a89';

  const handleConnectWallet = () => {
    setWalletConnected(!walletConnected);
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search data centers, locations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {walletConnected && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm text-gray-600"
            >
              Connected: <span className="font-medium text-gray-900">{mockWallet}</span>
            </motion.div>
          )}
          <Button onClick={handleConnectWallet}>
            <span className="flex items-center gap-2">
              <Wallet size={16} />
              {walletConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
            </span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
