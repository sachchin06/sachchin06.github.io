// Generates the favicon PNG/ICO, Apple touch icon and Open Graph image into
// /public. Run once with `node scripts/make-images.mjs` and commit the output.
// Text comes from content/about.md so the OG image stays in step with it.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const pub = new URL('../public/', import.meta.url);
const about = readFileSync(new URL('../content/about.md', import.meta.url), 'utf8').replace(/\r\n/g, '\n');
const field = (key) => about.match(new RegExp(`^${key}:\\s*"(.*)"\\s*$`, 'm'))?.[1] ?? '';
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const name = esc(field('name'));
const headline = esc(field('headline'));
const location = esc(field('location'));
const font = "'Segoe UI', Arial, sans-serif";

// Icon: accent square with white initials (light theme colours).
const icon = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="${size >= 180 ? 0 : 12}" fill="#2563eb"/>
  <text x="32" y="43" text-anchor="middle" font-family="${font}" font-size="30" font-weight="700" fill="#ffffff">SK</text>
</svg>`;

await sharp(Buffer.from(icon(180))).png().toFile(fileURLToPath(new URL('apple-touch-icon.png', pub)));

// favicon.ico holding a single 32x32 PNG.
const png32 = await sharp(Buffer.from(icon(32))).png().toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(1, 4); // image count
header.writeUInt8(32, 6); // width
header.writeUInt8(32, 7); // height
header.writeUInt8(0, 8); // palette
header.writeUInt8(0, 9); // reserved
header.writeUInt16LE(1, 10); // colour planes
header.writeUInt16LE(32, 12); // bits per pixel
header.writeUInt32LE(png32.length, 14); // data size
header.writeUInt32LE(22, 18); // data offset
writeFileSync(new URL('favicon.ico', pub), Buffer.concat([header, png32]));

// Open Graph image, 1200x630.
const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#ffffff"/>
  <rect x="0" y="0" width="1200" height="12" fill="#2563eb"/>
  <rect x="96" y="150" width="88" height="88" rx="16" fill="#2563eb"/>
  <text x="140" y="210" text-anchor="middle" font-family="${font}" font-size="42" font-weight="700" fill="#ffffff">SK</text>
  <text x="96" y="340" font-family="${font}" font-size="64" font-weight="700" fill="#0f172a">${name}</text>
  <text x="96" y="410" font-family="${font}" font-size="40" font-weight="600" fill="#2563eb">${headline}</text>
  <text x="96" y="470" font-family="${font}" font-size="32" fill="#475569">${location}</text>
  <text x="96" y="560" font-family="'Consolas', monospace" font-size="26" fill="#475569">sachchin06.github.io</text>
</svg>`;
await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile(fileURLToPath(new URL('og-image.png', pub)));

console.log('Wrote favicon.ico, apple-touch-icon.png and og-image.png to /public');
