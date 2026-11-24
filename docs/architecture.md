# Architecture Overview

This document describes the structure and technical decisions of agenticCodingTestV1.

## System Model
The project is a static front-end application built with semantic HTML5 and vanilla CSS3.
It requires zero build steps, zero transpilers, and zero runtime JavaScript.

## Directory Structure
- `index.html`: The main entry page of the web application.
- `css/`: Modular CSS files.
  - `css/variables.css`: Global CSS custom properties (colors, typography, spacing).
  - `css/styles.css`: CSS reset, layout structures, and utility classes.
- `assets/images/`: Static image files and icons.
- `docs/`: Project documentation, architectural records, and onboarding guides.
- `tasks/`: Task files tracking planned and active work.
- `scripts/`: Python verification scripts.
- `.agents/rules/`: Scoped agent instruction rules.

## Design and Styling
The styling follows a minimalist monochrome aesthetic.
Colors use high-contrast dark and light values.
Layouts use CSS Grid and Flexbox with mobile-first breakpoints.

## Hosting and Database
- Database: None.
- Hosting: TBD (owner: itsdguptaofficial).
