document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form || typeof firebase === "undefined" || !window.db) return;

  const formMessage =
    document.getElementById("formStatus") ||
    document.getElementById("formMessage");
  const MAX_MESSAGES_PER_DAY = 10;

  
  function getTodaySubmissionCount() {
    const submissions = JSON.parse(
      localStorage.getItem("contactSubmissions") || "[]",
    );
    const today = new Date().toISOString().split("T")[0];
    return submissions.filter((s) => s.date === today).length;
  }

  
  function recordSubmissionLocally() {
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
  }

  
  function showStatus(message, type = "error") {
    if (!formMessage) return;
    formMessage.style.display = "block";
    formMessage.style.color = type === "success" ? "#4CAF50" : "#ff4444";
    formMessage.textContent = message;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("input[name='name']").value.trim();
    const email = document.querySelector("input[name='email']").value.trim();
    const message = document
      .querySelector("textarea[name='message']")
      .value.trim();

    if (!name || !email || !message) {
      showStatus("Lütfen tüm alanları doldurun!", "error");
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
      name,
      email,
      message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      read: false,
    };

    db.collection("contacts")
      .add(contactData)
      .then(() => {
        recordSubmissionLocally();
        const remainingMessages = MAX_MESSAGES_PER_DAY - todayCount - 1;

        showStatus(
          `✓ Mesajınız başarıyla gönderildi! En kısa sürede dönüş yapacağız. (Bugün ${remainingMessages}/${MAX_MESSAGES_PER_DAY})`,
          "success",
        );
        form.reset();
        setTimeout(() => {
          if (formMessage) formMessage.style.display = "none";
        }, 6000);
      })
      .catch((error) => {
        console.error("Firestore Error:", error);
        showStatus("✗ Bir hata oluştu. Lütfen tekrar deneyin.", "error");
      });
  });
});

