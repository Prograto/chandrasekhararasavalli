import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Star, GitFork, Eye, ChevronRight } from "lucide-react";
import Tippy from "@/components/ui/Tippy";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { useFirestoreCollection } from "@/hooks/useFirestore";
import { projects as staticProjects } from "@/data/projects";
import { useGithubStats } from "@/hooks/useGithubStats";
import type { Project, GithubRepoStats } from "@/types";
import { cn } from "@/lib/utils";
import { GlowLine, TextBlowOut, FloatingCloud } from "@/components/StoryEffects";

const PROJECT_TYPES = ["All", "Featured", "AI/ML", "IoT", "Web", "Backend"];
const STORY_CLOUDS: Record<string, string> = {
  swarnandhrian: "2,000 coders. One platform. Built from dorm-room dreams.",
  medislot: "AI meets healthcare. Every slot saved = a patient helped.",
  "smart-check-out": "IoT at checkout. Zero queues, real-time billing.",
  "facial-attendance": "OpenCV sees you. Attendance logged before you sit down.",
  "docker-code-runner": "Sandboxed execution. Your code, isolated. No escape.",
  "ai-college-maintenance": "AI routes your complaints. The department can't ignore ML.",
};

function HexParticle({ style }: { style: React.CSSProperties }) {
  return (
    <motion.div className="absolute opacity-[0.04] pointer-events-none" style={style}
      animate={{ y: [-15, 15, -15], rotate: [0, 30, 0] }}
      transition={{ repeat: Infinity, duration: 5 + Math.random() * 4, ease: "easeInOut" }}>
      <svg width="24" height="28" viewBox="0 0 24 28"><polygon points="12,0 24,7 24,21 12,28 0,21 0,7" fill="none" stroke="var(--t-accent2)" strokeWidth="1" /></svg>
    </motion.div>
  );
}

