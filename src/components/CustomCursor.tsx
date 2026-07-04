import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * CrosshairCursor — targeting reticle instead of default cursor.
 * Desktop only; disabled on touch/mobile via CSS class + matchMedia.
 */
export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springConfig = { stiffness: 500, damping: 40 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;
    document.body.style.cursor = "none";
    setVisible(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement;
      setHovering(!!el.closest("a, button, input, textarea, select, [role=button]"));
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.body.style.cursor = "";
    };
  }, [x, y]);

  if (!visible) return null;

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      className="crosshair-cursor"
      aria-hidden="true"
    >
      <motion.div
        className="crosshair-ring"
        animate={{
          scale: hovering ? 1.6 : 1,
          opacity: hovering ? 0.8 : 0.4,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </motion.div>
  );
}
