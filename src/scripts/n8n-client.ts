export interface N8nConfig {
  useRealWebhook: boolean;
  webhookUrl: string;
}

export const N8N_CONFIG: N8nConfig = {
  useRealWebhook: false, // Switch to true when your real n8n instance is live!
  webhookUrl: 'https://n8n.your-domain.com/webhook/story-generator'
};

export async function generateStoryWorkflow(
  prompt: string,
  onNodeActive: (nodeId: string) => void,
  onOutputChunk: (chunk: string) => void
): Promise<void> {
  if (N8N_CONFIG.useRealWebhook) {
    try {
      const response = await fetch(N8N_CONFIG.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await response.json();
      onNodeActive('n8n-node-4');
      onOutputChunk(data.story || JSON.stringify(data));
    } catch (err) {
      onOutputChunk(`\n[n8n Webhook Error]: ${err}`);
    }
    return;
  }

  // Simulated node execution sequence
  const nodes = ['n8n-node-1', 'n8n-node-2', 'n8n-node-3', 'n8n-node-4'];
  for (let i = 0; i < nodes.length; i++) {
    onNodeActive(nodes[i]);
    await new Promise(res => setTimeout(res, 500));
  }

  const storyText = `\n[Agent Story Engine Activated]\nPrompt: "${prompt}"\n\nOnce upon a time in the digital ether, a developer triggered a multi-agent n8n workflow. The AI agents orchestrated vector memory, parsed regulatory guidelines, and compiled an elegant solution in real-time.`;

  for (let i = 0; i < storyText.length; i++) {
    onOutputChunk(storyText.charAt(i));
    await new Promise(res => setTimeout(res, 20));
  }
}
