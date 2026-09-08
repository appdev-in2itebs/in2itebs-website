# Phased website remediation plan

**Transcript correction, 7 September 2026:** the owner's subsequent feedback supersedes the single-hero decision below. See [TRANSCRIPT_IMPLEMENTATION.md](TRANSCRIPT_IMPLEMENTATION.md): service carousel, email/Talk-to-us utility bar, floating quick contact, visible six-practice selectors and expanded homepage/Partners ecosystem grid are the current implementation direction. Earlier verification counts refer to the earlier build until the transcript-specific rerun is recorded.
Date: 7 September 2026
Authority: user approved fixing the audit and transcript items and creating a **separate** website ngrok tunnel. **In2CLM on port 3000 and its existing tunnel must remain unchanged.**

## Scope and delivery rules

This plan covers all 31 audit findings and all eight transcript observations. The original audit is a baseline, not a completion checklist. Status will distinguish implemented, verified, externally blocked and deliberate design decisions.

Preserve the latest owner direction: prominent genuine logo, white/tinted-blue light theme, professional typography and spacing, optional accessible dark mode, meaningful icons and controlled animation, homepage client-logo ribbon, no homepage customer case-study narratives. Keep the existing Next/React/Tailwind architecture; patch/upgrade dependencies as needed. Preserve approved deck facts and all source documents. Do not invent articles, recruiting contacts, partnership tiers or performance results.

**Hero decision:** retain a single purposeful hero, make its motion controllable, and strengthen real service/partner discovery. An automatic multi-message carousel is not required merely because the old site had one. A floating contact button is optional once contact is persistently reachable at every breakpoint. No duplicate Partners/Careers pages.

**Important audit clarification:** In2CLM's tunnel is intentional. Finding 02 is resolved through website isolation and a second endpoint, not by stopping or repointing the existing tunnel.

## Phases, dependencies and acceptance gates

### Phase 0 — Baseline, safety and complete traceability
- Record source/build baseline and create a recoverable source snapshot (no business-deliverable cleanup).
- Capture project context and maintain this issue-to-phase ledger.
- Identify ngrok endpoint availability without touching In2CLM's process, domain or agent session.
- Identify required email/CRM, recruiting, analytics and production permissions.
- Gate: source snapshot exists; all audit/transcript IDs mapped; missing inputs explicit.

### Phase 1 — Runtime, conversion integrity and preview isolation
Depends on Phase 0.
- Upgrade Next and vulnerable dependencies to supported patched versions; configure lint, typecheck and repeatable tests.
- Replace false lead success with validated, bounded, rate-limited delivery to an explicitly configured approved transport. Return an honest unavailable state when transport is absent.
- Preserve message/context, handle failures/timeouts, avoid PII logs and expose minimal app/version health.
- Dedicated loopback website process on port 3107, separate ngrok endpoint, environment-specific noindex and security headers. Verify both app identities.
- Gate: dependency scan/build pass; invalid, unavailable and accepted delivery tests pass; no false-success claim; separate tunnel verified or exact account limitation reported. Real receipt remains blocked until credentials are configured and receipt is confirmed.

### Phase 2 — Shared UI and accessibility foundations
Depends on Phase 1 dependency baseline; implementation can proceed while external service input is pending.
- Fix custom Tailwind class merging and heading hierarchy.
- Replace fragile mega-menu positioning with bounded disclosure navigation, direct practice links, expanded-state semantics, Escape/outside close and predictable focus.
- Use a nonmodal mobile disclosure or fully managed drawer; no hidden background focus/resize scroll lock. Keep Contact visible at every breakpoint.
- Finish semantic/inverse theme pairs, persist server-readable theme preferences, standardize radii and spacing.
- Visible-first content without JS; reduced-motion renders final state; control continuous motion and expose full static logo list.
- Repair narrow comparison tables, filter announcements/reset, accessible functional region preference, focus and form feedback.
- Gate: keyboard/manual browser tests at 320/375/768/1024/1100/1280/1440px, mobile zoom/reflow, both themes and reduced motion; automated accessibility and colour-pair tests. No blanket WCAG certification without full manual coverage.

