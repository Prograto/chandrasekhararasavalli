import { useState, useEffect, useCallback } from "react";
import {
  collection, doc, getDocs, getDoc, setDoc, addDoc, deleteDoc,
  updateDoc, serverTimestamp, query, orderBy,
} from "firebase/firestore";
import { db, isConfigured } from "@/lib/firebase";

// ─── Generic Firestore CRUD ───

export function useFirestoreCollection<T>(collectionName: string) {
  const [data, setData] = useState<(T & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!db || !isConfigured) { setLoading(false); return; }
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, collectionName));
      setData(snap.docs.map((d) => ({ id: d.id, ...d.data() } as T & { id: string })));
    } catch (e) {
      console.error(`Firestore read ${collectionName}:`, e);
    }
    setLoading(false);
  }, [collectionName]);

  useEffect(() => { refresh(); }, [refresh]);

  const add = async (item: Omit<T, "id">) => {
    if (!db) return;
    await addDoc(collection(db, collectionName), { ...item, updatedAt: serverTimestamp() });
    await refresh();
  };

  const update = async (id: string, item: Partial<T>) => {
    if (!db) return;
    await updateDoc(doc(db, collectionName, id), { ...item, updatedAt: serverTimestamp() });
    await refresh();
  };

  const remove = async (id: string) => {
    if (!db) return;
    await deleteDoc(doc(db, collectionName, id));
    await refresh();
  };

  return { data, loading, add, update, remove, refresh };
}

// ─── Single Document (for profile) ───

export function useFirestoreDoc<T>(collectionName: string, docId: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!db || !isConfigured) { setLoading(false); return; }
    setLoading(true);
    try {
      const snap = await getDoc(doc(db, collectionName, docId));
      if (snap.exists()) setData(snap.data() as T);
    } catch (e) {
      console.error(`Firestore read ${collectionName}/${docId}:`, e);
    }
    setLoading(false);
  }, [collectionName, docId]);

  useEffect(() => { refresh(); }, [refresh]);

  const save = async (item: T) => {
    if (!db) return;
    await setDoc(doc(db, collectionName, docId), { ...item, updatedAt: serverTimestamp() });
    await refresh();
  };

  return { data, loading, save, refresh };
}

// ─── Contact Messages (read + mark as read) ───

export function useContactMessages() {
  const { data, loading, refresh, update, remove } = useFirestoreCollection<{
    name: string; email: string; phone?: string; subject: string;
    projectType: string; budget?: string; message: string;
    status: string; timestamp: any;
  }>("contactMessages");

  const markRead = async (id: string) => update(id, { status: "read" } as any);
  const markReplied = async (id: string) => update(id, { status: "replied" } as any);

  return { messages: data, loading, refresh, markRead, markReplied, remove };
}
