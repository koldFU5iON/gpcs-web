import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Award, Users, ShieldCheck, Layers } from "lucide-react";
import RatingScaleVisual from "@/components/home/RatingScaleVisual";
import RatingBadge from "@/components/rate/RatingBadge";
import type { CalculationResult } from "@/lib/gpcs/types";
import { fetchWhitepaperVersion } from "@/lib/gpcs/whitepaper";
import JsonLd from "@/components/seo/JsonLd";
import { homepageFaqSchema, webPageSchema } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "GPCS — Game Project Classification Standard",
  description:
    "GPCS gives the games industry a shared language for project scale. Seven capacity tiers (C to AAA), an independence marker, and a verification level — replacing vague labels with a structured, verifiable standard.",
  alternates: { canonical: "https://gpcstandard.org" },
  openGraph: {
    url: "https://gpcstandard.org",
    title: "GPCS — Game Project Classification Standard",
    description:
      "Seven capacity tiers. An independence marker. Three verification levels. The game industry finally has a classification standard.",
  },
};

// Version is injected at render time from fetchWhitepaperVersion()
const buildSampleResult = (versionShort: string): CalculationResult => ({
  capacityTier: "A",
  modifier: null,
  display: "A",
  independence: "I1",
  compositeScore: 77.5,
  verification: "Verified",
  version: versionShort,
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
});

const PROBLEMS = [
  {
    icon: Users,
    title: '"Indie" means nothing',
    body: 'A solo dev and a 40-person studio with publisher backing both get called "indie." That ambiguity drives unfair competition in awards, showcases, and grant programmes — and everyone in the industry knows it.',
  },
  {
    icon: Award,
    title: "Awards pit mismatched teams",
    body: "Categories designed for small studios are regularly dominated by well-resourced projects. Without a shared classification, organisers have no neutral standard to structure competition fairly.",
  },
  {
    icon: ShieldCheck,
    title: "Grants can't define eligibility",
    body: 'Funding programmes can\'t draw a clean line between "independent" and "publisher-backed" — so they write vague criteria, and vague criteria get gamed. GPCS gives them something concrete to point to.',
  },
];

const USE_CASES = [
  {
    icon: Award,
    title: "Awards Bodies",
    body: 'Replace vague "indie" categories with capacity-tiered competition: Best C/B, Best BB/BBB, Best A and above. Fair by design.',
  },
  {
    icon: ShieldCheck,
    title: "Grant Programmes",
    body: 'Set auditable eligibility: "C/B/BB studios only" or "Ineligible: A+ publisher backing." Transparent criteria that hold up to scrutiny.',
  },
  {
    icon: Layers,
    title: "Platforms & Publishers",
    body: "Segment incoming projects for differentiated support tiers. Spot smaller studios whose output outpaces their rating and route them to the right programme.",
  },
];

