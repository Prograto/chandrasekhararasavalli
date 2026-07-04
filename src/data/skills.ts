import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    label: "Programming",
    icon: "💻",
    color: "#7c3aed",
    skills: [
      { name: "Python",      level: 90 },
      { name: "JavaScript",  level: 85 },
      { name: "TypeScript",  level: 78 },
      { name: "Java",        level: 72 },
      { name: "C++",         level: 68 },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: "🎨",
    color: "#06b6d4",
    skills: [
      { name: "React",        level: 88 },
      { name: "Tailwind CSS", level: 85 },
      { name: "HTML/CSS",     level: 92 },
      { name: "Framer Motion",level: 75 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "⚙️",
    color: "#10b981",
    skills: [
      { name: "Flask",     level: 88 },
      { name: "Node.js",   level: 78 },
      { name: "REST APIs", level: 90 },
      { name: "FastAPI",   level: 72 },
    ],
  },
  {
    id: "ai",
    label: "AI / ML",
    icon: "🧠",
    color: "#f59e0b",
    skills: [
      { name: "OpenCV",        level: 80 },
      { name: "ML Fundamentals",level: 75 },
      { name: "Applied AI",    level: 72 },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    icon: "☁️",
    color: "#7c3aed",
    skills: [
      { name: "AWS",      level: 75 },
      { name: "Firebase", level: 80 },
      { name: "Docker",   level: 78 },
      { name: "CI/CD",    level: 72 },
      { name: "Linux",    level: 82 },
    ],
  },
  {
    id: "databases",
    label: "Databases & IoT",
    icon: "🗄️",
    color: "#06b6d4",
    skills: [
      { name: "MongoDB",   level: 85 },
      { name: "MySQL",     level: 78 },
      { name: "ESP8266",   level: 80 },
      { name: "Redis",     level: 68 },
    ],
  },
];
