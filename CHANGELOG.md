# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.3.0] - 2026-03-19

### Added

- Enterprise-grade infrastructure: `.gitignore`, `.nvmrc`, `vite.config.js`
- Code quality tooling: ESLint 8 + Prettier with shared config
- CI workflow via GitHub Actions (`build` + `lint` on every push)
- `CHANGELOG.md` following Conventional Commits / Keep a Changelog
- `README.md` with badges, setup guide and project structure
- `gallery.css` — gallery styles extracted from inline HTML
- `prefers-color-scheme: light` support in global CSS
- `data-page` attribute pattern for page-aware JS initialization
- JSDoc documentation on all public classes and module functions
- Ionicons installed as local npm dependency

### Changed

- `script.js` refactored: `PAGE_HANDLERS` pattern replaces implicit page coupling
- `MagneticButton`: private class fields (`#`), `AbortController` for listener cleanup
- `TypographyAnimator`: `#animateElement` extracted as private method (SRP)
- `manifest.json`: `purpose` entries separated per W3C spec
- Wide-screen breakpoints (2xl/3xl/4xl) added to CSS token system

### Fixed

- Font `Outfit` was referenced in CSS but missing from HTML font loading
- `gallery.html` missing `meta description`, favicon and `noscript` block
- `manifest.json` `purpose: "any maskable"` combined (W3C antipattern)
- Rollup CVE-2026-27606: bumped to patched version via `npm update`

---

## [1.2.0] - 2026-02-13

### Added

- Physics-based animations using GSAP + ScrollTrigger
- Smooth scroll via Lenis
- Text reveal animation via SplitType
- `MagneticButton` class with spotlight and magnetic pull effects
- PWA manifest (`manifest.json`)

### Changed

- Full CSS architecture refactor: CSS Variables design token system
- Fluid typography using `clamp()`
- Glassmorphism card design for nav links

---

## [1.0.0] - 2024-01-01

### Added

- Initial release: LinkTree-style personal page
- Static HTML + CSS layout
- Social links: WhatsApp, LinkedIn, GitHub, Instagram, Email
- Portfolio feature card
- Gallery page placeholder
