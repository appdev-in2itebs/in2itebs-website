# Content Source of Truth

## Purpose
The canonical, faithful capture of every meaningful point in the In2IT EBS Corporate Profile deck (`In2IT EBS Corporate Profile _200526.pdf`, 45 slides). This is the authority all website copy and information architecture must trace back to. Nothing here is invented; every entry comes directly from the deck. Text was extracted with `pdftotext -layout`; image-only content (logos, some diagrams) is noted where it could not be machine-read.

## Inputs Required
- The In2IT EBS Corporate Profile deck (PRIMARY source of truth) — extracted.
- ~~A working PDF image renderer to transcribe the named-client logo wall (slides 42–43).~~ Resolved: PyMuPDF rendered the slides; logos transcribed and extracted to `assets/deck-clients/`.
- Owner confirmation on the metric conflicts and gaps listed in Open Questions.

## Owner Agent
Content Extraction Agent

## Completion Criteria
- Every meaningful point in the deck is captured, none omitted — **met for all text content (slides 1–45).**
- Each captured point has a stable ID (`SOT-01`…`SOT-45`) and provenance (deck slide number) — **met.**
- No content added that is not in the deck — **met.**
- Named-client logos (slides 42–43) transcribed — **met** (read from high-resolution PyMuPDF renders; logos extracted to `assets/deck-clients/`). A few low-confidence names flagged [?].
- Reviewed against the deck by the human owner — pending.

## Current Status
Needs Review

## How this document is organised
- One entry per deck slide, in deck order, IDs `SOT-01`…`SOT-45`.
- Each entry records: slide title, main message, key points, any metrics, and the suggested website page (per the approved 11-page IA).
- ⚠ marks internal conflicts or items needing owner confirmation (consolidated in Open Questions and `OPEN_QUESTIONS.md`).
- Sensitive items (clients, partner claims, certifications, metrics, accelerators, addresses) are also logged in `LEGAL_REVIEW.md`.

## Deck Extraction (slide by slide)

### SOT-01 — Cover (deck slide 1)
- **Main message:** "Corporate Profile."
- **Other elements:** Dated "May 2026". Marked "CONFIDENTIAL" on the cover.
- **Suggested website section:** Home (brand framing only). ⚠ Drop the "Confidential" marking and the "May 2026" date from all public pages.

### SOT-02 — At a Glance (deck slide 2)
- **Main message:** "A decade of enterprise transformation, delivered globally."
- **Subtext:** "Built for complex SAP-led programs with adjacent capability across Salesforce, Workday, cloud and application services."
- **Headline metrics:** 10+ Years of experience · 350+ Employees · 150+ Global customers · 30+ Countries delivered · 14+ Industry verticals · 12+ Industry solutions · 12+ Strategic partners · 10+ Proprietary accelerators. ⚠ "350+ Employees" conflicts with "550+ employees" on SOT-44; "10+ Years"/"A decade" to confirm.
- **Credentials:** SAP Gold Partner · RISE with SAP · PCE Partner · Salesforce Partner · Workday Services · CMMI · ISO 9001 · ISO 27001.
- **Suggested website section:** About (full stat band + credentials); condensed strip on Home; certs in footer.

### SOT-03 — Global Footprint (deck slide 3)
- **Main message:** "Delivery centres in 10 cities, projects across 30+ countries."
- **Body:** "Follow-the-sun coverage spanning four time zones, anchored by India delivery hubs and onshore presence in key client geographies."
- **Projects across 30+ countries:** India | UK | US | Canada | Singapore | UAE | Thailand | KSA | Kenya | Australia | South Africa | Belgium | Sri Lanka.
- **10+ Delivery Centres:** Bengaluru | Mumbai | Delhi | Bhubaneswar | Hyderabad | Chennai | Singapore | Dubai | Nairobi | Johannesburg.
- **Suggested website section:** About (footprint); Delivery Excellence (follow-the-sun); Contact (offices). ⚠ Footprint lists Mumbai/Chennai as delivery centres, but the Contact slide (SOT-45) lists only 4 India offices — reconcile.

### SOT-04 — What We Do (deck slide 4)
- **Main message:** "Four practices. One delivery engine."
- **Body:** "Each practice operates with its own deep specialization, while sharing a common delivery model, governance and account leadership."
- **Practices:**
  - **SAP Enterprise Solutions** — RISE · GROW · S/4HANA · Ariba · Concur · SuccessFactors · Syniti.
  - **Salesforce** — Sales · Service · Marketing · Commerce · Einstein · Industry Clouds.
  - **Workday** — HCM · Financials · Adaptive Planning · Workforce Analytics.
  - **Application Development & Managed Services** — Custom dev · Integration · Mobile · 24×7 AMS support.
- **Strategic Cloud Alliances:** AWS · Microsoft Azure · Google Cloud · SAP · Salesforce · Workday.
- **Suggested website section:** Services hub; teaser on Home; alliances on Why In2IT EBS.

### SOT-05 — Operating Architecture (deck slide 5)
- **Main message:** "Three Tiers, one continuous engagement."
- **Body:** "Clients engage at any tier — advisory, build, or run — and move across tiers as the program matures. The same delivery engine runs underneath all three."
- **TIER 01 — Business Consulting & Advisory:** Transformation strategy · Business case · Process re-engineering · Change management · Digital roadmap.
- **TIER 02 — Platform Transformation Services:** SAP S/4HANA & modules · Workday · Salesforce · Custom application engineering.
- **TIER 03 — Managed Services & Sustenance:** AMS · Application support · Technical operations · Continuous improvement.
- **One Delivery Engine:** FastForward methodology · Development factory · Global AMS bench · Account-level governance.
- **Suggested website section:** Services hub (3-tier model); One Delivery Engine → Delivery Excellence.

