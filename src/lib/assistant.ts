// Portfolio assistant: keyword intent matching (no LLM).
// Factual replies are generated from data.ts so they can't drift from the site.

import {
  achievements,
  education,
  experiences,
  profile,
  projects,
  skillCategories,
  socialLinks,
} from "@/lib/data";

const { gpa } = profile;
const latest = experiences[0];
const list = (lines: string[]) => lines.map((line) => `• ${line}`).join("\n");
const bareUrl = (url: string) => url.replace(/^https:\/\/(www\.)?/, "").replace(/\/$/, "");

const replies: Record<string, string> = {
  greeting:
    "Hi there! 👋 I'm Ade's portfolio assistant. I can tell you about his experience, projects, skills, and background. What would you like to know?",

  about: profile.about.join("\n\n"),

  experience:
    "Ade's professional experience:\n\n" +
    experiences
      .map((exp) => `**${exp.role}** @ ${exp.company} (${exp.period})\n${exp.highlights.slice(0, 2).join(". ")}.`)
      .join("\n\n"),

  projects:
    "Ade's featured projects:\n\n" +
    projects.map((project) => `**${project.title}** — ${project.description}`).join("\n\n"),

  skills:
    "Ade's technical skills:\n\n" +
    skillCategories.map((category) => `**${category.name}**: ${category.skills.join(", ")}`).join("\n"),

  education:
    education
      .map((edu) => `**${edu.degree}**, ${edu.institution} (${edu.period})\n${list(edu.details)}`)
      .join("\n\n"),

  achievements: "Certifications and achievements:\n\n" + list(achievements.map((a) => a.title)),

  contact:
    "You can reach Ade through:\n\n" +
    list([
      `Email: ${socialLinks.email}`,
      `GitHub: ${bareUrl(socialLinks.github)}`,
      `LinkedIn: ${bareUrl(socialLinks.linkedin)}`,
    ]) +
    "\n\nHe's always open to discussing new projects and opportunities!",

  tech_stack: `Ade's core stack: ${profile.spec.find(([key]) => key === "core")?.[1]}. He also works with ${profile.spec.find(([key]) => key === "also")?.[1]}.`,

  recruiter: `For recruiters: Ade is a ${profile.role} with strong backend expertise (Java/Spring Boot) and full-stack capabilities (Next.js/React). He graduated ${gpa.honors} (GPA ${gpa.value}/${gpa.scale}) from ${education[0].institution}, most recently worked as ${latest.role} at ${latest.company}, and has built AI-powered platforms. He's open to new opportunities!`,

  summary: `**${profile.name}** — ${profile.headline}. ${gpa.honors} CS graduate (GPA ${gpa.value}). Most recently ${latest.role} at ${latest.company}. ${achievements.length} certifications and awards.`,

  fallback:
    "I can help you learn about Ade! Try asking about:\n" +
    list(["His **experience**", "His **projects**", "His **skills**", "His **education** and achievements", "How to **contact** him", "A **summary** of his profile"]),
};

// Intent keywords. Checked in order; greeting is handled separately (exact words only).
const intents: Record<string, string[]> = {
  about: ["about", "who", "tell me", "introduce", "background", "siapa", "tentang"],
  experience: ["experience", "work", "job", "career", "company", "kerja", "pengalaman", "akar", "isola", "assistant", "teaching", "asisten"],
  skills: ["skill", "technology", "tech", "tools", "language", "framework", "kemampuan", "keahlian"],
  projects: ["project", "portfolio", "built", "build", "proyek", "kosthub", "toeflify", "npc"],
  education: ["education", "university", "degree", "school", "study", "gpa", "bangkit", "pendidikan", "upi"],
  achievements: ["achievement", "certification", "certificate", "award", "competition", "sertifikasi", "juara"],
  contact: ["contact", "reach", "email", "linkedin", "github", "hire", "hubungi", "kontak"],
  tech_stack: ["stack", "java", "spring", "next", "react", "redis", "postgres", "docker", "flutter", "fastapi"],
  recruiter: ["recruiter", "hiring", "recruit", "interview", "candidate", "resume", "cv"],
  summary: ["summary", "overview", "brief", "ringkasan", "rangkuman", "tldr"],
};
const greetings = ["hi", "hello", "hey", "yo", "halo", "hai", "howdy", "sup", "greetings"];

/**
 * Pick a reply for a visitor message. Multi-word keywords match as phrases,
 * single keywords as word prefixes ("skill" matches "skills"). Greetings need an
 * exact word, otherwise "hi" would match "his" in "What's his experience?".
 */
export function getAssistantReply(message: string): string {
  const lower = message.toLowerCase().trim();
  const words: string[] = lower.match(/[a-z0-9.+#]+/g) ?? [];
  const matches = (keyword: string) =>
    keyword.includes(" ") ? lower.includes(keyword) : words.some((word) => word.startsWith(keyword));

  for (const [intent, keywords] of Object.entries(intents)) {
    if (keywords.some(matches)) return replies[intent];
  }
  if (greetings.some((greeting) => words.includes(greeting))) return replies.greeting;
  return replies.fallback;
}

export const suggestedQuestions = [
  "Who is Ade?",
  "What's his experience?",
  "Show me projects",
  "What skills does he have?",
  "Recruiter summary",
];
