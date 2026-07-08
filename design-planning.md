# X2O Website Design Planning

## Color Palette

### Primary Colors
- **Primary Blue**: `#3B5FFF` - Main brand color, buttons, interactive elements
- **Dark Blue**: `#2847C7` - Hover states, darker accents
- **Light Periwinkle**: `#E8EBFF` - Subtle backgrounds, map backgrounds

### Status Colors
- **Green (Live)**: `#2ECC71` - Live status badges, success states, eco/sustainability icons
- **Orange (Building)**: `#FF9F43` - Building/construction status
- **Purple (Upcoming)**: `#5865F2` - Upcoming status, secondary accents
- **Pink/Rose**: `#FF6B9D` - Map markers, accents

### Neutrals
- **White**: `#FFFFFF` - Primary background, card backgrounds
- **Light Gray**: `#F7F8FA` - Sidebar background, subtle sections
- **Medium Gray**: `#8B95A5` - Secondary text, labels
- **Dark Gray**: `#4A5568` - Body text
- **Black**: `#1A202C` - Headings, primary text

## Typography

### Font Family
- **Primary**: Inter, system-ui, -apple-system, sans-serif
- **Fallback**: SF Pro Display, Segoe UI, Roboto

### Type Scale
- **Hero Heading**: 48-64px, Bold (700)
- **Page Title**: 32-36px, Bold (700)
- **Section Heading**: 24-28px, Semibold (600)
- **Card Title**: 18-20px, Semibold (600)
- **Body**: 16px, Regular (400)
- **Small Text**: 14px, Regular (400)
- **Labels**: 12-14px, Medium (500)

## Design System Elements

