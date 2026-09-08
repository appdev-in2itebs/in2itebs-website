# Agent Workflow

## Purpose
Defines the complete, ordered, agent-driven workflow for the In2IT EBS production website build, from project setup through final human review. It assigns an owner agent to each stage, records the dependencies between stages, and states the mandatory gate that prevents coding from starting before the foundational documentation is created and reviewed. This file is the master process reference for every other document in `/docs/`.

## Inputs Required
- This project's governance rules (single source of truth, no fabrication, stop-and-ask, legal flagging).
- The agreed list of documentation artifacts in `/docs/`.
- Human confirmation of the workflow and the coding gate.

## Owner Agent
Project Setup Agent

## Completion Criteria
- All 14 workflow steps are listed with a clear description, owner agent, primary outputs, and dependencies.
- The coding gate is stated verbatim and is unambiguous.
- The workflow has been reviewed and approved by the human owner.

## Current Status
Needs Review

## Pending Items
- Human approval of the workflow ordering and step ownership.
- Confirmation of which step (if any) may run in parallel with another.

## Open Questions
- Are the 14 steps and their ownership correct and complete for this engagement?
- Should any review checkpoints be added between specific steps (e.g. a human sign-off after Step 4)?

## The 14-Step Workflow

1. **Project Setup** — *Owner: Project Setup Agent.* Create the `/docs/` documentation structure, `PROJECT_BRIEF.md`, this `AGENT_WORKFLOW.md`, the `OPEN_QUESTIONS.md` log, and the empty `LEGAL_REVIEW.md` register. No content extraction, copy, design, or code. **Depends on:** nothing.
2. **Content Extraction** — *Owner: Content Extraction Agent.* Capture every meaningful point from the corporate profile deck (primary source) into `CONTENT_SOURCE_OF_TRUTH.md`, with stable IDs and provenance, and populate the `LEGAL_REVIEW.md` flags as sensitive items are encountered. **Depends on:** Step 1.
3. **Content Parity** — *Owner: Content Parity Agent.* Build `CONTENT_PARITY_CHECKLIST.md` proving no meaningful deck point is omitted, and map each point to its destination on the new site. **Depends on:** Step 2.
4. **Old Website UX Improvement** — *Owner: Old Website UX Agent.* Analyse the scraped existing site (secondary source) into `OLD_WEBSITE_UX_INSIGHTS.md` to improve navigation, flow, CTA placement, SEO phrasing, and service discoverability — without overriding, reducing, omitting, or contradicting the deck. **Depends on:** Step 1 (informed by Steps 2-3).
5. **Information Architecture** — *Owner: Information Architecture Agent.* Produce `INFORMATION_ARCHITECTURE.md`: sitemap, page inventory, navigation, URL scheme, and per-page content outlines. **Depends on:** Steps 2, 3, 4.
6. **Website Copy** — *Owner: Copywriting Agent.* Establish `COPY_GUIDELINES.md` and then write page copy that traces back to the source of truth. **Depends on:** Steps 2, 3, 5.
7. **Design System** — *Owner: Design System Agent.* Define `DESIGN_SYSTEM.md` and `BRAND_ASSETS.md` from the approved brand guidelines (typography, colour, logo usage, spacing, motion). **Depends on:** Step 1 (brand guidelines) and Step 5.
8. **Data Model** — *Owner: Data Model Agent.* Define `DATA_MODEL.md`: content/data structures, fields, relationships, and content-source/CMS modelling. **Depends on:** Steps 2, 5.
9. **Component Architecture** — *Owner: Component Architecture Agent.* Define `COMPONENT_SPEC.md`: component inventory, props, variants, states, and page mapping. **Depends on:** Steps 5, 7, 8.
10. **Frontend Build** — *Owner: Frontend Build Agent.* Implement the website in code. **This step is gated — see the Coding Gate below.** **Depends on:** the gate being satisfied.
11. **SEO and Conversion** — *Owner: SEO & Conversion Agent.* Define `SEO_STRATEGY.md` and `ANALYTICS_AND_CONVERSION.md`, including metadata, structured data, redirects from old URLs, and the measurement plan. **Depends on:** Steps 5, 6, 10.
12. **QA and Accessibility Audit** — *Owner: QA & Accessibility Agent.* Execute `QA_TEST_PLAN.md`, `ACCESSIBILITY_REQUIREMENTS.md`, and `PERFORMANCE_REQUIREMENTS.md`, including a content-parity gate against `CONTENT_PARITY_CHECKLIST.md`. **Depends on:** Step 10.
13. **Deployment** — *Owner: Deployment Agent.* Follow `DEPLOYMENT_RUNBOOK.md` and `ENVIRONMENT_VARIABLES.md` to release, with rollback and DNS/hosting steps. **Depends on:** Step 12 passing.
14. **Final Human Review** — *Owner: Human Reviewer.* Complete `FINAL_REVIEW_REPORT.md`: parity, QA, accessibility, performance, SEO, legal sign-off, outstanding risks, and the go/no-go decision. **Depends on:** Steps 1-13.

## Coding Gate (Mandatory)

> "Coding must not begin until CONTENT_SOURCE_OF_TRUTH.md, CONTENT_PARITY_CHECKLIST.md, OLD_WEBSITE_UX_INSIGHTS.md, INFORMATION_ARCHITECTURE.md, COPY_GUIDELINES.md, DESIGN_SYSTEM.md, DATA_MODEL.md, and COMPONENT_SPEC.md have been created and reviewed."

No work in Step 10 (Frontend Build) or any later coding activity may start until every document named in the gate above exists and has been reviewed by the human owner.

## Standing Governance Rules (apply at every step)
- The uploaded In2IT EBS corporate profile deck is the **primary source of truth**. The extracted old website content is a **secondary source** that may improve UX, navigation, CTA placement, SEO phrasing, service discoverability, and clarity, but must **not** override, reduce, omit, or contradict the deck.
- Presentation may be expanded and improved, but **no meaningful point from the deck may be omitted**.
- **Do not invent** facts, numbers, client names, partner claims, certifications, office addresses, case studies, awards, metrics, or service capabilities.
- If any content is unclear, conflicting, confidential, legally sensitive, outdated, or risky — **stop and ask the human**.
- Flag client logos, named clients, partner badges, credentials, proprietary accelerators, exact metrics, office addresses, subsidiary details, and confidential claims in `LEGAL_REVIEW.md`.
- Every step's output must include: (1) what was completed, (2) what needs review, (3) assumptions made, (4) open questions for the human, and (5) whether we are allowed to proceed to the next step.
