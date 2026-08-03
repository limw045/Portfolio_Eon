/**
 * i18n.js - Pure English & Pure Chinese Translation Engine
 * Guarantees 100% strict language separation (zero language mixing in EN mode).
 */

export class I18nEngine {
  constructor() {
    this.currentLang = localStorage.getItem('weijian_portfolio_lang') || 'en';
    
    this.translations = {
      zh: {
        nav_story: "起源故事",
        nav_academic: "读书生涯",
        nav_culture: "精神角落",
        nav_skills: "技能实验室",
        nav_tools: "炫技工具",
        theme_label: "主题:",
        menu_matrix_header: "🟢 MATRIX 矩阵控制",
        menu_matrix_toggle: "🟢 切换 Matrix 代码雨 <span class=\"shortcut\">Ctrl+Alt+M</span>",

        hero_badge: "MMU 人工智能专业大四生 | CGPA 3.74",
        hero_title: "探索代码与 AI 的<br><span class=\"gradient-text\">无限可能</span>",
        hero_desc: "我是 <strong>林伟健 (Lim Wei Jian)</strong>，一名专注于 Multi-Agent 多智能体架构、RAG 检索增强生成与全栈开发的 AI 学士生。我立志用严谨的工程思维与高效代码构建解决现实痛点的智能化软件。",
        btn_exp_skills: "体验技能实验室 🚀",
        btn_try_n8n: "尝试 AI 工作流 🤖",
        hero_quote: "“从代码逻辑到 AI 创新 — 代码是画笔，逻辑是画布。”",

        section_acad_title: "🎓 读书生涯与项目求索",
        section_acad_subtitle: "从 SPM 理工启蒙，到 Diploma 独立全栈队长，再到 Degree AI 课题的前沿突破",
        acad_degree_title: "人工智能学士 (Artificial Intelligence)",
        acad_degree_loc: "多媒体大学 (MMU 马六甲校区) — CGPA: 3.74",
        acad_degree_desc: "深耕 Generative AI、Multi-Agent 多智能体协同系统、RAG 检索增强生成与计算机视觉 (YOLO/ResNet)。",
        acad_fyp_title: "🔥 毕业设计：JKR 交通影响评估 (TIA) 自动化生成系统",
        acad_fyp_desc: "采用 Multi-Agent 架构解构报告编写任务，结合 RAG 检索马来西亚 JKR 官方规范，消除幻觉并提效超 70%！",

        acad_diploma_title: "信息技术大专 (Diploma in IT)",
        acad_diploma_loc: "多媒体大学 (MMU 马六甲校区) — CGPA: 3.78",
        acad_diploma_desc: "掌握软件工程、数据结构算法与全栈 Web 开发，多次担任团队 Leader 带领组员攻克项目。",
        acad_dip_fyp_title: "💡 大专毕设：AI Toolbox 在线平台",
        acad_dip_fyp_desc: "设计并搭建具备订阅制的多功能 AI 工具箱（含 AI 翻译、聊天框、文本重写与 Text-to-Image）。担任 Team Leader，精通 HTML/CSS/JS/PHP/MySQL。",

        acad_spm_title: "马来西亚教育文凭 (SPM)",
        acad_spm_loc: "SMK Dato Abdul Rahman Yassin, 新山",
        acad_spm_desc: "成绩优异（1 A+, 1 A, 1 A-），在校期间积极参与组织活动，培养了扎实的理科逻辑与团队领导力。",

        section_cult_title: "✨ 精神角落与文化品味",
        section_cult_subtitle: "代码之外的灵感源泉：绿茵狂热、律动 Groove、硬核科幻与战术竞技",
        cult_football_title: "足球主队 (Football Clubs)",
        cult_football_desc: "热衷于战术切磋、快速传控与赛场上的极致执行力，正如撰写优雅高效率的代码。",
        cult_music_title: "音乐律动 (R&B & Soul)",
        cult_music_desc: "偏爱富有律动感的华语 R&B、Soul 与 Funk 音乐，细腻的和声与复古 Groove 是写代码时的最佳伴侣。",
        cult_novel_title: "小说与思想 (Novels & Philosophy)",
        cult_media_title: "游戏与电影 (Games & Cinema)",

        section_ide_title: "💻 IT 技能实验室 & Web IDE",
        section_ide_subtitle: "切身演示 C++, C#, Java, Python 代码逻辑与控制台运行输出",
        btn_run_code: "▶ 运行代码 (Run Code)",
        console_header: "Terminal Output",
        console_ready: "> 就绪。点击上方 \"Run Code\" 运行模拟控制台...",

        section_n8n_title: "🤖 n8n AI 故事交互流程图",
        section_n8n_subtitle: "输入一段想法，观察多智能体工作流节点如何将其转化为一段精彩故事",
        n8n_placeholder: "输入故事提示（如：程序员在深夜发现了一个秘密 AI 节点...）",
        btn_gen_workflow: "生成故事工作流 ⚡",
        n8n_stream_header: "Generated Output Stream",
        n8n_stream_ready: "点击上方按钮，体验 n8n 节点实时调度与打字机输出效果...",

        section_tools_title: "🛠️ 炫技微工具区 (Micro-Tools)",
        section_tools_subtitle: "可实时互动的轻量小工具 & 扩展插槽",
        tool_tweaker_title: "🎨 Live CSS Variable Tweaker",
        tool_tweaker_desc: "拖动滑块实时调节本站的圆角、玻璃模糊度与光晕强弱，并导出 CSS 代码！",
        label_blur: "Glass Blur (玻璃模糊度):",
        label_radius: "Border Radius (圆角大小):",
        label_glow: "Glow Intensity (光晕强度):",
        btn_export_css: "导出 CSS 变量代码 📋",
        slot_badge: "扩展插槽",
        slot_title: "🔧 微工具插槽 #2",
        slot_desc: "预留插槽：后续挂载算法可视化器或新 Web 小工具！",

        footer_title: "准备好一起构建下一个精彩项目了吗？",
        footer_subtitle: "目前开放寻求 AI 工程、Multi-Agent RAG 与全栈开发方向机会。",
        copyright: "© 2026 林伟健 (Lim Wei Jian). 纯 HTML/CSS/JS 构建。支持 Cloudflare Pages."
      },
      en: {
        nav_story: "Origin Story",
        nav_academic: "Academic Journey",
        nav_culture: "Cultural Hub",
        nav_skills: "Skill Studio",
        nav_tools: "Micro-Tools",
        theme_label: "Theme:",
        menu_matrix_header: "🟢 MATRIX CONTROL",
        menu_matrix_toggle: "🟢 Toggle Matrix Rain <span class=\"shortcut\">Ctrl+Alt+M</span>",

        hero_badge: "Final Year AI Student @ MMU | CGPA 3.74",
        hero_title: "Exploring Infinite<br>Possibilities of <span class=\"gradient-text\">Code & AI</span>",
        hero_desc: "I'm <strong>Lim Wei Jian</strong>, a Senior AI Student specializing in Multi-Agent RAG Architectures, Computer Vision, and Full-Stack Systems. I craft high-performance, elegant software tools to solve complex real-world challenges.",
        btn_exp_skills: "Explore Skill Studio 🚀",
        btn_try_n8n: "Try AI Workflow 🤖",
        hero_quote: "\"From code logic to AI innovation — Code is the brush, Logic is the canvas.\"",

        section_acad_title: "🎓 Academic Journey & Project Research",
        section_acad_subtitle: "From STEM foundation to Diploma Full-Stack Team Lead and Degree AI breakthroughs",
        acad_degree_title: "B.S. Artificial Intelligence",
        acad_degree_loc: "Multimedia University (Melaka Campus) — CGPA: 3.74",
        acad_degree_desc: "Specialized in Generative AI, Multi-Agent Orchestration, RAG Frameworks, and Computer Vision (YOLO/ResNet).",
        acad_fyp_title: "🔥 FYP Project: JKR-Compliant TIA Automated Generator",
        acad_fyp_desc: "Architected a Multi-Agent framework with RAG grounding on official JKR regulatory guidelines, boosting efficiency by over 70%!",

        acad_diploma_title: "Diploma in Information Technology",
        acad_diploma_loc: "Multimedia University (Melaka Campus) — CGPA: 3.78",
        acad_diploma_desc: "Mastered software engineering principles, algorithms, and full-stack web development as Team Lead.",
        acad_dip_fyp_title: "💡 Diploma Project: AI Toolbox SaaS Platform",
        acad_dip_fyp_desc: "Built a subscription-based AI platform featuring Translator, Chatbot, Text Rewriter, and Text-to-Image tools (HTML/CSS/JS/PHP/MySQL).",

        acad_spm_title: "Sijil Pelajaran Malaysia (SPM)",
        acad_spm_loc: "SMK Dato Abdul Rahman Yassin, Johor Bahru",
        acad_spm_desc: "Graduated with honors (1 A+, 1 A, 1 A-), building strong analytical logic and team leadership.",

        section_cult_title: "✨ Cultural Tastes & Inspirations",
        section_cult_subtitle: "Inspirations beyond code: Football tactics, R&B Groove, Sci-Fi, and competitive gaming",
        cult_football_title: "Football Pitch (Favorite Clubs)",
        cult_football_desc: "Passionate about tactical precision, fluid passing, and execution excellence on the pitch — just like writing high-performance code.",
        cult_music_title: "Music Groove (R&B & Soul)",
        cult_music_desc: "Enthusiast of R&B, Soul, and Funk music by Khalil Fong, David Tao, and Bruno Mars. Rich harmonies drive coding focus.",
        cult_novel_title: "Novels & Philosophy",
        cult_media_title: "Games & Cinema",

        section_ide_title: "💻 IT Skill Studio & Web IDE",
        section_ide_subtitle: "Live demonstration of C++, C#, Java, Python logic with terminal console execution",
        btn_run_code: "▶ Run Code",
        console_header: "Terminal Output",
        console_ready: "> Ready for execution. Click \"Run Code\" above...",

        section_n8n_title: "🤖 n8n AI Story Workflow Simulator",
        section_n8n_subtitle: "Enter a prompt and watch multi-agent nodes transform it into a narrative",
        n8n_placeholder: "Enter story prompt (e.g. A developer discovers a hidden AI node late at night...)",
        btn_gen_workflow: "Generate Story Workflow ⚡",
        n8n_stream_header: "Generated Output Stream",
        n8n_stream_ready: "Click button above to experience live node streaming output...",

        section_tools_title: "🛠️ Micro-Tools Playground",
        section_tools_subtitle: "Interactive micro-tools and extensible slots",
        tool_tweaker_title: "🎨 Live CSS Variable Tweaker",
        tool_tweaker_desc: "Adjust glass blur, border radius, and glow intensity live, then export clean CSS!",
        label_blur: "Glass Blur:",
        label_radius: "Border Radius:",
        label_glow: "Glow Intensity:",
        btn_export_css: "Export CSS Variables 📋",
        slot_badge: "Extensible Slot",
        slot_title: "🔧 Micro-Tool Slot #2",
        slot_desc: "Reserved Slot: Ready for future algorithm visualizers or new web tools!",

        footer_title: "Ready to Build Something Extraordinary Together?",
        footer_subtitle: "Currently open for AI Engineering, Multi-Agent RAG, and Full-Stack Development opportunities.",
        copyright: "© 2026 Lim Wei Jian. Pure HTML/CSS/JS. Deployable on Cloudflare Pages."
      }
    };

    this.init();
  }

