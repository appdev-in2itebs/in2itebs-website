"use client";
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import {interests, offers} from "@/lib/lead-schema";
import {useRegion} from "@/components/layout/region-preference";
import {signalMeasurement} from '@/lib/measurement';
const field = "min-h-11 w-full rounded-control border border-border-strong bg-surface px-4 py-3 text-base text-foreground focus-visible:outline-2 focus-visible:outline-offset-2";
export function DemoForm() {
  const router=useRouter();
  const [deliveryEnabled,setDeliveryEnabled]=useState<boolean|null>(null);
  useEffect(()=>{
    const controller=new AbortController();
    fetch('/api/health/',{signal:controller.signal,cache:'no-store'}).then(r=>r.json()).then(h=>setDeliveryEnabled(Boolean(h.leadDeliveryConfigured))).catch(()=>setDeliveryEnabled(false));
    return ()=>controller.abort();
  },[]);
  const {code,choose}=useRegion();
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState("");
  const [offer,setOffer]=useState<keyof typeof offers>("conversation");
  const [assessment,setAssessment]=useState("");
  const [interest,setInterest]=useState("Not sure");
  const errorRef=useRef<HTMLParagraphElement>(null);
  useEffect(()=>{
    const query=new URLSearchParams(location.search);
    const incoming=query.get("offer");
    if(incoming && incoming in offers) setOffer(incoming as keyof typeof offers);
    const result=query.get("assessment");
    if(result && ["RISE","GROW","Hybrid"].includes(result)) {setAssessment(result);setInterest("SAP");}
    const requested=query.get("interest");
    if(interests.some(i=>i===requested)) setInterest(requested!);
  },[]);
  async function submit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();setError("");setBusy(true);
    signalMeasurement('lead_attempt');
    try {
      const response=await fetch("/api/lead/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))),signal:AbortSignal.timeout(12000)});
      const result=await response.json();
      if(!response.ok || result.ok !== true) throw new Error(result.error || "We could not deliver your request.");
      signalMeasurement('lead_accepted');
      router.push("/thank-you/");
    } catch(error) {
      signalMeasurement('lead_failed');
      setError(error instanceof Error && error.name==="TimeoutError" ? "Delivery timed out. Your request may have been received; email us to confirm before retrying." : error instanceof Error ? error.message : "Connection failed. Please email us.");
      setBusy(false);
      requestAnimationFrame(()=>errorRef.current?.focus());
    }
  }
  return <form onSubmit={submit} className="flex flex-col gap-5">
    <p className="text-sm text-foreground-muted">Fields marked * are required.</p>
    {deliveryEnabled===null && <p role="status" className="text-sm text-foreground-muted">Checking whether online enquiries are available…</p>}
    {deliveryEnabled===false && <p role="status" className="rounded-control border border-border-strong bg-surface-subtle p-4 text-sm text-foreground">Online enquiries are not enabled in this preview. Please <a className="font-semibold text-action underline" href="mailto:info@in2itebs.com">email info@in2itebs.com</a>. This form will not report a request as delivered.</p>}
    <input type="text" name="company_url" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="grid gap-2"><span className="text-sm font-semibold">Name *</span><input name="name" required minLength={2} maxLength={120} autoComplete="name" className={field}/></label>
      <label className="grid gap-2"><span className="text-sm font-semibold">Work email *</span><input name="email" type="email" required maxLength={254} autoComplete="email" className={field}/></label>
    </div>
    <label className="grid gap-2"><span className="text-sm font-semibold">Company *</span><input name="company" required minLength={2} maxLength={160} autoComplete="organization" className={field}/></label>
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="grid gap-2"><span className="text-sm font-semibold">Contact region</span><select name="region" value={code} onChange={e=>choose(e.target.value)} className={field}><option value="IN">India</option><option value="KE">Kenya</option><option value="ZA">South Africa</option><option value="ME">Middle East</option></select></label>
      <label className="grid gap-2"><span className="text-sm font-semibold">Interest area</span><select name="interest" value={interest} onChange={e=>setInterest(e.target.value)} className={field}>{interests.map(i=><option key={i}>{i}</option>)}</select></label>
    </div>
    <label className="grid gap-2"><span className="text-sm font-semibold">Request</span><select name="offer" value={offer} onChange={e=>setOffer(e.target.value as keyof typeof offers)} className={field}>{Object.entries(offers).map(([key,label])=><option key={key} value={key}>{label}</option>)}</select></label>
    <input type="hidden" name="assessment" value={assessment}/>
    {assessment && <p className="text-sm text-foreground-muted">Your indicative assessment: {assessment}. This will be included with your request.</p>}
    <label className="grid gap-2"><span className="text-sm font-semibold">Message (optional)</span><textarea name="message" rows={5} maxLength={5000} className={field+" resize-y"} /></label>
    <p className="text-sm text-foreground-muted">We use these details to respond to your enquiry. Read our <Link href="/legal/privacy-notice/" className="text-action underline">privacy notice</Link>. Submitting a request does not book an appointment or subscribe you to marketing.</p>
    {error && <p ref={errorRef} tabIndex={-1} role="alert" className="rounded-control border border-error p-4 text-sm text-error">{error} <a className="underline" href="mailto:info@in2itebs.com">Email us</a>.</p>}
    <button disabled={busy || deliveryEnabled!==true} aria-busy={busy} className="min-h-12 rounded-control bg-action px-5 py-3 font-semibold text-on-action hover:bg-action-hover disabled:cursor-not-allowed disabled:opacity-70">{busy?"Sending request…":"Send enquiry"}</button>
  </form>;
}
