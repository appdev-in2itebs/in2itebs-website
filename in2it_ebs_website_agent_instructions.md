# In2IT EBS Website Build — Simple Agent Instruction File

## Purpose

Use this file as the single instruction document for the agentic AI team/code agent.

The goal is to build a production-level corporate website for **In2IT EBS** using the uploaded corporate profile deck as the main source of truth.

The agent must keep the work simple, accurate, and stepwise.

---

## Main Rule

The **corporate profile deck is the primary source of truth**.

The extracted old website content is only a secondary reference. It can be used to improve:

- User flow
- Navigation
- CTA placement
- SEO wording
- Service clarity
- Contact journey

It must **not** override, reduce, omit, contradict, or replace anything from the corporate profile deck.

---

## Strict Guardrails

Follow these rules throughout the project:

1. Do not omit any meaningful point from the corporate profile deck.
2. Do not invent facts, numbers, client names, certifications, awards, claims, office addresses, or partner status.
3. Do not publish confidential, outdated, unclear, or legally sensitive content without asking.
4. Flag client logos, partner claims, certifications, metrics, proprietary methods, office addresses, and confidential material in `LEGAL_REVIEW.md`.
5. If anything is unclear, conflicting, confidential, risky, or outdated, stop and ask the human reviewer.
6. Keep the website professional, premium, enterprise-grade, and simple.
7. Do not overcomplicate the build.
8. Do not start coding until extraction, old website review, structure, and copy are ready.
9. The agents may improve flow, design, and wording, but they must not remove source content.
10. Work step by step. Do not jump ahead.

---

# Final Workflow

Follow this order only:

```txt
Extract → Use old website for flow → Plan → Copy → Build → Final check/deploy
```

---

# Step 1 — Extract the Deck Content

## Goal

Extract all useful website content from the uploaded corporate profile deck.

## Create these files

```txt
CONTENT_SOURCE_OF_TRUTH.md
LEGAL_REVIEW.md
OPEN_QUESTIONS.md
```

## Instructions

Read the full corporate profile deck carefully.

In `CONTENT_SOURCE_OF_TRUTH.md`, extract the deck page by page.

For each page, capture:

- Page title
- Main message
- All headings
- All important body points
- All numbers/metrics
- Services
- Solutions
- Industries
- Partners/credentials
- Technologies
- Delivery models
- Engagement models
- Office/subsidiary details
- Client names/logos
- CTA
- Visual/diagram description
- Suggested website section

Do not summarize too much. Do not omit anything.

In `LEGAL_REVIEW.md`, flag:

- Client logos/names
- Partner claims
- Certifications
- Exact metrics
- Proprietary methods
- Office addresses
- Confidential content
- Any claim that may need approval before publishing

In `OPEN_QUESTIONS.md`, list anything unclear or risky.

## Stop Rule

Stop after this step. Do not plan, write copy, design, or code yet.

---

# Step 2 — Use Old Website Content to Improve Flow

## Goal

Use the old website content only to improve website usability and visitor journey.

## Create this file

```txt
OLD_WEBSITE_UX_INSIGHTS.md
```

## Instructions

Read the extracted old website content.

Use it only to improve:

- User flow
- Navigation
- CTA placement
- SEO wording
- Service clarity
- Contact journey
- Page sequencing
- Trust-building

Do not use it to override the corporate profile deck.

Create `OLD_WEBSITE_UX_INSIGHTS.md` with:

- Useful things to reuse
- Better navigation ideas
- Better CTA ideas
- SEO phrases worth reusing
- Content that supports the deck
- Content that conflicts with the deck
- Content that may be outdated
- Questions for the human reviewer

## Stop Rule

Stop after this step. Do not create the sitemap or code yet.

---

# Step 3 — Plan the Website Structure

## Goal

Create a simple, professional website structure.

## Create this file

```txt
INFORMATION_ARCHITECTURE.md
```

## Instructions

Using the deck extraction and old website insights, create the website structure.

Plan these pages:

1. Home
2. About
3. Services
4. SAP Enterprise Solutions
5. Salesforce
6. Workday
7. Application Development & Managed Services
8. Delivery Excellence
9. Industries & Clients
10. Why In2IT EBS
11. Contact

For each page, mention:

- Page goal
- Main sections
- Source deck pages covered
- CTA
- Notes or doubts

Also create:

- Main navigation
- Footer structure
- Suggested internal links
- Suggested CTA placement

Make sure every deck point has a place on the website.

## Suggested Navigation

```txt
Home
About
Services
  - SAP Enterprise Solutions
  - Salesforce
  - Workday
  - Application Development & Managed Services
Delivery Excellence
Industries & Clients
Why In2IT EBS
Contact
```

## Important SAP Sections to Include

The SAP page or section must include:

