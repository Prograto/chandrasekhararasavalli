import type { Profile, SocialLink } from "@/types";

export const profile: Profile = {
  name: "Chandra Sekhar Arasavalli",
  handle: "prograto",
  role: "Full-Stack Engineer · AI Systems · IoT",
  tagline: "Building systems that scale, survive, and solve real problems.",
  headline: "I build the systems other software quietly depends on.",
  subheadline: "Backend-first engineer crafting AI-assisted tools, IoT-connected products, and platforms that hold up under real-world pressure.",
  bio: [
    "I'm a Computer Science student at Swarnandhra College of Engineering and Technology (2022–2026), and most of what I build starts from the same question: what's the system underneath this that has to not fall over?",
    "That bias toward the backend shows up everywhere — from Flask APIs powering training platforms for 300+ students to IoT checkout systems where hardware talks to cloud in real time. A Google AI/ML internship showed me that discipline at a very different scale.",
    "Freelance work sharpened the other half — SDA Hospital and startups like ZIDI and Hilux don't care how elegant your architecture is if the deploy breaks on a Tuesday. I've maintained production sites, shipped features under real constraints, and learned to own outcomes, not just code.",
    "Outside shipping: IEEE Vice Chair, drone technology trainer, NCC and NSS — leadership and service taught me as much about building for people as any framework has.",
  ],
  location: "Narsapur, Andhra Pradesh, India",
  availability: "selective",
  email: "chanduarasavalli95@gmail.com",
  whatsapp: "+919999999999", // TODO: replace with your actual WhatsApp number
  resumeUrl: "/resume.pdf",
};

export const socialLinks: SocialLink[] = [
  { label: "GitHub",    href: "https://github.com/Prograto",                        icon: "github" },
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/chandu-smart-techtuts/", icon: "linkedin" },
  { label: "Twitter",   href: "https://twitter.com/chanduprograto",                  icon: "twitter" },
  { label: "YouTube",   href: "https://youtube.com/@chandusmarttechtuts1557",        icon: "youtube" },
  { label: "WhatsApp",  href: "https://wa.me/919999999999",                          icon: "whatsapp" }, // TODO
  { label: "Email",     href: "mailto:chanduarasavalli95@gmail.com",                 icon: "mail" },
];
