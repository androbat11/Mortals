# Validation: Second and Third Fatalities (Roadmap Phase 10)

The work can be merged when every item below passes.

## Automated checks (run in `web/`)
- [x] `npm install` completes with no errors.
- [x] `npm test` exits 0, including the new animation, helper, and fatality tests.
- [x] `npm run lint` exits 0 with zero errors and zero warnings.
- [x] `npm run build` exits 0.
- [x] `npm run preview` serves the built output.

## Manual checks
Checked so far with a headless Chrome screenshot of the sweep-kick page (its text, back link, and playback buttons render, and the move is mid wind-up). Not checked yet: the full motion of each move, the other widths, and the buttons by hand.

- [ ] **Earlier phases:** the manual checks for Phases 2 to 9 are run in a browser pass and ticked, and the roadmap statuses are updated.
- [ ] The list shows three cards; each opens a page with its own text and a visibly different animation.
- [ ] Each move is smooth, loops without a pop, and reads as a different action (uppercut, sweep kick, overhead smash); no limb detaches from or goes through the body in an ugly way, and the feet stay near the ground.
- [ ] Pause, Play, and Replay work on every page.
- [ ] The content is clearly sample data, with nothing invented about a real game; the real content gap is understood and tracked.
- [ ] Nothing changed visually in the page layout at 375, 768, and 1280px.

## Structure and conventions
- [x] The two fatalities were added with data and animations only: no change to pages, components, or scene code.
- [x] New ids are in the `AnimationId` and `FatalityId` unions and registered in the registries (the compiler rejects a missing one).
- [x] Every source file is under about 100 lines (tests exempt); no classes; `any` is not used; no module-level state.
- [x] Design decisions are explained in code comments; `README.md` is updated.

## Scope guard
- [x] No real fatality data, victim character, spine joint, effects, button inputs, or filter.
- [x] No new dependencies. Root `package.json` is unchanged and no root `package-lock.json` is committed.
- [x] Tests cover feature logic only: none for `App.tsx` or `main.tsx`.

## Merge readiness
- [ ] Work is on `phase-10-more-fatalities` with a clean `git status` after commit.
- [ ] The PR is open, `/pr-review` has been run, and its blocking findings are fixed.
- [ ] `changelog.md` is updated and committed last, and `specs/roadmap.md` marks Phase 10 as done once the checks pass.
