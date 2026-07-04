import type { ExperienceItem } from "@/types";

export const experience: ExperienceItem[] = [
  {
    id: "indonalandatech",
    organization: "IndoNalandaTech",
    role: "Full Stack & Platform Operations Intern",
    duration: "Jun 2024 – Aug 2024",
    type: "internship",
    summary: "Worked across the stack and the platform underneath it — from React interfaces to Flask services and Linux infrastructure.",
    highlights: [
      "Built and maintained full-stack features end to end, from React UI to Flask API",
      "Handled platform operations on Linux — deployment, monitoring, and day-to-day upkeep",
      "Optimized API performance and iterated on CI/CD for faster, safer releases",
    ],
    stack: ["React", "Flask", "MongoDB", "Linux", "CI/CD"],
  },
  {
    id: "vjtha-learning",
    organization: "VJtha Learning",
    role: "2D Game & Web Developer Intern",
    duration: "Dec 2023 – Mar 2024",
    type: "internship",
    summary: "Split time between game-side platform development and the backend and APIs powering production systems.",
    highlights: [
      "Contributed to 2D game and web platform development",
      "Improved backend performance and API reliability for production systems",
    ],
    stack: ["Web Platform", "Backend APIs", "Production Systems"],
  },
];
