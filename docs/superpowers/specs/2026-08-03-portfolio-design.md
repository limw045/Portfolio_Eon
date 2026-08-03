# Design Specification: Lim Wei Jian (Wei Jian) - Ultimate Skill-Showcase Interactive Portfolio

**Date**: 2026-08-03  
**Target User / Role**: Lim Wei Jian (Final Year AI Student @ Multimedia University, CGPA 3.74, Diploma CGPA 3.78)  
**Primary Goal**: **炫技 (Showcasing Top-Tier Frontend Craftsmanship & Interactive Engineering)** through a multi-theme, high-performance, responsive web application.

---

## 1. Overview & Core Philosophy

This portfolio serves as both an interactive resume/narrative of Lim Wei Jian’s life journey and a live demonstration of high-level HTML5/CSS3/JavaScript DOM engineering. 

### Key Principles
1. **炫技 (Technical & Aesthetic Flex)**: Every UI element features rich micro-interactions, smooth CSS animations, dynamic theme morphing, and interactive components (like a live Web IDE terminal).
2. **Zero Heavy Framework Dependencies**: Built with pure HTML5, Vanilla CSS (CSS Variables, Grid, Flexbox, 3D Transforms), and Modular Vanilla JavaScript (ES6+). Fast, lightweight, and showcasing pure baseline mastery.
3. **Cloudflare Pages Deployment Ready**: Lightweight static site architecture optimized for zero-build or standard build deployment on Cloudflare Pages, taking advantage of Cloudflare's ultra-fast global edge CDN.
4. **5 Distinct Dynamic Themes**: Instant live switcher modifying color palettes, typography, card borders, particle backgrounds, hover physics, and UI accents.
5. **Authentic Story & Passion**: Blends high-level AI/IT skills with personal origins (Johor Bahru), academic milestones, and cultural tastes (Music, Football, Movies, Novels, Games).

---

## 2. 5-Theme Engine Architecture

The site includes a floating/header **Live Theme Engine Switcher**. Switching themes updates root CSS variables, triggers smooth transition animations, and changes canvas background/particle effects.

| Theme ID | Theme Name | Visual Style & Color Palette | Distinct UI Details |
| :--- | :--- | :--- | :--- |
| `football` | **Green Pitch & Tactics** | Grass Green (`#0F380F`), Stadium White (`#F0F0F0`), BVB Yellow (`#FDE100`), Arsenal Red (`#EF0107`), Man City Sky Blue (`#6CABDD`) | Chalkboard tactic lines, scoreboard font, card corners with field grid lines. |
| `cinema` | **Cinema Noir** | Movie Dark (`#0B0C10`), Projection Gold (`#C5A059`), Neon Red (`#E50914`) | Lens flare ambient sheen, film strip borders, movie ticket card styling. |
| `ide` | **Cyber Code IDE** | Terminal Dark (`#1E1E2E`), Electric Cyan (`#89B4FA`), Neon Purple (`#CBA6F7`) | Monospace code font, glowing terminal borders, code line numbers, syntax accents. |
| `swiss` | **Swiss Editorial Paper** | Warm Parchment (`#F5F2EB`), Ink Black (`#1C1C1C`), Crimson (`#9E2A2B`) | Serif typography, strong 16-column grid lines, paper texture, elegant editorial layout. |
| `travel` | **Travel Story Log** | Leather Brown (`#2C1D11`), Warm Sand (`#EEDCBE`), Stamp Gold (`#D4AF37`) | Passport stamp badges, Polaroid photo stack shadow tilt, vintage compass accent. |

---

## 3. Page Structure & Interactive Modules

### Section 1: Hero & Origin Story (小镇故事)
- **Greeting**: "Hi, I'm Lim Wei Jian (林伟健)" — Final Year AI Student @ MMU.
- **Johor Bahru Origin**: Growing up in Taman Kobena, Johor Bahru; early curiosity about virtual worlds (inspired by *Sword Art Online*) and how code transforms ideas into reality.
- **Core Summary**: Specializing in Multi-Agent Systems, RAG, Computer Vision, and Full-Stack IT Development.

### Section 2: Academic Journey (读书生涯)
- **Interactive Timeline**:
  1. **SMK DARY (SPM)**: 1 A+, 1 A, 1 A- (Foundational STEM interest).
  2. **MMU Diploma in IT (CGPA: 3.78)**: Lead Developer for *AI Toolbox Online Website* (HTML/CSS/JS/PHP/MySQL, subscription model, AI text/image tools).
  3. **MMU Degree in AI (CGPA: 3.74)**: Final Year Project — *JKR-Compliant Traffic Impact Assessment (TIA) Report Generator* (Multi-Agent RAG framework, reduced manual drafting time by 70%).