### Phase 3 — Information architecture, content and transcript parity
Depends on Phase 2 shared components.
- SAP, SuccessFactors, Workday, Salesforce, Oracle and Microsoft are named discovery paths. Build source-grounded Oracle/Microsoft practice pages, update hubs/About/form/redirects; omit unverified historical tier/metric claims.
- Reuse existing Partners page; add homepage approved technology/partner visibility with accurate relationship labels.
- Expose Careers clearly; replace coming-soon fiction with honest recruitment routing using approved contact/ATS when supplied.
- Remove unfinished Insights from published discovery/indexing until real source articles are ported/reviewed; preserve drafts, do not fabricate dates/bodies.
- Align three practice pillars plus shared delivery layer; fix fragment IDs; preserve offer and assessment context through contact.
- Gate: coverage/links verified, no public placeholders or false future-practice copy, actual partnership facts retain provenance, no customer case studies moved onto homepage.

### Phase 4 — SEO, measurement and operational feedback
Depends on final route inventory.
- Self-canonical route metadata, meaningful Open Graph data/image, utility-page noindex, content-derived sitemap dates.
- Define and implement consent-appropriate measurement hooks, separating accepted leads from button clicks; no personal data in events.
- Add health checks and sanitized delivery telemetry. Production reporting/alert destination awaits approved provider where necessary.
- Investigate live-domain flash only with reproducible network evidence; inspect DNS/TLS/redirect/cache behaviour read-only, no speculative production changes.
- Gate: all sitemap canonicals/URLs/metadata verified; preview not indexable; events tested with no PII; production access limitations documented.

### Phase 5 — Visual polish, performance and regression suite
Depends on Phases 2–4.
- Review every template family, responsive heading/line-length/spacing/icon/logo treatment and consistent surface variants.
- Tune homepage motion hierarchy and pause offscreen work; measure representative performance rather than claim improvement from code alone.
- Regression tests cover lead transport/validation, class merging, menu/focus, responsive table, themes, fragments, metadata and public content status.
- Gate: build/lint/typecheck/tests and route/asset checks pass; browser checks documented; remaining advisory/performance/assistive-tech limits listed.

### Phase 6 — Documentation, deployment and handoff
Depends on completed checks.
- Update README, design system, source/approval addenda, environment inventory, analytics spec, deployment/runbook/rollback and changelog.
- Keep historical approvals and source files; mark superseded decisions instead of deleting evidence.
- Prepare version-control ignores/baseline instructions; remote creation/push and production DNS/cutover require an approved destination.
- Verify new website URL and unchanged In2CLM URL, record startup/stop instructions for only website-owned processes.
- Gate: each ledger item has evidence or named outstanding dependency. Production release remains blocked by missing real lead delivery, approval, test or infrastructure requirements.

## Complete audit coverage ledger

