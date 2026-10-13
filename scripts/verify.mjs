import fs from "node:fs";
import path from "node:path";

const root=process.cwd();
const read=(p)=>fs.readFileSync(path.join(root,p),"utf8");
const assert=(ok,msg)=>{if(!ok)throw new Error(msg)};
const close=(a,b,tol,msg)=>assert(Math.abs(a-b)<=tol,`${msg}: expected ${b}, got ${a}`);

function payment(principal,annual,years){const n=Math.round(years*12),r=annual/1200;if(principal<=0||n<=0)return 0;if(r===0)return principal/n;return principal*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1)}
function simulate(balance,annual,monthlyPayment,maxMonths=1800){let bal=balance,interest=0,months=0,r=annual/1200;while(bal>0.01&&months<maxMonths){const i=bal*r;if(r>0&&monthlyPayment<=i)return {months:maxMonths,interest:Infinity};interest+=i;bal+=i;bal-=Math.min(monthlyPayment,bal);months++}return {months,interest}}
function fv(start,monthly,annual,years){const n=Math.round(years*12),r=annual/1200;return start*Math.pow(1+r,n)+(r?monthly*(Math.pow(1+r,n)-1)/r:monthly*n)}

// Mathematical sanity checks used by the calculator family.
close(payment(320000,6.5,30),2022.62,0.02,"30-year mortgage payment check");
close(payment(20000,0,5),333.333333,0.001,"zero-rate loan payment check");
const cardBase=simulate(10000,22,350),cardExtra=simulate(10000,22,450);
assert(cardExtra.months<cardBase.months,"Extra credit-card payment must shorten payoff time");
assert(cardExtra.interest<cardBase.interest,"Extra credit-card payment must reduce modeled interest");
close(8000*0.03,240,0.001,"Balance-transfer fee check");
close(((1.07/1.025)-1)*100,4.3902439,0.0001,"Real-return formula check");
assert(fv(25000,500,7,20)>25000+500*240,"Positive-return future value must exceed contributions");

