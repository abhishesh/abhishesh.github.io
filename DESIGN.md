# Design System — abhishesh.com

Personal portfolio for Abhishesh Sharma. Minimal, typographic, monospace-first.
Built on IBM Plex Mono with a restrained 5-color palette and a light/dark theme.

---

## Philosophy

- **Less but better.** Every element earns its place.
- **Type-driven.** IBM Plex Mono is the only font. No serifs, no sans-serif fallbacks.
- **Content-first.** No decorative imagery, no hero gradients, no animations beyond fade-ins.
- **Accessible by default.** WCAG AA contrast, 44px touch targets, visible focus indicators, reduced-motion support.

---

## Color Tokens

All colors are CSS custom properties on `:root` (light) and `[data-theme="dark"]`.

### Light Mode

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#fdfdfd` | Page background |
| `--fg` | `#282728` | Body text, headings, borders when tinted |
| `--accent` | `#006cac` | Links on hover, active tab, list markers, buttons, focus rings, pull-quote border |
| `--muted` | `#e6e6e6` | Table header backgrounds, theme-toggle background |
| `--border` | `#ece9e9` | All `1px` dividers (tabs, tables, cards, sections) |

### Dark Mode

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#212737` | Page background |
| `--fg` | `#eaedf3` | Body text, headings |
| `--accent` | `#ff6b01` | Same roles as light, switched to orange |
| `--muted` | `#343f60` | Table header backgrounds, muted surfaces |
| `--border` | `#4a5568` | Dividers |

### Contrast Ratios (verified WCAG AA)

| Pair | Light ratio | Dark ratio | Requirement |
|---|---|---|---|
| `--fg` on `--bg` | ~18:1 | ~14:1 | ≥ 4.5:1 normal text |
| `--accent` on `--bg` | ~5.9:1 | ~4.6:1 | ≥ 4.5:1 |
| `--fg` at 65% opacity (inactive tabs) | ~4.8:1 | ~4.8:1 | ≥ 4.5:1 (minimum) |

**Rule:** Never go below `opacity: 0.65` for interactive text. `opacity: 0.6` is acceptable for purely decorative/supplementary text (subtitles, footer, stat labels) that is not a call-to-action.

---

## Typography

### Font

**IBM Plex Mono** — the only typeface on the site.

- Source: Google Fonts (`wght@400;500;600;700`)
- Fallback: `monospace`
- Line height body: `1.7`
- Letter spacing: `-0.02em` on headings, `+0.02em` on subtitles/tabs

### Scale

| Role | Size | Weight | Element / Class |
|---|---|---|---|
| Hero title | `clamp(2rem, 4vw, 2.75rem)` | 700 | `.hero-title` |
| Section title | `1.25rem` (20px) | 600 | `.section-title` |
| Sub-heading | `1.1rem` (17.6px) | 600 | `h3` |
| Body heading | `0.95rem` (15.2px) | 600 | `h4` |
| Body | `0.9rem` (14.4px) | 400 | `p`, `li`, `td` |
| Tab labels | `0.85rem` (13.6px) | 500 | `.tab-button` |
| Small / meta | `0.8–0.85rem` | 400–500 | `.sub-tab-button`, `table th`, subtitles |
| Hero subtitle | `0.9rem` | 400 | `.hero-subtitle` (opacity 0.6) |
| Footer | `0.75rem` | 400 | `footer` (opacity 0.5) |

**Heading scale note:** H3–H4 are close (17.6px / 15.2px). Differentiate by using weight (H3 = section header, H4 = sub-section label) rather than size alone.

### Links

```css
a {
  color: var(--fg);
  text-decoration: underline;
  text-decoration-style: dashed;
  text-underline-offset: 4px;
  padding-block: 3px;         /* 44px touch target aid */
  transition: color 0.2s;
}
a:hover { color: var(--accent); }
```

Never use `text-decoration: none` on inline body links. The dashed underline is the visual affordance.

---

## Spacing

All spacing is in `rem`. No magic pixel numbers — use multiples of `0.25rem` (4px).

| Scale step | Value | Example use |
|---|---|---|
| xs | `0.25rem` | `margin-bottom` on list items |
| sm | `0.5rem` | Cell padding, chip padding |
| md | `0.75rem` | Card padding, gap in chip rows |
| lg | `1.25rem` | Section gaps, table margin |
| xl | `1.5rem` | Social links margin, sub-section margin |
| 2xl | `2rem` | Section bottom margin |
| 3xl | `4rem` | Hero top padding |

### Container

```css
max-width: 48rem;   /* 768px — single column, comfortable reading */
padding: 0 1.5rem;  /* 24px side gutter */
```

---

## Layout

### Page structure

```
[theme-toggle]      fixed, top-right, 44×44px circle
[.hero]             name + subtitle + tagline
[.tab-container]    tab nav + tab content panels
[footer]            copyright, centered
```

### Tab navigation

- Top-level: `.tab-nav` → `.tab-button`
- Second-level: `.sub-tab-nav` → `.sub-tab-button`
- Active state: `color: var(--accent)` + wavy underline, `opacity: 1`
- Inactive state: `color: var(--fg)`, `opacity: 0.65` (WCAG floor)
- Bottom border on nav container separates tabs from content

### Cards / bordered items

```css
border: 1px solid var(--border);
border-radius: 4px;
```

