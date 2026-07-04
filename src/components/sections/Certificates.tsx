import { useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Pagination, Navigation, Autoplay } from "swiper/modules";
import { Award, Calendar, ExternalLink } from "lucide-react";
import { certificates } from "@/data/certificates";
import { GlowLine } from "@/components/StoryEffects";

function CertCard({ cert }: { cert: typeof certificates[number] }) {
  return (
    <div className="relative h-80 rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing select-none"
      style={{ background: "var(--t-surface)", border: `1px solid var(--t-border)` }}>
      {/* Background image — subtle */}
      <img src={cert.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-10" draggable={false} />
      <div className="absolute inset-0" style={{ background: `linear-gradient(to top, var(--t-surface) 30%, var(--t-surface)cc 60%, transparent)` }} />

      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)` }} />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-6">
        <div>
          <div className="flex items-center justify-between mb-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl"
              style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}30` }}>
              <Award size={20} style={{ color: cert.color }} />
            </div>
            {cert.credentialUrl && (
              <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer"
                className="transition-colors p-1" style={{ color: "var(--t-muted)" }}
                onClick={e => e.stopPropagation()}>
                <ExternalLink size={15} />
              </a>
            )}
          </div>
          <h3 className="font-display text-xl font-bold leading-tight mb-2" style={{ color: "var(--t-text)" }}>
            {cert.title}
          </h3>
          <p className="font-mono text-sm" style={{ color: "var(--t-muted)" }}>{cert.issuer}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 font-mono text-xs" style={{ color: "var(--t-muted)", opacity: 0.6 }}>
            <Calendar size={12} /> {cert.date}
          </span>
          <span className="px-3 py-1 rounded-full font-mono text-[11px] font-medium"
            style={{ background: `${cert.color}12`, color: cert.color, border: `1px solid ${cert.color}25` }}>
            Verified
          </span>
        </div>
      </div>
    </div>
  );
}

export function Certificates() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="certificates" data-section="certificates" ref={sectionRef}
      className="relative py-24 overflow-hidden section-bg-certificates">
      <div className="absolute inset-0 mesh-grid pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-16">
        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.25em] mb-3" style={{ color: "var(--t-accent)" }}>
            Credentials
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3" style={{ color: "var(--t-text)" }}>
            Certified & Recognized
          </h2>
          <p className="text-base max-w-md mx-auto" style={{ color: "var(--t-muted)" }}>
            Cloud, AI, leadership — swipe through the stack.
          </p>
          <GlowLine width="100px" className="mt-4 mx-auto" />
        </motion.div>

        {/* Swiper */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}>
          <Swiper
            effect="cards"
            grabCursor
            modules={[EffectCards, Pagination, Navigation, Autoplay]}
            pagination={{ clickable: true }}
            navigation
            autoplay={{ delay: 4000, disableOnInteraction: true, pauseOnMouseEnter: true }}
            className="w-full max-w-sm mx-auto !pb-12"
            cardsEffect={{ perSlideOffset: 8, perSlideRotate: 3, rotate: true, slideShadows: false }}
          >
            {certificates.map(cert => (
              <SwiperSlide key={cert.id}><CertCard cert={cert} /></SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <div className="flex justify-center mt-2">
          <p className="font-mono text-[11px]" style={{ color: "var(--t-muted)", opacity: 0.5 }}>
            {certificates.length} certifications — drag or use arrows
          </p>
        </div>
      </div>
    </section>
  );
}
