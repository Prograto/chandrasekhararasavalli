import { create } from "zustand";

export type ThemeId = "dark" | "light" | "magenta" | "ocean" | "emerald";

export interface ThemeColors {
  bg: string;
  surface: string;
  surface2: string;
  text: string;
  muted: string;
  accent: string;
  accent2: string;
  glass: string;
  border: string;
}

export const THEMES: Record<ThemeId, ThemeColors> = {
  dark: {
    bg: "#0a0e1a",
    surface: "#111220",
    surface2: "#191a2e",
    text: "#e8eaf6",
    muted: "#7b7fa8",
    accent: "#00f5ff",
    accent2: "#7c3aed",
    glass: "rgba(17,18,32,0.75)",
    border: "rgba(255,255,255,0.07)",
  },
  light: {
    bg: "#f4f6fb",
    surface: "#ffffff",
    surface2: "#eef1f8",
    text: "#1a1a2e",
    muted: "#6b7094",
    accent: "#0077cc",
    accent2: "#6c3ce0",
    glass: "rgba(255,255,255,0.8)",
    border: "rgba(0,0,0,0.08)",
  },
  magenta: {
    bg: "#120318",
    surface: "#1c0628",
    surface2: "#2a0a3d",
    text: "#f0e0f8",
    muted: "#a07cb8",
    accent: "#ff3cac",
    accent2: "#e040fb",
    glass: "rgba(28,6,40,0.8)",
    border: "rgba(255,60,172,0.12)",
  },
  ocean: {
    bg: "#071520",
    surface: "#0c2135",
    surface2: "#132d48",
    text: "#d8eaf8",
    muted: "#6a9ec0",
    accent: "#00d4ff",
    accent2: "#0088cc",
    glass: "rgba(12,33,53,0.8)",
    border: "rgba(0,212,255,0.1)",
  },
  emerald: {
    bg: "#071510",
    surface: "#0c2118",
    surface2: "#132d20",
    text: "#d8f0e8",
    muted: "#6ac090",
    accent: "#00ffaa",
    accent2: "#10b981",
    glass: "rgba(12,33,24,0.8)",
    border: "rgba(0,255,170,0.1)",
  },
};

interface UIState {
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
  activeSection: string;
  setActiveSection: (id: string) => void;
  theme: ThemeId;
  setTheme: (t: ThemeId) => void;
}

export const useUIStore = create<UIState>((set) => ({
  mobileNavOpen: false,
  setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
  activeSection: "hero",
  setActiveSection: (id) => set({ activeSection: id }),
  theme: (localStorage.getItem("portfolio-theme") as ThemeId) || "dark",
  setTheme: (t) => {
    localStorage.setItem("portfolio-theme", t);
    set({ theme: t });
  },
}));
