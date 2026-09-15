# Website remediation runbook

7 September 2026. Scope is the website only, not In2CLM or production hosting.

## Local preview

Run commands from web/. Node dependencies are pinned in package-lock.json.

```powershell
npm ci
$env:SITE_ENV = "preview"   # build-time: decides robots.txt and X-Robots-Tag; use "production" only for the approved release build
npm run check
npm run build               # runs scripts/check-build.mjs afterwards
npm start
```

`SITE_ENV` is read when `next build` runs, not when the server starts; a production build made without it is refused, and a preview build deployed to production stays de-indexed.

Open http://127.0.0.1:3107/. `npm run dev` uses the same dedicated port; never run dev and start on it together. `npm run build` fetches the existing Google font when not cached and therefore needs network access. Stop the website-owned server before replacing its .next build. Playwright reuses an existing server on 3107; stop or rebuild-and-restart that server before `npm run check:full`, otherwise the browser suite tests a stale build. Do not stop any process by image name, kill all Node processes, or touch port 3000.

`GET /api/health/` returns app `in2it-ebs-website`, release `2026-09-08-phase-2` and the `SITE_ENV` of the running process, which must equal the value the build was made with. It does not establish dependency/provider health. The default preview sends X-Robots-Tag noindex/nofollow/noarchive and robots disallow. **Noindex is not access control.** Private pre-release material requires an approved authenticated gateway before public sharing.

## Ngrok isolation

The existing tunnel `command_line` at estimator-remark-unproven.ngrok-free.dev belongs to In2CLM, upstream localhost:3000. A new agent API tunnel named `in2it-ebs-website` was attempted with upstream 127.0.0.1:3107. Ngrok assigned the same domain, so **the new tunnel was immediately deleted**, leaving command_line unchanged. Public GET afterward returned HTTP 200 and title In2CLM. A distinct reserved domain/account choice is required before retrying; do not enable pooling, reuse that URL, upgrade billing or restart the existing agent.

The installed agent accepted `schemes:["https"]`; it rejected legacy `bind_tls`. Start/stop documentation: https://ngrok.com/docs/gateway/agent/api. Any future tunnel must be checked for distinct public URL and correct health identity before it is handed off. Stop only the exact website-owned tunnel by name after verifying its upstream.

A subsequent explicit distinct-subdomain attempt failed with **ERR_NGROK_313**: the current Free plan does not permit custom subdomains. No tunnel was created by that attempt and billing was not changed. Required owner decision: use a separately configured account/domain, authorize the necessary plan change yourself, or approve another preview host. Do not treat the In2CLM URL as the website URL.

## Enquiry configuration and acceptance

Copy the variable names from web/.env.example into a private .env.local. Never commit credentials. Set LEAD_WEBHOOK_URL to an approved HTTPS adapter and LEAD_WEBHOOK_TOKEN locally. The adapter receives `{requestId, recipient, lead}` with a bearer token and Idempotency-Key. It must durably accept the request before returning 2xx. Wire region/interest to an approved routing policy and verify an actual inbox/CRM receipt before enabling production. The website cannot infer delivery from an arbitrary endpoint's 2xx response.

Without both values the preview form disables online submission, offers info@in2itebs.com, and the API returns 503. Required fields, enum values, JSON body limits, origin, honeypot, timeouts and basic process-local rate limiting are enforced. Logs contain event and request ID only, not the enquiry. Limits: 10 requests a minute per client address when `TRUST_PROXY_HEADERS=1`, 3 a minute per email address, and 120 a minute per process as a flood backstop. Limits are per process; use the edge rate-limit rules as the primary control in production. `TRUST_PROXY_HEADERS=1` takes the **leftmost** `X-Forwarded-For` value, so it is safe only behind an ingress that **overwrites** the header (Sucuri does). Ingresses that **append** the connecting IP to whatever the client sent (Cloudflare-style) are not eligible: a client can prepend any address and the per-address tier becomes spoofable, silently. Confirm origin handling through the final proxy before accepting live leads.

## Measurement, recruitment and production blockers

Local `in2it:measurement` CustomEvents carry only allowlisted names: contact_click, practice_click, lead_attempt, lead_accepted, lead_failed. They use no network, cookies or persistent storage. No analytics provider, dashboard, retention policy or alert destination is configured. Lead acceptance/failure is also logged server-side with a random request ID. Provider integration and consent approval remain open; do not describe these signals as deployed analytics.

Careers now links to the existing official LinkedIn company page and honestly says applications are not managed here. An approved ATS/recruitment contact and current vacancies remain outstanding. Business enquiries are not CV collection.

Production DNS/TLS/CDN was not changed. A read-only HTTPS request to in2itebs.com failed TLS from this environment; this does **not** prove the transcript's caching/redirect explanation. Hosting access, reproducible traces, legal/claim approvals and release authority remain required.

