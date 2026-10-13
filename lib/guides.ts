import {guideContent} from "@/lib/guideContent";
import {guideContentExtra} from "@/lib/guideContentExtra";
import {guideContentDeep} from "@/lib/guideContentDeep";
import {site} from "@/lib/site";

export type Guide={slug:string;title:string;excerpt:string;category:string;calculator:string;updated:string;readTime:string};
type BaseGuide=Omit<Guide,"updated"|"readTime">;

const baseGuides:BaseGuide[]=[
 {slug:"mortgage-payment-components",title:"What Makes Up a Mortgage Payment?",excerpt:"Understand principal, interest, taxes, insurance, mortgage insurance, and other housing costs that can sit behind one monthly payment.",category:"Home",calculator:"mortgage"},
 {slug:"mortgage-amortization-explained",title:"Mortgage Amortization Explained",excerpt:"See why early mortgage payments are interest-heavy and how the principal balance changes over time.",category:"Home",calculator:"mortgage"},
 {slug:"mortgage-term-15-vs-30",title:"15-Year vs. 30-Year Mortgage: The Payment and Interest Trade-Off",excerpt:"Compare how term length changes monthly payment pressure and lifetime interest cost.",category:"Home",calculator:"mortgage-15-vs-30"},
 {slug:"personal-loan-apr",title:"How Personal Loan APR Affects Total Cost",excerpt:"Learn why a small APR difference can materially change the amount repaid over several years.",category:"Loans",calculator:"loan"},
 {slug:"personal-loan-term",title:"Short vs. Long Personal Loan Terms",excerpt:"A lower monthly payment can come with a higher total borrowing cost. Here is how to compare both sides.",category:"Loans",calculator:"loan"},
 {slug:"apr-vs-interest-rate",title:"APR vs. Interest Rate: What Is the Difference?",excerpt:"Understand why a loan's advertised interest rate and APR can tell different stories about borrowing cost.",category:"Loans",calculator:"apr"},
 {slug:"credit-card-interest",title:"How Credit Card Interest Works",excerpt:"Learn how APR, balances, payment timing, and issuer calculation methods influence interest charges.",category:"Credit",calculator:"credit-card"},
 {slug:"credit-card-minimum-payments",title:"Why Minimum Credit Card Payments Can Extend Debt for Years",excerpt:"Understand the trade-off between a small required payment and the time and interest needed to eliminate a balance.",category:"Credit",calculator:"credit-card"},
 {slug:"credit-card-payoff-strategy",title:"How to Build a Credit Card Payoff Scenario",excerpt:"Use payment scenarios to estimate payoff time, interest cost, and the effect of paying extra each month.",category:"Credit",calculator:"credit-card"},
 {slug:"compound-growth",title:"Why Compound Growth Matters Over Long Time Horizons",excerpt:"A clear explanation of how starting balance, contributions, time, and return assumptions interact.",category:"Investing",calculator:"compound-interest"},
 {slug:"compound-interest-contributions",title:"Lump Sum vs. Monthly Contributions in a Growth Projection",excerpt:"See how recurring contributions can become as important as the starting balance in long-term projections.",category:"Investing",calculator:"compound-interest"},
 {slug:"investment-return-assumptions",title:"How to Choose Return Assumptions for a Calculator",excerpt:"Why conservative, base, and optimistic scenarios are more useful than treating one return number as a forecast.",category:"Investing",calculator:"compound-interest"},
 {slug:"retirement-savings-basics",title:"Retirement Savings Projections: What the Number Does and Does Not Mean",excerpt:"Learn what a future balance projection captures—and what it leaves out, including inflation, taxes, Social Security, and spending.",category:"Retirement",calculator:"retirement"},
 {slug:"retirement-inflation",title:"Why Inflation Matters in Retirement Planning",excerpt:"Translate a future nominal account balance into approximate today's-dollar purchasing power.",category:"Retirement",calculator:"real-return"},
 {slug:"retirement-contribution-scenarios",title:"How Monthly Contributions Change a Retirement Projection",excerpt:"Compare contribution levels and understand why time can amplify seemingly modest monthly differences.",category:"Retirement",calculator:"retirement"},
 {slug:"mortgage-extra-payments",title:"How Extra Mortgage Payments Change Interest and Payoff Time",excerpt:"Understand how additional principal payments can shorten a mortgage and reduce future interest, plus the checks to make before paying extra.",category:"Home",calculator:"mortgage-extra-payment"},
 {slug:"mortgage-affordability-budget",title:"How to Estimate a Mortgage Payment You Can Actually Budget For",excerpt:"Move beyond the principal-and-interest number by accounting for taxes, insurance, maintenance, and cash reserves.",category:"Home",calculator:"mortgage-affordability"},
 {slug:"mortgage-closing-costs",title:"Mortgage Closing Costs: What to Include Beyond the Down Payment",excerpt:"A practical guide to lender charges, third-party costs, prepaid items, and why cash to close can differ from the down payment.",category:"Home",calculator:"mortgage"},
 {slug:"personal-loan-fees-total-cost",title:"Personal Loan Fees and Total Borrowing Cost",excerpt:"Learn how origination fees and other charges can change the effective cost of a personal loan even when the monthly payment looks manageable.",category:"Loans",calculator:"loan"},
 {slug:"debt-consolidation-math",title:"Debt Consolidation Math: When a New Loan Can Cost Less—or More",excerpt:"Compare rate, term, fees, payment, and total interest before replacing several debts with one consolidation loan.",category:"Loans",calculator:"debt-consolidation"},
 {slug:"credit-utilization-explained",title:"Credit Utilization Explained Without the Myths",excerpt:"Understand what credit utilization measures, why reported balances matter, and why one ratio should not be treated as a complete credit score formula.",category:"Credit",calculator:"credit-card"},
 {slug:"balance-transfer-cost-check",title:"How to Evaluate a Credit Card Balance Transfer Offer",excerpt:"Compare transfer fees, promotional periods, post-promotion APR, and payoff pace before assuming a 0% offer will save money.",category:"Credit",calculator:"balance-transfer"},
 {slug:"compound-interest-monthly-500",title:"What Monthly Contributions Do to Compound Growth",excerpt:"A worked framework for comparing recurring contribution scenarios without treating an assumed investment return as a guaranteed forecast.",category:"Investing",calculator:"compound-interest"},
 {slug:"compound-interest-inflation",title:"Compound Growth vs. Inflation: Nominal Returns Are Not Purchasing Power",excerpt:"Learn why a future balance can grow while its real purchasing power grows more slowly, and how to compare nominal and inflation-adjusted scenarios.",category:"Investing",calculator:"real-return"},
 {slug:"retirement-savings-gap",title:"How to Estimate a Retirement Savings Gap",excerpt:"A scenario-based framework for comparing projected savings with future spending needs without pretending one target can fit every household.",category:"Retirement",calculator:"retirement-gap"},
];

const allContent={...guideContent,...guideContentExtra,...guideContentDeep};
function wordCount(slug:string){const c=allContent[slug];if(!c)return 0;return [c.intro,...c.sections.flatMap(s=>[s.heading,...s.paragraphs,...(s.bullets||[])]),...c.takeaways].join(" ").trim().split(/\s+/).filter(Boolean).length}
function readTime(slug:string){return `${Math.max(1,Math.ceil(wordCount(slug)/220))} min`}

export const guides:Guide[]=baseGuides.map(g=>({...g,updated:site.reviewDate,readTime:readTime(g.slug)}));
export function getGuideContent(slug:string){return allContent[slug]}
export function getGuideWordCount(slug:string){return wordCount(slug)}
export function isGuideIndexable(slug:string){return wordCount(slug)>=400}
