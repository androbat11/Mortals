# Plan: First Animation (Roadmap Phase 5)

## 1. Branch and baseline
1. Confirm `main` includes Phase 4 (PR #6, merged) and create the branch `phase-5-first-animation` from it.
2. Run `npm test`, `npm run lint`, and `npm run build` in `web/` to confirm the baseline is green.
3. Note: the Phase 2 to 4 manual browser checks and the roadmap statuses are still open (see `requirements.md`).

## 2. Types first (`web/src/three/animation/`)
1. Define the animation types in one file: `Rotation` (`{ x, y, z }` in radians), `Keyframe` (`{ time, rotation }`), `JointTrack` (`{ joint: JointName, keyframes: Keyframe[] }`), `Animation` (`{ id, duration, tracks }`), and `AnimationId`.
2. Define `Pose` as the partial set of joint rotations that an evaluation returns (`Partial<Record<JointName, Rotation>>`).

## 3. Pure animation logic
1. Create `evaluateAnimation(animation, time)`, a pure function that returns the `Pose` at a time: linear interpolation between the two surrounding keyframes, the first value held before the first keyframe and the last held after the last one, and joints with no track left out of the pose.
2. Create `applyPose(rig, pose)`, which sets the rotations of the rig's joints from a pose and leaves untracked joints alone.
3. Create `createAnimationPlayer(rig, animation)`, which returns a `FrameUpdater`. The player owns its elapsed time in a closure, advances it by each delta, loops it with a modulo of the duration, and applies the evaluated pose every frame.

## 4. The first animation (original data)
1. Create `createUppercutFinisher()` in `web/src/three/animation/animations/`, returning an `Animation` with id `uppercut-finisher` and a duration of about 3 seconds: a crouching wind-up with the guard hand up, a fast uppercut strike, a hold, and a return to the rest stance, using only the nine named joints and the documented sign convention.
2. Create `createAnimationRepository()` with `createRepository`, keyed by animation id (so a future data entry's `animationId` selects an animation), and a `createAnimation(id)` factory that looks an animation up by id.
3. Keep every file one purpose and under about 100 lines, with no module-level constants.

## 5. Wire it into the scene
1. Register `animation` (`createAnimation`) and `animationPlayer` (`createAnimationPlayer`) in `createSceneRepository`.
2. Change `createSceneContents` to take an `animationId`, create the animation and its player through the repository, and add the player's updater to the `updaters` list.
3. Pass the id down from `ScenePage` through `SceneCanvas`, `useThreeScene`, and `setupScene` as a typed prop; `ScenePage` supplies `uppercut-finisher`. The scene is built once per mount; swapping animations without a rebuild is left for the fatality page.
4. Update `ScenePage`'s `label` so it says the fighter performs a move.

## 6. Tests (Vitest, feature logic only)
1. Test `evaluateAnimation`: exact keyframes, interpolation at the midpoint, held before the first and after the last keyframe, untracked joints absent, and a single-keyframe track.
2. Test `applyPose`: it sets rotations on tracked joints and leaves the others untouched.
3. Test `createAnimationPlayer`: time advances by the delta, the pose is applied each update, time loops past the duration, and a zero delta keeps the pose.
4. Test the animation data: the id matches its registry key, every track's keyframe times are increasing and within the duration, and at the strike moment the striking arm is raised forward while at the end the pose is back at rest (so the loop is seamless).
5. Test the registry: each registered id returns an animation with that id.
6. Test `createSceneContents`: the animation updater is registered and, when run, rotates the character's joints.
7. Update the `SceneCanvas` tests for the new prop. Run `npm test`. Do not add tests for `App.tsx` or `main.tsx`.

## 7. Documentation
1. Comment each design decision in the code (why, not what).
2. Update `README.md` for the new animation files and how an animation is defined.
3. Update `specs/roadmap.md` to mark Phase 5 as done only after the manual checks in `validation.md` pass.

## 8. Verify and wrap up
1. Walk through every item in `validation.md`, including the manual checks at phone, tablet, and desktop widths.
2. Commit on `phase-5-first-animation`, open a PR to `main`, run `/pr-review` on it and fix blocking findings, then run `/changelog` and commit the changelog last.
