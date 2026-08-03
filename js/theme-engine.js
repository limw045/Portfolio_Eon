/**
 * theme-engine.js - Live Theme Switcher Module
 * Handles 5 dynamic themes, LocalStorage persistence, audio feedback, and custom event dispatches.
 */

export class ThemeEngine {
  constructor() {
    this.currentTheme = localStorage.getItem('weijian_portfolio_theme') || 'ide';
    this.soundEnabled = localStorage.getItem('weijian_portfolio_sound') === 'true';
    this.audioCtx = null;
    
    this.init();
  }

  init() {
    // Apply saved or default theme to HTML tag
    this.setTheme(this.currentTheme, false);

    // Bind theme switcher buttons
    const themeButtons = document.querySelectorAll('[data-theme-target]');
    themeButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetTheme = btn.getAttribute('data-theme-target');
        this.setTheme(targetTheme, true);
      });
    });

    // Bind sound toggle button
    const soundBtn = document.getElementById('sound-toggle');
    if (soundBtn) {
      this.updateSoundUI(soundBtn);
      soundBtn.addEventListener('click', () => {
        this.soundEnabled = !this.soundEnabled;
        localStorage.setItem('weijian_portfolio_sound', this.soundEnabled);
        this.updateSoundUI(soundBtn);
        if (this.soundEnabled) this.playTone(600, 0.05);
      });
    }
  }

  setTheme(themeName, playAudio = true) {
    this.currentTheme = themeName;
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('weijian_portfolio_theme', themeName);

    // Update active button state
    const themeButtons = document.querySelectorAll('[data-theme-target]');
    themeButtons.forEach(btn => {
      if (btn.getAttribute('data-theme-target') === themeName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Play synthesized click tone if enabled
    if (playAudio && this.soundEnabled) {
      this.playTone(440, 0.08);
    }

    // Dispatch custom event for background canvas and other listeners
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: themeName } }));
  }

  updateSoundUI(btn) {
    const icon = btn.querySelector('.sound-icon');
    if (icon) {
      icon.textContent = this.soundEnabled ? '🔊' : '🔇';
    }
    btn.title = this.soundEnabled ? '音效已开启 (点击关闭)' : '音效已关闭 (点击开启)';
  }

  playTone(freq = 440, duration = 0.05) {
    try {
      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      
      gain.gain.setValueAtTime(0.05, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {
      // AudioContext fallback ignored if blocked
    }
  }
}
