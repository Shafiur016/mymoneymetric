# MyMoneyMetric v2.2.0 — Readable Money Inputs

This release adds consistent money-entry formatting across all 18 calculators.

## What changed
- Monetary inputs display thousands separators while typing (for example, `40000000` becomes `40,000,000`).
- Values of at least $1,000 show a compact live interpretation such as `≈ 40 million dollars`.
- Pasted `$` signs and commas are sanitized before calculation.
- Blank input, explicit `0`, and decimal entry remain supported.
- Mobile devices still receive a decimal/numeric keyboard through `inputMode="decimal"`.
- Percentages, years, ages, and other non-money fields keep native numeric behavior.
- The explicit Estimate / Compare / Project workflow from v2.1 remains unchanged.

## Release status
Run `npm install` and `npm run check` on the deployment machine before committing/deploying.
