# Open Questions

## Current release decisions — 7 September 2026

The current unresolved decisions are: approved enquiry transport/credentials and receipt test; recruitment contact/ATS; analytics provider, consent and retention; separate ngrok domain/account (custom subdomain rejected on the current Free plan with ERR_NGROK_313); production hosting/DNS/TLS access and release authority; current claim/logo sign-offs; and an approved off-machine source repository/backup. See WEBSITE_REMEDIATION_PLAN.md for issue-level status. Earlier planning questions below are historical where superseded by implemented source and dated addenda.

Named case studies follow the newer content plan's explicit supersession of earlier NDA-only treatment; they have not been removed based on stale documents. This does not imply fresh legal approval for production, and the owner's restriction against homepage case-study narratives still applies.

## Purpose
The single running log of all open questions across the In2IT EBS website build that await human confirmation. It centralises decisions so any agent in the 14-step workflow can find, raise, or check an unresolved question. Seeded at Step 1, answered during planning, and added to through Step 2 and beyond.

## Inputs Required
- Human owner responses to the open items below.
- New questions surfaced by downstream agents (Steps 3–14).
- The corporate profile deck (`CONTENT_SOURCE_OF_TRUTH.md`) and `scraped/` for context.

## Owner Agent
Project Setup Agent

## Completion Criteria
- All seeded and surfaced questions have a recorded answer or explicit deferral.
- No launch-blocking question remains unanswered at Step 14.

## Current Status
In Progress

## Resolved during planning (plan-mode decisions, 2026-06-01)
- **Tech stack:** Next.js (App Router) + React + TypeScript + Tailwind, shadcn/ui where useful, Framer Motion for subtle motion only. (Fixed.)
- **Hosting:** Vercel.
- **Content management:** In-repo typed/MDX content — no CMS.
- **Workflow:** 14-step workflow is canonical.
- **Services scope:** Follow the deck strictly — SAP, Salesforce, Workday, ADMS only; dropped old service lines (Oracle/Microsoft/Cybersecurity/Cloud/Data-AI/local-SEO) get 301 redirects.
- **Client/legal posture:** Deck content (clients, metrics, partner claims) is cleared for the public site; detailed case studies remain NDA/on-request.
- **Old-site URLs:** Preserve via 301 redirects to the nearest of the 11 new pages (map built in Step 5; demo/Lorem pages 410).

## Open — needs owner confirmation (process/setup)
- Is `In2IT EBS Corporate Profile _200526.pdf` the final, approved version?
- ✅ **Brand logos** — provided in `assets/In2IT EBS logos/` (Navy/Light-Blue/White). **Vectorised to SVG** in `assets/In2IT EBS logos/svg/` (traced + render-verified) — **owner to visually verify**. Still asking: do official vector masters (AI/EPS/SVG) exist (preferred over the trace)?
- ✅ **Step 7 design (owner 2026-06-03):** primary CTA button = **8px rounded**; icon set = **Lucide**; imagery/photography = proceed on recommended best-fit direction. Accent-Blue small-text contrast handled in QA (Step 12).
- ✅ **Analytics (owner 2026-06-03):** **reuse the existing GA4 property** (keep history) + **fresh GTM container**; **add the LinkedIn Insight Tag** (B2B retargeting); **opt-in consent** with a real cookie banner. (Detailed in Step 11 `ANALYTICS_AND_CONVERSION.md`.)
- ✅ **Targets locked (owner 2026-06-03):** WCAG **2.2 AA**; performance budgets **LCP ≤2.0s, INP ≤200ms, CLS ≤0.05**.
- ⏳ **Legal/brand sign-off owner & timeline / launch date** — deferred by owner ("not now").

## Resolved 2026-06-03 (owner answers, Step 3)
- ✅ **Off-deck capability pages** (Cloud, Cyber Security/IAM, Oracle, Microsoft/M365/Dynamics, generic Data-AI/Big Data/Blockchain/RPA, Digital Transformation, SimplifyTalent/SimplifyHiring): **follow the deck — deck is the source of truth.** These do not become site practices; expand deck content to be more presentable instead. (Dropped lines get 301s per the 2026-06-01 plan decision.) **Exception:** keep **ECC Prism** from the old site (place under SAP Enterprise Solutions).
- ✅ **Published case studies vs NDA:** follow the deck — case-study detail stays **NDA/on-request**. Add a clients/"for their reference" section on the site showing only what the deck states (logos, sectors, NDA prompt). Old published case-study pages (WeWork, ShareChat, Welspun, IBG) are **not** carried forward as detail.
- ✅ **Employees:** **350+** is authoritative.
- ✅ **SAP consultants:** **300+** is authoritative (shown as SAP-practice consultants, distinct from the 350+ total).
- ✅ **Years of experience:** **10+ years**.
- ✅ **Delivery locations:** show **both** — **10+ delivery centres** (the cities named in the deck) **and 4 office locations** from the deck; render the deck's named locations **as office locations**. For **contact details** (emails, phone numbers), follow the **exact details of the old website**.
- ✅ **"Confidential" marking + "May 2026" date** (slide 1): **dropped** from all public pages.
- ✅ **Named-client logos:** resolved — transcribed via PyMuPDF and extracted to `assets/deck-clients/` (94 files); a few `[?]` names to confirm visually in design.
- ✅ **Demo booking:** build a **native form** (replace the old appt.link external link).
- ✅ **Region/language switcher:** **keep** — regions **IN / KE / ZA / ME**.
- ✅ **Social links + copyright:** use the **old website's social URLs** (YouTube, X/Twitter, LinkedIn, Instagram); update copyright year to **2026**.
- ✅ **Salesforce & Workday pages:** expand to be **as resourceful/detailed as the SAP pages** (from deck content).

