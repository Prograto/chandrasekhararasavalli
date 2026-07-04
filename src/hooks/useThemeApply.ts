import { useEffect } from "react";
import { useUIStore, THEMES } from "@/store/uiStore";

/**
 * Applies the active theme's colors as CSS custom properties on :root.
 * Runs on every theme change.
 */
export function useThemeApply() {
  const theme = useUIStore((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;
    const t = THEMES[theme];

    root.style.setProperty("--t-bg", t.bg);
    root.style.setProperty("--t-surface", t.surface);
    root.style.setProperty("--t-surface2", t.surface2);
    root.style.setProperty("--t-text", t.text);
    root.style.setProperty("--t-muted", t.muted);
    root.style.setProperty("--t-accent", t.accent);
    root.style.setProperty("--t-accent2", t.accent2);
    root.style.setProperty("--t-glass", t.glass);
    root.style.setProperty("--t-border", t.border);

    // Also set the body background for immediate feedback
    document.body.style.background = t.bg;
    document.body.style.color = t.text;

    // Toggle a class for light-mode specific overrides
    root.classList.toggle("theme-light", theme === "light");
  }, [theme]);
}
