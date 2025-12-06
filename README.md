<div align="center">
  <a href="https://github.com/JosunLP/qr-code-generator">
    <img src="public/img/icons/android-chrome-192x192.png" alt="Logo" width="120" height="120">
  </a>

  <h1 align="center">QRify</h1>

  <p align="center">
    <strong>The most simple, privacy-first QR Code Generator you can find.</strong>
    <br />
    No tracking. No login. No subscription.
    <br />
    <br />
    <a href="#demo">View Demo</a>
    ·
    <a href="https://github.com/JosunLP/qr-code-generator/issues">Report Bug</a>
    ·
    <a href="https://github.com/JosunLP/qr-code-generator/issues">Request Feature</a>
  </p>

  <p align="center">
    <a href="LICENSE">
      <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT">
    </a>
    <a href="https://vuejs.org/">
      <img src="https://img.shields.io/badge/vuejs-%2335495e.svg?style=flat&logo=vuedotjs&logoColor=%234FC08D" alt="Vue.js">
    </a>
    <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white" alt="TypeScript">
    </a>
    <a href="https://vitejs.dev/">
      <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=flat&logo=vite&logoColor=white" alt="Vite">
    </a>
    <a href="https://tailwindcss.com/">
      <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white" alt="TailwindCSS">
    </a>
    <a href="http://makeapullrequest.com">
      <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="PRs Welcome">
    </a>
  </p>
</div>

<br />

## 📋 Table of Contents

- [Features](#-features)
- [Demo](#-demo)
- [Installation](#-installation)
- [Usage](#-usage)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Internationalization](#-internationalization)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🎨 Multiple QR Code Types

- **Text** - Encode any plain text
- **URL** - Create scannable links
- **vCard** - Generate business card QR codes with full contact information (name, phone, email, address, company, website)
- **WiFi** - Share network credentials (SSID, password, encryption type, hidden network support)
- **Email** - Pre-compose emails with recipient, subject, and body

### 📥 Multiple Export Formats

- **Vector:** SVG (scalable without quality loss)
- **Raster:** PNG, JPEG, GIF, TIFF, WebP

### 🔒 Privacy-First

- **No tracking** or analytics
- **No login** or subscription required
- **No server-side processing** - everything runs 100% client-side
- **Secure** and private

### 🌐 Internationalization

- **27 Languages Supported**
- Auto-detects browser language
- Easy language switching via dropdown

### 📱 Progressive Web App (PWA)

- Installable on desktop and mobile devices
- Works **offline** after initial load
- Automatic updates

### 🎨 Modern UI/UX

- Clean, responsive design
- Built with **Tailwind CSS**
- Accessible (ARIA labels, keyboard navigation)
- Smooth animations and transitions

---

## 🚀 Demo

Visit the live application: **[QRify](https://qr.flausch-code.de/)**

---

## 💻 Installation

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or [Node.js](https://nodejs.org/) (v18+)

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/JosunLP/qr-code-generator.git
   cd qr-code-generator
   ```

2. **Install dependencies**

   ```bash
   bun install
   # OR
   npm install
   ```

---

## 🛠 Usage

### Development Server

Start the development server with hot-reload:

```bash
bun run dev
```

The application will be available at `http://localhost:5173`.

### Production Build

Build the application for production:

```bash
bun run build
```

### Preview Production Build

Preview the production build locally:

```bash
bun run preview
```

### Linting & Formatting

```bash
bun run lint      # Lint files
bun run format    # Format files
```

---

## 🧰 Tech Stack

| Technology                                                                                                                                                                    | Purpose                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| <a href="https://vuejs.org/"><img src="https://img.shields.io/badge/Vue.js-35495E?style=flat-square&logo=vuedotjs&logoColor=4FC08D" alt="Vue.js" /></a>                       | Frontend Framework        |
| <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" /></a> | Language                  |
| <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" /></a>                               | Build Tool                |
| <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>  | Styling                   |
| <a href="https://vue-i18n.intlify.dev/"><img src="https://img.shields.io/badge/vue--i18n-42b883?style=flat-square&logo=vue.js&logoColor=white" alt="Vue I18n" /></a>          | Internationalization      |
| <a href="https://bun.sh/"><img src="https://img.shields.io/badge/Bun-000000?style=flat-square&logo=bun&logoColor=white" alt="Bun" /></a>                                      | Runtime & Package Manager |

---

## 📂 Project Structure

```bash
qr-code-generator/
├── public/                 # Static assets (icons, robots.txt)
├── src/
│   ├── assets/             # Images and design files
│   ├── components/         # Vue components
│   │   ├── LocalSwitch.vue   # Language switcher
│   │   ├── QrDownload.vue    # Download functionality
│   │   ├── QrInput.vue       # Input form for all QR types
│   │   └── QrPreview.vue     # Live QR code preview
│   ├── locales/            # Translation files (27 languages)
│   ├── plugins/            # Plugins (i18n, etc.)
│   ├── store/              # Vuex store
│   ├── styles/             # Global styles & Tailwind
│   ├── App.vue             # Root component
│   └── main.ts             # Entry point
├── index.html              # HTML entry point
└── vite.config.ts          # Vite configuration
```

---

## 🌍 Internationalization

QRify supports **27 languages** with automatic browser language detection.

<details>
<summary><strong>View Supported Languages</strong></summary>
<br />

| Language   | Code |     | Language   | Code |
| ---------- | ---- | --- | ---------- | ---- |
| English    | `en` |     | Korean     | `ko` |
| German     | `de` |     | Turkish    | `tr` |
| French     | `fr` |     | Arabic     | `ar` |
| Spanish    | `es` |     | Hindi      | `hi` |
| Italian    | `it` |     | Czech      | `cs` |
| Portuguese | `pt` |     | Greek      | `el` |
| Dutch      | `nl` |     | Hungarian  | `hu` |
| Polish     | `pl` |     | Romanian   | `ro` |
| Russian    | `ru` |     | Ukrainian  | `uk` |
| Swedish    | `sv` |     | Vietnamese | `vi` |
| Chinese    | `zh` |     | Thai       | `th` |
| Japanese   | `ja` |     | Indonesian | `id` |
| Danish     | `da` |     | Norwegian  | `no` |
| Finnish    | `fi` |     |            |      |

</details>

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👤 Author

**Jonas Pfalzgraf (JosunLP)**

- Email: <support@josunlp.de>
- GitHub: [@JosunLP](https://github.com/JosunLP)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Built with ❤️ using Vue 3 and Tailwind CSS</sub>
</div>

## Author

**Jonas Pfalzgraf (JosunLP)**

- Email: <support@josunlp.de>
- GitHub: [@JosunLP](https://github.com/JosunLP)

---

## License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.

---

## Acknowledgments

- [qrcode](https://www.npmjs.com/package/qrcode) - QR code generation library
- [Vue.js](https://vuejs.org/) - The progressive JavaScript framework
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
