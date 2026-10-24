# Validation: Second and Third Fatalities (Roadmap Phase 10)

The work can be merged when every item below passes.

## Automated checks (run in `web/`)
- [ ] `npm install` completes with no errors.
- [ ] `npm test` exits 0, including the new animation, helper, and fatality tests.
- [ ] `npm run lint` exits 0 with zero errors and zero warnings.
- [ ] `npm run build` exits 0.
- [ ] `npm run preview` serves the built output.

## Manual checks
- [ ] **Earlier phases:** the manual checks for Phases 2 to 9 are run in a browser pass and ticked, and the roadmap statuses are updated.
- [ ] The list shows three cards; each opens a page with its own text and a visibly different animation.
- [ ] Each move is smooth, loops without a pop, and reads as a different action (uppercut, sweep kick, overhead smash); no limb detaches from or goes through the body in an ugly way, and the feet stay near the ground.
- [ ] Pause, Play, and Replay work on every page.
- [ ] The content is clearly sample data, with nothing invented about a real game; the real content gap is understood and tracked.
- [ ] Nothing changed visually in the page layout at 375, 768, and 1280px.

## Structure and conventions
- [ ] The two fatalities were added with data and animations only: no change to pages, components, or scene code.
- [ ] New ids are in the `AnimationId` and `FatalityId` unions and registered in the registries (the compiler rejects a missing one).
- [ ] Every source file is under about 100 lines (tests exempt); no classes; `any` is not used; no module-level state.
- [ ] Design decisions are explained in code comments; `README.md` is updated.

## Scope guard
- [ ] No real fatality data, victim character, spine joint, effects, button inputs, or filter.
- [ ] No new dependencies. Root `package.json` is unchanged and no root `package-lock.json` is committed.
- [ ] Tests cover feature logic only: none for `App.tsx` or `main.tsx`.

## Merge readiness
- [ ] Work is on `phase-10-more-fatalities` with a clean `git status` after commit.
- [ ] The PR is open, `/pr-review` has been run, and its blocking findings are fixed.
- [ ] `changelog.md` is updated and committed last, and `specs/roadmap.md` marks Phase 10 as done once the checks pass.
