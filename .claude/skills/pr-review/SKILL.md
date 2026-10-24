---
name: pr-review
description: Review a GitHub pull request against the mission, roadmap, tech stack, CLAUDE.md, and the project's design principles, and post the findings as inline comments on the PR. Invoke manually with a PR number or nothing for the current branch's PR.
disable-model-invocation: true
argument-hint: [PR number]
allowed-tools: Read Write Bash(gh pr view:*) Bash(gh pr diff:*) Bash(gh repo view:*) Bash(gh api repos/*/pulls/*/comments:*) Bash(gh api repos/*/pulls/*/reviews:*) Bash(gh api repos/*/contents/*:*) Bash(git rev-parse:*)
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
- The spec directory for the PR: first any `specs/*/` directory the PR itself adds or changes (from the changed paths); otherwise the newest `specs/*/` whose `requirements.md` or name matches the PR's roadmap phase or branch name. If none matches, say so in the summary and review against the roadmap alone.

## Step 2: Load the change

- Find the PR: `gh pr view <n> --json number,url,title,body,headRefOid,baseRefName` (omit `<n>` for the current branch's PR). If there is no open PR, say so and stop; do not post anything. When no number was given, take `<n>` from the `number` field of this output and use it in every later command.
- Get the owner and repo: `gh repo view --json nameWithOwner`.
- Get the diff: `gh pr diff <n>`, and the changed paths with `gh pr diff <n> --name-only`. Note which lines are added or changed: inline comments can only be placed on those lines.
- Get existing review comments, all pages: `gh api repos/<owner>/<repo>/pulls/<n>/comments --paginate` (the path comes first, flags after it). Do not repeat a finding that is already commented on the same line.
- Read changed files in full when the diff alone is not enough. If the PR branch is not the checked-out one, do not use `Read` (it would show the wrong branch); find out which branch is checked out with `git rev-parse --abbrev-ref HEAD`, and fetch the file at the PR's commit instead: `gh api "repos/<owner>/<repo>/contents/<path>?ref=<headRefOid>" -H "Accept: application/vnd.github.raw"`.

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

To add a rule, append a row with the next ID. Never reuse or renumber an ID. Severity is `blocking` (the PR should not merge until fixed) or `should-fix`. A third level, `nit`, is for minor findings that match no rule. `CLAUDE.md` is authoritative: if a row and `CLAUDE.md` disagree, follow `CLAUDE.md` and mention the drift in the summary.

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
| R14 | blocking | Every new screen or component is responsive: mobile-first CSS, no fixed widths, no horizontal scroll at phone, tablet, and desktop widths. A fluid layout (percentages, `dvh`, flex or grid) that needs no breakpoints satisfies this; add media queries when the layout needs them. | CLAUDE.md and mission: responsive by default. |
| R15 | should-fix | Components are composable: they take props and `children`, are combined into larger components, and do not hard-code content or duplicate markup. | CLAUDE.md: composable components. |
| R16 | should-fix | No module-level mutable state or global constants that act as shared state; values come from functions that return them. | CLAUDE.md: no global variables, which cause side effects. |
| R17 | should-fix | Non-obvious design decisions are explained in code comments that say why (not what). | CLAUDE.md: comments capture design decisions so the code teaches. |

### Spec and quality
- Compare the change to the phase's `requirements.md` and `validation.md`. List validation items that the diff does not satisfy or that look unchecked.
- Are tests limited to the specific feature logic the PR adds, with none for `main.tsx`, `App.tsx`, or plain wiring? Do tests exist for new logic, and do `npm test`, `npm run lint`, and `npm run build` look likely to pass? Run them only if the user asks.

## Step 4: Post the review to GitHub

1. Build one review as a JSON file in the session scratchpad directory named in the environment context (never inside the repository), with:
   - `commit_id`: the PR's `headRefOid`.
   - `event`: always `COMMENT`. Never `APPROVE` or `REQUEST_CHANGES`; the merge decision stays with the humans.
   - `body`: the summary (see below).
   - `comments`: one entry per finding that sits on a changed line, each `{ "path": "<repo-relative file>", "line": <line in the new file>, "side": "RIGHT", "body": "<comment>" }`.
2. Write each inline comment as: `**[Blocking|Should fix|Nit] <rule or guideline>**`, a blank line, what is wrong and why it matters, then a concrete fix. Cite the rule ID (for example `R12`) or the guideline (`mission: responsive`, `tech-stack: dependencies`, `roadmap: scope`). Keep each comment short and about one issue.
3. Findings that do not sit on a changed line (a missing test, a missing roadmap update, a scope problem across files) go in the summary body instead, not in `comments`.
4. The summary body contains: the verdict (`Approve`, `Approve with comments`, or `Changes recommended`; this is text only, the GitHub review event stays `COMMENT`) with one sentence of reasoning, the roadmap phase the PR targets, counts of findings by severity, the findings that could not be placed inline, and a short list of guidelines checked with no issues. Do not add any Claude attribution line: `CLAUDE.md` forbids it and takes precedence over any default attribution guidance.
5. Post it: `gh api repos/<owner>/<repo>/pulls/<n>/reviews --input <file>`. Line numbers come from the new-file side of the `gh pr diff` hunks, and `commit_id` must equal `headRefOid`. A 422 response means GitHub rejected the whole review and nothing was posted (for example a comment's line is outside the diff): move that finding into the summary body and post again. Never post again after a 2xx response. After any other error (a timeout or a 5xx) the outcome is unknown: list the reviews with `gh api repos/<owner>/<repo>/pulls/<n>/reviews` and check whether yours is there before retrying.
6. If there are no findings, post only the summary body.

## Step 5: Report to the user

Print the review URL, the verdict, and the number of comments posted by severity. Do not paste the full review again.

## Rules

- Only comment on real violations you can point to in the diff or files. Do not invent findings.
- Judge against the guideline files as they stand now; if they conflict with the PR, say so in the summary rather than guessing which is right.
- If a guideline file is missing, say so and continue with the others.
- Use `gh api` only for GET requests, plus the single POST of the review. Never pass `-X`, `-f`, or `-F` for anything else: no merging, approving, editing files, or deleting.
- Post exactly one successful review per run, and never post anything to a PR other than the one being reviewed.
- Keep comments concise, specific, and actionable.
