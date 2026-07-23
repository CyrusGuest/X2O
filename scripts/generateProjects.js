// Generate diverse infrastructure projects for X2O marketplace

const categories = [
  'ai', 'energy', 'cooling', 'construction', 'semiconductors',
  'security', 'fiber', 'robotics', 'manufacturing', 'water',
  'government', 'defense', 'transportation', 'space'
];

const projectPrefixes = {
  ai: ['Neural', 'Quantum', 'Deep', 'Cognitive', 'Advanced', 'Smart', 'Edge', 'Hybrid'],
  energy: ['Solar', 'Wind', 'Nuclear', 'Hydro', 'Fusion', 'Grid', 'Renewable', 'Clean'],
  cooling: ['Cryo', 'Liquid', 'Immersion', 'Arctic', 'Thermal', 'Advanced', 'Efficient', 'Next-Gen'],
  construction: ['Modular', 'Rapid', 'Automated', 'Prefab', 'Green', 'Smart', 'Resilient', 'Adaptive'],
  semiconductors: ['Silicon', 'Quantum', 'Nano', 'Advanced', 'Next-Gen', 'High-Speed', 'Ultra', 'Photonic'],
  security: ['Cyber', 'Quantum', 'Bio', 'Advanced', 'Neural', 'Autonomous', 'Integrated', 'Strategic'],
  fiber: ['Dark', 'Ultra-Fast', 'Quantum', 'Metro', 'Regional', 'Transcontinental', 'Submarine', 'Orbital'],
  robotics: ['Autonomous', 'Industrial', 'Service', 'Medical', 'Agricultural', 'Mining', 'Construction', 'Defense'],
  manufacturing: ['Advanced', 'Smart', 'Additive', 'Precision', 'Automated', 'Digital', 'Sustainable', 'Modular'],
  water: ['Pure', 'Desalination', 'Recycling', 'Treatment', 'Smart', 'Sustainable', 'Advanced', 'Municipal'],
  government: ['Federal', 'State', 'Municipal', 'Defense', 'Intelligence', 'Research', 'Emergency', 'Strategic'],
  defense: ['Strategic', 'Tactical', 'Advanced', 'Integrated', 'Autonomous', 'Cyber', 'Space', 'Naval'],
  transportation: ['Hyperloop', 'Maglev', 'Electric', 'Autonomous', 'Smart', 'Regional', 'Urban', 'Freight'],
  space: ['Orbital', 'Lunar', 'Martian', 'Deep Space', 'Launch', 'Satellite', 'Station', 'Mining']
};

const projectSuffixes = {
  ai: ['Computing Center', 'AI Campus', 'ML Facility', 'Training Hub', 'Research Center', 'Innovation Lab', 'Data Center', 'Intelligence Hub'],
  energy: ['Power Plant', 'Energy Park', 'Generation Facility', 'Grid Station', 'Storage Complex', 'Power Hub', 'Energy Center', 'Utility Station'],
  cooling: ['Cooling Plant', 'Thermal Station', 'Climate Hub', 'Cooling Complex', 'Refrigeration Center', 'Temperature Control', 'Cooling Facility', 'Thermal Management'],
  construction: ['Build Site', 'Construction Hub', 'Assembly Plant', 'Fabrication Center', 'Construction Complex', 'Building Facility', 'Development Center', 'Construction Yard'],
  semiconductors: ['Fab Plant', 'Chip Foundry', 'Silicon Works', 'Wafer Facility', 'Semiconductor Hub', 'Production Center', 'Manufacturing Plant', 'Clean Room Complex'],
  security: ['Security Center', 'Defense Hub', 'Protection Facility', 'Security Complex', 'Command Center', 'Operations Base', 'Security Station', 'Defense Platform'],
  fiber: ['Fiber Network', 'Optic Hub', 'Communications Center', 'Network Exchange', 'Fiber Backbone', 'Data Highway', 'Connectivity Hub', 'Network Station'],
  robotics: ['Robotics Lab', 'Automation Center', 'Robot Factory', 'AI Robotics Hub', 'Manufacturing Center', 'Robotics Complex', 'Automation Plant', 'Robot Works'],
  manufacturing: ['Manufacturing Plant', 'Production Facility', 'Factory Complex', 'Industrial Center', 'Production Hub', 'Manufacturing Campus', 'Assembly Plant', 'Industrial Park'],
  water: ['Water Plant', 'Treatment Facility', 'Purification Center', 'Water Works', 'Aqua Complex', 'Hydro Station', 'Water Hub', 'Treatment Center'],
  government: ['Government Complex', 'Federal Center', 'Operations Base', 'Command Facility', 'Government Hub', 'Administrative Center', 'Federal Building', 'State Complex'],
  defense: ['Defense Base', 'Military Installation', 'Strategic Center', 'Defense Complex', 'Operations Center', 'Military Hub', 'Defense Station', 'Command Post'],
  transportation: ['Transport Hub', 'Transit Center', 'Terminal Complex', 'Transportation Station', 'Mobility Center', 'Transit Terminal', 'Transport Facility', 'Logistics Hub'],
  space: ['Space Port', 'Launch Complex', 'Space Center', 'Orbital Station', 'Space Facility', 'Launch Site', 'Space Hub', 'Aerospace Complex']
};

