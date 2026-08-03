/**
 * hacker-terminal.js - VS Code Integrated Terminal Panel Module
 * Allows visitors to type commands like 'help', 'skills', 'cat resume', 'theme', 'matrix', 'clear'.
 */

export class HackerTerminal {
  constructor() {
    this.history = [];
    this.historyIndex = -1;
    this.init();
  }

  init() {
    const input = document.getElementById('terminal-cli-input');
    const body = document.getElementById('terminal-cli-body');
    const toggleBtn = document.getElementById('btn-toggle-terminal');
    const statusToggleBtn = document.getElementById('status-toggle-panel');
    const closeBtn = document.getElementById('btn-panel-close');
    const termDrawer = document.getElementById('ide-terminal-drawer');

    const togglePanel = () => {
      if (termDrawer) termDrawer.classList.toggle('collapsed');
    };

    if (toggleBtn) toggleBtn.addEventListener('click', togglePanel);
    if (statusToggleBtn) statusToggleBtn.addEventListener('click', togglePanel);
    if (closeBtn) closeBtn.addEventListener('click', () => {
      if (termDrawer) termDrawer.classList.add('collapsed');
    });

    if (input && body) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const cmd = input.value.trim();
          if (cmd) {
            this.handleCommand(cmd, body);
            this.history.push(cmd);
            this.historyIndex = this.history.length;
            input.value = '';
          }
        } else if (e.key === 'ArrowUp') {
          if (this.historyIndex > 0) {
            this.historyIndex--;
            input.value = this.history[this.historyIndex];
          }
        } else if (e.key === 'ArrowDown') {
          if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            input.value = this.history[this.historyIndex];
          } else {
            this.historyIndex = this.history.length;
            input.value = '';
          }
        }
      });
    }
  }

  handleCommand(cmd, outputBody) {
    const printLine = (text, type = 'output') => {
      const line = document.createElement('div');
      line.className = `term-line term-${type}`;
      line.innerHTML = text;
      outputBody.appendChild(line);
      outputBody.scrollTop = outputBody.scrollHeight;
    };

    printLine(`weijian@mmu-ai-node:~$ ${cmd}`, 'cmd');

    const cleanCmd = cmd.toLowerCase().trim();

    if (cleanCmd === 'help') {
      printLine(`
Available CLI Commands:
  <span class="cmd-highlight">help</span>       - Show this command list
  <span class="cmd-highlight">skills</span>     - Print IT skills (C++, C#, Java, Python, Multi-Agent RAG)
  <span class="cmd-highlight">cat resume</span> - View academic summary & CGPA
  <span class="cmd-highlight">theme</span>      - Switch theme (e.g. 'theme football', 'theme cinema', 'theme swiss')
  <span class="cmd-highlight">matrix</span>     - Trigger matrix code waterfall effect
  <span class="cmd-highlight">clear</span>      - Clear terminal screen
      `);
    } else if (cleanCmd === 'skills') {
      printLine(`
[IT SKILLS & STACK SUMMARY]
  Python (Expert) : TensorFlow, PyTorch, Multi-Agent RAG, LangChain
  C++            : Memory Management, Pointers, High-Performance Systems
  C#             : LINQ, Game Engine Logic, OOP Architecture
  Java           : Concurrent ThreadPool, Object-Oriented Frameworks
  Frontend       : Vanilla HTML5/CSS3, ES6+ JS, 60fps Canvas Shaders
      `);
    } else if (cleanCmd === 'cat resume' || cleanCmd === 'resume') {
      printLine(`
[ACADEMIC SUMMARY - LIM WEI JIAN]
  Degree : B.S. Artificial Intelligence @ Multimedia University (CGPA 3.74)
  Diploma: Information Technology @ Multimedia University (CGPA 3.78)
  FYP    : JKR TIA Report Generator using Multi-Agent RAG (70%+ Efficiency Boost)
      `);
    } else if (cleanCmd.startsWith('theme ')) {
      const themeName = cleanCmd.replace('theme ', '').trim();
      const validThemes = ['ide', 'football', 'cinema', 'swiss', 'travel'];
      if (validThemes.includes(themeName)) {
        document.documentElement.setAttribute('data-theme', themeName);
        localStorage.setItem('weijian_portfolio_theme', themeName);
        window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: themeName } }));
        printLine(`[ThemeEngine] Successfully switched theme to '${themeName}'!`);
      } else {
        printLine(`Unknown theme. Choose from: ${validThemes.join(', ')}`, 'error');
      }
    } else if (cleanCmd === 'matrix') {
      printLine('[Matrix Engine] Activating Binary Code Rain Protocol...');
      window.dispatchEvent(new CustomEvent('matrixmode'));
    } else if (cleanCmd === 'clear') {
      outputBody.innerHTML = '';
    } else {
      printLine(`Command not found: '${cmd}'. Type '<span class="cmd-highlight">help</span>' for list.`, 'error');
    }
  }
}
