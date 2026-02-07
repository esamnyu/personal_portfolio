export interface Project {
  title: string;
  description: string;
  tech: string[];
  metrics: string;
  github?: string;
  demo?: string;
  image?: string;
}

export interface Experience {
  company: string;
  role: string;
  date: string;
  location: string;
  highlights: string[];
}

export interface Credential {
  name: string;
  issuer: string;
  url: string;
}

export interface Education {
  school: string;
  degree: string;
  date: string;
  gpa?: string;
  credentials?: Credential[];
  highlights: string[];
}

export interface SocialLink {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
}

export interface NavLink {
  id: string;
  label: string;
  href?: string;
}

export interface Idea {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  featured?: boolean;
}
