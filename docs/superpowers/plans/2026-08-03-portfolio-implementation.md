# Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a high-performance, 5-theme interactive portfolio web application for Lim Wei Jian (Wei Jian) showcasing top-tier HTML5/CSS3/Vanilla JS skills, AI background, personal story, and interactive IDE/n8n simulators, ready for deployment on Cloudflare Pages.

**Architecture:** Zero-dependency static web application utilizing native HTML5, CSS Variables & 3D Transforms, modular ES6 JavaScript, theme-aware Canvas rendering, and interactive DOM components.

**Tech Stack:** HTML5, Vanilla CSS3 (Variables, Flexbox, CSS Grid, 3D Transforms), Vanilla JavaScript (ES6+ Modules), HTML5 Canvas API, Cloudflare Pages static hosting.

## Global Constraints

- Zero heavy external JavaScript frameworks (no React/Vue/Angular bloat).
- Pure static assets ready for Cloudflare Pages global edge network.
- 5 distinct dynamic themes (`football`, `cinema`, `ide`, `swiss`, `travel`).
- Responsive across all viewports (Mobile `<768px`, Laptop `1024px`, Desktop `1400px+`).
- 60fps animation performance using hardware-accelerated CSS transforms and Canvas requestAnimationFrame.

---

### Task 1: Core Setup, HTML Boilerplate & SEO Meta (Cloudflare Ready)

**Files:**
- Create: `index.html`
- Create: `_headers`
- Create: `_routes.json`

**Interfaces:**
- Consumes: Google Fonts (`Outfit`, `JetBrains Mono`, `Cormorant Garamond`, `Courier Prime`)
- Produces: HTML DOM structure with semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`), theme wrapper, and Cloudflare Pages header configuration.

- [ ] **Step 1: Create `_headers` and `_routes.json` for Cloudflare Pages**

```text
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Cache-Control: public, max-age=3600
```

- [ ] **Step 2: Create `index.html` with semantic structure, meta headers, theme switcher container, hero section, timeline section, culture section, Web IDE section, n8n simulator section, and micro-tools section**

- [ ] **Step 3: Commit Task 1**

```bash
git add index.html _headers _routes.json
git commit -m "feat: setup HTML5 boilerplate, Cloudflare headers, and semantic sections"
```

---

### Task 2: Global CSS System & 5-Theme Stylesheets

**Files:**
- Create: `css/main.css`
- Create: `css/themes.css`

**Interfaces:**
- Consumes: Theme data attribute `data-theme` on `<html>` or `<body>`
- Produces: CSS custom properties (`--bg-primary`, `--text-primary`, `--accent-color`, `--font-heading`, `--font-mono`, `--border-radius`, `--card-bg`) for all 5 themes.

- [ ] **Step 1: Write `css/main.css` containing resets, typography scales, CSS grid helpers, and base layout constraints**
- [ ] **Step 2: Write `css/themes.css` defining colors, fonts, and accents for `football`, `cinema`, `ide`, `swiss`, `travel`**
- [ ] **Step 3: Commit Task 2**

```bash
git add css/main.css css/themes.css
git commit -m "feat: add global CSS design tokens and 5-theme color/font definitions"
```

---

### Task 3: UI Components, Glassmorphism & Animations Stylesheet

**Files:**
- Create: `css/components.css`
- Create: `css/animations.css`

**Interfaces:**
- Consumes: CSS Variables from `main.css` and `themes.css`
- Produces: Visual components (`.theme-switcher-bar`, `.web-ide-window`, `.n8n-workflow-canvas`, `.tilt-card`, `.timeline-node`, `.glass-card`, `.btn-primary`) and 3D transform / keyframe animations.

- [ ] **Step 1: Write `css/components.css` styling all cards, timeline, hero badge, IDE editor, n8n node flow, and theme control bar**
- [ ] **Step 2: Write `css/animations.css` with 3D tilt perspective rules, pulse glows, floating badges, and typewriter animation classes**
- [ ] **Step 3: Commit Task 3**

```bash
git add css/components.css css/animations.css
git commit -m "feat: add UI component styles, glassmorphism, and 3D tilt CSS animations"
```

---

### Task 4: Live Theme Engine Module (`js/theme-engine.js`)

**Files:**
- Create: `js/theme-engine.js`

**Interfaces:**
- Consumes: DOM Theme Switcher buttons
- Produces: `ThemeEngine` class with `setTheme(themeName)`, `getCurrentTheme()`, audio feedback hook, and LocalStorage state preservation.

- [ ] **Step 1: Implement `ThemeEngine` class with theme switching logic, data-theme attribute update, smooth transition class trigger, and sound effect toggle**
- [ ] **Step 2: Connect theme buttons in DOM with click handlers**
- [ ] **Step 3: Commit Task 4**

```bash
git add js/theme-engine.js
git commit -m "feat: implement live theme switcher module with persistence and audio hooks"
```

---

### Task 5: Interactive Web IDE Simulator (`js/ide-simulator.js`)

**Files:**
- Create: `js/ide-simulator.js`

**Interfaces:**
- Consumes: Code tab buttons (`C++`, `C#`, `Java`, `Python/RAG`), "Run Code" button
- Produces: `IDESimulator` module that updates editor line contents, syntax highlighting, and types out simulated console logs on execution.

