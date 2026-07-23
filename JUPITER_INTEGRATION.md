# Jupiter Terminal Integration Guide

## Overview
The X2O platform now includes Jupiter Terminal - Solana's leading DEX aggregator for token swaps. This integration allows users to swap tokens directly on the Token page.

## Features
- **Integrated swap interface** embedded directly in the Token page
- **Best price routing** across all Solana DEXs
- **MEV protection** built-in
- **Dark/light theme support** matching X2O design
- **Mobile responsive** interface
- **Wallet integration** with popular Solana wallets

## Configuration

### 1. RPC Endpoint
Update the RPC endpoint in `src/config/solana.js`:

```javascript
// For production, use a dedicated RPC provider:
export const RPC_ENDPOINTS = {
  mainnet: [
    'https://your-helius-endpoint.helius.xyz',
    // or QuickNode, Alchemy, etc.
  ]
};
```

### 2. Token Configuration
When X2O token is deployed, update the token mint address:

```javascript
// In src/config/solana.js
export const TOKEN_MINTS = {
  // ...
  X2O: 'YOUR_ACTUAL_X2O_TOKEN_MINT_ADDRESS',
};
```

### 3. Environment Variables (Optional)
Create a `.env` file for production:

```bash
VITE_SOLANA_RPC_URL=https://your-rpc-endpoint.com
VITE_SOLANA_NETWORK=mainnet
```

## Component Usage

### Basic Integration
```jsx
import JupiterSwap from '../components/trading/JupiterSwap';

<JupiterSwap
  variant="default"
  defaultInputMint={TOKEN_MINTS.SOL}
  defaultOutputMint={TOKEN_MINTS.X2O}
  fixedOutputMint={false}
/>
```

### Props
- `variant`: "default" | "compact" - Display variant
- `defaultInputMint`: Token mint address for input
- `defaultOutputMint`: Token mint address for output
- `fixedOutputMint`: Boolean - Lock output token
- `className`: Additional CSS classes

## Customization

### Theme Styling
The component automatically adapts to dark/light theme. Custom styles are injected in `JupiterSwap.jsx`:

```css
.jupiter-dark {
  --jupiter-primary: #4A90E2;
  --jupiter-bg: #0a0b0d;
  /* ... */
}
```

### Display Modes
Jupiter Terminal supports three display modes:

1. **Integrated** (current): Embeds in page
2. **Widget**: Floating button
3. **Modal**: Popup overlay

Change in `JupiterSwap.jsx`:
```javascript
displayMode: 'integrated', // or 'widget' or 'modal'
```

## Referral Program
To earn fees, register with Jupiter's referral program and update:

```javascript
// In src/config/solana.js
platformFee: {
  referralAccount: 'YOUR_WALLET_ADDRESS',
  feeBps: 50, // 0.5% fee
}
```

## Troubleshooting

### "Jupiter Terminal failed to load"
- Check internet connection
- Verify script tag in `index.html`
- Check browser console for errors

### "Failed to initialize swap interface"
- Verify RPC endpoint is working
- Check RPC rate limits
- Try alternative RPC endpoint

### Wallet Connection Issues
- Ensure wallet extension is installed
- Check wallet is on Solana mainnet
- Try refreshing the page

## Resources
- [Jupiter Documentation](https://developers.jup.ag)
- [Solana Web3.js](https://solana-labs.github.io/solana-web3.js/)
- [RPC Providers](https://solana.com/rpc)

## Security Notes
- Never share private keys
- Use dedicated RPC endpoints in production
- Enable strict token list to reduce scam tokens
- Test thoroughly on devnet first

## Future Enhancements
- [ ] Add transaction history
- [ ] Implement price alerts
- [ ] Add liquidity pool information
- [ ] Create custom token selector
- [ ] Add swap analytics