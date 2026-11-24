---
trigger: model_decision
description: Load when branching, committing, creating pull requests, or updating git tasks.
---

# Git Workflow

This document defines the git standards for all team members and agents.

## Branching
- Base all new branches on `main`.
- Name branches using `type/T-0001-short-name` (for example, `feat/T-0001-nav`).
- Do not commit directly to `main`.

## Commits
- Use Conventional Commits format (`feat:`, `fix:`, `docs:`, `chore:`, `ci:`).
- Write commit messages in the imperative tense.
- Keep the first commit line under 72 characters.

## Pull Requests
- Keep pull requests under 250 changed lines.
- Link the task file from `tasks/` in the pull request description.
- Ensure all automated checks pass before requesting a review.
- Squash and merge branches after approval.
