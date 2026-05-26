import {
  Code2,
  Globe,
  Database,
  Brain,
  GraduationCap,
  BookOpen,
} from "lucide-react";

// ===== TYPES =====
export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
  tech: string[];
}

export interface Project {
  title: string;
  description: string;
  features: string[];
  tech: string[];
  image?: string;
  gradient: string;
  link?: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  details: string[];
  icon: typeof Code2;
}

export interface SkillCategory {
  name: string;
  icon: typeof Code2;
  skills: string[];
}

export interface Achievement {
  title: string;
  type: "certification" | "competition";
}

// ===== NAVIGATION =====
export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

// ===== EXPERIENCES =====
export const experiences: Experience[] = [
  {
    company: "Akar Inti Teknologi",
    role: "Software Engineer Intern",
    period: "Nov 2025 – May 2026",
    location: "Jakarta, Indonesia",
    highlights: [
      "Developed backend ERP modules using Spring Boot & PostgreSQL",
      "Designed secure authentication with Redis session management",
      "Refactored legacy code using SOLID principles",
      "Collaborated with frontend & infrastructure teams",
      "Worked on scalable and maintainable systems",
    ],
    tech: ["Spring Boot", "PostgreSQL", "Redis", "Java", "Docker"],
  },
  {
    company: "Universitas Pendidikan Indonesia",
    role: "Research Assistant",
    period: "May 2025 – Dec 2025",
    location: "Bandung, Indonesia",
    highlights: [
      'Built AI-powered TOEFL platform "Toeflify"',
      "Developed responsive Next.js frontend",
      "Integrated Generative AI APIs",
      "Conducted usability testing and research validation",
    ],
    tech: ["Next.js", "Tailwind CSS", "AI APIs"],
  },
  {
    company: "Kelurahan Isola",
    role: "Full-Stack Developer Intern",
    period: "Sep 2024 – Dec 2024",
    location: "Bandung, Indonesia",
    highlights: [
      "Developed online document management system",
      "Built 30+ Flutter screens",
      "Developed 55+ FastAPI endpoints",
      "Managed full-stack integration",
    ],
    tech: ["Flutter", "FastAPI", "MySQL", "Docker"],
  },
  {
    company: "Universitas Pendidikan Indonesia",
    role: "Teaching Assistant",
    period: "Feb 2024 – Jun 2024",
    location: "Bandung, Indonesia",
    highlights: [
      "Taught mobile programming practicum sessions for 80+ students",
      "Facilitated Flutter and mobile development workshops",
      "Designed learning modules for multi-platform application development",
      "Assisted students in debugging and software development practices",
    ],
    tech: ["Flutter", "Mobile Development"],
  },
];

// ===== PROJECTS =====
export const projects: Project[] = [
  {
    title: "KostHub WebGIS",
    description:
      "WebGIS-based boarding house search platform with Generative AI-powered recommendation and budget prediction system.",
    features: [
      "Interactive map exploration",
      "AI-powered recommendation",
      "Budget prediction",
      "Responsive UI",
    ],
    tech: ["React.js", "Generative AI"],
    image: "/kosthub/kosthub-project-1.png",
    gradient: "from-blue-500/20 to-cyan-500/20",
    link: "https://canva.link/v9w9dpok6sbahis",
  },
  {
    title: "Toeflify",
    description:
      "AI-powered English learning platform with CEFR-based essay assessment and automated feedback.",
    features: [
      "AI essay assessment",
      "Automated feedback",
      "Question generation",
      "Real-time AI integration",
    ],
    tech: ["Next.js", "Generative AI"],
    image: "/toeflify/toeflify-project-1.png",
    gradient: "from-purple-500/20 to-pink-500/20",
    link: "https://github.com/TOEFLify",
  },
  {
    title: "AI NPC Dialogue System",
    description:
      "Research thesis project implementing AI-driven NPC dialogue system for RPG games using Retrieval-Augmented Generation (RAG).",
    features: [
      "LLaMA 3 integration",
      "LangChain orchestration",
      "FAISS vector retrieval",
      "Dynamic RPG dialogue",
    ],
    tech: ["Python", "LangChain", "FAISS", "LLaMA 3"],
    image: "/ai-npc-dialogue/ai-npc-dialogue-project-1.png",
    gradient: "from-emerald-500/20 to-teal-500/20",
    link: "https://repository.upi.edu/138064/",
  },
];

