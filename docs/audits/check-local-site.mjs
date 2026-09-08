// Read-only HTTP checks. Usage: node docs/audits/check-local-site.mjs http://127.0.0.1:3107
const base = new URL(process.argv[2] || 'http://127.0.0.1:3107');
if (!['127.0.0.1', 'localhost', '[::1]'].includes(base.hostname)) throw new Error('Loopback only');
const cache = new Map();
async function get(path) {
  if (!cache.has(path)) cache.set(path, (async () => {
    const res = await fetch(new URL(path, base), {signal: AbortSignal.timeout(15000)});
    return {status: res.status, url: res.url, text: await res.text()};
  })());
  return cache.get(path);
}
const matches = (text, regex) => [...text.matchAll(regex)].map(m => m[1]);
const sitemap = await get('/sitemap.xml');
const paths = [...new Set(matches(sitemap.text, /<loc>(.*?)<\/loc>/g).map(u => new URL(u).pathname))];
const rows = [], broken = [], missingAssets = [], hashes = [], assets = new Set();
for (const path of [...paths, '/thank-you/']) {
  const page = await get(path);
  const html = page.text.split('<script>self.__next_f.push')[0];
  rows.push({path, status:page.status, canonical:matches(html, /<link rel="canonical" href="([^"]+)"/g)[0], h1:matches(html, /(<h1\b)/g).length, bytes:Buffer.byteLength(page.text), hidden:matches(html, /(opacity:0)/g).length});
  for (const href of matches(html, /\bhref="([^"]+)"/g)) {
    if (!href.startsWith('/') && !href.startsWith('#')) continue;
    const dest = new URL(href.replaceAll('&amp;', '&'), new URL(path,base));
    if (dest.pathname.startsWith('/_next/')) continue;
    const result = await get(dest.pathname);
    if (result.status >= 400) broken.push({from:path,href,status:result.status});
    if (dest.hash && !result.text.includes(`id="${decodeURIComponent(dest.hash.slice(1))}"`)) hashes.push({from:path,href});
  }
  for (const src of matches(html, /\bsrc="([^"]+)"/g)) {
    if (!src.startsWith('/')) continue;
    let target = new URL(src.replaceAll('&amp;', '&'), base);
    if (target.pathname === '/_next/image') target = new URL(target.searchParams.get('url'),base);
    if (target.origin === base.origin && !target.pathname.startsWith('/_next/')) assets.add(target.pathname);
  }
}
for (const asset of assets) {
  const res = await fetch(new URL(asset,base), {method:'HEAD', signal:AbortSignal.timeout(15000)});
  if (res.status >= 400) missingAssets.push({asset,status:res.status});
}
console.log(JSON.stringify({pages:rows.length,sitemapPages:paths.length,homeCanonicalPages:rows.filter(r=>r.canonical==='https://in2itebs.com/').length,non200:rows.filter(r=>r.status!==200),badH1:rows.filter(r=>r.h1!==1),brokenLinks:broken,brokenHashes:hashes,assetsChecked:assets.size,missingAssets,largestPages:rows.sort((a,b)=>b.bytes-a.bytes).slice(0,5),noJsHiddenElements:rows.reduce((s,r)=>s+r.hidden,0)},null,2));
