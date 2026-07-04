export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  iconName: "code" | "lightbulb" | "cpu" | "rocket";
  color: string;
}

export const services: Service[] = [
  {
    id: "software-dev",
    title: "Software Development",
    tagline: "Full-stack applications built to last",
    description: "End-to-end web and mobile applications using React, Next.js, Flask, FastAPI, and cloud infrastructure. From MVPs to production-grade platforms.",
    features: ["Custom Web Applications", "REST & GraphQL APIs", "Database Architecture", "Cloud Deployment (AWS, Firebase)", "Performance Optimization"],
    iconName: "code",
    color: "#7c3aed",
  },
  {
    id: "technical-consulting",
    title: "Technical Consultant",
    tagline: "Strategic guidance for your tech stack",
    description: "Architecture reviews, tech stack selection, and scaling strategies. Decisions that won't haunt you in 6 months.",
    features: ["System Architecture Review", "Tech Stack Selection", "Code Quality Audits", "Scalability Planning", "Team Training & Mentorship"],
    iconName: "lightbulb",
    color: "#06b6d4",
  },
  {
    id: "iot-embedded",
    title: "IoT & Embedded Systems",
    tagline: "Hardware that talks to the cloud",
    description: "ESP8266/ESP32-based IoT solutions, sensor networks, and embedded firmware. From smart checkout systems to real-time monitoring.",
    features: ["ESP8266 / ESP32 Firmware", "Sensor Integration", "MQTT & WebSocket Protocols", "Real-time Cloud Dashboards", "Edge Computing Solutions"],
    iconName: "cpu",
    color: "#10b981",
  },
  {
    id: "freelance",
    title: "Freelance Services",
    tagline: "Ship fast, iterate faster",
    description: "Rapid prototyping, bug fixing, feature development, and maintenance. Shipped under real deadlines for hospitals, startups, and educational platforms.",
    features: ["Rapid Prototyping & MVPs", "Bug Fixing & Debugging", "Feature Development", "Site Maintenance & Updates", "Third-party API Integration"],
    iconName: "rocket",
    color: "#f59e0b",
  },
];
