import { useRef } from "react";
import { motion } from "framer-motion";
import { useProfile } from "@/hooks/useProfile";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { TextBlowOut, TextReveal, GlowLine, FloatingCloud, CountUp } from "@/components/StoryEffects";

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
          {/* Terminal Console replacing repetitive avatar image */}
          <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }} className="relative flex justify-center w-full perspective-1000">
            
            <div className="relative w-full max-w-[340px] sm:max-w-md h-[380px] rounded-2xl border overflow-hidden backdrop-blur-md bg-black/60 shadow-2xl flex flex-col font-mono text-[11px] leading-relaxed" style={{ borderColor: `var(--t-accent)40` }}>
              <div className="absolute inset-0 rounded-2xl blur-3xl -z-10" style={{ background: `linear-gradient(135deg, var(--t-accent)25, var(--t-accent2)15)` }} />
              
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-black/40 border-b border-white/5">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <span className="text-[10px] text-white/40 tracking-wider">prograto@sys-core:~</span>
                <span className="w-10" />
              </div>

              {/* Terminal Content */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-none text-left">
                {/* neofetch info */}
                <div className="space-y-0.5 text-white/70">
                  <p><span style={{ color: "var(--t-accent)" }}>root@prograto:~$</span> neofetch</p>
                  <p style={{ color: "var(--t-accent)" }}>=================================</p>
                  <p><span className="text-white/40 font-bold">Host:</span> {profile.name}</p>
                  <p><span className="text-white/40 font-bold">Role:</span> {profile.role}</p>
                  <p><span className="text-white/40 font-bold">Base:</span> {profile.location}</p>
                  <p><span className="text-white/40 font-bold">Stack:</span> TypeScript / Go / Python / SQL</p>
                  <p><span className="text-white/40 font-bold">Contact:</span> {profile.email}</p>
                </div>

                {/* System Metrics */}
                <div className="border-t border-white/5 pt-3 space-y-2">
                  <div className="flex items-center justify-between text-white/50 text-[10px]">
                    <span>PROCESSOR LOAD</span>
                    <span style={{ color: "var(--t-accent)" }}>ACTIVE</span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div className="h-full rounded-full" style={{ background: "var(--t-accent)" }}
                      animate={{ width: ["32%", "74%", "45%", "89%", "55%", "32%"] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
                  </div>

                  <div className="flex items-center justify-between text-white/50 text-[10px]">
                    <span>PIPELINE CAPACITY</span>
                    <span style={{ color: "var(--t-accent2)" }}>OPTIMAL</span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div className="h-full rounded-full" style={{ background: "var(--t-accent2)" }}
                      animate={{ width: ["82%", "85%", "81%", "87%", "84%", "82%"] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
                  </div>
                </div>

                {/* Logs Output */}
                <div className="space-y-0.5 border-t border-white/5 pt-3 text-[10px] text-white/50">
                  <p style={{ color: "var(--t-accent)" }}>root@prograto:~$ ./run_diagnostics</p>
                  <p className="text-green-400/80">[OK] Connected database client</p>
                  <p className="text-green-400/80">[OK] AI inference pipeline loaded</p>
                  <p className="text-blue-400/80">[INF] Narsapur launchpad system operational</p>
                  <p className="text-green-400/80">[OK] Drone navigation trail tracking...</p>
                </div>
              </div>
            </div>

            {/* Animated stat counters */}
            {settings.aboutStats.map((s, i) => {
              const pos = ["top-4 -right-12","top-1/3 -left-12","bottom-1/3 -right-14","bottom-4 -left-10"];
              return (
                <motion.div key={s.label} animate={{ y: [i%2===0?-8:8, i%2===0?8:-8, i%2===0?-8:8] }}
                  transition={{ repeat: Infinity, duration: 3 + i * 0.7, ease: "easeInOut" }}
                  className={`absolute ${pos[i]} glass-hi rounded-xl px-3 py-2 z-15`}>
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
