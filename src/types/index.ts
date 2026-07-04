export interface Profile {
  name: string;
  handle: string;
  role: string;
  tagline: string;
  headline: string;
  subheadline: string;
  bio: string[];
  location: string;
  availability: "available" | "selective" | "unavailable";
  email: string;
  whatsapp: string;
  resumeUrl?: string;
  avatar?: string;
}

export type SocialIcon = "github" | "linkedin" | "twitter" | "youtube" | "instagram" | "mail" | "whatsapp";

export interface SocialLink {
  label: string;
  href: string;
  icon: SocialIcon;
}

export interface ExperienceItem {
  id: string;
  organization: string;
  role: string;
  duration?: string;
  location?: string;
  type: "internship" | "freelance" | "volunteer" | "full-time";
  summary: string;
  highlights: string[];
  stack: string[];
}

export interface FreelanceClient {
  id: string;
  client: string;
  category: string;
  summary: string;
  highlights: string[];
  stack: string[];
  link?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  stack: string[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  verified: boolean;
  metric?: string;
  color: string;
}

export interface GithubRepoStats {
  stars: number;
  forks: number;
  language: string | null;
  updatedAt: string;
  url: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
  skills: { name: string; level: number }[];
}

export type AchievementCategory = "leadership" | "certification" | "academic" | "competition" | "community";

export interface Achievement {
  id: string;
  title: string;
  organization?: string;
  description: string;
  category: AchievementCategory;
  year?: string;
  image?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  credentialUrl?: string;
  color: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  projectType: string;
  budget?: string;
  message: string;
}

export interface ContactMessage extends ContactFormValues {
  id?: string;
  timestamp?: unknown;
  status?: "new" | "read" | "replied";
  source?: "website";
}
