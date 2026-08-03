/**
 * background-canvas.js - Theme-Aware Dynamic HTML5 Background Canvas & Matrix Rain Engine
 * Renders 60fps interactive particle shaders & full-screen cascading matrix rain.
 */

export class BackgroundCanvas {
  constructor() {
    this.canvas = document.getElementById('bg-canvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.particles = [];
    this.matrixColumns = [];
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
    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZλπΣΩ<>{}[]/*=&$#@!';
    
    this.matrixColumns = [];
    
    // Create matrix streams evenly distributed across the entire screen width & height
    for (let i = 0; i < columns; i++) {
      const streamLength = Math.floor(Math.random() * 12) + 8; // 8 to 20 chars long
      const speed = Math.random() * 0.4 + 0.6; // Speed multiplier
      
      // Random characters for this stream
      const streamChars = [];
      for (let j = 0; j < streamLength; j++) {
        streamChars.push(chars.charAt(Math.floor(Math.random() * chars.length)));
      }

      this.matrixColumns.push({
        x: i * fontSize,
        y: Math.random() * (this.height + 500) - 200, // Distributed across full screen
        speed: speed,
        chars: streamChars,
        length: streamLength
      });
    }
  }

  animate() {
    // Clear canvas cleanly every frame (no solid black accumulation!)
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Render theme-specific background dynamics
    switch (this.theme) {
      case 'football':
        this.drawFootballGrid();
        break;
      case 'cinema':
        this.drawCinemaFlares();
        break;
      case 'swiss':
        this.drawSwissGrid();
        break;
      case 'travel':
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
    this.ctx.font = '14px "JetBrains Mono", monospace';

    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZλπΣΩ<>{}[]/*=&$#@!';

    for (let i = 0; i < this.matrixColumns.length; i++) {
      const stream = this.matrixColumns[i];

      for (let j = 0; j < stream.length; j++) {
        const charY = stream.y - j * fontSize;

        // Skip characters outside visible viewport
        if (charY < -20 || charY > this.height + 20) continue;

        // Head character (bright glowing cyan/green)
        if (j === 0) {
          this.ctx.fillStyle = '#a6e3a1'; // Bright green head
        } else {
          // Fading tail alpha
          const alpha = Math.max(0.05, (1 - j / stream.length) * 0.7);
          this.ctx.fillStyle = `rgba(137, 180, 250, ${alpha})`; // Catppuccin cyan tail
        }

        // Randomly mutate character occasionally
        if (Math.random() < 0.02) {
          stream.chars[j] = chars.charAt(Math.floor(Math.random() * chars.length));
        }

        this.ctx.fillText(stream.chars[j], stream.x, charY);
      }

      // Move stream down
      stream.y += 2.5 * stream.speed;

      // Reset stream to top when tail clears bottom
      if (stream.y - stream.length * fontSize > this.height) {
        stream.y = Math.random() * -100;
        stream.speed = Math.random() * 0.4 + 0.6;
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
