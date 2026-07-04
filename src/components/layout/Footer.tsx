import { motion } from "framer-motion";
import { ArrowUp, Mail } from "lucide-react";
import { profile, socialLinks } from "@/data/profile";
import { GithubIcon, LinkedinIcon, WhatsappIcon, TwitterIcon, YoutubeIcon } from "@/components/ui/BrandIcons";

const ICON_MAP: Record<string, React.ReactNode> = {
  github: <GithubIcon size={18} />, linkedin: <LinkedinIcon size={18} />,
  twitter: <TwitterIcon size={18} />, youtube: <YoutubeIcon size={18} />,
  whatsapp: <WhatsappIcon size={18} />, mail: <Mail size={18} />,
};

export function Footer() {
  return (
    <footer className="relative border-t pt-16 pb-10 overflow-hidden" style={{ borderColor: "var(--t-border)" }}>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <h3 className="font-display text-2xl font-bold mb-2" style={{ color: "var(--t-text)" }}>Chandra<span style={{ color: "var(--t-accent)" }}>.dev</span></h3>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--t-muted)" }}>
              Backend-first, AI-assisted, and IoT-connected systems that hold up under real-world pressure.
            </p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: "var(--t-muted)", opacity: 0.5 }}>Navigate</p>
            <ul className="space-y-2">
              {["about","services","experience","projects","skills","certificates","contact"].map(id => (
                <li key={id}><button onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                  className="text-sm capitalize transition-colors" style={{ color: "var(--t-muted)" }}>{id}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: "var(--t-muted)", opacity: 0.5 }}>Connect</p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(link => {
                const icon = ICON_MAP[link.icon]; if (!icon) return null;
                return (
                  <motion.a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined} whileHover={{ y: -3, scale: 1.1 }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl glass transition-colors" style={{ color: "var(--t-muted)" }} aria-label={link.label}>{icon}</motion.a>
                );
              })}
            </div>
            <div className="mt-6">
              <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
                style={{ background: `var(--t-accent)12`, border: `1px solid var(--t-accent)30`, color: "var(--t-accent)" }}>Download Resume</a>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t pt-8" style={{ borderColor: "var(--t-border)" }}>
          <p className="font-mono text-xs" style={{ color: "var(--t-muted)", opacity: 0.5 }}>© {new Date().getFullYear()} Chandra Sekhar Arasavalli · Built with React, Three.js & a lot of coffee.</p>
          <motion.button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} whileHover={{ y: -3 }}
            className="flex items-center gap-2 font-mono text-xs" style={{ color: "var(--t-accent)" }}>Back to top <ArrowUp size={13} /></motion.button>
        </div>
      </div>
    </footer>
  );
}
