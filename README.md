A lean personal website built with Eleventy and structured around clarity, portability, and optimization. It prioritizes progressive enhancement, sustainable stylesheets, and post-processing routines that preserve both modularity and compression.

A streamlined personal website powered by Eleventy, engineered for clarity, speed, and inclusive design. It’s modular, maintainable, and resilient across devices—with optimizations that minimize friction for both humans and machines.

### ⚡ Performance First

- **Post-build asset minification**: All `.js` and `.css` files (except `index.css`) are swept after Eleventy builds using a custom `post-minify.js` script powered by Terser and CleanCSS.
    - Problematic assets (e.g. `index.css`) are exempted to preserve layout and custom property resolution.

### 🌱 Accessibility by Design

- **Semantic HTML5 foundation**: Landmark tags (`<main>`, `<nav>`, `<header>`, `<footer>`) and structural roles (`role="navigation"`, etc.) ensure reliable screen reader interpretation.
- **ARIA attributes for clarity**: Custom elements like `<mv-dark-toggle>` and `<mv-nav-menu-toggle>` use `aria-hidden`, `aria-label`, and `aria-expanded` where appropriate.
- **Tab order and visual hierarchy**: Navigation links, headings, and site footer are structured to support logical keyboard traversal.

### 🧱 Best Practices

- **Modular component structure**: Assets are grouped into purpose-driven folders (`assets/components`, `assets/styles`, and `scripts/`), encouraging maintainable, intention-driven builds.
- **Human-readable iteration**: Unminified assets stay accessible during development and are only compressed during deploy, preserving flow without clutter.

### 📝 Markdown Rendering

Markdown content is rendered with a custom `markdown-it` stack enhanced for footnotes, callouts, syntax highlighting, and semantic attributes. Notes are fetched from GitHub, parsed with `gray-matter`, and routed cleanly via Eleventy templates. Typographic styles and callout variants are tailored for clarity, screen reader support, and dark mode compatibility—all anchored in a layout system that prioritizes readability and legacy-aware publishing.

### 🌘 Dark Mode Support

- **System-aware theming with minimal JS**:
The only JavaScript used is for toggling the root `<html>` class and persisting user choice in `sessionStorage`. All system-based dark mode behavior runs entirely on declarative CSS.
- **Modular, accessible toggle component**:
The `<mv-dark-toggle>` element builds on a base `BooleanToggle` Web Component, exposing keyboard, screen reader, and role-based navigation support.
- **Visual clarity and sensory care**:
Dark palettes use navy, slate, and green tones with tuned foreground contrast, reducing eye strain and honoring user comfort in low-light contexts.
- **Session persistence and cross-tab syncing**:
Theme changes are stored and echoed across tabs and device theme shifts, ensuring consistency without bloated state management.
- **Declarative overrides with SCSS mixins**:
Theme variables are scoped to `.dark-mode` and `.light-mode` root classes, abstracted via mixins for clarity and reusability