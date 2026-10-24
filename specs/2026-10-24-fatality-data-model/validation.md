# Validation: Fatality Data Model (Roadmap Phase 6)

The work can be merged when every item below passes.

## Automated checks (run in `web/`)
- [ ] `npm install` completes with no errors.
- [ ] `npm test` exits 0, including the new entry, animation-link, and registry tests.
- [ ] `npm run lint` exits 0 with zero errors and zero warnings.
- [ ] `npm run build` exits 0 (type-check and Vite build both pass).
- [ ] `npm run preview` serves the built output.

## Manual checks
- [ ] **Earlier phases:** the manual checks for Phases 2 to 5 are run in a browser pass and ticked, and the roadmap statuses are updated.
- [ ] `npm run dev` starts, the page looks and behaves exactly as before (the fighter performs the uppercut on the ground), and the console shows no errors or warnings.
- [ ] The sample entry reads as clearly-labelled sample data and contains nothing invented about a real Mortal Kombat game or fatality.

## Structure and conventions
- [ ] `Fatality` and `FatalityId` are defined before the code that uses them, and `tutorialSteps` is a non-empty list type.
- [ ] `Fatality.animationId` uses the `AnimationId` type from Phase 5.
- [ ] The entry is created by a factory function and looked up through the repository, with no module-level data constant and no inline `new`.
- [ ] The registry is typed `Record<FatalityId, ...>`, so a missing or extra id is a compile error.
- [ ] The data lives in `web/src/data/`, one purpose per file, and every source file is under about 100 lines (tests exempt; check with `wc -l`).
- [ ] No module-level constants or mutable state, no classes, and `any` is not used.
- [ ] `web/src/three/` has no dependency on `web/src/data/` (content stays out of the 3D code).
- [ ] Design decisions are explained in code comments.
- [ ] `README.md` describes `web/src/data/` and how to add a fatality.

## Scope guard
- [ ] No page, screen, list, filter, or other UI, and the scene is not driven by the entry yet.
- [ ] No button inputs, character information, backend, loader, or runtime validation.
- [ ] No new dependencies in `web/package.json`.
- [ ] Root `package.json` is unchanged, and no root `package-lock.json` is committed.
- [ ] Tests cover feature logic only: none for `App.tsx` or `main.tsx`.

## Merge readiness
- [ ] Work is on `phase-6-fatality-data-model`, with a clean `git status` after commit.
- [ ] The PR is open, `/pr-review` has been run on it, and its blocking findings are fixed.
- [ ] `changelog.md` is updated and committed last, and `specs/roadmap.md` marks Phase 6 as done once the checks above pass.
- [ ] A fresh clone passes the automated checks above.
