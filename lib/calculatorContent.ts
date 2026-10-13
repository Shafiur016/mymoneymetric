export type FAQ={q:string;a:string};
export type CalculatorContent={
  formula:string;
  method:string;
  example:string;
  assumptions:string[];
  limitations:string[];
  faqs:FAQ[];
  sources:{label:string;href:string}[];
};

const cfpbTools={label:"Consumer Financial Protection Bureau — Consumer tools",href:"https://www.consumerfinance.gov/consumer-tools/"};
const cfpbMortgage={label:"Consumer Financial Protection Bureau — Loan Estimate explainer",href:"https://www.consumerfinance.gov/owning-a-home/loan-estimate/"};
const cfpbCompare={label:"Consumer Financial Protection Bureau — Compare loan offers",href:"https://www.consumerfinance.gov/owning-a-home/compare/compare-loan-estimates/"};
const cfpbCards={label:"Consumer Financial Protection Bureau — How credit card interest is calculated",href:"https://www.consumerfinance.gov/ask-cfpb/how-does-my-credit-card-company-calculate-the-amount-of-interest-i-owe-en-51/"};
const investorCompound={label:"Investor.gov — Compound Interest Calculator",href:"https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator"};
const investorIntro={label:"Investor.gov — Introduction to Investing",href:"https://www.investor.gov/introduction-investing"};
const ssaEstimate={label:"Social Security Administration — Get a benefits estimate",href:"https://www.ssa.gov/prepare/get-benefits-estimate"};

const fixedLoanAssumptions=["Rate remains constant for the modeled term.","Payments are made monthly and on schedule.","No prepayment penalty is modeled."];
const fixedLoanLimitations=["Real products may use different day-count, rounding, fee, or payment-allocation rules.","The output is an educational estimate, not a lender quote, approval, or eligibility decision."];

