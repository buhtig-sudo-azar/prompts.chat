const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SVG_DIR = path.join(__dirname, '../public/favicon');
const svgPath = path.join(SVG_DIR, 'favicon.svg');

async function generateFavicons() {
  const svg = fs.readFileSync(svgPath);
  
  // Generate different sizes
  const sizes = [
    { name: 'favicon-96x96.png', size: 96 },
    { name: 'web-app-manifest-192x192.png', size: 192 },
    { name: 'web-app-manifest-512x512.png', size: 512 },
    { name: 'apple-touch-icon.png', size: 180 },
  ];
  
  for (const { name, size } of sizes) {
    const outPath = path.join(SVG_DIR, name);
    await sharp(svg)
      .resize(size, size)
      .png()
      .toFile(outPath);
    console.log(`✅ Generated ${name} (${size}x${size})`);
  }
  
  // Generate ICO (use 32x32 PNG as favicon.ico)
  const icoBuffer = await sharp(svg)
    .resize(32, 32)
    .png()
    .toBuffer();
  
  // Simple ICO format: header + 1 PNG entry
  const pngSize = icoBuffer.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // count: 1
  
  const entry = Buffer.alloc(16);
  entry.writeUInt8(32, 0);  // width
  entry.writeUInt8(32, 1);  // height
  entry.writeUInt8(0, 2);   // colors
  entry.writeUInt8(0, 3);   // reserved
  entry.writeUInt16LE(1, 4);  // planes
  entry.writeUInt16LE(32, 6); // bpp
  entry.writeUInt32LE(pngSize, 8); // size
  entry.writeUInt32LE(22, 12);     // offset (6 + 16 = 22)
  
  const ico = Buffer.concat([header, entry, icoBuffer]);
  fs.writeFileSync(path.join(SVG_DIR, 'favicon.ico'), ico);
  console.log('✅ Generated favicon.ico');
  
  console.log('\n🎉 All favicons generated!');
}

generateFavicons().catch(console.error);
