# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This is an Astro-based personal website. Development requires Node.js:

```bash
# Install dependencies
npm install

# Serve locally with live reload
npm run dev

# Build for production
npm run build

# Preview built site
npm run preview
```

The built site outputs to `dist/` directory.

## Architecture Overview

This is a personal portfolio website built with Astro:

- **Astro Static Site**: Uses Astro framework for static site generation
- **Static Output**: Configured for static deployment to GitHub Pages
- **Modern Framework**: Leverages Astro's component-based architecture
- **Content Organization**: Structured with Astro pages and layouts

### Key Files

- `src/pages/index.astro`: Main page content
- `src/layouts/Layout.astro`: Base layout component
- `astro.config.mjs`: Astro configuration with site settings
- `package.json`: Node.js dependencies and scripts
- `dist/`: Generated static site (auto-generated, don't edit directly)

### Technology Stack

- **Framework**: Astro 6.x
- **Build Tool**: Vite (included with Astro)
- **Output**: Static HTML/CSS/JS
- **Deployment**: GitHub Pages with custom domain (abhishesh.com)

### Hosting & Deployment

- **GitHub Pages**: Automatic deployment from `master` branch
- **Custom Domain**: Configured via `astro.config.mjs` site setting
- **Static Generation**: Astro builds optimized static assets
- **Modern Build Pipeline**: Fast builds with Vite bundler

## Development Notes

- Uses Astro's component-based architecture for maintainable code
- Static site generation provides excellent performance
- Modern build tooling with hot module replacement during development
- Optimized for GitHub Pages deployment with custom domain support