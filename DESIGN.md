# In2IT EBS implemented design system

Updated 10 September 2026. This file supersedes the earlier Newsreader/radius specifications in web/DESIGN.md and docs/DESIGN_SYSTEM.md. Historical design records remain for traceability.

## Direction

### Full-screen narrative update, 11 September 2026

The homepage opens with a dedicated full-viewport brand hero. Ambient footage (a muted, looping office clip under a brand tint and a light wash, replacing the earlier WebGL sculpture on 2026-09-15) belongs only to this section and supports the headline “Change with confidence. Run without compromise.” A separate service carousel follows beneath it, using full-bleed photography and a three-second interval while playing. Its usable height accounts for the fixed header so slide copy and controls remain visible together. Inner-page `PageHero` sections also occupy at least one viewport to maintain the same spatial rhythm.

Desktop navigation uses one combined label-and-chevron link for each disclosure. Services replaces “What We Do”; hovering or focusing Services and About reveals their menu, and Arrow Down moves into it. There is no adjacent disclosure button. Partners and Careers remain primary links and are not repeated under About.

Enterprise buyers compare service scope on office laptops in daylight. The primary presentation is a light, cool-white canvas with restrained blue tints, a prominent genuine logo and readable service hierarchy. Dark mode is an explicit preference, not a different content hierarchy. Following the owner's transcript correction, the homepage now uses a controlled service carousel, not the earlier single-hero decision. Retain the homepage client ribbon and no homepage case-study narratives.

The 10 September 2026 premium glass restyle changed the presentation, not the direction above: content, imagery and information hierarchy are unchanged. Light mode is now premium glassmorphism — frosted glass panels over the same white / cool-blue canvas, with deep-gold text accents (eyebrows, numerals, hover states) and navy-to-gold gradient headings. Dark mode is re-based on a noir canvas with champagne-gold accents, matching the reference prototype's look. Every glass panel, gradient and hover treatment is driven by the same semantic tokens described below; no component was given one-off colours.

## Source of truth

Exact colour values are semantic OKLCH channels in web/app/globals.css. Tailwind maps those roles in web/tailwind.config.ts. Do not copy stale hexadecimal approximations into components.

| Background | Foreground roles |
|---|---|
| canvas, surface, surface-subtle | foreground, foreground-muted, action, error, success |
| action, action-hover | on-action |
| brand | on-brand, brand-muted |
| logo-surface | logo-foreground |
| — (foreground roles) | gold, gold-display, gold-on-brand, gold-soft |
| — (surfaces) | glass, glass-line |

`gold` is for normal-size text (eyebrows, numerals, links on hover, icon tints): 5.4:1 on canvas, 5.7:1 on surface, ≈4.9:1 on subtle in light; 8:1 on noir in dark. `gold-display` is the lightest stop of heading gradients, large text only: ≥3.5:1 on canvas, surface and subtle. `gold-on-brand` is gold on navy (`bg-brand`) surfaces — footer, on-brand sections: 6.7:1 on brand. `gold-soft` is decorative only (borders, glows, gradient highlights on glass) and is never used as text on light backgrounds. `.theme-on-brand` remaps `gold` and `gold-display` to `gold-on-brand` so gold text inside an inverse scope is always the champagne tone. `glass` and `glass-line` are the panel base and border/highlight base that the `.glass*` utilities build on; their alpha is applied by the utility, not the token.

Normal text requires 4.5:1; large text and meaningful non-text boundaries require 3:1. Automated pair tests are in web/tests/browser/theme-contrast.spec.ts; they do not replace a complete assistive-technology audit. Avoid opacity modifiers on meaningful text unless that exact composite pair is tested. web/tests/foundations.test.ts also rejects legacy palette classes (`text-navy`, `bg-white`, `font-serif`, the `blue-*` and `sand` aliases, `rounded-xl2`/`rounded-xl3`, `shadow-soft`/`shadow-lift`) anywhere under `app/` or `components/`, so a regression back onto a retired class fails the unit suite before it reaches review.

## Theme contract

The root carries theme-light or theme-dark, rendered from a validated in2it-theme cookie. Light is the safe default. The initial page and stored theme require no JavaScript. Interactive switching changes the root class and cookie; duplicate controls observe the root. Add a new theme by defining the complete semantic token set and registering its name in web/lib/themes.ts, then adding its label to the switcher. Components do not need theme-specific rewrites. theme-on-brand is an inverse section scope, not another global theme. Legacy colour aliases remain migration adapters, not new component APIs.

## Typography and layout

IBM Plex Sans is the existing identity: weights 400, 500, 600 and 700. Display and legacy font-serif utilities resolve to this same family, not Newsreader. `font-serif` remains defined in web/tailwind.config.ts as an alias of `font-display`, but the premium glass restyle's sweep removed every use of it from markup; it now survives only as a Tailwind alias, and web/tests/foundations.test.ts fails if it (or any other legacy palette class) reappears in `app/` or `components/`. Display is clamp(2.75rem, 5.8vw, 5.25rem); h1 is clamp(2.25rem, 4vw, 3.75rem); h2 is clamp(1.75rem, 3vw, 2.75rem); h3 is clamp(1.25rem, 1.5vw, 1.5rem). Headings balance; long copy stays within 72ch.

