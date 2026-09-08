# In2IT EBS — Structural Wireframe & Workflow

A page-by-page blueprint of how the site is currently composed, intended as a reference for the revamp. Each block below shows section order and the key elements per template — not the literal copy. Where pages share a template, only one wireframe is drawn and the variants are listed below it.

---

## 1. Global chrome (every page)

```
┌────────────────────────────────────────────────────────────────────────┐
│ HEADER                                                                  │
│ ┌──────────┐  ┌─────────────────────────────────────────┐  ┌─────────┐ │
│ │ LOGO     │  │ Home  Services▼  Industries▼  Partners▼ │  │ IN│KN│ZA│ │
│ │ In2IT EBS│  │ About▼  Contact  Career▼                │  │  + CTA  │ │
│ │ (Gold    │  └─────────────────────────────────────────┘  │ Talk to │ │
│ │  Partner)│                                                │  Us     │ │
│ └──────────┘                                                └─────────┘ │
└────────────────────────────────────────────────────────────────────────┘
                                  ⋮ (page-specific content) ⋮
┌────────────────────────────────────────────────────────────────────────┐
│ "LOOKING FOR DIGITAL TRANSFORMATION?"  ───────  [ Talk to Us ]          │
├────────────────────────────────────────────────────────────────────────┤
│ FOOTER                                                                  │
│  Our Company         Contact           7 Office Cards (carousel)        │
│  • About Us          info@in2itebs.com  ┌────┐ ┌────┐ ┌────┐ ┌────┐    │
│  • Meet our Team     HQ address         │ BLR│ │ MAA│ │ BBI│ │ SGP│ …  │
│  • Our partners                         └────┘ └────┘ └────┘ └────┘    │
│  • Our Awards                                                           │
│  • Latest News                                                          │
│  • Privacy Notice                                                       │
│  • Privacy Policy                                                       │
│  • Disclaimer                                                           │
│                                                                         │
│  [ Subsrcibe for Latest News and Resources ]   [ email ▢ ]              │
│                                                                         │
│  © 2022 In2IT EBS · YouTube · X · LinkedIn · Instagram                  │
└────────────────────────────────────────────────────────────────────────┘
```

### Mega-menu structure
- **Services** → 7 columns: SAP Enterprise · Analytics · Cloud HCM · Cloud Infra · Other Enterprise · Cyber Security · Digital · Data & AI (27 leaf links)
- **Industries** → flat list of 14
- **Partners** → flat list of 10
- **About** → Who We Are · Our Leadership · Accreditation · Customer Stories · Blogs & Articles
- **Career** → Our Culture · Events & Celebrations · Current Openings

### Floating element
- "Buttonizer" floating CTA (bottom-right) — currently behaves as another "Talk to Us"

---

## 2. Homepage `/`

```
HEADER
┌────────────────────────────────────────────────────────────────────┐
│ HERO SLIDER (Slider Revolution)                                     │
│  Slide 1: Digital Transformation        [ Know More ]               │
│  Slide 2: SAP for Sure (RISE)           [ Know More ]               │
│  Slide 3: SuccessFactors                [ Know More ]               │
│  Slide 4: ADMS                          [ Know More ]               │
└────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────┐
│ FEATURED EVENT BANNER                                               │
│  SAP NOW AI Tour – Mumbai · 23 Apr 2025 · Jio Centre  [Register Now]│
└────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────┐
│ WHO WE ARE                                                          │
│   "We Connect, Explore, Create, Empower, Grow Together"             │
│   Vision · Mission · Purpose · Values · Support (24/7)              │
└────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────┐
│ STATS STRIP (8+ yrs · 12 solutions · 14+ verticals · 500+ emp ·     │
│              150+ customers · 10+ partners · 50+ add-ons · 30+ locs)│
└────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────┐
│ DIAMOND PARTNER  ─  [ SAP logo ]                                    │
└────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────┐
│ SERVICES WE OFFER                                                   │
│   ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                              │
│   │RISE  │ │SF    │ │SAC   │ │Grow  │ … 7 cards                    │
│   └──────┘ └──────┘ └──────┘ └──────┘                              │
└────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────┐
│ INDUSTRIES WE FOCUSED  ─  14 icon tiles in a grid                   │
└────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────┐
│ OUR PARTNERS  ─  logo carousel (Slick Slider): 10 logos             │
└────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────┐
│ MEET OUR TEAM  ─  leadership cards (2 visible)  [ Know More ]       │
└────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────┐
│ LET'S DO  ─  "We connect, explore, create, empower and grow…"       │
└────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────┐
│ CLIENTS FEEDBACK / "What People Say"                                │
│   carousel of 5 quotes (MG Motor · Mrs. Bectors · Trilegal ·        │
│   Aknamed · Accion Labs)                                            │
└────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────┐
│ NEWS & ARTICLES  ─  3 latest post cards                             │
└────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────┐
│ CONTACT US strip   ─   info@in2itebs.com   ·   HQ address           │
└────────────────────────────────────────────────────────────────────┘
FOOTER
```