const cities = [
  { city: 'San Francisco', state: 'California', stateCode: 'CA', lat: 37.7749, lon: -122.4194 },
  { city: 'Los Angeles', state: 'California', stateCode: 'CA', lat: 34.0522, lon: -118.2437 },
  { city: 'San Diego', state: 'California', stateCode: 'CA', lat: 32.7157, lon: -117.1611 },
  { city: 'San Jose', state: 'California', stateCode: 'CA', lat: 37.3382, lon: -121.8863 },
  { city: 'Austin', state: 'Texas', stateCode: 'TX', lat: 30.2672, lon: -97.7431 },
  { city: 'Houston', state: 'Texas', stateCode: 'TX', lat: 29.7604, lon: -95.3698 },
  { city: 'Dallas', state: 'Texas', stateCode: 'TX', lat: 32.7767, lon: -96.7970 },
  { city: 'San Antonio', state: 'Texas', stateCode: 'TX', lat: 29.4241, lon: -98.4936 },
  { city: 'Phoenix', state: 'Arizona', stateCode: 'AZ', lat: 33.4484, lon: -112.0740 },
  { city: 'Tucson', state: 'Arizona', stateCode: 'AZ', lat: 32.2226, lon: -110.9747 },
  { city: 'Las Vegas', state: 'Nevada', stateCode: 'NV', lat: 36.1699, lon: -115.1398 },
  { city: 'Reno', state: 'Nevada', stateCode: 'NV', lat: 39.5296, lon: -119.8138 },
  { city: 'Denver', state: 'Colorado', stateCode: 'CO', lat: 39.7392, lon: -104.9903 },
  { city: 'Boulder', state: 'Colorado', stateCode: 'CO', lat: 40.0150, lon: -105.2705 },
  { city: 'Seattle', state: 'Washington', stateCode: 'WA', lat: 47.6062, lon: -122.3321 },
  { city: 'Tacoma', state: 'Washington', stateCode: 'WA', lat: 47.2529, lon: -122.4443 },
  { city: 'Portland', state: 'Oregon', stateCode: 'OR', lat: 45.5152, lon: -122.6784 },
  { city: 'Eugene', state: 'Oregon', stateCode: 'OR', lat: 44.0521, lon: -123.0868 },
  { city: 'Salt Lake City', state: 'Utah', stateCode: 'UT', lat: 40.7608, lon: -111.8910 },
  { city: 'Boise', state: 'Idaho', stateCode: 'ID', lat: 43.6150, lon: -116.2023 },
  { city: 'Chicago', state: 'Illinois', stateCode: 'IL', lat: 41.8781, lon: -87.6298 },
  { city: 'Detroit', state: 'Michigan', stateCode: 'MI', lat: 42.3314, lon: -83.0458 },
  { city: 'Minneapolis', state: 'Minnesota', stateCode: 'MN', lat: 44.9778, lon: -93.2650 },
  { city: 'Milwaukee', state: 'Wisconsin', stateCode: 'WI', lat: 43.0389, lon: -87.9065 },
  { city: 'Indianapolis', state: 'Indiana', stateCode: 'IN', lat: 39.7684, lon: -86.1581 },
  { city: 'Columbus', state: 'Ohio', stateCode: 'OH', lat: 39.9612, lon: -82.9988 },
  { city: 'Cleveland', state: 'Ohio', stateCode: 'OH', lat: 41.4993, lon: -81.6944 },
  { city: 'Pittsburgh', state: 'Pennsylvania', stateCode: 'PA', lat: 40.4406, lon: -79.9959 },
  { city: 'Philadelphia', state: 'Pennsylvania', stateCode: 'PA', lat: 39.9526, lon: -75.1652 },
  { city: 'New York', state: 'New York', stateCode: 'NY', lat: 40.7128, lon: -74.0060 },
  { city: 'Buffalo', state: 'New York', stateCode: 'NY', lat: 42.8864, lon: -78.8784 },
  { city: 'Boston', state: 'Massachusetts', stateCode: 'MA', lat: 42.3601, lon: -71.0589 },
  { city: 'Providence', state: 'Rhode Island', stateCode: 'RI', lat: 41.8240, lon: -71.4128 },
  { city: 'Hartford', state: 'Connecticut', stateCode: 'CT', lat: 41.7658, lon: -72.6734 },
  { city: 'Washington', state: 'D.C.', stateCode: 'DC', lat: 38.9072, lon: -77.0369 },
  { city: 'Baltimore', state: 'Maryland', stateCode: 'MD', lat: 39.2904, lon: -76.6122 },
  { city: 'Richmond', state: 'Virginia', stateCode: 'VA', lat: 37.5407, lon: -77.4360 },
  { city: 'Charlotte', state: 'North Carolina', stateCode: 'NC', lat: 35.2271, lon: -80.8431 },
  { city: 'Raleigh', state: 'North Carolina', stateCode: 'NC', lat: 35.7796, lon: -78.6382 },
  { city: 'Atlanta', state: 'Georgia', stateCode: 'GA', lat: 33.7490, lon: -84.3880 },
  { city: 'Miami', state: 'Florida', stateCode: 'FL', lat: 25.7617, lon: -80.1918 },
  { city: 'Tampa', state: 'Florida', stateCode: 'FL', lat: 27.9506, lon: -82.4572 },
  { city: 'Orlando', state: 'Florida', stateCode: 'FL', lat: 28.5383, lon: -81.3792 },
  { city: 'Jacksonville', state: 'Florida', stateCode: 'FL', lat: 30.3322, lon: -81.6557 },
  { city: 'Nashville', state: 'Tennessee', stateCode: 'TN', lat: 36.1627, lon: -86.7816 },
  { city: 'Memphis', state: 'Tennessee', stateCode: 'TN', lat: 35.1495, lon: -90.0490 },
  { city: 'Louisville', state: 'Kentucky', stateCode: 'KY', lat: 38.2527, lon: -85.7585 },
  { city: 'Kansas City', state: 'Missouri', stateCode: 'MO', lat: 39.0997, lon: -94.5786 },
  { city: 'St. Louis', state: 'Missouri', stateCode: 'MO', lat: 38.6270, lon: -90.1994 },
  { city: 'Oklahoma City', state: 'Oklahoma', stateCode: 'OK', lat: 35.4676, lon: -97.5164 },
  { city: 'Tulsa', state: 'Oklahoma', stateCode: 'OK', lat: 36.1540, lon: -95.9928 },
  { city: 'Omaha', state: 'Nebraska', stateCode: 'NE', lat: 41.2565, lon: -95.9345 },
  { city: 'Des Moines', state: 'Iowa', stateCode: 'IA', lat: 41.5868, lon: -93.6250 },
  { city: 'New Orleans', state: 'Louisiana', stateCode: 'LA', lat: 29.9511, lon: -90.0715 },
  { city: 'Birmingham', state: 'Alabama', stateCode: 'AL', lat: 33.5186, lon: -86.8104 },
  { city: 'Albuquerque', state: 'New Mexico', stateCode: 'NM', lat: 35.0853, lon: -106.6056 },
  { city: 'El Paso', state: 'Texas', stateCode: 'TX', lat: 31.7619, lon: -106.4850 },
  { city: 'Ashburn', state: 'Virginia', stateCode: 'VA', lat: 39.0438, lon: -77.4874 }
];

