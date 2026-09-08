# Environment Variables

## Purpose
Maintains the inventory of environment variables and secrets needed to build, run, and deploy the In2IT EBS website across environments. It records each variable's name, purpose, the environment(s) it applies to, and where its value is stored, so configuration is documented without exposing sensitive data. This file is documentation only.

## Inputs Required
- Stack and framework configuration requirements from the Frontend Build Agent.
- Hosting platform and its secret/config storage mechanism: Pending human input.
- Third-party service and integration requirements (analytics, forms, search, SEO/structured data, etc.) from the SEO & Conversion and Component Architecture Agents.
- The environments to support (e.g. local, staging, production): Pending human input.
- The designated secret store / configuration manager: Pending human input.

## Owner Agent
Deployment Agent

## Completion Criteria
- A table enumerates every variable required by the build with these columns: Name, Purpose, Environment(s), Source / Secret Store, Required (yes/no).
- Every variable referenced in code or build configuration appears in the inventory.
- Each variable states where its real value is stored (the secret store or config manager), not the value itself.
- The no-secrets rule is stated and observed; the file contains zero real secret values.
- A clear statement covers how a new contributor obtains the actual values from the secret store.

## Current Status
Not Started

## Pending Items
- No real secret values will ever be stored in this file. This file records only variable names, purposes, environments, and where values live.
- Populate the variable table once the stack and integrations are known.
- Confirm the list of environments to be documented.
- Confirm the secret store / configuration manager and how access is granted.

Intended table structure (to be populated later):

| Name | Purpose | Environment(s) | Source / Secret Store | Required |
|------|---------|----------------|-----------------------|----------|
| Pending extraction | Pending extraction | Pending human input | Pending human input | Pending human input |

## Open Questions
- Which environments must be documented (local, staging, production, others)?
- Which secret store or configuration manager will hold the real values?
- Who is responsible for provisioning and rotating secrets, and how is access granted to the team?
- Which third-party integrations will require keys or tokens for this build?