---

## 3. Service-page template

Used by all 27 service pages (e.g. `sap-rise-with-sap`, `sap-success-factors`, `digital-transformation-services`, `ai-machine-learning`, etc.). Section counts vary, but the spine is the same:

```
HEADER
┌────────────────────────────────────────────────────────────────────┐
│ HERO   ─  Service name H1  ·  short tagline  ·  hero image          │
│        ─  no breadcrumb                                             │
└────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────┐
│ OVERVIEW paragraph                                                  │
└────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────┐
│ N × FEATURE BLOCKS (varies 2–6 per service)                         │
│   ┌────────────┐  ┌────────────┐                                    │
│   │ icon+title │  │ icon+title │  bullets / paragraphs              │
│   └────────────┘  └────────────┘                                    │
└────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────┐
│ BUSINESS BENEFITS or VALUE PROPOSITION list                         │
└────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────┐
│ TESTIMONIAL CAROUSEL ("What they're saying")  ─ generic 5 quotes    │
└────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────┐
│ "Looking for Digital Transformation? Talk to Us"  [ Talk to Us ]    │
└────────────────────────────────────────────────────────────────────┘
FOOTER
```

**Outliers worth treating separately in the revamp**
- `sap-rise-with-sap` — has two sub-sections (Business Value / IT Value) under Benefits
- `sap-success-factors` — splits into 4 module blocks (EX Mgmt / Core HR & Payroll / Talent / Analytics) → reused verbatim on all 8 local-SEO pages
- `simplifytalent` & `simplifyhiring` — have full pricing tables and a phone number CTA, unique to the productized packages
- `ecc-prism` — has a trademark block (™) and is the only proprietary product page

---

## 4. Industry-page template

Used by all 14 industry pages.

```
HEADER
┌────────────────────────────────────────────────────────────────────┐
│ HERO   ─  Industry name H1                                          │
└────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────┐
│ OVERVIEW                                                            │
└────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────┐
│ SOLUTION OFFERINGS list (i/ii/iii…) of relevant SAP modules         │
│  e.g. SAP Product Lifecycle Costing, Digital Manufacturing, etc.    │
└────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────┐
│ CAPABILITY SUB-SECTIONS (R&D · Mobility · Supply · Sales · Mfg …)   │
│  – each has 2-4 bullets                                             │
└────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────┐
│ "Our Customers" / "What they're saying" carousel (generic)          │
└────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────┐
│ "Looking for Digital Transformation? Talk to Us"                    │
└────────────────────────────────────────────────────────────────────┘
FOOTER
```

> Pain point: every industry page reuses the same testimonial set (MG/Bectors/Trilegal/Aknamed/Accion) — there are no industry-specific success stories surfaced here.

---

## 5. Partner-page template

Used by all 10 partner pages.

