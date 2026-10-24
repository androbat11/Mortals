# Validation: Scaffold (Roadmap Phase 1)

The phase is done and can be merged when every item below passes.

## Automated checks (run in `web/`)
- [x] `npm install` completes with no errors.
- [x] `npm run lint` exits 0 with zero errors and zero warnings.
- [x] `npm run build` exits 0 (TypeScript type-check and Vite build both pass).
- [x] `npm run preview` serves the built output.

## Manual checks
- [x] `npm run dev` starts and the page loads at the printed URL.
- [x] The page shows only a single div with the text "Mortals": no Vite logo, React logo, counter, or demo text.
- [ ] The browser console shows no errors or warnings.
- [x] The browser tab title is "Mortals".
- [x] The DOM contains the mounted root element with a single child div containing "Mortals".
- [ ] The page has no horizontal scroll at phone (~375px), tablet (~768px), and desktop (~1280px) widths, and `index.html` has the viewport meta tag.

## Structure and conventions
- [x] `web/src/components/` contains `atoms/`, `molecules/`, `organisms/`, `templates/`; `web/src/pages/` exists.
- [x] All components are functional; no class components.
- [x] `App.tsx` is short and does one thing; `main.tsx` only mounts `App`.
- [x] No unused template files remain (`App.css`, `index.css`, `assets/`, `vite.svg`).
- [x] The tsconfig strict mode from the template is still enabled.

## Scope guard
- [x] No Three.js, routing, or other out-of-scope dependencies in `web/package.json` (Vitest is the only test tooling).
- [x] Root `package.json` is unchanged.
- [x] `README.md` documents how to install and run the app.

## Merge readiness
- [x] Work is on `phase-1-scaffold`, with a clean `git status` after commit.
- [x] A fresh clone passes the automated checks above.
