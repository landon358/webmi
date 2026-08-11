# WebMI — webmi.org

Static marketing site for WebMichigan, built for Netlify. Migrated off Squarespace.

## Deploy

Netlify, publishing from the repo root (`netlify.toml` sets `publish = "."`). No build step.

URLs are clean — `/about`, `/services`, `/contact`. The `.html` extensions 301 to the clean
path via `_redirects`, so each page has exactly one indexable URL matching its canonical tag.

## Structure

| Path | What it is |
| --- | --- |
| `index.html`, `about.html`, … | One page per URL, each with its own inline `<style>` and full `<head>` SEO block |
| `*.dc.html` | Shared components (nav, footer, town page template), rendered client-side |
| `support.js` | Component runtime. Pulls React from unpkg at runtime |
| `towns.js` | Copy and data for the town landing pages |
| `starfield.js`, `wm-motion.js` | Background canvas and scroll motion |
| `_redirects` | Netlify redirect table — legacy Squarespace paths, `.html` → clean URLs |
| `netlify.toml` | Publish dir, cache headers, security headers, `noindex` on `.dc.html` |

Nav and footer are components, so editing `SiteNav.dc.html` or `SiteFooter.dc.html`
updates every page at once. Page-level CSS is deliberately inline per file.

## Town landing pages

Only `web-design-boyne-city` ships today. The other six towns
(Charlevoix, Petoskey, Harbor Springs, East Jordan, Boyne Falls, Walloon Lake)
are written but still carry `[Local copy slot: …]` placeholders in `towns.js`,
so they are held back rather than published unfinished — six near-identical pages
differing only by town name is the doorway-page pattern Google demotes.

Their URLs currently 302 to `/web-design` (temporary, so no link equity is
permanently reassigned).

**To ship a town:**

1. Write its real copy in `towns.js` — add a data object like `BOYNE_CITY` and wire it into `build()`.
2. Add the slug to the `SHIPPED` array in `towns.js`.
3. Copy `web-design-boyne-city.html`, change the `town=` attribute plus every URL in the head and JSON-LD.
4. Add the `<url>` entry to `sitemap.xml`.
5. Add the link to both footer lists in `SiteFooter.dc.html`.
6. Add the `ListItem` back to the `#areas` ItemList in `index.html`.
7. Remove its 302 from `_redirects` and add a `.html` → clean 301 instead.

The "Other towns I work in" block hides itself when `SHIPPED` has only one entry,
and repopulates automatically as towns are added.

## SEO

Every indexable page carries a unique title (under 60 chars), meta description,
canonical, Open Graph + Twitter tags, favicons, and JSON-LD. Canonical matches
`og:url` matches the sitemap entry on all 10 pages. One `<h1>` per page, no
skipped heading levels. All images are `.webp` with descriptive alt text and
explicit `width`/`height`.

`robots.txt` disallows the `.dc.html` fragments; `netlify.toml` also sends
`X-Robots-Tag: noindex` for them.

## Known constraints

- **Content is client-rendered.** `support.js` fetches React from `unpkg.com` at
  runtime, so nav, footer, and the entire town page body exist only after JS runs.
  Google renders JS, but if unpkg is slow or blocked, pages lose their chrome.
  Pre-rendering to static HTML is the durable fix.
- `_redirects` still needs an audit against Search Console for any old Squarespace
  URL not already covered.
- Canonicals are absolute to `https://webmi.org`. They only line up once the custom
  domain is attached — on a bare `*.netlify.app` preview they will point elsewhere.
