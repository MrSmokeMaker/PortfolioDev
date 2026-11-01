const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '..');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Replace <img ...> tags that don't already have loading attribute
  const newContent = content.replace(/<img([^>]*?)>/g, (match, attrs) => {
    if (/loading=/.test(attrs)) return match;
    return `<img${attrs} loading="lazy">`;
  });
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Updated lazy loading in', filePath);
  }
}

function walk(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) processFile(full);
  });
}

walk(srcDir);
console.log('Lazy loading added to all img tags');
