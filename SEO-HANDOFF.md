# SEO handoff — Squarespace → Netlify

> **STATUS: implemented.** Everything below is done and shipped in `netlify-build/`.
> Two corrections to the original audit are noted inline.

Audit of the current build against the checklist, and an assignment of every item to
either **per-page HTML**, **shared component**, or **root-level file**.

---

## 0. The one structural finding that has to be fixed first

Every page in this build is a Design Component: a real `<head>` containing only a
charset tag, a viewport tag, and `support.js`, then the whole page inside `<x-dc>`.
Everything Squarespace used to inject — title, description, canonical, Open Graph,
favicon — **does not exist on any page right now.** Not one page has a `<title>`.

Two consequences for Netlify:

1. **Head tags must be authored statically in each file's real `<head>`, above
   `<x-dc>`.** Do *not* put them in the DC `<helmet>` block. `<helmet>` content is
   moved into the document by JavaScript at runtime; `<title>`, `canonical`, and OG
   tags read from there are unreliable (OG scrapers — LinkedIn, iMessage, Slack — do
   not run JS at all, so social previews would be blank).
2. **JSON-LD is currently inside the body** (bottom of each page file). That is valid
   and Google reads it, so it can stay where it is — but it must be the *page-specific*
   block, and the shared business block must appear exactly once per page.

Everything below assumes head tags get hand-written per file. There are 16 pages, so
this is a one-time pass, not an ongoing burden.

---

## 1. Page inventory and canonical URLs

| # | File | Netlify path | Type | H1 (exists today) |
|---|------|--------------|------|-------------------|
| 1 | `index.html` | `/` | Home | ✅ "Web design in Boyne City & Northern Michigan" |
| 2 | `Services.dc.html` | `/services` | Hub / pricing | ✅ "Services & pricing" |
| 3 | `WebDesign.dc.html` | `/services/web-design` | Service | ✅ "Design, hosting and support in one monthly rate" |
| 4 | `LocalSEO.dc.html` | `/services/local-seo` | Service | ✅ "Local SEO in Boyne City, Michigan" |
| 5 | `FreeDemo.dc.html` | `/free-demo` | Conversion | ✅ "See your website before you pay for it" |
| 6 | `OurWork.dc.html` | `/our-work` | Portfolio | ✅ "Our work" |
| 7 | `About.dc.html` | `/about` | About | ✅ "Hi, I'm Landon." |
| 8 | `FAQ.dc.html` | `/faq` | FAQ | ✅ "Questions, answered" |
| 9 | `Contact.dc.html` | `/contact` | Contact | ✅ "Let's talk." |
| 10–16 | `TownBoyneCity` … `TownWalloonLake` | `/web-design-{town}` | Local landing ×7 | ✅ "Web design in {Town}, Michigan" |

Towns: boyne-city, boyne-falls, charlevoix, east-jordan, harbor-springs, petoskey,
walloon-lake.

**Note on `index.html`:** it is currently a byte copy of `Home.dc.html`, so the home
page is reachable at two URLs. Either delete `Home.dc.html` from the deploy and point
all internal links at `/`, or keep it and set its canonical to `https://webmi.org/`.
Do not ship two crawlable copies without a canonical.

---

## 2. Per-page HTML — required on every individual page

Copy this block into the static `<head>` of each file and fill the four variables.
Nothing here can be shared or done in CSS; each value is unique per page.

```html
<title>{{TITLE}}</title>
<meta name="description" content="{{DESCRIPTION}}">
<link rel="canonical" href="https://webmi.org{{PATH}}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="WebMichigan">
<meta property="og:title" content="{{TITLE}}">
<meta property="og:description" content="{{DESCRIPTION}}">
<meta property="og:url" content="https://webmi.org{{PATH}}">
<meta property="og:image" content="https://webmi.org/assets/og/{{SLUG}}.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{{TITLE}}">
<meta name="twitter:description" content="{{DESCRIPTION}}">
<meta name="twitter:image" content="https://webmi.org/assets/og/{{SLUG}}.jpg">
```

