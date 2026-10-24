# Plan: Fatality Data Model (Roadmap Phase 6)

## 1. Branch and baseline
1. Confirm `main` includes Phases 4 and 5 (PRs #6 and #7, merged) and create the branch `phase-6-fatality-data-model` from it.
2. Run `npm test`, `npm run lint`, and `npm run build` in `web/` to confirm the baseline is green.

## 2. Types first (`web/src/data/`)
1. Define `FatalityId` (a closed union of the ids in the registry) and `Fatality` in `web/src/data/fatality.ts`: `id`, `name`, `game`, `description`, `tutorialSteps`, and `animationId` (the `AnimationId` from Phase 5).
2. Type `tutorialSteps` as a non-empty list, so a fatality without steps is a compile error.

## 3. The data entry
1. Create one entry as a factory function in `web/src/data/fatalities/`, returning a `Fatality` (no module-level constant). It is clearly-labelled original sample data that matches the generic uppercut animation, not a real Mortal Kombat fatality.
2. Create `createFatalityRepository()` with `createRepository`, typed as `Record<FatalityId, () => Fatality>` so every id has an entry, and a `createFatality(id)` factory that looks an entry up by id.
3. Keep every file one purpose and under about 100 lines.

## 4. Tests (Vitest, feature logic only)
1. Test the entry: every text field is non-empty, there is at least one tutorial step and every step is non-empty, and the entry says it is sample data.
2. Test the link to Phase 5: every registered fatality's `animationId` resolves to an animation with that id.
3. Test the registry: each registered id returns an entry with that id, lookups return a new object each time, and the id list matches the `FatalityId` union (a compile-time check, plus a runtime check that every id resolves).
4. Run `npm test`. Do not add tests for `App.tsx` or `main.tsx`.

## 5. Documentation
1. Comment each design decision in the code (why, not what).
2. Update `README.md` for the new `web/src/data/` folder and how to add a fatality.
3. Update `specs/roadmap.md` to mark Phase 6 as done only after `validation.md` passes.

## 6. Verify and wrap up
1. Walk through every item in `validation.md`.
2. Commit on `phase-6-fatality-data-model`, open a PR to `main`, run `/pr-review` on it and fix blocking findings, then run `/changelog` and commit the changelog last.
