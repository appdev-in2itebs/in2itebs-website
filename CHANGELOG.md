# Changelog

All notable changes to the In2IT EBS website-build project are recorded here.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Dates use ISO 8601 (YYYY-MM-DD).

## [Unreleased]

### Independent client marks and AAI — 2026-09-08

- Split the Mrs Bectors/Cremica/English Oven composite into independent source-derived marks and added Airports Authority of India using official artwork, as requested by the owner.
- Current ribbon has 96 client/client-brand entries with distinct asset paths. Documented AAI's owner-provided provenance separately from deck-sourced records.

### Complete client ribbon — 2026-09-08

- Removed the 20-client homepage cap; linked assets for all 90 existing client records and added four omitted source-deck marks.
- Re-extracted missing source marks with transparency intact and preserved exact sub-brand logos. Added a full-list toggle and count-scaled animation timing.
- Added client-coverage browser regressions and docs/CLIENT_RIBBON_COVERAGE.md, including the unresolved expanded identity of the circular “we” mark.

### Transcript alignment — 2026-09-08

- Replaced the static homepage hero with four photo-led service slides, destination-specific CTAs, previous/next and play/pause controls, with reduced-motion and interaction safeguards.
- Added a persistent email/Talk to us utility bar and floating quick-contact disclosure; retained Partners and Careers in primary navigation.
- Made all six platform practices directly discoverable on Home, What We Do and About; expanded homepage and Partners-page ecosystem visibility using genuine available artwork and plain names where artwork is missing.
- Verified build, lint, types, eight unit/server tests, 39 focused browser tests and a 63-page internal-link crawl. See docs/TRANSCRIPT_IMPLEMENTATION.md for scope and remaining external inputs.

### Website remediation — 2026-09-07

- Created the seven-phase audit/transcript plan and a recoverable source snapshot.
- Upgraded to patched Next.js 15.5.24 / React 19.2.8 and refreshed dependencies; added lint, type, server and browser regression commands.
- Rebuilt bounded, keyboard-accessible navigation with persistent Contact, Partners and Careers; fixed mobile dialog focus and resize handling.
- Restored Oracle/Microsoft practices, six-platform discovery, homepage partner strip and valid delivery fragments. Replaced placeholder Insights with five attributed archive summaries without invented publication dates.
- Repaired semantic/inverse contrast, legal prose, client-logo plates, heading class merging, theme persistence, no-JavaScript visibility, comparison scrolling, filter feedback and controlled/offscreen motion.
- Replaced fake enquiry success with validated, rate-limited transport acceptance, recovery feedback and honest unconfigured preview. Added local-only measurement signals and app health.
- Corrected canonicals, social images and preview indexing controls. Added current design/runbook/legal/analytics addenda.
- Website runs on dedicated loopback port 3107. In2CLM's original port/tunnel remains intact; separate public preview awaits a distinct permitted ngrok endpoint. Production release and provider-dependent items remain open in the remediation ledger.

### Changed — 2026-06-02 — Deck-faithful logo corrections (source-of-truth rule)
- Compared all sourced logos side-by-side with the deck's client wall (slides 42–43); found 5 where the web logo differed from the deck's specific mark (parent/group brand instead of the exact sub-brand).
- Per the owner's rule (deck is the source of truth), corrected them to the deck's own logos: **Tata MD, Tata BlueScope, Welspun One, Kirloskar Electric** are now high-resolution crops taken from the deck; **Wipro Infrastructure Engineering** is a vector logo in the deck and will be cropped at build time (deck-fallback for now). No parent-brand stand-ins remain.
- Regenerated `assets/logos/MANIFEST.md` (55/99 in high quality; corrected logos marked *deck-sourced*).

### Added — 2026-06-02 — High-quality logo assets
- Sourced high-quality official logos for the deck's client, partner/alliance, and certification marks from Wikimedia Commons and company Wikipedia infoboxes (SVG preferred); each visually verified via rendered montages. Stored in `assets/logos/{clients,partners,certs}/`, with inventory + coverage in `assets/logos/MANIFEST.md`.
- Coverage: **56 of 99** deck logos in high quality (49 clients, 6 partners, 1 certification). The remaining 43 are small private firms with no reliable public high-res logo — covered by the deck-render fallback (`assets/deck-clients/`). Four parent-brand stand-ins flagged for owner review.
- Updated `docs/BRAND_ASSETS.md` with the logo inventory, coverage, stand-ins, and fallback.
- **Verified every sourced logo against the deck's client wall** (slides 42–43) via side-by-side comparison sheets: all confirmed to be the correct company; 5 are parent-brand stand-ins that differ from the deck's exact sub-brand lockup (Tata MD, Tata BlueScope, Welspun One, Wipro Infrastructure Engineering, Kirloskar Electric) — flagged for owner.
- Dev tooling installed: PyMuPDF + Pillow (PDF rendering, logo extraction, verification montages).

