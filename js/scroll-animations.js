/**
 * scroll-animations.js - Scroll-Driven Animations & Lenis Parallax Engine
 * Provides Lenis-powered reveal animations, scroll progress bar, and parallax depth.
 */

export class ScrollAnimations {
  constructor(lenis) {
    this.lenis = lenis;
    this.progressBar = document.getElementById('scroll-progress');
    this.init();
  }

  init() {
    this.initIntersectionObserver();

    // Hook Lenis scroll events for progress bar & parallax
    if (this.lenis) {
      this.lenis.on('scroll', (e) => {
        this.updateProgressBar(e.progress);
        this.updateParallax(e.scroll);
      });
    } else {
      window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
        this.updateProgressBar(progress);
        this.updateParallax(window.scrollY);
      });
    }
  }

  initIntersectionObserver() {
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }

  updateProgressBar(progress) {
    if (this.progressBar) {
      this.progressBar.style.width = `${Math.min(100, Math.max(0, progress * 100))}%`;
    }
  }

  updateParallax(scrollY) {
    const parallaxElements = document.querySelectorAll('[data-parallax-speed]');
    parallaxElements.forEach(el => {
      const speed = parseFloat(el.getAttribute('data-parallax-speed')) || 0.1;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const offset = (window.innerHeight - rect.top) * speed * 0.15;
        el.style.transform = `translateY(${-offset}px)`;
      }
    });
  }
}
