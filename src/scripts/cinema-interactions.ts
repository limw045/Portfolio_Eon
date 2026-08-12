import { codeScenes, type CodeLanguage } from '../data/portfolio';

const root = document.documentElement;
let language: CodeLanguage = 'cpp';
let soundEnabled = false;
let audioContext: AudioContext | null = null;
let workflowTimer = 0;

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

document.querySelectorAll<HTMLElement>('[data-sound-toggle]').forEach((button) => {
  button.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    button.setAttribute('aria-pressed', String(soundEnabled));
    button.textContent = soundEnabled ? 'Sound On' : 'Sound Off';
    playCue(160);
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
    tab.setAttribute('aria-selected', String(tab.dataset.cinemaCodeTab === language));
  });
}
document.querySelectorAll<HTMLElement>('[data-cinema-code-tab]').forEach((tab) => tab.addEventListener('click', () => {
  language = (tab.dataset.cinemaCodeTab || 'cpp') as CodeLanguage;
  renderCode();
  playCue(130);
}));
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
  if (event.detail.stage !== 'cinema' && playerFrame) playerFrame.src = '';
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
  root.style.setProperty(`--cinema-${name}`, `${value / 100}`);
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
