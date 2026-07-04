import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

/**
 * CloudOverlay — Full-screen white cloud cover.
 *
 * PHASE 1: Page is scroll-locked. Clouds blanket the entire viewport.
 * On the FIRST scroll/wheel/touch, clouds animate away (drift outward + fade).
 * PHASE 2: Once clouds are gone, scroll is unlocked and the site scrolls normally.
 */

function CloudShape({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 600 220" className={className} style={style} aria-hidden="true" preserveAspectRatio="none">
      <ellipse cx="100" cy="160" rx="120" ry="65" fill="white" opacity="0.97" />
      <ellipse cx="200" cy="130" rx="140" ry="80" fill="white" opacity="0.95" />
      <ellipse cx="350" cy="150" rx="160" ry="75" fill="white" opacity="0.93" />
      <ellipse cx="500" cy="140" rx="130" ry="70" fill="white" opacity="0.96" />
      <ellipse cx="280" cy="105" rx="110" ry="65" fill="white" opacity="0.9" />
      <ellipse cx="450" cy="110" rx="100" ry="55" fill="white" opacity="0.88" />
      <ellipse cx="140" cy="110" rx="90" ry="50" fill="white" opacity="0.85" />
    </svg>
  );
}

export function CloudOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dismissed, setDismissed] = useState(false);
  const dismissing = useRef(false);

  const dismiss = useCallback(() => {
    if (dismissing.current) return;
    dismissing.current = true;

    const el = containerRef.current;
    if (!el) return;

    const clouds = el.querySelectorAll(".cloud-layer");
    const tl = gsap.timeline({
      onComplete: () => {
        setDismissed(true);
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      },
    });

    // Animate each cloud outward
    clouds.forEach((cloud, i) => {
      const direction = i % 2 === 0 ? 1 : -1;
      const isTop = cloud.classList.contains("cloud-top");
      tl.to(
        cloud,
        {
          opacity: 0,
          x: direction * (120 + i * 30),
          y: isTop ? -(100 + i * 30) : 80 + i * 20,
          scale: 1.3,
          duration: 1.2,
          ease: "power3.out",
        },
        i * 0.06,
      );
    });

    // Fade the sky backdrop
    const backdrop = el.querySelector(".sky-backdrop");
    if (backdrop) {
      tl.to(backdrop, { opacity: 0, duration: 1 }, 0.3);
    }

    // Fade entire container
    tl.to(el, { opacity: 0, duration: 0.4 }, "-=0.4");
  }, []);

  // Lock scroll and listen for first scroll action
  useEffect(() => {
    if (dismissed) return;

    // Lock the page
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) dismiss();
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const delta = touchStartY - e.touches[0].clientY;
      if (delta > 30) dismiss();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        dismiss();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [dismissed, dismiss]);

  if (dismissed) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] overflow-hidden"
      aria-hidden="true"
    >
      {/* Sky gradient backdrop */}
      <div className="sky-backdrop absolute inset-0 bg-gradient-to-b from-[#d4e6f7] via-[#e8f1fa] to-[#f0f4f8]" />

      {/* Scroll prompt */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 animate-pulse">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-slate-400">
          Scroll to enter
        </span>
        <svg width="20" height="28" viewBox="0 0 20 28" fill="none" className="text-slate-400">
          <rect x="1" y="1" width="18" height="26" rx="9" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="10" cy="9" r="2.5" fill="currentColor" className="animate-bounce" style={{ animationDuration: "1.5s" }} />
        </svg>
      </div>

      {/* ─── BOTTOM CLOUD BANK (thick, covers bottom 60%) ─── */}
      <CloudShape
        className="cloud-layer absolute w-[110vw]"
        style={{ bottom: "-12%", left: "-5%", opacity: 1 }}
      />
      <CloudShape
        className="cloud-layer absolute w-[100vw]"
        style={{ bottom: "-5%", left: "10%", opacity: 0.97 }}
      />
      <CloudShape
        className="cloud-layer absolute w-[105vw]"
        style={{ bottom: "5%", left: "-10%", opacity: 0.95 }}
      />
      <CloudShape
        className="cloud-layer absolute w-[95vw]"
        style={{ bottom: "12%", right: "-5%", opacity: 0.93 }}
      />
      <CloudShape
        className="cloud-layer absolute w-[100vw]"
        style={{ bottom: "20%", left: "5%", opacity: 0.9 }}
      />
      <CloudShape
        className="cloud-layer absolute w-[90vw]"
        style={{ bottom: "28%", right: "0%", opacity: 0.88 }}
      />

      {/* ─── MIDDLE CLOUD LAYER ─── */}
      <CloudShape
        className="cloud-layer absolute w-[80vw]"
        style={{ bottom: "35%", left: "-5%", opacity: 0.75 }}
      />
      <CloudShape
        className="cloud-layer absolute w-[85vw]"
        style={{ bottom: "40%", right: "-8%", opacity: 0.7 }}
      />

      {/* ─── TOP WISPY CLOUDS ─── */}
      <CloudShape
        className="cloud-layer cloud-top absolute w-[70vw]"
        style={{ top: "5%", left: "0%", opacity: 0.5 }}
      />
      <CloudShape
        className="cloud-layer cloud-top absolute w-[65vw]"
        style={{ top: "10%", right: "0%", opacity: 0.45 }}
      />
      <CloudShape
        className="cloud-layer cloud-top absolute w-[60vw]"
        style={{ top: "-5%", left: "20%", opacity: 0.55 }}
      />
    </div>
  );
}
