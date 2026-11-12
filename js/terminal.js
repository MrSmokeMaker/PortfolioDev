/**
 * Interactive Desktop Mini-Terminal
 * Supports command input, history, auto-completion, rich output, and navigation triggers.
 */

(function () {
  const terminal = document.getElementById('interactive-terminal');
  if (!terminal) return;

  const output = document.getElementById('terminal-output');
  const input = document.getElementById('terminal-input');
  const quickChips = document.querySelectorAll('.quick-chip, .term-cmd-hint');

  // Command History
  const history = [];
  let historyIndex = -1;

  const commands = {
    help: () => {
      return `
<span class="info-text">Доступные команды терминала:</span>
  <span class="term-cmd-hint" data-cmd="skills">skills</span>      - Список ключевых технологий и компетенций
  <span class="term-cmd-hint" data-cmd="projects">projects</span>    - Обзор флагманских проектов
  <span class="term-cmd-hint" data-cmd="bio">bio</span>         - Философия вайбкодинга и бэкграунд
  <span class="term-cmd-hint" data-cmd="whoami">whoami</span>      - Информация о текущей сессии
  <span class="term-cmd-hint" data-cmd="contact">contact</span>     - Способы связи и соцсети
  <span class="term-cmd-hint" data-cmd="repo">repo</span>        - Ссылка на GitHub репозиторий
  <span class="term-cmd-hint" data-cmd="matrix">matrix</span>      - Активировать вайб-режим
  <span class="term-cmd-hint" data-cmd="date">date</span>        - Текущее время системы
  <span class="term-cmd-hint" data-cmd="clear">clear</span>       - Очистить экран консоли
      `;
    },

    skills: () => {
      return `
<span class="info-text">⚡ Технологический стек:</span>
  • <span style="color:#a5b4fc">AI & Agents:</span> Gemini 3.8 SDK, LangChain, Supabase pgvector, MCP Tooling
  • <span style="color:#67e8f9">Frontend:</span> Next.js 15, React 19, TypeScript, Tailwind CSS, Canvas API
  • <span style="color:#6ee7b7">Backend:</span> Node.js, Bun, Supabase PostgreSQL, Redis, Edge Functions
  • <span style="color:#fde047">GameDev:</span> Godot 4 (GDScript/C#), WebAudio, Shaders, 60fps Loop
      `;
    },

    projects: () => {
      return `
<span class="info-text">📂 Топ-3 проекта:</span>
  1. <strong style="color:#fff">Nexus AI Orchestrator</strong> — Платформа для автономных агентов с RAG
  2. <strong style="color:#fff">HyperFlow SaaS</strong> — Высоконагруженный дашборд реального времени (Supabase)
  3. <strong style="color:#fff">Aether Void (Godot 4)</strong> — 2D Sci-Fi Roguelite с процедурной генерацией
<span class="info-dim">💡 Перейдите на вкладку 'Проекты' для детального Bento Grid и интерактива.</span>
      `;
    },

    bio: () => {
      return `
<span class="info-text">👤 Alex Rivera // AI Vibe Coder & Full-Stack Architect:</span>
  Объединяю 8+ лет инженерного опыта и мощность современных LLM-агентов.
  Мой принцип: максимальный фокус на архитектуре и ценности для продукта,
  сверхбыстрая скорость поставки фич без накопления технического долга.
      `;
    },

    whoami: () => {
      return `guest@rivera-quantum-workspace (role: Evaluator & Innovator, status: VIP Access)`;
    },

    contact: () => {
      return `
<span class="info-text">📫 Контакты для связи:</span>
  • Email: <span style="color:#38bdf8">alex.rivera.dev@gmail.com</span>
  • Telegram: <span style="color:#38bdf8">@alex_rivera_dev</span>
  • GitHub: <span style="color:#38bdf8">github.com/MrSmokeMaker</span>
      `;
    },

    repo: () => {
      return `GitHub: <a href="https://github.com/MrSmokeMaker/PortfolioDev" target="_blank" style="color:#38bdf8; text-decoration:underline;">https://github.com/MrSmokeMaker/PortfolioDev</a>`;
    },

    matrix: () => {
      return `<span style="color:#10b981">Wake up, Neo... The Matrix has you. Follow the vibe coder. 🟢✨</span>`;
    },

    sudo: () => {
      return `<span style="color:#f43f5e">Permission denied: You already possess root access in your mind.</span>`;
    },

    date: () => {
      return new Date().toLocaleString('ru-RU', { timeZoneName: 'short' });
    },

    clear: () => {
      output.innerHTML = '';
      return null;
    }
  };

  function appendLine(content, className = '') {
    const line = document.createElement('div');
    line.className = `term-line ${className}`;
    line.innerHTML = content;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  function handleCommand(cmdRaw) {
    const trimmed = cmdRaw.trim();
    if (!trimmed) return;

    // Echo input
    appendLine(`<span class="term-prompt">user@portfolio:~$</span> ${escapeHTML(trimmed)}`);

    // Add to history
    history.push(trimmed);
    historyIndex = history.length;

    const parts = trimmed.toLowerCase().split(' ');
    const cmd = parts[0];

    if (commands[cmd]) {
      const result = commands[cmd]();
      if (result !== null) {
        appendLine(result);
      }
    } else {
      appendLine(`<span style="color:#f87171">Команда не найдена: '${escapeHTML(cmd)}'. Введите <span class="term-cmd-hint" data-cmd="help">help</span> для справки.</span>`);
    }
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  // Keydown handling for Enter, History, Tab autocomplete
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const value = input.value;
        input.value = '';
        handleCommand(value);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (history.length > 0 && historyIndex > 0) {
          historyIndex--;
          input.value = history[historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < history.length - 1) {
          historyIndex++;
          input.value = history[historyIndex];
        } else {
          historyIndex = history.length;
          input.value = '';
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        const current = input.value.trim().toLowerCase();
        if (current) {
          const match = Object.keys(commands).find(c => c.startsWith(current));
          if (match) {
            input.value = match;
          }
        }
      }
    });
  }

  // Quick chip click delegation
  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-cmd]');
    if (target) {
      const cmd = target.getAttribute('data-cmd');
      if (cmd) {
        if (input) input.value = '';
        handleCommand(cmd);
      }
    }
  });

  // Focus input when clicking anywhere on terminal container
  terminal.addEventListener('click', () => {
    if (input) input.focus();
  });

})();
