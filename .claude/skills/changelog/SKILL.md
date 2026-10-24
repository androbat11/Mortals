---
name: changelog
description: Create or update changelog.md in the project root from git commits, one heading per date. Invoke manually before merging a branch.
disable-model-invocation: true
allowed-tools: Bash(git log:*) Bash(git status:*) Bash(git rev-parse:*) Read Write Edit
---

# Changelog

Keep `changelog.md` in the project root: one `## YYYY-MM-DD` heading per date, newest first, with one bullet per change.

## Format

```markdown
# Changelog

## 2026-10-23
- Added Vitest tests for App and main mounting (`1a2b3c4`)
- Made responsive design a requirement for every screen (`5d6e7f8`)

## 2026-10-22
- Added README and package.json (`9a0b1c2`)
```

- Dates use the commit's author date in local time (`git log --date=short`).
- Each bullet ends with the short commit hash in backticks. The hash is how existing entries are recognised, so never drop it.
- Write bullets as short, past-tense, user-meaningful summaries, not raw commit subjects. Fold a commit's body into the bullet only if it adds something. Merge related commits from the same date into one bullet and list all their hashes.
- Skip merge commits, and commits that only touch `changelog.md`.

## Steps

1. Run `git status --short` and `git rev-parse --abbrev-ref HEAD`. If the tree is dirty, tell the user: uncommitted work will not appear.
2. Check whether `changelog.md` exists.
3. **No changelog:** run `git log --no-merges --reverse --date=short --pretty=format:'%ad|%h|%s%n%b%x00'`, group by date, and write a new `changelog.md` covering the whole history.
4. **Changelog exists:** read it and collect every hash already listed. Run the same `git log` and keep only commits whose hash is not listed. Add them under their date heading, creating the heading in the right place if it is missing and appending to it if it exists. Do not rewrite or reorder existing entries.
5. If there is nothing new, say so and change nothing.
6. Show the user the resulting diff of `changelog.md`.

## Rules

- Do not commit, push, or open a PR. The user reviews the file and commits it with the branch.
- Only edit `changelog.md`.
- Never invent changes: every bullet must come from a real commit.
