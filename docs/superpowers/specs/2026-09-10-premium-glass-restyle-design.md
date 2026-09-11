# Premium glass restyle — design specification

Date: 2026-09-10. Status: approved by the owner in conversation ("go ahead and build it").
Branch: `restyle/2026-09-10-premium-glass` from `main` at 17277ca.

## 1. Goal

Port the visual language of the reference prototype at `D:\website_in2itebs`
(dark "luxury" glassmorphism, 3D WebGL hero, champagne-gold accents, hover
micro-interactions) onto the production Next.js site in `web/`, while keeping
every piece of content, every image, every route and every accessibility and
performance guarantee the site already has.

The owner's brief, verbatim: "take the whole design like 3d hero, animations,
hover animations, glassmorphism designs, premium and professional feel; but
content, images etc should stay the same. Background should be white or blue
like right now but font colors should have gold hints and gradients for
headings for a premium feel. Update the whole website accordingly."

Owner decisions taken during brainstorming:

| Question | Decision |
|---|---|
| Typography | Keep IBM Plex Sans everywhere. No Plus Jakarta Sans, no JetBrains Mono, no serif-italic accent line. The open serif decision (D1) stays open. |
| 3D hero | three.js WebGL sculpture on the homepage hero only, loaded after the page is interactive. Inner heroes get a static glass panel. |
| Theme mapping | Light theme stays a white / cool-blue canvas with deep-gold accents. Dark theme adopts the reference's noir canvas and champagne gold. |

## 2. Non-negotiable constraints

These are inherited from the remediation phase and the implemented design
system (`DESIGN.md`, root). Every task's requirements include them.

1. **Content is frozen.** No file under `web/content/` or `web/public/` is
   modified, added or removed. Copy, links, stats, client and partner logos,
   stock photography and case studies render exactly as today. New visual
   assets, if any, are generated in code (CSS, SVG data URIs, WebGL), never
   added as files.
2. **Contrast AA floor.** Normal text ≥ 4.5:1, large text (≥ 24px, or ≥ 18.66px
   bold) and meaningful non-text boundaries ≥ 3:1, in both themes. Gold on
   light backgrounds is therefore a deep gold; the lighter gold appears only in
   large-text gradients and on dark or navy grounds. The
   `theme-contrast.spec.ts` pair list is extended, not relaxed.
3. **Visible before hydration.** Essential text is never hidden by a motion
   state that needs JavaScript to clear. Entrance reveals may only hide content
   after `html[data-motion-ready]` is set, and never while
   `html[data-motion-paused="true"]`.
4. **Motion is governable.** The existing "Pause page animation" control,
   `prefers-reduced-motion`, hidden tabs and offscreen state pause every
   decorative animation, including the WebGL hero. Continuous repaint loops on
   blurred or shadowed elements stay disabled (the existing `.ambient-orb`,
   `.system-halo` kill rules remain).
5. **Static prerendering.** No `cookies()`, `headers()` or other dynamic API
   in server components. The prerendered page count floor in
   `scripts/check-build.mjs` still holds.
6. **CSP unchanged.** three.js ships inside the site's own bundle; no new
   script, style, font or connect origins. No `eval`.
7. **Existing tests keep passing** unchanged in intent: 32 unit tests, the
   browser suite (routes + axe in both themes, transcript, interactions, site,
   security headers, client coverage, theme contrast, performance capture).
   Where a test pins a class hook or layout fact that this restyle changes on
   purpose, the test is updated in the same task with a comment saying why.
8. **Layout facts pinned by tests stay true:** the region combobox is visible in
   the header at ≥ 1280px; `#desktop-nav-0` stays inside a 1280px viewport;
   the hero mounts exactly the previous, active and next slide images
   (`img[srcset]`); the client ribbon keeps its `client-ribbon*` hooks and
   pause/expand controls; the quick-contact panel keeps `#quick-contact-panel`
   and its footer-proximity hiding; the theme cookie contract is unchanged.
