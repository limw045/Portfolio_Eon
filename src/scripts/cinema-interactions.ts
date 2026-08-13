import { codeScenes, type CodeLanguage } from '../data/portfolio';

const cinemaStage = document.querySelector<HTMLElement>('.cinema-stage');
let language: CodeLanguage = 'cpp';
let soundEnabled = false;
let audioContext: AudioContext | null = null;
let workflowTimer = 0;
let ambientGain: GainNode | null = null;
let ambientSources: AudioScheduledSourceNode[] = [];

function playCue(frequency = 110) {
  if (!soundEnabled) return;
  audioContext ||= new AudioContext();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = 'triangle';
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0.018, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.09);
  oscillator.connect(gain).connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.1);
}

function setSoundEnabled(on: boolean) {
  soundEnabled = on;
  document.querySelectorAll<HTMLElement>('[data-sound-toggle]').forEach((button) => {
    button.setAttribute('aria-pressed', String(on));
    button.textContent = on ? 'Sound On' : 'Sound Off';
  });
  if (on) startAmbience();
  else stopAmbience();
}

function createNoiseBuffer(ctx: AudioContext, seconds = 1): AudioBuffer {
  const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * seconds), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < data.length; i += 1) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[i] = last * 3.5;
  }
  return buffer;
}

function startAmbience() {
  if (ambientGain || !soundEnabled) return;
  audioContext ||= new AudioContext();
  const ctx = audioContext;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.035, ctx.currentTime + 0.25);
  gain.connect(ctx.destination);
  ambientGain = gain;

  const hum = ctx.createBufferSource();
  hum.buffer = createNoiseBuffer(ctx);
  hum.loop = true;
  const humFilter = ctx.createBiquadFilter();
  humFilter.type = 'lowpass';
  humFilter.frequency.value = 170;
  humFilter.Q.value = 0.5;
  hum.connect(humFilter);
  humFilter.connect(gain);
  hum.start();
  ambientSources.push(hum);

  const rain = ctx.createBufferSource();
  rain.buffer = createNoiseBuffer(ctx);
  rain.loop = true;
  const rainFilter = ctx.createBiquadFilter();
  rainFilter.type = 'bandpass';
  rainFilter.frequency.value = 1500;
  rainFilter.Q.value = 0.35;
  const rainGain = ctx.createGain();
  rainGain.gain.value = 0.5;
  rain.connect(rainFilter);
  rainFilter.connect(rainGain);
  rainGain.connect(gain);
  rain.start();
  ambientSources.push(rain);
}

function stopAmbience() {
  if (ambientGain && audioContext) {
    const gain = ambientGain;
    const sources = ambientSources;
    gain.gain.cancelScheduledValues(audioContext.currentTime);
    gain.gain.setValueAtTime(gain.gain.value, audioContext.currentTime);
    gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.15);
    window.setTimeout(() => {
      sources.forEach((source) => { try { source.stop(); } catch { /* noop */ } });
      try { gain.disconnect(); } catch { /* noop */ }
    }, 200);
  }
  ambientSources = [];
  ambientGain = null;
}

let timecodeTimer = 0;
let timecodeFrames = 0;
const timecodeEl = document.querySelector<HTMLElement>('[data-cinema-timecode]');
function startTimecode() {
  if (!timecodeEl || timecodeTimer) return;
  timecodeTimer = window.setInterval(() => {
    timecodeFrames += 1;
    const frames = timecodeFrames % 24;
    const seconds = Math.floor(timecodeFrames / 24) % 60;
    const minutes = Math.floor(timecodeFrames / (24 * 60)) % 60;
    const hours = Math.floor(timecodeFrames / (24 * 3600)) % 24;
    timecodeEl.textContent = [hours, minutes, seconds, frames].map((n) => String(n).padStart(2, '0')).join(':');
  }, 1000 / 24);
}
function stopTimecode() {
  if (timecodeTimer) { window.clearInterval(timecodeTimer); timecodeTimer = 0; }
}

document.querySelectorAll<HTMLElement>('[data-sound-toggle]').forEach((button) => {
  button.addEventListener('click', () => {
    setSoundEnabled(!soundEnabled);
    playCue(soundEnabled ? 160 : 120);
  });
});

const filename = document.querySelector<HTMLElement>('[data-cinema-code-filename]');
const source = document.querySelector<HTMLElement>('[data-cinema-code-source]');
const output = document.querySelector<HTMLElement>('[data-cinema-code-output]');
function renderCode() {
  const scene = codeScenes[language];
  if (filename) filename.textContent = scene.filename;
  if (source) source.textContent = scene.source;
  document.querySelectorAll<HTMLElement>('[data-cinema-code-tab]').forEach((tab) => {
    const selected = tab.dataset.cinemaCodeTab === language;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
}
document.querySelectorAll<HTMLElement>('[data-cinema-code-tab]').forEach((tab) => tab.addEventListener('click', () => {
  language = (tab.dataset.cinemaCodeTab || 'cpp') as CodeLanguage;
  renderCode();
  playCue(130);
}));
const codeTabs = Array.from(document.querySelectorAll<HTMLElement>('[data-cinema-code-tab]'));
codeTabs.forEach((tab, index) => {
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % codeTabs.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + codeTabs.length) % codeTabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = codeTabs.length - 1;
    codeTabs[next].focus();
    codeTabs[next].click();
  });
});
document.querySelector<HTMLElement>('[data-cinema-code-run]')?.addEventListener('click', () => {
  if (!output) return;
  output.textContent = 'Spooling scene…';
  playCue(90);
  window.setTimeout(() => { output.textContent = codeScenes[language].output; playCue(180); }, 420);
});

