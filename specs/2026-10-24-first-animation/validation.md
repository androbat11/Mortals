# Validation: First Animation (Roadmap Phase 5)

The work can be merged when every item below passes.

## Automated checks (run in `web/`)
- [x] `npm install` completes with no errors.
- [x] `npm test` exits 0, including the new evaluator, pose, player, animation-data, registry, and scene-contents tests.
- [x] `npm run lint` exits 0 with zero errors and zero warnings.
- [x] `npm run build` exits 0 (type-check and Vite build both pass).
- [x] `npm run preview` serves the built output.

## Manual checks
- [ ] **Earlier phases:** the manual checks for Phases 2 to 4 are run in the same browser pass and ticked, and the roadmap statuses are updated.
- [ ] `npm run dev` starts and the page loads; the browser console shows no errors or warnings.
- [ ] The fighter performs a recognisable move: a crouching wind-up, a fast uppercut, a hold, and a return to the stance, then repeats.
- [ ] The motion is smooth, with no popping at the loop point, and no limb detaches from or passes through the torso in an ugly way.
- [ ] The move still looks right from all sides while orbiting, and at the minimum and maximum zoom.
- [ ] The move is original: no Mortal Kombat move, name, or likeness.
- [ ] After switching to another browser tab and back, the move continues without a jump.
- [ ] **Touch (emulation or a real phone):** one-finger drag rotates, pinch zooms, two-finger drag does not pan, and the animation keeps playing while interacting.
- [ ] **Responsive:** at phone (~375px), tablet (~768px), and desktop (~1280px) widths the fighter is fully visible during the whole move, with no horizontal scroll.
- [ ] Resizing the window or rotating a device keeps the animation playing without a reload.
- [ ] Under React `StrictMode` in dev there is one canvas, one fighter, and one animation playing (not two overlapping).
- [ ] Unmounting leaves no canvas, no running loop, and no leftover listeners.

## Structure and conventions
- [x] The animation types are defined before the code that uses them, and an animation is plain data (an id, a duration, and keyframe tracks over `JointName`s).
- [x] `evaluateAnimation` is a pure function and `createAnimationPlayer` owns its time in a closure; nothing in the render loop knows about animations.
- [x] The animation is created through factories and the repository, selected by id, with no inline `new` in hooks or components.
- [x] The animation id reaches the scene as a typed prop, with no module-level constant holding it.
- [x] Every source file is under about 100 lines (tests exempt; check with `wc -l`), one purpose per file, in `web/src/three/animation/`.
- [x] No module-level constants or mutable state, no classes, and `any` is not used.
- [x] `web/src/three/` holds plain TypeScript with no React imports and no page access.
- [x] Design decisions are explained in code comments.
- [x] `README.md` describes the animation files and how an animation is defined.

## Scope guard
- [x] No victim character, spine joint, props, replay, pause, data model, or page layout.
- [x] No new dependencies in `web/package.json`, no `AnimationMixer`, and no imported animation or model files.
- [x] Root `package.json` is unchanged, and no root `package-lock.json` is committed.
- [x] Tests cover feature logic only: none for `App.tsx` or `main.tsx`.

## Merge readiness
- [ ] Work is on `phase-5-first-animation`, with a clean `git status` after commit.
- [ ] The PR is open, `/pr-review` has been run on it, and its blocking findings are fixed.
- [ ] `changelog.md` is updated and committed last, and `specs/roadmap.md` marks Phase 5 as done once every manual check above passes.
- [ ] A fresh clone passes the automated checks above.
