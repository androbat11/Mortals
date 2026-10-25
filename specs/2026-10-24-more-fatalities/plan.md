# Plan: Second and Third Fatalities (Roadmap Phase 10)

## 1. Branch and baseline
1. Create the branch `phase-10-more-fatalities` from `phase-9-fatality-list` (earlier phases are not merged into `main` yet).
2. Run `npm test`, `npm run lint`, and `npm run build` in `web/` to confirm the baseline is green.

## 2. Two more animations (original data)
1. Add a small shared helper that builds a rotation track around x from `[time, angle]` points, so a new animation is mostly a list of numbers.
2. Add `sweep-kick-finisher` (a guard, a leg wound back and kicked high, a hold, and a return) and `overhead-smash-finisher` (both arms raised overhead, then slammed down into a squat, a hold, and a return). Each starts and ends at the rest pose, uses only the nine named joints, and is original and generic.
3. Add both ids to `AnimationId` and register them in the animation registry.

## 3. Two more data entries
1. Add `sample-sweep-kick` and `sample-overhead-smash` to `FatalityId`, one factory each, and register them in the fatality registry.
2. The entries are clearly-labelled sample data, each pointing at its own animation. Two sample games are used (two entries in the first, one in the second), so the game filter has something to filter.

## 4. Tests (Vitest, feature logic only)
1. Test each new animation: id, keyframe order within the duration, start and end at rest (a seamless loop), and the move's key moment (the kicking leg raised forward, the arms overhead).
2. Test the shared track helper.
3. Test every registered fatality in one place: unique ids, non-empty text and steps, labelled as sample data, an animation that exists, and a different animation per entry.
4. Update the registry tests for the new ids. Run `npm test`. Do not add tests for `App.tsx` or `main.tsx`.

## 5. Documentation
1. Comment each design decision in the code. Update `README.md` (how to add a fatality now has real examples).
2. Update `specs/roadmap.md` to mark Phase 10 as done only after the manual checks pass.

## 6. Verify and wrap up
1. Walk through `validation.md`. Commit on `phase-10-more-fatalities`, open a PR to `main`, run `/pr-review` and fix blocking findings, then run `/changelog` and commit it last.
