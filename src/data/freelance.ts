import type { FreelanceClient } from "@/types";

/**
 * TODO (you): add case-study detail (screenshots, measurable results, dates)
 * whenever you're ready — the highlights below are from your brief as given.
 * Client logos/links can slot into the `link` field.
 */
export const freelanceClients: FreelanceClient[] = [
  {
    id: "sda-hospital",
    client: "SDA Hospital",
    category: "Healthcare · Production Maintenance",
    summary:
      "Ongoing maintenance and improvement of a live hospital website — the kind of client work where uptime and trust matter more than anything flashy.",
    highlights: [
      "Maintained a production website with real patients and staff depending on it",
      "Shipped performance improvements and new features without disrupting service",
      "Ongoing maintenance relationship, not a one-off build",
    ],
    stack: ["Production Maintenance", "Performance", "Feature Development"],
  },
  {
    id: "zidi",
    client: "ZIDI Startup",
    category: "Early-Stage Startup · Freelance Development",
    summary:
      "Freelance software development for an early-stage startup — UI improvements and new features on a moving target.",
    highlights: [
      "Delivered UI improvements and new feature implementation",
      "Worked directly with a startup team under startup speed and ambiguity",
    ],
    stack: ["Freelance Development", "UI Engineering", "Feature Delivery"],
  },
  {
    id: "hilux",
    client: "Hilux Startup",
    category: "Startup · Full-Stack Delivery",
    summary:
      "End-to-end software engineering — frontend built and wired to backend integrations, delivered professionally on client timelines.",
    highlights: [
      "Frontend development paired with backend integration work",
      "Owned delivery professionally against client expectations and timelines",
    ],
    stack: ["Frontend Development", "Backend Integration", "Client Delivery"],
  },
];
