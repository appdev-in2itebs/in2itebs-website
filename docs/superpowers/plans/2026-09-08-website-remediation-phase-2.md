# Website Remediation Phase 2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close every code-fixable finding from the 8 September 2026 audit of the In2IT EBS website so the build is deployable behind in2itebs.com without the three launch blockers, the rendering regression, or the SEO and UI defects.

**Architecture:** The site is a Next.js 15.5 App Router project in `web/`, fully static except two API routes and the thank-you page. Fixes are made in place with a failing test first (node:test for data and server logic, Playwright + axe for browser behaviour), one commit per task, on a git repository created in Phase 0. Phases are ordered by production risk: safety net, launch blockers, rendering and redirects, SEO and structured data, UI defects, hygiene.

**Tech Stack:** Next.js 15.5.24, React 19.2, TypeScript 5.5, Tailwind 3.4, zod 3, node:test via tsx, Playwright 1.63 with @axe-core/playwright, ESLint 9 (next/core-web-vitals), Prettier (added in Phase 5).

**Spec:** Audit report published at https://claude.ai/code/artifact/37eae16e-7085-4d74-b80c-066ac6a16917 (finding IDs C1–C3, H1–H5, M1–M12, L1–L9 are used below). Supporting records: `docs/WEBSITE_AUDIT_2026-09-07.md`, `docs/REMEDIATION_RUNBOOK.md`, `docs/FINAL_CHECK.md`.

## Execution model

- **Orchestrator:** Claude Fable 5.1 (this session) runs `superpowers:subagent-driven-development`: it dispatches one fresh implementer subagent per task, performs the spec-compliance review itself, dispatches a reviewer subagent for code quality, and merges nothing until both pass.
- **Implementers and reviewers:** Claude Opus 5 (`model: "opus"` on every Agent call). Each implementer receives only its task text plus the Global Constraints and Interfaces blocks it needs.
- **Verification gate per phase:** `npm run check` (lint, typecheck, unit tests) must pass after every task; `npm run build` and `npm run test:browser` must pass at the end of every phase before the next phase starts.
- **Out of scope (owner inputs, not code):** C3 lead receiver and captcha keys, D1 serif decision, D2 design-doc amendment, D3 Oracle/Microsoft claims, D4 partner artwork rights (Newgen), D5 recruitment destination, D6 analytics/consent, M9 durable preview host, the headcount/delivery-centre/percentage figure reconciliation in M7.

## Global Constraints

- All paths below are relative to the repository root `D:\Obsidian\In2IT EBS\in2itebs` unless prefixed with `web/`; run npm commands from `web/`.
- **Another Claude session edits this working tree.** Before editing any file, re-read it. If a file differs from what a task quotes, adapt the edit to the current content and note the difference in the commit message.
- Never stop or restart the process listening on port 3107 or the ngrok agent (`ngrok.exe http 3000`) or the `cloudflared.exe` process; browser tests use `reuseExistingServer` against 3107 (Task 0.2) and only need a rebuild when a task says so.
- Do not run `next dev` and `next start` against the same `web/.next` at the same time.
- `SITE_ENV=preview` must be set in the environment for every `npm run build`, `npm start`, and browser-test run after Task 1.2 (the build fails without it by design).
- Trailing slashes are mandatory on every internal path (`next.config.mjs` has `trailingSlash: true`); redirects and rewrites are written without a trailing slash on the source and with one on the destination, matching `web/content/redirects.mjs`.
- Do not invent facts, figures, client names, partner tiers or claims; content changes reuse existing copy (see `README.md` governance rules).
- Code style: match the file you are editing (the rebuilt files use compact single-line JSX; older files are Prettier-formatted). Phase 5 formats everything.
- Commit messages: conventional commits, one task per commit, ending with `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`.
- Unit tests live in `web/tests/foundations.test.ts` unless a task creates a new file; run with `npm test` (`tsx --test tests/*.test.ts`). Browser tests live in `web/tests/browser/*.spec.ts`.

---

## Phase 0: Safety net

### Task 0.1: Put the repository under version control

**Files:**
- Create: `.git/` (repository at the root, where `.gitignore` already lives)
- Modify: `.gitignore` (append two lines)

**Interfaces:**
- Produces: a `main` branch with the baseline commit and a working branch `remediation/2026-09-08` that every later task commits to.

- [ ] **Step 1: Confirm the ignore file covers generated output**

Run from the repository root:
```bash
cat .gitignore
```
Expected: it lists `web/node_modules/`, `web/.next/`, `web/.env*`, `!web/.env.example`, `web/tsconfig.tsbuildinfo`, `web/playwright-report/`, `web/test-results/`, `.website-backups/`, `.website-runtime/`.

- [ ] **Step 2: Add the two entries that are missing**

Append to `.gitignore`:
```
web/.impeccable/
.remember/tmp/
```

- [ ] **Step 3: Initialise and commit the baseline**

```bash
git init -b main
git add -A
git status --short | wc -l
git commit -m "chore: baseline of website and docs before remediation phase 2

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
git switch -c remediation/2026-09-08
```
Expected: `git log --oneline` shows one commit; `git status` is clean; `git check-ignore web/node_modules web/.next` prints both paths. The corporate PDF, PPTX and DOCX briefs (about 9 MB) are tracked on purpose because the docs cite them as the source of truth; move them to Git LFS if the nominated remote objects to binaries.

- [ ] **Step 4: Verify nothing secret was committed**

```bash
git ls-files | grep -iE "\.env($|\.)|\.pem$|\.key$|node_modules|\.next/" 
```
Expected: no output.

### Task 0.2: Let the browser suite start its own server and add a full check script

**Files:**
- Modify: `web/playwright.config.ts`
- Modify: `web/package.json` (scripts)

**Interfaces:**
- Produces: `npm run check:full` = lint + typecheck + unit tests + build + browser suite. `SITE_ENV=preview` is passed to the server Playwright starts.

- [ ] **Step 1: Replace the Playwright config**

Write `web/playwright.config.ts`:
```ts
import {defineConfig} from '@playwright/test';
export default defineConfig({
  testDir:'./tests/browser', fullyParallel:false, workers:1,
  timeout:60000, reporter:'list',
  use:{baseURL:'http://127.0.0.1:3107',channel:'chrome',trace:'retain-on-failure'},
  webServer:{
    command:'npm start',
    url:'http://127.0.0.1:3107/api/health/',
    reuseExistingServer:true,
    timeout:120000,
    env:{SITE_ENV:'preview'},
  },
});
```

- [ ] **Step 2: Add the scripts**

In `web/package.json` `scripts`, add after `"check"`:
```json
"check:full": "npm run check && npm run build && npm run test:browser"
```
Leave every other script unchanged.

- [ ] **Step 3: Verify the config parses and the suite still connects to the running server**

```bash
npx playwright test tests/browser/transcript.spec.ts --reporter=list
```
Expected: 6 passed (it reuses the server on 3107).

- [ ] **Step 4: Commit**

```bash
git add web/playwright.config.ts web/package.json
git commit -m "test: start the preview server from Playwright and add check:full

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

### Task 0.3: Add a CI workflow that runs the full check

**Files:**
- Create: `.github/workflows/ci.yml`

- [ ] **Step 1: Write the workflow**

```yaml
name: ci
on:
  push:
    branches: [main, "remediation/**"]
  pull_request:
jobs:
  check:
    runs-on: ubuntu-latest
    timeout-minutes: 30
    env:
      SITE_ENV: preview
    defaults:
      run:
        working-directory: web
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
          cache-dependency-path: web/package-lock.json
      - run: npm ci
      - run: npm run check
      - run: npm run build
      - run: npx playwright install --with-deps chrome
      - run: npm run test:browser
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: test-results
          path: web/test-results
```

- [ ] **Step 2: Validate the YAML locally**

```bash
npx --yes js-yaml .github/workflows/ci.yml >/dev/null && echo "yaml ok"
```
Expected: `yaml ok`.

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/ci.yml
git commit -m "ci: run lint, typecheck, unit, build and browser suites on push

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

## Phase 1: Launch blockers

### Task 1.1: Accept enquiries behind a TLS-terminating proxy (C1)

**Files:**
- Modify: `web/lib/lead-service.ts:30-37`
- Modify: `web/lib/utils.ts`
- Test: `web/tests/foundations.test.ts`

**Interfaces:**
- Consumes: `SITE_URL` from `web/lib/utils.ts` (string, no trailing slash).
- Produces: `export function allowedOrigins(request: Request): Set<string>` in `lib/lead-service.ts`; env `ALLOWED_ORIGINS` (comma-separated, optional).

- [ ] **Step 1: Write the failing tests**

Append to `web/tests/foundations.test.ts`:
```ts
test('browser origins that match the public site or trusted forwarded headers are accepted',async()=>{
  const previous=process.env.TRUST_PROXY_HEADERS;
  process.env.TRUST_PROXY_HEADERS='1';
  try{
    let delivered=0;
    const forwarded=await handleLead(request(valid,{origin:'https://in2itebs.com',host:'in2itebs.com','x-forwarded-proto':'https','x-forwarded-host':'in2itebs.com'}),async()=>{delivered++;});
    assert.equal(forwarded.status,200);
    const preview=await handleLead(request(valid,{origin:'https://preview.example.net','x-forwarded-proto':'https','x-forwarded-host':'preview.example.net'}),async()=>{delivered++;});
    assert.equal(preview.status,200);
    const foreign=await handleLead(request(valid,{origin:'https://foreign.example','x-forwarded-proto':'https','x-forwarded-host':'in2itebs.com'}),async()=>{delivered++;});
    assert.equal(foreign.status,403);
    assert.equal(delivered,2);
  } finally { if(previous===undefined) delete process.env.TRUST_PROXY_HEADERS; else process.env.TRUST_PROXY_HEADERS=previous; }
});
test('the public site origin is accepted even when forwarded headers are not trusted',async()=>{
  delete process.env.TRUST_PROXY_HEADERS;
  const response=await handleLead(request(valid,{origin:'https://in2itebs.com'}),async()=>{});
  assert.equal(response.status,200);
  const www=await handleLead(request(valid,{origin:'https://www.in2itebs.com'}),async()=>{});
  assert.equal(www.status,200);
});
```

- [ ] **Step 2: Run the tests to verify they fail**

```bash
npm test
```
Expected: the two new tests FAIL with `403 !== 200`.

- [ ] **Step 3: Implement the origin allowlist**

In `web/lib/utils.ts`, replace the `SITE_URL` line with:
```ts
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://in2itebs.com").replace(/\/$/, "");
```

In `web/lib/lead-service.ts`, add after the imports:
```ts
import {SITE_URL} from "./utils";
/** Origins a browser may submit from: the socket origin, the public site (with and without www),
 *  the proxy-forwarded origin when TRUST_PROXY_HEADERS=1, and any ALLOWED_ORIGINS entries. */
export function allowedOrigins(request:Request) {
  const origins = new Set<string>([new URL(request.url).origin]);
  const site = new URL(SITE_URL);
  origins.add(site.origin);
  origins.add(`${site.protocol}//www.${site.host.replace(/^www\./,"")}`);
  if(process.env.TRUST_PROXY_HEADERS === "1") {
    const proto = request.headers.get("x-forwarded-proto")?.split(",")[0].trim();
    const host = (request.headers.get("x-forwarded-host") ?? request.headers.get("host"))?.split(",")[0].trim();
    if(proto && host) origins.add(`${proto}://${host}`);
  }
  for(const extra of (process.env.ALLOWED_ORIGINS ?? "").split(",")) { const o=extra.trim(); if(o) origins.add(o); }
  return origins;
}
```
Replace the two origin lines in `handleLead`:
```ts
  const origin = request.headers.get("origin");
  if(origin && origin !== new URL(request.url).origin) return json(403,{ok:false,error:"Invalid origin."});
