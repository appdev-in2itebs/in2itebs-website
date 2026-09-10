# In2IT EBS — Project Worklog

## 10–11 September 2026 — Premium glass restyle

Restyled the presentation of the whole site on branch `restyle/2026-09-10-premium-glass` (24 commits, `a2ba46d`..`5f1b372`, on top of the 7 September remediation work) against `docs/superpowers/specs/2026-09-10-premium-glass-restyle-design.md`, delivered as a 15-task plan and executed task by task with a review after each.

Added premium glassmorphism throughout: frosted `.glass`/`.glass-elevated`/`.glass-card`/`.glass-pill`/`.glass-gold` panels; new gold foreground tokens (`gold`, `gold-display`, `gold-on-brand`, `gold-soft`) and `glass`/`glass-line` surface tokens in both themes; navy-to-gold gradient headings on every `main h1`/`main h2` (`.heading-plain` opts a heading out); softer control/surface/feature radii (0.75rem/1rem/1.5rem, up from 0.3rem/0.45rem/0.65rem) with fully rounded buttons and pills; a noir dark theme re-based on the reference prototype with champagne-gold accents; visible-first scroll reveals (`Reveal`/`Stagger`, `.reveal`, `MotionObserver`) replacing the earlier hidden-until-animated approach; a hover vocabulary (glass-card lift with gold glow, gold nav underline, primary-button shimmer, gold icon-tile ring); and a gated, idle-loaded WebGL hero sculpture (three.js) on the homepage that only mounts at ≥1024px with motion allowed, no data-saver, WebGL present and the page visible, and pauses on the page's own pause control, reduced motion, a hidden tab or scrolling offscreen. Every hub, practice and inner page was swept from the legacy navy/serif palette onto the new semantic glass and gold classes; `web/tests/foundations.test.ts` gained a regression test that now fails the unit suite if a legacy palette class (`text-navy`, `bg-white`, `font-serif`, the `blue-*`/`sand` aliases, `rounded-xl2`/`rounded-xl3`, `shadow-soft`/`shadow-lift`) reappears under `app/` or `components/`. A new `web/tests/browser/hero.spec.ts` covers the hero's gating and pause states, and `web/scripts/check-build.mjs` gained a postbuild check that the three.js sculpture ships in exactly one lazily loaded chunk, ≤700,000 bytes, never referenced as initial JavaScript.

What this restyle deliberately did not touch: page content and copy, imagery and photography, the information hierarchy and navigation structure, and everything under `web/content/` and `web/public/` (verified empty with `git diff --stat main -- web/content web/public`). Route structure, the enquiry pipeline, and the earlier remediation's accessibility, IA and truthful-content work all carry forward unchanged. Design intent and every token/utility/behaviour are recorded in root `DESIGN.md`; a short summary is in `docs/REMEDIATION_RUNBOOK.md`.

## 7 September 2026 — Audit remediation continuation

Resumed the owner's request to fix the 31-issue audit and transcript, following docs/WEBSITE_REMEDIATION_PLAN.md. Source snapshot retained at .website-backups/website-before-remediation-20260907.zip. Implemented navigation, themes, accessibility, content/IA, truthful enquiry handling, metadata, dependency and testing changes. Current stack is Next.js 15.5.24 / React 19.2.8; references to Next.js 14 below describe earlier sessions.

Local website port is 3107. Original In2CLM tunnel at estimator-remark-unproven.ngrok-free.dev remains on port 3000 and was verified to return title In2CLM. A separate tunnel unexpectedly received the same URL and was immediately removed without changing the original. No production DNS/hosting or business-deliverable changes were made. See the remediation runbook and ledger for evidence, final verification and owner-dependent release blockers.

A detailed, session-by-session log of everything worked on in this repository: the request (prompt) behind each session, its category, the features and deliverables produced, and the files touched.

> **Note on prompts:** verbatim prompt text is not preserved in session history. Each "Prompt / Request" below is reconstructed from the `.remember/` session logs and `CHANGELOG.md`, and reflects what was asked as accurately as the records allow.

**Project:** Full redesign and rebuild of the In2IT EBS corporate website (in2itebs.com), driven by the 45-slide Corporate Profile deck as the content source of truth, delivered as a Next.js 14 frontend.

