export type Calculator = {
  slug: string;
  name: string;
  description: string;
  category: string;
  intent?: "core" | "decision";
};

export const calculators: Calculator[] = [
  {slug:"mortgage",name:"Mortgage Calculator",description:"Estimate monthly principal and interest, lifetime interest, total repayment, and amortization.",category:"Mortgage",intent:"core"},
  {slug:"mortgage-extra-payment",name:"Mortgage Extra Payment Calculator",description:"Compare your scheduled mortgage with extra principal payments to estimate time and interest saved.",category:"Mortgage",intent:"decision"},
  {slug:"mortgage-15-vs-30",name:"15 vs. 30 Year Mortgage Calculator",description:"Compare monthly payments and lifetime interest for 15-year and 30-year mortgage scenarios.",category:"Mortgage",intent:"decision"},
  {slug:"mortgage-affordability",name:"Mortgage Affordability Calculator",description:"Estimate a home-price range from a monthly housing budget, financing assumptions, taxes, insurance, and HOA costs.",category:"Mortgage",intent:"decision"},
  {slug:"refinance-break-even",name:"Refinance Break-Even Calculator",description:"Estimate how long monthly savings may take to recover refinance closing costs.",category:"Mortgage",intent:"decision"},

  {slug:"loan",name:"Personal Loan Calculator",description:"Compare monthly payments, interest, fees, and total borrowing cost across loan terms.",category:"Loans",intent:"core"},
  {slug:"apr",name:"APR Cost Calculator",description:"Estimate borrowing cost and understand how APR changes repayment burden.",category:"Loans",intent:"core"},
  {slug:"auto-loan",name:"Auto Loan Calculator",description:"Estimate car payments using purchase price, down payment, rate, and term.",category:"Auto",intent:"core"},

  {slug:"credit-card",name:"Credit Card Payoff Calculator",description:"Estimate payoff time, total interest, and the effect of extra monthly payments.",category:"Credit",intent:"core"},
  {slug:"balance-transfer",name:"Balance Transfer Savings Calculator",description:"Compare staying on a current card with a promotional balance transfer after fees and post-promo APR.",category:"Credit",intent:"decision"},
  {slug:"debt-payoff",name:"Debt Payoff Calculator",description:"Explore how extra monthly payments can shorten your debt timeline.",category:"Debt",intent:"core"},
  {slug:"debt-consolidation",name:"Debt Consolidation Calculator",description:"Compare a blended current debt payoff path with a proposed consolidation loan including fees.",category:"Debt",intent:"decision"},

  {slug:"compound-interest",name:"Compound Interest Calculator",description:"Project account growth from an initial balance, recurring contributions, and compounding.",category:"Investing",intent:"core"},
  {slug:"real-return",name:"Inflation-Adjusted Return Calculator",description:"Compare a nominal investment projection with estimated purchasing power after inflation.",category:"Investing",intent:"decision"},
  {slug:"savings",name:"Savings Goal Calculator",description:"Calculate the monthly saving required to reach a future target.",category:"Savings",intent:"core"},
  {slug:"emergency-fund",name:"Emergency Fund Calculator",description:"Estimate an emergency-fund target using your essential monthly expenses.",category:"Savings",intent:"core"},
  {slug:"retirement",name:"Retirement Calculator",description:"Project retirement savings, contributions, growth, and inflation-adjusted purchasing power.",category:"Retirement",intent:"core"},
  {slug:"retirement-gap",name:"Retirement Savings Gap Calculator",description:"Estimate whether a target retirement balance is on track and the monthly contribution needed to close a projected gap.",category:"Retirement",intent:"decision"},
];

export function getCalculator(slug:string){return calculators.find(c=>c.slug===slug)}
