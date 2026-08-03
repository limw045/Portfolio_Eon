# Matrix Rain Engine & Matrix Hacker Control Menu Design Spec

## Overview
This specification details the re-architecture of the Matrix Digital Rain background canvas engine and the integration of an authentic Matrix-style Hacker Control Menu for the portfolio application.

The design solves all resolution distortion, vertical stretching, and layout clipping issues by utilizing a 1:1 Viewport Pixel Mapping Engine paired with a Dual-Head Modulo Wrap Stream algorithm. Additionally, it integrates a Matrix-themed control menu inside the top menu bar (`View -> Matrix Control`) and the bottom CLI terminal (`#ide-terminal-drawer`).

---

## 1. Canvas Architecture: 1:1 Viewport Seamless Loop Engine

### 1.1 Pixel-Perfect 1:1 Viewport Resolution
To eliminate any vertical stretching or character distortion:
- Canvas internal resolution (`canvas.width`, `canvas.height`) strictly matches `window.innerWidth` and `window.innerHeight`.
- CSS styling: `#bg-canvas { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 0; pointer-events: none; }`.
- Resize Listener: Re-calculates column counts and row limits dynamically on window resize events.

### 1.2 Dual-Head Modulo Wrap Algorithm
To ensure 100% continuous rain coverage from the top (0%) to the bottom (100%) of the viewport at all times without empty gaps:
- `totalRows = Math.ceil(this.height / fontSize)`
- Each column `i` maintains 2 staggered stream heads separated by an offset of `totalRows / 2`.
- Modulo position calculation: `row = Math.floor((yIndex + offset) % totalRows)`.
- Smooth float step (`speed = 0.35` rows per frame) for a relaxed, silk-smooth 60fps fall speed.

### 1.3 Aesthetics & Color Palette
- Canvas Background Trail: `rgba(0, 0, 0, 0.08)` semi-transparent black overlay for natural trailing fade.
- Monospace Font: `15px "JetBrains Mono", monospace`.
- Leading Head Characters: `rgba(220, 255, 230, 0.65)` (soft neon mint green).
- Trailing Characters: `rgba(0, 255, 102, 0.25)` (classic Matrix green).
- Background Isolation: Section containers set to `background: transparent !important; z-index: 2;`. Cards set to `background: rgba(0, 16, 7, 0.78) !important; backdrop-filter: blur(6px); z-index: 3;`.

---

## 2. Matrix Hacker Control Menu & Easter Egg System

### 2.1 Top Bar Menu Integration (`View -> 🟢 Matrix Cyber Deck`)
- Add an explicit **`Matrix Control Panel`** menu item under `View` in the top VS Code menu bar (`index.html`):
  - Toggle Matrix Rain Mode (`CTRL+ALT+M`)
  - Matrix Rain Speed (`Normal` / `Slow` / `Fast`)
  - Matrix Character Set (`Classic Katakana + Code` / `Binary 01` / `Hexadecimal`)

### 2.2 CLI Terminal Commands (`#ide-terminal-drawer`)
Enhance the interactive Hacker CLI Terminal (`js/hacker-terminal.js`) with dedicated Matrix commands:
- `matrix`: Activates IDE Matrix mode with classic typewriter easter egg:
  > *"Wake up, Neo... The Matrix has you. Follow the white rabbit. 🐇"*
- `matrix speed [slow|normal|fast]`: Live adjusts rain fall velocity.
- `matrix density [low|normal|high]`: Toggles stream column density.
- `matrix clear`: Resets background canvas.

---

## 3. Data Flow & Event Integration

1. User clicks **`View -> Matrix Control`** or types `matrix` in CLI terminal.
2. Custom event `matrixmode` or `matrixconfig` is dispatched on `window`.
3. `BackgroundCanvas` receives event and dynamically updates velocity, character set, or density parameters without page reload.

---

## 4. Verification & Testing Plan

### Automated Verification
- Verify code compiles cleanly with zero syntax or lint errors via Python verification script.

### Manual Verification
- Test viewport resize across 1080p, 2K, and mobile screens to confirm zero character stretching.
- Scroll continuously down to all sections (`#academic`, `#culture`, `#skill-studio`, `#n8n-studio`, `#micro-tools`, `.footer-section`) to confirm 100% full-screen digital rain visibility.
- Test top menu `View -> Matrix Cyber Deck` and CLI terminal `matrix` command execution.
