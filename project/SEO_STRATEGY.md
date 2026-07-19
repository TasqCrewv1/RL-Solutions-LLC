# SEO & Lead Generation Implementation Blueprint
## General Contractor — Delaware & Pennsylvania

> **How to use this document:** Each section below (PROMPT 1–10) is a self-contained implementation prompt. Copy a prompt into Bolt and let it execute against the codebase. Run them in order — earlier prompts establish infrastructure that later prompts depend on. No prompt requires redesigning the site; each optimizes, adds, or restructures existing surfaces.
>
> **Guiding principle throughout:** Prioritize high-intent searches ("kitchen remodeling contractor Wilmington DE") over high-volume vanity terms ("kitchen ideas"). Every visitor the strategy targets is someone closer to hiring.

---

## PROMPT 1 — Technical SEO

**Objective:** Build a crawl-efficient, fast, accessible, schema-rich foundation that lets Google understand every page and every service.

Implement the following technical SEO work on the existing General Contractor website (Vite + React, Supabase backend). Do not redesign the site — extend and optimize what exists.

### 1. Site architecture
Establish a flat, logical, 3-level-deep hierarchy:

```
Home (/)
├── Services (hub)
│   ├── /services/decks
│   ├── /services/fences
│   ├── /services/kitchen-remodeling
│   ├── /services/bathroom-remodeling
│   ├── /services/ramps
│   ├── /services/accessibility-modifications
│   ├── /services/porches
│   ├── /services/patios
│   ├── /services/general-remodeling
│   ├── /services/repairs
│   ├── /services/roofing
│   ├── /services/siding
│   ├── /services/windows
│   └── /services/custom-projects
├── Locations (hub)
│   ├── /locations/wilmington-de
│   ├── /locations/newark-de
│   ├── /locations/dover-de
│   ├── /locations/middletown-de
│   ├── /locations/[pa-city]...
│   └── /locations/[pa-city]...
├── Project Estimator (/estimate)
├── Gallery (/gallery)
├── Testimonials (/testimonials)
├── About (/about)
├── FAQ (/faq)
├── Blog/Resource Center (/blog) — topic clusters
│   └── /blog/[slug]
├── Service Areas (/service-areas) — overview hub
└── Legal (footer): Privacy, Terms, Cookie Policy
```

No important page should be more than 3 clicks from the homepage. Add a dedicated `/services` hub page that links to every service page (the current site links services from nav but has no consolidated hub).

### 2. URL structure
- Lowercase, hyphen-separated, keyword-descriptive, no dates, no query params for indexable content.
- Service pages: `/services/{service-slug}` (e.g., `/services/kitchen-remodeling`).
- Location pages: `/locations/{city}-{state}` (e.g., `/locations/wilmington-de`).
- Blog: `/blog/{slug}`.
- Keep URLs stable forever — no versioning, no rewrites that change the visible URL.
- Ensure React Router routes exist for every URL in the sitemap. No 404s for listed URLs.

### 3. Internal linking
- Every service page links to: (a) 2–3 related services, (b) the Project Estimator, (c) the relevant location page(s), (d) 1–2 related blog articles.
- Every location page links to: (a) all services offered there, (b) the estimator, (c) neighboring location pages.
- Every blog article links to: (a) the parent service page, (b) the estimator, (c) 2 related articles in the same cluster.
- Add contextual in-body links (not just footer/nav links) — Google weights editorial links more.
- The homepage should link to top services, the estimator (prominent), and a "Service Areas" section.
- Implement a "Related Services" component at the bottom of every service page.

### 4. Navigation
- Primary nav: Services (dropdown/mega-menu of all services), Locations, Estimator, Gallery, About, Contact.
- Sticky header on scroll. Mobile: hamburger with the same structure, plus a persistent "Get Free Estimate" button.
- Footer: full service list, full location list, legal links, NAP (Name/Address/Phone) block, license number.

### 5. Breadcrumbs
- Implement breadcrumbs on every page except the homepage.
- Path: Home > [Section] > [Page].
- Render as visible UI AND as `BreadcrumbList` JSON-LD schema (see Schema section).
- Example: Home > Services > Kitchen Remodeling. Home > Locations > Wilmington, DE.

### 6. XML Sitemap
- Generate a dynamic `sitemap.xml` that includes: homepage, all service pages, all location pages, all blog articles, estimator, gallery, testimonials, about, FAQ, service-areas.
- Each URL entry: `<lastmod>` (from content updated date), `<changefreq>`, `<priority>` (home 1.0, services 0.8, locations 0.8, estimator 0.9, blog 0.6).
- Generate an image sitemap (`sitemap-images.xml`) for gallery and before/after photos with captions/titles.
- Reference both in `robots.txt` and register in Google Search Console.
- Auto-regenerate on content changes (Supabase trigger or build step).

### 7. Robots.txt
```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/
Sitemap: https://www.[domain]/sitemap.xml
Sitemap: https://www.[domain]/sitemap-images.xml
```
- Block `/admin` and any private/edge-function routes.
- Do NOT block CSS, JS, or image assets — Google needs to render.

### 8. Canonical URLs
- Every page outputs `<link rel="canonical" href="https://www.[domain][path]">` matching its exact URL.
- No self-referencing canonical issues. No conflicting canonicals from query strings.
- Ensure trailing-slash consistency site-wide (pick one convention; redirect the other with 301).

### 9. Schema.org (JSON-LD)
Implement structured data on every relevant page. All JSON-LD must pass Google's Rich Results Test.

**A. LocalBusiness / GeneralContractor (site-wide, on every page `<head>`)**
```json
{
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "name": "[Business Name]",
  "image": "https://www.[domain]/logo.png",
  "@id": "https://www.[domain]#business",
  "url": "https://www.[domain]",
  "telephone": "[phone]",
  "priceRange": "$$",
  "address": { "@type": "PostalAddress", ... },
  "geo": { "@type": "GeoCoordinates", ... },
  "areaServed": [ { "@type": "State", "name": "Delaware" }, { "@type": "State", "name": "Pennsylvania" } ],
  "openingHoursSpecification": [...],
  "sameAs": [social profiles],
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "[n]" },
  "hasOfferCatalog": { services... }
}
```

**B. Service schema (on each service page)**
- `@type: Service`, name, description, provider (ref the LocalBusiness @id), areaServed, offers (price range), hasOfferCatalog.

**C. FAQPage schema (on FAQ page and every service page FAQ section)**
- Each FAQ question/answer pair as a `Question`/`Answer` entity.

**D. Review + AggregateRating schema (on testimonials page and service pages)**
- Individual `Review` entries with author, reviewBody, reviewRating. Only use real reviews.

**E. BreadcrumbList schema (on every non-home page)**

**F. Organization schema (site-wide)** — for Knowledge Panel eligibility.

**G. ImageObject schema** — for gallery/before-after images with caption and contentUrl.

**H. Article schema (on blog posts)** — `@type: Article` or `BlogPosting` with headline, datePublished, author, image.

