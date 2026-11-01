const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '..');

function addSrcset(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Find <img> tags with class="responsive" or "hero-image"
  const newContent = content.replace(/<img([^>]*?)class=["']([^"'>]*?\b(responsive|hero-image)\b[^"']*)["']([^>]*?)>/gi,
    (match, before, classVal, _, after) => {
      // Extract src attribute
      const srcMatch = match.match(/src=["']([^"']+\.(png|jpe?g))["']/i);
      if (!srcMatch) return match;
      const src = srcMatch[1];
      const webp = src.replace(/\.(png|jpe?g)$/i, '.webp');
      const avif = src.replace(/\.(png|jpe?g)$/i, '.avif');
      const srcset = `${avif} 1x, ${webp} 1x, ${src} 1x`;
      return `<img${before} class="${classVal}" src="${src}"${after} loading="lazy" srcset="${srcset}" sizes="(max-width: 600px) 100vw, 600px">`;
    }
  );
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Added srcset to', filePath);
  }
}

function walk(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) addSrcset(full);
  });
}

walk(srcDir);
console.log('srcset generation completed');
