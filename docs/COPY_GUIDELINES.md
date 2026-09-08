# Copy Guidelines

## Purpose
Defines the voice, tone, terminology, and writing rules that govern all website copy for In2IT EBS. It keeps every page consistent, on-brand, and faithful to the corporate profile deck. The Copywriting Agent and any reviewer use it as the standard against which draft copy is checked.

## Inputs Required
- Content Source of Truth (Step 2) — approved terminology, product/service names, factual phrasing. **Met.**
- Information Architecture (Step 5) — page types and the role of each copy block. **Met.**
- Brand guidelines (org standard) — typography/editorial treatment. **Met.**
- `scraped/` secondary references for current terminology only (must not override the deck). **Reviewed.**

## Owner Agent
Copywriting Agent

## Completion Criteria
- Voice/tone defined with descriptors + before/after examples — **met.**
- Terminology & glossary with approved spellings + banned phrasings — **met.**
- Capitalisation, punctuation, number, date conventions — **met.**
- Reading level + sentence/paragraph guidance — **met.**
- CTA language rules — **met.**
- Inclusive/accessible language rules — **met.**
- Do / do-not lists — **met.**
- All guidance verified consistent with the deck — **met.**

## Current Status
Needs Review

---

## 1. Voice & tone
**Voice in five words:** confident, evidence-led, precise, senior, plain-spoken.

The deck sets the register itself — *"Not seven generic claims. Three differentiated capabilities, each backed by evidence."* (SOT-44); *"ML on your tenant, not opinions on a spreadsheet."* (SOT-14); *"Quantified value, not a 60-slide deck."* (SOT-14). Copy talks to an enterprise buyer (CIO, CHRO, transformation lead) as a peer. It earns claims with specifics, never inflates, and prefers a concrete number or named method over an adjective.

| Principle | ✗ Before (generic) | ✓ After (In2IT EBS) |
|---|---|---|
| Evidence over adjectives | "We deliver world-class SAP transformations." | "25+ S/4HANA programmes delivered, with a 100% go-live success rate." (SOT-10) |
| Plain-spoken | "We leverage synergistic methodologies to optimise outcomes." | "One delivery method, built on SAP Activate, accelerated by pre-built assets." (SOT-38) |
| Senior, not salesy | "Let us take your business to the next level!" | "Let's schedule a 30-minute discovery workshop to map your transformation priorities." (SOT-44) |
| Specific scope | "End-to-end services across the board." | "Advisory, build, or run — engage at any tier and move across as the programme matures." (SOT-05) |

**Tone shifts by context:** practice pages = expert and exact; Home/Why = confident and concise; Industries/Clients = credible and restrained (logos and sectors speak); Contact/Careers = warm and direct. Never hype, never fear-based.

