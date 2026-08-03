/**
 * background-canvas.js - LetterGlitch Engine Adaptation
 * Ported from React Bits <LetterGlitch /> for Vanilla HTML5 Canvas.
 * Renders full-screen letter glitch grid with smooth RGB color transitions and controlled opacity.
 */

export class BackgroundCanvas {
  constructor() {
    this.canvas = document.getElementById('bg-canvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.width = window.innerWidth;
    this.height = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight, window.innerHeight);
    
    // Config properties corresponding to React Bits LetterGlitch Props
    this.glitchColors = ['#2b4539', '#61dca3', '#61b3dc']; // Greenish cyan glitch palette
    this.glitchSpeed = 50; // ms per glitch tick
    this.smooth = true;
    this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789';
    this.subtleOpacity = 0.35; // Lower opacity as requested for background subtlety

    this.fontSize = 16;
    this.charWidth = 12;
    this.charHeight = 20;

    this.letters = [];
    this.grid = { columns: 0, rows: 0 };
    this.lastGlitchTime = Date.now();
    this.theme = document.documentElement.getAttribute('data-theme') || 'ide';
    this.particles = [];

    this.lettersAndSymbols = Array.from(this.characters);

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    
    window.addEventListener('load', () => this.resize());
    setTimeout(() => this.resize(), 600);

    window.addEventListener('themechange', (e) => {
      this.theme = e.detail.theme;
      this.createParticles();
      this.resize();
    });

    window.addEventListener('matrixmode', () => {
      this.theme = 'ide';
      document.documentElement.setAttribute('data-theme', 'ide');
      this.resize();
    });

    this.createParticles();
    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      window.innerHeight
    );
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    const columns = Math.ceil(this.width / this.charWidth);
    const rows = Math.ceil(this.height / this.charHeight);
    this.initializeLetters(columns, rows);
  }

  getRandomChar() {
    return this.lettersAndSymbols[Math.floor(Math.random() * this.lettersAndSymbols.length)];
  }

  getRandomColor() {
    return this.glitchColors[Math.floor(Math.random() * this.glitchColors.length)];
  }

  hexToRgb(hex) {
    if (!hex) return null;
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null;
  }

  interpolateColor(start, end, factor) {
    const result = {
      r: Math.round(start.r + (end.r - start.r) * factor),
      g: Math.round(start.g + (end.g - start.g) * factor),
      b: Math.round(start.b + (end.b - start.b) * factor)
    };
    return `rgba(${result.r}, ${result.g}, ${result.b}, ${this.subtleOpacity})`;
  }

  initializeLetters(columns, rows) {
    this.grid = { columns, rows };
    const totalLetters = columns * rows;
    this.letters = Array.from({ length: totalLetters }, () => {
      const color = this.getRandomColor();
      return {
        char: this.getRandomChar(),
        colorHex: color,
        color: color,
        targetColorHex: this.getRandomColor(),
        colorProgress: 1
      };
    });
  }

  drawLetters() {
    if (!this.ctx || this.letters.length === 0) return;
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.font = `${this.fontSize}px "JetBrains Mono", monospace`;
    this.ctx.textBaseline = 'top';

    const cols = this.grid.columns;
    const opacity = this.subtleOpacity;

    for (let index = 0; index < this.letters.length; index++) {
      const letter = this.letters[index];
      const x = (index % cols) * this.charWidth;
      const y = Math.floor(index / cols) * this.charHeight;

      // Apply subtle opacity styling so it serves as non-distracting background
      this.ctx.fillStyle = letter.colorRgb || this.formatRgbWithOpacity(letter.color, opacity);
      this.ctx.fillText(letter.char, x, y);
    }
  }

  formatRgbWithOpacity(colorStr, opacity) {
    const rgb = this.hexToRgb(colorStr);
    if (rgb) {
      return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
    }
    return colorStr;
  }

  updateLetters() {
    if (!this.letters || this.letters.length === 0) return;

    const updateCount = Math.max(1, Math.floor(this.letters.length * 0.04));

    for (let i = 0; i < updateCount; i++) {
      const index = Math.floor(Math.random() * this.letters.length);
      if (!this.letters[index]) continue;

      const letter = this.letters[index];
      letter.char = this.getRandomChar();
      letter.targetColorHex = this.getRandomColor();

      if (!this.smooth) {
        letter.colorHex = letter.targetColorHex;
        letter.colorRgb = this.formatRgbWithOpacity(letter.colorHex, this.subtleOpacity);
        letter.colorProgress = 1;
      } else {
        letter.colorProgress = 0;
      }
    }
  }

  handleSmoothTransitions() {
    let needsRedraw = false;
    for (let i = 0; i < this.letters.length; i++) {
      const letter = this.letters[i];
      if (letter.colorProgress < 1) {
        letter.colorProgress += 0.08;
        if (letter.colorProgress > 1) letter.colorProgress = 1;

        const startRgb = this.hexToRgb(letter.colorHex);
        const endRgb = this.hexToRgb(letter.targetColorHex);
        if (startRgb && endRgb) {
          letter.colorRgb = this.interpolateColor(startRgb, endRgb, letter.colorProgress);
          needsRedraw = true;
        }
      }
    }

    if (needsRedraw) {
      this.drawLetters();
    }
  }

  animate() {
    switch (this.theme) {
      case 'football':
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.drawFootballGrid();
        break;
      case 'cinema':
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.drawCinemaFlares();
        break;
      case 'swiss':
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.drawSwissGrid();
        break;
      case 'travel':
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.drawTravelConstellations();
        break;
      case 'ide':
      default:
        const now = Date.now();
        if (now - this.lastGlitchTime >= this.glitchSpeed) {
          this.updateLetters();
          this.drawLetters();
          this.lastGlitchTime = now;
        }

        if (this.smooth) {
          this.handleSmoothTransitions();
        }
        break;
    }

    requestAnimationFrame(() => this.animate());
  }

  createParticles() {
    this.particles = [];
    const count = Math.floor((this.width * this.height) / 25000);

    for (let i = 0; i < Math.min(count, 50); i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 2.5 + 1,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        alpha: Math.random() * 0.5 + 0.2
      });
    }
  }

  drawFootballGrid() {
    this.ctx.strokeStyle = 'rgba(240, 240, 240, 0.03)';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.arc(this.width / 2, this.height / 2, 120, 0, Math.PI * 2);
    this.ctx.stroke();

    this.particles.forEach(p => {
      p.x += p.vx * 1.2;
      p.y += p.vy * 1.2;

      if (p.x < 0 || p.x > this.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.height) p.vy *= -1;

      this.ctx.fillStyle = `rgba(253, 225, 0, ${p.alpha * 0.8})`;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius * 1.2, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  drawCinemaFlares() {
    const grad = this.ctx.createRadialGradient(this.width * 0.8, this.height * 0.2, 50, this.width * 0.8, this.height * 0.2, 400);
    grad.addColorStop(0, 'rgba(197, 160, 89, 0.08)');
    grad.addColorStop(1, 'transparent');
    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.particles.forEach(p => {
      p.y -= 0.4;
      if (p.y < 0) p.y = this.height;

      this.ctx.fillStyle = `rgba(197, 160, 89, ${p.alpha})`;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius * 1.5, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  drawSwissGrid() {
    this.ctx.strokeStyle = 'rgba(28, 28, 28, 0.03)';
    this.ctx.lineWidth = 1;
    const colWidth = this.width / 12;

    for (let i = 1; i < 12; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(i * colWidth, 0);
      this.ctx.lineTo(i * colWidth, this.height);
      this.ctx.stroke();
    }
  }

  drawTravelConstellations() {
    this.ctx.fillStyle = 'rgba(212, 175, 55, 0.15)';
    this.particles.forEach(p => {
      p.x += p.vx * 0.5;
      p.y += p.vy * 0.5;

      if (p.x < 0 || p.x > this.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.height) p.vy *= -1;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }
}
