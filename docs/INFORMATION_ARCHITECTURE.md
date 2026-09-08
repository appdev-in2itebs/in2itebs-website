# Information Architecture

## Purpose
The structural blueprint for the In2IT EBS website: sitemap, full page inventory, navigation model, URL scheme + redirect map, and per-page content outlines. It translates the agreed content scope (Step 2), the parity matrix (Step 3), and the UX insights (Step 4) into a concrete map of pages so downstream copy (Step 6), data (Step 8), components (Step 9), and build (Step 10) have a single structural reference. It **references** `CONTENT_SOURCE_OF_TRUTH.md` (by SOT ID) rather than restating deck content.

## Inputs Required
- `CONTENT_SOURCE_OF_TRUTH.md` (Step 2) — **met.**
- `CONTENT_PARITY_CHECKLIST.md` (Step 3) — parity matrix + owner decisions 2026-06-03 — **met.**
- `OLD_WEBSITE_UX_INSIGHTS.md` (Step 4) — nav, discoverability, redirect priorities — **met.**
- `scraped/sitemap.md`, `scraped/wireframe.md`, `scraped/site-chrome.md` (secondary, UX/structure only) — **met.**

## Owner Agent
Information Architecture Agent

## Completion Criteria
- Complete sitemap with parent/child relationships — **met.**
- Page inventory: purpose, template type, source mapping (deck + old-site) — **met.**
- Global navigation model (primary, footer, utility, breadcrumbs, mobile) — **met.**
- URL scheme with naming/slug rules and a redirect map from old URLs — **met.**
- Per-page content outline (section-by-section) for every page, referencing the Source of Truth — **met.**
- Confirmation every deck point has a home (parity preserved) — **met (§6).**

## Current Status
Needs Review

---

## 1. Sitemap

```
in2itebs.com
│
├── /                                  Home
├── /services/                         Services hub (4 practices + delivery model)
│   ├── /sap-enterprise-solutions/     SAP practice  (SOT-07–27)
│   │   └── /ecc-prism/ *              ECC Prism™ (kept from old site; linked under SAP)
│   ├── /salesforce/                   Salesforce practice (SOT-28–30)
│   ├── /workday/                      Workday practice (SOT-31–33)
│   └── /application-development-managed-services/   ADMS practice (SOT-34–36)
├── /delivery-excellence/              Delivery model, methodology, AMS, factory (SOT-05,06,37–41)
├── /industries/                       Industries index (SOT-09)
│   └── /industries/<industry>/        Per-industry pages — old-site body + that industry's deck client logos (SOT-42/43; see copy/industry-client-map.md)
├── /why-in2it-ebs/                    Differentiators + alliances (SOT-04 alliances, SOT-27, SOT-44)
├── /about/                            Who we are, footprint, credentials, leadership (SOT-02,03)
│   ├── /insights/                     Insights / News (ADDITIVE — old /news/, /expert-advice/)
│   └── /careers/                      Careers (ADDITIVE — old career section)
├── /contact/                          Offices, entities, native demo form (SOT-45)
│   └── /thank-you/                    Form confirmation (functional)
└── /legal/
    ├── /privacy-notice/
    ├── /privacy-policy/
    └── /disclaimer/

* /ecc-prism/ keeps a top-level slug to preserve SEO equity but sits under SAP in nav/breadcrumbs.
```