```
HEADER
┌────────────────────────────────────────────────────────────────────┐
│ HERO  ─  Partner logo  ·  partner name H1                           │
└────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────┐
│ Short paragraph: who the partner is + In2IT's relationship          │
└────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────┐
│ Testimonial carousel  +  Footer CTA                                 │
└────────────────────────────────────────────────────────────────────┘
FOOTER
```

> Partner pages are the **thinnest** content type — typically <500 words. Strong candidate for redesign with logo grid → expandable detail.

---

## 6. About-section templates

### 6a. `/who-we-are/`
```
HERO → Vision · Mission · Purpose · Values cards → Stats strip → CTA → Footer
```

### 6b. `/out-leadership/` (or `/our-leadership/`)
```
HERO heading
→ Leader cards (currently 2)
   ┌────────────────┐
   │ Photo          │
   │ Name           │
   │ Title          │
   │ Bio paragraph  │
   │ LinkedIn icon  │
   └────────────────┘
→ Footer
```

### 6c. Individual leadership profiles (`/dharmendra-sharma/`, `/anil-kumar-soleti/`, `/rajat-kapoor/`)
```
HERO → Name + Title → Bio paragraph → no LinkedIn link → Footer
```

### 6d. `/accreditation-awards/`
```
HERO → Grid of accreditation badges & award certificates → Footer
```

### 6e. `/customer-stories/`
```
HERO → "Clients Feedback / What People Say"
     → Same testimonial carousel as homepage
     → no individual case study tiles linking out
     → Footer
```

### 6f. Detailed customer-story pages (Welspun · IBG · WeWork · ShareChat)
```
HERO with client logo
→ Executive Overview (Challenge | Solution | Results columns)
→ Objective
→ Solutions (module list)
→ Partner Role
→ Results with metrics
→ Quote attribution block
→ Optional PDF download link
→ Footer
```
*(WeWork and ShareChat pages currently surface only the PDF — body is hidden.)*

---

## 7. Career section

### 7a. `/our-culture/`
```
HERO → "We connect, explore, create…" → benefits cards → Photo strip → CTA → Footer
```

### 7b. `/events-celebrations-3/` (photo album)
```
HERO heading
→ Section: Go-Live          [6 photos]
→ Section: Team Lunch       [7 photos]
→ Section: Team Outing 2022 [9 photos]
→ Section: Women's Day 2022 [6 photos]
→ Section: Picnic 2021      [17 photos]
→ Section: Birthday         [7 photos]
→ Section: Christmas        [2 photos]
→ Footer
```

### 7c. `/careers/` (Current Openings)
```
HERO  "Build a career with endless opportunities"
→ Intro copy
→ Job listing table
   ┌──────────────────────────┬────────────┬────────┬────────────┐
   │ Position                 │ Location   │ Type   │ [Apply Now]│
   ├──────────────────────────┼────────────┼────────┼────────────┤
   │ … 10 rows                │            │        │            │
   └──────────────────────────┴────────────┴────────┴────────────┘
→ Footer
```

### 7d. Job-posting detail (e.g. `/sap-and-success-factor-consultant/`)
```
HERO → Title · Location · Type · Walk-in dates
→ Experience required
→ Key Responsibilities (bullets)
→ Requirements / Qualifications (bullets)
→ Positions Available
→ [ Apply Now ] → opens Microsoft Forms (external)
→ Footer
```

### 7e. `/apply-now/`
```
HERO "Join Us"
→ WPForms iframe (Name | Email | Phone | Resume upload | Position dropdown | Message)
→ Honeypot field
→ Submit  →  /thank-you/
→ Footer
```

### 7f. `/join-our-team/`
```
HERO → page anchors: Overview · Openings · Why us · Gallery
→ Overview copy
→ 3 benefit cards (currently placeholder copy)
→ "Find your own passion"
→ "Interested in working with us?"  [ Explore Openings ] → /careers/
→ Footer
```

---

## 8. News / blog templates

