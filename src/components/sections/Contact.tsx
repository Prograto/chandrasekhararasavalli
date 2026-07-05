import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, useInView } from "framer-motion";
import { Send, CheckCircle2, MapPin, Mail } from "lucide-react";
import { WhatsappIcon } from "@/components/ui/BrandIcons";
import { useProfile } from "@/hooks/useProfile";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { submitContactForm } from "@/lib/contact";
import type { ContactFormValues } from "@/types";
import { cn } from "@/lib/utils";
import { TextBlowOut, FloatingCloud, GlowLine } from "@/components/StoryEffects";

function RunwayLines() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <motion.div key={i} className="absolute h-[1px]"
          style={{
            top: `${25 + i * 7}%`,
            left: i % 2 === 0 ? 0 : undefined, right: i % 2 !== 0 ? 0 : undefined,
            width: `${12 + i * 3}%`,
            background: `linear-gradient(${i % 2 === 0 ? "90deg" : "-90deg"}, transparent, var(--t-accent)30)`,
            transformOrigin: i % 2 === 0 ? "right" : "left",
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 + i * 0.08 }} />
      ))}
    </div>
  );
}

export function Contact() {
  const { profile } = useProfile();
  const [submittedName, setSubmittedName] = useState<string | null>(null);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormValues>();
  const { settings } = useSiteSettings();

  async function onSubmit(values: ContactFormValues) {
    await submitContactForm(values, profile.whatsapp);
    setSubmittedName(values.name);
    reset();
  }

  const inputClass = "w-full rounded-xl px-4 py-3 text-sm placeholder:opacity-40 outline-none transition-all duration-200 font-sans";

  return (
    <section id="contact" data-section="contact" className="relative py-28 overflow-hidden section-bg-contact">
      <RunwayLines />
      <FloatingCloud style={{ top: "10%", right: "-3%", color: "var(--t-accent)" }} size={200} />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-16">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.25em] mb-4" style={{ color: "var(--t-accent)" }}>06 — Contact</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4" style={{ color: "var(--t-text)" }}>
            <TextBlowOut text="Let's build something" delay={0.1} /><br />
            <span style={{ color: "var(--t-accent)" }}><TextBlowOut text="that doesn't break." delay={0.5} /></span>
          </h2>
          <p className="text-lg max-w-lg mx-auto" style={{ color: "var(--t-muted)" }}>Available for freelance, internships, and full-time roles.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Sidebar */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-2 space-y-4">
            <div className="glass-hi rounded-2xl p-6">
              <h3 className="font-display font-bold mb-5" style={{ color: "var(--t-text)" }}>Get in touch</h3>
              <div className="space-y-4">
                <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-sm transition-colors" style={{ color: "var(--t-muted)" }}>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: `var(--t-accent)15`, border: `1px solid var(--t-accent)30` }}><Mail size={15} style={{ color: "var(--t-accent)" }} /></div>
                  {profile.email}
                </a>
                <a href={`https://wa.me/${profile.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-green-400 transition-colors">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-500/10 border border-green-500/30"><WhatsappIcon size={15} /></div>
                  WhatsApp chat
                </a>
                <div className="flex items-center gap-3 text-sm" style={{ color: "var(--t-muted)" }}>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: `var(--t-accent)15`, border: `1px solid var(--t-accent)30` }}><MapPin size={15} style={{ color: "var(--t-accent)" }} /></div>
                  {profile.location}
                </div>
              </div>
            </div>
            <a href={`https://wa.me/${profile.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hi Chandra! I came from your portfolio and would like to discuss a project.")}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-2xl bg-green-600 hover:bg-green-500 text-white font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]">
              <WhatsappIcon size={20} /> Message me on WhatsApp
            </a>
          </motion.div>

          {/* Form / Acknowledgement Card */}
          {submittedName ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3 glass-hi rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-6"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 border border-green-500/30 text-green-400">
                <CheckCircle2 size={36} />
              </div>
              <div className="space-y-3">
                <h3 className="font-display text-2xl font-bold" style={{ color: "var(--t-text)" }}>
                  Message Sent!
                </h3>
                <p className="text-sm max-w-md mx-auto leading-relaxed" style={{ color: "var(--t-muted)" }}>
                  Thank you, <span className="font-semibold" style={{ color: "var(--t-text)" }}>{submittedName}</span>! Your message has been sent to <span className="font-semibold" style={{ color: "var(--t-accent)" }}>Chandra Sekhar Arasavalli (Prograto)</span>.
                </p>
                <p className="text-xs" style={{ color: "var(--t-muted)", opacity: 0.7 }}>
                  A backup WhatsApp message has been generated to notify me instantly.
                </p>
              </div>
              <button
                onClick={() => setSubmittedName(null)}
                className="px-6 py-2.5 rounded-xl text-xs font-mono transition-all border hover:bg-white/5"
                style={{ borderColor: "var(--t-border)", color: "var(--t-text)" }}
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <motion.form initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
              onSubmit={handleSubmit(onSubmit)} className="lg:col-span-3 glass-hi rounded-2xl p-8 space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <input {...register("name", { required: "Name is required" })} placeholder="Your name *"
                    className={cn(inputClass, errors.name && "border-red-400/60")}
                    style={{ background: "var(--t-surface)", border: `1px solid var(--t-border)`, color: "var(--t-text)" }} />
                  {errors.name && <p className="mt-1 text-xs text-red-400 font-mono">{errors.name.message}</p>}
                </div>
                <div>
                  <input {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" } })}
                    type="email" placeholder="Email address *"
                    className={cn(inputClass, errors.email && "border-red-400/60")}
                    style={{ background: "var(--t-surface)", border: `1px solid var(--t-border)`, color: "var(--t-text)" }} />
                  {errors.email && <p className="mt-1 text-xs text-red-400 font-mono">{errors.email.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input {...register("phone")} placeholder="Phone (optional)" className={inputClass} style={{ background: "var(--t-surface)", border: `1px solid var(--t-border)`, color: "var(--t-text)" }} />
                <input {...register("subject")} placeholder="Subject" className={inputClass} style={{ background: "var(--t-surface)", border: `1px solid var(--t-border)`, color: "var(--t-text)" }} />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: "var(--t-muted)" }}>Project type</p>
                <div className="flex flex-wrap gap-2">
                  {settings.projectTypes.map(type => (
                    <label key={type} className="cursor-pointer">
                      <input type="radio" {...register("projectType")} value={type} className="sr-only peer" />
                      <span className="block px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer peer-checked:opacity-100"
                        style={{ border: `1px solid var(--t-border)`, color: "var(--t-muted)" }}>{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: "var(--t-muted)" }}>Budget range</p>
                <div className="flex flex-wrap gap-2">
                  {settings.budgets.map(b => (
                    <label key={b} className="cursor-pointer">
                      <input type="radio" {...register("budget")} value={b} className="sr-only peer" />
                      <span className="block px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer"
                        style={{ border: `1px solid var(--t-border)`, color: "var(--t-muted)" }}>{b}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <textarea {...register("message", { required: "Message is required", minLength: { value: 10, message: "A bit more detail, please" } })}
                  placeholder="Tell me about your project or idea *" rows={4}
                  className={cn(inputClass, "resize-none", errors.message && "border-red-400/60")}
                  style={{ background: "var(--t-surface)", border: `1px solid var(--t-border)`, color: "var(--t-text)" }} />
                {errors.message && <p className="mt-1 text-xs text-red-400 font-mono">{errors.message.message}</p>}
              </div>
              <div className="flex items-center gap-4">
                <button type="submit" disabled={isSubmitting}
                  className="group flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold transition-all duration-300"
                  style={{ background: "var(--t-accent)", color: "var(--t-bg)" }}>
                  <Send size={16} /> {isSubmitting ? "Sending…" : "Send Message"}
                </button>
              </div>
              <GlowLine className="mt-4" />
              <p className="text-xs" style={{ color: "var(--t-muted)", opacity: 0.5 }}>Message saves to my dashboard + opens WhatsApp so I get notified instantly.</p>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}