Titles and descriptions **already exist** — they were written into the JSON-LD of the
Squarespace page files in `squarespace-v7/`. Lift them verbatim rather than writing
new ones; they are keyword-targeted and already live in Google's index:

| Path | Title (existing, ≤60ch where noted) | Description |
|---|---|---|
| `/` | Web Design Boyne City MI \| WebMichigan | Custom web design for small businesses in Boyne City and Northern Michigan. *(short — extend toward 150ch)* |
| `/services` | Services & Pricing \| Website Plans from $199 a Month \| WebMichigan *(72ch — trim to "Website Plans from $199/mo \| WebMichigan")* | Two monthly plans, no upfront fee. Essentials is $199 a month and Maximum is $599 a month… |
| `/services/web-design` | Web Design, Hosting & Support from $199 a Month \| Boyne City MI \| WebMichigan *(too long — trim)* | Custom web design, local SEO, hosting and support… Essentials $199, Maximum $599, no upfront fee. |
| `/services/local-seo` | Local SEO & Google Business Profile \| Boyne City, Michigan \| WebMichigan *(trim)* | Google Business Profile management, on-page SEO, and analytics… |
| `/free-demo` | Free Website Demo \| See Your Site Before You Pay \| WebMichigan *(trim)* | A free working demo of your website… No upfront fee, plans from $199 a month. |
| `/our-work` | **MISSING — write it.** Suggested: Our Work \| Website Examples \| WebMichigan | **MISSING — write it.** ~150ch describing the six live client sites. |
| `/about` | About Landon \| Web Designer in Boyne City MI \| WebMichigan | Landon designs and builds websites for small businesses in Boyne City and across Northern Michigan… |
| `/faq` | Web Design FAQ \| Boyne City MI \| WebMichigan | Answers about monthly pricing, the no-upfront-fee model, timelines, and how the free demo works. |
| `/contact` | Contact a Web Designer in Boyne City MI \| WebMichigan | Get a free working demo of your website. Serving Boyne City, Charlevoix, Petoskey… |
| `/web-design-{town}` | Web Design {Town}, MI \| Small Business Websites \| WebMichigan | Web design in {Town}, Michigan. Custom small business websites from $199 a month… |

`/our-work` is the only page with no metadata of any kind. It needs a title,
description, and its own JSON-LD (see §5).

**Per-page JSON-LD** (already written, keep per page): `WebPage` + `BreadcrumbList` on
every page; `Service` + `areaServed` on the seven town pages and the two service
pages; `FAQPage` with its 11 Q&A pairs on `/faq` only; `Person` on `/about`.
`/our-work` should get an `ItemList` of the six projects — it has none today.

**OG images do not exist yet.** There is no `assets/og/` directory. Until one
1200×630 image per page exists, point every page at a single sitewide
`/assets/og/default.jpg` rather than at a 404 — a broken `og:image` renders worse
than a generic one.

---

## 3. Shared / sitewide — done once in components, not per page

These belong in `SiteNav.dc.html`, `SiteFooter.dc.html`, or the `<helmet>` style
block, and are inherited by all 16 pages.

- **Viewport tag** — already present in every file. ✅ No action.
- **Charset** — already present. ✅
- **Semantic landmarks.** Partly done: `<main>`, `<section>`, `<header>`, `<footer>`
  are in use, `data-screen-label` marks sections. Gaps to fix: the nav in
  `SiteNav.dc.html` needs `<nav aria-label="Site">` (the Squarespace footer injection
  has it; confirm the DC version does), and the six portfolio cards on `/our-work`
  should each be an `<article>`.
- **Heading order.** Verify one `<h1>` per page — all 16 currently have exactly one
  and it is the visible page title, which is correct. Do **not** let type-scale drive
  tag choice; the section labels styled at 12–13px monospace must be `<h2>`/`<h3>` or
  plain `<div>`, never a downgraded heading.
- **Link colors** — already defined in the shared `<helmet>` style. ✅
- **Business JSON-LD** (`LocalBusiness` with `priceRange`, `makesOffer`, hours,
  `areaServed`) — put this in `SiteFooter.dc.html` so it renders once on every page,
  which is how it worked in the Squarespace footer injection. Note it still needs
  `priceRange` updated to `$199-$599`.

