#!/usr/bin/env node
/* 
# Helper script to install favicons for new brand
# 1. Set up the directory structure
node scripts/setup-brand-favicons.js newbrand
# 2. Copy your favicon files to public/favicons/newbrand/
# 3. Update lib/favicon-config.ts to add the new brand config
# 4. Update lib/types/themes.ts to include the new theme 
*/

const fs = require('fs');
const path = require('path');

const brandId = process.argv[2];

if (!brandId) {
  console.error('Usage: node scripts/setup-brand-favicons.js <brand-id>');
  process.exit(1);
}

const faviconDir = path.join(process.cwd(), 'public', 'favicons', brandId);

// Create directory
fs.mkdirSync(faviconDir, { recursive: true });

// Create template manifest
const manifestTemplate = {
  "name": `${brandId.charAt(0).toUpperCase() + brandId.slice(1)} Store`,
  "short_name": brandId.toUpperCase(),
  "description": `${brandId.charAt(0).toUpperCase() + brandId.slice(1)} Official Store`,
  "start_url": "/",
  "display": "standalone", 
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": `/favicons/${brandId}/icon-192.png`,
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": `/favicons/${brandId}/icon-512.png`,
      "sizes": "512x512", 
      "type": "image/png"
    }
  ]
};

fs.writeFileSync(
  path.join(faviconDir, 'manifest.json'),
  JSON.stringify(manifestTemplate, null, 2)
);

console.log(`✅ Created favicon directory for ${brandId}`);
console.log(`📁 Place your favicon files in: public/favicons/${brandId}/`);
console.log(`📋 Required files:`);
console.log(`   - favicon.ico`);
console.log(`   - icon.svg`);
console.log(`   - icon-192.png`);
console.log(`   - icon-512.png`);
console.log(`   - apple-icon.png`);
console.log(`📝 Don't forget to update lib/favicon-config.ts!`);


