# Changelog

## 2026-10-24
- Added the `pr-review` skill with an extensible React rules table, then moved the rules into the skill file (`b6636ad`, `134c8a0`)
- Wrote the Phase 2 spec and built the Three.js canvas with a spinning cube (`567faef`, `f5f5ef2`)
- Removed the `App` and `main` tests and limited tests to feature logic (`cc1f98a`)
- Created scene objects through factory functions and a generic repository, and replaced the global speed constant with a function (`a8bdf04`, `57d5c58`)
- Added `CLAUDE.md` with the project's development rules (`c15cf90`)
- Aligned the `pr-review` rules with `CLAUDE.md`, adding composability and UI/logic separation (`e0fcb50`, `f7436b0`)
- Documented design decisions in code comments, and later trimmed the chattiest ones (`47c122d`, `21e749b`)
- Made `pr-review` post inline GitHub comments and cover all `CLAUDE.md` principles (`a8ec2e9`)
- Fixed the first review round: removed globals, split `useThreeScene`, hardened disposal, strengthened tests, enabled strict mode, and refreshed the skills, docs, and Phase 2 spec (`3986efa`, `c3759d9`)
- Fixed the second review round: switched to `Timer`, added a WebGL failure fallback and context release, made the skill commands safer, and corrected the plan order, spec, and README (`8975e14`, `df1be3e`)
- Addressed the PR #4 review: scoped overflow clipping to the scene page and labelled the 3D view (`da26ca5`)
- Wrote the Phase 3 spec and added orbit controls, lights, a ground plane, and a solid lit cube (`1e76b3f`, `b002792`)
- Split `web/src/three/` into modules grouped by purpose, one factory per file (`9c9a7e4`)
- Added a background and fog so the ground fades out, split `useThreeScene` further, made the accessible label describe what is shown, and closed test gaps (`cf4b338`)
- Made scene setup undo a half-finished attempt on failure, logged creation errors, tightened tests, and reset the failed state on each attempt (`f827419`, `098414a`, `49f1232`)

## 2026-10-23
- Added the README and `package.json` (`5123905`)
- Defined the project's constitution files and technical details for spec-driven development (`5003001`, `c751053`)
- Scaffolded the Vite React TypeScript app in `web/` with the atomic design folder structure (`ace8ad0`)
- Made `App` render a div with text instead of nothing, and updated the Phase 1 specs to match (`8d78d98`, `b087a32`)
- Marked the Phase 1 validation and roadmap item as done (`0077899`)
- Added Vitest with a test script and documented testing in the tech stack, then added tests for `App` and `main` (`1313665`, `5152753`)
- Made responsive design a requirement for every screen in the specs (`dcd5b0e`)
- Replanned the phase design in the workflow (`94048e4`)
- Added the `changelog` and `feature` skills (`d760b4d`)

## 2026-10-22
- Created the repository (`f73c40e`)
