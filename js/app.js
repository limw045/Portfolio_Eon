/**
 * app.js - Main Application Entry Point
 * Initializes Lenis Smooth Scroll, i18n, theme engine, IDE simulator, n8n workflow simulator, background canvas, CSS tweaker, and 3D tilt card physics.
 */

import { I18nEngine } from './i18n.js';
import { ThemeEngine } from './theme-engine.js';
import { IDESimulator } from './ide-simulator.js';
import { N8nSimulator } from './n8n-simulator.js';
import { BackgroundCanvas } from './background-canvas.js';
import { CSSTweaker } from './css-tweaker.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lenis Smooth Scroll Engine
  const lenis = initLenisSmoothScroll();

  // Initialize Core Modules
  const i18nEngine = new I18nEngine();
  const themeEngine = new ThemeEngine();
  const ideSimulator = new IDESimulator();
  const n8nSimulator = new N8nSimulator();
  const bgCanvas = new BackgroundCanvas();
  const cssTweaker = new CSSTweaker();

  // Initialize 3D Tilt Mouse Physics for Cards
  init3DTiltPhysics();

  console.log('🚀 Lim Wei Jian Portfolio initialized successfully with Lenis Smooth Scroll.');
});

/**
 * Initializes Lenis Smooth Scroll & RequestAnimationFrame Loop
 */
function initLenisSmoothScroll() {
  if (typeof window.Lenis === 'undefined') {
    console.warn('Lenis CDN not loaded, falling back to native scroll.');
    return null;
  }

  const lenis = new window.Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
    touchMultiplier: 1.5
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Wire anchor links to Lenis smooth scroll
  const navAnchors = document.querySelectorAll('a[href^="#"]');
  navAnchors.forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          lenis.scrollTo(targetEl, { offset: -80, duration: 1.2 });
        }
      }
    });
  });

  return lenis;
}

/**
 * Hardware-accelerated 3D Tilt Card Physics
 */
function init3DTiltPhysics() {
  const cards = document.querySelectorAll('.tilt-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -7; // Max tilt deg
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}