const fundingStages = ['Seed', 'Series A', 'Series B', 'Series C', 'Series D', 'Project Finance', 'Government Contract'];
const constructionStatuses = ['Design', 'Permitting', 'Site Prep', 'Under Construction', 'Operational'];
const riskLevels = ['Low', 'Medium', 'High'];
const coolingTypes = ['Air Cooling', 'Liquid Cooling', 'Immersion Cooling', 'Evaporative Cooling', 'Hybrid Cooling', 'Natural Cooling'];
const powerStatuses = ['Secured', 'Pending', 'Generating', 'Grid-Connected', 'Off-Grid'];
const fiberOptions = ['On-site dark fiber', 'Redundant metro fiber', 'Dedicated dark fiber', 'Multiple carriers', 'Satellite backup'];
const utilities = [
  'Local Municipal', 'Con Edison', 'PG&E', 'Dominion Energy', 'Duke Energy',
  'Southern Company', 'Xcel Energy', 'Oncor / ERCOT', 'ComEd', 'DTE Energy',
  'AEP Ohio', 'PSE&G', 'FPL', 'Georgia Power', 'Pepco'
];
const incentives = [
  'CHIPS Act funding', 'State tax credits', 'Federal loan guarantee', 'IRA tax credits',
  'State broadband grant', 'Opportunity Zone', 'Foreign Trade Zone', 'R&D tax credits',
  'Green energy incentives', 'Infrastructure grants', 'Defense contracts', 'Municipal bonds'
];

