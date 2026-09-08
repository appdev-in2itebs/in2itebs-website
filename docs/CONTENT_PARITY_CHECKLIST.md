# Content Parity Checklist

## Purpose
This document proves that no meaningful point from the corporate profile deck is dropped from the new website, and maps where each point appears on the new site. It also records how existing old-site content is treated (retained, reworded, or retired) without letting the old site override the deck. It is the evidence base used at final review to confirm parity.

## Inputs Required
- Completed Content Source of Truth (the deck point IDs and provenance) — dependency on Step 2. **Met** (`CONTENT_SOURCE_OF_TRUTH.md`, SOT-01…SOT-45).
- The finalised information architecture / sitemap for the new site (from Step 5). **Not yet built** — Step 5 is Not Started. This checklist maps to the *agreed 11-page page set* referenced throughout the Source of Truth's "Suggested website section" fields; exact section anchors are reconfirmed when IA (Step 5) and copy (Step 6) are finalised.
- The drafted website copy mapped to pages (from Step 6). **Not yet drafted** — locations below are planned destinations, not final copy placements.
- The old-site content inventory from the `scraped/` folder (SECONDARY, for the old-site coverage map only). **Met** (`scraped/sitemap.md`).

## Owner Agent
Content Parity Agent

## Completion Criteria
- Every deck point ID from the Content Source of Truth appears in the checklist with a covered yes/no determination — **met (45/45).**
- Every covered point cites its location on the new site (page and section) — **met (planned destinations).**
- Any deck point intentionally not surfaced has a documented, owner-approved reason — **met** (only SOT-01's "Confidential" marking + date; flagged for owner confirmation).
- The old-site coverage map classifies each old-site content item as retained, reworded, or retired, with rationale — **met.**
- No old-site decision contradicts, reduces, or omits a deck point — **met**, with two stop-and-ask conflicts surfaced (off-deck capability pages; published case studies vs the deck's NDA instruction).
- Reviewed and confirmed: zero uncovered deck points remain unexplained — **met for parity; pending human review.**

## Current Status
Needs Review

## The agreed 11-page set (parity anchor)
Per the "Suggested website section" fields in the Source of Truth, the deck content maps to eleven content pages. Final IA (Step 5) may rename, split, or nest these, but every deck point must retain a home:

1. **Home** · 2. **About** · 3. **Services** (hub) · 4. **SAP Enterprise Solutions** · 5. **Salesforce** · 6. **Workday** · 7. **ADMS** (Application Development & Managed Services) · 8. **Delivery Excellence** · 9. **Why In2IT EBS** · 10. **Industries & Clients** · 11. **Contact**.

The SAP page uses the six clusters defined in the Source of Truth: *Core ERP & S/4HANA · Advisory & Implementation · Line-of-Business · AI & Intelligence · Data & Analytics · Platform & Engineering.*

---

## 1. Deck Parity Table
`Deck Point ID | Covered? | Location on New Site (page → section) | Notes`

| Deck Point | Covered? | Location on New Site (page → section) | Notes |
|---|---|---|---|
| SOT-01 — Cover | Yes (partial, by design) | Home → brand framing | "Corporate Profile" framing surfaces on Home. **Intentionally NOT surfaced:** the "CONFIDENTIAL" marking and "May 2026" date — drop from all public pages. ⚠ Owner to confirm (OPEN_QUESTIONS). |
| SOT-02 — At a Glance | Yes | About → stat band + credentials; Home → condensed strip; Footer → certs | ✅ Authoritative (owner 2026-06-03): **350+ employees**, **10+ years**. Drop "550+"/"a decade". |
| SOT-03 — Global Footprint | Yes | About → footprint; Delivery Excellence → follow-the-sun; Contact → offices | ✅ Show **both** 10+ delivery centres + 4 offices; deck locations shown as offices. Contact details from old site. ⚠ Address text conflict (Bangalore/Hyderabad) still open. |
| SOT-04 — What We Do | Yes | Services hub; Home → teaser; Why In2IT EBS → alliances | Four practices + strategic cloud alliances. |
| SOT-05 — Operating Architecture (3 tiers) | Yes | Services hub → 3-tier model; Delivery Excellence → One Delivery Engine | — |
| SOT-06 — Engagement | Yes | Delivery Excellence → engagement models + footprints; Services hub → summary | Five models, three footprints, discovery-to-scale activities. |
| SOT-07 — SAP cover | Yes | SAP Enterprise Solutions → hero | ✅ Both authoritative (owner): 300+ SAP consultants within the 350+ company total. |
| SOT-08 — SAP Capability Overview | Yes | SAP → overview | Partnership depth, industry experience, skills, IP. |
| SOT-09 — SAP Solutions/Services/Industries | Yes | SAP → solutions/services clusters; industries cross-link to Industries & Clients | — |
| SOT-10 — SAP S/4HANA (3 paths) | Yes | SAP → Core ERP & S/4HANA cluster | RISE / GROW / PCE; metrics 30% faster, 25+ programs, 100% go-live. |
| SOT-11 — SAP Advisory Services | Yes | SAP → Advisory & Implementation cluster | Six advisory engagements. |
| SOT-12 — SAP Implementation & Roll-Out | Yes | SAP → Advisory & Implementation cluster | SAP Activate, greenfield/brownfield, rollout/localization. |
| SOT-13 — SAP SuccessFactors / HXM | Yes | SAP → Line-of-Business cluster (SuccessFactors) | Metrics 125+ projects, 87+ consultants; iTAM accelerator (flag IP in LEGAL_REVIEW). |
| SOT-14 — SAP AI-Powered Diagnostic (Health Check 360) | Yes | SAP → AI & Intelligence cluster; Home/Why → teaser | Signature offering; proprietary framework + benchmark dataset (flag IP/metrics). |
| SOT-15 — SAP Concur | Yes | SAP → Line-of-Business cluster (Concur) | Expense/Travel/Invoice; metrics 25+ impls, 12wk go-live. |
| SOT-16 — SAP Concur Integration | Yes | SAP → Line-of-Business cluster (Concur, sub-block) | ERP/finance, HR, travel/card integrations. |
| SOT-17 — SAP Ariba | Yes | SAP → Line-of-Business cluster (Ariba) | Source-to-Pay; metrics 15+ programs, 40% P2P cut. |
| SOT-18 — SAP Joule (GenAI Co-Pilot) | Yes | SAP → AI & Intelligence cluster (Joule) | 10+ rollouts; Joule + Claude/OpenAI interop. |
| SOT-19 — SAP AI on BTP | Yes | SAP → AI & Intelligence cluster (AI on BTP) | GenAI/ML/Document AI; EU AI Act governance. |
| SOT-20 — SAP Clean Core Extensibility | Yes | SAP → Platform & Engineering cluster | 8+ proprietary BTP extensions (flag IP). |
| SOT-21 — SAP Syniti Data Management | Yes | SAP → Data & Analytics cluster | Five-stage migration; metrics 20+ migrations, 99.5% integrity. |
| SOT-22 — SAP Analytics Cloud | Yes | SAP → Data & Analytics cluster | Seven benefits; first-dashboard in 3 weeks. |
| SOT-23 — SAP Analytics Offerings | Yes | SAP → Data & Analytics cluster (sub-block) | SAC / BPC / Digital Boardroom / Datasphere; Lumira retired. |
| SOT-24 — SAP Packaged Solution (GST-ready S/4) | Yes | SAP → Core ERP & S/4HANA cluster; Home/Why → teaser | 16-week packaged S/4; signature offer. |
| SOT-25 — SAP ABAP Factory (RICEFW) | Yes | SAP → Platform & Engineering cluster | — |
| SOT-26 — SAP Basis | Yes | SAP → Platform & Engineering cluster | Plan/Install/Run/Optimise. |
| SOT-27 — Converged Intelligence Stack (POV) | Yes | SAP → top framing band; Home → vision teaser; Why → differentiator | Composable/Intelligent/Continuous; convergence quote. |
| SOT-28 — Salesforce cover | Yes | Salesforce → hero | — |
| SOT-29 — Salesforce Capability Overview | Yes | Salesforce → capabilities | Lifecycle + six clouds. |
| SOT-30 — Salesforce How We Engage | Yes | Salesforce → engagement models | Five engagement types. |
| SOT-31 — Workday cover | Yes | Workday → hero | — |
| SOT-32 — Workday Practice Overview | Yes | Workday → practice/capabilities | HCM, analytics, financials, planning. |
| SOT-33 — Workday Services & Delivery | Yes | Workday → services | ⚠ Source text partly garbled in extraction — verify engagement-type details against the slide during copy (Step 6). |
| SOT-34 — ADMS cover | Yes | ADMS → hero | — |
| SOT-35 — ADMS Capability Overview | Yes | ADMS → capabilities | Build/integrate/run; framework support. |
| SOT-36 — ADMS Process & Technology | Yes | ADMS → process + technology | AIM/ITIL; bespoke/legacy/packaged. |
| SOT-37 — Delivery Excellence cover | Yes | Delivery Excellence → hero | — |
| SOT-38 — In2IT FastForward methodology | Yes | Delivery Excellence → methodology; SAP page + Why → reference | Four accelerating layers; outcome-linked pricing. |
| SOT-39 — AMS Transition (16 weeks) | Yes | Delivery Excellence → transition timeline | Five phases with deliverables. |
| SOT-40 — Development Factory | Yes | Delivery Excellence → factory model | Plan/Build/Run; factory principles. |
| SOT-41 — Factory Workflow | Yes | Delivery Excellence → factory workflow detail | Demand → Factory → Release. |
| SOT-42 — Clientele (1 of 2) | Yes | Industries & Clients | 6 sectors + named-client logo wall → render as logo images (`assets/deck-clients/`). [?] low-confidence names confirmed visually in design. Flag named clients in LEGAL_REVIEW. |
| SOT-43 — Clientele (2 of 2) | Yes | Industries & Clients | 6 more sectors + logos. **NDA note:** detailed case studies available on request, under NDA → render as gated "request under NDA" prompt; do NOT publish case-study detail. ⚠ See old-site conflict below. |
| SOT-44 — Why In2IT EBS (3 reasons) | Yes | Why In2IT EBS; Home → 3-reasons teaser | ✅ Use **350+** employees (not 550+). "up to 28%" approved per owner (flagged absolute, LEGAL_REVIEW). CTA → **native demo form** (30-min discovery workshop). |
| SOT-45 — Closing / Contact | Yes | Contact → offices + entities; Footer → certifications | 4 India offices + 5 global subsidiaries; certs in footer. Flag addresses/entities in LEGAL_REVIEW. |

**Parity result:** 45/45 deck points covered. The only content intentionally withheld is the SOT-01 "Confidential" marking and the deck date (standard for a public site) — pending owner confirmation. No deck point is omitted.

---

## 2. Old-Site Coverage Map
`Old-Site Item / URL | Treatment | Maps to Deck Point ID | Rationale`

Parity is measured against the deck, **not** the old site. The old site may add UX value but may never remove deck content. Old-site items below either (a) map to a deck point and are retained/reworded, (b) are additive content with no deck point (retained as supporting UX, placement deferred to IA), or (c) are retired.

### 2a. Maps to a deck point — Retain & reword to deck-aligned copy
| Old-Site Item / URL | Treatment | Maps to | Rationale |
|---|---|---|---|
| `/` homepage | Reword | SOT-01,02,04,27,44 | New Home built from deck framing; old hero/marketing reworded, not copied. |
| `/sap-enterprise-solutions/` | Reword | SOT-07–27 | Folds into the new SAP page's six clusters. |
| `/sap-rise-with-sap/` | Reword | SOT-10 | → SAP Core ERP & S/4HANA (RISE path). |
| `/sap-success-factors/` | Reword | SOT-13 | → SAP Line-of-Business (SuccessFactors/HXM). |
| `/sap-concur/` (+ `/sap-concur-2/`) | Reword + consolidate | SOT-15,16 | → SAP Line-of-Business (Concur). Retire `-2` duplicate (301). |
| `/sap-sac/` | Reword | SOT-22,23 | → SAP Data & Analytics. |
| `/sap-qualtrics/` | Reword | SOT-13 (Employee Experience / Qualtrics EX) | Qualtrics appears in deck only inside HXM; treat as sub-topic, not standalone, unless owner wants a partner page. |
| `/ecc-prism/` | **Retain (owner-confirmed 2026-06-03)** | SOT-21 / SOT-11 (closest) | ECC→S/4 assessment tooling. Owner directs keeping ECC Prism™; place under **SAP Enterprise Solutions** (Core ERP / migration). Only old-site service page carried over. |
| `/contact/`, `/thank-you/`, `/apply-now/` | Retain | SOT-45 | Contact page + functional form-confirmation pages. |
| Industries pages (`/automobiles/`, `/fmcg-2/`, `/manufacturing/`, `/textiles-2/`, `/professional-services-2/`, `/heavy-engineering-2/`, `/retail-ecommerce-2/`, `/energy-and-utilities/`, `/chemical-fertilizers-2/`, `/banking/`, `/government/`, `/healthcare-life-science-2/`, `/telecom/`, `/engineering-constructions-ecno-2/`) | **Retain as per-industry pages (owner 2026-06-03)** | SOT-42/43 (logos), SOT-09 | Each industry gets its own page under `/industries/<industry>/`: **body** from the old-site industry page (additive, deck-silent); **client logos** for that industry **only**, from the deck's sector grouping (`copy/industry-client-map.md`). No old-site "Our Customers" names added — logos are deck-sourced only. |
| Partner pages (`/sap/`, `/microsoft-2/`, `/oracle-2/`, `/open-text-2/`, `/ibm/`, `/newgen-2/`, `/hp-2/`, `/aws-2/`) | Retain (reframe) | SOT-02, SOT-04 (alliances) | Deck names strategic partners/cloud alliances. Old partner roster is broader than the deck — retain as alliances content; confirm which partners are current/approved (LEGAL_REVIEW). |
| `/who-we-are/`, `/accreditation-awards/` | Reword | SOT-02 (credentials), SOT-44 | → About. Cross-check awards/certs against deck (don't claim certs not in the deck). |

### 2b. Additive — no deck point (retain as supporting content; final placement = IA decision)
**Owner direction 2026-06-03:** for these deck-silent areas, **populate the new pages from the old website content** (Careers ← old career pages; Insights ← old `/news/`; Legal ← ported + updated; leadership ← old bios, names/titles to confirm). Drafts: `copy/careers.md` (done); Insights/Legal to follow. Still additive and deck-safe; no off-deck *service practices* revived.
| Old-Site Item / URL | Treatment | Maps to | Rationale |
|---|---|---|---|
| `/faq/` | Retain | — | UX value; no deck conflict. |
| `/expert-advice/`, `/news/` (+ `/news/page/2/`) | Retain | — | Insights/blog; additive, time-sensitive. No deck point but no conflict. |
| Leadership (`/our-leadership/`, `/dharmendra-sharma/`, `/anil-kumar-soleti/`, `/rajat-kapoor/`) | Retain | — | About/leadership; deck has no bios. Additive, no conflict. Verify names/titles (LEGAL_REVIEW). |
| Career (`/careers/`, `/our-culture/`, `/join-our-team/`, `/sap-and-success-factor-consultant/`) | Retain | — | Recruiting content; additive. |
| Events/webinars (`/global-webinar/`, `/grow-with-sap-leadership-forum-event/`, `/event-2024/`, `/unlock-the-power-of-hr-technology-transformation/` + register variants) | Retain (review currency) | — | Time-sensitive; retain active, archive expired. |
| City pages (`/in2it-india/`, `/in2it-singapore/`, `/in2it-dubai/`, `/in2it-melbourne/`, `/in2it-manila/`, `/in2it-malaysia/`, `/in2it-bangkok/`) | Retain (SEO) | SOT-03 (footprint) | Local-SEO landing pages; align to footprint. Final treatment = SEO strategy (Step 11) + IA. |
| SuccessFactors local-SEO pages (`/sap-successfactors-partner-in-*`, 8 cities) | Retain (SEO) | SOT-13, SOT-03 | Local-SEO; consolidate/align. SEO (Step 11) decision. |
| Legal (`/privacy-notice/`, `/privacy-policy/`, `/disclaimer/`) | Retain + update | — | Required; review/update content (LEGAL_REVIEW). Retire `/privacy-policy-2/` duplicate. |

### 2c. Off-deck capability pages — ✅ RESOLVED 2026-06-03 (follow the deck)
The old site markets capabilities **not present** in the deck's four practices (SAP, Salesforce, Workday, ADMS). **Owner decision: follow the deck — the deck is the source of truth.** These do **not** become site practices; instead, deck content is *expanded to be more presentable*. Dropped lines get **301 redirects** to the nearest of the 11 pages (redirect map = Step 5 IA). **One exception:** ECC Prism™ is kept (see §2a).

| Old-Site Item / URL | Treatment | Maps to | Rationale |
|---|---|---|---|
| Cloud: `/cloud-strategy/`, `/cloud-migration/`, `/cloud-hosting-services/` | **Retire + 301** | — | Not a deck practice. 301 → SAP/Delivery as nearest. |
| Security: `/cyber-security-services/`, `/security-and-risk-advisory/`, `/cloud-and-infra-security/`, `/identity-and-access-management/` | **Retire + 301** | — | Not a deck practice. |
| Microsoft: `/microsoft/`, `/ms-office-365/`, `/microsoft-dynamics-365/` | **Retire + 301** | SOT-04/02 (alliance only) | Microsoft is a named alliance in the deck, not a sold practice; reference as an alliance on Why/About, no service page. |
| Oracle: `/oracle/` | **Retire + 301** | — | Not in deck practices. |
| Data/AI: `/data-analytics-ai/`, `/database-data-management/`, `/predictive-analysis/`, `/ai-machine-learning/`, `/big-data/`, `/blockchain/`, `/robotic-process-automation/` | **Retire + 301** | SAP analytics/AI lives on SAP page (SOT-19/21/22) | Generic non-SAP Data/AI/Blockchain/RPA dropped; SAP-platform analytics/AI is covered within the SAP page. |
| Digital: `/digital-services/`, `/digital-transformation-services/`, `/other-enterprise-solutions/`, `/development-maintenance/`, `/application-maintenance-support/`, `/agile-devops/` | **Retire + 301; map AMS/dev to ADMS** | SOT-34–36 (ADMS) | Genuine app-dev/AMS substance is covered by the deck's ADMS practice; generic "digital transformation" page dropped. |
| Products: `/simplifytalent/`, `/simplifyhiring/` | **Retire + 301** | — | Productized recruiting/talent offers not in the deck. |

### 2d. Retire
| Old-Site Item / URL | Treatment | Rationale |
|---|---|---|
| `/case/*` (8 Lorem-ipsum theme pages) | Retire | WordPress theme demo content, not real In2IT EBS content. |
| `/event/*` (6 Lorem-ipsum theme pages) | Retire | Theme demo content. |
| `/slide-anything-popup-preview/` | Retire | WordPress plugin preview; not user-facing. |
| `-2` / `-3` alias duplicates (`/fmcg/`↔`/fmcg-2/`, `/oracle-3/`, etc.) | Retire + 301 | Duplicate slugs serving identical content; consolidate to canonical with redirects (redirect map = IA/SEO step). |
| `/out-leadership/` (typo alias of `/our-leadership/`) | Retire + 301 | Misspelled alias. |
| Published case studies: `/ibg-goes-live-with-sap-successfactors/`, `/wework-rise-with-sap-s4hana/`, `/sharechat-rise-with-sap-s4hana/`, `/welspun/`, `/customer-stories/` | **Retire detail + 301 — ✅ RESOLVED 2026-06-03 (follow the deck)** | Owner: follow the deck — case-study **detail stays NDA/on-request**. Carry forward **no** published case-study detail. Instead add a clients/"for their reference" section showing only deck content (logos, sectors) + a gated "request under NDA" prompt. (Testimonial *quotes* in `site-chrome.md` §10 are a separate item — confirm consent before reuse.) |

### 2e. Global chrome (nav, footer, forms) — ✅ decisions 2026-06-03
Old-site chrome captured in `scraped/site-chrome.md`. Deck has no chrome; these are old-site/UX items carried into the new build with owner direction.

| Item | Treatment | Notes |
|---|---|---|
| Region/language switcher (old: IN/KN/ZA) | **Keep — IN / KE / ZA / ME (region-content-only)** ✅ | Old impl: IN→`/`, KN→`/home-kenya/`, ZA→`/home-southafrica/` — region landing-page links, **no translation** (all `lang="en-US"`, no `hreflang`). New build (owner-confirmed): region selector, **English throughout, no translation**, re-emphasises regional landing/contact only and **gates no deck content** (every deck practice reachable from every region). **SG & USA on Contact page, not in switcher.** |
| Demo booking (old: appt.link external) | **Replace with native form → info@in2itebs.com** | Fields: Name · Work email · Company · Region · Interest area (SAP/Salesforce/Workday/ADMS) · Message. Retire the external appt.link CTA. (Old live form fields are WPForms/CF7-rendered, not in static HTML.) |
| Social URLs (footer) | **Use old-site URLs** | YouTube, X/Twitter (`/in2itebs_`), LinkedIn (`/company/in2itebs/`), Instagram (`/in2itebs/`). |
| Copyright year | **Update to 2026** | Old site shows "2022"; also fix the "Subsrcibe"/"Company" footer typos when rebuilt. |
| Contact details (emails/phones) | **Use old-site exact details** | info@in2itebs.com + regional .co.za/.co.ke/.ae/.sg; phones from old contact page/footer. Office *addresses* = **deck** (deck is source of truth; old-site/footer address variants not used). |
| Header CTA "Talk to Us" → `/expert-advice/` | Reframe | Point primary CTA at the native form / contact, not the old expert-advice page. |
| Old mega-menu (Cloud/Security/Oracle/Microsoft/Data-AI/Digital trees) | **Drop** | Nav reflects the deck's 11-page set + four practices; off-deck branches removed (§2c). |

### Salesforce & Workday depth — ✅ direction 2026-06-03
Owner: expand the **Salesforce** (SOT-28–30) and **Workday** (SOT-31–33) pages to be **as resourceful/detailed as the SAP page**. Deck content for these practices is thinner than SAP, so copy (Step 6) should *expand and present* the deck points richly **without inventing** capabilities, metrics, or clients not in the deck. Where deck detail is genuinely absent, structure (clouds/modules, engagement models, lifecycle) carries the depth rather than fabricated specifics.

---

## Step output (governance-mandated)

1. **What was completed:** All 45 deck points mapped to new-site destinations with a covered determination (45/45 covered). Old-site inventory (`scraped/sitemap.md`) classified as retain / reword / additive / hold / retire, each with rationale and deck-point mapping.
2. **What needs review:** Owner answered the major decisions 2026-06-03 (see §2c, §2d, §2e and the metric notes). Residual items for review: the office **address conflict** (deck vs old-site for Bangalore/Hyderabad), the **region-switcher scope**, the **native demo-form destination/fields**, and the **absolute/superlative claims** (legal comfort).
3. **Assumptions made:** The "agreed 11-page set" (and the SAP six-cluster structure) from the Source of Truth's suggested sections is treated as the parity anchor since IA (Step 5) is not yet built; section anchors will be reconfirmed at Steps 5–6.
4. **Open questions for the human:** carried below.
5. **Allowed to proceed?** Parity is established (no deck point omitted) and the governance conflicts are resolved (follow the deck; off-deck pages 301'd except ECC Prism; case-study detail stays NDA-gated). **Step 5 (IA) can proceed now** using this matrix; the residual open items (address text, switcher scope, demo-form spec) are not blockers for IA but should be closed before/with copy (Step 6).

## Decisions on record (owner, 2026-06-03)
- Off-deck capability pages → **follow the deck**; retire + 301 (ECC Prism kept). (§2c)
- Case-study detail → **NDA/on-request**; show only deck client content. (§2d)
- Metrics → **350+ employees · 300+ SAP consultants · 10+ years**.
- Locations → show **10+ delivery centres + 4 offices**; deck locations as offices; contact details from old site.
- Cover "Confidential"/date → **dropped**.
- Industries → **follow the deck** (deck's 9 SAP industries + sector groupings; old 14 pages map in).
- Partners → **follow the deck** (deck's named partners/alliances; broader old roster not displayed unless in deck).
- Chrome → keep region switcher (IN/KE/ZA/ME), native demo form, old-site socials, copyright **2026**. (§2e)
- Salesforce/Workday pages → **expand to SAP-page depth** (no fabrication).

## Open Questions (residual)
- **Absolute/superlative claims:** publish as written or substantiate/soften? (LEGAL_REVIEW Item 7.)
- If a deck point has no natural home in the proposed IA, who decides where it lands or whether it is held back?
- Should the checklist track a confidence/verification status per point for the final human review?

*Resolved 2026-06-03:* off-deck pages (follow deck, 301; ECC Prism kept); case studies (NDA-gated); metrics (350+/300+/10+); locations (deck offices + 10+ centres, contact details from old site); office addresses → deck; cover Confidential/date dropped; industries & partners → follow deck; region switcher → region-content-only, IN/KE/ZA/ME (SG/USA on Contact); native demo form → info@in2itebs.com with set fields; social URLs from old site; copyright 2026; Salesforce/Workday expanded to SAP-page depth.
