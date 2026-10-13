# Advertising / AdSense Readiness

This release is designed to avoid obvious pre-approval problems, but no codebase can guarantee AdSense acceptance.

## Current safe defaults

- Live ads are disabled unless `NEXT_PUBLIC_ADS_ENABLED=true`.
- Production ad placeholders are not rendered while ads are disabled.
- `/ads.txt` returns no publisher entry until `ADSENSE_PUBLISHER_ID` is configured.
- Calculator results and editorial text are separated from ad containers.
- Advertising policy, affiliate disclosure, privacy policy, cookie policy, terms, financial disclaimer, and contact information are public.
- Calculator methodology, assumptions, limitations, and source notes are visible.
- No invented partner offers or rates are published.

## Before applying

1. Launch on the final domain and HTTPS.
2. Confirm Search Console can crawl the site.
3. Check that important calculator and guide pages are indexed as intended.
4. Continue improving pages that receive search impressions but weak clicks/rankings.
5. Verify all source links and policy pages.
6. Do not manufacture traffic, clicks, reviews, credentials, or engagement.
7. Review the then-current Google Publisher Policies before submitting the property.

## After approval

Only then configure the real advertising integration. If the regions you serve require consent for Google advertising, implement the consent/CMP solution required by Google's current policy before serving affected ads.
