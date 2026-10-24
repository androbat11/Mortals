# Requirements: Camera and Lighting (Roadmap Phase 3), with Phase 2 closeout

## Scope
Add orbit controls, lights, and a ground plane to the existing Three.js scene, so the user can look around the scene. Before that, close out Phase 2: it is merged, but its manual checks were never run and the roadmap still shows it open.

In scope:
- Phase 2 closeout: run the manual checks in `specs/2026-10-23-threejs-canvas/validation.md`, tick them, and mark Phase 2 done in `specs/roadmap.md`.
- Orbit controls that work with a mouse and with touch.
- An ambient light and a directional light.
- A ground plane for the cube to rest on.
- The cube switches from the unlit wireframe to a solid lit material.
- Responsive behaviour on phone, tablet, and desktop, including touch.
- Vitest tests for the new feature logic.

Out of scope:
- Shadows (they cost GPU time on phones; revisit in a later phase if needed).
- The character, animations, and the fatality data model (Phases 4 to 6).
- New dependencies, routing, styling beyond the scene, and playback controls.

## Decisions
- **Feature scope:** Phase 2 closeout plus Phase 3, in one spec. Phase 3 builds on Phase 2, so Phase 2 must be verified first; the closeout is the first task group.
- **Phase 3 scope:** exactly the roadmap (orbit controls, lights, ground plane). This keeps the phase small and independently verifiable, and the character belongs to Phase 4.
- **Cube material:** a solid `MeshStandardMaterial`, so the lights and ground visibly affect it. The mission calls for stylized low-poly visuals, which need lit solid shapes, and an unlit wireframe would hide the effect of everything this phase adds.
- **Orbit controls:** one-finger drag or mouse drag rotates, pinch or scroll zooms, pan is disabled, zoom distance is clamped, and the vertical angle is limited so the camera cannot go below the ground. Casual fans on phones should not be able to get lost or end up under the scene (mission: simple, low friction). Damping makes the motion feel smooth and needs `controls.update()` each frame.
- **Where the settings live:** the limits come from a function (`createControlLimits`), not a module-level constant, in line with the no-globals rule.
- **Where the controls are created:** `createOrbitControls(camera, domElement)` is a factory in `web/src/three/controls/createOrbitControls.ts` and takes the element as a parameter, like `createRenderer`, so `three/` still reads nothing from the page. It is created through the repository, like every other object.
- **No new dependency:** `OrbitControls` is part of `three` (`three/addons`), so `specs/tech-stack.md` is respected and no package is added.
- **Rotation axis:** the cube now spins around the vertical axis only. It rests on the ground, and the Phase 2 rotation on two axes would push its corners through the floor.
- **Scene contents:** building the cube, ground, and lights lives in `createSceneContents`, so `useThreeScene` stays thin wiring and the character is added in the same place in Phase 4.
- **Module layout:** `factories.ts` was growing, so every factory now has its own file, grouped by what it does under `web/src/three/`: `objects/`, `rendering/`, `controls/`, `animation/`, and `core/`. This follows separation of concerns and atomic design's idea of small pieces composed upward. The per-frame work moved out of the hook into `startRenderLoop`. The rule is recorded in `CLAUDE.md` and in `pr-review` (R18).
- **Cleanup:** the controls are disposed on unmount, because they add event listeners to the canvas; StrictMode would otherwise leave duplicates.
- **Accessible name:** `ScenePage` updates its `label` so it describes the interactive scene, since the 3D view is still the main content.
- **Responsive:** the canvas already follows its container. Controls must not make the page scroll or zoom while the user rotates on touch (`OrbitControls` sets `touch-action: none` on the canvas itself).
- **Branch:** `phase-3-camera-lighting`, created from the updated `main` when implementation starts (not created while writing this spec).
- **Spec filenames:** `plan.md`, `requirements.md`, `validation.md`, matching earlier specs.

## Context
- `specs/mission.md`: simple, low friction; responsive by default; original stylized low-poly visuals; watching and learning come first.
- `specs/tech-stack.md`: Vite, React with TypeScript, Three.js used directly, Vitest, npm. No react-three-fiber.
- `specs/roadmap.md`: Phase 3 follows Phase 2; Phase 4 adds the character to this scene.
- `CLAUDE.md`: atomic design, UI and logic separate, type-first, functions over classes, factories and `createRepository`, no globals, responsive design, comment design decisions, tests for feature logic only.
- Repo state at start: Phase 2 is merged (PR #4); `web/src/three/` holds one `factories.ts` and helpers (split by purpose during this phase), `web/src/hooks/useThreeScene.ts` wires them, and `SceneCanvas` and `ScenePage` render the scene. The roadmap still shows Phase 2 as open, and 13 items in the Phase 2 `validation.md` are unticked. The idea of showing the fatality's button inputs and character information is parked and is not part of this spec.
