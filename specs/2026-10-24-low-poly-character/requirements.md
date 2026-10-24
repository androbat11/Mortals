# Requirements: Low-Poly Character (Roadmap Phase 4)

## Scope
Build one procedural low-poly character in the Three.js scene, standing in a neutral pose on the ground, ready for Phase 5 to animate. Before that, close out Phases 2 and 3, and make the render loop generic so the character (and later its animation) plugs in without editing the loop.

In scope:
- Closing out Phases 2 and 3 (manual checks, roadmap status) before Phase 4 starts.
- A render loop that runs a list of per-frame updaters, and scene contents that are not tied to a cube.
- An original, generic blocky humanoid fighter built in code from boxes, with named joints.
- Removing the Phase 2 and 3 cube and its spin.
- Framing the character with the existing camera, orbit controls, lights, ground, and fog.
- Vitest tests for the new feature logic.
- Responsive behaviour on phone, tablet, and desktop.

Out of scope:
- Animation of the character (Phase 5); in Phase 4 the character stands still.
- Any Mortal Kombat character, likeness, name, or imported or copyrighted model.
- The fatality data model, the page layout, playback controls, and styling beyond the scene.
- New dependencies, routing, and react-three-fiber.

## Decisions
- **Prerequisites:** close out Phases 2 and 3 first, as a small separate PR. The roadmap says to finish and verify a phase before starting the next, and the manual checks need a real browser.
- **Loop refactor:** the render loop takes a list of `FrameUpdater`s, and the scene contents return that list, as the first commit of this phase. Phase 5 animation and Phase 8 pause then plug into the same seam, and the loop is not edited again. The spinning cube is kept working through the seam first, so the refactor is verified before the character exists.
- **Character style:** an original, generic, blocky humanoid made of boxes (head, torso, pelvis, two upper arms, two forearms, two upper legs, two lower legs), flat-shaded with a few polygons and a small palette. This follows the mission (original stylized low-poly visuals, no copyrighted assets) and `specs/tech-stack.md` (characters built procedurally in Three.js and animated in code).
- **Named joints:** each limb hangs from a joint group (`neck`, `shoulderL`, `shoulderR`, `elbowL`, `elbowR`, `hipL`, `hipR`, `kneeL`, `kneeR`), and the character is returned as a typed rig. Phase 5 can then animate by joint name without searching the scene.
- **Body part origin:** each part's origin is at its top, so it hangs from its joint and rotates around it.
- **Module layout:** the character lives in `web/src/three/objects/character/`, one factory per file, so `objects/` does not grow into one flat folder.
- **Cube and pose:** the cube, its spin, and its tests are deleted. The character stands in a neutral pose on the ground. Animation arrives in Phase 5.
- **Framing:** the camera and the orbit controls aim at the character's chest height, through a factory, and the control limits keep a full-height character in view.
- **Palette:** colours come from `createCharacterPalette()`, a function, not module-level constants.
- **Shared materials:** body parts share a few materials. `disposeScene` already disposes materials that are shared; disposing one twice is harmless, and a test confirms it.
- **Accessible name:** `ScenePage` gives the scene a `label` that describes the character, since the 3D view is the main content.
- **Branch:** `phase-4-low-poly-character`, created from the updated `main` once the closeout PR is merged.
- **Spec filenames:** `plan.md`, `requirements.md`, `validation.md`, matching earlier specs.

## Context
- `specs/mission.md`: original stylized low-poly visuals, no copyrighted game assets; content is easy to add (data plus an animation), which the named joints and the generic loop prepare for.
- `specs/tech-stack.md`: Vite, React with TypeScript, Three.js used directly, procedural low-poly characters animated in code, Vitest, npm.
- `specs/roadmap.md`: Phase 4 follows Phase 3 and precedes Phase 5 (first animation), which animates this character.
- `CLAUDE.md`: atomic design, type-first, functions over classes, factories and `createRepository`, no globals, small modules grouped by purpose, responsive design, comment design decisions, tests for feature logic only.
- Repo state at start: Phase 3 is merged (PR #5). The scene has a lit cube on a ground plane, orbit controls, lights, background, and fog. `startRenderLoop`, `createSceneContents`, and `rotateCube` are cube-specific. The manual checks for Phases 2 and 3 are unticked and the roadmap still shows them open.
- Parked, not part of this spec: showing the fatality's button inputs and character information below the animation. It affects the Phase 6 data type and the Phase 7 layout.

## Future notes (deliberately not in this phase)
- **Phase 5:** the animation model (an animation type, a registry made with `createRepository`, and playback state kept apart from the loop) needs its own short design note before it is built.
- **Phase 7:** the full-viewport canvas captures touch, so the fatality page needs a bounded canvas height.
- **Character info:** if the parked idea is accepted, the character will need a name and details in the Phase 6 data type, separate from this 3D rig.
