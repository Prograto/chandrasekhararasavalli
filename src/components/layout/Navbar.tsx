import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { Menu, X, Sun, Moon, Palette } from "lucide-react";
import Tippy from "@/components/ui/Tippy";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { useProfile } from "@/hooks/useProfile";
import { cn } from "@/lib/utils";
import { useUIStore, type ThemeId } from "@/store/uiStore";

const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certificates", label: "Certs" },
  { id: "achievements", label: "Awards" },
  { id: "contact", label: "Contact" },
];

const THEME_OPTIONS: { id: ThemeId; label: string; icon: React.ReactNode; color: string }[] = [
  { id: "dark",    label: "Dark",    icon: <Moon size={14} />,                    color: "#00f5ff" },
  { id: "light",   label: "Light",   icon: <Sun size={14} />,                     color: "#0077cc" },
  { id: "magenta", label: "Magenta", icon: <Palette size={14} />,  color: "#ff3cac" },
  { id: "ocean",   label: "Ocean",   icon: <Palette size={14} />,  color: "#00d4ff" },
  { id: "emerald", label: "Emerald", icon: <Palette size={14} />,  color: "#00ffaa" },
];

function Orb() {
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 80, damping: 18 }), sy = useSpring(y, { stiffness: 80, damping: 18 });
  useEffect(() => {
    let f: number, t = 0;
    const anim = () => { t += 0.008; x.set(Math.sin(t)*12); y.set(Math.cos(t*0.9)*10); f = requestAnimationFrame(anim); };
    f = requestAnimationFrame(anim); return () => cancelAnimationFrame(f);
  }, [x, y]);
  return (
    <motion.div style={{ x: sx, y: sy }} className="relative flex items-center justify-center w-9 h-9">
      <div className="absolute inset-0 rounded-full opacity-80 blur-[1px]" style={{ background: `linear-gradient(135deg, var(--t-accent), var(--t-accent2))` }} />
      <div className="absolute inset-[2px] rounded-full" style={{ background: "var(--t-bg)" }} />
      <div className="absolute inset-[5px] rounded-full" style={{ background: `linear-gradient(135deg, var(--t-accent)40, var(--t-accent2)40)` }} />
      <span className="relative z-10 font-mono text-[9px] font-bold" style={{ color: "var(--t-text)" }}>CS</span>
    </motion.div>
  );
}

function ThemeMenu() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useUIStore();
  const current = THEME_OPTIONS.find(t => t.id === theme)!;
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => { if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [open]);

  return (
    <div ref={menuRef} className="relative">
      <Tippy content="Change theme" theme="flight-log" animation="shift-away" delay={[300, 100]}>
        <button onClick={() => setOpen(!open)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-sm"
          style={{ background: `var(--t-accent)10`, border: `1px solid var(--t-accent)25`, color: "var(--t-accent)" }}>
          {current.icon}
          <span className="hidden xl:inline font-mono text-xs">{current.label}</span>
        </button>
      </Tippy>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 rounded-xl p-1.5 shadow-2xl min-w-[150px]"
            style={{ background: "var(--t-glass)", border: `1px solid var(--t-border)`, backdropFilter: "blur(20px)" }}>
            {THEME_OPTIONS.map(opt => (
              <button key={opt.id} onClick={() => { setTheme(opt.id); setOpen(false); }}
                className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-left transition-all"
                style={{ background: theme === opt.id ? `${opt.color}15` : "transparent", color: theme === opt.id ? opt.color : "var(--t-text)" }}>
                <div className="w-4 h-4 rounded-full border-2" style={{ background: opt.color, borderColor: theme === opt.id ? opt.color : "var(--t-border)", boxShadow: theme === opt.id ? `0 0 8px ${opt.color}60` : "none" }} />
                <span className="font-mono text-xs">{opt.label}</span>
                <span className="ml-auto">{opt.icon}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function scrollTo(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }

export function Navbar() {
  const { profile } = useProfile();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useUIStore(s => s.activeSection);

  useEffect(() => { const h = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h); }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);

  return (
    <>
      <motion.header initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease: [0.25,1,0.5,1] }}
        className={cn("fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 lg:px-10 h-16 transition-all duration-500",
          scrolled ? "glass" : "bg-transparent")}>
        {/* Logo */}
        <button onClick={() => scrollTo("hero")} aria-label="Home" className="flex items-center gap-2.5">
          <Orb />
          <span className="hidden sm:block font-display font-semibold text-sm tracking-tight" style={{ color: "var(--t-text)" }}>
            Chandra<span style={{ color: "var(--t-accent)" }}>.dev</span>
          </span>
        </button>

        {/* Center nav */}
        <nav aria-label="Main" className="hidden lg:flex items-center gap-0.5">
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => scrollTo(item.id)}
              className="relative px-3 py-1.5 font-sans text-[13px] transition-colors duration-200 rounded-md"
              style={{ color: activeSection === item.id ? "var(--t-text)" : "var(--t-muted)" }}>
              {activeSection === item.id && (
                <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-md"
                  style={{ background: `var(--t-accent)10`, border: `1px solid var(--t-accent)25` }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }} />
              )}
              <span className="relative">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-2.5">
          <ThemeMenu />
          <div className="hidden lg:flex items-center gap-2">
            <a href="https://github.com/Prograto" target="_blank" rel="noopener noreferrer" style={{ color: "var(--t-muted)" }} className="hover:opacity-80"><GithubIcon size={16} /></a>
            <a href="https://www.linkedin.com/in/chandu-smart-techtuts/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--t-muted)" }} className="hover:opacity-80"><LinkedinIcon size={16} /></a>
          </div>
          <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="hidden lg:flex items-center px-3 py-1.5 rounded-lg text-xs font-medium"
            style={{ background: `var(--t-accent)12`, border: `1px solid var(--t-accent)25`, color: "var(--t-text)" }}>Resume</a>
          <button onClick={() => setOpen(true)} className="lg:hidden p-1" style={{ color: "var(--t-text)" }} aria-label="Menu"><Menu size={22} /></button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }} className="fixed inset-0 z-[60] flex flex-col glass-hi">
            <div className="flex justify-between items-center px-6 h-16 border-b" style={{ borderColor: "var(--t-border)" }}>
              <Orb />
              <div className="flex items-center gap-3">
                <ThemeMenu />
                <button onClick={() => setOpen(false)} style={{ color: "var(--t-text)" }}><X size={22} /></button>
              </div>
            </div>
            <ul className="flex-1 flex flex-col justify-center px-8 gap-1">
              {NAV_ITEMS.map((item, i) => (
                <motion.li key={item.id} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <button onClick={() => { setOpen(false); scrollTo(item.id); }} className="flex items-baseline gap-4 w-full py-2.5 text-left">
                    <span className="font-display text-2xl font-semibold" style={{ color: "var(--t-text)" }}>{item.label}</span>
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
