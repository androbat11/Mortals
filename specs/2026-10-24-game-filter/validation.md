# Validation: Game Filter (Roadmap Phase 11)

The work can be merged when every item below passes.

## Automated checks (run in `web/`)
- [x] `npm install` completes with no errors.
- [x] `npm test` exits 0, including the new data, routing, hook, and component tests.
- [x] `npm run lint` exits 0 with zero errors and zero warnings.
- [x] `npm run build` exits 0.
- [x] `npm run preview` serves the built output.

## Manual checks
Not checked in a browser yet (the logic and the rendered markup are covered by tests).

- [ ] **Earlier phases:** the manual checks for Phases 2 to 10 are run in a browser pass and ticked, and the roadmap statuses are updated.
- [ ] The list has "All games" plus one link per game; choosing a game shows only its fatalities, and the status line updates.
- [ ] The current choice is visibly marked, and a screen reader announces it as current.
- [ ] A filtered address opens the filtered list directly, survives a reload, and an unknown game shows the full list.
- [ ] Opening a fatality and pressing its back link returns to the list for that fatality's game; the browser's back button also works.
- [ ] The filter links wrap sensibly and are easy to tap at 375, 768, and 1280px, with no horizontal scroll, and have a visible keyboard focus.

## Structure and conventions
- [x] The list route type and the href builders were changed before the code that uses them; links are still written in one place.
- [x] Components contain no logic; filtering is in pure data helpers and the `useFatalityList` hook.
- [x] Every source file is under about 100 lines (tests exempt); no classes; `any` is not used; no module-level state.
- [x] Design decisions are explained in code comments; `README.md` is updated.

## Scope guard
- [x] No search, sorting, multi-select, grouping, loading states, or new fatalities.
- [x] No new dependencies. Root `package.json` is unchanged and no root `package-lock.json` is committed.
- [x] Tests cover feature logic only: none for `App.tsx` or `main.tsx`.

## Merge readiness
- [ ] Work is on `phase-11-game-filter` with a clean `git status` after commit.
- [ ] The PR is open, `/pr-review` has been run, and its blocking findings are fixed.
- [ ] `changelog.md` is updated and committed last, and `specs/roadmap.md` marks Phase 11 as done once the checks pass.
