import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db, isConfigured } from "@/lib/firebase";
import { MessageSquare, X, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Toast {
  id: string;
  messageId: string;
  name: string;
  subject: string;
  message: string;
}

export function AdminNotificationListener() {
  const navigate = useNavigate();
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>("default");
  const isInitial = useRef(true);

  // 1. Request notification permission on mount
  useEffect(() => {
    if ("Notification" in window) {
      setPermissionStatus(Notification.permission);
      if (Notification.permission === "default") {
        Notification.requestPermission().then((perm) => {
          setPermissionStatus(perm);
        });
      }
    }
  }, []);

  // 2. Listen to Firestore messages in real time
  useEffect(() => {
    if (!db || !isConfigured) return;

    const q = query(collection(db, "contactMessages"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (isInitial.current) {
        // Skip notifying for existing messages during the initial load
        isInitial.current = false;
        return;
      }

      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const data = change.doc.data();
          // Notify only if it's a new unread message
          if (data.status === "new") {
            const docId = change.doc.id;
            const name = data.name || "Anonymous";
            const subject = data.subject || "No Subject";
            const message = data.message || "";

            // A. Desktop notification
            if ("Notification" in window && Notification.permission === "granted") {
              const notification = new Notification(`New Message from ${name}`, {
                body: message.length > 80 ? `${message.substring(0, 77)}...` : message,
                icon: "/favicon.ico",
                tag: docId,
              });

              notification.onclick = () => {
                window.focus();
                navigate("/admin/messages");
              };
            }

            // B. In-app toast notification
            const toastId = Math.random().toString(36).substring(2);
            setToasts((prev) => [
              ...prev,
              { id: toastId, messageId: docId, name, subject, message },
            ]);

            // Auto close after 7 seconds
            setTimeout(() => {
              setToasts((prev) => prev.filter((t) => t.id !== toastId));
            }, 7000);
          }
        }
      });
    });

    return () => unsubscribe();
  }, [navigate]);

  const requestPermission = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((perm) => {
        setPermissionStatus(perm);
      });
    }
  };

  return (
    <>
      {/* Dynamic Toast Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 w-full max-w-sm pointer-events-none px-4">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
              className="pointer-events-auto w-full glass-hi rounded-2xl border border-yellow-500/30 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex gap-3 overflow-hidden relative"
              style={{ background: "rgba(23, 23, 23, 0.85)", backdropFilter: "blur(12px)" }}
            >
              {/* Left accent line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500 animate-pulse" />

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-500">
                <MessageSquare size={16} />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-xs font-mono uppercase tracking-wider text-yellow-500 font-bold mb-0.5">
                  New Message
                </p>
                <h4 className="text-sm font-semibold truncate text-white" style={{ color: "var(--t-text)" }}>
                  {toast.name}
                </h4>
                <p className="text-xs text-zinc-400 truncate mb-2">
                  {toast.subject !== "No Subject" ? toast.subject : toast.message}
                </p>
                <button
                  onClick={() => {
                    setToasts((prev) => prev.filter((t) => t.id !== toast.id));
                    navigate("/admin/messages");
                  }}
                  className="px-3 py-1 rounded bg-yellow-500 text-black font-semibold text-[10px] uppercase tracking-wider hover:bg-yellow-400 transition-colors"
                >
                  View Message
                </button>
              </div>

              <button
                onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                className="text-zinc-400 hover:text-white shrink-0 self-start p-1"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Permission helper for Admin Layout when notifications are blocked or default */}
      {permissionStatus !== "granted" && (
        <div className="fixed bottom-5 left-5 z-40">
          <button
            onClick={requestPermission}
            title="Enable Desktop Notifications"
            className="flex items-center justify-center h-10 w-10 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-yellow-500 border border-zinc-700 hover:border-yellow-500/50 shadow-lg transition-all duration-300 pointer-events-auto"
          >
            <Bell size={16} className="animate-bounce" />
          </button>
        </div>
      )}
    </>
  );
}