### 10. Image optimization
- Serve all images as WebP (or AVIF) with JPEG/PNG fallback.
- Lazy-load all below-the-fold images (`loading="lazy"`).
- Set explicit `width`/`height` attributes to prevent CLS.
- Responsive `srcset` for multiple breakpoints.
- Descriptive filenames: `kitchen-remodel-wilmington-de-before.jpg` (not `IMG_4821.jpg`).
- Meaningful `alt` text describing the image (not keyword-stuffed).
- Compress to <200KB for hero images, <100KB for gallery thumbs.
- Generate an image sitemap.

### 11. Core Web Vitals
- **LCP < 2.5s:** preload hero image, use CDN, efficient cache headers, no render-blocking JS/CSS, system font or preloaded web font with `font-display: swap`.
- **CLS < 0.1:** reserve image/layout boxes, no injected banners, no async font swaps without sizing.
- **INP < 200ms:** minimize main-thread work, defer non-critical JS, avoid layout thrashing, debounce handlers.
- Vite code-splitting per route (already in place); ensure large components (ThreePreview, estimator) are lazy-loaded.
- Preconnect to Supabase and any third-party origins.

### 12. Accessibility (WCAG 2.1 AA)
- Semantic HTML5 landmarks (header, nav, main, footer, aside).
- Skip-to-content link (SkipLink component already exists — verify it works).
- All interactive elements keyboard-accessible with visible focus states.
- Color contrast 4.5:1 for body text, 3:1 for large text.
- ARIA labels on icon-only buttons.
- Form fields have associated `<label>` elements.
- Error states announced (aria-live).

### 13. Mobile-first design
- Verify every page is fully responsive from 320px up.
- Touch targets ≥44px.
- No horizontal scroll at any breakpoint.
- Mobile sticky CTA (MobileStickyCTA component exists — verify it shows on all service/location pages, not just home).
- Test Google's Mobile-Friendly Test for every key page.

### 14. Indexability
- `meta robots` = `index, follow` on all public pages.
- Noindex `/admin`, cookie settings, and any utility pages.
- `hreflang` not needed (single language, single region).
- Ensure server returns 200 for indexable URLs, 301 for redirected, 404 for missing (no soft 404s).
- Submit sitemap and request indexing for key pages in Google Search Console.

### Deliverables for this prompt
- Dynamic sitemap generation (route + build step).
- Updated robots.txt.
- Canonical + meta robots on all pages.
- Full JSON-LD schema implementation.
- Breadcrumbs component + schema.
- Image optimization pipeline.
- Core Web Vitals fixes.
- Accessibility audit fixes.
- `/services` hub page.

---

## PROMPT 2 — Google Business Profile Optimization

**Objective:** Maximize local pack visibility and convert GBP viewers into website visitors and leads. This is the highest-ROI local SEO channel for a contractor.

Create a complete Google Business Profile (GBP) optimization strategy and implementation checklist for a General Contractor serving Delaware and Pennsylvania. Do not write code — produce the strategy, templates, and a weekly operating cadence the business can follow. Where helpful, build a lightweight Supabase-backed admin tool to manage review responses and post scheduling.

### 1. Primary and secondary categories
- **Primary category:** `General Contractor` (most important — drives local pack relevance).
- **Secondary categories (add all that apply):** `Kitchen Remodeler`, `Bathroom Remodeler`, `Deck Builder`, `Fence Contractor`, `Roofing Contractor`, `Siding Contractor`, `Window Installation Service`, `Carpenter`, `Handyman/Handywoman/Handyperson`, `Accessibility Equipment Supplier` (for ramps).
- Do NOT pick categories the business cannot prove it serves. Accuracy matters more than volume.

### 2. Services (GBP Services section)
Add a service entry for every construction service, each with:
- Service name (e.g., "Kitchen Remodeling in Wilmington, DE")
- Price range or "Custom pricing — free estimate" (GBP allows descriptive price; avoid hard quotes)
- Detailed description (300 chars) that naturally includes the city + service + a benefit
- Link each service to the matching website service page (`/services/kitchen-remodeling`)

Map every website service to a GBP service.

### 3. Business description (750 char max)
Write a description that leads with the primary high-intent phrase, states the service area, lists top services, and ends with a CTA. Example structure:
- Line 1: Business name + primary service + location.
- Lines 2–4: Top services + what sets them apart (licensed, insured, 5-star).
- Line 5: Service area (DE + PA counties/cities).
- Line 6: CTA → "Visit our website for a free online project estimate."
- No links, no ALL CAPS, no keyword stuffing.

### 4. Review strategy
- **Generate:** After every completed project, send a personalized review request via SMS + email with a direct GBP review link. Provide a pre-filled 5-star link.
- **Cadence:** Aim for 2–4 new reviews per month minimum. Steady, natural review velocity beats bursts.
- **Diversify:** Ask for reviews that mention the specific service (e.g., "mention the kitchen remodel") — service-specific review content boosts service-page rankings.
- **Photo reviews:** Encourage customers to attach before/after photos; GBP weighs photo reviews higher.
- **Incentivize ethically:** Do NOT offer discounts for reviews (policy violation). Do follow up promptly after final walkthrough while satisfaction is peak.

### 5. Review response templates
Provide ready-to-use templates (stored in Supabase for the admin to pull from). Never use identical wording for every review — vary them.

**5-star template:**
> "Thank you, [Name]! It was a pleasure working on your [project type] in [city]. Enjoy the new [feature] — let us know if you ever need anything else. — Jeremiah"

**4-star template:**
> "Thanks, [Name]! Glad you're happy with the [project]. We appreciate the feedback on [specific point] and will keep that in mind. Give us a call anytime. — Jeremiah"

**1–3 star template (diplomacy first):**
> "We're sorry to hear this, [Name]. This isn't the standard we hold ourselves to. Please reach out to us directly at [phone] so we can make this right. — Jeremiah"

Respond to every review within 48 hours. Build a Supabase admin view that surfaces unresponded reviews.

### 6. Photo strategy
GBP posts with photos get significantly more engagement. Upload:
- **Cover photo:** professional logo/brand image.
- **Logo photo.**
- **Exterior/team photo:** truck + crew in branded gear.
- **Before/after pairs:** at least 2 per service category, uploaded as separate photos with descriptive captions.
- **In-progress photos:** showing craftsmanship (framing, tile layout, etc.).
- **Finished project photos:** 10+ minimum, updated monthly.
- Cadence: add 2–4 new photos per month. Geotagged where appropriate.

### 7. Weekly Google Posts
Post once per week (minimum). Each post:
- Type: "Update" or "Offer" (use "Offer" for free-estimate promotions).
- Image: real project photo (not stock).
- Title: high-intent local phrase (e.g., "Deck Building in Wilmington, DE — Free Estimates").
- Body: 1–2 sentences on the service + CTA.
- CTA button: "Learn More" or "Book" → link to the matching service page or the estimator.
- Rotate through services so each gets posted ~every 3 months.

