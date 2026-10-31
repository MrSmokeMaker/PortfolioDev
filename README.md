# 🚀 Developer Portfolio & 4 Premium Promo Websites (Mobbi Engine)

Интерактивное портфолио Senior UI/UX разработчика и системного архитектора, включающее 4 полнофункциональных промо-сайта в разных стилях, спроектированных по дизайн-системе Mobbi.

---

## 🌟 Состав проекта

1. **`index.html`** — Главный хаб разработчика («Обо мне», 3 ключевых метрики, витрина 4 проектов, NDA-режим, контакты).
2. **`gallery.html`** — Проект 1: Арт-галерея **LUMEN Gallery** (*Воздушный минимализм + крупные фото, Scroll-driven параллакс, Shrinking Header*).
3. **`fintech.html`** — Проект 2: Финтех **VERTEX Capital** (*Строгий корпоративный, Data-Heavy, живые SVG графики, Data Table, модальное окно клиринга*).
4. **`craft.html`** — Проект 3: Магазин керамики **CLAY & OCHRE** (*Органический тактильный e-commerce, 3D Tilt изделий, Slide-over чекаут-корзина*).
5. **`saas.html`** — Проект 4: SaaS AI **NEXUS AI** (*Dark Bento Grid, курсорный Spotlight, неоновый лаймовый Mesh Glow, кодовый терминал*).
6. **`404.html`** — Страница ошибки с возвратом на главную.
7. **`.nojekyll`** — Файл конфигурации для корректной работы GitHub Pages.

---

## 📦 Быстрый деплой на GitHub Pages

### Вариант 1. Через GitHub Actions (Автоматический, рекомендовано)
1. Создайте новый репозиторий на GitHub (например, `portfolio`).
2. В терминале папки выполните:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit of developer portfolio"
   git branch -M main
   git remote add origin https://github.com/<ваш-логин>/<имя-репозитория>.git
   git push -u origin main
   ```
3. Откройте репозиторий на GitHub: **Settings** → **Pages** → в блоке **Build and deployment** выберите **Source: GitHub Actions**.
4. Готово! Автоматический workflow `.github/workflows/deploy.yml` соберет и опубликует сайт по адресу:
   `https://<ваш-логин>.github.io/<имя-репозитория>/`

### Вариант 2. Стандартный Deploy from a branch
1. В **Settings** → **Pages** выберите **Source: Deploy from a branch**.
2. Укажите ветку `main` и папку `/ (root)`.
3. Нажмите **Save**.

---

## ☁️ Деплой на Cloudflare Pages

1. Зайдите в панель [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create application** → **Pages**.
2. Подключите репозиторий GitHub.
3. В параметрах сборки укажите:
   * **Framework preset**: `None`
   * **Build command**: *(оставить пустым)*
   * **Build output directory**: `/`
4. Нажмите **Save and Deploy**. Сайт будет доступен на сверхбыстром CDN с бесплатным SSL.

---

## 💻 Локальный просмотр

В любой момент вы можете запустить проект локально через встроенный сервер Python:
```bash
python -m http.server 8080
```
И перейти по адресу: `http://localhost:8080`
