# Component Specification

## Purpose
Defines the component architecture for the In2IT EBS build: the inventory of reusable components, their props, variants, states, data sources, page mapping, and accessibility behaviour. Composes the Design System tokens (Step 7) and Data Model entities (Step 8) into the IA page outlines (Step 5) so the Frontend Build (Step 10) assembles pages from a known, consistent set. **References** tokens/entities rather than restating them.

## Inputs Required
- `INFORMATION_ARCHITECTURE.md` (page types/blocks) — **met.**
- `DESIGN_SYSTEM.md` (tokens) — **met.**
- `DATA_MODEL.md` (entities) — **met.**
- `COPY_GUIDELINES.md` + `docs/copy/*` (component content/CTA) — **met.**
- `scraped/wireframe.md`, `scraped/site-chrome.md` (secondary UI patterns) — **met.**

## Owner Agent
Component Architecture Agent

## Current Status
Needs Review

## Conventions
- Next.js App Router; React Server Components by default, client components only where interaction requires (`'use client'` noted). Tailwind + `DESIGN_SYSTEM.md` tokens. Icons: **Lucide**. Motion: Framer Motion (subtle; respects `prefers-reduced-motion`). Buttons: **8px radius**.
- States: `default · hover · focus-visible · active · disabled · loading · empty · error`.
- Every interactive component has a visible focus ring + keyboard support (WCAG 2.2 AA).
- Headlines take an `accentWord` rendered **Newsreader italic, Accent Blue** (the `*asterisk*` word in copy files).

---

## 1. Primitives (atoms)
| Component | Key props | Variants | States / a11y | Data |
|---|---|---|---|---|
| `Button` | `variant,size,href?,iconLeft?,iconRight?,loading` | `primary` (navy/white), `secondary` (navy outline), `ghost` | all states; `loading`→spinner+`aria-busy`; `<a>` or `<button>` | — |
| `Link` | `href,external?` | `inline` (accent blue, hover underline), `nav`, `footer` | focus ring; external→`rel=noopener`+icon | — |
| `Heading` | `level,accentWord?` | `display,h1–h3` (Newsreader) | semantic; one `h1`/page | — |
| `Label` | — | letter-spaced caps (IBM Plex) | decorative | — |
| `Tag`/`Badge` | `tone` | navy/light-blue/sand | — | SAP tier tags |
| `Icon` | `name,size` | Lucide | `aria-hidden` unless standalone | — |
| `Logo` | `variant,markOnly?,asLink?` | `navy`/`light-blue`/`white` | `<img alt="In2IT EBS">`; variant by background | brand SVGs |
| `Stat` | `value,label` | — | number Newsreader, label caps | `Stat` |
| `Field` | `type,name,label,required,error` | text/email/select/textarea | label+`aria-describedby`; required marked | LeadForm |

## 2. Molecules
| Component | Props | Variants | States / a11y | Data |
|---|---|---|---|---|
| `NavDropdown` `'use client'` | `label,items[]` | mega (Services) / simple (About) | arrows/Esc/roving focus; `aria-expanded` | `nav.ts` |
| `RegionSwitcher` `'use client'` | `regions,current` | — | listbox; persists (cookie); **content emphasis only, gates nothing** | `Region` |
| `SearchBox` `'use client'` | `onQuery` | header/inline | `role=search`, label | site index |
| `Breadcrumb` | `trail[]` | — | `nav[aria-label=Breadcrumb]` + `BreadcrumbList` schema | route |
| `Card` | `as,media?,title,body,href?` | base/practice/industry/insight/offering | subtle hover elevation | varies |
| `ClientLogo` | `client` | `high-quality`/`deck-fallback` | `alt`=name; lazy; optional mono→colour hover | `Client` |
| `OfficeCard` | `office` | india-office/global-entity/delivery-centre | address=deck, email/phone=old site | `Office` |
| `Accordion` `'use client'` | `items[]` | FAQ | `aria-expanded`, keyboard | — |
| `Pagination` | `page,total` | — | `aria-current` | Insights |
| `JobRow` | `job` | — | → detail/apply | `JobOpening` |
| `InsightCard` | `insight` | — | date,category,excerpt | `Insight` |

