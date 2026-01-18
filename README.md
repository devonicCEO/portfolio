# 🌟 Umitjan Portfolio | Full Stack Developer

[🇺🇸 English](#english) | [🇹🇷 Türkçe](#türkçe) | [🇷🇺 Русский](#русский)

---

## <a name="english"></a>🇺🇸 English

### 📖 About Project

Modern and minimalist portfolio website showcasing skills, projects, and contact information. Built with clean HTML/CSS/JS and Firebase integration for future admin panel features.

### ✨ Features

- 🎨 **Modern Dark Theme** - Neon purple gradient design
- 📱 **Fully Responsive** - Works on all devices
- 🎭 **Smooth Animations** - AOS (Animate On Scroll) library
- 🔥 **Firebase Ready** - Firestore integration for dynamic content
- 📧 **Contact Form** - Formspree integration
- 🚀 **Fast & Lightweight** - Optimized performance

### 🛠️ Technologies

- HTML5 / CSS3
- JavaScript (ES6+)
- Firebase (Firestore)
- AOS Animation Library
- Google Fonts (Montserrat, Lexend Deca)

### 🚀 Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/portfolio.git
   cd portfolio
   ```

2. **Firebase Configuration**
   - Copy `js/firebase-config.example.js` to `js/firebase-config.js`
   - Replace with your Firebase credentials:
     ```javascript
     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       // ... other config
     };
     ```

3. **Open in Browser**
   - Simply open `index.html` in your browser
   - Or use a local server:
     ```bash
     python -m http.server 8000
     # or
     npx serve
     ```

### 🔒 Security Notes

- ⚠️ **Never commit `firebase-config.js`** - It's in `.gitignore`
- 🔐 Keep your API keys private
- 🛡️ Use Firebase Security Rules for production
- 🚫 Remove or protect sensitive info (phone/email) before deploying

### 📂 Project Structure

```
portfolio/
├── index.html          # Main page
├── css/
│   └── styles.css      # Styles
├── js/
│   └── firebase-config.js  # Firebase (not in git)
├── assets/
│   └── logo.png        # Profile image
└── backend/
    └── contact.php     # Future backend
```

### 📝 License

MIT License - see [LICENSE](LICENSE) file

### 👤 Author

**Umitjan Novruzov**

- GitHub: [@devonicCEO](https://github.com/devonicCEO)
- Email: umitjan.novruzov06@gmail.com

---

## <a name="türkçe"></a>🇹🇷 Türkçe

### 📖 Proje Hakkında

Yetenekleri, projeleri ve iletişim bilgilerini sergileyen modern ve minimalist portfolyo web sitesi. Temiz HTML/CSS/JS ve gelecekteki admin panel özellikleri için Firebase entegrasyonu ile geliştirildi.

### ✨ Özellikler

- 🎨 **Modern Karanlık Tema** - Neon mor gradyan tasarım
- 📱 **Tamamen Duyarlı** - Tüm cihazlarda çalışır
- 🎭 **Akıcı Animasyonlar** - AOS (Animate On Scroll) kütüphanesi
- 🔥 **Firebase Hazır** - Dinamik içerik için Firestore entegrasyonu
- 📧 **İletişim Formu** - Formspree entegrasyonu
- 🚀 **Hızlı & Hafif** - Optimize edilmiş performans

### 🛠️ Teknolojiler

- HTML5 / CSS3
- JavaScript (ES6+)
- Firebase (Firestore)
- AOS Animasyon Kütüphanesi
- Google Fonts (Montserrat, Lexend Deca)

### 🚀 Kurulum Talimatları

1. **Depoyu klonlayın**

   ```bash
   git clone https://github.com/KULLANICI_ADINIZ/portfolio.git
   cd portfolio
   ```

2. **Firebase Yapılandırması**
   - `js/firebase-config.example.js` dosyasını `js/firebase-config.js` olarak kopyalayın
   - Firebase kimlik bilgilerinizle değiştirin:
     ```javascript
     const firebaseConfig = {
       apiKey: "API_ANAHTARINIZ",
       authDomain: "AUTH_DOMAIN",
       projectId: "PROJE_ID",
       // ... diğer config
     };
     ```

3. **Tarayıcıda Açın**
   - `index.html` dosyasını tarayıcınızda açın
   - Veya yerel sunucu kullanın:
     ```bash
     python -m http.server 8000
     # veya
     npx serve
     ```

### 🔒 Güvenlik Notları

- ⚠️ **Asla `firebase-config.js` dosyasını commit etmeyin** - `.gitignore` içinde
- 🔐 API anahtarlarınızı gizli tutun
- 🛡️ Üretim için Firebase Güvenlik Kuralları kullanın
- 🚫 Dağıtmadan önce hassas bilgileri (telefon/e-posta) kaldırın veya koruyun

### 📂 Proje Yapısı

```
portfolio/
├── index.html          # Ana sayfa
├── css/
│   └── styles.css      # Stiller
├── js/
│   └── firebase-config.js  # Firebase (git'te yok)
├── assets/
│   └── logo.png        # Profil resmi
└── backend/
    └── contact.php     # Gelecekteki backend
