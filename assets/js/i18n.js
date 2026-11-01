/**
 * ==========================================================================
 * BILINGUAL LOCALIZATION ENGINE (RU ⇄ EN)
 * Instant in-place translation without reloading
 * ==========================================================================
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'mobbi_portfolio_lang';

  const TRANSLATIONS = {
    ru: {
      dev_name: 'Коровин Сергей',
      nav_projects: 'Проекты (6)',
      nav_skills: 'Компетенции',
      nav_estimator: 'Оценка проекта',
      nav_reviews: 'Отзывы',
      nav_cmd_tip: 'Командная строка (Cmd+K)',
      nav_theme_tip: 'Сменить тему (Light/Dark/OLED)',
      nav_sound_tip: 'Звуки интерфейса',

      hero_role: 'Senior UI/UX Engineer & Lead Design Systems Architect',
      hero_bio: 'Проектирую цифровые продукты мирового уровня (Awwwards / Mobbin Elite). Объединяю строгую модульную архитектуру дизайн-систем, 60 FPS аппаратные анимации, Web Audio API, Canvas телеметрию и бескомпромиссную скорость загрузки.',
      hero_explore: 'Исследовать 6 проектов',
      hero_qr_btn: 'Показать QR Telegram',
      hero_versions_btn: 'Хроника версий v3.1',

      telemetry_title: 'Системная телеметрия',
      telemetry_lcp_lbl: 'Скорость первого кадра (LCP)',
      telemetry_fps_lbl: 'Частота интерфейса',
      telemetry_deps_lbl: 'Сторонние библиотеки',
      telemetry_deps_val: '0 KB (Pure Vanilla)',
      telemetry_tg_tip: 'Кликните для открытия QR-кода',

      metric_1_num: '99.98%',
      metric_1_desc: 'Uptime в высоконагруженных сервисах с аудиторией более 2.4 млн MAU',
      metric_2_desc: 'Средний LCP на всех промо-сайтах портфолио без сторонних бандлеров',
      metric_3_num: '6 кейсов',
      metric_3_desc: 'Разноплановых полнофункциональных веб-приложений и промо-экосистем',
      metric_4_num: '40+ токенов',
      metric_4_desc: 'Переиспользуемых дизайн-токенов в единой масштабируемой системе Mobbi',

      showcase_title: 'Избранные проекты экосистемы',
      showcase_subtitle: '6 архитектурных направлений: от финтеха и медтеха до Web Audio синтезаторов',
      tab_all: 'Все (6)',
      tab_fintech: 'Финтех',
      tab_saas: 'AI & SaaS',
      tab_medtech: 'MedTech',
      tab_audio: 'Web Audio',
      tab_art: 'Галерея',
      tab_craft: 'Крафт',
      btn_quick_view: 'Быстрый просмотр',
      btn_open_site: 'Открыть сайт →',

      skills_title: 'Матрица инженерных компетенций',
      skills_subtitle: 'Глубокая экспертиза в проектировании высоконагруженных интерфейсов',

      est_badge: 'Калькулятор разработки',
      est_title: 'Интерактивная оценка скоупа проекта',
      est_desc: 'Рассчитайте примерный диапазон сроков и бюджета для создания кастомного интерфейса или дизайн-системы.',
      est_screens_lbl: 'Количество ключевых экранов / шаблонов:',
      est_opt_lbl: 'Дополнительные инженерные модули:',
      est_opt_ds: 'Дизайн-система & Токены',
      est_opt_motion: '3D Motion / Canvas',
      est_opt_api: 'Интеграция API / WebSockets',
      est_budget_lbl: 'Ориентировочный бюджет',
      est_timeline_lbl: 'Сроки реализации под ключ:',
      est_cta: 'Обсудить ТЗ в Telegram →',

      guestbook_badge: 'Обратная связь & Репутация',
      guestbook_title: 'Оценка проектов & Отзывы коллег',
      guestbook_desc: 'Оцените технический уровень, архитектуру и дизайн портфолио. Ваша оценка сохраняется в реальном времени.',
      guestbook_score_lbl: 'Средняя оценка коллег:',
      guestbook_submit_btn: 'Оставить отзыв',

      footer_status: 'Статус: Открыт к интересным предложениям',
      footer_copy_email: 'Скопировать Email',
      footer_repo: 'GitHub Репозиторий'
    },

    en: {
      dev_name: 'Sergey Korovin',
      nav_projects: 'Projects (6)',
      nav_skills: 'Expertise',
      nav_estimator: 'Estimator',
      nav_reviews: 'Reviews',
      nav_cmd_tip: 'Command Palette (Cmd+K)',
      nav_theme_tip: 'Switch Theme (Light/Dark/OLED)',
      nav_sound_tip: 'Interface Sounds',

      hero_role: 'Senior UI/UX Engineer & Lead Design Systems Architect',
      hero_bio: 'Crafting world-class digital products (Awwwards / Mobbin Elite grade). Bridging strict design system tokens, 60 FPS hardware animations, Web Audio API, Canvas real-time telemetry, and uncompromising zero-bundle load speeds.',
      hero_explore: 'Explore 6 Showcases',
      hero_qr_btn: 'Telegram QR Code',
      hero_versions_btn: 'Changelog v3.1',

      telemetry_title: 'System Telemetry',
      telemetry_lcp_lbl: 'Largest Contentful Paint (LCP)',
      telemetry_fps_lbl: 'Interface Refresh Rate',
      telemetry_deps_lbl: 'External Dependencies',
      telemetry_deps_val: '0 KB (Pure Vanilla)',
      telemetry_tg_tip: 'Click to display Telegram QR modal',

      metric_1_num: '99.98%',
      metric_1_desc: 'Uptime across high-load production apps serving 2.4M+ MAU',
      metric_2_desc: 'Average LCP across all portfolio sites with zero bundling bloat',
      metric_3_num: '6 Apps',
      metric_3_desc: 'Fully functional production showcases across contrasting industries',
      metric_4_num: '40+ Tokens',
      metric_4_desc: 'Scalable multi-theme design tokens engineered in Mobbi Engine',

      showcase_title: 'Featured Production Showcases',
      showcase_subtitle: '6 unique architectural styles: from Institutional FinTech to Web Audio Synthesizers',
      tab_all: 'All (6)',
      tab_fintech: 'FinTech',
      tab_saas: 'AI & SaaS',
      tab_medtech: 'MedTech',
      tab_audio: 'Web Audio',
      tab_art: 'Editorial Art',
      tab_craft: 'Craft Shop',
      btn_quick_view: 'Quick Preview',
      btn_open_site: 'Launch App →',

      skills_title: 'Engineering Competencies Matrix',
      skills_subtitle: 'Deep cross-functional expertise in scalable, high-density web interfaces',

      est_badge: 'Scope & Cost Calculator',
      est_title: 'Interactive Project Estimator',
      est_desc: 'Calculate estimated development delivery timeline and budget for custom interfaces and design systems.',
      est_screens_lbl: 'Key views / interface screens count:',
      est_opt_lbl: 'Additional engineering modules:',
      est_opt_ds: 'Design System & Tokens',
      est_opt_motion: '3D Motion / Canvas 60FPS',
      est_opt_api: 'API & WebSockets Engine',
      est_budget_lbl: 'Estimated Budget',
      est_timeline_lbl: 'Turnkey Delivery Timeline:',
      est_cta: 'Discuss Scope on Telegram →',

      guestbook_badge: 'Peer Review & Reputation',
      guestbook_title: 'Community Reviews & Portfolio Rating',
      guestbook_desc: 'Rate the technical precision, motion fidelity, and visual architecture. Feedback persists in real-time.',
      guestbook_score_lbl: 'Average Community Rating:',
      guestbook_submit_btn: 'Submit Review',

      footer_status: 'Status: Open to Senior / Lead Frontend Architect Roles',
      footer_copy_email: 'Copy Email',
      footer_repo: 'GitHub Repository'
    }
  };

  function getCurrentLang() {
    return localStorage.getItem(STORAGE_KEY) || 'ru';
  }

  window.setLanguage = function (lang) {
    if (!['ru', 'en'].includes(lang)) lang = 'ru';
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.setAttribute('lang', lang);

    const langBtn = document.getElementById('lang-toggle-btn');
    if (langBtn) {
      langBtn.innerHTML = `<span>${lang.toUpperCase()}</span>`;
    }

    const dict = TRANSLATIONS[lang] || TRANSLATIONS.ru;
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Also update placeholder attributes if tagged
    const placeholderEls = document.querySelectorAll('[data-i18n-ph]');
    placeholderEls.forEach((el) => {
      const key = el.getAttribute('data-i18n-ph');
      if (dict[key]) {
        el.placeholder = dict[key];
      }
    });

    if (window.playUiSound) window.playUiSound(580, 0.04, 'sine');
    if (window.showToast) {
      window.showToast(lang === 'ru' ? 'Язык интерфейса: Русский' : 'Language set to English');
    }
  };

  window.toggleLanguage = function () {
    const cur = getCurrentLang();
    const next = cur === 'ru' ? 'en' : 'ru';
    window.setLanguage(next);
  };

  document.addEventListener('DOMContentLoaded', () => {
    window.setLanguage(getCurrentLang());
  });

})();
