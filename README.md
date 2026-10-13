> Release: **v2.2.0** — formatted monetary inputs with readable magnitude labels.

# MyMoneyMetric

> **Current release: v2.2.0 (October 12, 2026).** This release keeps the Next.js 16.4 + React 19.3 interactivity fixes and adds readable, comma-formatted monetary entry across all 18 calculators.

A lightweight Next.js financial-decision website designed for Vercel. The release focuses on useful calculators, transparent methodology, scenario comparison, source-linked education, mobile usability, and launch-safe monetization defaults.

## Release scope

- **18 financial calculators** across mortgage, loans, auto, credit, debt, investing, savings, and retirement.
- **8 decision-specific calculators** for mortgage extra payments, 15-vs-30-year mortgages, affordability, refinance break-even, balance transfers, debt consolidation, inflation-adjusted returns, and retirement savings gaps.
- **25 educational guides** with reading time calculated from the actual article content.
- Six higher-intent guides are intentionally expanded for organic-search landing pages; shorter supporting guides remain accessible but are `noindex` until they reach the same depth standard.
- Formula, assumptions, limitations, worked-example context, FAQs, and primary-source links on every calculator route.
- Trust pages covering methodology, sources, editorial standards, corrections, advertising, affiliate disclosure, privacy, cookies, terms, accessibility, and copyright.
- Canonicals, sitemap, robots, WebApplication/Article/Breadcrumb/FAQ structured data, manifest, and responsive layouts.
- No account system, database, background worker, newsletter backend, or contact-form backend.
- Advertising is disabled by default. `ads.txt` is empty until a real AdSense publisher ID is configured.

## Stack

- Next.js 16.4.0
- React 19.3.0
- TypeScript
- Tailwind CSS 4.3
- Lucide React

## Local verification

```bash
npm install
npm run verify
npm run check
```

`npm run check` runs the project verification suite, TypeScript type-checking, and the production Next.js build.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Minimal Vercel environment

The site works on a Vercel preview URL without a custom domain. Set these values in Vercel before the final public launch:

```text
NEXT_PUBLIC_SITE_NAME=MyMoneyMetric
NEXT_PUBLIC_SHORT_NAME=MoneyMetric
NEXT_PUBLIC_CONTACT_EMAIL=your-working-email@example.com
NEXT_PUBLIC_PUBLISHER_NAME=MyMoneyMetric Editorial Team
NEXT_PUBLIC_ADS_ENABLED=false
```

After the custom domain is attached, add:

```text
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

Then redeploy so canonical URLs, structured data, sitemap URLs, and Open Graph metadata use the final domain.

Optional later:

```text
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_CLARITY_ID=
ADSENSE_PUBLISHER_ID=
```

Do not enable ads before the site is approved and the applicable consent requirements are implemented.

## Deployment order

1. Deploy this project to Vercel.
2. Confirm the production build and manually test the calculators on desktop and mobile.
3. Attach the chosen `.com` domain.
4. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS domain and redeploy.
5. Add the domain to Google Search Console and submit `/sitemap.xml`.
6. Allow the site to establish indexing and traffic before enabling advertising.
7. Expand additional supporting guides based on Search Console impressions rather than publishing large volumes of generic content.

See `DEPLOY_VERCEL.md` and `PRE_LAUNCH_CHECKLIST.md` for the final deployment checklist.
