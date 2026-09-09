import {createHash, randomUUID} from "node:crypto";
import {leadSchema, type Lead} from "./lead-schema";
import {SITE_URL} from "./utils";
/** Origins a browser may submit from: the socket origin, the public site (with and without www),
 *  the proxy-forwarded origin when TRUST_PROXY_HEADERS=1, and any ALLOWED_ORIGINS entries. */
export function allowedOrigins(request:Request): Set<string> {
  const origins = new Set<string>([new URL(request.url).origin]);
  const site = new URL(SITE_URL);
  origins.add(site.origin);
  origins.add(`${site.protocol}//www.${site.host.replace(/^www\./,"")}`);
  if(process.env.TRUST_PROXY_HEADERS === "1") {
    const proto = request.headers.get("x-forwarded-proto")?.split(",")[0].trim();
    const host = (request.headers.get("x-forwarded-host") ?? request.headers.get("host"))?.split(",")[0].trim();
    if(proto && host) try{ origins.add(new URL(`${proto}://${host}`).origin); } catch {}
  }
  for(const extra of (process.env.ALLOWED_ORIGINS ?? "").split(",")) { const o=extra.trim(); if(o) try{ origins.add(new URL(o).origin); } catch {} }
  return origins;
}
const MAX_BYTES = 16_384;
const windowMs = 60_000;
const buckets = new Map<string, {start:number; count:number}>();
export function resetRateLimitsForTest() { buckets.clear(); }
function limited(key:string) {
  const now = Date.now();
  for (const [k,v] of buckets) if(now-v.start>=windowMs) buckets.delete(k);
  const bucket = buckets.get(key) ?? {start:now,count:0};
  bucket.count++;
  if(buckets.size >= 1000 && !buckets.has(key)) return true;
  buckets.set(key,bucket);
  return bucket.count > 10;
}
export type LeadTransport = (lead:Lead, requestId:string) => Promise<void>;
export async function configuredTransport(lead:Lead, requestId:string) {
  const url = process.env.LEAD_WEBHOOK_URL;
  const token = process.env.LEAD_WEBHOOK_TOKEN;
  if(!url || !token || new URL(url).protocol !== "https:") throw new Error("transport unavailable");
  const response = await fetch(url, {
    method:"POST", redirect:"error", signal:AbortSignal.timeout(8000),
    headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`,"Idempotency-Key":requestId},
    body:JSON.stringify({requestId,recipient:"info@in2itebs.com",lead}),
  });
  if(!response.ok) throw new Error("delivery not accepted");
}
const json = (status:number, body:object, extra:Record<string,string>={}) =>
  Response.json(body,{status,headers:{"Cache-Control":"no-store",...extra}});
export async function handleLead(request:Request, transport?:LeadTransport) {
  if(!request.headers.get("content-type")?.startsWith("application/json")) return json(415,{ok:false,error:"Use JSON."});
  const origin = request.headers.get("origin");
  const sameSite = request.headers.get("sec-fetch-site") === "same-origin";
  if(origin && !sameSite && !allowedOrigins(request).has(origin)) return json(403,{ok:false,error:"Invalid origin."});
  // Trust forwarding headers only when a configured ingress overwrites them.
  const address = process.env.TRUST_PROXY_HEADERS === "1" ? request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown" : "shared";
  const key = createHash("sha256").update(address).digest("hex");
  if(limited(key)) return json(429,{ok:false,error:"Too many requests. Please wait a minute or email us."},{"Retry-After":"60"});
  if(Number(request.headers.get("content-length") ?? 0) > MAX_BYTES) return json(413,{ok:false,error:"Request is too large."});
  const reader = request.body?.getReader();
  if(!reader) return json(400,{ok:false,error:"Request body is required."});
  let size=0;
  const chunks:Uint8Array[]=[];
  try {
    while(true) {
      const {done,value}=await reader.read(); if(done) break;
      size+=value.byteLength;
      if(size>MAX_BYTES){await reader.cancel();return json(413,{ok:false,error:"Request is too large."});}
      chunks.push(value);
    }
    const parsed = leadSchema.safeParse(JSON.parse(Buffer.concat(chunks).toString("utf8")));
    if(!parsed.success) return json(400,{ok:false,error:"Check the required fields and their formats."});
    if(parsed.data.company_url) return json(400,{ok:false,error:"Unable to accept this request. Please email us."});
    if(!transport && (!process.env.LEAD_WEBHOOK_URL || !process.env.LEAD_WEBHOOK_TOKEN)) return json(503,{ok:false,error:"Online delivery is not configured. Please email info@in2itebs.com."});
    const requestId = randomUUID();
    try {
      await (transport ?? configuredTransport)(parsed.data,requestId);
      console.info(JSON.stringify({event:"lead_accepted",requestId}));
      return json(200,{ok:true,requestId},{"Set-Cookie":`in2it-lead-receipt=${requestId}; Path=/thank-you/; Max-Age=300; HttpOnly; SameSite=Lax${new URL(request.url).protocol === 'https:' ? '; Secure' : ''}`});
    } catch {
      console.error(JSON.stringify({event:"lead_delivery_failed",requestId}));
      return json(503,{ok:false,error:"We could not deliver your request. Please retry or email info@in2itebs.com."});
    }
  } catch { return json(400,{ok:false,error:"Invalid request."}); }
}