### Added — 2026-06-01 — Step 2: Content Extraction
- Extracted the corporate profile deck page-by-page into `docs/CONTENT_SOURCE_OF_TRUTH.md` (all 45 slides, IDs `SOT-01`…`SOT-45`, with provenance and suggested website page). Text extracted via `pdftotext -layout`.
- Populated `docs/LEGAL_REVIEW.md` with every deck-sourced sensitive item (named clients, partner-tier claims, certifications, proprietary accelerators, exact metrics, office addresses, confidential markings, superlative claims), each with slide refs and a status; recorded the owner authorisation to publish deck content (case-study detail stays NDA-gated).
- Updated `docs/OPEN_QUESTIONS.md` — marked the planning decisions as resolved and logged the Step-2 deck conflicts (350+ vs 550+ employees; 300+ consultants vs 350+ total; 10+ years) and gaps.

### Update — 2026-06-01 — Step 2 (client logos resolved)
- Installed a PDF renderer (PyMuPDF) and transcribed all ~85 client logos from slides 42–43 into `CONTENT_SOURCE_OF_TRUTH.md` (SOT-42 / SOT-43), grouped by sector (a few low-confidence names marked `[?]`).
- Extracted the client logo images to `assets/deck-clients/` (94 files) for display as on-site logo images (owner directive: use the logos, not text).
- Owner confirmed **nothing in the deck is legally sensitive** and all deck content is cleared to publish; `LEGAL_REVIEW.md` updated (client names now Approved-to-publish). Residual: resolve the metric conflicts (owner answering separately) and keep detailed case studies NDA-gated.

### Notes — Step 2
- No website copy was written, no design was produced, and no code was written. No facts or numbers were invented; deck self-conflicts were flagged, not resolved.

### Added — 2026-06-01 — Step 1: Project Setup (documentation scaffolding)
- Created the `/docs` documentation structure with 21 markdown files, each using the common template (Purpose, Inputs Required, Owner Agent, Completion Criteria, Current Status, Pending Items, Open Questions):
  - PROJECT_BRIEF.md, CONTENT_SOURCE_OF_TRUTH.md, CONTENT_PARITY_CHECKLIST.md, OLD_WEBSITE_UX_INSIGHTS.md, INFORMATION_ARCHITECTURE.md, COPY_GUIDELINES.md, DESIGN_SYSTEM.md, BRAND_ASSETS.md, COMPONENT_SPEC.md, DATA_MODEL.md, SEO_STRATEGY.md, ACCESSIBILITY_REQUIREMENTS.md, PERFORMANCE_REQUIREMENTS.md, LEGAL_REVIEW.md, QA_TEST_PLAN.md, DEPLOYMENT_RUNBOOK.md, ENVIRONMENT_VARIABLES.md, ANALYTICS_AND_CONVERSION.md, AGENT_WORKFLOW.md, OPEN_QUESTIONS.md, FINAL_REVIEW_REPORT.md.
- Documented the full 14-step agent workflow with owners and dependencies in `docs/AGENT_WORKFLOW.md`.
- Recorded the mandatory coding gate (coding must not begin until the eight foundational documents are created and reviewed) in `docs/AGENT_WORKFLOW.md` and `README.md`.
- Seeded `docs/LEGAL_REVIEW.md` with the register of item categories requiring human sign-off (all marked pending extraction).
- Seeded `docs/OPEN_QUESTIONS.md` with the Step-1 open questions awaiting the human owner.
- Added project `README.md` (sources of truth, governance rules, coding gate, documentation index, repository layout).
- Added this `CHANGELOG.md`.

### Notes
- No content was extracted from the corporate profile deck.
- No website copy was written, no design was produced, and no code was written.
- No facts, numbers, names, or claims were invented; unconfirmed information is marked "Pending extraction" or "Pending human input".
