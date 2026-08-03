/**
 * n8n-simulator.js - Interactive n8n Multi-Agent Story Workflow Simulator
 * Simulates step-by-step node execution and streams typewriter story generation.
 */

export class N8nSimulator {
  constructor() {
    this.isExecuting = false;
    this.init();
  }

  init() {
    const triggerBtn = document.getElementById('btn-trigger-n8n');
    const inputField = document.getElementById('n8n-prompt-input');

    if (triggerBtn) {
      triggerBtn.addEventListener('click', () => {
        const promptText = inputField ? inputField.value.trim() : '新山的小镇程序员发现秘密 AI 节点';
        this.runWorkflow(promptText || '新山的小镇程序员发现秘密 AI 节点');
      });
    }
  }

  async runWorkflow(userInput) {
    if (this.isExecuting) return;
    this.isExecuting = true;

    const nodes = [
      { id: 'node-input', label: '1. User Input Received', delay: 400 },
      { id: 'node-n8n', label: '2. n8n Webhook Triggered', delay: 500 },
      { id: 'node-classifier', label: '3. Style Classifier Agent analyzing prompt...', delay: 600 },
      { id: 'node-rag', label: '4. RAG Vector Memory Injected', delay: 600 },
      { id: 'node-llm', label: '5. Storyteller LLM Generating Stream...', delay: 700 }
    ];

    const outputBox = document.getElementById('n8n-story-output');
    if (outputBox) {
      outputBox.textContent = '⚡ n8n Workflow Dispatching... Initiating multi-agent pipeline.\n';
    }

    // Reset node active states
    nodes.forEach(n => {
      const el = document.getElementById(n.id);
      if (el) el.classList.remove('active');
    });

    // Step through nodes with delay
    for (const node of nodes) {
      const el = document.getElementById(node.id);
      if (el) el.classList.add('active');
      if (outputBox) {
        outputBox.textContent += `[n8n Status] ${node.label}\n`;
      }
      await this.sleep(node.delay);
    }

    // Generate story output with typewriter effect
    const generatedStory = `
✨ 【n8n 多智能体创作完成】
主题关键词: "${userInput}"

【故事篇章】：
在柔佛新山 (Johor Bahru) 的 Taman Kobena，深夜的灯光透过小镇窗户，落在终端闪烁的屏幕上。这是林伟健构建的第 7 个多智能体节点。随着 n8n Webhook 触发器的回响，RAG 向量数据库顺畅检索出沉睡的代码规范，智能体协同在云端飞速演绎——从最初看《刀剑神域》时对虚拟世界的遐想，到如今用 C++、C#、Java 与 Python 手握真实的代码画笔。这一刻，小镇的安静与生成式 AI 的澎湃交织在了一起，属于程序员的征途才刚刚开始。
`;

    if (outputBox) {
      outputBox.textContent = '';
      await this.typewriter(outputBox, generatedStory, 20);
    }

    this.isExecuting = false;
  }

  typewriter(element, text, speed = 20) {
    return new Promise(resolve => {
      let index = 0;
      const timer = setInterval(() => {
        element.textContent += text.charAt(index);
        index++;
        if (index >= text.length) {
          clearInterval(timer);
          resolve();
        }
      }, speed);
    });
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