**The 11 deck-driven content pages** (the parity anchor): Home · Services hub · SAP · Salesforce · Workday · ADMS · Delivery Excellence · Industries & Clients · Why In2IT EBS · About · Contact.
**Additive (no deck point, retained for UX):** Insights, Careers, Legal (×3), Thank-you, and the **body content of the Industry pages**. **Owner direction 2026-06-03:** where the deck is silent, populate from the **old website** (Careers from old career pages; Insights from old news; industry-page bodies from old industry pages; Legal ported + updated). This does **not** revive the retired off-deck *service practices* (Cloud/Security/Oracle/Microsoft/Data-AI/Blockchain/RPA/Digital, SimplifyTalent/Hiring — still 301'd per Step 3); it applies to genuinely additive content areas only.

**Region handling (Step-3 decision):** IN / KE / ZA / ME is a **region selector**, not separate page trees. It changes regional *emphasis* on Home + Contact (which office/entity/regional email is foregrounded), English throughout, **no translation, no deck content gated**. The old `/home-kenya/` and `/home-southafrica/` pages 301 to `/` (region remembered via the selector). Singapore & USA appear on Contact, not in the switcher.

## 2. Page inventory

| Page | URL | Template | Deck source | Old-site source (→ treatment) |
|---|---|---|---|---|
| Home | `/` | Home | SOT-01,02,04,05,27,44 | `/` → reword |
| Services hub | `/services/` | Hub | SOT-04,05,06 | mega-menu → simplify |
| SAP Enterprise Solutions | `/sap-enterprise-solutions/` | Practice (long, 6 clusters) | SOT-07–27 | `/sap-enterprise-solutions/` (+ rise, concur, sac, success-factors, ecc-prism) → reword/consolidate |
| ECC Prism™ | `/ecc-prism/` | Sub-practice | (closest SOT-21/11) | `/ecc-prism/` → **retain** |
| Salesforce | `/salesforce/` | Practice (expanded to SAP depth) | SOT-28–30 | none (old had no Salesforce page) |
| Workday | `/workday/` | Practice (expanded to SAP depth) | SOT-31–33 | none |
| ADMS | `/application-development-managed-services/` | Practice | SOT-34–36 | `/application-development-maintenance-services-adms/` → reword |
| Delivery Excellence | `/delivery-excellence/` | Methodology | SOT-05,06,37–41 | none (new framing) |
| Industries (index) | `/industries/` | Index | SOT-09 | industries landing → reword |
| Per-industry pages | `/industries/<industry>/` | Industry | SOT-42/43 (logos) | 14 old industry pages → **reword/retain** (body from old page; logos per `industry-client-map.md`) |
| Why In2IT EBS | `/why-in2it-ebs/` | Differentiator | SOT-04,27,44 | partner pages → alliances block |
| About | `/about/` | About | SOT-02,03,45 | `/who-we-are/`, `/our-leadership/`, `/accreditation-awards/` → merge |
| Insights | `/insights/` | Blog index + article | — (additive) | `/news/`, `/expert-advice/` → retain |
| Careers | `/careers/` | Careers | — (additive) | career section → retain |
| Contact | `/contact/` | Contact + form | SOT-45 | `/contact/` → reword (deck addresses, old-site contact details) |
| Thank-you | `/thank-you/` | Confirmation | — | `/thank-you/` → retain |
| Legal ×3 | `/legal/privacy-notice/` etc. | Legal | — | retain + update |

## 3. Navigation model

**Primary nav (desktop, ≤2 depth — per UX §1.1):**
- **Home**
- **Services ▾** → SAP Enterprise Solutions · Salesforce · Workday · ADMS · Delivery Excellence
- **Industries**
- **Why In2IT EBS**
- **About ▾** → Who We Are · Insights · Careers
- **Contact**
- **Primary CTA button:** "Book a discovery workshop" → `/contact/` (native form) — wording from SOT-44.
- **Utility (top-right):** Region switcher (IN / KE / ZA / ME) · Search.
- **Header badge:** "SAP Gold Partner" (SOT-02, deck-backed).

**Footer:**
- *Company:* About · Why In2IT EBS · Industries · Insights · Careers
- *Practices:* SAP · Salesforce · Workday · ADMS · Delivery Excellence
- *Legal:* Privacy Notice · Privacy Policy · Disclaimer
- *Contact:* office locations (deck), regional emails (old site: info@ / .co.za / .co.ke / .ae / .sg), socials (old-site URLs)
- *Newsletter* signup; *certifications strip* (CMMI · ISO 9001 · ISO 27001 · SAP Gold Partner · RISE · PCE — SOT-45)
- Copyright **2026**.

**Breadcrumbs:** on all inner pages (UX §1.2), with matching multi-item `BreadcrumbList` schema. **Mobile:** single hamburger → accordion nav; region switcher + CTA pinned. **Removed:** floating Buttonizer (UX §1.8).

## 4. URL scheme & redirect map

**Slug rules:** lowercase, hyphen-separated, **trailing slash** (matches old site, avoids redirects), no `-2/-3` duplicates, no dates in slugs, practice slugs preserved where they carry SEO equity.

**Redirect map (old → new; representative — full map finalised with Step 11):**

| Old URL(s) | New target | Code |
|---|---|---|
| `/sap-enterprise-solutions/` | `/sap-enterprise-solutions/` | 200 (reworked) |
| `/sap-rise-with-sap/` | `/sap-enterprise-solutions/#core-erp-s4hana` | 301 |
| `/sap-success-factors/`, `/sap-success-factors-in-*`, `/sap-successfactors-partner-in-*` (8 local) | `/sap-enterprise-solutions/#successfactors-hxm` | 301 |
| `/sap-concur/`, `/sap-concur-2/` | `/sap-enterprise-solutions/#concur` | 301 |
| `/sap-sac/` | `/sap-enterprise-solutions/#data-analytics` | 301 |
| `/sap-qualtrics/` | `/sap-enterprise-solutions/#successfactors-hxm` | 301 |
| `/ecc-prism/` | `/ecc-prism/` | 200 (retained) |
| `/application-development-maintenance-services-adms/` (+ `-2`) | `/application-development-managed-services/` | 301 |
| `/cloud-*`, `/cyber-security-*`, `/security-and-risk-advisory/`, `/cloud-and-infra-security/`, `/identity-and-access-management/`, `/oracle*`, `/microsoft*`, `/ms-office-365/`, `/microsoft-dynamics-365/`, `/data-analytics-ai/`, `/database-data-management/`, `/predictive-analysis/`, `/ai-machine-learning/`, `/big-data/`, `/blockchain/`, `/robotic-process-automation/`, `/digital-services/`, `/digital-transformation-services/`, `/other-enterprise-solutions/`, `/development-maintenance/`, `/application-maintenance-support/`, `/agile-devops/`, `/simplifytalent/`, `/simplifyhiring/` | nearest of `/services/`, `/sap-enterprise-solutions/`, `/application-development-managed-services/` | 301 |
| 14 industry pages (`/automobiles/`, `/fmcg-2/`, …) | `/industries/<industry>/` (per-industry; body retained, logos from deck) | 301 |
| 10 partner pages (`/sap/`, `/ibm/`, `/oracle-2/`, …) | `/why-in2it-ebs/#alliances` | 301 |
| `/who-we-are/`, `/accreditation-awards/` | `/about/` | 301 |
| `/our-leadership/`, `/out-leadership/`, individual bios | `/about/#leadership` | 301 |
| `/customer-stories/`, `/welspun/`, `/ibg-…/`, `/wework-…/`, `/sharechat-…/` | `/industries/#clients` | 301 (detail gated — NDA) |
| `/expert-advice/` | `/contact/` | 301 |
| `/in2it-{city}/` (7 city pages) | `/` (region selector) | 301 |
| `/home-kenya/`, `/home-southafrica/` | `/` (region remembered) | 301 |
| `/news/`, `/news/page/2/`, article URLs | `/insights/` (+ per-article slugs retained) | 301/200 |
| `/case/*` (8), `/event/*` (6), `/slide-anything-popup-preview/`, `/event-2024/` | — | **410** (Lorem/demo) |
| `-2/-3` alias duplicates (all) | canonical | 301 |
| `/privacy-notice/`, `/privacy-policy/`, `/disclaimer/` | `/legal/privacy-notice/` etc. | 301 |

## 5. Per-page content outlines (section-by-section; SOT references, not restated)

**5.1 Home `/`**
1. Hero — positioning from SOT-02 ("A decade of enterprise transformation…") + primary CTA (SOT-44).
2. Stat strip (condensed) — SOT-02 (350+/10+ years/150+/30+; authoritative figures).
3. Four practices teaser — SOT-04 → links to practice pages.
4. Signature offerings teaser — Packaged S/4 (SOT-24), AI Health Check (SOT-14), Converged Intelligence Stack vision (SOT-27).
5. Why In2IT EBS (3 reasons) teaser — SOT-44.
6. Clients band — deck logos (SOT-42/43) as images; "request case studies under NDA" prompt.
7. Credentials/alliances strip — SOT-02/04. 8. Insights teaser (additive). 9. Contact/CTA strip → form.

**5.2 Services hub `/services/`**
1. "Four practices. One delivery engine." — SOT-04. 2. 3-tier operating model — SOT-05. 3. Engagement models + footprints — SOT-06. 4. Four practice cards → practice pages. 5. Link to Delivery Excellence. 6. CTA.

**5.3 SAP Enterprise Solutions `/sap-enterprise-solutions/`** (long page; six clusters as anchored sections)
1. Hero — SOT-07. 2. Overview — SOT-08. 3. Solutions/Services/Industries lenses — SOT-09. 4. **Core ERP & S/4HANA** (`#core-erp-s4hana`) — SOT-10, SOT-24 (Packaged S/4). 5. **Advisory & Implementation** — SOT-11, SOT-12. 6. **Line-of-Business** (`#successfactors-hxm`, `#concur`, `#ariba`) — SOT-13, SOT-15, SOT-16, SOT-17. 7. **AI & Intelligence** — SOT-14 (Health Check), SOT-18 (Joule), SOT-19 (BTP AI). 8. **Data & Analytics** (`#data-analytics`) — SOT-21 (Syniti), SOT-22, SOT-23. 9. **Platform & Engineering** — SOT-20, SOT-25, SOT-26. 10. POV band — SOT-27. 11. ECC Prism link. 12. CTA. *(Cross-link to Industries.)*

**5.4 ECC Prism™ `/ecc-prism/`** — retained sub-page; ECC→S/4 assessment framing (closest SOT-21/11); links back to SAP Core ERP. (No invented claims.)

**5.5 Salesforce `/salesforce/`** (expanded to SAP-page depth, no fabrication)
1. Hero — SOT-28. 2. Capability overview + lifecycle — SOT-29. 3. Six clouds (anchored) — SOT-29. 4. How we engage (5 types) — SOT-30. 5. Integration patterns (MuleSoft, SAP/Workday connectors — SOT-30). 6. CTA. *(Depth via structure where deck detail is thin.)*

**5.6 Workday `/workday/`** (expanded to SAP-page depth)
1. Hero — SOT-31. 2. Practice overview — SOT-32. 3. Capability modules (HCM, Financials, Analytics, Planning, Adaptive) — SOT-32. 4. Services & delivery (5 types) — SOT-33 (⚠ verify garbled source during copy). 5. Integration patterns — SOT-32. 6. CTA.

**5.7 ADMS `/application-development-managed-services/`**
1. Hero — SOT-34. 2. Capability overview (build/integrate/run) — SOT-35. 3. Service groups (App Dev, Integration, Optimization, Post-impl support) — SOT-35. 4. Process & technology (lifecycle, stacks) — SOT-36. 5. CTA.

**5.8 Delivery Excellence `/delivery-excellence/`**
1. Hero — SOT-37. 2. FastForward methodology — SOT-38. 3. One Delivery Engine + 3-tier + engagement — SOT-05, SOT-06. 4. AMS transition (16 wks) — SOT-39. 5. Development factory + workflow — SOT-40, SOT-41. 6. CTA.

**5.9 Industries & Clients `/industries/`**
1. Intro — SOT-42 ("150+ global enterprises…"). 2. Industries (deck taxonomy, SOT-09) with sector anchors. 3. Client logo wall by sector (SOT-42/43; logo images from `assets/deck-clients/`). 4. "Detailed case studies on request, under NDA" gated prompt (SOT-43). 5. CTA.

**5.10 Why In2IT EBS `/why-in2it-ebs/`**
1. Hero — SOT-44 ("Three reasons…"). 2. Partnership Depth — SOT-44/02. 3. Delivery Economics — SOT-44 (350+ employees). 4. Accelerated Outcomes (FastForward) — SOT-44/38. 5. **Alliances** (`#alliances`) — SOT-04/02. 6. Converged Intelligence differentiator — SOT-27. 7. CTA (discovery workshop, SOT-44).

**5.11 About `/about/`**
1. Who we are — SOT-02. 2. At-a-glance stats + credentials — SOT-02. 3. Global footprint (10+ delivery centres + offices) — SOT-03. 4. **Leadership** (`#leadership`) — additive (old bios; no deck conflict). 5. Certifications — SOT-02/45. 6. Insights/Careers links. 7. CTA.

**5.12 Contact `/contact/`**
1. Hero — SOT-45. 2. **Native demo form** → info@in2itebs.com (Name · Work email · Company · Region · Interest area · Message). 3. India offices (deck addresses) + global entities (deck) — SOT-45; SG & USA shown here. 4. Regional emails/phones (old site). 5. Map/directions. → `/thank-you/`.

**5.13 Additive pages** — Insights (`/insights/` index + article), Careers (`/careers/`), Legal (×3): standard templates per `wireframe.md`; no deck dependency; must not contradict deck.

## 6. Parity preservation (every deck point has a home)
Confirmed against `CONTENT_PARITY_CHECKLIST.md` §1: **SOT-01–45 all map to a page/section in §5 above.** Spot-map of the clusters: SOT-01/02/04/05/27/44 → Home/Why/Services; SOT-03 → About/Delivery/Contact; SOT-06 → Services/Delivery; SOT-07–27 → SAP page (six clusters); SOT-28–30 → Salesforce; SOT-31–33 → Workday; SOT-34–36 → ADMS; SOT-37–41 → Delivery Excellence; SOT-42/43 → Industries & Clients; SOT-45 → Contact + footer. No deck point is orphaned.

---

## Step output (governance-mandated)
1. **What was completed:** Sitemap, 16-row page inventory, full nav model (primary/footer/utility/breadcrumbs/mobile), URL scheme + redirect map, per-page section outlines for all 11 deck pages + additive pages, and a parity-preservation confirmation.
2. **What needs review:** Owner/IA confirmation of (a) practice URL slugs (top-level vs nested), (b) the redirect targets for off-deck pages, (c) treating region as a selector (not page trees) with `/home-kenya//home-southafrica/` → `/`, and (d) consolidating the 14 industry pages into sector anchors on one `/industries/` page.
3. **Assumptions made:** Practice slugs preserve old SAP/ADMS equity; ECC Prism keeps a top-level slug under SAP; Insights/Careers retained as additive; region is a UI selector layer. All consistent with Steps 2–4 decisions; no deck facts introduced.
4. **Open questions for the human:** below.
5. **Allowed to proceed?** Yes. With Steps 2–5 complete, the **Coding Gate** still requires `COPY_GUIDELINES.md` (Step 6), `DESIGN_SYSTEM.md`/`BRAND_ASSETS.md` (Step 7), `DATA_MODEL.md` (Step 8), and `COMPONENT_SPEC.md` (Step 9) before any build. **Step 6 (Copy) or Step 7 (Design System) can proceed next** (Step 7 needs the brand logo source files — see Open Questions).

## Open Questions
- **Practice URL depth:** top-level slugs (`/sap-enterprise-solutions/`, as proposed, to preserve equity) vs nested under `/services/`? 
- **Industries page:** one consolidated `/industries/` page with sector anchors (proposed) vs keeping individual industry pages? Tied to the doorway-page concern (UX §1.6) and any per-industry SEO value (needs Search Console data — see `OPEN_QUESTIONS.md`).
- **Insights/Careers scope:** confirm both are in scope for v1, or defer Careers/Insights to a later phase?
- Carried from earlier: brand logo source files needed for Step 7; analytics/Search Console data to prioritise must-preserve URLs.