Provide a 12-week post rotation schedule.

### 8. Q&A strategy
- Seed 5–10 Q&A pairs proactively (common homeowner questions answered helpfully and honestly).
- Questions to seed: "Do you offer free estimates?", "What areas do you serve?", "Are you licensed and insured?", "Do you handle permits?", "What's your typical kitchen remodel timeline?", "Do you offer financing?"
- Each answer: helpful, honest, and links (if allowed) to the relevant website page.
- Monitor weekly and answer any new customer questions within 24 hours.

### 9. Service areas
- Add every city/county served in DE and PA.
- Do NOT list areas not actually served — GBP may penalize inflated service areas.
- Keep service areas consistent with the website location pages (NAP + service area parity).

### 10. Business hours
- Set accurate hours. If hours vary seasonally, update them (see Seasonal updates).
- Add "by appointment" where appropriate for evenings/weekends.

### 11. Seasonal updates
- Update GBP hours for seasonal shifts (e.g., shorter winter hours).
- Post seasonal content: "Spring deck season — book now," "Winter emergency repairs," "Gutter/roof prep before storm season."
- Update the cover photo seasonally.

### 12. Trust signals on GBP
- License number in the description and as a GBP attribute if available.
- "Women-led" / "Veteran-led" / "Family-owned" attributes if applicable.
- "Offers estimates," "Accepts credit cards" attributes.
- Link to website, and ensure website has matching trust signals (Prompt 8).

### Deliverables for this prompt
- GBP configuration checklist (categories, services, description, hours, service areas).
- Review generation SOP + templates.
- Photo upload plan with captions.
- 12-week Google Post rotation.
- Seeded Q&A list.
- Optional Supabase admin module for review-response management and post scheduling.

---

## PROMPT 3 — Service Page SEO

**Objective:** Create one dedicated, high-ranking, high-converting landing page per construction service. Each page targets a high-intent local service keyword.

Create an SEO-optimized service page template and generate all service pages for the General Contractor. Each of these services gets its own page: Decks, Fences, Kitchen Remodeling, Bathroom Remodeling, Ramps, Accessibility Modifications, Porches, Patios, General Remodeling, Repairs, Roofing, Siding, Windows, Custom Projects.

Do not redesign — build out dedicated service pages following the structure below. Use the existing components (Button, ContactModal, ThreePreview where relevant) and Supabase for any data.

### Recommended page structure (top to bottom)

**1. SEO metadata**
- `<title>`: `{Service} in {Primary City}, DE & PA | [Business Name]` (≤60 chars).
- `meta description`: high-intent, benefit-driven, includes service + location + "free estimate" (≤155 chars).
- Canonical, og:title, og:description, og:image (real project photo), Twitter card.
- JSON-LD: Service, FAQPage, AggregateRating, BreadcrumbList.

**2. H1 headline**
- Format: `{Service} Contractor in {City}, DE & PA`
- One H1 per page. Clear, location-modified, high-intent.

**3. Introduction (100–150 words)**
- Establish relevance: what the service is, who it's for, why this contractor for DE/PA homeowners.
- Include the primary keyword in the first 100 words (naturally).
- Include a one-line trust signal (licensed, insured, X years, 5-star reviews).

**4. Benefits section (4–6 items)**
- Why this service adds value (e.g., for decks: outdoor living space, home value, low maintenance).
- Use H2 for the section, H3 or bullet items for each benefit.
- Each benefit links contextually to a related blog article (internal link).

**5. Process section (4–6 steps)**
- Numbered or step-based: Free Estimate → Design/Plan → Materials Selection → Build → Final Walkthrough → Warranty.
- Use H2 + ordered list or step cards.
- Each step can link to the matching estimator step or a blog article.

**6. Materials section**
- Common materials used (e.g., for decks: pressure-treated, cedar, composite, PVC).
- Brief pros/cons of each.
- Links to related material-focused blog articles if any.

**7. Frequently Asked Questions (4–8 questions)**
- Real homeowner questions (cost ranges, timelines, permits, warranties, maintenance).
- Each Q as H3, answer 40–80 words.
- Wrapped in FAQPage JSON-LD for rich-result eligibility.
- Source questions from the existing FAQ page and estimator question bank.

**8. Before & After gallery**
- Pull relevant before/after pairs from the gallery (Supabase or content).
- Image schema (ImageObject) on each.
- Descriptive alt text + filenames.
- Link to the full gallery.

**9. Testimonials**
- 2–3 reviews specific to this service (pull from testimonials).
- Review JSON-LD per testimonial.
- Link to full testimonials page.

**10. Estimate CTA (high-visibility, mid-page + bottom)**
- Mid-page CTA card: "Get a free {service} estimate in 5 minutes."
- Bottom CTA section: button → `/estimate` with the service pre-selected.
- Sticky mobile CTA on this page.

**11. Related services**
- 3–4 related services with thumbnail + one-line description → internal links.
- Example: Kitchen Remodeling page links to Bathroom Remodeling, Custom Projects, General Remodeling, Windows.

**12. Internal links**
- To the Project Estimator (pre-filled with this service).
- To 1–2 location pages (primary service cities).
- To the parent `/services` hub.
- To 2–3 blog articles in this service's content cluster.
- To the gallery (filtered by service if possible).

### Content guidelines (per page)
- 800–1,200 words minimum per service page.
- Use the service's real pricing ranges from the estimator config (as ranges, not hard quotes).
- Mention 2–3 actual service cities naturally (Wilmington, Newark, West Chester, etc.).
- No keyword stuffing — natural, helpful, expert-toned content.
- Write for the homeowner who is ready to hire, not the one browsing for ideas.

### Deliverables for this prompt
- A reusable ServicePage layout component.
- All 14 service pages populated with the structure above.
- Per-page metadata, schema, and internal linking.
- A pre-fill mechanism so the "Estimate" CTA passes `?service={slug}` to the estimator.

---

## PROMPT 4 — Local SEO Strategy

**Objective:** Rank for location-modified high-intent searches across the Delaware and Pennsylvania service area, without triggering duplicate-content penalties.

Create a location-page strategy and local SEO implementation plan for a General Contractor serving Delaware and Pennsylvania. Do not write code — produce the strategy, page template spec, and citation/backlink plan. Build location pages and a location data model in Supabase.

### 1. Target locations
**Delaware (primary state):**
- Wilmington, Newark, Dover, Middletown, Smyrna, Bear, Hockessin, Millsboro, Lewes, Rehoboth Beach, Seaford, Georgetown, Milford, Harrington, Camden.
- Counties: New Castle, Kent, Sussex.

**Pennsylvania (secondary state):**
- West Chester, Downingtown, Exton, Coatesville, Kennett Square, Chadds Ford, Media, Aston, Brookhaven, Chester, Springfield, Lansdowne, Upper Darby, Phoenixville, Malvern, Paoli, Thorndale, Parkesburg, Oxford, Avondale, West Grove.
- Counties: Chester, Delaware, Montgomery (whichever the business actually serves).