## 3. Organisms
| Component | Composition / notes | Data | Pages |
|---|---|---|---|
| `Header` `'use client'` | Logo(navy) · primary nav (Services mega→SAP/Salesforce/Workday/ADMS/Delivery Excellence; Industries; Why; About→Who We Are/Insights/Careers; Contact) · `Button` "Book a discovery workshop" · `RegionSwitcher` · `SearchBox`. Sticky; mobile hamburger→accordion. **No floating Buttonizer.** | `nav.ts`,SiteConfig | all |
| `Footer` | Navy bg; columns Company/Practices/Legal/Contact; `NewsletterForm`; socials (old-site URLs); `CertStrip`; "© 2026"; Logo(light-blue/white). | SiteConfig | all |
| `Hero` | `home-xl`/`practice`/`industry`/`simple`; headline+accentWord, subhead, CTAs, optional media (white-logo/overlay rules). | copy | per page |
| `StatBand` | from SiteConfig stats (350+/300+/10+ authoritative) | `Stat[]` | Home, About |
| `PracticeClusterSection` + `ClusterNav` | anchored section (`id`) + in-page anchor nav (SAP six clusters) | `PracticeCluster` | SAP |
| `LogoWall` | grid; deck-fallback; optional grayscale | `Client[]` | Home, Industries index |
| `IndustryClientWall` | derives clients via `sectors ∩ deckSectors`; cross-listed appear on both | `Industry`→`Client[]` | Industry pages |
| `DemoForm` `'use client'` | Name·Work email·Company·Region·Interest area(SAP/SF/WD/ADMS)·Message; honeypot; submit→`info@in2itebs.com`; →`/thank-you/` | LeadForm | Contact + CTAs |
| `NDARequestPrompt` | "Request case studies under NDA" → form; **no case-study detail** | — | Industries, Industry |
| `TierModel` / `EngagementModels` | 3 tiers; 5 models / 3 footprints | delivery.ts | Services, Delivery |
| `MethodologyLayers` / `AMSTransitionTimeline` / `FactoryWorkflow` | FastForward 4 layers; 5-phase/16-wk timeline; Plan→Build→Run | delivery.ts | Delivery (+SAP/Why) |
| `SignatureOfferingTrio` | Packaged S/4 · AI Health Check · Converged Intelligence | `SignatureOffering` | Home, SAP |
| `ThreeReasons` | Partnership depth · Delivery economics · Accelerated outcomes | SOT-44 | Why, Home |
| `AllianceStrip` / `CertStrip` | alliances+SAP tiers; CMMI/ISO/SAP | `Partner`,`Certification` | Why/Home/About, Footer |
| `FootprintList` | 10+ delivery centres + countries | `Office` | About, Delivery |
| `LeadershipGrid` | additive; names/titles pending owner | human-supplied | About |
| `InsightsList` / `ArticleLayout` | index+pagination+categories; article body+related+share+soft CTA | `Insight` | Insights |
| `CareersList` | live openings; native apply | `JobOpening` | Careers |
| `LegalDoc` | long-form + table of contents | legal MDX | Legal |
| `CookieConsentBanner` `'use client'` | **opt-in**; gates analytics/marketing tags until accept | — | all (Step 11) |
| `SkipLink` / `BackToTop` | skip-to-content; long-page back-to-top | — | all |

## 4. Page templates (IA → composition)
| Template | Route | Organisms (in order) |
|---|---|---|
| `HomeTemplate` | `/` | Hero(home-xl)→StatBand→PracticeTrio→SignatureOfferingTrio→ThreeReasons→LogoWall→AllianceStrip/CertStrip→InsightsTeaser→DemoForm CTA |
| `ServicesHubTemplate` | `/services/` | Hero→TierModel→EngagementModels→PracticeCards→Delivery link→CTA |
| `PracticeTemplate` (SAP) | `/sap-enterprise-solutions/` | Hero→Overview→3-lenses→6×PracticeClusterSection+ClusterNav→POV→ECC Prism link→CTA |
| `PracticeTemplate` (SF/WD/ADMS) | `/salesforce/`,`/workday/`,`/application-development-managed-services/` | Hero→Overview→Capability sections→Engagement/Services→CTA |
| `IndustryIndexTemplate` | `/industries/` | Hero→industries grid→how-it-works→"Other sectors" LogoWall→NDARequestPrompt→CTA |
| `IndustryTemplate` | `/industries/<industry>/` | Hero→Body(old-site)→IndustryClientWall(deck logos)→CTA |
| `DeliveryExcellenceTemplate` | `/delivery-excellence/` | Hero→MethodologyLayers→TierModel/EngagementModels→AMSTransitionTimeline→FactoryWorkflow→CTA |
| `WhyTemplate` | `/why-in2it-ebs/` | Hero→ThreeReasons→AllianceStrip→POV→CTA |
| `AboutTemplate` | `/about/` | Hero→StatBand→FootprintList→LeadershipGrid→CertStrip→links→CTA |
| `ContactTemplate` | `/contact/` | Hero→DemoForm→OfficeCards→contact details→CertStrip |
| `InsightsIndex`/`ArticleLayout` | `/insights/` | InsightsList / ArticleLayout |
| `CareersTemplate` | `/careers/` | Hero→culture→CareersList→gallery→CTA |
| `LegalTemplate` | `/legal/*` | LegalDoc(TOC) |
| `ThankYouTemplate` | `/thank-you/` | confirmation + onward links |

## 5. Cross-cutting
- **Responsive:** mobile-first; header→hamburger; grids reflow to 1-col; logo walls wrap.
- **Motion:** subtle entrance fades/slides (≤16px); off under `prefers-reduced-motion`.
- **A11y:** SkipLink, focus-visible, keyboard menus/accordions, `alt` on every logo, breadcrumb + heading order, AA contrast (Accent-Blue small text validated Step 12).
- **Performance:** RSC default; `next/image` (WebP/AVIF, `srcset`); lazy-load below-fold logo walls; single icon set; no unused libs (fixes old-site bloat).

## Step output (governance-mandated)
1. **Completed:** Inventory of primitives, molecules, organisms, and page templates with props/variants/states, each mapped to a Data Model entity and IA page, plus a11y/responsive/motion/perf rules. Every IA page block has a component.
2. **Needs review:** Owner/tech-lead confirmation of component boundaries; `DemoForm` anti-spam method; whether header search ships in v1.
3. **Assumptions:** Next.js RSC + Lucide + Framer Motion (Steps 7–8); region switcher is client-side, content-only.
4. **Open questions:** below.
5. **Allowed to proceed?** **Yes — the Coding Gate is now SATISFIED.** All eight gated docs exist: CONTENT_SOURCE_OF_TRUTH, CONTENT_PARITY_CHECKLIST, OLD_WEBSITE_UX_INSIGHTS, INFORMATION_ARCHITECTURE, COPY_GUIDELINES, DESIGN_SYSTEM, DATA_MODEL, COMPONENT_SPEC. **Step 10 (Frontend Build) may begin after human review/sign-off of the gate docs.**

## Open Questions
- `DemoForm` anti-spam: honeypot only, or add a privacy-friendly captcha (e.g. Cloudflare Turnstile)?
- Header **search** in v1, or defer post-launch?
- Any house component conventions/library to follow before scaffolding?
