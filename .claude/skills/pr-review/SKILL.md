---
name: pr-review
description: Review a pull request against the product mission, roadmap, tech stack, and React rules, and report violations. Invoke manually with a PR number, branch, or nothing for the current branch.
disable-model-invocation: true
argument-hint: [PR number or branch]
allowed-tools: Read Bash(gh pr view:*) Bash(gh pr diff:*) Bash(git diff:*) Bash(git log:*) Bash(git status:*) Bash(git rev-parse:*) Bash(git branch:*) Bash(ls:*)
---

# PR Review

Review the change set for: $ARGUMENTS (a PR number or branch; if empty, the current branch against `main`).

The review checks that the product's principles are respected. It is read-only: do not edit files, post comments, approve, merge, commit, or push.

## Step 1: Load the guidelines

Read these in full on every run. They are the source of truth; never rely on memory of their contents.

- `specs/mission.md`: purpose, audience, what the user sees, principles.
- `specs/roadmap.md`: the phases and which are done.
- `specs/tech-stack.md`: required tools, constraints, and notes.
- The spec directory for the phase under review (`plan.md`, `requirements.md`, `validation.md` under `specs/`), if one exists.

## Step 2: Load the change

- With a PR number: `gh pr view <n>` and `gh pr diff <n>`.
- Otherwise: `git diff main...<branch>` and `git log main..<branch>`.
- Read changed files in full when the diff alone is not enough to judge them.

## Step 3: Check against each guideline

### Mission
- Does the change serve watching and learning a fatality, with no accounts, no clutter?
- Does it keep the experience simple and low friction for casual fans?
- Does every new screen or component work on phone, tablet, and desktop (mobile-first CSS, no fixed widths, no horizontal scroll)?
- Are visuals original and low-poly, with no copyrighted game assets, names, or imported models?
- Is new content data plus an animation, not hard-coded into components?

### Roadmap
- Which phase does the PR belong to? Flag work that belongs to a later phase (scope creep) and phases skipped or started before the previous one is verified.
- Does the PR deliver what its phase says, no less?
- If the phase is complete, is the roadmap updated?

### Tech stack
- Every dependency added or removed must be allowed by `specs/tech-stack.md`. Flag anything not listed (for example react-three-fiber, a backend, a different package manager, or an unplanned UI or state library).
- Three.js must be used directly and wrapped in React components; 3D assets built procedurally; data static and typed in the repo.
- Tests use Vitest; the build tool is Vite; packages are managed with npm (lockfile is `package-lock.json`).

### React rules
Apply every rule in the table below. Cite the rule ID for each finding.

To add a rule, append a row with the next ID. Never reuse or renumber an ID. Severity is `blocking` (request changes) or `should-fix`.

| ID | Severity | Rule | Why |
| --- | --- | --- | --- |
| R1 | blocking | Components are functions; no class components. | Project convention; keeps components small and hook-friendly. |
| R2 | should-fix | Components are small and single-purpose, and live at the right atomic level (`atoms`, `molecules`, `organisms`, `templates`, `pages`). | Keeps the structure predictable for later phases. |
| R3 | blocking | Hooks follow the Rules of Hooks (top level only, called from components or custom hooks). | Prevents broken state and effects. |
| R4 | blocking | Effects that create resources (renderers, observers, listeners, timers, animation loops) clean them up on unmount. | Avoids leaks, especially with `StrictMode` double-mounting. |
| R5 | should-fix | Reusable logic is extracted into custom hooks, and non-React logic (such as Three.js scene building) lives outside components. | Keeps components thin and logic testable. |
| R6 | should-fix | No derived state kept in `useState` or synced by effects when it can be computed during render. | Avoids stale or duplicated state. |
| R7 | should-fix | Effect dependency arrays are complete and correct. | Prevents stale closures and missed updates. |
| R8 | should-fix | Lists render with stable, unique `key`s (not array indexes for dynamic lists). | Correct reconciliation. |
| R9 | should-fix | Props and state are typed with TypeScript; no `any`. | Type safety is part of the stack. |
| R10 | should-fix | Interactive elements use semantic HTML and are keyboard accessible, with labels or alt text where needed. | Accessibility and low-friction use. |

### Spec and quality
- Compare the change to the phase's `requirements.md` and `validation.md`. List validation items that the diff does not satisfy or that look unchecked.
- Do tests exist for new logic, and do `npm test`, `npm run lint`, and `npm run build` look likely to pass? Run them only if the user asks.

## Step 4: Report

Output one report, in this order:

1. **Verdict:** `Approve`, `Approve with comments`, or `Request changes`, with one sentence of reasoning.
2. **Phase:** the roadmap phase the PR targets.
3. **Findings:** grouped by severity.
   - **Blocking:** violates the mission, the tech stack, scope, or a React rule marked blocking.
   - **Should fix:** deviates from the specs or a non-blocking rule.
   - **Nit:** minor.
   Each finding gives `file:line`, the guideline violated (for example `mission: responsive`, `tech-stack: dependencies`, `react: R3`), what is wrong, and a concrete fix.
4. **Checked and fine:** a short list of guidelines checked with no issues.

## Rules

- Only report real violations you can point to in the diff or files. Do not invent findings.
- Judge against the guideline files as they stand now; if they conflict with the PR, say so rather than guessing which is right.
- If a guideline file is missing, say so and continue with the others.
- Keep the report concise and actionable.
