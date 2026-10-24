# React Rules

Checklist used by the `pr-review` skill. Add a rule by appending a new row to the table below with the next ID.

## How to add a rule
- **ID:** the next `R<number>`. Never reuse or renumber an ID.
- **Severity:** `blocking` (request changes) or `should-fix`.
- **Rule:** one sentence a reviewer can check against a diff.
- **Why:** the reason, so edge cases can be judged.

## Rules

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
