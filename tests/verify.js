/**
 * Automated Verification & Testing Suite
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  }
  console.log(`✅ PASSED: ${message}`);
}

console.log('--- Запуск верификационных тестов ---');

// 1. Проверка существования ключевых файлов
const requiredFiles = [
  'index.html',
  'css/style.css',
  'js/app.js',
  'js/terminal.js',
  'js/particles.js',
  'assets/favicon.svg',
  '.nojekyll',
  'README.md'
];

requiredFiles.forEach(file => {
  const filePath = path.join(ROOT, file);
  assert(fs.existsSync(filePath), `Файл существует: ${file}`);
  const stats = fs.statSync(filePath);
  assert(file === '.nojekyll' || stats.size > 0, `Файл не пустой: ${file} (${stats.size} байт)`);
});

// 2. Валидация структуры index.html
const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

const requiredElements = [
  '<!DOCTYPE html>',
  'id="bg-canvas"',
  'class="desktop-header"',
  'class="mobile-dock',
  'id="section-home"',
  'id="section-projects"',
  'id="section-stack"',
  'id="section-about"',
  'id="section-contact"',
  'id="interactive-terminal"',
  'id="projects-bento-grid"',
  'id="project-modal"',
  'id="toast-container"',
  'Online &amp; Building'
];

requiredElements.forEach(elem => {
  assert(indexHtml.includes(elem), `index.html содержит элемент: ${elem}`);
});

// 3. Валидация css/style.css
const styleCss = fs.readFileSync(path.join(ROOT, 'css/style.css'), 'utf8');
const requiredCssRules = [
  '--bg-main: #060911',
  '--bg-surface: #0b0f17',
  'backdrop-filter: var(--glass-blur)',
  '.bento-grid',
  '.desktop-header',
  '.mobile-dock',
  '@media (max-width: 768px)'
];

requiredCssRules.forEach(rule => {
  assert(styleCss.includes(rule), `css/style.css содержит правило: ${rule}`);
});

console.log('--- Все тесты успешно пройдены! ---');
