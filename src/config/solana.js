// Solana configuration for Jupiter Terminal and other Web3 integrations

// RPC Endpoints
// Using Helius RPC for better performance and reliability
export const RPC_ENDPOINTS = {
  // Primary Helius endpoint with API key
  mainnet: [
    'https://mainnet.helius-rpc.com/?api-key=14aff401-5ad7-4c70-8f74-719ea735b0dd',
    // Fallback public endpoints (rate limited)
    'https://api.mainnet-beta.solana.com',
    'https://solana-api.projectserum.com',
    'https://rpc.ankr.com/solana',
  ],

  // Devnet endpoints for testing
  devnet: [
    'https://api.devnet.solana.com',
    'https://rpc.ankr.com/solana_devnet',
  ],
};

// Get RPC endpoint based on environment
export const getRPCEndpoint = () => {
  // In production, use environment variable (Vite uses import.meta.env)
  if (import.meta.env?.VITE_SOLANA_RPC_URL) {
    return import.meta.env.VITE_SOLANA_RPC_URL;
  }

  // Default to mainnet
  const network = import.meta.env?.VITE_SOLANA_NETWORK || 'mainnet';
  return RPC_ENDPOINTS[network][0];
};

// Token mint addresses on Solana mainnet
export const TOKEN_MINTS = {
  // Native & Stablecoins
  SOL: 'So11111111111111111111111111111111111111112',
  USDC: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  USDT: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',

  // Popular tokens
  JUP: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
  BONK: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
  WIF: 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm',
  PYTH: 'HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3',
  RENDER: 'rndrizKT3MK1iimdxRdWabcF7Zg7AR5T4nud4EkHBof',
  HNT: 'hntyVP6YFm1Hg25TN9WGLqM12b8TQmcknKrdu1oxWux',

  // X2O Token - User's specified base token
  X2O: 'USCRdwZP5UkKhJzhWuD7XjTUviHBtZJbLG7XpbKng9S', // Default base token
};

// Jupiter Terminal configuration
export const JUPITER_CONFIG = {
  // Display settings
  displayMode: 'integrated',

  // Default tokens for swapping
  defaultInputMint: TOKEN_MINTS.USDC, // USDC as base token
  defaultOutputMint: 'USCRdwZP5UkKhJzhWuD7XjTUviHBtZJbLG7XpbKng9S', // X2O as quote token

  // Slippage tolerance in basis points (100 = 1%)
  defaultSlippageBps: 100,

  // Strict token list to reduce scam tokens
  strictTokenList: true,

  // Explorer preference
  defaultExplorer: 'Solscan',

  // Platform fee configuration (if eligible for referral program)
  platformFee: {
    // Your referral account (must be registered with Jupiter)
    referralAccount: undefined,
    // Fee in basis points (if eligible)
    feeBps: undefined,
  },
};

// Wallet configuration
export const WALLET_CONFIG = {
  // Auto-connect to wallet on page load
  autoConnect: false,

  // Supported wallets
  wallets: [
    'Phantom',
    'Backpack',
    'Solflare',
    'Ledger',
    'Torus',
  ],
};