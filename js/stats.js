document.addEventListener("DOMContentLoaded", async () => {
  if (typeof firebase === "undefined" || !window.db) {
    console.warn("Firebase not initialized. Stats will not load.");
    return;
  }

  try {
    const projectsSnap = await window.db.collection("projects").get();
    const projectsCount = projectsSnap.size;
    document.getElementById("projects-count").textContent = projectsCount;

    const certificatesSnap = await window.db.collection("certificates").get();
    const certificatesCount = certificatesSnap.size;
    document.getElementById("certificates-count").textContent =
      certificatesCount;

    const skillsSnap = await window.db.collection("skills").get();
    const skillsCount = skillsSnap.size;
    document.getElementById("skills-count").textContent = skillsCount;
  } catch (error) {
    document.getElementById("projects-count").textContent = "?";
    document.getElementById("certificates-count").textContent = "?";
    document.getElementById("skills-count").textContent = "?";
  }
});

