import { useContactMessages } from "@/hooks/useFirestore";
import { AdminCard } from "@/admin/components/FormFields";
import { Mail, Check, Reply, Trash2 } from "lucide-react";

export function MessagesPage() {
  const { messages, loading, markRead, markReplied, remove } = useContactMessages();

  const sorted = [...messages].sort((a, b) => {
    const ta = a.timestamp?.seconds || 0;
    const tb = b.timestamp?.seconds || 0;
    return tb - ta;
  });

  const statusColor = (s: string) =>
    s === "new" ? "#f59e0b" : s === "read" ? "#06b6d4" : "#10b981";

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-1" style={{ color: "var(--t-text)" }}>Messages</h1>
      <p className="text-sm mb-6" style={{ color: "var(--t-muted)" }}>
        {messages.filter(m => m.status === "new").length} unread of {messages.length} total
      </p>

      {loading && <p className="text-sm" style={{ color: "var(--t-muted)" }}>Loading...</p>}

      <div className="space-y-3">
        {sorted.map(msg => (
          <AdminCard key={msg.id}>
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: statusColor(msg.status) }} />
                  <span className="font-medium text-sm" style={{ color: "var(--t-text)" }}>{msg.name}</span>
                  <span className="text-xs font-mono truncate" style={{ color: "var(--t-muted)" }}>{msg.email}</span>
                </div>
                <p className="text-xs mb-2 font-mono" style={{ color: "var(--t-accent)" }}>
                  {msg.projectType} {msg.budget ? `· ${msg.budget}` : ""}
                </p>
                <p className="text-sm" style={{ color: "var(--t-muted)" }}>{msg.message}</p>
                {msg.phone && (
                  <p className="text-xs mt-2 font-mono" style={{ color: "var(--t-muted)", opacity: 0.6 }}>Phone: {msg.phone}</p>
                )}
              </div>
              <div className="flex items-center gap-1 shrink-0 w-full sm:w-auto sm:justify-end">
                {msg.status === "new" && (
                  <button onClick={() => markRead(msg.id)} title="Mark read"
                    className="flex-1 sm:flex-none p-1.5 rounded-lg hover:bg-white/5" style={{ color: "#06b6d4" }}>
                    <Check size={14} />
                  </button>
                )}
                {msg.status !== "replied" && (
                  <button onClick={() => markReplied(msg.id)} title="Mark replied"
                    className="flex-1 sm:flex-none p-1.5 rounded-lg hover:bg-white/5" style={{ color: "#10b981" }}>
                    <Reply size={14} />
                  </button>
                )}
                <a href={`mailto:${msg.email}?subject=Re: ${msg.subject || "Portfolio Inquiry"}`}
                  className="flex-1 sm:flex-none p-1.5 rounded-lg hover:bg-white/5" style={{ color: "var(--t-muted)" }}>
                  <Mail size={14} />
                </a>
                <button onClick={() => remove(msg.id)}
                  className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-400">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </AdminCard>
        ))}
        {!loading && messages.length === 0 && (
          <p className="text-sm text-center py-8" style={{ color: "var(--t-muted)" }}>No messages yet.</p>
        )}
      </div>
    </div>
  );
}
