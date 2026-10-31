/**
 * 3D Card Tilt & Interactive Cursor Spotlight Engine
 * Ultra-lightweight (~1.5KB), 60+ FPS, compositor-safe.
 */

(function () {
  'use strict';

  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReducedMotion) return;

  // Initialize Tilt Cards
  function initTilt() {
    const tiltElements = document.querySelectorAll('[data-tilt]');

    tiltElements.forEach((el) => {
      const maxTilt = parseFloat(el.getAttribute('data-tilt-max') || '8');
      let bounds = el.getBoundingClientRect();

      function updateBounds() {
        bounds = el.getBoundingClientRect();
      }

      window.addEventListener('resize', updateBounds, { passive: true });
      window.addEventListener('scroll', updateBounds, { passive: true });

      el.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;

        const xPct = mouseX / bounds.width - 0.5;
        const yPct = mouseY / bounds.height - 0.5;

        const rotateX = -yPct * maxTilt;
        const rotateY = xPct * maxTilt;

        el.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;

        // Update spotlight coordinates if card supports radial spotlight
        el.style.setProperty('--mouse-x', `${mouseX}px`);
        el.style.setProperty('--mouse-y', `${mouseY}px`);
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        el.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
      });

      el.addEventListener('mouseenter', () => {
        el.style.transition = 'transform 0.1s ease-out';
      });
    });
  }

  // Initialize Cursor-following Spotlight for Bento Grids
  function initSpotlight() {
    const spotlightContainers = document.querySelectorAll('[data-spotlight-group]');

    spotlightContainers.forEach((container) => {
      container.addEventListener('mousemove', (e) => {
        const cards = container.querySelectorAll('[data-spotlight-card]');
        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initTilt();
      initSpotlight();
    });
  } else {
    initTilt();
    initSpotlight();
  }
})();
