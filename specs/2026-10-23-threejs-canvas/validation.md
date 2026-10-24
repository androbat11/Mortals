# Validation: Three.js Canvas (Roadmap Phase 2)

The phase is done and can be merged when every item below passes.

## Automated checks (run in `web/`)
- [ ] `npm install` completes with no errors.
- [ ] `npm test` exits 0, including the new scene, rotation, and `SceneCanvas` tests.
- [ ] `npm run lint` exits 0 with zero errors and zero warnings.
- [ ] `npm run build` exits 0 (type-check and Vite build both pass).
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
- [ ] `web/src/three/` holds plain TypeScript with no React or DOM imports.
- [ ] `useThreeScene` lives in `web/src/hooks/`; `SceneCanvas` is in `components/organisms/`; `ScenePage` is in `pages/`.
- [ ] All components are functional; no class components.
- [ ] `App.tsx` is short and only renders `ScenePage`; `main.tsx` only mounts `App`.
- [ ] No fixed pixel widths or heights on the canvas container.
- [ ] The tsconfig strict mode from the template is still enabled.
- [ ] `README.md` describes the new folders.

## Scope guard
- [ ] The only new dependencies in `web/package.json` are `three` and `@types/three`.
- [ ] No orbit controls, lights, ground plane, character, routing, or react-three-fiber.
- [ ] Root `package.json` is unchanged.

## Merge readiness
- [ ] Work is on `phase-2-threejs-canvas`, with a clean `git status` after commit.
- [ ] `specs/roadmap.md` marks Phase 2 as done and `changelog.md` is updated.
- [ ] A fresh clone passes the automated checks above.
