# Post-Launch Checklist

## Domain & Hosting
- [ ] Purchase or connect custom domain (e.g. rlsolutions.com) in Bolt project settings
- [ ] Update `SITE_URL` in `src/lib/seo.ts` from the Bolt preview URL to the custom domain
- [ ] Update all hardcoded URLs in `public/robots.txt` and `public/sitemap.xml`
- [ ] Verify HTTPS/SSL is active on the custom domain
- [ ] Test that the site loads at the custom domain without errors

## Google Search Console
- [ ] Go to https://search.google.com/search-console and add the custom domain as a property
- [ ] Verify ownership (DNS TXT record is the most reliable method)
- [ ] Submit `sitemap.xml` (https://yourdomain.com/sitemap.xml) in the Sitemaps section
- [ ] Request indexing for the homepage and key pages (Estimate, Service Areas, Gallery)
- [ ] Run the URL Inspection tool on the homepage to confirm no errors
- [ ] Check the Coverage report after 1-2 weeks for any indexing issues
- [ ] Monitor Core Web Vitals report for mobile performance

## Google Business Profile
- [ ] Claim or create your business profile at https://www.google.com/business
- [ ] Ensure NAP (Name, Address, Phone) matches exactly what's on the website
- [ ] Add the custom domain URL to your business profile
- [ ] Upload photos of completed projects (match categories from the Gallery)
- [ ] Add all 6 services listed in the website's OfferCatalog schema
- [ ] Set business hours to match the schema (Mon-Fri 7am-6pm, Sat 8am-4pm)
- [ ] Add service areas (all 20 cities from the sitemap)
- [ ] Enable messaging and set response hours
- [ ] Request Google reviews from past clients — these power the AggregateRating schema on the testimonials page

## Phone Number
- [ ] The phone number is displayed on the site but not clickable on mobile
- [ ] Wrap all phone number displays in `<a href="tel:+13025550100">` tags
- [ ] Verify the phone number in `src/lib/seo.ts` (`BUSINESS_PHONE_RAW`) is the correct 10-digit number
- [ ] Test clicking the phone link on a mobile device — it should open the dialer
- [ ] Consider adding a floating "Call Now" button on mobile (similar to the existing sticky CTA)

## Schema Validation
- [ ] Test the homepage at https://search.google.com/test/rich-results
- [ ] Test a service area page (e.g. /service-areas/wilmington) for Service schema
- [ ] Test the FAQ page for FAQ schema validity
- [ ] Test the testimonials page for Review schema (requires at least one submitted review)
- [ ] Run the LocalBusiness schema through https://validator.schema.org/

## Analytics (Optional)
- [ ] Set up Google Analytics 4 and add the measurement ID
- [ ] Connect Search Console to Analytics for search query data
- [ ] Consider setting up conversion tracking for estimate form submissions
