import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * DroneNavigator — Clean dotted-line path only.
 * The drone is position:fixed, scroll-scrubbed, stays mid-viewport.
 * Checkpoints use a location-pin SVG icon.
 */

const SECTIONS = ["hero","about","services","experience","projects","skills","certificates","achievements","contact"];
const LABELS   = ["Home","About","Services","Work","Projects","Skills","Certs","Awards","Contact"];

// Drone zig-zags along screen edges to avoid center content
// vx = viewport X%, vy = viewport Y%  (where drone sits on screen)
const WAYPOINTS = [
  { vx: 90, vy: 22 },
  { vx: 8,  vy: 45 },
  { vx: 92, vy: 48 },
  { vx: 6,  vy: 42 },
  { vx: 90, vy: 50 },
  { vx: 7,  vy: 45 },
  { vx: 92, vy: 48 },
  { vx: 8,  vy: 46 },
  { vx: 50, vy: 55 },
];

/** SVG location pin icon */
const PIN_SVG = `<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" fill="currentColor"/>`;

export function DroneNavigator() {
  const droneRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [trailPts, setTrailPts] = useState<{ x: number; y: number }[]>([]);
  const [pageH, setPageH] = useState(0);
  const trailRef = useRef<SVGPathElement>(null);

  const calcTrail = useCallback(() => {
    const pts: { x: number; y: number }[] = [];
    SECTIONS.forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      pts.push({
        x: (WAYPOINTS[i].vx / 100) * window.innerWidth,
        y: el.offsetTop + el.offsetHeight * 0.35,
      });
    });
    setTrailPts(pts);
    setPageH(document.documentElement.scrollHeight);
  }, []);

  useEffect(() => {
    calcTrail();
    window.addEventListener("resize", calcTrail);
    const t = setTimeout(calcTrail, 1500);
    return () => { window.removeEventListener("resize", calcTrail); clearTimeout(t); };
  }, [calcTrail]);

  // Animate drone between waypoints, scrubbed to scroll
  useEffect(() => {
    const drone = droneRef.current;
    if (!drone || trailPts.length < SECTIONS.length) return;
    const flipWrapper = drone.querySelector(".drone-flip-wrapper");
    const kills: ScrollTrigger[] = [];

    gsap.set(drone, { left: `${WAYPOINTS[0].vx}vw`, top: `${WAYPOINTS[0].vy}vh`, scale: 1 });
    if (flipWrapper) {
      gsap.set(flipWrapper, { scaleX: 1 });
    }

    for (let i = 0; i < SECTIONS.length - 1; i++) {
      const fromEl = document.getElementById(SECTIONS[i]);
      const toEl = document.getElementById(SECTIONS[i + 1]);
      if (!fromEl || !toEl) continue;

      const from = WAYPOINTS[i], to = WAYPOINTS[i + 1];
      const goingLeft = to.vx < from.vx;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: fromEl, start: "bottom 75%",
          endTrigger: toEl, end: "top 45%",
          scrub: 1.5,
          onEnter: () => setActiveIdx(i + 1),
          onEnterBack: () => setActiveIdx(i),
        },
      });

      // Move position
      tl.to(drone, {
        left: `${to.vx}vw`, top: `${to.vy}vh`,
        duration: 1, ease: "none",
      }, 0);

      // Flip the inner wrapper instantly at the start of the move
      if (flipWrapper) {
        tl.set(flipWrapper, {
          scaleX: goingLeft ? -1 : 1
        }, 0);
      }

      // Shrink outer container uniformly to 0.35 in the middle of transition
      tl.to(drone, {
        scale: 0.35,
        duration: 0.5,
        ease: "power1.inOut"
      }, 0);

      // Scale outer container back to 1 towards the destination
      tl.to(drone, {
        scale: 1,
        duration: 0.5,
        ease: "power1.inOut"
      }, 0.5);

      if (tl.scrollTrigger) kills.push(tl.scrollTrigger);
    }

    return () => kills.forEach(t => t.kill());
  }, [trailPts]);

  // Draw trail progressively using mask offset animation
  useEffect(() => {
    const path = trailRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    const st = ScrollTrigger.create({
      trigger: "main", start: "top top", end: "bottom bottom", scrub: 1,
      onUpdate: (self) => gsap.set(path, { strokeDashoffset: len * (1 - self.progress) }),
    });
    return () => st.kill();
  }, [trailPts]);

  // Build smooth SVG path
  const pathD = trailPts.length >= 2
    ? trailPts.reduce((d, p, i) => {
        if (i === 0) return `M ${p.x} ${p.y}`;
        const prev = trailPts[i - 1];
        const cy1 = prev.y + (p.y - prev.y) * 0.4;
        const cy2 = prev.y + (p.y - prev.y) * 0.6;
        return `${d} C ${prev.x} ${cy1}, ${p.x} ${cy2}, ${p.x} ${p.y}`;
      }, "")
    : "";

  return (
    <>
      {/* ── Dotted-line flight path with location-pin checkpoints ── */}
      {trailPts.length >= 2 && (
        <svg className="absolute top-0 left-0 w-full pointer-events-none z-[55]"
          style={{ height: pageH || "100%" }}>
          <defs>
            {/* Mask to reveal the dotted path progressively */}
            <mask id="drone-path-mask">
              <path ref={trailRef} d={pathD} fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
            </mask>
          </defs>
          {/* Dotted background path */}
          <path d={pathD} fill="none" stroke="var(--t-muted)" strokeWidth="1.5"
            strokeDasharray="4 8" opacity="0.15" strokeLinecap="round" />
          {/* Animated dotted path revealed by mask */}
          <path d={pathD} fill="none" stroke="var(--t-accent)" strokeWidth="1.5"
            strokeDasharray="4 8" opacity="0.6" strokeLinecap="round" mask="url(#drone-path-mask)" />

          {/* Location-pin checkpoints */}
          {trailPts.map((pt, i) => {
            const active = i <= activeIdx;
            return (
              <g key={i} transform={`translate(${pt.x - 12}, ${pt.y - 24})`} opacity={active ? 0.9 : 0.2}>
                <svg width="24" height="24" viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: PIN_SVG }}
                  style={{ color: active ? "var(--t-accent)" : "var(--t-muted)" } as React.CSSProperties} />
                <text x="12" y="32" textAnchor="middle" fill={active ? "var(--t-accent)" : "var(--t-muted)"}
                  fontSize="7" fontFamily="JetBrains Mono, monospace" opacity={active ? 0.7 : 0.3}>
                  {LABELS[i]}
                </text>
              </g>
            );
          })}
        </svg>
      )}

      {/* ── Fixed Drone ── */}
      <div ref={droneRef} className="fixed z-[80] pointer-events-none w-20 h-20 md:w-40 md:h-40"
        style={{ transform: "translate(-50%, -50%)",
          filter: "drop-shadow(0 8px 30px rgba(0,0,0,0.25))", willChange: "left, top, transform" }}>
        <div className="drone-flip-wrapper w-full h-full relative">
          <video src="/drone.webm" autoPlay loop muted playsInline className="w-full h-full object-contain relative z-10" />
          {/* Glow effect at the bottom */}
          <div className="absolute bottom-[10%] md:bottom-[24px] left-1/2 -translate-x-1/2 w-[35%] md:w-14 h-1 md:h-4 bg-[var(--t-accent)] rounded-full blur-md opacity-80 animate-pulse pointer-events-none shadow-[0_0_20px_8px_var(--t-accent)]" style={{ transform: "translateX(-50%) scaleY(0.35)" }} />
        </div>
      </div>
    </>
  );
}
