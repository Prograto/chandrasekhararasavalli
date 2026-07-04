import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { isConfigured } from "@/lib/firebase";
import { LogIn, AlertTriangle, Mail } from "lucide-react";

export function AdminLogin() {
  const { signIn, signInWithGoogle, error, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await signIn(email, password);
    setSubmitting(false);
  };

  const handleGoogleSignIn = async () => {
    setSubmitting(true);
    await signInWithGoogle();
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--t-bg)" }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display text-2xl font-bold mb-2" style={{ color: "var(--t-text)" }}>
            Admin Panel
          </h1>
          <p className="text-sm" style={{ color: "var(--t-muted)" }}>
            Sign in to manage your portfolio content
          </p>
        </div>

        {!isConfigured && (
          <div className="rounded-xl p-4 mb-6 flex items-start gap-3"
            style={{ background: "#f59e0b15", border: "1px solid #f59e0b30" }}>
            <AlertTriangle size={18} className="shrink-0 mt-0.5" style={{ color: "#f59e0b" }} />
            <div>
              <p className="text-sm font-medium" style={{ color: "#f59e0b" }}>Firebase not configured</p>
              <p className="text-xs mt-1" style={{ color: "var(--t-muted)" }}>
                Copy <code className="font-mono">.env.example</code> to <code className="font-mono">.env.local</code> and add your Firebase credentials. Then enable Email/Password auth in your Firebase Console under Authentication.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="rounded-2xl p-6" style={{ background: "var(--t-surface)", border: `1px solid var(--t-border)` }}>
          <div className="mb-4">
            <label className="block font-mono text-xs uppercase tracking-widest mb-2" style={{ color: "var(--t-muted)" }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full rounded-lg px-4 py-2.5 text-sm outline-none"
              style={{ background: "var(--t-bg)", border: `1px solid var(--t-border)`, color: "var(--t-text)" }}
              placeholder="admin@example.com" />
          </div>

          <div className="mb-5">
            <label className="block font-mono text-xs uppercase tracking-widest mb-2" style={{ color: "var(--t-muted)" }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              className="w-full rounded-lg px-4 py-2.5 text-sm outline-none"
              style={{ background: "var(--t-bg)", border: `1px solid var(--t-border)`, color: "var(--t-text)" }}
              placeholder="Enter password" />
          </div>

          {error && (
            <p className="text-xs text-red-400 mb-4 font-mono">{error}</p>
          )}

          <button type="submit" disabled={submitting || !isConfigured}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium text-sm transition-all disabled:opacity-40"
            style={{ background: "var(--t-accent)", color: "var(--t-bg)" }}>
            <LogIn size={16} />
            {submitting ? "Signing in..." : "Sign In"}
          </button>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: "var(--t-border)" }}></div>
            <span className="text-xs" style={{ color: "var(--t-muted)" }}>OR</span>
            <div className="flex-1 h-px" style={{ background: "var(--t-border)" }}></div>
          </div>

          <button type="button" onClick={handleGoogleSignIn} disabled={submitting || !isConfigured}
            className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium text-sm transition-all disabled:opacity-40"
            style={{ background: "var(--t-surface)", color: "var(--t-text)", border: "1px solid var(--t-border)" }}>
            <Mail size={16} />
            {submitting ? "Signing in..." : "Sign in with Google"}
          </button>
        </form>

        <p className="text-center mt-6 text-xs" style={{ color: "var(--t-muted)", opacity: 0.5 }}>
          <a href="/" className="hover:underline">Back to portfolio</a>
        </p>
      </div>
    </div>
  );
}