| Audit | Work item | Phase | Completion evidence required | Current status |
|---|---|---|---|---|
| 01 | False enquiry success | 1 | Approved destination receipt; failure never claims success | Safeguard + transport tests verified; real receipt blocked by provider |
| 02 | Separate website tunnel; preserve In2CLM | 0,1,6 | Two distinct endpoints/upstreams and app IDs | Blocked: ERR_NGROK_313; local 3107 ready; In2CLM preserved |
| 03 | Vulnerable dependencies | 1,5 | Supported version, audit + build results | Verified: Next 15.5.24, React 19.2.8; npm audit 0 |
| 04 | Homepage canonical inheritance | 4 | Self-canonical for all sitemap routes | Verified: self-canonicals across 62 sitemap routes |
| 05 | Heading classes stripped by merge | 2,5 | Unit + computed-font-size tests | Verified merge unit + computed-size browser test |
| 06 | Offscreen mega-menu | 2,5 | Bounds at all breakpoints | Verified at 320–1440px; desktop bounds at 1280/1440 |
| 07 | Disclosure semantics/Escape | 2,5 | Keyboard and ARIA checks | Escape/expanded/focus verified; explicit disclosure controls |
| 08 | Mobile hidden focus/scroll lock | 2,5 | Tab sequence and resize/orientation tests | Verified Tab containment, Escape/focus return and resize cleanup |
| 09 | Theme contrast defects | 2,5 | Normal/inverse/interactive pair contrast and browser checks | Both-theme full-route axe + semantic pair checks pass; manual AA review remains |
| 10 | Clipped comparison table | 2,5 | Entire comparison accessible at 320/375px | Verified: keyboard horizontal scroll at 320px; no page overflow |
| 11 | Oracle/Microsoft active practices | 3 | Source-grounded pages and six named discovery paths | Implemented: Oracle/Microsoft pages + all six paths; current claims need sign-off |
| 12 | Placeholder Insights | 3,4 | Published inventory contains only complete reviewed articles | Five source-backed archive summaries; absent-body campaign redirected |
| 13 | Uncontrollable client motion | 2,5 | Accessible persistent pause; all logos available when reduced | Verified pause/reduced-motion rendering; duplicate marks hidden |
| 14 | Hidden SSR content | 2,5 | Visible meaningful content without hydration | Verified no-JS homepage/theme; crawl finds no opacity-zero content |
| 15 | Lead validation/abuse/logging | 1,5 | Schema/size/rate/error tests, no PII logs | Verified schema, body limit, origin, honeypot, rate and delivery failure tests |
| 16 | Contact CTA breakpoints | 2 | Visible persistent Contact at all widths | Verified persistent Contact across seven widths |
| 17 | Lost offer/assessment context | 1,3 | Context reaches reviewed form and delivery payload | Verified pathway/result/interest form context; real routing awaits provider |
| 18 | Cosmetic region preference | 2,3 | Shared preference changes form/contact context | Verified shared form/region persistence; destination policy awaits provider |
| 19 | Incomplete region listbox | 2,5 | Native select or complete listbox semantics | Implemented labelled native select |
| 20 | Form timeout/required/privacy/resize | 1,2 | Recovery tests and accessible labels/notices | Implemented recovery/required/privacy/resize; provider receipt end-to-end pending |
| 21 | Filter announcements/reset | 2,5 | Live count and empty-state reset | Verified live result count, selected state and reset |
| 22 | Theme persistence/initial response | 2,5 | Cookie-root render; no initial JS requirement | Verified cookie-rendered theme, reload and duplicate-control synchronization |
| 23 | Homepage partner discovery | 3 | Accurate approved marks + Partners link | Implemented homepage ecosystem strip + Partners navigation |
| 24 | Taxonomy and fragments | 2,3,5 | Consistent labels and no broken hashes | Verified crawl: no broken links or fragment targets |
| 25 | OG/noindex/sitemap metadata | 4,5 | Route metadata/image, staging and utility-page tests | Verified OG PNG, utility noindex and preview headers; no fake sitemap dates |
| 26 | Measurement/observability | 1,4 | No-PII event tests; provider and alerts configured | Local no-PII signals + health/logs implemented; provider/reporting/alerts pending |
| 27 | Recruitment journey | 3 | Honest state and approved recruitment destination | Honest LinkedIn fallback implemented; approved ATS/inbox pending |
| 28 | Lint/tests/versioning/release | 0,1,5,6 | Quality commands, rollback snapshot, release/runbook | Quality commands + snapshot + runbook implemented; remote/versioning decision pending |
| 29 | Design migration across routes | 2,5 | Template-family visual review | Shared radii/type/surfaces migrated; desktop/mobile homepage visually reviewed |
| 30 | Motion/performance budget | 2,5 | Controlled effects and recorded measurements | Controls + budget + local metrics recorded; physical-device/field profiling remains |
| 31 | Stale docs/approvals/wording | 0,6 | Current docs/addenda linked; history retained | Current README/design/runbook/legal/analytics/questions/worklog addenda completed |

## Transcript coverage ledger

