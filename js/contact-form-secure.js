/**
 * ========================================
 * XSS-SECURE CONTACT FORM
 * ========================================
 *
 * Features:
 * ✅ DOMPurify integration for XSS prevention
 * ✅ Email validation (RFC 5322 simplified)
 * ✅ Input length validation
 * ✅ Rate limiting (10 messages/day)
 * ✅ Server timestamp
 * ✅ Safe DOM manipulation (textContent)
 *
 * Security Requirements:
 * - Add DOMPurify: <script src="https://cdn.jsdelivr.net/npm/dompurify@3.0.6/dist/purify.min.js"></script>
 * - Place before this script in HTML
 */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form || typeof firebase === "undefined" || !window.db) {
    console.warn("Contact form or Firebase not initialized");
    return;
  }

  const statusDiv = document.getElementById("formStatus");
  const MAX_MESSAGES_PER_DAY = 10;

  // ========================================
  // SECURITY FUNCTIONS
  // ========================================

  /**
   * GÜVENLİK: Input Sanitization
   * Removes all HTML tags and scripts
   * @param {string} str - Input string to sanitize
   * @returns {string} Sanitized string
   */
  function sanitizeInput(str) {
    if (typeof DOMPurify !== "undefined") {
      // Use DOMPurify if available (RECOMMENDED)
      return DOMPurify.sanitize(str, {
        ALLOWED_TAGS: [], // No HTML tags
        ALLOWED_ATTR: [], // No attributes
        KEEP_CONTENT: true, // Keep text content
      }).trim();
    } else {
      // Fallback: Manual sanitization using createElement
      const div = document.createElement("div");
      div.textContent = str;
      return div.innerHTML;
    }
  }

  /**
   * GÜVENLİK: Email Validation
   * RFC 5322 simplified pattern
   * @param {string} email - Email to validate
   * @returns {boolean} True if valid email
   */
  function isValidEmail(email) {
    // Basic email validation
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email) && email.length <= 254;
  }

  /**
   * GÜVENLİK: Input Length Validation
   * Prevents storage attacks and DoS
   * @param {string} str - String to check
   * @param {number} maxLength - Maximum allowed length
   * @returns {boolean} True if length is valid
   */
  function isValidLength(str, maxLength = 5000) {
    return str.length > 0 && str.length <= maxLength;
  }

  /**
   * GÜVENLİK: Rate Limiting (Client-side)
   * Checks localStorage for submission count today
   * @returns {number} Number of messages sent today
   */
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

  /**
   * GÜVENLİK: Record Submission
   * Stores submission in localStorage for rate limiting
   * Cleans up submissions older than 30 days
   */
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

      // Clean up submissions older than 30 days
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

  /**
   * GÜVENLİK: Show Status Message
   * Uses textContent (not innerHTML) to prevent XSS
   * @param {string} message - Status message to display
   * @param {string} type - 'success' or 'error'
   */
  function showStatus(message, type = "error") {
    if (!statusDiv) return;

    statusDiv.style.display = "block";
    statusDiv.style.background = type === "success" ? "#4CAF50" : "#ff4444";
    statusDiv.style.color = "#fff";
    statusDiv.style.padding = "12px 20px";
    statusDiv.style.borderRadius = "4px";
    statusDiv.style.marginBottom = "20px";
    statusDiv.style.fontWeight = "500";

    // ✅ CRITICAL: Use textContent, NOT innerHTML
    statusDiv.textContent = message;

    // Auto-hide success messages after 6 seconds
    if (type === "success") {
      setTimeout(() => {
        statusDiv.style.display = "none";
      }, 6000);
    }
  }

  // ========================================
  // FORM SUBMISSION HANDLER
  // ========================================

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values
    let name = document.getElementById("contactName")?.value || "";
    let email = document.getElementById("contactEmail")?.value || "";
    let subject = document.getElementById("contactSubject")?.value || "";
    let message = document.getElementById("contactMessage")?.value || "";

    // ✅ STEP 1: SANITIZE ALL INPUTS
    name = sanitizeInput(name);
    email = sanitizeInput(email);
    subject = sanitizeInput(subject);
    message = sanitizeInput(message);

    // ✅ STEP 2: VALIDATE REQUIRED FIELDS
    if (!name || !email || !subject || !message) {
      showStatus("❌ Lütfen tüm alanları doldurun!", "error");
      return;
    }

    // ✅ STEP 3: VALIDATE EMAIL FORMAT
    if (!isValidEmail(email)) {
      showStatus("❌ Geçerli bir e-posta adresi girin!", "error");
      return;
    }

    // ✅ STEP 4: VALIDATE INPUT LENGTHS
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

    // ✅ STEP 5: CHECK RATE LIMIT
    const todayCount = getTodaySubmissionCount();
    if (todayCount >= MAX_MESSAGES_PER_DAY) {
      showStatus(
        `❌ Günde ${MAX_MESSAGES_PER_DAY} mesaj limitine ulaştınız. Lütfen yarın tekrar deneyin.`,
        "error",
      );
      return;
    }

    // ✅ STEP 6: PREPARE DATA FOR FIRESTORE
    const contactData = {
      name, // ✅ Sanitized
      email, // ✅ Sanitized
      subject, // ✅ Sanitized
      message, // ✅ Sanitized
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      read: false,
      // Additional security metadata
      userAgent: navigator.userAgent.substring(0, 200),
      submittedFrom: window.location.hostname,
      ipAddress: "client-side-only", // Server should add real IP
    };

    // ✅ STEP 7: SUBMIT TO FIRESTORE
    db.collection("contacts")
      .add(contactData)
      .then((docRef) => {
        // Record submission for rate limiting
        recordSubmissionLocally();

        // Calculate remaining messages
        const remainingMessages = MAX_MESSAGES_PER_DAY - todayCount - 1;

        // Show success message
        let successMsg = "✅ Mesajınız başarıyla gönderildi!";
        if (remainingMessages > 0) {
          successMsg += ` (Bugün ${remainingMessages}/${MAX_MESSAGES_PER_DAY} mesajınız kaldı)`;
        }

        showStatus(successMsg, "success");

        // Reset form
        form.reset();
      })
      .catch((error) => {
        console.error("❌ Firestore Error:", error);

        let errorMsg = "❌ Bir hata oluştu. Lütfen tekrar deneyin.";

        // Provide specific error messages
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
