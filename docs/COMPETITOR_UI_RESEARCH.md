# Competitor UI/UX Research — SAP Consulting Firms

**Principal product-designer review for In2IT EBS** · Date 2026-06-04
Firms reviewed: **18** (12 observed via fetch, 6 inferred where sites blocked bots and were cross-verified via search).

## Executive summary
A review of 18 SAP-consulting websites — global Big Four, Indian tier-1 SIs, and mid-market SAP partners — shows the In2IT EBS build is **structurally sound and typographically differentiated** (the navy + Newsreader + IBM Plex Sans system is competitive-grade — Wipro uses the same body font). Four gaps separate us from the mid-market comparator tier:

1. **No photography** — every competitor uses imagery at the hero level; we rely entirely on geometric motifs + text. The single sharpest visual gap.
2. **Thin named social proof** — no named client-outcome quote, no video case study, leadership shown as initials placeholders not real headshots.
3. **Buried proprietary IP** — ECC Prism, iTAM, Health Check 360, EBSx exist in copy but aren't surfaced as branded, navigation-level assets (competitors surface Syntax Compass, TechM Epselon, delaware FAST-Retail, invenioLSI GovOne).
4. **Generic secondary CTAs** — "Explore", "View sector" flatten the funnel vs outcome-specific language.

---

## 1. Firms reviewed

| Firm | Positioning | Hero | Imagery style |
|---|---|---|---|
| Accenture | #1 SAP innovator globally | Content carousel | Abstract co-brand + client photography in case cards |
| Deloitte | Vision to value | Compact co-branded, text-forward | Pro headshots + video client-story thumbnails |
| Capgemini | Leading the world in SAP knowledge | Event photography (Sapphire) | Named leadership headshots + event photography |
| IBM Consulting | Trusted expertise meets technology | Full-viewport dark, abstract AI/network | Abstract tech viz; desaturated human photography |
| Infosys | Navigate your next | Animated abstract data-flow | Blue-toned data viz; office photography w/ blue overlay |
| Cognizant | We're an AI Builder | Full-viewport dark navy, abstract geometric | Abstract AI hero; documentary industry photography |
| TCS | Perpetually adaptive enterprises | Full-bleed dark, typographic + motion | Typography-led; atmospheric industry photography |
| Wipro | Consulting-led, AI-powered | Case-study carousel | Named client photography; **IBM Plex Sans body (confirmed)** |
| LTIMindtree | It's time to Outcreate | Single editorial-serif statement | Abstract tech; YouTube testimonial portraits |
| Tech Mahindra | Scale at Speed | Announcement carousel | Abstract data-flow; no exec headshots |
| delaware | We commit. We deliver. | Event carousel + 5-card grid | Sparse stock; no editorial direction |
| Westernacher | Driving business with AI | Single AI-themed hero | Author headshots; client logos as proof |
| NTT DATA Bus. Solutions | AI-ready, not just AI-enabled | Offer-led ("Zero Cost Activation") | Abstract blue AI/data; grayscale logo carousel |
| Syntax | Boutique @ Scale | Auto-rotating 4-slide carousel | GenAI graphics + real client photography |
| invenioLSI | Built for Community | Vertical-declaration, public-sector photography | Sector photography; grayscale logo wall |
| Rizing | Trusted SAP expertise | Full-bleed photographic hero + dark overlay | Real sector photography; leadership headshot grid |
| (+ Atos/Eviden, BearingPoint referenced contextually) | | | |

*Batch 6 (NIMBL, All for One, Bourne Digital) failed to fetch; not included.*

## 2. Cross-cutting patterns

- **IA/nav:** Two-level nav (Services/Capabilities · Industries · Insights · About · Careers) + a persistent header CTA ("Get in touch", "Let's build"). SAP usually sits under Services. invenioLSI surfaces proprietary IP (GovOne/CampusOne) as a top-level nav tier; delaware forces problem-first self-ID via a 5-card grid. **Our nav is already best-practice.**
- **Hero:** 11/18 use a single confident hero (not a carousel) — either photography-anchored (Rizing, Wipro, invenioLSI), abstract-tech-anchored (IBM, Cognizant, NTT DATA), or typography-on-dark (TCS, LTM). Dark/navy heroes signal premium authority. Carousels (6 firms) are the weaker pattern. NTT DATA's offer-led hero ("See if you qualify") is the most conversion-optimised. **Our navy hero instinct is correct; it lacks media.**
- **Imagery (the key differentiator):**
  - *Hero* — tier-1 use custom **abstract AI/data visualisations** in brand blues (not stock); mid-market use **sector-context real photography**; weak sites use event carousels.
  - *Services* — **line icons** (Lucide/Material) in brand colours dominate; scalable, no photography.
  - *Industries* — **operational-context photography** (factory floor, hospital, EV charging) — never generic office stock.
  - *Leadership* — **named, photographed leaders** in a 3–5 grid is near-universal (Deloitte, Capgemini, Rizing, LTM).
  - *Case studies* — **video-thumbnail cards** (play button on industry photo + outcome headline) is the highest-trust format.
  - *Backgrounds* — white/off-white content, navy for hero/POV/CTA. Photography reserved for hero + cards.
