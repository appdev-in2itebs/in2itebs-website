"use client";
import Image from 'next/image';
import Link from 'next/link';
import {useEffect, useRef, useState} from 'react';
import {ArrowLeft, ArrowRight, Pause, Play} from 'lucide-react';
import {Container} from '@/components/ui/container';
import {Button} from '@/components/ui/button';
import {SapPartnerBadge} from '@/components/ui/sap-partner-badge';

const slides=[
  {label:'SAP enterprise solutions',heading:'Transform your enterprise with SAP.',body:'From S/4HANA and cloud migration to SuccessFactors, analytics and managed services. Connect the platform to the way your business operates.',href:'/sap-enterprise-solutions/',cta:'Explore SAP solutions',image:'/stock/automobiles.jpg'},
  {label:'Application development & maintenance',heading:'Applications built around your business.',body:'Design, build, integrate and maintain business applications, with engineering and ongoing support connected from the start.',href:'/digital-data-ai/application-engineering/',cta:'Explore application services',image:'/stock/professional-services.jpg'},
  {label:'People, finance & customer platforms',heading:'Connect people, processes and performance.',body:'Explore SuccessFactors, Workday, Salesforce, Oracle and Microsoft practices for the systems your teams rely on every day.',href:'/platform-services/',cta:'Explore our platform practices',image:'/stock/about-office.jpg'},
  {label:'Cloud, data & AI',heading:'Turn enterprise data into everyday decisions.',body:'Bring data, analytics, integration and AI into the flow of work, with architecture and delivery grounded in your business priorities.',href:'/digital-data-ai/',cta:'Explore data & AI services',image:'/stock/hero-abstract.jpg'},
];
export function ServiceHero() {
  const [active,setActive]=useState(0);
  const [playing,setPlaying]=useState(false);
  const [hovered,setHovered]=useState(false);
  const [suspended,setSuspended]=useState(false);
  const root=useRef<HTMLElement>(null);
  useEffect(()=>{
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    setPlaying(!reduced.matches);
    const stop=()=>{if(reduced.matches)setPlaying(false);};
    reduced.addEventListener('change',stop);
    const observer=new IntersectionObserver(([entry])=>setSuspended(!entry.isIntersecting));
    if(root.current)observer.observe(root.current);
    return ()=>{reduced.removeEventListener('change',stop);observer.disconnect();};
  },[]);
  useEffect(()=>{
    if(!playing || hovered || suspended)return;
    const timer=setInterval(()=>{if(!document.hidden && document.documentElement.dataset.motionPaused!=='true')setActive(index=>(index+1)%slides.length);},8000);
    return ()=>clearInterval(timer);
  },[playing,hovered,suspended]);
  const slide=slides[active];
  function change(index:number) {setPlaying(false);setActive((index+slides.length)%slides.length);}
  return <section ref={root} aria-label="Featured services" aria-roledescription="carousel"
    onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
    onFocusCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node))setPlaying(false);}}
    className="relative overflow-hidden bg-surface pt-36 text-foreground md:pt-40">
    <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,oklch(var(--color-action)/0.08),transparent_65%)]"/>
    <Container className="relative">
      <h1 className="sr-only">In2IT EBS: enterprise transformation, delivered globally</h1>
      <div className="grid gap-8 pt-8 lg:grid-cols-2 lg:items-stretch lg:gap-16 lg:pt-12">
        <div className="flex min-h-[27rem] flex-col pb-3 md:min-h-[30rem]">
          <div className="mb-7"><SapPartnerBadge /></div>
          <div aria-live={playing?'off':'polite'} aria-atomic="true" className="flex flex-1 flex-col">
            <p className="text-sm font-semibold text-action">{slide.label}</p>
            <h2 className="mt-4 max-w-[18ch] text-[clamp(2.25rem,3.8vw,3.75rem)] font-semibold leading-[1.06] tracking-[-0.04em]">{slide.heading}</h2>
            <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-foreground-muted">{slide.body}</p>
            <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-8">
              <Button href={slide.href} withArrow>{slide.cta}</Button>
              <Link href="/contact/" className="inline-flex min-h-12 items-center gap-3 text-sm font-semibold text-action hover:underline">Talk to us <ArrowRight size={17} aria-hidden/></Link>
            </div>
          </div>
        </div>
        <div className="relative min-h-[17rem] overflow-hidden rounded-feature bg-surface-subtle lg:min-h-[31rem]">
          {slides.map((item,index)=>{
            const mounted=index===active || index===(active+1)%slides.length;
            return mounted ? <Image key={item.image} src={item.image} alt="" fill priority={index===0} sizes="(min-width:1024px) 45vw, 100vw" className={`object-cover transition-opacity duration-700 motion-reduce:transition-none ${active===index?'opacity-100':'opacity-0'}`} /> : null;
          })}
          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4 border border-border-subtle bg-surface px-5 py-4 text-sm text-foreground">
            <span>Enterprise transformation, delivered globally</span><span className="shrink-0 tabular-nums text-action">0{active+1} / 04</span>
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-y border-border-subtle py-4">
        <div className="flex flex-wrap gap-2" aria-label="Choose a featured service">
          {slides.map((item,index)=><button type="button" key={item.label} onClick={()=>change(index)} aria-label={`Show ${item.label}`} aria-current={active===index?'true':undefined} className={`inline-flex min-h-11 items-center gap-2 rounded-control px-3 text-sm ${active===index?'bg-action text-on-action':'text-foreground-muted hover:bg-surface-subtle'}`}><span className="tabular-nums">0{index+1}</span><span className="hidden sm:inline">{['SAP','Applications','Enterprise platforms','Data & AI'][index]}</span></button>)}
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={()=>change(active-1)} aria-label="Previous service" className="inline-flex h-11 w-11 items-center justify-center rounded-control border border-border-strong hover:bg-surface-subtle"><ArrowLeft size={18} aria-hidden/></button>
          <button type="button" onClick={()=>setPlaying(value=>!value)} aria-label={playing?'Pause service carousel':'Play service carousel'} className="inline-flex h-11 w-11 items-center justify-center rounded-control border border-border-strong hover:bg-surface-subtle">{playing?<Pause size={17} aria-hidden/>:<Play size={17} aria-hidden/>}</button>
          <button type="button" onClick={()=>change(active+1)} aria-label="Next service" className="inline-flex h-11 w-11 items-center justify-center rounded-control border border-border-strong hover:bg-surface-subtle"><ArrowRight size={18} aria-hidden/></button>
        </div>
      </div>
    </Container>
  </section>;
}
