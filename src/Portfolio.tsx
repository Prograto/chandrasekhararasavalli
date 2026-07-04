import { useLenis } from "@/hooks/useLenis";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useFlightColors } from "@/hooks/useFlightColors";
import { useThemeApply } from "@/hooks/useThemeApply";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CustomCursor } from "@/components/CustomCursor";
import { CinematicOverlay } from "@/components/CinematicOverlay";
import { FlightProgressRail } from "@/components/FlightProgressRail";
import { CloudOverlay } from "@/components/CloudOverlay";
import { DroneNavigator } from "@/components/DroneNavigator";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Certificates } from "@/components/sections/Certificates";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";

const SECTION_IDS = ["hero","about","services","experience","projects","skills","certificates","achievements","contact"];

export function Portfolio() {
  useLenis();
  useActiveSection(SECTION_IDS);
  useFlightColors();
  useThemeApply();

  return (
    <>
      <CloudOverlay />
      <CinematicOverlay />
      <ScrollProgress />
      <FlightProgressRail />
      <CustomCursor />
      <Navbar />
      <main className="relative">
        <DroneNavigator />
        <Hero />
        <About />
        <Services />
        <Experience />
        <Projects />
        <Skills />
        <Certificates />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
