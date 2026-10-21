# Jestsee-inspired Astro migration

## Assessment and licensing

Baseline: `e1621e570376a9482a3eeb8d1f27f709830928c9`. The clean existing repository
already uses Astro 6, strict TypeScript, ten validated content collections, one
homepage, and a shared layout. There is no React runtime or backend to migrate.
The homepage contains About, Photography, Audio, Coffee, Perfumes, HomeOffice
(including UniFi and Synology), and Travel. Projects are represented by the
existing `pringles.ipynb` and published `public/pringles.html` notebook.

`docs/migration-baseline.json` inventories the original rendered text, links,
fragment IDs, and SHA-256 hashes of all content, public assets, the notebook,
collection schema, and deployment workflow. All of these files are preserved.
Images are embedded in the notebook; photo portfolios and travel albums are
external links, not local image galleries.

Reference reviewed: https://github.com/jestsee/jestsee.com at
`2219d38353fbfcebd45e5f3eb2309671cdbd2e9b` (2026-10-10), plus
https://www.astrothemes.dev/theme/jestsee-jestsee/ and https://www.jestsee.com/.
No LICENSE file, README license grant, or package license was present. A theme
directory listing does not grant reuse rights. See GitHub's licensing guidance:
https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository.
Consequently this implementation uses independently written components and CSS;
no Jestsee code, imagery, fonts, personal content, or animations are copied.

Jestsee uses Astro, React islands, MDX, Tailwind, a floating navigation dock,
dark neutral surfaces, green accents, spacious sans-serif headings, cards,
and entrance/hover motion. Its Vercel/Node adapters, Hono API, Spotify/GitHub/
Monkeytype credentials, maps, analytics, React widgets, and Lottie animations
are unnecessary here and conflict with credential-free GitHub Pages hosting.
The existing content collections and rendering markup remain the reusable core.
The visual treatment is implemented with Astro, CSS, and a small theme script.

## Route contract

The original routes `/`, `/pringles.html`, and `/keybase.txt` remain at the same
URLs; `CNAME` is unchanged. Homepage content and section fragments remain usable
without JavaScript. New pages are additive: `/about/`, `/photography/`,
`/audiophile/`, `/coffee/`, `/perfumes/`, `/desk-setup/`, `/travel/`, `/projects/`.
No old route changes, so permanent redirects are not needed. GitHub Pages cannot
emit arbitrary HTTP 301 responses: future route removals require an approved
hosting capability change, not misleading meta-refresh pages labelled as 301s.

## Final architecture and deployment

The existing Astro application was evolved in place. Original JSON/Markdown
files and the notebook are unchanged; render markup was extracted into eight
section components. Both the homepage and `[section].astro` use those components,
so every original fragment still works without JavaScript, including compatibility
anchors for old tab IDs. Native links replace JavaScript-only tabs and support
history, bookmarking, keyboard navigation, and direct entry.

The layout supplies canonical URLs, descriptions, Open Graph/Twitter metadata,
Person structured data from the existing social links, a favicon, and skip link.
`@astrojs/sitemap` generates all pages plus the legacy notebook; the 404 is
excluded. `robots.txt` points to the sitemap. The old homepage title is preserved.

An npm audit found vulnerabilities in Astro 6 and its dependency graph. Astro
was upgraded to 7.3.8; the build still supports the workflow's Node 22 (minimum
22.12). The only collection-schema changes migrate deprecated `astro:content`
Zod exports to `astro/zod` and `z.string().url()` to `z.url()`; validation fields
are unchanged. The preservation script specifically checks this exact change.
See https://docs.astro.build/en/guides/upgrade-to/v7/.

Fustat is self-hosted via Fontsource (SIL Open Font License, provided by the npm
package), with variable weights, WOFF2, Unicode subsets, and `font-display: swap`.
No external font requests, React hydration, analytics, remote API calls, or
backend services are introduced. The small theme script tolerates unavailable
localStorage. All eight previous themes remain available; the default is dark.
CSS handles entrance and hover motion, with reduced-motion overrides. The
photography and headphone tables become labelled rows on small screens.

No local photo files existed to re-encode. Existing embedded notebook images
are preserved byte-for-byte, and all external portfolio/album links remain.
The new visual decorations are CSS and a small SVG favicon.

Production output remains static `dist/`. The deployment workflow, CNAME, DNS,
secrets, and Git history are preserved. No new environment configuration is
needed. This migration is committed locally; it is not pushed or deployed.

## Validation results (2026-10-10)

- Production build: ten Astro pages plus the original notebook HTML.
- Astro/TypeScript: zero errors, warnings, or hints.
- Preservation: 317 original rendered text segments, 85 external links, all
  original fragment IDs, 70 protected files (schema modernization explicitly
  checked), and all published public assets.
- Static output: 242 internal references resolve; canonical URLs, sitemap,
  main landmarks, unique IDs, heading presence, ARIA references, image sources,
  and embedded notebook PNG signatures checked.
- npm audit after dependency update: zero vulnerabilities.
- Safari: compared desktop reference and new homepage; checked the new mobile
  Audiophile layout. Browser harness checked nine pages at 320, 375, 768, and
  1280 CSS pixels (36 combinations), including all eight themes: no horizontal
  page overflow or broken images. This is viewport validation, not a physical
  device/browser compatibility matrix.

External link checks are recorded in `external-link-report.json`: 69 successful
responses, 14 access/rate/bot restrictions, one HTTP 307 requiring manual review,
and one unresolved domain (`fourbillionyears.org`). These are existing content
links and remain unchanged. A successful HTTP response does not verify a
third-party page's content, and restricted responses do not prove a broken link.
The standalone notebook retains its original styling and markup; the new Projects
section links directly to it. Full assistive-technology and cross-browser audits
remain outside the checks performed here.
