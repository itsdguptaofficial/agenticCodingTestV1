# agenticCodingTestV1

agenticCodingTestV1 is a test environment and blueprint for agentic software development and multi-agent team collaboration.
The project builds a modern static website with semantic HTML5 and vanilla CSS3.

## Overview
This repository defines control files and instructions for human developers and AI agents.
All team members and agents follow the same rules to produce predictable code.
The user interface follows a clean, minimalist design inspired by modern web platforms.

## Project Applications
This repository hosts three interconnected web applications:
- **Developer Portfolio**: A clean, accessible multi-page personal portfolio in the root directory.
- **[SIP Visualizer](file:///sip-visualizer/)**: An interactive investment simulator with real-time sliders and an HTML5 Canvas growth chart.
- **[CodingGita Clone](file:///CodingGitaWebsite/)**: A complete clone of the CodingGita platform with dark and light theme switching and an ROI calculator.

## Technology Stack
- Markup: Semantic HTML5.
- Styling: Vanilla CSS3 with custom properties and theme tokens.
- Scripting: Vanilla JavaScript (ES6+).
- Dependencies: None.
- Hosting: TBD (owner: itsdguptaofficial).

## Local Preview
You do not need a package manager or build pipeline to run this project.

1. Open `index.html` directly in your browser.
2. Alternatively, start a local preview server with Python:
   ```bash
   python -m http.server 8000
   ```
3. Open `http://localhost:8000` to view the developer portfolio.
4. Open `http://localhost:8000/sip-visualizer/` to view the SIP Visualizer.
5. Open `http://localhost:8000/CodingGitaWebsite/` to view the CodingGita Clone.

## Documentation
- [CONTRIBUTING.md](file:///CONTRIBUTING.md): Team workflow and contribution rules.
- [docs/glossary.md](file:///docs/glossary.md): Project terms and definitions.
- [docs/architecture.md](file:///docs/architecture.md): Architecture overview and styling rules.
- [docs/ONBOARDING.md](file:///docs/ONBOARDING.md): Step-by-step setup for new members.
- [docs/antigravity-settings.md](file:///docs/antigravity-settings.md): Required IDE settings for agents.

## License
This project is licensed under the MIT License.
