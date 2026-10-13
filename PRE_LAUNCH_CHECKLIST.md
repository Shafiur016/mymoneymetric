# Final Pre-Launch Checklist

## Build
- [ ] `npm install` completes.
- [ ] `npm run verify` passes.
- [ ] `npm run typecheck` passes.
- [ ] `npm run build` passes.

## Identity and domain
- [ ] Final brand/domain is confirmed before indexing.
- [ ] `NEXT_PUBLIC_CONTACT_EMAIL` is monitored.
- [ ] Custom domain uses HTTPS.
- [ ] `NEXT_PUBLIC_SITE_URL` is set to the final HTTPS domain after DNS is connected.
- [ ] Canonicals and sitemap contain the final domain.

## Calculator QA
- [ ] Mortgage payment checked against an independent amortization calculation.
- [ ] Extra-payment mortgage scenario manually checked.
- [ ] 15-vs-30-year comparison checked using identical principal assumptions.
- [ ] Credit-card payoff decreases when payment increases.
- [ ] Balance-transfer fee and post-promotional APR behavior checked.
- [ ] Debt-consolidation comparison includes the entered fee.
- [ ] Compound-interest projection separates contributions from modeled growth.
- [ ] Inflation-adjusted return shows both nominal and today's-dollar values.
- [ ] Retirement-gap reverse contribution behaves sensibly at 0% and positive returns.
- [ ] Inputs can be cleared and replaced without the old dummy-number behavior.

## Content and trust
- [ ] No invented credentials, testimonials, customer counts, approval claims, or financial guarantees.
- [ ] Review date is accurate.
- [ ] Source links open correctly.
- [ ] Privacy, cookie, terms, disclaimer, corrections, editorial, advertising, affiliate, accessibility, and copyright pages are reachable from the footer.
- [ ] Public contact email works.

## SEO
- [ ] `/robots.txt` loads.
- [ ] `/sitemap.xml` loads.
- [ ] Search Console is configured after the final domain is live.
- [ ] Sitemap is submitted.
- [ ] Do not force-index short supporting guides that are intentionally marked `noindex`.
- [ ] Use Search Console impressions to determine which supporting guides to expand next.

## Advertising
- [ ] `NEXT_PUBLIC_ADS_ENABLED=false` for initial launch.
- [ ] Do not place live AdSense code before approval/readiness.
- [ ] Configure a valid `ADSENSE_PUBLISHER_ID` only when issued.
- [ ] Implement any Google-certified CMP/consent requirements that apply before personalized advertising is served.

## Mobile/manual QA
- [ ] Navigation works at 320–390 px widths.
- [ ] No horizontal page overflow.
- [ ] Wide tables scroll within their container.
- [ ] Focus states are visible with keyboard navigation.
- [ ] Calculator result cards remain readable with large values.
