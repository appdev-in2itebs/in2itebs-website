# In2IT EBS implemented design system

Updated 7 September 2026. This file supersedes the earlier Newsreader/radius specifications in web/DESIGN.md and docs/DESIGN_SYSTEM.md. Historical design records remain for traceability.

## Direction

Enterprise buyers compare service scope on office laptops in daylight. The primary presentation is a light, cool-white canvas with restrained blue tints, a prominent genuine logo and readable service hierarchy. Dark mode is an explicit preference, not a different content hierarchy. Following the owner's transcript correction, the homepage now uses a controlled service carousel, not the earlier single-hero decision. Retain the homepage client ribbon and no homepage case-study narratives.

## Source of truth

Exact colour values are semantic OKLCH channels in web/app/globals.css. Tailwind maps those roles in web/tailwind.config.ts. Do not copy stale hexadecimal approximations into components.

| Background | Foreground roles |
|---|---|
| canvas, surface, surface-subtle | foreground, foreground-muted, action, error, success |
| action, action-hover | on-action |
| brand | on-brand, brand-muted |
| logo-surface | logo-foreground |

Normal text requires 4.5:1; large text and meaningful non-text boundaries require 3:1. Automated pair tests are in web/tests/browser/theme-contrast.spec.ts; they do not replace a complete assistive-technology audit. Avoid opacity modifiers on meaningful text unless that exact composite pair is tested.

## Theme contract

The root carries theme-light or theme-dark, rendered from a validated in2it-theme cookie. Light is the safe default. The initial page and stored theme require no JavaScript. Interactive switching changes the root class and cookie; duplicate controls observe the root. Add a new theme by defining the complete semantic token set and registering its name in web/lib/themes.ts, then adding its label to the switcher. Components do not need theme-specific rewrites. theme-on-brand is an inverse section scope, not another global theme. Legacy colour aliases remain migration adapters, not new component APIs.

## Typography and layout

IBM Plex Sans is the existing identity: weights 400, 500, 600 and 700. Display and legacy font-serif utilities resolve to this same family, not Newsreader. Display is clamp(2.75rem, 5.8vw, 5.25rem); h1 is clamp(2.25rem, 4vw, 3.75rem); h2 is clamp(1.75rem, 3vw, 2.75rem); h3 is clamp(1.25rem, 1.5vw, 1.5rem). Headings balance; long copy stays within 72ch.

Container maximum is 1280px with 20px mobile/32px desktop gutters. Shared sections use 80px/112px vertical spacing. Control/surface/feature radii are 0.3rem/0.45rem/0.65rem. Prefer ruled layouts and tonal separation over nesting cards.

## Interaction and motion

Header Contact remains visible at all breakpoints. Desktop disclosure begins at 1280px and stays inside the container. Mobile uses a native modal dialog with Escape, focus return and resize cleanup. Region is a labelled native select shared with the enquiry form. Important content is visible before hydration.

Client ribbon and homepage animation have persistent pause controls. Reduced motion renders static content and the complete original logo list; duplicate marks are hidden from assistive technology. Offscreen decorative loops and hidden-document animation are paused. Continuous shadow and halo repaint loops are disabled. Never freeze essential text when pausing animation.

## Integrity

Enquiry success means the configured transport accepted delivery, not a button click. Unconfigured previews explicitly offer email and disable online submission. Never invent vacancies, dates, customer results or partnership tiers to fill a layout.
