import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Tippy from "@/components/ui/Tippy";
import { useProfile } from "@/hooks/useProfile";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { TextBlowOut, TextReveal, SectionDivider, GlowLine, FloatingCloud, CountUp } from "@/components/StoryEffects";

function AscendingParticle({ delay, x }: { delay: number; x: number }) {
  return (
    <motion.div className="absolute w-1 h-1 rounded-full"
      style={{ left: `${x}%`, bottom: 0, background: "var(--t-accent)", opacity: 0.1 }}
      animate={{ y: [0, -600], opacity: [0, 0.3, 0] }}
      transition={{ repeat: Infinity, duration: 6 + Math.random() * 4, delay, ease: "easeOut" }} />
  );
}

export function About() {
  const { profile } = useProfile();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rawY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y = useSpring(rawY, { stiffness: 60, damping: 20 });
  const { settings } = useSiteSettings();
  const particles = Array.from({ length: 15 }, (_, i) => ({ delay: i * 0.5, x: 5 + Math.random() * 90 }));

  return (
    <section id="about" data-section="about" ref={ref} className="relative py-28 overflow-hidden section-bg-about">
      <div className="absolute inset-0 mesh-grid pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => <AscendingParticle key={i} delay={p.delay} x={p.x} />)}
      </div>
      <FloatingCloud style={{ top: "5%", right: "0%", color: "var(--t-accent)" }} size={280} />
      <FloatingCloud style={{ bottom: "10%", left: "-5%", color: "var(--t-accent2)" }} size={220} />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }} className="relative flex justify-center perspective-1000">
            <Tippy content="The pilot. Narsapur → the tech world." theme="flight-log" animation="shift-away" delay={[300, 100]} maxWidth={220}>
              <div className="relative w-64 h-80 sm:w-80 sm:h-96">
                <div className="absolute inset-0 rounded-2xl blur-3xl" style={{ background: `linear-gradient(135deg, var(--t-accent)25, var(--t-accent2)15)` }} />
                <img src={profile.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=face"} alt={profile.name}
                  className="relative w-full h-full object-cover object-top rounded-2xl border" style={{ borderColor: `var(--t-accent)40` }} />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>
            </Tippy>
            {/* Animated stat counters */}
            {settings.aboutStats.map((s, i) => {
              const pos = ["top-4 -right-12","top-1/3 -left-12","bottom-1/3 -right-14","bottom-4 -left-10"];
              return (
                <motion.div key={s.label} animate={{ y: [i%2===0?-8:8, i%2===0?8:-8, i%2===0?-8:8] }}
                  transition={{ repeat: Infinity, duration: 3 + i * 0.7, ease: "easeInOut" }}
                  className={`absolute ${pos[i]} glass-hi rounded-xl px-3 py-2`}>
                  <p className="font-display font-bold text-lg leading-none" style={{ color: "var(--t-text)" }}>
                    <CountUp target={s.num} suffix={s.suffix} />
                  </p>
                  <p className="font-mono text-[10px] mt-0.5" style={{ color: "var(--t-muted)" }}>{s.label}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Text */}
          <div>
            <motion.p initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="font-mono text-xs uppercase tracking-[0.25em] mb-4" style={{ color: "var(--t-accent)" }}>01 — About</motion.p>

            <h2 className="hud-scan font-display text-4xl sm:text-5xl font-bold leading-tight mb-4" style={{ color: "var(--t-text)" }}>
              <TextBlowOut text="Backend-first," delay={0.1} /><br />
              <span className="text-gradient"><TextBlowOut text="by choice." delay={0.4} /></span>
            </h2>

            <motion.p initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.12 }}
              className="font-mono text-sm mb-5 italic" style={{ color: "var(--t-accent)", opacity: 0.6 }}>
              "2022. A young engineer from Narsapur begins climbing."
            </motion.p>

            {profile.bio.map((para, i) => (
              <motion.p key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.16 + i * 0.08 }}
                className="text-base leading-relaxed mb-4" style={{ color: "var(--t-muted)" }}>{para}</motion.p>
            ))}

            <GlowLine className="my-6" />

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
              className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--t-accent)", opacity: 0.4 }}>
              <TextReveal text="Narsapur → IndoNalandaTech → Google AI/ML → Building the future" delay={0.2} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
