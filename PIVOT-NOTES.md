# Statewide pivot — Aug 13, 2026

Northern Michigan / Boyne City positioning retired. The site now targets contractors and
small businesses statewide.

## What changed

- **Headers and body copy.** Home H1 is now "Web design for Michigan small businesses".
  Local SEO H1 is "Local SEO for Michigan small businesses". About, Contact, Our Work and
  the footer no longer reference Boyne City or Northern Michigan in visible copy.
- **Pricing.** Essentials $199/mo (unchanged), Maximum $599 -> **$499**/mo. Feature lists
  untouched on both tiers. Updated in visible copy, meta descriptions, `priceRange`,
  every `UnitPriceSpecification`, and the Local SEO `AggregateOffer` highPrice.
- **Location pages retired.** All 7 `/web-design-<town>` pages deleted, along with
  `TownPage.dc.html` and `towns.js`. Replaced by one coverage page: `/michigan`
  ("Where We Work"), linked from the footer.
- **Metadata and schema.** Titles, descriptions, OG/Twitter tags, WebPage, Service and
  WebSite nodes rewritten statewide. `areaServed` changed from a City/County array plus
  a "Northern Michigan" Place to a single `State` node for Michigan on every page.
- **NAP.** `addressLocality: "Boyne City"` deliberately **kept** in the
  ProfessionalService graph so the Google Business Profile still matches. It appears
  nowhere in visible copy.
- **Infrastructure.** `_redirects` 301s all 14 retired town URLs (clean + .html) to
  `/michigan`. `sitemap.xml` drops the 7 town URLs, adds `/michigan`, lastmod bumped.
  `wm-motion.js` starfield coordinates: 7 Town keys replaced with one `Michigan` node.

## For Claude Code

Inline `<!-- CLAUDE-CODE ... -->` markers are placed at each site. Summary:

1. **Dedupe the JSON-LD.** The `#business` ProfessionalService graph is copy-pasted into
   all 10 pages. Extract to a shared partial or build-time include.
2. **Validate schema.** Run every page through the Rich Results Test after the
   `areaServed` array -> State rewrite.
3. **Redirect sweep.** Pull indexed URLs from Search Console and add a 301 for anything
   not already in `_redirects`. No retired town URL should 404.
4. **Our Work eyebrows.** Two portfolio cards still label real client towns (Petoskey,
   Charlevoix) and one project description says "in Michigan". These are facts, not
   positioning — decide whether to scrub them.
5. **Nav.** `/michigan` is linked from the footer only. Consider adding it to the
   Services submenu in `SiteNav.dc.html` if it should be primary navigation.
6. **Open items from before the pivot** (still outstanding): real `sameAs` URLs for
   Google Business, Facebook and LinkedIn; Netlify staging test of 404 + redirect behavior.
