import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  return (
    <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 z-[100] h-[2px] origin-left">
      <div className="w-full h-full" style={{ background: "var(--t-accent)" }} />
    </motion.div>
  );
}
