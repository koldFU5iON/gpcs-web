# Changelog

All notable changes to the GPCS (Game Project Classification Standard) will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) for specification releases.

---

## [Unreleased]

### Changed
- **Major positioning shift**: Reframed whitepaper from "please adopt this standard" to "comprehensive proposal under testing" based on critical reviewer feedback
- **Section 8 (Use Cases)**: Strengthened B2B infrastructure framing, repositioned consumer-facing use cases as secondary/future
- **Section 13 (Call to Adoption)**: Complete rewrite from prescriptive demand to invitation for experimental implementation, added "What This Is NOT" subsection
- **Executive Summary**: Softened adoption language to invite testing, feedback, and experimental implementation rather than immediate adoption
- **README.md**: Updated "Adoption" section to "Status & Testing" reflecting experimental pilot approach and version 0.5 proposal status

### Added
- **Section 11 (Testing and Validation)**: Comprehensive new section with pilot methodology (awards → grants → platforms), data collection approach, success criteria for v1.0 transition (≥200 projects, ≥2 cycles), and contact for partnerships
- **Section 10.8 (Adoption Challenges and Mitigation Strategies)**: Honest acknowledgment of four key barriers (complexity, participation incentives, information sensitivity, network effects) with realistic mitigation strategies
- **Section 14 (Acknowledgments)**: New section for reviewer credits (placeholder for names pending permission)
- **"How to Cite This Work"** section after Executive Summary with APA format, implementation attribution guidance, and CC BY 4.0 license statement

### Planned
- Web-based rating calculator implementation
- Badge/certification visual assets and specifications
- Integration guides for platforms, awards bodies, grant programmes
- Public registry implementation (database schema, API endpoints)
- Case study collection from historical projects
- Community feedback mechanism (GitHub discussions, Discord)

---

## [0.5.0] - 2025-12-15

### Major Changes: Publication-Ready Revision

This release represents a comprehensive revision based on expert stakeholder review, addressing critical gaps in specification completeness, governance, and adoption readiness. The framework has been renamed to emphasise project-centric rating.

### Breaking Changes
- **IGSC → GPCS Rename**: "International Game Studio Classification" → "Game Project Classification Standard"
  - Reflects that projects are rated, not studios
  - All acronym references updated throughout document
  - White paper renamed to `GPCS-White-Paper.md`; previous IGSC version preserved as `IGSC-White-Paper-old.md` for backward compatibility with existing links

### Added

#### P0 - Critical for Credibility

- **Section 7.8: Project Rating Form** (Implementation-Ready Specification):
  - Complete 12-question self-rating form with bracketed ranges
  - Studio questions: team size, infrastructure, track record, financial health, geographic footprint
  - Publisher questions: financial scale, market reach, support services, platform relationships
  - Other source questions: grants, platform support, co-development, community funding
  - Rating tier score ranges table (AAA=90-100, AA=80-89, A=70-79, BBB=60-69, BB=50-59, B=40-49, C=0-39)
  - Worked example: "Starlight Venture" project showing complete calculation methodology
  - **Specification is now runnable** - implementers can build rating system directly from this

- **Section 7.9: Verification Tiers**:
  - **Unverified**: Self-reported, no evidence required, displayed with flag
  - **Verified**: Public evidence required (LinkedIn profiles, press releases, company registry, credited titles)
  - **Audited**: Third-party auditor reviews confidential materials (financials disclosed to auditor but NOT published)
  - Comparison table showing evidence requirements, credibility levels, typical costs, consequences for false claims
  - **Business model opportunity**: Audited tier creates market for audit services industry
  - Addresses gaming/manipulation concerns through graduated verification

- **Section 4.2: Bond Rating Methodology Citations**:
  - Added S&P Global Ratings Definitions (2024), Guide to Credit Rating Essentials
  - Added Moody's Rating Symbols & Definitions, Understanding Ratings
  - Removed [CITATION NEEDED] placeholder
  - Proper primary sources for financial credit rating methodology

- **Section 7.3: Scoring Model Justification Tightened**:
  - All numeric constants labeled "Version 0.4 defaults pending industry calibration"
  - Justified weighting ratios (studio 50-60%, publisher 30-40%, other 10-20%)
  - Justified floor constraint (max +2 tiers) and ceiling constraint (highest source -1 tier)
  - Added exception handling for co-development and outsourcing-heavy productions
  - Acknowledged these are hypotheses requiring validation through adoption data

