import { lazy, Suspense, useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MapPin, Sparkles, Download } from "lucide-react";
import { WhatsappIcon } from "@/components/ui/BrandIcons";
import { useProfile } from "@/hooks/useProfile";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { StaticNetworkGraph } from "@/components/three/StaticNetworkGraph";
import { TextBlowOut, FloatingCloud } from "@/components/StoryEffects";

const HeroScene = lazy(() =>
  import("@/components/three/HeroScene").then((m) => ({ default: m.HeroScene }))
);

function TypedRole({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setIndex((p) => (p + 1) % roles.length), 3000);
    return () => clearInterval(interval);
  }, [roles.length]);
  return (
    <motion.span
      key={roles[index]}
      className="text-gradient inline-block"
      initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
      transition={{ duration: 0.5 }}
    >{roles[index]}</motion.span>
  );
}

function TypingText({ text, delay = 1.5 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => {
      let i = 0;
      const iv = setInterval(() => {
        if (i < text.length) { setDisplayed(text.slice(0, i + 1)); i++; }
        else { setDone(true); clearInterval(iv); }
      }, 28);
      return () => clearInterval(iv);
    }, delay * 1000);
    return () => clearTimeout(t);
  }, [text, delay]);
  return (
    <span className="font-mono text-sm" style={{ color: "var(--t-accent)", opacity: 0.7 }}>
      {displayed}{!done && <span className="animate-pulse">▊</span>}
    </span>
  );
}

export function Hero() {
  const { profile } = useProfile();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const { settings } = useSiteSettings();

  return (
    <section id="hero" data-section="hero" ref={ref} className="relative min-h-[100svh] flex items-center overflow-hidden section-bg-hero">
      {/* 3D scene */}
      <div className="absolute inset-0 pointer-events-none">
        <Suspense fallback={<StaticNetworkGraph />}><HeroScene /></Suspense>
      </div>

      {/* Floating clouds decoration */}
      <FloatingCloud style={{ top: "10%", left: "-5%", color: "var(--t-accent)" }} size={300} />
      <FloatingCloud style={{ bottom: "15%", right: "-3%", color: "var(--t-accent2)" }} size={250} />

      {/* Mesh grid */}
      <div className="absolute inset-0 mesh-grid pointer-events-none" />

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-16 pt-28 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          {/* Status badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex items-center gap-3 mb-6">
            <span className="flex h-2 w-2 relative">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: "var(--t-accent)" }} />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "var(--t-accent)" }} />
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: "var(--t-accent)" }}>Open to select roles</span>
          </motion.div>

          {/* Blow-out title */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-4" style={{ color: "var(--t-text)" }}>
            <TextBlowOut text="I build" delay={0.2} />
            <br />
            <TypedRole roles={settings.heroRoles} />
            <br />
            <TextBlowOut text="systems." delay={0.6} />
          </h1>

          {/* Typing subtitle */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mb-6 h-6">
            <TypingText text="Systems check complete. Preparing for departure." delay={1.2} />
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg leading-relaxed max-w-lg mb-8" style={{ color: "var(--t-muted)" }}>
            {profile.subheadline}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-wrap gap-4 mb-10">
            <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: `${THEMES_ACCENT}15`, border: `1px solid ${THEMES_ACCENT}40`, color: "var(--t-text)", boxShadow: `0 0 25px ${THEMES_ACCENT}15` }}>
              <Sparkles size={16} /> View Projects <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a href={`https://wa.me/${profile.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl glass border border-green-500/30 text-green-400 hover:bg-green-500/10 font-semibold transition-all duration-300 hover:-translate-y-0.5">
              <WhatsappIcon size={16} /> WhatsApp
            </a>
            <a href={profile.resumeUrl} download
              className="flex items-center gap-2 px-6 py-3 rounded-xl glass font-semibold transition-all duration-300 hover:-translate-y-0.5" style={{ color: "var(--t-text)" }}>
              <Download size={16} /> Resume
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-wrap items-center gap-6 text-sm">
            <span className="flex items-center gap-2" style={{ color: "var(--t-muted)" }}>
              <MapPin size={14} style={{ color: "var(--t-accent)" }} /> {profile.location}
            </span>
            <span style={{ color: "var(--t-muted)", opacity: 0.4 }}>·</span>
            <span className="font-mono text-xs" style={{ color: "var(--t-muted)" }}>{profile.email}</span>
          </motion.div>
        </div>

        {/* Portrait */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
          className="hidden lg:flex justify-center items-center perspective-1000">
          <div className="relative group">
            <div className="absolute -inset-4 rounded-[2.5rem] blur-2xl group-hover:blur-3xl transition-all duration-700"
              style={{ background: `linear-gradient(135deg, var(--t-accent)30, var(--t-accent2)20)` }} />
            <div className="absolute -inset-1 rounded-[2rem] p-[2px] animate-[spin_8s_linear_infinite]"
              style={{ background: `linear-gradient(135deg, var(--t-accent), var(--t-accent2), var(--t-accent))` }} />
            <div className="relative w-72 h-96 rounded-[2rem] overflow-hidden border-2 group-hover:scale-[1.02] transition-transform duration-500"
              style={{ borderColor: `var(--t-accent)50` }}>
              <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 glass rounded-xl px-4 py-3">
                <p className="font-display font-bold text-white text-sm">{profile.name}</p>
                <p className="font-mono text-xs" style={{ color: "var(--t-accent)" }}>@{profile.handle || "prograto"} · {profile.role}</p>
              </div>
            </div>
            <motion.div animate={{ y: [-6, 6, -6] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -top-4 -right-8 glass-hi rounded-xl px-4 py-3">
              <p className="font-mono text-xs" style={{ color: "var(--t-accent)" }}>Projects</p>
              <p className="font-display font-bold text-xl" style={{ color: "var(--t-text)" }}>20+</p>
            </motion.div>
            <motion.div animate={{ y: [6, -6, 6] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-8 glass-hi rounded-xl px-4 py-3">
              <p className="font-mono text-xs" style={{ color: "var(--t-accent)" }}>Experience</p>
              <p className="font-display font-bold text-xl" style={{ color: "var(--t-text)" }}>3+ yrs</p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-[1px] h-8" style={{ background: `linear-gradient(to bottom, var(--t-accent), transparent)` }} />
      </motion.div>
    </section>
  );
}

const THEMES_ACCENT = "var(--t-accent)";
