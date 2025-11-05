## Purpose
This file gives short, actionable guidance to an AI coding agent (or new contributor) so you can be productive immediately in this repository.

Keep answers focused and concrete: reference the files below and prefer small edits (CSS/SCSS, simple JS, content, images). This is a primarily static site — there is no Node toolchain or package.json in the repo root.

## Big picture (what this repo is)
- Static marketing/site project built from a set of source SCSS files and hand-written HTML/JS. The published CSS already exists at `css/index.css` and the SCSS source lives under `scss/`.
- Primary entry points:
  - `index.html` — main HTML page and where script/style tags are included.
  - `css/index.css` — compiled stylesheet served by the page.
  - `scss/index.scss` — SCSS entry that pulls in `scss/base/`, `scss/layout/`, and `scss/modules/`.
  - `js/index.js` — small JS glue that wires Lenis (smooth scrolling) and GSAP ScrollTrigger.

## Key directories and conventions (refer to these when changing code)
- `scss/` mirrors `css/` structure: `base/`, `layout/`, `modules/`, `colors/` etc. Edit `scss/*` and recompile to `css/index.css` (see 'Build / preview'). Example: `scss/modules/hero.scss` is the module for the hero section.
- `css/` is the compiled output (checked into repo). Prefer editing SCSS, not `css/` directly, unless making a tiny hotfix.
- `js/` contains runtime libraries and `js/index.js`. When adding GSAP plugins or other scripts, include them in `index.html` in the same order the site currently uses: core libraries (gsap) → plugins (ScrollTrigger, ScrollToPlugin) → helper libs (lenis) → `js/index.js`.
- `images/`, `fonts/`, `fav/` contain static assets. Note font paths in `css/index.css` are absolute (e.g. `/fonts/...`), so pay attention to server root when previewing or deploying.

## Build / preview (practical commands)
There is no package.json or npm scripts in-repo. Two simple ways to preview and to compile SCSS locally:

- Quick preview (static files) — open `index.html` in a browser or run a lightweight HTTP server from the repo root (recommended so absolute paths resolve correctly):
  ```bash
  # from repo root
  python3 -m http.server 8000
  # then open http://localhost:8000/index.html
  ```

- Recompile SCSS (if you edit SCSS): install Dart Sass (if not already installed) and run:
  ```bash
  # compile once
  sass scss/index.scss css/index.css --no-source-map --style=expanded

  # or watch for changes
  sass --watch scss/index.scss:css/index.css --no-source-map --style=expanded
  ```
  Note: the project expects `css/index.css` to be present; editing `scss/*` requires producing that file.

## JS patterns & sweet spots for AI edits
- `js/index.js` wires Lenis + GSAP. Example pattern to keep when adding scroll-driven animations:
  - instantiate Lenis
  - call `lenis.on('scroll', ScrollTrigger.update)`
  - add `lenis.raf` calls into `gsap.ticker`
  - keep plugin order intact in `index.html`
- When adding a new JS module, place it in `js/` and add script tag to `index.html` after vendor libs. Small DOM changes are fine in `index.html` — avoid large refactors without a human review.

## Styling conventions and utilities (use these instead of arbitrary CSS)
- Lots of utility classes exist (eg. `padding-top-80`, `gap-40`, `flex`, `grid`, `dynamic-width-1400`). Prefer these utilities for layout tweaks.
- Typographic and color variables live in `scss/base/variables` and `scss/colors/`. If you need a new token, add it there and adjust `scss/index.scss` imports.

## Assets and deployment notes
- Font files are referenced from `/fonts/...` in `css/index.css`. If the site will be served from a subpath, update font and asset paths or the server configuration.
- Favicons live in `fav/` and are referenced by `index.html`.

## What I did *not* find (and what that implies)
- No `package.json` or automated build scripts. If you add Node-based tooling, please add a `package.json` and update this doc with npm/yarn scripts.
- No tests or CI configuration. Keep changes small and verify visually in a browser.

## Minimal checklist for PRs / AI edits
1. If editing SCSS: recompile `scss/index.scss` → `css/index.css` and include the compiled CSS in the PR (or document how to build).
2. If editing JS: include required script tags in `index.html` and keep GSAP/Lenis load order.
3. Run a local static server and visually verify layout and fonts (http://localhost:8000/index.html).

## Helpful files to reference
- `index.html` — page shell and script/style includes
- `css/index.css` — compiled stylesheet (read for live styles and font paths)
- `scss/index.scss` — SCSS entry that imports the rest of the SCSS
- `scss/modules/hero.scss` and `css/modules/hero.css` — example module pairing
- `js/index.js` and `js/gsap/*` — JS entry and vendor plugins

If anything above is unclear or you want more automation (npm scripts, a watcher, or CI), tell me which you'd prefer and I'll add a small, safe change (e.g. a minimal `package.json` and `scripts` for Sass + a dev server).

---
Please review — tell me any missing areas (deploy target, preferred CLI tools, or repo policies) and I'll update this file.
