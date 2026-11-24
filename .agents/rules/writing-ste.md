---
trigger: model_decision
description: Load when writing or editing documentation, task files, commit messages, or PR text.
---

# Simplified Technical English (STE-style) Writing Standard

This document defines the writing standard based on ASD-STE100 Issue 9 principles.

## Scope
Apply these rules to all markdown files, commit messages, PR descriptions, and comments.

## Sentence Rules
- Classify each passage as procedural or descriptive.
- Do not mix procedural steps and descriptive explanations in one passage.
- Procedural sentences must use the imperative and contain 20 words or fewer.
- Descriptive sentences must contain 25 words or fewer.
- Descriptive paragraphs must contain 6 sentences or fewer.

## Language and Style
- Use active voice.
- Use articles (a, an, the, this).
- Use simple tenses only (present, past, future).
- Do not use contractions (write "do not" instead of "don't").
- Do not use semicolons.
- Use "must" for requirements. Use "can" for permissions.
- Never use banned modal words: `should`, `could`, `would`, `may`, `might`.

## Structure
- Place warnings immediately before the action step.
- Use a vertical list when a sentence has more than 3 parallel items.
- Record each project term in `docs/glossary.md` with one clear definition.
