<h1 align="center">Victor Cardoso — Links</h1>

<p align="center">
  <strong>Personal LinkTree-style portfolio page built with modern frontend best practices.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/GSAP-3.x-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP">
  <img src="https://img.shields.io/badge/Lenis-Smooth_Scroll-black?style=for-the-badge" alt="Lenis">
  <img src="https://img.shields.io/badge/Node-20_LTS-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node">
  <img src="https://img.shields.io/badge/ESLint-8.x-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint">
  <img src="https://img.shields.io/badge/Prettier-3.x-F7B93E?style=for-the-badge&logo=prettier&logoColor=black" alt="Prettier">
  <img src="https://img.shields.io/github/actions/workflow/status/VictorCardosoOl/LinkTreeV1/ci.yml?style=for-the-badge&label=CI" alt="CI">
</p>

---

- **Clean Architecture** — Industry-standard project structure with `src/` and `public/` isolation
- **Glassmorphism UI** — Editorial B&W theme with refined backdrop-filter surfaces
- **Liquid Glass Tooling** — Interactive SVG `feDisplacementMap` filters with `requestAnimationFrame` throttling
- **AppManager Singleton** — Scalable OOP entry point with error handling and fallback support
- **On-Demand Loading** — Code-split gallery features (`lightbox.js`) for optimized mobile performance
- **Performance Optimized** — Physics-based animations with GSAP and 60 FPS smooth scrolling via Lenis
- **PWA-ready** — `manifest.json` with maskable icons and theme synchronization
- **Light / Dark mode** — respects `prefers-color-scheme` system preference

---

## 🚀 Getting Started

### Prerequisites

- [Node.js 20 LTS](https://nodejs.org/) — see `.nvmrc`
- npm 10+

> **Using nvm?** Run `nvm install` and `nvm use` in the project root.

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/VictorCardosoOl/LinkTreeV1.git
cd LinkTreeV1

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 📦 Scripts

| Command            | Description                                 |
| ------------------ | ------------------------------------------- |
| `npm run dev`      | Start Vite development server with HMR      |
| `npm run build`    | Production build with dynamic code-splitting|
| `npm run preview`  | Preview the production build locally        |
| `npm run lint`     | Run ESLint across `src/` directory          |
| `npm run format`   | Format all files with Prettier              |
| `npm run check`    | Comprehensive CI validation (lint + format) |

---

## 📁 Project Structure

```
LinkTreeV1/
├── public/                 # Static global assets (favicons, manifest)
├── scripts/                # Utility scripts (image compression)
├── src/
│   ├── assets/             # Dynamic assets (avatars, textures, fonts)
│   ├── features/           # Modular project features (Liquid Glass, Lightbox)
│   ├── styles/             # Design System (Global & Component CSS)
│   └── main.js             # Application Entry (AppManager Singleton)
├── index.html              # Home Page entry
├── gallery.html            # Gallery Page entry
├── vite.config.js          # Build & Asset configuration
└── .eslintrc.json          # Code quality rules
```

---

## 🎨 Design System

All design tokens are defined as CSS Custom Properties in `style.css`:

| Category   | Variables                                                               |
| ---------- | ----------------------------------------------------------------------- |
| Colors     | `--color-text-primary`, `--color-surface-glass`, `--color-border-glass` |
| Typography | `--font-primary`, `--font-display`, `--text-xs` → `--text-xl`           |
| Spacing    | `--space-xs` → `--space-xl` (4px baseline grid)                         |
| Layout     | `--layout-max-width`, `--layout-gutter`, `--layout-padding-top`         |
| Animation  | `--ease-elastic`, `--ease-expo`                                         |

---

## 🧪 Linting & Formatting

```bash
npm run lint       # Check for errors
npm run lint:fix   # Auto-fix errors
npm run format     # Format all files
npm run check      # lint + format check (CI-safe)
```

---

## 📋 Tech Stack

| Layer      | Technology                                                                                                                  |
| ---------- | --------------------------------------------------------------------------------------------------------------------------- |
| Build tool | [Vite 7](https://vitejs.dev/)                                                                                               |
| Visuals    | Vanilla JS + Custom SVG Filters (`feDisplacementMap`, `feColorMatrix` for Liquid Glass Lens effects)                        |
| Animations | [GSAP 3](https://gsap.com/) + [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)                              |
| Scroll     | [Lenis](https://github.com/darkroomengineering/lenis)                                                                       |
| Text split | [SplitType](https://github.com/lukePeavey/SplitType)                                                                        |
| Icons      | [Ionicons 7](https://ionic.io/ionicons)                                                                                     |
| Fonts      | [Outfit](https://fonts.google.com/specimen/Outfit) + [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) |
| Linting    | ESLint 8 + eslint-config-prettier                                                                                           |
| Formatting | Prettier 3                                                                                                                  |
| CI         | GitHub Actions                                                                                                              |

---

## 📄 License

© 2024 Victor Cardoso. All rights reserved.