```
with:
```ts
  const origin = request.headers.get("origin");
  const sameSite = request.headers.get("sec-fetch-site") === "same-origin";
  if(origin && !sameSite && !allowedOrigins(request).has(origin)) return json(403,{ok:false,error:"Invalid origin."});
```

- [ ] **Step 4: Run the tests**

```bash
npm test
```
Expected: all tests pass, including the existing `honeypots, oversized bodies and foreign origins are rejected` (its foreign origin is still rejected).

- [ ] **Step 5: Document the variables**

Append to `web/.env.example`:
```
# Extra browser origins allowed to submit the enquiry form (comma-separated), e.g. a staging host.
ALLOWED_ORIGINS=
# Public site origin used for canonical URLs and the enquiry origin allowlist.
NEXT_PUBLIC_SITE_URL=https://in2itebs.com
```

- [ ] **Step 6: Commit**

```bash
git add web/lib/lead-service.ts web/lib/utils.ts web/tests/foundations.test.ts web/.env.example
git commit -m "fix(lead): accept submissions from the public origin and trusted proxies

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

### Task 1.2: Fail the build when SITE_ENV is missing and verify the built robots gate (C2)

**Files:**
- Modify: `web/next.config.mjs:1-7`
- Modify: `web/app/api/health/route.ts`
- Create: `web/scripts/check-build.mjs`
- Modify: `web/package.json` (scripts)
- Modify: `docs/REMEDIATION_RUNBOOK.md` (Local preview section)

**Interfaces:**
- Produces: `npm run build` refuses to run without `SITE_ENV` in `{preview, production}`; `postbuild` asserts the built `robots.txt` and `X-Robots-Tag` match `SITE_ENV`; `/api/health/` reports `siteEnv`.

- [ ] **Step 1: Write the post-build check (it is the test for this task)**

Create `web/scripts/check-build.mjs`:
```js
// Asserts that the artefacts in .next match SITE_ENV. Runs automatically after `next build` (postbuild).
import {readFileSync, existsSync} from "node:fs";
const env = process.env.SITE_ENV;
if (env !== "production" && env !== "preview") { console.error(`check-build: SITE_ENV must be production or preview, got ${JSON.stringify(env)}`); process.exit(1); }
const robotsPath = ".next/server/app/robots.txt.body";
if (!existsSync(robotsPath)) { console.error(`check-build: ${robotsPath} not found`); process.exit(1); }
const robots = readFileSync(robotsPath, "utf8");
const manifest = JSON.parse(readFileSync(".next/routes-manifest.json", "utf8"));
const headerValues = (manifest.headers ?? []).flatMap((h) => h.headers.map((x) => `${x.key}: ${x.value}`));
const hasNoindex = headerValues.some((v) => /^x-robots-tag: .*noindex/i.test(v));
const failures = [];
if (env === "production") {
  if (!/Allow: \//.test(robots) || /Disallow: \/\s*$/m.test(robots)) failures.push("production build has a robots.txt that blocks crawling");
  if (hasNoindex) failures.push("production build still sends X-Robots-Tag noindex");
} else {
  if (!/Disallow: \/\s*$/m.test(robots)) failures.push("preview build must disallow crawling in robots.txt");
  if (!hasNoindex) failures.push("preview build must send X-Robots-Tag noindex");
}
if (failures.length) { for (const f of failures) console.error(`check-build: ${f}`); process.exit(1); }
console.log(`check-build: ok (SITE_ENV=${env}, noindex=${hasNoindex})`);
```

- [ ] **Step 2: Run it against the current build without SITE_ENV to see it fail**

```bash
node scripts/check-build.mjs
```
Expected: exit 1 with `SITE_ENV must be production or preview`.

- [ ] **Step 3: Guard the config**

At the top of `web/next.config.mjs`, after the import line, insert:
```js
const siteEnv = process.env.SITE_ENV;
if (process.env.NODE_ENV === "production" && siteEnv !== "production" && siteEnv !== "preview") {
  throw new Error(
    "SITE_ENV must be set to 'production' or 'preview' for next build and next start. " +
    "It is read at build time and decides robots.txt and the X-Robots-Tag header. See docs/REMEDIATION_RUNBOOK.md.",
  );
}
```
Replace the existing `process.env.SITE_ENV === "production"` in `headers()` with `siteEnv === "production"`.

- [ ] **Step 4: Report the value from the health endpoint**

Replace `web/app/api/health/route.ts` with:
```ts
export const dynamic = "force-dynamic";
export function GET() {
  return Response.json({
    app:"in2it-ebs-website",
    release:"2026-09-08-phase-2",
    status:"ok",
    siteEnv:process.env.SITE_ENV ?? "unset",
    leadDeliveryConfigured:Boolean(process.env.LEAD_WEBHOOK_URL && process.env.LEAD_WEBHOOK_TOKEN),
  }, {headers:{"Cache-Control":"no-store"}});
}
```

- [ ] **Step 5: Wire postbuild**

In `web/package.json` `scripts`, add after `"build"`:
```json
"postbuild": "node scripts/check-build.mjs"
```

- [ ] **Step 6: Verify both branches of the guard**

```bash
npm run build
```
Expected (no SITE_ENV in this shell): FAIL with the `SITE_ENV must be set` error.

```bash
SITE_ENV=preview npm run build
```
(PowerShell: `$env:SITE_ENV="preview"; npm run build`.) Expected: build succeeds and ends with `check-build: ok (SITE_ENV=preview, noindex=true)`.

- [ ] **Step 7: Document**

In `docs/REMEDIATION_RUNBOOK.md`, under "## Local preview", replace the fenced PowerShell block with:
```powershell
npm ci
$env:SITE_ENV = "preview"   # build-time: decides robots.txt and X-Robots-Tag; use "production" only for the approved release build
npm run check
npm run build               # runs scripts/check-build.mjs afterwards
npm start
```
and add the sentence: "`SITE_ENV` is read when `next build` runs, not when the server starts; a production build made without it is refused, and a preview build deployed to production stays de-indexed."

- [ ] **Step 8: Commit**

```bash
git add web/next.config.mjs web/app/api/health/route.ts web/scripts/check-build.mjs web/package.json docs/REMEDIATION_RUNBOOK.md
git commit -m "build: require SITE_ENV and verify the robots gate after every build

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

### Task 1.3: Rate-limit per client instead of one shared bucket (H2)

**Files:**
- Modify: `web/lib/lead-service.ts:3-15, 35-37, 50-53`
- Test: `web/tests/foundations.test.ts` (replace the existing `rate limit returns retry guidance` test)

**Interfaces:**
- Produces: `limited(key: string, max: number): boolean` (module-private), limits: per trusted IP 10/min, per email 3/min, process-wide ceiling 120/min.

- [ ] **Step 1: Replace the rate-limit test and add two more**

In `web/tests/foundations.test.ts`, replace the whole `test('rate limit returns retry guidance', …)` block with:
```ts
test('a trusted client address is limited to ten requests a minute',async()=>{
  process.env.TRUST_PROXY_HEADERS='1';
  try{
    for(let i=0;i<10;i++) await handleLead(request({},{'x-forwarded-for':'203.0.113.7'}),async()=>{});
    const blocked=await handleLead(request(valid,{'x-forwarded-for':'203.0.113.7'}),async()=>{});
    assert.equal(blocked.status,429);assert.equal(blocked.headers.get('retry-after'),'60');
    const other=await handleLead(request(valid,{'x-forwarded-for':'203.0.113.8'}),async()=>{});
    assert.equal(other.status,200);
  } finally { delete process.env.TRUST_PROXY_HEADERS; }
});
test('without trusted addresses, eleven visitors are not locked out together',async()=>{
  delete process.env.TRUST_PROXY_HEADERS;
  for(let i=0;i<11;i++) assert.equal((await handleLead(request({...valid,email:`person${i}@example.com`}),async()=>{})).status,200);
});
test('the same email address is limited to three requests a minute',async()=>{
  delete process.env.TRUST_PROXY_HEADERS;
  for(let i=0;i<3;i++) assert.equal((await handleLead(request(valid),async()=>{})).status,200);
  assert.equal((await handleLead(request(valid),async()=>{})).status,429);
});
```

- [ ] **Step 2: Run the tests to see the new ones fail**

```bash
npm test
```
Expected: `without trusted addresses…` FAILS (11th request is 429) and `the same email…` FAILS (4th request is 200).

- [ ] **Step 3: Implement the three-tier limiter**

In `web/lib/lead-service.ts`, replace lines from `const windowMs = 60_000;` through the end of `function limited` with:
```ts
const windowMs = 60_000;
const buckets = new Map<string, {start:number; count:number}>();
export function resetRateLimitsForTest() { buckets.clear(); }
function limited(key:string, max:number) {
  const now = Date.now();
  for (const [k,v] of buckets) if(now-v.start>=windowMs) buckets.delete(k);
  const bucket = buckets.get(key) ?? {start:now,count:0};
  bucket.count++;
  if(buckets.size >= 5000 && !buckets.has(key)) return true;
  buckets.set(key,bucket);
  return bucket.count > max;
}
const LIMIT_PER_ADDRESS = 10, LIMIT_PER_EMAIL = 3, LIMIT_PROCESS = 120;
```
Replace the address/key/limited lines in `handleLead`:
```ts
  const address = process.env.TRUST_PROXY_HEADERS === "1" ? request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown" : "shared";
  const key = createHash("sha256").update(address).digest("hex");
  if(limited(key)) return json(429,{ok:false,error:"Too many requests. Please wait a minute or email us."},{"Retry-After":"60"});
```
with:
```ts
  const tooMany = () => json(429,{ok:false,error:"Too many requests. Please wait a minute or email us."},{"Retry-After":"60"});
  if(limited("process",LIMIT_PROCESS)) return tooMany();
  const address = process.env.TRUST_PROXY_HEADERS === "1" ? request.headers.get("x-forwarded-for")?.split(",")[0].trim() : undefined;
  if(address && limited("ip:"+createHash("sha256").update(address).digest("hex"),LIMIT_PER_ADDRESS)) return tooMany();
```
After the `parsed.success` check and before the honeypot check, add:
```ts
    if(limited("email:"+createHash("sha256").update(parsed.data.email.toLowerCase()).digest("hex"),LIMIT_PER_EMAIL)) return tooMany();
```

- [ ] **Step 4: Run the tests**

```bash
npm test
```
Expected: all pass.

- [ ] **Step 5: Document the production setting**

In `docs/REMEDIATION_RUNBOOK.md`, in the paragraph that mentions `TRUST_PROXY_HEADERS`, replace "Rate limiting is not distributed; multi-instance production needs an ingress/shared limiter." with: "Limits: 10 requests a minute per client address when `TRUST_PROXY_HEADERS=1` (set it behind Sucuri or any ingress that overwrites `X-Forwarded-For`), 3 a minute per email address, and 120 a minute per process as a flood backstop. Limits are per process; use the edge rate-limit rules as the primary control in production."

- [ ] **Step 6: Commit**

```bash
git add web/lib/lead-service.ts web/tests/foundations.test.ts docs/REMEDIATION_RUNBOOK.md
git commit -m "fix(lead): limit per client address and email instead of one shared bucket

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

### Task 1.4: Let the contact form learn delivery availability at request time

**Files:**
- Modify: `web/components/forms/demo-form.tsx:9-16, 45, 62`
- Modify: `web/app/contact/page.tsx:75`
- Test: `web/tests/browser/interactions.spec.ts` (existing test `offer, result and region are carried into the preview form` keeps passing; one assertion added)

