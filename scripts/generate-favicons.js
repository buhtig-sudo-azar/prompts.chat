const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const faviconDir = path.join(__dirname, '..', 'public', 'favicon');
const svgPath = path.join(faviconDir, 'favicon.svg');

const svgContent = fs.readFileSync(svgPath);

async function generateFavicons() {
  // Generate 96x96 favicon
  await sharp(svgContent)
    .resize(96, 96)
    .png()
    .toFile(path.join(faviconDir, 'favicon-96x96.png'));
  console.log('Generated favicon-96x96.png');

  // Generate 192x192
  await sharp(svgContent)
    .resize(192, 192)
    .png()
    .toFile(path.join(faviconDir, 'web-app-manifest-192x192.png'));
  console.log('Generated web-app-manifest-192x192.png');

  // Generate 512x512
  await sharp(svgContent)
    .resize(512, 512)
    .png()
    .toFile(path.join(faviconDir, 'web-app-manifest-512x512.png'));
  console.log('Generated web-app-manifest-512x512.png');

  // Generate 180x180 apple-touch-icon
  await sharp(svgContent)
    .resize(180, 180)
    .png()
    .toFile(path.join(faviconDir, 'apple-touch-icon.png'));
  console.log('Generated apple-touch-icon.png');

  // Generate ICO (32x32 PNG embedded)
  const ico32 = await sharp(svgContent)
    .resize(32, 32)
    .png()
    .toBuffer();
  const ico48 = await sharp(svgContent)
    .resize(48, 48)
    .png()
    .toBuffer();
  
  // Simple ICO format with 2 images (48x48 and 32x32)
  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0); // Reserved
  icoHeader.writeUInt16LE(1, 2); // Type: 1 = ICO
  icoHeader.writeUInt16LE(2, 4); // Number of images

  // Image 1: 48x48
  const dir1 = Buffer.alloc(16);
  dir1.writeUInt8(48, 0);  // Width
  dir1.writeUInt8(48, 1);  // Height
  dir1.writeUInt8(0, 2);   // Color palette
  dir1.writeUInt8(0, 3);   // Reserved
  dir1.writeUInt16LE(1, 4);  // Color planes
  dir1.writeUInt16LE(32, 6); // Bits per pixel
  dir1.writeUInt32LE(ico48.length, 8); // Image size
  dir1.writeUInt32LE(6 + 16 * 2, 12);  // Offset

  // Image 2: 32x32
  const dir2 = Buffer.alloc(16);
  dir2.writeUInt8(32, 0);
  dir2.writeUInt8(32, 1);
  dir2.writeUInt8(0, 2);
  dir2.writeUInt8(0, 3);
  dir2.writeUInt16LE(1, 4);
  dir2.writeUInt16LE(32, 6);
  dir2.writeUInt32LE(ico32.length, 8);
  dir2.writeUInt32LE(6 + 16 * 2 + ico48.length, 12);

  const ico = Buffer.concat([icoHeader, dir1, dir2, ico48, ico32]);
  fs.writeFileSync(path.join(faviconDir, 'favicon.ico'), ico);
  console.log('Generated favicon.ico');

  // Update webmanifest
  const manifest = {
    name: "PromptForge",
    short_name: "PromptForge",
    description: "Кузница AI-промптов",
    icons: [
      { src: "/favicon/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/favicon/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png" }
    ],
    theme_color: "#f59e0b",
    background_color: "#0c0a09",
    display: "standalone"
  };
  fs.writeFileSync(path.join(faviconDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2));
  console.log('Updated site.webmanifest');

  console.log('All favicons generated!');
}

generateFavicons().catch(console.error);
