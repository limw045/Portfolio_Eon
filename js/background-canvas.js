/**
 * background-canvas.js - Authentic Full-Viewport Matrix Rain Engine
 * Employs a 3-Head Modulo Stream System to guarantee 100% continuous, full-height
 * matrix rain coverage from the very top (0%) to the absolute bottom (100%) at all times.
 */

export class BackgroundCanvas {
  constructor() {
    this.canvas = document.getElementById('bg-canvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.width = Math.max(window.innerWidth, document.documentElement.clientWidth || 0);
    this.height = Math.max(window.innerHeight, document.documentElement.clientHeight || 0, window.screen.height || 0);
    this.particles = [];
    this.matrixDrops = [];
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
    this.width = Math.max(window.innerWidth, document.documentElement.clientWidth || 0);
    this.height = Math.max(window.innerHeight, document.documentElement.clientHeight || 0, window.screen.height || 0);
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
    const totalRows = Math.ceil(this.height / fontSize) + 5;
    
    this.matrixDrops = [];
    
    // Initialize base drop row offset for each column
    for (let i = 0; i < columns; i++) {
      this.matrixDrops[i] = Math.floor(Math.random() * totalRows);
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
    const totalRows = Math.ceil(this.height / fontSize) + 5;

    // Pitch-black fade trail background (#000000 with 0.15 alpha)
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.ctx.font = '14px "JetBrains Mono", monospace';
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZλπΣΩ<>{}[]/*=&$#@!';

    const shouldStep = this.frameIndex % 3 === 0; // Relaxed fall speed

    // Spacing offsets for 3 staggered heads per column (Top 1/3, Middle 1/3, Bottom 1/3)
    const offsets = [0, Math.floor(totalRows / 3), Math.floor((totalRows * 2) / 3)];

    for (let i = 0; i < this.matrixDrops.length; i++) {
      const x = i * fontSize;

      // Draw 3 staggered heads in this column so the ENTIRE vertical height from 0% to 100% has rain!
      for (let k = 0; k < offsets.length; k++) {
        const headRow = (this.matrixDrops[i] + offsets[k]) % totalRows;
        const headY = headRow * fontSize;

        // Draw head character
        const headText = chars.charAt(Math.floor(Math.random() * chars.length));
        this.ctx.fillStyle = 'rgba(220, 255, 230, 0.35)'; // Subtle soft green head
        this.ctx.fillText(headText, x, headY);

        // Draw 4 fading tail characters behind head
        for (let tail = 1; tail <= 4; tail++) {
          const tailRow = (headRow - tail + totalRows) % totalRows;
          const tailY = tailRow * fontSize;
          const tailText = chars.charAt(Math.floor(Math.random() * chars.length));

          const alpha = Math.max(0.05, 0.22 - tail * 0.04);
          this.ctx.fillStyle = `rgba(0, 255, 102, ${alpha})`;
          this.ctx.fillText(tailText, x, tailY);
        }
      }

      if (shouldStep) {
        this.matrixDrops[i] = (this.matrixDrops[i] + 1) % totalRows;
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
