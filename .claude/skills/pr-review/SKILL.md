---
name: pr-review
description: Review a GitHub pull request against the mission, roadmap, tech stack, CLAUDE.md, and the project's design principles, and post the findings as inline comments on the PR. Invoke manually with a PR number or nothing for the current branch's PR.
disable-model-invocation: true
argument-hint: [PR number]
allowed-tools: Read Write Bash(gh pr view:*) Bash(gh pr diff:*) Bash(gh repo view:*) Bash(gh api:*) Bash(git diff:*) Bash(git log:*) Bash(git status:*) Bash(git rev-parse:*) Bash(git branch:*) Bash(ls:*)
---

# PR Review

Review the GitHub pull request: $ARGUMENTS (a PR number; if empty, the open PR for the current branch).

The review checks that the product's mission, roadmap, tech stack, `CLAUDE.md` rules, and design principles are respected, then posts its findings as inline comments on the changed lines in the pull request on GitHub. Invoking this skill is the user's authorization to post those comments.

Never edit project files, approve, request changes through GitHub, merge, commit, or push. The skill only reads and posts review comments.

## Step 1: Load the guidelines

Read these in full on every run. They are the source of truth; never rely on memory of their contents.

- `specs/mission.md`: purpose, audience, what the user sees, principles.
- `specs/roadmap.md`: the phases and which are done.
- `specs/tech-stack.md`: required tools, constraints, and notes.
- `CLAUDE.md`: the project's development rules and design principles. The rules table below enforces them; flag any `CLAUDE.md` rule the table does not cover.
- The spec directory for the phase under review (`plan.md`, `requirements.md`, `validation.md` under `specs/`), if one exists.

## Step 2: Load the change

- Find the PR: `gh pr view <n> --json number,url,title,body,headRefOid,baseRefName` (omit `<n>` for the current branch's PR). If there is no open PR, say so and stop; do not post anything.
- Get the owner and repo: `gh repo view --json nameWithOwner`.
- Get the diff: `gh pr diff <n>`. Note which lines are added or changed: inline comments can only be placed on those lines.
- Get existing review comments: `gh api repos/<owner>/<repo>/pulls/<n>/comments`. Do not repeat a finding that is already commented on the same line.
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

### Design principles and React rules
Apply every rule in the table below. Cite the rule ID for each finding.

To add a rule, append a row with the next ID. Never reuse or renumber an ID. Severity is `blocking` (request changes) or `should-fix`.

| ID | Severity | Rule | Why |
| --- | --- | --- | --- |
| R1 | blocking | All code is written as functions; no classes of any kind, including class components. | CLAUDE.md: functions over classes. |
| R2 | should-fix | Components are short and single-purpose (split long ones), and live at the right atomic level (`atoms`, `molecules`, `organisms`, `templates`, `pages`). | Keeps the structure predictable for later phases. |
| R3 | blocking | Hooks follow the Rules of Hooks (top level only, called from components or custom hooks). | Prevents broken state and effects. |
| R4 | blocking | Effects that create resources (renderers, observers, listeners, timers, animation loops) clean them up on unmount. | Avoids leaks, especially with `StrictMode` double-mounting. |
| R5 | blocking | Components render UI only: state, effects, and event logic live in custom hooks, and non-React logic (such as Three.js scene building) lives in plain modules. | CLAUDE.md: UI and logic are separate. |
| R6 | should-fix | No derived state kept in `useState` or synced by effects when it can be computed during render. | Avoids stale or duplicated state. |
| R7 | should-fix | Effect dependency arrays are complete and correct. | Prevents stale closures and missed updates. |
| R8 | should-fix | Lists render with stable, unique `key`s (not array indexes for dynamic lists). | Correct reconciliation. |
| R9 | should-fix | Props and state are typed with TypeScript; no `any`. | Type safety is part of the stack. |
| R10 | should-fix | Interactive elements use semantic HTML and are keyboard accessible, with labels or alt text where needed. | Accessibility and low-friction use. |
| R11 | should-fix | Types are defined first: props, data, and function signatures are explicit types, and strict mode stays on. | CLAUDE.md: type-first development. |
| R12 | blocking | Application objects are created through factory functions and the repository (`createRepository`), not inline `new` calls in hooks or components. | CLAUDE.md: factory functions for object creation. |
| R13 | should-fix | Every function, module, hook, and component serves one purpose, and each function does only one thing (flag functions that mix steps such as fetching, transforming, and rendering); `web/src/three/` has no React or DOM code. | CLAUDE.md: separation of concerns. |
| R14 | blocking | Every new screen or component is responsive: mobile-first CSS, no fixed widths, no horizontal scroll at phone, tablet, and desktop widths. | CLAUDE.md and mission: responsive by default. |
| R15 | should-fix | Components are composable: they take props and `children`, are combined into larger components, and do not hard-code content or duplicate markup. | CLAUDE.md: composable components. |
| R16 | should-fix | No module-level mutable state or global constants that act as shared state; values come from functions that return them. | CLAUDE.md: no global variables, which cause side effects. |
| R17 | should-fix | Non-obvious design decisions are explained in code comments that say why (not what). | CLAUDE.md: comments capture design decisions so the code teaches. |

### Spec and quality
- Compare the change to the phase's `requirements.md` and `validation.md`. List validation items that the diff does not satisfy or that look unchecked.
- Are tests limited to the specific feature logic the PR adds, with none for `main.tsx`, `App.tsx`, or plain wiring? Do tests exist for new logic, and do `npm test`, `npm run lint`, and `npm run build` look likely to pass? Run them only if the user asks.

## Step 4: Post the review to GitHub

1. Build one review as a JSON file in the scratchpad directory, with:
   - `commit_id`: the PR's `headRefOid`.
   - `event`: always `COMMENT`. Never `APPROVE` or `REQUEST_CHANGES`; the merge decision stays with the humans.
   - `body`: the summary (see below).
   - `comments`: one entry per finding that sits on a changed line, each `{ "path": "<repo-relative file>", "line": <line in the new file>, "side": "RIGHT", "body": "<comment>" }`.
2. Write each inline comment as: `**[Blocking|Should fix|Nit] <rule or guideline>**`, a blank line, what is wrong and why it matters, then a concrete fix. Cite the rule ID (for example `R12`) or the guideline (`mission: responsive`, `tech-stack: dependencies`, `roadmap: scope`). Keep each comment short and about one issue.
3. Findings that do not sit on a changed line (a missing test, a missing roadmap update, a scope problem across files) go in the summary body instead, not in `comments`.
4. The summary body contains: the verdict (`Approve`, `Approve with comments`, or `Request changes`) with one sentence of reasoning, the roadmap phase the PR targets, counts of findings by severity, the findings that could not be placed inline, and a short list of guidelines checked with no issues. Do not add any Claude attribution line.
5. Post it: `gh api repos/<owner>/<repo>/pulls/<n>/reviews --input <file>`. If the API rejects a comment because its line is not part of the diff, move that finding into the summary body and post again.
6. If there are no findings, post only the summary body.

## Step 5: Report to the user

Print the review URL, the verdict, and the number of comments posted by severity. Do not paste the full review again.

## Rules

- Only comment on real violations you can point to in the diff or files. Do not invent findings.
- Judge against the guideline files as they stand now; if they conflict with the PR, say so in the summary rather than guessing which is right.
- If a guideline file is missing, say so and continue with the others.
- Post exactly one review per run, and never post anything to a PR other than the one being reviewed.
- Keep comments concise, specific, and actionable.
