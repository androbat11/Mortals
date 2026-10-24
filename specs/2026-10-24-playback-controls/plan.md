# Plan: Playback Controls (Roadmap Phase 8)

## 1. Branch and baseline
1. Create the branch `phase-8-playback-controls` from `phase-7-fatality-page` (Phases 6 and 7 are not merged into `main` yet).
2. Run `npm test`, `npm run lint`, and `npm run build` in `web/` to confirm the baseline is green.

## 2. Playback control (types first, `web/src/three/animation/`)
1. Define the `PlaybackControl` type and its factory `createPlaybackControl(initiallyPlaying)` in one file: closure state for "playing" and "restart requested", with `isPlaying`, `play`, `pause`, `restart` (which also starts playing), and `takeRestart` (returns true once per restart request).
2. Change `createAnimationPlayer(rig, animation, playback)`: a restart request sets the elapsed time to 0; time advances only while playing; the pose for the current time is applied every frame, so a paused or restarted move shows the right pose. The render loop and the orbit controls keep running while paused.

## 3. Wire it through the scene
1. Add `playback` as a typed prop from `FatalityPage` through `SceneCanvas`, `useThreeScene`, `setupScene`, and `createSceneContents`, and register the player's new signature in `createSceneRepository`. The control object is stable, so the scene is not rebuilt when the user pauses.

## 4. Hook and reduced motion
1. Create `prefersReducedMotion()` (guards for a missing `matchMedia`).
2. Create `usePlayback()`: it creates one control (starting paused when the user asks for reduced motion), mirrors "playing" in React state, and returns `playback`, `playing`, `togglePlaying`, and `replay`.

## 5. Components
1. Atom `Button`: a `type="button"` button that takes `children` and `onClick`, with a large touch target and visible keyboard focus.
2. Molecule `PlaybackControls`: a Pause or Play button (its label follows `playing`) and a Replay button.
3. Add a `controls` slot to `FatalityPageTemplate`, shown over the bottom of the scene area, and fill it in `FatalityPage`.

## 6. Tests (Vitest, feature logic only)
1. Test `createPlaybackControl`: initial state, play, pause, restart (starts playing and is consumed once).
2. Test the player: paused time does not advance, resume continues from where it stopped, restart goes back to 0 and plays, and a restart while paused shows the first pose.
3. Test `usePlayback` (toggle, replay, reduced motion starts paused) and `prefersReducedMotion`.
4. Test `PlaybackControls` (labels follow `playing`, the buttons call their handlers) and `FatalityPage` (clicking Pause shows Play).
5. Update the existing tests for the new prop. Run `npm test`. Do not add tests for `App.tsx` or `main.tsx`.

## 7. Documentation
1. Comment each design decision in the code. Update `README.md`.
2. Update `specs/roadmap.md` to mark Phase 8 as done only after the manual checks pass.

## 8. Verify and wrap up
1. Walk through `validation.md`. Commit on `phase-8-playback-controls`, open a PR to `main`, run `/pr-review` and fix blocking findings, then run `/changelog` and commit it last.