---

## Category Index

| Category | Sessions | Summary |
|---|---|---|
| Research & Scraping | 2026-05-27 wk | Scraped 95 pages of the old site; technical audit; site wireframe |
| Content Extraction | 2026-06-01, 06-08, 06-11 | 45-slide deck → `CONTENT_SOURCE_OF_TRUTH.md`; legal review; open questions |
| Asset Sourcing | 2026-06-02, 06-08 | 94 client logos extracted; 55+ high-quality versions sourced and deck-verified |
| Documentation & Planning | 2026-06-01, 06-03, 06-08 | 23-file docs scaffold; 14-step agent workflow; content/design/features plans (MD + DOCX) |
| Information Architecture | 2026-06-03, 06-08, 06-09 | Content parity (45/45 SOT items), sitemap, nav model, redirects (308), 3-pillar restructure |
| Design System & Brand | 2026-06-03 | Typography (Newsreader / IBM Plex Sans), navy palette, tokens, 3 logo variants, data model |
| Frontend Build | 2026-06-03, 06-08, 06-09 | Next.js 14 site: 43 → 70 → 68 routes; 40 components; motion system |
| Competitive Analysis | 2026-06-04 | 18 SAP consulting firms researched; 7 UI improvements applied |
| Interactive Features | 2026-06-09 | RISE/GROW chooser, CI diagram, carousels, showcases, hero backdrop |

---

## Session Log

### 2026-05-28 — Old-site scrape expansion & technical audit

- **Prompt / Request:** Expand the scrape of in2itebs.com to full coverage and audit the existing site's technical state.
- **Category:** Research & Scraping
- **Work done:**
  - Expanded the site scrape from 75 to 95 pages, adding navigation, forms, product pages, and event pages.
  - Technical audit of the live site: WordPress 6.4.8 + Elementor; flagged gaps in CSP headers, structured-data schema, and WebP image delivery.
  - Consolidated all scraped content into `scraped/MASTER.md` (~5.1k lines).
  - Created a wireframe of the existing site structure.
- **Deliverables:** `scraped/` tree (95 pages: services, industries, partners, about, career, news, events, legal), `scraped/MASTER.md`, `scraped/tech-audit.md`, `scraped/sitemap.md`, `scraped/site-chrome.md`.

### 2026-06-01 — Step 1 & 2: Docs scaffold + deck content extraction

- **Prompt / Request:** Set up the project documentation structure, then extract the 45-slide Corporate Profile deck into a content source of truth — without writing copy, design, or code.
- **Category:** Documentation & Planning; Content Extraction
- **Work done:**
  - **Step 1 — Project setup:** created the `/docs` scaffold with 21+ markdown files on a common template (Purpose, Inputs, Owner Agent, Completion Criteria, Status, Pending, Open Questions). Documented the full 14-step agent workflow and the mandatory coding gate (no code until 8 foundational docs are reviewed) in `docs/AGENT_WORKFLOW.md` and `README.md`.
  - **Step 2 — Content extraction:** extracted all 45 deck slides page-by-page into `docs/CONTENT_SOURCE_OF_TRUTH.md` with IDs `SOT-01`…`SOT-45`, provenance, and suggested destination pages (via `pdftotext -layout`).
  - Populated `docs/LEGAL_REVIEW.md` with every deck-sourced sensitive item (named clients, partner-tier claims, certifications, proprietary accelerators, metrics, addresses, confidential markings) with slide refs; recorded owner authorisation to publish deck content (case-study detail stays NDA-gated).
  - Logged deck self-conflicts in `docs/OPEN_QUESTIONS.md` (350+ vs 550+ employees; 300+ consultants vs 350+ total; 10+ years).
  - Installed PyMuPDF, transcribed ~85 client logos from slides 42–43 into the SOT grouped by sector, and extracted 94 logo images to `assets/deck-clients/`.
- **Deliverables:** 23-file `docs/` scaffold, `CONTENT_SOURCE_OF_TRUTH.md`, `LEGAL_REVIEW.md`, `OPEN_QUESTIONS.md`, `AGENT_WORKFLOW.md`, `README.md`, `CHANGELOG.md`, `assets/deck-clients/` (94 files).
- **Governance:** no facts invented; conflicts flagged, not resolved; deck declared the single source of truth.

