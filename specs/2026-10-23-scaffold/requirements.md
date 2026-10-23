# Requirements: Scaffold (Roadmap Phase 1)

## Scope
Create a Vite + React + TypeScript project that runs and shows a blank page. Nothing else: no Three.js, no routing, no data model (those are later phases).

In scope:
- Vite react-ts app in a subdirectory (`web/`), with its own `package.json` and npm lockfile.
- Functional components only (no class components); small, single-purpose components.
- Atomic design folder structure under `web/src/components/` so later phases have a home: `atoms/`, `molecules/`, `organisms/`, `templates/`, plus `pages/`.
- `App` renders an empty root: no Vite or React demo content, no logo, no counter, no default CSS.
- `npm run dev`, `npm run build`, and `npm run lint` all work.

Out of scope:
- Three.js or any 3D code (Phase 2).
- Test runner, Prettier, or other extras. Add them when a phase needs them.
- Styling, layout, deployment (Phases 12 and 13).

## Decisions
- **Location:** subdirectory, not repo root. The root `package.json` stays untouched. The directory name `web/` was not specified; chosen as a short, neutral default. Rename it before merge if you prefer another name.
- **Template:** stock Vite `react-ts` template (strict tsconfig, ESLint). This was my reading of "the other options in the 1", which I took to mean the recommended choice for the tooling question: stock template, no extras.
- **Architecture:** atomic design with functional components, to keep components short. Folders may stay empty (with a `.gitkeep`) until a phase needs them.
- **"Blank page" means** an empty root element with no demo content. The tab title is "Mortals".
- **Package manager:** npm, per `specs/tech-stack.md`.
- **Branch:** `phase-1-scaffold`.

## Context
- `specs/mission.md`: simple, low-friction, content easy to add. A minimal scaffold supports this.
- `specs/tech-stack.md`: Vite, React with TypeScript, npm, Three.js used directly (arrives in Phase 2). react-three-fiber is not part of the stack.
- `specs/roadmap.md`: each phase is small and independently verifiable. Phase 2 (Three.js canvas) builds directly on this scaffold, so the structure should not need rework.
- Repo state at start: only `README.md`, `LICENSE`, `package.json`, and `specs/`. No app code exists.
