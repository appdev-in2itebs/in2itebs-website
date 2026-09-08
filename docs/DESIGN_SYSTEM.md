# Design System

**Superseded implementation details, 7 September 2026:** the current system is documented in [the root DESIGN.md](../DESIGN.md), with exact semantic tokens in web/app/globals.css. The implementation uses IBM Plex Sans for display and body, root cookie-rendered light/dark classes, and 0.3/0.45/0.65rem radii. Newsreader, older colour ratios and earlier radius specifications below are historical, not current instructions.

## Purpose
The visual design language for the In2IT EBS website as implementable tokens (typography, colour, spacing, grid, elevation, motion, components). Single reference for the Component Architecture Agent (Step 9) and Frontend Build Agent (Step 10). Translates the approved brand guidelines into tokens rather than prose.

## Inputs Required
- Approved brand guidelines (two-font system, colour palette, logo usage, general principles) — **met.**
- `BRAND_ASSETS.md` (logo variants + libraries) — **met.**
- IA (Step 5) page types / layouts — **met.**
- Copy (Step 6) for type-scale validation against real content — **met.**
- Font availability/licensing — **resolved:** Newsreader + IBM Plex Sans are open-licence on Google Fonts (self-host or Google Fonts CDN); Calibri is the render-safe fallback for Word/email.

## Owner Agent
Design System Agent

## Current Status
Needs Review

---

## 1. Typography
Two-font system (brand standard).

**Families**
- **Newsreader** (serif) — primary titles, slide/section headlines, major headers. Bold for the primary statement; **italic for the accent word** (the word marked with *asterisks* in the copy files). Fallback: `Georgia, 'Times New Roman', serif`.
- **IBM Plex Sans** (sans-serif) — body, subheads, captions, table content, footnotes, footers, category labels. Weights: Regular 400, Medium 500, Semibold 600, Bold 700. Fallback: `Calibri, 'Segoe UI', system-ui, sans-serif` (Calibri is the render-safe fallback for Word/email).

**Accent-word convention (copy ↔ design):** headline accent words render in **Newsreader italic, Accent Blue `#3F75A3`**.

**Type scale** (`rem`, base 16px; fluid clamp at build):
| Token | Font | Size / line-height | Weight |
|---|---|---|---|
| `display` | Newsreader | 56–72px / 1.05 | 700 |
| `h1` | Newsreader | 40–48px / 1.1 | 700 |
| `h2` | Newsreader | 30–36px / 1.15 | 700 |
| `h3` | Newsreader | 24–28px / 1.2 | 600/700 |
| `subhead` | IBM Plex Sans | 18–20px / 1.45 | 500 |
| `body` | IBM Plex Sans | 16–18px / 1.6 | 400 |
| `small` | IBM Plex Sans | 14px / 1.5 | 400 |
| `caption` | IBM Plex Sans | 12–13px / 1.4 | 400 (Muted Grey) |
| `label` (caps) | IBM Plex Sans | 12–13px / 1.3 | 600, **letter-spacing 0.14em, uppercase** |

The `label` token is the letter-spaced small-caps treatment for category labels ("AT A GLANCE").

## 2. Colour
**Primary**
- `--navy` **#121E3B** — titles, body on light, dark-section fills. **Dominant brand colour.**
- `--white` **#FFFFFF** — primary content background.

**Secondary**
- `--blue-light` **#94B8D0** — card backgrounds, secondary highlights, supporting blocks.
- `--blue-accent` **#3F75A3** — italic accent words, hyperlinks, key callouts. **Emphasis only.**
- `--blue-pale` **#A3CBE6** — soft highlight fills, icon backgrounds.

**Neutrals**
- `--grey-muted` **#5A6478** — body on light (secondary), captions.
- `--off-white` **#F7F8FA** — alternate background, subtle card fills.

**Accent**
- `--sand` **#C1BC9C** — thin dividers, subtle rules. **Use sparingly.**

**Semantic roles**
| Role | Token |
|---|---|
| Page background | `--white` (alt: `--off-white`) |
| Dark sections / cover / dividers | `--navy` |
| Heading / body text on light | `--navy` |
| Secondary text / captions | `--grey-muted` |
| Text on dark | `--white` (secondary: `--blue-pale`) |
| Link / emphasis / accent word | `--blue-accent` |
| Card surface | `--off-white` / `--blue-light` |
| Icon background | `--blue-pale` |
| Divider / rule | `--sand` (sparing) |

