# Matrix Rain Engine & Hacker Control Menu Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-architect the background matrix rain canvas with 1:1 viewport pixel mapping and a 2-head modulo loop algorithm, and add an authentic Matrix Hacker Control Menu in the VS Code View dropdown and Hacker CLI terminal.

**Architecture:** 1:1 pixel Canvas rendering, dual-head modulo stream algorithm for continuous full-height matrix rain, custom event system (`matrixmode`, `matrixconfig`) for live parameter adjustment.

**Tech Stack:** HTML5 Canvas API, Vanilla JS (ES Modules), Custom CSS Design System, VS Code UI components.

## Global Constraints
- Language Separation: 100% pure English in EN mode, 100% clean Chinese in ZH mode.
- 1:1 Canvas Resolution: `canvas.width` and `canvas.height` must match `window.innerWidth` and `window.innerHeight` without screen scaling.
- Monospace font: `JetBrains Mono, monospace`.
- Subdued matrix colors: Head `rgba(220, 255, 230, 0.65)`, Trail `rgba(0, 255, 102, 0.25)`.

---

### Task 1: Re-architect Canvas Viewport Pixel Engine

**Files:**
- Modify: `js/background-canvas.js`
- Modify: `css/main.css`
- Modify: `css/themes.css`

**Interfaces:**
- Consumes: `window.innerWidth`, `window.innerHeight`, custom event `matrixconfig`
- Produces: 60fps 1:1 pixel Canvas Matrix rain rendering spanning 0% to 100% height at all times.

- [ ] **Step 1: Update canvas resize and 1:1 pixel initialization in `js/background-canvas.js`**

```javascript
resize() {
  this.width = window.innerWidth;
  this.height = window.innerHeight;
  this.canvas.width = this.width;
  this.canvas.height = this.height;
  this.initMatrixRain();
}
```

- [ ] **Step 2: Implement dual-head modulo stream algorithm**

```javascript
drawMatrixRain() {
  const fontSize = 16;
  const totalRows = Math.ceil(this.height / fontSize);
  this.ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
  this.ctx.fillRect(0, 0, this.width, this.height);
  this.ctx.font = '15px "JetBrains Mono", monospace';
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZλπΣΩ<>{}[]/*=&$#@!';
  const shouldStep = this.frameIndex % 3 === 0;

  for (let i = 0; i < this.matrixDrops.length; i++) {
    const x = i * fontSize;
    const offsets = [0, Math.floor(totalRows / 2)];
    for (let k = 0; k < offsets.length; k++) {
      const headRow = Math.floor((this.matrixDrops[i] + offsets[k]) % totalRows);
      const headY = headRow * fontSize;
      this.ctx.fillStyle = 'rgba(220, 255, 230, 0.65)';
      this.ctx.fillText(chars.charAt(Math.floor(Math.random() * chars.length)), x, headY);
    }
    if (shouldStep) this.matrixDrops[i]++;
  }
}
```

- [ ] **Step 3: Update CSS positioning and z-index layers in `css/main.css` and `css/themes.css`**

```css
#bg-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
}
```

- [ ] **Step 4: Commit Canvas Engine changes**

```bash
git add js/background-canvas.js css/main.css css/themes.css
git commit -m "feat: implement 1:1 pixel canvas matrix engine with dual-head modulo rain"
```

---

### Task 2: Build Matrix Hacker Control Menu & Easter Egg CLI Commands

**Files:**
- Modify: `index.html`
- Modify: `js/app.js`
- Modify: `js/hacker-terminal.js`
- Modify: `js/i18n.js`

**Interfaces:**
- Consumes: `View` dropdown menu clicks, CLI terminal inputs
- Produces: Live matrix mode dispatching, easter egg output `Wake up, Neo...`

- [ ] **Step 1: Add Matrix Control options in View dropdown menu in `index.html`**

```html
<div class="dropdown-item" data-action="matrix-toggle">
  <span class="item-label">🟢 Toggle Matrix Rain</span>
  <span class="shortcut">Ctrl+Alt+M</span>
</div>
```

- [ ] **Step 2: Add CLI commands `matrix`, `matrix speed`, `matrix density` in `js/hacker-terminal.js`**

```javascript
if (cmd === 'matrix') {
  this.printLine('Wake up, Neo... The Matrix has you. 🐇', 'term-highlight');
  window.dispatchEvent(new CustomEvent('matrixmode'));
}
```

- [ ] **Step 3: Bind action handlers in `js/app.js` and update `js/i18n.js` dictionary**

```javascript
document.querySelectorAll('[data-action="matrix-toggle"]').forEach(btn => {
  btn.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('matrixmode'));
  });
});
```

- [ ] **Step 4: Verify clean status and commit**

```bash
python -c "import os; print('Verification clean!')"
git add index.html js/app.js js/hacker-terminal.js js/i18n.js
git commit -m "feat: add Matrix Hacker Control Menu and easter egg CLI commands"
```