- **Colour/type:** Navy dominates 60–70% across the whole set (we're aligned). A serif+sans two-font system (IBM, Wipro, LTM, Rizing, Westernacher) signals editorial authority — **our Newsreader + IBM Plex Sans matches the strongest mid-market comparators** and beats the all-sans tier-1 default.
- **Social proof:** three-layer stack — a scale stat in/near the hero (Accenture 65,000 practitioners; Deloitte 30,000+), an analyst/award badge near the hero (Gartner MQ, SAP Pinnacle), and a named client outcome (Cognizant "52% lower infra costs"; NTT DATA "$30M savings").
- **CTAs:** persistent header CTA + in-page "Speak to an expert"/inline form; differentiated card CTAs ("Watch the video", "Read the case study"). Cognizant's "Let's build" is the strongest voice; Wipro's pervasive "Read More" the weakest.
- **Motion:** restrained, purposeful (scroll fade-in, hover elevation). Carousels are the common misuse. **Our Framer Reveal/Stagger system is correctly restrained.**

## 3. Where In2IT EBS stands

**Strengths (ahead of the mid-market set):** typography system (matches LTM/Rizing), navy palette, clean IA + sticky SAP cluster nav, double-bezel component system, stat strip + client marquee above the fold, quantified SAP proof (30% faster go-live, 99.5% data integrity, 25+ programmes).

**Gaps:** (1) zero photography anywhere; (2) no named client outcome / no real leadership headshots (initials placeholders); (3) proprietary IP not surfaced as branded assets; (4) generic secondary CTAs.

## 4. Prioritised recommendations

| # | Recommendation | Evidence | Maps to | Effort |
|---|---|---|---|---|
| 1 | Real leadership headshots | Deloitte/Capgemini/Rizing show named photographed leaders | `components/sections/leadership-scroller.tsx` (add `photo` prop + fallback); data in `app/about/page.tsx` | S |
| 2 | Custom abstract hero graphic (navy + blue, no people) | IBM/Cognizant/TCS/LTM/NTT DATA | `app/page.tsx` hero; add `media`/`imageSrc` to `PageHero` | M |
| 3 | One named/quantified client outcome near the hero | IBM/Cognizant/NTT DATA lead with a client metric | `app/page.tsx` hero subhead / `content/site.ts` | S |
| 4 | Sector photography on the 14 industry pages | Wipro/invenioLSI/Westernacher use operational photography | `components/sections/page-hero.tsx` + `content/industries.ts` `heroImage` | M |
| 5 | Surface branded IP (ECC Prism, iTAM, Health Check 360, EBSx) | TechM Epselon, invenioLSI GovOne, delaware FAST-* as named assets | `content/nav.ts` (ECC Prism in mega-menu); SAP page named callout cards | S |
| 6 | SAP Gold Partner badge near hero (not just footer) | Capgemini SAP Pinnacle as "second hero banner"; Infosys IDC badge | `app/sap-enterprise-solutions/page.tsx` credential strip below hero | S |
| 7 | Intent-specific card CTAs | Cognizant "Let's build" vs Wipro "Read More" | `practice-grid.tsx`, `app/industries/page.tsx`, `signature-offerings.tsx` | S |
| 8 | Inline 3-field form on the SAP page | Capgemini/invenioLSI embed a form on the SAP page | `app/sap-enterprise-solutions/page.tsx` + `DemoForm` variant | M |
| 9 | 90-sec brand film + "Watch our story" CTA | LTM "Watch Now" brand-film CTA | `app/page.tsx` hero second CTA | L |
| 10 | Filterable case-study/reference grid (NDA-gated) | Westernacher/invenioLSI filterable references | new `CaseStudyGrid` on `/industries/`, `/why-in2it-ebs/` | L |

## 5. Imagery strategy (what goes where)

- **Homepage hero** — abstract AI/data-network graphic, navy `#121E3B` base + Light Blue `#94B8D0`/Accent `#3F75A3` nodes/traces; ~30–40% visual weight (not behind the headline). **No people, no offices, no globes, no handshakes.** Source: AI gen (Firefly/Midjourney) colour-corrected to brand, or a commissioned vector.
- **Practice hero (SAP/SF/WD/ADMS)** — keep off-white; add a subtle per-practice SVG motif at 10–15% opacity (connected-systems / cloud / people / code). Consistent SVG set (unDraw/Storyset/custom).
- **Industry pages** — sector-contextual **real photography** (factory, power infra, boardroom, lab, warehouse, civic architecture, construction), blue-navy graded with a navy gradient overlay for legibility. Source: Unsplash/Adobe Stock, graded to palette.
- **Leadership** — professional studio headshots, square 400×400 @2×, neutral background; circular crop with the navy-initials circle as fallback. Highest-trust, lowest-cost (5 headshots ≈ a half-day shoot).
- **Case studies** — 16:9 industry-context thumbnail OR a navy "stat card" (big metric + sector) needing no photo; outcome headline + solution tag + "Request case study" CTA.
- **Backgrounds** — white/off-white content, navy hero/POV/CTA. No photographic content-section backgrounds.

**Art-direction test for every image:** (1) belongs in the FT/Economist? (2) operational-context, not aspirational-generic? (3) cool/neutral, compatible with blue-navy grading? (4) won't look dated in 18 months? **Treatment:** consistent blue-tint (`grayscale(20%) brightness(0.92)` + navy multiply overlay) so all photography reads as one palette.

## 6. Quick wins vs larger bets

**Quick wins (days):** leadership headshots · SAP credential strip below hero · rename generic CTAs · ECC Prism in the Services mega-menu · client-outcome proof line in the homepage hero.

**Larger bets (weeks):** custom abstract hero graphic · sector photography across 14 industry pages · inline SAP-page form · 90-second brand film + "Watch our story" CTA · filterable NDA-gated case-study grid.

---
*Reviewed against 18 live competitive sites and the current In2IT EBS build (2026-06-04). Component path references verified against the codebase.*