- **Case Study Added (Section 3.4)**: The Game Awards 2025 - Megabonk withdrawal
  - Developer withdrew from "Best Debut Indie Game" after clarifying previous games shipped under other studio names
  - First voluntary withdrawal in The Game Awards history
  - Demonstrates need for verifiable structural criteria vs. relying on creator integrity
  - GPCS solution: structural classification + "debut" eligibility flag prevents category mismatches

#### P1 - Strong Improvements for Adoption

- **Section 5.3.1: Co-Development as First-Class Source**:
  - New subsection defining co-development partners as distinct source type
  - Rating criteria: headcount bands, service scope (art-only to full production), track record, contract duration, infrastructure
  - Examples: AAA co-dev (Virtuos, Keywords Studios) to B/C co-dev (freelance collectives)
  - Two rating options: Additional source OR combined studio source
  - Addresses outsourcing-heavy production models explicitly

- **Section 5.5 & 6.4: Independence Marker (Second Output Code)**:
  - **I0**: Fully independent (self-published, studio owns IP, no publisher control)
  - **I1**: Partial independence (publisher-backed, retained creative control, studio owns or co-owns IP)
  - **I2**: Publisher-controlled (publisher drives creative decisions, typically owns IP)
  - **I3**: First-party/subsidiary (owned by platform holder or major publisher)
  - **Dual output format**: Capacity/Independence (e.g., "A/I0" or "AAA/I3")
  - **Addresses "indie discourse"** without conflating independence with production scale
  - Independence marker is OPTIONAL - capacity rating stands alone if needed
  - All examples throughout document updated to show dual code

- **Section 5.2: Publisher Transparency (Named vs Shadow)**:
  - **Named Publisher**: Publicly disclosed (press releases, website listings, store pages)
  - **Shadow Publisher**: VC-backed or undisclosed financial backing (NDA, stealth publishing)
  - **Self-Published**: No external publisher or major funder
  - Does NOT rate publishers on "support intensity" (Light/Standard/Full) to avoid judgmental positioning
  - Publisher capacity rating (AAA, AA, A) already indicates capability
  - Support details shown on certificate/badge, not in shorthand code

- **Section 5.1 & Rating Form Q1: Team Size Definition Clarified**:
  - **Included**: Core FTE staff, long-term contractors (6+ months committed)
  - **Excluded**: Short-term contractors (<6 months), co-dev partners (rated separately), shared central services (QA/loc)
  - **Peak vs. Average**: Use average headcount during active development, not peak
  - **Multi-project studios**: Count only dedicated headcount for the specific project being rated
  - Explicit guidance added to each studio tier definition

- **"What GPCS Is NOT" Warning Box** (after Executive Summary):
  - Unavoidable box for skim readers with 5 bullets:
    - NOT quality or artistic merit
    - NOT commercial potential or guaranteed success
    - NOT genre scope or development duration
    - NOT cultural/aesthetic "indie" identity
    - NOT a replacement for personal taste or critical judgment
  - **Examples**: Stardew Valley (C-rated masterpiece), Anthem (AAA-rated commercial failure)
  - Key message: GPCS provides context, not judgment

- **Section 4.2: Bond-Rating Analogy De-Risked**:
  - Renamed to "Capacity Rating Scale (Bond-Style Nomenclature)"
  - Added comparison table: Bond Ratings (creditworthiness/default risk) vs. GPCS Capacity Ratings (production capacity/resource backing)
  - Consistently refers to outputs as "capacity ratings" throughout document
  - Explains WHY borrowing the scale (familiar nomenclature, avoids adoption friction, proven framework)
  - Clear distinction: GPCS does NOT assess financial risk or investment quality

- **Section 6.3: Examples Strengthened**:
  - Added "why" bullets for each example explaining team size band, infrastructure level, track record
  - Added disclaimer: "Examples are illustrative only, subject to change based on updated information, and time-bound to studio status at project development"
  - Independence markers added to all examples (e.g., God of War AAA/I3, Hades A/I0, Stardew Valley C/I0)
  - Expanded notes section with detailed example justifications

