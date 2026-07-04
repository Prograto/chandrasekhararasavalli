import { useState, useEffect } from "react";
import { useFirestoreDoc } from "@/hooks/useFirestore";
import { SaveBtn, DeleteBtn } from "@/admin/components/FormFields";
import { Plus, X } from "lucide-react";

interface HeroRole {
  id: string;
  text: string;
}

interface Stat {
  id: string;
  num: number;
  suffix: string;
  label: string;
}

interface ProjectType {
  id: string;
  name: string;
}

interface Budget {
  id: string;
  range: string;
}

export function SiteSettingsPage() {
  const { data: settings, update } = useFirestoreDoc<any>("siteContent", "settings");
  const [roles, setRoles] = useState<HeroRole[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [projectTypes, setProjectTypes] = useState<ProjectType[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [saving, setSaving] = useState(false);
  const [newRole, setNewRole] = useState("");
  const [newStat, setNewStat] = useState({ num: "", suffix: "", label: "" });
  const [newProjectType, setNewProjectType] = useState("");
  const [newBudget, setNewBudget] = useState("");

  useEffect(() => {
    if (settings) {
      setRoles(settings.heroRoles || []);
      setStats(settings.aboutStats || []);
      setProjectTypes(settings.projectTypes || []);
      setBudgets(settings.budgets || []);
    }
  }, [settings]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await update({
        heroRoles: roles,
        aboutStats: stats,
        projectTypes: projectTypes,
        budgets: budgets,
      });
    } catch (err) {
      console.error("Failed to save settings:", err);
    }
    setSaving(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="font-display text-2xl font-bold mb-1" style={{ color: "var(--t-text)" }}>
        Site Settings
      </h1>
      <p className="text-sm mb-6" style={{ color: "var(--t-muted)" }}>
        Customize site-wide content and form options
      </p>

      <div className="space-y-8">
        {/* Hero Roles */}
        <div className="rounded-xl p-6" style={{ background: "var(--t-surface)", border: `1px solid var(--t-border)` }}>
          <h2 className="font-display font-bold mb-4" style={{ color: "var(--t-text)" }}>
            Hero Section Roles
          </h2>
          <p className="text-sm mb-4" style={{ color: "var(--t-muted)" }}>
            These roles cycle through on the hero section (4 recommended)
          </p>

          <div className="space-y-2 mb-4">
            {roles.map((role, idx) => (
              <div key={role.id} className="flex items-center gap-2 p-3 rounded-lg" style={{ background: "var(--t-bg)" }}>
                <span className="text-sm font-mono flex-1" style={{ color: "var(--t-text)" }}>
                  {idx + 1}. {role.text}
                </span>
                <button
                  onClick={() => setRoles(roles.filter((_, i) => i !== idx))}
                  className="p-1.5 rounded hover:bg-red-500/10"
                  style={{ color: "var(--t-muted)" }}>
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              placeholder="e.g., Full-Stack Engineer"
              className="flex-1 px-3 py-2 rounded-lg text-sm"
              style={{ background: "var(--t-bg)", border: `1px solid var(--t-border)`, color: "var(--t-text)" }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && newRole.trim()) {
                  setRoles([...roles, { id: Date.now().toString(), text: newRole }]);
                  setNewRole("");
                }
              }}
            />
            <button
              onClick={() => {
                if (newRole.trim()) {
                  setRoles([...roles, { id: Date.now().toString(), text: newRole }]);
                  setNewRole("");
                }
              }}
              className="px-3 py-2 rounded-lg text-sm flex items-center gap-2"
              style={{ background: "var(--t-accent)20", color: "var(--t-accent)" }}>
              <Plus size={14} /> Add
            </button>
          </div>
        </div>

        {/* About Stats */}
        <div className="rounded-xl p-6" style={{ background: "var(--t-surface)", border: `1px solid var(--t-border)` }}>
          <h2 className="font-display font-bold mb-4" style={{ color: "var(--t-text)" }}>
            About Section Stats
          </h2>
          <p className="text-sm mb-4" style={{ color: "var(--t-muted)" }}>
            Statistics displayed on the About section (4 recommended)
          </p>

          <div className="space-y-2 mb-4">
            {stats.map((stat, idx) => (
              <div key={stat.id} className="flex items-center justify-between p-3 rounded-lg" style={{ background: "var(--t-bg)" }}>
                <div className="text-sm" style={{ color: "var(--t-text)" }}>
                  <span className="font-bold">{stat.num}{stat.suffix}</span>
                  <span style={{ color: "var(--t-muted)" }}> - {stat.label}</span>
                </div>
                <button
                  onClick={() => setStats(stats.filter((_, i) => i !== idx))}
                  className="p-1.5 rounded hover:bg-red-500/10"
                  style={{ color: "var(--t-muted)" }}>
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2 mb-2">
            <input
              type="number"
              value={newStat.num}
              onChange={(e) => setNewStat({ ...newStat, num: e.target.value })}
              placeholder="300"
              className="px-3 py-2 rounded-lg text-sm"
              style={{ background: "var(--t-bg)", border: `1px solid var(--t-border)`, color: "var(--t-text)" }}
            />
            <input
              type="text"
              value={newStat.suffix}
              onChange={(e) => setNewStat({ ...newStat, suffix: e.target.value })}
              placeholder="+"
              className="px-3 py-2 rounded-lg text-sm"
              style={{ background: "var(--t-bg)", border: `1px solid var(--t-border)`, color: "var(--t-text)" }}
            />
            <input
              type="text"
              value={newStat.label}
              onChange={(e) => setNewStat({ ...newStat, label: e.target.value })}
              placeholder="Label"
              className="px-3 py-2 rounded-lg text-sm"
              style={{ background: "var(--t-bg)", border: `1px solid var(--t-border)`, color: "var(--t-text)" }}
            />
          </div>
          <button
            onClick={() => {
              if (newStat.num && newStat.label) {
                setStats([
                  ...stats,
                  { id: Date.now().toString(), num: parseInt(newStat.num), suffix: newStat.suffix, label: newStat.label },
                ]);
                setNewStat({ num: "", suffix: "", label: "" });
              }
            }}
            className="w-full px-3 py-2 rounded-lg text-sm flex items-center justify-center gap-2"
            style={{ background: "var(--t-accent)20", color: "var(--t-accent)" }}>
            <Plus size={14} /> Add Stat
          </button>
        </div>

        {/* Project Types */}
        <div className="rounded-xl p-6" style={{ background: "var(--t-surface)", border: `1px solid var(--t-border)` }}>
          <h2 className="font-display font-bold mb-4" style={{ color: "var(--t-text)" }}>
            Project Type Filters
          </h2>
          <p className="text-sm mb-4" style={{ color: "var(--t-muted)" }}>
            Options shown in the Projects section filter (include "All" as first item)
          </p>

          <div className="space-y-2 mb-4">
            {projectTypes.map((type, idx) => (
              <div key={type.id} className="flex items-center gap-2 p-3 rounded-lg" style={{ background: "var(--t-bg)" }}>
                <span className="text-sm flex-1" style={{ color: "var(--t-text)" }}>
                  {type.name}
                </span>
                <button
                  onClick={() => setProjectTypes(projectTypes.filter((_, i) => i !== idx))}
                  className="p-1.5 rounded hover:bg-red-500/10"
                  style={{ color: "var(--t-muted)" }}>
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newProjectType}
              onChange={(e) => setNewProjectType(e.target.value)}
              placeholder="e.g., Web Development"
              className="flex-1 px-3 py-2 rounded-lg text-sm"
              style={{ background: "var(--t-bg)", border: `1px solid var(--t-border)`, color: "var(--t-text)" }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && newProjectType.trim()) {
                  setProjectTypes([...projectTypes, { id: Date.now().toString(), name: newProjectType }]);
                  setNewProjectType("");
                }
              }}
            />
            <button
              onClick={() => {
                if (newProjectType.trim()) {
                  setProjectTypes([...projectTypes, { id: Date.now().toString(), name: newProjectType }]);
                  setNewProjectType("");
                }
              }}
              className="px-3 py-2 rounded-lg text-sm flex items-center gap-2"
              style={{ background: "var(--t-accent)20", color: "var(--t-accent)" }}>
              <Plus size={14} /> Add
            </button>
          </div>
        </div>

        {/* Budgets */}
        <div className="rounded-xl p-6" style={{ background: "var(--t-surface)", border: `1px solid var(--t-border)` }}>
          <h2 className="font-display font-bold mb-4" style={{ color: "var(--t-text)" }}>
            Budget Options
          </h2>
          <p className="text-sm mb-4" style={{ color: "var(--t-muted)" }}>
            Budget ranges shown in the Contact form
          </p>

          <div className="space-y-2 mb-4">
            {budgets.map((budget, idx) => (
              <div key={budget.id} className="flex items-center gap-2 p-3 rounded-lg" style={{ background: "var(--t-bg)" }}>
                <span className="text-sm flex-1" style={{ color: "var(--t-text)" }}>
                  {budget.range}
                </span>
                <button
                  onClick={() => setBudgets(budgets.filter((_, i) => i !== idx))}
                  className="p-1.5 rounded hover:bg-red-500/10"
                  style={{ color: "var(--t-muted)" }}>
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newBudget}
              onChange={(e) => setNewBudget(e.target.value)}
              placeholder="e.g., ₹10k – ₹50k"
              className="flex-1 px-3 py-2 rounded-lg text-sm"
              style={{ background: "var(--t-bg)", border: `1px solid var(--t-border)`, color: "var(--t-text)" }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && newBudget.trim()) {
                  setBudgets([...budgets, { id: Date.now().toString(), range: newBudget }]);
                  setNewBudget("");
                }
              }}
            />
            <button
              onClick={() => {
                if (newBudget.trim()) {
                  setBudgets([...budgets, { id: Date.now().toString(), range: newBudget }]);
                  setNewBudget("");
                }
              }}
              className="px-3 py-2 rounded-lg text-sm flex items-center gap-2"
              style={{ background: "var(--t-accent)20", color: "var(--t-accent)" }}>
              <Plus size={14} /> Add
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 rounded-lg font-medium text-sm flex items-center gap-2 flex-1 disabled:opacity-50"
            style={{ background: "var(--t-accent)", color: "var(--t-bg)" }}>
            {saving ? "Saving..." : "Save All Settings"}
          </button>
        </div>
      </div>
    </div>
  );
}
