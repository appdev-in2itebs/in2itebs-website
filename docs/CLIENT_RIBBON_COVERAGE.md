# Client ribbon source reconciliation

## Latest correction: independent marks and AAI

8 September 2026, subsequent owner request. The current list contains 96 client/client-brand entries, each with a separate asset path. The earlier 94-entry shared-lockup state below is historical.

- Mrs Bectors, Cremica and English Oven are now independent crops from the supplied PDF's composite. The parent wordmark is retained as printed; the two brand marks are no longer bundled or repeated. These entries must not be described as three independent customer relationships.
- Airports Authority of India was added on the owner's explicit request, not attributed to the two deck client pages. Official artwork: https://www.aai.aero/sites/default/files/logo_15042021.png (linked from https://www.aai.aero/en), retrieved 8 September 2026. Website verification establishes the artwork source, not the customer relationship.
- AAI is first in the ribbon for immediate visibility. No unrelated client was removed.
- Regression checks now reject duplicate image paths and require the AAI record.
- This correction passed the production build (including lint/types) and four targeted browser regressions covering all 96 loaded images, unique asset paths, mobile reflow, reduced motion and hover colour.

8 September 2026. Local preview correction requested by the owner.

The homepage previously called `getFeaturedClients(20)`, omitting every client outside that subset. Numerous records also retained null logo paths despite available high-quality assets. The homepage now uses the complete shared client list, with no logo-presence filter or count cap.

## Coverage

- 90 existing client entries retained; every entry now has an image path.
- Four additional marks visible in the supplied corporate profile's clientele pages added: Diyar Middle East, ITB Group, NIAMT Ranchi and the circular “we” mark.
- 94 entries total, not a claim of 94 distinct companies or distinct logo files. Mrs Bectors and Cremica share the supplied composite lockup. Cross-sector repeats in the deck are represented once per record.
- Existing matched high-quality assets retained. Missing marks extracted from PDF pages 42–43 using their transparency masks, avoiding the old black-background extraction issue.
- Natural Remedies, Wipro Infrastructure Engineering and Bio Pharma Services use crops from the rendered source page. No substitute or AI-generated logos.
- The circular “we” mark keeps a literal source label; its expanded legal/company name requires owner confirmation.

## Interaction

The complete list participates in the animation. Duration scales with list length so adding marks does not accelerate the ribbon. Reduced-motion visitors receive the complete static list automatically; the ribbon carries no controls since 2026-09-15 (the “View all” grid and the pause button were removed on request), and it pauses while offscreen. Duplicate animation copies remain hidden from assistive technology. Colour on hover is retained.

Production permission to display client marks remains subject to the existing legal review. This reconciliation does not establish current customer relationships or new endorsements.

## Verification

Production build and lint passed. Four targeted browser tests passed: all 94 entries have assets and rendered images that load, full-list toggle works, mobile layout does not overflow, reduced motion exposes the original list without the duplicate, and hover restores colour. Source-page renders and the mobile client-list capture were visually reviewed. Initial mobile test sequencing was corrected to scroll the lazy-loaded image's fixed-size container into view before hovering.