### Section 3: Cultural & Personal Tastes Hub (影音书与精神角落)
- **⚽ Football**: Fan of **Borussia Dortmund (BVB)** (passion & Yellow Wall), **Arsenal** (Gunners' fluid passing), and **Manchester City** (Blue Moon tactical perfection).
- **🎵 Music (R&B & Funk)**: Favorites include **方大同 (Khalil Fong)**, **陶喆 (David Tao)**, and **Bruno Mars** (Groove, R&B, Funk & Soul).
- **📚 Novels**: *刀剑神域 (Sword Art Online)* (VR/AI enlightenment), *诡秘之主 (Lord of the Mysteries)* (world-building & logic), *三体 (The Three-Body Problem)* (cosmic sci-fi).
- **🎮 Games**: *Valorant (瓦洛兰特)* (tactical competitive FPS), *Assassin's Creed (刺客信条)* (stealth & history), *Pokémon (宝可梦)* (nostalgia & strategy).
- **🎬 Movies**: *Interstellar (星际穿越)* (love & physics across dimensions), *Spider-Man (蜘蛛侠)* (growth & responsibility), *Odyssey (奥德赛)* (epic journey), *007* (gadgets & tactical style).

### Section 4: IT Skill Studio & Web IDE Terminal (硬核技能与代码呈现)
- **Interactive Web IDE Simulator**:
  - Tab 1: **`C++`** — Pointer & Memory Management / Custom Smart Pointer demo with step-by-step console execution log.
  - Tab 2: **`C#`** — Game Engine logic / LINQ query pipeline execution.
  - Tab 3: **`Java`** — OOP Design Pattern & Multi-threaded Task Queue demo.
  - Tab 4: **`Python / AI`** — Multi-Agent System algorithms & Prompt Engineering logic.
- **Interactive n8n Multi-Agent Story Generator Simulator (AI 交互节点体验区)**:
  - Viewer inputs a topic or fragment (e.g. *"A programmer in Johor Bahru stumbles upon a secret code..."*).
  - An animated n8n Workflow Canvas simulates step-by-step node execution:
    `[User Input]` ➔ `[n8n Webhook Node]` ➔ `[Genre Classifier Agent]` ➔ `[RAG Knowledge Node]` ➔ `[Storyteller LLM Agent]` ➔ `[Live Output Stream]`.
  - Generates an interactive story with typewriter effect live on screen, demonstrating n8n orchestration, Multi-Agent architecture, and Prompt Engineering skills!

### Section 5: Extensible Micro-Tools Playground (炫技小工具)
- **Built-in Tool 1**: **Live CSS Variable Tweaker & Code Exporter** (Allows viewers to modify glass blur, neon intensity, border radius live, and export raw CSS).
- **Slot Cards**: Styled placeholders for upcoming micro-tools.

---

## 4. UI/UX & Technical炫技 Enhancements

1. **3D Tilt Physics**: Cards tilt dynamically based on cursor movement (`transform: perspective(1000px) rotateX(...) rotateY(...)`).
2. **Glassmorphism & Shader Canvas**: Backdrop blur filters, glow effects, dynamic background particles reacting to mouse movement.
3. **Sound & Haptic Effects (Optional Toggle)**: Subtle retro audio feedback on button clicks and theme switching (can be muted anytime).
4. **Smooth Scroll & Progress Indicator**: Custom scrollbar, section indicator, and scroll-triggered fade-in micro-animations.

---

## 5. File & Directory Structure

```
f:/Works/Portfolio/
├── index.html
├── css/
│   ├── main.css           # Design tokens, CSS variables, global resets
│   ├── themes.css         # 5 themes definitions & overrides
│   ├── components.css     # Buttons, cards, IDE, timeline, modals
│   └── animations.css     # Keyframes, hover effects, 3D tilt
├── js/
│   ├── app.js             # Entry point & scroll listeners
│   ├── theme-engine.js    # Live theme switching logic
│   ├── ide-simulator.js   # Interactive C++/C#/Java/Python IDE
│   └── background-canvas.js # Interactive particle / theme background
└── assets/                # Avatar, icons, team crests, screenshots
```

---

## 6. Cloudflare Pages Deployment Readiness

- **Static Distribution**: 100% pure client-side assets (HTML/CSS/JS/images) with zero server-side rendering overhead, perfect for Cloudflare Pages global edge network.
- **`_headers` File**: Configured for security (CSP, X-Frame-Options) and long-term asset caching.
- **`_routes.json` / `wrangler.toml` (Optional)**: Clean routing and header rules if needed.

---

## 7. Verification Plan

1. **Theme Switch Verification**: Test smooth switching across all 5 themes without visual glitches or layout shifts.
2. **Web IDE Interactive Test**: Verify tabs, "Run Code" animation, log output, and responsive scaling.
3. **Responsive & Performance Test**: Test on desktop (1920x1080), laptop, and mobile screens. Ensure 60fps animations.
4. **Cloudflare Pages Compatibility Test**: Verify local preview build runs seamlessly with static file serving (`npx wrangler pages dev` or local HTTP server).
