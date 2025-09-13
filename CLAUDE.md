# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This is a Jekyll-based personal website hosted on GitHub Pages. Development requires Ruby and Jekyll:

```bash
# Install dependencies (requires Ruby and Bundler)
bundle install

# Serve locally with live reload
bundle exec jekyll serve

# Build for production
bundle exec jekyll build
```

The built site outputs to `_site/` directory.

## Architecture Overview

This is a single-page personal portfolio website with the following structure:

- **Jekyll Static Site**: Uses Jekyll with the Minima theme for GitHub Pages hosting
- **Single Page Application**: All content is in `index.html` with JavaScript-powered tabs
- **Responsive Design**: Mobile-first CSS with custom styling overlaying the Minima theme
- **Content Organization**: Content is organized into tabs: About, Photography, Audio, Hobbies, Tech & Projects, Travel

### Key Files

- `index.html`: Main single-page application with all content and styling
- `_config.yml`: Jekyll configuration with theme settings, plugins, and social links
- `Gemfile`: Ruby gem dependencies (Jekyll, Minima theme, plugins)
- `README.md`: Detailed personal information (source content for the website)
- `_site/`: Generated static site (auto-generated, don't edit directly)

### Content Structure

The website transforms the markdown content from `README.md` into a modern tabbed interface:

- **About**: Personal principles, preferences, and contact links
- **Photography**: Equipment tables, portfolio links, editing tools
- **Audio**: Audiophile gear setup with detailed equipment tables and sound analysis
- **Hobbies**: Watches, coffee, keyboards, perfumes
- **Tech & Projects**: Desk setup, hobby projects, GitHub stats
- **Travel**: Countries visited with photo album links

### Styling Approach

- Custom CSS embedded in `index.html` for simplicity
- Responsive design with mobile breakpoints
- Gradient accents and modern UI elements
- Table-heavy layouts for equipment specifications
- Grid layouts for links and project showcases

### Hosting & Deployment

- **GitHub Pages**: Automatic deployment from `master` branch
- **Custom Domain**: Uses `CNAME` file for custom domain setup
- **Jekyll Processing**: GitHub Pages automatically builds and serves the site
- **Analytics**: Google Analytics integration via `_config.yml`

## Development Notes

- All content styling is inline in `index.html` for maintainability as a single-file site
- The site prioritizes content over complex architecture - it's intentionally simple
- Most content updates involve editing the HTML tables and lists in `index.html`
- The `README.md` serves as a content reference but the website pulls from `index.html`