- **Section 5.4: Outcome Metrics Operational Impact Explained**:
  - **Rule 1**: Outcomes NEVER change original prospective project rating (rating is fixed at time of self-classification)
  - **Rule 2**: Outcomes MAY influence future project ratings IF studio capacity evolved (e.g., studio hired, secured larger publisher)
  - **Rule 3**: Outcomes used for research, benchmarking, lifecycle tracking, punch-above-weight identification
  - **Rule 4**: "Re-rating at milestones" refers to during-development milestones (funding secured, publisher signed), NOT post-launch re-rating
  - **Example**: Hollow Knight lifecycle (Team Cherry rated B/BB at development → R3-R4 outcome → Silksong likely BBB/A based on studio growth)

#### P2 - Publication-Grade Quality

- **Section 7.1: Mermaid Visual Diagram**:
  - Comprehensive flowchart showing system flow:
    1. Source Ratings (Studio + Publisher + Other) →
    2. Weighted Combination →
    3. Floor & Ceiling Constraints →
    4. Project Rating Output (Capacity + Independence) →
    5. Post-Launch Outcome Tracking
  - Color-coded: Green (capacity rating), Blue (independence marker), Orange (full project code), Purple (outcome metrics)
  - Legend explaining dashed arrows (optional processes)

- **Section 11.3: Governance Mechanics**:
  - **Proposal process**: Who can propose changes, what can be proposed, proposal requirements (RFC format)
  - **Review cadence**: Quarterly review cycles for minor changes, annual major release cycle
  - **Decision authority**: Current (single maintainer) → Future (9-member advisory board with stakeholder representation)
  - **Voting thresholds**: Simple majority (minor tweaks), supermajority 2/3 (major changes), near-unanimous 8/9 (breaking changes)
  - **Backward compatibility rules**: Grandfathered ratings vs. universal re-rating with transition periods
  - **Version control**: Patch/Minor/Major semantic versioning, public changelog, diff tools for tier comparison
  - **Example changelog entry**: Hypothetical v0.5 showing how methodology changes would be documented

- **Section 10.7: Global Applicability Guardrails**:
  - **Core principle**: GPCS measures capacity (infrastructure, headcount, track record), NOT burn-rate equivalence
  - **Example**: 30-person studio in Poland vs. California both rated similarly despite 3x budget difference
  - **Four justifications** for no cost-of-living adjustment:
    1. Capacity-focused (what can be built, not what it costs)
    2. Simplicity (regional indexing adds enormous complexity)
    3. Quality focus (expensive ≠ better, cheap ≠ worse)
    4. Lifecycle consistency (studios relocate, costs change)
  - **Limitation acknowledged**: Explicitly states this WILL face criticism, explains why GPCS does not normalize for purchasing power parity
  - **Future consideration**: Could be revisited if broad stakeholder consensus emerges for regional cost indexing

### Changed

- **Title and branding**: All references updated from "International Game Studio Classification (IGSC)" to "Game Project Classification Standard (GPCS)"
- **Terminology**: "Capacity rating" used consistently instead of ambiguous "project rating" or "classification"
- **Style and consistency**:
  - Fixed "1990's" → "1990s" throughout
  - British English used consistently (standardised, recognised, organised, etc.)
  - Professional academic tone maintained, informal phrasing removed
  - All section cross-references validated
- **Examples format**: All project rating examples now include capacity/independence dual code (e.g., "A/I0", "AAA/I3")
- **Rating form integrated**: Section 7 restructured to include complete self-rating specification (7.8) and verification tiers (7.9)

### Fixed

- Removed ambiguity in "team size" definition across all studio tier descriptions
- Clarified publisher role (capacity backing vs. support intensity judgment)
- Addressed bond rating analogy prestige confusion with explicit comparison table
- Strengthened outcome metrics operational rules to prevent rating manipulation
- Added missing governance decision mechanics (previously intent-only)

### Design Philosophy Updates

- **Dual-code output**: Capacity/Independence format (e.g., "A/I0") addresses both production scale AND ownership/creative control
- **Verification tiers**: Graduated trust model from self-reported to third-party audited enables appropriate verification for use case (awards may require Verified+, grants may require Audited)
- **Implementation-ready**: Rating form specification enables immediate platform/tool development
- **Business model**: Audited verification tier creates sustainable revenue model for third-party audit services
- **Global applicability**: Explicitly scopes out regional cost adjustments, focuses on capacity measurement

### Credibility Improvements (December 15, 2025)

Following expert stakeholder review, critical credibility fixes were applied to transform the document from "strong proposal" to "credible standard" ready for adoption:

