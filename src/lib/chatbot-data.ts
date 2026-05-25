// AI Chatbot Knowledge Base & Intent Matching

interface ChatResponse {
  text: string;
}

const knowledgeBase: Record<string, ChatResponse> = {
  greeting: {
    text: "Hi there! 👋 I'm Ade's AI assistant. I can tell you about his experience, projects, skills, and background. What would you like to know?",
  },
  about: {
    text: "Ade Mulyana is a Software Engineer focused on backend engineering and scalable systems. He has hands-on industry experience with Spring Boot, PostgreSQL, Redis, and Next.js. He's built ERP systems, AI-powered platforms, and full-stack applications. His interests include cloud-native systems, AI integration, and software architecture.",
  },
  experience: {
    text: "Ade has professional experience at:\n\n🏢 **Akar Inti Teknologi** (Nov 2025 – Present) — Software Engineer building backend ERP modules with Spring Boot & PostgreSQL, implementing Redis session management, and applying SOLID principles.\n\n🎓 **Universitas Pendidikan Indonesia** (May – Dec 2025) — Research Assistant who built 'Toeflify', an AI-powered TOEFL platform using Next.js and Generative AI.\n\n💻 **Kelurahan Isola** (Sep – Dec 2024) — Full-Stack Developer Intern who built 30+ Flutter screens and 55+ FastAPI endpoints for a document management system.\n\n🏫 **Universitas Pendidikan Indonesia** (Feb – Jun 2024) — Teaching Assistant who taught mobile programming practicum sessions for 80+ students, facilitated Flutter workshops, and designed learning modules.",
  },
  skills: {
    text: "Ade's technical skills span:\n\n⚙️ **Backend**: Java, Spring Boot, FastAPI, REST API, Redis\n🖥️ **Frontend**: React.js, Next.js, Flutter, Tailwind CSS\n🗄️ **Database**: PostgreSQL, MySQL, Redis\n🤖 **AI & Tools**: LangChain, Generative AI, Docker, Git, Jira, Bitbucket, Figma",
  },
  projects: {
    text: "Ade's notable projects:\n\n🗺️ **KostHub WebGIS** — WebGIS boarding house search platform with AI-powered recommendation and budget prediction.\n\n📝 **Toeflify** — AI-powered English learning platform with CEFR-based essay assessment and automated feedback.\n\n🎮 **AI NPC Dialogue System** — Research thesis implementing AI-driven NPC dialogue for RPG games using LLaMA 3, LangChain, and FAISS Vector Databse with RAG architecture.",
  },
  education: {
    text: "Ade holds a **B.S. in Computer Science** from Universitas Pendidikan Indonesia (2021–2025) with a GPA of 3.86/4.00 (CumLaude). His thesis focused on AI-driven NPC dialogue systems using LLaMA 3, LangChain, and FAISS Vectore Databse.\n\nHe also completed **Bangkit Academy** (2023–2024) in Mobile Development, working with Kotlin, REST APIs, and AI-powered capstone projects.",
  },
  achievements: {
    text: "Ade's certifications and achievements:\n\n🏅 BNSP Database Administrator\n☁️ Alibaba Cloud Certified Associate Database\n☁️ Cloud with AWS Fundamentals\n⚙️ DevOps Fundamentals\n🏆 Finalist — MAPID WebGIS Competition 2025\n🥉 3rd Place — DIMAS-TI 2024",
  },
  contact: {
    text: "You can reach Ade through:\n\n📧 Email: mulyanaade30@email.com\n🐙 GitHub: github.com/adem299\n💼 LinkedIn: linkedin.com/in/ademlyn\n\nHe's always open to discussing new projects and opportunities!",
  },
  tech_stack: {
    text: "Ade works with a modern tech stack including Java, Spring Boot, Next.js, React.js, PostgreSQL, Redis, Docker, FastAPI, Flutter, and AI technologies like LangChain, and Generative AI. He's experienced in building scalable backend systems and AI-powered applications.",
  },
  recruiter: {
    text: "For recruiters: Ade is a Software Engineer with strong backend expertise (Java/Spring Boot) and full-stack capabilities (Next.js/React). He graduated CumLaude (GPA 3.86) from UPI, has industry experience at Akar Inti Teknologi, and has built AI-powered platforms. He's cloud-certified (AWS, Alibaba Cloud) and experienced with modern DevOps practices. He's currently open to new opportunities!",
  },
  summary: {
    text: "**Ade Mulyana** — Software Engineer specializing in backend engineering, scalable systems, and AI-powered applications. CumLaude CS graduate from UPI (3.86 GPA). Currently at Akar Inti Teknologi building ERP systems with Spring Boot. Experienced in Next.js, PostgreSQL, Redis, Docker, and Generative AI. Cloud-certified and competition-winning engineer passionate about solving complex problems.",
  },
  fallback: {
    text: "I can help you learn about Ade's background! Try asking about:\n• His **experience** and work history\n• His **projects** and what he's built\n• His **skills** and tech stack\n• His **education** and achievements\n• How to **contact** him\n• A **summary** of his profile",
  },
};

// Intent keywords mapping
const intentMap: Record<string, string[]> = {
  greeting: ["hi", "hello", "hey", "yo", "halo", "hai", "howdy", "sup", "greetings"],
  about: ["about", "who", "tell me", "introduce", "background", "siapa", "tentang"],
  experience: ["experience", "work", "job", "career", "company", "kerja", "pengalaman", "akar", "upi", "isola", "assistant", "teaching", "asisten"],
  skills: ["skill", "technology", "tech", "tools", "language", "framework", "kemampuan", "keahlian"],
  projects: ["project", "portfolio", "built", "build", "proyek", "kosthub", "toeflify", "npc"],
  education: ["education", "university", "degree", "school", "study", "gpa", "bangkit", "pendidikan"],
  achievements: ["achievement", "certification", "certificate", "award", "competition", "sertifikasi", "juara"],
  contact: ["contact", "reach", "email", "linkedin", "github", "hire", "hubungi", "kontak"],
  tech_stack: ["stack", "java", "spring", "next", "react", "redis", "postgres", "docker", "flutter", "fastapi"],
  recruiter: ["recruiter", "hiring", "recruit", "interview", "candidate", "resume", "cv"],
  summary: ["summary", "overview", "brief", "ringkasan", "rangkuman", "tldr"],
};

export function getAIResponse(message: string): string {
  const lowerMessage = message.toLowerCase().trim();

  // Check each intent
  for (const [intent, keywords] of Object.entries(intentMap)) {
    for (const keyword of keywords) {
      if (lowerMessage.includes(keyword)) {
        return knowledgeBase[intent].text;
      }
    }
  }

  return knowledgeBase.fallback.text;
}

export const suggestedQuestions = [
  "Who is Ade?",
  "What's his experience?",
  "Show me projects",
  "What skills does he have?",
  "Recruiter summary",
];