## Resolved 2026-06-03 (owner, follow-up)
- ✅ **Office addresses:** use the **deck addresses** for the four deck offices (deck is source of truth); pull **emails and phone numbers from the old website**. Conflicting old-site/footer addresses for Bangalore & Hyderabad are not used for the office cards.
- ✅ **Native demo form:** submissions go to **info@in2itebs.com**; field set: **Name · Work email · Company · Region · Interest area (SAP / Salesforce / Workday / ADMS) · Message**. (Old live form fields are WPForms/CF7-rendered and not in static HTML — confirm visually during build if exact parity with the old form is wanted.)
- ✅ **Region switcher scope:** **region-content-only** (English throughout — **no translation/localisation**, matching how the old site worked: region landing-page links, all `lang="en-US"`, no `hreflang`). Regions in the switcher: **IN / KE / ZA / ME**. **Singapore & USA** are shown on the **Contact page** (deck subsidiaries) but **not** in the switcher. Hard constraint: the switcher changes regional landing/contact emphasis only and **gates no deck content** — every deck practice/page stays fully reachable from every region.

## Still open — Step 9 Components (confirm at/before build)
- **DemoForm anti-spam:** honeypot only, or add a privacy-friendly captcha (Cloudflare Turnstile)?
- **Header search** in v1, or defer post-launch?
- Any **house component conventions / library** to follow before scaffolding?

## Still open — Step 2/3 content (resolve before Step 6 copy)
- **Absolute/superlative claims** — "Only partner to successfully deploy 2 HR Workzone instances", "Largest certified SAP HXM consultant pool in region", "100% go-live success rate", "100% success rate on HR transformation projects". OK to publish as written, or soften/substantiate? (Owner authorised publishing; flagged for legal comfort.)

## Still open — Step 6 Copy (confirm before scaling page copy)
- **House spelling standard** — confirm British/international English (deck precedent: centres, programmes, optimise) vs American.
- **Voice + primary CTA** — confirm the five-word voice (confident, evidence-led, precise, senior, plain-spoken) and primary CTA "Book a discovery workshop."
- **Tone/terminology approver** — who signs off copy?

## Resolved 2026-06-03 (owner, Step 6 follow-up)
- ✅ **Deck-silent content → old website:** populate Careers, Insights, Legal, leadership bios, and **industry-page bodies** from the old site (reworded to copy guidelines). Does **not** revive retired off-deck service practices (still 301'd).
- ✅ **Industries = individual pages** (not one consolidated page): each `/industries/<industry>/` shows that industry's body (old site) + **only that industry's client logos from the deck** (SOT-42/43; `copy/industry-client-map.md`).
- ✅ **Insights & Careers in scope** for v1, sourced from old site. (`copy/careers.md` drafted.)

## Resolved 2026-06-03 (Step 6 — segment logos per deck, cross-verified)
- ✅ **Logo segmentation = deck sectors**, cross-verified against `logo_results.json` (`copy/industry-client-map.md`). Industry pages follow the deck's sector groupings; body content from the matching old-site industry page.
- ✅ **Cross-listed clients shown on both pages** (deck places them in two sectors): OMC & NALCO (Metals & Mining + PSUs); WeWork & Kolte-Patil (Infra + Real Estate); Brickwork India (Infra + BFSI).
- ✅ **Metals & Mining** body ← Heavy Engineering; **Infra & Real Estate** kept as separate pages (cross-listed clients on both); **Energy & Telecom** kept with old-site bodies and **no separate deck logos** (their PSU clients show under Government & PSUs); **"Others"** (Orient Cement, Physics Wallah, JK Paper, Bajaj Allianz, InLife) → "Other sectors" strip on the Industries index.
- ✅ **Excluded** (deck misreads, not clients): "We" fragments, LTB. **Confirm visually:** Human Health [?] + any [?] names.
- All 13 industry pages drafted in `copy/industries/`.

## Resolved 2026-06-03 (owner — pre-Step-9 batch)
- ✅ **Content tooling:** **Velite** (in-repo typed/MDX + schema validation).
- ✅ **Insights/Careers:** repo-managed at launch (best-fit); external ATS/feed a later option. **Maintenance ownership** deferred with sign-off/timeline.
- ✅ **Practice URL depth:** **top-level slugs** (`/sap-enterprise-solutions/` etc.) to preserve SEO equity.
- ✅ **Region selector:** confirmed as a UI selector layer (not page trees); `/home-kenya/`, `/home-southafrica/`, and the 7 city pages 301 → `/`.
- ✅ **Absolute claims:** publish **as written** (LEGAL_REVIEW Item 7).
- ✅ **Search Console data:** none available — proceed on recommended redirect priorities (SAP/industry slugs).

## Still open — Step 4 UX (advisory; inform Steps 5 & 11)
- **Analytics / Search Console data** — available to validate UX observations and to see which old URLs actually carry traffic/rankings worth preserving?
- **Must-preserve URLs** — beyond the obvious SAP/industry slugs, are there old-site URLs that must keep their address for SEO or external links?
- **Known pain points** — any complaints or known problems with the current site the owner wants prioritised in the revamp?
- **Nav model + city/SF-local consolidation** — owner/IA to confirm the simplified ≤2-depth nav and consolidating the 7 city + 8 SuccessFactors-local pages into city-aware routes (doorway-page risk).

## Pending Items
- Owner answers to the open items above (process + Step-2 conflicts).
- Downstream agents (Steps 3–14) append new questions here as they arise.
