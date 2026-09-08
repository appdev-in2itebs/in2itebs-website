# In2IT EBS — Website Build

Working repository and documentation for the In2IT EBS production website build. This project is run as an ordered, agent-driven workflow with a human owner reviewing each stage.

**Current stage (7 September 2026):** implemented website under remediation and local QA, not approved for production release. The phased audit/transcript checklist is in [WEBSITE_REMEDIATION_PLAN.md](docs/WEBSITE_REMEDIATION_PLAN.md). Current design tokens and interaction rules are described in [DESIGN.md](DESIGN.md).

Run from `web/`: `npm ci`, `npm run check`, `npm run build`, then `npm start`. The website uses **http://127.0.0.1:3107/**. Port 3000 and its ngrok tunnel belong to In2CLM and must not be changed. See [the remediation runbook](docs/REMEDIATION_RUNBOOK.md) for configuration, tests, preview limitations and rollback.

## Sources of Truth
- **Primary:** the In2IT EBS Corporate Profile deck (`In2IT EBS Corporate Profile _200526.pdf`). This is the single authoritative source. Nothing in the build may contradict or omit a meaningful point from it.
- **Secondary:** the existing website content captured in `scraped/`. This is a UX-only reference (navigation, flow, CTA placement, SEO phrasing, service discoverability). It may improve the experience but may never override, reduce, omit, or contradict the deck.

## Governance Rules
- Do not invent facts, numbers, client names, partner claims, certifications, office addresses, case studies, awards, metrics, or service capabilities.
- If anything is unclear, conflicting, confidential, legally sensitive, outdated, or risky — stop and ask the human owner.
- Sensitive items (client logos, named clients, partner badges, credentials, proprietary accelerators, exact metrics, office addresses, subsidiary details, confidential claims) are tracked in `docs/LEGAL_REVIEW.md` and must be cleared by a human before launch.
- Every stage output reports: what was completed, what needs review, assumptions made, open questions, and whether we may proceed.

## Coding Gate
Coding must not begin until `CONTENT_SOURCE_OF_TRUTH.md`, `CONTENT_PARITY_CHECKLIST.md`, `OLD_WEBSITE_UX_INSIGHTS.md`, `INFORMATION_ARCHITECTURE.md`, `COPY_GUIDELINES.md`, `DESIGN_SYSTEM.md`, `DATA_MODEL.md`, and `COMPONENT_SPEC.md` have been created and reviewed. See `docs/AGENT_WORKFLOW.md`.

## The 14-Step Workflow
1. Project Setup → 2. Content Extraction → 3. Content Parity → 4. Old Website UX Improvement → 5. Information Architecture → 6. Website Copy → 7. Design System → 8. Data Model → 9. Component Architecture → 10. Frontend Build → 11. SEO and Conversion → 12. QA and Accessibility Audit → 13. Deployment → 14. Final Human Review.

Full detail, ownership, and dependencies are in `docs/AGENT_WORKFLOW.md`.

## Documentation Index (`/docs`)
The following table is a **historical Step 1 scaffold**, not the current completion ledger. Use WEBSITE_REMEDIATION_PLAN.md and REMEDIATION_RUNBOOK.md for current status; retain the original source and approval records below.

| Document | Status | Owner Agent |
| --- | --- | --- |
| PROJECT_BRIEF.md | In Progress | Project Setup Agent |
| CONTENT_SOURCE_OF_TRUTH.md | Pending Extraction | Content Extraction Agent |
| CONTENT_PARITY_CHECKLIST.md | Pending Extraction | Content Parity Agent |
| OLD_WEBSITE_UX_INSIGHTS.md | Pending Extraction | Old Website UX Agent |
| INFORMATION_ARCHITECTURE.md | Not Started | Information Architecture Agent |
| COPY_GUIDELINES.md | Not Started | Copywriting Agent |
| DESIGN_SYSTEM.md | Pending Human Input | Design System Agent |
| BRAND_ASSETS.md | Pending Human Input | Design System Agent |
| COMPONENT_SPEC.md | Not Started | Component Architecture Agent |
| DATA_MODEL.md | Not Started | Data Model Agent |
| SEO_STRATEGY.md | Not Started | SEO & Conversion Agent |
| ACCESSIBILITY_REQUIREMENTS.md | Not Started | QA & Accessibility Agent |
| PERFORMANCE_REQUIREMENTS.md | Not Started | QA & Accessibility Agent |
| LEGAL_REVIEW.md | Needs Review | Project Setup Agent / Human Reviewer |
| QA_TEST_PLAN.md | Not Started | QA & Accessibility Agent |
| DEPLOYMENT_RUNBOOK.md | Not Started | Deployment Agent |
| ENVIRONMENT_VARIABLES.md | Not Started | Deployment Agent |
| ANALYTICS_AND_CONVERSION.md | Not Started | SEO & Conversion Agent |
| AGENT_WORKFLOW.md | Needs Review | Project Setup Agent |
| OPEN_QUESTIONS.md | In Progress | Project Setup Agent |
| FINAL_REVIEW_REPORT.md | Not Started | Final Review Agent / Human Reviewer |

## Repository Layout
```
.
├── In2IT EBS Corporate Profile _200526.pdf   # PRIMARY source of truth (do not edit)
├── scraped/                                  # SECONDARY source: existing site content (UX reference)
├── docs/                                     # project documentation (21 files, see index above)
├── README.md                                 # this file
└── CHANGELOG.md                              # change log
```

## How This Repo Progresses
Work advances one workflow step at a time, each gated by human review. Open questions awaiting the owner are collected in `docs/OPEN_QUESTIONS.md`. The next step is **Step 2 — Content Extraction**, which begins only when the human owner confirms.
