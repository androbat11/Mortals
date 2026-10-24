---
name: changelog
description: Create or update changelog.md in the project root from git commits, one heading per date. Invoke manually before merging a branch.
disable-model-invocation: true
allowed-tools: Bash(git log:*) Bash(git show:*) Bash(git diff:*) Bash(git status:*) Bash(git rev-parse:*) Read Write Edit
---

# Changelog

Keep `changelog.md` in the project root: one `## YYYY-MM-DD` heading per date, newest first, with one bullet per change.

## Format

```markdown
# Changelog

## 2026-10-23
- Added a scene repository that creates Three.js objects through factories (`1a2b3c4`)
- Made responsive design a requirement for every screen (`5d6e7f8`)

## 2026-10-22
- Added README and package.json (`9a0b1c2`)
```

- Dates use the commit's author date in local time (`git log --date=short`).
- Each bullet ends with the first 7 characters of the commit hash in backticks. That is how existing entries are recognised, so never drop it. When matching, compare by prefix: a listed 7-character hash matches any full hash that starts with it, so a repository that later needs longer short hashes does not cause duplicates.
- Write bullets as short, past-tense, user-meaningful summaries, not raw commit subjects. Fold a commit's body into the bullet only if it adds something. Merge related commits from the same date into one bullet and list all their hashes.
- Skip merge commits, and commits that only touch `changelog.md` (check with `git show --stat --format= <hash>`).
- Limitation: a rebased or squash-merged commit gets a new hash and is listed again. When a new commit clearly repeats an existing bullet, mention it to the user instead of adding it.

## Steps

1. Run `git status --short` and `git rev-parse --abbrev-ref HEAD`. If the tree is dirty, tell the user: uncommitted work will not appear.
2. Check whether `changelog.md` exists.
3. **No changelog:** run `git log --no-merges --reverse --date=short --pretty=format:'%ad|%H|%s'`, group by date, and read a commit's body with `git show -s --format=%b <hash>` only when its subject is unclear, and write a new `changelog.md` covering the whole history.
4. **Changelog exists:** read it and collect every hash already listed. Run the same `git log` and keep only commits whose full hash does not start with a listed hash. Add them under their date heading, creating the heading in the right place if it is missing and appending to it if it exists. Do not rewrite or reorder existing entries.
5. If there is nothing new, say so and change nothing.
6. Show the user the result: the output of `git diff -- changelog.md` if the file is tracked, otherwise the new file's contents.

## Rules

- Do not commit, push, or open a PR. The user reviews the file and commits it as the last commit on the branch (changelog-only commits are skipped on the next run, so this does not create a loop).
- Only edit `changelog.md`.
- Never invent changes: every bullet must come from a real commit.
