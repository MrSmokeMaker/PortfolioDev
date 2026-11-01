const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '..');

function replaceImgWithPicture(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const newContent = content.replace(/<img([^>]*?)src=["']([^"'>]+\.(png|jpe?g))["']([^>]*?)>/gi, (match, before, src, ext, after) => {
    // skip if already inside a <picture>
    if (/\<picture[^>]*\>/i.test(content.slice(0, content.indexOf(match)))) return match;
    const webp = src.replace(/\.(png|jpe?g)$/i, '.webp');
    const avif = src.replace(/\.(png|jpe?g)$/i, '.avif');
    return `<picture>
  <source type="image/avif" srcset="${avif}">
  <source type="image/webp" srcset="${webp}">
  <img${before} src="${src}"${after}>
</picture>`;
  });
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Converted img to picture in', filePath);
  }
}

function walk(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) replaceImgWithPicture(full);
  });
}

walk(srcDir);
console.log('Picture conversion completed');
