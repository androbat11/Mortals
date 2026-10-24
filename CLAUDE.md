# Mortals

A Mortal Kombat fatalities hub: users watch a 3D animation of a fatality and learn how to perform it. The app lives in `web/` (Vite, React, TypeScript, Three.js, Vitest, npm).

These rules apply for the whole development life cycle: planning, specs, implementation, tests, and review. Follow them without being reminded.

## Project overview (always follow)

@specs/mission.md
@specs/roadmap.md
@specs/tech-stack.md

- Every change must fit the mission, the current roadmap phase, and the tech stack. Do not add work from a later phase, and do not add dependencies the tech stack does not list.
- If a request conflicts with the mission, roadmap, or tech stack, say so before acting.

## Architecture

- **Atomic design.** UI lives in `web/src/components/{atoms,molecules,organisms,templates}/` and `web/src/pages/`. Build screens by composing small components from these levels.
- **No long components.** A component does one thing and stays short. When it grows, split it into smaller components at the right atomic level, and move logic into hooks or plain modules.
- **Composable components.** Build components that compose: they take props and `children` and are combined into larger ones, rather than hard-coding content or duplicating markup.
- **UI and logic are separate.** Components only render UI. State, effects, and event logic go in custom hooks (`web/src/hooks/`), and non-React logic goes in plain modules.
- **Responsive design is required for every screen and component.** Build mobile-first with media queries, no fixed widths, and no horizontal scroll. Check phone (~375px), tablet (~768px), and desktop (~1280px) widths before calling a screen done.

## Code style

- **Type-first.** Define the TypeScript types (props, data, function signatures) before writing the implementation. Keep strict mode on, and never use `any`.
- **Functions over classes.** Write functions and function components. Do not write classes or class components.
- **Factory functions for object creation.** Do not call `new` for application objects inline. Create objects through factory functions, and use a repository (`createRepository`) to create them by key. See `web/src/three/objects/` and `web/src/hooks/createSceneRepository.ts`.
- **No global variables.** Do not keep module-level mutable state or shared constants; expose values through functions that return them. Globals cause side effects.
- **Comment design decisions.** Explain why a design choice was made (not what the code does) in code comments, so the code teaches the reasoning.
- **Small modules, grouped by purpose.** One factory or helper per file (a type and its create and apply functions may share a file), and a source file stays under about 100 lines (test files are exempt). Group files in folders by what they do (in `web/src/three/`: `objects/`, `rendering/`, `controls/`, `animation/`, `core/`), and compose small pieces into bigger ones, as atomic design does for UI. When a file grows or starts doing two things, split it.
- **Separation of concerns.** Every function, module, hook, and component has one and only one purpose, and a function does only one thing. Keep Three.js and other non-React logic out of components, and keep `web/src/three/` free of React and DOM code.

## Testing

- Write Vitest tests only for the specific feature logic a phase adds. Do not test `main.tsx`, `App.tsx`, or other plain wiring.
- Before finishing, run `npm test`, `npm run lint`, and `npm run build` in `web/`.

## Workflow

- Specs live in `specs/YYYY-MM-DD-feature-name/` with `plan.md`, `requirements.md`, and `validation.md`. Use `/feature` to create one and `/pr-review` to review before merging.
- Run `/changelog` before merging.
- Do not add `Co-Authored-By` lines or other Claude attribution to commits or pull requests.
