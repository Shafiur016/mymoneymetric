# MyMoneyMetric v2.1 — Explicit Estimate Workflow

All 18 calculators now use an explicit Estimate / Compare / Project action instead of exposing live-updating results while the visitor is typing.

## Interaction behavior

1. Visitors can freely edit or clear numeric fields.
2. Results stay hidden until the primary calculation button is selected.
3. After a completed estimate, changing any input marks the result as stale and hides it behind an **Inputs changed** message.
4. The primary button becomes an **Update** action.
5. **Reset** restores the calculator's original defaults and clears the result state.
6. Core calculators validate critical required values before showing results.
7. Result tables, amortization schedules, charts, and scenario comparisons only appear after calculation.

The change is designed for clearer financial-tool behavior on both desktop and mobile.
