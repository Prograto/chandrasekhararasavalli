import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface HeroRoles {
  heroRoles: Array<{ id: string; text: string }>;
}

export interface AboutStats {
  aboutStats: Array<{ id: string; num: number; suffix: string; label: string }>;
}

export interface ContactOptions {
  projectTypes: Array<{ id: string; name: string }>;
  budgets: Array<{ id: string; range: string }>;
}

const DEFAULT_ROLES = ["Full-Stack Engineer", "AI Systems Builder", "IoT Developer", "Backend Architect"];
const DEFAULT_STATS = [
  { id: "1", num: 300, suffix: "+", label: "Students trained" },
  { id: "2", num: 3, suffix: "+", label: "Years building" },
  { id: "3", num: 10, suffix: "+", label: "Awards & certs" },
  { id: "4", num: 5, suffix: "+", label: "Client projects" },
];
const DEFAULT_PROJECT_TYPES = ["All", "Featured", "AI/ML", "IoT", "Web", "Backend"];
const DEFAULT_BUDGETS = ["< ₹10,000", "₹10k – ₹50k", "₹50k – ₹2L", "₹2L+", "Open to discuss"];

export function useSiteSettings() {
  const [settings, setSettings] = useState<{
    heroRoles: string[];
    aboutStats: typeof DEFAULT_STATS;
    projectTypes: string[];
    budgets: string[];
  }>({
    heroRoles: DEFAULT_ROLES,
    aboutStats: DEFAULT_STATS,
    projectTypes: DEFAULT_PROJECT_TYPES,
    budgets: DEFAULT_BUDGETS,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }

    const fetchSettings = async () => {
      try {
        const settingsDoc = await getDoc(doc(db!, "siteContent", "settings"));
        if (settingsDoc.exists()) {
          const data = settingsDoc.data();
          setSettings({
            heroRoles: data.heroRoles?.map((r: any) => r.text) || DEFAULT_ROLES,
            aboutStats: data.aboutStats || DEFAULT_STATS,
            projectTypes: data.projectTypes?.map((p: any) => p.name) || DEFAULT_PROJECT_TYPES,
            budgets: data.budgets?.map((b: any) => b.range) || DEFAULT_BUDGETS,
          });
        }
      } catch (err) {
        console.warn("Failed to fetch site settings, using defaults:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading };
}