- [ ] **Step 1: Define code snippets for C++ (Smart Pointers), C# (LINQ & Game Logic), Java (Design Patterns), Python (Multi-Agent RAG)**
- [ ] **Step 2: Implement tab switching and animated console typing effect for "Run Code"**
- [ ] **Step 3: Commit Task 5**

```bash
git add js/ide-simulator.js
git commit -m "feat: implement interactive Web IDE simulator with C++, C#, Java, Python tabs"
```

---

### Task 6: Interactive n8n Multi-Agent Story Workflow Simulator (`js/n8n-simulator.js`)

**Files:**
- Create: `js/n8n-simulator.js`

**Interfaces:**
- Consumes: Input field prompt text, "Generate Story Workflow" button
- Produces: `N8nSimulator` module that animates node-by-node execution (`[Input]` -> `[n8n Webhook]` -> `[Classifier]` -> `[RAG Agent]` -> `[Storyteller LLM]`) and renders typewriter story output.

- [ ] **Step 1: Write `N8nSimulator` module with node sequence animation logic and typewriter text renderer**
- [ ] **Step 2: Bind input submission to workflow canvas animation**
- [ ] **Step 3: Commit Task 6**

```bash
git add js/n8n-simulator.js
git commit -m "feat: implement interactive n8n Multi-Agent story workflow simulator"
```

---

### Task 7: Theme-Aware Background Canvas (`js/background-canvas.js`)

**Files:**
- Create: `js/background-canvas.js`

**Interfaces:**
- Consumes: Current theme state from `ThemeEngine`
- Produces: Dynamic 60fps HTML5 Canvas background (Football tactical grid, Cinema light sheen, IDE matrix rain, Swiss paper grain texture, Travel floating particles).

- [ ] **Step 1: Implement `BackgroundCanvas` class handling window resize, requestAnimationFrame loop, and theme particle rendering modes**
- [ ] **Step 2: Connect background canvas state to `ThemeEngine` switch events**
- [ ] **Step 3: Commit Task 7**

```bash
git add js/background-canvas.js
git commit -m "feat: implement theme-aware dynamic HTML5 background canvas"
```

---

### Task 8: Live CSS Variable Tweaker Tool & Main Entry (`js/css-tweaker.js` & `js/app.js`)

**Files:**
- Create: `js/css-tweaker.js`
- Create: `js/app.js`

**Interfaces:**
- Consumes: `ThemeEngine`, `IDESimulator`, `N8nSimulator`, `BackgroundCanvas`
- Produces: Live CSS variable slider controls (glass blur, neon glow, border radius) with raw CSS exporter, 3D tilt cursor listeners, and app initialization entry point.

- [ ] **Step 1: Implement `js/css-tweaker.js` for live CSS variable adjustments**
- [ ] **Step 2: Implement 3D Tilt effect listener in `js/app.js` for elements with `.tilt-card`**
- [ ] **Step 3: Initialize all modules in `js/app.js` on DOMContentLoaded**
- [ ] **Step 4: Commit Task 8**

```bash
git add js/css-tweaker.js js/app.js
git commit -m "feat: implement live CSS tweaker tool, 3D tilt physics, and main entry point"
```

---

### Task 9: Verification & Local Cloudflare Pages Preview

**Files:**
- Audit: `index.html`, `css/*`, `js/*`, `_headers`

- [ ] **Step 1: Run local static server to test all 5 themes, Web IDE, n8n simulator, and CSS tweaker**
- [ ] **Step 2: Test responsive layout at 375px (Mobile), 768px (Tablet), and 1440px (Desktop)**
- [ ] **Step 3: Verify 0-console errors and clean Cloudflare Pages compatibility**
