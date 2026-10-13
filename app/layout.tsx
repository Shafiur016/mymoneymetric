import type {Metadata} from "next";
import {Suspense} from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieNotice from "@/components/CookieNotice";
import Analytics from "@/components/Analytics";
import {site} from "@/lib/site";

export const metadata:Metadata={
 metadataBase:new URL(site.url),
 title:{default:`${site.name} — Free Finance Calculators`,template:`%s | ${site.name}`},
 description:site.description,
 applicationName:site.name,
 openGraph:{title:site.name,description:site.description,type:"website",url:site.url,siteName:site.name},
 twitter:{card:"summary",title:site.name,description:site.description},
 robots:{index:true,follow:true},
 verification:process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?{google:process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}:undefined,
 icons:{icon:"/icon.svg"},
 manifest:"/manifest.webmanifest",
};
export default function RootLayout({children}:{children:React.ReactNode}){const org={"@context":"https://schema.org","@type":"Organization",name:site.name,url:site.url,description:site.description};return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(org)}}/><Header/><main id="main-content">{children}</main><Footer/><Suspense fallback={null}><CookieNotice/></Suspense><Suspense fallback={null}><Analytics/></Suspense><noscript><div style={{padding:"12px",background:"#fff7ed",color:"#9a3412",textAlign:"center",fontWeight:700}}>JavaScript is required for interactive calculators. Please enable JavaScript and reload this page.</div></noscript></body></html>}
