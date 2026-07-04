import { useState, useEffect } from "react";
import { Save, Trash2, Plus, X, Upload, AlertCircle } from "lucide-react";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// ─── Input Field ───
export function Field({ label, value, onChange, type = "text", placeholder = "", textarea = false, required = false }: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; textarea?: boolean; required?: boolean;
}) {
  const cls = "w-full rounded-lg px-3 py-2 text-sm outline-none transition-all";
  const style = { background: "var(--t-bg)", border: `1px solid var(--t-border)`, color: "var(--t-text)" };

  return (
    <div>
      <label className="block font-mono text-[11px] uppercase tracking-widest mb-1.5" style={{ color: "var(--t-muted)" }}>
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {textarea ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          rows={4} className={`${cls} resize-none`} style={style} required={required} />
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          className={cls} style={style} required={required} />
      )}
    </div>
  );
}

// ─── Image Upload ───
export function ImageUpload({ label, value, onChange, required = false }: {
  label: string; value: string; onChange: (url: string) => void; required?: boolean;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState(value);
  const [tab, setTab] = useState<"upload" | "url">("upload");

  useEffect(() => {
    setPreview(value);
  }, [value]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !storage) return;
    
    if (file.size > 10 * 1024 * 1024) {
      setError("File too large (max 10MB)");
      return;
    }

    setUploading(true);
    setError(null);
    try {
      const storageRef = ref(storage, `images/${Date.now()}-${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      onChange(url);
      setPreview(url);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent | React.MouseEvent | React.KeyboardEvent, url: string) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (url.trim()) {
      onChange(url);
      setPreview(url);
      setError(null);
    }
  };

  return (
    <div>
      <label className="block font-mono text-[11px] uppercase tracking-widest mb-1.5" style={{ color: "var(--t-muted)" }}>
        {label} {required && <span className="text-red-400">*</span>}
      </label>

      {preview && (
        <div className="mb-3 rounded-lg overflow-hidden border" style={{ borderColor: "var(--t-border)" }}>
          <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
        </div>
      )}

      <div className="flex gap-1.5 mb-2 rounded-lg p-1" style={{ background: "var(--t-bg)", border: `1px solid var(--t-border)` }}>
        <button
          type="button"
          onClick={() => setTab("upload")}
          className="flex-1 py-1.5 rounded text-xs font-medium transition-all"
          style={{
            background: tab === "upload" ? "var(--t-accent)" : "transparent",
            color: tab === "upload" ? "var(--t-bg)" : "var(--t-muted)",
          }}
        >
          Upload
        </button>
        <button
          type="button"
          onClick={() => setTab("url")}
          className="flex-1 py-1.5 rounded text-xs font-medium transition-all"
          style={{
            background: tab === "url" ? "var(--t-accent)" : "transparent",
            color: tab === "url" ? "var(--t-bg)" : "var(--t-muted)",
          }}
        >
          URL
        </button>
      </div>

      {tab === "upload" ? (
        <label className="block cursor-pointer rounded-lg border-2 border-dashed p-4 text-center transition-all hover:border-opacity-80"
          style={{ borderColor: `var(--t-accent)40` }}>
          <Upload size={20} className="mx-auto mb-2" style={{ color: "var(--t-accent)" }} />
          <p className="text-xs font-medium" style={{ color: "var(--t-accent)" }}>Click to upload or drag</p>
          <p className="text-[10px] mt-1" style={{ color: "var(--t-muted)" }}>JPG, PNG (max 10MB)</p>
          <input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading} className="hidden" />
        </label>
      ) : (
        <div className="flex gap-2">
          <input
            type="url"
            value={value}
            onChange={e => {
              onChange(e.target.value);
              setPreview(e.target.value);
            }}
            onKeyDown={e => {
              if (e.key === "Enter") {
                e.preventDefault();
                e.stopPropagation();
                handleUrlSubmit(e, value);
              }
            }}
            placeholder="https://example.com/image.jpg"
            className="flex-1 rounded-lg px-3 py-2 text-sm outline-none"
            style={{ background: "var(--t-bg)", border: `1px solid var(--t-border)`, color: "var(--t-text)" }}
          />
          <button
            type="button"
            onClick={(e) => handleUrlSubmit(e, value)}
            className="px-3 py-2 rounded-lg text-sm font-medium"
            style={{ background: "var(--t-accent)", color: "var(--t-bg)" }}
          >
            Set
          </button>
        </div>
      )}

      {uploading && <p className="text-xs mt-2" style={{ color: "var(--t-accent)" }}>Uploading...</p>}
      {error && (
        <div className="flex items-center gap-2 mt-2 text-xs" style={{ color: "#f87171" }}>
          <AlertCircle size={12} /> {error}
        </div>
      )}
    </div>
  );
}

// ─── Tag/List Input ───
export function TagInput({ label, tags, onChange }: { label: string; tags: string[]; onChange: (t: string[]) => void }) {
  const [input, setInput] = useState("");
  const add = () => { if (input.trim()) { onChange([...tags, input.trim()]); setInput(""); } };
  return (
    <div>
      <label className="block font-mono text-[11px] uppercase tracking-widest mb-1.5" style={{ color: "var(--t-muted)" }}>{label}</label>
      <div className="flex gap-2 mb-2">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), add())}
          placeholder="Type and press Enter" className="flex-1 rounded-lg px-3 py-2 text-sm outline-none"
          style={{ background: "var(--t-bg)", border: `1px solid var(--t-border)`, color: "var(--t-text)" }} />
        <button type="button" onClick={add} className="px-3 py-2 rounded-lg text-sm"
          style={{ background: `var(--t-accent)15`, color: "var(--t-accent)" }}>
          <Plus size={14} />
        </button>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag, i) => (
          <span key={i} className="flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono"
            style={{ background: `var(--t-accent)10`, color: "var(--t-accent)", border: `1px solid var(--t-accent)20` }}>
            {tag}
            <button type="button" onClick={() => onChange(tags.filter((_, j) => j !== i))} className="hover:opacity-70">
              <X size={10} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Save Button ───
export function SaveBtn({ saving, label = "Save" }: { saving: boolean; label?: string }) {
  return (
    <button type="submit" disabled={saving}
      className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all disabled:opacity-40"
      style={{ background: "var(--t-accent)", color: "var(--t-bg)" }}>
      <Save size={15} /> {saving ? "Saving..." : label}
    </button>
  );
}

// ─── Delete Button ───
export function DeleteBtn({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-red-500/10 transition-all">
      <Trash2 size={13} /> Delete
    </button>
  );
}

// ─── Card Wrapper ───
export function AdminCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl p-5 ${className}`} style={{ background: "var(--t-surface)", border: `1px solid var(--t-border)` }}>
      {children}
    </div>
  );
}

// ─── Skills List Input ───
export function SkillsInput({
  label,
  skills = [],
  onChange
}: {
  label: string;
  skills: { name: string; level: number }[];
  onChange: (s: { name: string; level: number }[]) => void;
}) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState(80);

  const add = () => {
    if (name.trim()) {
      onChange([...skills, { name: name.trim(), level: Number(level) }]);
      setName("");
      setLevel(80);
    }
  };

  return (
    <div>
      <label className="block font-mono text-[11px] uppercase tracking-widest mb-1.5" style={{ color: "var(--t-muted)" }}>
        {label}
      </label>
      <div className="flex gap-2 mb-2 items-center">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Skill Name (e.g. React)"
          className="flex-1 rounded-lg px-3 py-2 text-sm outline-none"
          style={{ background: "var(--t-bg)", border: `1px solid var(--t-border)`, color: "var(--t-text)" }}
          onKeyDown={e => e.key === "Enter" && (e.preventDefault(), add())}
        />
        <div className="flex items-center gap-1.5">
          <input
            type="number"
            min="0"
            max="100"
            value={level}
            onChange={e => setLevel(Math.min(100, Math.max(0, Number(e.target.value))))}
            className="w-16 rounded-lg px-2 py-2 text-sm outline-none text-center"
            style={{ background: "var(--t-bg)", border: `1px solid var(--t-border)`, color: "var(--t-text)" }}
          />
          <span className="text-xs" style={{ color: "var(--t-muted)" }}>%</span>
        </div>
        <button type="button" onClick={add} className="px-3 py-2 rounded-lg text-sm"
          style={{ background: `var(--t-accent)15`, color: "var(--t-accent)" }}>
          <Plus size={14} />
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {skills.map((s, i) => (
          <span key={i} className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono"
            style={{ background: `var(--t-accent)10`, color: "var(--t-accent)", border: `1px solid var(--t-accent)20` }}>
            {s.name} ({s.level}%)
            <button type="button" onClick={() => onChange(skills.filter((_, j) => j !== i))} className="hover:opacity-70">
              <X size={10} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