### 2026-06-02 — High-quality client logo sourcing & deck verification

- **Prompt / Request:** Source crisp, high-quality versions of the deck's client/partner/certification logos and verify each against the deck.
- **Category:** Asset Sourcing
- **Work done:**
  - Sourced official logos (SVG preferred) from Wikimedia Commons and Wikipedia infoboxes; multi-agent schema research approach failed, so pivoted to deterministic Wikipedia-infobox extraction.
  - Achieved **56 of 99** deck logos in high quality (49 clients, 6 partners, 1 certification); remaining 43 small private firms covered by the deck-render fallback.
  - Verified every sourced logo against the deck's client wall (slides 42–43) via side-by-side comparison montages; found 5 parent-brand stand-ins (Tata MD, Tata BlueScope, Welspun One, Wipro Infrastructure Engineering, Kirloskar Electric) and corrected them to the deck's own marks per the owner's source-of-truth rule.
  - Regenerated `assets/logos/MANIFEST.md`; updated `docs/BRAND_ASSETS.md` with inventory, coverage, and fallback rules.
- **Deliverables:** `assets/logos/{clients,partners,certs}/`, `assets/logos/MANIFEST.md`, updated `BRAND_ASSETS.md`. Tooling: PyMuPDF + Pillow.

### 2026-06-03 — Redesign Steps 3–9 + first frontend build (the big day)

- **Prompt / Request:** Work through the redesign workflow steps — content parity, UX insights, information architecture, copy, design system, data model, component spec — resolving open decisions with the owner, then start and complete the first frontend build.
- **Category:** Information Architecture; Design System & Brand; Frontend Build
- **Work done:**
  - **Step 3 — Content parity:** built `CONTENT_PARITY_CHECKLIST.md` mapping all 45 SOT IDs to new-site destinations (45/45 complete); triaged legacy URLs; flagged 2 decision-blocking conflicts (off-deck capabilities, NDA case studies).
  - **Owner decisions resolved (13 total):** deck is SOT; metrics fixed at 350+ employees / 300+ consultants / 10 delivery centres + 4 offices; drop CONFIDENTIAL/date markings; expand Salesforce/Workday content; native booking form (not third-party); region/language switcher; keep the ECC Prism brand; resolved Bangalore/Hyderabad address conflict.
  - **Step 4:** `OLD_WEBSITE_UX_INSIGHTS.md` — researched the old site's region switcher (3 EN region pages, no real translation).
  - **Step 5 — IA:** `INFORMATION_ARCHITECTURE.md` with sitemap, 11-page inventory, navigation model, and URL redirect map.
  - **Step 6 — Copy:** `COPY_GUIDELINES.md` + voice-reference `copy/home.md`, then full copy for 13 industry pages (cross-verified against deck logos), careers, insights, and legal pages.
  - **Steps 7–8 — Design system & data model:** `DESIGN_SYSTEM.md` (Newsreader + IBM Plex Sans typography, navy-dominant palette, tokens), `BRAND_ASSETS.md` (3 logo variants + usage rules), `DATA_MODEL.md` (TypeScript types: Region, Office, Practice, Delivery, Industry, Client, Partner, Certification, Insight, JobOpening, LeadForm). Locked decisions: 8px button radius, Lucide icons.
  - **Step 9 — Component spec:** `COMPONENT_SPEC.md` signed off along with all 8 gate docs. Analytics locked: GA4 reuse, fresh GTM, LinkedIn Insight Tag, opt-in consent.
  - **Frontend build:** built and deployed the Next.js 14 site — **43 prerendered routes** (SAP flagship with 6 clusters, 13 industries, insights, legal, contact), autogenerated content with 34 logos, brand components (motion reveals, double-bezel cards, logo marquee, Newsreader/IBM Plex). Fixed SVG viewBox issues and a `Stagger.Item` RSC manifest bug. Verified production build + dev server.
- **2026-09-08 update:** the site now runs Next.js 15.5 with all pages prerendered again after remediation phase 2 (see docs/superpowers/plans/2026-09-08-website-remediation-phase-2.md).
- **Deliverables:** 9 gate/spec docs, 20+ copy docs under `docs/copy/`, the `web/` Next.js app (43 routes).

