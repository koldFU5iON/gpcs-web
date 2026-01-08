# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GPCS (Game Project Classification Standard) is a static website built with Eleventy (11ty) v3.1.2. The site presents a bond-style rating framework for classifying game projects by production capacity and resource backing. Current version: 0.5.0 (proposal under testing).

## Development Commands

```bash
# Development server with live reload
npm start

# Production build
npm run build
```

The dev server runs at http://localhost:8080 by default and watches for file changes.

## Project Architecture

### Build System

- **Static Site Generator**: Eleventy (11ty) v3.1.2
- **Template Engine**: Nunjucks (.njk files)
- **Input Directory**: `src/`
- **Output Directory**: `_site/`
- **Configuration**: `.eleventy.js`

### Directory Structure

```
src/
├── _includes/          # Nunjucks layout templates
│   └── base.njk       # Main layout with nav, footer, CSS linking
├── css/               # Stylesheets (passed through to output)
│   └── styles.css     # Main stylesheet
├── about/             # About page
│   └── index.md
├── specification/     # Specification page
│   └── index.md
└── index.md           # Homepage
```

### Content Architecture

All pages use markdown with frontmatter:
- `layout: base.njk` - References the Nunjucks layout
- `title: [Page Title]` - Injected into `<title>` tag and can be used in templates

The base layout (`src/_includes/base.njk`) provides:
- HTML structure
- Navigation menu (Home, Specification, About)
- CSS linking to `/css/style.css` (note: references `style.css` but file is `styles.css`)
- Footer with attribution and CC BY 4.0 license

### Key Configuration Details

The `.eleventy.js` config:
- Copies CSS directory to output via passthrough
- Copies `GPCS-White-Paper.md` to output (file not currently present in repo)
- Sets input/output directories

### CSS Styling

Single stylesheet (`src/css/styles.css`) with:
- System font stack
- Dark blue nav (#2c3e50)
- Container-based layout (max-width: 1200px)
- Light gray footer background

### Missing Content

The site references a `GPCS-White-Paper.md` file (configured in `.eleventy.js` and linked from specification page) that doesn't currently exist in the repository. This should be added to `src/` if needed.

## Deployment

### Hosting & Domains

- **Primary hosting**: Netlify (free tier)
- **Custom domains**:
  - **Primary**: gpcstandard.org
  - **Redirects**: gpcstandard.com, gpcstandard.dev, gpcstandard.app → .org
- **Build command**: `npm run build`
- **Publish directory**: `_site`
- **Auto-deploy**: Configured from GitHub main branch

### GitHub Repository

This site deploys from the existing GPCS repository (currently at `koldfu5ion/gpcs`). The Eleventy build artifacts (`_site/`) are gitignored, so this coexists with the existing GitHub Pages setup without conflict.

When pushing to GitHub:
```bash
git add .
git commit -m "Your message"
git push origin main
```

Netlify automatically rebuilds and deploys on every push to main.

## Content Sync Strategy

The whitepaper source (`GPCS-White-Paper.md`) and documentation files (README, CHANGELOG, CONTRIBUTING, LICENSE) are copied from the Obsidian vault at:
`/home/devons/vaults/DFLX/1 - Projects/Studio Classification/live/`

**Workflow for updates:**
1. Edit whitepaper in Obsidian vault (source of truth)
2. Copy updated files to website repo:
   ```bash
   cp "/home/devons/vaults/DFLX/1 - Projects/Studio Classification/live/GPCS-White-Paper.md" ~/code/personal/gpcs-website/src/
   cp "/home/devons/vaults/DFLX/1 - Projects/Studio Classification/live/README.md" ~/code/personal/gpcs-website/
   cp "/home/devons/vaults/DFLX/1 - Projects/Studio Classification/live/CHANGELOG.md" ~/code/personal/gpcs-website/
   ```
3. Commit and push to GitHub
4. Netlify auto-deploys

**Alternative**: Consider symlinking files or a build script to automate copying.

## Project Context

This website serves as the official home for GPCS (Game Project Classification Standard), a bond-style rating framework for game projects. The goal is to provide a professional, credible presentation that positions GPCS as a legitimate industry standard rather than a personal project.

**Current Status**: v0.5.0 - Proposal under testing
- Piloting through Unity Awards program
- Seeking feedback from industry reviewers
- Not yet a ratified standard - explicitly framed as experimental

**Author**: Devon Stanton
**License**: CC BY 4.0 (Creative Commons Attribution)

## Common Issues (Resolved)

### ~~CSS Not Loading~~
**FIXED**: Base layout now correctly references `/css/styles.css` (was referencing non-existent `style.css`).

### Whitepaper Download
The specification page links to `/GPCS-White-Paper.md`. Ensure this file exists in `src/` directory and is configured as passthrough copy in `.eleventy.js`.
