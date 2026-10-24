# Validation: Playback Controls (Roadmap Phase 8)

The work can be merged when every item below passes.

## Automated checks (run in `web/`)
- [x] `npm install` completes with no errors.
- [x] `npm test` exits 0, including the new control, player, hook, and component tests.
- [x] `npm run lint` exits 0 with zero errors and zero warnings.
- [x] `npm run build` exits 0.
- [x] `npm run preview` serves the built output.

## Manual checks
Checked so far with a headless Chrome screenshot at 375px (the buttons sit under the fighter and cover nothing). Not checked yet: pressing the buttons in a browser, reduced motion, keyboard, and the other widths.

- [ ] **Earlier phases:** the manual checks for Phases 2 to 7 are run in a browser pass and ticked, and the roadmap statuses are updated.
- [ ] Pause freezes the move, Play continues from the same point, and Replay restarts it from the beginning (also when paused).
- [ ] While paused the camera can still be orbited and the scene does not stutter.
- [ ] With the system's reduced-motion setting on, the page starts paused at the rest pose and Play starts the move.
- [ ] The controls are visible over the scene at 375, 768, and 1280px, do not cover the fighter, and are easy to tap (large targets).
- [ ] Keyboard: Tab reaches both buttons with a visible focus ring, and Enter or Space activates them.
- [ ] The scene is not rebuilt when pausing (no flicker, one canvas).

## Structure and conventions
- [x] `PlaybackControl` is defined before the code that uses it; its state is in a closure, with no module-level state.
- [x] The player and the render loop stay generic; the loop knows nothing about playback.
- [x] Components contain no logic: `usePlayback` owns it; `Button` is an atom and `PlaybackControls` a molecule.
- [x] Every source file is under about 100 lines (tests exempt); no classes; `any` is not used.
- [x] Design decisions are explained in code comments; `README.md` is updated.

## Scope guard
- [x] No scrubber, speed control, list, filter, or new fatalities.
- [x] No new dependencies. Root `package.json` is unchanged and no root `package-lock.json` is committed.
- [x] Tests cover feature logic only: none for `App.tsx` or `main.tsx`.

## Merge readiness
- [ ] Work is on `phase-8-playback-controls` with a clean `git status` after commit.
- [ ] The PR is open, `/pr-review` has been run, and its blocking findings are fixed.
- [ ] `changelog.md` is updated and committed last, and `specs/roadmap.md` marks Phase 8 as done once the checks pass.
