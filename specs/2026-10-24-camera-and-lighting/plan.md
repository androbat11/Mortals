# Plan: Camera and Lighting (Roadmap Phase 3), with Phase 2 closeout

## 1. Close out Phase 2
1. Confirm local `main` matches `origin/main` (Phase 2 is merged).
2. In `web/`, run `npm install`, `npm test`, `npm run lint`, `npm run build`, and `npm run preview`.
3. Run `npm run dev` and work through the manual checks in `specs/2026-10-23-threejs-canvas/validation.md` (the cube spins, the console is clean, resizing and the 375, 768, and 1280px widths, StrictMode, unmount).
4. Tick each item that passes; fix or record any that fail before moving on.
5. Mark Phase 2 as done in `specs/roadmap.md`.

## 2. Branch and baseline
1. Create the branch `phase-3-camera-lighting` from the updated `main`.
2. Confirm the root `package.json` is unchanged and that no new dependency is needed: `OrbitControls` ships inside `three` (`three/addons/controls/OrbitControls.js`) and `@types/three` already types it.

## 3. Types and settings (types first)
1. Define the `ControlLimits` type in `web/src/three/controls/` (minimum and maximum zoom distance, maximum polar angle, damping, pan on or off).
2. Create `createControlLimits()`, a function that returns the limits (no module-level constant): pan off, zoom distance clamped, polar angle just below horizontal so the camera cannot go under the ground.
3. Create `applyControlLimits(controls, limits)`, a function that copies the limits onto a controls object.

## 4. Scene objects (one factory per file, grouped by purpose under `web/src/three/`)
1. Change `createCube` to use a solid, lit material (`MeshStandardMaterial`) and move the cube so it rests on the ground.
2. Add `createAmbientLight` and `createDirectionalLight` (no shadows).
3. Add `createGround`, a horizontal plane (`PlaneGeometry` rotated to lie flat, `MeshStandardMaterial`) sized larger than the visible area.
4. Add `createOrbitControls(camera, domElement)`. It takes the element as a parameter, like `createRenderer`, so the factory reads nothing from the page.
5. Change `rotateCube` to spin around the vertical axis only, so the cube stays flat on the ground.
6. Change `createCamera` so it starts above and to the side of the cube, looking at the origin.
7. Add `createBackground` and `createFog` (a dark blue-gray background and matching fog) and make the ground 100 x 100, so the ground fades into the background and its edge is never seen.
8. Register every new factory in `createSceneRepository`.

### Module layout
1. When `factories.ts` grew, split it: one factory per file under `web/src/three/{objects,rendering,controls,animation,core}/` (done in commit `9c9a7e4`).
2. Extract the per-frame work to `startRenderLoop`, the control setup to `createSceneControls`, and the cleanup to `createSceneCleanup`, so `useThreeScene` stays under about 70 lines of wiring.

## 5. Hook wiring
1. Extract `createSceneContents`, which creates and adds the cube, ground, and lights, so `useThreeScene` stays thin wiring.
2. Create the controls through the repository after the renderer's canvas exists (`createSceneControls` applies the limits), and call `controls.update()` in the animation loop (needed for damping).
3. On cleanup (`createSceneCleanup`), dispose the controls along with the loop, observer, scene, context, renderer, and canvas, in that order.
4. Pass an accurate `label` from `ScenePage` that describes what is shown. `SceneCanvas` exposes the `img` role only while the scene is showing, so the WebGL-failure message is not inside an image.

## 6. Tests (Vitest, feature logic only)
1. Test `createControlLimits` and `applyControlLimits`: pan off, polar angle below horizontal, zoom distances ordered and positive.
2. Test the new factories: the lights' types, the ground lies flat and is larger than the cube, the cube rests on the ground, and the camera looks toward the origin.
3. Extend the `SceneCanvas` tests: the controls are updated in the loop, disposed on unmount (including the first StrictMode mount), and all five limits are applied.
4. Test the per-frame order in `startRenderLoop`, the cleanup order in `createSceneCleanup`, that the camera start lies inside the control limits, and that the ground edge is beyond the fog from every allowed camera position.
5. Run `npm test`. Do not add tests for `App.tsx` or `main.tsx`.

## 7. Documentation
1. Comment each design decision in the code (why, not what), for example why pan is off and why the polar angle is limited.
2. Update `README.md` for the new files.
3. Mark Phase 3 as done in `specs/roadmap.md` only after the manual checks in `validation.md` pass.

## 8. Verify and wrap up
1. Walk through every item in `validation.md`, including the manual checks with a mouse and with touch emulation at phone, tablet, and desktop widths.
2. Commit on `phase-3-camera-lighting`, open a PR to `main`, run `/pr-review` on it and fix blocking findings, then run `/changelog` and commit the changelog last.
