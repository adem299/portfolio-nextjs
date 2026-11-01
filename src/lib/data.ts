import { pad2 } from "@/lib/format";

// ===== TYPES =====
export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
  tech: string[];
}

export interface ProjectDetail {
  problem: string;
  solution: string;
  useCases: { actor: string; action: string }[];
  architecture: string[];
  results: { label: string; value: string }[];
  screenshots: { src: string; caption: string }[];
  links: { label: string; url: string; type: "github" | "demo" | "paper" | "other" }[];
}

export interface Project {
  title: string;
  description: string;
  features: string[];
  tech: string[];
  /** Short system-flow labels rendered as a diagram */
  flow?: string[];
  image?: string;
  link?: string;
  detail?: ProjectDetail;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  details: string[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface Achievement {
  title: string;
  type: "certification" | "competition";
}

// ===== PROFILE =====
// Personal facts and copy used by the hero, about section, and assistant.
export const profile = {
  name: "Ade Mulyana",
  role: "Software Engineer",
  headline: "Software Engineer — Backend & AI",
  intro:
    "I'm Ade Mulyana. I design services with Java and Spring Boot on PostgreSQL and Redis, and I wire LLMs into products people actually use, from ERP modules to RAG-powered research.",
  gpa: { value: "3.86", scale: "4.00", honors: "Cum Laude" },
  spec: [
    ["role", "Software Engineer"],
    ["focus", "Backend · AI integration"],
    ["core", "Java · Spring Boot · PostgreSQL · Redis"],
    ["also", "Next.js · FastAPI · LangChain · Docker"],
    ["education", "B.S. Computer Science, cum laude"],
    ["based", "Indonesia (UTC+7)"],
  ] as [string, string][],
  about: [
    "I'm a software engineer with a strong focus on backend engineering and building scalable systems. I like hard problems and clean, maintainable architectures.",
    "With hands-on industry experience in Spring Boot, PostgreSQL, Redis, and Next.js, I've contributed to ERP systems, AI-powered platforms, and full-stack applications that serve real users.",
    "My interests span cloud-native systems, AI integration, and software architecture. I keep learning and keep up with modern engineering practice.",
  ],
  focusAreas: [
    "Backend engineering",
    "Scalable systems",
    "AI integration",
    "Cloud-native systems",
    "Software architecture",
    "Clean, maintainable code",
  ],
};

// ===== NAVIGATION =====
// Order here defines section numbering ("01 / About") everywhere.
export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

/** Two-digit number of a section, derived from its position in navLinks. */
export function sectionNumber(id: string): string {
  const index = navLinks.findIndex((link) => link.href === `#${id}`);
  if (index === -1) throw new Error(`Section "${id}" is missing from navLinks`);
  return pad2(index + 1);
}

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
    tech: ["React.js", "Leaflet.js", "Generative AI"],
    flow: ["React + Leaflet", "REST API", "Geo query", "Gen AI"],
    image: "/kosthub/kosthub-project-1.png",
    link: "https://canva.link/v9w9dpok6sbahis",
    detail: {
      problem:
        "Students moving to a new city struggle to find boarding houses that fit their budget and location. Listings are scattered across many platforms, which makes the search slow and inefficient.",
      solution:
        "KostHub brings everything into one WebGIS platform: search boarding houses on an interactive map, get AI recommendations tailored to user preferences, and see an automatic monthly budget estimate.",
      useCases: [
        { actor: "Student", action: "Find boarding houses near campus on an interactive map, filtered by radius, price, and facilities" },
        { actor: "Student", action: "Get personalized AI recommendations based on preferences and search history" },
        { actor: "Student", action: "Estimate a monthly budget from the desired location and facilities" },
        { actor: "Owner", action: "List a property with detailed location, facilities, and pricing" },
      ],
      architecture: [
        "React.js frontend with Leaflet.js for interactive map rendering",
        "Generative AI API powering the recommendation engine and budget prediction",
        "RESTful backend API for boarding house and user data",
        "Geospatial queries for location- and radius-based search",
      ],
      results: [{ label: "Competition", value: "Finalist, MAPID WebGIS 2025" }],
      screenshots: [
        { src: "/kosthub/kosthub-project-1.png", caption: "Main dashboard with interactive map" },
      ],
      links: [
        { label: "Presentation", url: "https://canva.link/v9w9dpok6sbahis", type: "other" },
      ],
    },
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
    flow: ["Next.js", "Gen AI API", "CEFR rubric", "Feedback"],
    image: "/toeflify/toeflify-project-1.png",
    link: "https://github.com/TOEFLify",
    detail: {
      problem:
        "Indonesian students need affordable TOEFL practice with personal feedback. Conventional courses are expensive and don't offer accurate automated essay scoring against the CEFR standard.",
      solution:
        "Toeflify is an AI-powered TOEFL learning platform that scores essays automatically against the CEFR framework, gives constructive feedback, and generates adaptive practice questions.",
      useCases: [
        { actor: "Student", action: "Practice with TOEFL questions generated by AI to match their level" },
        { actor: "Student", action: "Write an essay and get an automatic CEFR-rubric score with improvement feedback" },
        { actor: "Lecturer", action: "Monitor student progress and review AI assessment reports" },
        { actor: "Researcher", action: "Use the platform as a research instrument to validate AI models for language assessment" },
      ],
      architecture: [
        "Next.js frontend with server-side rendering",
        "Generative AI API integration for essay assessment and question generation",
        "CEFR rubric engine to standardize language scoring",
        "Real-time feedback pipeline with streamed AI responses",
      ],
      results: [],
      screenshots: [
        { src: "/toeflify/toeflify-project-1.png", caption: "Toeflify home page" },
      ],
      links: [
        { label: "GitHub", url: "https://github.com/TOEFLify", type: "github" },
      ],
    },
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
    flow: ["Player input", "LangChain", "FAISS retrieval", "LLaMA 3"],
    image: "/ai-npc-dialogue/ai-npc-dialogue-project-1.png",
    link: "https://repository.upi.edu/138064/",
    detail: {
      problem:
        "NPCs in traditional RPGs have static, repetitive dialogue that breaks immersion. Developers need dynamic dialogue without hand-writing thousands of scripted lines.",
      solution:
        "A RAG-based dialogue system combining LLaMA 3 as the language model, LangChain for orchestration, and FAISS for vector retrieval, so NPCs respond in context and stay true to their lore and character.",
      useCases: [
        { actor: "Player", action: "Talk to NPCs with free-form input and get in-character, contextual replies" },
        { actor: "Player", action: "Ask NPCs about quests, lore, or the game world and get consistent answers" },
        { actor: "Game dev", action: "Define NPC personality and lore through reference documents instead of manual scripting" },
        { actor: "Researcher", action: "Evaluate dialogue quality with coherence, relevance, and character-consistency metrics" },
      ],
      architecture: [
        "LLaMA 3 as the base language model for natural dialogue generation",
        "LangChain as the orchestration framework for prompt chaining and retrieval",
        "FAISS vector database storing and retrieving lore and character context",
        "Python backend with FastAPI serving the model and API endpoints",
      ],
      results: [],
      screenshots: [
        { src: "/ai-npc-dialogue/ai-npc-dialogue-project-1.png", caption: "NPC dialogue system demo" },
      ],
      links: [
        { label: "UPI Repository", url: "https://repository.upi.edu/138064/", type: "paper" },
      ],
    },
  },
];

// ===== EDUCATION =====
export const education: Education[] = [
  {
    institution: "Universitas Pendidikan Indonesia",
    degree: "B.S. Computer Science",
    period: "2021 – 2025",
    details: [
      `GPA: ${profile.gpa.value} / ${profile.gpa.scale} (${profile.gpa.honors})`,
      "Thesis: AI-driven NPC dialogue system using LLaMA 3, LangChain, and FAISS",
    ],
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
  },
];

// ===== SKILLS =====
export const skillCategories: SkillCategory[] = [
  {
    name: "Backend",
    skills: ["Java", "Spring Boot", "FastAPI", "REST API", "Redis"],
  },
  {
    name: "Frontend",
    skills: ["React.js", "Next.js", "Flutter", "Tailwind CSS"],
  },
  {
    name: "Database",
    skills: ["PostgreSQL", "MySQL", "Redis"],
  },
  {
    name: "AI & Tools",
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
  email: "mulyanaade30@gmail.com",
};
