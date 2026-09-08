# Legal Review

## 7 September 2026 remediation addendum

Transcript-alignment follow-up restores visible Microsoft, Oracle, IBM, HP, OpenText, Newgen and Qualtrics names from the supplied partner archive. These are shown in the partner/technology ecosystem without new certification tiers. Genuine missing logo artwork uses plain-name fallbacks. Confirm current relationship status and artwork rights before production publication; this local preview change is not fresh legal approval.

The current preview restores Oracle and Microsoft scope at the owner's explicit request using the preserved service-page sources. Historical partner tiers, headcounts and project counts from those pages were not copied. Confirm present capability scope and all partner-logo rights before production. Five Insights are explicitly adapted archive summaries; unknown publication years are omitted. The GROW campaign had no article body and now routes to the existing RISE/GROW service page. No current AI availability or licensing claim is inferred from archived conference coverage.

The source currently says 380+ employees; this work has not treated older audit/document counts as permission to overwrite that value or as fresh human approval. Existing customer, partner, certification and office claims remain subject to this register. Recruitment destination, enquiry processor, retention and any future analytics provider still need owner approval. No new legal approval is asserted by passing code tests.

## Purpose
The register of every item in the In2IT EBS website build that requires legal, brand, or confidentiality sign-off before publication. Populated during content extraction (Step 2) and updated through review (Steps 3–12); every item must be cleared by a human before launch (Step 13).

## Inputs Required
- Extracted sensitive items from `CONTENT_SOURCE_OF_TRUTH.md` (Step 2). — done for text content.
- The corporate profile deck as the authoritative reference for what is claimable.
- A working PDF image renderer (or owner-supplied list) to transcribe the named-client logo wall (slides 42–43).
- Named human approver for legal/brand sign-off.

## Owner Agent
Project Setup Agent / Human Reviewer

## Completion Criteria
- Every sensitive item discovered is logged below with slide provenance and a status.
- Each item carries a status (Approved-to-publish / Verify / Resolve-conflict / Hold / Exclude) and, before launch, a named approver.
- No item remains unresolved at launch sign-off.

## Current Status
Needs Review

## Owner authorisation on record
The owner has confirmed that **nothing in the deck is legally sensitive** and that **everything in the deck is cleared for the public website** — including named clients/logos, metrics, and partner claims. The deck's "under NDA" note refers only to *detailed case studies provided on request*, not to the profile content. This register is therefore a transparency **record**, not a set of launch blockers, with only two residual caveats:
1. **Factual accuracy** — the metric conflicts in Item 5 (employees, consultants, years) were **resolved by the owner 2026-06-03**: **350+ employees**, **300+ SAP consultants**, **10+ years** are authoritative. The conflicting "550+"/"a decade" figures are dropped from the site.
2. **Case-study detail remains excluded** (NDA / on request only).

## Register (populated — Step 2)

### 1. Named clients / client logos — APPROVED-TO-PUBLISH (owner: not sensitive)
- Owner has confirmed the client names/logos are **not legally sensitive** and are cleared for the website, to be displayed as **logo images** (owner directive: use the logos, not text).
- All ~85 client logos on slides 42–43 have been **transcribed** (full sector-grouped roster in `CONTENT_SOURCE_OF_TRUTH.md`, SOT-42 / SOT-43) and the **logo images extracted** to `assets/deck-clients/` (94 files) via PyMuPDF.
- **Per-industry display (owner 2026-06-03):** each Industry page shows **only that industry's** client logos, taken from the deck's sector grouping (SOT-42/43; mapping in `copy/industry-client-map.md`). **Old-site "Our Customers" names are NOT added** — only deck-sourced clients appear, so no unverified client name is published.
- **Status: Approved-to-publish.** Remaining (non-blocking): confirm a few `[?]` low-confidence names visually (Human Health, LTB) and curate/optimise the logo files (transparent, consistent sizing) during the build.

### 2. Partner-tier claims / partner badges — APPROVED-TO-PUBLISH (verify currency)
- SAP Gold Partner (slides 2, 7, 8, 44, 45); RISE with SAP / RISE with SAP (BTaaS) (2, 8, 44, 45); PCE Partner / PCE & Co-Innovation Partner (2, 8, 44, 45); Co-Innovation Partner (8, 44); Salesforce Partner (2); Workday Services (2).
- "Active in SAP user groups" (8); "recognized by SAP as a certified provider of implementation services" (12); "Early-adopter partner for SAP Joule & Joule Studio" (18); "Proof-of-concept partner for SAP" / "Joint Proof-of-Concept partner with SAP" (13, 20).
- Strategic Cloud Alliances: AWS, Microsoft Azure, Google Cloud, SAP, Salesforce, Workday (4). SAP Advanced Data Migration (by Syniti) credentials (21).
- **Status: Approved-to-publish; verify current contractual tier names and validity before launch.**

### 3. Certifications / credentials — APPROVED-TO-PUBLISH (verify validity)
- CMMI · ISO 9001 · ISO 27001 (slides 2, 45). **Verify current certification status, level/scope, and issuing body before launch.**

### 4. Proprietary accelerators / IP names — APPROVED-TO-PUBLISH (confirm ™/® & ownership)
- In2IT FastForward (5, 38, 44); In2IT RDS / Rapid Deployment (12, 38, 44); iTAM (13, 20); EBSx rapid-deployment kit (13); Joule-for-HR enablement playbook (13); Proprietary Talent, Time & HR solution (13); Health Check 360 framework (14); In2IT EBS Packaged S/4 (24); Converged Intelligence Stack (27); Visa & Permit Management (20); Shift Scheduling & Rostering apps (20); Workzone for HR (13, 20); ABAP Factory (25); pre-built RAG accelerator on HANA Cloud Vector Engine (19); Localization Pack / Industry templates (44); In2IT EBS Apps Development Factory (41).
- **Status: Approved-to-publish; confirm trademark usage (™/®) and that each is In2IT-owned IP.**

