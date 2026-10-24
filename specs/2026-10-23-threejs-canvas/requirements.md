# Requirements: Three.js Canvas (Roadmap Phase 2)

## Scope
A React component renders a Three.js scene with a spinning cube, filling its container and staying correct as the screen size changes.

In scope:
- `three` and `@types/three` added to `web/`.
- Factory functions for every object the scene creates (scene, camera, cube, renderer, timer in `three/factories.ts`; the `ResizeObserver` factory in `hooks/browserFactories.ts`, because it is a browser API), and a generic `createRepository` function that creates those objects by key. `createSceneRepository` registers them. The hook creates all its objects through the repository, never with `new`.
- Single-purpose helper functions in `three/` for sizing, pixel ratio, frame delta, disposal, and rotation, with no module-level state.
- A `useThreeScene` hook that only wires the objects together: creation, the animation loop, resizing, and cleanup.
- A `SceneCanvas` organism (composable through an optional `className`) and a `ScenePage` page, with `App` rendering the page.
- Responsive behaviour: the canvas fills the viewport and resizes on phone, tablet, and desktop; no horizontal scroll.
- Vitest tests for the scene logic, the helpers, and the component's mount, loop, resize, and unmount behaviour.

Out of scope:
- Orbit controls, lights, ground plane (Phase 3).
- Characters and animations (Phases 4 and 5).
- Routing, the fatality data model, playback controls, and styling beyond making the canvas fill the screen.
- react-three-fiber.

## Decisions
- **Scope:** exactly the roadmap item. This keeps the phase small and independently verifiable; lighting and controls belong to Phase 3. The cube uses an unlit `MeshBasicMaterial` so it is visible without lights.
- **Atomic level:** a `SceneCanvas` organism in `components/organisms/` plus a thin `ScenePage` in `pages/`. Later phases extend the organism with the character and controls without moving files.
- **Code structure:** plain-TS logic in `web/src/three/` plus a thin `useThreeScene` hook in `web/src/hooks/`. The hook holds no logic of its own: sizing, disposal, rotation, and clamping are each a small function. This follows `specs/tech-stack.md` (Three.js used directly, wrapped in React components) and keeps scene logic testable without WebGL.
- **Testing:** unit-test the scene logic and helpers with real Three.js objects, and test the component with a mocked `WebGLRenderer` and a recording `ResizeObserver` stub. jsdom has no WebGL, so the visual spinning and responsive checks are manual. `App.tsx` and `main.tsx` are not tested (roadmap testing rule). Test helpers are functions with per-test state, not classes or module-level arrays.
- **Spec filenames:** `plan.md`, `requirements.md`, `validation.md`, matching the scaffold spec and the `/feature` skill.
- **Branch:** the plan names `phase-2-threejs-canvas`; at the user's request the work was done on `add-pr-review-skill`, so the PR mixes Phase 2 with the review tooling.
- **Cleanup:** the hook must dispose of the renderer and, through `disposeScene`, every geometry, material (single or array), and texture, and remove its canvas on unmount, so React `StrictMode` double-mounting leaves no leaked canvases or loops.
- **Pixel ratio:** capped at 2 (in `clampPixelRatio`) to keep rendering light on high-density phones, and re-applied on every resize so moving between monitors works.
- **No globals:** no module-level constants or state. Values come from functions or default parameters (`createSceneRepository`, `clampDelta`'s maximum, `rotateCube`'s speed). Globals cause side effects and are shared by every importer.
- **WebGL failure:** creating the renderer is wrapped in `tryCreate`; when WebGL is unavailable `SceneCanvas` shows a short message instead of the whole app going blank. On cleanup the WebGL context is released with `forceContextLoss`, because browsers limit live contexts and StrictMode or hot reload would otherwise exhaust them.
- **Timer, not Clock:** `THREE.Clock` is deprecated in the pinned Three.js version, so the loop uses `THREE.Timer`.
- **Frame delta:** clamped, so the cube does not jump when a hidden tab becomes visible again.
- **TypeScript strict mode:** set explicitly in both tsconfig files, so the type-first rule does not depend on a compiler default.
- **Bundle size:** the build warns that the JavaScript bundle is over 500 kB because Three.js is large. Accepted for now; code splitting and loading states belong to Phase 12 (Polish).
- **Responsive CSS:** the canvas is fluid (percentages and `dvh`), so it adapts to every width without media queries. Media queries arrive with real layout in later phases.

## Context
- `specs/mission.md`: simple and low friction; responsive by default; original stylized low-poly visuals. A plain cube keeps this phase minimal.
- `specs/tech-stack.md`: Vite, React with TypeScript, Three.js used directly, Vitest for validation, npm.
- `specs/roadmap.md`: Phase 2 builds on the Phase 1 scaffold; Phase 3 adds controls, lights, and ground to this scene.
- Repo state at start: Phase 1 and the Vitest setup are merged to `main`; `App` renders a placeholder "Mortals" div; `web/src/components/organisms/` and `web/src/pages/` hold only `.gitkeep`.
- Two rounds of deep review (three reviewers each: correctness, guideline compliance, docs) led to the helper functions, `createSceneRepository`, stricter disposal, stronger tests, and explicit strict mode described above.
