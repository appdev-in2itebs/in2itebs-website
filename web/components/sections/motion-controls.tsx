"use client";
import {useEffect, useState} from "react";
export function MotionControls() {
  const [paused,setPaused]=useState(false);
  useEffect(()=>{
    const targets=document.querySelectorAll('.system-map, .client-ribbon');
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      (entry.target as HTMLElement).dataset.motionOffscreen=String(!entry.isIntersecting);
    }));
    targets.forEach(target=>observer.observe(target));
    return ()=>{observer.disconnect();targets.forEach(target=>delete (target as HTMLElement).dataset.motionOffscreen);};
  },[]);
  useEffect(()=>{
    const reduced=matchMedia("(prefers-reduced-motion: reduce)");
    const update=()=>{document.documentElement.dataset.motionReady="true";document.documentElement.dataset.motionPaused=String(paused || reduced.matches || document.hidden);};
    update();reduced.addEventListener("change",update);document.addEventListener('visibilitychange',update);
    return ()=>{reduced.removeEventListener("change",update);document.removeEventListener('visibilitychange',update);delete document.documentElement.dataset.motionReady;delete document.documentElement.dataset.motionPaused;};
  },[paused]);
  return <button type="button" aria-pressed={paused} onClick={()=>setPaused(!paused)} className="inline-flex min-h-11 items-center rounded-control border border-border-strong bg-surface px-3 text-sm font-medium text-foreground hover:bg-surface-subtle">{paused?"Resume page animation":"Pause page animation"}</button>;
}