### SOT-06 — Engagement (deck slide 6)
- **Main message:** "Choose how you want us to deliver."
- **Body:** "Five engagement models, three delivery footprints, and a standard discovery-to-scale path that most clients follow on their first engagement."
- **Engagement models (five):** Resource Based · Turnkey · Managed Services · Fixed Bid · Partner Co-sourcing.
- **Delivery footprints (three):** Onsite Client · Near Shore Centre · Offshore Development Centre-India.
- **Discovery-to-scale activities (mapped across footprints):** Requirements Gathering & Prioritization; Statement of Work; Implementation Sign-Off & Launch Approval; Onsite Testing; Implementation; Planning; Prototyping; Project Management; Post Implementation Support; Help Desk; System Admin; Maintenance; Extension/Integration; Technical Design; Build Programming; Unit/Assembly Testing; Documentation.
- **Suggested website section:** Delivery Excellence (engagement models + footprints); summary on Services hub.

### SOT-07 — Practice 01 cover: SAP Capabilities (deck slide 7)
- **Main message:** "SAP Capabilities."
- **Key points:** SAP Gold Partner. 300+ consultants. 1,000+ combined years of SAP experience. ⚠ "300+ consultants" vs "350+ employees" total (SOT-02) appears inconsistent.
- **Suggested website section:** SAP Enterprise Solutions (hero).

### SOT-08 — SAP · Capability Overview (deck slide 8)
- **Main message:** "A Proud SAP Gold Partner."
- **Summary line:** "300+ consultants · 1,000+ combined years of SAP experience · 50+ clients across manufacturing, infrastructure, professional services, metals & mining, utilities."
- **Partnership Depth:** SAP Gold Partner; RISE with SAP (BTaaS); PCE & Co-Innovation Partner; Active in SAP user groups.
- **Industry Experience:** 50+ SAP clients; Manufacturing, Infrastructure, Mining; Utilities, Pro. Services; Public sector.
- **Specialized Skills:** 300+ consultants; 40% technical · 60% functional; Migration & transformation experts; All major platforms.
- **Solutions & IP:** RISE/GROW implementation; AMS support; Country payroll localizations; Packaged S/4HANA add-ons.
- **Suggested website section:** SAP Enterprise Solutions (overview).

### SOT-09 — SAP · Solutions, Services, Industries (deck slide 9)
- **Main message:** "What we deliver across SAP." "Three lenses on the same SAP practice — the platforms we configure, the services we provide, and the industries where we have the deepest delivery experience."
- **Solutions:** SAP S/4HANA Public Cloud · SAP S/4HANA PCE · SAP Ariba · SAP SuccessFactors · SAP Analytics Cloud · SAP Extension Suite · SAP Integration Suite · SAP C/4HANA · CALM & Solution Manager.
- **Services:** Digital transformation · End-to-end implementation · Rollout & carve-outs · Upgrade & migration · SAP advisory services · Analytics & reporting · SAP security services · Industry solutions · Support & maintenance.
- **Industries:** Automotive & Manufacturing · BFSI · Retail & E-commerce · Energy & Utilities · Engineering & Construction · Pharma & Life Sciences · Chemicals & Fertilizers · Government & Public Enterprises · Professional Services.
- **Suggested website section:** SAP Enterprise Solutions (solutions/services clusters); industries cross-link to Industries & Clients.

### SOT-10 — SAP · S/4HANA (deck slide 10)
- **Main message:** "Three paths to S/4HANA — we run all three."
- **Body:** "RISE, GROW, and Private Cloud Edition give clients different starting points. Our methodology, accelerators, and certified consultants cover the full spectrum."
- **RISE with SAP:** Business-process-led transformation; greenfield or brownfield; full S/4HANA transformation with integrated business services, infrastructure, and SAP-managed cloud. Greenfield · Brownfield · Selective Data Transition.
- **GROW with SAP:** Public cloud, fast time-to-value; pre-configured industry processes on SAP S/4HANA Cloud Public Edition; for mid-market and faster-moving units. Pre-configured · Best-practice · Quarterly innovation.
- **S/4HANA Private Cloud:** Customised, on dedicated cloud; PCE for organizations needing deep customization, complex integrations, or regulatory isolation; In2IT EBS is an SAP PCE Partner. Dedicated tenancy · Full customisation · PCE Partner.
- **Metrics:** 30% faster go-live vs benchmark · 25+ S/4HANA programs delivered · 100% go-live success rate.
- **Suggested website section:** SAP page → Core ERP & S/4HANA cluster.

### SOT-11 — SAP · Advisory Services (deck slide 11)
- **Main message:** "We help you decide before you commit."
- **Body:** "Six advisory engagements designed to de-risk the transformation decision — from initial product evaluation through to a board-ready roadmap."
- **Six advisory engagements:** Product Assessments & Evaluation · Proof of Concept / Value Advisory Services · Business Process Advisory · Discovery & Design for Transformation · Organisation Readiness Assessment · Maturity Assessment & Roadmap.
- **Capabilities:** Full-lifecycle consulting and application management; Global footprint, local expertise; Integrated commodity-to-premium services; Industry, technology and process assets in every engagement; Measurable business and IT outcomes; One global operating model — built for speed, quality and scale.
- **Suggested website section:** SAP page → Advisory & Implementation cluster.

### SOT-12 — SAP · Implementation & Roll-Out (deck slide 12)
- **Main message:** "SAP Activate, accelerated by In2IT EBS."
- **Body:** "Five Activate phases, compressed by accelerators, pre-built configurations and a single delivery team that runs from Discover through Run." "In2IT EBS has been a strategic partner with SAP in many different roles and is recognized by SAP as a certified provider of implementation services."
- **01 Path:** Greenfield (New build — New S/4HANA implementation; Process re-engineering on a clean core) · Brownfield (Convert in place — System conversion from ECC; Technical & functional upgrade).
- **02 Rollout:** Global (Build the template — Common SAP template build; Process harmonisation across geographies) · Localization (Adapt for country — Country-specific legal & tax rules; Localised business processes & payroll).
- **03 Methodology:** SAP Activate (standard framework with guided configuration); Rapid Deployment (In2IT RDS for accelerated go-live scenarios); Accelerators (pre-built tools, templates and IP); Solution Manager (governed rollouts on SolMan + In2IT toolkit).
- **Suggested website section:** SAP page → Advisory & Implementation cluster.

