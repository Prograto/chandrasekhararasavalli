import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Horizontal wipe reveal — content sweeps in from left via clip-path */
export function WipeReveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.25, 1, 0.5, 1] }}
      className={className}
    >{children}</motion.div>
  );
}

/** Text blow-out — letters scale up from 0 and spread out */
export function TextBlowOut({ text, className = "", delay = 0 }: {
  text: string; className?: string; delay?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block mr-[0.25em]">
          {word.split("").map((char, ci) => (
            <motion.span
              key={ci}
              className="inline-block"
              initial={{ opacity: 0, scale: 3, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: delay + wi * 0.08 + ci * 0.03,
                ease: [0.16, 1, 0.3, 1],
              }}
            >{char}</motion.span>
          ))}
        </span>
      ))}
    </span>
  );
}

/** Text fade-slide — each word fades up with a stagger */
export function TextReveal({ text, className = "", delay = 0 }: {
  text: string; className?: string; delay?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: delay + i * 0.05, ease: [0.25, 1, 0.5, 1] }}
          >{word}</motion.span>
        </span>
      ))}
    </span>
  );
}

/** Counter that counts up when scrolled into view */
export function CountUp({ target, suffix = "", className = "" }: {
  target: number; suffix?: string; className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    gsap.fromTo({ val: 0 }, { val: target }, {
      val: target, duration: 2, ease: "power2.out",
      onUpdate() { el.textContent = `${Math.round(this.targets()[0].val)}${suffix}`; },
    });
  }, [inView, target, suffix]);
  return <span ref={ref} className={className}>0{suffix}</span>;
}

/** Parallax layer — moves at a different speed than scroll */
export function ParallaxLayer({ children, speed = 0.3, className = "" }: {
  children: React.ReactNode; speed?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * -100}px`, `${speed * 100}px`]);
  return <motion.div ref={ref} style={{ y }} className={className}>{children}</motion.div>;
}

/** Animated horizontal line that draws in */
export function SectionDivider({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`h-[1px] ${className}`}
      style={{ background: "var(--accent-glow)", opacity: 0.2 }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
    />
  );
}

/** Glowing accent line */
export function GlowLine({ width = "100%", className = "" }: { width?: string; className?: string }) {
  return (
    <motion.div
      className={`h-[2px] rounded-full ${className}`}
      style={{ width, background: `linear-gradient(90deg, transparent, var(--accent-glow), transparent)`, opacity: 0.4 }}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 0.4 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    />
  );
}

/** Section intro wrapper — fades + slides content in */
export function SectionIntro({ children, className = "", direction = "up" }: {
  children: React.ReactNode; className?: string; direction?: "up" | "left" | "right";
}) {
  const v = {
    up:    { initial: { opacity: 0, y: 60 },  animate: { opacity: 1, y: 0 } },
    left:  { initial: { opacity: 0, x: -80 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: 80 },  animate: { opacity: 1, x: 0 } },
  };
  return (
    <motion.div
      {...v[direction]}
      whileInView={v[direction].animate}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      className={className}
    >{children}</motion.div>
  );
}

/** Floating cloud decoration for section backgrounds */
export function FloatingCloud({ style, size = 200 }: { style?: React.CSSProperties; size?: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none opacity-[0.04]"
      style={style}
      animate={{ x: [-10, 10, -10], y: [-5, 5, -5] }}
      transition={{ repeat: Infinity, duration: 12 + Math.random() * 8, ease: "easeInOut" }}
    >
      <svg width={size} height={size * 0.5} viewBox="0 0 200 100">
        <ellipse cx="60" cy="70" rx="50" ry="25" fill="currentColor" />
        <ellipse cx="100" cy="55" rx="60" ry="35" fill="currentColor" />
        <ellipse cx="150" cy="65" rx="45" ry="28" fill="currentColor" />
      </svg>
    </motion.div>
  );
}
