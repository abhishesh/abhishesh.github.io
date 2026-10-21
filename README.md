# abhishesh.com

Personal website built with Astro, with an independently implemented
Jestsee-inspired design. All original personal content and assets are preserved.

Requires Node **22.12+** and npm. No environment variables or backend services
are required.

```sh
npm ci
npm run dev
npm run build       # Astro/TypeScript checks, then static build
npm run validate    # Content, assets, routes, links, metadata, sitemap
npm run preview    # Production preview at http://localhost:4321
```

Astro 7 preview runs in the background. Use `npx astro preview stop` to stop it.
The existing GitHub Pages workflow still builds `dist/` from `master`. DNS,
`public/CNAME`, deployment workflow, and secrets are unchanged.

## Content and code

- `src/content/`: original JSON and Markdown content, validated by
  `src/content.config.ts`.
- `src/lib/content.ts`: content loading, sorting, and Markdown rendering.
- `src/components/sections/`: reusable section markup; used by both the homepage
  and dedicated section pages.
- `src/lib/navigation.ts`: section names, URLs, and card summaries.
- `src/layouts/Layout.astro`: metadata, shared shell, theme persistence, footer.
- `src/styles/global.css`: responsive layout, eight palettes, and reduced motion.
- `public/pringles.html`: original published notebook, including embedded images.
- `scripts/validate.mjs`: regression checks against the migration baseline.

`npm run format` formats implementation files without rewriting personal content.

## Additional validation

```sh
node scripts/check-external-links.mjs  # Requires network; writes a dated report
node scripts/responsive-preview.mjs   # After build, creates local-only QA page
npm run preview
```

Open `/__qa.html` and run the checks or choose a page and viewport to inspect.
The QA page is generated only in `dist/`, and **the next production build removes
it**. Always run `npm run build && npm run validate` before publishing.

Read [migration notes](docs/MIGRATION.md) for the licensing decision, route
contract, architecture changes, validation results, and remaining limitations.
