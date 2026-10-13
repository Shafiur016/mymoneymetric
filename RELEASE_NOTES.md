# MyMoneyMetric v2.0.0 — Final Publish-Ready Release

Release date: October 7, 2026

## Product changes

- Repositioned the site around financial decision comparison rather than generic finance content.
- Expanded the calculator library from 10 to 18 tools.
- Added mortgage extra-payment, 15-vs-30-year, mortgage-affordability, refinance break-even, balance-transfer, debt-consolidation, inflation-adjusted-return, and retirement-gap calculators.
- Added reverse-calculation behavior where it materially improves the decision (affordability and retirement target gap).
- Added comparison tables, cost differences, payoff-time differences, and important limitations to specialized tools.
- Connected high-intent guides to their most specific calculator instead of a broad category tool.

## Content and SEO changes

- Added formula, method, worked-example context, assumptions, limitations, FAQs, and source notes to every calculator route.
- Expanded six high-intent decision guides to approximately 500–650 substantive words each.
- Reading time is calculated from actual guide content.
- Shorter supporting guides remain available to users but are `noindex` and excluded from the sitemap until expanded to the same depth standard.
- Added/updated WebApplication, FAQPage, Article, and Breadcrumb structured data.
- Updated sitemap priorities for decision calculators.
- Removed unfinished commercial-product placeholders.

## Launch-safety changes

- Removed unused public newsletter/contact webhook functionality.
- Direct email is the public contact path.
- Ads remain disabled by default.
- `/ads.txt` returns no publisher declaration until a real publisher ID is configured.
- Vercel production URL is a safe metadata fallback until `NEXT_PUBLIC_SITE_URL` is set to the custom domain.
- Branding and contact identity are environment-configurable.
- Added a custom 404 page.

## Validation performed in the release environment

- TypeScript/TSX syntax transpilation: PASS for all source files.
- Local import resolution: PASS.
- Project verification suite: PASS.
- 18 calculator routes verified to have methodology content.
- 25 guide routes verified to have content.
- Independent financial-formula sanity checks: PASS.
- Public-source scan for known unfinished-launch phrases: PASS.
- Core primary-source URLs for CFPB, Investor.gov, and Social Security were rechecked on October 7, 2026.

## Environment limitation

The release environment cannot reach the npm registry, so dependencies could not be installed here and the dependency-backed `npm run typecheck` / `npm run build` could not be executed. Run `npm install && npm run check` locally or let Vercel perform the production build before attaching the final domain.

## v2.1.1 — October 9, 2026 — hydration/interactivity maintenance

- Upgraded to Next.js 16.4.0 and React/React DOM 19.3.0.
- Added a dedicated `CalculatorInteractive` client boundary around all 18 calculators.
- Moved localStorage-backed consent/analytics behavior behind React 19.3 browser-only Suspense boundaries.
- Preserved explicit Estimate/Compare/Project controls, Reset behavior, and blank/zero-friendly number inputs.
- Added an explicit no-JavaScript fallback notice.

## v2.2.0 — October 12, 2026 — readable money-entry release

- Added one shared monetary input component across all 18 calculators.
- Monetary values now display thousands separators while typing, e.g. `40000000` → `40,000,000`.
- Large monetary values show a compact live interpretation such as `≈ 40 million dollars`.
- Pasted commas and dollar signs are sanitized before calculation.
- Blank input, explicit zero, decimals, Reset, and the explicit Estimate/Compare/Project workflow are preserved.
- Percentage, duration, age, and other non-money fields retain numeric input behavior.
- Mobile numeric-keyboard support remains enabled through `inputMode="decimal"`.
- Project verification now checks the shared money-input architecture and representative formatting examples.
