---
name: feature
description: Start a new feature by creating a dated spec directory under specs/ with plan.md, requirements.md, and validation.md. Invoke manually with the feature name or idea.
disable-model-invocation: true
argument-hint: <feature name or short description>
allowed-tools: Read Write Bash(git status:*) Bash(git rev-parse:*) Bash(git branch:*) Bash(date:*) Bash(ls:*) Bash(mkdir:*) AskUserQuestion
---

# Feature

Turn a feature idea into a spec directory that guides spec-driven implementation. Feature request: $ARGUMENTS

## Step 1: Ground yourself (read-only)

Read these before anything else:

- `specs/mission.md`: purpose, audience, principles (including responsive design for every screen).
- `specs/tech-stack.md`: the tools and constraints the feature must respect.
- `specs/roadmap.md`: where the feature fits and what phase it belongs to.
- The most recent directory under `specs/` as a style reference.

Also run `git rev-parse --abbrev-ref HEAD`, `git status --short`, and `date +%F`. If no feature was given in the arguments, ask the user what it is in your reply (a plain message, because `AskUserQuestion` needs a feature to ask about) and stop.

## Step 2: Ask before writing (required)

You MUST call the `AskUserQuestion` tool before writing anything to disk. No file or directory may be created until the user has answered. Ground every question in `mission.md`, `tech-stack.md`, and `roadmap.md`, and do not ask what those files or the code already answer. Cover the three topics below in one `AskUserQuestion` call of at most 4 questions (the tool's limit), each with 2 to 4 options. If more questions are needed, make a second call after the first is answered:

1. **Scope:** what is in and out for this feature, framed against the mission and the roadmap phase.
2. **Decisions:** the open choices that change the implementation (tooling, structure, behaviour), with a recommended option first and labelled "(Recommended)" that fits the tech stack.
3. **Context:** constraints or dependencies that matter, such as earlier phases, responsive behaviour on phone, tablet, and desktop, and the branch name (name it in `requirements.md`; do not create the branch while writing the spec).

If an answer is "Other" or unclear, ask a follow-up before continuing. Record each choice and its reason for `requirements.md`.

## Step 3: Create the files

Make the directory `specs/YYYY-MM-DD-feature-name/`, using today's date and a short kebab-case name. If the directory already exists, stop and tell the user. Write three files, matching the style of the existing spec directories:

### `plan.md`
Title `# Plan: <Feature>`, then numbered task groups, each a `## N. Group name` heading with a numbered list of small, concrete steps. Order the groups so each is independently verifiable. Finish with a group that walks through `validation.md` and wraps up (commit on the feature branch, open a PR to `main`).

### `requirements.md`
Title `# Requirements: <Feature>`, with these sections:
- `## Scope`: what is in scope and out of scope.
- `## Decisions`: the answers from Step 2, each with the reason, including a `Branch` decision.
- `## Context`: links to `specs/mission.md`, `specs/tech-stack.md`, `specs/roadmap.md`, and the repo state at the start.

### `validation.md`
Title `# Validation: <Feature>`, stating that the work can be merged when every item passes. Use `- [ ]` checkboxes under these headings: `## Automated checks` (tests, lint, build), `## Manual checks`, `## Structure and conventions`, `## Scope guard`, and `## Merge readiness`. Every screen or component must include a responsive check at phone, tablet, and desktop widths.

## Step 4: Report

List the three files created. Do not implement the feature, commit, or push. Tell the user to review the specs, then ask for the plan to be implemented.

## Rules

- Never write before `AskUserQuestion` has been answered.
- Only create files inside the new `specs/` directory.
- Do not invent facts about the repo: read it.
- Keep each plan step small enough to verify on its own.
