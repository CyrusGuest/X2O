import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the projects file
const projectsPath = path.join(__dirname, '../src/data/projects.json');
const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));

// Remove logo field from all projects
const updatedProjects = projects.map(project => {
  const { logo, ...rest } = project;
  return rest;
});

// Write back the updated projects
fs.writeFileSync(projectsPath, JSON.stringify(updatedProjects, null, 2));

console.log(`✅ Removed logo field from ${updatedProjects.length} projects`);