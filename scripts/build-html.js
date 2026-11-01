const fs = require('fs');
const path = require('path');
const srcDir = path.resolve(__dirname, '..');
const distDir = path.resolve(__dirname, '..', 'dist');

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function copyHtmlFiles() {
  const files = fs.readdirSync(srcDir);
  files.forEach(file => {
    if (file.endsWith('.html')) {
      const srcPath = path.join(srcDir, file);
      const destPath = path.join(distDir, file);
      copyFile(srcPath, destPath);
      console.log(`Copied ${file}`);
    }
  });
}

copyHtmlFiles();
