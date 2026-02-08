/**
 * ========================================
 * PORTFOLIO STATS - FIREBASE DATA LOADER
 * ========================================
 * Loads statistics from Firestore:
 * - Projects count
 * - Certificates count
 * - Skills count
 */

document.addEventListener("DOMContentLoaded", async () => {
  // Firebase'nin yüklenmiş olduğunu kontrol et
  if (typeof firebase === "undefined" || !window.db) {
    console.warn("Firebase not initialized. Stats will not load.");
    return;
  }

  try {
    // Projects sayısını çek
    const projectsSnap = await window.db.collection("projects").get();
    const projectsCount = projectsSnap.size;
    document.getElementById("projects-count").textContent = projectsCount;

    // Certificates sayısını çek
    const certificatesSnap = await window.db.collection("certificates").get();
    const certificatesCount = certificatesSnap.size;
    document.getElementById("certificates-count").textContent =
      certificatesCount;

    // Skills sayısını çek
    const skillsSnap = await window.db.collection("skills").get();
    const skillsCount = skillsSnap.size;
    document.getElementById("skills-count").textContent = skillsCount;

    console.log("✅ Stats loaded successfully!");
  } catch (error) {
    console.error("❌ Error loading stats from Firebase:", error);
    // Fallback values if Firebase fails
    document.getElementById("projects-count").textContent = "?";
    document.getElementById("certificates-count").textContent = "?";
    document.getElementById("skills-count").textContent = "?";
  }
});
