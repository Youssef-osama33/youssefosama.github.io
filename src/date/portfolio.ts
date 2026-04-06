// ─── PROFILE ──────────────────────────────────────────────────────────────────
export const profile = {
  name: { first: "Yousef", last: "Osama" },
  roles: ["AI Engineer", "Open Source Builder", "Technical Writer"],
  location: "Cairo, Egypt",
  available: true,

  bio: `I'm a software engineer and AI practitioner based in Cairo — building tools at the
intersection of language, culture, and intelligence. I care especially about making
technology accessible in Arabic and for communities underserved by mainstream AI.`,

  bioArabic: `مهندس برمجيات وذكاء اصطناعي من القاهرة. أبني أدوات تجمع بين اللغة العربية
والتقنية الحديثة، وأكتب عن الذكاء الاصطناعي والبرمجة بأسلوب يخدم المطورين العرب.`,

  links: {
    github:   "https://github.com/youssefLabs",
    blog:     "https://apex4u.blogspot.com",
    linkedin: "https://linkedin.com/in/youssefosama",
    email:    "hi@youssefosama.dev",
    cv:       "/cv.pdf",
  },

  interests: ["AI / LLMs", "Arabic NLP", "Quran Tech", "Ed-Tech", "Open Source", "Web Dev"],
};

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
export type ProjectStatus = "live" | "wip" | "open-source";

export interface Project {
  id: string;
  title: string;
  titleAr: string;
  year: string;
  status: ProjectStatus;
  stack: string[];
  description: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "tibyan",
    title: "Tibyan — تبيان",
    titleAr: "تطبيق تحفيظ القرآن بالذكاء الاصطناعي",
    year: "2024–2025",
    status: "live",
    stack: ["Vite + PWA", "Dexie.js / IndexedDB", "Supabase", "Web Speech API", "SM-2 Algorithm"],
    description:
      "Offline-first Quran memorization PWA with Arabic speech recognition, custom spaced repetition engine (SM-2), gamification, and CRDT-inspired sync. ~7,300 lines of production code across 28 files — built on Android using GitHub Codespaces.",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: "promptiq",
    title: "PromptIQ",
    titleAr: "أداة إدارة الـ Prompts محلياً",
    year: "2025",
    status: "open-source",
    stack: ["Python CLI", "Gemini API", "Semver", "GitHub Actions"],
    description:
      "Local-first CLI for LLM prompt management. Features a 4-stage judge engine, A/B testing, semantic versioning, and multilingual READMEs in 12 languages. Rebranded from promptvc to v1.0.0.",
    githubUrl: "#",
    featured: true,
  },
  {
    id: "memar",
    title: "Memar AI — معمار",
    titleAr: "منصة عربية للمطورين والذكاء الاصطناعي",
    year: "2025",
    status: "wip",
    stack: ["Arabic-first", "AI Hub", "MENA Region"],
    description:
      "An Arabic-language developer hub focused on AI tooling, tutorials, and community for the MENA region. Tied to the Apex4U brand and Arab Developers Hub initiative.",
    featured: true,
  },
  {
    id: "cpp-curriculum",
    title: "Arabic C++ Curriculum",
    titleAr: "منهج C++ ثنائي اللغة",
    year: "2024",
    status: "open-source",
    stack: ["C++", "Bilingual AR/EN", "Teaching"],
    description:
      "Structured bilingual Arabic/English C++ learning repository with lesson files, commented examples, exercises, projects, and per-unit READMEs — designed as a community teaching resource.",
    githubUrl: "#",
  },
  {
    id: "linkedin-bot",
    title: "LinkedIn Post Automation",
    titleAr: "نظام نشر LinkedIn تلقائي",
    year: "2024",
    status: "open-source",
    stack: ["Python", "Playwright", "Gemini API", "SQLite", "Pydroid3"],
    description:
      "AI-powered LinkedIn automation targeting Arabic developer audiences in MENA. Built with Playwright and Gemini API entirely on Android (Pydroid3 environment).",
    githubUrl: "#",
  },
];

