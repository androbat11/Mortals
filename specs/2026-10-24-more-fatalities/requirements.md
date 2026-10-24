# Requirements: Second and Third Fatalities (Roadmap Phase 10)

## Scope
Add two more animations and two more data entries, so the app has three fatalities from two games, the set the roadmap needs for the MVP.

In scope:
- Two new original animations as keyframe data, and a helper to write them.
- Two new fatality entries and their registrations.
- Vitest tests for the new data.

Out of scope:
- Real Mortal Kombat fatalities, names, inputs, or likenesses (see the decision below).
- A victim character, a spine joint, and effects; button inputs and character information (parked).
- The filter (Phase 11) and the polish (Phase 12); new code in pages or components.
- New dependencies.

## Decisions
These were chosen as the recommended defaults, because there was no time to ask.
- **Base:** `phase-9-fatality-list`, because earlier phases are not merged into `main` yet.
- **The content is still sample data, and this is the main gap in the MVP.** The mission calls for iconic fatalities from one or two real games, but I cannot verify real fatality names, games, or button inputs, and I will not invent them; the animations are generic original moves, not recreations. The three entries are clearly-labelled samples that exercise every part of the app. Replacing them with real, verified content is a data change only: new ids, entries, and animations, with no code change, because the app was built around data. This needs your content.
- **Two sample games:** the first two entries use one placeholder game and the third uses a second, so the game filter in Phase 11 has something to filter.
- **Animations as data:** each is a duration and keyframe tracks over the named joints, selected by id, as in Phase 5. A shared helper writes the common "rotate around x at these times" track, so a new animation is a list of numbers.
- **Shallow poses:** there is no spine or root motion, so squats and kicks are kept small enough that the feet do not leave the ground by much; this is tuned by eye in the manual checks.
- **Different animation per entry:** a test requires each entry to use its own animation, so the three pages are visibly different.
- **No page or component changes:** a new fatality is data plus an animation, which this phase proves by adding two without touching the UI or the scene code.
- **Branch:** `phase-10-more-fatalities`.

## Context
- `specs/mission.md`: an MVP set of iconic fatalities from one or two games; a new fatality is data plus an animation; original visuals only.
- `specs/roadmap.md`: Phase 10 follows Phase 9 (the list) and precedes Phase 11 (the filter).
- `CLAUDE.md`: type-first, factories and `createRepository`, no globals, small modules, comments on decisions, tests for feature logic only.
- Repo state at start: one animation (`uppercut-finisher`) and one entry (`sample-uppercut`); the list, the page, and the playback controls work from the registries.

## Future notes
- Real content replaces the samples (and needs real names, games, descriptions, and inputs, supplied or verified by you).
- If button inputs and character information are accepted, they become typed fields on `Fatality`, and the compiler lists every entry to update.
