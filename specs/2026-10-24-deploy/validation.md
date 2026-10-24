# Validation: Deploy (Roadmap Phase 13)

The work can be merged when every item below passes.

## Automated checks (run in `web/`)
- [ ] `npm install` completes with no errors.
- [ ] `npm test` exits 0.
- [ ] `npm run lint` exits 0 with zero errors and zero warnings.
- [ ] `npm run build` exits 0, and `web/dist/index.html` refers to its files with relative paths (`./assets/...`).

## Manual checks
- [ ] Served from a sub-path by a plain static file server (not Vite), the list, a filtered list, and a fatality page all load, with their styles, the lazily loaded 3D chunk, and the working scene.
- [ ] A fatality address opened directly (a copied link) works without any server rewrite rule.
- [ ] The README's Deployment section is accurate: following it produces a working site.
- [ ] The decision to publish is the owner's: nothing was published, and the host choices are listed.

## Structure and conventions
- [ ] The only code change is the `base` setting (with a comment saying why); no new source files other than documentation and specs.
- [ ] No deploy workflow, host configuration, or secrets were added.

## Scope guard
- [ ] No publishing, custom domain, analytics, service worker, or new dependencies. Root `package.json` is unchanged and no root `package-lock.json` is committed.

## Merge readiness
- [ ] Work is on `phase-13-deploy` with a clean `git status` after commit.
- [ ] The PR is open, `/pr-review` has been run, and its blocking findings are fixed.
- [ ] `changelog.md` is updated and committed last, and `specs/roadmap.md` marks Phase 13 as done once the checks pass and the owner has published (or decided not to).
