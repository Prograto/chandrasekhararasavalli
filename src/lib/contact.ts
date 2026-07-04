import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, isConfigured } from "./firebase";
import type { ContactMessage } from "@/types";

/**
 * Saves a contact message to Firestore (when Firebase is configured) AND
 * opens a WhatsApp message as a backup notification.
 *
 * Firestore collection: contactMessages
 * Fields stored: name, email, phone, subject, projectType, budget,
 *                message, timestamp, status, source
 */
export async function submitContactForm(
  values: Omit<ContactMessage, "id" | "timestamp" | "status" | "source">,
  whatsappNumber: string,
): Promise<{ ok: true; savedToFirestore: boolean }> {
  let savedToFirestore = false;

  // 1. Try to save to Firestore
  if (isConfigured && db) {
    try {
      await addDoc(collection(db, "contactMessages"), {
        ...values,
        status: "new",
        source: "website",
        timestamp: serverTimestamp(),
      } satisfies Omit<ContactMessage, "id">);
      savedToFirestore = true;
    } catch (err) {
      console.warn("Firestore save failed, falling back to WhatsApp only:", err);
    }
  }

  // 2. WhatsApp notification (always runs — you get notified instantly)
  const text = encodeURIComponent(
    `📩 New portfolio message!\n\n*From:* ${values.name}\n*Email:* ${values.email}${values.phone ? `\n*Phone:* ${values.phone}` : ""}\n*Subject:* ${values.subject}\n*Type:* ${values.projectType}\n*Budget:* ${values.budget || "Not specified"}\n\n*Message:*\n${values.message}`,
  );
  const clean = whatsappNumber.replace(/\D/g, "");
  window.open(`https://wa.me/${clean}?text=${text}`, "_blank");

  return { ok: true, savedToFirestore };
}
