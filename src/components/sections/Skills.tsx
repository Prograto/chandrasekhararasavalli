import { motion } from "framer-motion";
import Tippy from "@/components/ui/Tippy";
import { useFirestoreCollection } from "@/hooks/useFirestore";
import { skillCategories as staticSkillCategories } from "@/data/skills";
import { TextBlowOut, FloatingCloud } from "@/components/StoryEffects";

const SKILL_STORIES: Record<string, string> = {
  Python:"The autopilot. Runs when you're not looking.", React:"The cockpit glass — everything the user sees.",
  FastAPI:"Turbine. 1000 requests, no sweat.", AWS:"Ground control. Always watching.",
  Flask:"The original engine. Battle-tested.", Docker:"Cargo container. Pack once, ship anywhere.",
  MongoDB:"The black box. Every flight recorded.", JavaScript:"Co-pilot. Sometimes unpredictable.",
  TypeScript:"The flight manual. No guessing allowed.", Linux:"The runway. Everything launches from here.",
  OpenCV:"Eyes of the aircraft. Sees what humans miss.", Firebase:"Mission control relay. Real-time comms.",
};

function SkillBar({ name, level, color, index }: { name: string; level: number; color: string; index: number }) {
  return (
    <Tippy content={SKILL_STORIES[name] || `${name}: Part of the instrument cluster.`} theme="flight-log" animation="shift-away" delay={[300, 100]} maxWidth={220}>
      <div className="mb-3 cursor-default">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm" style={{ color: "var(--t-text)", opacity: 0.8 }}>{name}</span>
          <span className="font-mono text-xs" style={{ color }}>{level}%</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--t-border)" }}>
          <motion.div className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.06, ease: [0.25, 1, 0.5, 1] }} />
        </div>
      </div>
    </Tippy>
  );
}

function RadarOverlay() {
  return (
    <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none opacity-20">
      <motion.div className="absolute inset-0" style={{ background: "conic-gradient(from 0deg, var(--t-accent)12 0deg, transparent 60deg, transparent 360deg)" }}
        animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} />
    </div>
  );
}

export function Skills() {
  const { data: dbSkillCategories } = useFirestoreCollection<any>("skillCategories");
  const displayCategories = dbSkillCategories.length > 0 ? dbSkillCategories : staticSkillCategories;

  return (
    <section id="skills" data-section="skills" className="relative py-28 overflow-hidden section-bg-skills">
      <div className="absolute inset-0 mesh-grid pointer-events-none" />
      <FloatingCloud style={{ bottom: "5%", right: "-3%", color: "var(--t-accent)" }} size={220} />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-16">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.25em] mb-4" style={{ color: "var(--t-accent)" }}>04 — Skills</p>
          <h2 className="hud-scan font-display text-4xl sm:text-5xl font-bold" style={{ color: "var(--t-text)" }}>
            <TextBlowOut text="What I work" delay={0.1} /><span style={{ color: "var(--t-accent)" }}><TextBlowOut text=" with." delay={0.4} /></span>
          </h2>
          <p className="text-lg mt-3 max-w-xl" style={{ color: "var(--t-muted)" }}>Grounded in real repos and real client work — not a wishlist.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCategories.map((cat, ci) => (
            <motion.div key={cat.id}
              initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: ci * 0.08 }}
              whileHover={{ y: -4 }}
              className="relative glass-hi rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 overflow-hidden"
              style={{ borderColor: `var(--t-accent)10` }}>
              <RadarOverlay />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl">{cat.icon}</span>
                  <div>
                    <h3 className="font-display font-bold" style={{ color: "var(--t-text)" }}>{cat.label}</h3>
                    <p className="font-mono text-xs" style={{ color: "var(--t-muted)" }}>{(cat.skills || []).length} skills</p>
                  </div>
                </div>
                {(cat.skills || []).map((skill: any, i: number) => <SkillBar key={skill.name} name={skill.name} level={skill.level} color={cat.color} index={i} />)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
