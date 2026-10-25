# Validation: MVP Redesign (Roadmap Phase 14)

The work can be merged when every item below passes.

## Automated checks (run in `web/`)
- [ ] `npm install` completes with no errors.
- [ ] `npm test` exits 0, including the data, filter, route, hook, component, and page tests.
- [ ] `npm run lint` exits 0 with zero errors and zero warnings.
- [ ] `npm run build` exits 0, and the build output has no request to a third-party font or image host.

## Manual checks
- [ ] The three pages look like the design at 1280px (header, hero, roster strip, search and filters, fighter sections, move cards, footer), compared with the Stitch screens.
- [ ] At 375px and 768px the pages stack as the design describes (one column of moves, a scrolling roster strip), with no horizontal scroll and no clipped controls.
- [ ] Pressing play on a move shows the animated 3D preview inside the slot; pressing play on another move replaces it; pause and replay work; the page never shows two scenes.
- [ ] Scrolling the page with a finger over a preview scrolls the page (the canvas ignores touch).
- [ ] With the system's reduced-motion setting on, the poster does not animate and the preview starts paused.
- [ ] The header search and the filters narrow the moves; a search with no match shows the empty state; the status line is correct.
- [ ] The nav marks the current page, the whole site works by keyboard with a visible focus ring, and each page has one `h1` and a sensible title.
- [ ] The fan-tribute disclaimer is visible on every page, and every move shows the "unverified" mark.
- [ ] No image, video, audio, or font is requested from any third-party host.

## Structure and conventions
- [ ] The constitution (mission, roadmap, tech stack, `CLAUDE.md`, the review skill) matches the design.
- [ ] Components follow atomic design with no logic in components; state is in hooks; the data model is typed first and built through factories and the repository.
- [ ] Colours, fonts, and spacing come from the design tokens; shapes are sharp; every source file is under about 100 lines (tests exempt); no classes; `any` is not used.
- [ ] The first version's replaced pages, components, hooks, and tests are removed, with nothing left unused.
- [ ] Design decisions are explained in code comments; `README.md` is updated.

## Scope guard
- [ ] No game artwork, screenshot, video, audio, or model, and no Stitch-hosted asset.
- [ ] The only new dependencies are the two `@fontsource` packages, and the tech stack lists them.
- [ ] Root `package.json` is unchanged and no root `package-lock.json` is committed.
- [ ] Tests cover feature logic only: none for `App.tsx` or `main.tsx`.

## Merge readiness
- [ ] Work is on `mvp` with a clean `git status` after commit.
- [ ] The PR is open, `/pr-review` has been run, and its blocking findings are fixed.
- [ ] `changelog.md` is updated and committed last.
- [ ] The content is still marked unverified, and Phase 15 (verification) is tracked before any publishing.
