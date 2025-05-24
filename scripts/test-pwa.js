const fs = require('fs');
const path = require('path');

console.log('🧪 Testing PWA Configuration...\n');

// Test 1: Check if manifest.json exists and is valid
console.log('1. Testing Web App Manifest...');
try {
  const manifestPath = path.join(__dirname, '../public/manifest.json');
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    console.log('   ✅ Manifest exists');
    console.log(`   ✅ Name: ${manifest.name}`);
    console.log(`   ✅ Short name: ${manifest.short_name}`);
    console.log(`   ✅ Display: ${manifest.display}`);
    console.log(`   ✅ Icons: ${manifest.icons.length} defined`);
  } else {
    console.log('   ❌ Manifest not found');
  }
} catch (error) {
  console.log('   ❌ Manifest parse error:', error.message);
}

// Test 2: Check if service worker exists
console.log('\n2. Testing Service Worker...');
const swPath = path.join(__dirname, '../public/sw.js');
if (fs.existsSync(swPath)) {
  console.log('   ✅ Service worker exists');
  const swSize = fs.statSync(swPath).size;
  console.log(`   ✅ Service worker size: ${swSize} bytes`);
} else {
  console.log('   ❌ Service worker not found');
}

// Test 3: Check PWA icons
console.log('\n3. Testing PWA Icons...');
const iconsDir = path.join(__dirname, '../public/icons');
if (fs.existsSync(iconsDir)) {
  const icons = fs.readdirSync(iconsDir).filter(file => file.endsWith('.svg'));
  console.log(`   ✅ Found ${icons.length} icon files`);
  icons.forEach(icon => console.log(`   📱 ${icon}`));
} else {
  console.log('   ❌ Icons directory not found');
}

// Test 4: Check offline page
console.log('\n4. Testing Offline Support...');
const offlinePath = path.join(__dirname, '../public/offline.html');
if (fs.existsSync(offlinePath)) {
  console.log('   ✅ Offline page exists');
} else {
  console.log('   ❌ Offline page not found');
}

// Test 5: Check build output
console.log('\n5. Testing Build Output...');
const outDir = path.join(__dirname, '../out');
if (fs.existsSync(outDir)) {
  console.log('   ✅ Build output directory exists');
  const indexPath = path.join(outDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    console.log('   ✅ Index.html exists in build');
  } else {
    console.log('   ❌ Index.html not found in build');
  }
} else {
  console.log('   ❌ Build output directory not found');
}

console.log('\n🎉 PWA Test Complete!');
console.log('\n📋 Next Steps:');
console.log('1. Run "npm run build" if you haven\'t');
console.log('2. Serve with "npx serve@latest out"');
console.log('3. Open http://localhost:3000 in Chrome');
console.log('4. Open DevTools > Application tab');
console.log('5. Check Manifest, Service Workers, and Storage sections');
console.log('6. Test offline mode and installation'); 