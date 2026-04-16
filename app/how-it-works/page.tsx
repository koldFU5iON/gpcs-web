import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import RatingScaleVisual from "@/components/home/RatingScaleVisual";
import { TIER_HEX, TIER_ORDER } from "@/lib/gpcs/tiers";
import type { CapacityTier } from "@/lib/gpcs/types";
import { INDEPENDENCE_LABELS, INDEPENDENCE_DESCRIPTIONS } from "@/lib/gpcs/independence";
import type { IndependenceTier } from "@/lib/gpcs/types";
import { fetchWhitepaperVersion } from "@/lib/gpcs/whitepaper";
import JsonLd from "@/components/seo/JsonLd";
import { howItWorksSchema, webPageSchema } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "How GPCS calculates a game project rating: studio capacity (55%), publisher/funder (35%), and other sources (10%) are scored, weighted, and constrained to produce a verifiable GPC classification.",
  alternates: { canonical: "https://gpcstandard.org/how-it-works" },
  openGraph: {
    url: "https://gpcstandard.org/how-it-works",
    title: "How GPCS Works — Methodology Explained",
    description:
      "A step-by-step guide to the GPCS scoring algorithm — source types, weightings, floor and ceiling constraints, independence markers, and verification levels.",
  },
};

const TIER_STUDIO_DETAILS: Record<CapacityTier, { teamSize: string; infrastructure: string; trackRecord: string }> = {
  AAA: { teamSize: "200+", infrastructure: "Multiple departments, proprietary tech", trackRecord: "Multiple shipped AAA titles" },
  AA: { teamSize: "80–200", infrastructure: "Full departmental structure", trackRecord: "Multiple mid-to-large scope titles" },
  A: { teamSize: "30–80", infrastructure: "Departmental structure emerging", trackRecord: "1–2 shipped commercial titles" },
  BBB: { teamSize: "15–30", infrastructure: "Small departments, formal processes", trackRecord: "First title shipped or experienced leads" },
  BB: { teamSize: "10–15", infrastructure: "Ad-hoc processes", trackRecord: "No shipped title or single small release" },
  B: { teamSize: "5–10", infrastructure: "Minimal formal process", trackRecord: "Hobbyist projects only" },
  C: { teamSize: "1–4", infrastructure: "None or minimal", trackRecord: "No commercial releases" },
};

