"use client";

import {useMemo,useState} from "react";
import {CalculatedOnly,CalculationActions,ResultsGate} from "@/components/CalculationGate";
import CalculatorField from "@/components/CalculatorField";

const money=(n:number)=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(isFinite(n)?n:0);
type NumericInput = string;
const num=(value:NumericInput)=>{const parsed=Number(value);return value.trim()===""||!Number.isFinite(parsed)?0:Math.max(0,parsed)};
const monthlyPayment=(principal:number,annual:number,years:number)=>{const n=years*12,r=annual/1200;if(n<=0)return 0;if(r===0)return principal/n;return principal*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1)};

function Field({label,value,setValue,suffix}:{label:string,value:NumericInput,setValue:(n:NumericInput)=>void,suffix?:string}){
  return <CalculatorField label={label} value={value} onChange={setValue} suffix={suffix}/>;
}

export default function MortgageCalculator(){
  const [price,setPrice]=useState<NumericInput>("400000"),[down,setDown]=useState<NumericInput>("80000"),[rate,setRate]=useState<NumericInput>("6.5"),[years,setYears]=useState<NumericInput>("30");
  const priceN=num(price),downN=num(down),rateN=num(rate),yearsN=num(years);
  const model=useMemo(()=>{
    const principal=Math.max(0,priceN-downN),payment=monthlyPayment(principal,rateN,yearsN),months=Math.max(0,Math.round(yearsN*12)),r=rateN/1200;
    let balance=principal,totalInterest=0; const rows:any[]=[];
    for(let m=1;m<=months&&balance>0.01;m++){
      const interest=balance*r,principalPaid=Math.min(balance,Math.max(0,payment-interest));
      balance=Math.max(0,balance-principalPaid);totalInterest+=interest;
      if(m<=12||m===months||m%12===0)rows.push({m,payment:Math.min(payment,principalPaid+interest),principal:principalPaid,interest,balance});
    }
    return {principal,payment,totalInterest,totalPaid:principal+totalInterest,rows};
  },[priceN,downN,rateN,yearsN]);
  const principalPct=model.totalPaid?Math.round(model.principal/model.totalPaid*100):0,interestPct=100-principalPct;
  const validation=price.trim()===""||priceN<=0?"Enter a home price greater than 0.":years.trim()===""||yearsN<=0?"Enter a loan term greater than 0.":downN>priceN?"Down payment cannot exceed the home price.":"";

  return <div className="space-y-6">
    <div className="grid lg:grid-cols-[1fr_.9fr] gap-6">
      <section className="card p-6" aria-labelledby="mortgage-inputs">
        <h2 id="mortgage-inputs" className="text-lg font-black mb-5">Your assumptions</h2>
        <div className="grid sm:grid-cols-2 gap-5"><Field label="Home price" value={price} setValue={setPrice} suffix="$"/><Field label="Down payment" value={down} setValue={setDown} suffix="$"/><Field label="Interest rate" value={rate} setValue={setRate} suffix="%"/><Field label="Loan term" value={years} setValue={setYears} suffix="years"/></div>
        <CalculationActions validationMessage={validation}/>
        <p className="text-xs text-slate-500 mt-5 leading-5">This simplified estimate covers principal and interest only. Property taxes, homeowners insurance, HOA dues, mortgage insurance, closing costs, lender fees, and rate changes are not included.</p>
      </section>
      <section className="card p-6" aria-labelledby="mortgage-results">
        <div className="flex items-center justify-between gap-4 mb-5"><h2 id="mortgage-results" className="text-lg font-black">Estimated results</h2><span className="text-xs font-bold text-slate-500">Based on submitted assumptions</span></div>
        <ResultsGate><div className="rounded-2xl bg-blue-700 text-white p-6"><div className="text-xs font-black uppercase tracking-wider text-blue-100">Monthly principal + interest</div><div className="text-4xl font-black mt-1">{money(model.payment)}</div></div><div className="grid sm:grid-cols-3 gap-3 mt-3"><div className="metric"><span>Principal borrowed</span><b>{money(model.principal)}</b></div><div className="metric"><span>Total interest</span><b>{money(model.totalInterest)}</b></div><div className="metric"><span>Total repayment</span><b>{money(model.totalPaid)}</b></div></div></ResultsGate>
      </section>
    </div>

    <CalculatedOnly><section className="card p-6 md:p-7"><div className="grid lg:grid-cols-[.8fr_1.2fr] gap-8 items-center"><div><div className="text-sm font-black text-blue-700 uppercase tracking-wider">Payment breakdown</div><h2 className="text-2xl font-black mt-2">Principal vs. interest over the full term</h2><p className="text-sm text-slate-600 mt-3 leading-6">At the submitted assumptions, about <b>{principalPct}%</b> of total principal-and-interest payments repay the amount borrowed and <b>{interestPct}%</b> represent interest.</p></div><div><div className="h-8 rounded-full overflow-hidden flex bg-slate-100" aria-label="Principal and interest payment breakdown"><div style={{width:`${principalPct}%`}} className="bg-blue-700"/><div style={{width:`${interestPct}%`}} className="bg-slate-400"/></div><div className="flex flex-wrap gap-6 mt-3 text-sm"><span><i className="inline-block size-3 rounded-sm bg-blue-700 mr-2"/>Principal {money(model.principal)}</span><span><i className="inline-block size-3 rounded-sm bg-slate-400 mr-2"/>Interest {money(model.totalInterest)}</span></div></div></div></section>

    <section className="card overflow-hidden"><div className="p-6 border-b border-slate-100"><div className="text-sm font-black text-blue-700 uppercase tracking-wider">Amortization schedule</div><h2 className="text-2xl font-black mt-2">How the loan balance declines</h2><p className="text-sm text-slate-600 mt-2">The first 12 months are shown in detail, followed by annual checkpoints and the final payment period.</p></div><div className="overflow-x-auto"><table className="finance-table"><thead><tr><th>Period</th><th>Payment</th><th>Principal</th><th>Interest</th><th>Remaining balance</th></tr></thead><tbody>{model.rows.map((row:any)=><tr key={row.m}><td>{row.m<=12?`Month ${row.m}`:row.m%12===0?`Year ${row.m/12}`:`Month ${row.m}`}</td><td>{money(row.payment)}</td><td>{money(row.principal)}</td><td>{money(row.interest)}</td><td>{money(row.balance)}</td></tr>)}</tbody></table></div></section></CalculatedOnly>
  </div>;
}