CSS itself does nothing for SEO here beyond avoiding layout shift; there is no
"sitewide SEO CSS" item on the list. The two CSS-adjacent wins are (a) explicit image
dimensions to kill CLS, and (b) not hiding real content behind
`opacity: 0` reveal animations without a `prefers-reduced-motion` / no-JS fallback —
the `js-reveal` / `js-enter` classes currently start hidden, so **if GSAP fails to
load from the CDN the entire page body is invisible.** Add a CSS fallback that makes
`.js-reveal` visible when JS or GSAP has not run.

---

## 4. Root-level files — create these, they did not exist on Squarespace

Place at the deploy root (alongside `index.html`):

- `robots.txt` — allow all, point at the sitemap.
- `sitemap.xml` — all 16 URLs, canonical form, with `lastmod`. Hand-written is fine
  at this size; regenerate when a page is added.
- `_redirects` — Netlify. Must cover: `/services/monthly-care → /services/web-design`
  (that page was merged and deleted), plus every Squarespace slug that differs from
  the new path. **Pull the real old-URL list from Squarespace's page settings and from
  Search Console → Pages before launch** — guessing here is how traffic gets lost.
  Also add `/*.dc.html` → clean-path redirects if you ever rename files.
- `404.html` — Netlify serves it automatically. Should reuse the nav/footer and link
  to `/`, `/services`, `/our-work`, `/contact`.
- `.nojekyll` — already in the export. ✅ (GitHub Pages only; harmless on Netlify.)
- `netlify.toml` — optional, for cache headers on `assets/` and `support.js`.

---

## 5. Media — the largest remaining gap

`assets/` holds seven raster files: six portfolio screenshots as **PNG** and one
portrait JPG.

- **Convert the six screenshots to `.webp`** (and the portrait). PNG screenshots at
  portfolio-grid size are the heaviest thing on the site and PNG is the wrong format
  for photographic UI captures.
- **Add `width` and `height` to every `<img>`** — the `/our-work` grid is 16:9 cards,
  so `width="1600" height="900"` plus `style="width:100%;height:auto"`. Without this
  the six-card grid is a guaranteed CLS penalty.
- **Alt text.** Each portfolio image needs a real description naming the client and
  the work, e.g. `alt="Endura Construction website homepage designed by WebMichigan"` —
  not `alt="Endura"` and not empty. The portrait needs
  `alt="Landon, web designer in Boyne City, Michigan"`. Decorative gradient divs
  already carry `aria-hidden="true"`. ✅
- **`loading="lazy"`** on the five below-fold portfolio images; eager on the first.

---

## 6. Favicons — none exist

Nothing in the project. Produce `favicon.svg`, `favicon-32x32.png`,
`apple-touch-icon.png` (180×180) from the existing star mark used in the logo, drop
them at the root, and add the three `<link rel="icon">` tags. These are identical on
every page, so they go in the same per-page head block as §2 (paste-once boilerplate).

---

## Summary: where each checklist item lives

| Checklist item | Location | Status today |
|---|---|---|
| Title, description, canonical | Per-page static `<head>` | ❌ absent on all 16 |
| Open Graph + Twitter tags | Per-page static `<head>` | ❌ absent on all 16 |
| Viewport, charset | Per-page `<head>` (boilerplate) | ✅ done |
| Favicon links | Per-page `<head>` (identical) | ❌ files don't exist |
| Single H1, heading order | Per page, in template | ✅ correct on all 16 |
| Semantic landmarks | Shared nav/footer + templates | 🟡 mostly, minor gaps |
| Page-specific JSON-LD | Per page, bottom of body | 🟡 exists except `/our-work` |
| Business JSON-LD | `SiteFooter.dc.html`, once | 🟡 needs `$199` price range |
| Alt text, `width`/`height`, webp | Per page, at each `<img>` | ❌ not done |
| robots.txt, sitemap.xml, `_redirects`, 404.html | Deploy root | ❌ don't exist |
| No-JS / CDN-failure visibility fallback | Shared `<helmet>` CSS | ❌ page is blank if GSAP fails |


---

## Implementation log — what was actually built

