# Mortals

A fan-tribute archive of Mortal Kombat finishing moves. Browse the fighters, watch an animated 3D preview of each fatality and brutality, and learn the exact input to perform it.

## Description

Mortals is an unofficial, fan-made archive (not affiliated with or endorsed by the rights holders). It has three pages in the Netherflame design (`specs/design/netherflame-design-system.md`):

- **About** (home): what the archive is, counts, the difference between fatalities and brutalities, the input notation (arrows, buttons 1 to 4), and the roster.
- **Fatalities** and **Brutalities**: every move by fighter, with its game, range or class, description, the trigger (brutalities), and the input sequence. A 16:9 slot on each card plays an animated preview built with our own low-poly figure (no game footage or artwork). Search and filters by game and by range or class narrow the list.

All move content comes from a design draft and is marked **Unverified** until it is checked against the games (roadmap Phase 15).

## Tech Stack

- [Vite](https://vite.dev/), [React](https://react.dev/) with TypeScript, and npm; CSS Modules with design tokens in `web/src/index.css`; Bebas Neue and Space Grotesk self-hosted through `@fontsource`
- [Three.js](https://threejs.org/) for the 3D animations, used directly
- [Vitest](https://vitest.dev/) for tests

See `specs/tech-stack.md` for the full list and the reasoning.

## Getting Started

```bash
cd web
npm install
npm run dev
```

Run every npm command inside `web/`; the root `package.json` has no scripts of its own. Other scripts: `npm test`, `npm run build`, `npm run lint`, `npm run preview`.

## Project Structure

The app lives in `web/` and follows atomic design with functional components only:

- `web/src/components/atoms/`: smallest building blocks (buttons, labels).
- `web/src/components/molecules/`: small groups of atoms.
- `web/src/components/organisms/`: larger self-contained sections.
- `web/src/components/templates/`: page layouts without real content.
- `web/src/pages/`: full screens that fill templates with content.

Three.js code is split out of the components:

- `web/src/three/`: plain TypeScript with no React and no page access, organised by what each module does, in the spirit of atomic design (small single-purpose pieces that compose upward). One factory per file:
  - `objects/`: the things in the scene (`createGround`, `createCamera`, `createViewTarget` (the point both the camera and the controls aim at), the lights, the background and fog, `createSceneObject`), and `objects/character/`, the procedural low-poly character: small factories for the palette, measurements, materials, body parts, joints and limbs, assembled by `createCharacter` into a typed rig with nine named joints.
  - `rendering/`: the renderer, timer and per-frame helpers (`createRenderer`, `applySize`, `disposeScene`, `clampDelta`, `clampPixelRatio`, `toSafeSize`).
  - `controls/`: `createOrbitControls` and the control settings (`controlLimits`).
  - `animation/`: `startRenderLoop`, which runs a list of per-frame updaters (`FrameUpdater`) and renders; and the animation system. An animation is plain data (`Animation`: an id, a duration, and keyframe tracks over the character's named joints, defined in `animationTypes.ts`). `evaluateAnimation` turns it into a pose for a time, `applyPose` sets that pose on the rig, and `createAnimationPlayer` plays it in a loop as a frame updater. Animations live in `animation/animations/` and are looked up by id, so a new fatality's animation is one data file and one line in `createAnimationRepository`.
- `web/src/core/`: generic tools that are not about 3D (`createRepository`, which every registry uses, and `tryCreate`), so the content in `web/src/data/` does not depend on the 3D folder.
- `web/src/hooks/`: `useThreeScene`, a thin hook that creates the renderer and reports whether it failed; `setupScene`, which assembles the scene around it and undoes a half-finished setup if a step throws; `createSceneContents` (objects, lights, background and fog), `createSceneControls` (orbit controls with their limits), and `createSceneCleanup` (undoing it all in order), each small and single-purpose; `createSceneRepository`, the registry of everything the scene creates; and `browserFactories`, factories for browser APIs.
- `web/src/components/organisms/SceneCanvas/`: the component that hosts the canvas.
- `web/src/data/`: the archive content, kept apart from the 3D code and the UI. `fighter.ts` and `move.ts` define the typed `Fighter` and `Move` (kind fatality or brutality, game, range or class, description, trigger, input steps, animation id, unverified flag); each fighter is a factory in `fighters/` made through `createFighterRepository` (a `Record<FighterId, ...>`, so the compiler checks every id). Pure helpers filter (`filterEntries`), list (`listCategories`, `listGamesWithMoves`), and count (`countMoves`). Adding a move is a `createMove` call plus an animation id; adding a fighter is one factory, one `FighterId`, and one line in the repository.
- Navigation: `web/src/routing/` defines the `Route` type (`about`, `fatalities`, `brutalities`), `parseRoute` (any unknown hash is About), the only link builders (`hrefs.ts`), and the nav items. Routes use the URL hash, so any static host works.
- Loading and polish: the 3D scene is loaded lazily (`LazySceneCanvas`, a deliberate module-level value because React needs `lazy` created once outside any component), so no page downloads Three.js until a preview is played, and the preview shows a loading message until the scene arrives; if the download fails, `SceneLoadError` is shown instead (no class error boundary is needed). `useDocumentTitle` sets each page's title, and a global focus ring and reduced-motion-aware transitions are in `web/src/index.css`.
- Playback: `usePlayback` creates one `PlaybackControl` (state in a closure) that the Pause or Play and Replay buttons write and the animation player reads every frame, so the user can pause or replay without rebuilding the scene; it starts paused when the system asks for reduced motion. `Button` (atom) and `PlaybackControls` (molecule) render it.
- The pages are built from the layers above: atoms (`InputChip`, `Tag`, `FilterChip`, `CornerBrackets`, `Button`), molecules (`InputSequence`, `MoveFilterBar`, `MoveSearch`, `PreviewPoster`, `PreviewStage`, `RosterJump`, `SiteNav`, `StatBox`, `InfoPanel`), organisms (`SiteHeader`, `SiteFooter`, `MovePreview`, `MoveCard`, `FighterSection`, `MoveArchive`, `RosterGrid`, `NotationLegend`, `AboutHero`, `SceneCanvas`), templates (`SiteTemplate`, `ArchiveTemplate`, `AboutTemplate`), and pages (`AboutPage`, `FatalitiesPage`, `BrutalitiesPage`). State is in hooks: `useMoveFilters` (the search and filters, shared by the header and the page), `useMoveArchive` (what is visible), `useActivePreview` (only one preview runs a 3D scene at a time, so the page holds one WebGL context), and `usePlayback`.

## Testing

Run `npm test` in `web/` (Vitest). The Three.js renderer is mocked in tests because jsdom has no WebGL; shared test helpers (`mockThree.ts`, `stubResizeObserver.ts`) live in `web/src/test/`.

## Workflow

- `CLAUDE.md` holds the development rules (atomic design, type-first, functions over classes, factory functions, small modules grouped by purpose, responsive design, no globals). `specs/` holds the mission, roadmap, tech stack, and one directory per feature.
- Claude Code skills in `.claude/skills/`: `/feature` creates a spec directory, `/pr-review` reviews a GitHub pull request and posts inline comments, and `/changelog` updates `changelog.md` before merging.

## Deployment

The app is static files only: no server, no backend, and no rewrite rules.

```bash
cd web
npm install
npm run build   # type-checks, then writes the site to web/dist
```

Upload the contents of `web/dist` to any static host (GitHub Pages, Netlify, Cloudflare Pages, Vercel, or a plain file server). It works at the root of a domain or under a sub-path, because the build uses relative paths, and deep links work because the routes live in the URL hash (`#/fatality/...`). To try the production build locally, run `npm run preview`, or serve `web/dist` with any static file server.

The first load is small (the pages are about 250 kB of script); the 3D code (Three.js, about 560 kB) is downloaded only when a preview is played.

Nothing is published from this repository yet: the host is the project owner's choice, and the move content is unverified until Phase 15.
