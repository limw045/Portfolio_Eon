/**
 * i18n.js - Full Bilingual (English / Chinese) Language Switcher Engine
 * Seamlessly switches all site texts, Web IDE comments, n8n story generator, and labels.
 */

export class I18nEngine {
  constructor() {
    this.currentLang = localStorage.getItem('weijian_portfolio_lang') || 'zh';
    
    this.dictionary = {
      zh: {
        // Navigation & Bar
        nav_story: "起源故事",
        nav_academic: "读书生涯",
        nav_culture: "精神角落",
        nav_skills: "技能实验室",
        nav_tools: "炫技工具",
        theme_label: "主题:",

        // Hero
        hero_badge: "Final Year AI Student @ MMU | CGPA 3.74",
        hero_title: "探索代码与 AI 的<br><span class=\"gradient-text\">无限可能</span>",
        hero_desc: "我是<strong>林伟健 (Lim Wei Jian)</strong>，一名来自柔佛新山 (Johor Bahru) 的 AI 学士生。从早期被《刀剑神域》中虚拟与现实的交织所吸引，到如今深耕 Multi-Agent 多智能体架构与全栈开发，我立志用逻辑与代码构建改变现实的轻量高效工具。",
        btn_exp_skills: "体验技能实验室 🚀",
        btn_try_n8n: "尝试 AI 工作流 🤖",
        hero_quote: "“从新山 Taman Kobena 到 AI 前沿 — 代码是画笔，逻辑是画布。”",

        // Academic Timeline
        section_acad_title: "🎓 读书生涯与项目求索",
        section_acad_subtitle: "从 SPM 理工启蒙，到 Diploma 独立全栈全能队长，再到 Degree AI 课题的前沿突破",
        acad_degree_title: "Artificial Intelligence (B.S. Degree)",
        acad_degree_loc: "Multimedia University (Melaka Campus) — CGPA: 3.74",
        acad_degree_desc: "专注于 Generative AI, Multi-Agent 多智能体协同, RAG 检索增强生成与 Computer Vision (YOLO/ResNet)。",
        acad_fyp_title: "🔥 毕业设计项目：JKR 交通影响评估 (TIA) 自动化生成系统",
        acad_fyp_desc: "基于 Multi-Agent 架构解构专门任务，结合 RAG 检索官方 JKR 规范文件，消除大模型幻觉，使提效超 70%！",
        
        acad_diploma_title: "Diploma in Information Technology",
        acad_diploma_loc: "Multimedia University (Melaka Campus) — CGPA: 3.78",
        acad_diploma_desc: "掌握软件工程基础、算法结构与全栈 Web 开发，多次担任团队 Leader 带领组员攻克项目。",
        acad_dip_fyp_title: "💡 大专毕业项目：AI Toolbox 在线平台",
        acad_dip_fyp_desc: "设计并搭建具备订阅制的多功能 AI 工具箱（含 AI 翻译、AI 聊天框、文本重写与 Text-to-Image）。担任 Team Leader，精通 HTML/CSS/JS/PHP/MySQL。",

        acad_spm_title: "Sijil Pelajaran Malaysia (SPM)",
        acad_spm_loc: "SMK Dato Abdul Rahman Yassin, Johor Bahru",
        acad_spm_desc: "成绩优异（1 A+, 1 A, 1 A-），在校期间积极参与组织活动，培养了扎实的理科逻辑与良好的团队协调领导力。",

        // Culture
        section_cult_title: "✨ 精神角落与文化品味",
        section_cult_subtitle: "代码之外的灵感源泉：绿茵狂热、律动 Groove、硬核科幻与战术竞技",
        cult_football_title: "足球主队 (Football Pitch)",
        cult_football_desc: "热衷于战术切磋、快速传控与赛场上的极致执行力，正如撰写优雅高效率的代码。",
        cult_music_title: "音乐 Groove (R&B & Soul)",
        cult_music_desc: "偏爱富有律动感的华语 R&B、 Soul 与 Funk 音乐，细腻的和声与复古 Groove 是写代码时的最佳伴侣。",
        cult_novel_title: "小说与思想 (Novels)",
        cult_media_title: "游戏与电影 (Games & Movies)",

        // Web IDE
        section_ide_title: "💻 IT 技能实验室 & Web IDE",
        section_ide_subtitle: "切身演示 C++, C#, Java, Python 代码逻辑与控制台运行输出",
        btn_run_code: "▶ 运行代码 (Run Code)",
        console_header: "Terminal Output",
        console_ready: "> 就绪。点击上方 \"Run Code\" 运行模拟控制台...",

        // n8n Simulator
        section_n8n_title: "🤖 n8n AI 故事交互流程图",
        section_n8n_subtitle: "输入一段想法，观察多智能体工作流节点如何将其转化为一段精彩故事",
        n8n_placeholder: "输入故事提示（如：新山的小镇程序员在深夜发现了一个秘密 AI 节点...）",
        btn_gen_workflow: "生成故事工作流 ⚡",
        n8n_stream_header: "Generated Output Stream",
        n8n_stream_ready: "点击上方按钮，体验 n8n 节点实时调度与打字机输出效果...",

        // Micro Tools
        section_tools_title: "🛠️ 炫技微工具区 (Micro-Tools)",
        section_tools_subtitle: "可实时互动的轻量小工具 & 扩展插槽",
        tool_tweaker_title: "🎨 Live CSS Variable Tweaker",
        tool_tweaker_desc: "拖动滑块实时调节本站的圆角、玻璃模糊度与光晕强弱，并导出 CSS 代码！",
        label_blur: "Glass Blur (玻璃模糊度):",
        label_radius: "Border Radius (圆角大小):",
        label_glow: "Glow Intensity (光晕强度):",
        btn_export_css: "导出 CSS 变量代码 📋",
        btn_copied: "已复制 CSS 到剪贴板! ✅",
        slot_badge: "Extensible Slot",
        slot_title: "🔧 Micro-Tool Slot #2",
        slot_desc: "预留插槽：后续挂载你的算法可视化器或新 Web 小工具！",

        // Footer
        footer_title: "准备好一起构建下一个精彩项目了吗？",
        footer_subtitle: "目前开放寻求 AI 工程、Multi-Agent RAG 与全栈开发方向机会。",
        copyright: "© 2026 Lim Wei Jian (林伟健). Pure HTML/CSS/JS. Ready for Cloudflare Pages."
      },
      en: {
        // Navigation & Bar
        nav_story: "Origin Story",
        nav_academic: "Academic Journey",
        nav_culture: "Cultural Hub",
        nav_skills: "Skill Studio",
        nav_tools: "Micro-Tools",
        theme_label: "Theme:",

        // Hero
        hero_badge: "Final Year AI Student @ MMU | CGPA 3.74",
        hero_title: "Exploring Infinite Possibilities of<br><span class=\"gradient-text\">Code & Artificial Intelligence</span>",
        hero_desc: "I'm <strong>Lim Wei Jian (林伟健)</strong>, a Senior AI student hailing from Johor Bahru, Malaysia. From early inspiration by <em>Sword Art Online</em>'s virtual world to architecting Multi-Agent RAG frameworks and full-stack solutions, I build high-performance, elegant software tools to solve real-world challenges.",
        btn_exp_skills: "Explore Skill Studio 🚀",
        btn_try_n8n: "Try AI Workflow 🤖",
        hero_quote: "\"From Taman Kobena to AI Innovation — Code is the brush, Logic is the canvas.\"",

        // Academic Timeline
        section_acad_title: "🎓 Academic Journey & Projects",
        section_acad_subtitle: "From SPM STEM foundation, to Diploma Full-Stack Team Leader, to Degree AI Research Breakthroughs",
        acad_degree_title: "Artificial Intelligence (B.S. Degree)",
        acad_degree_loc: "Multimedia University (Melaka Campus) — CGPA: 3.74",
        acad_degree_desc: "Specialized in Generative AI, Multi-Agent Orchestration, RAG Frameworks, and Computer Vision (YOLO/ResNet).",
        acad_fyp_title: "🔥 FYP Project: JKR-Compliant Traffic Impact Assessment (TIA) Automated Generator",
        acad_fyp_desc: "Architected a Multi-Agent system to decompose report drafting tasks, grounding LLM outputs with RAG on official JKR regulatory documents to eliminate hallucinations & boost efficiency by 70%!",
        
        acad_diploma_title: "Diploma in Information Technology",
        acad_diploma_loc: "Multimedia University (Melaka Campus) — CGPA: 3.78",
        acad_diploma_desc: "Mastered software engineering fundamentals, algorithms, and full-stack web development as Team Leader.",
        acad_dip_fyp_title: "💡 Diploma Project: AI Toolbox Online Platform",
        acad_dip_fyp_desc: "Designed & deployed a subscription-based multi-functional AI SaaS platform featuring AI Translator, Chatbot, Text Rewriter, and Text-to-Image tools (HTML/CSS/JS/PHP/MySQL).",

        acad_spm_title: "Sijil Pelajaran Malaysia (SPM)",
        acad_spm_loc: "SMK Dato Abdul Rahman Yassin, Johor Bahru",
        acad_spm_desc: "Achieved top academic results (1 A+, 1 A, 1 A-), leading campus extracurricular activities with strong analytical and coordination skills.",

        // Culture
        section_cult_title: "✨ Cultural Tastes & Mental Corner",
        section_cult_subtitle: "Sources of inspiration beyond code: Pitch passion, R&B Groove, Hard Sci-Fi, and Competitive Tactics",
        cult_football_title: "Football Pitch (Favorite Clubs)",
        cult_football_desc: "Passionate about tactical precision, fluid passing, and execution excellence on the pitch — just like writing high-performance code.",
        cult_music_title: "Music Groove (R&B & Soul)",
        cult_music_desc: "Enthusiast of R&B, Soul, and Funk music by Khalil Fong, David Tao, and Bruno Mars. Rich harmonies and vintage groove drive coding focus.",
        cult_novel_title: "Novels & Philosophy",
        cult_media_title: "Games & Cinema",

        // Web IDE
        section_ide_title: "💻 IT Skill Studio & Web IDE",
        section_ide_subtitle: "Live demonstration of C++, C#, Java, Python logic with terminal console execution",
        btn_run_code: "▶ Run Code",
        console_header: "Terminal Output",
        console_ready: "> System Ready. Click 'Run Code' above to execute pipeline...",

        // n8n Simulator
        section_n8n_title: "🤖 n8n AI Workflow Story Simulator",
        section_n8n_subtitle: "Input a prompt fragment and watch the Multi-Agent nodes transform it into a story stream",
        n8n_placeholder: "Enter a prompt (e.g. A programmer in Johor Bahru stumbles upon a secret AI node...)",
        btn_gen_workflow: "Generate Story Workflow ⚡",
        n8n_stream_header: "Generated Output Stream",
        n8n_stream_ready: "Click the button above to experience n8n node execution & live typewriter output...",

        // Micro Tools
        section_tools_title: "🛠️ Micro-Tools Playground",
        section_tools_subtitle: "Interactive lightweight utilities & extensible plugin slots",
        tool_tweaker_title: "🎨 Live CSS Variable Tweaker",
        tool_tweaker_desc: "Drag sliders to dynamically adjust site blur, border radius, and glow intensity live, then export clean CSS!",
        label_blur: "Glass Blur:",
        label_radius: "Border Radius:",
        label_glow: "Glow Intensity:",
        btn_export_css: "Export CSS Variables 📋",
        btn_copied: "CSS Copied to Clipboard! ✅",
        slot_badge: "Extensible Slot",
        slot_title: "🔧 Micro-Tool Slot #2",
        slot_desc: "Reserved Slot: Ready for future algorithm visualizers or new web tools!",

        // Footer
        footer_title: "Ready to Build Something Extraordinary Together?",
        footer_subtitle: "Currently open for AI Engineering, Multi-Agent RAG, and Full-Stack Development opportunities.",
        copyright: "© 2026 Lim Wei Jian (林伟健). Pure HTML/CSS/JS. Ready for Cloudflare Pages."
      }
    };

    this.init();
  }

  init() {
    this.applyLang(this.currentLang);

    // Bind language toggle button in navbar
    const btn = document.getElementById('lang-toggle');
    const btnIde = document.getElementById('lang-toggle-ide');
    
    const toggleHandler = () => {
      this.currentLang = this.currentLang === 'zh' ? 'en' : 'zh';
      localStorage.setItem('weijian_portfolio_lang', this.currentLang);
      this.applyLang(this.currentLang);
      if (btn) this.updateLangUI(btn);
    };

    if (btn) {
      this.updateLangUI(btn);
      btn.addEventListener('click', toggleHandler);
    }
    if (btnIde) {
      btnIde.addEventListener('click', toggleHandler);
    }
  }

  updateLangUI(btn) {
    btn.textContent = this.currentLang === 'zh' ? '🌐 EN' : '🌐 中文';
    btn.title = this.currentLang === 'zh' ? 'Switch to English' : '切换至中文';
  }

  applyLang(lang) {
    const dict = this.dictionary[lang] || this.dictionary['zh'];

    // Map data-i18n attributes
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    // Map placeholder attributes
    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) {
        el.placeholder = dict[key];
      }
    });

    document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');
  }
}