  init() {
    this.applyLang(this.currentLang);

    const btn = document.getElementById('lang-toggle');
    const btnIde = document.getElementById('lang-toggle-ide');
    
    const toggleHandler = () => {
      this.currentLang = this.currentLang === 'zh' ? 'en' : 'zh';
      localStorage.setItem('weijian_portfolio_lang', this.currentLang);
      this.applyLang(this.currentLang);
      if (btn) this.updateLangUI(btn);
      if (btnIde) this.updateLangUI(btnIde);
    };

    if (btn) {
      this.updateLangUI(btn);
      btn.addEventListener('click', toggleHandler);
    }
    if (btnIde) {
      this.updateLangUI(btnIde);
      btnIde.addEventListener('click', toggleHandler);
    }
  }

  updateLangUI(btnEl) {
    btnEl.textContent = this.currentLang === 'zh' ? '🌐 English' : '🌐 中文';
  }

  applyLang(lang) {
    const dict = this.translations[lang] || this.translations.en;
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

    // Replace text content for data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    // Replace placeholder for data-i18n-placeholder
    const inputs = document.querySelectorAll('[data-i18n-placeholder]');
    inputs.forEach(input => {
      const key = input.getAttribute('data-i18n-placeholder');
      if (dict[key]) {
        input.placeholder = dict[key];
      }
    });

    // Update dynamic team/artist tags for pure language separation
    this.updateCultureTags(lang);
  }