- SAP overview
- SAP S/4HANA
- RISE with SAP
- GROW with SAP
- SAP Private Cloud / PCE
- SAP advisory services
- SAP implementation and rollout
- SAP SuccessFactors / HXM
- AI-powered diagnostic
- SAP Concur
- Concur integration
- SAP Ariba
- SAP Joule / Generative AI
- AI on SAP BTP
- Clean Core Extensibility
- Syniti Data Management
- SAP Analytics Cloud
- SAP analytics offerings
- Packaged S/4HANA
- ABAP Factory
- SAP Basis
- Converged Intelligence Stack

## Stop Rule

Stop after this step. Do not write final copy or code yet.

---

# Step 4 — Write Website Copy

## Goal

Create clear, premium, enterprise-grade website copy.

## Create this file

```txt
COPY.md
```

## Instructions

Create website copy based on the approved structure.

For each page, write:

- SEO title
- Meta description
- Hero headline
- Hero subheading
- Main sections
- Bullet points/cards
- CTA text

Pages to write:

1. Home
2. About
3. Services
4. SAP Enterprise Solutions
5. Salesforce
6. Workday
7. Application Development & Managed Services
8. Delivery Excellence
9. Industries & Clients
10. Why In2IT EBS
11. Contact

## Copy Rules

- Tone should be premium, clear, enterprise-grade, and professional.
- Preserve all facts and numbers from the deck.
- Do not invent claims.
- Do not omit technical details.
- Do not hide important source content in vague marketing copy.
- Mark sensitive claims as `Needs Review`.
- Keep content readable for web users.
- Use sections, cards, bullets, accordions, and tabs where needed.

## Stop Rule

Stop after this step. Do not design or code yet.

---

# Step 5 — Build the Website

## Goal

Build the production website.

## Recommended Stack

Use:

```txt
Next.js
React
TypeScript
Tailwind CSS
shadcn/ui if useful
Framer Motion only for subtle animations
```

## Instructions

Build the website using the approved content and structure.

Build these pages:

1. Home
2. About
3. Services
4. SAP Enterprise Solutions
5. Salesforce
6. Workday
7. ADMS
8. Delivery Excellence
9. Industries & Clients
10. Why In2IT EBS
11. Contact

## Build Rules

- Keep the design clean, premium, and corporate.
- Use the corporate profile deck style as inspiration, not as a copied layout.
- Use reusable components.
- Make the site mobile responsive.
- Add SEO metadata.
- Add `sitemap.xml`.
- Add `robots.txt`.
- Add contact CTA/form.
- Use placeholders for missing logos/assets.
- Do not hardcode everything randomly.
- Do not omit any content from the deck.
- Ask the human reviewer if anything is unclear.
- Do not include real secrets or API keys.

## Suggested Component List

Use simple reusable components such as:

- Header
- Footer
- Hero section
- Metric cards
- Service cards
- Practice cards
- CTA sections
- Timeline
- Accordion
- Tabs
- Logo grid
- Contact form
- SEO metadata component

## Stop Rule

Stop after the local build passes. Do not deploy yet.

---

# Step 6 — Final Check and Deploy

## Goal

Review the website before deployment, then deploy only if ready.

## Create these files

```txt
FINAL_CHECK.md
DEPLOYMENT_NOTES.md
```

## In FINAL_CHECK.md, include:

- Pages completed
- Deck content included
- Missing content, if any
- Legal review items
- Missing assets
- Mobile responsiveness status
- SEO status
- Contact form status
- Deployment readiness

## Check These Items

- Does the website build successfully?
- Is every deck section included?
- Are client logos/claims flagged?
- Are all pages mobile responsive?
- Are SEO titles and descriptions added?
- Are `sitemap.xml` and `robots.txt` present?
- Are there any broken links?
- Are missing assets handled with placeholders?
- Are legal-review items clearly marked?

## In DEPLOYMENT_NOTES.md, include:

- Platform used
- Build command
- Deployment steps
- Environment variables needed
- Final deployment URL
- Known issues
- Post-launch tasks

## Deployment Rule

Deploy only if there are no major blockers.

Do not deploy if:

- Build fails
- Major content is missing
- Legal-sensitive content is unresolved
- Client logos or partner badges are unapproved
- Contact form is broken
- Website is not mobile responsive

---

# Recommended Project Folder Structure

```txt
project-root/
  app/
  components/
  content/
  public/
  docs/
  styles/
  lib/
  README.md
```

---

# Required Docs Folder

```txt
docs/
  CONTENT_SOURCE_OF_TRUTH.md
  LEGAL_REVIEW.md
  OPEN_QUESTIONS.md
  OLD_WEBSITE_UX_INSIGHTS.md
  INFORMATION_ARCHITECTURE.md
  COPY.md
  FINAL_CHECK.md
  DEPLOYMENT_NOTES.md
```

---

# Final Reminder to Agent

Build a premium, enterprise-grade website.

Keep it simple.

Do not skip content.

Do not over-engineer.

Do not publish risky claims without review.

Ask the human reviewer whenever in doubt.