```

### 📝 Lisans

MIT Lisansı - [LICENSE](LICENSE) dosyasına bakın

### 👤 Yazar

**Umitjan Novruzov**

- GitHub: [@devonicCEO](https://github.com/devonicCEO)
- E-posta: umitjan.novruzov06@gmail.com

---

## <a name="русский"></a>🇷🇺 Русский

### 📖 О проекте

Современный и минималистичный сайт-портфолио, демонстрирующий навыки, проекты и контактную информацию. Создан с использованием чистого HTML/CSS/JS и интеграции Firebase для будущих функций админ-панели.

### ✨ Возможности

- 🎨 **Современная тёмная тема** - Неоновый фиолетовый градиент
- 📱 **Полностью адаптивный** - Работает на всех устройствах
- 🎭 **Плавные анимации** - Библиотека AOS (Animate On Scroll)
- 🔥 **Готов к Firebase** - Интеграция Firestore для динамического контента
- 📧 **Контактная форма** - Интеграция Formspree
- 🚀 **Быстрый и лёгкий** - Оптимизированная производительность

### 🛠️ Технологии

- HTML5 / CSS3
- JavaScript (ES6+)
- Firebase (Firestore)
- Библиотека анимации AOS
- Google Fonts (Montserrat, Lexend Deca)

### 🚀 Инструкции по установке

1. **Клонируйте репозиторий**

   ```bash
   git clone https://github.com/ВАШ_ПОЛЬЗОВАТЕЛЬ/portfolio.git
   cd portfolio
   ```

2. **Настройка Firebase**
   - Скопируйте `js/firebase-config.example.js` в `js/firebase-config.js`
   - Замените учётными данными вашего Firebase:
     ```javascript
     const firebaseConfig = {
       apiKey: "ВАШ_API_КЛЮЧ",
       authDomain: "ВАШ_AUTH_DOMAIN",
       projectId: "ВАШ_PROJECT_ID",
       // ... другие настройки
     };
     ```

3. **Откройте в браузере**
   - Просто откройте `index.html` в браузере
   - Или используйте локальный сервер:
     ```bash
     python -m http.server 8000
     # или
     npx serve
     ```

### 🔒 Примечания по безопасности

- ⚠️ **Никогда не коммитьте `firebase-config.js`** - Он в `.gitignore`
- 🔐 Держите API ключи в секрете
- 🛡️ Используйте правила безопасности Firebase для продакшена
- 🚫 Удалите или защитите конфиденциальную информацию (телефон/email) перед развёртыванием

### 📂 Структура проекта

```
portfolio/
├── index.html          # Главная страница
├── css/
│   └── styles.css      # Стили
├── js/
│   └── firebase-config.js  # Firebase (не в git)
├── assets/
│   └── logo.png        # Изображение профиля
└── backend/
    └── contact.php     # Будущий бэкенд
```

### 📝 Лицензия

Лицензия MIT - см. файл [LICENSE](LICENSE)

### 👤 Автор

**Умитджан Новрузов**

- GitHub: [@devonicCEO](https://github.com/devonicCEO)
- Email: umitjan.novruzov06@gmail.com

---

## 🌐 Live Demo

[Visit Website](#) _(Add your deployed URL here)_

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show Your Support

Give a ⭐️ if you like this project!
