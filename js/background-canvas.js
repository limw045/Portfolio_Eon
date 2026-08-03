/**
 * background-canvas.js - Authentic Pitch-Black & Matrix Green Canvas Engine
 * Renders 60fps continuous full-screen Matrix rain with 2-Layer Staggered Streams,
 * guaranteeing 100% continuous digital rain coverage from top to bottom at all times.
 */

export class BackgroundCanvas {
  constructor() {
    this.canvas = document.getElementById('bg-canvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.particles = [];
    this.matrixDropsLayer1 = [];
    this.matrixDropsLayer2 = [];
    this.frameIndex = 0;
    this.theme = document.documentElement.getAttribute('data-theme') || 'ide';

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    
    // Listen for live theme changes & custom matrix trigger
    window.addEventListener('themechange', (e) => {
      this.theme = e.detail.theme;
      this.createParticles();
      this.initMatrixRain();
    });

    window.addEventListener('matrixmode', () => {
      this.theme = 'ide';
      document.documentElement.setAttribute('data-theme', 'ide');
      this.initMatrixRain();
    });

    this.createParticles();
    this.initMatrixRain();
    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.createParticles();
    this.initMatrixRain();
  }

  createParticles() {
    this.particles = [];
    const count = Math.floor((this.width * this.height) / 20000);

    for (let i = 0; i < Math.min(count, 60); i++) {
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

  initMatrixRain() {
    const fontSize = 18;
    const columns = Math.floor(this.width / fontSize);
    const totalRows = Math.floor(this.height / fontSize);
    
    this.matrixDropsLayer1 = [];
    this.matrixDropsLayer2 = [];
    
    // Layer 1: Distributed across top-to-middle rows
    // Layer 2: Distributed across middle-to-bottom rows (staggered offset)
    for (let i = 0; i < columns; i++) {
      this.matrixDropsLayer1[i] = Math.floor(Math.random() * (totalRows / 2));
      this.matrixDropsLayer2[i] = Math.floor((totalRows / 2) + Math.random() * (totalRows / 2));
    }
  }

  animate() {
    this.frameIndex++;

    // Render theme-specific background dynamics
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
        this.drawMatrixRain();
        break;
    }

    requestAnimationFrame(() => this.animate());
  }

  drawMatrixRain() {
    const fontSize = 18;

    // Pitch-black fade trail background (#000000 with 0.14 alpha for soft fade)
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.14)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.ctx.font = '14px "JetBrains Mono", monospace';
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZλπΣΩ<>{}[]/*=&$#@!';

    const shouldStep = this.frameIndex % 3 === 0; // Relaxed 1/3 fall speed

    // Render Layer 1 & Layer 2 in parallel for 100% continuous full-height coverage
    this.renderStreamLayer(this.matrixDropsLayer1, fontSize, chars, shouldStep);
    this.renderStreamLayer(this.matrixDropsLayer2, fontSize, chars, shouldStep);
  }

  renderStreamLayer(layerArray, fontSize, chars, shouldStep) {
    for (let i = 0; i < layerArray.length; i++) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      const x = i * fontSize;
      const y = layerArray[i] * fontSize;

      // Low-opacity subtle matrix green color palette
      const rand = Math.random();
      if (rand > 0.92) {
        this.ctx.fillStyle = 'rgba(220, 255, 230, 0.35)'; // Soft leading head
      } else if (rand > 0.5) {
        this.ctx.fillStyle = 'rgba(0, 255, 102, 0.22)'; // Subtle matrix green
      } else {
        this.ctx.fillStyle = 'rgba(0, 180, 60, 0.12)'; // Faded tail green
      }

      this.ctx.fillText(text, x, y);

      // Continuous loop: Reset smoothly above screen when clearing bottom
      if (shouldStep) {
        if (y > this.height) {
          layerArray[i] = Math.floor(Math.random() * -6);
        } else {
          layerArray[i]++;
        }
      }
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
