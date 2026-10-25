# Requirements: Deploy (Roadmap Phase 13)

## Scope
Make the app ready to publish to a static host, verify the production build the way a static host serves it, and document how to deploy it. Publishing itself is not part of this work.

In scope:
- A host-independent build (relative base path).
- A check that the built site works from a sub-path with a plain static server.
- A Deployment section in the README.

Out of scope:
- Publishing the site, choosing the host, a custom domain, and a deploy workflow or any host configuration file.
- Analytics, a service worker or offline mode, and server-side rendering.
- Real content (the MVP still contains sample fatalities), a favicon, and button inputs and character information (parked).
- New dependencies.

## Decisions
These were chosen as the recommended defaults, because there was no time to ask.
- **Publishing is left to the project owner.** Putting the site online is outward-facing and not easy to undo (it becomes public and may be cached or indexed), the host is the owner's choice, and the content is still sample data. This phase makes the app ready and documents the steps; it does not publish and does not add a workflow that would publish when merged. This is the one roadmap item that is prepared and not finished.
- **Relative base:** `base: './'`, so the same build works at a domain root or under a sub-path, which suits project pages on common hosts. The alternative, a base path set per host through an environment variable, needs a build per host.
- **Hash routing already fits:** the routes are in the URL hash, so a static host needs no rewrite rule for deep links and no 404 trick.
- **Verification by serving:** the build is checked with a plain file server from a sub-path, not with Vite's preview, because that is what a host does; it covers the CSS, the lazy 3D chunk, and the routes.
- **Host options for the owner:** any static host works (GitHub Pages, Netlify, Cloudflare Pages, Vercel, or any file server). Each needs only the contents of `web/dist`; GitHub Pages would additionally need Pages enabled and a workflow, which should be added only on the owner's say-so.
- **Branch:** `phase-13-deploy`.

## Context
- `specs/mission.md`: an MVP set of iconic fatalities; the sample content is the main gap before the site is worth publishing.
- `specs/tech-stack.md`: hosting is "any static host".
- `specs/roadmap.md`: Phase 13 is the last phase; the MVP is "done" when the roadmap's phases are all built.
- `CLAUDE.md`: no new dependencies beyond the tech stack; verify with `npm test`, `npm run lint`, `npm run build`.
- Repo state at start: Phases 1 to 12 are built on stacked branches that are not merged into `main` yet; the build output is `web/dist` (about 230 kB of app code and a 560 kB lazily loaded Three.js chunk).

## Review follow-ups (PR #8)
The deep review and `/pr-review` of this PR led to these changes, made on this branch:
- **Stable game ids:** `Fatality.game` is a `Game` (`{ id: GameId, name }`) and the address carries the id (`#/?game=sample-game`), so renaming a game cannot break a shared link, and a typo is a compile error. `parseRoute` only checks ids against lists of ids (`isGameId`, `isFatalityId`), so parsing an address no longer builds every fatality; `createFatalities` builds the registry once.
- **`web/src/core/`:** `createRepository` and `tryCreate` moved out of `three/core/`, so the fatality content no longer depends on the 3D folder.
- **Route changes:** `useRouteChange` replaces `useScrollToTop`: it reacts to the page, not the route object, so a filter click or the first load does not scroll, and it moves focus to the new page's heading (`tabIndex={-1}`).
- **Lazy scene:** a failed load is logged and tested; it stays failed until reload.
- **Layout:** the two-column fatality page starts at about 960px (768px stayed cramped).
- **Tests:** the order-dependent and vacuous tests were fixed, and a feet-near-the-ground check now runs over every registered animation.
- **Comments and docs:** stale phase wording and the README claim that replacing content needs no code change were corrected.
Not changed on purpose: button inputs, a victim character, character information, a favicon, and real content (they need the owner's decisions).

## Future notes
- Replace the sample fatalities with real, verified content before publishing.
- When a host is chosen, add its deploy step (for GitHub Pages, a workflow that builds `web/` and publishes `web/dist`).
- A favicon, a social preview image, and a custom domain are nice-to-haves.