### 8a. `/news/` index
```
HEADER
┌──────────────────────────────┬─────────────────────┐
│ MAIN COLUMN                  │ SIDEBAR             │
│ Article card                 │ • Search box        │
│   thumbnail                  │ • Recent Posts (5)  │
│   title (H2)                 │ • Recent Comments   │
│   author · date              │ • Archives          │
│   excerpt                    │ • Categories        │
│   [ Read More ]              │   - Business        │
│ … 10 cards on page 1         │   - Life Style      │
│ Pagination: [1] [2]          │   - Music           │
│                              │   - Technology      │
│                              │   - Uncategorized   │
└──────────────────────────────┴─────────────────────┘
FOOTER
```

### 8b. Article detail
```
HERO image  +  Title  +  Author  +  Date
→ Body (paragraphs · subheadings · pull-quotes)
→ (no related-posts / no share buttons rendered)
→ Footer
```

---

## 9. Contact `/contact/`

```
HERO "Contact Us"
→ "Drop us a Message" form (Contact Form 7 — Name | Company | Email | Phone w/ country flag | Subject | Message | reCAPTCHA | Submit) → /thank-you/
→ Office grid (13 cards: 8 India + 5 international, each with address · email · phone · "Get directions" hint)
→ Footer
```

---

## 10. Expert advice `/expert-advice/` (the main lead-gen funnel)

```
HERO "Talk to our Expert"
→ Form
    • Solution dropdown:  SAP S/4 HANA · SuccessFactors · SAP Concur · Others
    • Name | Email | Phone | Message
    • Submit  →  /thank-you/
→ Footer
```

---

## 11. Thank-you `/thank-you/`

```
HERO confirmation message:
   "Thank you for providing your information. Your request has been
    forwarded to the relevant team."
→ [ Talk to Us ] (loop back)
→ Footer
```

---

## 12. FAQ `/faq/`

```
HERO "FAQ"
→ Single accordion item (only 1 Q&A currently present)
→ Footer
```

---

## 13. City-landing template (`/in2it-{city}/`)

7 pages — Singapore, Dubai, Melbourne, Manila, Malaysia, Bangkok, India.

```
HERO  "In2IT {City}"
→ Paragraph with {City} substituted
→ Services-We-Offer grid (7 cards — same on every city page)
→ Industries-We-Focused grid (14 — same on every city page)
→ Testimonial carousel (same generic quotes)
→ Footer
```

---

## 14. SuccessFactors local-SEO template (`/sap-success(factors)-(in|partner-in)-{city}/`)

8 pages — Bangalore, Mumbai, Chennai, Delhi, Kolkata, Hyderabad, Bhubaneswar, India.

```
HERO  "SAP SuccessFactors Partner In {City}"
→ Intro paragraph
→ "HCM Suite: The evolution of HCM software"
→ 4 module sections, each with H2 + tagline + 4-6 bullets:
    • Employee experience management
    • Core HR and payroll
    • Talent management
    • HR analytics and workforce planning
→ "What they're saying" testimonial carousel
→ "Looking for Digital Transformation?  [ Talk to Us ]"
→ Footer
```

> All 8 pages are byte-for-byte identical except for the H1 (and a `<title>` bug on the Bhubaneswar page). **Strong candidate for a single city-aware route in the revamp.**

---

## 15. Event / webinar pages

### 15a. `/global-webinar/` — "Executive Insights: A Dialogue on Rapid HR Digitization"
```
HERO  Event banner image
→ Date / Time / Format
→ 2 open-text input fields for registration
→ [ Register Now ]
→ Footer
```

### 15b. `/grow-with-sap-leadership-forum-event/`
```
HERO  "Quickly and Confidently Adopt Cloud ERP"
→ Date · Time · Venue (The Oberoi, Bengaluru)
→ "Why Attend" 4-pillar grid
→ [ Register Now ] → external SAP events portal
→ Footer
```

### 15c. `/unlock-the-power-of-hr-technology-transformation/`
```
HERO banner
→ Lead copy
→ Event details (date · time · venue: Genius Central, Singapore)
→ [ Register Now ]  →  /unlock-…-register-now/
└─ that form page:
    → "Relationship to SAP" dropdown (10 options)
    → Consent checkbox
    → Submit
```