Site-wide, `main h1` and `main h2` paint a navy-to-gold gradient (`background-clip: text`) rather than a solid colour; `.heading-plain` is the opt-out for a heading that must stay solid (the mobile menu title, any heading sitting on an image, and any h2 small enough to be normal text rather than large text, where the gold end of the ramp would not clear 4.5:1). The opt-out is declared for `.heading-plain`, `main .heading-plain` and `main .theme-on-brand .heading-plain` so it outranks the on-brand gradient selector too. An `<Accent>` word inside a gradient heading inherits the gradient: `background-clip: text` works through `-webkit-text-fill-color: transparent`, which inherits, so `.accent`'s own colour cannot apply there and the word is not separately coloured — the gradient's gold tail is the accent. `.accent` paints only where no gradient does: `.heading-plain` headings and body copy. `.text-gradient-heading` applies the same gradient to headings outside `main` or to an h3 that asks for it, and `.text-gradient-numeral` applies a matching foreground-to-gold gradient to large statistic numerals. Inside `.theme-on-brand` scopes the heading gradient swaps to the on-brand (champagne) stops automatically.

Container maximum is 1280px with 20px mobile/32px desktop gutters. Shared sections use 80px/112px vertical spacing. Control/surface/feature radii are now 0.75rem/1rem/1.5rem (the reference's softer geometry, up from the earlier 0.3rem/0.45rem/0.65rem); buttons and pills are fully rounded (`rounded-full`). Prefer ruled layouts and tonal separation over nesting cards.

## Interaction and motion

Header Contact remains visible at all breakpoints. Desktop disclosure begins at 1280px and stays inside the container. Mobile uses a native modal dialog with Escape, focus return and resize cleanup. Region is a labelled native select shared with the enquiry form. Important content is visible before hydration.

Client ribbon and homepage animation have persistent pause controls. Reduced motion renders static content and the complete original logo list; duplicate marks are hidden from assistive technology. Offscreen decorative loops and hidden-document animation are paused. Continuous shadow and halo repaint loops are disabled. Never freeze essential text when pausing animation.

Entrance reveals (`Reveal`/`Stagger`, `.reveal` class) are visible-first: content renders in place, and `MotionObserver` (mounted once in the root layout) only adds `data-reveal="in"` once an `IntersectionObserver` sees the element, at which point CSS animates it in from `opacity: 0; transform: translateY(18px)`. Nothing hides until `html[data-motion-ready]` is set and `data-motion-paused` is not `"true"`, so reduced motion and a paused page both show everything immediately; the observer also re-scans on client-side navigation and marks anything already in view as `in` within one second of mount, so a stalled observer never leaves content invisible.

Hover micro-interactions apply only under `(hover: hover) and (pointer: fine)`: `.glass-card` lifts with a gold border glow on hover or focus-within; nav links grow a 2px gold underline from the left (the active link shows it at rest); the primary button sweeps a diagonal gold shimmer across once per hover; icon tiles gain a 1px gold ring on fill.

Two homepage sections sit on ambient video (2026-09-15): the brand hero and “Methods that make delivery observable”. `components/media/ambient-video.tsx` renders the clip muted, looping and inline with a poster frame, never with controls, and reports its state on `data-ambient-video`. Under `prefers-reduced-motion: reduce` or data saver it stays on the poster and never fetches the clip (`poster`); it pauses under the page's own pause control, a hidden tab, or while its section is offscreen (`paused`), fetching the clip only on the first run request; otherwise it plays (`playing`). Phones receive the 720p hero source. Above the clip sit a brand-navy tint (`.video-tint`, `--video-tint-alpha`) and a uniform canvas-coloured veil (`.video-wash` at `--video-wash-base` in the hero; `.video-wash-loose` at `--video-wash-base-loose` in the methods section, which sits deeper in the page and can show more footage). The readable floor no longer spans the section: each text block is wrapped `relative isolate` and carries its own `.video-wash-copy`, a canvas-coloured rectangle at `--video-wash-copy` that overshoots the block by 1.25rem/1.75rem and feathers outwards through a blurred box-shadow of the same colour, so the clip opens up wherever there is no copy (the hero copy block, the methods heading column and the method list each have one; the heading column is `lg:self-start` so its panel hugs the copy instead of stretching to the list's height, and the lower left of the section shows the clip). The hero copy sits bottom-left (`justify-end`), leaving the upper half of the frame to the footage; the pause control and the Discover cue sit together under it, bottom-left, clear of the fixed quick-contact button, and Discover rides a `.glass-pill` because it is over the veil rather than the copy wash. All alphas are per-theme tokens: light keeps `--video-wash-copy` at 0.93, the smallest value that holds the small gold labels at 4.5:1 over a black frame, with base 0.3 and loose 0.45; dark's champagne gold has far more headroom, so it runs copy 0.75, base 0.2, loose 0.3; the tint is 0.2 in both. `tests/browser/theme-contrast.spec.ts` composites body, muted and gold text over the copy wash, the tint and a black and a white frame, and muted text on the pill over the veil, and requires 4.5:1, so retuning an alpha below the floor fails the suite rather than the reader. The WebGL sculpture, its loader, the three.js dependency and the chunk-budget check in scripts/check-build.mjs were removed with it.

## Integrity

Enquiry success means the configured transport accepted delivery, not a button click. Unconfigured previews explicitly offer email and disable online submission. Never invent vacancies, dates, customer results or partnership tiers to fill a layout.
