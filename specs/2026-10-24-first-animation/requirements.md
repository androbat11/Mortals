# Requirements: First Animation (Roadmap Phase 5)

## Scope
Animate the Phase 4 character through one simple, original finisher move, driven by animation data and a generic player, looping continuously.

In scope:
- Animation types, a pure evaluator, a function that applies a pose to the rig, and a player that owns its time.
- One animation written as keyframe data over the nine named joints, registered by id.
- Wiring the animation into the scene through the existing frame-updater list.
- Vitest tests for the new feature logic.
- Responsive behaviour is unchanged (the canvas already follows its container); the animation must look right at phone, tablet, and desktop widths.

Out of scope:
- A second (victim) character, a spine joint, props, and effects.
- Replay, pause, and any playback controls (Phase 8).
- The fatality data model and the page layout (Phases 6 and 7).
- Any Mortal Kombat move, name, or likeness; the move is a generic original finisher.
- New dependencies, `AnimationMixer`, and imported animation files.

## Decisions
- **Base:** Phase 4 is merged (PR #6), so Phase 5 branches from `main`. The roadmap statuses for Phases 2 to 4 and their manual browser checks are still open; the user chose to continue. They need one real-browser pass, which also covers this phase.
- **Scope of the scene:** one fighter and one finisher, no victim. It is the smallest change that proves animation; a victim needs a parameterised character, a second rig, and a second animation.
- **Animation model:** an animation is typed data (an id, a duration, and keyframe tracks per named joint), evaluated by one generic player. The mission says a new fatality is data plus an animation, and the tech stack's data entry holds an animation id; with data, a new fatality adds data and no new code. Evaluation is a pure function, so it is tested without WebGL.
- **Interpolation:** linear between keyframes, holding the first value before the first keyframe and the last after the last. It is simple and predictable; easing can be added later if the motion looks stiff.
- **Registry:** animations are registered by id with `createRepository`, like every other object, so a data entry's `animationId` can select one. `createAnimation(id)` is the factory the scene repository exposes.
- **Playback:** the move loops continuously. The player owns its elapsed time in a closure, so Phase 8 adds pause and restart there without touching the render loop. The player returns a plain frame updater for now, and its return type will grow when Phase 8 needs a handle.
- **Delta:** the loop already clamps the frame delta, so a hidden tab does not make the move jump.
- **The animation id** flows from `ScenePage` as a typed prop through `SceneCanvas`, `useThreeScene`, and `setupScene` to `createSceneContents`, instead of a hard-coded constant (no globals). The scene is built once per mount; changing the animation without rebuilding the scene (and the WebGL context) is left for the fatality page.
- **Motion design:** the move uses the documented sign convention (a negative x rotation swings a limb forward) and only the nine existing joints, so the body does not lean, because there is no spine joint yet. The values are tuned by eye in the manual checks.
- **Module layout:** types, evaluator, pose application, and player are separate files in `web/src/three/animation/`; the data lives in `web/src/three/animation/animations/`.
- **Branch:** `phase-5-first-animation`, from `main`.
- **Spec filenames:** `plan.md`, `requirements.md`, `validation.md`, matching earlier specs.

## Context
- `specs/mission.md`: watch a 3D fatality animation; content is easy to add (data plus an animation); original stylized low-poly visuals, no copyrighted game assets.
- `specs/tech-stack.md`: characters are animated in code; data holds an animation id; Three.js used directly; Vitest; npm.
- `specs/roadmap.md`: Phase 5 follows Phase 4 (the character) and precedes Phase 6 (the data model, which will reference the animation id) and Phase 8 (playback controls).
- `CLAUDE.md`: type-first, functions over classes, factories and `createRepository`, no globals, small modules grouped by purpose, comment design decisions, tests for feature logic only.
- Repo state at start: `main` has the Phase 4 character (11 boxes, nine named joints, sign convention documented in `characterRig.ts`), the generic `FrameUpdater` loop with an empty updater list, and `createSceneContents` returning the character. The roadmap shows Phases 2 to 4 not done and their validation items are unticked.
- Parked, not part of this spec: showing the fatality's button inputs and character information below the animation (affects Phases 6 and 7), and a realistic, rounded character (conflicts with the mission's stylized low-poly).

## Future notes (deliberately not in this phase)
- **Phase 6:** the data entry will hold an `animationId` that selects an animation from the registry.
- **Phase 8:** the player will need to expose pause and restart.
- **Later:** a spine joint, a victim character with its own palette, and easing or a smarter interpolation if the motion looks stiff.
