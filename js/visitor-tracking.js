(function () {
  "use strict";

  // Bugün zaten sayıldı mı kontrol et
  function hasTrackedToday() {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const lastTrackedDate = localStorage.getItem("lastTrackedDate");
    return lastTrackedDate === today;
  }

  // Bugün sayıldığını işaretle
  function markTrackedToday() {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    localStorage.setItem("lastTrackedDate", today);
  }

  // Ziyaretçi sayısını Firestore'a kaydet
  async function trackVisitor() {
    try {
      // Bugün zaten sayıldıysa, tekrar sayma
      if (hasTrackedToday()) {
        return;
      }

      // Firebase config'i kontrol et
      if (typeof firebase === "undefined" || !firebase.firestore) {
        return;
      }

      const db = firebase.firestore();
      const now = new Date();
      const dateStr = now.toISOString().split("T")[0]; // YYYY-MM-DD

      // Hafta numarasını hesapla (ISO 8601)
      function getWeekNumber(date) {
        const d = new Date(
          Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
        );
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
      }

      const year = now.getFullYear().toString();
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const week = getWeekNumber(now).toString();

      // Ziyaretçi bilgilerini Firestore'a kaydet
      const statsRef = db.collection("site-visitors").doc("summary");

      await statsRef.set(
        {
          daily: {
            [dateStr]: firebase.firestore.FieldValue.increment(1),
          },
          weekly: {
            [`${year}-W${week}`]: firebase.firestore.FieldValue.increment(1),
          },
          monthly: {
            [`${year}-${month}`]: firebase.firestore.FieldValue.increment(1),
          },
          yearly: {
            [year]: firebase.firestore.FieldValue.increment(1),
          },
          lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true },
      );

      // Bugün sayıldığını işaretle
      markTrackedToday();
    } catch (error) {
      // Silent fail
    }
  }

  // Sayfa yüklendiğinde ziyaretçi sayısını kaydet
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", trackVisitor);
  } else {
    trackVisitor();
  }
})();
