

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form || typeof firebase === "undefined" || !window.db) {
    console.warn("Contact form or Firebase not initialized");
    return;
  }

  const statusDiv = document.getElementById("formStatus");
  const MAX_MESSAGES_PER_DAY = 10;


  
  function sanitizeInput(str) {
    if (typeof DOMPurify !== "undefined") {
      return DOMPurify.sanitize(str, {
        ALLOWED_TAGS: [], // No HTML tags
        ALLOWED_ATTR: [], // No attributes
        KEEP_CONTENT: true, // Keep text content
      }).trim();
    } else {
      const div = document.createElement("div");
      div.textContent = str;
      return div.innerHTML;
    }
  }

  
  function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email) && email.length <= 254;
  }

  
  function isValidLength(str, maxLength = 5000) {
    return str.length > 0 && str.length <= maxLength;
  }

  
  function getTodaySubmissionCount() {
    try {
      const submissions = JSON.parse(
        localStorage.getItem("contactSubmissions") || "[]",
      );
      const today = new Date().toISOString().split("T")[0];
      return submissions.filter((s) => s.date === today).length;
    } catch (e) {
      console.error("localStorage error:", e);
      return 0;
    }
  }

  
  function recordSubmissionLocally() {
    try {
      const submissions = JSON.parse(
        localStorage.getItem("contactSubmissions") || "[]",
      );
      const today = new Date().toISOString().split("T")[0];

      submissions.push({
        timestamp: Date.now(),
        date: today,
      });

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const filteredSubmissions = submissions.filter(
        (s) => new Date(s.date) > thirtyDaysAgo,
      );

      localStorage.setItem(
        "contactSubmissions",
        JSON.stringify(filteredSubmissions),
      );
    } catch (e) {
      console.error("localStorage error:", e);
    }
  }

  
  function showStatus(message, type = "error") {
    if (!statusDiv) return;

    statusDiv.style.display = "block";
    statusDiv.style.background = type === "success" ? "#4CAF50" : "#ff4444";
    statusDiv.style.color = "#fff";
    statusDiv.style.padding = "12px 20px";
    statusDiv.style.borderRadius = "4px";
    statusDiv.style.marginBottom = "20px";
    statusDiv.style.fontWeight = "500";

    statusDiv.textContent = message;

    if (type === "success") {
      setTimeout(() => {
        statusDiv.style.display = "none";
      }, 6000);
    }
  }


  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let name = document.getElementById("contactName")?.value || "";
    let email = document.getElementById("contactEmail")?.value || "";
    let subject = document.getElementById("contactSubject")?.value || "";
    let message = document.getElementById("contactMessage")?.value || "";

    name = sanitizeInput(name);
    email = sanitizeInput(email);
    subject = sanitizeInput(subject);
    message = sanitizeInput(message);

    if (!name || !email || !subject || !message) {
      showStatus("❌ Lütfen tüm alanları doldurun!", "error");
      return;
    }

    if (!isValidEmail(email)) {
      showStatus("❌ Geçerli bir e-posta adresi girin!", "error");
      return;
    }

    if (!isValidLength(name, 100)) {
      showStatus("❌ İsim çok uzun! (Max 100 karakter)", "error");
      return;
    }
    if (!isValidLength(subject, 200)) {
      showStatus("❌ Konu çok uzun! (Max 200 karakter)", "error");
      return;
    }
    if (!isValidLength(message, 5000)) {
      showStatus("❌ Mesaj çok uzun! (Max 5000 karakter)", "error");
      return;
    }

    const todayCount = getTodaySubmissionCount();
    if (todayCount >= MAX_MESSAGES_PER_DAY) {
      showStatus(
        `❌ Günde ${MAX_MESSAGES_PER_DAY} mesaj limitine ulaştınız. Lütfen yarın tekrar deneyin.`,
        "error",
      );
      return;
    }

    const contactData = {
      name, // ✅ Sanitized
      email, // ✅ Sanitized
      subject, // ✅ Sanitized
      message, // ✅ Sanitized
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      read: false,
      userAgent: navigator.userAgent.substring(0, 200),
      submittedFrom: window.location.hostname,
      ipAddress: "client-side-only", // Server should add real IP
    };

    db.collection("contacts")
      .add(contactData)
      .then((docRef) => {
        recordSubmissionLocally();

        const remainingMessages = MAX_MESSAGES_PER_DAY - todayCount - 1;

        let successMsg = "✅ Mesajınız başarıyla gönderildi!";
        if (remainingMessages > 0) {
          successMsg += ` (Bugün ${remainingMessages}/${MAX_MESSAGES_PER_DAY} mesajınız kaldı)`;
        }

        showStatus(successMsg, "success");

        form.reset();
      })
      .catch((error) => {
        console.error("❌ Firestore Error:", error);

        let errorMsg = "❌ Bir hata oluştu. Lütfen tekrar deneyin.";

        if (error.code === "permission-denied") {
          errorMsg =
            "❌ Gönderim izni reddedildi. Firestore Rules kontrol edin.";
        } else if (error.code === "not-found") {
          errorMsg = "❌ Veritabanı bağlantısı kurulamadı.";
        } else if (error.message) {
          errorMsg = `❌ Hata: ${error.message.substring(0, 100)}`;
        }

        showStatus(errorMsg, "error");
      });
  });
});

