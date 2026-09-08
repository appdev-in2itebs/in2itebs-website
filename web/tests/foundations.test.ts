import {test, beforeEach} from 'node:test';
import assert from 'node:assert/strict';
import {cn} from '../lib/utils';
import {handleLead, resetRateLimitsForTest} from '../lib/lead-service';
import {measurementPayload} from '../lib/measurement';
import {resolveTheme} from '../lib/themes';

const valid = {name:'Test Person', email:'test@example.com', company:'Test Company', region:'IN', interest:'SAP', message:'Test only', offer:'conversation', assessment:''};
const request = (body:unknown, headers:Record<string,string>={}) => new Request('http://localhost/api/lead/', {method:'POST',headers:{'content-type':'application/json',...headers},body:JSON.stringify(body)});
beforeEach(resetRateLimitsForTest);
test('measurement allowlist cannot carry personal data',()=>{
  assert.deepEqual(measurementPayload('lead_accepted'),{name:'lead_accepted'});
  assert.equal(measurementPayload({name:'lead_accepted',email:'person@example.com'}),null);
  assert.equal(measurementPayload('person@example.com'),null);
});
test('theme cookie uses a safe default for unknown values',()=>{
  assert.equal(resolveTheme('dark'),'dark');assert.equal(resolveTheme('invalid'),'light');assert.equal(resolveTheme(undefined),'light');
});
test('custom heading sizes survive colour merging',()=>{
  assert.equal(cn('text-h1 text-foreground'),'text-h1 text-foreground');
  assert.equal(cn('text-h1','text-h2'),'text-h2');
});
test('invalid leads do not reach delivery',async()=>{
  let sent=false;
  const response=await handleLead(request({...valid,email:'invalid'}),async()=>{sent=true;});
  assert.equal(response.status,400); assert.equal(sent,false);
});
test('success requires transport acceptance',async()=>{
  let received=false;
  const response=await handleLead(request(valid),async(lead,id)=>{assert.equal(lead.interest,'SAP');assert.ok(id);received=true;});
  assert.equal(response.status,200);assert.equal(received,true);assert.match(response.headers.get('set-cookie') ?? '',/HttpOnly/);
});
test('delivery failure does not claim success',async()=>{
  const response=await handleLead(request(valid),async()=>{throw new Error('unavailable');});
  assert.equal(response.status,503);assert.equal((await response.json()).ok,false);
});
test('honeypots, oversized bodies and foreign origins are rejected',async()=>{
  assert.equal((await handleLead(request({...valid,company_url:'spam'}),async()=>{})).status,400);
  assert.equal((await handleLead(request({...valid,message:'x'.repeat(17000)}),async()=>{})).status,413);
  assert.equal((await handleLead(request(valid,{origin:'https://foreign.example'}),async()=>{})).status,403);
});
test('rate limit returns retry guidance',async()=>{
  for(let i=0;i<10;i++) await handleLead(request({}),async()=>{});
  const response=await handleLead(request(valid),async()=>{});
  assert.equal(response.status,429);assert.equal(response.headers.get('retry-after'),'60');
});

// --- Logo data integrity (client ribbon + partner ecosystem) ---
import {createHash} from 'node:crypto';
import {existsSync, readFileSync} from 'node:fs';
import path from 'node:path';
import {clients} from '../content/clients';
import {homeEcosystem, partnerCategories} from '../content/partner-ecosystem';

test('client ribbon has no duplicate entries or duplicate artwork',()=>{
  const slugs=clients.map(c=>c.slug);
  assert.equal(new Set(slugs).size, slugs.length, 'duplicate slug');
  const logos=clients.map(c=>c.logo).filter(Boolean) as string[];
  assert.equal(new Set(logos).size, logos.length, 'two clients share a logo path');
  const hashes=new Map<string,string>();
  for(const client of clients){
    const file=path.join(process.cwd(),'public',client.logo!);
    assert.ok(existsSync(file), `${client.name}: missing ${client.logo}`);
    const digest=createHash('sha1').update(readFileSync(file)).digest('hex');
    assert.ok(!hashes.has(digest), `${client.name} uses the same artwork as ${hashes.get(digest)}`);
    hashes.set(digest, client.name);
  }
});

test('every partner logo path resolves to a file and the homepage grid mirrors the ecosystem data',()=>{
  for(const category of partnerCategories) for(const partner of category.partners) if(partner.logo)
    assert.ok(existsSync(path.join(process.cwd(),'public',partner.logo)), `${partner.name}: missing ${partner.logo}`);
  for(const entry of homeEcosystem){
    const source=partnerCategories.flatMap(c=>c.partners).find(p=>p.name===entry.name);
    assert.ok(source, `${entry.name} is on the homepage but not in partnerCategories`);
    assert.equal(entry.logo, source!.logo ?? null);
  }
  const withLogo: string[]=homeEcosystem.filter(e=>e.logo).map(e=>e.name);
  for(const name of ['SAP','Microsoft','Oracle','Salesforce','Workday','IBM','HP','OpenText','SAP Concur','Qualtrics']) assert.ok(withLogo.includes(name), `${name} should have artwork`);
});
