import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SECTION_COLORS: Record<string, { bg: string; accent: string }> = {
  hero:        { bg: "#0a0e1a", accent: "#00f5ff" },
  about:       { bg: "#0d1b2a", accent: "#f4a261" },
  services:    { bg: "#0e1525", accent: "#7c3aed" },
  experience:  { bg: "#0f2027", accent: "#39ff14" },
  projects:    { bg: "#1a0533", accent: "#bf5fff" },
  skills:      { bg: "#0b1622", accent: "#e0e0e0" },
  certificates:{ bg: "#0b1622", accent: "#06b6d4" },
  contact:     { bg: "#0d0d0d", accent: "#ffd700" },
};

export function useFlightColors() {
  useEffect(() => {
    const root = document.documentElement;
    const triggers = Object.entries(SECTION_COLORS).map(([id, colors]) => {
      const el = document.getElementById(id);
      if (!el) return null;
      return ScrollTrigger.create({
        trigger: el, start: "top 60%", end: "bottom 40%",
        onEnter: () => { root.style.setProperty("--bg-primary", colors.bg); root.style.setProperty("--accent-glow", colors.accent); },
        onEnterBack: () => { root.style.setProperty("--bg-primary", colors.bg); root.style.setProperty("--accent-glow", colors.accent); },
      });
    });
    return () => triggers.forEach(t => t?.kill());
  }, []);
}
