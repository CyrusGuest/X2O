// Central metadata for XSolut: categories, live dashboard metrics, filter facets.

export const categories = [
  { key: 'ai', label: 'AI Infrastructure', icon: 'Cpu' },
  { key: 'energy', label: 'Energy', icon: 'Zap' },
  { key: 'cooling', label: 'Cooling', icon: 'Snowflake' },
  { key: 'construction', label: 'Construction', icon: 'HardHat' },
  { key: 'semiconductors', label: 'Semiconductors', icon: 'CircuitBoard' },
  { key: 'security', label: 'Security', icon: 'ShieldCheck' },
  { key: 'fiber', label: 'Fiber', icon: 'Network' },
  { key: 'robotics', label: 'Robotics', icon: 'Bot' },
  { key: 'manufacturing', label: 'Manufacturing', icon: 'Factory' },
  { key: 'water', label: 'Water', icon: 'Droplets' },
  { key: 'government', label: 'Government', icon: 'Landmark' },
  { key: 'defense', label: 'Defense', icon: 'Shield' },
  { key: 'transportation', label: 'Transportation', icon: 'TrainFront' },
  { key: 'space', label: 'Space Infrastructure', icon: 'Rocket' },
];

export const categoryMap = Object.fromEntries(categories.map((c) => [c.key, c]));

// Animated hero dashboard — demo data to make the platform feel alive.
export const dashboardMetrics = [
  { label: 'Infrastructure Value', value: 842, prefix: '$', suffix: 'B', decimals: 0 },
  { label: 'Projects', value: 1284, suffix: '', decimals: 0 },
  { label: 'Power Capacity', value: 38, suffix: ' GW', decimals: 0 },
  { label: 'Data Centers', value: 247, suffix: '', decimals: 0 },
  { label: 'Cooling Facilities', value: 96, suffix: '', decimals: 0 },
  { label: 'Fiber Expansion', value: 8400, suffix: ' mi', decimals: 0 },
  { label: 'Capital Coordinated', value: 123, prefix: '$', suffix: 'B', decimals: 0 },
  { label: 'Suppliers', value: 5184, suffix: '', decimals: 0 },
];

export const riskLevels = ['Low', 'Medium', 'High'];

// Map a project's construction status to a coarse "phase" used for map markers + legends.
export const phaseOf = (project) => {
  const s = project.constructionStatus;
  if (s === 'Operational' || project.power === 'Generating') return 'live';
  if (s === 'Under Construction' || s === 'Site Prep') return 'building';
  return 'upcoming';
};

export const phaseMeta = {
  live: { label: 'Operational', color: '#0cce6b' },
  building: { label: 'In Construction', color: '#f5a623' },
  upcoming: { label: 'Planning', color: '#8a63d2' },
};

export const fundingStages = [
  'Seed',
  'Series A',
  'Series B',
  'Series C',
  'Series D',
  'Project Finance',
  'Government Contract',
];

export const constructionStatuses = [
  'Design',
  'Permitting',
  'Site Prep',
  'Under Construction',
  'Operational',
];

// Intelligence dataset — what the marketplace collects.
export const intelligenceSignals = [
  'Construction timelines',
  'Supplier performance',
  'Contractor reliability',
  'Equipment lead times',
  'Permitting speed',
  'Power availability',
  'Cooling efficiency',
  'Cost benchmarks',
  'Labor availability',
  'Material costs',
  'Project delays',
  'Operational metrics',
  'Fiber deployment',
  'Transformer lead times',
  'Land availability',
  'Infrastructure demand',
  'Historical records',
  'Regional comparisons',
  'Environmental metrics',
];

export const aiPredictions = [
  'Construction costs',
  'Best locations',
  'Future demand',
  'Supplier reliability',
  'Completion dates',
  'Project delays',
  'Capital requirements',
  'Power shortages',
  'Cooling optimization',
  'Utility bottlenecks',
  'Regional expansion',
];

export const businessModel = [
  'Marketplace Fees',
  'Enterprise Software',
  'Intelligence Subscriptions',
  'Government Contracts',
  'API Access',
  'Data Licensing',
];