**Priority 1 Fixes:**
- **Scale Consistency Resolved**: Removed CCC/CC/C sub-tiers from public scale. Public-facing scale is now clean AAA/AA/A/BBB/BB/B/C (7 tiers). CCC/CC removed from all public outputs; C tier now covers solo to micro-team projects (1-4 people) with rationale explaining simplified lower tiers.
- **Calibration Plan Added (Section 7.10)**: Comprehensive validation methodology with 100-project test dataset, 15-20 person expert panel, agreement targets (>80% within ±1 tier), governance rules for weight adjustments (±10% per release), transition periods, transparency commitments, and Q1-Q4 2026 timeline. Explicitly framed as "test bed subject to stakeholder scrutiny."
- **Consistency Pass**: Added punchy clarification "Studios do not have a single GPCS rating; projects do" in Section 4.1. Updated all "classify studios" phrasing to "rate projects; evaluate studios as sources" throughout document.
- **"Shadow Publisher" Renamed**: Changed to "Confidential Publisher" (neutral, professional terminology). Updated triad to "Named / Confidential / Self-Published." Reframed as standard business practice, not evasion.
- **Implementation Brief Added**: New 1-page decision-maker summary after Executive Summary covering What GPCS Is, What It Outputs (with example), What Data Is Required, How Verification Works, Three Adoption Asks (Awards, Grants, Platforms), and Why This Works. Provides elevator pitch for platform operators, awards bodies, grant programmes, publishers.

**Priority 2 Fixes:**
- **Visual Badge Example Added (Section 7.9)**: ASCII art badge mockup plus full certificate breakdown showing realistic project data (Starlight Venture example with source ratings, verification details, QR code reference).
- **I1/I2 Boundary Rules Clarified (Section 6.4)**: IP ownership is primary differentiator. I1 = Studio retains IP (or co-owns), I2 = Publisher owns IP. Explicit boundary rules added with examples. New Q12 in rating form for IP ownership.
- **Other Sources Weight Cap Defined (Section 7.3)**: 20% maximum weight unless representing production capacity >30% of studio headcount. Exception for co-development partners (can go up to 30% or be combined with studio source). Rationale: grants elevate financially, co-dev provides production capacity.
- **Mermaid Diagram Fallback Added (Section 7.1)**: Plain-English 6-step flow description for environments that don't render Mermaid diagrams (source ratings → weighting → constraints → output → independence → outcomes).
- **References Standardized (Section 13)**: Applied consistent citation format across all subsections (Author/Organization. (Year). "Title." *Publication/Source*. Available at: [URL]). Fixed bare URLs, missing publication info, unclear dates.

### Notes

- Version bumped to 0.5.0 to reflect publication-ready status and significant additions
- Document is now suitable for stakeholder review (platforms, awards bodies, grant programmes)
- Implementation guides, marketing materials, and technical tools remain planned for future releases
- Community feedback mechanisms (GitHub discussions, Discord) to be established post-publication
- Next major milestone: v1.0 (formal standard release following initial adoption and calibration)

### Added (Post-0.5.0 Notes)

- **Verification Guidance Updates**:
  - Tiered verification renewal cadence for live-service/SaaS projects (annual self-report/verified/audited refresh depending on tier).
  - Registry operations note aligning renewal fees to verification levels and clarifying badge removal when projects lapse.
- **Re-rating Clarification**:
  - Additional guidance for long-running titles that change ownership or team scale (e.g., Minecraft, PUBG) showing how new ratings are logged while preserving the original entry.

---

## [0.4.0] - 2025-12-11

### Major Conceptual Shift: Projects Are Rated, Not Studios

This release represents a fundamental evolution in the IGSC framework, transitioning from studio classification to project-based rating using bond-style nomenclature.

### Added
- **Bond-Style Rating Scale**: Full AAA/AA/A/BBB/BB/B/CCC/CC/C nomenclature with +/- modifiers
  - Section 4.2: Explanation of bond rating origins in financial markets and applicability to games
  - Preserves industry-familiar terminology (AAA/AA/A) while adding formal structure
- **Source Rating Methodology** (Section 4.3):
  - Studios, publishers, and funders are now rated as independent "sources"
  - Sources combine to produce project ratings
  - Same studio can have multiple projects with different ratings
