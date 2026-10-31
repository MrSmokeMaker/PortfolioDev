/**
 * Core Navigation & UI State Orchestrator
 * Drawer slide-overs, Toast notifications, Header shrink & Scroll triggers
 */

(function () {
  'use strict';

  // Fallback for shrinking header when CSS scroll-driven animations are unsupported
  const hasScrollDrivenAnim = CSS.supports && CSS.supports('(animation-timeline: scroll()) and (animation-range: 0% 100%)');

  if (!hasScrollDrivenAnim) {
    const fixedHeaders = document.querySelectorAll('[data-shrinking-header]');
    if (fixedHeaders.length > 0) {
      window.addEventListener('scroll', () => {
        const scrolled = window.scrollY > 40;
        fixedHeaders.forEach((hdr) => {
          if (scrolled) {
            hdr.classList.add('is-shrunk');
          } else {
            hdr.classList.remove('is-shrunk');
          }
        });
      }, { passive: true });
    }
  }

  // Toast Notification System
  window.showToast = function (message, duration = 3000) {
    let toast = document.getElementById('global-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'global-toast';
      toast.className = 'global-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('is-visible');

    setTimeout(() => {
      toast.classList.remove('is-visible');
    }, duration);
  };

  // Drawer Slide-over Controller (e.g. Shopping Cart, Filters)
  window.toggleDrawer = function (drawerId) {
    const drawer = document.getElementById(drawerId);
    const overlay = document.getElementById(drawerId + '-overlay');
    if (!drawer) return;

    const isOpen = drawer.classList.contains('is-open');
    if (isOpen) {
      drawer.classList.remove('is-open');
      if (overlay) overlay.classList.remove('is-open');
      document.body.style.overflow = '';
    } else {
      drawer.classList.add('is-open');
      if (overlay) overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  };

  // IntersectionObserver reveal fallback for non-scroll-timeline elements
  document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      reveals.forEach((el) => observer.observe(el));
    } else {
      reveals.forEach((el) => el.classList.add('is-revealed'));
    }
  });
})();
