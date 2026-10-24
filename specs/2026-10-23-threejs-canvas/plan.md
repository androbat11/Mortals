# Plan: Three.js Canvas (Roadmap Phase 2)

## 1. Install Three.js
1. Create the branch `phase-2-threejs-canvas` from `main` (not done: the work was done on `add-pr-review-skill`; see `requirements.md`).
2. In `web/`, run `npm install three` and `npm install -D @types/three`.
3. Confirm the root `package.json` is unchanged and that no root `package-lock.json` was created.

## 2. Scene logic (plain TypeScript in `web/src/three/`)
1. Write the types first (`Size`, the factory map, repository types), then the code.
2. Create `factories.ts` with one factory per object: scene (`createSceneObject`), camera, cube (a `BoxGeometry` with an unlit `MeshBasicMaterial`, so no lights are needed), renderer, and timer (`Timer`, because `Clock` is deprecated).
3. Create `createRepository.ts`, a generic function that takes a map of factories and returns `create(key, ...args)`.
4. Create the single-purpose helpers, each a function with no module-level state:
   - `clampPixelRatio`: caps the device pixel ratio at 2.
   - `clampDelta`: caps a frame delta so the cube does not jump after a hidden tab returns.
   - `toSafeSize`: replaces a zero size so the aspect ratio is never NaN.
   - `applySize`: resizes the renderer, re-applies the pixel ratio, and updates the camera aspect and projection.
   - `disposeScene`: disposes geometries, materials (single or array), and textures for meshes, lines, and points.
   - `tryCreate`: turns a throwing creation (WebGL unavailable) into `null`.
   - `rotateCube`: advances rotation by a time delta, with `speed` as a default parameter.
5. Keep `web/src/three/` free of React and page access.

## 3. Hooks (`web/src/hooks/`)
1. Create `browserFactories.ts` with a `createResizeObserver` factory (browser APIs stay out of `three/`).
2. Create `createSceneRepository.ts`: a function that returns a repository registering all factories, including the `ResizeObserver` one.
3. Create `useThreeScene.ts`, taking a container ref. It only wires things together: create the renderer first through `tryCreate` (on failure, report `failed` and stop, so the app does not go blank), then create the other objects through the repository, append the canvas, observe the container with `applySize`, run the loop with `renderer.setAnimationLoop`, and clean up through `disposeScene`.
4. On unmount, stop the loop, disconnect the observer, dispose the scene, force the WebGL context loss, dispose the renderer, and remove the canvas.

## 4. Components
1. Create the organism `web/src/components/organisms/SceneCanvas/`: a functional component that renders a container `div`, calls the hook, and accepts an optional `className` so a parent can position or size it, and a required `label` that becomes the accessible name.
2. Create the page `web/src/pages/ScenePage.tsx`, a thin component that renders `SceneCanvas` in a viewport-sized container.
3. Update `App.tsx` to render `ScenePage` and remove the "Mortals" placeholder div.
4. Add minimal global styles so the page has no margin or scrollbars and the canvas fills the viewport on phone, tablet, and desktop.

## 5. Tests (Vitest, feature logic only)
1. Test `createRepository`: creates by key, passes arguments through, and creates a new object on each call.
2. Test the factories (scene, camera, cube, timer, and the renderer with a mocked `WebGLRenderer`) and each helper: `clampPixelRatio`, `clampDelta`, `toSafeSize`, `applySize`, `disposeScene` (including material arrays and textures), and `rotateCube`.
3. Test `SceneCanvas` with a mocked `WebGLRenderer` and a `ResizeObserver` stub that records callbacks: mount; the accessible name; the loop renders and rotates the cube by the clamped delta; a resize uses the container size and re-applies the capped pixel ratio; a failing renderer shows a message; unmount disconnects, disposes, and releases the context; StrictMode leaves one canvas.
4. Write test helpers as functions with per-test state (no classes, no module-level arrays).
5. Run `npm test` and fix failures. Do not add tests for `App.tsx` or `main.tsx`.

## 6. Documentation
1. Update `README.md`: the folders, the scripts including `npm test`, the tech stack, and the workflow section.
2. Comment each design decision in the code (why, not what).
3. Update `specs/roadmap.md` to mark Phase 2 as done only after the manual checks in `validation.md` pass.

## 7. Verify and wrap up
1. Walk through every item in `validation.md`, including the manual responsive checks at phone, tablet, and desktop widths.
2. Commit on the feature branch and open a PR to `main`.
3. Run `/pr-review` on the PR and fix blocking findings.
4. Run `/changelog` and commit the changelog last.
