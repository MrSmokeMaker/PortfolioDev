// theme.js – separate module for theme handling
export function getSavedTheme() {
  return localStorage.getItem('mobbi_portfolio_theme') || 'light';
}

export function applyTheme(theme) {
  const THEMES = ['light', 'dark', 'oled'];
  if (!THEMES.includes(theme)) theme = 'light';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('mobbi_portfolio_theme', theme);
  // Update theme indicator label if exists
  const themeLabel = document.getElementById('theme-indicator-label');
  if (themeLabel) {
    const titles = { light: 'Light', dark: 'Dark Slate', oled: 'OLED Black' };
    themeLabel.textContent = titles[theme] || theme;
  }
  // Toggle theme icons visibility
  document.querySelectorAll('[data-theme-icon]').forEach(icon => {
    icon.style.display = icon.getAttribute('data-theme-icon') === theme ? 'inline-block' : 'none';
  });
}

export function setTheme(theme) {
  applyTheme(theme);
}

export function cycleTheme() {
  const THEMES = ['light', 'dark', 'oled'];
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const nextIdx = (THEMES.indexOf(current) + 1) % THEMES.length;
  const nextTheme = THEMES[nextIdx];
  applyTheme(nextTheme);
  // UI feedback
  if (window.playUiSound) window.playUiSound(440, 0.05, 'sine');
  if (window.showToast) window.showToast(`Тема переключена: ${nextTheme.toUpperCase()}`);
}

if (typeof window !== 'undefined') {
  window.cycleTheme = cycleTheme;
  window.toggleGlobalTheme = cycleTheme;
  window.applyTheme = applyTheme;
}
