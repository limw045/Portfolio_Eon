export type ThemeName = 'ide' | 'cinema' | 'football' | 'swiss' | 'travel';
export type StageName = 'ide' | 'cinema';
export type SectionKey = 'hero' | 'academic' | 'culture' | 'skills' | 'workflow' | 'tools';

export const sectionLinks: Array<{ key: SectionKey; label: string; ideId: string; cinemaId: string }> = [
  { key: 'hero', label: 'Origin', ideId: 'hero', cinemaId: 'cinema-hero' },
  { key: 'academic', label: 'Education', ideId: 'academic', cinemaId: 'cinema-academic' },
  { key: 'culture', label: 'Culture', ideId: 'culture', cinemaId: 'cinema-culture' },
  { key: 'skills', label: 'Skills', ideId: 'skill-studio', cinemaId: 'cinema-skills' },
  { key: 'workflow', label: 'Workflow', ideId: 'n8n-studio', cinemaId: 'cinema-workflow' },
  { key: 'tools', label: 'Tools', ideId: 'micro-tools', cinemaId: 'cinema-tools' },
];

export const skills = {
  'AI & Vision': ['PyTorch', 'YOLOv8', 'OpenCV', 'Multi-Agent RAG'],
  'Core Languages': ['C++', 'Python', 'TypeScript', 'Java', 'C#'],
  'Web & Infrastructure': ['Astro', 'React', 'Tailwind CSS', 'MySQL', 'Cloudflare'],
} as const;

export const codeScenes = {
  cpp: {
    label: 'C++ 20',
    filename: 'parallel_matrix.cpp',
    source: `#include <iostream>\n#include <thread>\n\nclass ParallelMatrixEngine {\npublic:\n  void run(int scene) {\n    std::cout << "Scene " << scene << " projected.";\n  }\n};`,
    output: '[C++20 / Scene 01] Parallel matrix kernel projected.\nProcess finished with exit code 0 (12ms)',
  },
  python: {
    label: 'Python',
    filename: 'vision_pipeline.py',
    source: `import torch\nfrom ultralytics import YOLO\n\nclass VisionPipeline:\n  def __init__(self):\n    self.device = "cuda" if torch.cuda.is_available() else "cpu"\n\n  def detect(self, frame):\n    return YOLO("yolov8n.pt")(frame)`,
    output: '[Python / Scene 02] Vision pipeline active on cuda:0.\nYOLOv8 inference sequence completed (18ms)',
  },
  java: {
    label: 'Java',
    filename: 'SystemDirector.java',
    source: `public class SystemDirector {\n  public static void main(String[] args) {\n    System.out.println("Cueing service sequence...");\n  }\n}`,
    output: '[Java / Scene 03] Spring service sequence ready.\nBuild completed with 0 warnings.',
  },
  cs: {
    label: 'C#',
    filename: 'AsyncSequence.cs',
    source: `using System.Threading.Tasks;\n\nclass Sequence {\n  static async Task Main() {\n    await Task.Delay(100);\n    System.Console.WriteLine("Final cue ready.");\n  }\n}`,
    output: '[.NET / Scene 04] Async sequence initialized.\nBuild succeeded with 0 errors.',
  },
} as const;

export type CodeLanguage = keyof typeof codeScenes;

export const soundtrack = [
  { artist: 'Khalil Fong', track: 'Love Song', video: 'Gz8LzN6BwA8' },
  { artist: 'David Tao', track: 'Regular Friends', video: 'XQ9_08p3F2Q' },
  { artist: 'Bruno Mars', track: '24K Magic', video: 'UqyT8IEBkvY' },
] as const;

