import type { SectionKey, StageName, ThemeName } from '../data/portfolio';

const themes: ThemeName[] = ['ide', 'cinema', 'football', 'swiss', 'travel'];
const root = document.documentElement;
const ideStage = document.querySelector<HTMLElement>('#ide-stage');
const cinemaStage = document.querySelector<HTMLElement>('#cinema-stage');
const curtain = document.querySelector<HTMLElement>('.stage-curtain');
let switching = false;

function stageFor(theme: ThemeName): StageName {
  return theme === 'cinema' ? 'cinema' : 'ide';
}

function activeSection(): SectionKey {
  const stage = root.dataset.stage || 'ide';
  const sections = Array.from(document.querySelectorAll<HTMLElement>(`[data-stage="${stage}"] [data-section-key]`));
  const viewportLine = window.innerHeight * 0.38;
  const closest = sections
    .map((element) => ({ element, distance: Math.abs(element.getBoundingClientRect().top - viewportLine) }))
    .sort((a, b) => a.distance - b.distance)[0]?.element;
  return (closest?.dataset.sectionKey as SectionKey) || 'hero';
}

function setStage(stage: StageName) {
  const cinemaActive = stage === 'cinema';
  if (ideStage) {
    ideStage.hidden = cinemaActive;
    ideStage.toggleAttribute('inert', cinemaActive);
  }
  if (cinemaStage) {
    cinemaStage.hidden = !cinemaActive;
    cinemaStage.toggleAttribute('inert', !cinemaActive);
  }
  root.dataset.stage = stage;
}

function focusSection(key: SectionKey, smooth = false) {
  const stage = root.dataset.stage || 'ide';
  const target = document.querySelector<HTMLElement>(`[data-stage="${stage}"] [data-section-key="${key}"]`);
  if (!target) return;
  target.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
  const heading = target.querySelector<HTMLElement>('h1, h2');
  if (heading) {
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
  }
}

function dispatchTheme(theme: ThemeName) {
  window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
  window.dispatchEvent(new CustomEvent('stagechange', { detail: { stage: stageFor(theme) } }));
}

function applyTheme(theme: ThemeName, key: SectionKey, animate = true) {
  const nextStage = stageFor(theme);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finish = () => {
    root.dataset.theme = theme;
    setStage(nextStage);
    localStorage.setItem('weijian_portfolio_theme', theme);
    dispatchTheme(theme);
    requestAnimationFrame(() => focusSection(key));
  };

  if (!animate || reduced || !curtain) {
    finish();
    return;
  }
  switching = true;
  curtain.classList.add('is-closing');
  window.setTimeout(() => {
    finish();
    curtain.classList.add('is-opening');
    window.setTimeout(() => {
      curtain.classList.remove('is-closing', 'is-opening');
      switching = false;
    }, 240);
  }, 230);
}

function requestTheme(rawTheme: string | undefined) {
  if (switching || !rawTheme || !themes.includes(rawTheme as ThemeName)) return;
  const theme = rawTheme as ThemeName;
  if (root.dataset.theme === theme) return;
  applyTheme(theme, activeSection());
}

document.querySelectorAll<HTMLElement>('[data-theme-target]').forEach((button) => {
  button.addEventListener('click', () => requestTheme(button.dataset.themeTarget));
});

document.querySelectorAll<HTMLAnchorElement>('[data-stage-link]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const key = link.dataset.stageLink as SectionKey | undefined;
    if (!key) return;
    event.preventDefault();
    focusSection(key, !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  });
});

const themeToggle = document.querySelector<HTMLElement>('[data-theme-menu-toggle]');
const cinemaThemeMenu = document.querySelector<HTMLElement>('[data-cinema-theme-menu]');
themeToggle?.addEventListener('click', () => {
  if (!cinemaThemeMenu) return;
  cinemaThemeMenu.hidden = !cinemaThemeMenu.hidden;
  themeToggle.setAttribute('aria-expanded', String(!cinemaThemeMenu.hidden));
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && cinemaThemeMenu && !cinemaThemeMenu.hidden) {
    cinemaThemeMenu.hidden = true;
    themeToggle?.setAttribute('aria-expanded', 'false');
    themeToggle?.focus();
  }
});

setStage(stageFor((root.dataset.theme as ThemeName) || 'ide'));

