/**
 * background-canvas.js - High-Density Interactive Full-Document Matrix Rain Engine
 * Features dense 14px matrix streams, cursor proximity character glowing/mutation,
 * and mouse-click shockwave pulse energy rings across full document height.
 */

export class BackgroundCanvas {
  constructor() {
    this.canvas = document.getElementById('bg-canvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.width = window.innerWidth;
    this.height = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight, window.innerHeight);
    
    this.particles = [];
    this.matrixDrops = [];
    this.matrixChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZλπΣΩ<>{}[]/*=&$#@!';
    this.matrixSpeedStep = 2;
    this.frameIndex = 0;
    this.theme = document.documentElement.getAttribute('data-theme') || 'ide';

    // Interactive Mouse Tracking
    this.mouseX = -1000;
    this.mouseY = -1000;
    this.pulses = [];

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    
    // Recalculate full document height after page load & dynamic component renders
    window.addEventListener('load', () => this.resize());
    setTimeout(() => this.resize(), 600);

    // Mouse interactivity listeners
    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY + window.scrollY;
    });

    window.addEventListener('mouseleave', () => {
      this.mouseX = -1000;
      this.mouseY = -1000;
    });

    window.addEventListener('click', (e) => {
      // Trigger shockwave pulse on click
      this.pulses.push({
        x: e.clientX,
        y: e.clientY + window.scrollY,
        radius: 10,
        maxRadius: 220,
        alpha: 0.8
      });
    });

    // Listen for live theme changes & custom matrix trigger/config
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

    window.addEventListener('matrixconfig', (e) => {
      if (e.detail) {
        if (e.detail.speed) {
          if (e.detail.speed === 'slow') this.matrixSpeedStep = 4;
          else if (e.detail.speed === 'fast') this.matrixSpeedStep = 1;
          else this.matrixSpeedStep = 2;
        }
        if (e.detail.charset) {
          if (e.detail.charset === 'binary') this.matrixChars = '01';
          else if (e.detail.charset === 'hex') this.matrixChars = '0123456789ABCDEF';
          else this.matrixChars = e.detail.charset;
        }
        if (e.detail.density) {
          this.initMatrixRain(e.detail.density);
        }
      }
    });

    this.createParticles();
    this.initMatrixRain();
    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    const docHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      window.innerHeight
    );
    this.height = docHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
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

  initMatrixRain(density = 'high') {
    const fontSize = 14; // High-density 14px grid
    let colWidth = fontSize;
    if (density === 'low') colWidth = fontSize * 2.2;
    if (density === 'high') colWidth = fontSize * 0.95;

    const columns = Math.floor(this.width / colWidth);
    const totalRows = Math.ceil(this.height / fontSize) || 1;
    
    this.matrixDrops = [];
    
    // Distribute initial drops randomly across total document height
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
        this.drawShockwavePulses();
        break;
    }

    requestAnimationFrame(() => this.animate());
  }

  drawMatrixRain() {
    const fontSize = 14;
    const totalRows = Math.ceil(this.height / fontSize) || 1;

    // Clear canvas cleanly every frame
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.ctx.font = '13px "JetBrains Mono", monospace';
    const chars = this.matrixChars || '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZλπΣΩ<>{}[]/*=&$#@!';
    
    this.frameIndex = (this.frameIndex || 0) + 1;
    const shouldStep = this.frameIndex % (this.matrixSpeedStep || 2) === 0;

    const streamLength = 14; // High-density tail length
    const offsets = [0, Math.floor(totalRows / 2)]; // Dual-head staggered streams

    for (let i = 0; i < this.matrixDrops.length; i++) {
      const x = i * (fontSize * 0.95);

      for (let k = 0; k < offsets.length; k++) {
        const headRow = Math.floor((this.matrixDrops[i] + offsets[k]) % totalRows);

        for (let j = 0; j < streamLength; j++) {
          const charRow = (headRow - j + totalRows) % totalRows;
          const charY = (charRow + 1) * fontSize;

          // Mouse Proximity Interactivity Check
          const dx = x - this.mouseX;
          const dy = charY - this.mouseY;
          const dist = Math.hypot(dx, dy);

          let charText = chars.charAt((i * 7 + charRow * 3 + j) % chars.length);

          if (dist < 110) {
            // Cursor Proximity Highlight & Dynamic Code Mutation!
            this.ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.7, 1 - dist / 110)})`;
            this.ctx.shadowColor = '#00ff66';
            this.ctx.shadowBlur = 8;

            // Mutate character live under cursor
            if (Math.random() < 0.3) {
              charText = chars.charAt(Math.floor(Math.random() * chars.length));
            }
          } else if (j === 0) {
            // Hot neon mint leading head
            this.ctx.fillStyle = 'rgba(220, 255, 230, 0.8)';
            this.ctx.shadowColor = 'transparent';
            this.ctx.shadowBlur = 0;
          } else {
            // Fading trail alpha
            const alpha = Math.max(0.04, (1 - j / streamLength) * 0.38);
            this.ctx.fillStyle = `rgba(0, 255, 102, ${alpha})`;
            this.ctx.shadowColor = 'transparent';
            this.ctx.shadowBlur = 0;
          }

          this.ctx.fillText(charText, x, charY);
        }
      }

      if (shouldStep) {
        this.matrixDrops[i]++;
      }
    }

    // Reset shadow after loop
    this.ctx.shadowColor = 'transparent';
    this.ctx.shadowBlur = 0;
  }

  drawShockwavePulses() {
    for (let i = this.pulses.length - 1; i >= 0; i--) {
      const p = this.pulses[i];
      
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(0, 255, 102, ${p.alpha})`;
      this.ctx.lineWidth = 2.5;
      this.ctx.stroke();

      p.radius += 8;
      p.alpha -= 0.025;

      if (p.alpha <= 0 || p.radius >= p.maxRadius) {
        this.pulses.splice(i, 1);
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
