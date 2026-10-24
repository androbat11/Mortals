# Validation: Camera and Lighting (Roadmap Phase 3), with Phase 2 closeout

The work can be merged when every item below passes.

## Automated checks (run in `web/`)
- [x] `npm install` completes with no errors.
- [x] `npm test` exits 0, including the new control-limit, factory, and `SceneCanvas` tests.
- [x] `npm run lint` exits 0 with zero errors and zero warnings.
- [x] `npm run build` exits 0 (type-check and Vite build both pass).
- [x] `npm run preview` serves the built output.

## Manual checks
- [ ] **Phase 2 closeout:** every manual item in `specs/2026-10-23-threejs-canvas/validation.md` is run and ticked, and Phase 2 is marked done in `specs/roadmap.md`.
- [ ] `npm run dev` starts and the page loads; the browser console shows no errors or warnings.
- [ ] A solid cube rests on a ground plane and is visibly shaded by the lights, and at maximum zoom and a low angle the ground fades into the background with no visible edge.
- [ ] Mouse drag rotates the view and the scroll wheel zooms; right-click drag does not pan.
- [ ] The camera cannot go below the ground, and zoom stops at its minimum and maximum distance.
- [ ] **Touch (emulation or a real phone):** one-finger drag rotates, pinch zooms, two-finger drag does not pan, and the page does not scroll or zoom while interacting with the scene.
- [ ] **Responsive:** at phone (~375px), tablet (~768px), and desktop (~1280px) widths the scene stays fully visible and undistorted, with no horizontal scroll, and the controls work at each width.
- [ ] Resizing the window or rotating a device updates the canvas without a reload.
- [ ] Under React `StrictMode` in dev there is one canvas and the controls do not react twice to a single drag.
- [ ] Unmounting leaves no canvas, no running loop, and no leftover event listeners on the canvas.

## Structure and conventions
- [x] `web/src/three/` is split by purpose (`objects`, `rendering`, `controls`, `animation`, `core`) with one factory per file, and every source file is under about 100 lines (tests exempt; check with `wc -l`).
- [x] `web/src/three/` holds plain TypeScript with no React imports and no page access; the controls factory receives its element as a parameter.
- [x] All new objects (lights, ground, controls) are created through factories and the repository, with no inline `new` in hooks or components.
- [x] No module-level constants or mutable state; the control limits come from a function.
- [x] No classes, and `any` is not used; types are defined before the code that uses them.
- [x] `useThreeScene` stays thin wiring; each piece of logic is a separate single-purpose function.
- [x] The scene's accessible `label` describes what is shown, and the `img` role is not applied around the WebGL-failure message.
- [x] Design decisions are explained in code comments.
- [x] `README.md` describes the new files.

## Scope guard
- [x] No new dependencies in `web/package.json` (`OrbitControls` comes from `three`).
- [x] No shadows, character, animation, routing, or react-three-fiber.
- [x] Root `package.json` is unchanged, and no root `package-lock.json` exists.
- [x] Tests cover feature logic only: none for `App.tsx` or `main.tsx`.

## Merge readiness
- [ ] Work is on `phase-3-camera-lighting`, with a clean `git status` after commit.
- [ ] The PR is open, `/pr-review` has been run on it, and its blocking findings are fixed.
- [ ] `changelog.md` is updated and committed last, and `specs/roadmap.md` marks Phase 3 as done once every manual check above passes.
- [ ] A fresh clone passes the automated checks above.
