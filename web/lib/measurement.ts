/** Local integration signals only: no cookies, storage, network or personal data. */
export const measurementEvents = ['contact_click','practice_click','lead_attempt','lead_accepted','lead_failed'] as const;
export type MeasurementEvent = typeof measurementEvents[number];
export function measurementPayload(value:unknown): {name:MeasurementEvent} | null {
  return typeof value === 'string' && measurementEvents.includes(value as MeasurementEvent) ? {name:value as MeasurementEvent} : null;
}
export function signalMeasurement(name:MeasurementEvent) {
  const detail=measurementPayload(name);
  if(detail && typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('in2it:measurement',{detail}));
}
