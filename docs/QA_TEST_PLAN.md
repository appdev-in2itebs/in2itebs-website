# QA Test Plan

## Purpose
Defines the test strategy and sign-off gates for the In2IT EBS production website build. It scopes functional testing, cross-browser and cross-device coverage, content-parity verification, and link checking, and establishes the gates that must pass before deployment. It is the QA & Accessibility Agent's authoritative record of what is tested and how pass/fail is decided.

## Inputs Required
- Final Information Architecture (sitemap, route map, navigation model) from the Information Architecture Agent.
- Approved website copy from the Copywriting Agent.
- Component inventory and acceptance criteria from the Component Architecture Agent.
- Built site / staging environment from the Frontend Build Agent.
- Content Parity Checklist outcomes from the Content Parity Agent (the parity gate depends on this).
- SEO and conversion requirements from the SEO & Conversion Agent (metadata, redirects, structured data, CTA behaviour).
- Accessibility target standard and conformance level: Pending human input.
- Supported browser/device/viewport matrix: Pending human input.

## Owner Agent
QA & Accessibility Agent

## Completion Criteria
- Functional test cases are written for every page template and interactive component (navigation, forms, search, filters, CTAs).
- Cross-browser and cross-device test matrix is defined and executed against the agreed browser/device list.
- Content-parity gate is defined and tied to the Content Parity Checklist: every meaningful point in the corporate profile deck is confirmed present and uncontradicted on the live build, and the secondary source has not reduced or omitted deck content.
- Link-check pass (internal and external links, redirects, anchors) is defined and run with zero broken links permitted.
- Accessibility audit scope and the conformance target are recorded and executed.
- Each gate has an explicit pass/fail definition and a recorded result.
- Sign-off gates are listed in order with the owner who must approve each before deployment.

## Current Status
Not Started

## Pending Items
- Define the supported browser, device, and viewport test matrix once confirmed by the human owner.
- Define functional test cases per template after IA and Component Architecture are finalised.
- Wire the content-parity gate to the completed Content Parity Checklist (deck-versus-build verification).
- Define link-check tooling and the redirect verification list (depends on SEO & Conversion outputs).
- Define the accessibility conformance target and audit checklist.
- Define the ordered sign-off gates and the approver for each.

## Open Questions
- Which accessibility standard and conformance level should the build be tested against?
- Which browsers, devices, and minimum viewport widths must be supported?
- Who is the designated approver for each sign-off gate before deployment is authorised?
- Is automated link/regression testing in scope, or is the parity and link check manual for this release?
- What is the acceptable defect threshold (if any) for release, by severity?