### 15d. `/event-2024/`
*Placeholder Lorem-ipsum page — should not exist in revamp.*

---

## 16. Legal pages (`/privacy-notice/`, `/privacy-policy/`, `/disclaimer/`)

```
HERO H1
→ Long-form body (table of contents recommended for revamp)
→ "Send questions to info@in2itebs.com"
→ Footer
```

---

## 17. WordPress demo pages still live (revamp must delete)

```
/case/marketing-advice/
/case/finance-consulting/
/case/substantial-business/
/case/business-planning/
/case/digital-campaigns/
/case/trust-and-accuracy/
/case/business-growth/
/case/top-consultation/
/event/architecture-club-meet-up/
/event/architecture-interior-week/
/event/international-architecture-2022/
/event/nairobi-design-week/
/event/designing-club-culture/
/event/festival-of-architecture-and-interior/
/slide-anything-popup-preview/
```

---

# Workflows / user journeys currently supported

## Journey A — Prospect researches a service and converts

```
                         ┌─────────┐
   organic / paid ───▶   │  HOME   │
                         └────┬────┘
            (mega-menu)       │
       ┌──────────────────────┼──────────────────────┐
       ▼                      ▼                      ▼
  Service detail        Industry page          City page
       │                      │                      │
       │                      │                      │
       ▼                      ▼                      ▼
        "Looking for Digital Transformation? [ Talk to Us ]"
                              │
                              ▼
                       /expert-advice/
                       (Solution-of-interest dropdown,
                        Name/Email/Phone/Message)
                              │
                              ▼
                       /thank-you/
                              │
                              ▼
                       sales follow-up (offline)
```

**Friction observed:** no "Book a demo" calendar embedded in the funnel (the `appt.link` URL exists but is unlinked from the funnel). No content-gated PDF download. No qualification questions on the form.

## Journey B — Candidate applies for a job

```
HOME → Career menu → /careers/ (current openings)
                              │
                              ▼
                     Job detail page (e.g. /sap-and-success-factor-consultant/)
                              │
                              ▼
                       [ Apply Now ]
                              │
                              ▼
          ▶ leaves site to Microsoft Forms ◀
```
**Friction:** application happens off-site on Microsoft Forms; no resume parsing; no recruiter follow-up surfaced.

## Journey C — Event attendee registers

```
HOME (banner) ── or ── direct campaign URL
            │
            ▼
   Event page (Global Webinar | Leadership Forum | Unlock the Power…)
            │
            ▼
   [ Register Now ]
            │
       ┌────┴─────┐
       ▼          ▼
  In-page form   External SAP events portal
       │
       ▼
   /thank-you/
```

## Journey D — Press / partner reads a case study

```
HOME → About → Customer Stories
                       │
                       ▼
        (5 testimonials inlined — no per-client deep dive linked)
        
        OR direct URL:
        /welspun/ · /ibg-…/ · /wework-…/ · /sharechat-…/
                       │
                       ▼
        Full case study (Welspun) — or — PDF download only (WeWork, ShareChat)
```
**Friction:** customer-stories index does **not** link out to the four detailed case-study URLs that exist — they're effectively orphaned.

## Journey E — Returning visitor reading news

```
HOME → bottom "News & Articles" cards
   or   Footer "Latest News"
   or   /news/
                  │
                  ▼
          Article detail (no share / no related posts)
                  │
                  ▼
          End — no onward CTA other than global header
```

---

# Information-architecture summary (one-page)

