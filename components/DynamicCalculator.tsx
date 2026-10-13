"use client";

import {useMemo,useState} from "react";
import {CalculationActions,ResultsGate} from "@/components/CalculationGate";
import CalculatorField from "@/components/CalculatorField";

const money=(n:number)=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(isFinite(n)?n:0);
type NumericInput=string;
const num=(value:NumericInput)=>{const parsed=Number(value);return value.trim()===""||!Number.isFinite(parsed)?0:Math.max(0,parsed)};
function pmt(principal:number,annual:number,years:number){const n=years*12,r=annual/1200;if(n<=0)return 0;if(r===0)return principal/n;return principal*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1)}
function Field({label,value,setValue,suffix}:{label:string,value:NumericInput,setValue:(n:NumericInput)=>void,suffix?:string}){return <CalculatorField label={label} value={value} onChange={setValue} suffix={suffix}/>}
function Result({label,value,primary=false}:{label:string,value:string,primary?:boolean}){return <div className={primary?"rounded-xl bg-blue-700 text-white p-5":"rounded-xl bg-slate-50 border border-slate-100 p-5"}><div className={primary?"text-blue-100 text-xs font-bold uppercase":"text-slate-500 text-xs font-bold uppercase"}>{label}</div><div className="text-2xl font-black mt-1">{value}</div></div>}

export default function DynamicCalculator({slug}:{slug:string}){
 const defaults={
  a:String(slug==="auto-loan"?35000:slug==="debt-payoff"?10000:slug==="savings"?50000:slug==="emergency-fund"?3500:20000),
  b:String(slug==="auto-loan"?5000:slug==="debt-payoff"?350:slug==="savings"?5000:slug==="emergency-fund"?6:6.5),
  c:String(slug==="auto-loan"?6.9:slug==="debt-payoff"?20:slug==="savings"?5:3),
  d:String(slug==="auto-loan"?5:0)
 };
 const [a,setA]=useState<NumericInput>(defaults.a),[b,setB]=useState<NumericInput>(defaults.b),[c,setC]=useState<NumericInput>(defaults.c),[d,setD]=useState<NumericInput>(defaults.d);
 const av=num(a),bv=num(b),cv=num(c),dv=num(d);
 const out=useMemo(()=>{
  if(slug==="loan"||slug==="apr"){if(av<=0||cv<=0)return [money(0),money(0),money(0)];const m=pmt(av,bv,cv);return [money(m),money(Math.max(0,m*cv*12-av)),money(m*cv*12)]}
  if(slug==="auto-loan"){if(av<=0||dv<=0)return [money(0),money(0),money(0)];const principal=Math.max(0,av-bv),m=pmt(principal,cv,dv);return [money(m),money(m*dv*12),money(Math.max(0,m*dv*12-principal))]}
  if(slug==="debt-payoff"){if(av<=0)return ["0 yr 0 mo",money(0),money(0)];if(bv<=0)return ["Payment too low","—","—"];let bal=av,r=cv/1200,months=0,interest=0;while(bal>0&&months<1200){const i=bal*r;if(bv<=i&&r>0)return ["Payment too low","—","—"];interest+=i;bal+=i;bal-=Math.min(bv,bal);months++}return [months>=1200?"Payment too low":`${Math.floor(months/12)} yr ${months%12} mo`,money(interest),money(av+interest)]}
  if(slug==="savings"){const months=Math.max(0,Math.round(cv*12)),r=bv/1200,target=Math.max(0,av-dv),req=months>0?(r?target*r/(Math.pow(1+r,months)-1):target/months):0;return [money(req),money(req*months),money(av)]}
  if(slug==="emergency-fund")return [money(av*bv),money(av),`${bv} months`];
  return [money(0),money(0),money(0)];
 },[slug,av,bv,cv,dv]);
 const labels:any={loan:[["Loan amount",a,setA,"$"],["Interest rate",b,setB,"%"],["Loan term",c,setC,"years"]],"auto-loan":[["Vehicle price",a,setA,"$"],["Down payment",b,setB,"$"],["Interest rate",c,setC,"%"],["Loan term",d,setD,"years"]],"debt-payoff":[["Debt balance",a,setA,"$"],["Monthly payment",b,setB,"$"],["Interest rate",c,setC,"%"]],savings:[["Savings goal",a,setA,"$"],["Annual return",b,setB,"%"],["Years",c,setC,"years"],["Already saved",d,setD,"$"]],"emergency-fund":[["Monthly essential expenses",a,setA,"$"],["Months of expenses",b,setB,"months"]],apr:[["Loan amount",a,setA,"$"],["APR",b,setB,"%"],["Loan term",c,setC,"years"]]}[slug]||[];
 const resultLabels:any={loan:["Monthly payment","Total interest","Total repayment"],"auto-loan":["Estimated monthly payment","Total repayment","Total interest"],"debt-payoff":["Estimated payoff time","Estimated interest","Estimated total paid"],savings:["Required monthly saving","Total new contributions","Goal"],"emergency-fund":["Suggested fund target","Monthly essentials","Coverage"],apr:["Monthly payment","Total interest","Total repayment"]}[slug]||[];
 const validation=(()=>{
  if(a.trim()===""||av<=0)return "Enter a primary amount greater than 0.";
  if((slug==="loan"||slug==="apr")&&(c.trim()===""||cv<=0))return "Enter a loan term greater than 0.";
  if(slug==="auto-loan"&&(d.trim()===""||dv<=0))return "Enter a loan term greater than 0.";
  if(slug==="auto-loan"&&bv>av)return "Down payment cannot exceed the vehicle price.";
  if(slug==="debt-payoff"&&(b.trim()===""||bv<=0))return "Enter a monthly payment greater than 0.";
  if(slug==="savings"&&(c.trim()===""||cv<=0))return "Enter a savings horizon greater than 0.";
  if(slug==="emergency-fund"&&(b.trim()===""||bv<=0))return "Enter a coverage period greater than 0.";
  return "";
 })();
 return <div className="grid lg:grid-cols-[1fr_.85fr] gap-6"><div className="card p-6"><div className="grid sm:grid-cols-2 gap-5">{labels.map((x:any,i:number)=><Field key={i} label={x[0]} value={x[1]} setValue={x[2]} suffix={x[3]}/>)}</div><CalculationActions validationMessage={validation}/><p className="text-xs text-slate-500 mt-5">Actual products may include fees, taxes, insurance, changing rates, or other costs not represented here.</p></div><div className="card p-6"><div className="text-sm font-black mb-4">Estimated results</div><ResultsGate><div className="grid gap-3">{out.map((v,i)=><Result key={i} label={resultLabels[i]} value={v} primary={i===0}/>)}</div></ResultsGate></div></div>;
}
