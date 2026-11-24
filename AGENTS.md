# Agent Instructions

agenticCodingTestV1 is a test environment and blueprint for agentic software development and multi-agent team collaboration.

## Hard Constraints
- "Currently no constraints because it is a prototype Try to be cost effective like a very cost"
- Additional security policies: TBD (owner: itsdguptaofficial).

## STE Summary
- Classify each text passage as procedural or descriptive.
- Procedural: use the imperative, 20 words or fewer per sentence, and one instruction per sentence.
- Descriptive: use 25 words or fewer per sentence, one topic per paragraph, and 6 sentences or fewer per paragraph.
- Use the active voice and definite or indefinite articles.
- Use simple present, past, and future tenses only.

## Session Start Steps
1. Run `git pull --ff-only` on the default branch.
2. Read the open task files in the `tasks/` directory.
3. Read the rule index below.

## Required Approvals
You must get approval from itsdguptaofficial before you execute:
- Any new dependency.
- Any database migration.
- Any file deletion.
- Any change to more than 3 files.
- Any change to CI, auth, or secrets.
- Any git push or merge.
- Any command outside the project directory.

## Context Rules
- Search before you read entire files.
- Read only the needed line ranges.
- Load a rule file only when its description matches your task.

## Mid-Task Request Steps
1. Finish the current atomic step.
2. Commit a checkpoint.
3. Create a new task file in the `tasks/` directory.
4. Tell the user where the task fits.
5. Ask the user for the priority.

## Git and Team Rules
- Work on task branches named `type/T-0001-short-name`.
- Use one task, one branch, and one pull request.
- Commit all project rules to the repository.
- Only itsdguptaofficial approves rule changes with label `agent-config`.
- Read [.agents/rules/git-workflow.md](file:///.agents/rules/git-workflow.md) for full git procedures.

## Rule Index
| Rule File | When to Load |
| :--- | :--- |
| [.agents/rules/stack.md](file:///.agents/rules/stack.md) | Load when you edit HTML, CSS, or project tooling. |
| [.agents/rules/conventions.md](file:///.agents/rules/conventions.md) | Load when you create or style components and classes. |
| [.agents/rules/git-workflow.md](file:///.agents/rules/git-workflow.md) | Load when you create branches, commits, or pull requests. |
| [.agents/rules/writing-ste.md](file:///.agents/rules/writing-ste.md) | Load when you write or edit prose, docs, or comments. |
| [.agents/rules/design.md](file:///.agents/rules/design.md) | Load when you edit visual styles or layout files. |
