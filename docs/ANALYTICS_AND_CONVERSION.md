# Analytics and Conversion

**Implementation status, 7 September 2026:** local allowlisted CustomEvent hooks now distinguish CTA clicks, lead attempts, accepted leads and failures; they send no data externally. Server acceptance/failure logs contain only event and request ID. No provider, conversion dashboard, retention or alerts are configured. See [REMEDIATION_RUNBOOK.md](REMEDIATION_RUNBOOK.md). The provider/consent decisions below remain unresolved, not silently selected.

## Purpose
Defines the measurement plan for the In2IT EBS website: the analytics tooling, the events and conversion goals to be tracked, funnels, reporting dashboards, and consent/privacy handling. This file lets the SEO & Conversion Agent (Step 11) instrument the site so that business outcomes (enquiries, downloads, applications) are measurable, and ensures tracking is implemented during the Frontend Build and validated at QA.

## Inputs Required
- Selected analytics/measurement platform(s): Pending human input.
- Confirmed primary and secondary conversion actions for the site (e.g. contact, careers application, content download) aligned to the deck's stated offerings (Pending extraction).
- Final IA and page templates (from Step 5) to map events to pages.
- Component architecture (from Step 9) to identify trackable UI elements (forms, CTAs, navigation).
- Privacy/consent and cookie policy requirements (coordinate with the legal content; Pending extraction and Pending human input).
- Reporting stakeholders and required KPIs/dashboards: Pending human input.

## Owner Agent
SEO & Conversion Agent

## Completion Criteria
- Analytics platform(s) selected and documented with account/property setup notes.
- Event taxonomy defined (event names, parameters, naming conventions) for all key interactions.
- Conversion goals and macro/micro conversions defined and mapped to business value.
- Key funnels documented (e.g. landing to enquiry submission).
- Dashboard/report specifications listed with owners and review cadence.
- Consent management and privacy handling defined (consent gating of tags, data retention, anonymisation) consistent with the legal pages.
- Tracking implementation handoff notes provided for the Frontend Build Agent, with a QA verification checklist.

## Current Status
Not Started

## Pending Items
- Analytics platform selection: Pending human input.
- Consent/cookie banner approach and vendor: Pending human input.
- Definition of what counts as a qualified conversion (e.g. enquiry vs. download): Pending human input.
- Mapping of conversion actions to the services/industries described in the deck: Pending extraction.
- Confirmation of any existing analytics accounts or historical data to migrate: Pending human input.

## Open Questions
- Which analytics platform(s) will be used, and are there existing accounts to reuse?
- What are the priority KPIs and who are the dashboard recipients?
- What consent model is required for the target markets (opt-in vs. opt-out)?
- Are there third-party tools (CRM, marketing automation, ad pixels) that must integrate with site events?
- What data retention and anonymisation rules must the measurement setup comply with?
