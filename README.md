# Game Project Classification Standard (GPCS)

**A bond-style rating framework for classifying game projects by production capacity and resource backing.**

[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)

---

## The Problem

The video game industry relies on informal labels — **Indie**, **AA**, **AAA** — to classify studios and projects. These terms are:

- **Inconsistent** — no universal agreement on definitions
- **Conflated** — mixing budget, team size, funding source, and creative independence into single labels
- **Unfair** — a solo developer and a 40-person funded studio both called "indie"
- **Static** — no mechanism to track studio growth over time

This creates unfair competition in awards, unclear eligibility for grants, and meaningless segmentation for the industry.

---

## The Solution: GPCS

The **Game Project Classification Standard (GPCS)** provides a transparent, multi-dimensional framework that rates individual **projects** rather than studios. Each project receives a **GPC rating** (e.g., `A/I1 — Verified — v0.5`) that captures both production capacity and independence.

### Key Features

- **Project-centric** — the same studio can have multiple projects with different ratings
- **Bond-style capacity scale** — familiar AAA/AA/A/BBB/BB/B/C tiers quantify production capacity
- **Independence marker** — optional `I0–I3` code captures ownership and creative control
- **Source transparency** — studios, publishers, grants, and platform support rated independently then combined
- **Verification tiers** — Unverified / Verified / Audited options with Evidence Strength signals
- **Lifecycle-aware** — ratings captured at Concept, Production, Release, and Live stages with historical tracking

### Core Dimensions

| Dimension | Description |
|-----------|-------------|
| **Capacity Rating (AAA–C)** | Weighted combination of studio, publisher/funder, and other sources |
| **Independence Marker (I0–I3)** | Creative control + IP ownership structure |
| **Verification Tier** | Confidence level (Unverified, Verified ●●○, Audited) |
| **Outcome Metrics (optional)** | Revenue, player base, critical reception, growth signals |

### Example GPC Ratings

| Project Context | Sample Rating |
|-----------------|---------------|
| Solo developer, self-funded, no publisher | `C/I0 — Unverified — Concept` |
| 30-person studio with AA publisher backing | `A/I1 — Verified ●●○ — Production` |
| 15-person team with $1M co-funding + QA/marketing | `BBB/I1 — Verified ●●● — Release` |
| First-party flagship title | `AAA/I3 — Audited — Release` |

---

## Documentation

- [GPCS White Paper](GPCS-White-Paper.md) — Full specification and rationale
- [Changelog](CHANGELOG.md) — Version history

---

## Use Cases

- **Awards & Showcases** — Fair competition categories by tier
- **Publishers & Investors** — Meaningful studio segmentation
- **Grant Programmes** — Clear eligibility criteria
- **Industry Analysis** — Consistent reporting terminology
- **Studios** — Honest self-positioning and growth tracking

---

## Status & Testing

GPCS v0.5 is a **comprehensive proposal under testing**, not a finished standard. The author is piloting GPCS through an awards programme first to validate assumptions, refine criteria, and assess adoption viability.

**Current stage:** Proposal and experimental implementation
**Seeking:** Pilot partnerships, critical feedback, and testing collaborators

Interested stakeholders (awards bodies, grant programmes, platforms, publishers) are invited to:
1. Review the framework and provide feedback
2. Propose pilot implementations in your context
3. Test the rating questionnaire with real projects
4. Share findings to help refine the methodology

**This is version 0.5** — it will evolve based on real-world evidence and community input. Success is not guaranteed; the goal is to discover whether this framework solves real problems for real stakeholders.

For feedback and pilot partnership enquiries, see [Contributing](CONTRIBUTING.md).

---

## License

This work is licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).

You are free to:
- **Share** — copy and redistribute in any medium or format
- **Adapt** — remix, transform, and build upon the material for any purpose, including commercially

Under the following terms:
- **Attribution** — You must give appropriate credit to GPCS and its creator

---

## Author

**Devon Stanton**

GPCS was created to bring clarity and fairness to how the games industry categorises project capacity contexts.

---

## Contributing

Feedback, suggestions, and contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for details.
