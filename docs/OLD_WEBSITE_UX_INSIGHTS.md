# Old Website UX Insights

## Purpose
This document captures learnings from the existing scraped website (`in2itebs.com`) to improve the new build's navigation, user flow, CTA placement, SEO phrasing, and service discoverability. These insights are **advisory and UX-focused only**. They may inform structure and experience but may **never override, reduce, omit, or contradict** any point from the corporate profile deck (`CONTENT_SOURCE_OF_TRUTH.md`).

## Inputs Required
- The `scraped/` folder (SECONDARY source): `MASTER.md`, `wireframe.md`, `tech-audit.md`, `site-chrome.md`, `homepage.md`, `contact.md`, `sitemap.md`, plus the section folders. **Reviewed.**
- The Content Source of Truth (to ensure no UX recommendation contradicts the deck) — **referenced.**
- The Step-3 parity decisions (`CONTENT_PARITY_CHECKLIST.md`, owner answers 2026-06-03) — **incorporated.**

## Owner Agent
Old Website UX Agent

## Completion Criteria
- The scraped site reviewed across navigation, flow, CTAs, SEO/URLs, and discoverability — **met.**
- Each insight recorded as an actionable, UX-only recommendation — **met.**
- Each recommendation checked against the deck and confirmed not to override/reduce/omit/contradict it — **met (guardrail column on every table).**
- A retain-vs-retire view captured (handed to parity, not decided here) — **met (§8); parity already decided in Step 3.**
- Recommendations clearly marked as advisory inputs to IA (Step 5) and SEO/Conversion (Step 11) — **met.**
- Reviewed to confirm no recommendation introduces facts not present in the deck — **met.**

## Current Status
Needs Review

## Guardrail (applies to every recommendation below)
The deck is authoritative. These are UX/structure/experience suggestions only. Reducing the old site's 27 service pages to the deck's **four practices** is *not* omission — the deck itself defines four practices (SOT-04), and the off-deck pages were already resolved in Step 3 (follow the deck; 301 redirects; ECC Prism kept). No recommendation here adds a capability, metric, client, or claim that is not in the deck.

---

## 1. Navigation / IA observations

| # | Observation (old site) | UX recommendation (new site) | Deck-safe? |
|---|---|---|---|
| 1.1 | Mega-menu is overloaded: **Services = 7 columns / 27 leaf links**, Industries = flat 14, Partners = flat 10 (`wireframe.md` §1, `tech-audit.md` §12). Dense and hard to scan. | Collapse to the deck's structure: a **Services hub → 4 practices** (SAP, Salesforce, Workday, ADMS) + Delivery Excellence. Keep nav depth ≤ 2. Off-deck branches removed (Step 3). | ✅ Mirrors SOT-04. |
| 1.2 | **No breadcrumbs**, despite a `BreadcrumbList` JSON-LD that only lists "Home" (`tech-audit.md` §6, §12). | Add real breadcrumbs on inner pages; emit matching multi-item `BreadcrumbList`. | ✅ UX/SEO only. |
| 1.3 | **No global header search** (`tech-audit.md` §12). | Add header search across the 11 pages + practices. | ✅ UX only. |
| 1.4 | **No back-to-top** on long pages (`tech-audit.md` §10/§12). | Add a back-to-top affordance on long practice/legal pages. | ✅ UX only. |
| 1.5 | **Duplicate slugs** (`/oracle/`, `/oracle-2/`, `/oracle-3/`, `/sap-concur-2/`, etc.) serve identical content (`sitemap.md`, `tech-audit.md` §12). | Consolidate to canonical + **301** (redirect map = Step 5/11). | ✅ Parity decided (Step 3). |
| 1.6 | **City pages (7)** and **SuccessFactors local-SEO pages (8)** are near-identical templates with only the city swapped — Google doorway-page risk (`wireframe.md` §13/§14). | Replace with a **single city-aware route** / consolidate; decide retention in SEO (Step 11). | ✅ UX/SEO; ties to SOT-03 footprint, SOT-13 SF. |
| 1.7 | Region switcher (IN/KN/ZA) is **three landing-page links, English only, no translation/`hreflang`** (`tech-audit.md` §10; live check). | Keep as a **region selector** (IN/KE/ZA/ME, English, no translation) that changes regional landing/contact emphasis only — **gating no deck content**. SG/USA on Contact, not switcher. | ✅ Step-3 decision. |
| 1.8 | Floating **"Buttonizer"** CTA duplicates the header "Talk to Us" (`tech-audit.md` §2, `wireframe.md` §1). | Drop the duplicate floating button, or repurpose as a single, distinct "Book a discovery workshop" action. | ✅ UX only. |
| 1.9 | Header CTA "Talk to Us" points to `/expert-advice/` (`site-chrome.md` §3). | Point the primary CTA at the **native demo form / Contact** (Step-3 decision). | ✅ Step-3 decision. |

