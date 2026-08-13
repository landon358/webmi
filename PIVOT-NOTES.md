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

---

# Team page + legal pages — Aug 13, 2026

## About page

Restructured from a single-person hero to a team page. H1 is now "The people you'll be
working with." Two stacked profile rows, portrait beside text: Landon (Design & Development) first,
then Mark Morris (SEO & Marketing). Stats row and CTA below both, CTA copy is now "Work with us."

- Mark's portrait: `assets/mark-portrait-small.webp` (840x1050, cropped 4:5 from the
  supplied square headshot, WebP q82, 66 KB). Both portraits render at `aspect-ratio: 4/5; object-fit: cover`.
- Schema: `AboutPage.mainEntity` is now an array; added a `Person` node `#mark`
  (jobTitle "SEO & Marketing", knowsAbout SEO / local SEO / GBP / marketing / advertising).
- Title and description updated to reference the team rather than one person.

## Legal pages (new)

`Privacy.dc.html` -> `/privacy` and `Terms.dc.html` -> `/terms`, written for
**Web Michigan LLC**, a Michigan limited liability company.

- Privacy: 13 sections — data collected, automatic collection, cookies, use, sharing,
  data on client sites, retention, security, your choices, children, third-party links,
  changes, contact.
- Terms: 15 sections — services, free demo, fees and billing ($199–$499/mo, no upfront fee,
  billing starts on an agreed date before or after launch), buyouts and ending service, client responsibilities, ownership,
  SEO results disclaimer, third-party services, uptime, warranty disclaimer and liability
  cap, indemnification, termination, Michigan governing law, changes, contact.
- Both linked from the footer bottom bar. Copyright line is now "© 2026 Web Michigan LLC".
- Added to `sitemap.xml` (priority 0.2) and `_redirects` (`.html` forms plus
  `/privacy-policy`, `/terms-of-service`, `/terms-and-conditions`).
- Starfield coordinates added for both pages in `wm-motion.js`.

## ⚠ For Claude Code / counsel

**These documents have not been reviewed by an attorney.** They are a solid working
baseline drafted from how the business actually operates, but they are not legal advice.
Inline `<!-- CLAUDE-CODE (legal pages) -->` markers list the specifics:

1. Attorney review before relying on them.
2. Add the LLC's registered mailing address to the contact blocks if compliance requires it.
3. Name the actual analytics / payment / cookie providers in privacy section 3 once chosen.
4. Verify the fee terms match the real signed service agreement, especially the 15-day
   suspension window, the buyout formula in section 4, and the 3-month liability cap.
   The buyout is described as "based on lease term and remaining duration" — if there is
   a fixed formula or multiplier, state it explicitly.
5. Decide whether `/privacy` and `/terms` should also appear in the main nav, not just
   the footer.
