const fs = require('fs');
const path = require('path');

// Simple SVG icon template
const createSVG = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#4F46E5"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size * 0.3}" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">V</text>
</svg>
`;

// Icon sizes for PWA
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

const iconsDir = path.join(__dirname, '../public/icons');

// Ensure icons directory exists
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Generate SVG icons for each size
sizes.forEach(size => {
  const svg = createSVG(size);
  const filename = `icon-${size}x${size}.svg`;
  const filepath = path.join(iconsDir, filename);
  
  fs.writeFileSync(filepath, svg);
  console.log(`Generated ${filename}`);
});

console.log('All PWA icons generated successfully!');
console.log('Note: These are placeholder SVG icons. For production, consider creating PNG icons or using a proper icon generation tool.'); 