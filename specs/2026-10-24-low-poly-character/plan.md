# Plan: Low-Poly Character (Roadmap Phase 4)

## 1. Close out Phases 2 and 3 (prerequisite)
1. The user runs `cd web && npm run dev` and works through the manual checks in `specs/2026-10-23-threejs-canvas/validation.md` and `specs/2026-10-24-camera-and-lighting/validation.md` (cube and ground, mouse and touch, 375, 768, and 1280px, console, StrictMode, unmount).
2. Tick the items that pass, fix or record any that fail, and mark Phases 2 and 3 as done in `specs/roadmap.md`, in a small separate PR to `main`.
3. Only then continue with this plan.

## 2. Branch and baseline
1. Create the branch `phase-4-low-poly-character` from the updated `main`.
2. Run `npm test`, `npm run lint`, and `npm run build` in `web/` to confirm the baseline is green.

## 3. Types first
1. Define `JointName` (the named joints: `neck`, `shoulderL`, `shoulderR`, `elbowL`, `elbowR`, `hipL`, `hipR`, `kneeL`, `kneeR`) and `CharacterRig` (`{ root: Group; joints: Record<JointName, Group> }`) in `web/src/three/objects/character/`.
2. Define the `FrameUpdater` type (`(deltaSeconds: number) => void`) in `web/src/three/animation/`.

## 4. Generic render loop (refactor first, its own commit)
1. Change `startRenderLoop` so it runs a list of `FrameUpdater`s each frame instead of calling `rotateCube` on a hard-coded cube.
2. Change `createSceneContents` so it returns `{ scene, camera, updaters }` and no longer knows about a cube; `setupScene` passes the updaters to the loop.
3. Keep the spinning cube working through this seam (the cube spin becomes one updater) so the refactor can be verified before the character exists.
4. Update the tests for `startRenderLoop` and `createSceneContents`.

## 5. Character factories (`web/src/three/objects/character/`)
1. Create `createCharacterPalette()`, a function that returns the colours (skin, outfit, accent). No module-level constants.
2. Create `createCharacterDimensions()` (all measurements, in one function) and `createBodyMaterial(color)` (a flat-shaded material, one per colour, shared by many parts).
3. Create `createBodyPart(size, material)`, a box mesh whose origin is at its top, so it hangs from its joint.
4. Create `createJoint(position)`, a group that marks a pivot the animation will rotate, and `createLimb(...)`, which builds an arm or a leg (an upper part, a child joint, and a lower part), so the four limbs are mirrored by construction.
5. Create `createCharacter()`, which assembles the head, torso, pelvis, and the four limbs under named joints, standing with its feet on the ground at y = 0, and returns the `CharacterRig`.
6. Keep each file one purpose and under about 100 lines. Comment the design decisions (why a top origin, why named joints, why flat shading).

## 6. Put the character in the scene
1. Register `character` in `createSceneRepository`, and have `createSceneContents` add the character instead of the cube.
2. Delete the cube: `createCube`, `rotateCube`, their tests, and the `cube` repository key.
3. Frame the character: `createViewTarget()` (a factory) gives the centre of the character (0.9), and both the camera and the orbit controls aim at it instead of the ground origin. A test checks the closest zoom still frames a full-height character.
4. Update `ScenePage`'s `label` to describe the character.

## 7. Tests (Vitest, feature logic only)
1. Test `createCharacterPalette`, `createBodyPart` (origin at the top, flat shading), and `createJoint`.
2. Test `createCharacter`: all joint names exist, elbows and knees hang from their limbs, left and right mirror each other, the feet rest on the ground, the height is about 1.8, the character is centred, it is 11 boxes sharing 3 flat-shaded materials, and rotating a shoulder swings the whole arm. Also test `createLimb` and `createViewTarget`.
3. Test the generic loop: updaters run in order each frame and the clamped delta is passed to them.
4. Test `createSceneContents`: the scene holds the character, ground, lights, background, and fog, and no cube.
5. Update the `SceneCanvas` disposal tests for the character's geometries and shared materials.
6. Run `npm test`. Do not add tests for `App.tsx` or `main.tsx`.

## 8. Documentation
1. Comment each design decision in the code (why, not what).
2. Update `README.md` for the new `character/` folder and the generic loop.
3. Update `specs/roadmap.md` to mark Phase 4 as done only after the manual checks in `validation.md` pass.

## 9. Verify and wrap up
1. Walk through every item in `validation.md`, including the manual checks at phone, tablet, and desktop widths.
2. Commit on `phase-4-low-poly-character`, open a PR to `main`, run `/pr-review` on it and fix blocking findings, then run `/changelog` and commit the changelog last.
