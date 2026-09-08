# Industry → Client-Logo Map (deck-derived, cross-verified)

> **Logos come from the deck only** (SOT-42 / SOT-43 sector groupings), **cross-verified** against `.remember/tmp/logo_results.json` (the extraction artifact that records each client's deck sector). Old-site "Our Customers" lists are **NOT** used for logos — they list names not in the deck. Page **body** content comes from the matching old-site industry page (owner direction: deck-silent content follows the old website). Logos render from `assets/deck-clients/` (curated) — see asset note below.
> **Status:** Final mapping (cross-verified 2026-06-03).

## Cross-verification result
- ✅ All SOT-42/43 client→sector assignments confirmed against `logo_results.json`.
- ✅ **Cross-listed clients (deck shows them under two sectors → display on both pages):** OMC and NALCO → *Metals & Mining* + *PSUs*; WeWork and Kolte-Patil → *Infra & Housing* + *Real Estate*; Brickwork India → *Infra & Housing* + *Services & BFSI*.
- ⚠ **Excluded — not real clients (deck misreads):** the `"We"` fragments on both slides; `LTB` (Automotives). Not in the verified data; do not publish.
- ⚠ **Confirm visually before publishing the logo:** `Human Health` (matched a wrong/US-HHS logo in extraction), and any `[?]` low-confidence names.
- ⚠ **Asset note:** logos were extracted to `assets/deck-clients/` (raw, by position) and a subset resolved to clean Wikimedia files in `assets/logos/clients/`. Curate to transparent, consistently-sized files in the build; some "resolved" matches (Tata MD, NALCO, Vedanta photos) need a proper logo.

## Industry pages — body + deck logos

| Industry page | Deck sector(s) → logos | Body source (old site) |
|---|---|---|
| **Automobiles** | Automotives: Hero, Triveni Turbines, Tata BlueScope Steel, Denso, Shyam Steel, MG Motor, Wipro, Trident Group, ARAI, Kirloskar Electric, PCBL | `automobiles.md` |
| **FMCG / Food & Beverages** | Food & Beverages: Mrs Bectors, Cremica, Ajinomoto, Bio Pharma Services, WayCool, BreadTalk, Vahdam | `fmcg.md` |
| **Healthcare & Life Sciences** | Health & Pharma: Avra, Sentiss, Unichem, Manipal Hospitals, Centrient, St John's, ZCL Chemicals, Aknamed, Tata MD, Natural Remedies (+ Human Health [?]) | `healthcare-life-science.md` |
| **Textiles & Apparel** | Apparel & Fashion: Bata, Rasasi, Welspun Flooring, RP Apparels, Vishal, Vardhman | `textiles.md` (+ `retail-ecommerce.md`) |
| **Metals, Mining & Heavy Engineering** | Metals & Mining: Arjas Steel, S R Rungta Group, OMC*, Welspun Corp, Jindal Steel & Power, NALCO*, Vedanta, JSW | `heavy-engineering.md` |
| **Chemicals & Fertilizers** | Chemicals: Valvoline, Deepak Fertilisers, Gharda Chemicals, Gulbrandsen, MCPi | `chemical-fertilizers.md` |
| **Engineering & Construction (ECNO)** | Infra & Housing: Welspun One, Wipro Infrastructure, WeWork*, AFCONS, GROHE, Kolte-Patil*, Brickwork India* | `engineering-constructions-ecno.md` |
| **Real Estate** | Real Estate: Kolte-Patil*, WeWork*, AIPL, Pavai, Anarock, Varindera Constructions, Panchshil | `engineering-constructions-ecno.md` (real-estate sub) |
| **Banking, Financial Services & Insurance** | Services & BFSI: NCDEX, Brickwork India*, Narayan Seva Sansthan, Groww, NIIT, Pos Malaysia, Trilegal, Cyril Amarchand Mangaldas | `banking.md` |
| **Government & Public Enterprises (PSUs)** | PSUs: NALCO*, OMC*, Kenya Railways, AP Transco, Delhi Transco, NTPC, BSNL, BHEL | `government.md` |
| **IT & Professional Services** | IT & Professional Services: OLA, Tredence, ShareChat, AVASO, Wissen, altivate, Innovaccer, Responsive, Evoke, Accion Labs, Redington, Microland | `professional-services.md` |
| **Energy & Utilities** | *(no dedicated deck client sector — energy PSUs show under PSUs)* — **no separate logos** | `energy-and-utilities.md` |
| **Media & Telecom** | *(no dedicated deck client sector — BSNL shows under PSUs)* — **no separate logos** | `telecom.md` |

`*` = cross-listed (deck places the client in two sectors; show on both pages).

## "Other sectors" (deck SOT-43 "Others")
Orient Cement, Physics Wallah, JK Paper, Bajaj Allianz, InLife — surfaced as an **"Other sectors" logo strip on the Industries index** (`/industries/`), not a dedicated page (the deck groups them as "Others").

## Rule
A logo appears on an industry page **only** if the deck places that client in the corresponding sector. No client is added from the old site or by inference.
