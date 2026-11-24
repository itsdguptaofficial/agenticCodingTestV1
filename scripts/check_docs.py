"""Documentation and Rule Checker.

NOTE: This script is a heuristic validator.
It checks compliance with basic STE principles and rule structure.
"""

from __future__ import annotations

import os
import re
import sys
from pathlib import Path

VALID_TRIGGERS = {"always_on", "model_decision", "glob", "manual"}
BANNED_MODALS = {"should", "could", "would", "may", "might"}


def check_rule_files(repo_root: Path) -> list[str]:
    """Check rule files for valid triggers and ensure no sub-folders exist."""
    errors = []
    rules_dir = repo_root / ".agents" / "rules"

    if not rules_dir.exists():
        errors.append("Directory .agents/rules/ does not exist.")
        return errors

    # Check for sub-folders
    for item in rules_dir.iterdir():
        if item.is_dir():
            errors.append(f"Sub-folder found in .agents/rules/: {item.name}. No sub-folders allowed.")

    # Check triggers in rule markdown files
    for rule_file in rules_dir.glob("*.md"):
        content = rule_file.read_text(encoding="utf-8")
        if not content.startswith("---"):
            errors.append(f"{rule_file.name}: Missing YAML frontmatter.")
            continue

        parts = content.split("---", 2)
        if len(parts) < 3:
            errors.append(f"{rule_file.name}: Malformed YAML frontmatter.")
            continue

        frontmatter = parts[1]
        trigger_match = re.search(r"^\s*trigger:\s*([a-zA-Z_-]+)", frontmatter, re.MULTILINE)
        if not trigger_match:
            errors.append(f"{rule_file.name}: Missing 'trigger' key in frontmatter.")
            continue

        trigger_val = trigger_match.group(1).strip()
        if trigger_val not in VALID_TRIGGERS:
            errors.append(
                f"{rule_file.name}: Invalid trigger '{trigger_val}'. "
                f"Valid triggers: {', '.join(sorted(VALID_TRIGGERS))}."
            )

    return errors


def strip_code_and_tables(text: str) -> str:
    """Remove code blocks, inline code, and tables before checking text."""
    # Remove code blocks
    text = re.sub(r"```[\s\S]*?```", "", text)
    # Remove inline code
    text = re.sub(r"`[^`]*`", "", text)
    # Remove markdown tables
    text = re.sub(r"^\|.*\|$", "", text, flags=re.MULTILINE)
    # Remove HTML tags
    text = re.sub(r"<[^>]+>", "", text)
    return text


def split_sentences(text: str) -> list[str]:
    """Split text into sentences while ignoring list bullet prefixes."""
    # Clean list numbers/bullets at start of lines
    cleaned_lines = []
    for line in text.splitlines():
        line = re.sub(r"^\s*([-*+]|\d+\.)\s+", "", line)
        cleaned_lines.append(line)
    cleaned = " ".join(cleaned_lines)
    # Split on sentence terminals followed by whitespace
    sentences = re.split(r"(?<=[.!?])\s+", cleaned)
    return [s.strip() for s in sentences if s.strip()]


def check_file_prose(file_path: Path) -> tuple[list[str], list[str]]:
    """Check sentence length, paragraph length, and banned modals."""
    errors = []
    warnings = []

    content = file_path.read_text(encoding="utf-8")

    # Check for banned modal words across full content (outside code)
    clean_text = strip_code_and_tables(content)

    for modal in BANNED_MODALS:
        matches = re.findall(rf"\b{modal}\b", clean_text, flags=re.IGNORECASE)
        if matches:
            errors.append(
                f"{file_path}: Found banned modal '{modal}' ({len(matches)} occurrence(s)). "
                f"Use 'must' or 'can' instead."
            )

    # Check paragraphs (separated by blank lines)
    raw_paragraphs = re.split(r"\n\s*\n", clean_text)
    for p_idx, para in enumerate(raw_paragraphs, start=1):
        para_clean = para.strip()
        if not para_clean or para_clean.startswith("#"):
            continue

        sentences = split_sentences(para_clean)
        if len(sentences) > 6:
            errors.append(
                f"{file_path} (para {p_idx}): Paragraph has {len(sentences)} sentences. "
                f"Maximum allowed is 6 sentences."
            )

        for s in sentences:
            words = [w for w in re.findall(r"\b[\w'-]+\b", s)]
            word_count = len(words)
            if word_count > 25:
                errors.append(
                    f"{file_path}: Sentence exceeds 25 words ({word_count} words): \"{s[:50]}...\""
                )
            elif word_count > 20:
                # Warning if it might be an instruction/procedural sentence
                warnings.append(
                    f"{file_path}: Sentence has {word_count} words (limit is 20 if procedural): \"{s[:50]}...\""
                )

    return errors, warnings


def main() -> int:
    repo_root = Path(__file__).resolve().parent.parent

    total_errors: list[str] = []
    total_warnings: list[str] = []

    # 1. Check rule files
    total_errors.extend(check_rule_files(repo_root))

    # 2. Check prose files (.md)
    target_dirs = [
        repo_root,
        repo_root / ".agents" / "rules",
        repo_root / "docs",
        repo_root / "tasks",
        repo_root / ".github",
    ]

    checked_count = 0
    for target in target_dirs:
        if target.is_dir():
            for md_file in target.glob("*.md"):
                checked_count += 1
                errs, warns = check_file_prose(md_file)
                total_errors.extend(errs)
                total_warnings.extend(warns)

    print(f"Checked {checked_count} markdown files and rule configurations.")

    if total_warnings:
        print(f"\n[WARNINGS] ({len(total_warnings)}):")
        for w in total_warnings:
            print(f"  - {w}")

    if total_errors:
        print(f"\n[FAILED] Found {len(total_errors)} error(s):", file=sys.stderr)
        for err in total_errors:
            print(f"  - {err}", file=sys.stderr)
        return 1

    print("\n[SUCCESS] All rule triggers and prose standards passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
