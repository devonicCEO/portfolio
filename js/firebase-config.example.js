// Firebase Configuration Example
// IMPORTANT: Do NOT commit your actual firebase-config.js to GitHub!
// This is just an example template.

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID",
};

// Firebase yüklü mü kontrol et
if (typeof firebase === "undefined") {
  console.error("Firebase SDK yüklenmedi!");
} else {
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  // DEĞİŞKENLERİ GLOBAL YAP
  window.db = firebase.firestore();

  // Auth SDK yüklüyse kullan
  if (firebase.auth) {
    window.auth = firebase.auth();
  }
}