const workflowPrompt = document.querySelector<HTMLTextAreaElement>('[data-shared-workflow-prompt]');
const workflowOutput = document.querySelector<HTMLElement>('[data-cinema-workflow-output]');
const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-cinema-node]'));
document.querySelector<HTMLElement>('[data-cinema-workflow-run]')?.addEventListener('click', () => {
  window.clearInterval(workflowTimer);
  nodes.forEach((node) => { node.classList.remove('is-active', 'is-complete'); node.querySelector('small')!.textContent = 'Standing by'; });
  if (workflowOutput) workflowOutput.textContent = 'Cueing the sequence…';
  let index = 0;
  const advance = () => {
    if (index > 0) { nodes[index - 1].classList.remove('is-active'); nodes[index - 1].classList.add('is-complete'); nodes[index - 1].querySelector('small')!.textContent = 'Complete'; }
    if (index >= nodes.length) {
      window.clearInterval(workflowTimer);
      if (workflowOutput) workflowOutput.textContent = `Final cut: ${workflowPrompt?.value || 'A new system story'} — grounded, structured and ready for review.`;
      playCue(190);
      return;
    }
    nodes[index].classList.add('is-active');
    nodes[index].querySelector('small')!.textContent = 'Running';
    index += 1;
  };
  advance();
  workflowTimer = window.setInterval(advance, 360);
});

const player = document.querySelector<HTMLElement>('[data-cinema-player]');
const playerFrame = document.querySelector<HTMLIFrameElement>('[data-cinema-player-frame]');
const playerTitle = document.querySelector<HTMLElement>('[data-cinema-player-title]');
document.querySelectorAll<HTMLElement>('[data-cinema-track]').forEach((button) => button.addEventListener('click', () => {
  if (!player || !playerFrame) return;
  player.hidden = false;
  playerFrame.src = `https://www.youtube.com/embed/${button.dataset.cinemaTrack}?autoplay=1&rel=0`;
  if (playerTitle) playerTitle.textContent = button.dataset.trackTitle || 'Soundtrack';
}));
document.querySelector<HTMLElement>('[data-cinema-player-close]')?.addEventListener('click', () => {
  if (player) player.hidden = true;
  if (playerFrame) playerFrame.src = '';
});
window.addEventListener('stagechange', ((event: CustomEvent<{ stage: string }>) => {
  if (event.detail.stage === 'cinema') {
    startTimecode();
  } else {
    stopTimecode();
    setSoundEnabled(false);
    if (playerFrame) playerFrame.src = '';
  }
  if (event.detail.stage === 'cinema') {
    const idePrompt = document.querySelector<HTMLInputElement>('#n8n-prompt-input');
    if (idePrompt && workflowPrompt) workflowPrompt.value = idePrompt.value;
    const visibleSnippet = document.querySelector<HTMLElement>('#ide-stage .code-snippet:not(.hidden)');
    const selected = visibleSnippet?.id.replace('code-', '') as CodeLanguage | undefined;
    if (selected && selected in codeScenes) { language = selected; renderCode(); }
    const ideOutput = document.querySelector<HTMLElement>('#ide-terminal-output');
    if (ideOutput?.textContent?.trim() && output) output.textContent = ideOutput.textContent.trim();
  } else {
    const idePrompt = document.querySelector<HTMLInputElement>('#n8n-prompt-input');
    if (idePrompt && workflowPrompt) idePrompt.value = workflowPrompt.value;
    document.querySelector<HTMLElement>(`#ide-stage .code-tab-btn[data-tab="${language}"]`)?.click();
    const ideOutput = document.querySelector<HTMLElement>('#ide-terminal-output');
    if (ideOutput && output?.textContent?.trim()) ideOutput.textContent = output.textContent.trim();
  }
}) as EventListener);

const defaults = { grain: 18, vignette: 62, beam: 42 };
function updateGrade(name: keyof typeof defaults, value: number) {
  cinemaStage?.style.setProperty(`--cinema-${name}`, `${value / 100}`);
  const label = document.querySelector<HTMLOutputElement>(`[data-cinema-tool-output="${name}"]`);
  if (label) label.value = `${value}%`;
}
document.querySelectorAll<HTMLInputElement>('[data-cinema-tool]').forEach((input) => input.addEventListener('input', () => {
  updateGrade(input.dataset.cinemaTool as keyof typeof defaults, Number(input.value));
}));
document.querySelector<HTMLElement>('[data-cinema-tools-reset]')?.addEventListener('click', () => {
  document.querySelectorAll<HTMLInputElement>('[data-cinema-tool]').forEach((input) => {
    const name = input.dataset.cinemaTool as keyof typeof defaults;
    input.value = String(defaults[name]);
    updateGrade(name, defaults[name]);
  });
});

renderCode();
if (document.documentElement.dataset.stage === 'cinema') startTimecode();
