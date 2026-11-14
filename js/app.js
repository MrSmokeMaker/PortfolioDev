/**
 * Main Application Module
 * SPA Routing, Bento Grid Renderer, Modal Manager, Form Handler & Toast System.
 */

// ==========================================================================
// 1. DATA REPOSITORY: BENTO GRID PROJECTS
// ==========================================================================
const PROJECTS_DATA = [
  {
    id: 'nexus-ai',
    title: 'Nexus AI Orchestrator',
    category: 'ai',
    categoryLabel: 'AI & Multi-Agents',
    status: 'Production Ready',
    colSpan: 'col-span-2',
    shortDesc: 'Автономная платформа оркестрации мультиагентных систем на базе Gemini 3.8 и Supabase pgvector. Поддерживает протокол MCP, динамический контекстный RAG и параллельное выполнение пайплайнов.',
    fullDesc: 'Nexus AI решает проблему координации нескольких специализированных нейросетевых агентов для решения комплексных инженерных задач. Система анализирует высокоуровневую задачу, разбивает её на подзадачи, делегирует их агентам (архитектор, кодер, тестировщик) и агрегирует результат с верификацией.',
    stack: ['Gemini 3.8 SDK', 'Supabase pgvector', 'Next.js 15', 'TypeScript', 'MCP Protocol', 'Bun'],
    metrics: [
      { label: 'Скорость обработки', value: '450ms RAG Latency' },
      { label: 'Параллельные агенты', value: 'до 12 одновременно' },
      { label: 'Точность генерации', value: '98.4% по бенчмаркам' }
    ],
    architecture: 'Next.js 15 Server Components + Supabase Edge Functions + PostgreSQL pgvector с иерархическим разбиением эмбеддингов. Подключение к локальным инструментам разработчика через кастомный сервер Model Context Protocol (MCP).',
    previewGradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(139, 92, 246, 0.35) 100%)',
    demoUrl: '#',
    githubUrl: 'https://github.com/MrSmokeMaker/PortfolioDev'
  },
  {
    id: 'hyperflow-saas',
    title: 'HyperFlow Cloud Platform',
    category: 'web',
    categoryLabel: 'Web & SaaS',
    status: 'Live SaaS',
    colSpan: '',
    shortDesc: 'Высоконагруженный дашборд реального времени для мониторинга микросервисов и API-шлюзов с моментальной реакцией интерфейса.',
    fullDesc: 'HyperFlow обеспечивает непрерывный мониторинг состояния распределенных сервисов. Включает настраиваемые виджеты, real-time графики на базе WebGL Canvas, алерты в Telegram/Slack и автоматическую аналитику аномалий трафика.',
    stack: ['Next.js 15', 'Supabase Realtime', 'Tailwind CSS', 'Redis', 'TypeScript'],
    metrics: [
      { label: 'Uptime', value: '99.98%' },
      { label: 'Событий в секунду', value: '50,000+ RPS' },
      { label: 'Клиенты', value: '1,400+ активных инженеров' }
    ],
    architecture: 'Event-driven архитектура с WebSockets и Redis pub/sub. Фронтенд построен на React 19 с виртуализацией списков и мемоизацией вычислений метрик.',
    previewGradient: 'linear-gradient(135deg, rgba(0, 245, 255, 0.2) 0%, rgba(59, 130, 246, 0.3) 100%)',
    demoUrl: '#',
    githubUrl: 'https://github.com/MrSmokeMaker/PortfolioDev'
  },
  {
    id: 'aether-void',
    title: 'Aether Void (Godot 4)',
    category: 'gamedev',
    categoryLabel: 'GameDev & WebGL',
    status: 'Steam & Web Demo',
    colSpan: '',
    shortDesc: '2D Sci-Fi Roguelite с процедурной генерацией секторов, шейдерными неоновыми эффектами и кастомным физическим движком.',
    fullDesc: 'Игровой проект, разработанный на Godot Engine 4.3 с экспортом в WebAssembly/WebGL для браузера. Включает процедурную генерацию космических станций, продвинутое древо способностей кораблей, систему реактивного звука на WebAudio и шейдерные пост-эффекты частиц.',
    stack: ['Godot 4.3', 'GDScript / C#', 'GLSL Shaders', 'WebAssembly', 'WebAudio API'],
    metrics: [
      { label: 'FPS', value: '60 FPS стабильно (даже на Mobile)' },
      { label: 'Шейдерные проходы', value: 'Zero-drop post-FX' },
      { label: 'Скачиваний демо', value: '8,500+' }
    ],
    architecture: 'Модульная компонентная архитектура Godot с пулом объектов (Object Pooling) для предотвращения работы сборщика мусора и снижения задержек ввода.',
    previewGradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.25) 0%, rgba(168, 85, 247, 0.3) 100%)',
    demoUrl: '#',
    githubUrl: 'https://github.com/MrSmokeMaker/PortfolioDev'
  },
  {
    id: 'quantum-fintech',
    title: 'Quantum Pulse FinTech Suite',
    category: 'web',
    categoryLabel: 'FinTech & Analytics',
    status: 'Enterprise Demo',
    colSpan: 'col-span-2',
    shortDesc: 'Интерфейс для алготрейдинга и портфельного риск-менеджмента с мгновенной отрисовкой стаканов заявок и графиков свечей через Canvas.',
    fullDesc: 'Торговый терминал корпоративного уровня с отрисовкой биржевых графиков на чистом HTML5 Canvas с частотой 120 кадров в секунду при миллионах точек данных. Интеграция с кошельками, симуляция бэктестов стратегий и экспорт отчетов.',
    stack: ['TypeScript', 'Canvas 2D Engine', 'WebSockets', 'Tailwind CSS', 'Supabase Auth'],
    metrics: [
      { label: 'Задержка обновления тиков', value: '< 16ms' },
      { label: 'Обработка данных', value: '1.2M котировок в RAM' },
      { label: 'Рейтинг аудита безопасности', value: 'A+ High Security' }
    ],
    architecture: 'Web Worker для вычислений технических индикаторов (MACD, RSI, Bollinger Bands) в отдельном потоке, изолируя основной UI поток от подвисаний.',
    previewGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(14, 165, 233, 0.3) 100%)',
    demoUrl: '#',
    githubUrl: 'https://github.com/MrSmokeMaker/PortfolioDev'
  },
  {
    id: 'omnivoice-ai',
    title: 'OmniVoice Realtime Studio',
    category: 'ai',
    categoryLabel: 'Voice AI & Streaming',
    status: 'Private Beta',
    colSpan: '',
    shortDesc: 'Двунаправленная потоковая трансляция голоса и диалоговый ИИ-ассистент с минимальной задержкой ответа через WebRTC и Gemini Live.',
    fullDesc: 'Инновационная студия интерактивного голосового взаимодействия. Поддерживает динамическое распознавание пауз речи (VAD), синтез эмоционально окрашенных ответов и параллельное подключение внешних инструментов поиска информации.',
    stack: ['Gemini Live API', 'WebRTC', 'AudioWorklet', 'Node.js', 'Tailwind CSS'],
    metrics: [
      { label: 'Audio Latency', value: '~280ms Round-trip' },
      { label: 'Поддержка языков', value: '30+ языков в реалтайме' },
      { label: 'Обработка шума', value: 'Интегрированный AI DSP' }
    ],
    architecture: 'Клиентский Web Audio API с AudioWorklet узлами для захвата 16kHz PCM звука, передача по защищенным WebSocket каналам на стриминговый шлюз.',
    previewGradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(239, 68, 68, 0.3) 100%)',
    demoUrl: '#',
    githubUrl: 'https://github.com/MrSmokeMaker/PortfolioDev'
  },
  {
    id: 'vibestack-cli',
    title: 'VibeStack Developer CLI',
    category: 'web',
    categoryLabel: 'Developer Tools',
    status: 'Open Source',
    colSpan: '',
    shortDesc: 'Консольная утилита для мгновенного развертывания full-stack проектов с преднастроенными агентами, Supabase миграциями и тестами.',
    fullDesc: 'Инструмент для разработчиков нового поколения. Одной командой генерирует типобезопасные схемы баз данных, настроенные RPC методы, конфигурацию MCP серверов и компоненты пользовательского интерфейса.',
    stack: ['Node.js', 'Bun CLI', 'Commander.js', 'Inquirer', 'PostgreSQL Generator'],
    metrics: [
      { label: 'Звёзд на GitHub', value: '620+ Stars' },
      { label: 'Ускорение бутстрапа', value: 'с 2 часов до 45 секунд' },
      { label: 'Пакеты', value: 'npm & brew' }
    ],
    architecture: 'Модульный AST-генератор кода, валидация по схемам Zod, автоматическое создание Docker-compose окружений.',
    previewGradient: 'linear-gradient(135deg, rgba(147, 51, 234, 0.25) 0%, rgba(79, 70, 229, 0.3) 100%)',
    demoUrl: '#',
    githubUrl: 'https://github.com/MrSmokeMaker/PortfolioDev'
  }
];

