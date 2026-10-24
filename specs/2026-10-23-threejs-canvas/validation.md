# Validation: Three.js Canvas (Roadmap Phase 2)

The phase is done and can be merged when every item below passes.

## Automated checks (run in `web/`)
- [x] `npm install` completes with no errors.
- [x] `npm test` exits 0, including the repository, factory, helper, and `SceneCanvas` tests.
- [x] `npm run lint` exits 0 with zero errors and zero warnings.
- [x] `npm run build` exits 0 (type-check and Vite build both pass).
- [ ] `npm run preview` serves the built output.

## Manual checks
- [ ] `npm run dev` starts and the page loads at the printed URL.
- [ ] A cube is visible and spins continuously and smoothly.
- [ ] The browser console shows no errors or warnings.
- [ ] The canvas fills the viewport with no margin and no scrollbars.
- [ ] **Responsive:** at phone (~375px), tablet (~768px), and desktop (~1280px) widths the cube stays fully visible, undistorted, and centred, with no horizontal scroll.
- [ ] Resizing the browser window (or rotating a device) updates the canvas size and aspect ratio without a reload.
- [ ] Under React `StrictMode` in dev, only one canvas exists in the DOM.
- [ ] Navigating away or unmounting leaves no canvas and no running animation loop (check with devtools).

## Structure and conventions
- [x] `web/src/three/` holds plain TypeScript with no React imports and no page access.
- [x] No module-level constants or mutable state, and no classes (including test helpers); application objects are created only through factories and the repository.
- [x] `useThreeScene` only wires objects together; sizing, disposal, rotation, and clamping are separate functions in `three/`.
- [x] `useThreeScene` lives in `web/src/hooks/`; `SceneCanvas` is in `components/organisms/`; `ScenePage` is in `pages/`.
- [x] All components are functional; no class components.
- [x] `App.tsx` is short and only renders `ScenePage`; `main.tsx` only mounts `App`.
- [x] No fixed pixel widths or heights on the canvas container.
- [x] `"strict": true` is set explicitly in the tsconfig files.
- [x] Design decisions are explained in code comments.
- [x] `README.md` describes the new folders.

## Scope guard
- [x] The only new dependencies in `web/package.json` are `three` and `@types/three`.
- [x] No orbit controls, lights, ground plane, character, routing, or react-three-fiber.
- [x] Root `package.json` is unchanged and no root `package-lock.json` exists.
- [x] Tests cover feature logic only: none for `App.tsx` or `main.tsx`.

## Merge readiness
- [ ] Work is on the feature branch (planned `phase-2-threejs-canvas`; currently `add-pr-review-skill`), with a clean `git status` after commit.
- [ ] `/pr-review` has been run on the PR and its blocking findings are fixed.
- [ ] `changelog.md` is updated, and `specs/roadmap.md` marks Phase 2 as done once every manual check above passes.
- [ ] A fresh clone passes the automated checks above.
