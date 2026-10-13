# Vercel Deployment

## 1. Import the project

Push the project to a Git repository or import the folder through your normal Vercel workflow. Vercel should detect Next.js automatically.

- Build command: `npm run build`
- Install command: `npm install`
- Output: managed automatically by Next.js/Vercel

No database or additional service is required.

## 2. Configure identity

Set at minimum:

```text
NEXT_PUBLIC_SITE_NAME=MyMoneyMetric
NEXT_PUBLIC_SHORT_NAME=MoneyMetric
NEXT_PUBLIC_CONTACT_EMAIL=<a working public email>
NEXT_PUBLIC_PUBLISHER_NAME=MyMoneyMetric Editorial Team
NEXT_PUBLIC_ADS_ENABLED=false
```

Before the custom domain is connected, the app safely uses Vercel's production URL for absolute metadata when `NEXT_PUBLIC_SITE_URL` is blank.

## 3. Attach the custom domain

After DNS is working, set:

```text
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

Redeploy. Then verify:

- homepage canonical uses the custom domain;
- `/sitemap.xml` uses the custom domain;
- `/robots.txt` points to the correct sitemap;
- calculator and guide canonical URLs are correct;
- HTTPS redirects work as expected.

## 4. Search Console

Add the domain/property, obtain the Google verification token if needed, set:

```text
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=<token>
```

Redeploy and submit:

```text
https://yourdomain.com/sitemap.xml
```

## 5. Analytics (optional)

GA4 and Microsoft Clarity hooks exist but only load after the visitor grants analytics consent. Leave the IDs blank if you do not want analytics yet.

## 6. Advertising (later)

Keep:

```text
NEXT_PUBLIC_ADS_ENABLED=false
```

until the site is ready and approved. When AdSense supplies a valid publisher ID, configure `ADSENSE_PUBLISHER_ID` using the value required for `ads.txt`, complete the consent/CMP requirements applicable to your visitors, and only then enable the advertising integration you choose to add.

## 7. Final test

Run locally or in CI:

```bash
npm install
npm run check
```

Then manually test representative calculators, mobile navigation, guide links, privacy controls, contact email, sitemap, and robots on the deployed URL.