Only build pages for cities the business genuinely serves. Confirm the real service radius before generating the full list.

### 2. Location page structure (one page per city)
**Avoid duplicate content** — each page must have unique, location-specific content:

**A. Unique intro (150+ words):** Mention the city by name, local landmarks/neighborhoods, the contractor's history serving that area, and a local project reference if available. Never reuse the same paragraph across cities with only the city name swapped.

**B. Services offered in [City]:** List the services available there with links to service pages (e.g., "Kitchen Remodeling in Wilmington"). One sentence per service referencing the city.

**C. Map embed:** Google Maps embed centered on the city with the service-area polygon. Unique per page.

**D. Local projects:** Before/after photos from projects in or near that city. If no projects yet, use the nearest available and reference proximity honestly ("serving the Wilmington area from our [base city] location").

**E. Local testimonials:** Reviews from customers in that city/area (filter by ZIP if possible).

**F. Local FAQ (3–5 Qs):** "How far do you travel for projects in [City]?", "Do you pull permits in [City/County]?", "What's the typical [service] cost in [City]?" Answer honestly with local nuance.

**G. NAP block:** Consistent name/address/phone, formatted identically site-wide.

**H. CTA:** "Get a free estimate for your [City] project" → estimator pre-filled with location.

**I. Internal links:** To neighboring location pages, to all service pages, to the estimator.

### 3. Avoiding duplicate content
- Never duplicate a service page's body text on a location page. The location page is about *local presence*, the service page is about *the service*.
- Use a "Services we offer in [City]" list that *links* to service pages rather than copying their content.
- Each location page intro, FAQ, and testimonials must be unique.
- Use canonical tags (each location page canonicals to itself).
- Consider a "city + service" matrix only for the top 3–5 cities × top services (e.g., `/locations/wilmington-de/kitchen-remodeling`) if there's enough unique content — otherwise, link from the location page to the service page and vice versa. Do not auto-generate thin combo pages.

### 4. Local content
- "Neighborhood spotlight" articles for key areas.
- Seasonal local content ("Preparing your Wilmington home's deck for spring," "Chester County roof checks before winter").
- Local building-permit primers per county (genuine value, high local intent).
- Storm-season repair content for the DE/PA coast and inland.

### 5. Local backlinks
- **Chambers of Commerce:** Delaware State Chamber, New Castle County Chamber, Chester County Chamber, Delaware County Chamber — join and get listed.
- **BBB Accreditation** — BBB of Delaware, BBB of Greater PA.
- **HomeAdvisor / Angi / Houzz** profiles (noindex the duplicate content, but earn the citations/backlinks).
- **Local publications:** Delaware Online, The News Journal, Main Line Today, Chester County Press — pitch project features or expert quotes.
- **Suppliers & partners:** lumber yards, kitchen/bath showrooms — ask for a partner page link.
- **Local charities/sponsorships:** Little League, community center — sponsor and earn a backlink.
- **Industry associations:** NARI (National Association of the Remodeling Industry), NAHB local chapters.

### 6. Local authority building
- Get featured as a local expert: offer quotes to local journalists (HARO / local news).
- Host or sponsor a local home-improvement workshop.
- Publish case studies with named neighborhoods (with client permission).
- Earn local press links from project features.

### 7. Citation consistency (NAP)
- Ensure Name, Address, Phone (NAP) are byte-for-byte identical across: website footer, GBP, Yelp, Angi, Houzz, Facebook, BBB, HomeAdvisor, Bing Places, Apple Maps.
- Pick one canonical phone number and one address format and never vary it.
- Audit existing citations quarterly; fix any drift.
- Use a citation management tool (BrightLocal, Yext, or Whitespark) if scale warrants.

### Deliverables for this prompt
- Location page template + spec.
- Supabase `locations` table with city, state, county, ZIP list, intro, local FAQ, map coordinates, related projects.
- Unique content plan for each city page.
- Citation audit checklist.
- Local backlink outreach list with priorities.

---

## PROMPT 5 — Content Strategy

**Objective:** Build topic clusters that answer real homeowner questions, establish topical authority, and funnel readers toward the Project Estimator. Prioritize high-intent, estimate-adjacent topics.

Create a content strategy and editorial calendar for the General Contractor website. Do not write code — produce the cluster map, article list (with target keywords and intent), and a publishing cadence. Build a `blog_posts` Supabase table and an article template page.

### 1. Topic clusters (one per major service)
Build clusters around: Decks, Fences, Kitchen Remodeling, Bathroom Remodeling, Roofing, Siding, Windows, Accessibility/Ramps, Patios/Porches, General Remodeling, Repairs.

Each cluster has:
- **Pillar page:** a comprehensive guide (2,000–3,000 words) on the broad service topic, hosted on the blog, linking to all cluster articles AND to the matching service page.
- **Cluster articles:** 5–8 supporting articles answering specific homeowner questions, each linking to the pillar, the service page, and the estimator.

### 2. High-intent article priorities (examples per cluster)

**Kitchen Remodeling cluster:**
1. "How Much Does a Kitchen Remodel Cost in Delaware? [Year]" — cost transparency, leads to estimator.
2. "Kitchen Remodel Timeline: What to Expect in [Region]" — sets expectations, builds trust.
3. "Should You Replace or Reface Kitchen Cabinets?" — decision-help, links to estimator.
4. "Open Concept Kitchen: Is It Worth It for [Year]?" — trend + value.
5. "Kitchen Remodeling Permits in New Castle County, DE" — local, high-intent.
6. "Quartz vs. Granite vs. Marble Countertops: A Contractor's Honest Take" — material guide.

**Deck cluster:**
1. "Deck Cost Per Square Foot in DE & PA ([Year])" — pricing.
2. "Composite vs. Wood Decking: Real Long-Term Costs."
3. "How High Can a Deck Be Without a Permit in Delaware?" — local code.
4. "Deck Building Timeline: From Estimate to Final Inspection."

**Bathroom cluster:**
1. "Bathroom Remodel Cost in Wilmington, DE ([Year])."
2. "Walk-In Shower vs. Tub: What Adds More Value?"
3. "Small Bathroom Remodel Ideas That Actually Work."

**Roofing cluster:**
1. "How Much Does a Roof Replacement Cost in Delaware?"
2. "Signs You Need a Roof Replacement (Homeowner Checklist)."
3. "How Long Do Roofs Last in PA & DE Climate?"

**Fence cluster:**
1. "Fence Installation Cost Per Linear Foot ([Year])."
2. "Wood vs. Vinyl vs. Aluminum Fencing: Pros & Cons."
3. "Fence Height Rules in Delaware and Pennsylvania."

**Accessibility cluster:**
1. "ADA Ramp Slope and Length Calculator for Homeowners."
2. "How to Make a Bathroom Accessible for Aging in Place."
3. "Medicaid Waivers for Home Accessibility Modifications in DE."

