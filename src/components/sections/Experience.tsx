import { motion } from "framer-motion";
import Tippy from "@/components/ui/Tippy";
import { useFirestoreCollection } from "@/hooks/useFirestore";
import { experience as staticExperience } from "@/data/experience";
import { freelanceClients as staticFreelance } from "@/data/freelance";
import { SectionDivider, WipeReveal, TextBlowOut, FloatingCloud } from "@/components/StoryEffects";

const STORY_CLOUDS: Record<string, string> = {
  "indonalandatech": "IndoNalandaTech: First real runway. Built full-stack systems at 10,000ft.",
  "vjtha-learning": "VJtha Learning: Coded 2D worlds while the real one kept spinning.",
  "sda-hospital": "SDA Hospital: Where uptime means patients seen. Real stakes.",
  "zidi": "ZIDI Startup: Early-stage chaos. Ship fast, learn faster.",
  "hilux": "Hilux Startup: End-to-end delivery. No room for excuses at altitude.",
};

function TimelineItem({ item, index }: { item: typeof staticExperience[number]; index: number }) {
  return (
    <Tippy content={STORY_CLOUDS[item.id] || item.summary} theme="flight-log" animation="shift-away" arrow delay={[300, 100]} maxWidth={220}>
      <motion.div
        initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40, scale: 0.95 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative"
      >
        <div className="glass-hi rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 group" style={{ borderColor: `var(--t-accent)10` }}>
          <div className="absolute -top-3 -left-3 w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold"
            style={{ background: `var(--t-accent)20`, border: `1px solid var(--t-accent)50`, color: "var(--t-accent)" }}>
            {String(index + 1).padStart(2, "0")}
          </div>
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: "var(--t-accent)" }}>{item.type}</p>
              <h3 className="font-display text-xl font-bold" style={{ color: "var(--t-text)" }}>{item.organization}</h3>
              <p className="font-mono text-sm mt-0.5" style={{ color: "var(--t-accent)", opacity: 0.7 }}>{item.role}</p>
            </div>
            {item.duration && <span className="shrink-0 font-mono text-xs border rounded-lg px-3 py-1.5" style={{ color: "var(--t-muted)", borderColor: "var(--t-border)" }}>{item.duration}</span>}
          </div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--t-muted)" }}>{item.summary}</p>
          <ul className="space-y-1.5 mb-4">
            {(item.highlights || []).map((h: string) => (
              <li key={h} className="flex gap-2 text-sm" style={{ color: "var(--t-muted)" }}>
                <span className="mt-0.5 shrink-0" style={{ color: "var(--t-accent)" }}>▹</span>{h}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            {(item.stack || []).map((s: string) => (
              <span key={s} className="px-2.5 py-1 rounded-lg text-xs font-mono" style={{ border: `1px solid var(--t-accent)20`, color: "var(--t-accent)", opacity: 0.7 }}>{s}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </Tippy>
  );
}

function FreelanceItem({ client }: { client: typeof staticFreelance[number] }) {
  return (
    <Tippy content={STORY_CLOUDS[client.id] || client.summary} theme="flight-log" animation="shift-away" arrow delay={[300, 100]} maxWidth={220}>
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <div className="glass rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300" style={{ borderColor: `var(--t-accent)10` }}>
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: "var(--t-accent)" }}>{client.category}</p>
              <h3 className="font-display text-xl font-bold" style={{ color: "var(--t-text)" }}>{client.client}</h3>
            </div>
            {client.link && (
              <a href={client.link} target="_blank" rel="noopener noreferrer" style={{ color: "var(--t-muted)" }} className="hover:opacity-80">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
              </a>
            )}
          </div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--t-muted)" }}>{client.summary}</p>
          <div className="flex flex-wrap gap-2">
            {(client.stack || []).map((s: string) => (
              <span key={s} className="px-2.5 py-1 rounded-lg text-xs font-mono" style={{ border: `1px solid var(--t-accent)20`, color: "var(--t-accent)", opacity: 0.7 }}>{s}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </Tippy>
  );
}

export function Experience() {
  const { data: dbExperience } = useFirestoreCollection<any>("experience");
  const { data: dbFreelance } = useFirestoreCollection<any>("freelanceClients");

  const displayExperience = dbExperience.length > 0 ? dbExperience : staticExperience;
  const displayFreelance = dbFreelance.length > 0 ? dbFreelance : staticFreelance;

  return (
    <section id="experience" data-section="experience" className="relative py-28 overflow-hidden section-bg-experience">
      <div className="absolute inset-0 mesh-grid pointer-events-none" />
      <FloatingCloud style={{ top: "8%", right: "-3%", color: "var(--t-accent)" }} size={240} />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-16">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.25em] mb-4" style={{ color: "var(--t-accent)" }}>02 — Experience</p>
          <h2 className="hud-scan font-display text-4xl sm:text-5xl font-bold" style={{ color: "var(--t-text)" }}>
            <TextBlowOut text="Where I've worked" delay={0.1} /><span style={{ color: "var(--t-accent)" }}>.</span>
          </h2>
        </motion.div>

        <WipeReveal>
          <h3 className="font-mono text-xs uppercase tracking-widest mb-6 flex items-center gap-4" style={{ color: "var(--t-muted)" }}>
            <span>Internships</span><div className="flex-1 h-px" style={{ background: `var(--t-accent)25` }} />
          </h3>
        </WipeReveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {displayExperience.map((item, i) => <TimelineItem key={item.id} item={item} index={i} />)}
        </div>

        <SectionDivider className="my-12" />

        <WipeReveal delay={0.1}>
          <h3 className="font-mono text-xs uppercase tracking-widest mb-6 flex items-center gap-4" style={{ color: "var(--t-muted)" }}>
            <span>Freelance Clients</span><div className="flex-1 h-px" style={{ background: `var(--t-accent)25` }} />
          </h3>
        </WipeReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayFreelance.map((client) => <FreelanceItem key={client.id} client={client} />)}
        </div>
      </div>
    </section>
  );
}
