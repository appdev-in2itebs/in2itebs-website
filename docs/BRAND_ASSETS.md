# Brand Assets

## Purpose
Inventories the brand assets for the In2IT EBS website (own logo variants, client/partner/cert logos, imagery, iconography) and the usage rules that govern them: approved variants, formats, source files, clear-space, contrast, and do / do-not rules. Reference for the Design System and Frontend Build agents.

## Inputs Required
- Approved brand guidelines (logo usage + general principles) — **met.**
- Brand logo source files — **met** (`assets/In2IT EBS logos/`).
- `DESIGN_SYSTEM.md` colour/background tokens (for contrast pairing) — **met.**
- Approved imagery direction + licensing — **pending owner.**

## Owner Agent
Design System Agent

## Current Status
Needs Review

---

## 1. In2IT EBS logo — the three approved variants
Lockup = **converging-triangles "pinwheel" mark** + **In2IT EBS** wordmark + tagline **"CONVERGED INTELLIGENCE"** (ties to the Converged Intelligence Stack, SOT-27). Source files in `assets/In2IT EBS logos/`:

| Variant | Raster master | **Vector (web)** | Use on | Maps to token |
|---|---|---|---|---|
| **Navy** | `In2IT EBS-40 1.png` | `svg/in2it-ebs-navy.svg` | white / light backgrounds | `--navy` on `--white`/`--off-white` |
| **Light Blue** | `In2IT EBS-41 1.png` | `svg/in2it-ebs-light-blue.svg` | dark / navy backgrounds | `--blue-light` on `--navy` |
| **White** | `In2IT EBS-42 1.png` | `svg/in2it-ebs-white.svg` | photographic or dark fills (use only when navy isn't legible) | white on imagery/dark |

> **SVGs produced 2026-06-03** by tracing the PNG masters (binary trace, recoloured to the exact brand hex) and **rendered-verified** against the originals (mark + wordmark + "Converged Intelligence" tagline reproduce faithfully). **Pending owner visual sign-off.** If official vector masters (AI/EPS/SVG) exist, prefer them over the trace.

**Usage rules (from brand guidelines):**
- Preserve aspect ratio when resizing — **never stretch or skew**.
- **Clear space** ≥ the height of the **"E" in "EBS"** on all sides.
- Do **not** recolour outside these three approved variants.
- Do **not** place navy on dark fills, or light-blue/white on light fills — **contrast must always be sufficient**.
- Use the **white** variant only when navy isn't legible (photos, gradients).

**Format/build note:** the supplied files are large raster PNGs (~6107×2922). **SVGs now produced** in `svg/` (primary web format). Still to derive at build: responsive **PNG/WebP** at header sizes, a **favicon/app-icon set** from the pinwheel mark alone, and a **mark-only** lockup (no wordmark) for compact placements.

## 2. Header / footer application
- **Header** (white/off-white background): **Navy** variant.
- **Footer** (navy background): **Light Blue** or **White** variant.
- **On imagery/hero photos:** **White** variant, only with sufficient overlay contrast.

## 3. Client, partner & certification logos
Deck client wall (SOT-42/43) + partner/alliance/cert marks render as **logo images** (owner directive). Sourced from Wikimedia/company infoboxes (SVG preferred), each **visually verified against the deck** (source of truth). Per-industry display follows `docs/copy/industry-client-map.md` (deck segmentation, cross-verified).
- **Locations:** `assets/logos/clients/`, `assets/logos/partners/`, `assets/logos/certs/`; raw deck crops in `assets/deck-clients/`. Full inventory: `assets/logos/MANIFEST.md`.
- **Coverage:** 55/99 in high quality (44 clients, 6 partners, 1 cert); remaining 44 fall back to **deck renders** so **no logo is missed**.
- **Deck-faithful corrections:** Tata MD, Tata BlueScope, Welspun One, Kirloskar Electric cropped from the deck; Wipro Infrastructure Engineering pending a build-time deck crop.
- **Build normalisation:** transparent backgrounds, consistent sizing/padding, JPGs cleaned; grayscale-on-hover or mono treatment optional for a consistent wall.

## 4. Imagery direction
- **Pending owner.** Default until confirmed: restrained, editorial photography (enterprise/people/abstract-tech), navy-dominant treatment, with sufficient overlay for the white logo and white text. No stocky clichés. Record licensing per asset.

## 5. Iconography
- One line-icon set (Lucide or Phosphor — see `DESIGN_SYSTEM.md` §7), Navy/Accent Blue, on Pale Blue backgrounds where used as feature bullets. Replaces the old site's 5 icon libraries.

## Pending Items
- Produce web-ready **SVG + WebP/PNG + favicon** from the three PNG masters (build task).
- 43 client/partner logos pending high-quality sourcing (small private firms) — owner to supply or crop from deck at build (`MANIFEST.md`).
- Confirm imagery direction + licensing; confirm icon set.
- Curate/normalise client logos during build.

## Open Questions
- Are **vector (SVG/AI/EPS)** masters of the In2IT EBS logo available (cleaner than upscaling the PNGs)?
- For the 43 remaining client logos — owner-supplied files, or deck crops at build?
- Approved **imagery library / photography direction** and licensing?
- Confirm the **icon set** to standardise on.
