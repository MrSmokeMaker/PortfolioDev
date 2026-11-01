const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcDir = path.resolve(__dirname, '..', 'assets');
const outDir = path.resolve(__dirname, '..', 'dist', 'assets');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function processImage(filePath) {
  const rel = path.relative(srcDir, filePath);
  const outPath = path.join(outDir, rel);
  ensureDir(path.dirname(outPath));
  const ext = path.extname(filePath).toLowerCase();
  const base = path.basename(filePath, ext);
  const destDir = path.dirname(outPath);
  // copy original
  fs.copyFileSync(filePath, outPath);
  // generate WebP
  sharp(filePath)
    .webp({ quality: 80 })
    .toFile(path.join(destDir, `${base}.webp`))
    .catch(err => console.error('WebP error', err));
  // generate AVIF
  sharp(filePath)
    .avif({ quality: 50 })
    .toFile(path.join(destDir, `${base}.avif`))
    .catch(err => console.error('AVIF error', err));
}

function walk(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (['.png', '.jpg', '.jpeg'].includes(path.extname(entry.name).toLowerCase())) {
      processImage(full);
    }
  });
}

walk(srcDir);
console.log('Image optimization complete');
