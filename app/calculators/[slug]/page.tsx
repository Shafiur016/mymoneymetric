import type {Metadata} from "next";
import {notFound} from "next/navigation";
import Link from "next/link";
import CalculatorEducation from "@/components/CalculatorEducation";
import CalculatorInteractive from "@/components/CalculatorInteractive";
import AdSlot from "@/components/AdSlot";
import {calculators,getCalculator} from "@/lib/calculators";
import {guides} from "@/lib/guides";
import {calculatorContent} from "@/lib/calculatorContent";
import {site} from "@/lib/site";

const actionLabels:Record<string,string>={
 "mortgage":"Estimate payment",
 "mortgage-extra-payment":"Estimate extra-payment savings",
 "mortgage-15-vs-30":"Compare mortgage terms",
 "mortgage-affordability":"Estimate affordability",
 "refinance-break-even":"Compare refinance",
 "loan":"Estimate loan cost",
 "apr":"Estimate APR cost",
 "auto-loan":"Estimate car payment",
 "credit-card":"Estimate payoff",
 "balance-transfer":"Compare transfer options",
 "debt-payoff":"Estimate payoff plan",
 "debt-consolidation":"Compare consolidation",
 "compound-interest":"Project growth",
 "real-return":"Estimate real return",
 "savings":"Estimate savings plan",
 "emergency-fund":"Estimate emergency fund",
 "retirement":"Estimate retirement savings",
 "retirement-gap":"Estimate retirement gap"
};


export function generateStaticParams(){return calculators.map(c=>({slug:c.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;const c=getCalculator(slug);
 return c?{title:`${c.name} — Free Scenario Calculator`,description:`${c.description} Transparent assumptions, formulas, worked examples, limitations, and source notes.`,alternates:{canonical:`/calculators/${slug}`},openGraph:{title:c.name,description:c.description,url:`/calculators/${slug}`,type:"website"}}:{title:"Calculator"}
}

export default async function Page({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params; const c=getCalculator(slug); if(!c)notFound();
 const content=calculatorContent[slug];
 const relatedGuides=guides.filter(g=>g.calculator===slug).slice(0,3);
 const applicationLd={"@context":"https://schema.org","@type":"WebApplication",name:c.name,url:`${site.url}/calculators/${slug}`,applicationCategory:"FinanceApplication",operatingSystem:"Web",offers:{"@type":"Offer",price:"0",priceCurrency:"USD"},description:c.description,dateModified:site.reviewDateIso};
 const faqLd=content?{"@context":"https://schema.org","@type":"FAQPage",mainEntity:content.faqs.map(f=>({"@type":"Question",name:f.q,acceptedAnswer:{"@type":"Answer",text:f.a}}))}:null;
 const breadcrumbLd={"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Calculators",item:`${site.url}/calculators`},{"@type":"ListItem",position:2,name:c.name,item:`${site.url}/calculators/${slug}`} ]};
 return <div className="container py-12">
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(applicationLd)}}/>
  {faqLd&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqLd)}}/>}
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbLd)}}/>
  <div className="max-w-3xl mb-8"><div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-500"><span className="text-blue-700 uppercase tracking-wider">{c.category} calculator</span><span>•</span><span>Methodology reviewed {site.reviewDate}</span><span>•</span><span>Educational use</span>{c.intent==="decision"&&<><span>•</span><span className="text-emerald-700">Scenario comparison</span></>}</div><h1 className="text-4xl md:text-5xl font-black mt-3">{c.name}</h1><p className="text-slate-600 mt-4 leading-7 text-lg">{c.description} Change the assumptions below to compare outcomes and see which inputs drive the result.</p></div>
  <CalculatorInteractive slug={slug} actionLabel={actionLabels[slug]||"Estimate results"}/> 
  {relatedGuides.length>0&&<section className="mt-10"><div className="flex items-end justify-between gap-4"><div><div className="text-sm font-black text-blue-700 uppercase tracking-wider">Understand the assumptions</div><h2 className="text-2xl font-black mt-2">Guides related to this calculator</h2></div><Link href="/guides" className="text-sm font-black text-blue-700">All guides →</Link></div><div className="grid md:grid-cols-3 gap-4 mt-5">{relatedGuides.map(g=><Link key={g.slug} href={`/guides/${g.slug}`} className="card p-5 block"><div className="text-xs font-black text-blue-700 uppercase">{g.category} · {g.readTime}</div><h3 className="font-black text-lg mt-2 leading-snug">{g.title}</h3><p className="text-sm text-slate-500 mt-2 leading-6">{g.excerpt}</p></Link>)}</div></section>}
  <div className="my-10"><AdSlot label="Advertisement — separated from calculator results"/></div>
  <CalculatorEducation slug={slug}/>
 </div>
}
