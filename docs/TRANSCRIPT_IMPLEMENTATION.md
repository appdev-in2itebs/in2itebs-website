# Transcript alignment: visible corrections

7 September 2026, following the owner's rejection of the previous transcript interpretation. The previous decision to retain a static hero was the implementation's design choice, not a transcript requirement. This document supersedes that decision in WEBSITE_REMEDIATION_PLAN.md.

| Transcript point | Concrete change |
|---|---|
| 1. Hero lost carousel and quick contact | Four service slides with distinct headline, image and destination; previous/next, direct selection and play/pause controls. Auto-rotation suspends on hover/offscreen/hidden tab and stops on focus/manual selection; reduced motion starts paused. A labelled floating + Contact disclosure exposes enquiry and email links. |
| 2. Persistent email and Talk to Us | A fixed utility bar shows info@in2itebs.com and Talk to us at desktop and mobile widths. The company logo is larger on mobile now that the CTA has its own bar. |
| 3. Six named practices | Prominent linked SAP, SuccessFactors, Workday, Salesforce, Oracle and Microsoft practice selector on Home and What We Do. About's Platforms pillar now has direct links, not only a sentence. Existing Oracle/Microsoft pages, menu entries and contact options remain. |
| 4. Partner visibility/page | A clearly headed homepage partner/technology grid replaces the small monochrome strip. SAP, Microsoft, Oracle, Salesforce, Workday, IBM, HP, OpenText, Newgen, SAP Concur and Qualtrics are visible. Existing local artwork is full colour; missing artwork uses plain readable names, not invented logos. The dedicated Partners page gets the same prominent grid and expanded categories. |
| 5. Careers | Careers remains top-level on desktop and a direct mobile-menu entry. The actual recruitment destination still needs owner approval; no fake vacancies or sales-inbox CV invitation. |
| 6. Broken dropdown | Retain bounded container positioning and keyboard dismissal; adjust available height for the utility bar. Add transcript-specific tests on both What We Do and Contact. |
| Production old/new flash | Not corrected locally or attributed to caching without evidence. Production hosting/TLS/CDN access remains required. |
| Typography direction | Keep the later owner-requested white/blue-tint presentation and existing sans identity. New service headlines are smaller than the previous homepage display headline; no wholesale return to the older navy/serif design. |

The restored technology names come from the supplied partner-page archive and explicit transcript scope. No historical partner tiers or certification claims were added. Missing genuine partner artwork and current partnership approvals remain brand/legal inputs before production publication.

Verification uses tests/browser/transcript.spec.ts plus the existing navigation, accessibility, theme and interaction regressions. The website remains on port 3107; In2CLM and its tunnel are outside this change.

## Verified 8 September 2026

- Production build, lint and TypeScript checks passed; all eight unit/server tests passed.
- All six transcript-specific browser tests passed, including open mega-menu accessibility checks on both reported routes and homepage reflow at 320, 375 and 1440 pixels.
- All 33 additional focused browser regressions passed: navigation at seven widths, keyboard interactions, seven representative routes in both themes, semantic contrast, no-JavaScript rendering and visual captures.
- Local crawl: 63 pages returned HTTP 200, each with one H1; no broken internal links, fragments or missing assets among the 48 checked assets.
- Desktop and mobile homepage screenshots were visually reviewed. These automated accessibility checks are not a full WCAG conformance certification. The full-route accessibility and performance suites were not rerun for this iteration.
