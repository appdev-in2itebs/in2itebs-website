# Performance Requirements

## Purpose
Defines the performance targets and budgets the In2IT EBS website must meet: Core Web Vitals thresholds, asset and image strategy, caching policy, and how performance is measured and verified. This file is owned by the QA & Accessibility Agent (Step 12) and informs the Frontend Build (Step 10) and Deployment (Step 13) so that performance is designed in rather than retrofitted.

## Inputs Required
- Confirmed numeric performance targets (Core Web Vitals and load budgets): Pending human input.
- Final component architecture and page templates (from Step 9) to size budgets per template.
- Design system asset specifications — image formats, icon approach, and the brand typefaces (two-font system) — from Step 7.
- Selected hosting/CDN and deployment platform (from Step 13) to define caching strategy.
- Expected traffic and device/network profiles for the target markets: Pending human input.

## Owner Agent
QA & Accessibility Agent

## Completion Criteria
- Core Web Vitals targets set (LCP, INP, CLS) with pass thresholds for mobile and desktop.
- Page weight and request-count budgets defined per page template.
- Image strategy documented (formats, responsive sizing, lazy loading, compression).
- Font loading strategy documented for the brand typefaces to avoid layout shift and render blocking.
- Caching and CDN policy defined (cache headers, static asset versioning, invalidation).
- Verification method specified (tools, lab vs. field measurement, pass/fail gates in QA and pre-deployment).
- Targets reviewed against the device/network profile of priority markets.

## Current Status
Not Started

## Pending Items
- Specific numeric Core Web Vitals and page-weight budgets: Pending human input.
- Confirmation of hosting/CDN to finalise caching policy: Pending human input (depends on Deployment, Step 13).
- Image and media volume estimate (depends on extracted content and design): Pending extraction.
- Decision on self-hosted vs. third-party-hosted brand fonts: Pending human input.

## Open Questions
- What Core Web Vitals and load-time targets must the site meet, and for which device/network baseline?
- Are there contractual or stakeholder SLAs for page speed?
- What is the expected volume and weight of imagery/media on key pages?
- Should brand fonts be self-hosted, and is a webfont fallback acceptable?
- Which performance-monitoring tool will provide the verification source of truth?
