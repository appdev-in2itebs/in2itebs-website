# Project Brief

## Purpose
This document orients every human and agent contributing to the In2IT EBS production website build. It records what is being built, the governing sources of truth, the no-fabrication and stop-and-ask rules, the 14-step agent workflow, and the coding gate. It is the first document anyone should read before working on the project. Decisions not yet confirmed are marked "Pending human input" and must not be assumed.

## Inputs Required
- Confirmation of project goals and primary objectives (Pending human input)
- Confirmed in-scope and out-of-scope boundaries (Pending human input)
- Named stakeholders, decision owners, and approval authority (Pending human input)
- Timeline, milestones, and target launch date (Pending human input)
- Budget and resourcing constraints (Pending human input)
- Success criteria and how they will be measured (Pending human input)
- The In2IT EBS Corporate Profile deck (PRIMARY source of truth) — read for governance reference only at this step, not extracted
- The `scraped/` folder (SECONDARY, UX-only reference) — not analysed at this step

## Owner Agent
Project Setup Agent

## Completion Criteria
- All "Pending human input" fields (goals, scope, stakeholders, timeline, budget, success criteria) are filled with human-confirmed values
- Sources of truth and their precedence are stated unambiguously and accepted by the owner
- Governance rules (no fabrication, stop-and-ask, coding gate) are documented and acknowledged
- The 14-step workflow with owners and dependencies is recorded
- No company facts are asserted in this file unless traceable to a confirmed source
- File reviewed and signed off by the human owner

## Current Status
In Progress

## Pending Items
- Capture confirmed project goals and primary objectives.
- Capture confirmed in-scope and out-of-scope boundaries.
- Capture named stakeholders and approval authority.
- Capture timeline, milestones, and target launch date.
- Capture budget and resourcing constraints.
- Capture success criteria and measurement method.
- Confirm the deck-as-primary / scraped-site-as-secondary precedence with the owner.

### Decided and recorded at this step
- **Sources of truth:** The In2IT EBS Corporate Profile deck is the single, authoritative source of truth. Nothing produced in this project may contradict or omit a meaningful point from the deck.
- **Secondary source:** The `scraped/` folder (existing website content) is a UX-only reference for navigation, flow, CTA placement, SEO phrasing, and service discoverability. It may improve the experience but may never override, reduce, omit, or contradict the deck.
- **No fabrication rule:** No client names, numbers, partner claims, certifications, office addresses, case studies, awards, metrics, subsidiary details, or service capabilities may be invented or assumed. Real content is sourced only from the deck (primary) or, for UX/structure only, the scraped site (secondary).
- **Stop-and-ask rule:** When a decision requires facts not present in the sources, or requires owner judgement, work stops and the question is raised to the human owner rather than guessed.
- **Coding gate:** No code, design, or website copy is produced during scaffolding (Step 1). Implementation steps proceed only after their upstream documentation dependencies are complete and reviewed.
- **14-step workflow:** 1 Project Setup (Project Setup Agent) → 2 Content Extraction (Content Extraction Agent) → 3 Content Parity (Content Parity Agent) → 4 Old Website UX Improvement (Old Website UX Agent) → 5 Information Architecture (Information Architecture Agent) → 6 Website Copy (Copywriting Agent) → 7 Design System (Design System Agent) → 8 Data Model (Data Model Agent) → 9 Component Architecture (Component Architecture Agent) → 10 Frontend Build (Frontend Build Agent) → 11 SEO and Conversion (SEO & Conversion Agent) → 12 QA and Accessibility Audit (QA & Accessibility Agent) → 13 Deployment (Deployment Agent) → 14 Final Human Review (Human Reviewer).

## Open Questions
- What are the primary business goals this website must achieve, and how will we know it succeeded?
- What is explicitly in scope and out of scope for this build (pages, languages, integrations, CMS)?
- Who are the stakeholders, and who holds final sign-off authority at each stage?
- What is the target launch date and are there fixed milestones or external deadlines?
- What is the budget and are there resourcing or vendor constraints we must plan around?
- Are there any existing brand, legal, or compliance constraints beyond the deck that must govern this build?