**Deploy folder:** `netlify-build/` — drag it into Netlify, or point Netlify at it as
the publish directory.

### URLs
Pages are flat files served at clean URLs by Netlify's asset pipeline:

`/` `/services` `/web-design` `/local-seo` `/free-demo` `/our-work` `/about`
`/faq` `/contact` and `/web-design-{boyne-city,boyne-falls,charlevoix,east-jordan,harbor-springs,petoskey,walloon-lake}`

Two URLs changed from Squarespace and are 301'd in `_redirects`:
`/services/web-design → /web-design` and `/services/local-seo → /local-seo`.
Flat files are required because the shared nav/footer components and `support.js`
resolve relative to the page URL; a nested path would 404 them.

`wm-motion.js` was taught the new clean slugs (a `SLUG` map in `keyOf`), so the
starfield page-travel transition still fires on every internal link.

### Per page (all 16)
`<title>`, `<meta name="description">`, canonical, robots (`max-image-preview:large`),
theme-color, full Open Graph set (incl. `og:image:width/height/alt`), Twitter
`summary_large_image`, four favicon links, and two JSON-LD blocks — the page-specific
graph plus the shared `ProfessionalService` + `WebSite` graph. All in the real static
`<head>`, above `<x-dc>`. `<html lang="en">` added.

`/our-work` got a new title, description, and a `CollectionPage` + `ItemList` graph
naming all six client sites.

### Structured data fixes
- `priceRange` → `$199-$599`; both `makesOffer` prices → 199 / 599.
- Placeholder `sameAs` entries (`GBP_URL`, `FACEBOOK_URL`…) **removed** — invalid URLs
  in schema are worse than none. Add them back once the real profile URLs exist.
- Every `favicon.ico` image reference in schema repointed at `/assets/og/default.jpg`.

### Media
- All six portfolio screenshots and the portrait converted PNG/JPG → **WebP**
  (e.g. Ryan's 449 kB, La Dolcé Vita 62 kB — the PNGs were multiples of that).
- Every `<img>` now carries `width`/`height` (kills CLS), `decoding="async"`, and
  `loading="lazy"` on the five below-fold cards; the first card is
  `loading="eager" fetchpriority="high"`.
- Alt text was already written on all seven images. ✅

### Root files
`robots.txt` (sitemap pointer + `Disallow` on the four component fragments),
`sitemap.xml` (16 URLs, weighted priorities), `_redirects` (changed paths, `.html` →
clean URL, common legacy Squarespace slugs), `netlify.toml` (`X-Robots-Tag: noindex`
on `*.dc.html`, 1-year immutable cache on `/assets`, security headers), `404.html`
(brand-matched, `noindex`, links to all main pages).

### Favicons — generated from the logo star
`favicon.svg`, `favicon-32x32.png`, `favicon-16x16.png`, `apple-touch-icon.png`
(180×180), plus `assets/og/default.jpg` (1200×630, starfield + wordmark + `$199` line).

---

## Two corrections to the audit above

1. **The "blank page if GSAP fails" risk was wrong.** Nothing is hidden by CSS — the
   reveals use `gsap.from()`, which animates *toward* the resting state, so content
   renders visible when GSAP never loads. The page-travel path that does set
   `opacity: 0` already has a 2.6 s restore timeout. No fallback CSS was needed.
2. **The portfolio cards were left as `<figure>`/`<figcaption>`, not `<article>`.**
   A captioned screenshot is exactly what `<figure>` is for; it is the more correct
   markup here, and each card's `<h2>` already gives the heading outline.

## Still needs you (cannot be generated)

- **The real old-URL list.** `_redirects` covers the paths I can infer. Before DNS
  cutover, export the slug list from Squarespace and Search Console → Pages, and add a
  301 line for anything missing.
- **Real `sameAs` URLs** for Google Business Profile, Facebook, LinkedIn.
- **Per-page OG images** if you want them. Every page currently shares
  `/assets/og/default.jpg`, which is correct and safe; unique per-page images are a
  nice-to-have.
- **Submit `sitemap.xml`** in Search Console after launch, and update its `lastmod`
  when pages change.
