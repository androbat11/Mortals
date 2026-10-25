# Requirements: MVP Redesign (Roadmap Phase 14)

## Scope
Rebuild the site to the new Netherflame design from the Stitch project "Mortal Kombat Finishers Archive" (Fatalities, Brutalities, and About screens and the design system), with the video slots turned into animated 3D previews.

In scope:
- The constitution updated to match the new design (done in this branch's first commit).
- The three screens, the shared header and footer, and the design tokens and fonts.
- A fighter-and-move data model with input sequences, ranges, brutality triggers, and an "unverified" mark; the content taken from the design.
- Search, and filters by game and by range.
- The animated preview in every move's video slot, built from the existing 3D scene.
- Tests, a responsive check at three widths, and the README.

Out of scope:
- Game screenshots, videos, audio, artwork, or models; hot-linking anything from Stitch.
- Real, verified content (Phase 15) and publishing (Phase 16).
- Accounts, a backend, sound, a print stylesheet, the "print notation card" action, and per-fighter 3D characters (the preview is one generic original figure).
- A CSS framework, Tailwind, and third-party font requests.

## Decisions
These were chosen as the recommended defaults, because the design arrived without further instructions.
- **Design source:** the Stitch project is the reference. Its HTML export (Tailwind from a CDN, Google-hosted images, a Material Symbols font) is not used: the screens are rebuilt with CSS Modules, tokens from the design system text, fonts from `@fontsource`, and small inline icons.
- **Real names, with a disclaimer:** the design names real fighters and moves. They are used as a fan tribute, with the design's disclaimer in the footer. The design also shows game artwork and screenshots; none of that is copied, and the preview is our own animated figure.
- **Content is transcribed from the design and marked unverified:** the descriptions, triggers, and inputs were produced in the design tool and have not been checked against the games, and I will not invent or correct them from memory. Each move carries an `unverified` flag, and the UI says so (a badge on the card and a note on the About page) until the content is verified (Phase 15).
- **Videos become animated previews:** the design's video slot (a poster, a play button, and a progress bar) is a 3D preview. It starts as an animated poster (embers and a scanline, still under reduced motion), and play mounts the 3D scene and the move's animation. Only one scene exists at a time, so a long page never holds many WebGL contexts, and the canvas ignores touch so the page scrolls.
- **One generic figure:** every move reuses the original figure and one of the three original animations (chosen by range). Real per-move animations are a later content step.
- **Home is About:** the empty address shows the About page (the design's landing screen); the nav shows the current page.
- **Routes:** `#/` (About), `#/fatalities`, `#/brutalities`; an unknown address shows About.
- **Filters in the page, not the address:** the search text, the game, and the range are state in a hook; the header search feeds the same state.
- **Simplifications of the design:** the roster strip jumps to a fighter with a scroll (not an address anchor, which would clash with hash routing); the "Edenian royalty" accordion is folded into the normal fighter sections; the print and sound controls are omitted; the stat boxes use real counts from the data, not the design's placeholder numbers (for example "128 EXEC").
- **Resolves earlier parked ideas:** the input sequence and the fighter details (title, element) from the parked "button inputs and character info" idea are now part of the data and the screens. A realistic character stays parked.
- **Branch:** `mvp`, from `main` after the Phase 13 merge.

## Context
- `specs/mission.md`, `specs/roadmap.md`, `specs/tech-stack.md`, `CLAUDE.md`, and the `pr-review` skill were updated in this branch to the new design.
- `specs/design/netherflame-design-system.md`: the design system, from the Stitch project.
- Repo state at start: Phases 1 to 13 are merged; the app has a list, a fatality page, playback controls, a game filter, and a lazily loaded 3D scene with three original animations; the content is sample data.

## Future notes
- Phase 15: verify every move against the games; then remove the unverified marking.
- Per-fighter figures and palettes, real per-move animations, and a victim figure.
- Phase 16: publish.
