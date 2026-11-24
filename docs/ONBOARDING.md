# Contributor Onboarding Guide

Follow these steps to set up your environment for this project.
Complete each step in order.

## Prerequisites
- Git installed on your local machine.
- Python 3.8 or higher installed on your local machine.
- Modern web browser (Chrome, Edge, Firefox, or Safari).

## Onboarding Steps
1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/itsdguptaofficial/agenticCodingTestV1.git
   cd agenticCodingTestV1
   ```
2. Verify that your git line endings are normalized:
   ```bash
   git config core.autocrlf false
   ```
3. Configure your IDE according to [docs/antigravity-settings.md](file:///docs/antigravity-settings.md).
4. Run the documentation validator to check your environment:
   ```bash
   python scripts/check_docs.py
   ```
5. Review the project glossary in [docs/glossary.md](file:///docs/glossary.md).
6. Pick an open task in `tasks/` or create a new one using `tasks/T-0000-template.md`.