| ID | Observation/reply | Resolution | Phase |
|---|---|---|---|
| T1 | Hero carousel/energy/+ contact | Deliberate single hero with controlled animation; persistent contact replaces need for floating + | 2,3,5 |
| T2 | Missing header CTA / developer says CTA exists | Keep visible at all widths; don't merely point at desktop implementation | 2 |
| T3 | Six practices / not provided in documents | Explicitly update phase scope; use existing sources with current-claim safeguards | 3 |
| T4 | Partners missing / proposal to create a page | Reuse existing page, improve homepage and nav visibility; no duplicate | 3 |
| T5 | Careers demotion / can add to header | Make discoverable and fix actual candidate destination, not only placement | 2,3 |
| T6 | Dropdown broken / will check | Repair and prove bounds, keyboard and focus behaviour | 2,5 |
| T7 | New/old production flash suspected caching | Verify separately; no production write or caching diagnosis without evidence | 4,6 |
| T8 | Serif/italic/navy praise | Treat as older build feedback; preserve latest owner-approved white/blue-tint direction | 0,2,5 |

## External inputs and non-negotiable release blockers

- Approved email/CRM delivery provider and locally configured credentials. No secrets in chat or committed files.
- Recruitment inbox/ATS and any approved current openings.
- Analytics/reporting destination and consent/retention decision before third-party tracking.
- A second ngrok domain/endpoint entitlement if the account's existing dev domain is already occupied. Do not repoint or pool with In2CLM, upgrade billing or modify its traffic policy.
- Production hosting/DNS/CDN access and release authority for any live-domain changes.
- Current partnership/credential approvals where historic material is unclear.
- Approved Git remote/backup location if off-machine source retention is desired.

## Execution log

- Plan created before implementation. Source audit remains available in WEBSITE_AUDIT_2026-09-07.md.

## Verification record — continuation

- Source backup exists; no business-deliverable cleanup or production cutover performed.
- `npm audit --json`: zero known vulnerabilities after upgrades.
- `npm run build` succeeded. `npm run check` passed lint, typecheck and 8 tests.
- Route crawl: 63 pages (62 sitemap + confirmation), all HTTP 200 and exactly one H1, zero broken links/hashes, 48 assets checked with none missing, one homepage canonical only, zero opacity-zero SSR content markers. Per-route canonicals also checked in browser.
- Full published-route axe sweeps pass in light and dark after fixing legal prose, industry logo plates and pale-blue figures. Semantic pair tests pass both themes. These are automated checks, not WCAG certification.
- The expanded browser run passed 33 of 34 tests and exposed end-of-drawer Tab escape; explicit focus wrapping was added and is awaiting the final regression run. Theme reload/duplicate controls, context/region, filters, mobile table, pause, direct confirmation and seven responsive widths passed.
- The accidental same-domain website tunnel was removed immediately; the original public endpoint was verified to serve In2CLM. Explicit distinct-subdomain request failed ERR_NGROK_313 on the Free plan. No billing change.
- Live in2itebs.com HTTPS request failed TLS from this environment. No evidence establishes the transcript's proposed cache/redirect cause; production access remains external.
- See REMEDIATION_RUNBOOK.md, root DESIGN.md and PERFORMANCE_BUDGET.md for current implementation contracts and limits.

### Final regression result

- Final application build succeeded; `npm run check` passed lint, typecheck and all 8 unit/server tests.
- `npm run test:browser -- --grep-invert 'all published'`: **34 passed, 0 failed** on the final built application (2.3 minutes), including the formerly failing mobile Tab containment, computed heading size, logo hover, all seven widths, themes, contexts, filters, comparison, no-JS and contrast tests.
- The two complete published-route sweeps had passed separately in both themes before the last Tab-wrap/copy-only changes. They were not relabelled as a new same-build run; final shared-component checks were rerun afterward.
- Six local unthrottled performance samples recorded LCP 472–1528ms and CLS 0–0.01094. See PERFORMANCE_BUDGET.md for exact scope; no production/INP claim is made.
- Website is running on 127.0.0.1:3107. Ngrok's only remaining tunnel is the original In2CLM command_line tunnel to localhost:3000. Production and external-provider items remain blocked as listed, not marked complete.
- Final review and release decisions are consolidated in FINAL_CHECK.md. Physical-device/assistive-technology review, real delivery receipt, approved analytics/recruitment integrations and production release are still outstanding.
