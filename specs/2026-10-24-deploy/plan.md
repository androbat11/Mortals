# Plan: Deploy (Roadmap Phase 13)

## 1. Branch and baseline
1. Create the branch `phase-13-deploy` from `phase-12-polish` (earlier phases are not merged into `main` yet).
2. Run `npm test`, `npm run lint`, and `npm run build` in `web/` to confirm the baseline is green.

## 2. Make the build host-independent
1. Set Vite's `base` to a relative path, so the built files work at the root of a domain or under any sub-path (for example a GitHub Pages project address), with no setting per host. The routes use the URL hash, so no server rewrite rules are needed.

## 3. Verify it the way a host serves it
1. Build, then serve `web/dist` from a sub-path with a plain static file server (no Vite) and open the list, a filtered list, and a fatality page in headless Chrome. Check that the page, its CSS, the lazy 3D chunk, and the scene all load.

## 4. Document deployment
1. Add a Deployment section to `README.md`: the command, the output folder, what a host needs (static files only), why hash routing needs no rewrite rules, and how to preview the production build locally.

## 5. Publishing (not done here)
1. Do not publish, and do not add a deploy workflow or a host configuration. Publishing is outward-facing and the host is the project owner's choice (see `requirements.md`). List the options and what each needs, so the choice is quick.

## 6. Tests and checks
1. No unit tests are added (it is configuration and documentation). The build, the lint, the tests, and the sub-path check in step 3 are the validation.

## 7. Verify and wrap up
1. Walk through `validation.md`. Commit on `phase-13-deploy`, open a PR to `main`, run `/pr-review` and fix blocking findings, then run `/changelog` and commit it last.
