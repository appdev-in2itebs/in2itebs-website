# UX interface and navigation audit

Date: 2026-09-03

Scope: Homepage, global navigation, shared theme primitives, proof interactions, and lead-form feedback. Issues are ordered by likely user impact.

| Priority | Problem | Why it is a problem | Specific fix | Prototype status |
|---|---|---|---|---|
| P0 | Navigation disappeared at 1024–1279px because the desktop navigation began at `xl`, the menu button ended at `xl`, and the opened panel ended at `lg`. | Common laptop and tablet-landscape widths could show a menu button whose panel remained hidden. This blocks all primary navigation. | Use one shared `lg` breakpoint for desktop navigation, the menu trigger, and the opened panel. Give the trigger `aria-expanded` and `aria-controls`. | Fixed |
| P0 | “Who We Are” and “About” competed at the same level and led to the same route. Contact also competed with the primary CTA. | Duplicate destinations weaken information scent and make the information architecture look ungoverned. | Keep five top-level choices. Move Who We Are, Partners, Insights, and Careers under About. Use the workshop CTA as the contact path. | Fixed |
| P0 | Company statistics initially rendered as `0+` and depended on an in-view animation to become factual. | Visitors, assistive technology, screenshots, and no-script environments could receive incorrect evidence. | Render the real value in the initial HTML. Treat motion as decoration only. | Fixed |
| P1 | The homepage presented nine major modules and more than 9,000 vertical pixels of content. | The value proposition and conversion action were diluted by catalogue-like completeness. | Reduce the story to hero, scale, capabilities, outcomes, industries, and CTA. Move depth to destination pages. | Fixed on homepage |
| P1 | The main CTA said “Talk to our SAP team” while the surrounding proposition covered SAP, Salesforce, Workday, advisory, and digital engineering. | The action narrowed the offer at the moment of conversion and made the wider positioning feel inconsistent. | Standardise on “Book a 30-minute workshop,” an approved, time-bounded action that accommodates every capability. | Fixed |
| P1 | The homepage used a 13-item tab list, an exploratory diagram, and an auto-advancing case-study carousel. | Important content remained hidden behind discovery, small controls, and motion. A design-focused audience expects the interface to communicate state and available depth immediately. | Replace homepage tabs with direct sector links, replace the diagram with a concise engagement summary, and replace the carousel with three explicit outcome modules. | Fixed on homepage |
| P1 | Proof was presented as a long logo wall followed by clamped carousel cards. | Logos signal familiarity but do not explain the business result. Clamped copy hides the reason to engage. | Lead with measurable outcomes, client, programme context, and a direct detail link in one evidence surface. | Fixed on homepage |
| P1 | Colors were tied to visual names such as `navy`, `white`, and `blue-light`. | Components could not change theme safely because the same raw color was used as text, surface, and decoration. Contrast responsibility was distributed across individual files. | Introduce semantic roles for canvas, surface, foreground, action, border, focus, feedback, and on-color text. Themes only redefine role values. | Fixed with compatibility aliases |
| P1 | Form feedback was present but not announced, the error color was not semantic, and the busy control gave limited state information. | Screen-reader users could miss failures, and all users received weak assurance that the request was being processed. | Add `aria-busy`, an assertive live region, `role=alert`, explicit busy copy, semantic error styling, autocomplete, and a waiting cursor. | Fixed |
| P2 | The region control displayed only “IN”. | The label could mean country, language, or business entity. | Give the control an accessible “Region: India” label and show the full region name when space permits. | Fixed |
| P2 | Current navigation state was not persistent. | Users arriving on an inner page had to infer their location from page content alone. | Apply `aria-current=page` and a persistent visual state to matching top-level and child destinations. | Fixed |
| P2 | Section grammar repeated tiny uppercase labels, italic words, paragraphs, and rounded cards. | Repetition flattened hierarchy and created a recognisable template rather than a deliberate narrative. | Limit italic emphasis to the hero, vary section composition, use divided lists for capabilities and industries, and reserve cards for grouped evidence. | Fixed on homepage |
| P2 | Several controls used targets below the recommended 44px minimum, including carousel dots and social icons. | Small targets increase motor effort and feel under-resolved on touch hardware. | Use 44px controls for global navigation, mobile disclosure, theme, region, social, and form actions. Remove tiny carousel pagination from the homepage. | Fixed in shared navigation and homepage |

## Theme architecture

The server renders `<html class="theme-light">`, so the initial theme does not depend on JavaScript. A user-initiated control replaces that root class with `theme-dark` after hydration. A future theme only needs a new root class that defines the same semantic variables.

Core roles:

- `--color-bg-canvas`, `--color-bg-surface`, `--color-bg-subtle`, `--color-bg-brand`
- `--color-fg-primary`, `--color-fg-secondary`, `--color-fg-on-brand`, `--color-fg-on-action`
- `--color-action`, `--color-action-hover`
- `--color-border-subtle`, `--color-border-strong`, `--color-focus`
- `--color-feedback-success`, `--color-feedback-error`

## WCAG contrast verification

Ratios are calculated from the canonical OKLCH values used in `app/globals.css`.

| Pairing | Light | Dark | Requirement |
|---|---:|---:|---:|
| Primary foreground / canvas | 15.12:1 | 16.27:1 | 4.5:1 |
| Secondary foreground / canvas | 7.56:1 | 10.25:1 | 4.5:1 |
| Action / surface | 5.93:1 | 8.66:1 | 4.5:1 |
| On-action / action | 5.78:1 | 9.16:1 | 4.5:1 |
| On-brand / brand | 15.15:1 | 16.89:1 | 4.5:1 |
| Brand-muted / brand | 9.72:1 | 10.84:1 | 4.5:1 |
| Focus / canvas | 5.77:1 | 10.90:1 | 3:1 |
| Error / surface | 7.44:1 | 8.72:1 | 4.5:1 |
| Success / surface | 8.96:1 | 10.21:1 | 4.5:1 |

## Remaining follow-up

- Apply semantic utility names to every legacy inner-page component. Compatibility aliases keep both themes legible, but direct semantic names make intent auditable.
- Persist a visitor’s theme choice only if product requirements call for it. The current prototype intentionally guarantees a deterministic, script-free light initial render.
- Run dedicated keyboard, screen-reader, and mobile-device QA before production release.
- Connect the lead endpoint to real email or CRM delivery. The interface now communicates submission states, but operational delivery remains a backend dependency.
