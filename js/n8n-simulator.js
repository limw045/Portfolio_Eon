/**
 * n8n-simulator.js - High-Performance Multi-Agent Workflow Simulator
 * Renders real-time node execution status and clean, professional story outputs
 * with 100% strict language separation and zero AI cliché tropes.
 */

export class N8nSimulator {
  constructor() {
    this.isExecuting = false;
    this.init();
  }

  init() {
    const triggerBtn = document.getElementById('btn-trigger-n8n');
    const input = document.getElementById('n8n-prompt-input');

    if (triggerBtn && input) {
      triggerBtn.addEventListener('click', () => {
        if (this.isExecuting) return;
        const prompt = input.value.trim();
        if (prompt) {
          this.runWorkflow(prompt);
        }
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !this.isExecuting) {
          const prompt = input.value.trim();
          if (prompt) this.runWorkflow(prompt);
        }
      });
    }
  }

  async runWorkflow(userPrompt) {
    this.isExecuting = true;
    const triggerBtn = document.getElementById('btn-trigger-n8n');
    const outputBox = document.getElementById('n8n-story-output');
    const lang = document.documentElement.lang || 'en';
    const isZh = lang.startsWith('zh');

    if (triggerBtn) {
      triggerBtn.disabled = true;
      triggerBtn.textContent = isZh ? '正在调度智能体...' : 'Executing Workflow...';
    }

    if (outputBox) {
      outputBox.innerHTML = `<span class="sys-prefix">[SYSTEM]</span> ${isZh ? '初始化 n8n 工作流引擎，正在准备节点调度...' : 'Initializing n8n Workflow Engine & Multi-Agent Nodes...'}`;
    }

    const nodes = [
      { id: 'node-input', label: 'User Input' },
      { id: 'node-n8n', label: 'n8n Webhook' },
      { id: 'node-classifier', label: 'Genre Classifier' },
      { id: 'node-rag', label: 'RAG Knowledge Node' },
      { id: 'node-llm', label: 'Storyteller LLM Agent' }
    ];

    // Reset nodes
    nodes.forEach(n => {
      const el = document.getElementById(n.id);
      if (el) el.className = 'node-item';
    });

    // Sequential Node Activation
    for (let i = 0; i < nodes.length; i++) {
      const el = document.getElementById(nodes[i].id);
      if (el) {
        el.classList.add('active');
        await this.sleep(400);
        el.classList.remove('active');
        el.classList.add('completed');
      }
    }

    // Generate Clean Professional Output Text
    const generatedContent = this.generateStoryText(userPrompt, isZh);

    // Typewriter effect into output box
    await this.typewriter(outputBox, generatedContent);

    if (triggerBtn) {
      triggerBtn.disabled = false;
      triggerBtn.textContent = isZh ? '生成故事工作流 ⚡' : 'Generate Story Workflow ⚡';
    }
    this.isExecuting = false;
  }

  generateStoryText(prompt, isZh) {
    if (isZh) {
      return `
<div class="stream-header-meta">
  <span class="meta-tag">[状态: 成功]</span>
  <span class="meta-tag">[耗时: 1.2s]</span>
  <span class="meta-tag">[节点数: 5]</span>
</div>
<p class="stream-title"><strong>主题:</strong> "${prompt}"</p>
<hr class="stream-divider">
<div class="stream-text">
在柔佛新山的夜色中，Taman Kobena 的代码终端上闪烁着最后一个节点的编译信息。这是林伟健构建的第 7 个多智能体协同架构。借助 n8n 工作流的异步调度与 RAG 向量数据库的高效检索，检索模块瞬间召回了底层系统的代码规范。智能体在云端流畅协作，将复杂的底层算法转化为优雅的高性能全栈界面。工程的严谨与 AI 的高效在此刻交汇，展现出纯粹的代码魅力。
</div>
      `;
    } else {
      return `
<div class="stream-header-meta">
  <span class="meta-tag">[STATUS: 200 OK]</span>
  <span class="meta-tag">[LATENCY: 1.2s]</span>
  <span class="meta-tag">[NODES: 5]</span>
</div>
<p class="stream-title"><strong>Topic:</strong> "${prompt}"</p>
<hr class="stream-divider">
<div class="stream-text">
Under the night sky of Johor Bahru, terminal displays at Taman Kobena flash with successful node compilation logs. This marks the deployment of Lim Wei Jian's 7th multi-agent workflow. Powered by n8n event triggers and RAG vector search, official documentation and code specs are retrieved in milliseconds. LLM agents orchestrate in parallel, transforming complex backend algorithms into clean, responsive user interfaces. Engineering rigor meets AI automation in a seamless demonstration of full-stack craftsmanship.
</div>
      `;
    }
  }

  async typewriter(container, htmlContent) {
    if (!container) return;
    container.innerHTML = htmlContent;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
