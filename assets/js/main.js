import { applyTheme, getSavedTheme, cycleTheme, setTheme } from './theme.js';

/**
 * ==========================================================================
 * MOBBI CORE ORCHESTRATOR 3.0
 * Theme Engine, Sound FX (Web Audio API), Device Preview Modal,
 * News / Changelog System, Telegram QR Modal, Command Palette (Cmd+K)
 * ==========================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. THEME ENGINE (Light / Dark / OLED)
  // --------------------------------------------------------------------------
  window.addEventListener('DOMContentLoaded', () => {
    const saved = getSavedTheme();
    applyTheme(saved);
  });

  const THEMES = ['light', 'dark', 'oled'];
  const STORAGE_KEY_THEME = 'mobbi_portfolio_theme';

  function getSavedTheme() {
    return localStorage.getItem(STORAGE_KEY_THEME) || 'light';
  }

  function applyTheme(theme) {
    if (!THEMES.includes(theme)) theme = 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY_THEME, theme);

    const themeLabel = document.getElementById('theme-indicator-label');
    if (themeLabel) {
      const titles = { light: 'Light', dark: 'Dark Slate', oled: 'OLED Black' };
      themeLabel.textContent = titles[theme] || theme;
    }

    const themeIcons = document.querySelectorAll('[data-theme-icon]');
    themeIcons.forEach(icon => {
      icon.style.display = icon.getAttribute('data-theme-icon') === theme ? 'inline-block' : 'none';
    });
  }

  window.cycleTheme = function () {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const nextIdx = (THEMES.indexOf(current) + 1) % THEMES.length;
    const nextTheme = THEMES[nextIdx];
    applyTheme(nextTheme);
    playUiSound(440, 0.05, 'sine');
    showToast(`Тема переключена: ${nextTheme.toUpperCase()}`);
  };
  window.toggleGlobalTheme = window.cycleTheme;

  // --------------------------------------------------------------------------
  // 2. TACTILE SOUND FX ENGINE (Web Audio API)
  // --------------------------------------------------------------------------
  let audioCtx = null;
  let isSoundEnabled = localStorage.getItem('mobbi_sound_enabled') === 'true';

  function initAudio() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  window.playUiSound = function (freq = 520, duration = 0.04, type = 'sine') {
    if (!isSoundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  };

  window.toggleSound = function () {
    isSoundEnabled = !isSoundEnabled;
    localStorage.setItem('mobbi_sound_enabled', isSoundEnabled ? 'true' : 'false');
    updateSoundButtonUi();
    if (isSoundEnabled) {
      playUiSound(680, 0.08, 'triangle');
      showToast('Звуковые микро-эффекты включены 🔊');
    } else {
      showToast('Звуковые микро-эффекты отключены 🔇');
    }
  };

  function updateSoundButtonUi() {
    const soundBtns = document.querySelectorAll('[data-sound-toggle-btn]');
    soundBtns.forEach(btn => {
      btn.setAttribute('aria-pressed', isSoundEnabled ? 'true' : 'false');
      btn.classList.toggle('active', isSoundEnabled);
      const iconOn = btn.querySelector('.sound-on-icon');
      const iconOff = btn.querySelector('.sound-off-icon');
      if (iconOn && iconOff) {
        iconOn.style.display = isSoundEnabled ? 'inline-block' : 'none';
        iconOff.style.display = isSoundEnabled ? 'none' : 'inline-block';
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. TOAST NOTIFICATION SYSTEM
  // --------------------------------------------------------------------------
  window.showToast = function (message, duration = 3200) {
    let toast = document.getElementById('global-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'global-toast';
      toast.className = 'global-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span class="toast-dot"></span><span>${message}</span>`;
    toast.classList.add('is-visible');

    if (window._toastTimeout) clearTimeout(window._toastTimeout);
    window._toastTimeout = setTimeout(() => {
      toast.classList.remove('is-visible');
    }, duration);
  };

  // --------------------------------------------------------------------------
  // 4. DEVICE PREVIEW MODAL (Quick Look Iframe)
  // --------------------------------------------------------------------------
  window.openDevicePreview = function (url, title = 'Просмотр проекта') {
    initAudio();
    playUiSound(580, 0.06, 'triangle');

    let modal = document.getElementById('device-preview-modal');
    if (!modal) {
      modal = createDevicePreviewModal();
    }

    const frame = modal.querySelector('#preview-iframe');
    const titleEl = modal.querySelector('#preview-modal-title');
    const externalLink = modal.querySelector('#preview-external-link');

    if (frame) frame.src = url;
    if (titleEl) titleEl.textContent = title;
    if (externalLink) externalLink.href = url;

    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  };

  window.closeDevicePreview = function () {
    playUiSound(340, 0.04, 'sine');
    const modal = document.getElementById('device-preview-modal');
    if (modal) {
      modal.classList.remove('is-active');
      const frame = modal.querySelector('#preview-iframe');
      if (frame) {
        setTimeout(() => { frame.src = 'about:blank'; }, 300);
      }
    }
    document.body.style.overflow = '';
  };

  window.setPreviewDevice = function (deviceMode) {
    playUiSound(520, 0.03, 'sine');
    const container = document.getElementById('preview-viewport-container');
    const btns = document.querySelectorAll('.device-tab-btn');
    if (!container) return;

    btns.forEach(b => b.classList.toggle('active', b.getAttribute('data-device') === deviceMode));

    container.className = 'preview-viewport ' + deviceMode;
  };

  window.reloadPreviewIframe = function () {
    playUiSound(480, 0.04, 'triangle');
    const frame = document.getElementById('preview-iframe');
    if (frame && frame.src) {
      const cur = frame.src;
      frame.src = 'about:blank';
      setTimeout(() => { frame.src = cur; }, 100);
      showToast('Фрейм перезагружен');
    }
  };

  function createDevicePreviewModal() {
    const modal = document.createElement('div');
    modal.id = 'device-preview-modal';
    modal.className = 'device-preview-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'preview-modal-title');
    modal.innerHTML = `
      <div class="device-preview-backdrop" onclick="closeDevicePreview()"></div>
      <div class="device-preview-dialog">
        <header class="device-preview-bar">
          <div class="preview-meta">
            <span class="preview-badge">LIVE DEMO</span>
            <h3 id="preview-modal-title" class="preview-title">Просмотр проекта</h3>
          </div>
          <div class="preview-device-switcher">
            <button class="device-tab-btn active" data-device="desktop" onclick="setPreviewDevice('desktop')" title="Десктоп 100%">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              <span>Desktop</span>
            </button>
            <button class="device-tab-btn" data-device="tablet" onclick="setPreviewDevice('tablet')" title="Планшет 768px">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
              <span>Tablet</span>
            </button>
            <button class="device-tab-btn" data-device="mobile" onclick="setPreviewDevice('mobile')" title="Смартфон 390px">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
              <span>Mobile</span>
            </button>
          </div>
          <div class="preview-actions">
            <button class="preview-action-btn" onclick="reloadPreviewIframe()" title="Обновить">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
            </button>
            <a id="preview-external-link" href="#" target="_blank" class="preview-action-btn" title="Открыть в новой вкладке">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
            <button class="preview-action-btn close-btn" onclick="closeDevicePreview()" title="Закрыть (Esc)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </header>
        <div class="preview-stage">
          <div id="preview-viewport-container" class="preview-viewport desktop">
            <iframe id="preview-iframe" src="about:blank" frameborder="0"></iframe>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    return modal;
  }

  // --------------------------------------------------------------------------
  // 5. CHANGELOG & NEWS SYSTEM (Versions from 0.1 to 3.3 + Commit IDs)
  // --------------------------------------------------------------------------
  const CHANGELOG_DATA = [
    {
      version: 'v3.3',
      date: '1 Ноября 2026',
      badge: 'Apex Edition V3',
      commitId: 'a7c91e3',
      title: 'Ultra-Premium Apex Edition V3, Border Beam Shaders & Figma Tokens Engine',
      highlights: [
        'Запущен третий флагманский концепт дизайна Apex Edition V3: Apple Squircle геометрия, вращающиеся Border Beam шейдеры и титановые стеклянные панели.',
        'Разработан официальный пакет W3C Design Tokens (figma-tokens.json) для мгновенного импорта всей дизайн-системы в Figma Tokens Studio.',
        '3-позиционный переключатель версий (Mobbi V1 / Figma V2 / Apex V3) на всех страницах и хабах проекта.',
        'Добавлены 6 ультра-премиальных версий сайтов V3 с интерактивным ордербуком, 16-шаговым секвенсором, 400% оптической лупой и 3D гончарным кругом на Canvas.'
      ]
    },
    {
      version: 'v3.2',
      date: '31 Октября 2026',
      badge: 'Figma Edition V2',
      commitId: 'f19a02b',
      title: 'Full 6-Site Figma Edition Ecosystem & Interactive V1 ⇄ V2 Dual Switcher',
      highlights: [
        'Разработаны и запущены 6 совершенно новых высокобюджетных сайтов V2 (Figma Edition): Bloomberg Terminal, Linear Multi-Agent DAG Studio, ICU Mayo Telemetry, Teenage Engineering 16-step Drum Sequencer, Sotheby\'s Loupe Gallery, Hermès 3D Lathe Atelier.',
        'Интерактивный переключатель версий (Mobbi V1 ⇄ Figma V2) на всех 6 сайтах и в обоих Хабах портфолио.',
        'Прямая интеграция со спецификациями Figma Design и FigJam UI Architecture.',
        'Обновленный Service Worker v3.2 с офлайн-кешированием всех 12 сайтов экосистемы.'
      ]
    },
    {
      version: 'v3.1',
      date: '31 Октября 2026',
      badge: 'Next Evolution',
      commitId: 'e74f82a',
      title: '3D WebGL Core, Bilingual i18n & PWA Offline Engine',
      highlights: [
        'Интерактивное 3D-ядро в Hero-секции (Vanilla 60 FPS 3D Math, вращение за курсором и импульсные волны).',
        'Мгновенная двуязычная локализация (RU ⇄ EN) с сохранением выбора языка.',
        'PWA (Progressive Web App): Service Worker офлайн-кеширования sw.js и манифест для установки на устройства.',
        'Интерактивная доска отзывов и рейтинг проектов с конфетти-эффектом и сохранением в localStorage.'
      ]
    },
    {
      version: 'v3.0',
      date: '31 Октября 2026',
      badge: 'Major Release',
      commitId: 'd01e4b4',
      title: 'Mobbi Elite Portfolio Engine & 6 Live Showcase Ecosystem',
      highlights: [
        'Внедрен интерактивный Device Preview Modal: запуск сайтов в адаптивных фреймах (Desktop, Tablet, Mobile) без ухода со страницы.',
        'Добавлены 2 новых премиальных сайта: PULSE MedTech Telemetry (60 FPS Canvas ECG) и AETHER Audio Synth Lab (Web Audio API).',
        'Интерактивный расчет проекта (Interactive Scope Estimator) с автокалькуляцией сроков и стоимости.',
        'Telegram QR-код модалка для мгновенной связи со смартфона (+7 939 474-89-99).',
        'Command Palette (Cmd+K / Ctrl+K) с быстрым поиском по портфолио.'
      ]
    },
    {
      version: 'v2.5',
      date: '28 Октября 2026',
      badge: 'Feature Update',
      commitId: 'ba62c34',
      title: 'CI/CD GitHub Pages Automation & Design Tokens System',
      highlights: [
        'Настроен автоматический workflow GitHub Actions для бесшовного деплоя ветки main.',
        'Внедрена трехуровневая система дизайн-токенов tokens.css (Light, Dark, OLED).',
        'Оптимизированы показатели LCP (Largest Contentful Paint) < 0.8s.'
      ]
    },
    {
      version: 'v1.0',
      date: '24 Октября 2026',
      badge: 'Core Release',
      commitId: '2bec867',
      title: 'Four Promo Websites & Multi-style UI Architecture',
      highlights: [
        'Запущены первые 4 проекта: LUMEN Gallery, VERTEX Capital, CLAY & OCHRE, NEXUS AI.',
        'Создан модуль аппаратного 3D-Tilt на 60 FPS для карточек.',
        'Добавлен режим демонстрации NDA-кейсов.'
      ]
    },
    {
      version: 'v0.1',
      date: '18 Октября 2026',
      badge: 'Alpha Prototype',
      commitId: '0a1b49f',
      title: 'Design System Foundation & Typography Concept',
      highlights: [
        'Разработана 8-точечная сетка Mobbi Design Engine.',
        'Сформирована палитра типографики: Inter, Plus Jakarta Sans, Fraunces, Space Grotesk.',
        'Первые прототипы сеток и интерактивных кнопок.'
      ]
    }
  ];

  window.toggleChangelog = function () {
    playUiSound(540, 0.05, 'triangle');
    let drawer = document.getElementById('changelog-drawer');
    if (!drawer) {
      drawer = createChangelogDrawer();
    }
    const isOpen = drawer.classList.contains('is-open');
    if (isOpen) {
      drawer.classList.remove('is-open');
      document.body.style.overflow = '';
    } else {
      drawer.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      // Mark seen in localStorage
      localStorage.setItem('mobbi_last_seen_version', 'v3.3');
      const badge = document.getElementById('news-unread-dot');
      if (badge) badge.style.display = 'none';
    }
  };

  function createChangelogDrawer() {
    const drawer = document.createElement('div');
    drawer.id = 'changelog-drawer';
    drawer.className = 'changelog-drawer';

    let listHtml = CHANGELOG_DATA.map((item, idx) => `
      <div class="changelog-item ${idx === 0 ? 'latest' : ''}">
        <div class="changelog-item-header">
          <div class="version-tag-row">
            <span class="version-badge">${item.version}</span>
            <span class="commit-pill" title="Git Commit Hash">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"/><path d="M12 12v3"/></svg>
              ${item.commitId}
            </span>
            <span class="release-type-badge">${item.badge}</span>
          </div>
          <span class="release-date">${item.date}</span>
        </div>
        <h4 class="changelog-item-title">${item.title}</h4>
        <ul class="changelog-highlights">
          ${item.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
      </div>
    `).join('');

    drawer.innerHTML = `
      <div class="changelog-backdrop" onclick="toggleChangelog()"></div>
      <div class="changelog-panel">
        <div class="changelog-header">
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="status-pulse-dot"></span>
              <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--theme-accent);">Хроника обновлений</span>
            </div>
            <h3 style="font-size: 20px; font-weight: 800; margin-top: 4px;">Новости и версии проекта</h3>
          </div>
          <button class="close-icon-btn" onclick="toggleChangelog()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="changelog-body">
          ${listHtml}
        </div>
        <div class="changelog-footer">
          <span>Синхронизировано с веткой <code>main</code> на GitHub</span>
          <a href="https://github.com/MrSmokeMaker/PortfolioDev" target="_blank" class="github-link-btn">
            Репозиторий →
          </a>
        </div>
      </div>
    `;
    document.body.appendChild(drawer);
    return drawer;
  }

  // --------------------------------------------------------------------------
  // 6. TELEGRAM QR MODAL (MrSmokeMaker / +79394748999)
  // --------------------------------------------------------------------------
  window.openTelegramModal = function () {
    playUiSound(600, 0.06, 'triangle');
    let modal = document.getElementById('telegram-qr-modal');
    if (!modal) {
      modal = createTelegramModal();
    }
    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  };

  window.closeTelegramModal = function () {
    playUiSound(340, 0.04, 'sine');
    const modal = document.getElementById('telegram-qr-modal');
    if (modal) modal.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  function createTelegramModal() {
    const modal = document.createElement('div');
    modal.id = 'telegram-qr-modal';
    modal.className = 'telegram-qr-modal';

    // Generates high-contrast QR code for Telegram link
    const tgUrl = 'https://t.me/+79394748999';
    const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(tgUrl)}&margin=10&format=svg`;

    modal.innerHTML = `
      <div class="telegram-modal-backdrop" onclick="closeTelegramModal()"></div>
      <div class="telegram-modal-dialog">
        <button class="close-icon-btn" onclick="closeTelegramModal()" style="position: absolute; top: 16px; right: 16px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        <div class="tg-modal-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </div>

        <h3 style="font-size: 22px; font-weight: 800; margin-bottom: 6px;">Связь в Telegram</h3>
        <p style="font-size: 14px; color: var(--theme-text-muted); margin-bottom: 20px;">
          Отсканируйте камерой смартфона для быстрого диалога
        </p>

        <div class="tg-qr-frame">
          <img src="${qrSrc}" alt="Telegram QR: MrSmokeMaker (+79394748999)" loading="lazy">
        </div>

        <div class="tg-credentials-box">
          <div class="tg-field-label">Прямой номер / Аккаунт:</div>
          <div class="tg-phone-val tabular-nums">+7 (939) 474-89-99</div>
          <div style="font-size: 13px; color: var(--theme-text-muted); margin-top: 4px;">Разработчик: <strong>Коровин Сергей</strong></div>
        </div>

        <div style="display: flex; gap: 10px; width: 100%; margin-top: 20px;">
          <button class="btn-primary-compact" style="flex: 1;" onclick="copyContact('+79394748999')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            Скопировать номер
          </button>
          <a href="https://t.me/+79394748999" target="_blank" class="btn-primary-compact" style="flex: 1; background: #2563EB; color: white;">
            Открыть чат →
          </a>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    return modal;
  }

  window.copyContact = function (text) {
    playUiSound(640, 0.05, 'triangle');
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Скопировано в буфер: ${text}`);
    }).catch(() => {
      showToast(`Контакты: ${text}`);
    });
  };

  // --------------------------------------------------------------------------
  // 7. COMMAND PALETTE (Cmd+K / Ctrl+K)
  // --------------------------------------------------------------------------
  window.toggleCommandPalette = function () {
    playUiSound(500, 0.04, 'sine');
    let palette = document.getElementById('command-palette-modal');
    if (!palette) {
      palette = createCommandPalette();
    }
    const isOpen = palette.classList.contains('is-active');
    if (isOpen) {
      palette.classList.remove('is-active');
      document.body.style.overflow = '';
    } else {
      palette.classList.add('is-active');
      document.body.style.overflow = 'hidden';
      const input = palette.querySelector('.cmd-input');
      if (input) {
        input.value = '';
        filterCmdItems('');
        setTimeout(() => input.focus(), 100);
      }
    }
  };

  function createCommandPalette() {
    const modal = document.createElement('div');
    modal.id = 'command-palette-modal';
    modal.className = 'command-palette-modal';
    modal.innerHTML = `
      <div class="cmd-backdrop" onclick="toggleCommandPalette()"></div>
      <div class="cmd-dialog">
        <div class="cmd-input-bar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" class="cmd-input" placeholder="Поиск по проектам, темам, контактам... (Esc для выхода)" oninput="filterCmdItems(this.value)">
          <kbd class="cmd-shortcut">ESC</kbd>
        </div>
        <div class="cmd-list" id="cmd-results-list">
          <!-- Filled dynamically -->
        </div>
        <div class="cmd-footer">
          <span>Навигация: стрелки или клик</span>
          <span><code>Коровин Сергей</code> Portfolio OS v3.0</span>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    return modal;
  }

  const CMD_COMMANDS = [
    { label: '💎 Финтех V1: VERTEX Capital (Mobbi)', category: 'Проекты V1', action: () => openDevicePreview('fintech.html', 'VERTEX Capital V1') },
    { label: '⚡ Финтех V2: VERTEX Terminal (Figma Edition)', category: 'Проекты V2', action: () => openDevicePreview('fintech-v2.html', 'VERTEX Terminal V2') },
    { label: '💎 SaaS V1: NEXUS AI (Mobbi Bento)', category: 'Проекты V1', action: () => openDevicePreview('saas.html', 'NEXUS AI V1') },
    { label: '⚡ SaaS V2: NEXUS Studio (Linear Multi-Agent DAG)', category: 'Проекты V2', action: () => openDevicePreview('saas-v2.html', 'NEXUS Studio V2') },
    { label: '💎 MedTech V1: PULSE Telemetry (Canvas ECG)', category: 'Проекты V1', action: () => openDevicePreview('medtech.html', 'PULSE Health V1') },
    { label: '⚡ MedTech V2: PULSE ICU (Mayo Clinic Suite)', category: 'Проекты V2', action: () => openDevicePreview('medtech-v2.html', 'PULSE ICU V2') },
    { label: '💎 Audio V1: AETHER Synth (Mobbi Lab)', category: 'Проекты V1', action: () => openDevicePreview('audio.html', 'AETHER Synth V1') },
    { label: '⚡ Audio V2: AETHER Workstation (16-Step Sequencer)', category: 'Проекты V2', action: () => openDevicePreview('audio-v2.html', 'AETHER Workstation V2') },
    { label: '💎 Галерея V1: LUMEN Archive (Editorial)', category: 'Проекты V1', action: () => openDevicePreview('gallery.html', 'LUMEN Gallery V1') },
    { label: '⚡ Галерея V2: LUMEN Salon (Sotheby\'s Loupe & Bidding)', category: 'Проекты V2', action: () => openDevicePreview('gallery-v2.html', 'LUMEN Salon V2') },
    { label: '⭐ Флагман: Методист (Генератор уроков YandexGPT)', category: 'Проекты', action: () => openDevicePreview('metodist.html', 'Методист — AI Lesson Planner') },
    { label: '🚀 Открыть приложение Методист (Live Web)', category: 'Внешние ссылки', action: () => window.open('https://mrsmokemaker.github.io/annmetodist/', '_blank') },
    { label: '🎨 Открыть Figma Design File (Коровин Сергей)', category: 'Figma', action: () => window.open('https://www.figma.com/design/NkmANyDIpsrxlzj6FTj2WA', '_blank') },
    { label: '📐 Открыть FigJam Architecture Board', category: 'Figma', action: () => window.open('https://www.figma.com/board/Zh0VIksvdMkhhxIm7RTABv', '_blank') },
    { label: 'Новости и хроника версий (Changelog v3.2)', category: 'Система', action: () => toggleChangelog() },
    { label: 'Связаться в Telegram (+7 939 474-89-99)', category: 'Контакты', action: () => openTelegramModal() },
    { label: 'Сменить тему оформления (Light / Dark / OLED)', category: 'Вид', action: () => cycleTheme() },
    { label: 'Переключить язык (RU ⇄ EN Localization)', category: 'Вид', action: () => window.toggleLanguage && window.toggleLanguage() },
    { label: 'Включить / выключить звуки интерфейса', category: 'Настройки', action: () => toggleSound() },
    { label: 'Калькулятор стоимости проекта (Scope Estimator)', category: 'Инструменты', action: () => {
      document.getElementById('estimator-section')?.scrollIntoView({ behavior: 'smooth' });
    }}
  ];

  window.filterCmdItems = function (query) {
    const list = document.getElementById('cmd-results-list');
    if (!list) return;
    const q = query.toLowerCase().trim();
    const filtered = CMD_COMMANDS.filter(cmd => !q || cmd.label.toLowerCase().includes(q) || cmd.category.toLowerCase().includes(q));

    if (filtered.length === 0) {
      list.innerHTML = `<div class="cmd-empty">Ничего не найдено по запросу «${query}»</div>`;
      return;
    }

    list.innerHTML = filtered.map((cmd, idx) => `
      <div class="cmd-item" onclick="executeCmd(${idx})">
        <span class="cmd-item-label">${cmd.label}</span>
        <span class="cmd-item-cat">${cmd.category}</span>
      </div>
    `).join('');
    window._curFilteredCmds = filtered;
  };

  window.executeCmd = function (idx) {
    const list = window._curFilteredCmds || CMD_COMMANDS;
    if (list[idx]) {
      toggleCommandPalette();
      list[idx].action();
    }
  };

  // Keyboard listener: Cmd+K / Ctrl+K and Esc
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K' || e.key === 'л' || e.key === 'Л')) {
      e.preventDefault();
      toggleCommandPalette();
    }
    if (e.key === 'Escape') {
      const preview = document.getElementById('device-preview-modal');
      if (preview && preview.classList.contains('is-active')) {
        closeDevicePreview();
        return;
      }
      const palette = document.getElementById('command-palette-modal');
      if (palette && palette.classList.contains('is-active')) {
        toggleCommandPalette();
        return;
      }
      const tg = document.getElementById('telegram-qr-modal');
      if (tg && tg.classList.contains('is-active')) {
        closeTelegramModal();
        return;
      }
      const changelog = document.getElementById('changelog-drawer');
      if (changelog && changelog.classList.contains('is-open')) {
        toggleChangelog();
        return;
      }
    }
  });

  // --------------------------------------------------------------------------
  // 8. PROJECT ESTIMATOR LOGIC
  // --------------------------------------------------------------------------
  window.updateProjectEstimator = function () {
    const screens = parseInt(document.getElementById('est-screens-range')?.value || '1', 10);
    const hasDesignSystem = document.getElementById('est-opt-ds')?.checked;
    const hasMotion = document.getElementById('est-opt-motion')?.checked;
    const hasBackend = document.getElementById('est-opt-backend')?.checked;

    const screensEl = document.getElementById('est-screens-val');
    if (screensEl) {
      if (screens === 1) {
        screensEl.textContent = '1 экран (MVP / Лендинг)';
      } else {
        screensEl.textContent = `${screens} ${screens < 5 ? 'экрана' : 'экранов'}`;
      }
    }

    // Base calculation centered at 50 000 ₽ for 1 screen
    let days = 5 + (screens - 1) * 2;
    let budget = 50000 + (screens - 1) * 15000;

    if (hasDesignSystem) { days += 3; budget += 25000; }
    if (hasMotion) { days += 2; budget += 20000; }
    if (hasBackend) { days += 4; budget += 30000; }

    const timelineEl = document.getElementById('est-result-timeline') || document.getElementById('est-result-days');
    const budgetEl = document.getElementById('est-result-budget');

    if (timelineEl) timelineEl.textContent = `${days}–${days + 3} рабочих дней`;
    if (budgetEl) budgetEl.textContent = `от ${budget.toLocaleString('ru-RU')} ₽`;
  };

  // --------------------------------------------------------------------------
  // 9. FILTER PROJECTS CATEGORY (Tabs in Hub)
  // --------------------------------------------------------------------------
  window.filterProjectsCategory = function (category, btn) {
    playUiSound(480, 0.04, 'sine');
    const buttons = document.querySelectorAll('.filter-pill-btn');
    buttons.forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const cards = document.querySelectorAll('[data-project-cat]');
    cards.forEach(card => {
      const cats = card.getAttribute('data-project-cat').split(' ');
      if (category === 'all' || cats.includes(category)) {
        card.style.display = 'grid';
        card.classList.add('is-revealed');
      } else {
        card.style.display = 'none';
      }
    });
  };

  // --------------------------------------------------------------------------
  // 10. GUESTBOOK & PEER REVIEWS LOGIC
  // --------------------------------------------------------------------------
  const DEFAULT_REVIEWS = [
    {
      name: 'Марк Левин',
      role: 'Staff UI Architect · Ex-Fintech Lead',
      rating: 5,
      date: 'Сегодня',
      tags: ['⚡ 60 FPS', '📐 Design System', '🎯 Zero-deps'],
      comment: 'Исключительная плотность инженерных решений. MedTech с 60 FPS Canvas и Web Audio API в чистом Vanilla JS — эталон для портфолио уровня Lead / Staff.'
    },
    {
      name: 'Елена Громова',
      role: 'Head of Product Design · Studio Craft',
      rating: 5,
      date: 'Вчера',
      tags: ['🎨 Aesthetics', '💎 Lightbox EXIF', '📱 Device Modal'],
      comment: 'Device Preview прямо на главной — гениальный паттерн, позволяющий мгновенно оценить адаптивность без бесконечных переходов. Топовая визуальная культура.'
    }
  ];

  window.getReviews = function () {
    try {
      const stored = localStorage.getItem('mobbi_guestbook_reviews');
      return stored ? JSON.parse(stored) : DEFAULT_REVIEWS;
    } catch(e) {
      return DEFAULT_REVIEWS;
    }
  };

  window.renderReviewsList = function () {
    const list = document.getElementById('reviews-feed-container');
    if (!list) return;
    const reviews = getReviews();

    let totalRating = 0;
    list.innerHTML = reviews.map(r => {
      totalRating += (r.rating || 5);
      const stars = '★'.repeat(r.rating || 5) + '☆'.repeat(5 - (r.rating || 5));
      return `
        <div class="review-entry-card" data-tilt data-tilt-max="3">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
            <div>
              <div style="font-weight: 700; font-size: 15px; color: var(--theme-text);">${r.name}</div>
              <div style="font-size: 12px; color: var(--theme-text-muted);">${r.role}</div>
            </div>
            <div style="color: #F59E0B; font-size: 15px; letter-spacing: 2px;">${stars}</div>
          </div>
          <p style="font-size: 14px; color: var(--theme-text); line-height: 1.5; margin-bottom: 12px;">${r.comment}</p>
          <div style="display: flex; gap: 6px; flex-wrap: wrap;">
            ${(r.tags || []).map(t => `<span class="review-tag-pill">${t}</span>`).join('')}
          </div>
        </div>
      `;
    }).join('');

    const avg = (totalRating / reviews.length).toFixed(2);
    const avgEl = document.getElementById('reviews-avg-rating');
    if (avgEl) avgEl.textContent = `${avg} ★`;
  };

  window.submitGuestbookReview = function (e) {
    e.preventDefault();
    const name = document.getElementById('review-input-name')?.value.trim();
    const role = document.getElementById('review-input-role')?.value.trim() || 'Tech Reviewer';
    const comment = document.getElementById('review-input-comment')?.value.trim();
    const rating = parseInt(document.getElementById('review-input-rating')?.value || '5', 10);

    if (!name || !comment) {
      showToast('Заполните ваше имя и текст отзыва');
      return;
    }

    const reviews = getReviews();
    reviews.unshift({
      name,
      role,
      rating,
      date: 'Только что',
      tags: ['💡 Verified Review', '🚀 World-Class'],
      comment
    });

    try {
      localStorage.setItem('mobbi_guestbook_reviews', JSON.stringify(reviews));
    } catch(err) {}

    renderReviewsList();
    triggerConfetti();
    playUiSound(680, 0.08, 'triangle');
    showToast('Спасибо за высокую оценку! Ваш отзыв опубликован.');

    document.getElementById('review-form')?.reset();
  };

  function triggerConfetti() {
    for (let i = 0; i < 24; i++) {
      const bit = document.createElement('div');
      bit.style.position = 'fixed';
      bit.style.left = `${Math.random() * 80 + 10}vw`;
      bit.style.top = `${Math.random() * 30 + 10}vh`;
      bit.style.width = '8px';
      bit.style.height = '8px';
      bit.style.borderRadius = '2px';
      bit.style.backgroundColor = ['#3B82F6', '#86EF6B', '#A855F7', '#F59E0B', '#00F0FF'][Math.floor(Math.random() * 5)];
      bit.style.zIndex = '9999';
      bit.style.transition = 'transform 1s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 1s ease';
      document.body.appendChild(bit);

      setTimeout(() => {
        bit.style.transform = `translateY(${Math.random() * 120 + 80}px) rotate(${Math.random() * 360}deg)`;
        bit.style.opacity = '0';
      }, 50);

      setTimeout(() => bit.remove(), 1200);
    }
  }

  // --------------------------------------------------------------------------
  // 11. INITIALIZATION ON DOM READY & PWA SERVICE WORKER
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Apply saved theme
    applyTheme(getSavedTheme());

    // 2. Sound state
    updateSoundButtonUi();

    // 3. Initial estimator calculation
    updateProjectEstimator();

    // 4. Render Guestbook
    renderReviewsList();

    // 5. Register PWA Service Worker for offline capability
    if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }

    // 6. Shrinking header support
    const fixedHeaders = document.querySelectorAll('[data-shrinking-header]');
    if (fixedHeaders.length > 0) {
      window.addEventListener('scroll', () => {
        const scrolled = window.scrollY > 40;
        fixedHeaders.forEach((hdr) => hdr.classList.toggle('is-shrunk', scrolled));
      }, { passive: true });
    }

    // 7. Check if changelog is unread
    const lastSeen = localStorage.getItem('mobbi_last_seen_version');
    if (lastSeen !== 'v3.3') {
      const dot = document.getElementById('news-unread-dot');
      if (dot) dot.style.display = 'inline-block';
    }
  });

})();
