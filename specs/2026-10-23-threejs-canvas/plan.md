# Plan: Three.js Canvas (Roadmap Phase 2)

## 1. Install Three.js
1. Create the branch `phase-2-threejs-canvas` from `main`.
2. In `web/`, run `npm install three` and `npm install -D @types/three`.
3. Confirm the root `package.json` is unchanged.

## 2. Scene module (plain TypeScript)
1. Create `web/src/three/factories.ts` with one factory function per object: scene, camera, cube (a `BoxGeometry` with a `MeshBasicMaterial`, so no lights are needed), renderer, and clock.
2. Create `web/src/three/createRepository.ts`, a generic function that takes a map of factories and returns `create(key, ...args)`.
3. Create `web/src/hooks/sceneRepository.ts` registering those factories plus a `ResizeObserver` factory.
4. Place the camera so the whole cube is visible at the default aspect ratio.
5. Create `web/src/three/rotateCube.ts` exporting a small function that advances the cube rotation by a time delta.
6. Keep `web/src/three/` free of React and DOM code.

## 3. `useThreeScene` hook
1. Create `web/src/hooks/useThreeScene.ts`, taking a container ref.
2. On mount, create every object through `sceneRepository.create(...)`: the renderer (pixel ratio capped at 2, in its factory), then append its canvas to the container, and start the animation loop with `renderer.setAnimationLoop`.
3. Size the renderer and camera from the container's dimensions, and update both with a `ResizeObserver` on the container.
4. On unmount, stop the loop, disconnect the observer, dispose the geometry, material, and renderer, and remove the canvas.

## 4. Components
1. Create the organism `web/src/components/organisms/SceneCanvas/` (a functional component that renders a container `div` and calls the hook). The container fills its parent and has no fixed pixel sizes.
2. Create the page `web/src/pages/ScenePage.tsx`, a thin component that renders `SceneCanvas` in a viewport-sized container.
3. Update `App.tsx` to render `ScenePage` and remove the "Mortals" placeholder div.
4. Add minimal global styles so the page has no margin or scrollbars and the canvas fills the viewport on phone, tablet, and desktop.

## 5. Tests (Vitest)
1. Test `createRepository`: creates by key, passes arguments through, and creates a new object on each call.
2. Test the factories: scene, camera aspect and position, and cube.
2. Test `rotateCube`: rotation increases by the expected amount for a given delta.
3. Test `SceneCanvas` with a mocked `WebGLRenderer`: it appends a canvas on mount and disposes the renderer and removes the canvas on unmount.
4. Run `npm test` and fix failures.

## 6. Documentation
1. Update `README.md`: describe `web/src/three/`, `web/src/hooks/`, and the scene page in the project structure section.
2. Update `specs/roadmap.md`: mark Phase 2 as done once validation passes.

## 7. Verify and wrap up
1. Walk through every item in `validation.md`, including the manual responsive checks at phone, tablet, and desktop widths.
2. Run `/changelog`, commit on `phase-2-threejs-canvas`, and open a PR to `main`.
