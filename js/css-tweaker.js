/**
 * css-tweaker.js - Live CSS Variable Tweaker Tool
 * Enables real-time modification of blur, border radius, and glow intensity, with CSS export.
 */

export class CSSTweaker {
  constructor() {
    this.init();
  }

  init() {
    const sliderBlur = document.getElementById('slider-blur');
    const sliderRadius = document.getElementById('slider-radius');
    const sliderGlow = document.getElementById('slider-glow');

    const valBlur = document.getElementById('val-blur');
    const valRadius = document.getElementById('val-radius');
    const valGlow = document.getElementById('val-glow');

    const exportBtn = document.getElementById('btn-export-css');

    if (sliderBlur) {
      sliderBlur.addEventListener('input', (e) => {
        const val = `${e.target.value}px`;
        document.documentElement.style.setProperty('--glass-blur', val);
        if (valBlur) valBlur.textContent = val;
      });
    }

    if (sliderRadius) {
      sliderRadius.addEventListener('input', (e) => {
        const val = `${e.target.value}px`;
        document.documentElement.style.setProperty('--border-radius', val);
        if (valRadius) valRadius.textContent = val;
      });
    }

    if (sliderGlow) {
      sliderGlow.addEventListener('input', (e) => {
        const val = e.target.value;
        document.documentElement.style.setProperty('--glow-intensity', val);
        if (valGlow) valGlow.textContent = val;
      });
    }

    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const blur = getComputedStyle(document.documentElement).getPropertyValue('--glass-blur');
        const radius = getComputedStyle(document.documentElement).getPropertyValue('--border-radius');
        const glow = getComputedStyle(document.documentElement).getPropertyValue('--glow-intensity');

        const cssSnippet = `/* Custom Tweaked Design Tokens */
:root {
  --glass-blur: ${blur.trim()};
  --border-radius: ${radius.trim()};
  --glow-intensity: ${glow.trim()};
}`;

        navigator.clipboard.writeText(cssSnippet).then(() => {
          exportBtn.textContent = '已复制 CSS 到剪贴板! ✅';
          setTimeout(() => {
            exportBtn.textContent = '导出 CSS 变量代码 📋';
          }, 2500);
        });
      });
    }
  }
}
