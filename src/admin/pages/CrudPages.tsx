import { useState } from "react";
import { useFirestoreCollection } from "@/hooks/useFirestore";
import { Field, ImageUpload, TagInput, SaveBtn, DeleteBtn, AdminCard, SkillsInput } from "@/admin/components/FormFields";
import { Plus, Edit2, X } from "lucide-react";

// ─── Experience Page ───
export function ExperiencePage() {
  return (
    <CrudPage
      title="Experience" collectionName="experience"
      fields={[
        { key: "organization", label: "Organization", required: true },
        { key: "role", label: "Role" },
        { key: "duration", label: "Duration", placeholder: "Jun 2024 – Aug 2024" },
        { key: "type", label: "Type", placeholder: "internship / freelance / full-time" },
        { key: "summary", label: "Summary", textarea: true },
      ]}
      tagField={{ key: "stack", label: "Tech Stack" }}
      listTagField={{ key: "highlights", label: "Highlights" }}
      displayField="organization"
      subField="role"
    />
  );
}

// ─── Services Page ───
export function ServicesPage() {
  return (
    <CrudPage
      title="Services" collectionName="services"
      fields={[
        { key: "title", label: "Title", required: true },
        { key: "tagline", label: "Tagline" },
        { key: "description", label: "Description", textarea: true },
        { key: "iconName", label: "Icon Name", placeholder: "code / lightbulb / cpu / rocket" },
        { key: "color", label: "Color", type: "color" },
      ]}
      tagField={{ key: "features", label: "Features" }}
      displayField="title"
      subField="tagline"
    />
  );
}

// ─── Skills Page ───
export function SkillsPage() {
  return (
    <CrudPage
      title="Skill Categories" collectionName="skillCategories"
      fields={[
        { key: "label", label: "Category Name", required: true },
        { key: "icon", label: "Icon (emoji or text)", placeholder: "e.g. 💻" },
        { key: "color", label: "Color", type: "color" },
      ]}
      skillsField={{ key: "skills", label: "Skills List" }}
      displayField="label"
      subField="icon"
    />
  );
}

// ─── Certificates Page ───
export function CertificatesPage() {
  return (
    <CrudPage
      title="Certificates" collectionName="certificates"
      fields={[
        { key: "title", label: "Title", required: true },
        { key: "issuer", label: "Issuer" },
        { key: "date", label: "Date", placeholder: "2023" },
        { key: "credentialUrl", label: "Credential URL" },
        { key: "color", label: "Accent Color", type: "color" },
      ]}
      imageField={{ key: "image", label: "Certificate Image" }}
      displayField="title"
      subField="issuer"
    />
  );
}

// ─── Freelance Clients Page ───
export function FreelancePage() {
  return (
    <CrudPage
      title="Freelance Clients" collectionName="freelanceClients"
      fields={[
        { key: "client", label: "Client Name", required: true },
        { key: "category", label: "Category", placeholder: "e.g. Healthcare · Maintenance" },
        { key: "summary", label: "Summary", textarea: true },
        { key: "link", label: "Portfolio Link" },
      ]}
      tagField={{ key: "stack", label: "Tech Stack" }}
      listTagField={{ key: "highlights", label: "Highlights" }}
      displayField="client"
      subField="category"
    />
  );
}

// ─── Achievements Page ───
export function AchievementsPage() {
  return (
    <CrudPage
      title="Achievements" collectionName="achievements"
      fields={[
        { key: "title", label: "Title", required: true },
        { key: "organization", label: "Organization" },
        { key: "category", label: "Category", placeholder: "academic / certification / leadership / community / competition" },
        { key: "description", label: "Description", textarea: true },
      ]}
      displayField="title"
      subField="organization"
    />
  );
}

// ─── Generic CRUD Page Component ───

interface FieldDef {
  key: string; label: string; required?: boolean;
  placeholder?: string; textarea?: boolean; type?: string;
}

interface ImageFieldDef {
  key: string; label: string; required?: boolean;
}

