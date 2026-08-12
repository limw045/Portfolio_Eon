export type WorkspaceFile = {
  id: string;
  filename: string;
  shortFilename: string;
  icon: string;
  fileType: string;
  workspacePath: string;
  semanticAccent: 'emerald' | 'amber' | 'teal' | 'blue' | 'purple';
};

export const workspaceFiles: WorkspaceFile[] = [
  { id: 'hero', filename: '01_origin_story.md', shortFilename: 'origin.md', icon: '📝', fileType: 'Markdown', workspacePath: 'portfolio', semanticAccent: 'emerald' },
  { id: 'academic', filename: '02_academic_journey.json', shortFilename: 'academic.json', icon: '⚙️', fileType: 'JSON Schema', workspacePath: 'data', semanticAccent: 'amber' },
  { id: 'culture', filename: '03_culture_hub.config', shortFilename: 'culture.config', icon: '✨', fileType: 'Config Spec', workspacePath: 'config', semanticAccent: 'teal' },
  { id: 'skill-studio', filename: '04_skill_studio.cpp', shortFilename: 'skills.cpp', icon: '⚡', fileType: 'C++ 20', workspacePath: 'src', semanticAccent: 'blue' },
  { id: 'n8n-studio', filename: '05_n8n_workflow.py', shortFilename: 'workflow.py', icon: '🤖', fileType: 'Python / n8n', workspacePath: 'pipelines', semanticAccent: 'purple' },
  { id: 'micro-tools', filename: '06_micro_tools.css', shortFilename: 'tools.css', icon: '🛠️', fileType: 'CSS', workspacePath: 'styles', semanticAccent: 'emerald' },
];

export const contactDetails = {
  email: 'limw045@gmail.com',
  github: 'https://github.com/limw045',
  phoneDisplay: '010-666-1736',
  phoneHref: 'tel:0106661736',
} as const;