### 2026-06-04 — Competitive UI/UX analysis + 7 improvements

- **Prompt / Request:** Research how leading SAP consulting firms present themselves online, identify where our build falls short, and apply the improvements.
- **Category:** Competitive Analysis
- **Work done:**
  - Analyzed **18 SAP consulting firms** (Accenture, Deloitte, Wipro, Cognizant, Syntax, Rizing, invenioLSI, delaware, NTT DATA, and others) via parallel research agents; synthesized into `docs/COMPETITOR_UI_RESEARCH.md`.
  - Identified 4 gaps: zero photography vs competitors, weak social proof, generic CTAs, unbranded proprietary IP (ECC Prism, iTAM, Health Check 360).
  - Applied **7 UI improvements**: SAP partner badges, leadership photos, brand motifs, animations, header fixes, and more. All 43 routes compiled clean.
  - Initiated the next phase: create content/design/features documentation from the PPTX as the new SoT.
- **Deliverables:** `docs/COMPETITOR_UI_RESEARCH.md`, 7 applied UI changes across `web/`.

### 2026-06-08 — Deck 2 three-pillar restructure + ~14 new pages

- **Prompt / Request:** Restructure the site around Deck 2's three-pillar model (Platform / Advisory / Digital-Data-AI), rewrite the business plans for non-coders, and build out the missing pages.
- **Category:** Documentation & Planning; Information Architecture; Frontend Build; Asset Sourcing
- **Work done:**
  - Rewrote the 3 business plans (Content / Design / Features) around the Deck 2 three-pillar structure, written for non-coders with additive changes marked; delivered as both Markdown and DOCX (`docs/plans/`).
  - Re-extracted the 45-slide deck (85+ clients) into `CONTENT_SOURCE_OF_TRUTH.md`; sourced/verified 55 HQ logos, replacing 4 variants with deck originals; updated `BRAND_ASSETS.md`, `MANIFEST.md`, `LEGAL_REVIEW.md`.
  - Extracted **119 assets** (logos, photos, graphics) from project sources for the redesign.
  - Restructured the IA to the 3-pillar model: rewrote `nav.ts` + `header.tsx` (nested mega-menu, 4-column dropdown); created `case-studies.ts` (11 case studies) and `partner-ecosystem.ts`; updated headline metric to 380+.
  - Launched a multi-agent workflow to build ~14 pages (pillar hubs, 12 SAP sub-pages, case-study index/detail, partners, Why In2IT, contact taxonomy). The first workflow silently dropped multi-file agent output; recovered by re-running with **single-file-per-agent** workflows (Blueprint + Concur) and filled the 11 missing pages (8 SAP sub-pages, case-studies index/detail, partners).
  - Build passed at **70 pages, zero errors**; dev server restarted.
- **Deliverables:** `docs/plans/In2IT-EBS-{Content,Design,Features}-Plan.{md,docx}`, `web/content/case-studies.ts`, `web/content/partner-ecosystem.ts`, rebuilt nav/header, ~14 new pages.
- **Lesson recorded:** multi-file workflow agents silently drop files — one file per agent, verify with `ls` (saved to memory).

### 2026-06-09 — 3-pillar IA completion + interactive components + Accely-style UI overhaul

- **Prompt / Request:** Complete the three-pillar information architecture, add interactive product-style components, integrate photography, and overhaul the UI polish (Accely-inspired).
- **Category:** Information Architecture; Interactive Features; Frontend Build
- **Work done:**
  - Completed the 3-pillar IA: **68 routes** with **308 redirects** from legacy URLs.
  - Built **6 interactive components**: RISE/GROW guided chooser, Converged Intelligence diagram, stories carousel, industries showcase, hero backdrop, SAP toolchain visual.
  - Sourced and integrated **17 stock images** (the photography gap from the competitive analysis).
  - Accely-inspired UI overhaul: pill buttons, animated nav underline, marquee hover behavior, hero backdrop treatment.
  - All **68/68 pages building green**.
- **Deliverables:** `rise-grow-chooser.tsx`, `converged-intelligence-interactive.tsx`, `stories-carousel.tsx`, `industries-showcase.tsx`, `hero-backdrop.tsx`, `sap-toolchain.tsx`, `redirects.mjs` (308 entries), integrated imagery.

