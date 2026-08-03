/**
 * app.js - Main Application Entry Point
 * Initializes i18n, theme engine, IDE simulator, n8n workflow simulator, background canvas, CSS tweaker, and 3D tilt card physics.
 */

import { I18nEngine } from './i18n.js';
import { ThemeEngine } from './theme-engine.js';
import { IDESimulator } from './ide-simulator.js';
import { N8nSimulator } from './n8n-simulator.js';
import { BackgroundCanvas } from './background-canvas.js';
import { CSSTweaker } from './css-tweaker.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Core Modules
  const i18nEngine = new I18nEngine();
  const themeEngine = new ThemeEngine();
  const ideSimulator = new IDESimulator();
  const n8nSimulator = new N8nSimulator();
  const bgCanvas = new BackgroundCanvas();
  const cssTweaker = new CSSTweaker();

  // Initialize 3D Tilt Mouse Physics for Cards
  init3DTiltPhysics();

  console.log('🚀 Lim Wei Jian Portfolio initialized successfully with i18n support.');
});

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
