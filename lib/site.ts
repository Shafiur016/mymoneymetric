function normalizeSiteUrl(value?: string) {
  if (!value) return "http://localhost:3000";
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  return withProtocol.replace(/\/$/, "");
}

const deploymentUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  process.env.VERCEL_URL;

export const site = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "MyMoneyMetric",
  shortName: process.env.NEXT_PUBLIC_SHORT_NAME || "MoneyMetric",
  description:
    "Free financial decision calculators with transparent formulas, scenario comparisons, and source-linked educational guides.",
  url: normalizeSiteUrl(deploymentUrl),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "shafi.rahman979@gmail.com",
  publisher:
    process.env.NEXT_PUBLIC_PUBLISHER_NAME || "MyMoneyMetric Editorial Team",
  reviewDate: "October 7, 2026",
  reviewDateIso: "2026-10-07",
};
