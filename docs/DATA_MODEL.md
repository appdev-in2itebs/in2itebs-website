# Data Model

## Purpose
Defines the content/data structures behind the In2IT EBS website: entity types, field schemas, relationships, and how each is sourced and modelled. Gives the build a structured, reusable content layer instead of hard-coded page content. Drawn from the Source of Truth (Step 2), IA (Step 5), and Copy (Step 6).

## Inputs Required
- `CONTENT_SOURCE_OF_TRUTH.md` (entities, fields, authoritative figures) — **met.**
- `INFORMATION_ARCHITECTURE.md` (page types: entity-driven vs static) — **met.**
- `COPY_GUIDELINES.md` + `docs/copy/*` (field-level content) — **met.**
- `docs/copy/industry-client-map.md` + `assets/logos/MANIFEST.md` (client↔sector + logo files) — **met.**
- Platform direction — **resolved (plan-mode):** Next.js App Router + TypeScript, **in-repo typed/MDX content, no CMS** (Vercel hosting).

## Owner Agent
Data Model Agent

## Current Status
Needs Review

---

## 1. Platform & modelling approach
**No CMS.** Content lives in-repo as **typed TypeScript modules** (structured data) + **MDX** (long-form bodies), validated with a schema layer (e.g. Velite/Contentlayer or Zod-checked `content/`). Pages are React Server Components reading from these collections. Authoritative metrics live once in `site.ts` and are referenced, never duplicated.

**Proposed `content/` layout**
```
content/
  site.ts                 # singleton: stats, certs, socials, copyright, regions
  nav.ts  redirects.ts     # navigation + 301/410 map
  practices/*.mdx          # SAP, Salesforce, Workday, ADMS (+ ecc-prism)
  practice-clusters.ts     # SAP six clusters (anchors + blocks)
  delivery.ts              # tiers, engagement models, footprints, methodology/phases
  signature-offerings.ts   # Packaged S/4, AI Health Check, Converged Intelligence
  industries/*.mdx         # 13 industry bodies
  clients.ts               # client records (name, sectors[], logo, status)
  partners.ts certifications.ts
  offices.ts regions.ts    # contact entities + region selector
  insights/*.mdx           # articles
  careers.ts               # openings (or live feed)
  legal/*.mdx              # privacy notice/policy, disclaimer
```

## 2. Entities & field schemas
Types shown as TypeScript. `Ref<T>` = slug/id reference. `sot` = provenance (deck slide ID).

### 2.1 SiteConfig (singleton) — `site.ts`
Source: deck (SOT-02/45). Authoritative values live **only** here.
```ts
interface SiteConfig {
  stats: Stat[];                 // 10+ yrs, 350+ employees, 150+ customers, 30+ countries, 14+, 12+, 12+, 10+
  certifications: Ref<Certification>[];
  social: { youtube: string; x: string; linkedin: string; instagram: string }; // old-site URLs
  copyrightYear: 2026;
  primaryEmail: "info@in2itebs.com";
  regions: Ref<Region>[];        // IN, KE, ZA, ME
}
interface Stat { value: string; label: string; sot: string } // value e.g. "350+", "10+"
```
> Authoritative figures (LEGAL_REVIEW Item 5): **350+ employees, 300+ SAP consultants, 10+ years.** Never render 550+/"a decade".

### 2.2 Region — `regions.ts`
Source: Step-3 decision. Drives the region selector (content emphasis only; gates no deck content).
```ts
interface Region { code: "IN"|"KE"|"ZA"|"ME"; name: string;
  email: string;            // info@in2itebs.com / .co.ke / .co.za / .ae
  foregroundedOffices: Ref<Office>[]; }
```
Note: Singapore & USA entities exist as Offices but are **not** region-selector options.

### 2.3 Office / Entity — `offices.ts`
Source: **addresses = deck (SOT-45)**; **email/phone = old site**.
```ts
interface Office {
  slug: string; name: string; legalEntity: string;
  kind: ("india-office"|"global-entity"|"delivery-centre")[];
  address?: string;         // deck text (SOT-45) for the 4 India offices + entities
  city: string; country: string;
  email?: string; phone?: string;   // from old site
  region?: Ref<Region>;
}
```
Delivery centres (SOT-03, 10+ cities) are Offices with `kind` including `delivery-centre`.

