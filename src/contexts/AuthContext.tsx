import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth";
import { auth, isConfigured, googleProvider } from "@/lib/firebase";

interface AuthCtx {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthCtx>({
  user: null,
  loading: true,
  signIn: async () => {},  signInWithGoogle: async () => {},  signOut: async () => {},
  error: null,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth || !isConfigured) {
      setLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!auth) {
      setError("Firebase not configured. Add your credentials to .env.local");
      return;
    }
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      const msg =
        err.code === "auth/invalid-credential"
          ? "Invalid email or password"
          : err.code === "auth/too-many-requests"
          ? "Too many attempts. Try again later."
          : err.message || "Login failed";
      setError(msg);
    }
  };

  const signInWithGoogle = async () => {
    if (!auth || !googleProvider) {
      setError("Firebase not configured. Add your credentials to .env.local");
      return;
    }
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      const msg =
        err.code === "auth/popup-closed-by-user"
          ? "Sign-in popup was closed"
          : err.code === "auth/popup-blocked"
          ? "Sign-in popup was blocked by browser"
          : err.message || "Google sign-in failed";
      setError(msg);
    }
  };

  const signOut = async () => {
    if (auth) await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signInWithGoogle, signOut, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
