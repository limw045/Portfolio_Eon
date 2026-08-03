/**
 * background-canvas.js - Pixel-Perfect Authentic Classic Matrix Digital Rain Engine
 * 1:1 pixel rendering with zero stretching, crisp monospace characters, and natural fading trails.
 */

export class BackgroundCanvas {
  constructor() {
    this.canvas = document.getElementById('bg-canvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.particles = [];
    this.matrixDrops = [];
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
    const fontSize = 16;
    const columns = Math.floor(this.width / fontSize);
    const totalRows = Math.floor(this.height / fontSize);
    
    this.matrixDrops = [];
    
    // Distribute initial drops randomly across the full screen height
    for (let i = 0; i < columns; i++) {
      this.matrixDrops[i] = Math.floor(Math.random() * totalRows);
    }
  }

  animate() {
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
    const fontSize = 16;

    // 1. Semi-transparent black fade trail for natural matrix trailing
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.ctx.font = '15px "JetBrains Mono", monospace';
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZλπΣΩ<>{}[]/*=&$#@!';

    for (let i = 0; i < this.matrixDrops.length; i++) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      const x = i * fontSize;
      const y = this.matrixDrops[i] * fontSize;

      // Crisp, subtle green palette (Non-distracting background level)
      if (Math.random() > 0.94) {
        this.ctx.fillStyle = 'rgba(220, 255, 230, 0.65)'; // Soft hot leading character
      } else {
        this.ctx.fillStyle = 'rgba(0, 255, 102, 0.32)'; // Classic matrix green
      }

      this.ctx.fillText(text, x, y);

      // Reset when drop clears bottom of screen with small random delay
      if (y > this.height && Math.random() > 0.975) {
        this.matrixDrops[i] = 0;
      }

      this.matrixDrops[i]++;
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
