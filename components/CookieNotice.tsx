"use client";
import {useState} from "react";
import {browser} from "react-dom";
import {use} from "react";

const CONSENT_EVENT="mw-consent-change";

export default function CookieNotice(){
 use(browser());
 const [saved,setSaved]=useState(()=>localStorage.getItem("mw_consent_saved")==="1");
 const [settings,setSettings]=useState(false);
 const save=(analytics:boolean,ads:boolean)=>{
   localStorage.setItem("mw_consent_saved","1");
   localStorage.setItem("mw_consent_analytics",analytics?"granted":"denied");
   localStorage.setItem("mw_consent_ads",ads?"granted":"denied");
   setSaved(true);
   window.dispatchEvent(new Event(CONSENT_EVENT));
 };
 if(saved)return null;
 return <div className="fixed bottom-4 left-4 right-4 md:left-auto md:max-w-lg z-[70] card p-5 shadow-2xl" role="dialog" aria-modal="true" aria-label="Cookie preferences"><div className="font-black text-lg">Privacy choices</div><p className="text-sm text-slate-500 leading-6 mt-2">Essential storage keeps the site working. Analytics and advertising technologies remain off unless you choose to allow them. You can change these choices later from the Privacy page.</p>{settings&&<div className="mt-4 grid gap-3 text-sm"><div className="flex justify-between gap-4 p-3 bg-slate-50 rounded-xl"><div><b>Essential</b><div className="text-slate-500">Always active</div></div><span className="font-black text-emerald-700">Required</span></div><div className="p-3 bg-slate-50 rounded-xl text-slate-600">Analytics and advertising are optional. Use the buttons below to allow all or keep optional technologies disabled.</div></div>}<div className="mt-4 flex flex-wrap gap-2"><button className="btn btn-primary text-sm" onClick={()=>save(true,true)}>Allow all</button><button className="btn btn-soft text-sm" onClick={()=>save(false,false)}>Essential only</button><button className="btn text-sm border border-slate-200" onClick={()=>setSettings(v=>!v)}>{settings?"Hide details":"Manage choices"}</button></div></div>
}
