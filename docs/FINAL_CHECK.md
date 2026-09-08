# Remediation final check — 7 September 2026

## Decision

**Local review build available, not approved for production release.** The website is isolated on http://127.0.0.1:3107/. The full audit/transcript ledger is WEBSITE_REMEDIATION_PLAN.md; deployment, rollback and configuration are in REMEDIATION_RUNBOOK.md.

## Implemented

Shared navigation, persistent Contact, mobile dialog focus/resize handling, semantic light/dark theme persistence and inverse contrast, visible-first content, controlled client/homepage motion, heading scale merging, logo hover treatment, comparison scrolling, form/context/filter feedback, restored Oracle/Microsoft practice discovery, homepage partner strip, honest recruitment fallback, five source-backed archive summaries, route canonicals, social preview image, staging noindex, patched dependencies, lead validation and truthful delivery states, local measurement hooks, health, tests and current documentation.

No corporate source/procurement files were removed. Existing approved named case studies remain outside the homepage. Current source claims were not silently reapproved for production.

## Evidence and limitations

- Final production build succeeds. Lint, typecheck and 8 unit/server tests pass. Dependency audit reports zero known vulnerabilities.
- A 63-page HTTP crawl found all pages returning 200, one H1 each, no broken links/fragments, and no missing assets among 48 checked. All 62 published route canonicals were verified; social PNG and preview noindex headers respond correctly.
- Full axe sweeps passed for every published route in light and dark, after repairing legal prose, logo plates and pale text. Declared semantic pairs pass contrast tests in both themes. Sweeps preceded the final narrow Tab-wrap/copy changes; focused final regression checks cover shared navigation, representative page/theme families and interactions afterward.
- Browser checks cover seven widths from 320 to 1440px, keyboard/focus/resize, theme reload/synchronisation, no-JavaScript rendering, filters, contextual enquiries, logo hover, pause/reduced motion and a keyboard-scrollable comparison. Desktop/mobile homepage screenshots were visually reviewed. This is not a WCAG certification, full screen-reader audit, Safari/touch or physical-device test.
- Local unthrottled LCP/CLS/TTFB samples and budgets are in PERFORMANCE_BUDGET.md. Production field data, INP and lower-powered mobile profiling remain outstanding.
- The browser suite's final command/result is recorded in the plan's verification log. Initial failures are retained there as history, not presented as the final state.

## Release blockers and owner decisions

1. Approved enquiry delivery adapter, credentials configured privately, real receipt and regional routing tests. The preview correctly disables online submission and offers email until configured.
2. Separate ngrok endpoint: current Free plan rejected a distinct custom subdomain with ERR_NGROK_313. In2CLM retains its original tunnel and port 3000. No billing changes made.
3. Approved recruitment inbox/ATS, analytics provider/consent/retention, reporting and alert destinations.
4. Current logo/claim approvals, content owner review of restored practices/archive summaries, and any remaining legal questions.
5. Production hosting/DNS/TLS/CDN access and explicit cutover approval. The reported old/new flash remains unverified; an HTTPS probe failed TLS in this environment, not proof of a caching cause.
6. Approved off-machine Git/backup destination. Local source snapshot exists but is not remote disaster recovery.
