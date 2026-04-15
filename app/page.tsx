import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Award, BookOpen, Layers } from "lucide-react";
import RatingScaleVisual from "@/components/home/RatingScaleVisual";
import RatingBadge from "@/components/rate/RatingBadge";
import type { CalculationResult } from "@/lib/gpcs/types";

export const metadata: Metadata = {
  title: "GPCS — Game Project Classification Standard",
  description:
    "A bond-style rating system for classifying game projects by production capacity and resource backing. Transparent, voluntary, and project-centric.",
};

// Sample badge data for the hero illustration
const SAMPLE_RESULT: CalculationResult = {
  capacityTier: "A",
  modifier: null,
  display: "A",
  independence: "I1",
  compositeScore: 77.5,
  verification: "Verified",
  version: "0.5",
  breakdown: {
    studioScore: 75,
    studioTier: "A",
    publisherScore: 85,
    publisherTier: "AA",
    otherScore: 65,
    weights: { studio: 0.55, publisher: 0.35, other: 0.1 },
    compositeBeforeConstraints: 77.5,
    supportIntensity: "standard",
    floorApplied: false,
    ceilingApplied: false,
  },
};

const PROBLEMS = [
  {
    icon: BookOpen,
    title: '"Indie" means everything',
    body: 'A solo developer and a 40-person studio with publisher funding are both called "indie" — creating unfair competition in awards, showcases, and grant programmes.',
  },
  {
    icon: Award,
    title: "Awards pit mismatched studios",
    body: "Categories designed for small teams are regularly dominated by well-funded projects. The Megabonk incident at Game Awards 2025 highlighted the broken system.",
  },
  {
    icon: BookOpen,
    title: "Grants lack verifiable criteria",
    body: 'Grant programmes struggle to define "independent" or "early-stage" in ways that are consistent, transparent, and resistant to gaming.',
  },
];