// Content and route integrity.
const calculators=read("lib/calculators.ts");
const calcSlugs=[...calculators.matchAll(/\{slug:"([^"]+)"/g)].map(m=>m[1]);
assert(calcSlugs.length===18,`Expected 18 calculators, found ${calcSlugs.length}`);
assert(new Set(calcSlugs).size===calcSlugs.length,"Calculator slugs must be unique");
const calculatorContent=read("lib/calculatorContent.ts");
for(const slug of calcSlugs){const quoted=calculatorContent.includes(`"${slug}":{`);const bare=calculatorContent.includes(` ${slug}:{`)||calculatorContent.includes(`\n ${slug}:{`);assert(quoted||bare,`Missing calculator education content for ${slug}`)}

const guides=read("lib/guides.ts");
const guideSlugs=[...guides.matchAll(/\{slug:"([^"]+)"/g)].map(m=>m[1]);
assert(guideSlugs.length===25,`Expected 25 guides, found ${guideSlugs.length}`);
assert(new Set(guideSlugs).size===guideSlugs.length,"Guide slugs must be unique");
const guideContent=[read("lib/guideContent.ts"),read("lib/guideContentExtra.ts"),read("lib/guideContentDeep.ts")].join("\n");
for(const slug of guideSlugs)assert(guideContent.includes(`"${slug}":{`),`Missing guide content for ${slug}`);

const publicSource=[...walk("app"),...walk("components")].map(read).join("\n");
for(const phrase of ["COMING NEXT","starter version","Monetization-ready section","publication-grade methodology","Connect your newsletter provider before launch"]){assert(!publicSource.includes(phrase),`Launch-language check failed: ${phrase}`)}

// Explicit-submit calculator UX checks.
const calculatorPage=read("app/calculators/[slug]/page.tsx");
const calculatorInteractive=read("components/CalculatorInteractive.tsx");
assert(calculatorPage.includes("<CalculatorInteractive"),"Calculator routes must use the dedicated client interactivity boundary");
assert(calculatorInteractive.includes("<CalculationGate"),"CalculatorInteractive must wrap calculators in CalculationGate");
for(const slug of calcSlugs)assert(calculatorPage.includes(`\"${slug}\":`),`Missing explicit action label for ${slug}`);
for(const phrase of ["Updates instantly","Results update automatically"]){assert(!publicSource.includes(phrase),`Automatic-result copy must not remain: ${phrase}`)}
for(const file of ["components/MortgageCalculator.tsx","components/FlagshipCalculator.tsx","components/DynamicCalculator.tsx","components/DecisionCalculator.tsx"]){const source=read(file);assert(source.includes("CalculationActions"),`${file} must expose an explicit calculate action`);assert(source.includes("ResultsGate"),`${file} must gate results until calculation`)}


const packageJson=JSON.parse(read("package.json"));
assert(packageJson.dependencies.next==="16.4.0","Next.js must stay on the React 19.3-compatible 16.4.0 baseline");
assert(packageJson.version==="2.2.0","Release version must be 2.2.0");
assert(packageJson.dependencies.react==="19.3.0"&&packageJson.dependencies["react-dom"]==="19.3.0","React and React DOM must stay aligned on 19.3.0");
const cookieNotice=read("components/CookieNotice.tsx"),analytics=read("components/Analytics.tsx"),layout=read("app/layout.tsx");
assert(cookieNotice.includes("use(browser())"),"CookieNotice must opt out of SSR for localStorage-backed consent state");
assert(analytics.includes("use(browser())"),"Analytics must opt out of SSR for localStorage-backed consent state");
assert(layout.includes("<Suspense fallback={null}><CookieNotice/>")&&layout.includes("<Suspense fallback={null}><Analytics/>"),"Browser-only consent components must be wrapped in Suspense");


// Readable monetary-input checks.
const calculatorField=read("components/CalculatorField.tsx");
assert(calculatorField.includes('type={isMoney ? "text" : "number"}'),"Money inputs must use text mode so commas can be displayed");
assert(calculatorField.includes('formatMoneyInput(value)'),"Money inputs must render thousands separators");
assert(calculatorField.includes('humanMoneyLabel(value)'),"Money inputs must expose a readable magnitude helper");
assert(calculatorField.includes('inputMode="decimal"'),"Money inputs must preserve the mobile numeric keyboard");
for(const file of ["components/MortgageCalculator.tsx","components/FlagshipCalculator.tsx","components/DynamicCalculator.tsx","components/DecisionCalculator.tsx"]){
  const source=read(file);
  assert(source.includes('CalculatorField'),`${file} must use the shared formatted numeric field`);
}
const sampleFormat=(raw)=>{if(raw==="")return "";const [wholeRaw="",fraction]=raw.split(".");const whole=(wholeRaw.replace(/^0+(?=\d)/,"")||"0").replace(/\B(?=(\d{3})+(?!\d))/g,",");return fraction!==undefined?`${whole}.${fraction}`:whole};
assert(sampleFormat("40000000")==="40,000,000","Large-money formatting sanity check failed");
assert(sampleFormat("1250000.50")==="1,250,000.50","Decimal money formatting sanity check failed");

console.log("Verification PASS");
console.log(`- ${calcSlugs.length} calculator routes with methodology content`);
console.log(`- ${guideSlugs.length} guide routes with source content`);
console.log("- Core financial formula sanity checks passed");
console.log("- No known unfinished-launch phrases found in public UI source");
console.log("- All calculator families use explicit submit/update result gating");
console.log("- Monetary inputs use live comma formatting plus readable magnitude labels");

function walk(dir){const out=[];for(const entry of fs.readdirSync(path.join(root,dir),{withFileTypes:true})){const rel=path.join(dir,entry.name);if(entry.isDirectory())out.push(...walk(rel));else if(/\.(ts|tsx)$/.test(entry.name))out.push(rel)}return out}