## 2. CTA patterns & placement

| # | Observation | UX recommendation | Deck-safe? |
|---|---|---|---|
| 2.1 | The same generic block — **"Looking for Digital Transformation? Talk to Us"** — repeats on nearly every inner page (`wireframe.md` §1/§3/§4, components catalogue). Identical, not contextual. | Replace with **contextual CTAs per practice** (e.g. "Book a SAP S/4HANA discovery workshop"). Align primary CTA wording to the deck's own ask: **"schedule a 30-minute discovery workshop"** (SOT-44). | ✅ Uses deck CTA (SOT-44). |
| 2.2 | CTA vocabulary is scattered: "Talk to Us", "Know More", "Read More", "Register Now", "Apply Now" (`site-chrome.md` §3). | Establish a small CTA hierarchy: one **primary** (book/contact), one **secondary** (explore practice), contextual tertiary. | ✅ UX only. |
| 2.3 | A demo-booking link (`appt.link`) **exists but is not wired into the funnel** (`wireframe.md` Journey A). | Replace with the **native demo form → info@in2itebs.com** (Step-3 decision); make it the funnel's single conversion point. | ✅ Step-3 decision. |
| 2.4 | No qualification fields, no content-gated assets in the funnel. | Add light qualification (Interest area + Region — already in the form spec); optionally offer a gated overview later. No NDA case-study detail (deck). | ✅ Respects NDA (SOT-43). |

## 3. SEO / URL learnings

**Worth preserving (high-equity, deck-aligned):**
- Clean, readable SAP slugs already rank-worthy: `/sap-enterprise-solutions/`, `/sap-success-factors/`, `/sap-concur/`, `/sap-rise-with-sap/`, plus the industry slugs. **301-map** these to the nearest new page to retain equity.
- "SAP Gold Partner" phrasing and credential language (deck-backed, SOT-02/07/08) — keep.
- Location phrasing for genuine offices (deck SOT-45) is useful for local intent — but as real Contact content, not doorway pages.