### SOT-13 — SAP · Human Experience Management / SuccessFactors (deck slide 13)
- **Main message:** "Full-suite SAP SuccessFactors, delivered at scale."
- **Metrics:** 125+ Projects delivered (globally across Core HR, Talent, Payroll, Workzone); 87+ Certified HXM consultants (70% Associate · 30% Professional certified); 10+ Live proofs of concept (Joule for HR, Talent Intelligence).
- **Modules:** Core HR & Talent (Employee Central, Recruiting, Onboarding, Performance, Succession & Career Development); Cloud Payroll & Compensation (Employee Central Payroll, Compensation Planning, Variable Pay, global statutory compliance); Time & Attendance (Time Management, Time Sheet, plus IN2IT's proprietary accelerator for complex time solutions); Learning & Talent Intelligence (LMS, Skills Ontology, Talent Intelligence Hub, AI-driven career and growth recommendations); Employee Experience (HR Workzone digital front-door, Qualtrics EX listening, Concur Travel & Expense integration); People Analytics & Planning (Workforce Analytics, Headcount Planning, executive scorecards and predictive attrition models).
- **Partnership focus:** Proof-of-concept partner for SAP · SuccessFactors extensions on BTP · Proprietary Talent, Time & HR solution · Joint Joule pilots for HR personas.
- **Highlights:** Only partner to successfully deploy 2 HR Workzone instances; Largest certified SAP HXM consultant pool in region; Proprietary iTAM accelerator for Time & Attendance; EBSx rapid-deployment kit with leading practices; Joule-for-HR enablement playbook; 100% success rate on HR transformation projects.
- **Suggested website section:** SAP page → Line-of-Business cluster (SuccessFactors/HXM).

### SOT-14 — SAP · AI-Powered Diagnostic (deck slide 14)
- **Main message:** "AI-powered diagnostic. Industry-benchmarked. Outcome-driven — engineered to unlock measurable HR value."
- **AI-Powered Diagnostic** ("ML on your tenant, not opinions on a spreadsheet"): ML audit of configuration, RBP and business rules; Anomaly detection across usage and audit logs; Joule & Talent Intelligence readiness scoring.
- **Industry Best-Practice Benchmark** (200+ peers across 12 industries): Process maturity vs sector top-quartile; Adoption, NPS and time-to-value benchmarks; Customization-to-standard ratio vs peers.
- **Outcome-Driven Roadmap** ("Quantified value, not a 60-slide deck"): Prioritized backlog with $ / FTE / hours saved; Joule, GenAI and clean-core activation plan; Executive-ready impact scorecard.
- **Measurable outcomes (typical In2IT Health Check engagement):** 30–40% reduction in customization debt; 25% lift in monthly active users; 2× faster Joule / AI activation; 4–6 wk typical engagement duration.
- **Highlights:** Proprietary Health Check 360 framework with AI accelerator; ML-driven configuration & adoption analytics; Industry benchmark dataset — 200+ companies, 12 sectors; Joule and Talent Intelligence readiness scorecard; Senior SuccessFactors architects in every engagement; Executive-ready output with quantified $/FTE impact; Optional remediation roadmap & AMS handover.
- **Suggested website section:** SAP page → AI & Intelligence cluster (signature offering; teaser on Home/Why).

### SOT-15 — SAP · Concur (deck slide 15)
- **Main message:** "End-to-end Concur, with the integrations to match."
- **Pillars:** Expense (automated capture, approvals and policy enforcement; mobile receipts, corporate card feeds, intelligent audit); Travel (online booking, traveller policy management, duty-of-care reporting, integrated supplier content); Invoice (supplier invoice capture, three-way match, payment processing, AP automation at scale).
- **Integrated with:** SAP S/4HANA · Salesforce · NetSuite · QuickBooks · Microsoft Dynamics · Workday · Intacct.
- **Metrics:** 25+ Concur implementations · 12wk average go-live · 4 country tax configs.
- **Suggested website section:** SAP page → Line-of-Business cluster (Concur).

### SOT-16 — SAP · Concur Integration (deck slide 16)
- **Main message:** "Concur, wired into your finance landscape." "Concur rarely sits alone. Our integration competency spans the platforms most enterprises run alongside it."
- **ERP / Finance:** SAP S/4HANA · Oracle EBS · Microsoft Dynamics · NetSuite · Intacct · QuickBooks.
- **HR & Workforce:** SuccessFactors · Workday · Oracle HCM · Identity providers.
- **Travel & Card:** Corporate card feeds · Travel suppliers · TMC integrations · Receipt OCR.
- **Suggested website section:** SAP page → Line-of-Business cluster (Concur, sub-block).

### SOT-17 — SAP · Ariba (deck slide 17)
- **Main message:** "Source-to-Pay, automated end-to-end."
- **Body:** "We implement the full SAP Ariba suite — from supplier discovery through invoice automation — integrated cleanly with SAP S/4HANA, Concur, and downstream finance systems."
- **Flow:** Source · Contract · Procure · Invoice · Pay.
- **Sourcing:** Spend analysis · Strategic sourcing · Supplier discovery · Auctions & RFx.
- **Contracts:** Contract authoring · Workflow & approvals · Compliance tracking · Clause library.
- **Procurement:** Guided buying · Catalog management · Punchout integrations · Mobile approvals.
- **Supplier Network:** 6M+ suppliers · PO collaboration · Invoice exchange · Risk management.
- **Metrics:** 15+ Ariba programs delivered · 40% avg P2P cycle-time cut · S/4 native integration.
- **Suggested website section:** SAP page → Line-of-Business cluster (Ariba).

### SOT-18 — SAP · Generative AI Co-Pilot / Joule (deck slide 18)
- **Main message:** "SAP's Generative AI Co-pilot — embedded across every SAP cloud application."
- **Deployment experience:** 10+ Joule rollouts across SuccessFactors, S/4HANA Cloud and SAC; 2 Custom Joule Studio agents & skills in production. Joule Practitioners: 60+.
- **Key points:** Early-adopter partner for SAP Joule & Joule Studio; Production Joule agents for HR self-service and ticket triage; Joule + (OpenAI, Claude) integration patterns; Custom skill library for Concur, Ariba, SuccessFactors; Responsible-AI guardrails and prompt governance; Adoption playbook to drive Joule usage across personas.
- **Four solutions:** 01 Joule for Business Users (natural-language access to HR, Finance, Supply Chain and CX data inside SAP apps); 02 Joule Studio (build custom AI skills and agents that plug Joule into your specific workflows); 03 Joule Agents (autonomous cross-app agents for Concur, Ariba, Fieldglass and ITSM scenarios); 04 Joule for Developers (ABAP / CAP code generation, unit-test scaffolding and dev acceleration).
- **Solutions and offerings:** Joule activation for SF & S/4HANA · Joule Studio custom agents · Joule + Claude interop · Adoption & change management for AI assistants.
- **Suggested website section:** SAP page → AI & Intelligence cluster (Joule).

### SOT-19 — SAP · AI on SAP BTP (deck slide 19)
- **Main message:** "Custom Generative AI, ML, and Document AI — all on SAP's Business Technology Platform."
- **Generative AI:** Custom GenAI apps on SAP AI Core with foundation models and HANA Vector Engine.
- **Machine Learning:** Predictive forecasting, anomaly detection, classification on S/4HANA data.
- **Embedded AI:** Pre-built AI scenarios across Finance, HR, Sales and Supply Chain.
- **Document AI:** Invoice, PO, contract and HR document extraction via Document Information Extraction.
- **Solutions and offerings:** Custom GenAI apps on BTP using SAP AI Core, Foundation Models and HANA Vector; RAG pipelines over SAP enterprise data (policies, contracts, HR knowledge bases); ML-driven forecasting, anomaly detection and intelligent process automation; AI governance, model lifecycle management and responsible-AI guardrails; Hyperscaler-agnostic deployments across AWS, Azure and Google Cloud.
- **Highlights:** Production GenAI use-cases delivered for HR and Finance; Pre-built RAG accelerator on HANA Cloud Vector Engine; AI Governance framework aligned with EU AI Act; Cross-skilled team: SAP + Python + LLM Ops; Joint POC partner for SAP AI Core innovations; Reference architectures for every hyperscaler.
- **Suggested website section:** SAP page → AI & Intelligence cluster (AI on BTP).

### SOT-20 — SAP · Clean Core Extensibility (deck slide 20)
- **Main message:** "Extending SAP, without modifying the core."
- **SuccessFactors Extensions:** Custom UI extensions using SAPUI5 / Fiori on BTP; Workzone for HR (digital front-door experience); Visa & Permit Management (proprietary solution); Shift Scheduling and Rostering applications; iTAM (proprietary Time & Attendance extension); Integrations to payroll, finance and 3rd-party HRMS; Side-by-side apps via Cloud Foundry and Kyma runtimes.
- **S/4HANA Extensions:** Clean-core extensibility (ABAP Cloud, RAP, key-user tools); Side-by-side apps on BTP using CAP (Node.js / Java); Fiori app development and custom analytical apps; Event-driven integration via SAP Event Mesh; Process automation with SAP Build Process Automation; Master-data harmonization across S/4 and SF; Migration of classic ABAP enhancements to BTP side-by-side.
- **Highlights:** 8+ proprietary BTP-based extensions in production; Clean-core certified delivery approach; Extension accelerators reduce time-to-value by 40%; Joint Proof-of-Concept partner with SAP; Cross-stack team: ABAP, CAP, Fiori, Node, Java; DevOps-enabled CI/CD pipelines for SAP extensions.
- **Suggested website section:** SAP page → Platform & Engineering cluster.

### SOT-21 — SAP · Syniti Data Management (deck slide 21)
- **Main message:** "Data migration is the real risk in S/4HANA."
- **Body:** "70% of SAP transformations slip because of data, not technology. Our Syniti practice combines SAP Advanced Data Migration (by Syniti) credentials with a proven five-stage migration approach."
- **Five stages:** Profile (assess source) · Cleanse (fix at source) · Construct (build & map) · Migrate (load & validate) · Govern (MDG & stewardship).
- **Data Migration:** SAP Advanced Data Migration (by Syniti); Pre-built ETL templates; ECC → S/4HANA conversion; Mock-load cycles & cutover orchestration; Reconciliation reporting.
- **Data Quality & MDG:** Syniti Knowledge Platform; SAP Master Data Governance; Cleansing rules & dashboards; Match & merge; Ongoing stewardship workflows.
- **Information Governance:** Data strategy & operating model; Policy & standards; Data-quality scorecards; Stewardship enablement; Master-data lifecycle.
- **Metrics:** 20+ ECC→S/4 migrations · 99.5% data integrity at cutover · 3× faster than manual ETL.
- **Suggested website section:** SAP page → Data & Analytics cluster.

### SOT-22 — SAP · Analytics Cloud (deck slide 22)
- **Main message:** "Analytics, planning, prediction — on a single SAP platform."
- **Body:** "We implement SAP Analytics Cloud as the front door to enterprise data, combining business intelligence, planning and predictive analytics in one experience." Capabilities: analyze the specifics of the business; simulate and predict what could happen next; plan and collaborate on a course of action; implement decisions to derive immediate value.
- **Seven benefits:** 01 Unified Data Insights · 02 Improved Data Accuracy & Efficiency · 03 Enhanced Decisions with Real-Time Dashboards · 04 AI-Powered Insights · 05 Streamlined Collaboration · 06 On-the-Go Access · 07 Data Security and Compliance.
- **How In2IT delivers SAC:** Pre-built dashboard accelerators · live connection patterns to S/4HANA, BW/4HANA, Datasphere · planning templates for FP&A, sales, workforce · average first-dashboard in 3 weeks.
- **Suggested website section:** SAP page → Data & Analytics cluster.

### SOT-23 — SAP · Analytics Offerings (deck slide 23)
- **Main message:** "The full SAP analytics stack, modernized."
- **Body:** "We deliver across SAP's current analytics portfolio — Analytics Cloud, BPC for planning, and Datasphere as the unifying data layer. Legacy stacks like Lumira are deliberately retired in favour of SAC."
- **SAP Analytics Cloud:** Self-service analytics, governed; Live & import models; Smart Predict & planning; Embedded into SAP apps.
- **SAP BPC / Group Reporting:** Enterprise planning & consolidation; Driver-based planning; Statutory consolidation; Multi-currency, multi-entity.
- **SAP Digital Boardroom:** Executive steering, in real time; Live drill-through to ERP; Strategic KPI views; Simplified steering meetings.
- **SAP Datasphere:** Business data fabric; Unified semantic model; Federated access; Replaces legacy data warehouses.
- **Suggested website section:** SAP page → Data & Analytics cluster (sub-block).

### SOT-24 — SAP · Packaged Solution (deck slide 24)
- **Main message:** "Business-ready, GST-compliant S/4HANA — out of the box."
- **Body:** "Our packaged S/4HANA solution combines pre-configured industry processes, embedded analytics, and Fiori UX into a deployment that goes live faster and runs leaner than a ground-up build."
- **Comparison:** Ground-up build = 12–18 months, tax & statutory config from scratch, discovery/design/test cycles, custom build, high risk. In2IT EBS Packaged S/4 = 16 weeks, GST-ready, Fiori (+ live BI).
- **What's inside the package:** S/4HANA Core · India localization & GST · Embedded real-time analytics · Fiori UX (desktop + mobile) · Day-2 AMS bench.
- **Suggested website section:** SAP page → Core ERP & S/4HANA cluster (Packaged S/4); signature offer teaser on Home/Why.

### SOT-25 — SAP · ABAP Factory (deck slide 25)
- **Main message:** "RICEFW, industrialised."
- **Body:** "An offshore ABAP factory built around Reports, Interfaces, Conversions, Enhancements, Forms and Workflow — delivered through a leveraged service-centre model with predictable throughput."
- **R — Reports:** Custom development of reports beyond SAP standard.
- **I — Interfaces:** IDoc, ALE, file transfer, XML, REST/SOAP APIs.
- **C — Conversions:** BAPI, LSMW, BDC tooling for one-time data migration.
- **E — Enhancements:** BAdI, User Exit, Implicit / Explicit Enhancement framework.
- **F — Forms:** ABAP Script, Smart Forms, Adobe Forms, PDF output.
- **W — Workflow:** Repeatable approval processes wired to business events.
- **Suggested website section:** SAP page → Platform & Engineering cluster.

### SOT-26 — SAP · Basis (deck slide 26)
- **Main message:** "The platform layer, operated as a service."
- **Body:** "Basis services span the full SAP lifecycle — from pre-implementation architecture to ongoing operations — typically delivered as managed service alongside our functional teams."
- **Plan:** Upgrade/migration strategy · OS & DB selection · Hardware sizing · Component selection · Landscape design.
- **Install:** OS configuration · DB install & config · ABAP/Java instances · Backup & restore strategy · TMS & Solution Manager.
- **Run:** ABAP/Java monitoring · DB backup admin · Early Watch reports · Workload tuning · Patches & upgrades.
- **Optimise:** OS/DB migrations · DB reorganisation · SAP Router config · SLD delta upgrades · Performance tuning.
- **Suggested website section:** SAP page → Platform & Engineering cluster.

### SOT-27 — SAP · The In2IT EBS Point of View: The Converged Intelligence Stack (deck slide 27)
- **Main message:** "The Converged Intelligence Stack." "We emphasize on bringing SuccessFactors, Joule, BTP AI, and extensions into one operating model."
- **Layers (bottom → top):** Data & Process Core (S/4HANA · SuccessFactors · Ariba · Concur · 3rd-party systems); Intelligence Fabric (SAP BTP · AI Core · HANA Vector · Foundation Models · Event Mesh); Assisted Experience (SAP Joule · Joule Studio · Joule Agents · Custom skills); Business Outcomes (Employee XP · Customer XP · Finance velocity · Supply resilience). Extensions · Integration · Governance run across all layers.
- **Three converging forces:** Composable (clean core, side-by-side extensions — swap components without re-platforming); Intelligent (GenAI, ML and Joule embedded into every persona's daily flow of work); Continuous (advisory, telemetry and lifecycle management keep value compounding).
- **Quote:** "Convergence is where SAP investments turn into measurable business outcomes."
- **Suggested website section:** SAP page (top framing band); vision teaser on Home; differentiator on Why In2IT EBS.

### SOT-28 — Practice 02 cover: Salesforce Capabilities (deck slide 28)
- **Main message:** "Reimagining the customer experience — Sales, Service, Marketing, Commerce, and Industry Clouds."
- **Suggested website section:** Salesforce (hero).

### SOT-29 — Salesforce · Capability Overview (deck slide 29)
- **Main message:** "Reimagining customer experience, end to end."
- **Body:** "We help enterprises transform their customer-facing functions — sales, service, marketing, commerce and field operations — using Salesforce as the digital backbone."
- **Lifecycle:** Acquire · Engage · Convert · Serve · Retain.
- **Clouds:** 01 Sales Cloud (pipeline acceleration, forecasting, partner enablement); 02 Service Cloud (omni-channel case management, knowledge, AI resolution); 03 Marketing Cloud (campaign, journey, personalisation across digital channels); 04 Commerce Cloud (digital storefronts, B2B/B2C commerce, partner portals); 05 Industry Clouds (Financial Services, Health, Communications and other verticals); 06 Einstein + Platform (predictive sales/service, Lightning extensions, custom Apex).
- **Suggested website section:** Salesforce (capabilities).

### SOT-30 — Salesforce · How We Engage (deck slide 30)
- **Main message:** "From strategy to steady state."
- **Body:** "Five engagement types covering the full Salesforce lifecycle — used independently or chained into a multi-year transformation programme."
- **Advisory:** CX strategy · Customer journey mapping · Lead-to-cash design.
- **Implementation:** Multi-cloud deployments · Data migration · Governance & change.
- **Integration:** MuleSoft · SAP & Workday connectors · Payment & telephony.
- **Engagement & Digital:** Marketing automation · Customer 360 · Einstein personalisation.
- **Managed Services:** Org health checks · Release management · L1–L3 AMS.
- **Suggested website section:** Salesforce (engagement models).

### SOT-31 — Practice 03 cover: Workday Capabilities (deck slide 31)
- **Main message:** "Modernising HR and finance functions on a single cloud platform."
- **Suggested website section:** Workday (hero).

### SOT-32 — Workday · Practice Overview (deck slide 32)
- **Main message:** "Enabling the modern workforce, on Workday."
- **Body:** "We partner with enterprises on full-lifecycle Workday transformations — from advisory and implementation through to integration and managed services."
- **HCM Transformation:** Core HR · Talent · Compensation · Benefits · Time & Absence.
- **Workforce Analytics:** People analytics, dashboards, predictive insights.
- **Financial Management:** Workday Financials, multi-entity accounting, planning.
- **Workforce Planning:** Headcount, scenario modelling, talent supply analysis.
- **Adaptive Planning:** Driver-based planning, forecasting, scenario analysis.
- **Practice strength:** Workday-certified consultants · multi-region experience · integration patterns with SAP, Salesforce, and legacy HR systems.
- **Suggested website section:** Workday (practice/capabilities).

### SOT-33 — Workday · Services & Delivery (deck slide 33)
- **Main message:** "Five engagement types, one Workday delivery team."
- **Body:** "From early advisory through tenant lifecycle management, our Workday delivery team operates as a single integrated unit across onshore and offshore."
- **Workforce Transformation Advisory:** HR digitisation roadmap · Process re-engineering · Change management.
- **Implementation:** Phased deployment · Configuration · Data migration · Parallel testing · Hypercare.
- **Integration:** Workday Studio · EIB · Core Connectors · SuccessFactors / Payroll / Identity.
- **HR Analytics:** Prism Analytics · People Analytics · Dashboards & reporting.
- **Managed Services:** Tenant management · Release support · L1–L3 support · Continuous optimisation.
- **Note:** Source text for this slide is partly garbled in extraction; items above are the confidently legible ones. ⚠ Verify against the slide during copy.
- **Suggested website section:** Workday (services).

### SOT-34 — Practice 04 cover: ADMS Capabilities (deck slide 34)
- **Main message:** "Application development, modernization and managed services across stacks."
- **Suggested website section:** ADMS (hero).

### SOT-35 — ADMS · Capability Overview (deck slide 35)
- **Main message:** "Build, integrate, run — across every stack."
- **Body:** "Our Application Development & Managed Services practice covers custom development, integrations, post-implementation support and continuous improvement across legacy and modern application estates."
- **Application Development Services:** Application Development · Custom Development · Open-Source Customization · Multiple Framework Support (incl. Laravel, CakePHP, Codeigniter, .NET etc.).
- **Integration Services:** Payment Gateway Integration · Third-party product integration · Salesforce, POS, ecommerce like Shopify & Magento · Webservices.
- **Optimization Services:** Advisory Services · System health Check assessment · Gap-fit Analysis · Organizational Change management · Quality Assurance · Optimization & continuous improvement.
- **Post-implementation Support:** Post-production Support-AMS · Enhancement · Upgrades.
- **Suggested website section:** ADMS (capabilities).

### SOT-36 — ADMS · Process & Technology (deck slide 36)
- **Main message:** "An application lifecycle — with every layer covered."
- **Body:** "Four lifecycle stages, anchored in AIM and ITIL, deployed across tailor-made, legacy and packaged application estates."
- **Lifecycle stages:** Design & Architecture · Development & Testing · Maintenance & Support · Optimisation.
- **Bespoke Applications:** Java, J2EE & allied tech; ASP.NET, PHP, Python; SharePoint, Power Apps; Android, iOS, Hybrid; BI: Power BI, SQL, SSRS; MEAN, Full-Stack, CMS.
- **Legacy Applications:** APEX; Mainframe; AS/400; VAX / VMS; PL/I, etc.; Migration & retirement.
- **Packaged App Integration:** SAP; Oracle Suite; Microsoft 365; OpenText; AWS / Azure; Qlikview, Tableau.
- **Suggested website section:** ADMS (process + technology).

### SOT-37 — How We Deliver cover: Delivery Excellence (deck slide 37)
- **Main message:** "Delivery Excellence." "Methodology, transition approach, and the factory model behind every engagement."
- **Suggested website section:** Delivery Excellence (hero).

### SOT-38 — Delivery · Methodology: In2IT FastForward (deck slide 38)
- **Main message:** "In2IT FastForward. Our proprietary delivery method."
- **Body:** "A branded delivery method built on SAP Activate, accelerated by pre-built assets, and governed by a single quality gate at every phase. Applied uniformly across SAP, Salesforce, Workday and ADMS programs."
- **Four accelerating layers:** 01 Pre-Built Assets (RDS accelerators, RICEFW templates, country-localizations, integration patterns and pre-configured S/4HANA solutions); 02 Single Delivery Team (same team from Discover through Run; no handoffs, no re-learning; onsite leads + offshore factory + AMS bench); 03 Quality Gates (stage-gate quality reviews at every Activate phase; independent assurance team, signed off by client steering); 04 Outcome-linked Pricing (fixed-bid and outcome-based commercials available alongside T&M; risk shared, not pushed).
- **Suggested website section:** Delivery Excellence (methodology); FastForward also referenced on SAP page and Why In2IT EBS.

### SOT-39 — Delivery · AMS Transition (deck slide 39)
- **Main message:** "16 weeks to safe steady-state."
- **Body:** "Our five-phase AMS transition runs from pre-transition planning to full-service commencement, with quality gates at every phase and overlap with incumbent teams."
- **Phases:** Pre-Transition Planning (Wks -4 to 0): governance setup, confirm transition plan, network connectivity, service desk bonding, team onboarding. Planning (Wks 1–2): team onboarding, detailed KT plan, access provisioning, phase completion criteria. Knowledge Acquisition (Wks 3–7): KT sessions, documentation drafts, application understanding doc, process & procedure doc. Shadow (Wks 8–12): shadow live tickets, update documentation, operational readiness review. Reverse Shadow (Wks 13–16): lead on ticket resolution, final documentation, service commencement.
- **Deliverables (by phase):** high-level then detailed transition plans; draft → final application understanding docs; draft → final process & procedure docs; phase completion reports.
- **Suggested website section:** Delivery Excellence (transition timeline).

### SOT-40 — Delivery · Development Factory, Industrialised (deck slide 40)
- **Main message:** "Development factory, industrialised."
- **Body:** "A standardised, repeatable, automated development model — built on factory principles to drive quality, productivity and predictable throughput."
- **Workflow:** Plan (Strategy Alignment, Integrated App Architecture, Demand Management, Projectize) · Build (Design, Develop, Rebuild, Testing, Release, Integrated Delivery) · Run (Test Env, Pre-Prod Env, Prod Env).
- **Factory principles:** Standard, repeatable, automated services in a leveraged service-centre model; Factory model with output measurement for quality, productivity and efficiency; Full ALM support for application development lifecycles; Integrated testing capability for quality assurance and compliance; Driven by proven best practices, frameworks, templates and tools.
- **Suggested website section:** Delivery Excellence (factory model).

### SOT-41 — Delivery · Factory Workflow (deck slide 41)
- **Main message:** "Demand. Factory. Release."
- **Body:** "How work flows through the factory: business demand becomes prioritized projects, projects feed an assembly-line development workflow, and outputs ship through structured releases."
- **Elements:** Wish List (business needs) → Demand (system managers) → To Factory (Plan / Change / Mods & Enhancements) → Assembly Line Capability (Analyze/Design, Requirements Specs, Build/Code, Test, UAT, Deploy, Release). Roles: Business Analysts, Delivery Coordinator, Developers, Tester/QA. Governance: In2IT EBS Development Methodology/Governance; In2IT EBS Apps Development Factory.
- **Suggested website section:** Delivery Excellence (factory workflow detail).

### SOT-42 — Clientele (1 of 2) (deck slide 42)
- **Main message:** "150+ global enterprises. Across regulated, complex industries."
- **Body:** "Selected clients across six sectors where we've delivered SAP, Salesforce, Workday and application transformation programmes."
- **Sectors shown:** Food & Beverages · Health & Pharma · Apparel & Fashion · Metals & Mining · IT & Professional Services · Infra & Housing.
- **Named clients (transcribed from the logo wall; to be shown as logo images on the site):**
  - *Food & Beverages:* Mrs Bectors Food Specialities Ltd · Cremica · Ajinomoto · Bio Pharma Services · Waycool · BreadTalk (BreadTalk Group Pte Ltd) · Vahdam.
  - *Health & Pharma:* Avra · Sentiss · Unichem Laboratories Ltd · Manipal Hospitals · Centrient · St. John's (National Academy of Health Sciences) · ZCL Chemicals Limited · Human Health [?] · Aknamed · TATA MD · Natural Remedies.
  - *Apparel & Fashion:* Bata · Rasasi · Welspun Flooring · RP Apparels · Vishal · Vardhman.
  - *Metals & Mining:* Arjas Steel · S R Rungta Group · OMC (Odisha Mining Corporation Limited) · Welspun Corp · Jindal Steel & Power · NALCO (National Aluminium Company Limited) · Vedanta · JSW.
  - *IT & Professional Services:* OLA · Tredence · ShareChat · AVASO · Wissen · altivate · Innovaccer · Responsive (formerly RFPIO) · Evoke Technologies · Accionlabs · Redington · Microland.
  - *Infra & Housing:* Welspun One Logistics Parks · Wipro Infrastructure Engineering · WeWork · AFCONS · GROHE · Kolte Patil · Brickwork India · "We" [?].
  - Logos extracted to `assets/deck-clients/` for display as images (owner directive: use the logos, not text). Names marked [?] are low-confidence and should be confirmed visually during design.
- **Suggested website section:** Industries & Clients.

### SOT-43 — Clientele (2 of 2) (deck slide 43)
- **Main message:** "More sectors, and more success stories."
- **Body:** "Additional sectors served, and three brief spotlight stories. Note: detailed case studies are available on request, under NDA."
- **Sectors shown:** Automotives · Chemicals · PSUs · Services & BFSI · Real Estate · Others.
- **Named clients (transcribed from the logo wall; to be shown as logo images on the site):**
  - *Automotives:* Hero · Triveni Turbines · Tata BlueScope Steel · LTB [?] · Denso · Shyam Steel · MG · Wipro · Trident Group · ARAI (Automotive Research Association of India) · Kirloskar Electric · PCBL.
  - *Chemicals:* Valvoline · Deepak Fertilizers and Petrochemicals Corporation Limited · Gharda Chemicals Limited · Gulbrandsen Technologies · MCPi (MCPi Private Limited).
  - *PSUs:* NALCO · Kenya Railways · OMC (Odisha Mining Corporation Limited) · AP Transco · Delhi Transco Limited · NTPC · BSNL · BHEL.
  - *Services & BFSI:* NCDEX · Brickwork India · Narayan Seva Sansthan · Groww · NIIT · POS Malaysia · Trilegal · Cyril Amarchand Mangaldas.
  - *Real Estate:* Kolte Patil · WeWork · AIPL · PAVAI · ANAROCK · Varindera Constructions Limited · Panchshil · "We" [?].
  - *Others:* Orient Cement · Physics Wallah · JK Paper Ltd · Bajaj Allianz · InLife (Insular Life).
  - Logos extracted to `assets/deck-clients/` for display as images. Names marked [?] are low-confidence; confirm visually during design.
- **NDA note:** Detailed case studies are available on request, under NDA → render as a gated "request under NDA" prompt; do NOT publish case-study detail.
- **Suggested website section:** Industries & Clients.

### SOT-44 — Why In2IT EBS (deck slide 44)
- **Main message:** "Three reasons enterprises choose us — and stay with us." "Not seven generic claims. Three differentiated capabilities, each backed by evidence."
- **01 Partnership Depth:** Top-tier SAP credentials — SAP Gold Partner, RISE with SAP (BTaaS), PCE Partner and Co-Innovation Partner — "a combination held by a narrow group of firms globally." Gold · RISE · PCE · Co-Innovation.
- **02 Delivery Economics:** "Availability at scale and speed." 550+ employees across 10 delivery centres ⚠ (conflicts with 350+ on SOT-02); Follow-the-sun coverage across four time zones, with proven offshore-led AMS; 1,000+ combined years of SAP experience.
- **03 Accelerated Outcomes:** FastForward methodology — branded delivery method built on SAP Activate, accelerated by pre-built assets — "compresses S/4HANA timelines by up to 28%." RDS · Localization Pack · Industry templates.
- **CTA:** "Next step: let's schedule a 30-minute discovery workshop to map your transformation priorities."
- **Suggested website section:** Why In2IT EBS; 3-reasons teaser on Home.

### SOT-45 — Closing / Contact (deck slide 45)
- **Main message:** "Thank you. Let's talk about your transformation."
- **India Offices (4):**
  - **Bangalore** — In2IT Enterprise Business Services Pvt Ltd, 3rd Floor, Crescent 4, Prestige Shantiniketan, ITPL Main Road, Whitefield, Bengaluru, Hoodi, Bangalore North, Karnataka – 560048.
  - **Bhubaneswar** — In2IT Enterprise Business Services Pvt Ltd, Fortune Tower, 1st Floor, Zone - C, Bhubaneswar, Odisha - 751023, India.
  - **Hyderabad** — In2IT Enterprise Business Services Pvt Ltd, 4th Floor, Elite, Manjeera Trinity Corporate, JNTU-Hitech City Road, KPHB, Kukatpally, Hyderabad – 500072.
  - **Delhi NCR - Noida** — In2IT Enterprise Business Services Pvt Ltd, 26th Floor, Unit No. 2615A & 2616, Astralis Tower, Sector- 94, Noida-201301.
- **Global Subsidiaries (5):** Singapore — In2IT Enterprise Business Services Pte Ltd; Dubai — IN2IT EB Solutions LLC; USA — In2IT Enterprise Business Services Inc; Kenya — In2IT Enterprise Business Services Kenya Limited; South Africa — IN2IT Enterprise Business Services (Pty) Ltd.
- **Footer certifications:** CMMI · ISO 9001 · ISO 27001 · SAP Gold Partner · RISE with SAP · PCE Partner.
- **Suggested website section:** Contact (offices + entities); certifications in global footer.

## Pending Items
- **Named-client logos (SOT-42, SOT-43):** transcribed and extracted as image assets to `assets/deck-clients/` (94 files). Confirm the few [?] low-confidence names during design; curate/optimise logo files (transparent, consistent sizing) in the build.
- **Workday Services slide (SOT-33):** verify the engagement-type details against the slide during copy (extraction text was partly garbled).
- Owner review/sign-off of this extraction against the deck.

## Open Questions
- Is `In2IT EBS Corporate Profile _200526.pdf` the final, approved version for extraction?
- ✅ (Resolved 2026-06-03) **Employees:** **350+** is authoritative — use everywhere; drop "550+" (SOT-44).
- ✅ (Resolved 2026-06-03) **SAP consultants:** **300+** is authoritative, shown as SAP-practice consultants (distinct from the 350+ company total).
- ✅ (Resolved 2026-06-03) **Years of experience:** **10+ years**.
- ✅ (Resolved 2026-06-03) **Delivery centres / cities:** show **both** — the 10+ delivery centres (SOT-03 cities) **and** the 4 office locations; render the deck's named locations **as office locations**. Contact *details* (emails, phones) come from the old website. ⚠ Address conflict between deck and old-site for Bangalore/Hyderabad still to be confirmed (see `OPEN_QUESTIONS.md`).
- ✅ (Resolved 2026-06-03) "Confidential" marking and "May 2026" date (SOT-01) are **dropped** from all public pages.
- (Resolved) Named-client logo wall transcribed via PyMuPDF render and extracted as image assets to `assets/deck-clients/`; a few [?] names to confirm visually during design.
- Are speaker notes, appendices, or higher-resolution source assets (e.g. logo files) available?