```
in2itebs.com
│
├── / .................................. Homepage
├── /contact/ ........................... 13 office cards + form
├── /expert-advice/ ..................... Primary lead-gen form
├── /thank-you/ ......................... Post-submit confirmation
├── /faq/ ............................... 1 Q&A
│
├── About
│   ├── /who-we-are/
│   ├── /our-leadership/ (or /out-leadership/)
│   ├── /dharmendra-sharma/
│   ├── /anil-kumar-soleti/
│   ├── /rajat-kapoor/
│   ├── /accreditation-awards/
│   ├── /customer-stories/
│   └── /news/
│       ├── /news/page/2/
│       └── 12 individual article URLs
│
├── Services (27 leaf pages — see Section 3)
│   ├── SAP cluster:        rise · success-factors · concur · sac · ecc-prism · enterprise-solutions
│   ├── Other enterprise:   oracle · microsoft · ms-office-365 · dynamics-365
│   ├── Cloud:              strategy · migration · hosting
│   ├── Security:           cyber-security · risk-advisory · cloud-infra · IAM
│   ├── Digital:            digital-services · transformation · ADMS · agile-devops
│   ├── Data & AI:          data-analytics-ai · database · predictive · AI/ML · big-data · blockchain · RPA
│   └── Packages:           simplifytalent · simplifyhiring
│
├── Industries (14 — see Section 4)
│
├── Partners (10 — see Section 5)
│
├── City pages (Section 13)
│   └── in2it-india · -singapore · -dubai · -melbourne · -manila · -malaysia · -bangkok
│
├── Local-SEO pages (Section 14)
│   └── sap-successfactors-partner-in-{india,mumbai,kolkata,delhi,chennai}
│       sap-success-factors-in-{bangalore,bhubaneswar,hyderabad}
│
├── Customer stories (deep)
│   └── /welspun/ · /ibg-…/ · /wework-…/ · /sharechat-…/
│
├── Events
│   ├── /global-webinar/
│   ├── /grow-with-sap-leadership-forum-event/
│   ├── /unlock-the-power-of-hr-technology-transformation/
│   │   └── /…-register-now/  ·  /…-register-now1/
│   └── /event-2024/  (placeholder)
│
├── Career
│   ├── /our-culture/
│   ├── /events-celebrations-3/
│   ├── /careers/
│   ├── /apply-now/
│   ├── /join-our-team/
│   └── /sap-and-success-factor-consultant/  (sample job detail)
│
├── Legal
│   ├── /privacy-notice/
│   ├── /privacy-policy/
│   └── /disclaimer/
│
└── DEMO / DELETE
    ├── /case/marketing-advice/ etc. (8 placeholder URLs)
    ├── /event/architecture-…/ etc. (6 placeholder URLs)
    └── /slide-anything-popup-preview/
```

---

# Reusable components catalogue (for design-system planning)

| Component | Where it appears | Notes |
|---|---|---|
| **Top mega-menu** | every page | rebuild with keyboard support |
| **"Talk to Us" header CTA** | every page | links to `/expert-advice/` |
| **Hero slider** | homepage | Slider Revolution — replace |
| **Featured event banner** | homepage + selected service pages | inconsistent placement |
| **Stats strip** | homepage | could become reusable section |
| **Service card grid** (7 cards) | homepage + all 7 city pages | currently a hand-built grid |
| **Industry tile grid** (14) | homepage + all 7 city pages | |
| **Partner logo carousel** | homepage | Slick Slider |
| **Leadership card** | leadership page + homepage strip | |
| **Testimonial carousel** | every service / industry / partner / city / SF-local page | **over-used** |
| **Mid-page "Looking for DT?" CTA** | most inner pages | always identical |
| **Office card** | footer + contact page | |
| **Newsletter form** | footer (every page) | Mailchimp for WP |
| **Floating "Buttonizer"** | every page | duplicates the header CTA |
| **Module bullet block** (icon + title + 6 bullets) | SuccessFactors + 8 local-SEO + simplifytalent / hiring | the most reused content block on the site |
| **News article card** | homepage + news index + sidebar | |
| **Job listing row** | careers page | replace with cards |
| **Privacy consent block** | event registration | only used on one form |
| **PDF download badge** | WeWork / ShareChat case studies | |

These ~17 components cover ~95% of every page on the site.
