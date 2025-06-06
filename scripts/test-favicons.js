const fs = require('fs');
const path = require('path');

const brands = ['metaplanet', 'bmj'];
const requiredFiles = [
  'favicon.ico',
  'icon.svg', 
  'icon-192.png',
  'icon-512.png',
  'apple-icon.png',
  'manifest.json'
];

console.log('🔍 Testing favicon setup...\n');

brands.forEach(brand => {
  console.log(`📁 Checking ${brand}:`);
  
  const brandDir = path.join(process.cwd(), 'public', 'favicons', brand);
  
  if (!fs.existsSync(brandDir)) {
    console.log(`  ❌ Directory missing: ${brandDir}`);
    return;
  }
  
  requiredFiles.forEach(file => {
    const filePath = path.join(brandDir, file);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      console.log(`  ✅ ${file} (${stats.size} bytes)`);
    } else {
      console.log(`  ❌ ${file} MISSING`);
    }
  });
  
  console.log('');
});

// Test manifest content
console.log('📄 Testing manifest files:\n');

brands.forEach(brand => {
  const manifestPath = path.join(process.cwd(), 'public', 'favicons', brand, 'manifest.json');
  
  if (fs.existsSync(manifestPath)) {
    try {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      console.log(`✅ ${brand} manifest:`);
      console.log(`  Name: ${manifest.name}`);
      console.log(`  Short name: ${manifest.short_name}`);
      console.log(`  Icons: ${manifest.icons?.length || 0} defined`);
      console.log('');
    } catch (error) {
      console.log(`❌ ${brand} manifest JSON error:`, error.message);
    }
  } else {
    console.log(`❌ ${brand} manifest missing`);
  }
});

// Test configuration paths
console.log('🔗 Testing favicon paths:\n');

const testConfigs = {
  metaplanet: {
    favicon: '/favicons/metaplanet/favicon.ico',
    icon: '/favicons/metaplanet/icon.svg',
    appleTouchIcon: '/favicons/metaplanet/apple-icon.png',
    manifest: '/favicons/metaplanet/manifest.json'
  },
  bmj: {
    favicon: '/favicons/bmj/favicon.ico',
    icon: '/favicons/bmj/icon.svg',
    appleTouchIcon: '/favicons/bmj/apple-icon.png',
    manifest: '/favicons/bmj/manifest.json'
  }
};

Object.entries(testConfigs).forEach(([brand, config]) => {
  console.log(`🎨 ${brand} config:`);
  Object.entries(config).forEach(([type, filePath]) => {
    const fullPath = path.join(process.cwd(), 'public', filePath);
    const exists = fs.existsSync(fullPath);
    console.log(`  ${exists ? '✅' : '❌'} ${type}: ${filePath}`);
  });
  console.log('');
});

console.log('🎯 Next steps:');
console.log('1. npm run dev:metaplanet (test on localhost:3000)');
console.log('2. npm run dev:bmj (test on localhost:4000)');
console.log('3. Check browser tabs for correct favicons');
console.log('4. Open DevTools → Network tab to verify favicon loads');