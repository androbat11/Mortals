# Requirements: Game Filter (Roadmap Phase 11)

## Scope
Let the user narrow the list to the fatalities of one game.

In scope:
- A filter of links ("All games" and one per game) above the list, with the current choice marked.
- The chosen game kept in the address, so it can be shared, survives a reload, and works with the browser's back button.
- The fatality page's back link returning to that fatality's game.
- A status line saying how many fatalities are shown.
- Vitest tests for the new logic.

Out of scope:
- Search, sorting, multiple games at once, and "group by game" headings.
- Loading states and the style pass (Phase 12), and new fatalities.
- New dependencies, and button inputs and character information (parked).

## Decisions
These were chosen as the recommended defaults, because there was no time to ask.
- **Base:** `phase-10-more-fatalities`, because earlier phases are not merged into `main` yet.
- **Filter, not grouping:** the roadmap allows "filter or group"; filtering is simpler and works well on a phone. Grouping can be added later.
- **State in the URL:** the chosen game is part of the route (`#/?game=...`), not React state, so a filtered list can be linked to, a reload keeps it, the back button works, and coming back from a fatality does not lose it. This is the same hash routing as Phase 9, so no dependency is needed.
- **Links, not buttons:** each choice is an anchor to a route, so browser behaviour (new tab, copy link, keyboard) works and the "current" choice is `aria-current`, which screen readers announce.
- **Unknown game is no filter:** a mistyped or stale game in the address shows the full list, never an empty or broken page, as in Phase 9.
- **Games come from the data:** the filter lists the distinct games of the entries, in order of first appearance, so a new game appears when a fatality with that game is added.
- **Count:** a polite status line ("3 fatalities", "2 fatalities in <game>") tells screen reader users what changed.
- **Back link keeps the filter:** the fatality page links back to `listHref(its game)`.
- **Atomic design:** `FilterLink` (atom), `GameFilter` (molecule), page composition; the logic is in `useFatalityList` and the pure data helpers.
- **Branch:** `phase-11-game-filter`.

## Context
- `specs/mission.md`: simple and low friction; responsive by default.
- `specs/roadmap.md`: Phase 11 follows Phase 10 (three fatalities from two games) and precedes Phase 12 (polish).
- `CLAUDE.md`: atomic design, UI and logic separate, type-first, no globals, small modules, tests for feature logic only.
- Repo state at start: the list page shows every fatality; the route is `{ name: 'list' }`; the entries come from two placeholder games.

## Future notes
- Phase 12 may restyle the filter links as chips.
- If grouping is wanted, build it on `listGames` and `filterByGame`.
