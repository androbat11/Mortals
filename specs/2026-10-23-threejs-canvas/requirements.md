# Requirements: Three.js Canvas (Roadmap Phase 2)

## Scope
A React component renders a Three.js scene with a spinning cube, filling its container and staying correct as the screen size changes.

In scope:
- `three` and `@types/three` added to `web/`.
- A scene module that builds the scene, camera, and cube, with no React or DOM code.
- A `useThreeScene` hook that owns the renderer, animation loop, resize handling, and cleanup.
- A `SceneCanvas` organism and a `ScenePage` page, with `App` rendering the page.
- Responsive behaviour: the canvas fills the viewport and resizes on phone, tablet, and desktop; no horizontal scroll.
- Vitest tests for the scene logic and component mount/unmount.

Out of scope:
- Orbit controls, lights, ground plane (Phase 3).
- Characters and animations (Phases 4 and 5).
- Routing, the fatality data model, playback controls, and styling beyond making the canvas fill the screen.
- react-three-fiber.

## Decisions
- **Scope:** exactly the roadmap item. This keeps the phase small and independently verifiable; lighting and controls belong to Phase 3. The cube uses an unlit `MeshBasicMaterial` so it is visible without lights.
- **Atomic level:** a `SceneCanvas` organism in `components/organisms/` plus a thin `ScenePage` in `pages/`. Later phases extend the organism with the character and controls without moving files.
- **Code structure:** a plain-TS scene module (`web/src/three/`) plus a `useThreeScene` hook (`web/src/hooks/`). This follows `specs/tech-stack.md` (Three.js used directly, wrapped in React components) and keeps scene logic testable without WebGL.
- **Testing:** unit-test the scene and rotation logic with real Three.js objects, and test component mount and unmount with a mocked `WebGLRenderer`. jsdom has no WebGL, so the visual spinning and responsive checks are manual.
- **Spec filenames:** `plan.md`, `requirements.md`, `validation.md`, matching the scaffold spec and the `/feature` skill.
- **Branch:** `phase-2-threejs-canvas`.
- **Cleanup:** the hook must dispose of the renderer, geometry, and material and remove its canvas on unmount, so React `StrictMode` double-mounting leaves no leaked canvases or loops.
- **Pixel ratio:** capped at 2 to keep rendering light on high-density phones.

## Context
- `specs/mission.md`: simple and low friction; responsive by default; original stylized low-poly visuals. A plain cube keeps this phase minimal.
- `specs/tech-stack.md`: Vite, React with TypeScript, Three.js used directly, Vitest for validation, npm.
- `specs/roadmap.md`: Phase 2 builds on the Phase 1 scaffold; Phase 3 adds controls, lights, and ground to this scene.
- Repo state at start: Phase 1 and the Vitest setup are merged to `main`; `App` renders a placeholder "Mortals" div; `web/src/components/organisms/` and `web/src/pages/` hold only `.gitkeep`.