export const calculatorContent:Record<string,CalculatorContent>={
 mortgage:{
  formula:"For a fixed-rate loan, monthly principal and interest is M = P × r(1+r)^n / ((1+r)^n − 1), where P is principal, r is the monthly rate, and n is the number of monthly payments.",
  method:"The calculator subtracts the down payment from the home price, converts the annual interest rate to a monthly rate, calculates the level payment, and simulates the amortization schedule to separate principal from interest.",
  example:"A $400,000 home with an $80,000 down payment produces a $320,000 modeled principal balance. Changing the rate or term shows how the monthly principal-and-interest payment and lifetime interest respond.",
  assumptions:fixedLoanAssumptions,
  limitations:["Property taxes, homeowners insurance, mortgage insurance, HOA dues, maintenance, utilities, and closing costs are outside the principal-and-interest result.",...fixedLoanLimitations],
  faqs:[{q:"Does this include property taxes and insurance?",a:"No. The headline payment is principal and interest only. Use the affordability tool when you want to include simplified tax, insurance, and HOA assumptions."},{q:"Why does a small rate change matter so much?",a:"Mortgage terms are long, so the rate affects a large balance for many payment periods."},{q:"Is this a mortgage quote?",a:"No. It is a mathematical scenario based on the inputs you provide."}],sources:[cfpbMortgage,cfpbCompare]
 },
 "mortgage-extra-payment":{
  formula:"The scheduled payment uses the fixed-rate mortgage formula. Each modeled month adds interest to the remaining principal, subtracts the scheduled payment plus extra principal, and repeats until the balance reaches zero.",
  method:"We calculate the normal principal-and-interest payment first, simulate the original payoff path, then simulate the same loan with the selected extra principal amount. The difference gives estimated time and interest saved.",
  example:"If a borrower has $320,000 remaining at 6.5% with 30 years left, adding $100 per month is applied directly to principal in the accelerated scenario. The comparison isolates the effect of that extra payment.",
  assumptions:[...fixedLoanAssumptions,"Every extra payment is applied directly to principal in the same month."],
  limitations:["Servicers may have specific instructions for principal-only payments.","Taxes, insurance, escrow, and prepayment penalties are not modeled.",...fixedLoanLimitations],
  faqs:[{q:"Does an extra payment always reduce interest?",a:"In this fixed-rate model, reducing principal earlier reduces later interest. Confirm that your actual loan accepts additional principal without a penalty or different allocation rule."},{q:"Should I compare extra payments with investing?",a:"That is a broader financial decision involving risk, liquidity, taxes, and alternatives. This calculator only measures the mortgage payoff path."}],sources:[cfpbMortgage,cfpbCompare]
 },
 "mortgage-15-vs-30":{
  formula:"Each term is modeled separately with the standard fixed-payment equation using its own annual rate and number of payments: 180 months for 15 years and 360 months for 30 years.",
  method:"The same home price and down payment are used for both scenarios while you can enter different quoted rates. We compare monthly principal and interest and total modeled interest.",
  example:"Use the same principal but enter the 15-year and 30-year rates available to you. The comparison shows the payment premium of the shorter term and the estimated lifetime-interest difference.",
  assumptions:fixedLoanAssumptions,
  limitations:["The comparison excludes taxes, insurance, mortgage insurance, points, closing costs, and the opportunity cost of the higher 15-year payment.",...fixedLoanLimitations],
  faqs:[{q:"Why allow different rates for each term?",a:"Lenders can price 15-year and 30-year mortgages differently. Using the actual quoted rates makes the comparison more meaningful."},{q:"Does lower lifetime interest automatically make the 15-year loan better?",a:"No. The higher required payment reduces cash-flow flexibility. The calculator quantifies the trade-off but does not choose for you."}],sources:[cfpbMortgage,cfpbCompare]
 },
 "mortgage-affordability":{
  formula:"The tool solves for the approximate home price whose modeled principal-and-interest payment plus property tax plus entered insurance/HOA equals the monthly housing budget.",
  method:"A numerical search repeatedly tests possible home prices. For each price, the calculator subtracts the down payment, calculates mortgage P&I, estimates monthly property tax from the entered annual rate, adds insurance/HOA, and compares the total with your budget.",
  example:"With a $2,500 monthly housing budget, $80,000 down payment, selected rate and term, 1.2% annual property-tax assumption, and $250 monthly insurance/HOA, the tool estimates a price that fits those simplified inputs.",
  assumptions:["The entered monthly housing budget is a planning limit, not a lender-approved payment.","Property tax is modeled as a constant percentage of estimated home price.","Insurance and HOA are represented by one monthly amount."],
  limitations:["Debt-to-income underwriting, credit, income verification, mortgage insurance, maintenance, utilities, closing costs, and changing taxes/insurance are not modeled.","This is not a prequalification or approval tool."],
  faqs:[{q:"Is this how a lender decides what I can afford?",a:"No. Lenders use underwriting rules and verified financial information. This is a personal budgeting scenario only."},{q:"Why include taxes and insurance?",a:"They can materially increase the monthly housing cost beyond principal and interest."}],sources:[cfpbMortgage,cfpbCompare]
 },
 "refinance-break-even":{
  formula:"Simple break-even months = refinance closing costs ÷ monthly payment savings. Net savings over the selected horizon = monthly savings × months held − closing costs.",
  method:"The calculator compares the current and proposed monthly principal-and-interest payments and estimates how many months of payment savings are needed to recover the entered closing costs.",
  example:"If a refinance reduces P&I by $250 per month and costs $6,000, the simple break-even is about 24 months before considering other differences between the loans.",
  assumptions:["Current and new payment inputs are comparable principal-and-interest amounts.","Monthly payment savings remain constant over the selected horizon.","Closing costs are treated as an upfront economic cost."],
  limitations:["Changing loan term, principal balance, financed costs, points, taxes, insurance, cash-out proceeds, and opportunity cost can materially change the refinance decision.","A simple payment break-even is not a full amortization comparison."],
  faqs:[{q:"Is a shorter break-even always better?",a:"It is one useful measure, but a refinance can reset the repayment term or change total interest. Compare the full loan path as well."},{q:"What if I finance the closing costs?",a:"Then the new principal and interest path changes. For a fuller comparison, include financed costs in a loan-amortization scenario rather than relying only on this simple break-even."}],sources:[cfpbMortgage,cfpbCompare]
 },
 loan:{
  formula:"The fixed-payment formula uses principal, monthly interest rate, and number of payments to estimate a level monthly payment.",
  method:"The calculator converts the annual rate to a monthly rate, applies the amortizing-loan payment equation, and separates principal, interest, and any entered upfront fee in the total-cost view.",
  example:"Compare the same $20,000 loan at different rates and terms. A shorter term can increase the required payment while reducing total interest.",
  assumptions:fixedLoanAssumptions,
  limitations:["An entered fee is shown as a separate cost and is not automatically financed.",...fixedLoanLimitations],
  faqs:[{q:"Are origination fees included?",a:"Only if you enter them in the fee field. The calculator does not invent lender-specific charges."},{q:"Can I use this for variable-rate loans?",a:"Only as a rough scenario because the model assumes a constant rate."}],sources:[cfpbTools]
 },
 apr:{
  formula:"The entered APR is treated as the annual rate in a fixed-payment amortization model and converted to a monthly rate.",
  method:"We estimate the level monthly payment, total modeled interest, and total repayment from the amount, APR, and term you enter.",
  example:"Hold the amount and term constant, then compare multiple APRs to see how borrowing cost changes over time.",
  assumptions:fixedLoanAssumptions,
  limitations:["Real-world APR disclosures can incorporate certain fees under legal rules; this simplified tool uses the entered APR directly as the modeled annual rate.",...fixedLoanLimitations],
  faqs:[{q:"Is APR always the same as the note interest rate?",a:"No. Consumer-credit APR can differ from the stated interest rate because of disclosure rules and certain finance charges."},{q:"Does this calculate a legally disclosed APR from fees?",a:"No. It models repayment using an APR you enter."}],sources:[cfpbTools]
 },
 "auto-loan":{
  formula:"Amount financed = vehicle price − down payment. The standard amortizing-loan formula then estimates monthly principal and interest.",
  method:"The calculator determines the financed balance, applies the selected fixed rate and term, and estimates total repayment and interest.",
  example:"Try the same vehicle price with different down payments or terms to see the trade-off between monthly payment and lifetime interest.",
  assumptions:fixedLoanAssumptions,
  limitations:["Sales tax, title/registration, dealer fees, warranties, add-ons, trade-in effects, and insurance are excluded unless you incorporate them into your inputs.",...fixedLoanLimitations],
  faqs:[{q:"Does this include taxes and dealer fees?",a:"No. Add them to the vehicle price if you intentionally want to approximate a larger financed amount."},{q:"Does a longer term lower the total cost?",a:"It usually lowers the scheduled payment but can increase total interest."}],sources:[cfpbTools]
 },
 "credit-card":{
  formula:"The simplified payoff simulation adds one month of interest at APR ÷ 12, subtracts the monthly payment, and repeats until the balance reaches zero.",
  method:"We simulate the balance month by month at a constant APR and compare the selected payment with an optional extra payment.",
  example:"Increase the payment by $50 or $100 and compare the change in estimated payoff time and total interest.",
  assumptions:["APR remains constant.","No new purchases, cash advances, fees, or missed payments occur.","The same payment is made each month until the final payoff."],
  limitations:["Many issuers calculate interest daily and may apply different APRs to purchases, transfers, or cash advances.","Statement timing, fees, grace periods, and payment-allocation rules can make actual results differ."],
  faqs:[{q:"Why might my card statement differ?",a:"Issuers can use daily periodic rates, different billing-cycle lengths, fees, multiple APR categories, and transaction-specific rules."},{q:"What does payment too low mean?",a:"The entered payment is not large enough to reduce the balance under the simplified interest assumption."}],sources:[cfpbCards]
 },
 "balance-transfer":{
  formula:"Current-card cost is simulated at the current APR. The transfer scenario adds the transfer fee to cost, applies 0% for the entered promotional months, then applies the post-promotional APR until payoff.",
  method:"Both scenarios use the same monthly payment so the comparison isolates the entered transfer terms. We compare payoff time and total financing cost, where transfer cost includes the fee plus modeled interest.",
  example:"For an $8,000 balance, compare staying at 24% APR with a 3% transfer fee, 15 promotional months at 0%, and 21% afterward while paying $350 monthly.",
  assumptions:["The transfer completes successfully and the full modeled balance qualifies for the promotional terms.","The monthly payment remains constant.","No new purchases or additional fees are added."],
  limitations:["Real offers can have minimum fees, transfer deadlines, transaction-specific APRs, late-payment consequences, or payment-allocation rules.","Eligibility and credit-limit decisions are not modeled."],
  faqs:[{q:"Can a 0% transfer still cost money?",a:"Yes. A transfer fee can be charged immediately, and interest may apply after the promotional period if a balance remains."},{q:"What is the most important input?",a:"The payment amount and promotional length together determine how much balance remains when the post-promo APR begins."}],sources:[cfpbCards,cfpbTools]
 },
 "debt-payoff":{
  formula:"The balance is updated monthly by adding interest at annual rate ÷ 12 and subtracting the planned payment.",
  method:"The tool simulates one blended debt balance until payoff or until it detects that the payment cannot reduce the balance.",
  example:"Compare your current payment with a larger payment to estimate how additional monthly cash flow may reduce payoff time and interest.",
  assumptions:["One balance and one constant annual rate represent the debt.","No new borrowing or fees are added.","Payments are made monthly."],
  limitations:["Multiple debts with different rates and minimum-payment rules are not individually prioritized.","Fees, penalties, promotional rates, and changing APRs are excluded."],
  faqs:[{q:"Does this support snowball or avalanche ordering?",a:"No. It models one blended balance. The consolidation tool separately compares a blended current path with a new loan."},{q:"Are late fees included?",a:"No."}],sources:[cfpbTools]
 },
 "debt-consolidation":{
  formula:"The current path uses a month-by-month payoff simulation at the entered blended APR and payment. The proposed consolidation loan uses the fixed-payment amortization equation plus the entered origination fee.",
  method:"We compare the modeled cost and payoff duration of keeping the current blended debt with replacing it by the proposed fixed-rate loan.",
  example:"Enter $18,000 of debt at a blended 21% APR with a $650 payment, then compare a 3-year 11% loan with a 3% origination fee.",
  assumptions:["The current debts can be reasonably approximated by one blended APR and one total payment.","The proposed loan rate and term remain fixed.","Paid-off revolving balances are not rebuilt after consolidation."],
  limitations:["A blended APR can hide important differences between individual debts.","Balance-transfer promotions, changing minimum payments, taxes, credit-score effects, and lender eligibility are not modeled."],
  faqs:[{q:"Can a lower monthly payment still cost more?",a:"Yes. Extending the repayment term can increase total interest even when the rate or monthly payment is lower."},{q:"Why include an origination fee?",a:"Upfront fees are part of the economic cost and can reduce or eliminate the expected savings."}],sources:[cfpbTools]
 },
 "compound-interest":{
  formula:"Future value combines the compounded starting balance with the future value of recurring monthly contributions under a constant assumed annual return.",
  method:"We compound the existing balance monthly and add the same contribution each month over the selected horizon.",
  example:"Compare conservative, base, and optimistic return assumptions rather than treating one projected balance as a forecast.",
  assumptions:["The annual return is constant and compounded monthly.","Contributions are made monthly.","No withdrawals occur."],
  limitations:["Actual investments fluctuate and can lose value.","Taxes, fees, fund expenses, account rules, and inflation are excluded from the nominal projection."],
  faqs:[{q:"Is the selected return guaranteed?",a:"No. It is only a mathematical assumption."},{q:"When should I use the inflation-adjusted calculator?",a:"Use it when you want to translate a nominal future balance into approximate today's-dollar purchasing power."}],sources:[investorCompound,investorIntro]
 },
 "real-return":{
  formula:"Approximate real annual return = (1 + nominal return) ÷ (1 + inflation) − 1. Today's-dollar future value = nominal future value ÷ (1 + inflation)^years.",
  method:"We first project the account using the nominal return and recurring contributions, then discount the ending balance by the inflation assumption over the same horizon.",
  example:"A nominal 7% return with 2.5% inflation does not imply a 7% increase in purchasing power. The real-return calculation isolates the approximate difference.",
  assumptions:["Nominal return and inflation remain constant for the entire modeled period.","Contributions are entered in nominal dollars and held constant.","Inflation is represented by one broad annual rate."],
  limitations:["Actual returns and inflation vary year to year.","Personal spending inflation can differ from broad inflation measures, and taxes/fees are excluded."],
  faqs:[{q:"Can I just subtract inflation from return?",a:"Subtraction is a rough shortcut. The calculator uses the multiplicative real-return relationship, which is more accurate."},{q:"Does today's-dollar value predict future purchasing power exactly?",a:"No. It is a scenario based on one inflation assumption."}],sources:[investorCompound,investorIntro]
 },
 savings:{
  formula:"The required recurring contribution is derived from the future-value equation for an annuity after allowing the amount already saved to grow.",
  method:"We estimate the monthly contribution needed to close the remaining future-value gap over the selected number of years at a constant assumed return.",
  example:"Compare a zero-return cash scenario with a modest interest scenario to understand how time and rate change the monthly contribution required.",
  assumptions:["The selected return remains constant.","Contributions are made monthly.","The future goal amount itself does not change."],
  limitations:["Inflation is not automatically added to the goal.","Taxes, account fees, withdrawal restrictions, and product-specific rates are excluded."],
  faqs:[{q:"What happens if the return is 0%?",a:"The tool divides the remaining goal by the number of monthly contributions."},{q:"Should I increase the goal for inflation?",a:"If the goal represents a future purchase whose price may rise, consider testing a higher future target."}],sources:[cfpbTools,investorCompound]
 },
 "emergency-fund":{
  formula:"Emergency-fund target = monthly essential expenses × desired months of coverage.",
  method:"This is a reserve-target framework. It does not project investment returns or determine a universally correct number of months.",
  example:"At $3,500 of essential monthly expenses and six months of coverage, the modeled target is $21,000.",
  assumptions:["The monthly expense input reasonably represents the costs you want the reserve to cover.","The selected coverage period is your planning choice."],
  limitations:["Income stability, dependents, insurance, debt, access to credit, and other liquid assets can change an appropriate reserve.","The tool does not recommend an account or investment product."],
  faqs:[{q:"How many months should I choose?",a:"There is no universal number. Test several coverage periods based on your own risk and cash-flow situation."},{q:"Should I include discretionary spending?",a:"The default concept is essential expenses, but you can enter the monthly amount that fits your planning objective."}],sources:[cfpbTools]
 },
 retirement:{
  formula:"The model compounds current savings and recurring monthly contributions using a constant assumed annual return over the selected years.",
  method:"We project the current balance forward, add monthly contributions, and separate future contributions from modeled growth.",
  example:"Run several return and contribution scenarios. A range is more informative than treating one future account balance as certain.",
  assumptions:["Return is constant and compounded monthly.","Contributions stay constant.","No withdrawals occur before the modeled retirement date."],
  limitations:["The tool does not calculate retirement spending, taxes, Social Security, pensions, healthcare, withdrawals, or investment volatility.","Actual market returns can differ substantially from the assumption."],
  faqs:[{q:"Does this estimate retirement income?",a:"No. It estimates a future account balance only."},{q:"Where should Social Security be estimated?",a:"Use the Social Security Administration's personalized benefit tools for benefits based on your earnings record."}],sources:[investorIntro,ssaEstimate]
 },
 "retirement-gap":{
  formula:"Projected balance = future value of current savings plus future value of monthly contributions. Gap = target − projected balance. Required monthly contribution is solved from the annuity future-value equation.",
  method:"The tool first projects the current plan, compares that result with your target, and then solves backward for the monthly contribution that would reach the same target under the selected constant-return assumption.",
  example:"Enter current savings, monthly contributions, 25 years, a 6% return assumption, and a $1.5 million target to see whether the current contribution path reaches that target and what monthly contribution the model would require.",
  assumptions:["The target balance is an input chosen by the user rather than a recommendation.","Return and contributions remain constant.","No pre-retirement withdrawals occur."],
  limitations:["A target balance is not a retirement-income plan.","Taxes, inflation, Social Security, pensions, healthcare, spending, investment volatility, and withdrawal strategy are outside this calculation."],
  faqs:[{q:"Where does the target come from?",a:"You choose it. Ideally, a target should be connected to a separate retirement-spending analysis rather than a universal rule of thumb."},{q:"Why can the required contribution differ so much when I change return?",a:"Long horizons magnify return assumptions. That is why several conservative-to-optimistic scenarios are preferable to one forecast."}],sources:[investorIntro,investorCompound,ssaEstimate]
 }
};