### 3. Content principles
- **Answer the question first.** The first paragraph directly answers the searcher's question (featured-snippet friendly).
- **Be genuinely useful.** Real numbers, real timelines, real local references.
- **Lead to the estimator.** Every article has 2 contextual CTAs to `/estimate` (mid-article + end).
- **Update annually.** Cost articles get a [Year] refresh — high search volume, high intent.
- **Use real photos** from the gallery, with alt text and image schema.
- **Target featured snippets** with concise Q&A format and tables for cost comparisons.

### 4. Publishing cadence
- Months 1–3: 2 articles/week (build the foundation fast — prioritize cost/permit/timeline articles).
- Months 4–6: 1 article/week.
- Months 7–12: 1–2 articles/week, plus refresh older high-traffic articles.
- Publish on a consistent day; share each new article on GBP (as a post) and social.

### 5. Metadata & schema per article
- `<title>`: `{Question} | [Business Name]` (high-intent question phrasing).
- Meta description: answer the question in 155 chars + "free estimate" CTA.
- `BlogPosting` JSON-LD with datePublished, dateModified, author, image.
- Internal links: pillar, service page, estimator, 2 cluster siblings.

### Deliverables for this prompt
- Topic cluster map (pillar + cluster articles per service).
- Article list with target keyword, search intent, target cluster, and CTA placement.
- Supabase `blog_posts` table schema + article page template.
- Editorial calendar (12 months).

---

## PROMPT 6 — Conversion Optimization

**Objective:** Turn more visitors into estimate submissions and phone calls. Reduce friction at every step. The Project Estimator is the primary conversion engine.

Audit and optimize the General Contractor website for lead conversion. Do not redesign — improve CTAs, forms, trust placement, and the estimate flow. Use Supabase for lead capture (already in place) and track conversion events.

### 1. Call-to-action placement
- **Above the fold on every page:** a visible "Get Free Estimate" or "Call Now" button.
- **Mid-page CTA cards** on long pages (service pages, blog articles): a card linking to `/estimate` with the service/location pre-filled.
- **End-of-page CTA section** on every page.
- **Sticky mobile CTA** (MobileStickyCTA exists — ensure it appears on every page, showing "Call" + "Estimate" buttons).
- **Sticky desktop header CTA:** persistent "Free Estimate" button in the nav.

### 2. Buttons
- High-contrast, accessible color (meets 4.5:1 contrast on the button + button-text).
- Large enough on mobile (≥48px tall).
- Action-oriented copy: "Get My Free Estimate," "Call Jeremiah Now," "See Kitchen Examples" — not "Submit" or "Click Here."
- Hover/focus states with subtle animation.
- One primary CTA per view (secondary actions styled as ghost/outline buttons).

### 3. Forms
- **ContactModal (exists):** minimize fields — Name, Phone/Email, Project Type, Message. Remove anything non-essential.
- **Estimate submission:** the final step already collects name/email — keep it minimal. Don't ask for address until the contractor follows up.
- Inline validation (not blocking popups).
- Clear success state with next-steps ("We'll call you within 1 business day").
- Trust line near submit: "No obligation. We typically respond within 1 business day."

### 4. Trust signals (placement)
- Homepage: license #, insured badge, 5-star rating, years in business, project count.
- Every service page: "Licensed & Insured in DE & PA" + review snippet.
- Estimate page: "Join [N] homeowners who got a free estimate" + review carousel.
- Footer (site-wide): license #, insurance, BBB, NAP.
- Floating trust badge near all CTAs.

### 5. Financing information
- If financing is offered: add a dedicated `/financing` page + a "Financing available" badge near pricing/CTAs on service and estimator pages.
- Show example monthly payment ranges (e.g., "Kitchen remodels from $X/mo with approved financing").
- Be honest about terms; don't quote rates that aren't real.

### 6. Guarantees
- Add a warranty/guarantee statement on service pages, the estimator, and the about page.
- Example: "Workmanship guaranteed for [X] years. Materials covered by manufacturer warranty."
- Make it specific and verifiable — vague guarantees erode trust.

### 7. Project galleries
- Gallery page with filterable categories (by service).
- Each photo: descriptive caption, alt text, before/after toggle where available.
- "View similar projects in your area" CTA on gallery → estimator with service pre-filled.
- Lazy-load with skeleton placeholders.

### 8. Interactive tools
- The Project Estimator is the hero tool — feature it prominently from the homepage, every service page, every location page, and the nav.
- Consider a secondary lightweight tool: "Cost Range Calculator" (quick slider-based, no email required) that upsells to the full estimator.
- Interactive tools dramatically increase time-on-page and conversion — Google notices engagement signals.

### 9. Estimate flow optimization
- Progress bar (ProgressBar component exists — verify it shows %).
- Allow skipping optional steps; never block progression on non-essential fields.
- Show running "estimated range" live as the user answers (if feasible) — instant value, high engagement.
- Save progress (Supabase or localStorage) so users can resume.
- Final summary screen with a printable/downloadable PDF report — increases perceived value and shares.
- One-click submit to email + Supabase lead record.

### 10. Reduce friction
- No mandatory account creation.
- No captcha that blocks real users (use passive/invisible verification).
- Phone number formatted and clickable (`tel:` links).
- Reduce form fields to the minimum that lets Jeremiah follow up effectively.
- Mobile: thumb-reachable CTAs, no pinch-zoom needed.

### 11. Conversion tracking
- Fire events for: estimate_started, estimate_step_completed, estimate_submitted, phone_click, contact_modal_opened, contact_submitted, gallery_view, service_page_view.
- Send to Google Analytics 4 + Google Ads (if running).
- Define conversion: `estimate_submitted` and `contact_submitted` as primary; `phone_click` as secondary.

### Deliverables for this prompt
- CTA placement audit + implementation.
- Form field reduction + validation improvements.
- Trust-signal placement plan.
- Financing/guarantee content.
- Gallery filters + before/after toggle.
- Estimate-flow friction reduction.
- GA4 event tracking implementation.

---

## PROMPT 7 — Project Estimator SEO

**Objective:** Make Google understand, value, and rank the Project Estimator page — the site's highest-value feature — and maximize user engagement and conversion on it.

Optimize the Project Estimator page (`/estimate`) for search engines and users. Do not rebuild the estimator logic — optimize its SEO presentation, supporting content, engagement, and conversion. The estimator already asks project-specific questions per service type.

### 1. Help Google understand and value the page
- The estimator is a JS-heavy interactive app. Ensure:
  - Server-side or build-time rendering of the page shell (intro, FAQ, supporting content) so crawlers see real content, not an empty div.
  - Core Web Vitals are green (the estimator must lazy-load heavy components — ThreePreview, file handling — only when needed).
  - No content hidden behind interactions that crawlers can't reach. Put substantial indexable text content (intro, how it works, FAQ, benefits) on the page itself, not gated behind step progression.