**Problems to fix (advisory to Step 11):**
- **Duplicate meta description site-wide** — same string on every page (`tech-audit.md` §6); write unique per-page metadata.
- **Missing `og:image` / `twitter:image`** — blank social shares; add per-page.
- **Schema gaps** — no `Service`, `FAQPage`, `JobPosting`, `Event`; `Organization` lacks `logo`, `sameAs`, `address`, `contactPoint`. Add (Organization `sameAs` = the old-site socials we're keeping; `address`/`contactPoint` from deck offices + old-site contact details).
- **robots.txt** points sitemaps at `infos.php?sitemap.xml` (possible leftover/hack) and sets `Crawl-delay: 3` — replace with real `/sitemap.xml`, drop crawl-delay.
- **Doorway-page risk** on city + SF-local templates (§1.6).

## 4. Service discoverability gaps

| # | Observation | UX recommendation | Deck-safe? |
|---|---|---|---|
| 4.1 | 27 services buried in a dense mega-menu; the genuine SAP depth is hard to find under the noise. | The deck's **4-practice** structure makes offerings far more discoverable; surface the SAP six clusters (Core ERP, Advisory & Impl., Line-of-Business, AI & Intelligence, Data & Analytics, Platform & Engineering) as in-page anchors. | ✅ SOT-08–27 structure. |
| 4.2 | **No practices ↔ industries cross-linking** — service pages don't surface relevant industries and vice-versa. | Cross-link each practice to the deck's industries (SOT-09) and the **Industries & Clients** page (SOT-42/43). | ✅ Deck-sourced. |
| 4.3 | **Customer-stories index does not link** to the 4 detailed case-study URLs — they're orphaned (`wireframe.md` Journey D). | Moot under Step-3 decision (case-study **detail stays NDA/on-request**); instead surface **deck client logos + sectors** near relevant practices, with a gated "request under NDA" prompt. | ✅ SOT-42/43 + NDA. |
| 4.4 | **Testimonial carousel is over-used and generic** — the same 5 quotes appear on dozens of unrelated pages (`wireframe.md` §4, components catalogue). | Use **targeted, relevant proof** only where it fits, and only deck-sourced or separately-consented quotes. Don't carry the blanket carousel. | ✅ No invented proof. |
| 4.5 | SuccessFactors module block is reused **verbatim across 8 local-SEO pages** (`wireframe.md` §14). | One canonical SuccessFactors/HXM section (SOT-13), not 8 near-duplicates. | ✅ SOT-13. |

## 5. Conversion funnels (current journeys & friction)
From `wireframe.md` "Workflows / user journeys":
- **Journey A (research → convert):** Home → service/industry/city → generic "Talk to Us" → `/expert-advice/` → `/thank-you/` → offline. **Friction:** no demo calendar in-funnel, no qualification, scattered CTAs. → Unify into the native demo form with Interest area + Region; align to the deck's 30-minute workshop CTA.
- **Journey B (job apply):** leaves site to Microsoft Forms; no resume parsing. → Lower priority (careers is additive, not deck content); consider a native apply form later.
- **Journey C (event register):** mixed in-page forms + external SAP portal. → Standardise event registration; events are additive/time-sensitive.
- **Journey D (case study):** index doesn't link detailed studies; detail now NDA-gated (§4.3).
- **Journey E (news):** article detail has **no related posts / no share / no onward CTA** → dead-ends. → Add related content + a soft CTA on insights.

## 6. Forms & lead-gen tech
- Forms are **split across Contact Form 7, WPForms, and Mailchimp** (`tech-audit.md` §8) — unnecessary fragmentation. → Standardise on **one** form system in the new stack; the demo form posts to **info@in2itebs.com** (Step-3 decision).
- Honeypot present but consider modern spam protection without reCAPTCHA v2 friction.

## 7. Accessibility & performance (UX-relevant; detailed work = Steps 12 / Performance)
Advisory flags from `tech-audit.md`:
- **No skip-to-content link**; **~21% of homepage images have empty `alt`**; low-contrast footer text; mega-menu keyboard support unverified. → Carry into `ACCESSIBILITY_REQUIREMENTS.md`.
- Heavy payload: **~50 CSS + ~50 JS files, 5 icon libraries, 0 WebP/AVIF**, no `srcset`, unused WooCommerce. → Carry into `PERFORMANCE_REQUIREMENTS.md`; the new stack (Next.js, decided) addresses most of this natively.

## 8. Retain vs retire (UX view — advisory; parity already decided in Step 3)

**Retain (UX patterns worth keeping):**
- Stats strip, practice/service **card grid**, **office cards**, **leadership cards**, **news/insight cards**, partner-logo treatment (as deck **alliances**, not a broad partner roster).
- Clean SAP slug patterns for 301 equity (§3).

**Retire / replace:**
- **Hero slider** (Slider Revolution) → a single purposeful hero per page.
- **Floating Buttonizer** (duplicate CTA), **blanket testimonial carousel**, duplicate `-2/-3` slugs, Lorem-ipsum `/case/` + `/event/` demo pages, `/slide-anything-popup-preview/`, `/event-2024/` placeholder.
- Off-deck capability pages (Cloud/Security/Oracle/Microsoft/Data-AI/Blockchain/RPA/Digital, SimplifyTalent/Hiring) → **301** per Step 3; **ECC Prism kept** under SAP.

**Content-quality fixes carried forward:** "Subsrcibe", "Kinross Streat", "Souring automation", "Industries we Focused" typos; restore real news dates; **copyright → 2026** (Step-3 decision); unique meta descriptions.

---

## Advisory handoffs
- **→ Information Architecture (Step 5):** §1 (nav model, depth, breadcrumbs, search), §1.6 (city/local consolidation), §4 (discoverability, cross-linking), §8 (retain/retire of templates).
- **→ SEO & Conversion (Step 11):** §2 (CTAs), §3 (metadata, schema, robots.txt, redirects), §5 (funnel), §6 (forms).
- **→ Accessibility (Step 12) & Performance:** §7.

## Step output (governance-mandated)
1. **What was completed:** Full UX review of the scraped old site across navigation/IA, CTAs, SEO/URLs, discoverability, funnels, forms, and a11y/perf, with actionable, deck-safe recommendations and explicit handoffs to Steps 5, 11, 12.
2. **What needs review:** Owner/IA confirmation of the simplified nav model and the city/SF-local consolidation approach (§1.6); confirmation of which old SAP/industry URLs are priority for 301 equity (full redirect map built in Step 5).
3. **Assumptions made:** Recommendations assume the Step-3 decisions (4 practices, off-deck 301s, ECC Prism kept, NDA case studies, native form, region switcher, copyright 2026). No new facts introduced.
4. **Open questions for the human:** below.
5. **Allowed to proceed?** Yes — these are advisory inputs; **Step 5 (Information Architecture) can now proceed** with Steps 2, 3, and 4 all complete.

## Open Questions
- Are **analytics / Search Console** data or heatmaps available to validate these observations (e.g. which old URLs actually carry traffic/rankings worth preserving)?
- Which existing old-site URLs are **must-preserve for SEO** beyond the obvious SAP/industry slugs?
- Any **known pain points or complaints** about the current site the owner wants prioritised in the revamp?
