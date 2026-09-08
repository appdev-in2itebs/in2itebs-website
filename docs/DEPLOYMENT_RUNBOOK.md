# Deployment Runbook

**Current implementation addendum, 7 September 2026:** use [REMEDIATION_RUNBOOK.md](REMEDIATION_RUNBOOK.md) for the actual Next.js commands, dedicated port 3107, ngrok isolation, environment contract, rollback and release blockers. The historical planning material below is retained; unfilled provider fields are not production configuration.

## Purpose
Provides the step-by-step operational procedures for building, deploying, and rolling back the In2IT EBS production website, plus DNS/hosting cutover and the pre-release checklist. It is the Deployment Agent's single reference for taking a verified build to production safely and reversing it if needed. Hosting and stack decisions are not assumed here and remain to be confirmed by the human owner.

## Inputs Required
- Verified, QA-passed build/staging artifact and sign-off from the QA & Accessibility Agent.
- Environment Variables inventory (see ENVIRONMENT_VARIABLES.md) for required configuration per environment.
- Hosting platform and provider: Pending human input.
- Build/runtime stack and build commands: Pending human input.
- Domain(s), DNS provider, and current DNS records: Pending human input.
- TLS/certificate approach: Pending human input.
- Redirect map (legacy URLs to new routes) from the SEO & Conversion Agent.
- Release approver and deployment window: Pending human input.

## Owner Agent
Deployment Agent

## Completion Criteria
- Build procedure documented with exact commands and prerequisites once the stack is confirmed.
- Deploy procedure documented end to end for the chosen hosting platform, including environment configuration steps.
- Rollback procedure documented with a clear trigger condition and a verified path back to the last good release.
- DNS/hosting cutover steps documented, including record changes, propagation checks, and TLS verification.
- Pre-release checklist completed (QA sign-off, parity gate passed, redirects in place, environment variables set, backups/rollback point captured).
- Post-deploy verification steps documented (smoke checks, key page and CTA checks, monitoring confirmation).
- Named approver and deployment window recorded.

## Current Status
Not Started

## Pending Items
- Record the hosting platform and provider once selected.
- Record the build/runtime stack and exact build/deploy commands once confirmed.
- Document DNS provider, domain(s), and the cutover sequence.
- Confirm the TLS/certificate approach.
- Capture the rollback trigger conditions and last-good-release retention approach.
- Confirm the deployment window and named release approver.

## Open Questions
- Which hosting platform/provider will the site be deployed to?
- What is the build/runtime stack, and what are the exact build and deploy commands?
- Who owns the DNS, and what is the approved cutover sequence and maintenance window?
- How is TLS provisioned and renewed for the production domain(s)?
- What event or metric triggers a rollback, and who authorises it?
- Are staging and production fully separate environments, and how is access controlled?
