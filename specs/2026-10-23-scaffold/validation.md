# Validation: Scaffold (Roadmap Phase 1)

The phase is done and can be merged when every item below passes.

## Automated checks (run in `web/`)
- [ ] `npm install` completes with no errors.
- [ ] `npm run lint` exits 0 with zero errors and zero warnings.
- [ ] `npm run build` exits 0 (TypeScript type-check and Vite build both pass).
- [ ] `npm run preview` serves the built output.

## Manual checks
- [ ] `npm run dev` starts and the page loads at the printed URL.
- [ ] The page shows only a single div with the text "Mortals": no Vite logo, React logo, counter, or demo text.
- [ ] The browser console shows no errors or warnings.
- [ ] The browser tab title is "Mortals".
- [ ] The DOM contains the mounted root element with a single child div containing "Mortals".

## Structure and conventions
- [ ] `web/src/components/` contains `atoms/`, `molecules/`, `organisms/`, `templates/`; `web/src/pages/` exists.
- [ ] All components are functional; no class components.
- [ ] `App.tsx` is short and does one thing; `main.tsx` only mounts `App`.
- [ ] No unused template files remain (`App.css`, `index.css`, `assets/`, `vite.svg`).
- [ ] The tsconfig strict mode from the template is still enabled.

## Scope guard
- [ ] No Three.js, routing, test runner, or other out-of-scope dependencies in `web/package.json`.
- [ ] Root `package.json` is unchanged.
- [ ] `README.md` documents how to install and run the app.

## Merge readiness
- [ ] Work is on `phase-1-scaffold`, with a clean `git status` after commit.
- [ ] A fresh clone passes the automated checks above.