HSTS is sent with `includeSubDomains` but without `preload`; submitting the domain to the preload list is irreversible and needs owner approval. `includeSubDomains` is itself a deploy precondition: once a browser sees the header on in2itebs.com it forces **every** `*.in2itebs.com` host to HTTPS for two years, so confirm that every in2itebs.com subdomain serves valid TLS before the first production deploy. If that cannot be confirmed, drop `includeSubDomains` from the `Strict-Transport-Security` value in web/next.config.mjs until it can. The CSP allows inline scripts because Next.js emits inline hydration scripts on static pages; any future analytics tag must be added to `script-src` and `connect-src` explicitly.

## Verification

`npm run check` runs Prettier `format:check` first, then lint, type checking and server/unit tests. `npm run test:browser` needs installed Chrome; it starts a preview server on 3107 itself when none is listening and reuses one that is, so rebuild and restart a running server first or the suite tests a stale build. It uses isolated test profiles. It covers keyboard navigation, seven widths, both themes, no-JavaScript rendering, token contrast and all sitemap routes. Screenshots and retained failing traces are generated under web/test-results/. `node docs/audits/check-local-site.mjs http://127.0.0.1:3107` runs from the repository root and reports routes, links, hashes and assets.

Record final results in WEBSITE_REMEDIATION_PLAN.md. Automated checks cannot certify WCAG AA or replace screen-reader, zoom, touch, full interaction-state and real-device review. Bundle reports are not Core Web Vitals field data. Check a real lead receipt and regional routing separately with owner-approved test data.

## Premium restyle (2026-09-10)

Branch `restyle/2026-09-10-premium-glass` re-skinned the site as premium glassmorphism: frosted `.glass`/`.glass-elevated`/`.glass-card` panels, gold foreground tokens (`gold`, `gold-display`, `gold-on-brand`, `gold-soft`), navy-to-gold gradient headings on every `main h1`/`main h2`, softer 0.75rem/1rem/1.5rem radii, visible-first scroll reveals (`.reveal` plus `MotionObserver`), and a gated WebGL hero sculpture (three.js) on the homepage (replaced by ambient video on 2026-09-15, see below). See root `DESIGN.md` for the full token and behaviour description and `docs/superpowers/specs/2026-09-10-premium-glass-restyle-design.md` for the design spec. This was a presentation-only change: no content, imagery, route, or information-hierarchy change, and `web/content/` and `web/public/` were not touched (`git diff --stat main -- web/content web/public` prints nothing).

`web/tests/browser/hero.spec.ts` is new and covers the hero sculpture's gating and pause states: it activates (or reports `unavailable`/`no-webgl` in a GPU-less headless browser) at 1440x900, stays `unavailable`/`viewport` below 1024px wide, stays `unavailable`/`reduced-motion` under `prefers-reduced-motion: reduce`, and the page's pause control toggles it between `active` and `paused`. `web/scripts/check-build.mjs` gained a postbuild chunk-budget check: exactly one `.next/static/chunks/` file may contain the three.js sculpture code, it must not be referenced from `.next/app-build-manifest.json` (so it never loads as initial JavaScript), and it must be no larger than 700,000 bytes. `npm run build` prints that chunk's path and size.

Ambient video (2026-09-15): the sculpture, `components/hero/`, the three.js dependency and the chunk-budget check were removed. The brand hero and the homepage methods section now play muted, looping clips from `web/public/video/` (encoded with ffmpeg, no audio track, `+faststart`; posters extracted from the first second) through `components/media/ambient-video.tsx`. `hero.spec.ts` now covers the clip: it plays on desktop and serves the 720p source on phones, shows only the poster under `prefers-reduced-motion: reduce`, pauses and resumes with the page control, and the methods clip plays only while its section is on screen. `theme-contrast.spec.ts` gained composite pairs for text over the wash and tint against black and white frames; the wash alphas live in `globals.css` as `--video-*` tokens per theme.

`web/tests/foundations.test.ts` gained a regression test ("legacy palette classes are no longer used in markup") that fails the unit suite if `text-navy`, `bg-white`, `font-serif`, the `blue-*`/`sand` aliases, `rounded-xl2`/`rounded-xl3`, or `shadow-soft`/`shadow-lift` appear anywhere under `app/` or `components/`. Those classes remain defined in `web/tailwind.config.ts` as migration adapters only; future edits to this site must use the semantic glass/gold roles, not the retired aliases, or `npm run check` fails.

## Rollback and source retention

Before remediation, source was snapshotted at `.website-backups/website-before-remediation-20260907.zip`, excluding node_modules, .next and environment secrets. To review/restore, expand it into a **new sibling recovery directory**, compare changes and obtain approval before overwriting current work. Reinstall dependencies and rebuild the selected source; do not mix old .next output with new source.

A Git repository exists at the repository root on branch `remediation/2026-09-08`; no remote has been created yet. .gitignore excludes dependencies, generated builds, local secrets, test output and backup/runtime folders. The local archive is not an off-machine backup. Select an approved remote/backup destination before production release. Preserve all corporate source, procurement and approval deliverables.
