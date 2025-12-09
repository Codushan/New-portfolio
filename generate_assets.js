const fs = require('fs');
const path = require('path');

const publicDir = path.join(process.cwd(), 'public');

const projects = [
    { name: 'project-baatwaat', title: 'BaatWaat', color: '#6366f1' },
    { name: 'project-prithvi', title: 'Prithvi', color: '#10b981' },
    { name: 'project-gis', title: 'GIS Image', color: '#06b6d4' },
    { name: 'project-rig', title: 'RIG Club', color: '#f59e0b' },
    { name: 'project-ai-chat', title: 'AI Chat', color: '#ec4899' },
    { name: 'project-medibot', title: 'Medibot', color: '#f43f5e' },
    { name: 'project-auth', title: 'Login Sys', color: '#3b82f6' },
    { name: 'project-location', title: 'Location', color: '#84cc16' },
    { name: 'project-library', title: 'Library', color: '#14b8a6' },
];

function generateSVG(title, color) {
    return `
<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e1e1e;stop-opacity:1" />
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#grad)" />
  <rect width="100%" height="100%" fill="url(#grid)" />
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="48" fill="white" font-weight="bold" letter-spacing="2">
    ${title.toUpperCase()}
  </text>
  <circle cx="50" cy="50" r="20" fill="rgba(255,255,255,0.1)" />
  <circle cx="750" cy="550" r="100" fill="rgba(255,255,255,0.05)" />
</svg>`;
}

function generateNoiseSVG() {
    return `
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <filter id="noiseFilter">
    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
  </filter>
  <rect width="100%" height="100%" filter="url(#noiseFilter)" opacity="0.5"/>
</svg>
`;
}

// Ensure public dir exists
if (!fs.existsSync(publicDir)) {
    console.log("Public directory not found, checking relative path...");
    // Assuming we are running this from root or adjacent, try to find public
}

console.log(`Generating images in ${publicDir}...`);

// Generate Project Images
projects.forEach(project => {
    const filePath = path.join(publicDir, `${project.name}.svg`);
    fs.writeFileSync(filePath, generateSVG(project.title, project.color));
    console.log(`Created ${project.name}.svg`);
});

// Generate Noise
const noisePath = path.join(publicDir, 'noise.svg');
fs.writeFileSync(noisePath, generateNoiseSVG());
console.log('Created noise.svg');

console.log('Done.');