  updateCultureTags(lang) {
    const isZh = lang === 'zh';

    // Football tags
    const bvbTag = document.querySelector('.team-tag.bvb');
    const arsenalTag = document.querySelector('.team-tag.arsenal');
    const mancityTag = document.querySelector('.team-tag.mancity');

    if (bvbTag) bvbTag.textContent = isZh ? "多特蒙德 BVB (黄黑狂热)" : "Borussia Dortmund (BVB)";
    if (arsenalTag) arsenalTag.textContent = isZh ? "阿森纳 Gunners (美丽传控)" : "Arsenal (Gunners)";
    if (mancityTag) mancityTag.textContent = isZh ? "曼城 Man City (极致战术)" : "Manchester City";

    // Music pills
    const artistPills = document.querySelectorAll('.artist-pill');
    if (artistPills.length >= 3) {
      artistPills[0].textContent = isZh ? "方大同 (Khalil Fong)" : "Khalil Fong";
      artistPills[1].textContent = isZh ? "陶喆 (David Tao)" : "David Tao";
      artistPills[2].textContent = "Bruno Mars";
    }

    // Novel items
    const novelList = document.querySelector('.novel-style ul');
    if (novelList) {
      novelList.innerHTML = isZh ? `
        <li><strong>《刀剑神域》</strong> — 虚拟世界与 AI 启蒙</li>
        <li><strong>《诡秘之主》</strong> — 严密庞大的逻辑架构</li>
        <li><strong>《三体》</strong> — 宇宙社会学与高维探索</li>
      ` : `
        <li><strong>Sword Art Online</strong> — Virtual World & AI Inspiration</li>
        <li><strong>Lord of the Mysteries</strong> — Complex Worldbuilding & Logic</li>
        <li><strong>The Three-Body Problem</strong> — Hard Sci-Fi & Cosmic Sociology</li>
      `;
    }
  }
}
