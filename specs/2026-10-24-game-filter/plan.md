# Plan: Game Filter (Roadmap Phase 11)

## 1. Branch and baseline
1. Create the branch `phase-11-game-filter` from `phase-10-more-fatalities` (earlier phases are not merged into `main` yet).
2. Run `npm test`, `npm run lint`, and `npm run build` in `web/` to confirm the baseline is green.

## 2. Data helpers (`web/src/data/`)
1. `listGames(fatalities)`: the distinct games, in the order they first appear.
2. `filterByGame(fatalities, game)`: all of them for `null`, otherwise only that game's.

## 3. The filter lives in the URL
1. Change the list route to carry the chosen game: `{ name: 'list', game: string | null }`.
2. `parseRoute` reads `#/?game=<name>`; a game that does not exist counts as no filter.
3. `listHref(game)` writes it (`#/` for no filter, `#/?game=<encoded>` for a game); `fatalityHref` is unchanged.
4. `AppRoutes` passes the route's game to the list page, and the fatality page's back link returns to that fatality's game.

## 4. Hook and components
1. `useFatalityList(game)`: the games and the (filtered) fatalities, memoised.
2. Atom `FilterLink`: an anchor that marks itself as the current choice.
3. Molecule `GameFilter`: a labelled navigation of links, "All games" first, then one per game.
4. Organism `FatalityList` is unchanged. `FatalityListPage` takes the chosen `game`, shows the filter above the list, and a status line with how many fatalities are shown.

## 5. Tests (Vitest, feature logic only)
1. Test `listGames` and `filterByGame` (all, one game, an unknown game).
2. Test `parseRoute` and the href builders with a game (valid, unknown, encoded characters) and update the existing route tests.
3. Test `useFatalityList`, `FilterLink` (current choice), `GameFilter` (one link per game plus "All games", with the current one marked), `FatalityListPage` (the filter narrows the list and the count follows), `AppRoutes` (a filtered address shows the filtered list), and the back link on the fatality page.
4. Run `npm test`. Do not add tests for `App.tsx` or `main.tsx`.

## 6. Documentation
1. Comment each design decision in the code. Update `README.md`.
2. Update `specs/roadmap.md` to mark Phase 11 as done only after the manual checks pass.

## 7. Verify and wrap up
1. Walk through `validation.md`. Commit on `phase-11-game-filter`, open a PR to `main`, run `/pr-review` and fix blocking findings, then run `/changelog` and commit it last.