## 2. Editorial typography bridge (copy ↔ design)
Headlines use **Newsreader** with **one italic accent word** (brand standard; cf. the deck's "Corporate Capability" treatment). So **every primary headline should be written with a natural accent word** the design can italicise.
- Example: "Three paths to **S/4HANA** — we run all three." (accent: *S/4HANA*, SOT-10)
- Example: "A decade of enterprise *transformation*, delivered globally." (SOT-02)
Body, subheads, labels, captions = **IBM Plex Sans**. Category labels (e.g. "AT A GLANCE") are letter-spaced small caps — write them short (1–3 words) and uppercase-friendly.

## 3. Spelling, capitalisation, punctuation
- **British / international English** (the deck uses *centres, programmes, optimise, harmonisation, specialisation, localisation*). Standardise on `-ise/-isation`, `centre`, `programme`, `licence` (noun).
- **Product names exactly as the vendor writes them:** SAP S/4HANA, RISE with SAP, GROW with SAP, SAP SuccessFactors, SAP Ariba, SAP Concur, SAP Analytics Cloud (SAC), SAP BTP, SAP Joule, SAP Datasphere, Salesforce (Sales/Service/Marketing/Commerce/Industry Clouds, Einstein), Workday (HCM, Financials, Adaptive Planning), Syniti.
- **Company name:** "In2IT EBS" in running copy; "In2IT Enterprise Business Services" only in legal/entity contexts (SOT-45). Never "In2it"/"IN2IT" in body copy except inside legal entity names as the deck writes them.
- **Sentence case** for headings and subheads (not Title Case), except product names and the company name.
- **Oxford comma** off by default (British style) unless needed for clarity.
- **En dash** for ranges (4–6 weeks), spaced em dash or en dash for asides — match the deck's dashed style.

## 4. Numbers, metrics, dates
- **Authoritative company figures (owner-confirmed 2026-06-03):** **10+ years**, **350+ employees**, **300+ SAP consultants** (a subset of the total). **Do not** publish "550+" or "a decade." (LEGAL_REVIEW Item 5.)
- Keep the deck's **"+" notation** (150+, 30+, 12+). Numerals for all stats and counts.
- Reuse deck metrics **verbatim** and only from the deck: 30% faster go-live, 25+ S/4HANA programmes, 100% go-live success (SOT-10); 125+ SF projects, 87+ HXM consultants (SOT-13); 99.5% data integrity (SOT-21); 16-week Packaged S/4 (SOT-24); up to 28% timeline compression (SOT-44); etc. **Never invent or round a metric.**
- **No dates on evergreen pages.** Drop the deck's "May 2026" and "CONFIDENTIAL" marking (SOT-01). Dates appear only on Insights/Events/news items.

## 5. Reading level & length
- Target **Flesch reading ease ~50–60** (educated business reader); avoid jargon walls.
- **Sentences:** ≤ 25 words typical; vary rhythm. **Paragraphs:** 2–4 sentences. **Bullets:** parallel structure, ≤ 2 lines each.
- Lead each section with the point (BLUF); supporting detail follows.

## 6. CTA language
- **Primary CTA (site-wide):** "Book a discovery workshop" (from SOT-44's "30-minute discovery workshop"). → native form, `/contact/`.
- **Approved verbs:** Book, Talk to, Explore, See, Read, Request (e.g. "Request case studies under NDA" — SOT-43).
- **Contextual, not generic** (UX §2.1): "Explore our SAP practice", "See the FastForward method", not a blanket "Talk to Us" everywhere.
- One primary CTA per page; secondary CTAs explore deeper. Keep CTAs ≤ 4 words.

## 7. Inclusive & accessible language
- Plain language; expand an acronym on first use per page (e.g. "Application Management Services (AMS)").
- No idioms that don't translate across IN/KE/ZA/ME English readers.
- Write descriptive link text (not "click here") and meaningful `alt`/heading text (supports Step 12 a11y).
- Gender-neutral; "they" for unspecified persons.

## 8. Do / Do-not
**Do**
- Trace every factual sentence to a SOT ID (provenance comment in draft files).
- Use the deck's own strong lines as anchors (SOT-14/27/44 quotes).
- Expand thin deck areas (Salesforce SOT-28–30, Workday SOT-31–33) with **structure** (clouds, modules, engagement stages) — not invented specifics.
- Localise contact emphasis by region (IN/KE/ZA/ME) without hiding any practice.
- For **deck-silent content** (Careers, Insights, Legal, leadership, industry-page bodies), source from the **old website** (owner direction 2026-06-03) — reword to these guidelines; do not invent. **Industry client logos come from the deck only** (`copy/industry-client-map.md`); never add old-site "Our Customers" names that aren't in the deck.

**Do-not**
- Invent capabilities, clients, partners, certifications, metrics, or office addresses.
- Reintroduce off-deck service lines (Cloud/Security/Oracle/Microsoft/Data-AI/Blockchain/RPA/Digital, SimplifyTalent/Hiring) as offerings — they were retired (Step 3). ECC Prism is the only retained exception.
- Publish case-study detail (NDA/on-request only — SOT-43); use logos + sectors + a gated request.
- Use filler: *world-class, cutting-edge, synergy, best-in-class, seamless, robust, leverage (as verb), unlock potential, take to the next level.*
- State absolute/superlative claims (SOT-13's "only/largest", "100% success") without the legal-comfort check (LEGAL_REVIEW Item 7) — draft them, flag for review.

## 9. Traceability rule (mandatory)
Every page-copy file carries, per section, a `<!-- SOT-xx -->` provenance comment. A reviewer must be able to trace any claim to a deck slide. Sections with no SOT source must be additive/neutral (Insights, Careers, Legal) and contain no factual brand claims beyond the deck.

## Step output (governance-mandated)
1. **Completed:** Voice/tone with examples, editorial-typography bridge, spelling/number/date conventions, reading-level and CTA rules, inclusive-language rules, do/do-not lists, traceability rule.
2. **Needs review:** Owner sign-off on the five-word voice and the British-English standard; confirmation of the primary CTA wording.
3. **Assumptions:** British/international English (deck precedent); authoritative metrics per Step-3 decisions; headline accent-word convention follows the brand typography standard.
4. **Open questions:** below.
5. **Proceed?** Yes — page copy can now be drafted against these guidelines. Home is drafted first (`docs/copy/home.md`) to set the voice for sign-off before the remaining pages.

## Open Questions
- Confirm **British/international English** as the house spelling standard (vs American).
- Confirm the **five-word voice** and the primary CTA "Book a discovery workshop."
- Who is the final approver for tone/terminology sign-off?