**Interfaces:**
- Consumes: `GET /api/health/` → `{leadDeliveryConfigured: boolean}` (Task 1.2).
- Produces: `DemoForm` takes no props; it renders a `role="status"` line while checking.

Reason: after Task 2.1 the contact page is prerendered, so `process.env` read in the page would be frozen at build time. The form asks the always-dynamic health route instead.

- [ ] **Step 1: Add the assertion to the browser test**

In `web/tests/browser/interactions.spec.ts`, inside `test('offer, result and region are carried into the preview form', …)`, before the final `toBeDisabled()` line add:
```ts
  await expect(page.getByRole('status')).toContainText('Online enquiries are not enabled');
```

- [ ] **Step 2: Rewrite the top of the form component**

In `web/components/forms/demo-form.tsx` replace:
```tsx
export function DemoForm({deliveryEnabled = false}: {deliveryEnabled?:boolean}) {
  const router=useRouter();
```
with:
```tsx
export function DemoForm() {
  const router=useRouter();
  const [deliveryEnabled,setDeliveryEnabled]=useState<boolean|null>(null);
  useEffect(()=>{
    const controller=new AbortController();
    fetch('/api/health/',{signal:controller.signal,cache:'no-store'}).then(r=>r.json()).then(h=>setDeliveryEnabled(Boolean(h.leadDeliveryConfigured))).catch(()=>setDeliveryEnabled(false));
    return ()=>controller.abort();
  },[]);
```
Replace the status paragraph line (`{!deliveryEnabled && <p role="status" …`) with:
```tsx
    {deliveryEnabled===null && <p role="status" className="text-sm text-foreground-muted">Checking whether online enquiries are available…</p>}
    {deliveryEnabled===false && <p role="status" className="rounded-control border border-border-strong bg-surface-subtle p-4 text-sm text-foreground">Online enquiries are not enabled in this preview. Please <a className="font-semibold text-action underline" href="mailto:info@in2itebs.com">email info@in2itebs.com</a>. This form will not report a request as delivered.</p>}
```
Replace `disabled={busy || !deliveryEnabled}` with `disabled={busy || deliveryEnabled!==true}`.

- [ ] **Step 3: Drop the prop from the page**

In `web/app/contact/page.tsx` replace:
```tsx
<DemoForm deliveryEnabled={Boolean(process.env.LEAD_WEBHOOK_URL && process.env.LEAD_WEBHOOK_TOKEN)} />
```
with `<DemoForm />`.

- [ ] **Step 4: Verify**

```bash
npm run check
SITE_ENV=preview npm run build
npx playwright test tests/browser/interactions.spec.ts --reporter=list
```
Expected: check passes; build passes; 8 passed.

- [ ] **Step 5: Commit**

```bash
git add web/components/forms/demo-form.tsx web/app/contact/page.tsx web/tests/browser/interactions.spec.ts
git commit -m "fix(contact): read enquiry availability from the health route at request time

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

### Task 1.5: Content-Security-Policy and HSTS (H5)

**Files:**
- Modify: `web/next.config.mjs` (`headers()`)
- Create: `web/tests/browser/security-headers.spec.ts`

**Interfaces:**
- Produces: CSP that allows Next's inline hydration scripts (`'unsafe-inline'` is required because the site is static and cannot use nonces), self-hosted fonts and images, and nothing external.

- [ ] **Step 1: Write the failing browser test**

Create `web/tests/browser/security-headers.spec.ts`:
```ts
import {test,expect} from '@playwright/test';
test('security headers are present and the CSP breaks nothing',async({page,request})=>{
  const response=await request.get('/');
  const headers=response.headers();
  expect(headers['content-security-policy']).toContain("default-src 'self'");
  expect(headers['content-security-policy']).toContain("frame-ancestors 'none'");
  expect(headers['strict-transport-security']).toContain('max-age=63072000');
  expect(headers['x-content-type-options']).toBe('nosniff');
  const violations:string[]=[];
  page.on('console',message=>{if(/Content Security Policy/i.test(message.text())) violations.push(message.text());});
  for(const path of ['/','/contact/','/sap-enterprise-solutions/rise-vs-grow/','/partners/']) {
    await page.goto(path);await page.waitForLoadState('networkidle');
    await expect(page.locator('img').first()).toBeVisible();
  }
  await page.getByRole('button',{name:'Switch to dark theme'}).click();
  await expect(page.locator('html')).toHaveClass(/theme-dark/);
  expect(violations).toEqual([]);
});
```

- [ ] **Step 2: Run it to see it fail**

```bash
npx playwright test tests/browser/security-headers.spec.ts --reporter=list
```
Expected: FAIL on `content-security-policy` being undefined.

- [ ] **Step 3: Add the headers**

In `web/next.config.mjs`, replace the `headers()` function with:
```js
  async headers() {
    const dev = process.env.NODE_ENV === "development";
    const csp = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      `connect-src 'self'${dev ? " ws: wss:" : ""}`,
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      ...(dev ? [] : ["upgrade-insecure-requests"]),
    ].join("; ");
    return [{source:"/:path*",headers:[
      {key:"Content-Security-Policy",value:csp},
      {key:"Strict-Transport-Security",value:"max-age=63072000; includeSubDomains"},
      {key:"X-Content-Type-Options",value:"nosniff"},
      {key:"Referrer-Policy",value:"strict-origin-when-cross-origin"},
      {key:"X-Frame-Options",value:"DENY"},
      {key:"Permissions-Policy",value:"camera=(), microphone=(), geolocation=()"},
      ...(siteEnv === "production" ? [] : [{key:"X-Robots-Tag",value:"noindex, nofollow, noarchive"}]),
    ]}];
  },
```

- [ ] **Step 4: Rebuild, restart the test server if Playwright owns it, run the test**

```bash
SITE_ENV=preview npm run build
npx playwright test tests/browser/security-headers.spec.ts tests/browser/transcript.spec.ts --reporter=list
```
Expected: 7 passed. If the server on 3107 was started outside Playwright, it must be restarted by its owner to pick up the new build; note this in the task report instead of killing it.

- [ ] **Step 5: Record the preload decision**

In `docs/REMEDIATION_RUNBOOK.md`, add under "## Measurement, recruitment and production blockers": "HSTS is sent with `includeSubDomains` but without `preload`; submitting the domain to the preload list is irreversible and needs owner approval. The CSP allows inline scripts because Next.js emits inline hydration scripts on static pages; any future analytics tag must be added to `script-src` and `connect-src` explicitly."

- [ ] **Step 6: Commit**

```bash
git add web/next.config.mjs web/tests/browser/security-headers.spec.ts docs/REMEDIATION_RUNBOOK.md
git commit -m "security: add Content-Security-Policy and HSTS headers

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

**Phase 1 gate:** `SITE_ENV=preview npm run check:full` passes.

---

## Phase 2: Static rendering, redirects, robots

### Task 2.1: Prerender every page again by moving the theme cookie read to the client (H1)

**Files:**
- Modify: `web/app/layout.tsx`
- Delete: `web/lib/themes.ts`
- Modify: `web/tests/foundations.test.ts` (remove the `theme cookie uses a safe default` test and its import)
- Modify: `web/tests/browser/site.spec.ts` (the no-JavaScript test)
- Modify: `web/scripts/check-build.mjs` (add the prerender assertion)

**Interfaces:**
- Produces: `<html class="theme-light">` in server HTML for every page; a `beforeInteractive` script swaps to `theme-dark` when the `in2it-theme=dark` cookie exists; `/thank-you/` stays dynamic (it reads the receipt cookie).

- [ ] **Step 1: Extend the post-build check so it fails today**

Append to `web/scripts/check-build.mjs` before the final `if (failures.length)` block:
```js
const prerender = JSON.parse(readFileSync(".next/prerender-manifest.json", "utf8"));
const prerenderedPages = Object.keys(prerender.routes).filter((r) => !/\.(xml|txt)$/.test(r) && r !== "/opengraph-image");
if (prerenderedPages.length < 60) failures.push(`only ${prerenderedPages.length} pages are prerendered; expected at least 60 (is cookies()/headers() used in a layout?)`);
```

- [ ] **Step 2: Run the build to see it fail**

```bash
SITE_ENV=preview npm run build
```
Expected: `check-build: only 0 pages are prerendered…`, exit 1.

- [ ] **Step 3: Update the no-JavaScript browser test to the documented trade-off**

In `web/tests/browser/site.spec.ts`, replace the body of `test('static content and persisted theme work without JavaScript', …)` with:
```ts
  const context=await browser.newContext({javaScriptEnabled:false});
  await context.addCookies([{name:'in2it-theme',value:'dark',domain:'127.0.0.1',path:'/'}]);
  const page=await context.newPage();await page.goto('http://127.0.0.1:3107/');
  // Static pages ship the light theme; the cookie is applied by a before-interactive script, so no-JS visitors get light.
  await expect(page.locator('html')).toHaveClass(/theme-light/);
  await expect(page.getByRole('heading',{level:1})).toBeVisible();
  await expect(page.locator('main')).not.toContainText('being prepared');
  await context.close();
```
Add a new test after it:
```ts
test('the theme cookie is applied before hydration on a static page',async({page,context})=>{
  await context.addCookies([{name:'in2it-theme',value:'dark',domain:'127.0.0.1',path:'/'}]);
  await page.goto('/about/',{waitUntil:'domcontentloaded'});
  await expect(page.locator('html')).toHaveClass(/theme-dark/);
  const cacheControl=(await page.request.get('/about/')).headers()['cache-control'] ?? '';
  expect(cacheControl).not.toContain('no-store');
});
```

- [ ] **Step 4: Rewrite the root layout**

Replace `web/app/layout.tsx` with:
```tsx
import type { Metadata } from "next";
import Script from "next/script";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import { SITE_URL } from "@/lib/utils";
import { RegionProvider } from "@/components/layout/region-preference";
import { MeasurementSignals } from "@/components/layout/measurement-signals";
import { QuickContact } from "@/components/layout/quick-contact";

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex",
  display: "swap",
});

/** Applies the persisted theme before first paint; pages are prerendered light. */
const THEME_INIT = `(function(){try{var m=document.cookie.match(/(?:^|; )in2it-theme=(dark|light)(?:;|$)/);if(m&&m[1]==="dark"){var c=document.documentElement.classList;c.remove("theme-light");c.add("theme-dark");}}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "In2IT EBS — Enterprise transformation, delivered globally",
    template: "%s · In2IT EBS",
  },
  description:
    "10+ years of enterprise transformation, delivered globally. SAP Gold Partner with adjacent strength across Salesforce, Workday, Oracle, Microsoft, cloud and application services.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`theme-light ${plex.variable}`} suppressHydrationWarning>
      <body className="grain">
        <Script id="theme-init" strategy="beforeInteractive">{THEME_INIT}</Script>
        <RegionProvider>
        <MeasurementSignals />
        <OrganizationJsonLd />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-control focus:bg-action focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-on-action"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <QuickContact />
        </RegionProvider>
      </body>
    </html>
  );
}
```
(This also removes the layout-level `openGraph`, `twitter` and `alternates.canonical: "/"` blocks; every page sets its own through `pageMetadata`, and `app/not-found.tsx` gets its own in Task 3.4. `suppressHydrationWarning` is required because the inline script changes the `class` attribute before React hydrates.)

- [ ] **Step 5: Remove the now-unused theme helper and its unit test**

Delete `web/lib/themes.ts`. In `web/tests/foundations.test.ts` delete the line `import {resolveTheme} from '../lib/themes';` and the whole `test('theme cookie uses a safe default for unknown values', …)` block.

- [ ] **Step 6: Verify**

```bash
npm run check
SITE_ENV=preview npm run build
```
Expected: check passes; the build's route table shows `○` or `●` for every page except `/thank-you` (`ƒ`) and the API routes; `check-build: ok`. Then:
```bash
npx playwright test tests/browser/site.spec.ts tests/browser/interactions.spec.ts tests/browser/theme-contrast.spec.ts --reporter=list
```
Expected: all pass (the server on 3107 must be serving the new build; see the note in Task 1.5 Step 4).

- [ ] **Step 7: Commit**

```bash
git add web/app/layout.tsx web/lib/themes.ts web/tests/foundations.test.ts web/tests/browser/site.spec.ts web/scripts/check-build.mjs
git commit -m "perf: prerender all pages by applying the theme cookie on the client

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