9. **Bundle budget.** The three.js code lives in exactly one lazily loaded
   chunk that no route's initial JavaScript references, and that chunk is at
   most 700 000 bytes uncompressed. All other chunks are unchanged in role.
10. **Prettier, ESLint and TypeScript stay green** (`npm run check`).

## 3. Design language

### 3.1 Palette and tokens

Tokens remain OKLCH channel triples consumed through Tailwind semantic names.
New roles are added; existing roles keep their names.

Light (`:root, .theme-light`) — unchanged existing roles plus:

| Token | Value (OKLCH channels) | Purpose | Contrast facts |
|---|---|---|---|
| `--color-gold` | `51.14% 0.082 83.6` (≈ #7d6229) | Gold for normal text: eyebrows, numerals, links on hover, icon tints | 5.4:1 on canvas, 5.7:1 on surface, ≈ 4.9:1 on subtle |
| `--color-gold-display` | `57% 0.085 84` | Lightest stop of heading gradients; large text only | ≥ 3.5:1 on canvas, surface and subtle (asserted) |
| `--color-gold-on-brand` | `72.45% 0.100 82.3` (≈ #c5a059, champagne) | Gold on navy (`bg-brand`) surfaces: footer, on-brand sections | 6.7:1 on brand |
| `--color-gold-soft` | `83.98% 0.085 91.0` (≈ #dfc98a) | Decorative only: borders, glows, gradient highlights on glass; never text on light |  |
| `--color-glass` | `99.2% 0.003 255` | Glass panel base (alpha applied in the utility) |  |
| `--color-glass-line` | `100% 0 0` | Glass border and top highlight base |  |

Light radii change to the reference's softer geometry:
`--radius-control: 0.75rem`, `--radius-surface: 1rem`, `--radius-feature: 1.5rem`.
Buttons and pills are fully rounded (`rounded-full`) explicitly.

Light shadows and glows (CSS custom properties, used by utilities):

```
--shadow-glass: 0 1px 2px rgb(21 33 61 / 0.04), 0 20px 50px -24px rgb(21 33 61 / 0.28);
--shadow-glass-hover: 0 2px 4px rgb(21 33 61 / 0.05), 0 30px 60px -24px rgb(21 33 61 / 0.34);
--glow-gold: 0 0 36px -8px oklch(var(--color-gold-soft) / 0.55);
--glass-alpha: 0.62;           /* panel */
--glass-alpha-elevated: 0.78;  /* header, menus, forms */
--glass-blur: 18px;
--gradient-heading: linear-gradient(135deg, oklch(var(--color-fg-primary)) 0%, oklch(var(--color-fg-primary)) 48%, oklch(var(--color-gold-display)) 100%);
--gradient-heading-on-brand: linear-gradient(135deg, oklch(var(--color-fg-on-brand)) 0%, oklch(var(--color-fg-on-brand)) 45%, oklch(var(--color-gold-on-brand)) 100%);
--gradient-numeral: linear-gradient(180deg, oklch(var(--color-fg-primary)) 0%, oklch(var(--color-gold-display)) 100%);
```

Dark (`.theme-dark`) is re-based on the reference noir scale. Foreground and
action roles keep their contrast against the darker grounds (ratios only
increase).

| Token | Value | Source |
|---|---|---|
| `--color-bg-canvas` | `12.87% 0.008 268.5` | noir-950 #06070a |
| `--color-bg-surface` | `15.51% 0.013 270.4` | noir-900 #0a0c12 |
| `--color-bg-subtle` | `21.09% 0.025 270.0` | noir-800 #141824 |
| `--color-bg-brand` | `15.51% 0.013 270.4` | footer and on-brand sections sit on noir-900 with a gold hairline |
| `--color-fg-primary` | `96.83% 0.007 247.9` | slate-100 |
| `--color-fg-secondary` | `86.90% 0.020 252.9` | platinum-300 |
| `--color-border-subtle` | `31.26% 0.043 269.1` | noir-600 |
| `--color-border-strong` | unchanged `62% 0.052 258` | keeps ≥ 3:1 on surface |
| `--color-gold` | `72.45% 0.100 82.3` | champagne; 8:1 on noir |
| `--color-gold-display` | `83.98% 0.085 91.0` | champagne light |
| `--color-gold-on-brand` | `72.45% 0.100 82.3` | same as gold |
| `--color-gold-soft` | `83.98% 0.085 91.0` | |
| `--color-glass` | `17.90% 0.019 270.1` | noir-850 |
| `--color-glass-line` | `100% 0 0` | white hairlines at low alpha |
| `--shadow-glass` | `0 20px 50px -15px rgb(0 0 0 / 0.7)` | reference `shadow-luxury` |
| `--shadow-glass-hover` | `0 30px 60px -15px rgb(0 0 0 / 0.9)` | |
| `--glow-gold` | `0 0 35px -5px oklch(var(--color-gold) / 0.25)` | reference champagne-glow |
| `--glass-alpha` | `0.65`; elevated `0.78` | reference values |
| `--gradient-heading` | `linear-gradient(135deg, #ffffff 0%, oklch(var(--color-fg-secondary)) 55%, oklch(var(--color-gold-display)) 100%)` | reference `text-luxury-champagne` reads |
| `--gradient-heading-on-brand` | same as `--gradient-heading` | |
| `--gradient-numeral` | `linear-gradient(180deg, #ffffff 0%, oklch(var(--color-gold)) 100%)` | |

All other dark roles (action, action-hover, on-action, on-brand, brand-muted,
logo, focus, feedback) are unchanged.

`.theme-on-brand` (inverse scope used by the footer and navy sections) remaps
`--color-gold` to `var(--color-gold-on-brand)` and `--color-gold-display` to
`var(--color-gold-on-brand)` so gold text inside it is always the champagne
tone.

Tailwind exposes the new roles as `gold`, `gold-display`, `gold-on-brand`,
`gold-soft`, `glass`, `glass-line` colours (with `<alpha-value>`), and
`shadow-glass`, `shadow-glass-hover`, `shadow-glow-gold` box shadows.

### 3.2 Typography

IBM Plex Sans, weights 400/500/600/700, unchanged sizes and tracking.

Heading treatment (site-wide, by CSS, no per-page edits):

```
main h1, main h2 { background-image: var(--gradient-heading); -webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-fill-color: transparent; }
main .theme-on-brand h1, main .theme-on-brand h2 { background-image: var(--gradient-heading-on-brand); }
.heading-plain { background-image: none; color: inherit; -webkit-text-fill-color: currentColor; }
```

The utility `.text-gradient-heading` applies the same treatment explicitly
(for headings outside `main`, or `h3` where a component asks for it).
`.text-gradient-numeral` applies `--gradient-numeral` to large statistic
numerals (≥ 1.75rem). `.heading-plain` opts out (used on the mobile menu title
and the sr-only h1 for clarity, and anywhere a heading sits on an image).
Selection colour on gradient text stays the site's action selection.

Eyebrows (`Eyebrow`, `label-caps`) render in `text-gold` (light: deep gold;
on-brand: champagne). h3 and card titles stay solid `text-foreground` and turn
`text-gold` on hover inside interactive cards.

### 3.3 Glass system

Component-layer utilities in `globals.css`, mirroring the reference's
`luxury-*` classes but built on the tokens above:

| Utility | Definition (light values; dark differs only via tokens) |
|---|---|
| `.glass` | `background: oklch(var(--color-glass) / var(--glass-alpha)); backdrop-filter: blur(var(--glass-blur)) saturate(140%); -webkit-backdrop-filter: same; border: 1px solid oklch(var(--color-glass-line) / 0.55); border-top-color: oklch(var(--color-glass-line) / 0.9); box-shadow: var(--shadow-glass);` Dark: border alpha 0.07, top 0.14. |
| `.glass-elevated` | as `.glass` with `--glass-alpha-elevated`, `blur(24px) saturate(150%)`, and an inset top highlight `inset 0 1px 0 0 oklch(var(--color-glass-line) / 0.6)` (dark 0.12). |
| `.glass-card` | `.glass` plus `transition: transform 350ms cubic-bezier(0.16,1,0.3,1), box-shadow 350ms, border-color 350ms, background-color 350ms;` hover (fine pointer only): `transform: translateY(-3px); border-color: oklch(var(--color-gold-soft) / 0.7); box-shadow: var(--shadow-glass-hover), var(--glow-gold);` Dark hover border `oklch(var(--color-gold) / 0.45)`. Focus-within gets the same lift. |
| `.glass-pill` | `.glass` at `--glass-alpha-elevated`, `border-radius: 9999px`, `padding: 0.375rem 0.875rem`, `font-size: 0.75rem`, `font-weight: 600`, `letter-spacing: 0.04em`. |
| `.glass-gold` | gold-tinted pill/panel: `background: linear-gradient(135deg, oklch(var(--color-gold-soft) / 0.28), oklch(var(--color-gold-soft) / 0.08)); border: 1px solid oklch(var(--color-gold) / 0.35); border-top-color: oklch(var(--color-gold) / 0.55); color: oklch(var(--color-gold));` |
| `.rule-gold` | 1px horizontal hairline: `linear-gradient(90deg, transparent, oklch(var(--color-gold-soft) / 0.9) 20%, oklch(var(--color-gold) / 0.9) 50%, oklch(var(--color-gold-soft) / 0.9) 80%, transparent)`. |
| `.hero-ambient` | static backdrop for heroes: `radial-gradient(circle at 15% 20%, oklch(var(--color-action) / 0.10), transparent 40%), radial-gradient(circle at 82% 30%, oklch(var(--color-gold-soft) / 0.22), transparent 38%), radial-gradient(circle at 50% 100%, oklch(var(--color-fg-brand-muted) / 0.12), transparent 45%)`; dark uses the reference vignette `luxury-bg-ambient` values. |

`@supports not (backdrop-filter: blur(1px))` raises the glass alphas to 0.94 so
text on glass never sits on an unblurred busy background.

Text on glass: any glass panel that holds normal-size body text uses
`--glass-alpha-elevated` (≥ 0.78). Axe (run on every route in both themes) is
the arbiter; the implementer raises the alpha if axe reports a contrast
violation.

### 3.4 Motion

Entrance reveals:

- `Reveal` renders `class="reveal"`; `Stagger` renders `class="stagger"` and
  each `StaggerItem` gets `class="reveal"` and `style="--reveal-delay: <index*70>ms"`
  (index passed by `Stagger` via `Children.map`, capped at 8 × 70ms).
- CSS: `.reveal[data-reveal="in"] { transition: opacity 600ms ease-out, transform 700ms cubic-bezier(0.16,1,0.3,1); transition-delay: var(--reveal-delay, 0ms); }`
  `html[data-motion-ready]:not([data-motion-paused="true"]) .reveal:not([data-reveal="in"]) { opacity: 0; transform: translateY(18px); }`
  Reduced motion and `data-motion-paused="true"` therefore show everything.
  (amended 2026-09-11: the transition sits on `.reveal[data-reveal="in"]`, not on the base
  `.reveal`. On the base class the transition also runs backwards, so at hydration every
  below-the-fold reveal fades from opacity 1 to 0; axe multiplies a fractional opacity into the
  foreground and reports the element as a ~1.3:1 contrast violation. The hide must be
  instantaneous and only the reveal animates.)
- `MotionObserver` (client, mounted once in the root layout next to
  `MeasurementSignals`) observes every `.reveal` in the document with an
  `IntersectionObserver` (`rootMargin: "0px 0px -8% 0px"`), sets
  `data-reveal="in"` the first time an element intersects, and unobserves it.
  It re-scans on every pathname change (`usePathname`) so client navigations
  animate too, and marks anything already in view within 1 s of mount as `in`
  (safety net against an observer that never fires).
- Hero copy keeps the existing `hero-enter` keyframe treatment.

Hover micro-interactions (only under `(hover: hover) and (pointer: fine)`):

- Cards: `.glass-card` lift + gold border glow; card title → `text-gold`; arrow
  icon `translate-x-0.5 -translate-y-0.5`.
- Icon tiles: fill with `bg-action text-on-action` (existing) plus a 1px gold
  ring.
- Images inside tiles: `scale(1.035)` over 700ms (existing).
- Primary button: a diagonal gold shimmer sweeps once across on hover
  (`::after` pseudo-element, `translateX(-120%) → translateX(120%)`, 650ms,
  `opacity 0.35`), plus the existing 1px lift. No continuous shimmer.
- Nav links: a 2px gold underline grows from left (`::after scaleX 0 → 1`,
  220ms). Active link shows the underline at rest.
- Client logo tiles: grayscale → colour on hover is already in place; add the
  gold ring on the tile.

The WebGL hero's motion is specified in §4.

### 3.5 Component styling contract

| Component | Change |
|---|---|
| `Button` | Pill (`rounded-full`). `primary`: `bg-action text-on-action` with shimmer and lift; `secondary`: `.glass` pill, border → gold on hover; `ghost`: unchanged colours; `on-dark`: white pill (reference `luxury-btn-primary`) with `text-brand`. Focus rings unchanged. |
| `Card` | Shell is `.glass-card rounded-feature`; `bezel` becomes a 1px gold-soft inner ring instead of the navy plate. Tones: `light`/`white` → glass; `navy` → `theme-on-brand bg-brand` with `border-gold-on-brand/20`. |
| `Eyebrow` | `text-gold` (on-brand: champagne). |
| `Headline` | solid foreground; site CSS applies the gradient to h1/h2. `Headline` exposes `plain` to add `heading-plain`. |
| `SapPartnerBadge` | `.glass-gold` pill; SAP mark chip unchanged (white chip, real SAP logo). |
| `SectionHeading`, `Lead` | unchanged structure; `Lead` colour unchanged. |
| `Header` | `fixed` shell becomes `.glass-elevated` with `data-scrolled` toggled at `scrollY > 20` (`--glass-alpha-elevated` 0.86 when scrolled) and a gold hairline bottom border when scrolled. Utility bar keeps its links; mega-menu panel `.glass-elevated rounded-b-feature`; nav links get the gold underline; the "Talk to us" utility link becomes a `.glass-gold` pill. All ids, aria attributes, breakpoints (xl = 1280) and dialog behaviour unchanged. |
| `Footer` | `bg-brand`, top edge `.rule-gold`; column titles `text-gold-on-brand`; link hover `text-gold-on-brand`; social links `.glass-pill`; office cities link unchanged. |
| `QuickContact` | trigger is a `.glass-elevated` pill with a gold icon; panel `.glass-elevated rounded-feature`; hooks and hiding logic unchanged. |
| `PageHero` | keeps `eyebrow / h1 / subhead / CTA`; background `.hero-ambient`; the `media` slot is rendered inside a `.glass-elevated rounded-feature` frame. |
| `HeroMotif` | the navy plate becomes a glass panel over static blue and gold radial orbs; the sector icon, dot texture and converging-triangle motif stay, icon tinted `text-gold` on light and `text-gold` on dark. |
| `ServiceHero` | see §4. |
| `CtaSection` | glass panel (`.glass rounded-feature p-10 md:p-14`) over `.hero-ambient`; heading gradient via CSS. |
| `FeatureGrid`, `CaseStudyCard`, `PillarCards`, `PillarsSection`, `ThreeReasons`, `HomePartners`, `PartnerEcosystem`, `AllianceStrip`, `SapToolchain`, `ComparisonTable`, `PlatformPracticeLinks` | cards/tiles → `.glass-card`; chips → `.glass-pill` or `.glass-gold`; numerals → `.text-gradient-numeral`; accent borders → gold. Grid structure, copy and links unchanged. |
| `StatBand` and homepage stats `dl` | numerals `.text-gradient-numeral`, labels `text-gold`. |
| `LogoMarquee`, `ClientLogo`, `ClientWall` | tiles keep hooks; add glass tile background and gold hover ring. |
| `DemoForm`, `RiseGrowChooser` | inputs `.glass` **plus `border-border-strong`** with `rounded-control`, hover border gold-soft, focus ring unchanged; option cards `.glass-card`; framer-motion usage in the chooser stays. (amended 2026-09-11: the field keeps `border-border-strong`; `.glass`'s white hairline over a white glass panel leaves the boundary at about 1.1:1, well under the 3:1 non-text floor.) |
| Homepage sections (`app/page.tsx`) | `capability-row`, `method-row`, `stage-card`, industry tiles, trust strip → glass treatments per the table above; section tints gain a faint gold radial. |
| Inner pages (`app/**/page.tsx`) | legacy palette classes (`text-navy`, `bg-white`, `text-grey-muted`, `bg-off-white`, `text-blue-accent`, `border-navy/*`, `shadow-soft` on static content) are swept to semantic and glass classes so every page picks up the system. |

### 3.6 Iconography and imagery

Lucide icons unchanged. Stock photos, client and partner logos unchanged. The
SAP mark chip stays white for trademark legibility.

## 4. The 3D hero

### 4.1 Composition

Inside `ServiceHero`'s `<section>` (which keeps `aria-roledescription="carousel"`,
its `h1.sr-only`, slide `h2`, the three-image mount window, tab buttons and
prev/pause/next controls), the background stack becomes:

1. `<div aria-hidden class="hero-ambient absolute inset-0">` — always present,
   server-rendered.
2. `<Hero3DLoader />` — client component that may mount `<Hero3D />` inside an
   `absolute inset-0 pointer-events-none` layer, `aria-hidden`, `z-0`.
3. The existing `Container` content at `relative z-10`. The right-hand slide
   panel sits in a `.glass-elevated rounded-feature p-2` frame; the caption bar
   and the tabs/controls bar become `.glass`.

The canvas covers the whole hero; the sculpture is positioned right of centre
(camera `position.x = -3.5`, so the knot floats behind the image panel and its
rings sweep behind the headline) and fades in over 900ms once the first frame
renders.

### 4.2 Loader contract (`components/hero/hero-3d-loader.tsx`, "use client")

```ts
export type Hero3DState = "pending" | "active" | "paused" | "unavailable";
export function Hero3DLoader(): JSX.Element; // renders <div data-hero-3d={state} data-hero-3d-reason?=…>
```

Mount rules, evaluated on mount and re-evaluated on `resize` and on
`prefers-reduced-motion` change:

- viewport width ≥ 1024px;
- `matchMedia("(prefers-reduced-motion: reduce)").matches === false`;
- `navigator.connection?.saveData !== true`;
- a probe `document.createElement("canvas").getContext("webgl2") ??
  getContext("webgl")` succeeds;
- `document.hidden === false` at the time of the probe.

If all hold, the loader waits for idle (`requestIdleCallback` with a 1500ms
timeout, falling back to `setTimeout(…, 200)`) and then imports
`./hero-3d` through `next/dynamic` (`ssr: false`, no loading component). If any
rule fails, state is `unavailable` with `data-hero-3d-reason` one of
`viewport | reduced-motion | save-data | no-webgl | hidden`, and nothing else
renders. The `.hero-ambient` layer is the fallback in every case.

### 4.3 Scene contract (`components/hero/hero-3d.tsx`, "use client")

`export function Hero3D({ onState }: { onState: (s: "active" | "paused") => void })`

- three.js `0.186.0` (dependency), `@types/three` `0.185.4` (dev).
  Imports are named (`import { Scene, PerspectiveCamera, … } from "three"`)
  so tree-shaking keeps the chunk under the 700 000-byte budget.
- Renderer: `antialias: true, alpha: true, powerPreference: "high-performance"`,
  `setPixelRatio(Math.min(devicePixelRatio, 1.5))`, ACES filmic tone mapping,
  exposure 1.1, clear alpha 0.
- Camera: `PerspectiveCamera(45, aspect, 0.1, 1000)` at `(−3.5, 0, 22)`.
- Objects, as in the reference: torus knot `TorusKnotGeometry(4.6, 0.9, 220, 40, 2, 3)`
  with `MeshPhysicalMaterial` (roughness 0.22, metalness 0.88, clearcoat 1,
  clearcoatRoughness 0.12); two hairline orbit rings `TorusGeometry(8.2, 0.025, 16, 120)`
  and `(8.9, 0.02, 16, 120)` with `MeshStandardMaterial` (metalness 0.95,
  roughness 0.3, transparent); 70 additive specks (`PointsMaterial size 0.08`).
- Lighting, as in the reference: ambient `0x0e121d` 1.8 (dark) / `0xdfe7f3` 1.4
  (light); key directional `0xf5ead4` 2.8 at (12, 14, 16); rim directional
  `0xcfd8e3` 1.6 at (−14, −10, 10); gold point light `0xd4af37` 2.0 range 45 at
  (0, 8, 8).
- Theme presets (read from `document.documentElement.classList` and updated by
  a `MutationObserver` on the class attribute):

  | | Light | Dark (reference values) |
  |---|---|---|
  | Knot colour / emissive | `0xd7dee9` / `0x9aa8bb` at emissiveIntensity 0.15 | `0x131722` / `0x0a0c14` |
  | Ring colour / opacity | `0xb8944a` / 0.55 | `0xc5a059` / 0.4 |
  | Specks colour / opacity | `0x15213d` / 0.30 | `0xe2e8f0` / 0.35 |
  | Ambient light | `0xdfe7f3` 1.4 | `0x0e121d` 1.8 |

- Animation loop, as in the reference: group rotation `y = t·0.06 + targetX`,
  `x = sin(t·0.04)·0.12 + targetY`; knot `rotation.z = t·0.03`; ring 1
  `rotation.z = −t·0.04`; ring 2 `rotation.x = t·0.05`; group
  `position.y = sin(t·0.6)·0.25`; mouse parallax `mouse = (client − half)·0.0004`
  lerped at 0.04 per frame from a `mousemove` listener on `window`.
- Pausing: the loop stops (`cancelAnimationFrame`) and `onState("paused")` fires
  when any of these is true, and resumes when all are false:
  `document.hidden`; `html[data-motion-paused="true"]` (observed via
  `MutationObserver` on `data-motion-paused`); the mount element is not
  intersecting the viewport (`IntersectionObserver`). The clock is paused too,
  so the sculpture does not jump on resume.
- Resize: `ResizeObserver` on the mount updates the camera aspect and renderer
  size.
- Cleanup: listeners, observers, `cancelAnimationFrame`, `geometry.dispose()`,
  `material.dispose()`, `renderer.dispose()`, canvas removed.
- The canvas element carries `aria-hidden="true"` and `role="presentation"`.

### 4.4 Budget and verification

`scripts/check-build.mjs` gains three assertions after the existing ones:

1. exactly one file under `.next/static/chunks/` contains the string
   `TorusKnotGeometry`;
2. that file's basename is not referenced from `.next/app-build-manifest.json`
   (so no route loads it as initial JavaScript);
3. that file is ≤ 700 000 bytes.

## 5. Files

Created:

- `web/components/hero/hero-3d-loader.tsx`, `web/components/hero/hero-3d.tsx`
- `web/components/motion/motion-observer.tsx`
- `web/tests/browser/hero.spec.ts`
- `web/tests/design-system.test.ts` (unit tests for tokens and utilities, §6)

Modified (all under `web/` unless noted):

- `package.json` / `package-lock.json` (three, @types/three)
- `app/globals.css`, `tailwind.config.ts`
- `app/layout.tsx` (mount `MotionObserver`)
- `components/motion/reveal.tsx`
- `components/ui/{button,card,typography,sap-partner-badge}.tsx`
- `components/layout/{header,footer,quick-contact}.tsx`
- `components/sections/{service-hero,page-hero,hero-motif,cta-section,feature-grid,case-study-card,case-study-grid,pillar-cards,pillars,three-reasons,home-partners,partner-ecosystem,alliance-strip,sap-toolchain,comparison-table,platform-practice-links,stat-band,logo-marquee,client-logo,client-wall}.tsx`
- `components/forms/demo-form.tsx`, `components/interactive/rise-grow-chooser.tsx`
- `app/page.tsx` and the inner `app/**/page.tsx` files that still carry legacy palette classes
- `scripts/check-build.mjs`
- `tests/browser/theme-contrast.spec.ts`, `tests/foundations.test.ts`
- `DESIGN.md` (root), `docs/REMEDIATION_RUNBOOK.md` (a short "restyle" note), `web/WORKLOG.md`

Not modified: anything under `web/content/`, `web/public/`, `next.config.mjs`,
`lib/`, `app/api/`, `app/robots.ts`, `app/sitemap.ts`.

## 6. Testing

Unit (`node:test` via tsx, run by `npm test`):

- `tests/design-system.test.ts`:
  - every utility the components use (`glass`, `glass-elevated`, `glass-card`,
    `glass-pill`, `glass-gold`, `rule-gold`, `hero-ambient`, `reveal`,
    `stagger`, `text-gradient-heading`, `text-gradient-numeral`, `heading-plain`,
    `text-gold`) is defined in `globals.css`;
  - the gold tokens exist in both theme blocks and `.theme-on-brand` remaps
    `--color-gold`;
  - `tailwind.config.ts` exposes `gold`, `gold-display`, `gold-on-brand`,
    `gold-soft`, `glass`, `glass-line`;
  - `.reveal` is only hidden under `html[data-motion-ready]:not([data-motion-paused="true"])`
    (regex on the CSS) and the reduced-motion block does not hide it;
  - `hero-3d.tsx` imports three by named specifiers only (no `import * as THREE`).
- `tests/foundations.test.ts`: the existing class-hook test's list gains the
  new utilities; the "every module imported" test must still pass (the loader's
  `import("./hero-3d")` counts as an import).

Browser (Playwright, existing config):

- `theme-contrast.spec.ts` adds pairs: `gold` on `bg-canvas`, `bg-surface`,
  `bg-subtle` ≥ 4.5; `gold-display` on the same three ≥ 3.5; `gold-on-brand`
  on `bg-brand` ≥ 4.5; both themes.
- `hero.spec.ts`:
  - 1440×900, light, no reduced motion: within 15 s the loader reaches
    `data-hero-3d="active"` with a `canvas` inside, **or** reaches
    `unavailable` with reason `no-webgl` (headless Chrome without GPU is a
    valid environment); in both cases `.hero-ambient` exists and the three
    slide images are still the only `img[srcset]` in the carousel;
  - 375×812: state is `unavailable` with reason `viewport`, no canvas;
  - `reducedMotion: "reduce"`: `unavailable` with reason `reduced-motion`;
  - when `active`: clicking "Pause page animation" moves the state to `paused`,
    clicking again returns it to `active`;
  - dark theme at 1440: same outcome as light.
- `all-routes.spec.ts` (axe on every route, both themes), `interactions`,
  `transcript`, `site`, `client-coverage`, `security-headers`, `performance`
  pass unchanged.
- Visual review gate (controller): the captures written by the "visual
  captures" test plus dark-theme captures of `/`, `/sap-enterprise-solutions/`,
  `/contact/`, `/partners/` are inspected before the final review.

Build (`npm run build` runs `check-build.mjs` postbuild): §4.4 assertions plus
the existing ones.

## 7. Out of scope

- Any content change, including the stakeholder-flagged figures (350 vs 380
  employees, 28% vs 30%), the open D1–D7 decisions, the lead receiver, and the
  remediation follow-ups (rightmost forwarded hop, build-time env stamp).
- 3D scenes on inner pages; video or Lottie assets.
- Typeface changes.
- Replacing the carousel with a single hero (the owner reinstated the carousel
  in the transcript review; it stays).