// ==========================================================================
// 2. SPA NAVIGATION ROUTER
// ==========================================================================
class AppRouter {
  constructor() {
    this.sections = document.querySelectorAll('.page-section');
    this.navLinks = document.querySelectorAll('[data-nav]');
    this.currentRoute = 'home';

    this.init();
  }

  init() {
    // Hash change event listener
    window.addEventListener('hashchange', () => this.handleHashChange());

    // Navigation click delegation
    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-nav]');
      if (link) {
        const route = link.getAttribute('data-nav');
        if (route) {
          e.preventDefault();
          this.navigateTo(route);
        }
      }
    });

    // Handle initial route from URL
    this.handleHashChange();
  }

  handleHashChange() {
    const rawHash = window.location.hash.replace('#', '').trim();
    const route = rawHash || 'home';
    this.navigateTo(route, false);
  }

  navigateTo(route, updateHash = true) {
    const targetSection = document.getElementById(`section-${route}`);
    if (!targetSection) {
      route = 'home';
    }

    this.currentRoute = route;

    // Update active class on sections
    this.sections.forEach(sec => {
      sec.classList.remove('active');
    });

    const activeSec = document.getElementById(`section-${route}`);
    if (activeSec) {
      activeSec.classList.add('active');
    }

    // Update active states on desktop nav & mobile dock
    this.navLinks.forEach(link => {
      if (link.getAttribute('data-nav') === route) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    if (updateHash) {
      history.pushState(null, null, `#${route}`);
    }

    // Scroll window smoothly to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ==========================================================================
// 3. BENTO GRID CONTROLLER
// ==========================================================================
class BentoGridController {
  constructor() {
    this.container = document.getElementById('projects-bento-grid');
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.currentFilter = 'all';

    this.init();
  }

  init() {
    this.render();
    this.bindFilters();
  }

  bindFilters() {
    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentFilter = btn.getAttribute('data-filter') || 'all';
        this.render();
      });
    });
  }

  render() {
    if (!this.container) return;

    const filtered = PROJECTS_DATA.filter(p => {
      if (this.currentFilter === 'all') return true;
      return p.category === this.currentFilter;
    });

    this.container.innerHTML = filtered.map(project => {
      const tagsHtml = project.stack.map(tag => `<span class="stack-tag">${tag}</span>`).join('');
      
      return `
        <article class="bento-card glass-panel ${project.colSpan}" data-project-id="${project.id}">
          <div>
            <div class="project-visual-preview" style="background: ${project.previewGradient}">
              <div class="preview-badge-overlay">${project.status}</div>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color: rgba(255,255,255,0.7)">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            
            <div class="project-meta-top">
              <span class="project-category-tag">${project.categoryLabel}</span>
              <span class="project-status-pill">${project.status}</span>
            </div>

            <h3 class="project-title">${project.title}</h3>
            <p class="project-desc">${project.shortDesc}</p>
          </div>

          <div>
            <div class="project-stack-tags">
              ${tagsHtml}
            </div>
            <div class="bento-card-action">
              <span>Подробнее о кейсе</span>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }
}

// ==========================================================================
// 4. MODAL MANAGER
// ==========================================================================
class ModalManager {
  constructor() {
    this.modal = document.getElementById('project-modal');
    this.modalContent = document.getElementById('modal-content');
    this.closeBtn = document.getElementById('modal-close');

    this.init();
  }

  init() {
    // Open on project card click
    document.addEventListener('click', (e) => {
      const card = e.target.closest('[data-project-id]');
      if (card) {
        const id = card.getAttribute('data-project-id');
        this.open(id);
      }
    });

    // Close button
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    // Backdrop click
    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.close();
        }
      });
    }

    // Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal && this.modal.classList.contains('open')) {
        this.close();
      }
    });
  }

  open(projectId) {
    const project = PROJECTS_DATA.find(p => p.id === projectId);
    if (!project || !this.modalContent) return;

    const metricsHtml = project.metrics.map(m => `
      <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 12px 16px; border-radius: 8px; text-align: center;">
        <div style="font-family: var(--font-heading); font-size: 1.25rem; font-weight: 700; color: #a5b4fc;">${m.value}</div>
        <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">${m.label}</div>
      </div>
    `).join('');

    const stackHtml = project.stack.map(s => `<span class="stack-tag">${s}</span>`).join('');

    this.modalContent.innerHTML = `
      <div style="margin-bottom: 24px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
          <span class="mono-tag">${project.categoryLabel}</span>
          <span class="project-status-pill">${project.status}</span>
        </div>
        <h2 id="modal-title" style="font-family: var(--font-heading); font-size: 2rem; font-weight: 800; color: #ffffff;">${project.title}</h2>
      </div>

      <div class="project-visual-preview" style="background: ${project.previewGradient}; height: 200px; margin-bottom: 24px;">
        <div class="preview-badge-overlay">${project.status}</div>
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color: rgba(255,255,255,0.8)">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      </div>

      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 24px;">
        ${metricsHtml}
      </div>

      <div style="margin-bottom: 24px;">
        <h4 style="font-size: 1.1rem; font-weight: 600; color: #ffffff; margin-bottom: 8px;">Бизнес-логика и суть проекта</h4>
        <p style="color: var(--text-muted); line-height: 1.7; font-size: 0.95rem;">${project.fullDesc}</p>
      </div>

      <div style="margin-bottom: 24px;">
        <h4 style="font-size: 1.1rem; font-weight: 600; color: #ffffff; margin-bottom: 8px;">Архитектурное решение</h4>
        <p style="color: var(--text-muted); line-height: 1.7; font-size: 0.95rem;">${project.architecture}</p>
      </div>

      <div style="margin-bottom: 28px;">
        <h4 style="font-size: 1.1rem; font-weight: 600; color: #ffffff; margin-bottom: 10px;">Использованный стек</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${stackHtml}
        </div>
      </div>

      <div style="display: flex; gap: 14px; flex-wrap: wrap; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 20px;">
        <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          <span>Смотреть код на GitHub</span>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
        </a>
        <button class="btn btn-secondary btn-sm" onclick="showToast('Демо-доступ активен. Свяжитесь для приватного тестирования.');">
          Запросить Live Demo
        </button>
      </div>
    `;

    this.modal.classList.add('open');
    this.modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (!this.modal) return;
    this.modal.classList.remove('open');
    this.modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

// ==========================================================================
// 5. TOAST NOTIFICATION UTILITY
// ==========================================================================
function showToast(message, duration = 3500) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span>⚡</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ==========================================================================
// 6. FORM & CLIPBOARD HANDLERS
// ==========================================================================
function initFormsAndActions() {
  // Copy Email Handlers
  document.addEventListener('click', (e) => {
    const copyBtn = e.target.closest('.copy-email-btn');
    if (copyBtn) {
      const email = copyBtn.getAttribute('data-email') || 'alex.rivera.dev@gmail.com';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          showToast(`Email скопирован в буфер: ${email}`);
        }).catch(() => {
          showToast(`Email: ${email}`);
        });
      } else {
        showToast(`Email: ${email}`);
      }
    }
  });

  // Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('form-name')?.value.trim();
      const email = document.getElementById('form-email')?.value.trim();
      const message = document.getElementById('form-message')?.value.trim();

      if (!name || !email || !message) {
        showToast('Пожалуйста, заполните все обязательные поля.');
        return;
      }

      // Simulate sending
      if (submitBtn) {
        submitBtn.disabled = true;
        const spinner = submitBtn.querySelector('.btn-spinner');
        if (spinner) spinner.classList.remove('hidden');
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          const spinner = submitBtn.querySelector('.btn-spinner');
          if (spinner) spinner.classList.add('hidden');
        }

        contactForm.reset();

        if (formStatus) {
          formStatus.classList.remove('hidden');
          formStatus.className = 'form-status-msg success';
          formStatus.textContent = 'Спасибо! Ваше сообщение принято. Я свяжусь с вами в течение 2-4 часов.';
        }

        showToast('✅ Сообщение успешно отправлено!');
      }, 1000);
    });
  }
}

// ==========================================================================
// 7. STUDIO STAGE CONTROLLER (Awwwards Live Showcase)
// ==========================================================================
class StudioStageController {
  constructor() {
    this.conceptBtns = document.querySelectorAll('.stage-concept-btn');
    this.deviceBtns = document.querySelectorAll('.device-btn');
    this.frameWrap = document.getElementById('deviceFrameWrap');
    this.iframe = document.getElementById('stageIframe');
    this.externalLink = document.getElementById('stageExternalLink');

    this.init();
  }

  init() {
    // 1. Concept Switching
    this.conceptBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.conceptBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const conceptUrl = btn.getAttribute('data-concept');
        if (this.iframe && conceptUrl) {
          this.iframe.style.opacity = '0.3';
          this.iframe.style.transition = 'opacity 0.25s ease';
          this.iframe.src = conceptUrl;
          this.iframe.onload = () => {
            this.iframe.style.opacity = '1';
          };
        }

        if (this.externalLink && conceptUrl) {
          this.externalLink.href = conceptUrl;
        }

        showToast(`Загрузка концепции: ${btn.textContent.trim()}`);
      });
    });

    // 2. Device Mode Switching
    this.deviceBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.deviceBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const device = btn.getAttribute('data-device');
        if (this.frameWrap) {
          this.frameWrap.classList.remove('macbook-mode', 'ipad-mode', 'iphone-mode');
          this.frameWrap.classList.add(`${device}-mode`);
        }
      });
    });
  }
}

// ==========================================================================
// 8. BOOTSTRAP APPLICATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  window.appRouter = new AppRouter();
  window.bentoGrid = new BentoGridController();
  window.modalManager = new ModalManager();
  window.studioStage = new StudioStageController();
  initFormsAndActions();
});