export default async function HowItWorksPage() {
  const { versionShort } = await fetchWhitepaperVersion();
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <JsonLd data={[
        webPageSchema({
          name: "How GPCS Works — Methodology Explained",
          description: "Step-by-step guide to the GPCS scoring algorithm, tier definitions, independence markers, and verification levels.",
          url: "https://gpcstandard.org/how-it-works",
          breadcrumbs: [
            { name: "Home", url: "https://gpcstandard.org" },
            { name: "How It Works", url: "https://gpcstandard.org/how-it-works" },
          ],
        }),
        howItWorksSchema,
      ]} />

      {/* Header */}
      <div className="mb-12 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-gpcs-muted mb-2">
          The Methodology
        </p>
        <h1 className="font-display text-4xl font-bold text-gpcs-text mb-4">
          How GPCS Works
        </h1>
        <p className="text-gpcs-silver max-w-2xl mx-auto">
          A step-by-step guide to how production capacity is measured, sources are weighted,
          constraints are applied, and an independence marker is assigned.
        </p>
      </div>

      {/* ── Section 1: The Dual Output ──────────────────────────────────────── */}
      <section className="mb-20">
        <h2 className="font-display text-2xl font-bold text-gpcs-text mb-6">
          1. The Dual Output
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-8">
          <div className="rounded-xl border border-gpcs-gold/20 bg-gpcs-gold/5 p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-gpcs-gold mb-3">
              Capacity Rating (Primary)
            </p>
            <p className="font-display text-4xl font-bold text-gpcs-gold mb-3">A+</p>
            <p className="text-sm text-gpcs-silver leading-relaxed">
              Bond-style notation (AAA → C) with optional +/− modifiers. Reflects production scale,
              team size, infrastructure, track record, and financial stability.
              This is the primary output and the most important indicator.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-gpcs-slate/30 p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-gpcs-muted mb-3">
              Independence Marker (Secondary)
            </p>
            <p className="font-display text-4xl font-bold text-gpcs-silver mb-3">I1</p>
            <p className="text-sm text-gpcs-silver leading-relaxed">
              Ranges from I0 (fully independent) to I3 (first-party/subsidiary). Captures IP ownership
              and creative control — important context that the capacity rating alone doesn&apos;t convey.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-gpcs-gold/30 bg-gpcs-slate/30 p-5 text-center">
          <p className="text-sm text-gpcs-muted mb-1">A complete GPC rating looks like:</p>
          <p className="font-mono text-2xl font-semibold text-gpcs-gold">
            {`A / I1 — Verified ●●○ — v${versionShort}`}
          </p>
          <p className="text-xs text-gpcs-muted mt-2">
            Capacity / Independence — Verification level — Specification version
          </p>
        </div>
      </section>

      {/* ── Section 2: Source Types ─────────────────────────────────────────── */}
      <section className="mb-20">
        <h2 className="font-display text-2xl font-bold text-gpcs-text mb-6">
          2. The Three Source Types
        </h2>
        <p className="text-sm text-gpcs-silver mb-6 max-w-2xl">
          Each source is rated independently before being combined. The final project rating
          reflects all contributing resources, not just the most prominent one.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              title: "Studio",
              weight: "55%",
              color: "#00C8FF",
              items: ["Team size (dedicated FTE)", "Infrastructure & pipelines", "Track record (shipped titles)", "Financial health", "Geographic footprint"],
            },
            {
              title: "Publisher / Funder",
              weight: "35%",
              color: "#FF6600",
              items: ["Financial scale (budget range)", "Market reach & distribution", "Support services (QA, marketing, etc.)", "Platform relationships", "Portfolio scale"],
            },
            {
              title: "Other Sources",
              weight: "10%",
              color: "#CF40FF",
              items: ["Platform grants (ID@Xbox, PS Partners)", "Government grants (Film Victoria, CMF)", "Community funding (Kickstarter, Patreon)", "Tech partner deals (Unreal, Unity)"],
            },
          ].map((source) => (
            <div
              key={source.title}
              className="rounded-xl border p-5"
              style={{ borderColor: `${source.color}30`, background: `${source.color}08` }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gpcs-text">{source.title}</h3>
                <span
                  className="rounded-full px-2 py-0.5 text-xs font-bold font-mono"
                  style={{ color: source.color, background: `${source.color}20` }}
                >
                  {source.weight}
                </span>
              </div>
              <ul className="space-y-1.5">
                {source.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-gpcs-muted">
                    <span style={{ color: source.color }} className="mt-0.5 shrink-0">›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 3: Weighting & Constraints ─────────────────────────────── */}
      <section className="mb-20">
        <h2 className="font-display text-2xl font-bold text-gpcs-text mb-6">
          3. Weighting & Constraints
        </h2>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Weighting visual */}
          <div className="rounded-xl border border-white/10 bg-gpcs-slate/20 p-6">
            <h3 className="font-semibold text-gpcs-text mb-4">Weighted Combination</h3>
            <div className="space-y-3">
              {[
                { label: "Studio", pct: 55, color: "#00C8FF", score: 75, tier: "A" },
                { label: "Publisher", pct: 35, color: "#FF6600", score: 85, tier: "AA" },
                { label: "Other Sources", pct: 10, color: "#CF40FF", score: 65, tier: "BBB" },
              ].map((row) => (
                <div key={row.label}>
                  <div className="flex justify-between text-xs text-gpcs-muted mb-1">
                    <span>{row.label}</span>
                    <span className="font-mono">{row.score} pts × {row.pct}% = {(row.score * row.pct / 100).toFixed(1)}</span>
                  </div>
                  <div className="h-2 rounded-full bg-gpcs-slate overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${row.pct}%`, background: row.color }}
                    />
                  </div>
                </div>
              ))}
              <div className="border-t border-white/10 pt-3 flex justify-between text-sm">
                <span className="text-gpcs-silver font-semibold">Composite Score</span>
                <span className="font-mono text-gpcs-gold font-bold">77.5 → A</span>
              </div>
            </div>
          </div>

          {/* Constraints */}
          <div className="rounded-xl border border-white/10 bg-gpcs-slate/20 p-6">
            <h3 className="font-semibold text-gpcs-text mb-4">Two Constraints</h3>
            <div className="space-y-4">
              <div className="rounded-lg bg-gpcs-slate/40 p-4">
                <p className="text-sm font-semibold text-gpcs-text mb-1">Floor Constraint</p>
                <p className="text-xs text-gpcs-muted leading-relaxed">
                  A project can&apos;t exceed the studio&apos;s tier by more than 2 full tiers.
                  Prevents a C-studio from receiving an AAA rating solely from publisher backing.
                </p>
                <p className="mt-2 text-xs font-mono bg-gpcs-slate/60 rounded px-2 py-1 text-gpcs-silver">
                  Max project rating = Studio tier + 2
                </p>
              </div>
              <div className="rounded-lg bg-gpcs-slate/40 p-4">
                <p className="text-sm font-semibold text-gpcs-text mb-1">Ceiling Constraint</p>
                <p className="text-xs text-gpcs-muted leading-relaxed">
                  When a publisher provides full support, the project can&apos;t fall more than 1 tier
                  below the publisher&apos;s rating. Standard support = 2 tier buffer.
                </p>
                <p className="mt-2 text-xs font-mono bg-gpcs-slate/60 rounded px-2 py-1 text-gpcs-silver">
                  Min project rating = Publisher tier − 1 (Full) or − 2 (Standard)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4: Tier Definitions ─────────────────────────────────────── */}
      <section className="mb-20">
        <h2 className="font-display text-2xl font-bold text-gpcs-text mb-4">
          4. Tier Definitions
        </h2>
        <p className="text-sm text-gpcs-silver mb-6">
          Each tier represents a distinct range of production capacity. The same studio can have
          multiple active projects at different tiers simultaneously.
        </p>

        <RatingScaleVisual className="mb-6" />

        <div className="space-y-2">
          {[...TIER_ORDER].reverse().map((tier) => {
            const color = TIER_HEX[tier];
            const details = TIER_STUDIO_DETAILS[tier];

            return (
              <div
                key={tier}
                className="grid grid-cols-12 items-center gap-4 rounded-lg border p-4"
                style={{ borderColor: `${color}20`, background: `${color}06` }}
              >
                <div className="col-span-2 sm:col-span-1">
                  <span
                    className="font-display text-lg font-bold"
                    style={{ color }}
                  >
                    {tier}
                  </span>
                </div>
                <div className="col-span-10 sm:col-span-11 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <p className="text-xs text-gpcs-muted mb-0.5">Team size</p>
                    <p className="text-sm text-gpcs-silver">{details.teamSize} people</p>
                  </div>
                  <div>
                    <p className="text-xs text-gpcs-muted mb-0.5">Infrastructure</p>
                    <p className="text-sm text-gpcs-silver">{details.infrastructure}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gpcs-muted mb-0.5">Track record</p>
                    <p className="text-sm text-gpcs-silver">{details.trackRecord}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Section 5: Independence ─────────────────────────────────────────── */}
      <section className="mb-20">
        <h2 className="font-display text-2xl font-bold text-gpcs-text mb-4">
          5. The Independence Marker
        </h2>
        <p className="text-sm text-gpcs-silver mb-6 max-w-2xl">
          Independence is determined by IP ownership and creative control, not by the presence
          or absence of a publisher. A studio can have a publisher and still be I0.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(["I0", "I1", "I2", "I3"] as IndependenceTier[]).map((tier) => {
            const colors = { I0: "#00E676", I1: "#00C8FF", I2: "#FF6600", I3: "#FFD700" };
            const color = colors[tier];

            return (
              <div
                key={tier}
                className="rounded-xl border p-5"
                style={{ borderColor: `${color}30`, background: `${color}08` }}
              >
                <p
                  className="font-display text-2xl font-bold mb-2"
                  style={{ color }}
                >
                  {tier}
                </p>
                <p className="text-xs font-semibold text-gpcs-silver mb-2">
                  {INDEPENDENCE_LABELS[tier].replace(`${tier} — `, "")}
                </p>
                <p className="text-xs text-gpcs-muted leading-relaxed">
                  {INDEPENDENCE_DESCRIPTIONS[tier]}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Section 6: Verification ─────────────────────────────────────────── */}
      <section className="mb-20">
        <h2 className="font-display text-2xl font-bold text-gpcs-text mb-4">
          6. Verification Levels
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            {
              level: "Unverified",
              indicator: "○○○",
              description: "Self-reported. No evidence checked. Free, instant, low credibility.",
              badge: "Demo",
              color: "#607080",
            },
            {
              level: "Verified",
              indicator: "●●○",
              description: "Public evidence checked — LinkedIn, press releases, MobyGames, company registry. Free, takes days.",
              badge: "Recommended",
              color: "#00E676",
            },
            {
              level: "Audited",
              indicator: "●●●",
              description: "Third-party CPA/CA reviews confidential materials. Attestation letter issued. High credibility, significant cost.",
              badge: "High-stakes",
              color: "#FFD700",
            },
          ].map((v) => (
            <div
              key={v.level}
              className="rounded-xl border p-5"
              style={{ borderColor: `${v.color}30`, background: `${v.color}08` }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-lg" style={{ color: v.color }}>{v.indicator}</span>
                <span
                  className="rounded px-2 py-0.5 text-xs font-medium"
                  style={{ color: v.color, background: `${v.color}20` }}
                >
                  {v.badge}
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold text-gpcs-text mb-2">{v.level}</h3>
              <p className="text-sm text-gpcs-muted leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <div className="rounded-xl border border-gpcs-gold/20 bg-gpcs-gold/5 p-8 text-center">
        <h2 className="font-display text-2xl font-bold text-gpcs-text mb-3">
          Ready to try it?
        </h2>
        <p className="text-gpcs-silver mb-6 max-w-lg mx-auto">
          The demo form walks you through all 15 questions and computes your rating using the
          exact methodology described here.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/rate"
            className="inline-flex items-center gap-2 rounded-lg bg-gpcs-gold px-6 py-3 text-sm font-semibold text-gpcs-navy hover:bg-gpcs-gold-light transition-colors"
          >
            Rate Your Project
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/specification"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-gpcs-silver hover:border-white/30 hover:text-gpcs-text transition-colors"
          >
            Read the full specification
          </Link>
        </div>
      </div>
    </div>
  );
}