### 2026-06-11 — Deck re-extraction consolidation

- **Prompt / Request:** Consolidate the deck extraction and verified logo set.
- **Category:** Content Extraction; Asset Sourcing
- **Work done:** Re-confirmed the 45-slide deck extraction (85+ clients) in `CONTENT_SOURCE_OF_TRUTH.md`; 23-file docs scaffold current; 55 logos sourced/verified with deck originals replacing web variants.

---

## Feature Inventory (current state of `web/`)

### Pages & Routing
- **38 `page.tsx` route files → 68 built routes** (dynamic case-study/industry/insight routes expand at build).
- Three-pillar IA: Platform (SAP flagship, 12 sub-pages incl. RISE, GROW, Concur, SuccessFactors, ECC Prism), Advisory, Digital-Data-AI.
- 13 industry pages, 11 case studies (index + detail), partner ecosystem, Why In2IT EBS, careers, insights, legal, contact with taxonomy.
- **308 legacy-URL redirects** (`web/content/redirects.mjs`).

### Components (40 total, `web/components/`)
- **Navigation & chrome:** `header.tsx` (nested mega-menu, 4-col dropdown, animated underline), `footer.tsx`, `region-switcher.tsx`.
- **Interactive:** `rise-grow-chooser.tsx` (guided SAP path chooser), `converged-intelligence-interactive.tsx`, `stories-carousel.tsx`, `industries-showcase.tsx`, `demo-form.tsx` (native booking form), `leadership-scroller.tsx`.
- **Brand & motion:** `reveal.tsx` (scroll reveals), `logo-marquee.tsx`, `hero-backdrop.tsx`, `hero-motif.tsx`, `hero-graphic.tsx`, `count-up.tsx`, `sap-partner-badge.tsx`.
- **Content blocks:** `pillar-cards.tsx`, `pillars.tsx`, `practice-grid.tsx`, `signature-offerings.tsx`, `sap-toolchain.tsx`, `client-wall.tsx`, `client-logo.tsx`, `alliance-strip.tsx`, `partner-ecosystem.tsx`, `case-study-card.tsx`, `case-study-grid.tsx`, `comparison-table.tsx`, `feature-grid.tsx`, `stat-band.tsx`, `three-reasons.tsx`, `cta-section.tsx`, `page-hero.tsx`.
- **Primitives & SEO:** `button.tsx` (pill, 8px radius), `card.tsx` (double-bezel), `container.tsx`, `typography.tsx`, `logo.tsx`, `json-ld.tsx` (structured data).

### Content Data Layer (`web/content/`)
Typed TS data files: `case-studies.ts` (11), `clients.ts`, `partners.ts`, `partner-ecosystem.ts`, `industries.ts`, `industry-bodies.ts`, `insights.ts`, `certifications.ts`, `delivery.ts`, `offices.ts`, `signature-offerings.ts`, `nav.ts`, `site.ts`, `types.ts`.

### Brand System (per `docs/DESIGN_SYSTEM.md` / `BRAND_ASSETS.md`)
- Typography: **Newsreader** (serif, titles — bold statement + italic accent) + **IBM Plex Sans** (everything else).
- Palette: Navy `#121E3B` dominant (60–70%), Accent Blue `#3F75A3` sparingly, Light/Pale Blue supports, Sand `#C1BC9C` hairlines.
- 3 approved logo variants (navy / light-blue / white) with contrast rules.
- Lucide icons; Framer Motion for reveals/marquees.

### Analytics & Compliance
- GA4 (reused property), fresh GTM container, LinkedIn Insight Tag, opt-in consent.
- Legal review register with NDA-gating on detailed case studies; all deck content owner-cleared to publish.

---

## Open / Carry-forward Items
- Wipro Infrastructure Engineering logo: deck vector to be cropped at build time (deck-fallback in place).
- 43 small private-firm client logos remain on deck-render fallback (no public high-res source).
- Detailed case-study content stays NDA-gated pending owner-supplied approved versions.

---

*Last updated: 2026-09-11. Sources: `.remember/` session logs, `CHANGELOG.md`, `docs/` inventory, `web/` file tree.*
