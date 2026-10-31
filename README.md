# 🚀 Senior UI/UX Developer Portfolio (Mobbi Design Engine)

Репозиторий: [MrSmokeMaker/PortfolioDev](https://github.com/MrSmokeMaker/PortfolioDev)

Интерактивное веб-портфолио и 4 полноценных промо-сайта в принципиально разных дизайн-стилях, спроектированных по методологии **Mobbi** с применением аппаратных анимаций CSS3, многослойного параллакса, 3D Tilt-эффектов и реальных фото-ассетов Unsplash.

---

## 🌟 Состав проектов

1. **[`index.html`](index.html)** — Главный хаб разработчика («Обо мне», 3 метрики эффективности, 4 карточки кейсов, режим коммерческой тайны NDA, форма контактов).
2. **[`gallery.html`](gallery.html)** — Проект 1: Арт-галерея **LUMEN Gallery** (*Воздушный минимализм + макро-фото, Scroll-driven параллакс, Shrinking Header*).
3. **[`fintech.html`](fintech.html)** — Проект 2: Финтех **VERTEX Capital** (*Строгий корпоративный, Data-Heavy, живые SVG графики, Data Table, модальное окно клиринга*).
4. **[`craft.html`](craft.html)** — Проект 3: Магазин керамики **CLAY & OCHRE** (*Органический тактильный e-commerce, 3D Tilt изделий, Slide-over чекаут-корзина*).
5. **[`saas.html`](saas.html)** — Проект 4: SaaS AI-платформа **NEXUS AI** (*Dark Bento Grid, курсорный Spotlight, неоновый лаймовый Mesh Glow, терминал кода*).
6. **[`404.html`](404.html)** — Оформленная страница ошибки с возвратом в хаб.

---

## ⚙️ Настройка и автоматический деплой в GitHub Pages

### Из какой ветки включать деплой?
Деплой настраивается для ветки **`main`**.

### Пошаговая активация автоматического деплоя (1 минута):
1. Откройте репозиторий на GitHub: **[https://github.com/MrSmokeMaker/PortfolioDev](https://github.com/MrSmokeMaker/PortfolioDev)**.
2. Перейдите во вкладку **Settings** (Настройки) → слева выберите раздел **Pages**.
3. В блоке **Build and deployment** в выпадающем списке **Source** выберите:
   👉 **`GitHub Actions`** *(Рекомендовано)*.
   *(В репозитории уже настроен workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), который будет автоматически пересобирать и публиковать сайт при каждом `git push` / коммите в ветку `main`).*
4. **Альтернативный вариант (Deploy from a branch)**:
   Если вы хотите использовать классический деплой из ветки:
   - Выберите **Source**: `Deploy from a branch`.
   - В поле **Branch**: выберите **`main`**, папку **`/ (root)`** и нажмите **Save**.

После этого сайт станет доступен по адресу:
🌐 **`https://mrsmokemaker.github.io/PortfolioDev/`**

---

## 💻 Локальный запуск

Проект не требует сборщиков (Node.js/Webpack). Достаточно запустить локальный статический сервер:

```bash
# Через Python:
python -m http.server 8080

# Или через Node.js npx:
npx serve .
```

Открыть в браузере: `http://localhost:8080`

---

## 📁 Структура репозитория

```
PortfolioDev/
├── .github/workflows/deploy.yml  # Автоматический CI/CD воркфлоу деплоя на Pages
├── .gitignore                    # Исключение .env, системных файлов и логов
├── .env                          # Локальные переменные окружения
├── .env.example                  # Шаблон переменных окружения
├── .nojekyll                     # Отключение парсинга Jekyll для GitHub Pages
├── index.html                    # Главный хаб портфолио
├── gallery.html                  # Проект 1: Арт-галерея
├── fintech.html                  # Проект 2: Финтех
├── craft.html                    # Проект 3: Крафт-магазин
├── saas.html                     # Проект 4: SaaS AI
├── 404.html                      # Страница 404
└── assets/
    ├── css/                      # Дизайн-токены Mobbi и стили всех проектов
    └── js/                       # Модули 3D-Tilt, Spotlight и Drawer-контроллер
```
