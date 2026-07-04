import { motion } from "framer-motion";
import { ArrowRight, Code, Lightbulb, Cpu, Rocket } from "lucide-react";
import { services } from "@/data/services";
import { GlowLine } from "@/components/StoryEffects";

const ICONS = { code: Code, lightbulb: Lightbulb, cpu: Cpu, rocket: Rocket };

function ServiceCard({ service, index }: { service: typeof services[number]; index: number }) {
  const Icon = ICONS[service.iconName];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 1, 0.5, 1] }}
      whileHover={{ y: -4 }}
      className="group relative rounded-2xl overflow-hidden"
      style={{ background: "var(--t-surface)", border: `1px solid var(--t-border)` }}
    >
      {/* Top accent line */}
      <div className="h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${service.color}, transparent)` }} />

      <div className="p-6">
        {/* Icon */}
        <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
          style={{ background: `${service.color}12`, border: `1px solid ${service.color}25` }}>
          <Icon size={20} style={{ color: service.color }} />
        </div>

        <h3 className="font-display text-lg font-bold mb-1" style={{ color: "var(--t-text)" }}>{service.title}</h3>
        <p className="font-mono text-[11px] mb-4" style={{ color: service.color }}>{service.tagline}</p>
        <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--t-muted)" }}>{service.description}</p>

        <ul className="space-y-1.5 mb-5">
          {service.features.map(f => (
            <li key={f} className="flex items-start gap-2 text-[13px]" style={{ color: "var(--t-muted)" }}>
              <span className="mt-1 w-1 h-1 rounded-full shrink-0" style={{ background: service.color }} />
              {f}
            </li>
          ))}
        </ul>

        <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          className="group/btn flex items-center gap-1.5 font-mono text-xs transition-all" style={{ color: service.color }}>
          Discuss this <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" data-section="services" className="relative py-24 overflow-hidden section-bg-services">
      <div className="absolute inset-0 mesh-grid pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-16">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.25em] mb-3" style={{ color: "var(--t-accent)" }}>What I Offer</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3" style={{ color: "var(--t-text)" }}>
            Services & Expertise
          </h2>
          <p className="text-base max-w-lg" style={{ color: "var(--t-muted)" }}>
            From architecture to deployment — the full lifecycle.
          </p>
          <GlowLine width="120px" className="mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
        </div>
      </div>
    </section>
  );
}