### Cards
- **Border Radius**: 12-16px (generous rounded corners)
- **Shadow**: `0 2px 8px rgba(0, 0, 0, 0.08)` - subtle elevation
- **Padding**: 20-24px
- **Background**: Pure white (#FFFFFF)
- **Hover State**: Subtle lift with increased shadow

### Status Badges
- **Shape**: Pill/rounded rectangle (border-radius: 16px)
- **Padding**: 6px 12px
- **Typography**: 12px, Semibold (600)
- **Colors**:
  - Live: Green background (#2ECC71) + white text
  - Building: Orange background (#FF9F43) + white text
  - Upcoming: Purple background (#5865F2) + white text

### Buttons
- **Primary Button**:
  - Background: Primary Blue (#3B5FFF)
  - Text: White
  - Border Radius: 8px
  - Padding: 12px 24px
  - Font: 14-16px, Medium (500)
  - Hover: Darker blue (#2847C7)

- **Secondary Button**:
  - Background: Transparent
  - Border: 1px solid #E2E8F0
  - Text: Dark gray
  - Same sizing as primary

### Map Markers
- **Shape**: Circle
- **Size**: 40-60px diameter
- **Colors**: Blue, Orange, Pink, Purple, Yellow
- **Typography**: Bold number inside
- **Shadow**: Soft glow effect

### Icons
- **Style**: Simple, modern line icons or filled icons
- **Size**: 20-24px for UI icons, 32-48px for feature icons
- **Color**: Matches context (blue for primary, green for eco, etc.)

## Layout Patterns

### Navigation
- **Sidebar**:
  - Width: 240px
  - Background: Light gray (#F7F8FA)
  - Items: Icon + label, hover with subtle blue background
  - Active state: Blue accent/background

### Grid System
- **Data Center Cards**: 3-5 column grid (responsive)
- **Gap**: 24px between cards
- **Container**: Max-width 1400px, centered

### Map Section
- **Background**: Light periwinkle gradient
- **Map Style**: Subtle, low-opacity landmasses
- **Interactive Markers**: Colored circles with numbers
- **Filters**: Top-right with status indicators

### Stats Display
- **Layout**: Horizontal row of metrics
- **Each Metric**:
  - Icon (colored)
  - Label (gray, uppercase)
  - Value (large, bold, dark)
  - Unit (small, gray)

## Page Components

### Homepage
1. **Hero Section**:
   - Left: Headline + subheadline + CTA button
   - Right: Animated 3D globe with location markers
   - Background: White or very light gradient

2. **Stats Bar**:
   - 3-4 key metrics in horizontal layout
   - Icons + numbers + labels
   - Clean, minimal design

3. **Data Centers Preview**:
   - Grid of featured centers
   - "See All" link
   - Status badges visible

### Global Map Page
1. **Map Visualization**:
   - Full-width interactive map
   - Colored markers by region/status
   - Zoom controls

2. **Filter Bar**:
   - Status filters (Live, Upcoming, Building)
   - Sort options

3. **Data Center Grid**:
   - Below map
   - Card layout with:
     - Photo
     - Status badge
     - Name + location
     - Key metrics (TVL, APY, Token Price)
     - "View Details" link

### Single Data Center Page
1. **Hero Image**:
   - Large photo with rounded corners
   - Status badge overlay

2. **Title Section**:
   - Center name
   - Location with flag icon

3. **Metrics Cards**:
   - Grid of metric cards (e.g., Water Usage)
   - Icons + labels + values
   - Color-coded by category

## UI Principles

1. **Generous White Space**: Don't crowd elements
2. **Clear Hierarchy**: Size, weight, and color establish importance
3. **Consistent Rounding**: 8-16px radius throughout
4. **Subtle Shadows**: Elevation without distraction
5. **Color Purpose**: Each color has semantic meaning (green=live, orange=building, etc.)
6. **Photography**: High-quality, professional building shots
7. **Data Visualization**: Clean, modern, easy to scan
8. **Responsive**: Mobile-first, scales up to desktop
9. **Accessibility**: Sufficient contrast, clear focus states

## Interactions & Animations

### Micro-interactions
- **Button Hovers**:
  - Scale up 102% with smooth spring animation (0.3s ease-out)
  - Background color transition (0.2s)
  - Subtle glow/shadow expansion

- **Card Hovers**:
  - Lift with transform translateY(-4px) + shadow increase (0.3s cubic-bezier)
  - Subtle border glow effect
  - Image slight zoom (scale: 1.05) within card

- **Status Badges**:
  - Gentle pulse animation (2s infinite)
  - "Live" badge: soft breathing glow effect
  - Opacity fade in/out on status change

### Page Load Animations
- **Hero Section**:
  - Headline: Fade up with stagger (0.6s delay)
  - Globe: Scale from 0.8 to 1 + fade in (0.8s)
  - CTA button: Fade + slide up (0.4s delay)

- **Cards Grid**:
  - Staggered fade-up animation (each card 0.1s delay)
  - Starting opacity: 0, transform: translateY(20px)
  - Ending: opacity: 1, transform: translateY(0)

### Scroll Animations
- **Scroll Reveal**: Elements fade + slide up when entering viewport
- **Parallax**: Gentle parallax on hero sections (0.5 scroll speed)
- **Progress Indicators**: Animate on scroll into view
- **Number Counters**: Count up animation when visible (1-2s duration)

### Map Interactions
- **Markers**:
  - Continuous subtle pulse (1.5s infinite ease-in-out)
  - Scale 1 → 1.1 → 1
  - On hover: Brighter pulse + expand to 1.2x
  - On click: Ripple effect spreading outward

- **Map Pan/Zoom**:
  - Smooth easing (0.6s cubic-bezier(0.4, 0, 0.2, 1))
  - Marker fade based on zoom level

### Loading States
- **Skeleton Screens**:
  - Shimmer gradient animation sweeping left to right (1.5s infinite)
  - Background: linear-gradient with animated position

- **Data Loading**:
  - Spinner: Smooth rotation with gradient border (1s linear infinite)
  - Progress bars: Smooth width transition + shimmer overlay

### Interactive Elements
- **Input Focus**:
  - Border color transition (0.2s)
  - Subtle glow ring animation
  - Label slide + scale animation

- **Dropdown/Modal**:
  - Fade + scale from 0.95 to 1 (0.2s)
  - Backdrop blur with fade (0.3s)
  - Slide down menu items with stagger

- **Toggle/Switch**:
  - Smooth position transition (0.3s ease)
  - Background color fade (0.2s)
  - Thumb shadow + scale on drag

### Data Visualization
- **Stats Numbers**:
  - Count-up animation on scroll into view
  - Duration: 1.5-2s with easing
  - Green percentage changes: brief highlight flash

- **Charts/Graphs**:
  - Animate draw-in from left to right (1s)
  - Bars/lines grow from 0 to final value
  - Tooltip: Fade + scale on hover (0.15s)

### Globe Animation
- **Idle State**:
  - Gentle continuous rotation (60s per full rotation)
  - Subtle floating motion (translateY ±5px, 3s ease-in-out)

- **Interactive**:
  - Smooth rotation on drag with momentum
  - Markers fade in based on rotation angle
  - Shine/reflection effect moving across surface

### Page Transitions
- **Route Changes**:
  - Fade out current page (0.2s)
  - Fade in new page (0.3s with 0.1s delay)
  - Optional: Slide transition (50px translateX)

### Status Change Animations
- **Live Status**:
  - Green ping/ripple effect (2s infinite)
  - Glow pulse on badge

- **Building Status**:
  - Progress bar filling animation
  - Gentle orange pulse

- **Upcoming Status**:
  - Slower, subtler pulse (3s)
  - Fade opacity 0.8 ↔ 1

### Special Effects
- **Cursor Trail**: Subtle glow following cursor over interactive map (optional)
- **Particle Effects**: Light particles on hover over special elements
- **Gradient Shifts**: Animated gradient backgrounds (slow 10s transitions)
- **Blur Effects**: Backdrop blur on glassmorphic elements (0.2s transition)

### Timing Functions
- **Standard Ease**: cubic-bezier(0.4, 0, 0.2, 1)
- **Ease Out**: cubic-bezier(0, 0, 0.2, 1)
- **Ease In**: cubic-bezier(0.4, 0, 1, 1)
- **Spring**: cubic-bezier(0.34, 1.56, 0.64, 1)

### Performance Notes
- Use `transform` and `opacity` for animations (GPU accelerated)
- Apply `will-change` sparingly for complex animations
- Respect `prefers-reduced-motion` media query
- Keep animations under 0.5s for UI interactions
- Use `requestAnimationFrame` for JavaScript animations

## Technical Stack

### Frontend Framework
- **React** (v18+) - Base framework
- **React Router** - Client-side routing with animated transitions

### Styling
- **Tailwind CSS 3** - Utility-first CSS framework
- **Custom Tailwind Config**:
  - Extend theme with custom color palette
  - Custom animation utilities
  - Custom container widths
  - Breakpoints: `sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px`

### Animation Library
- **Framer Motion** - Primary animation library
  - Used for all page transitions, scroll animations, and micro-interactions
  - Variants for consistent animation patterns
  - AnimatePresence for enter/exit animations
  - useScroll, useTransform for scroll-based effects
  - useInView for scroll-triggered animations

### Additional Libraries
- **React Globe.gl** or **Three.js** - 3D globe visualization
- **Mapbox GL** or **Leaflet** - Interactive map (if needed)
- **React Intersection Observer** - Scroll detection (or Framer Motion's useInView)
- **clsx** or **classnames** - Conditional class management

### Framer Motion Implementation Patterns

#### Reusable Animation Variants
```javascript
// Fade up on scroll
const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

// Card hover
const cardHoverVariants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -4,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  }
}

// Stagger children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}
```

#### Component Examples
```javascript
// Animated card
<motion.div
  variants={cardHoverVariants}
  initial="rest"
  whileHover="hover"
  className="rounded-xl bg-white shadow-md p-6"
>

// Scroll-triggered section
<motion.section
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={fadeUpVariants}
>

// Page transitions
<AnimatePresence mode="wait">
  <motion.div
    key={location.pathname}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
</AnimatePresence>
```

### Tailwind + Framer Motion Integration

#### Custom Tailwind Animations
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B5FFF',
          dark: '#2847C7',
          light: '#E8EBFF'
        },
        status: {
          live: '#2ECC71',
          building: '#FF9F43',
          upcoming: '#5865F2'
        }
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 1.5s infinite',
        'float': 'float 3s ease-in-out infinite'
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }
        }
      }
    }
  }
}
```

#### Combining Approaches
- Use Tailwind for static styles and simple transitions
- Use Framer Motion for complex animations, gestures, and scroll effects
- Use Tailwind's `animate-` utilities for simple infinite animations (pulse, spin)
- Use Framer Motion's motion components for enter/exit and interactive animations

### Project Structure
```
src/
├── components/
│   ├── ui/              # Reusable UI components (buttons, cards, badges)
│   ├── sections/        # Page sections (hero, stats, map)
│   └── layout/          # Layout components (nav, sidebar, footer)
├── pages/
│   ├── Home.jsx
│   ├── GlobalMap.jsx
│   └── DataCenterDetail.jsx
├── animations/
│   └── variants.js      # Framer Motion variants library
├── hooks/
│   ├── useScrollAnimation.js
│   └── useCountUp.js
├── utils/
│   └── cn.js           # classnames utility
└── styles/
    └── globals.css     # Tailwind imports + custom CSS
```

### Performance Optimizations
- Lazy load route components with React.lazy()
- Use Framer Motion's `layoutId` for shared element transitions
- Implement image lazy loading with Intersection Observer
- Use `transform` and `opacity` for GPU-accelerated animations
- Respect `prefers-reduced-motion` media query
- Memoize components with React.memo where appropriate

### Backend & Data Strategy

#### Phase 1: Investor Demo (Current Scope)
**No backend required** - Build fully functional-looking demo with mock data:

**Mock Data Implementation:**
- Create `src/data/datacenters.json` with fake datacenter listings
- Mock data structure:
  ```json
  {
    "id": "coreweave-va-01",
    "name": "CoreWeave VA-01",
    "location": "Virginia, USA",
    "coordinates": [38.0, -79.0],
    "status": "live",
    "image": "/images/datacenters/coreweave-va-01.jpg",
    "tvl": 245000000,
    "apy": 18.7,
    "tokenPrice": 2.45,
    "metrics": {
      "waterUsed": 2450000,
      "waterRecycled": 2210000,
      "rainwaterCollected": 120000,
      "waterSaved": 1850000,
      "efficiencyScore": 96
    }
  }
  ```

**What Works Without Backend:**
- Browse all datacenters on global map
- Filter by status (Live, Building, Upcoming)
- Click into individual datacenter details
- View all stats, metrics, and visualizations
- Mock wallet connection UI (shows fake wallet address)
- Display mock user portfolio/investments
- All animations and interactions fully functional
- Realistic token prices, APY, TVL (hardcoded numbers)

**Mock Features to Include:**
- "Connect Wallet" button that simulates connection
- Mock portfolio showing fake investments: "You own 1,250 X2O tokens ($3,125)"
- Mock transaction history
- Fake "Buy" buttons that show coming soon message or simulated purchase flow
- Market stats banner (total datacenters, total TVL, X2O price, etc.)

#### Phase 2: Production (Future)
**Backend will be needed for:**
- Real wallet integration (Web3, MetaMask, WalletConnect)
- Blockchain connectivity (X2O token smart contracts)
- User authentication and accounts
- Actual token purchases and transactions
- Real-time pricing and market data
- User portfolio tracking with real balances
- Transaction history from blockchain
- Admin panel for managing datacenter listings

**Future Tech Stack:**
- Smart contracts (Solidity/Rust for X2O token)
- Web3 libraries (ethers.js or web3.js)
- Backend API (Node.js/Express or similar)
- Database (PostgreSQL/MongoDB for off-chain data)
- React Query or SWR for data fetching
- WebSocket for real-time price updates

### Development Tools
- **Vite** - Fast dev server and build tool
- **ESLint** + **Prettier** - Code quality
- **PostCSS** - Tailwind processing

## Technical Notes

- Use Tailwind's CSS variables for colors to enable easy theming
- Implement dark mode with Tailwind's dark: modifier (optional)
- Ensure WCAG AA compliance for contrast ratios
- Use CSS Grid (Tailwind's grid utilities) for layouts
- Use Flexbox (Tailwind's flex utilities) for components
- All animations respect `prefers-reduced-motion`
- Mobile-first responsive design with Tailwind breakpoints
