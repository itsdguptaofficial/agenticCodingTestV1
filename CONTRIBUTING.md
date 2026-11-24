# Contributing Guidelines

This document defines how contributors and AI agents collaborate on this repository.
All contributors must follow these instructions to keep the repository clean and consistent.

## Team Consistency Rules
1. Commit `AGENTS.md` and `.agents/` to the repository.
   Do not keep project rules in a personal folder.
2. Check that personal global rules in `~/.gemini/` do not conflict with the project rules.
3. Only the configuration owner approves a change to `AGENTS.md` or `.agents/`.
   Use a pull request with the label `agent-config`.
4. Use one task, one branch, and one pull request for each change.
5. Pull changes before you start work.
   Rebase on the `main` branch before you open a pull request.
6. Record each design decision in `docs/decisions/`.

## Workflow Steps
1. Create a task file in `tasks/` from the template.
2. Create a git branch named `type/T-0001-short-name`.
3. Record all files you will edit in the task file before you edit them.
4. Implement your changes.
5. Run the validation checks:
   ```bash
   python scripts/check_docs.py
   ```
6. Commit changes using Conventional Commits format (`feat:`, `fix:`, `docs:`, `chore:`).
7. Push your branch and open a pull request.
8. Request review from itsdguptaofficial.
9. Squash and merge after approval.

## Pull Request Rules
- Keep pull requests under 250 changed lines.
- All automated checks must pass before merge.
- Follow the STE-style writing rules for all prose and comments.