// ─── WRITING ──────────────────────────────────────────────────────────────────
export type ArticleLang = "ar" | "en";
export type ArticleTag = "AI" | "Dev" | "Freelance" | "Tools" | "Arabic";

export interface Article {
  id: string;
  title: string;
  titleAr?: string;
  date: string;
  lang: ArticleLang;
  platform: string;
  tags: ArticleTag[];
  url: string;
}

export const articles: Article[] = [
  {
    id: "a1",
    title: "الفرق الحقيقي بين ChatGPT وClaude للمطورين",
    date: "Jan 2025",
    lang: "ar",
    platform: "Apex4U",
    tags: ["AI", "Tools"],
    url: "#",
  },
  {
    id: "a2",
    title: "RAG من الصفر للإنتاج — دليل المطور العربي",
    date: "Dec 2024",
    lang: "ar",
    platform: "Apex4U",
    tags: ["AI", "Dev"],
    url: "#",
  },
  {
    id: "a3",
    title: "كورس AI Agents للمطورين العرب",
    date: "Nov 2024",
    lang: "ar",
    platform: "Apex4U",
    tags: ["AI", "Dev"],
    url: "#",
  },
  {
    id: "a4",
    title: "Building a Quran Memorization Engine with SM-2",
    date: "Oct 2024",
    lang: "en",
    platform: "Dev.to",
    tags: ["Dev", "Arabic"],
    url: "#",
  },
  {
    id: "a5",
    title: "الفريلانس للمطور العربي — الدليل الحقيقي",
    date: "Sep 2024",
    lang: "ar",
    platform: "Apex4U",
    tags: ["Freelance"],
    url: "#",
  },
  {
    id: "a6",
    title: "أدوات الذكاء الاصطناعي لعام 2025",
    date: "Aug 2024",
    lang: "ar",
    platform: "Apex4U",
    tags: ["AI", "Tools"],
    url: "#",
  },
  {
    id: "a7",
    title: "Why I Build Arabic-First Developer Tools",
    date: "Jul 2024",
    lang: "en",
    platform: "Dev.to",
    tags: ["Arabic", "Dev"],
    url: "#",
  },
];

// ─── TIMELINE ─────────────────────────────────────────────────────────────────
export const timeline = [
  { year: "2025", title: "Founded Memar AI — معمار", sub: "Arabic AI developer platform for MENA" },
  { year: "2025", title: "Released PromptIQ v1.0", sub: "Open source LLM prompt manager, PyPI" },
  { year: "2024", title: "Built Tibyan — تبيان", sub: "AI Quran memorization PWA, production" },
  { year: "2024", title: "Founded Apex4U", sub: "Technical blog in Arabic & English" },
  { year: "2024", title: "youssefLabs on GitHub", sub: "Open source org for Arabic dev tools" },
  { year: "2023", title: "Arabic C++ Curriculum", sub: "Bilingual teaching repository" },
];

// ─── SKILLS ───────────────────────────────────────────────────────────────────
export const skills = [
  { name: "Python / AI Engineering",      level: "Strong"    },
  { name: "React / Vite / PWA",           level: "Strong"    },
  { name: "Arabic NLP & Speech",          level: "Strong"    },
  { name: "Technical Writing (AR + EN)",  level: "Strong"    },
  { name: "LLM Prompt Engineering",       level: "Advanced"  },
  { name: "Supabase / IndexedDB / Sync",  level: "Advanced"  },
  { name: "Playwright / Automation",      level: "Advanced"  },
  { name: "C++ / Systems",               level: "Intermediate" },
];

// ─── STATS ────────────────────────────────────────────────────────────────────
export const stats = [
  { value: "5+",   label: "Projects shipped"   },
  { value: "12",   label: "README languages"   },
  { value: "7k+",  label: "Lines in Tibyan"    },
  { value: "AR/EN", label: "Writing languages" },
];