### Task 2.2: Cover the 35 missing legacy URLs and return 410 for theme-demo URLs (H4)

**Files:**
- Modify: `web/content/redirects.mjs` (append entries, export `goneSources`)
- Modify: `web/next.config.mjs` (add `rewrites()`)
- Create: `web/app/api/gone/route.ts`
- Create: `web/tests/redirects.test.ts`

**Interfaces:**
- Produces: `export const goneSources: string[]` in `redirects.mjs`; `GET /api/gone/` returns HTTP 410 with a short HTML body.

- [ ] **Step 1: Write the failing test**

Create `web/tests/redirects.test.ts`:
```ts
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import path from 'node:path';
import {redirects, goneSources} from '../content/redirects.mjs';

const required:[string,string][]=[
  ['/how-rise-with-sap-s-4hana-cloud-can-transform-your-business','/insights/rise-with-sap-s4hana-cloud-transform-business/'],
  ['/revolutionizing-hr-with-sap-successfactors-a-strategic-approach-to-modern-hcm-solutions','/insights/revolutionizing-hr-with-sap-successfactors/'],
  ['/igniting-organizational-potential-sap-successfactors-ai-innovations-revealed-at-sap-successconnect-las-vegas','/insights/successfactors-ai-innovations-successconnect/'],
  ['/grow-with-sap','/sap-enterprise-solutions/rise-vs-grow/'],
  ['/grow-with-sap-leadership-forum-event','/sap-enterprise-solutions/rise-vs-grow/'],
  ['/in2it-ebs-simplify-hiring','/sap-enterprise-solutions/successfactors/'],
  ['/in2it-ebs-simplify-talent-2','/sap-enterprise-solutions/successfactors/'],
  ['/sap-successfactors-partner-in-india','/sap-enterprise-solutions/successfactors/'],
  ['/sap-success-factors-in-bangalore','/sap-enterprise-solutions/successfactors/'],
  ['/sap-successfactors-partner-in-mumbai','/sap-enterprise-solutions/successfactors/'],
  ['/sap-successfactors-partner-in-chennai','/sap-enterprise-solutions/successfactors/'],
  ['/sap-successfactors-partner-in-delhi','/sap-enterprise-solutions/successfactors/'],
  ['/sap-successfactors-partner-in-kolkata','/sap-enterprise-solutions/successfactors/'],
  ['/sap-success-factors-in-hyderabad','/sap-enterprise-solutions/successfactors/'],
  ['/sap-success-factors-in-bhubaneswar','/sap-enterprise-solutions/successfactors/'],
  ['/unlock-the-power-of-hr-technology-transformation','/sap-enterprise-solutions/successfactors/'],
  ['/unlock-the-power-of-hr-technology-transformation-register-now','/sap-enterprise-solutions/successfactors/'],
  ['/unlock-the-power-of-hr-technology-transformation-register-now1','/sap-enterprise-solutions/successfactors/'],
  ['/join-our-team','/careers/'],
  ['/apply-now','/careers/'],
  ['/our-culture','/careers/'],
  ['/sap-and-success-factor-consultant','/careers/'],
  ['/events-celebrations-3','/careers/'],
  ['/faq','/contact/'],
  ['/dharmendra-sharma','/about/'],
  ['/anil-kumar-soleti','/about/'],
  ['/rajat-kapoor','/about/'],
  ['/news/page/2','/insights/'],
  ['/global-webinar','/insights/'],
];
const gone=['/attract-and-retain-quality-high-paying-customers','/coronavirus-lockdown-leads-to-more-gaming-and-e-sports','/future-where-technology-creates-good-jobs','/live-stream-from-awwwards-showcasing-trends','/solutions-for-all-small-and-large-business','/what-you-do-today-improve-your-tomorrows','/case','/case/:path*','/event','/event/:path*'];

test('every required legacy URL redirects to its new home',()=>{
  const map=new Map(redirects.map(r=>[r.source,r.destination]));
  for(const [source,destination] of required) assert.equal(map.get(source),destination,source);
});
test('redirect destinations resolve to a route directory',()=>{
  for(const r of redirects){
    const target=r.destination.replace(/#.*$/,'');
    assert.ok(target.endsWith('/'),`${r.destination} needs a trailing slash`);
    const dir=path.join(process.cwd(),'app',target);
    const dynamicParent=path.join(process.cwd(),'app',target.split('/').slice(0,-2).join('/'),'[slug]');
    assert.ok(existsSync(path.join(dir,'page.tsx'))||existsSync(dynamicParent),`${r.source} -> ${r.destination} has no page`);
  }
  const sources=new Set(redirects.map(r=>r.source));
  for(const r of redirects) assert.ok(!sources.has(r.destination.replace(/\/$/,'')),`${r.source} chains into another redirect`);
});
test('theme-demo URLs are listed as gone, not redirected',()=>{
  for(const g of gone) assert.ok(goneSources.includes(g),g);
  const sources=new Set(redirects.map(r=>r.source));
  for(const g of goneSources) assert.ok(!sources.has(g),`${g} is both gone and redirected`);
});
```

- [ ] **Step 2: Run it to see it fail**

```bash
npm test
```
Expected: FAIL (`goneSources` is not exported; required entries missing).

- [ ] **Step 3: Add the entries**

In `web/content/redirects.mjs`, before the closing `];` of `redirects`, append:
```js
  // --- Legacy blog posts with exact new equivalents (audit H4, 2026-09-08) ---
  p("/how-rise-with-sap-s-4hana-cloud-can-transform-your-business", "/insights/rise-with-sap-s4hana-cloud-transform-business/"),
  p("/revolutionizing-hr-with-sap-successfactors-a-strategic-approach-to-modern-hcm-solutions", "/insights/revolutionizing-hr-with-sap-successfactors/"),
  p("/igniting-organizational-potential-sap-successfactors-ai-innovations-revealed-at-sap-successconnect-las-vegas", "/insights/successfactors-ai-innovations-successconnect/"),
  p("/grow-with-sap", "/sap-enterprise-solutions/rise-vs-grow/"),
  p("/grow-with-sap-leadership-forum-event", "/sap-enterprise-solutions/rise-vs-grow/"),
  // --- SuccessFactors local landing pages and campaigns ---
  p("/in2it-ebs-simplify-hiring", "/sap-enterprise-solutions/successfactors/"),
  p("/in2it-ebs-simplify-talent-2", "/sap-enterprise-solutions/successfactors/"),
  p("/sap-successfactors-partner-in-india", "/sap-enterprise-solutions/successfactors/"),
  p("/sap-success-factors-in-bangalore", "/sap-enterprise-solutions/successfactors/"),
  p("/sap-successfactors-partner-in-mumbai", "/sap-enterprise-solutions/successfactors/"),
  p("/sap-successfactors-partner-in-chennai", "/sap-enterprise-solutions/successfactors/"),
  p("/sap-successfactors-partner-in-delhi", "/sap-enterprise-solutions/successfactors/"),
  p("/sap-successfactors-partner-in-kolkata", "/sap-enterprise-solutions/successfactors/"),
  p("/sap-success-factors-in-hyderabad", "/sap-enterprise-solutions/successfactors/"),
  p("/sap-success-factors-in-bhubaneswar", "/sap-enterprise-solutions/successfactors/"),
  p("/unlock-the-power-of-hr-technology-transformation", "/sap-enterprise-solutions/successfactors/"),
  p("/unlock-the-power-of-hr-technology-transformation-register-now", "/sap-enterprise-solutions/successfactors/"),
  p("/unlock-the-power-of-hr-technology-transformation-register-now1", "/sap-enterprise-solutions/successfactors/"),
  // --- Careers, FAQ, leadership profiles, news archive ---
  p("/join-our-team", "/careers/"),
  p("/apply-now", "/careers/"),
  p("/our-culture", "/careers/"),
  p("/sap-and-success-factor-consultant", "/careers/"),
  p("/events-celebrations-3", "/careers/"),
  p("/faq", "/contact/"),
  p("/dharmendra-sharma", "/about/"),
  p("/anil-kumar-soleti", "/about/"),
  p("/rajat-kapoor", "/about/"),
  p("/news/page/2", "/insights/"),
  p("/global-webinar", "/insights/"),
```
After the array, add:
```js
/** WordPress theme-demo URLs that never held In2IT content: served as HTTP 410 via a rewrite to /api/gone/. */
export const goneSources = [
  "/attract-and-retain-quality-high-paying-customers",
  "/coronavirus-lockdown-leads-to-more-gaming-and-e-sports",
  "/future-where-technology-creates-good-jobs",
  "/live-stream-from-awwwards-showcasing-trends",
  "/solutions-for-all-small-and-large-business",
  "/what-you-do-today-improve-your-tomorrows",
  "/case",
  "/case/:path*",
  "/event",
  "/event/:path*",
];
```

- [ ] **Step 4: Add the rewrite and the handler**

