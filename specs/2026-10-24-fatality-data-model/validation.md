# Validation: Fatality Data Model (Roadmap Phase 6)

The work can be merged when every item below passes.

## Automated checks (run in `web/`)
- [x] `npm install` completes with no errors.
- [x] `npm test` exits 0, including the new entry, animation-link, and registry tests.
- [x] `npm run lint` exits 0 with zero errors and zero warnings.
- [x] `npm run build` exits 0 (type-check and Vite build both pass).
- [x] `npm run preview` serves the built output.

## Manual checks
- [ ] **Earlier phases:** the manual checks for Phases 2 to 5 are run in a browser pass and ticked, and the roadmap statuses are updated.
- [ ] `npm run dev` starts, the page looks and behaves exactly as before (the fighter performs the uppercut on the ground), and the console shows no errors or warnings.
- [x] The sample entry reads as clearly-labelled sample data and contains nothing invented about a real Mortal Kombat game or fatality.

## Structure and conventions
- [x] `Fatality` and `FatalityId` are defined before the code that uses them, and `tutorialSteps` is a non-empty list type.
- [x] `Fatality.animationId` uses the `AnimationId` type from Phase 5.
- [x] The entry is created by a factory function and looked up through the repository, with no module-level data constant and no inline `new`.
- [x] The registry is typed `Record<FatalityId, ...>`, so a missing or extra id is a compile error.
- [x] The data lives in `web/src/data/`, one purpose per file, and every source file is under about 100 lines (tests exempt; check with `wc -l`).
- [x] No module-level constants or mutable state, no classes, and `any` is not used.
- [x] `web/src/three/` has no dependency on `web/src/data/` (content stays out of the 3D code).
- [x] Design decisions are explained in code comments.
- [x] `README.md` describes `web/src/data/` and how to add a fatality.

## Scope guard
- [x] No page, screen, list, filter, or other UI, and the scene is not driven by the entry yet.
- [x] No button inputs, character information, backend, loader, or runtime validation.
- [x] No new dependencies in `web/package.json`.
- [x] Root `package.json` is unchanged, and no root `package-lock.json` is committed.
- [x] Tests cover feature logic only: none for `App.tsx` or `main.tsx`.

## Merge readiness
- [ ] Work is on `phase-6-fatality-data-model`, with a clean `git status` after commit.
- [ ] The PR is open, `/pr-review` has been run on it, and its blocking findings are fixed.
- [ ] `changelog.md` is updated and committed last, and `specs/roadmap.md` marks Phase 6 as done once the checks above pass.
- [ ] A fresh clone passes the automated checks above.