- **Studio Source Tier Definitions** (Section 6.1):
  - AAA Studio: 200+ staff, multiple departments, proven AAA track record (e.g., Ubisoft Montreal, EA DICE)
  - AA Studio: 80-200 staff, full departmental structure (e.g., Larian pre-BG3, IO Interactive)
  - A Studio: 30-80 staff, emerging departments
  - BBB Studio: 15-30 staff, first commercial title shipped
  - BB Studio: 10-15 staff, mix of FT/contractors
  - B Studio: 5-10 people, mostly part-time
  - CCC/CC/C Studio: 1-4 people, hobbyist/part-time
  - Each tier includes indicators, examples, and modifier guidance (+/-)
- **Publisher/Funder Source Tier Definitions** (Section 6.2):
  - AAA Publisher: $50M+ budgets, global reach (e.g., Sony, Microsoft, EA)
  - AA Publisher: $5M-$30M budgets (e.g., Devolver, Annapurna, Private Division)
  - A Publisher: $1M-$5M budgets (e.g., Raw Fury, Fellow Traveller)
  - BBB/BB/B/C Publisher tiers with financial scale and support services
- **Project Rating Combination Methodology** (Section 7.3):
  - **Recommended Approach**: Weighted Floor-and-Ceiling Model
  - Studio: 50-60% weight (capability foundation)
  - Publisher: 30-40% weight (resources/reach)
  - Other sources: 10-20% weight (supplementary)
  - Transparent explanation of alternative approaches considered
- **New Source Types** (Section 5.3):
  - Platform holder support (ID@Xbox, PlayStation Partners, Epic MegaGrants)
  - Regional/government grants (Film Victoria, Creative Europe, CMF, UK Games Fund)
  - Community funding (Kickstarter, Patreon, Fig)
  - Technology partners (Epic, Unity, middleware licensing deals)
- **source-rating-criteria.md**: Standalone reference document for studio/publisher source ratings
- New use case (Section 8.6): Platform Curation and Discovery

### Changed
- **Document subtitle**: "A Multi-Dimensional Taxonomy for Game Studios and Projects" → "A Bond-Style Rating System for Game Projects"
- **Executive Summary**: Completely rewritten to reflect project-based rating approach
- **Section 4 (The Framework)**: Restructured with four subsections explaining source-based methodology
- **Section 5 (Classification Dimensions)**: Restructured to "Source Rating Dimensions" with studio/publisher/funder sources
- **Section 6 (Tier Definitions)**: Massively expanded with comprehensive studio and publisher source tiers
- **Section 7 (How Classification Works)**: Renamed to "How Project Rating Works", completely rewritten
- **Section 8 (Use Cases)**: All examples updated to use project rating tiers (C/B, BB/BBB, A, AA/AAA)
- **Section 9.4 (HCS Comparison)**: Updated comparison table to include "Bond-style ratings" dimension
- **Section 10 (Design Principles)**: New principle 10.6 "Project-Centric, Not Studio-Centric"
- **Section 12 (Call to Adoption)**: Completely rewritten with project-centric framing for all stakeholder groups
- **Section 13 (References)**: Added new subsection "Financial Rating Systems" with citation flag for S&P/Moody's/Fitch
- **Tier nomenclature throughout**: Micro/Small/Mid/Large replaced with AAA/AA/A/BBB/BB/B/C bond ratings

### Fixed
- Removed duplicate content (lines 557-1110 were duplicate of lines 1-557)

### Design Philosophy
- **Projects receive ratings based on combined sources**: A solo developer (C Studio) with AAA publisher backing produces an A-rated project
- **Cultural alignment**: Bond rating scale (AAA/AA/A/BBB/BB/B/C) leverages existing industry vocabulary while adding formal structure
- **Transparent methodology**: Combination formula presented as recommended approach with clear explanation of alternatives
- **Multi-project flexibility**: Studios can have concurrent projects with different ratings based on resource allocation
- **Financial markets precedent**: Bond ratings provide proven framework for evaluating risk/capacity through letter grades

### Breaking Changes
- Previous tier names (Micro/Small/Mid/Large) fully replaced with bond rating scale
- Classification shifted from entity-centric (studios) to project-centric
- Self-classification process now requires rating sources separately before combining

### Notes
- Combination methodology flagged as "subject to real-world validation"
- Future versions may introduce meta-grades for studios/publishers (e.g., "AA-producing studio")
- Version bumped to 0.4.0 to reflect significant conceptual evolution

---

## [0.3.1] - 2025-11-24