### 5. Exact metrics / numbers — APPROVED-TO-PUBLISH except conflicts (RESOLVE before publish)
- Company: 10+ years/"a decade" ⚠; 350+ employees ⚠; 550+ employees ⚠ (slide 44); 150+ customers/enterprises; 30+ countries; 14+ verticals; 12+ industry solutions; 12+ strategic partners; 10+ accelerators; 10 cities / 10+ delivery centres (2, 3, 42, 44).
- SAP: 300+ consultants ⚠; 1,000+ combined SAP years; 50+ SAP clients; 40% technical / 60% functional (7, 8); 30% faster go-live, 25+ S/4HANA programs, 100% go-live success (10); 125+ projects, 87+ certified HXM consultants (70/30), 10+ Joule PoCs, 2 HR Workzone instances, 100% HR transformation success (13); 200+ peers / 12 industries, 30–40% customization-debt reduction, 25% MAU lift, 2× faster Joule, 4–6 wk (14); 25+ Concur implementations, 12wk go-live, 4 country tax configs (15); 6M+ suppliers, 15+ Ariba programs, 40% P2P cut (17); 10+ Joule rollouts, 2 Joule Studio agents, 60+ practitioners (18); 8+ BTP extensions, 40% faster TTV (20); 70% of transformations slip on data, 20+ ECC→S/4 migrations, 99.5% data integrity, 3× faster than manual ETL (21); first dashboard in 3 weeks (22); 16 weeks Packaged S/4 vs 12–18 months ground-up (24); 16 weeks AMS transition (39); up to 28% S/4HANA timeline compression (44).
- **Status: Approved-to-publish. ✅ Conflicts resolved by owner 2026-06-03 — authoritative figures: 350+ employees · 300+ SAP consultants · 10+ years. Use these everywhere; do not publish "550+" or "a decade".**

### 6. Office addresses & subsidiary/entity details — APPROVED-TO-PUBLISH (verify)
- 4 India offices with full street addresses: Bangalore, Bhubaneswar, Hyderabad, Delhi NCR-Noida (slide 45). 5 global subsidiaries: Singapore (Pte Ltd), Dubai (IN2IT EB Solutions LLC), USA (Inc), Kenya (Kenya Limited), South Africa (Pty Ltd) (slide 45).
- **Owner decision 2026-06-03:** show the deck's named locations **as office locations**, plus the **10+ delivery centres** from the footprint (slide 3); use the **old website's contact details** (regional emails: info@in2itebs.com / .co.za / .co.ke / .ae / .sg; phones) for the contact page.
- **✅ Address conflict resolved 2026-06-03:** use the **deck addresses** for the four deck offices (deck is source of truth); old-site/footer variants for Bangalore (Sigma Soft Tech Park) and Hyderabad (Spacion Towers) are **not** used. Emails and phone numbers come from the **old website**.
- **Status: Approved-to-publish; verify legal entity names before launch (addresses = deck, contact details = old site).**

### 7. Confidential markings & superlative claims — ACTION REQUIRED
- Cover marked "CONFIDENTIAL" + "May 2026" (slide 1) → **EXCLUDE from all public pages.**
- "Detailed case studies available on request, under NDA" (slide 43) → case-study detail **EXCLUDED**; render as a gated "request under NDA" prompt only.
- Absolute/superlative claims: "Only partner to successfully deploy 2 HR Workzone instances", "Largest certified SAP HXM consultant pool in region", "100% go-live success rate" (10), "100% success rate on HR transformation projects" (13) → **✅ Publish as written (owner confirmed 2026-06-03 — absolute confidence in the deck).** No softening required.

### 8. Awards — NONE IN DECK
- The deck contains no awards/recognitions section. (The old site had an "Accreditation & Awards" page; out of scope unless the owner supplies verified awards.)

## Pending Items
- Transcribe and clear the named-client logo wall (Item 1) — currently HOLD.
- Resolve the three metric conflicts (Item 5) — block publication of those figures until resolved.
- Verify partner-tier names, certification validity, IP/trademark ownership, and exact office addresses before launch (Items 2, 3, 4, 6).
- Obtain named human approver and confirm any third-party logo/client consents.

## Open Questions

- 8 September 2026, independent-logo follow-up: AAI added to the local preview on the owner's explicit request, with artwork from AAI's official website. Customer status is owner-provided, not independently verified from the deck. Mrs Bectors/Cremica/English Oven are parent/brand entries, not three independent customer relationships. Existing production consent requirements remain.

- Client-ribbon reconciliation, 8 September 2026: Diyar Middle East, ITB Group, NIAMT Ranchi and the circular “we” source mark are now included in the local preview from corporate-profile pages 42–43. Confirm the expanded company identity of “we”; no expansion has been guessed. All client-display consent and production approval requirements above still apply. See CLIENT_RIBBON_COVERAGE.md.
- Who holds final legal/brand sign-off authority for this build?
- Are usage permissions on file for client logos/partner marks, or must consent be obtained per item?
- Are the absolute claims (Item 7) substantiated and cleared to publish as written?
- Is there an internal confidentiality/legal review process this register should map to?
