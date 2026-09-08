# Website remediation runbook

7 September 2026. Scope is the website only, not In2CLM or production hosting.

## Local preview

Run commands from web/. Node dependencies are pinned in package-lock.json.

```powershell
npm ci
npm run check
npm run build
npm start
```

Open http://127.0.0.1:3107/. `npm run dev` uses the same dedicated port; never run dev and start on it together. `npm run build` fetches the existing Google font when not cached and therefore needs network access. Stop the website-owned server before replacing its .next build. Do not stop any process by image name, kill all Node processes, or touch port 3000.

`GET /api/health/` returns app `in2it-ebs-website` and release `2026-09-07-remediation`. It does not establish dependency/provider health. The default preview sends X-Robots-Tag noindex/nofollow/noarchive and robots disallow. **Noindex is not access control.** Private pre-release material requires an approved authenticated gateway before public sharing.

## Ngrok isolation

The existing tunnel `command_line` at estimator-remark-unproven.ngrok-free.dev belongs to In2CLM, upstream localhost:3000. A new agent API tunnel named `in2it-ebs-website` was attempted with upstream 127.0.0.1:3107. Ngrok assigned the same domain, so **the new tunnel was immediately deleted**, leaving command_line unchanged. Public GET afterward returned HTTP 200 and title In2CLM. A distinct reserved domain/account choice is required before retrying; do not enable pooling, reuse that URL, upgrade billing or restart the existing agent.

The installed agent accepted `schemes:["https"]`; it rejected legacy `bind_tls`. Start/stop documentation: https://ngrok.com/docs/gateway/agent/api. Any future tunnel must be checked for distinct public URL and correct health identity before it is handed off. Stop only the exact website-owned tunnel by name after verifying its upstream.

A subsequent explicit distinct-subdomain attempt failed with **ERR_NGROK_313**: the current Free plan does not permit custom subdomains. No tunnel was created by that attempt and billing was not changed. Required owner decision: use a separately configured account/domain, authorize the necessary plan change yourself, or approve another preview host. Do not treat the In2CLM URL as the website URL.

## Enquiry configuration and acceptance

Copy the variable names from web/.env.example into a private .env.local. Never commit credentials. Set LEAD_WEBHOOK_URL to an approved HTTPS adapter and LEAD_WEBHOOK_TOKEN locally. The adapter receives `{requestId, recipient, lead}` with a bearer token and Idempotency-Key. It must durably accept the request before returning 2xx. Wire region/interest to an approved routing policy and verify an actual inbox/CRM receipt before enabling production. The website cannot infer delivery from an arbitrary endpoint's 2xx response.

Without both values the preview form disables online submission, offers info@in2itebs.com, and the API returns 503. Required fields, enum values, JSON body limits, origin, honeypot, timeouts and basic process-local rate limiting are enforced. Logs contain event and request ID only, not the enquiry. Rate limiting is not distributed; multi-instance production needs an ingress/shared limiter. Enable TRUST_PROXY_HEADERS only when the ingress overwrites forwarded headers. Confirm origin handling through the final proxy before accepting live leads.

## Measurement, recruitment and production blockers

Local `in2it:measurement` CustomEvents carry only allowlisted names: contact_click, practice_click, lead_attempt, lead_accepted, lead_failed. They use no network, cookies or persistent storage. No analytics provider, dashboard, retention policy or alert destination is configured. Lead acceptance/failure is also logged server-side with a random request ID. Provider integration and consent approval remain open; do not describe these signals as deployed analytics.

Careers now links to the existing official LinkedIn company page and honestly says applications are not managed here. An approved ATS/recruitment contact and current vacancies remain outstanding. Business enquiries are not CV collection.

Production DNS/TLS/CDN was not changed. A read-only HTTPS request to in2itebs.com failed TLS from this environment; this does **not** prove the transcript's caching/redirect explanation. Hosting access, reproducible traces, legal/claim approvals and release authority remain required.

## Verification

`npm run check` runs lint, type checking and server/unit tests. `npm run test:browser` expects the running built website on 3107 and installed Chrome; it uses isolated test profiles. It covers keyboard navigation, seven widths, both themes, no-JavaScript rendering, token contrast and all sitemap routes. Screenshots and retained failing traces are generated under web/test-results/. `node docs/audits/check-local-site.mjs http://127.0.0.1:3107` runs from the repository root and reports routes, links, hashes and assets.

Record final results in WEBSITE_REMEDIATION_PLAN.md. Automated checks cannot certify WCAG AA or replace screen-reader, zoom, touch, full interaction-state and real-device review. Bundle reports are not Core Web Vitals field data. Check a real lead receipt and regional routing separately with owner-approved test data.

## Rollback and source retention

Before remediation, source was snapshotted at `.website-backups/website-before-remediation-20260907.zip`, excluding node_modules, .next and environment secrets. To review/restore, expand it into a **new sibling recovery directory**, compare changes and obtain approval before overwriting current work. Reinstall dependencies and rebuild the selected source; do not mix old .next output with new source.

No Git repository or remote has been created. .gitignore excludes dependencies, generated builds, local secrets, test output and backup/runtime folders. The local archive is not an off-machine backup. Select an approved remote/backup destination before production release. Preserve all corporate source, procurement and approval deliverables.