### 2.4 Practice — `practices/*.mdx`
Source: deck (SOT-04, 07–36). SAP uses clusters; others are sectioned.
```ts
interface Practice {
  slug: "sap-enterprise-solutions"|"salesforce"|"workday"|"application-development-managed-services";
  name: string; hero: { headline: string; accentWord: string; subhead: string };
  overview: string; clusters?: Ref<PracticeCluster>[]; // SAP only
  body: MDX; sots: string[]; relatedIndustries: Ref<Industry>[];
}
interface PracticeCluster { id: string; /* anchor e.g. core-erp-s4hana */ name: string; blocks: ContentBlock[]; sots: string[] }
```
ECC Prism = a sub-page Practice-like record (`ecc-prism`) linked under SAP; **no claims beyond deck** until owner supplies detail.

### 2.5 Delivery — `delivery.ts`
Source: SOT-05/06/37–41.
```ts
interface Tier { n: 1|2|3; name: string; items: string[] }            // SOT-05
interface EngagementModel { name: string }                            // SOT-06 (5)
interface DeliveryFootprint { name: string }                          // SOT-06 (3)
interface MethodologyLayer { n: number; name: string; detail: string } // FastForward SOT-38
interface TransitionPhase { name: string; weeks: string; activities: string[] } // AMS SOT-39
```

### 2.6 SignatureOffering — `signature-offerings.ts`
Source: SOT-24/14/27.
```ts
interface SignatureOffering { slug: string; name: string; summary: string; metric?: string; sot: string }
```

### 2.7 Industry — `industries/*.mdx`
Source: **body = old site** (per `industry-client-map.md`); **clients = deck sectors**.
```ts
interface Industry {
  slug: string; name: string;
  hero: { headline: string; accentWord: string; subhead: string };
  body: MDX;                       // from matching old-site page (reworded)
  bodySource: string;              // e.g. "automobiles.md"
  deckSectors: DeckSector[];       // which deck sector(s) feed this page
  clients: Ref<Client>[];          // DERIVED: clients whose sectors ∩ deckSectors
}
type DeckSector = "Food & Beverages"|"Health & Pharma"|"Apparel & Fashion"|"Metals & Mining"
  |"IT & Professional Services"|"Infra & Housing"|"Automotives"|"Chemicals"|"PSUs"
  |"Services & BFSI"|"Real Estate"|"Others";
```

### 2.8 Client — `clients.ts`
Source: **deck SOT-42/43**, cross-verified (`logo_results.json`). Drives logo walls.
```ts
interface Client {
  slug: string; name: string;
  sectors: DeckSector[];           // 1–2 (cross-listed clients have 2)
  logo?: string;                   // assets/logos/clients/* if high-quality
  logoStatus: "high-quality"|"deck-fallback"|"deck-sourced";
  lowConfidence?: boolean;         // e.g. Human Health [?]
  sot: "SOT-42"|"SOT-43";
}
```
> **Rule:** a Client appears on an Industry **only** if `client.sectors ∩ industry.deckSectors ≠ ∅`. Excluded misreads ("We", LTB) are not records. ~85 clients; 55 high-quality logos, rest deck-fallback (`MANIFEST.md`).

### 2.9 Partner / Alliance — `partners.ts`
Source: SOT-02/04. Shown on Why In2IT EBS (`#alliances`) + footer/credentials.
```ts
interface Partner { slug: string; name: string; logo?: string;
  kind: "alliance"|"sap-tier"; claim?: string; sot: string }
```
SAP tier claims (Gold, RISE/BTaaS, PCE, Co-Innovation) = `kind:"sap-tier"` (verify currency — LEGAL_REVIEW Item 2).

### 2.10 Certification — `certifications.ts`
Source: SOT-02/45. CMMI · ISO 9001 · ISO 27001 (verify validity — LEGAL_REVIEW Item 3).
```ts
interface Certification { slug: string; name: string; logo?: string; sot: string }
```

