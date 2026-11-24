# Antigravity Settings

This document defines the agent settings that every team member must configure.
These settings are stored outside the repository in local user configuration.
Every member must set these values to ensure identical agent behavior.

## AI Model Configuration
- Model: Gemini 3.8 Flash.
- Reasoning: Consistent model selection prevents divergent outputs across members.

## Artifact Review Policy
- Review Policy: Ask before write.
- The agent must present file modifications for review before applying them.

## Terminal Execution Policy
- Execution Mode: Supervised approval required.
- Shared Allowlist:
  - `git status`
  - `git branch`
  - `git diff`
  - `git pull`
  - `python scripts/check_docs.py`
  - `python -m http.server *`

## Actions Requiring Explicit Confirmation
- Any `git push` or branch deletion.
- Any new package or external script addition.
- Any modification outside the workspace directory.
