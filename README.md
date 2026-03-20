<h1 align="center">Victor Cardoso — Links</h1>

<p align="center">
  <strong>Personal LinkTree-style portfolio page built with modern frontend best practices.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/GSAP-3.x-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP">
  <img src="https://img.shields.io/badge/Lenis-Smooth_Scroll-black?style=for-the-badge" alt="Lenis">
  <img src="https://img.shields.io/badge/Node-22_LTS-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node">
  <img src="https://img.shields.io/badge/ESLint-8.x-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint">
  <img src="https://img.shields.io/badge/Prettier-3.x-F7B93E?style=for-the-badge&logo=prettier&logoColor=black" alt="Prettier">
  <img src="https://img.shields.io/github/actions/workflow/status/VictorCardosoOl/LinkTreeV1/ci.yml?style=for-the-badge&label=CI" alt="CI">
</p>

---

## ✨ Features

- **Glassmorphism UI** — dark theme with backdrop-filter and glass surfaces
- **Physics-based animations** — GSAP + elastic easing + magnetic hover effects
- **Smooth scroll** — Lenis with GSAP ticker sync
- **Text reveal** — SplitType character-level entrance animations
- **Wide-screen layout** — responsive from 375px up to 2560px (2K) with CSS tokens
- **PWA-ready** — `manifest.json` with maskable icons
- **Accessibility** — ARIA attributes, `prefers-reduced-motion`, `focus-visible`, `noscript` fallback
- **Light / Dark mode** — respects `prefers-color-scheme` system preference

---

## 🚀 Getting Started

### Prerequisites

- [Node.js 22 LTS](https://nodejs.org/) — see `.nvmrc`
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

| Command | Description |
|---|---|
| `npm run dev` | Start Vite development server with HMR |
| `npm run build` | Production build with vendor code-splitting |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across all JS files |
| `npm run lint:fix` | Auto-fix ESLint errors |
| `npm run format` | Format all files with Prettier |
| `npm run check` | Run lint + format check (for CI) |

---

## 📁 Project Structure

```
LinkTreeV1/
├── .github/
│   └── workflows/
│       └── ci.yml          # GitHub Actions: lint + build
├── assets/                 # Static assets (images, favicon, og-image)
├── .eslintrc.json          # ESLint 8 config (browser + ES2022)
├── .gitignore
├── .nvmrc                  # Node version pin (22 LTS)
├── .prettierrc             # Prettier formatting rules
├── CHANGELOG.md            # Project history (Keep a Changelog format)
├── gallery.css             # Gallery-specific styles
├── gallery.html            # Gallery page
├── index.html              # Main page (LinkTree)
├── manifest.json           # PWA manifest
├── package.json
├── script.js               # App entry — GSAP, Lenis, SplitType, interactions
├── style.css               # Global design system (CSS tokens + layout)
└── vite.config.js          # Vite config (vendor chunks, base, target)
```

---

## 🎨 Design System

All design tokens are defined as CSS Custom Properties in `style.css`:

| Category | Variables |
|---|---|
| Colors | `--color-text-primary`, `--color-surface-glass`, `--color-border-glass` |
| Typography | `--font-primary`, `--font-display`, `--text-xs` → `--text-xl` |
| Spacing | `--space-xs` → `--space-xl` (4px baseline grid) |
| Layout | `--layout-max-width`, `--layout-gutter`, `--layout-padding-top` |
| Animation | `--ease-elastic`, `--ease-expo` |

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

| Layer | Technology |
|---|---|
| Build tool | [Vite 7](https://vitejs.dev/) |
| Animations | [GSAP 3](https://gsap.com/) + [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) |
| Scroll | [Lenis](https://github.com/darkroomengineering/lenis) |
| Text split | [SplitType](https://github.com/lukePeavey/SplitType) |
| Icons | [Ionicons 7](https://ionic.io/ionicons) |
| Fonts | [Outfit](https://fonts.google.com/specimen/Outfit) + [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) |
| Linting | ESLint 8 + eslint-config-prettier |
| Formatting | Prettier 3 |
| CI | GitHub Actions |

---

## 📄 License

© 2024 Victor Cardoso. All rights reserved.