const USE_CASES = [
  {
    icon: Award,
    title: "Awards Bodies",
    body: 'Replace vague "indie" categories with capacity-tiered competition: Best C/B, Best BB/BBB, Best A and above.',
  },
  {
    icon: BookOpen,
    title: "Grant Programmes",
    body: 'Define clear eligibility: "C/B/BB studios only" or "Ineligible: A+ publisher backing." Transparent and auditable.',
  },
  {
    icon: Layers,
    title: "Platforms & Publishers",
    body: "Segment incoming projects for differentiated support tiers. Identify punch-above-weight teams and growth-stage studios.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-white/5 bg-gpcs-navy">
        {/* Background gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-radial from-gpcs-gold/5 via-transparent to-transparent" />

        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Left: copy */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gpcs-gold/30 bg-gpcs-gold/10 px-3 py-1 text-xs font-medium text-gpcs-gold">
                <span className="h-1.5 w-1.5 rounded-full bg-gpcs-gold animate-pulse" />
                v0.5.0 — Proposal under testing
              </div>

              <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-gpcs-text sm:text-5xl lg:text-6xl">
                A Bond-Style{" "}
                <span className="gold-text">Rating System</span>{" "}
                for Game Projects
              </h1>

              <p className="mt-6 text-lg text-gpcs-silver leading-relaxed max-w-xl">
                GPCS brings the clarity of financial ratings to game development —
                transparent, structural, and voluntary. Know the capacity behind every project.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/rate"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-gpcs-gold px-6 py-3 text-sm font-semibold text-gpcs-navy hover:bg-gpcs-gold-light transition-colors"
                >
                  Rate Your Project
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-gpcs-silver hover:border-white/30 hover:text-gpcs-text transition-colors"
                >
                  How It Works
                </Link>
              </div>
            </div>

            {/* Right: sample badge */}
            <div className="flex justify-center lg:justify-end">
              <div className="badge-glow">
                <RatingBadge result={SAMPLE_RESULT} size="lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Rating Scale ───────────────────────────────────────────────────── */}
      <section className="border-b border-white/5 bg-gpcs-slate/20 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-gpcs-muted mb-2">
              Seven Capacity Tiers
            </p>
            <h2 className="font-display text-2xl font-semibold text-gpcs-text">
              From solo passion project to global powerhouse
            </h2>
            <p className="mt-2 text-sm text-gpcs-muted max-w-lg mx-auto">
              Hover a tier to see the descriptor. Team sizes shown are per-project dedicated staff, not total headcount.
            </p>
          </div>
          <RatingScaleVisual />
          <p className="mt-4 text-center text-xs text-gpcs-muted">
            Ratings reflect production capacity and resource backing — not quality, artistic merit, or commercial potential.
          </p>
        </div>
      </section>

      {/* ── Problem ────────────────────────────────────────────────────────── */}
      <section className="py-20 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-gpcs-muted mb-2">
              The Problem
            </p>
            <h2 className="font-display text-3xl font-bold text-gpcs-text">
              Current labels are broken
            </h2>
            <p className="mt-3 text-gpcs-silver max-w-xl mx-auto">
              The game industry relies on informal terms that conflate budget, team size, funding source, creative independence, and distribution into a single vague word.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {PROBLEMS.map((p) => (
              <div key={p.title} className="glass-card rounded-xl p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gpcs-gold/10 border border-gpcs-gold/20">
                  <p.icon size={20} className="text-gpcs-gold" />
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold text-gpcs-text">
                  {p.title}
                </h3>
                <p className="text-sm text-gpcs-silver leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works Preview ───────────────────────────────────────────── */}
      <section className="py-20 border-b border-white/5 bg-gpcs-slate/10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-gpcs-muted mb-2">
              The Framework
            </p>
            <h2 className="font-display text-3xl font-bold text-gpcs-text">
              Source-based. Transparent. Voluntary.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Answer 15 questions",
                desc: "Tell us about your studio, publisher, IP ownership, and other funding sources. Takes about 10 minutes.",
              },
              {
                step: "02",
                title: "Algorithm weighs sources",
                desc: "Studio (55%), Publisher (35%), and Other sources (10%) are scored and combined with floor/ceiling constraints.",
              },
              {
                step: "03",
                title: "Receive your GPC rating",
                desc: 'A code like "A/I1 — Unverified — v0.5" tells the full story: capacity, independence, evidence level.',
              },
            ].map((item) => (
              <div key={item.step} className="relative rounded-xl border border-white/10 bg-gpcs-slate/20 p-6">
                <span className="font-display text-5xl font-bold text-gpcs-gold/15 absolute top-4 right-4 leading-none">
                  {item.step}
                </span>
                <h3 className="mb-2 font-display text-lg font-semibold text-gpcs-text relative">
                  {item.title}
                </h3>
                <p className="text-sm text-gpcs-silver leading-relaxed relative">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 text-sm text-gpcs-gold hover:underline"
            >
              Explore the full methodology
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── What GPCS Rates vs Not ─────────────────────────────────────────── */}
      <section className="py-20 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-start">
            <div>
              <h2 className="font-display text-3xl font-bold text-gpcs-text mb-4">
                What GPCS <span className="text-gpcs-gold">does</span> measure
              </h2>
              <ul className="space-y-3">
                {[
                  "Production capacity — team size, infrastructure, track record",
                  "Resource backing — who funds it and to what scale",
                  "Creative independence — who owns IP and controls creative direction",
                  "Verification level — from self-reported to third-party audited",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gpcs-silver">
                    <span className="mt-0.5 text-gpcs-gold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-3xl font-bold text-gpcs-text mb-4">
                What GPCS <span className="text-gpcs-muted">does not</span> measure
              </h2>
              <ul className="space-y-3">
                {[
                  "Quality or artistic merit — C-rated games can win Game of the Year",
                  "Commercial potential — ratings don't predict sales or player reception",
                  "Genre scope — walking simulator and open-world RPG can share a tier",
                  "Cultural identity — C-rated can be commercial; AAA-rated can be artistic",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gpcs-silver">
                    <span className="mt-0.5 text-gpcs-muted">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-4 rounded-lg border border-gpcs-muted/20 bg-gpcs-slate/20 p-3 text-xs text-gpcs-muted">
                Stardew Valley: C-rated (solo dev, self-published) → multi-million seller.{" "}
                Anthem: AAA-rated (BioWare + EA) → commercial underperformance. Capacity ≠ outcome.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Use Cases ──────────────────────────────────────────────────────── */}
      <section className="py-20 border-b border-white/5 bg-gpcs-slate/10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-gpcs-muted mb-2">
              Who Is This For
            </p>
            <h2 className="font-display text-3xl font-bold text-gpcs-text">
              Built for the institutions that shape the industry
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {USE_CASES.map((uc) => (
              <div key={uc.title} className="glass-card-hover rounded-xl p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-gpcs-gold/20 bg-gpcs-gold/10">
                  <uc.icon size={20} className="text-gpcs-gold" />
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold text-gpcs-text">
                  {uc.title}
                </h3>
                <p className="text-sm text-gpcs-silver leading-relaxed">{uc.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-4xl font-bold text-gpcs-text mb-4">
            Ready to rate your project?
          </h2>
          <p className="text-gpcs-silver mb-8 max-w-xl mx-auto">
            The demo form takes about 10 minutes. Your result is an Unverified self-assessment —
            the first step toward a formally recognised GPC rating.
          </p>
          <Link
            href="/rate"
            className="inline-flex items-center gap-2 rounded-lg bg-gpcs-gold px-8 py-4 text-base font-semibold text-gpcs-navy hover:bg-gpcs-gold-light transition-colors"
          >
            Start Rating
            <ArrowRight size={18} />
          </Link>
          <p className="mt-4 text-xs text-gpcs-muted">
            Free, anonymous, no account required. Takes ~10 minutes.
          </p>
        </div>
      </section>
    </>
  );
}
