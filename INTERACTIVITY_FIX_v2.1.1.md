# MyMoneyMetric v2.1.1 — Interactivity / Hydration Fix

This maintenance release addresses the case where calculator inputs render but React-powered actions such as **Estimate** and **Reset** do not respond.

## Changes

- Upgraded Next.js from 16.3.8 to **16.4.0**.
- Upgraded React and React DOM from 19.2.x to **19.3.0**.
- Upgraded React type definitions to 19.3.0.
- Added one dedicated client boundary (`CalculatorInteractive`) so the calculation provider and every calculator consumer hydrate inside the same client tree.
- Moved localStorage-dependent cookie/analytics UI behind React 19.3 `browser()` + Suspense boundaries to avoid server/client hydration races.
- Kept explicit Estimate / Compare / Project buttons, Reset, blank numeric inputs, and the input-changed result gate.
- Added a no-JavaScript notice instead of silently presenting inert calculator controls.

## Clean local test

```powershell
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue
npm install
npm run check
npm run dev
```

Then hard-refresh the browser (`Ctrl+Shift+R`) and test `/calculators/mortgage`.
