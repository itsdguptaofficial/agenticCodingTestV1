---
trigger: model_decision
description: Load when writing code, structuring files, naming classes, or adding comments.
---

# Code Conventions

This document defines naming, formatting, and structural conventions for the project.

## Directory Structure
- Root directory holds `index.html` and control files.
- Put modular CSS files in `css/`.
- Put static media and images in `assets/images/`.
- Put documentation files in `docs/`.
- Put task files in `tasks/`.
- Put verification scripts in `scripts/`.

## Naming Rules
- Name files in kebab-case (for example, `index.html`, `reset.css`).
- Name CSS classes in kebab-case (for example, `card-header`, `btn-primary`).
- Name CSS custom properties with two leading dashes and kebab-case (for example, `--color-bg`).

## Comments
- Follow STE rules in all code comments.
- Explain the reason for a style rather than the syntax.
- Do not use modal verbs such as `should`, `could`, `would`, `may`, or `might`.

## Quality Checks
- Validate that HTML files contain clean semantic tags.
- Validate that all markdown files pass `scripts/check_docs.py`.
