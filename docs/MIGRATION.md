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