// ===== EDUCATION =====
export const education: Education[] = [
  {
    institution: "Universitas Pendidikan Indonesia",
    degree: "B.S. Computer Science",
    period: "2021 – 2025",
    details: [
      "GPA: 3.86 / 4.00 (CumLaude)",
      "Thesis: AI-driven NPC dialogue system using LLaMA 3, LangChain, and FAISS",
    ],
    icon: GraduationCap,
  },
  {
    institution: "Bangkit Academy",
    degree: "Mobile Development Cohort",
    period: "2023 – 2024",
    details: [
      "Kotlin Android Development",
      "REST API integration",
      "AI-powered capstone project",
    ],
    icon: BookOpen,
  },
];

// ===== SKILLS =====
export const skillCategories: SkillCategory[] = [
  {
    name: "Backend",
    icon: Code2,
    skills: ["Java", "Spring Boot", "FastAPI", "REST API", "Redis"],
  },
  {
    name: "Frontend",
    icon: Globe,
    skills: ["React.js", "Next.js", "Flutter", "Tailwind CSS"],
  },
  {
    name: "Database",
    icon: Database,
    skills: ["PostgreSQL", "MySQL", "Redis"],
  },
  {
    name: "AI & Tools",
    icon: Brain,
    skills: [
      "LangChain",
      "Generative AI",
      "Docker",
      "Git",
      "Jira",
      "Bitbucket",
      "Figma",
    ],
  },
];

// ===== ACHIEVEMENTS =====
export const achievements: Achievement[] = [
  {
    title: "BNSP Database Administrator",
    type: "certification",
  },
  {
    title: "Alibaba Cloud Certified Associate Database",
    type: "certification",
  },
  {
    title: "Cloud with AWS Fundamentals",
    type: "certification",
  },
  {
    title: "DevOps Fundamentals",
    type: "certification",
  },
  {
    title: "Finalist MAPID WebGIS Competition 2025",
    type: "competition",
  },
  {
    title: "3rd Place DIMAS-TI 2024",
    type: "competition",
  },
];

// ===== SOCIAL LINKS =====
export const socialLinks = {
  github: "https://github.com/adem299",
  linkedin: "https://www.linkedin.com/in/ademulyn/",
  email: "mulyanaade30@email.com",
};

// ===== TECH STACK HIGHLIGHTS (About section) =====
export interface TechHighlight {
  name: string;
  colorClass: string;
}

const DEFAULT_TECH_COLOR =
  "from-gray-500/20 to-gray-600/20 border-gray-500/30 text-gray-300";

const techColorMap: Record<string, string> = {
  Java: "from-orange-500/20 to-red-500/20 border-orange-500/30 text-orange-300",
  "Spring Boot":
    "from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-300",
  "Next.js": "from-white/10 to-gray-500/10 border-white/20 text-gray-200",
  "React.js":
    "from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-300",
  PostgreSQL:
    "from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-300",
  Redis: "from-red-500/20 to-rose-500/20 border-red-500/30 text-red-300",
  Docker: "from-blue-400/20 to-sky-500/20 border-blue-400/30 text-blue-300",
  FastAPI:
    "from-teal-500/20 to-emerald-500/20 border-teal-500/30 text-teal-300",
  Flutter: "from-sky-500/20 to-blue-500/20 border-sky-500/30 text-sky-300",
  "Generative AI":
    "from-blue-400/20 to-slate-300/20 border-blue-400/30 text-blue-300",
  LangChain:
    "from-emerald-500/20 to-green-500/20 border-emerald-500/30 text-emerald-300",
};

export const techStackHighlights: TechHighlight[] = [
  "Java",
  "Spring Boot",
  "Next.js",
  "React.js",
  "PostgreSQL",
  "Redis",
  "Docker",
  "FastAPI",
  "Flutter",
  "Generative AI",
  "LangChain",
].map((name) => ({
  name,
  colorClass: techColorMap[name] || DEFAULT_TECH_COLOR,
}));
