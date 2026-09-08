# SEO Strategy

## Purpose
Defines the search and discoverability strategy for the In2IT EBS website build: target keyword/topic groupings, metadata standards, structured data, on-page SEO conventions, and the redirect map from old URLs to new ones. This file governs the work of the SEO & Conversion Agent (Step 11) and is consumed by the Frontend Build and Deployment steps to ensure no search equity or inbound links are lost during the rebuild.

## Inputs Required
- Approved Information Architecture and final URL structure (from Step 5).
- Final website copy and page titles (from Step 6).
- Old URL inventory and existing `sitemap.md` in the `scraped/` secondary source (for redirect planning).
- `local-seo-pages.md`, `city-pages.md`, and `expert-advice.md` from the secondary source (for local/topical discoverability planning only — content Pending extraction).
- Confirmed service, industry, and partner taxonomy aligned to the Corporate Profile deck (Pending extraction).
- Human input on priority markets, languages, and primary conversion intents.

## Owner Agent
SEO & Conversion Agent

## Completion Criteria
- Keyword/topic clusters mapped to each page or page template, consistent with the deck and IA.
- Metadata standards defined (title tag, meta description, canonical, Open Graph/social card patterns) with character/length rules.
- Structured data (schema.org) types selected per page type (e.g. Organization, Service, BreadcrumbList) with required fields listed.
- On-page conventions documented (heading hierarchy, internal linking, image alt-text policy, URL slug rules).
- Complete old-to-new redirect map (301s) covering every retired URL, with a verification method.
- XML sitemap and robots policy defined.
- No keyword, claim, or page assertion contradicts or omits a meaningful point from the Corporate Profile deck.

## Current Status
Not Started

## Pending Items
- Keyword and topic research: Pending extraction (deck-derived themes) and Pending human input (priority terms/markets).
- Old URL inventory and 301 redirect map to be built from the secondary-source `sitemap.md` and scraped page set: Pending extraction.
- Metadata templates per page type: Pending human input on tone and brand naming conventions.
- Structured data field values (e.g. organization details): Pending extraction from the deck.
- Decision on hreflang/multi-language handling: Pending human input.

## Open Questions
- Which geographic markets and languages should SEO prioritise?
- Should the existing local/city SEO pages be retained, consolidated, or retired in the new IA?
- Who is the authoritative owner for the canonical domain and any legacy domains requiring redirects?
- Are there current high-traffic or high-value old URLs that must be preserved as exact redirects?
