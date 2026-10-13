import Link from "next/link";
import {calculators,getCalculator} from "@/lib/calculators";
import {calculatorContent} from "@/lib/calculatorContent";
import {site} from "@/lib/site";

export default function CalculatorEducation({slug}:{slug:string}){
 const content=calculatorContent[slug]; if(!content)return null;
 const current=getCalculator(slug);
 const sameCategory=calculators.filter(c=>c.slug!==slug&&c.category===current?.category);
 const related=[...sameCategory,...calculators.filter(c=>c.slug!==slug&&c.category!==current?.category)].slice(0,4);
 return <div className="grid lg:grid-cols-[1fr_.34fr] gap-8 items-start">
  <article className="prose max-w-none">
   <h2>How the calculation works</h2><p>{content.method}</p>
   <div className="formula-box"><div className="text-xs font-black uppercase tracking-wider text-blue-700 mb-2">Method / formula</div><p className="m-0 text-slate-700">{content.formula}</p></div>
   <h2>Worked example</h2><p>{content.example}</p>
   <h2>Key assumptions</h2><ul>{content.assumptions.map(x=><li key={x}>{x}</li>)}</ul>
   <h2>Important limitations</h2><ul>{content.limitations.map(x=><li key={x}>{x}</li>)}</ul>
   <h2>Frequently asked questions</h2>{content.faqs.map((f,i)=><section key={i} className="faq"><h3>{f.q}</h3><p>{f.a}</p></section>)}
   <h2>Methodology and source notes</h2><p>{site.name} calculators use transparent mathematical models and user-entered assumptions. They are designed for scenario analysis, not product quotations, approvals, or individualized recommendations. Product-specific rates, eligibility rules, fees, taxes, insurance costs, and legal requirements should be verified with primary sources before making a financial decision.</p>
   <ul>{content.sources.map(s=><li key={s.href}><a className="text-blue-700 underline" href={s.href} target="_blank" rel="noreferrer">{s.label}</a></li>)}</ul>
  </article>
  <aside className="card p-6 lg:sticky lg:top-24"><div className="text-sm font-black text-blue-700 uppercase tracking-wider">Related calculators</div><div className="mt-3 grid gap-3">{related.map(c=><Link key={c.slug} href={`/calculators/${c.slug}`} className="rounded-xl border border-slate-200 p-4 hover:border-blue-300"><div className="font-black">{c.name}</div><div className="text-xs text-slate-500 mt-1 leading-5">{c.description}</div></Link>)}</div><div className="mt-6 pt-5 border-t border-slate-100 text-xs text-slate-500 leading-5"><b className="text-slate-700">Methodology reviewed:</b> {site.reviewDate}<br/><b className="text-slate-700">Editorial standard:</b> transparent assumptions, visible limitations, source-linked methodology, educational use only.</div></aside>
 </div>
}
