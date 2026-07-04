import { useState, useEffect } from "react";
import { useFirestoreDoc } from "@/hooks/useFirestore";
import { Field, ImageUpload, TagInput, SaveBtn, AdminCard } from "@/admin/components/FormFields";
import { profile as staticProfile } from "@/data/profile";

interface ProfileData {
  name: string; handle: string; role: string; tagline: string;
  headline: string; subheadline: string; bio: string[];
  location: string; email: string; whatsapp: string; resumeUrl: string; avatar?: string;
}

export function ProfilePage() {
  const { data, save } = useFirestoreDoc<ProfileData>("siteContent", "profile");
  const [form, setForm] = useState<ProfileData>({
    name: "", handle: "", role: "", tagline: "", headline: "",
    subheadline: "", bio: [], location: "", email: "", whatsapp: "", resumeUrl: "", avatar: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const src = data || staticProfile;
    setForm({
      name: src.name, handle: src.handle, role: src.role,
      tagline: src.tagline, headline: src.headline, subheadline: src.subheadline,
      bio: src.bio, location: src.location, email: src.email,
      whatsapp: src.whatsapp, resumeUrl: src.resumeUrl || "", avatar: (src as any).avatar || "",
    });
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await save(form);
    setSaving(false);
  };

  const setF = (key: keyof ProfileData, val: any) => setForm(p => ({ ...p, [key]: val }));

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-1" style={{ color: "var(--t-text)" }}>Profile</h1>
      <p className="text-sm mb-6" style={{ color: "var(--t-muted)" }}>Edit your personal information</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <AdminCard>
          <ImageUpload label="Profile Avatar" value={form.avatar || ""} onChange={v => setF("avatar" as any, v)} />
        </AdminCard>

        <AdminCard>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Full Name" value={form.name} onChange={v => setF("name", v)} required />
            <Field label="Handle" value={form.handle} onChange={v => setF("handle", v)} placeholder="prograto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <Field label="Role" value={form.role} onChange={v => setF("role", v)} />
            <Field label="Location" value={form.location} onChange={v => setF("location", v)} />
          </div>
        </AdminCard>

        <AdminCard>
          <Field label="Tagline" value={form.tagline} onChange={v => setF("tagline", v)} />
          <div className="mt-4"><Field label="Headline" value={form.headline} onChange={v => setF("headline", v)} /></div>
          <div className="mt-4"><Field label="Sub-headline" value={form.subheadline} onChange={v => setF("subheadline", v)} textarea /></div>
        </AdminCard>

        <AdminCard>
          <label className="block font-mono text-[11px] uppercase tracking-widest mb-2" style={{ color: "var(--t-muted)" }}>Bio Paragraphs</label>
          {form.bio.map((para, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <textarea value={para} rows={3} className="flex-1 rounded-lg px-3 py-2 text-sm outline-none resize-none"
                style={{ background: "var(--t-bg)", border: `1px solid var(--t-border)`, color: "var(--t-text)" }}
                onChange={e => { const b = [...form.bio]; b[i] = e.target.value; setF("bio", b); }} />
              <button type="button" onClick={() => setF("bio", form.bio.filter((_, j) => j !== i))}
                className="text-red-400 text-xs px-2 hover:bg-red-500/10 rounded">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => setF("bio", [...form.bio, ""])}
            className="text-xs px-3 py-1.5 rounded-lg" style={{ color: "var(--t-accent)", background: `var(--t-accent)10` }}>
            + Add Paragraph
          </button>
        </AdminCard>

        <AdminCard>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Email" value={form.email} onChange={v => setF("email", v)} type="email" />
            <Field label="WhatsApp" value={form.whatsapp} onChange={v => setF("whatsapp", v)} placeholder="+91..." />
          </div>
          <div className="mt-4">
            <Field label="Resume URL" value={form.resumeUrl} onChange={v => setF("resumeUrl", v)} placeholder="/resume.pdf" />
          </div>
        </AdminCard>

        <SaveBtn saving={saving} label="Save Profile" />
      </form>
    </div>
  );
}
