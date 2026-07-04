import { db } from "@/lib/firebase";
import { collection, writeBatch, doc } from "firebase/firestore";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import { services } from "@/data/services";
import { skillCategories } from "@/data/skills";
import { certificates } from "@/data/certificates";
import { freelanceClients } from "@/data/freelance";
import { achievements } from "@/data/achievements";
import { profile } from "@/data/profile";

export interface MigrationResult {
  collection: string;
  success: number;
  failed: number;
  error?: string;
}

export interface MigrationProgress {
  current: number;
  total: number;
  collection: string;
  message: string;
}

/**
 * Migrate all static data to Firebase Firestore
 * Call this function to push all your data to Firebase
 */
export async function migrateAllData(
  onProgress?: (progress: MigrationProgress) => void
): Promise<MigrationResult[]> {
  if (!db) {
    throw new Error("Firebase not configured. Add your credentials to .env.local");
  }

  const results: MigrationResult[] = [];
  let totalCount = 0;

  // Step 1: Migrate Profile
  try {
    const profileRef = doc(db, "siteContent", "profile");
    const profileBatch = writeBatch(db);
    profileBatch.set(profileRef, profile);
    await profileBatch.commit();
    
    onProgress?.({
      current: ++totalCount,
      total: 8,
      collection: "Profile",
      message: "Profile updated"
    });
    
    results.push({ collection: "Profile", success: 1, failed: 0 });
  } catch (err: any) {
    results.push({ 
      collection: "Profile", 
      success: 0, 
      failed: 1, 
      error: err.message 
    });
  }

  // Step 2: Migrate Projects
  try {
    const projectsRef = collection(db, "projects");
    const projectsBatch = writeBatch(db);
    
    projects.forEach(project => {
      const docRef = doc(projectsRef, project.id);
      projectsBatch.set(docRef, project);
    });
    
    await projectsBatch.commit();
    
    onProgress?.({
      current: ++totalCount,
      total: 8,
      collection: "Projects",
      message: `${projects.length} projects migrated`
    });
    
    results.push({ collection: "Projects", success: projects.length, failed: 0 });
  } catch (err: any) {
    results.push({ 
      collection: "Projects", 
      success: 0, 
      failed: projects.length, 
      error: err.message 
    });
  }

  // Step 3: Migrate Experience
  try {
    const experienceRef = collection(db, "experience");
    const experienceBatch = writeBatch(db);
    
    experience.forEach(exp => {
      const docRef = doc(experienceRef, exp.id);
      experienceBatch.set(docRef, exp);
    });
    
    await experienceBatch.commit();
    
    onProgress?.({
      current: ++totalCount,
      total: 8,
      collection: "Experience",
      message: `${experience.length} experience entries migrated`
    });
    
    results.push({ collection: "Experience", success: experience.length, failed: 0 });
  } catch (err: any) {
    results.push({ 
      collection: "Experience", 
      success: 0, 
      failed: experience.length, 
      error: err.message 
    });
  }

  // Step 4: Migrate Services
  try {
    const servicesRef = collection(db, "services");
    const servicesBatch = writeBatch(db);
    
    services.forEach(service => {
      const docRef = doc(servicesRef, service.id);
      servicesBatch.set(docRef, service);
    });
    
    await servicesBatch.commit();
    
    onProgress?.({
      current: ++totalCount,
      total: 8,
      collection: "Services",
      message: `${services.length} services migrated`
    });
    
    results.push({ collection: "Services", success: services.length, failed: 0 });
  } catch (err: any) {
    results.push({ 
      collection: "Services", 
      success: 0, 
      failed: services.length, 
      error: err.message 
    });
  }

  // Step 5: Migrate Skills
  try {
    const skillsRef = collection(db, "skillCategories");
    const skillsBatch = writeBatch(db);
    
    skillCategories.forEach(category => {
      const docRef = doc(skillsRef, category.id);
      skillsBatch.set(docRef, category);
    });
    
    await skillsBatch.commit();
    
    onProgress?.({
      current: ++totalCount,
      total: 8,
      collection: "Skills",
      message: `${skillCategories.length} skill categories migrated`
    });
    
    results.push({ collection: "Skills", success: skillCategories.length, failed: 0 });
  } catch (err: any) {
    results.push({ 
      collection: "Skills", 
      success: 0, 
      failed: skillCategories.length, 
      error: err.message 
    });
  }

  // Step 6: Migrate Certificates
  try {
    const certificatesRef = collection(db, "certificates");
    const certificatesBatch = writeBatch(db);
    
    certificates.forEach(cert => {
      const docRef = doc(certificatesRef, cert.id);
      certificatesBatch.set(docRef, cert);
    });
    
    await certificatesBatch.commit();
    
    onProgress?.({
      current: ++totalCount,
      total: 8,
      collection: "Certificates",
      message: `${certificates.length} certificates migrated`
    });
    
    results.push({ collection: "Certificates", success: certificates.length, failed: 0 });
  } catch (err: any) {
    results.push({ 
      collection: "Certificates", 
      success: 0, 
      failed: certificates.length, 
      error: err.message 
    });
  }

  // Step 7: Migrate Freelance Clients
  try {
    const freelanceRef = collection(db, "freelanceClients");
    const freelanceBatch = writeBatch(db);
    
    freelanceClients.forEach(client => {
      const docRef = doc(freelanceRef, client.id);
      freelanceBatch.set(docRef, client);
    });
    
    await freelanceBatch.commit();
    
    onProgress?.({
      current: ++totalCount,
      total: 8,
      collection: "Freelance",
      message: `${freelanceClients.length} freelance clients migrated`
    });
    
    results.push({ collection: "Freelance", success: freelanceClients.length, failed: 0 });
  } catch (err: any) {
    results.push({ 
      collection: "Freelance", 
      success: 0, 
      failed: freelanceClients.length, 
      error: err.message 
    });
  }

  // Step 8: Migrate Achievements
  try {
    const achievementsRef = collection(db, "achievements");
    const achievementsBatch = writeBatch(db);
    
    achievements.forEach(achievement => {
      const docRef = doc(achievementsRef, achievement.id);
      achievementsBatch.set(docRef, achievement);
    });
    
    await achievementsBatch.commit();
    
    onProgress?.({
      current: ++totalCount,
      total: 8,
      collection: "Achievements",
      message: `${achievements.length} achievements migrated`
    });
    
    results.push({ collection: "Achievements", success: achievements.length, failed: 0 });
  } catch (err: any) {
    results.push({ 
      collection: "Achievements", 
      success: 0, 
      failed: achievements.length, 
      error: err.message 
    });
  }

  return results;
}

/**
 * Get summary statistics for migration data
 */
export function getMigrationStats() {
  return {
    profile: 1,
    projects: projects.length,
    experience: experience.length,
    services: services.length,
    skills: skillCategories.length,
    certificates: certificates.length,
    freelance: freelanceClients.length,
    achievements: achievements.length,
    total: 1 + projects.length + experience.length + services.length + skillCategories.length + certificates.length + freelanceClients.length + achievements.length,
  };
}
