"use client";

import {createContext, useContext, useState, type ReactNode} from "react";

type GateStatus = "idle" | "ready" | "dirty";

type GateContextValue = {
  status: GateStatus;
  actionLabel: string;
  markDirty: () => void;
  calculate: () => void;
  reset: () => void;
};

const GateContext = createContext<GateContextValue | null>(null);

export function CalculationGate({actionLabel, children}:{actionLabel:string; children:ReactNode}){
  const [status,setStatus]=useState<GateStatus>("idle");
  const [resetVersion,setResetVersion]=useState(0);
  const markDirty=()=>setStatus(current=>current==="ready"?"dirty":current);
  const calculate=()=>setStatus("ready");
  const reset=()=>{setStatus("idle");setResetVersion(v=>v+1)};
  return <GateContext.Provider value={{status,actionLabel,markDirty,calculate,reset}}><div key={resetVersion}>{children}</div></GateContext.Provider>;
}

export function useCalculationGate(){
  const value=useContext(GateContext);
  if(!value) throw new Error("Calculation controls must be used inside CalculationGate");
  return value;
}

export function CalculationActions({validationMessage}:{validationMessage?:string}){
  const gate=useCalculationGate();
  const [error,setError]=useState("");
  const run=()=>{
    if(validationMessage){setError(validationMessage);return;}
    setError("");
    gate.calculate();
  };
  return <div className="mt-6 border-t border-slate-100 pt-5">
    <div className="flex flex-col sm:flex-row gap-3">
      <button type="button" onClick={run} className="min-h-11 rounded-xl bg-blue-700 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        {gate.status==="dirty"?`Update — ${gate.actionLabel}`:gate.actionLabel}
      </button>
      <button type="button" onClick={()=>{setError("");gate.reset()}} className="min-h-11 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Reset
      </button>
    </div>
    {error&&<p role="alert" className="mt-3 text-sm font-bold text-red-700">{error}</p>}
    <p className="mt-3 text-xs leading-5 text-slate-500">Results appear only after you select the estimate button. If you change an input later, update the estimate before relying on the result.</p>
  </div>;
}

export function ResultsGate({children}:{children:ReactNode}){
  const gate=useCalculationGate();
  if(gate.status==="ready") return <>{children}</>;
  const changed=gate.status==="dirty";
  return <div className="rounded-2xl border border-dashed border-blue-200 bg-blue-50/60 p-6 text-center">
    <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-white text-xl shadow-sm" aria-hidden="true">{changed?"↻":"="}</div>
    <h3 className="mt-3 text-base font-black text-slate-900">{changed?"Inputs changed":"Ready when you are"}</h3>
    <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-600">{changed?`Select “Update — ${gate.actionLabel}” to refresh the results with your new assumptions.`:`Enter or review your assumptions, then select “${gate.actionLabel}” to see the estimate.`}</p>
  </div>;
}

export function CalculatedOnly({children}:{children:ReactNode}){
  const gate=useCalculationGate();
  return gate.status==="ready"?<>{children}</>:null;
}
