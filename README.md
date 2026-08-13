# WebMichigan — webmi.org

Static site. No build step, no dependencies. Netlify publishes this directory as-is.

## Deploy

Connect the repo to Netlify. `netlify.toml` sets `publish = "."`, so there is nothing
to configure — no build command, no Node version. Push to the default branch to deploy.

Local preview: any static server from this directory.

    npx serve .

## Structure

    index.html            Home
    services.html         Pricing / plans
    web-design.html       Web design, hosting & support
    local-seo.html        Local SEO & Google Business Profile
    our-work.html         Portfolio
    michigan.html         "Where we work" — statewide coverage page
    about.html            About
    faq.html              FAQ
    contact.html          Contact
    free-demo.html        Free demo request
    privacy.html          Privacy Policy
    terms.html            Terms & Conditions
    404.html              Not found

    SiteNav.dc.html       Shared nav component
    SiteFooter.dc.html    Shared footer component
    OrientNav.dc.html     Orientation nav

    support.js            Component runtime (required by every page)
    starfield.js          Hero starfield canvas
    wm-motion.js          Scroll reveals + page-transition coordinates

    _redirects            301 map (legacy Squarespace + retired town pages)
    sitemap.xml           12 URLs
    robots.txt
    netlify.toml          Publish dir, cache headers, noindex on .dc.html

## Notes

Pages share nav and footer via `<dc-import>`, resolved at runtime by `support.js` from the
component filename. Components must stay at the repo root beside the pages that import them.
`netlify.toml` sends `X-Robots-Tag: noindex` for `*.dc.html` so the raw components never
get indexed.

Clean URLs come from Netlify's default `.html` stripping. Internal links are written
without the extension (`/michigan`, not `/michigan.html`); `_redirects` 301s the
`.html` forms.

Pricing lives in visible copy **and** JSON-LD on several pages. Changing a price means
updating both. See `PIVOT-NOTES.md`.

## Content ownership notes

Two things are duplicated by design and must be changed in both places:

- **Prices** appear in visible copy *and* in JSON-LD (`priceRange`, every
  `UnitPriceSpecification`). Current: Essentials $199/mo, Maximum $499/mo.
- **The `#business` JSON-LD graph** is repeated verbatim on all 12 pages.
  `addressLocality` is intentionally "Boyne City" to match the Google Business Profile —
  it is deliberately absent from all visible copy. Do not surface it in the DOM.

## Open items

See `PIVOT-NOTES.md` (statewide pivot changelog + handoff list) and `SEO-HANDOFF.md`.
Inline `<!-- CLAUDE-CODE -->` markers flag the spots that want cleanup — chiefly the
`#business` JSON-LD graph, which is duplicated verbatim across all 10 pages.
