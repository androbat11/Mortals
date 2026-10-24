# Validation: Low-Poly Character (Roadmap Phase 4)

The work can be merged when every item below passes.

## Automated checks (run in `web/`)
- [x] `npm install` completes with no errors.
- [x] `npm test` exits 0, including the new character, loop, and scene-contents tests.
- [x] `npm run lint` exits 0 with zero errors and zero warnings.
- [x] `npm run build` exits 0 (type-check and Vite build both pass).
- [x] `npm run preview` serves the built output.

## Manual checks
- [ ] **Closeout:** the manual checks for Phases 2 and 3 are run and ticked, and both phases are marked done in `specs/roadmap.md`, before this phase is merged.
- [ ] `npm run dev` starts and the page loads; the browser console shows no errors or warnings.
- [ ] A blocky humanoid stands on the ground, upright, with head, torso, two arms, and two legs, shaded by the lights, and no cube is visible.
- [ ] The character is original: no Mortal Kombat likeness, name, or imported model.
- [ ] Orbiting the camera shows all sides of the character; the character stays centred and fully visible at the minimum and maximum zoom.
- [ ] **Touch (emulation or a real phone):** one-finger drag rotates, pinch zooms, two-finger drag does not pan, and the page does not scroll or zoom while interacting.
- [ ] **Responsive:** at phone (~375px), tablet (~768px), and desktop (~1280px) widths the character is fully visible and undistorted, with no horizontal scroll, and the controls work at each width.
- [ ] Resizing the window or rotating a device updates the canvas without a reload.
- [ ] Under React `StrictMode` in dev there is one canvas and one character.
- [ ] Unmounting leaves no canvas, no running loop, and no leftover listeners.

## Structure and conventions
- [x] The render loop takes a list of per-frame updaters, and nothing in the loop, the scene contents, or the setup refers to a cube.
- [x] The cube, `rotateCube`, their tests, and the `cube` repository key are gone.
- [x] The character is built in `web/src/three/objects/character/`, one factory per file, and every source file is under about 100 lines (tests exempt; check with `wc -l`).
- [x] `createCharacter` returns a typed rig with the nine named joints, and the types were defined before the code that uses them.
- [x] The character is created through factories and the repository, with no inline `new` in hooks or components.
- [x] No module-level constants or mutable state; the palette comes from a function.
- [x] No classes, and `any` is not used.
- [x] `web/src/three/` holds plain TypeScript with no React imports and no page access.
- [x] `ScenePage`'s `label` describes the character.
- [x] Design decisions are explained in code comments.
- [x] `README.md` describes the `character/` folder and the generic loop.

## Scope guard
- [x] No animation, data model, page layout, routing, or playback controls.
- [x] No new dependencies in `web/package.json`.
- [x] No imported or copyrighted models, textures, or assets.
- [x] Root `package.json` is unchanged, and no root `package-lock.json` exists.
- [x] Tests cover feature logic only: none for `App.tsx` or `main.tsx`.

## Merge readiness
- [ ] Work is on `phase-4-low-poly-character`, with a clean `git status` after commit.
- [ ] The PR is open, `/pr-review` has been run on it, and its blocking findings are fixed.
- [ ] `changelog.md` is updated and committed last, and `specs/roadmap.md` marks Phase 4 as done once every manual check above passes.
- [ ] A fresh clone passes the automated checks above.
