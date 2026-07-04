import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard, User, Briefcase, FolderKanban, Wrench,
  Award, MessageSquare, LogOut, ArrowLeft, Code, Settings, Menu, X as CloseIcon,
  Zap, Trophy, Database, Sliders,
} from "lucide-react";

const NAV = [
  { to: "/admin",             icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/profile",     icon: User,            label: "Profile" },
  { to: "/admin/services",    icon: Code,            label: "Services" },
  { to: "/admin/experience",  icon: Briefcase,       label: "Experience" },
  { to: "/admin/projects",    icon: FolderKanban,    label: "Projects" },
  { to: "/admin/skills",      icon: Wrench,          label: "Skills" },
  { to: "/admin/certificates",icon: Award,           label: "Certificates" },
  { to: "/admin/freelance",   icon: Zap,             label: "Freelance" },
  { to: "/admin/achievements",icon: Trophy,          label: "Achievements" },
  { to: "/admin/settings",    icon: Sliders,         label: "Site Settings" },
  { to: "/admin/migrate",     icon: Database,        label: "Migrate Data" },
  { to: "/admin/messages",    icon: MessageSquare,   label: "Messages" },
];

export function AdminLayout() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row" style={{ background: "var(--t-bg)" }}>
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between px-4 py-4 border-b" style={{ borderColor: "var(--t-border)" }}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg" style={{ color: "var(--t-text)" }}>
          {sidebarOpen ? <CloseIcon size={20} /> : <Menu size={20} />}
        </button>
        <h2 className="font-display font-bold text-sm" style={{ color: "var(--t-text)" }}>Admin</h2>
        <div className="w-8" />
      </div>

      {/* Sidebar */}
      <aside className={`${
        sidebarOpen ? "flex" : "hidden"
      } lg:flex fixed lg:relative inset-y-0 left-0 z-40 w-60 flex-col border-r lg:border-b-0 border-b ${
        sidebarOpen ? "" : "hidden"
      }`}
        style={{ background: "var(--t-surface)", borderColor: "var(--t-border)" }}>
        <div className="hidden lg:block px-5 py-4 border-b" style={{ borderColor: "var(--t-border)" }}>
          <h2 className="font-display font-bold text-sm" style={{ color: "var(--t-text)" }}>
            Admin Panel
          </h2>
          <p className="font-mono text-[10px] mt-0.5 truncate" style={{ color: "var(--t-muted)" }}>
            {user?.email}
          </p>
        </div>

        <nav className="flex-1 py-3 px-3 space-y-0.5 overflow-y-auto">
          {NAV.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} end={to === "/admin"}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                  isActive ? "font-medium" : ""
                }`
              }
              style={({ isActive }) => ({
                background: isActive ? `var(--t-accent)12` : "transparent",
                color: isActive ? "var(--t-accent)" : "var(--t-muted)",
              })}
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t space-y-1" style={{ borderColor: "var(--t-border)" }}>
          <a href="/" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all"
            style={{ color: "var(--t-muted)" }}>
            <ArrowLeft size={16} /> View Portfolio
          </a>
          <button onClick={handleSignOut}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm w-full text-left transition-all text-red-400 hover:bg-red-500/10">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/50" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 sm:py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
