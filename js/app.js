/**
 * app.js - Main Application Entry Point
 * Initializes Lenis Smooth Scroll, Scroll Animations & Parallax Engine, Hacker CLI Terminal, i18n, theme engine, IDE simulator, n8n workflow simulator, background canvas, CSS tweaker, 3D tilt card physics, and VS Code Top Dropdown Menus.
 */

import { I18nEngine } from './i18n.js';
import { ThemeEngine } from './theme-engine.js';
import { IDESimulator } from './ide-simulator.js';
import { N8nSimulator } from './n8n-simulator.js';
import { BackgroundCanvas } from './background-canvas.js';
import { CSSTweaker } from './css-tweaker.js';
import { ScrollAnimations } from './scroll-animations.js';
import { HackerTerminal } from './hacker-terminal.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lenis Smooth Scroll Engine
  const lenis = initLenisSmoothScroll();

  // Initialize Scroll Reveal & Parallax Animations
  const scrollAnimations = new ScrollAnimations(lenis);

  // Initialize Core Modules
  const i18nEngine = new I18nEngine();
  const themeEngine = new ThemeEngine();
  const ideSimulator = new IDESimulator();
  const n8nSimulator = new N8nSimulator();
  const bgCanvas = new BackgroundCanvas();
  const cssTweaker = new CSSTweaker();
  const hackerTerminal = new HackerTerminal();

  // Initialize 3D Tilt Mouse Physics for Cards
  init3DTiltPhysics();

  // Initialize Collapsible IDE Sidebar Controls
  initIDESidebarControls();

  // Initialize 100% Interactive VS Code Top Dropdown Menus
  initVSCodeMenuActions();

  console.log('🚀 Lim Wei Jian Portfolio supercharged with 100% working VS Code Top Dropdown Menus!');
});

/**
 * Binds every dropdown item in File, Edit, Selection, View, Go, Run, Terminal, Help
 */
function initVSCodeMenuActions() {
  const sidebar = document.getElementById('ide-sidebar');
  const termDrawer = document.getElementById('ide-terminal-drawer');

  // Helper for click binding
  const bind = (id, fn) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', fn);
  };

  // 1. File Menu
  bind('menu-file-new', () => alert('📄 Created new empty workspace buffer.'));
  bind('menu-file-print', () => window.print());
  bind('menu-file-copy-url', () => {
    navigator.clipboard.writeText(window.location.href);
    alert('🌐 Portfolio URL copied to clipboard!');
  });
  bind('menu-file-close', () => {
    if (sidebar) sidebar.classList.add('collapsed');
  });

  // 2. Edit Menu
  bind('menu-edit-undo', () => alert('↩ Undo performed.'));
  bind('menu-edit-redo', () => alert('↪ Redo performed.'));
  bind('menu-edit-cut', () => alert('✂ Selection cut to clipboard.'));
  bind('menu-edit-copy', () => alert('📋 Selection copied to clipboard.'));
  bind('menu-edit-find', () => {
    if (termDrawer) termDrawer.classList.remove('collapsed');
    const cliInput = document.getElementById('terminal-cli-input');
    if (cliInput) cliInput.focus();
  });

  // 3. Selection Menu
  bind('menu-select-all', () => alert('Selected all elements in workspace.'));
  bind('menu-select-expand', () => alert('Expanded active selection.'));

  // 4. View Menu
  bind('menu-view-explorer', () => {
    if (sidebar) sidebar.classList.toggle('collapsed');
  });
  bind('menu-view-terminal', () => {
    if (termDrawer) termDrawer.classList.toggle('collapsed');
  });
  bind('menu-view-fullscreen', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  });

  // 5. Run Menu
  bind('menu-run-code', () => {
    const runBtn = document.getElementById('btn-run-code');
    if (runBtn) runBtn.click();
    const studio = document.getElementById('skill-studio');
    if (studio) studio.scrollIntoView({ behavior: 'smooth' });
  });
  bind('menu-run-n8n', () => {
    const triggerBtn = document.getElementById('btn-trigger-n8n');
    if (triggerBtn) triggerBtn.click();
    const n8nStudio = document.getElementById('n8n-studio');
    if (n8nStudio) n8nStudio.scrollIntoView({ behavior: 'smooth' });
  });
  bind('menu-run-sound', () => {
    const soundBtn = document.getElementById('sound-toggle');
    if (soundBtn) soundBtn.click();
  });

  // 6. Terminal Menu
  bind('menu-term-toggle', () => {
    if (termDrawer) termDrawer.classList.toggle('collapsed');
  });
  bind('menu-term-matrix', () => {
    window.dispatchEvent(new CustomEvent('matrixmode'));
  });
  bind('menu-term-clear', () => {
    const body = document.getElementById('terminal-cli-body');
    if (body) body.innerHTML = '';
  });

  // 7. Help Menu
  bind('menu-help-shortcuts', () => {
    alert('⌨️ Keyboard Shortcuts:\n• Ctrl+B / Cmd+B: Toggle Explorer Sidebar\n• F11: Toggle Fullscreen\n• Enter in CLI: Run Command\n• Up/Down in CLI: Command History');
  });
}

/**
 * Handles Collapsible IDE Explorer Sidebar & Keyboard Shortcut (Ctrl+B)
 */
function initIDESidebarControls() {
  const sidebar = document.getElementById('ide-sidebar');
  const toggleBtn = document.getElementById('ide-sidebar-toggle');
  const closeBtn = document.getElementById('sidebar-close-btn');

  if (!sidebar) return;

  const toggleSidebar = () => {
    sidebar.classList.toggle('collapsed');
  };

  if (toggleBtn) toggleBtn.addEventListener('click', toggleSidebar);
  if (closeBtn) closeBtn.addEventListener('click', () => sidebar.classList.add('collapsed'));

  // Keyboard shortcut Ctrl+B or Cmd+B to toggle Explorer
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme === 'ide') {
        e.preventDefault();
        toggleSidebar();
      }
    }
  });
}

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

      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}