function CrudPage({ title, collectionName, fields, tagField, listTagField, imageField, skillsField, displayField, subField }: {
  title: string; collectionName: string; fields: FieldDef[];
  tagField?: { key: string; label: string };
  listTagField?: { key: string; label: string };
  imageField?: ImageFieldDef;
  skillsField?: { key: string; label: string };
  displayField: string; subField?: string;
}) {
  const { data, add, update, remove } = useFirestoreCollection<Record<string, any>>(collectionName);
  const [editing, setEditing] = useState<Record<string, any> | null>(null);
  const [saving, setSaving] = useState(false);

  const empty: Record<string, any> = {};
  fields.forEach(f => { empty[f.key] = f.type === "color" ? "#7c3aed" : ""; });
  if (tagField) empty[tagField.key] = [];
  if (listTagField) empty[listTagField.key] = [];
  if (imageField) empty[imageField.key] = "";
  if (skillsField) empty[skillsField.key] = [];

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    if (editing.id) {
      const { id, ...rest } = editing;
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
          <h1 className="font-display text-2xl font-bold" style={{ color: "var(--t-text)" }}>{title}</h1>
          <p className="text-sm" style={{ color: "var(--t-muted)" }}>{data.length} items</p>
        </div>
        <button onClick={() => setEditing({ ...empty })}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium w-full sm:w-auto justify-center"
          style={{ background: `var(--t-accent)15`, color: "var(--t-accent)", border: `1px solid var(--t-accent)25` }}>
          <Plus size={15} /> Add
        </button>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-4 overflow-auto" onClick={() => setEditing(null)}>
          <form onClick={e => e.stopPropagation()} onSubmit={handleSave}
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl p-4 sm:p-6 space-y-4"
            style={{ background: "var(--t-surface)", border: `1px solid var(--t-border)` }}>
            <div className="flex items-center justify-between sticky top-0 -mx-4 sm:-mx-6 px-4 sm:px-6 py-4 sm:py-0" style={{ background: "var(--t-surface)" }}>
              <h2 className="font-display font-bold" style={{ color: "var(--t-text)" }}>
                {editing.id ? "Edit" : "New"} {title.replace(/s$/, "")}
              </h2>
              <button type="button" onClick={() => setEditing(null)} style={{ color: "var(--t-muted)" }}><X size={18} /></button>
            </div>
            {fields.map(f => (
              <Field key={f.key} label={f.label} value={editing[f.key] || ""}
                onChange={v => setEditing({ ...editing, [f.key]: v })}
                required={f.required} placeholder={f.placeholder} textarea={f.textarea} type={f.type} />
            ))}
            {imageField && (
              <ImageUpload label={imageField.label} value={editing[imageField.key] || ""}
                onChange={v => setEditing({ ...editing, [imageField.key]: v })} required={imageField.required} />
            )}
            {tagField && (
              <TagInput label={tagField.label} tags={editing[tagField.key] || []}
                onChange={v => setEditing({ ...editing, [tagField.key]: v })} />
            )}
            {listTagField && (
              <TagInput label={listTagField.label} tags={editing[listTagField.key] || []}
                onChange={v => setEditing({ ...editing, [listTagField.key]: v })} />
            )}
            {skillsField && (
              <SkillsInput label={skillsField.label} skills={editing[skillsField.key] || []}
                onChange={v => setEditing({ ...editing, [skillsField.key]: v })} />
            )}
            <SaveBtn saving={saving} />
          </form>
        </div>
      )}

      <div className="space-y-3">
        {data.map(item => (
          <AdminCard key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h3 className="font-display font-bold text-sm" style={{ color: "var(--t-text)" }}>{item[displayField]}</h3>
              {subField && <p className="text-xs truncate" style={{ color: "var(--t-muted)" }}>{item[subField]}</p>}
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button onClick={() => setEditing(item)} className="flex-1 sm:flex-none p-1.5 rounded-lg hover:bg-white/5" style={{ color: "var(--t-muted)" }}>
                <Edit2 size={14} />
              </button>
              <DeleteBtn onClick={() => remove(item.id)} />
            </div>
          </AdminCard>
        ))}
        {data.length === 0 && (
          <p className="text-sm text-center py-8" style={{ color: "var(--t-muted)" }}>
            No items yet. Click "Add" to create one.
          </p>
        )}
      </div>
    </div>
  );
}
