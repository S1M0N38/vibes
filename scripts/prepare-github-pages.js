#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('Preparing build for GitHub Pages...');

// Files to remove for GitHub Pages static deployment
const filesToRemove = [
  'public/sw.js',
  'public/workbox-*.js',
  'public/manifest.json'
];

// Remove PWA files that cause issues with static deployment
filesToRemove.forEach(pattern => {
  if (pattern.includes('*')) {
    // Handle wildcard patterns
    const dir = path.dirname(pattern);
    const filePattern = path.basename(pattern);
    const regex = new RegExp(filePattern.replace('*', '.*'));
    
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        if (regex.test(file)) {
          const filePath = path.join(dir, file);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`Removed: ${filePath}`);
          }
        }
      });
    }
  } else {
    // Handle exact file paths
    if (fs.existsSync(pattern)) {
      fs.unlinkSync(pattern);
      console.log(`Removed: ${pattern}`);
    }
  }
});

console.log('GitHub Pages preparation complete!'); 