// Company logo generators using various placeholder services
const logoGenerators = [
  (name, id) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=400&background=random&color=fff&bold=true&format=svg`,
  (name, id) => `https://source.boringavatars.com/beam/400/${encodeURIComponent(name)}?colors=4A90E2,7B68EE,FF6B6B,4ECDC4,45B7D1`,
  (name, id) => `https://api.dicebear.com/7.x/shapes/svg?seed=${id}&backgroundColor=4A90E2,7B68EE,FF6B6B,4ECDC4,45B7D1`,
  (name, id) => `https://api.dicebear.com/7.x/identicon/svg?seed=${id}&backgroundColor=transparent&size=400`,
  (name, id) => `https://source.boringavatars.com/marble/400/${id}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`,
  (name, id) => `https://api.dicebear.com/7.x/bauhaus/svg?seed=${id}&backgroundColor=4A90E2,7B68EE,FF6B6B,4ECDC4,45B7D1`,
  (name, id) => `https://source.boringavatars.com/sunset/400/${encodeURIComponent(name)}?colors=FFC700,FF6B6B,4ECDC4,7B68EE,4A90E2`
];

// Infrastructure-themed image URLs
const infrastructureImages = {
  ai: [
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop&q=80',
    'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1200&h=800&fit=crop&q=80',
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=800&fit=crop&q=80',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop&q=80'
  ],
  energy: [
    'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=800&fit=crop&q=80',
    'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&h=800&fit=crop&q=80',
    'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=1200&h=800&fit=crop&q=80',
    'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=1200&h=800&fit=crop&q=80'
  ],
  cooling: [
    'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&h=800&fit=crop&q=80',
    'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=1200&h=800&fit=crop&q=80',
    'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=1200&h=800&fit=crop&q=80'
  ],
  semiconductors: [
    'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1200&h=800&fit=crop&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop&q=80',
    'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=1200&h=800&fit=crop&q=80'
  ],
  fiber: [
    'https://images.unsplash.com/photo-1606868306217-dbf5046868d2?w=1200&h=800&fit=crop&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&q=80'
  ],
  robotics: [
    'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=1200&h=800&fit=crop&q=80',
    'https://images.unsplash.com/photo-1563207153-f403bf289096?w=1200&h=800&fit=crop&q=80'
  ],
  manufacturing: [
    'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200&h=800&fit=crop&q=80',
    'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=1200&h=800&fit=crop&q=80'
  ],
  water: [
    'https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=1200&h=800&fit=crop&q=80',
    'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&h=800&fit=crop&q=80'
  ],
  government: [
    'https://images.unsplash.com/photo-1551871812-10ecc21ffa6f?w=1200&h=800&fit=crop&q=80',
    'https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=1200&h=800&fit=crop&q=80'
  ],
  defense: [
    'https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=1200&h=800&fit=crop&q=80',
    'https://images.unsplash.com/photo-1541873676-a18131494184?w=1200&h=800&fit=crop&q=80'
  ],
  transportation: [
    'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1200&h=800&fit=crop&q=80',
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=800&fit=crop&q=80'
  ],
  space: [
    'https://images.unsplash.com/photo-1446776709462-d6b525c57bd3?w=1200&h=800&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=1200&h=800&fit=crop&q=80'
  ],
  construction: [
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=800&fit=crop&q=80',
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=800&fit=crop&q=80'
  ],
  security: [
    'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&h=800&fit=crop&q=80',
    'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=800&fit=crop&q=80'
  ]
};

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateProjectId(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function generateTokenSymbol(name, index) {
  const words = name.split(' ').filter(w => w.length > 2);
  const abbrev = words.map(w => w[0]).join('').toUpperCase().slice(0, 4);
  return abbrev + (index % 100);
}

function generateProject(index) {
  const category = randomFrom(categories);
  const prefix = randomFrom(projectPrefixes[category]);
  const suffix = randomFrom(projectSuffixes[category]);
  const name = `${prefix} ${suffix}`;
  const location = randomFrom(cities);
  const id = generateProjectId(name) + '-' + location.stateCode.toLowerCase();

  // Determine power capacity based on category
  const powerRanges = {
    ai: [200, 800],
    energy: [500, 2000],
    cooling: [50, 300],
    semiconductors: [300, 1000],
    fiber: [20, 100],
    robotics: [100, 400],
    manufacturing: [200, 600],
    water: [50, 200],
    government: [300, 700],
    defense: [200, 500],
    transportation: [100, 400],
    space: [300, 800],
    construction: [50, 200],
    security: [100, 300]
  };

  const [minPower, maxPower] = powerRanges[category];
  const powerCapacityMw = randomInt(minPower, maxPower);

  // Calculate capital needed based on power capacity and category
  const capitalPerMw = {
    ai: 8000000,
    semiconductors: 15000000,
    energy: 3000000,
    cooling: 2000000,
    fiber: 1000000,
    space: 10000000,
    defense: 5000000,
    government: 6000000,
    robotics: 4000000,
    manufacturing: 3500000,
    water: 2500000,
    transportation: 4000000,
    construction: 2000000,
    security: 3000000
  };

  const capitalNeeded = powerCapacityMw * capitalPerMw[category] + randomInt(-500000000, 500000000);

  // Generate funding percentage based on stage
  const fundingStage = randomFrom(fundingStages);
  const fundingRanges = {
    'Seed': [5, 25],
    'Series A': [20, 45],
    'Series B': [40, 65],
    'Series C': [60, 80],
    'Series D': [75, 95],
    'Project Finance': [30, 70],
    'Government Contract': [50, 90]
  };

  const [minFunding, maxFunding] = fundingRanges[fundingStage];
  const fundingPct = randomInt(minFunding, maxFunding);

  // Select appropriate image
  const categoryImages = infrastructureImages[category] || infrastructureImages.ai;
  const image = randomFrom(categoryImages);

  // Generate logo URL
  const logoGenerator = randomFrom(logoGenerators);
  const logo = logoGenerator(name, id);

  // Timeline based on construction status
  const constructionStatus = randomFrom(constructionStatuses);
  const timelineMap = {
    'Design': `Q${randomInt(1, 4)} 2028`,
    'Permitting': `Q${randomInt(1, 4)} 2027`,
    'Site Prep': `Q${randomInt(1, 4)} 2026`,
    'Under Construction': `Q${randomInt(1, 4)} 2025`,
    'Operational': 'Operating'
  };

  return {
    id,
    name,
    category,
    city: location.city,
    state: location.state,
    stateCode: location.stateCode,
    coordinates: [location.lat, location.lon],
    image,
    logo,
    powerCapacityMw,
    fundingPct,
    fundingStage,
    constructionStatus,
    timeline: timelineMap[constructionStatus],
    risk: randomFrom(riskLevels),
    developer: randomInt(1, 10) > 3 ? `${prefix} Development Group` : 'Confidential',
    capitalNeeded: Math.round(capitalNeeded),
    cooling: randomFrom(coolingTypes),
    power: randomFrom(powerStatuses),
    fiber: randomFrom(fiberOptions),
    landAcres: randomInt(20, 500),
    utility: randomFrom(utilities),
    incentives: randomFrom(incentives),
    tokenSymbol: generateTokenSymbol(name, index),
    summary: `${name} is a ${category} infrastructure project in ${location.city}, ${location.state}, advancing America's AI infrastructure with verified, discoverable and trackable records on XSolut.`
  };
}

// Generate 160 projects
const projects = [];
for (let i = 0; i < 160; i++) {
  projects.push(generateProject(i));
}

// Output as JSON
console.log(JSON.stringify(projects, null, 2));