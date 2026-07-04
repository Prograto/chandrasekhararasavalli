import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, isConfigured } from "@/lib/firebase";
import { profile as staticProfile } from "@/data/profile";

export function useProfile() {
  const [profile, setProfile] = useState(staticProfile);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db || !isConfigured) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const snap = await getDoc(doc(db!, "siteContent", "profile"));
        if (snap.exists()) {
          const data = snap.data();
          setProfile({
            ...staticProfile,
            ...data,
            bio: Array.isArray(data.bio) ? data.bio : staticProfile.bio,
          });
        }
      } catch (err) {
        console.warn("Failed to fetch profile from Firestore, using static data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading };
}
