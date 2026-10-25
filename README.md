# Mortals

A Mortal Kombat fatalities hub. Browse 3D animations of fatalities, rendered with Three.js, each paired with a tutorial on how to perform it.

## Description

Mortals is a hub where users can watch Mortal Kombat fatalities as 3D animations and learn how to execute them. For each fatality, the user sees:

- **The animation**: a 3D Three.js rendering of the fatality.
- **The game**: which Mortal Kombat game it comes from.
- **What it does**: a description of the fatality.
- **The tutorial**: the corresponding walkthrough for performing it.

## Tech Stack

- [Vite](https://vite.dev/), [React](https://react.dev/) with TypeScript, and npm
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
- `web/src/data/`: the fatality content, kept apart from the 3D code and the UI. `fatality.ts` defines the typed `Fatality` (id, name, game, description, non-empty tutorial steps, and the `animationId` of the animation that plays), `fatalities/` holds one factory per entry (today a clearly-labelled sample, not a real fatality), and `createFatalityRepository` plus `createFatality(id)` look an entry up by id. To add a fatality: add its id to `FatalityId`, write its factory, and add one line to the repository; the compiler reports whichever step is missing. Its move is a keyframe animation in `web/src/three/animation/animations/` (`createXTrack` writes the common track; see `createSweepKickFinisher`), registered under an id in `AnimationId`. The three entries today (an uppercut, a sweep kick, and an overhead smash, across two placeholder games) are clearly-labelled sample data, not real fatalities; replacing them with real, verified content is a few typed edits (the ids, the registries, and a keyframe file per animation) and needs no change to pages, components, or scene code.
- Navigation: `web/src/routing/` defines the `Route` type (the list, or one fatality by id), `parseRoute` (any unknown hash is the list), and the only link builders (`listHref`, `fatalityHref`). It uses the URL hash, so it needs no router library and works on any static host with no rewrite rules. `useRoute` follows the hash, `AppRoutes` picks the page, and the list page is `FatalityListPage` (cards as links in a responsive grid: `BackLink` and `FatalityCard`, `FatalityList`, `ListPageTemplate`).
- Game filter: the list route carries the chosen game (`#/?game=...`, written by `listHref(game)` and read by `parseRoute`; an unknown game means no filter), so a filtered list can be shared and reloaded and the back link on a fatality page returns to its game. `listGames` and `filterByGame` are pure data helpers, `useFatalityList` combines them, and `GameFilter` (molecule) and `FilterLink` (atom) render the choices as links with `aria-current`.
- Loading and polish: the 3D scene is loaded lazily (`LazySceneCanvas`, a deliberate module-level value because React needs `lazy` created once outside any component), so the list page never downloads Three.js and the fatality page shows a loading message until the scene arrives; if the download fails, `SceneLoadError` is shown instead (no class error boundary is needed). `useDocumentTitle` sets each page's title, and a global focus ring and reduced-motion-aware transitions are in `web/src/index.css`.
- Playback: `usePlayback` creates one `PlaybackControl` (state in a closure) that the Pause or Play and Replay buttons write and the animation player reads every frame, so the user can pause or replay without rebuilding the scene; it starts paused when the system asks for reduced motion. `Button` (atom) and `PlaybackControls` (molecule) render it.
- The fatality page is built from the layers above: `GameBadge` (atom), `FatalityHeader` and `TutorialSteps` (molecules), `FatalityDetails` (organism), `FatalityPageTemplate` (template: only the layout, with `scene`, `controls`, and `details` slots), and `web/src/pages/FatalityPage.tsx` (the page `App` renders). The page looks a fatality up by id through the `useFatality` hook, and the entry's `animationId` selects the animation. Styles are CSS Modules next to each component, mobile-first: stacked on a phone (the scene at a bounded height, so the page scrolls), side by side from about 960px. The shared colours are CSS variables in `web/src/index.css`.

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

The first load is small (the list page is under 250 kB of script); the 3D code (Three.js, about 560 kB) is downloaded only when a fatality page opens.

Nothing is published from this repository yet: the host is the project owner's choice, and the three fatalities are still clearly-labelled sample data that should be replaced by real, verified content first. For GitHub Pages, add a workflow that builds `web/` and publishes `web/dist`, and turn Pages on in the repository settings.