export default async function HomePage() {
  const { versionShort } = await fetchWhitepaperVersion();
  const SAMPLE_RESULT = buildSampleResult(versionShort);

  return (
    <>
      <JsonLd data={[
        webPageSchema({
          name: "GPCS — Game Project Classification Standard",
          description: "The official home of GPCS — a structured, bond-style rating framework for classifying game projects by production capacity and resource backing.",
          url: "https://gpcstandard.org",
        }),
        homepageFaqSchema,
      ]} />

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-gpcs-border bg-gpcs-bg">
        {/* Layered background: radial glow + subtle grid */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-radial from-gpcs-gold/8 via-transparent to-transparent" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(var(--gpcs-border) 1px, transparent 1px), linear-gradient(90deg, var(--gpcs-border) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Left: copy */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gpcs-gold/30 bg-gpcs-gold/10 px-3 py-1 text-xs font-medium text-gpcs-gold">
                <span className="h-1.5 w-1.5 rounded-full bg-gpcs-gold animate-pulse" />
                v{versionShort} — Proposal under testing
              </div>

              <h1 className="font-display font-semibold uppercase text-gpcs-text" style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)", lineHeight: 1.1, letterSpacing: "0.02em" }}>
                The game industry{" "}
                <span className="gold-text">finally has</span>{" "}
                a classification standard
              </h1>

              <p className="mt-5 text-base text-gpcs-silver leading-relaxed max-w-lg">
                GPCS replaces vague labels like &ldquo;indie&rdquo; with a structured, verifiable
                classification — so anyone can see exactly what&apos;s behind a game project:
                who built it, what&apos;s backing it, and how independently it operates.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/rate"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-gpcs-gold px-7 py-3.5 text-sm font-semibold text-gpcs-navy hover:bg-gpcs-gold-light transition-colors"
                >
                  Classify Your Project
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-gpcs-border px-7 py-3.5 text-sm font-medium text-gpcs-silver hover:text-gpcs-text hover:border-gpcs-gold/30 transition-colors"
                >
                  How It Works
                </Link>
              </div>

              {/* Social proof nudge */}
              <p className="mt-4 text-xs text-gpcs-muted">
                Open standard · CC BY 4.0 · v{versionShort} pilot via Unity Awards
              </p>
            </div>

            {/* Right: sample badge */}
            <div className="flex justify-center lg:justify-end">
              <div className="badge-glow scale-110">
                <RatingBadge result={SAMPLE_RESULT} size="lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Video overview ─────────────────────────────────────────────────── */}
      <section className="border-b border-gpcs-border py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-gpcs-muted mb-2">
              Watch the Overview
            </p>
            <h2 className="font-display text-2xl font-semibold text-gpcs-text">
              The methodology explained in 10 minutes
            </h2>
            <p className="mt-2 text-sm text-gpcs-muted max-w-lg mx-auto">
              An audio overview generated from the GPCS white paper — the full framework
              without reading 20 pages.
            </p>
          </div>

          {/* 16:9 responsive embed */}
          <div className="relative w-full overflow-hidden rounded-xl border border-gpcs-border" style={{ paddingTop: "56.25%" }}>
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube-nocookie.com/embed/8aZhNoMr9SI?rel=0&modestbranding=1"
              title="GPCS Explained — The Game Project Classification Standard"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ── The scale ──────────────────────────────────────────────────────── */}
      <section className="border-b border-gpcs-border bg-gpcs-surface py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-gpcs-muted mb-2">
              Seven Capacity Tiers
            </p>
            <h2 className="font-display text-2xl font-semibold text-gpcs-text">
              From solo passion project to global powerhouse
            </h2>
            <p className="mt-2 text-sm text-gpcs-muted max-w-lg mx-auto">
              Each tier reflects a distinct level of production capacity and resource backing —
              not quality, not genre, not commercial ambition.
            </p>
          </div>
          <RatingScaleVisual />
          <p className="mt-4 text-center text-xs text-gpcs-muted">
            A C-rated game can win Game of the Year. An AAA-rated project can flop. Capacity is not destiny.
          </p>
        </div>
      </section>

      {/* ── Problem ────────────────────────────────────────────────────────── */}
      <section className="py-20 border-b border-gpcs-border">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-gpcs-muted mb-2">
              The Problem
            </p>
            <h2 className="font-display text-3xl font-bold text-gpcs-text">
              The labels everyone uses are broken
            </h2>
            <p className="mt-3 text-gpcs-silver max-w-xl mx-auto">
              &ldquo;Indie.&rdquo; &ldquo;AA.&rdquo; &ldquo;Triple-A.&rdquo; These terms are used everywhere but
              defined nowhere — leaving awards bodies, grant programmes, and platforms
              without a neutral basis for the decisions they make every day.
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

      {/* ── What it produces ───────────────────────────────────────────────── */}
      <section className="py-20 border-b border-gpcs-border bg-gpcs-surface">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gpcs-muted mb-3">
                The Output
              </p>
              <h2 className="font-display text-3xl font-bold text-gpcs-text mb-4">
                One rating. The full picture.
              </h2>
              <p className="text-gpcs-silver leading-relaxed mb-6">
                A GPC rating like{" "}
                <span className="font-mono font-semibold text-gpcs-gold">A / I1 — Verified</span>{" "}
                tells you three things at once: the studio&apos;s production capacity (A),
                how independently it operates (I1 — publisher-backed but IP retained),
                and the evidence standard behind the claim (Verified — publicly checked).
              </p>
              <ul className="space-y-3">
                {[
                  "Capacity tier — seven levels from C (solo) to AAA (major studio)",
                  "Independence marker — who owns IP and controls creative direction",
                  "Verification level — from self-reported to third-party audited",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gpcs-silver">
                    <span className="mt-0.5 text-gpcs-gold shrink-0">›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              {[
                { rating: "C / I0", label: "Solo dev, self-published, owns all IP", example: "Stardew Valley, Undertale", color: "#607080" },
                { rating: "BB / I1", label: "Small team, publisher marketing deal, dev retains IP", example: "Most mid-tier indie titles", color: "#CF40FF" },
                { rating: "A / I1", label: "30–80 staff, publisher-funded, dev retains creative control", example: "\"AA\" prestige releases", color: "#00C8FF" },
                { rating: "AAA / I3", label: "200+ staff, first-party or subsidiary, full publisher control", example: "God of War, Halo", color: "#FFD700" },
              ].map((item) => (
                <div
                  key={item.rating}
                  className="flex items-center gap-4 rounded-lg border p-4"
                  style={{ borderColor: `${item.color}25`, background: `${item.color}08` }}
                >
                  <span
                    className="font-mono text-sm font-bold shrink-0 w-20"
                    style={{ color: item.color }}
                  >
                    {item.rating}
                  </span>
                  <div>
                    <p className="text-sm text-gpcs-text font-medium">{item.label}</p>
                    <p className="text-xs text-gpcs-muted mt-0.5">{item.example}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────────────────────── */}
      <section className="py-20 border-b border-gpcs-border">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-gpcs-muted mb-2">
              The Process
            </p>
            <h2 className="font-display text-3xl font-bold text-gpcs-text">
              Structured. Transparent. Takes 10 minutes.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Describe your project",
                desc: "15 questions about your studio, funding, IP ownership, and creative control. No subjective self-assessment — just structure.",
              },
              {
                step: "02",
                title: "Sources are weighed",
                desc: "Studio capacity (55%), publisher or funder (35%), and other sources (10%) are scored and combined — with constraints that prevent gaming the system.",
              },
              {
                step: "03",
                title: "Receive your classification",
                desc: `A code like "A / I1 — Unverified — v${versionShort}" gives a complete, readable snapshot. Upgrade to Verified or Audited for formal recognition.`,
              },
            ].map((item) => (
              <div key={item.step} className="relative rounded-xl border border-gpcs-border bg-gpcs-surface p-6">
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

      {/* ── Use Cases ──────────────────────────────────────────────────────── */}
      <section className="py-20 border-b border-gpcs-border bg-gpcs-surface">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-gpcs-muted mb-2">
              Who It&apos;s For
            </p>
            <h2 className="font-display text-3xl font-bold text-gpcs-text">
              Built for the institutions that shape the industry
            </h2>
            <p className="mt-3 text-gpcs-silver max-w-xl mx-auto">
              GPCS is a tool for anyone making structural decisions about game projects —
              not a marketing label, not a prestige signal.
            </p>
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
            Where does your project sit?
          </h2>
          <p className="text-gpcs-silver mb-8 max-w-xl mx-auto">
            The classification form takes about 10 minutes. Your result is an Unverified
            self-assessment — a starting point for a formally recognised GPC rating.
          </p>
          <Link
            href="/rate"
            className="inline-flex items-center gap-2 rounded-lg bg-gpcs-gold px-8 py-4 text-base font-semibold text-gpcs-navy hover:bg-gpcs-gold-light transition-colors"
          >
            Classify Your Project
            <ArrowRight size={18} />
          </Link>
          <p className="mt-4 text-xs text-gpcs-muted">
            Free, anonymous, no account required.
          </p>
        </div>
      </section>
    </>
  );
}
