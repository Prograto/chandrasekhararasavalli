import { MessageSquare, FolderKanban, Briefcase, Award } from "lucide-react";
import { useFirestoreCollection, useContactMessages } from "@/hooks/useFirestore";
import { Link } from "react-router-dom";

function StatCard({ icon: Icon, label, count, color }: {
  icon: any; label: string; count: number; color: string;
}) {
  return (
    <div className="rounded-xl p-5" style={{ background: "var(--t-surface)", border: `1px solid var(--t-border)` }}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
          <Icon size={16} style={{ color }} />
        </div>
        <span className="text-sm" style={{ color: "var(--t-muted)" }}>{label}</span>
      </div>
      <p className="font-display text-3xl font-bold" style={{ color: "var(--t-text)" }}>{count}</p>
    </div>
  );
}

export function DashboardPage() {
  const { messages } = useContactMessages();
  const { data: projects } = useFirestoreCollection("projects");
  const { data: experience } = useFirestoreCollection("experience");
  const { data: certs } = useFirestoreCollection("certificates");
  const unread = messages.filter(m => m.status === "new").length;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-1" style={{ color: "var(--t-text)" }}>Dashboard</h1>
      <p className="text-sm mb-8" style={{ color: "var(--t-muted)" }}>Overview of your portfolio content</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard icon={MessageSquare} label="Messages" count={messages.length} color="#f59e0b" />
        <StatCard icon={FolderKanban} label="Projects" count={projects.length} color="#7c3aed" />
        <StatCard icon={Briefcase} label="Experience" count={experience.length} color="#10b981" />
        <StatCard icon={Award} label="Certificates" count={certs.length} color="#06b6d4" />
      </div>

      {unread > 0 && (
        <div className="rounded-xl p-4" style={{ background: "#f59e0b10", border: "1px solid #f59e0b25" }}>
          <p className="text-sm font-medium" style={{ color: "#f59e0b" }}>
            You have {unread} unread message{unread > 1 ? "s" : ""}
          </p>
        </div>
      )}

      {projects.length === 0 && (
        <div className="rounded-xl p-4 mb-6 flex items-start gap-3" style={{ background: "#06b6d415", border: "1px solid #06b6d425" }}>
          <div style={{ color: "#06b6d4" }} className="mt-0.5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v20M2 12h20M6 6l12 12M18 6l-12 12" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium" style={{ color: "#06b6d4" }}>Ready to migrate your data?</p>
            <p className="text-xs mt-1" style={{ color: "var(--t-muted)" }}>
              Your portfolio has static data. Go to the{" "}
              <Link to="/admin/migrate" className="underline hover:opacity-70">
                Migrate Data
              </Link>
              {" "}page to push everything to Firebase and start managing it here.
            </p>
          </div>
        </div>
      )}

      <div className="mt-8 rounded-xl p-5" style={{ background: "var(--t-surface)", border: `1px solid var(--t-border)` }}>
        <h3 className="font-display font-bold mb-3" style={{ color: "var(--t-text)" }}>Quick Setup Guide</h3>
        <ol className="space-y-2 text-sm" style={{ color: "var(--t-muted)" }}>
          <li>1. Add your content using the sidebar pages</li>
          <li>2. Each save writes directly to Firestore</li>
          <li>3. Your public portfolio reads from Firestore with static fallback</li>
          <li>4. Contact messages appear under Messages</li>
        </ol>
      </div>
    </div>
  );
}