Use `border-radius: 4px` everywhere. The only exception is `.chip` (999px pill) and `.theme-toggle` (50% circle).

### Tables

Always wrapped in `.table-wrapper` (overflow-x: auto) for mobile safety.

```css
font-size: 0.85rem;
border-collapse: collapse;
```

`td:first-child` is `white-space: nowrap` (labels column).

### Grids

| Class | Columns | Use |
|---|---|---|
| `.links-grid` | `repeat(auto-fit, minmax(160px, 1fr))` | Portfolio links, external link tiles |
| `.travel-grid` | `repeat(auto-fit, minmax(140px, 1fr))` | Country tiles |
| `.stats-row` | `repeat(4, 1fr)` (→ 2 on mobile) | Stat cards |

---

## Components

### Buttons / Social links

Two variants, both inside `.social-links`:

```css
/* Primary — filled (light) / outline (dark) */
.btn-primary {
  background: var(--accent);
  color: var(--bg);
  border-color: var(--accent);
}
[data-theme="dark"] .btn-primary {
  background: transparent;
  color: var(--accent);
  border-color: var(--accent);
}

/* Outline — same in both themes */
.btn-outline {
  color: var(--fg);
  border: 1px solid var(--border);
}
.btn-outline:hover { border-color: var(--accent); color: var(--accent); }
```

All buttons: `min-height: 44px`, `padding: 0.5rem 1rem`, `border-radius: 4px`, `font-size: 0.85rem`.

### Chips

```css
.chip {
  padding: 0.3rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 0.8rem;
}
.chip:hover { border-color: var(--accent); color: var(--accent); }
```

### Pull quote

```css
.pull-quote {
  border-left: 3px solid var(--accent);
  padding: 0.75rem 1.25rem;
  font-style: italic;
  opacity: 0.8;
  margin: 2rem 0 0;
}
```

### Stat card

```css
.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0.5rem;
  border: 1px solid var(--border);
  border-radius: 4px;
}
.stat-num { font-size: 1.5rem; font-weight: 700; color: var(--accent); }
.stat-label { font-size: 0.75rem; opacity: 0.6; margin-top: 0.25rem; }
```

### Section header

When a subtitle follows a title, the title drops its border and the subtitle carries it:

```css
.section-title:has(+ .section-subtitle) {
  border-bottom: none;
  padding-bottom: 0;
}
.section-subtitle {
  font-size: 0.85rem;
  opacity: 0.6;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border);
}
```

---

## Accessibility

### Focus

```css
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: 2px;
}
```

Applied globally. Do not suppress `outline` on interactive elements without `focus-visible` as a replacement.

### Touch targets

Minimum 44×44px on all interactive elements:
- `.theme-toggle`: 44×44px circle
- `.social-links a`: `min-height: 44px`
- `a` inline: `padding-block: 3px` (partial aid — acceptable for body links)

### Motion

```css
@media (prefers-reduced-motion: reduce) {
  .tab-content { animation: none; }
  .theme-toggle, .tab-button, .sub-tab-button, a { transition: none; }
}
```

No parallax, no scroll-triggered animations. Fade-ins (`opacity 0 → 1`) on tab content are the only motion.

### Text

- Never use `opacity < 0.6` on interactive/readable content
- Avoid `font-size < 0.75rem` (12px)

---

## Motion & Animation

| Property | Value |
|---|---|
| Tab content fade | `fadeIn 0.2s ease-in` (opacity 0→1) |
| Button/link color transitions | `0.2s` |
| Theme toggle transition | `opacity 0.2s` |

One keyframe in the codebase: `@keyframes fadeIn`. Keep it that way.

---

## Dark Mode

Switched via `data-theme="dark"` on `<html>`. Persisted in `localStorage`, defaults to `prefers-color-scheme`.

- Orange (`#ff6b01`) replaces navy (`#006cac`) as accent in dark mode
- `.btn-primary` flips from filled to outline in dark mode (avoids harsh solid orange block)
- `::selection` uses `--accent` background with `--bg` text — works correctly in both themes

---

## Mobile (max-width: 640px)

- `.tab-nav`, `.sub-tab-nav`: `overflow-x: auto; flex-wrap: nowrap` (horizontal scroll)
- `.tab-button`, `.sub-tab-button`: `white-space: nowrap; flex-shrink: 0; font-size: 0.8rem`
- `.stats-row`: 4 columns → 2 columns
- `.links-grid`: `minmax(160px)` → `minmax(120px)`
- Tables: `font-size` 0.85rem → 0.8rem, padding reduced

---

## Known Issues / Future Work

None currently outstanding. Previously resolved:

- **Tab keyboard navigation** (fixed): `showTab`/`showSubTab` replaced with ARIA-compliant `activateTab` using event delegation. All tabs have `role="tab"`, `aria-selected`, `aria-controls`, `tabindex` managed. All panels have `role="tabpanel"`, `aria-labelledby`. Arrow keys (Left/Right/Up/Down), Home, and End navigate within each tablist.
- **Heading scale** (fixed): H4 now uses `font-size: 0.85rem; letter-spacing: 0.06em; text-transform: uppercase` to create clear visual separation from H3 (`1.1rem`, no transform).
- **CSS spacing tokens** (fixed): `--space-xs` through `--space-3xl` added to `:root`. Used consistently across all layout-level spacing (hero, containers, nav, sections, footer, components).
