import { useState } from "react";
import { useFirestoreCollection } from "@/hooks/useFirestore";
import { Field, ImageUpload, TagInput, SaveBtn, DeleteBtn, AdminCard } from "@/admin/components/FormFields";
import { Plus, Edit2, X } from "lucide-react";

interface ProjectDoc {
  title: string; slug: string; description: string; stack: string[];
  image: string; githubUrl: string; liveUrl: string;
  featured: boolean; verified: boolean; metric: string; color: string;
}

const EMPTY: ProjectDoc = {
  title: "", slug: "", description: "", stack: [], image: "",
  githubUrl: "", liveUrl: "", featured: false, verified: false, metric: "", color: "#7c3aed",
};

export function ProjectsPage() {
  const { data, add, update, remove } = useFirestoreCollection<ProjectDoc>("projects");
  const [editing, setEditing] = useState<(ProjectDoc & { id?: string }) | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    if (editing.id) {
      const { id, ...rest } = editing as any;
      await update(id, rest);
    } else {
      await add(editing);
    }
    setEditing(null);
    setSaving(false);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold" style={{ color: "var(--t-text)" }}>Projects</h1>
          <p className="text-sm" style={{ color: "var(--t-muted)" }}>{data.length} projects</p>
        </div>
        <button onClick={() => setEditing({ ...EMPTY })}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium w-full sm:w-auto justify-center"
          style={{ background: `var(--t-accent)15`, color: "var(--t-accent)", border: `1px solid var(--t-accent)25` }}>
          <Plus size={15} /> Add Project
        </button>
      </div>

      {/* Editor modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-4 overflow-auto" onClick={() => setEditing(null)}>
          <form onClick={e => e.stopPropagation()} onSubmit={handleSave}
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl p-4 sm:p-6 space-y-4"
            style={{ background: "var(--t-surface)", border: `1px solid var(--t-border)` }}>
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold" style={{ color: "var(--t-text)" }}>
                {editing.id ? "Edit Project" : "New Project"}
              </h2>
              <button type="button" onClick={() => setEditing(null)} style={{ color: "var(--t-muted)" }}><X size={18} /></button>
            </div>
            <Field label="Title" value={editing.title} onChange={v => setEditing({ ...editing, title: v })} required />
            <Field label="Slug" value={editing.slug} onChange={v => setEditing({ ...editing, slug: v })} placeholder="my-project" />
            <Field label="Description" value={editing.description} onChange={v => setEditing({ ...editing, description: v })} textarea required />
            <TagInput label="Tech Stack" tags={editing.stack} onChange={v => setEditing({ ...editing, stack: v })} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="GitHub URL" value={editing.githubUrl} onChange={v => setEditing({ ...editing, githubUrl: v })} />
              <Field label="Live URL" value={editing.liveUrl} onChange={v => setEditing({ ...editing, liveUrl: v })} />
            </div>
            <ImageUpload label="Project Image" value={editing.image} onChange={v => setEditing({ ...editing, image: v })} />
            <Field label="Metric" value={editing.metric} onChange={v => setEditing({ ...editing, metric: v })} placeholder="2000+ users" />
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: "var(--t-text)" }}>
                <input type="checkbox" checked={editing.featured} onChange={e => setEditing({ ...editing, featured: e.target.checked })} /> Featured
              </label>
            </div>
            <Field label="Accent Color" value={editing.color} onChange={v => setEditing({ ...editing, color: v })} type="color" />
            <SaveBtn saving={saving} />
          </form>
        </div>
      )}

      {/* Project list */}
      <div className="space-y-3">
        {data.map(p => (
          <AdminCard key={p.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h3 className="font-display font-bold text-sm" style={{ color: "var(--t-text)" }}>{p.title}</h3>
              <p className="text-xs truncate" style={{ color: "var(--t-muted)" }}>{p.stack.join(", ")}</p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {p.featured && <span className="text-[10px] font-mono px-2 py-0.5 rounded whitespace-nowrap" style={{ background: `var(--t-accent)10`, color: "var(--t-accent)" }}>Featured</span>}
              <button onClick={() => setEditing(p)} className="flex-1 sm:flex-none p-1.5 rounded-lg hover:bg-white/5" style={{ color: "var(--t-muted)" }}><Edit2 size={14} /></button>
              <DeleteBtn onClick={() => remove(p.id)} />
            </div>
          </AdminCard>
        ))}
        {data.length === 0 && (
          <p className="text-sm text-center py-8" style={{ color: "var(--t-muted)" }}>
            No projects yet. Click "Add Project" to start.
          </p>
        )}
      </div>
    </div>
  );
}