### 2.11 Insight (article) — `insights/*.mdx`
Source: **old site** `/news/` (additive). Refresh dates.
```ts
interface Insight { slug: string; title: string; date: string; author?: string;
  category: "SAP"|"SuccessFactors / HR"|"AI"|"Industry"|"Company news";
  excerpt: string; body: MDX; related: Ref<Insight>[] }
```

### 2.12 JobOpening — `careers.ts`
Source: **old site / live ATS** (additive). Data refreshed at launch; modelled, not hard-coded copy.
```ts
interface JobOpening { slug: string; title: string; locations: string[];
  type: "full-time"|"walk-in"; applyHref: string }
```

### 2.13 LeadForm (demo form schema) — component config
Source: Step-3 decision. Submits to `info@in2itebs.com`.
```ts
interface LeadForm { fields: ["name","workEmail","company","region","interestArea","message"];
  interestArea: ("SAP"|"Salesforce"|"Workday"|"ADMS")[]; recipient: "info@in2itebs.com";
  onSuccess: "/thank-you/" }
```

### 2.14 NavItem / Redirect — `nav.ts`, `redirects.ts`
Source: IA §3–4.
```ts
interface NavItem { label: string; href: string; children?: NavItem[] }
interface Redirect { from: string; to: string; status: 301|410 }   // full map = IA §4 + Step 11
```

### 2.15 Gated / withheld entities (modelled, not published)
- **CaseStudy** — NDA/on-request (SOT-43). No public body; render a "Request under NDA" CTA only.
- **Testimonial** — exists but **gated**: only deck-sourced or separately consented quotes (no blanket carousel). Default off until consent confirmed.

## 3. Relationships (summary)
- `Practice 1—* PracticeCluster` (SAP).
- `Industry *—* Client` via `deckSectors ∩ sectors` (cross-listed clients resolve to multiple industries).
- `Region 1—* Office` (foregrounded); Offices also typed as delivery-centre (SOT-03).
- `SiteConfig 1—* Stat | Certification | Region`.
- `Insight *—1 Category`; `Insight *—* Insight` (related).
- `Practice *—* Industry` (relatedIndustries cross-link).

## 4. Content source per entity
| Source | Entities |
|---|---|
| **Deck (primary)** | SiteConfig/Stats, Practices, PracticeCluster, Delivery, SignatureOffering, Client, Partner, Certification, Office addresses |
| **Old site (additive)** | Industry bodies, Insight, JobOpening, Legal, Office email/phone, social URLs |
| **Human-supplied / live** | Leadership bios, live job openings, imagery, testimonial consents, verified ECC Prism detail |

## 5. Maintenance (no CMS)
All content is edited in-repo (PRs). Time-sensitive sets — **Insights** and **JobOpenings** — change most; either curated via repo edits or wired to a future feed. Authoritative stats centralised in `site.ts`. Logo curation per `MANIFEST.md`.

## Step output (governance-mandated)
1. **Completed:** Entity inventory + TS field schemas + relationships + per-entity source mapping + in-repo (no-CMS) modelling approach + `content/` layout. Covers every entity-bearing page in the IA; authoritative figures centralised.
2. **Needs review:** Owner confirmation of the `content/` layout and the schema tooler (Velite vs Contentlayer vs plain typed + Zod).
3. **Assumptions:** No CMS (plan-mode); MDX for long-form; clients derived to industries by deck-sector membership; openings/insights refreshed in-repo.
4. **Open questions:** below.
5. **Proceed?** Yes — feeds Component Spec (Step 9), the **last** gated doc before build (Step 10).

## Open Questions
- Schema/content tool: **Velite**, **Contentlayer**, or plain typed modules + **Zod** validation?
- Should **Insights/Careers** be repo-managed at launch, or wired to an external feed/ATS (job openings change often)?
- Confirm no CMS for v1 (matches plan-mode) — or is a lightweight editor needed for Insights post-launch?
- Who owns ongoing maintenance per entity (stats, openings, insights, logos) after launch?
