import { motion } from "framer-motion";
import { Trophy, BookOpen, Shield, Award, Heart, CheckCircle } from "lucide-react";
import Tippy from "@/components/ui/Tippy";
import { useFirestoreCollection } from "@/hooks/useFirestore";
import { achievements as staticAchievements } from "@/data/achievements";
import { GlowLine, TextBlowOut, FloatingCloud } from "@/components/StoryEffects";

const CATEGORY_MAP: Record<string, { icon: any; color: string; label: string }> = {
  leadership: { icon: Shield, color: "#ff3cac", label: "Leadership" },
  academic: { icon: BookOpen, color: "#00f5ff", label: "Academic" },
  certification: { icon: Award, color: "#0077cc", label: "Certification" },
  competition: { icon: Trophy, color: "#f59e0b", label: "Competition" },
  community: { icon: Heart, color: "#10b981", label: "Community" },
};

const LOG_MESSAGES: Record<string, string> = {
  "ieee-vice-chair": "[LOG] Commendation recognized: Directed 20+ engineering programs under IEEE.",
  "google-aiml": "[LOG] Performance verified: Selected into Google's premier cohort for AI/ML training.",
  "aws-cloud-practitioner": "[LOG] Systems validation: Confirmed expertise in highly-available architectures.",
  "gate-qualified": "[LOG] Rigor evaluation: Top-tier score in national Computer Science examinations.",
  "nptel-silver": "[LOG] Certified silver: Mastered core algorithms with NPTEL honors.",
  "coding-winner": "[LOG] Competition success: Solved complex algorithmic challenges under strict timers.",
  "project-expo": "[LOG] Prototype demoed: Runner-up in regional engineering exposition.",
  "drone-trainer": "[LOG] Skill dissemination: Instructed 100+ students on UAV flight controllers and telemetry.",
  ncc: "[LOG] Service record: NCC military-grade discipline and survival certification.",
  nss: "[LOG] Community outreach: Volunteer operations successfully deployed.",
};

function AchievementCard({ achievement, index }: { achievement: typeof staticAchievements[number]; index: number }) {
  const cat = CATEGORY_MAP[achievement.category] || { icon: CheckCircle, color: "var(--t-accent)", label: "General" };
  const Icon = cat.icon;

  return (
    <Tippy content={LOG_MESSAGES[achievement.id] || `[LOG] ${achievement.title} verified on telemetry.`} theme="flight-log" animation="shift-away" arrow delay={[300, 100]} maxWidth={250}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
        whileHover={{ y: -5, scale: 1.02 }}
        className="group relative rounded-2xl p-5 overflow-hidden transition-all duration-300 flex flex-col justify-between min-h-[190px]"
        style={{ background: "var(--t-surface)", border: `1px solid var(--t-border)` }}
      >
        {/* Animated Scanner Top Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] opacity-20 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(90deg, transparent, ${cat.color}, transparent)` }} />

        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}35` }}>
                <Icon size={16} style={{ color: cat.color }} />
              </div>
              <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full"
                style={{ background: `${cat.color}10`, color: cat.color }}>
                {cat.label}
              </span>
            </div>
            {achievement.organization && (
              <span className="font-mono text-[10px]" style={{ color: "var(--t-muted)", opacity: 0.7 }}>
                {achievement.organization}
              </span>
            )}
          </div>

          <h3 className="font-display text-base font-bold mb-2 group-hover:text-gradient transition-all" style={{ color: "var(--t-text)" }}>
            {achievement.title}
          </h3>
          <p className="text-xs leading-relaxed" style={{ color: "var(--t-muted)" }}>
            {achievement.description}
          </p>
        </div>
      </motion.div>
    </Tippy>
  );
}

export function Achievements() {
  const { data: dbAchievements } = useFirestoreCollection<any>("achievements");
  const displayAchievements = dbAchievements.length > 0 ? dbAchievements : staticAchievements;

  return (
    <section id="achievements" data-section="achievements" className="relative py-28 overflow-hidden section-bg-achievements">
      <div className="absolute inset-0 mesh-grid pointer-events-none" />
      
      {/* Visual background cloud effects */}
      <FloatingCloud style={{ top: "10%", left: "-5%", color: "var(--t-accent)" }} size={280} />
      <FloatingCloud style={{ bottom: "5%", right: "-5%", color: "var(--t-accent2)" }} size={220} />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-16">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16 text-center sm:text-left">
          <p className="font-mono text-xs uppercase tracking-[0.25em] mb-4" style={{ color: "var(--t-accent)" }}>06 — Accomplishments</p>
          <h2 className="hud-scan font-display text-4xl sm:text-5xl font-bold mb-4" style={{ color: "var(--t-text)" }}>
            <TextBlowOut text="Milestones &" delay={0.1} /> <span style={{ color: "var(--t-accent)" }}><TextBlowOut text="Awards." delay={0.4} /></span>
          </h2>
          <p className="text-base max-w-lg" style={{ color: "var(--t-muted)" }}>Leadership, competitions, community service, and technical certifications.</p>
          <GlowLine width="120px" className="mt-4 sm:mx-0 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayAchievements.map((item, i) => (
            <AchievementCard key={item.id} achievement={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