In `web/next.config.mjs` change the import to `import { redirects as redirectMap, goneSources } from "./content/redirects.mjs";` and add inside `nextConfig` after `redirects()`:
```js
  async rewrites() {
    return { beforeFiles: goneSources.map((source) => ({ source, destination: "/api/gone/" })) };
  },
```
Create `web/app/api/gone/route.ts`:
```ts
export const dynamic = "force-dynamic";
const body = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Page removed · In2IT EBS</title></head><body style="font-family:system-ui;margin:3rem auto;max-width:36rem;padding:0 1rem"><h1>This page has been removed</h1><p>It never held In2IT EBS content. See <a href="/what-we-do/">what we do</a> or <a href="/contact/">contact us</a>.</p></body></html>`;
export function GET() {
  return new Response(body, { status: 410, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=86400" } });
}
```

- [ ] **Step 5: Verify**

```bash
npm test
SITE_ENV=preview npm run build
```
Then against the rebuilt server:
```bash
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" http://127.0.0.1:3107/join-our-team/
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3107/case/business-growth/
```
Expected: `308 http://127.0.0.1:3107/careers/` and `410`.

- [ ] **Step 6: Commit**

```bash
git add web/content/redirects.mjs web/next.config.mjs web/app/api/gone/route.ts web/tests/redirects.test.ts
git commit -m "seo: redirect 29 more legacy URLs and return 410 for theme-demo pages

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

### Task 2.3: robots.txt disallows the API and thank-you routes; thank-you allows follow (L2, L8)

**Files:**
- Modify: `web/app/robots.ts`
- Modify: `web/app/thank-you/page.tsx:9`
- Modify: `web/scripts/check-build.mjs` (tighten the production assertion)

- [ ] **Step 1: Tighten the check script (the test)**

In `web/scripts/check-build.mjs`, in the `env === "production"` branch, add:
```js
  if (!/Disallow: \/api\//.test(robots) || !/Disallow: \/thank-you\//.test(robots)) failures.push("production robots.txt must disallow /api/ and /thank-you/");
  if (/^Host:/m.test(robots)) failures.push("robots.txt must not use the non-standard Host directive");
```

- [ ] **Step 2: Rewrite robots.ts**

```ts
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  if (process.env.SITE_ENV !== "production") return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/thank-you/"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
```

- [ ] **Step 3: Thank-you robots**

In `web/app/thank-you/page.tsx` change `robots: {index: false, follow: false},` to `robots: {index: false, follow: true},`.

- [ ] **Step 4: Verify both environments build**

```bash
SITE_ENV=production npm run build && SITE_ENV=preview npm run build
```
Expected: both end with `check-build: ok`. (Leave the tree on the preview build.)

- [ ] **Step 5: Commit**

```bash
git add web/app/robots.ts web/app/thank-you/page.tsx web/scripts/check-build.mjs
git commit -m "seo: disallow api and thank-you in robots.txt, drop Host directive

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

### Task 2.4: One canonical host constant (L5)

**Files:**
- Modify: `web/app/sitemap.ts:1-7`
- Modify: `web/components/seo/json-ld.tsx:1-3`
- Test: `web/tests/foundations.test.ts`

- [ ] **Step 1: Write the failing test**

Append to `web/tests/foundations.test.ts`:
```ts
test('the canonical host is defined once',()=>{
  for(const file of ['app/sitemap.ts','app/robots.ts','components/seo/json-ld.tsx','lib/metadata.ts']){
    const source=readFileSync(path.join(process.cwd(),file),'utf8');
    assert.ok(!/const BASE\s*=\s*"https:\/\//.test(source),`${file} redefines the site host`);
    assert.ok(source.includes('SITE_URL'),`${file} must import SITE_URL`);
  }
});
```

- [ ] **Step 2: Run it to see it fail**

```bash
npm test
```
Expected: FAIL on `app/sitemap.ts redefines the site host`.

- [ ] **Step 3: Replace the constants**

In `web/app/sitemap.ts` replace `const BASE = "https://in2itebs.com";` with `import { SITE_URL } from "@/lib/utils";` (keep it with the other imports) and replace `${BASE}` with `${SITE_URL}`.
In `web/components/seo/json-ld.tsx` replace `const BASE = "https://in2itebs.com";` with `import { SITE_URL } from "@/lib/utils";` and every `BASE` with `SITE_URL`.

- [ ] **Step 4: Verify and commit**

```bash
npm run check
git add web/app/sitemap.ts web/components/seo/json-ld.tsx web/tests/foundations.test.ts
git commit -m "refactor: import SITE_URL instead of redefining the host

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

**Phase 2 gate:** `SITE_ENV=preview npm run check:full` passes; build table shows all pages static except `/thank-you`.

---

## Phase 3: SEO and structured data

### Task 3.1: Metadata helper: branded og:title, absolute homepage title, trailing-slash image (M5, L3)

**Files:**
- Modify: `web/lib/metadata.ts`
- Modify: `web/app/page.tsx:34-38`
- Test: `web/tests/metadata.test.ts` (new)

**Interfaces:**
- Produces: `pageMetadata(path, input)` accepts `title: string | {absolute: string}`; sets `openGraph.title` to `${title} · In2IT EBS` (or the absolute title), `openGraph.images[0].url` = `/opengraph-image/`, `twitter.site` = `@in2itebs_`.

- [ ] **Step 1: Write the failing test**

Create `web/tests/metadata.test.ts`:
```ts
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {pageMetadata} from '../lib/metadata';

test('page metadata brands the social title and uses trailing-slash image URLs',()=>{
  const m=pageMetadata('/about/',{title:'Who We Are',description:'x'.repeat(80)});
  assert.equal(m.alternates?.canonical,'https://in2itebs.com/about/');
  const og=m.openGraph as {title:string;url:string;images:{url:string}[]};
  assert.equal(og.title,'Who We Are · In2IT EBS');
  assert.equal(og.url,'https://in2itebs.com/about/');
  assert.equal(og.images[0].url,'/opengraph-image/');
  assert.equal((m.twitter as {site:string}).site,'@in2itebs_');
});
test('an absolute title is used verbatim',()=>{
  const m=pageMetadata('/',{title:{absolute:'In2IT EBS — Enterprise transformation under control'},description:'y'.repeat(80)});
  assert.equal((m.openGraph as {title:string}).title,'In2IT EBS — Enterprise transformation under control');
});
```

- [ ] **Step 2: Run it to see it fail**

```bash
npm test
```
Expected: FAIL (`og.title` is `Who We Are`).

- [ ] **Step 3: Update the helper**

Replace `web/lib/metadata.ts` with:
```ts
import type {Metadata} from "next";
import {SITE_URL} from "./utils";
const BRAND = "In2IT EBS";
export function pageMetadata(path:string, input:Metadata): Metadata {
  const canonical = new URL(path, SITE_URL).toString();
  const absolute = typeof input.title === "object" && input.title !== null && "absolute" in input.title ? String(input.title.absolute) : null;
  const plain = typeof input.title === "string" ? input.title : null;
  const socialTitle = absolute ?? (plain ? `${plain} · ${BRAND}` : BRAND);
  const description = input.description ?? "Enterprise platforms, advisory and digital engineering from In2IT EBS.";
  return {...input, alternates:{canonical},
    openGraph:{type:"website",siteName:BRAND,title:socialTitle,description,url:canonical,images:[{url:"/opengraph-image/",width:1200,height:630,alt:"In2IT EBS: enterprise transformation"}]},
    twitter:{card:"summary_large_image",site:"@in2itebs_",title:socialTitle,description,images:["/opengraph-image/"]},
  };
}
```

- [ ] **Step 4: Fix the homepage title**

In `web/app/page.tsx` replace `title: "In2IT EBS — Enterprise transformation under control",` with `title: { absolute: "In2IT EBS — Enterprise transformation under control" },`.

- [ ] **Step 5: Verify and commit**

```bash
npm run check
git add web/lib/metadata.ts web/app/page.tsx web/tests/metadata.test.ts
git commit -m "seo: brand social titles, absolute homepage title, trailing-slash og image

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

### Task 3.2: Descriptions within 160 characters; case-study summaries (M5)

**Files:**
- Modify: `web/content/case-studies.ts` (add `summary` to the `CaseStudy` interface and every named study)
- Modify: `web/app/case-studies/[slug]/page.tsx:23`
- Modify: the 11 pages listed in Step 3
- Test: `web/tests/metadata.test.ts`

- [ ] **Step 1: Write the failing test**

Append to `web/tests/metadata.test.ts`:
```ts
import {readFileSync, readdirSync, statSync} from 'node:fs';
import path from 'node:path';
import {caseStudies} from '../content/case-studies';
import {insights} from '../content/insights';

function pages(dir:string):string[]{ return readdirSync(dir).flatMap(entry=>{const full=path.join(dir,entry);return statSync(full).isDirectory()?pages(full):entry==='page.tsx'?[full]:[];}); }
test('static page descriptions stay within 70 to 160 characters',()=>{
  for(const file of pages(path.join(process.cwd(),'app'))){
    const source=readFileSync(file,'utf8');
    const match=source.match(/description:\s*\n?\s*"([^"]+)"/);
    if(!match||file.includes('[slug]')) continue;
    const length=match[1].length;
    const noindex=/robots:\s*\{index: false/.test(source);
    assert.ok(length<=160,`${path.relative(process.cwd(),file)}: description is ${length} characters`);
    if(!noindex) assert.ok(length>=70,`${path.relative(process.cwd(),file)}: description is only ${length} characters`);
  }
});
test('named case studies carry a summary of at most 155 characters',()=>{
  for(const study of caseStudies.filter(s=>s.named)){
    assert.ok(study.summary && study.summary.length>=60 && study.summary.length<=155,`${study.slug}: summary length ${study.summary?.length ?? 0}`);
  }
  for(const article of insights) assert.ok(article.excerpt.length<=160,article.slug);
});
```

- [ ] **Step 2: Run it to see it fail**

```bash
npm test
```
Expected: FAIL listing the over-long pages and missing summaries.

- [ ] **Step 3: Shorten the eleven static descriptions**

Edit the `description` string in each file so it is 70 to 155 characters, keeps the page's subject and one concrete claim already in the file, and contains no new facts:
`app/sap-enterprise-solutions/analytics-cloud/page.tsx` (207), `app/advisory/page.tsx` (196), `app/partners/page.tsx` (191), `app/sap-enterprise-solutions/migrations/page.tsx` (187), `app/sap-enterprise-solutions/abap-factory/page.tsx` (186), `app/sap-enterprise-solutions/syniti/page.tsx` (176), `app/sap-enterprise-solutions/health-check-360/page.tsx` (175), `app/case-studies/page.tsx` (169), `app/digital-data-ai/ai-automation/page.tsx` (166), `app/sap-enterprise-solutions/successfactors/page.tsx` (162), `app/sap-enterprise-solutions/rise-vs-grow/page.tsx` (161).
Example for `app/partners/page.tsx`:
```ts
  description:
    "Strategic alliances across platforms, hyperscalers, data and specialist vendors, with certified delivery and pre-built integration accelerators.",
```

- [ ] **Step 4: Add case-study summaries**

In `web/content/case-studies.ts` add to the interface after `scenario: string;`:
```ts
  summary?: string; // ≤155 characters, used as the page meta description (named studies only)
```
For each study with `named: true`, add a `summary` line directly after `scenario`, condensing that study's own scenario into one sentence of 60 to 155 characters (client, what was delivered, headline outcome already stated in `outcome` or `differentiator`). No new numbers.

In `web/app/case-studies/[slug]/page.tsx` replace `description: study.scenario,` with `description: study.summary ?? study.scenario.slice(0, 155),`.

- [ ] **Step 5: Verify and commit**

```bash
npm run check
git add web/content/case-studies.ts "web/app/case-studies/[slug]/page.tsx" web/app/**/page.tsx web/tests/metadata.test.ts
git commit -m "seo: keep meta descriptions within 160 characters

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

### Task 3.3: Freshness signals: sitemap lastModified and insight dates (M5)

**Files:**
- Modify: `web/content/site.ts` (add `contentUpdated`)
- Modify: `web/app/sitemap.ts`
- Modify: `web/content/insight-bodies.ts:3,8,13` and `web/content/insights.ts`
- Test: `web/tests/metadata.test.ts`

- [ ] **Step 1: Find the real publication dates**

```bash
grep -rniE "rise with sap s/4hana cloud can transform|revolutioni[sz]ing hr with sap successfactors|igniting organizational potential" ../scraped --include=*.md -l
grep -rhoiE "(published|date)[^\n]{0,40}20[12][0-9]-[0-9]{2}-[0-9]{2}|20[12][0-9]-[0-9]{2}-[0-9]{2}" ../scraped/news* 2>/dev/null | sort -u | head
```
Use a date only if a scraped page for that article states it. If none is found for an article, keep `date:''` for it in `insight-bodies.ts` and delete the corresponding placeholder `date:` line from `archivedEntries` in `insights.ts` so the two files stop disagreeing (the `Insight` type keeps `date: string`; `insights.ts` already overrides it from `insightBodies`).

- [ ] **Step 2: Write the failing test**

Append to `web/tests/metadata.test.ts`:
```ts
import sitemap from '../app/sitemap';
import {contentUpdated} from '../content/site';
test('every sitemap entry has a valid lastModified and the homepage is included',()=>{
  const entries=sitemap();
  assert.ok(entries.some(e=>e.url==='https://in2itebs.com/'));
  for(const entry of entries){
    assert.ok(entry.lastModified instanceof Date && !Number.isNaN(entry.lastModified.getTime()),entry.url);
    assert.ok(!entry.url.endsWith('/thank-you/'));
  }
  assert.match(contentUpdated,/^\d{4}-\d{2}-\d{2}$/);
});
```

- [ ] **Step 3: Run it to see it fail**

```bash
npm test
```
Expected: FAIL (`contentUpdated` is not exported; `lastModified` undefined).

- [ ] **Step 4: Implement**

In `web/content/site.ts` add after `footerCertifications`:
```ts
/** Bump when site copy changes; feeds sitemap lastModified for pages without their own date. */
export const contentUpdated = "2026-09-08";
```
In `web/app/sitemap.ts`, import `contentUpdated` from `@/content/site` and `insightBodies` from `@/content/insight-bodies`, then replace the final `return all.map(...)` with:
```ts
  const dateFor = (path: string) => {
    const slug = path.match(/^\/insights\/([^/]+)\/$/)?.[1];
    const articleDate = slug ? insightBodies[slug]?.date : "";
    return new Date(articleDate || contentUpdated);
  };
  return all.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: dateFor(path),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
```

- [ ] **Step 5: Verify and commit**

```bash
npm run check
git add web/content/site.ts web/app/sitemap.ts web/content/insight-bodies.ts web/content/insights.ts web/tests/metadata.test.ts
git commit -m "seo: emit sitemap lastModified and reconcile insight dates

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

### Task 3.4: Not-found page owns its metadata (M5)

**Files:**
- Modify: `web/app/not-found.tsx:5-8`

- [ ] **Step 1: Replace the metadata export**

```tsx
import {pageMetadata} from "@/lib/metadata";

export const metadata = pageMetadata("/404/", {
  title: "Page not found",
  description: "The page you were looking for could not be found. It may have moved, or the link may be out of date.",
  robots: {index: false, follow: true},
});
```
(Add the import at the top with the others.)

- [ ] **Step 2: Verify the rendered head**

```bash
SITE_ENV=preview npm run build
curl -s http://127.0.0.1:3107/no-such-page/ | grep -oE '<link rel="canonical"[^>]*>|<meta name="robots"[^>]*>'
```
Expected: canonical `https://in2itebs.com/404/` and `<meta name="robots" content="noindex, follow"/>` (after the server picks up the build).

- [ ] **Step 3: Commit**

```bash
git add web/app/not-found.tsx
git commit -m "seo: give the 404 page its own canonical and noindex

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

### Task 3.5: Structured data: escaped JSON-LD, Organization address, breadcrumbs, articles (M6, L1)

**Files:**
- Create: `web/lib/json-ld.ts` (plain TypeScript, no JSX, so unit tests can import it)
- Modify: `web/components/seo/json-ld.tsx`
- Modify: every `web/app/**/page.tsx` that calls `pageMetadata` with a path other than `/` (39 files) — one line each
- Modify: `web/app/insights/[slug]/page.tsx` (Article)
- Test: `web/tests/metadata.test.ts`

**Interfaces:**
- Produces in `lib/json-ld.ts`: `safeJsonLd(data: unknown): string`.
- Produces in `components/seo/json-ld.tsx`: `OrganizationJsonLd()`; `BreadcrumbJsonLd({path, name?}: {path: string; name?: string})`; `ArticleJsonLd({slug, title, date, excerpt, author?})`.

- [ ] **Step 1: Write the failing tests**

Append to `web/tests/metadata.test.ts`:
```ts
import {safeJsonLd} from '../lib/json-ld';
test('json-ld output cannot close its script tag early',()=>{
  const out=safeJsonLd({name:'</script><script>alert(1)</script>'});
  assert.ok(!out.includes('</script'));
  assert.deepEqual(JSON.parse(out),{name:'</script><script>alert(1)</script>'});
});
test('every inner page renders a breadcrumb trail',()=>{
  for(const file of pages(path.join(process.cwd(),'app'))){
    const source=readFileSync(file,'utf8');
    const match=source.match(/pageMetadata\((["'`])([^"'`]+)\1/);
    if(!match||match[2]==='/'||match[2]==='/404/') continue;
    assert.ok(source.includes('<BreadcrumbJsonLd'),`${path.relative(process.cwd(),file)} has no BreadcrumbJsonLd`);
  }
});
```

- [ ] **Step 2: Run it to see it fail**

```bash
npm test
```
Expected: FAIL (`safeJsonLd` is not exported).

- [ ] **Step 3: Rewrite the JSON-LD module**

Create `web/lib/json-ld.ts`:
```ts
/** JSON.stringify that cannot terminate the surrounding <script> element. */
export function safeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
```

Replace `web/components/seo/json-ld.tsx` with:
```tsx
import { social, site } from "@/content/site";
import { offices } from "@/content/offices";
import { primaryNav, footerNav } from "@/content/nav";
import type { NavItem } from "@/content/types";
import { SITE_URL } from "@/lib/utils";
import { safeJsonLd } from "@/lib/json-ld";

function Script({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }} />;
}

/** Organization + WebSite, rendered once from the root layout. */
export function OrganizationJsonLd() {
  const headOffice = offices.find((o) => o.slug === "bangalore");
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: site.name,
        legalName: site.legalName,
        url: SITE_URL,
        logo: `${SITE_URL}/brand/in2it-ebs-mark-512.png`,
        description: site.description,
        sameAs: [social.linkedin, social.x, social.youtube, social.instagram],
        telephone: headOffice?.phone,
        address: offices.filter((o) => o.address).map((o) => ({
          "@type": "PostalAddress",
          streetAddress: o.address,
          addressLocality: o.city,
          addressCountry: o.country,
        })),
        contactPoint: { "@type": "ContactPoint", email: site.primaryEmail, contactType: "customer support" },
      },
      { "@type": "WebSite", "@id": `${SITE_URL}/#website`, name: site.name, url: SITE_URL, publisher: { "@id": `${SITE_URL}/#organization` } },
    ],
  };
  return <Script data={data} />;
}

const labels = new Map<string, string>();
function collect(items: NavItem[]) { for (const item of items) { labels.set(item.href.replace(/#.*$/, ""), item.label); if (item.children) collect(item.children); } }
collect(primaryNav);
collect([...footerNav.company, ...footerNav.practices, ...footerNav.legal]);

function labelFor(path: string) {
  const known = labels.get(path);
  if (known) return known;
  const last = path.split("/").filter(Boolean).pop() ?? "";
  return last.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/** BreadcrumbList for an inner page; `name` overrides the label of the final crumb. */
export function BreadcrumbJsonLd({ path, name }: { path: string; name?: string }) {
  const segments = path.split("/").filter(Boolean);
  const items = [{ name: "Home", item: `${SITE_URL}/` }];
  let current = "";
  for (const [index, segment] of segments.entries()) {
    current += `/${segment}`;
    const crumbPath = `${current}/`;
    items.push({ name: index === segments.length - 1 && name ? name : labelFor(crumbPath), item: `${SITE_URL}${crumbPath}` });
  }
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, position) => ({ "@type": "ListItem", position: position + 1, name: item.name, item: item.item })),
  };
  return <Script data={data} />;
}

/** Article schema for an insight. */
export function ArticleJsonLd({ slug, title, date, excerpt, author }: { slug: string; title: string; date: string; excerpt: string; author?: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: excerpt,
    ...(date ? { datePublished: date } : {}),
    author: author ? { "@type": "Person", name: author } : { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: `${SITE_URL}/insights/${slug}/`,
  };
  return <Script data={data} />;
}
```

- [ ] **Step 4: Create the raster logo referenced above**

Run from `web/` (PyMuPDF is installed):
```bash
python - <<'EOF'
import fitz
doc = fitz.open("public/brand/in2it-ebs-navy.svg")
page = doc[0]
rect = page.rect
# The mark is the first path, positioned at translate(1009,1020) inside viewBox 950 950 4200 1000 -> roughly the left 1000 units.
clip = fitz.Rect(rect.x0, rect.y0, rect.x0 + rect.height, rect.y1)
pix = page.get_pixmap(matrix=fitz.Matrix(512 / rect.height, 512 / rect.height), clip=clip, alpha=True)
pix.save("public/brand/in2it-ebs-mark-512.png")
print(pix.width, pix.height)
EOF
```
Expected: `512 512`. Open the PNG and confirm it shows only the square mark; if wordmark letters are visible, reduce `clip.x1` until they are not.

- [ ] **Step 5: Add the breadcrumb line to every inner page**

For each of the 39 `web/app/**/page.tsx` files whose `pageMetadata("<path>", …)` path is not `/`: add `import {BreadcrumbJsonLd} from "@/components/seo/json-ld";` and render `<BreadcrumbJsonLd path="<the same path>" />` as the first child inside the page component's returned fragment. For the three `[slug]` pages pass the resolved path and a name: `<BreadcrumbJsonLd path={\`/insights/${article.slug}/\`} name={article.title} />`, `<BreadcrumbJsonLd path={\`/case-studies/${study.slug}/\`} name={study.client} />`, `<BreadcrumbJsonLd path={\`/industries/${ind.slug}/\`} name={ind.name} />` (check the variable names in each file). Do this with a script rather than by hand, then review the diff:
```bash
node - <<'EOF'
const fs=require('fs'),path=require('path');
function walk(d){return fs.readdirSync(d).flatMap(e=>{const f=path.join(d,e);return fs.statSync(f).isDirectory()?walk(f):e==='page.tsx'?[f]:[];});}
for(const file of walk('app')){
  let s=fs.readFileSync(file,'utf8');
  const m=s.match(/pageMetadata\((["'`])([^"'`]+)\1/); if(!m||m[2]==='/'||m[2]==='/404/'||s.includes('<BreadcrumbJsonLd')||file.includes('[slug]')) continue;
  s=s.replace(/^(import \{pageMetadata\} from "@\/lib\/metadata";\n)/m,`$1import {BreadcrumbJsonLd} from "@/components/seo/json-ld";\n`);
  s=s.replace(/return \(\s*<>\s*\n/,`return (\n    <>\n      <BreadcrumbJsonLd path="${m[2]}" />\n`).replace(/return <>/,`return <><BreadcrumbJsonLd path="${m[2]}" />`);
  if(!s.includes('<BreadcrumbJsonLd')) console.log('MANUAL:',file); else fs.writeFileSync(file,s);
}
EOF
```
Fix any `MANUAL:` files by hand, and edit the three `[slug]` pages by hand.

- [ ] **Step 6: Add Article schema**

In `web/app/insights/[slug]/page.tsx`, import `ArticleJsonLd` and render inside the fragment after the breadcrumb:
```tsx
<ArticleJsonLd slug={article.slug} title={article.title} date={article.date} excerpt={article.excerpt} author={insightBodies[article.slug].author} />
```

- [ ] **Step 7: Verify**

```bash
npm run check
SITE_ENV=preview npm run build
curl -s http://127.0.0.1:3107/sap-enterprise-solutions/concur/ | grep -o '"@type":"BreadcrumbList"' | wc -l
```
Expected: check passes, build passes, `1`. Validate one page's JSON-LD by pasting it into https://validator.schema.org/ and note the result in the task report.

- [ ] **Step 8: Commit**

```bash
git add web/lib/json-ld.ts web/components/seo/json-ld.tsx web/public/brand/in2it-ebs-mark-512.png web/app web/tests/metadata.test.ts
git commit -m "seo: escape JSON-LD, add organization address, breadcrumbs and article schema

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

### Task 3.6: Favicon and apple icon from the brand mark (M6)

**Files:**
- Create: `web/app/icon.svg`
- Create: `web/app/apple-icon.png`

- [ ] **Step 1: Extract the mark path**

```bash
node -e "const s=require('fs').readFileSync('public/brand/in2it-ebs-navy.svg','utf8');const m=s.match(/<path d=\"([^\"]+)\"[^>]*transform=\"translate\(1009,1020\)\"/);if(!m)throw new Error('mark path not found');require('fs').writeFileSync('app/icon.svg','<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 882 882\"><rect width=\"882\" height=\"882\" fill=\"#F5F8FC\"/><path fill=\"#15213D\" d=\"'+m[1]+'\"/></svg>');console.log('icon.svg',require('fs').statSync('app/icon.svg').size,'bytes')"
```
If the regex does not match because the `transform` attribute precedes `d`, adjust the pattern to `/<path[^>]*transform="translate\(1009,1020\)"[^>]*d="([^"]+)"/`.

- [ ] **Step 2: Render the apple icon**

```bash
python - <<'EOF'
import fitz
doc=fitz.open("app/icon.svg"); page=doc[0]
pix=page.get_pixmap(matrix=fitz.Matrix(180/page.rect.width,180/page.rect.height),alpha=False)
pix.save("app/apple-icon.png"); print(pix.width,pix.height)
EOF
```
Expected: `180 180`. Open both files and confirm the square mark is centred and legible at 32 px.

- [ ] **Step 3: Verify the build serves them**

```bash
SITE_ENV=preview npm run build
curl -s -o /dev/null -w "%{http_code} %{content_type}\n" http://127.0.0.1:3107/icon.svg
curl -s http://127.0.0.1:3107/ | grep -oE '<link rel="(icon|apple-touch-icon)"[^>]*>'
```
Expected: `200 image/svg+xml` and both link tags present.

- [ ] **Step 4: Commit**

```bash
git add web/app/icon.svg web/app/apple-icon.png
git commit -m "brand: add favicon and apple touch icon from the logo mark

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

**Phase 3 gate:** `SITE_ENV=preview npm run check:full` passes.

---

## Phase 4: UI defects and content single-sourcing

### Task 4.1: Tailwind opacity modifiers that emit no CSS (M1)

**Files:**
- Modify: `web/components/layout/footer.tsx:41,78`
- Modify: `web/app/page.tsx:322`
- Test: `web/tests/foundations.test.ts`

- [ ] **Step 1: Write the failing test**

Append to `web/tests/foundations.test.ts`:
```ts
test('colour opacity modifiers use values Tailwind can generate',()=>{
  const roots=['app','components'];
  const offenders:string[]=[];
  const walk=(dir:string)=>{for(const entry of readdirSync(dir)){const full=path.join(dir,entry);if(statSync(full).isDirectory())walk(full);else if(/\.tsx?$/.test(entry)){const source=readFileSync(full,'utf8');for(const m of source.matchAll(/\b(?:text|bg|border|via|from|to|ring|fill|stroke|divide|outline|decoration|placeholder)-[a-z][a-z-]*\/(\d{1,3})(?![\d\]])/g)){if(/^text-(?:xs|sm|base|lg|\dxl)\//.test(m[0])) continue; /* line-height shorthand, not opacity */ if(Number(m[1])%5!==0)offenders.push(`${path.relative(process.cwd(),full)}: ${m[0]}`);}}}};
  for(const root of roots) walk(path.join(process.cwd(),root));
  assert.deepEqual(offenders,[]);
});
```
(`readdirSync` and `statSync` need adding to the existing `node:fs` import line.)

- [ ] **Step 2: Run it to see it fail**

```bash
npm test
```
Expected: FAIL listing `footer.tsx: text-on-brand/58`, `footer.tsx: text-on-brand/52`, `app/page.tsx: via-brand/12`.

- [ ] **Step 3: Fix the three classes**

`web/components/layout/footer.tsx`: `text-on-brand/58` → `text-on-brand/[0.58]`; `text-on-brand/52` → `text-on-brand/[0.52]`.
`web/app/page.tsx`: `via-brand/12` → `via-brand/[0.12]`.

- [ ] **Step 4: Verify the CSS is generated**

```bash
npm test
SITE_ENV=preview npm run build
grep -c -F 'on-brand\/\[0\.58\]' .next/static/css/*.css
```
Expected: tests pass; at least one CSS file contains the rule.

- [ ] **Step 5: Commit**

```bash
git add web/components/layout/footer.tsx web/app/page.tsx web/tests/foundations.test.ts
git commit -m "fix(styles): use bracket opacity values so Tailwind emits the rules

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

### Task 4.2: Remove orphaned class hooks (M3)

**Files:**
- Modify: `web/components/motion/reveal.tsx:6`
- Modify: `web/components/sections/cta-section.tsx:21`
- Modify: `web/app/page.tsx:150,269`
- Test: `web/tests/foundations.test.ts`

- [ ] **Step 1: Write the failing test**

Append to `web/tests/foundations.test.ts`:
```ts
test('class names used in markup are either Tailwind utilities or defined in globals.css',()=>{
  const css=readFileSync(path.join(process.cwd(),'app/globals.css'),'utf8');
  for(const hook of ['content-reveal','cta-light','flow-line','metric-grid']){
    const defined=new RegExp(`\\.${hook}\\b`).test(css);
    const used=['components/motion/reveal.tsx','components/sections/cta-section.tsx','app/page.tsx'].some(f=>readFileSync(path.join(process.cwd(),f),'utf8').includes(hook));
    assert.ok(defined||!used,`${hook} is used but never defined`);
  }
});
```

- [ ] **Step 2: Run it to see it fail, then remove the hooks**

`reveal.tsx`: `cn("content-reveal", className)` → `className` (keep `cn` only if still used elsewhere in the file; otherwise drop the import).
`cta-section.tsx`: remove `cta-light ` from the section className.
`app/page.tsx`: remove `metric-grid ` from the `<dl>` className and `flow-line ` from the decorative div className.

- [ ] **Step 3: Verify and commit**

```bash
npm run check
git add web/components/motion/reveal.tsx web/components/sections/cta-section.tsx web/app/page.tsx web/tests/foundations.test.ts
git commit -m "chore(styles): drop class hooks that have no definition

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

### Task 4.3: Hero carousel: load only the visible slides and keep a stable h1 (M4, L2)

**Files:**
- Modify: `web/components/sections/service-hero.tsx:38-62`
- Modify: `web/tests/browser/transcript.spec.ts`, `web/tests/browser/site.spec.ts`, `web/tests/browser/interactions.spec.ts` (heading level assertions)

**Interfaces:**
- Produces: the page's single `<h1>` is a visually hidden, fixed statement; slide headings are `<h2>`; only the active and next slide images are mounted.

- [ ] **Step 1: Update the browser tests first**

In `web/tests/browser/transcript.spec.ts` replace every `page.getByRole('heading',{level:1})` with `page.getByRole('heading',{level:2}).first()` (three occurrences) and add, after the first `goto('/')`:
```ts
  await expect(page.getByRole('heading',{level:1})).toHaveText('In2IT EBS: enterprise transformation, delivered globally');
```
In `web/tests/browser/site.spec.ts` (no-JavaScript test) replace `page.getByRole('heading',{level:1})` with `page.getByRole('heading',{level:2}).first()`.
In `web/tests/browser/interactions.spec.ts` replace both `getByRole('heading',{level:1})` occurrences with `getByRole('heading',{level:2}).first()`.
Add to `web/tests/browser/transcript.spec.ts`:
```ts
test('the hero mounts only the visible and next slide images',async({page})=>{
  await page.goto('/');
  await expect(page.locator('section[aria-roledescription="carousel"] img')).toHaveCount(2);
});
```

- [ ] **Step 2: Run the transcript spec to see the new assertions fail**

```bash
npx playwright test tests/browser/transcript.spec.ts --reporter=list
```
Expected: FAIL (h1 text differs; 4 images mounted).

- [ ] **Step 3: Change the component**

In `web/components/sections/service-hero.tsx`:
- Replace the `<h1 className="mt-4 …">{slide.heading}</h1>` line with:
```tsx
            <h2 className="mt-4 max-w-[18ch] text-[clamp(2.25rem,3.8vw,3.75rem)] font-semibold leading-[1.06] tracking-[-0.04em]">{slide.heading}</h2>
```
- Insert as the first child of `<Container className="relative">`:
```tsx
      <h1 className="sr-only">In2IT EBS: enterprise transformation, delivered globally</h1>
```
- Replace the image map:
```tsx
          {slides.map((item,index)=><Image key={item.image} src={item.image} alt="" fill priority={index===0} sizes="(min-width:1024px) 45vw, 100vw" className={`object-cover transition-opacity duration-700 motion-reduce:transition-none ${active===index?'opacity-100':'opacity-0'}`} />)}
```
with:
```tsx
          {slides.map((item,index)=>{
            const mounted=index===active || index===(active+1)%slides.length;
            return mounted ? <Image key={item.image} src={item.image} alt="" fill priority={index===0} sizes="(min-width:1024px) 45vw, 100vw" className={`object-cover transition-opacity duration-700 motion-reduce:transition-none ${active===index?'opacity-100':'opacity-0'}`} /> : null;
          })}
```

- [ ] **Step 4: Verify**

```bash
npm run check
SITE_ENV=preview npm run build
npx playwright test tests/browser/transcript.spec.ts tests/browser/site.spec.ts tests/browser/interactions.spec.ts --reporter=list
```
Expected: all pass, including axe on the homepage (a visually hidden h1 is valid).

- [ ] **Step 5: Commit**

```bash
git add web/components/sections/service-hero.tsx web/tests/browser
git commit -m "fix(hero): stable page h1 and lazy slide images

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

### Task 4.4: Region control visible from 1280 px (M11)

**Files:**
- Modify: `web/components/layout/header.tsx:88`
- Modify: `web/tests/browser/site.spec.ts` (navigation loop)

- [ ] **Step 1: Add the assertion**

In `web/tests/browser/site.spec.ts`, inside the `if(width>=1280)` branch of the navigation test, add as the first line:
```ts
      await expect(page.locator('header').getByRole('combobox',{name:'Preferred contact region'})).toBeVisible();
```

- [ ] **Step 2: Run at 1280 to see it fail, then fix**

```bash
npx playwright test tests/browser/site.spec.ts -g "1280px" --reporter=list
```
Expected: FAIL (combobox hidden). Then in `header.tsx` change `<div className="hidden 2xl:block"><RegionSwitcher /></div>` to `<div className="hidden xl:block"><RegionSwitcher /></div>`.

- [ ] **Step 3: Verify no overflow at 1280 and commit**

```bash
SITE_ENV=preview npm run build
npx playwright test tests/browser/site.spec.ts -g "navigation" --reporter=list
git add web/components/layout/header.tsx web/tests/browser/site.spec.ts
git commit -m "fix(header): show the region control at desktop widths

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

### Task 4.5: Quick-contact button steps aside for the footer (M12)

**Files:**
- Modify: `web/components/layout/quick-contact.tsx`
- Modify: `web/tests/browser/interactions.spec.ts`

- [ ] **Step 1: Write the failing test**

Append to `web/tests/browser/interactions.spec.ts`:
```ts
test('the quick-contact button hides while the footer is in view',async({page})=>{
  await page.goto('/about/');
  const button=page.getByRole('button',{name:'Contact',exact:true});
  await expect(button).toBeVisible();
  await page.locator('footer').scrollIntoViewIfNeeded();
  await expect(button).toBeHidden();
  await page.evaluate(()=>scrollTo(0,0));
  await expect(button).toBeVisible();
});
```

- [ ] **Step 2: Implement**

In `web/components/layout/quick-contact.tsx` add state and an observer after the existing `useEffect` hooks:
```tsx
  const [nearFooter,setNearFooter]=useState(false);
  useEffect(()=>{const footer=document.querySelector('footer');if(!footer)return;const observer=new IntersectionObserver(([entry])=>setNearFooter(entry.isIntersecting));observer.observe(footer);return ()=>observer.disconnect();},[]);
```
Change the root element to `<div ref={root} hidden={nearFooter && !open} className="fixed bottom-5 right-5 z-30" …>`.

- [ ] **Step 3: Verify and commit**

```bash
npm run check
SITE_ENV=preview npm run build
npx playwright test tests/browser/interactions.spec.ts --reporter=list
git add web/components/layout/quick-contact.tsx web/tests/browser/interactions.spec.ts
git commit -m "fix(contact): hide the floating contact button over the footer

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

### Task 4.6: Footer labels at a readable size (L4)

**Files:**
- Modify: `web/components/layout/footer.tsx:17,56`

- [ ] **Step 1: Edit**

Line 17: `text-[0.68rem]` → `text-xs`. Line 56: `text-[0.65rem]` → `text-xs`.

- [ ] **Step 2: Verify and commit**

```bash
npm run check
git add web/components/layout/footer.tsx
git commit -m "a11y(footer): raise label sizes to 12px

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

### Task 4.7: Contact data from one source (M7, structural part)

**Files:**
- Modify: `web/app/contact/page.tsx:20-26`
- Modify: `web/components/layout/footer.tsx:81`
- Modify: `web/components/forms/demo-form.tsx:53`
- Modify: `web/content/site.ts:3` (comment)
- Test: `web/tests/foundations.test.ts`

**Interfaces:**
- Produces: `export const regionalContacts: {region: string; email: string}[]` in `web/content/offices.ts` (unique emails, Global first); `export const officeCities: string[]`.

- [ ] **Step 1: Write the failing test**

Append to `web/tests/foundations.test.ts`:
```ts
import {offices, regionalContacts, officeCities} from '../content/offices';
import {regions} from '../content/site';
test('regional contacts and office cities are derived from the office list',()=>{
  assert.equal(regionalContacts[0].region,'Global');
  assert.equal(new Set(regionalContacts.map(c=>c.email)).size,regionalContacts.length);
  for(const c of regionalContacts) assert.ok(offices.some(o=>o.email===c.email),c.email);
  assert.deepEqual(officeCities,offices.map(o=>o.city));
  for(const region of regions) assert.ok(offices.some(o=>o.email===region.email),`${region.code} email is not an office email`);
});
```

- [ ] **Step 2: Run it to see it fail, then add the exports**

Append to `web/content/offices.ts`:
```ts
/** One entry per distinct mailbox; the shared info@in2itebs.com is labelled Global. */
export const regionalContacts = Array.from(
  new Map(offices.filter((o) => o.email).map((o) => [o.email as string, o])).values(),
).map((o) => ({ region: o.email === "info@in2itebs.com" ? "Global" : o.name, email: o.email as string }));

/** Cities in office order, for the footer line. */
export const officeCities = offices.map((o) => o.city);
```

- [ ] **Step 3: Use them**

`web/app/contact/page.tsx`: delete the `regionalEmails` array, import `regionalContacts` from `@/content/offices`, and replace `regionalEmails.map` with `regionalContacts.map`.
`web/components/layout/footer.tsx`: import `officeCities` from `@/content/offices` and replace the literal `Bengaluru · Singapore · Dubai · Nairobi · Johannesburg · Austin` with `{officeCities.join(" · ")}`.
`web/components/forms/demo-form.tsx`: import `regions` from `@/content/site` and replace the four literal `<option>` elements in the region select with `{regions.map(r=><option key={r.code} value={r.code}>{r.name}</option>)}`.
`web/content/site.ts` line 3: replace the comment with `/** Headline figures — Deck 2 (Corporate Capability, May 2026) via the Features Plan; SOT-02 of the first deck says 350+ employees. Owner to confirm one source (audit M7). */`.

- [ ] **Step 4: Verify and commit**

```bash
npm run check
SITE_ENV=preview npm run build
npx playwright test tests/browser/interactions.spec.ts -g "region" --reporter=list
git add web/content/offices.ts web/app/contact/page.tsx web/components/layout/footer.tsx web/components/forms/demo-form.tsx web/content/site.ts web/tests/foundations.test.ts
git commit -m "refactor(content): derive regional contacts, office cities and region options from data

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

**Phase 4 gate:** `SITE_ENV=preview npm run check:full` passes; homepage, contact, footer and header visually checked in the preview.

---

## Phase 5: Hygiene

### Task 5.1: Delete dead components and content (M2)

**Files:**
- Delete: `web/components/sections/converged-intelligence.tsx`, `hero-backdrop.tsx`, `hero-graphic.tsx`, `industries-showcase.tsx`, `leadership-scroller.tsx`, `practice-grid.tsx`, `signature-offerings.tsx`, `stories-carousel.tsx`, `web/components/interactive/converged-intelligence-interactive.tsx`, `web/content/certifications.ts`
- Test: `web/tests/foundations.test.ts`

- [ ] **Step 1: Write the failing test**

Append to `web/tests/foundations.test.ts`:
```ts
test('every component and content module is imported somewhere',()=>{
  const sources=new Map<string,string>();
  const walk=(dir:string)=>{for(const entry of readdirSync(dir)){const full=path.join(dir,entry);if(statSync(full).isDirectory())walk(full);else if(/\.(tsx?|mjs)$/.test(entry))sources.set(full,readFileSync(full,'utf8'));}};
  for(const root of ['app','components','content','lib','tests','scripts']) walk(path.join(process.cwd(),root));
  sources.set(path.join(process.cwd(),'next.config.mjs'),readFileSync(path.join(process.cwd(),'next.config.mjs'),'utf8'));
  const unused:string[]=[];
  for(const file of sources.keys()){
    if(!/[\\/](components|content)[\\/]/.test(file)||/types\.ts$/.test(file)) continue;
    const base=path.basename(file).replace(/\.(tsx?|mjs)$/,'');
    const imported=[...sources.entries()].some(([other,source])=>other!==file&&new RegExp(`[/'"]${base.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}(\\.mjs)?['"]`).test(source));
    if(!imported) unused.push(path.relative(process.cwd(),file));
  }
  assert.deepEqual(unused,[]);
});
```

- [ ] **Step 2: Run it to see it list the ten files, delete them, run again**

```bash
npm test
git rm web/components/sections/converged-intelligence.tsx web/components/sections/hero-backdrop.tsx web/components/sections/hero-graphic.tsx web/components/sections/industries-showcase.tsx web/components/sections/leadership-scroller.tsx web/components/sections/practice-grid.tsx web/components/sections/signature-offerings.tsx web/components/sections/stories-carousel.tsx web/components/interactive/converged-intelligence-interactive.tsx web/content/certifications.ts
npm run check
```
Expected: the test now passes; lint and typecheck pass (nothing imported them). If the test lists a file that is not in this task's delete list, confirm with `grep -rn "<basename>" app components lib` before deleting it; if it is imported through a pattern the regex misses, refine the regex rather than delete the file.

- [ ] **Step 3: Update the worklog line that is stale (L6)**

In `WORKLOG.md`, after the line containing `43 prerendered routes`, add: `- **2026-09-08 update:** the site now runs Next.js 15.5 with all pages prerendered again after remediation phase 2 (see docs/superpowers/plans/2026-09-08-website-remediation-phase-2.md).`

- [ ] **Step 4: Commit**

```bash
git add -A web/components web/content web/tests/foundations.test.ts WORKLOG.md
git commit -m "chore: remove unused components and content, note the framework upgrade

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

### Task 5.2: Prettier for one code style (M10)

**Files:**
- Create: `web/.prettierrc.json`, `web/.prettierignore`
- Modify: `web/package.json` (devDependency, scripts)

- [ ] **Step 1: Install and configure**

```bash
npm install --save-dev --save-exact prettier@3.6.2
```
Create `web/.prettierrc.json`:
```json
{ "printWidth": 120, "singleQuote": false, "semi": true, "trailingComma": "all", "arrowParens": "always" }
```
Create `web/.prettierignore`:
```
.next
node_modules
test-results
playwright-report
public
```
Add scripts: `"format": "prettier --write app components content lib tests scripts"` and `"format:check": "prettier --check app components content lib tests scripts"`, and change `"check"` to `"npm run format:check && npm run lint && npm run typecheck && npm test"`.

- [ ] **Step 2: Format once, then verify nothing behavioural changed**

```bash
npm run format
npm run check
SITE_ENV=preview npm run build
npx playwright test tests/browser/transcript.spec.ts --reporter=list
```
Expected: all pass.

- [ ] **Step 3: Commit (formatting only, separate from any logic change)**

```bash
git add -A web
git commit -m "style: format the codebase with Prettier and enforce it in check

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

### Task 5.3: Replace the 297 KB NALCO logo (performance note in the audit)

**Files:**
- Replace: `web/public/logos/clients/nalco.svg`
- Modify: `assets/logos/MANIFEST.md`

- [ ] **Step 1: Confirm the file embeds a bitmap**

```bash
grep -c "<image" public/logos/clients/nalco.svg
```
Expected: `4` (embedded rasters).

- [ ] **Step 2: Source a vector**

```bash
curl -s -A "in2it-site-audit/1.0 (appdev@in2itebs.com)" "https://commons.wikimedia.org/w/api.php?action=query&format=json&list=search&srnamespace=6&srlimit=10&srsearch=National%20Aluminium%20Company%20logo%20svg"
```
Pick a file in `Category:Logos of companies of India` whose licence is PD-textlogo or CC; fetch it with the Commons `imageinfo` URL as done for the partner marks in `assets/logos/MANIFEST.md`. If no vector exists, rasterise the current SVG to a 400 px-wide PNG with PyMuPDF (`fitz`) and point `content/clients.ts` at `nalco.png` instead.

- [ ] **Step 3: Verify size and appearance, record provenance**

```bash
ls -la public/logos/clients/nalco.*
npm test
```
Expected: the new file is under 40 KB; the unique-artwork test passes. Add a row to the "Additions" table in `assets/logos/MANIFEST.md` with source and licence.

- [ ] **Step 4: Commit**

```bash
git add web/public/logos/clients web/content/clients.ts assets/logos/MANIFEST.md
git commit -m "perf(assets): replace the bitmap-embedded NALCO logo

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

**Phase 5 gate and hand-off:** `SITE_ENV=preview npm run check:full` passes; `git log --oneline` shows one commit per task; push `remediation/2026-09-08` to the remote the owner nominates (H3 is only complete once a remote exists).

---

## Coverage check against the audit

| Finding | Task | Finding | Task |
|---|---|---|---|
| C1 origin check | 1.1 | M4 hero images and h1 | 4.3 |
| C2 build-time robots gate | 1.2, 2.3 | M5 metadata polish | 3.1, 3.2, 3.3, 3.4 |
| C3 lead receiver | owner input (not in plan) | M6 schema and icons | 3.5, 3.6 |
| H1 static rendering | 2.1 (with 1.4 as prerequisite) | M7 content single-source | 4.7 (figures: owner) |
| H2 rate limiter | 1.3 | M8 design docs | owner decision D2 |
| H3 version control | 0.1, 0.3 | M9 preview host | owner (Cloudflare quick tunnel running meanwhile) |
| H4 legacy redirects | 2.2 | M10 code style | 5.2 |
| H5 CSP and HSTS | 1.5 | M11 region control | 4.4 |
| M1 opacity classes | 4.1 | M12 quick-contact overlap | 4.5 |
| M2 dead code | 5.1 | L1 JSON-LD escape | 3.5 |
| M3 orphan classes | 4.2 | L2 robots rules | 2.3 |
| L3 og image slash | 3.1 | L4 footer text | 4.6 |
| L5 SITE_URL | 1.1, 2.4 | L6 stale docs | 4.7, 5.1 |
| L7 audit tool caveat | CI (0.3) surfaces Dependabot once on GitHub | L8 thank-you follow | 2.3 |
| L9 test harness | 0.2, 0.3 | perf: NALCO asset | 5.3 |