### 2. Page structure for SEO
- **H1:** "Free Online Project Estimator — [Business Name] | DE & PA"
- **Intro (150 words):** what the estimator does, who it's for, time to complete ("5 minutes"), and the value ("get a real cost range before you talk to anyone").
- **How it works (3–4 steps):** Select project → Answer questions → Get your estimate → Optional contact.
- **Benefits section:** "No obligation," "Real local pricing," "Instant results," "Privacy-first."
- **FAQ section (6–8 Qs):** "Is the estimate free?", "How accurate is it?", "Do I have to give my email?", "What areas do you serve?", "How long does it take?", "What if I'm not sure of my project size?" — wrapped in FAQPage schema.
- **Service links:** the estimator supports 14 service types — list them all with links to their service pages (internal linking + keyword coverage).
- **Location links:** list primary service cities with links to location pages.
- **CTA at top + bottom:** "Start My Estimate" button that scrolls to the estimator.

### 3. Supporting content
- A "What you'll get" section describing the estimate report (cost range, timeline, materials, assumptions).
- A "Recent estimates" or "Project examples" carousel pulling from completed projects (anonymized).
- A trust block: "Trusted by [N] homeowners in DE & PA" + reviews.
- A cost-range reference table per service type (general ranges from the estimator config) — this is genuinely useful content and ranks for "[service] cost" queries.

### 4. Internal linking
- Every service page links to `/estimate?service={slug}`.
- Every location page links to `/estimate?location={slug}`.
- Every blog article (especially cost/timeline articles) links to `/estimate`.
- The estimator's final summary links to the relevant service page ("Learn more about {service}").
- The estimator's post-submission screen links to related services and the gallery.

### 5. Page titles & metadata
- `<title>`: `Free Project Estimate Calculator | [Business Name] DE & PA` (≤60 chars).
- Meta description: "Get a free, instant project estimate for decks, kitchens, baths, roofing & more in Delaware & Pennsylvania. No obligation — takes 5 minutes."
- og:image: a branded estimate-tool preview graphic.
- Canonical: `/estimate`.

### 6. Schema
- `WebApplication` or `SoftwareApplication` schema: name, applicationCategory "BusinessApplication", operatingSystem "Web", offers (free), aggregateRating.
- `FAQPage` schema for the on-page FAQ.
- `BreadcrumbList` (Home > Tools > Project Estimator).
- `Service` schema listing the supported service types.

### 7. User engagement improvements
- **Progress bar** with % and step name (ProgressBar exists — verify visibility).
- **Time estimate** per step ("~1 min remaining").
- **Instant feedback:** show the running cost range live as the user answers (high engagement).
- **Tooltips/help** on ambiguous questions (e.g., "Not sure? We'll advise on site.").
- **Visual project-type picker** with icons (already exists).
- **Save & resume** via Supabase or localStorage — users who leave mid-estimate can return.
- **Mobile-optimized** step UI with large tap targets.

### 8. Increase time on page
- The multi-step flow naturally increases time-on-page (a strong engagement signal).
- Add a "project preview" 3D or image preview that updates with selections (ThreePreview exists — wire it to the active project type).
- Add "tips" or "did you know" cards between steps (educational, keeps users engaged).
- Avoid long walls of text per step — short, scannable questions.

### 9. Improve conversion
- **Show value before asking for contact:** the cost range + summary appears BEFORE the email field. Users see value first.
- **Optional contact:** "Want us to follow up? Add your email (optional)." — reduce pressure.
- **Downloadable/printable report:** increases perceived value and shares.
- **Social proof at the submit step:** "Join [N] homeowners who estimated with us" + a recent review.
- **Pre-fill from URL params** (`?service=deck&location=wilmington-de`) so inbound links from service/location pages start the user already in-context.
- **Exit-intent (desktop) or scroll-up (mobile) prompt:** "Get your free estimate in 5 minutes" → scroll to estimator.
- **Retargeting pixel** on the page to re-engage users who started but didn't submit.

### Deliverables for this prompt
- SEO-optimized `/estimate` page shell (intro, FAQ, supporting content, service/location links).
- WebApplication + FAQPage + BreadcrumbList schema.
- Live cost-range feedback during the flow.
- Save/resume functionality.
- Pre-fill from URL parameters.
- Downloadable estimate report (PDF).
- GA4 funnel events (estimate_started → step_n → estimate_completed → contact_submitted).

---

## PROMPT 8 — Trust & Authority

**Objective:** Surface every possible trust signal so visitors feel safe hiring. Trust signals increase conversion AND earn Google's confidence for E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness).

Audit and implement every relevant trust signal on the General Contractor website. Do not redesign — add trust elements to existing pages and create a trust infrastructure. Store verifiable trust data in Supabase so it's centrally managed.

### 1. Licenses
- Display the Delaware and Pennsylvania contractor license numbers prominently (footer, about page, every service page).
- Link to the state license-verification page if public.
- Use `hasOccupationalCategory` or relevant LocalBusiness schema fields.

