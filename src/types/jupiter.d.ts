// Jupiter Terminal TypeScript definitions
declare global {
  interface Window {
    Jupiter: {
      init: (config: JupiterTerminalConfig) => Promise<void>;
      close: () => void;
      syncProps: (props: any) => void;
      resume: () => void;
      _instance?: any;
    };
  }
}

interface JupiterTerminalConfig {
  /** Display mode for the terminal */
  displayMode?: 'modal' | 'integrated' | 'widget';

  /** Target element ID for integrated mode */
  integratedTargetId?: string;

  /** Widget position (for widget mode) */
  widgetPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

  /** Widget size (for widget mode) */
  widgetSize?: 'sm' | 'default';

  /** Solana RPC endpoint */
  endpoint?: string;

  /** Enable wallet passthrough if using existing wallet provider */
  enableWalletPassthrough?: boolean;

  /** Wallet context state for passthrough */
  passthroughWalletContextState?: any;

  /** Auto-connect wallet on load */
  autoConnect?: boolean;

  /** Container styling */
  containerClassName?: string;
  containerStyles?: React.CSSProperties;

  /** Form configuration */
  formProps?: {
    /** Initial input token mint address */
    initialInputMint?: string;

    /** Initial output token mint address */
    initialOutputMint?: string;

    /** Initial swap amount */
    initialAmount?: string;

    /** Fixed token mint (locks one side of swap) */
    fixedMint?: string;

    /** Fixed amount (prevents amount changes) */
    fixedAmount?: boolean;

    /** Swap mode */
    swapMode?: 'ExactIn' | 'ExactOut' | 'ExactInOrOut';

    /** Referral account for fees */
    referralAccount?: string;

    /** Referral fee percentage */
    referralFee?: number;

    /** Slippage tolerance (bps) */
    initialSlippageBps?: number;
  };

  /** Default blockchain explorer */
  defaultExplorer?: 'Solscan' | 'SolanaFM' | 'Solana Explorer';

  /** Theme configuration */
  theme?: {
    /** Primary color */
    primaryColor?: string;

    /** Background color */
    backgroundColor?: string;

    /** Text color */
    textColor?: string;

    /** Border color */
    borderColor?: string;

    /** Success color */
    successColor?: string;

    /** Error color */
    errorColor?: string;

    /** Font family */
    fontFamily?: string;
  };

  /** Callback functions */
  onSuccess?: (txid: string) => void;
  onError?: (error: Error) => void;
  onFormUpdate?: (form: any) => void;
  onSwapRequest?: (swap: any) => void;

  /** Language/locale */
  locale?: string;

  /** Local storage prefix for settings */
  localStoragePrefix?: string;

  /** Strict token list mode (reduces scam tokens) */
  strictTokenList?: boolean;

  /** Fee configuration */
  feeOptions?: {
    platformFeeBps?: number;
    platformFeeAccount?: string;
  };
}

// Common Solana token mint addresses for reference
export const SOLANA_TOKEN_MINTS = {
  SOL: 'So11111111111111111111111111111111111111112',
  USDC: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  USDT: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
  JUP: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
  BONK: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
  WIF: 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm',
  PYTH: 'HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3',
  RENDER: 'rndrizKT3MK1iimdxRdWabcF7Zg7AR5T4nud4EkHBof',
};

export {};