**Usage weight:** Navy dominant **60–70%** of visual weight. Accent Blue **sparingly**, emphasis only — never a primary fill. Backgrounds stay clean (white/off-white for content; navy for cover/section dividers). No colours outside this palette; charts use **shades within the blue family**, not new hues.

**Contrast (WCAG 2.2 AA target — validate in Step 12)**
- Navy on White ≈ 16:1 ✓; White on Navy ≈ 16:1 ✓.
- Muted Grey on White ≈ 5.6:1 ✓ (AA normal text).
- **Accent Blue on White ≈ 4.5:1 — borderline**; OK for links/large text, verify for small text or darken slightly.
- **Light Blue / Pale Blue are fills only — NOT text on white** (insufficient contrast). On navy they work for secondary text/decoration.

## 3. Spacing & layout
- **Base unit 4px.** Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- **Section vertical rhythm:** 96–128px desktop, 56–72px mobile (generous, editorial).
- Content max-width container **1200–1280px**; text measure ≤ 72ch.

## 4. Grid & breakpoints
- 12-column grid, 24px gutters.
- Breakpoints: `sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536`.

## 5. Elevation & radius
- Soft, low shadows (navy-tinted), used sparingly on cards: e.g. `0 1px 2px rgba(18,30,59,.06), 0 8px 24px rgba(18,30,59,.08)`.
- Radius: cards/inputs 8–12px; buttons 6–8px (or pill for primary CTA — confirm in components).
- Avoid heavy drop shadows; prefer subtle elevation + hairline borders (`--sand`/`--off-white`).

## 6. Motion
- Durations: `fast 150ms · base 250ms · slow 400ms`. Easing `cubic-bezier(.2,.6,.2,1)` (ease-out).
- Subtle only (Framer Motion per stack); entrance fades/slides ≤ 16px; **respect `prefers-reduced-motion`** (disable non-essential motion).

## 7. Iconography
- **One** line-icon set (e.g. Lucide or Phosphor) — replaces the old site's 5 icon libraries (UX/tech-audit). Stroke icons in Navy or Accent Blue; on Pale Blue backgrounds where used as feature bullets.

## 8. Components (tokens → roles)
- **Button / primary:** Navy fill, White text; hover slightly lighter navy. Primary CTA = "Book a discovery workshop".
- **Button / secondary:** Navy outline on white; hover Off-White fill.
- **Link:** Accent Blue, underline on hover/focus; visible focus ring (accessibility).
- **Card:** Off-White or Light Blue surface, 8–12px radius, subtle shadow, Navy heading + Muted Grey body.
- **Stat block:** Newsreader number (Navy) + IBM Plex Sans label (Muted Grey caps).
- **Table:** IBM Plex Sans; hairline `--sand`/off-white row separators; Navy headers.
- **Footer:** Navy background, White headings, Pale Blue/White links; certifications strip.
- **Logo lockups:** per `BRAND_ASSETS.md` (variant by background).

## 9. Brand do-not (encoded from guidelines)
- Don't use generic full-width accent bands or **decorative underlines beneath titles** — hierarchy comes from type scale + the italic accent word, not rules.
- Don't introduce non-palette colours; don't use Accent Blue as a large fill; don't put light-blue/white logo or text on light backgrounds.

## Step output (governance-mandated)
1. **Completed:** All token categories defined with values traceable to the brand guidelines; component token mapping; usage-weight and do-not rules; contrast notes for QA.
2. **Needs review:** Owner confirmation of the type scale ranges, button radius (pill vs 8px), and Accent-Blue small-text usage (borderline contrast).
3. **Assumptions:** Newsreader + IBM Plex Sans self-hosted from Google Fonts (open licence); Lucide/Phosphor as the single icon set.
4. **Open questions:** below.
5. **Proceed?** Yes — feeds Component Spec (Step 9). Coding Gate still needs Step 8 (Data Model) + Step 9.

## Open Questions
- Primary CTA button shape — **pill** or 8px radius?
- Confirm the single **icon set** (Lucide vs Phosphor vs custom).
- Any data-table/callout treatments to standardise beyond the above?
- Photography/illustration direction (see `BRAND_ASSETS.md`)?
