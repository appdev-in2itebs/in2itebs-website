# In2IT EBS Website — Scraped Content

Source: **https://in2itebs.com/**
First pass scraped: 2026-05-27
Second pass (this update): 2026-05-28
Format: One Markdown file per page. Each file starts with the page title (H1) and records its source `URL:`.

## Second-pass additions

The first pass intentionally omitted site-wide chrome and stopped at the 75 most prominent pages. This second pass adds:

- **`site-chrome.md`** — full navigation tree, footer columns, social links, CTA buttons, newsletter form, statistics strip, recurring callout blocks. These elements repeat on virtually every page.
- **`sitemap.md`** — canonical list of every URL exposed by the site's sitemap.xml, including duplicate `-2` slug variants and WordPress-theme demo content that was intentionally not scraped.
- **`career/current-openings.md`** — 10 currently-listed job openings, with one (SAP & SuccessFactors Consultant walk-in) captured in full detail.
- **`career/events-celebrations-photos.md`** — the `/events-celebrations-3/` photo-gallery page (7 gallery sections).
- **`about/customer-stories-detail.md`** — Welspun (substantial), IBG, WeWork, ShareChat case studies that have their own URLs.
- **`about/leadership-supplement.md`** — Dharmendra Sharma, Anil Kumar Soleti, Rajat Kapoor — three executive profiles missed in the first pass.
- **`services/digital-services.md`** — umbrella Digital Services page (separate from `digital-transformation-services.md`).
- **`services/simplifytalent.md`** & **`services/simplifyhiring.md`** — productized partner packages with full pricing tables.
- **`city-pages.md`** — 7 city-specific landing pages (Singapore, Dubai, Melbourne, Manila, Malaysia, Bangkok, India) consolidated as a shared template.
- **`local-seo-pages.md`** — 8 SuccessFactors local-SEO pages (Mumbai, Kolkata, Delhi, Chennai, Bangalore, Hyderabad, Bhubaneswar, India) consolidated as a shared template.
- **`events/`** — Global Webinar, GROW with SAP Leadership Forum, Unlock the Power of HR Technology Transformation (with full registration dropdown and consent text), Event 2024.
- **`news/_index.md`** — full news index showing both pages of articles plus sidebar widgets, archives, and category filters.
- **`news/how-to-choose-the-best-crm-for-your-sales-automation.md`** & **`news/closer-look-at-hubspots-2022-hybrid-work-report.md`** — the two articles on Page 2 of the news index that were missed.
- **`faq.md`** — the (single-question) FAQ page.

## First-pass content (carried over)

### Top level
- `homepage.md` — home page
- `contact.md` — all office locations & emails (updated with Mumbai, Kolkata, Delhi NCR, Hyderabad, USA additions)
- `expert-advice.md` — contact / subscribe forms

### services/ (27+)
SAP & enterprise: `sap-enterprise-solutions`, `sap-rise-with-sap`, `sap-concur`, `ecc-prism`, `sap-sac`, `sap-success-factors`, `oracle`, `microsoft`, `ms-office-365`, `microsoft-dynamics-365`
Cloud: `cloud-strategy`, `cloud-migration`, `cloud-hosting-services`
Security: `cyber-security-services`, `security-and-risk-advisory`, `cloud-and-infra-security`, `identity-and-access-management`
Digital: `digital-services` (new), `digital-transformation-services`, `application-development-maintenance-services-adms`, `agile-devops`
Data/AI: `data-analytics-ai`, `database-data-management`, `predictive-analysis`, `ai-machine-learning`, `big-data`, `blockchain`, `robotic-process-automation`
Packages: `simplifytalent` (new), `simplifyhiring` (new)

### industries/ (14)
`automobiles`, `fmcg`, `manufacturing`, `textiles`, `professional-services`, `heavy-engineering`, `retail-ecommerce`, `energy-and-utilities`, `chemical-fertilizers`, `banking`, `government`, `healthcare-life-science`, `telecom`, `engineering-constructions-ecno`

### partners/ (10)
`sap`, `sap-qualtrics`, `sap-concur`, `microsoft`, `oracle`, `open-text`, `ibm`, `newgen`, `hp`, `aws`

### about/ (5 + 2 new)
`who-we-are`, `our-leadership`, `accreditation-awards`, `customer-stories`, `news`, **`customer-stories-detail` (new)**, **`leadership-supplement` (new)**

### career/ (3 + 2 new)
`our-culture`, `events-celebrations`, `careers`, **`current-openings` (new)**, **`events-celebrations-photos` (new)**

### legal/ (3)
`privacy-notice`, `privacy-policy`, `disclaimer`

### news/ (10 + 3 new)
Page 1 articles: `revolutionizing-hr-with-sap-successfactors`, `sap-successfactors-ai-innovations-successconnect-las-vegas`, `grow-with-sap`, `in2it-ebs-simplify-talent`, `in2it-ebs-simplify-hiring`, `how-rise-with-sap-s4hana-cloud-can-transform-your-business`, `coronavirus-lockdown-leads-to-more-gaming-and-e-sports`, `mrs-bectors-food-sap-successfactors-go-live`, `top-benefits-of-implementing-a-crm-for-your-business`, `how-erp-software-identifies-business-inefficiencies`
Page 2 articles (new): `how-to-choose-the-best-crm-for-your-sales-automation`, `closer-look-at-hubspots-2022-hybrid-work-report`
Index file: `_index.md`

### events/ (new section, 4 files)
`global-webinar`, `grow-with-sap-leadership-forum`, `unlock-the-power-of-hr-technology-transformation`, `event-2024`

## Notes
- Text was extracted page-by-page; minor formatting was normalized. For legally precise wording, treat `legal/privacy-policy.md` and `legal/disclaimer.md` as best-effort transcriptions and verify against the live site.
- `news/grow-with-sap.md` is a campaign/registration landing page with no standalone article body.
- The live leadership index page (`/out-leadership/`) profiles only Shatapathy and Joshi. Three additional leaders (Dharmendra Sharma, Anil Kumar Soleti, Rajat Kapoor) have their own profile URLs and are captured in `about/leadership-supplement.md`.
- The `/case/` and `/event/` sitemap entries are WordPress-theme demo placeholders (Lorem ipsum, "halpes@example.com" etc.) and were intentionally NOT captured as content — see `sitemap.md` for the full list.
- The site exposes many duplicate `-2`/`-3` slug variants in its sitemap (e.g. `/sap-concur/` ↔ `/sap-concur-2/`); spot-checks show identical content. Only the canonical version is in each scraped file.
- Form fields on `/contact/` and `/apply-now/` are rendered via WPForms shortcodes and not exposed in the source HTML — only the anti-spam honeypot ("Leave this field empty if you're human:") is HTML-readable.
- The `/event-2024/` URL contains Lorem-ipsum placeholder content.
- The `/faq/` URL currently has just one Q&A.
- Image files were not downloaded — only text content.
- Demo / meeting booking link: `https://appt.link/www-in2itebs-com-book-demo`.
