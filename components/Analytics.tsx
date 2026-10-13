"use client";
import Script from "next/script";
import {use,useEffect,useState} from "react";
import {browser} from "react-dom";

const CONSENT_EVENT="mw-consent-change";
const analyticsAllowed=()=>localStorage.getItem("mw_consent_analytics")==="granted";

export default function Analytics(){
  use(browser());
  const [allowed,setAllowed]=useState(analyticsAllowed);
  useEffect(()=>{
    const sync=()=>setAllowed(analyticsAllowed());
    window.addEventListener(CONSENT_EVENT,sync);
    window.addEventListener("storage",sync);
    return()=>{
      window.removeEventListener(CONSENT_EVENT,sync);
      window.removeEventListener("storage",sync);
    };
  },[]);
  const ga=process.env.NEXT_PUBLIC_GA_ID;
  const clarity=process.env.NEXT_PUBLIC_CLARITY_ID;
  if(!allowed)return null;
  return <>
    {ga&&<><Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive"/><Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config','${ga}',{anonymize_ip:true});`}</Script></>}
    {clarity&&<Script id="clarity" strategy="afterInteractive">{`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,'clarity','script','${clarity}');`}</Script>}
  </>;
}
