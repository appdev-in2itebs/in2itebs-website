"use client";
import Link from 'next/link';
import {Mail, Plus, X, ArrowUpRight} from 'lucide-react';
import {useEffect,useRef,useState} from 'react';
import {usePathname} from 'next/navigation';
export function QuickContact(){
  const [open,setOpen]=useState(false);const root=useRef<HTMLDivElement>(null);const trigger=useRef<HTMLButtonElement>(null);const pathname=usePathname();
  useEffect(()=>setOpen(false),[pathname]);
  useEffect(()=>{const outside=(event:PointerEvent)=>{if(!root.current?.contains(event.target as Node))setOpen(false);};document.addEventListener('pointerdown',outside);return ()=>document.removeEventListener('pointerdown',outside);},[]);
  const [nearFooter,setNearFooter]=useState(false);
  useEffect(()=>{const footer=document.querySelector('footer');if(!footer)return;const observer=new IntersectionObserver(([entry])=>setNearFooter(entry.isIntersecting));observer.observe(footer);return ()=>observer.disconnect();},[]);
  return <div ref={root} hidden={nearFooter && !open} className="fixed bottom-5 right-5 z-30" onKeyDown={event=>{if(event.key==='Escape'){setOpen(false);trigger.current?.focus();}}} onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node))setOpen(false);}}>
    <button ref={trigger} type="button" aria-expanded={open} aria-controls="quick-contact-panel" onClick={()=>setOpen(!open)} className="ml-auto flex min-h-12 items-center gap-2 rounded-control bg-action px-4 font-semibold text-on-action shadow-soft hover:bg-action-hover">{open?<X size={20} aria-hidden/>:<Plus size={20} aria-hidden/>}Contact</button>
    <div id="quick-contact-panel" hidden={!open} className="absolute bottom-full right-0 mb-3 w-72 max-w-[calc(100vw-2.5rem)] rounded-feature border border-border-subtle bg-surface p-5 text-foreground shadow-soft">
      <p className="text-lg font-semibold">How can we help?</p><p className="mt-2 text-sm text-foreground-muted">Connect with our enterprise services team.</p>
      <Link href="/contact/" onClick={()=>setOpen(false)} className="mt-4 flex min-h-11 items-center justify-between text-sm font-semibold text-action">Talk to us <ArrowUpRight size={17} aria-hidden/></Link>
      <a href="mailto:info@in2itebs.com" className="flex min-h-11 items-center gap-2 text-sm text-action"><Mail size={17} aria-hidden/>info@in2itebs.com</a>
    </div>
  </div>;
}
