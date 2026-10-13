"use client";
import Link from "next/link";
import {BarChart3,Menu,X} from "lucide-react";
import {useState} from "react";
import {site} from "@/lib/site";

export default function Header(){
 const [open,setOpen]=useState(false);
 const close=()=>setOpen(false);
 return <header className="border-b border-slate-200 bg-white/95 backdrop-blur sticky top-0 z-50 shadow-[0_1px_0_rgba(15,23,42,.02)]">
  <a href="#main-content" className="skip-link">Skip to content</a>
  <div className="container h-17 flex items-center justify-between">
   <Link href="/" className="flex items-center gap-2.5 font-black text-xl tracking-tight" onClick={close}>
    <span className="grid place-items-center size-10 rounded-xl bg-gradient-to-br from-blue-700 to-blue-500 text-white shadow-sm"><BarChart3 size={20}/></span>
    <span>{site.name}</span>
   </Link>
   <nav className="hidden md:flex items-center gap-7 text-sm font-bold text-slate-600" aria-label="Primary navigation">
    <Link className="nav-link" href="/calculators">Calculators</Link><Link className="nav-link" href="/guides">Guides</Link><Link className="nav-link" href="/compare">Compare scenarios</Link><Link className="nav-link" href="/methodology">Methodology</Link><Link className="nav-link" href="/about">About</Link>
   </nav>
   <div className="flex items-center gap-2"><Link href="/calculators" className="btn btn-primary text-sm hidden sm:inline-flex">Free tools</Link><button className="md:hidden size-10 grid place-items-center rounded-xl border border-slate-200 bg-white" aria-label={open?"Close menu":"Open menu"} aria-expanded={open} onClick={()=>setOpen(v=>!v)}>{open?<X size={20}/>:<Menu size={20}/>}</button></div>
  </div>
  {open&&<nav className="md:hidden border-t border-slate-100 bg-white shadow-lg" aria-label="Mobile navigation"><div className="container py-3 grid text-sm font-bold"><Link className="py-3 border-b border-slate-100" onClick={close} href="/calculators">Calculators</Link><Link className="py-3 border-b border-slate-100" onClick={close} href="/guides">Guides</Link><Link className="py-3 border-b border-slate-100" onClick={close} href="/compare">Compare scenarios</Link><Link className="py-3 border-b border-slate-100" onClick={close} href="/methodology">Methodology</Link><Link className="py-3" onClick={close} href="/about">About</Link><Link className="py-3 text-blue-700" onClick={close} href="/support">Support & contact →</Link></div></nav>}
 </header>
}