### 2. Insurance
- State "Fully insured" with coverage types (general liability, workers' comp) on the about page, footer, and service pages.
- Add a certificate-on-request line.

### 3. Certifications
- Manufacturer certifications (e.g., TrexPro, CertainTeed, Andersen, James Hardie) — display badges with the certifying body.
- Lead-safe (RRP) certification for pre-1978 homes — required by EPA; display it.

### 4. Years of experience
- "Serving Delaware & Pennsylvania homeowners since [year]" on homepage, about, footer.
- Tie to founder bio (Jeremiah) with personal experience narrative.

### 5. Awards
- Any local awards (Best of Delaware, Angie's List Super Service, Houzz Best of) — display with year + awarding body.
- If none yet, target one per year (local "Best Of" awards drive both trust and a backlink).

### 6. Reviews
- Aggregate rating widget (5.0 ⭐ from N reviews) site-wide.
- Dedicated testimonials page with full reviews, names, project types, locations.
- GBP reviews embedded or mirrored.
- Review schema (AggregateRating + Review).
- Rotate fresh reviews on the homepage.

### 7. Case studies
- Create 5–10 detailed case studies (one per major service): challenge → solution → timeline → cost range → before/after → client quote.
- Host at `/case-studies/[slug]` or within the gallery.
- Each case study has Article schema + before/after ImageObject schema.

### 8. Project photos
- Gallery with categorized, captioned, alt-tagged, schema-marked photos.
- Before/after pairs with descriptive captions.
- Add new photos monthly (signal of active, reputable business).

### 9. Meet the team
- `/about` with team bios, photos, roles, and the lead carpenter/owner story.
- People make contractors trustworthy — faces matter.
- Use `Person` schema for key team members.

### 10. Warranty information
- Dedicated warranty section/page: workmanship warranty term, materials warranty (manufacturer), what's covered, how to file.
- Make it specific and honest.

### 11. Financing
- If offered: `/financing` page with provider, terms example, monthly-payment examples, application CTA.
- "Financing available" badges on service and estimator pages.

### 12. Professional memberships
- NARI, NAHB, local HBA chapters, BBB — display logos with links.
- Membership badges in the footer.

### 13. Safety practices
- A "Our Safety Practices" section: PPE, lead-safe protocols, OSHA compliance, jobsite cleanup.
- Especially important for older-home work (lead/asbestos awareness).

### 14. Community involvement
- Sponsorships, volunteer projects, charity builds — document with photos and names.
- Local involvement earns local trust AND local backlinks.

### 15. E-E-A-T signals for Google
- **Experience:** years served, project count, case studies.
- **Expertise:** certifications, licenses, detailed educational content (blog), the estimator itself.
- **Authoritativeness:** press features, awards, association memberships, GBP review count.
- **Trustworthiness:** clear contact, real address, license #, insurance, warranty, transparent pricing, real reviews with names.
- Author bylines on blog articles (Jeremiah + team) with `Person` schema and short bio.

### Deliverables for this prompt
- Supabase `trust_signals` table (licenses, insurance, certifications, awards, memberships) managed from admin.
- Trust-badge component (footer + service pages).
- Case study template + 5 initial case studies.
- About/team page with Person schema.
- Warranty + financing pages.
- Safety practices content.
- Community involvement section.

---

## PROMPT 9 — Lead Generation System

**Objective:** Design and optimize the complete visitor journey from Google search to repeat customer and referral. Improve conversion at every stage.

Map and optimize the full lead generation funnel for the General Contractor. Do not redesign — optimize each stage and build the tracking/automation infrastructure in Supabase.

### The journey
```
Google Search → Website → Service Page → Project Estimator → Estimate Report → Email Submission → Contractor Contact → Project Won → Review Request → Repeat Customer → Referral
```

### Stage 1 — Google Search
**Goal:** Earn the click from high-intent searches.
- Rank via: GBP optimization (Prompt 2), service pages (Prompt 3), location pages (Prompt 4), content (Prompt 5).
- Title tags and meta descriptions optimized for click-through (include "Free Estimate" + location).
- Sitelinks via clear site architecture + breadcrumbs.
- GBP posts link to deep pages, not just homepage.

### Stage 2 — Website (homepage or landing)
**Goal:** Keep the visitor; route them to the right next step.
- Above-the-fold: value proposition + primary CTA (Free Estimate) + trust signals.
- Clear path to services, locations, estimator, gallery.
- No popups that block content on first visit.
- Fast LCP (<2.5s); visitors bounce from slow pages.

### Stage 3 — Service Page
**Goal:** Confirm the contractor can do THIS service, locally.
- Service-specific benefits, process, materials, FAQ, before/after, testimonials.
- Mid-page CTA → estimator with service pre-filled.
- Trust signals (license, insured, reviews for this service).

### Stage 4 — Project Estimator
**Goal:** User starts the estimator (the highest-value engagement).
- Prominent "Start" CTA, clear time-to-complete, progress bar.
- Pre-filled from URL (service + location from the inbound link).
- First step is easy (project type picker) — low friction entry.

### Stage 5 — Estimate Report
**Goal:** Deliver instant value (the "aha" moment).
- Cost range, timeline, materials, assumptions — all visible.
- Downloadable/printable PDF (increases value + shares + return visits).
- "This estimate is based on [N] similar projects in [region]" — credibility.

### Stage 6 — Email Submission
**Goal:** Capture the lead (optional, low-pressure).
- Frame as optional: "Want us to follow up? Add your email."
- Show value first (the report), then ask.
- Save partial leads to Supabase even if email isn't submitted (anonymous session → estimate data) for retargeting/analytics.

### Stage 7 — Contractor Contact
**Goal:** Respond fast and well.
- Auto-notify the contractor (email/SMS) on submission (notify-business edge function exists — verify it works and is fast).
- Target response time: <1 business hour. Speed wins contractor leads.
- Pre-prepare a response template that references the submitted estimate.
- Build a Supabase admin lead dashboard (Admin page exists — expand it into a CRM-lite: lead status, notes, follow-up reminders).

### Stage 8 — Project Won
**Goal:** Deliver excellently; set up the review + referral.
- Document the project (before/after photos, timeline) for future case studies.
- Set expectations for the review request at project kickoff (not just at the end).

### Stage 9 — Review Request
**Goal:** Earn a public 5-star review.
- Send within 24 hours of project completion (peak satisfaction).
- SMS + email with a direct GBP review link (pre-filled 5-star where possible).
- Make it 30 seconds of effort for the customer.

### Stage 10 — Repeat Customer
**Goal:** Stay top-of-mind for future projects.
- Quarterly newsletter with seasonal tips + a "past customer" estimate CTA.
- Anniversary follow-up ("It's been a year since your kitchen remodel — here's a maintenance tip").
- Past-customer discount on next project (ethical, policy-compliant).

### Stage 11 — Referral
**Goal:** Turn happy customers into lead sources.
- Referral program: refer a friend who books → both get a discount/gift.
- Make referral easy: a shareable link to the estimator with the referrer's name attached.
- Track referrals in Supabase (referrer field on leads).

### Funnel tracking (GA4 events)
- `search_result_click` (via Search Console + UTM on GBP links)
- `page_view` (per stage)
- `estimate_started`, `estimate_step_completed`, `estimate_report_viewed`
- `email_submitted`, `phone_click`, `contact_submitted`
- `review_link_clicked`, `referral_link_shared`

### Deliverables for this prompt
- Lead dashboard (Admin page expansion) in Supabase.
- Auto-notification verification + response templates.
- PDF estimate report generation.
- Review request automation (post-project).
- Referral tracking (referrer field + shareable links).
- Quarterly newsletter content plan.
- Full GA4 funnel event implementation.

---

## PROMPT 10 — 12-Month SEO Growth Plan

**Objective:** A prioritized, month-by-month roadmap that delivers compounding results. High-impact activities first; build momentum without burning out.

Create a 12-month implementation roadmap for the General Contractor's SEO and lead generation. Do not write code — produce the month-by-month plan with tasks, owners, KPIs, and goals. Build a Supabase-backed progress tracker.

### Month 1 — Foundation & Quick Wins
- **Technical SEO (Prompt 1):** sitemap, robots.txt, canonicals, schema (LocalBusiness, BreadcrumbList), breadcrumbs, image optimization basics, Core Web Vitals audit.
- **GBP (Prompt 2):** claim/verify, set categories, services, description, hours, service areas, upload 10 photos.
- **Estimator SEO (Prompt 7):** add intro, FAQ, supporting content, schema to `/estimate`.
- **CRO (Prompt 6):** add above-the-fold CTAs on all pages, mobile sticky CTA on all pages.
- **KPIs:** sitemap submitted & indexed; GBP complete; CWV green on top 5 pages.

### Month 2 — Service Pages Launch
- Build all 14 service pages (Prompt 3) with full structure, schema, internal links.
- Wire every service page → estimator with pre-fill.
- Add trust signals (license, insured) to every service page.
- Seed 5–10 GBP Q&A.
- Start weekly Google Posts.
- **KPIs:** 14 service pages live & indexed; CTR from search improving.

### Month 3 — Location Pages (Priority Cities)
- Build location pages for top 5–8 DE cities + top 5 PA cities (Prompt 4).
- Unique intros, local FAQ, map embeds, local projects/testimonials.
- Submit all to sitemap.
- Begin citation audit (NAP consistency).
- Publish first 4 blog articles (cost + permit topics — highest intent).
- **KPIs:** location pages indexed; first blog articles ranking for long-tail.

### Month 4 — Content Cluster Build + Reviews
- Publish 8 blog articles (2/week) across the top 3 clusters (kitchen, deck, roofing).
- Launch review-request automation; request reviews from last 10 completed projects.
- Join local Chambers of Commerce; start citation building.
- Add case studies (3) to the site (Prompt 8).
- **KPIs:** 12 total blog articles; 5+ new GBP reviews; first local backlinks.

### Month 5 — Trust & Authority Push
- Complete all trust signals (Prompt 8): warranty page, financing page, safety practices, team bios with Person schema, certifications display.
- Publish 6 blog articles.
- Build remaining location pages (long tail).
- Pitch 2 local publications for project features / expert quotes.
- **KPIs:** trust elements live; 18 total articles; all priority locations live.

### Month 6 — Estimator Enhancement + Mid-Year Audit
- Estimator: live cost-range feedback, save/resume, PDF report, pre-fill from URL (Prompt 7).
- Run a full technical SEO audit (fix any drift, recheck CWV, recheck schema).
- Refresh GBP photos; update seasonal hours.
- Publish 6 blog articles.
- Analyze Search Console: which queries/pages are rising? Double down.
- **KPIs:** estimator conversion rate up 20%+; 24 total articles; mid-year traffic baseline.

### Month 7 — Content Expansion + Backlinks
- Publish 6 articles; start bathroom, fence, accessibility clusters.
- Backlink outreach: suppliers, partners, local charities.
- Sponsor a local event (earn a backlink + community trust).
- Add 3 more case studies.
- **KPIs:** 30 articles; 3+ new referring domains.

### Month 8 — Conversion Optimization Deep Dive
- Implement CRO improvements (Prompt 6): form reduction, financing badges, guarantee statements, gallery filters, GA4 funnel events.
- A/B test CTA copy/placement on top service pages.
- Exit-intent prompts on estimator.
- Publish 6 articles.
- **KPIs:** conversion rate (estimate_submitted / sessions) up; funnel events flowing to GA4.

### Month 9 — Local SEO Deepening
- Build "city + service" combo pages for top 3 cities × top 3 services (only with unique content).
- Publish local-primers (permit guides per county).
- Audit citations again; fix drift.
- Encourage photo reviews from recent customers.
- Publish 6 articles.
- **KPIs:** combo pages indexed; local keyword rankings improving; citation consistency 100%.

### Month 10 — Content Refresh + Authority
- Refresh Month 1–3 articles (update year, costs, links) — refreshes signal freshness to Google.
- Publish 4 new articles + 4 refreshes.
- Pursue one "best of" local award nomination.
- Add 2 case studies.
- **KPIs:** refreshed articles gaining traffic; award submission in.

### Month 11 — Lead System Optimization
- Implement referral program + tracking.
- Launch quarterly newsletter to past customers.
- Optimize contractor response time (target <1 hr).
- Add retargeting for estimate-starters who didn't submit.
- Publish 4 articles.
- **KPIs:** referral leads arriving; newsletter sent; retargeting live.

### Month 12 — Annual Review & Planning
- Full year-in-review: traffic, rankings, leads, conversions, revenue attributed to web.
- Identify top 10 pages and top 10 queries; plan to amplify.
- Identify underperforming pages; refresh or consolidate.
- Set Year 2 goals.
- Publish 4 articles + a flagship pillar guide (2,500+ words).
- **KPIs:** year-over-year organic traffic +X%, leads +Y%, conversions +Z%.

### Ongoing (every month)
- Weekly Google Post.
- Weekly review monitoring + response within 48h.
- Monthly GBP photo additions.
- Monthly Search Console review (new queries, declining pages, indexing errors).
- Monthly lead-source tracking (where did each lead come from?).

### SEO KPIs to track (monthly)
- Organic sessions (GA4).
- Keyword rankings (top 3, top 10, top 20) for priority high-intent queries.
- GBP profile views, searches, calls, website clicks, direction requests.
- Click-through rate from search (Search Console).
- Indexed page count.
- Referring domains (backlink count).
- Core Web Vitals (all green).

### Conversion KPIs to track (monthly)
- Estimate starts / sessions (engagement rate).
- Estimate submissions / starts (completion rate).
- Contact form submissions.
- Phone clicks.
- Lead → contact rate.
- Contact → proposal rate.
- Proposal → won rate.
- Review generation rate (reviews / completed projects).

### Traffic & lead goals (realistic, adjust to actual service area size)
- Month 3: 300–500 organic sessions/month; 5–10 leads.
- Month 6: 600–1,000 organic sessions/month; 10–20 leads.
- Month 9: 1,200–2,000 organic sessions/month; 20–35 leads.
- Month 12: 2,500–4,000 organic sessions/month; 35–60 leads.
- These assume consistent execution of the plan and a real DE/PA service area. Local contractor SEO compounds — Month 12 results reflect Month 1–12 work.

### Deliverables for this prompt
- 12-month roadmap (this section, operationalized).
- Supabase `seo_kpis` + `monthly_progress` tables for tracking.
- Monthly review checklist.
- KPI dashboard (Admin page expansion).

---

## Implementation Notes for Bolt

1. **Run prompts in order.** Prompt 1 (technical foundation) must precede content prompts, which precede optimization prompts.
2. **Reuse existing infrastructure.** The site already has: React Router, Supabase, SEO hooks (`useSEO`, `seo.ts`), a ContactModal, MobileStickyCTA, ThreePreview, an Admin page, an email-notification edge function, and a full Project Estimator. Extend these rather than rebuilding.
3. **Schema first.** Implement all JSON-LD via the existing `useSEO`/`seo.ts` layer so it's centralized and consistent.
4. **Supabase for data.** Store locations, blog posts, trust signals, leads, reviews, KPIs in Supabase with proper RLS (use the `bolt-database` skill for migrations/RLS).
5. **No black-hat tactics.** No keyword stuffing, no bought links, no duplicate thin pages, no hidden text, no cloaking. Every recommendation here follows Google Search Essentials.
6. **High-intent focus.** Every keyword target, every page title, every CTA prioritizes visitors ready to hire over browsers.
7. **Mobile-first, accessibility-required.** Every change must pass mobile and WCAG checks.
8. **Measure everything.** GA4 + Search Console from Day 1. You cannot optimize what you do not measure.

---

*This blueprint is the strategy layer. Each PROMPT section can be handed to Bolt as a discrete implementation task. Execute sequentially, verify each against its deliverables list before moving on.*
