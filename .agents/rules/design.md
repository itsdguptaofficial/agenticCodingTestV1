---
trigger: glob
globs:
  - "**/*.html"
  - "**/*.css"
---

# Design System Rules

This document specifies the visual design guidelines for all HTML and CSS files.

## Visual Aesthetic
- Apply a Vercel-like minimalist aesthetic.
- Use high-contrast monochrome tones (pure black, pure white, crisp neutral grays).
- Use clean borders, subtle transitions, and precise typography.

## Design Tokens
- Define colors using CSS custom properties in `css/variables.css`.
- Use the system font stack: `system-ui, -apple-system, sans-serif`.
- Use a modular 4px and 8px spacing scale (4px, 8px, 16px, 24px, 32px, 48px, 64px).
- Build responsive layouts mobile-first with standard breakpoints (640px, 768px, 1024px, 1280px).

## Accessibility
- Comply with WCAG 2.1 AA standards.
- Maintain a minimum contrast ratio of 4.5:1 for body text.
- Ensure all interactive elements have visible focus states.
- Provide descriptive `alt` attributes for images.
