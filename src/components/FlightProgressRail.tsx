import { useUIStore } from "@/store/uiStore";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "experience", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

function scrollTo(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }

export function FlightProgressRail() {
  const activeSection = useUIStore(s => s.activeSection);
  const activeIndex = SECTIONS.findIndex(s => s.id === activeSection);
  return (
    <nav className="flight-rail" aria-label="Progress">
      {SECTIONS.map((section, i) => {
        const isActive = section.id === activeSection;
        const isCompleted = i < activeIndex;
        return (
          <div key={section.id} className="flex flex-col items-center">
            {i > 0 && <div className="flight-rail-line"><div className="flight-rail-line-fill" style={{ height: isCompleted || isActive ? "100%" : "0%" }} /></div>}
            <button onClick={() => scrollTo(section.id)} className={`flight-rail-dot ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""}`}
              aria-label={`Go to ${section.label}`}><span className="flight-rail-label">{section.label}</span></button>
          </div>
        );
      })}
    </nav>
  );
}
