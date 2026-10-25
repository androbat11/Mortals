# Requirements: Fatality Data Model (Roadmap Phase 6)

## Scope
Define the TypeScript type for a fatality and one data entry (game, description, tutorial steps, and the animation id), with a typed lookup by id. No screen uses it yet.

In scope:
- The `Fatality` and `FatalityId` types, with the tutorial steps typed as a non-empty list.
- One clearly-labelled sample entry, created by a factory function.
- A registry keyed by fatality id (made with `createRepository`) and a `createFatality(id)` lookup.
- Vitest tests for the entry, its link to the animation registry, and the registry.

Out of scope:
- The fatality page and any screen or layout (Phase 7), the list (Phase 9), and the game filter (Phase 11).
- Driving the 3D scene from the entry (the scene keeps its current animation id until the fatality page).
- Button inputs and character information: parked, not part of the type yet.
- Real Mortal Kombat fatalities (Phase 10), a backend, a loader, or runtime validation.
- New dependencies.

## Decisions
These were chosen as the recommended defaults, because the questions were not answered.
- **Base:** `main`. Phases 4 and 5 are merged (PRs #6 and #7), so Phase 6 branches from `main`. The roadmap still shows Phases 2 to 5 as not done and their manual browser checks are open; they need one real-browser pass.
- **Data entry:** one original sample entry that matches the generic uppercut animation, labelled as sample data to be replaced in Phase 10. I cannot verify real fatality names or button inputs, and the Phase 5 animation is not a real fatality, so nothing about the real games is invented.
- **Type shape:** only the roadmap fields (`id`, `name`, `game`, `description`, `tutorialSteps`) plus the `animationId` the tech stack specifies. The parked idea of button inputs and character information is left out; the type can gain fields when it is decided, and the compiler will point at every entry that needs them.
- **Non-empty steps:** `tutorialSteps` is typed `[string, ...string[]]`, so an entry without steps does not compile. The mission says each fatality has a tutorial.
- **Typed ids:** `FatalityId` and `AnimationId` are closed unions, so a mistyped id or a missing animation is a compile error, not a runtime surprise.
- **Registry:** entries are registered by id with `createRepository`, typed as `Record<FatalityId, ...>`, like every other object, so adding a fatality is one factory, one new id, and one line.
- **Factories, not constants:** the entry is created by a function, so no module-level data is shared between callers, and each lookup returns a new object.
- **Where it lives:** `web/src/data/`, apart from `three/` (which must stay free of content) and from the UI. The tech stack says fatality data is static, typed, and kept in the repo.
- **No wiring:** the page that uses the data is Phase 7, and pages must not build data inline; the scene keeps its hard-coded animation id until then.
- **Branch:** `phase-6-fatality-data-model`, from `main`.
- **Spec filenames:** `plan.md`, `requirements.md`, `validation.md`, matching earlier specs.

## Context
- `specs/mission.md`: each fatality has an animation, the game it comes from, what it does, and a tutorial; a new fatality is data plus an animation; no copyrighted game assets.
- `specs/tech-stack.md`: static, typed fatality entries kept in the repo (game, description, tutorial steps, animation id); no backend.
- `specs/roadmap.md`: Phase 6 follows Phase 5 (the animation and its id) and precedes Phase 7 (the page that shows an entry next to its animation).
- `CLAUDE.md`: type-first, functions over classes, factories and `createRepository`, no globals, small modules grouped by purpose, comment design decisions, tests for feature logic only.
- Repo state at start: `main` has the character, the keyframe animation system with the `uppercut-finisher` animation registered by id, and the generic render loop. The roadmap shows Phases 2 to 5 not done.
- Parked, not part of this spec: showing the fatality's button inputs and character information below the animation, and a realistic, rounded character.

## Future notes (deliberately not in this phase)
- **Phase 7:** the fatality page will look an entry up by id and pass its `animationId` to the scene; changing the animation currently rebuilds the scene.
- **Phase 9:** the list will need to list all ids; add a function for that when it is needed.
- **Phase 10:** replace the sample entry with real fatalities, with their games, descriptions, and inputs verified.
- **If button inputs and character information are accepted:** add typed fields to `Fatality`; the compiler lists every entry that needs updating.
