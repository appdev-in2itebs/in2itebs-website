"use client";
import {useEffect} from 'react';
import {signalMeasurement} from '@/lib/measurement';
export function MeasurementSignals() {
  useEffect(()=>{
    const listener=(event:MouseEvent)=>{
      const link=(event.target as Element).closest?.('a');
      if(!link) return;
      const target=new URL(link.href,location.origin);
      if(target.origin!==location.origin) return;
      if(target.pathname==='/contact/') signalMeasurement('contact_click');
      else if(['/oracle/','/microsoft/','/workday/','/salesforce/','/sap-enterprise-solutions/','/sap-enterprise-solutions/successfactors/'].includes(target.pathname)) signalMeasurement('practice_click');
    };
    document.addEventListener('click',listener);
    return ()=>document.removeEventListener('click',listener);
  },[]);
  return null;
}
