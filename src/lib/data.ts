import { Project, Experience, Education, NavLink, Idea } from "@/types";

export const navLinks: NavLink[] = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "ideas", label: "Ideas", href: "/ideas" },
  { id: "contact", label: "Contact" },
];

export const projects: Project[] = [
  {
    title: "Anchor",
    description:
      "Shipped a habit-tracking social app to iOS with 26 row-level security policies covering every database table. Real-time messaging, friend system, and on-device TensorFlow.js inference for AI-powered streak insights — all running through Supabase with zero exposed endpoints.",
    tech: ["React 19", "Supabase", "Capacitor", "TensorFlow.js", "Framer Motion"],
    metrics: "26 RLS policies | On-device ML inference | iOS-deployed",
    github: "https://github.com/esamnyu/Habitual",
    demo: "https://anchor.camp",
    image: "/images/anchor-cover.png",
  },
  {
    title: "Campaign Insights Bot",
    description:
      "Built before the interview, not after. Designed an AI-powered Slack monitoring system with Z-score anomaly detection and GPT-generated campaign insights. Closed-loop feedback lets the model improve from analyst corrections in real time.",
    tech: ["React", "Recharts", "OpenAI GPT", "Tailwind CSS", "Vercel"],
    metrics: "Built proactively — secured the role before the first interview",
    github: "https://github.com/esamnyu/slackbot",
    demo: "https://slackbot-puce.vercel.app",
  },
  {
    title: "Roomies App",
    description:
      "Co-founded a mobile app for roommate coordination with end-to-end encrypted data. Built a consensus-driven AI framework inspired by Waze — LLM-powered task aggregation resolves household conflicts through anonymous proposals.",
    tech: ["React Native", "Firebase", "AI/ML", "Cryptography"],
    metrics: "E2E encryption | LLM consensus engine | Anonymous proposals",
  },
];

export const experiences: Experience[] = [
  {
    company: "Roomies",
    role: "Co-Founder & Lead Developer",
    date: "Feb 2024 - Present",
    location: "New York, NY",
    highlights: [
      "Implemented cryptography techniques to secure sensitive user data",
      "Developed consensus-driven AI framework inspired by Waze for household challenges",
      "Created LLM-powered module for task aggregation and anonymous proposal submission",
      "Built 'Task Transform' feature to demonstrate AI's practical value to non-technical users",
    ],
  },
  {
    company: "NYU Langone Health",
    role: "AI & Cybersecurity Intern",
    date: "Sep 2024 - Dec 2024",
    location: "New York, NY",
    highlights: [
      "Developed AI-driven chatbot enhancing vulnerability management by 30%",
      "Automated ICS security scans across 11 hospitals and 300+ ambulatory sites",
      "Created documentation and training materials for IT security team adoption",
    ],
  },
  {
    company: "NYC Cyber Command",
    role: "Cybersecurity Auditor",
    date: "Dec 2021 - Aug 2023",
    location: "New York, NY",
    highlights: [
      "Administered ICS security assessments across 50+ mission-critical OT/ICS systems",
      "Identified and remediated 100+ cybersecurity vulnerabilities",
      "Reduced non-compliance issues by 20% using NIST frameworks",
      "Developed internal Audit Guide reducing audit time by 20%",
    ],
  },
];

export const education: Education[] = [
  {
    school: "New York University",
    degree: "M.S. Cybersecurity",
    date: "Aug 2022 - June 2025",
    gpa: "3.96",
    highlights: [
      "Key Coursework: Network Security, Digital Forensics, Cloud Security, Applied Cryptography",
      "Co-developed CNN-based phishing detection system at CSAW (Best Challenge Award)",
      "Active participant in capture-the-flag competitions",
    ],
  },
  {
    school: "CUNY Lehman College",
    degree: "B.S. Computer Science",
    date: "Sep 2018 - June 2022",
    gpa: "3.90",
    highlights: [
      "Led CodePath.org cybersecurity program with 70% placement rate",
      "Enhanced threat detection accuracy by 20% with IBM QRadar",
      "Received Black Hat Briefings Scholarship for cybersecurity work",
    ],
  },
];

export const ideas: Idea[] = [
  {
    slug: "top-3-ai-skills-2026",
    title: "The 3 AI Skills That Actually Matter in 2026",
    excerpt:
      "A friend asked me what he should learn to stay relevant. After a week buried in hiring data and salary reports, a surprising pattern emerged.",
    category: "Career",
    readTime: "6 min read",
    publishedAt: "2026-01-24",
    featured: true,
  },
  {
    slug: "engineer-guide-to-wealth",
    title: "The Engineer's Guide to Building Wealth",
    excerpt:
      "After landing a new role in NYC, I realized my income was just the input—what I do with it is the system. Here's the framework I'm using.",
    category: "Finance",
    readTime: "8 min read",
    publishedAt: "2026-01-26",
    featured: true,
  },
  {
    slug: "reverse-engineering-recruiter-search",
    title: "How to Get Found by Tech Recruiters on LinkedIn",
    excerpt:
      "I didn't apply for my current role—a recruiter found me. So I reverse-engineered the entire pipeline, from boolean search to offer letter.",
    category: "Career",
    readTime: "7 min read",
    publishedAt: "2026-01-31",
    featured: true,
  },
];

export const socialLinks = {
  github: "https://github.com/esamnyu",
  linkedin: "https://linkedin.com/in/ethansam",
  email: "es5888@nyu.edu",
};

export const siteConfig = {
  name: "Ethan Sam",
  title: "Ethan Sam - AI Security Engineer & Full-Stack Developer",
  description:
    "Building secure, intelligent systems at the intersection of AI and cybersecurity. M.S. Cybersecurity candidate at NYU with experience at NYC Cyber Command and NYU Langone Health.",
  url: "https://ethansam.io",
};
