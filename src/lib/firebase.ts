import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

/**
 * Firebase configuration.
 * TODO: Replace these with your actual project values from
 * https://console.firebase.google.com → Project Settings → Your apps
 *
 * For production, store them in .env.local as VITE_FIREBASE_*
 * and reference them as import.meta.env.VITE_FIREBASE_API_KEY, etc.
 *
 * CURRENT STATUS: Using placeholder values — the app works offline.
 * Firebase calls gracefully no-op when the project isn't configured.
 */
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY            ?? "YOUR_API_KEY",
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN        ?? "YOUR_PROJECT.firebaseapp.com",
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID         ?? "YOUR_PROJECT_ID",
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET     ?? "YOUR_PROJECT.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "YOUR_SENDER_ID",
  appId:             import.meta.env.VITE_FIREBASE_APP_ID             ?? "YOUR_APP_ID",
  measurementId:     import.meta.env.VITE_FIREBASE_MEASUREMENT_ID     ?? "YOUR_MEASUREMENT_ID",
};

const isConfigured = firebaseConfig.apiKey !== "YOUR_API_KEY";

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db              = isConfigured ? getFirestore(app) : null;
export const storage         = isConfigured ? getStorage(app)   : null;
export const auth            = isConfigured ? getAuth(app)      : null;
export const googleProvider  = isConfigured ? new GoogleAuthProvider() : null;

// Analytics only in browser + only if configured
export const initAnalytics = async () => {
  if (!isConfigured) return null;
  const supported = await isSupported();
  if (!supported) return null;
  return getAnalytics(app);
};

export { isConfigured };
