import { Routes, Route } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useThemeApply } from "@/hooks/useThemeApply";
import { AdminLogin } from "./AdminLogin";
import { AdminLayout } from "./AdminLayout";
import { DashboardPage } from "./pages/DashboardPage";
import { ProfilePage } from "./pages/ProfilePage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { MessagesPage } from "./pages/MessagesPage";
import { MigrationPage } from "./pages/MigrationPage";
import { SiteSettingsPage } from "./pages/SiteSettingsPage";
import { ExperiencePage, ServicesPage, SkillsPage, CertificatesPage, FreelancePage, AchievementsPage } from "./pages/CrudPages";

export function AdminApp() {
  useThemeApply();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--t-bg)" }}>
        <p className="font-mono text-sm animate-pulse" style={{ color: "var(--t-muted)" }}>Loading...</p>
      </div>
    );
  }

  if (!user) return <AdminLogin />;

  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="experience" element={<ExperiencePage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="skills" element={<SkillsPage />} />
        <Route path="certificates" element={<CertificatesPage />} />
        <Route path="freelance" element={<FreelancePage />} />
        <Route path="achievements" element={<AchievementsPage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="settings" element={<SiteSettingsPage />} />
        <Route path="migrate" element={<MigrationPage />} />
      </Route>
    </Routes>
  );
}