function ProjectCard({ project, stats, index }: { project: Project; stats?: GithubRepoStats | null; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Tippy content={project.hoverMsg || STORY_CLOUDS[project.id] || project.description} theme="flight-log" animation="shift-away" arrow delay={[300, 100]} maxWidth={220}>
      <motion.div ref={ref}
        initial={{ opacity: 0, y: 50, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: index * 0.06, ease: [0.25, 1, 0.5, 1] }}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        className="group relative rounded-2xl overflow-hidden cursor-pointer" style={{ background: "var(--t-surface)", border: `1px solid var(--t-border)` }}>
        <div className="relative h-48 overflow-hidden">
          <motion.img src={project.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80"} alt={project.title}
            className="w-full h-full object-cover" animate={{ scale: hovered ? 1.08 : 1 }} transition={{ duration: 0.5 }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, var(--t-surface), var(--t-surface)80, transparent)` }} />
          {project.featured && (
            <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-mono flex items-center gap-1"
              style={{ background: `var(--t-accent2)30`, border: `1px solid var(--t-accent2)50`, color: "var(--t-text)" }}>
              <Star size={10} /> Featured
            </div>
          )}
          {project.metric && (
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-mono font-bold"
              style={{ background: `${project.color}25`, border: `1px solid ${project.color}50`, color: "var(--t-text)" }}>{project.metric}</div>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-display font-bold text-lg leading-tight" style={{ color: "var(--t-text)" }}>{project.title}</h3>
            <div className="flex gap-2 shrink-0">
              {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--t-muted)" }} className="hover:opacity-80 p-1" onClick={e => e.stopPropagation()}><GithubIcon size={16} /></a>}
              {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--t-muted)" }} className="hover:opacity-80 p-1" onClick={e => e.stopPropagation()}><ExternalLink size={16} /></a>}
            </div>
          </div>
          <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: "var(--t-muted)" }}>{project.description}</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.stack.slice(0, 4).map(s => <span key={s} className="px-2 py-0.5 rounded-md text-[11px] font-mono" style={{ border: `1px solid var(--t-accent2)20`, color: "var(--t-accent)", opacity: 0.8 }}>{s}</span>)}
            {project.stack.length > 4 && <span className="px-2 py-0.5 rounded-md text-[11px] font-mono" style={{ border: `1px solid var(--t-border)`, color: "var(--t-muted)" }}>+{project.stack.length - 4}</span>}
          </div>
          {stats && (
            <div className="flex items-center gap-4 text-xs font-mono border-t pt-3" style={{ borderColor: "var(--t-border)", color: "var(--t-muted)" }}>
              {stats.stars > 0 && <span className="flex items-center gap-1"><Star size={11} /> {stats.stars}</span>}
              {stats.forks > 0 && <span className="flex items-center gap-1"><GitFork size={11} /> {stats.forks}</span>}
              {stats.language && <span>{stats.language}</span>}
            </div>
          )}
        </div>
        <div className="absolute inset-0 rounded-2xl border opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ borderColor: `${project.color}50` }} />
      </motion.div>
    </Tippy>
  );
}

export function Projects() {
  const { data: dbProjects } = useFirestoreCollection<any>("projects");
  const displayProjects = dbProjects.length > 0 ? dbProjects : staticProjects;

  const [filter, setFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const reposToFetch = displayProjects.filter(p => p.githubUrl).map(p => p.slug);
  const { data: liveStats } = useGithubStats(reposToFetch);
  const filtered = displayProjects.filter(p => { if (filter === "All") return true; if (filter === "Featured") return p.featured; return (p.stack || []).some((s: string) => s.toLowerCase().includes(filter.toLowerCase())) || p.description.toLowerCase().includes(filter.toLowerCase()); });
  const visible = showAll ? filtered : filtered.slice(0, 6);
  const hexParticles = Array.from({ length: 12 }, (_) => ({ top: `${5 + Math.random() * 85}%`, left: `${5 + Math.random() * 90}%` }));

  return (
    <section id="projects" data-section="projects" className="relative py-28 section-bg-projects">
      <div className="absolute inset-0 mesh-grid pointer-events-none" />
      {hexParticles.map((p, i) => <HexParticle key={i} style={{ top: p.top, left: p.left }} />)}
      <FloatingCloud style={{ top: "5%", left: "-3%", color: "var(--t-accent2)" }} size={260} />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-16">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.25em] mb-4" style={{ color: "var(--t-accent)" }}>03 — Projects</p>
          <h2 className="hud-scan font-display text-4xl sm:text-5xl font-bold mb-4" style={{ color: "var(--t-text)" }}>
            <TextBlowOut text="Things I've" delay={0.1} />{" "}<span style={{ color: "var(--t-accent)" }}><TextBlowOut text="shipped." delay={0.4} /></span>
          </h2>
          <p className="text-lg max-w-xl mb-4" style={{ color: "var(--t-muted)" }}>Real projects, real users, real impact — from IoT hardware to AI-assisted tools.</p>
          <GlowLine width="200px" />
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-10">
          {PROJECT_TYPES.map(type => (
            <button key={type} onClick={() => { setFilter(type); setShowAll(false); }}
              className={cn("px-4 py-2 rounded-full text-sm font-mono transition-all duration-200", filter === type ? "" : "glass")}
              style={filter === type ? { background: `var(--t-accent)20`, border: `1px solid var(--t-accent)60`, color: "var(--t-text)", boxShadow: `0 0 15px var(--t-accent)25` } : { color: "var(--t-muted)" }}>
              {type}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => <ProjectCard key={project.id} project={project} stats={liveStats?.[project.slug]} index={i} />)}
          </AnimatePresence>
        </div>

        {!showAll && filtered.length > 6 && (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex justify-center mt-12">
            <button onClick={() => setShowAll(true)} className="group flex items-center gap-2 px-8 py-4 rounded-xl glass font-semibold transition-all duration-300" style={{ color: "var(--t-accent)" }}>
              <Eye size={18} /> View All {filtered.length} Projects <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex justify-center mt-8">
          <a href="https://github.com/Prograto" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-mono transition-colors" style={{ color: "var(--t-muted)" }}>
            <GithubIcon size={16} /> See everything on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