### Added
- Comprehensive citation coverage throughout IGSC-White-Paper.md:
  - **Introduction**: Newzoo 2024 market size ($188B), Video Game History Foundation on AAA/indie/AA term origins (Orland, 2024)
  - **Section 3.1**: Humble Games GDC Vault talk (2022), Dan Pearce/IGN quote
  - **Section 3.4**: Engadget, PC Gamer, Digital Trends coverage of Dave the Diver controversy (2023); director Jaeho Hwang quote via VGC
  - **Section 9.1**: SAG-AFTRA budget tier definitions, AIM/IMPALA independent label criteria, WordsRated Big Five statistics
  - **Section 9.2**: Steam Direct, ID@Xbox, PlayStation Partners, Nintendo Developer Portal details; IGDA DSS definition; The Game Awards and BAFTA eligibility criteria; Newzoo and Gamalytic classification methodologies
  - **Section 9.3**: Garda & Grabarczyk (2016) Game Studies article, Juul *Handmade Pixels* MIT Press (2019), GDC survey methodology, Game Developer magazine quotes
  - **Section 13**: Full References section populated with all citations

### Changed
- Section 9.2 platform programmes description clarified: platforms use unified programmes, not formal tiered systems
- Version bumped to 0.3.1

### Fixed
- All [CITATION NEEDED] markers in document body resolved with scholarly and industry sources

### Known Issues
- Document contains duplicate content (whitepaper text appears twice)—flagged for cleanup

---

## [0.3.0] - 2025-11-24

### Added
- New Section 9.4: HushCrasher Classification System (HCS) comparative analysis
  - Overview of HCS methodology (credits length + disk size clustering)
  - Comparison table: IGSC vs HCS across key dimensions
  - Analysis of complementary approaches
- New Section 11.1: How Standards Gain Authority
  - ESRB and PEGI adoption model analogy
  - Network effects explanation for standard adoption
- Second Core Principle in Section 4: "Classification must be prospective, not just retrospective"
- HCS citations to References section (Mayerowitz & Belzanne, 2025)

### Changed
- Section 4 "Core Principle" renamed to "Core Principles" (now two principles)
- Section 11 subsections renumbered (11.1-11.4 instead of 11.1-11.3)
- Version bumped to 0.3.0

### Notes
- Key differentiator established: IGSC is prospective (any development stage), HCS is retrospective (post-release only)
- HCS acknowledged as complementary market analysis tool, not competing framework

---

## [0.2.0] - 2025-11-23

### Added
- New Introduction/Context section with industry landscape and terminology history
- New Supporting Research & Comparative Analysis section with four subsections:
  - Industry Context (film, music, publishing comparisons)
  - Existing Game Industry Approaches (platforms, trade orgs, awards, market research)
  - Academic and Industry Research
  - Why Existing Approaches Fall Short (comparison table)
- New References section with structured placeholder categories
- 15+ [CITATION NEEDED] flags with guidance on appropriate source types

### Changed
- Table of Contents updated to reflect 13 sections (previously 10)
- All sections renumbered to accommodate new Introduction section
- Replaced 11 em dashes with appropriate punctuation (colons, semicolons, parentheses)
- Document structure now fully aligns with White Paper Construction Guide

### Notes
- Citation flags are placeholders requiring research to populate
- Supporting Research section framework needs expansion with actual findings

---

## [0.1.0] - 2025-11-23

### Added
- Initial IGSC White Paper (v1.0 Draft)
- Two-layer classification model (Structural + Outcome)
- Team size tiers: Micro, Small, Mid, Large
- Ownership types: Independent, Affiliated, Owned
- Funding source categories: Self-funded, Grant, Publisher, Investor
- Production scope tiers: Small, Medium, Large, Massive
- Outcome classification dimensions: Revenue, Player Base, Critical Reception, Growth Signals
- Design principles: Voluntary, No Sensitive Disclosure, Transparent, Neutral, Lifecycle-aware, Global
- Use cases: Awards, Scouting, Grants, Analysis, Self-understanding
- CC BY 4.0 licensing

### Notes
- This is the initial draft release for public feedback
- Tier thresholds may be refined based on community input
- Revenue bands are illustrative and may be adjusted

---

## Version Numbering

- **Major versions (1.0, 2.0)** — Significant changes to classification structure or tiers
- **Minor versions (0.1, 0.2)** — Clarifications, additions, refinements
- **Patch versions (0.1.1)** — Typo fixes, formatting, non-substantive changes
