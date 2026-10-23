# Plan: Scaffold (Roadmap Phase 1)

## 1. Generate the project
1. Scaffold the Vite `react-ts` template into `web/` using npm (`npm create vite@latest web -- --template react-ts`).
2. Run `npm install` in `web/` and commit the lockfile.
3. Confirm the root `package.json` is unchanged.

## 2. Strip demo content
1. Delete the template assets (`App.css`, `index.css`, `assets/`, logos, `public/vite.svg`).
2. Remove the matching imports from `main.tsx` and `App.tsx`.
3. Set `<title>` in `index.html` to "Mortals" and remove the favicon link to the deleted Vite logo.

## 3. Atomic design structure
1. Create `web/src/components/{atoms,molecules,organisms,templates}/` and `web/src/pages/`, each with a `.gitkeep`.
2. Write `App` as a small functional component that renders an empty page (no content).
3. Keep `main.tsx` limited to mounting `App` in `StrictMode`.

## 4. Scripts and checks
1. Confirm `dev`, `build`, `lint`, and `preview` scripts exist in `web/package.json`.
2. Run `npm run lint` and `npm run build`; fix any errors without disabling rules.

## 5. Documentation
1. Update `README.md` with how to install and run: `cd web && npm install && npm run dev`.
2. Document the atomic design layout in one short README section.

## 6. Verify and wrap up
1. Walk through every item in `validation.md`.
2. Commit on `phase-1-scaffold` and open a PR to `main`.
