import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the projects file
const projectsPath = path.join(__dirname, '../src/data/projects.json');
const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));

// Working infrastructure images from Unsplash (verified to be accessible)
const workingImages = {
  ai: [
    'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1200&h=800&fit=crop&q=80', // Network visualization
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=800&fit=crop&q=80', // AI concept
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop&q=80', // AI infrastructure
    'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=1200&h=800&fit=crop&q=80', // Server room
    'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1200&h=800&fit=crop&q=80', // Robot tech
  ],
  energy: [
    'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=800&fit=crop&q=80', // Solar panels
    'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&h=800&fit=crop&q=80', // Wind turbines
    'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=1200&h=800&fit=crop&q=80', // Power lines
    'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=1200&h=800&fit=crop&q=80', // Wind farm
    'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1200&h=800&fit=crop&q=80', // Solar field
  ],
  cooling: [
    'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=1200&h=800&fit=crop&q=80', // Industrial cooling
    'https://images.unsplash.com/photo-1597733336794-12d05021d510?w=1200&h=800&fit=crop&q=80', // Network infrastructure
    'https://images.unsplash.com/photo-1551703599-6b3e8379aa8c?w=1200&h=800&fit=crop&q=80', // Tech equipment
  ],
  semiconductors: [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop&q=80', // Circuit board
    'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=1200&h=800&fit=crop&q=80', // Microprocessor
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=800&fit=crop&q=80', // Chip manufacturing
  ],
  fiber: [
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&q=80', // Fiber optics
    'https://images.unsplash.com/photo-1597733336794-12d05021d510?w=1200&h=800&fit=crop&q=80', // Network cables
  ],
  robotics: [
    'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=1200&h=800&fit=crop&q=80', // Robot arm
    'https://images.unsplash.com/photo-1563207153-f403bf289096?w=1200&h=800&fit=crop&q=80', // Manufacturing robot
  ],
  manufacturing: [
    'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200&h=800&fit=crop&q=80', // Factory floor
    'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=1200&h=800&fit=crop&q=80', // Industrial automation
  ],
  water: [
    'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&h=800&fit=crop&q=80', // Water treatment
    'https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=1200&h=800&fit=crop&q=80', // Water infrastructure
  ],
  government: [
    'https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=1200&h=800&fit=crop&q=80', // Government building
    'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=1200&h=800&fit=crop&q=80', // Modern office
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop&q=80', // Office building
  ],
  defense: [
    'https://images.unsplash.com/photo-1541873676-a18131494184?w=1200&h=800&fit=crop&q=80', // Defense tech
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=800&fit=crop&q=80', // Tech infrastructure
  ],
  transportation: [
    'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1200&h=800&fit=crop&q=80', // Highway infrastructure
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=800&fit=crop&q=80', // Construction
  ],
  space: [
    'https://images.unsplash.com/photo-1446776709462-d6b525c57bd3?w=1200&h=800&fit=crop&q=80', // Space launch
    'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=1200&h=800&fit=crop&q=80', // Launch facility
  ],
  construction: [
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=800&fit=crop&q=80', // Construction site
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=800&fit=crop&q=80', // Building construction
  ],
  security: [
    'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&h=800&fit=crop&q=80', // Security tech
    'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=800&fit=crop&q=80', // Security infrastructure
  ]
};

// Known broken image IDs
const brokenImageIds = [
  '1551871812-10ecc21ffa6f',
  '1573164713714-d95e436ab8d6',
  '1544197150-b99a580bb7a8',
  '1606868306217-dbf5046868d2',
  '1565008576549-57569a49371d',
  '1574482620811-1aa16ffe3c82',
  '1569163139394-de4798aa62b6',
  '1541873676-a18131494184'
];

function getRandomImage(category) {
  const categoryImages = workingImages[category] || workingImages.ai;
  return categoryImages[Math.floor(Math.random() * categoryImages.length)];
}

// Update projects with broken images
const updatedProjects = projects.map(project => {
  // Check if the image URL contains any of the broken IDs
  const hasBrokenImage = brokenImageIds.some(id => project.image?.includes(id));

  if (hasBrokenImage || !project.image) {
    return {
      ...project,
      image: getRandomImage(project.category)
    };
  }

  return project;
});

// Write back the updated projects
fs.writeFileSync(projectsPath, JSON.stringify(updatedProjects, null, 2));

const fixedCount = updatedProjects.filter((p, i) => p.image !== projects[i]?.image).length;
console.log(`✅ Fixed ${fixedCount} projects with broken images`);