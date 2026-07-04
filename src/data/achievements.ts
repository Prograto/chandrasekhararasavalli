import type { Achievement } from "@/types";

/**
 * TODO (you): I don't have exact years, chapter names, or award titles for
 * these, so I kept descriptions general rather than invent specifics. Fill
 * in real years/details where you want them to show — they'll read even
 * stronger with one concrete number or date each.
 */
export const achievements: Achievement[] = [
  {
    id: "ieee-vice-chair",
    title: "IEEE Vice Chair",
    organization: "IEEE Student Chapter",
    description:
      "Elected to a student-chapter leadership role — organizing technical events and representing the chapter.",
    category: "leadership",
  },
  {
    id: "google-aiml",
    title: "AI/ML Internship",
    organization: "Google",
    description:
      "Selected for an AI/ML-focused internship program, working alongside experienced engineers on applied machine learning.",
    category: "academic",
  },
  {
    id: "aws-cloud-practitioner",
    title: "AWS Certified Cloud Practitioner",
    organization: "Amazon Web Services",
    description:
      "Certified on core AWS services, cloud architecture fundamentals, and cost/security best practices.",
    category: "certification",
  },
  {
    id: "gate-qualified",
    title: "GATE Qualified",
    organization: "Graduate Aptitude Test in Engineering",
    description:
      "Qualified GATE in Computer Science — a national-level exam testing depth across CS fundamentals.",
    category: "academic",
  },
  {
    id: "nptel-silver",
    title: "NPTEL Silver Medals",
    organization: "NPTEL",
    description:
      "Multiple silver-medal certifications from NPTEL's rigorous online courses and proctored exams.",
    category: "academic",
  },
  {
    id: "coding-winner",
    title: "Coding Competition Winner",
    description:
      "First place in a competitive coding contest, solving algorithmic problems under time pressure.",
    category: "competition",
  },
  {
    id: "project-expo",
    title: "Project Expo Runner-up",
    description:
      "Runner-up at a college project exposition, presenting a working system to a panel of judges.",
    category: "competition",
  },
  {
    id: "drone-trainer",
    title: "Drone Technology Trainer",
    description:
      "Trained students in drone technology fundamentals — assembly, flight systems, and applications.",
    category: "community",
  },
  {
    id: "ncc",
    title: "NCC Cadet",
    organization: "National Cadet Corps",
    description:
      "Trained in discipline, leadership, and service through India's National Cadet Corps.",
    category: "community",
  },
  {
    id: "nss",
    title: "NSS Volunteer",
    organization: "National Service Scheme",
    description:
      "Contributed to community service initiatives through the National Service Scheme.",
    category: "community",
  },
];
