import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink, ArrowRight, Star, Coffee, Globe } from "lucide-react";
import { fetchWhitepaperVersion } from "@/lib/gpcs/whitepaper";

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function SubstackIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: "About",
  description:
    "About the Game Project Classification Standard — author, governance, licensing, and how to contribute.",
};

export default async function AboutPage() {
  const { version, versionShort } = await fetchWhitepaperVersion();
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-gpcs-muted mb-2">
          About GPCS
        </p>
        <h1 className="font-display text-4xl font-bold text-gpcs-text mb-4">
          The Standard & Its Author
        </h1>
      </div>

      {/* Author */}
      <section className="mb-12 rounded-xl border border-gpcs-border bg-gpcs-surface p-8">
        <div className="flex flex-col sm:flex-row items-start gap-8">
          {/* Photo */}
          <div className="shrink-0">
            <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-gpcs-gold/30 ring-4 ring-gpcs-gold/10">
              <Image
                src="/profile-devon-stanton.jpg"
                alt="Devon Stanton"
                fill
                className="object-cover"
                sizes="96px"
                priority
              />
            </div>
          </div>

          {/* Bio */}
          <div className="flex-1 min-w-0">
            <h2 className="font-display text-2xl font-bold text-gpcs-text mb-0.5">
              Devon Stanton
            </h2>
            <p className="text-sm text-gpcs-muted mb-4">Creator, GPCS v{versionShort}</p>
            <p className="text-sm text-gpcs-silver leading-relaxed mb-6 max-w-2xl">
              Devon Stanton is a game industry professional with a focus on the structural realities
              facing independent developers. He created GPCS to address the absence of clear,
              verifiable capacity terminology in the industry — drawing on the bond-rating model
              used in financial markets to bring the same rigour to how game projects are described
              and understood. He writes about games, design, and industry systems at{" "}
              <a
                href="https://devonstanton.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gpcs-gold hover:underline"
              >
                devonstanton.com
              </a>
              .
            </p>

            {/* Social links */}
            <div className="flex flex-wrap gap-3">
              {[
                {
                  href: "https://devonstanton.com",
                  label: "devonstanton.com",
                  icon: <Globe size={14} />,
                },
                {
                  href: "https://linkedin.com/in/devonstanton",
                  label: "LinkedIn",
                  icon: <LinkedInIcon size={14} />,
                },
                {
                  href: "https://github.com/koldFU5iON",
                  label: "GitHub",
                  icon: <Github size={14} />,
                },
                {
                  href: "https://substack.com/@devonstanton",
                  label: "Substack",
                  icon: <SubstackIcon size={14} />,
                },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-gpcs-border px-3 py-1.5 text-xs text-gpcs-silver hover:border-gpcs-gold/40 hover:text-gpcs-gold transition-colors"
                >
                  {link.icon}
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Status */}
      <section className="mb-12">
        <h2 className="font-display text-2xl font-bold text-gpcs-text mb-6">
          Current Status
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              label: "Version",
              value: `v${version}`,
              desc: "Comprehensive proposal under testing",
              color: "#FFD700",
            },
            {
              label: "Pilot Phase",
              value: "Awards",
              desc: "Primary testing via Unity Awards programme (6–12 months)",
              color: "#00C8FF",
            },
            {
              label: "Target v1.0",
              value: "2026",
              desc: "≥200 classified projects, ≥2 implementation cycles",
              color: "#00E676",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border p-5"
              style={{ borderColor: `${item.color}25`, background: `${item.color}08` }}
            >
              <p className="text-xs text-gpcs-muted uppercase tracking-wider mb-1">{item.label}</p>
              <p className="font-display text-2xl font-bold mb-1" style={{ color: item.color }}>
                {item.value}
              </p>
              <p className="text-xs text-gpcs-muted leading-snug">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What this is / is not */}
      <section className="mb-12 rounded-xl border border-white/10 bg-gpcs-slate/20 p-6">
        <h2 className="font-display text-xl font-bold text-gpcs-text mb-4">
          Important context
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-semibold text-gpcs-text mb-2">GPCS is:</p>
            <ul className="space-y-1.5">
              {[
                "A proposal under active testing",
                "Voluntary — no one is required to participate",
                "Transparent — all criteria are publicly documented",
                "Project-centric — not a studio ranking system",
                "Open to feedback and revision",
              ].map((item) => (
                <li key={item} className="flex gap-2 text-gpcs-silver">
                  <span className="text-gpcs-gold mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gpcs-text mb-2">GPCS is not:</p>
            <ul className="space-y-1.5">
              {[
                "A ratified industry standard (yet)",
                "A quality assessment",
                "A commercial viability prediction",
                "Officially endorsed by any body",
                "Mandatory for any purpose",
              ].map((item) => (
                <li key={item} className="flex gap-2 text-gpcs-silver">
                  <span className="text-gpcs-muted mt-0.5">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Governance */}
      <section className="mb-12">
        <h2 className="font-display text-2xl font-bold text-gpcs-text mb-4">
          Governance
        </h2>
        <div className="space-y-4">
          <div className="rounded-lg border border-white/10 bg-gpcs-slate/20 p-5">
            <h3 className="font-semibold text-gpcs-text mb-2">Current (v{versionShort})</h3>
            <p className="text-sm text-gpcs-muted leading-relaxed">
              Maintained by the author (Devon Stanton). Community proposals via GitHub Issues.
              Quarterly review cycles, annual major releases. All changes documented in the changelog.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-gpcs-slate/20 p-5">
            <h3 className="font-semibold text-gpcs-text mb-2">Future (when critical mass reached)</h3>
            <p className="text-sm text-gpcs-muted leading-relaxed">
              Advisory board with representation from studios, publishers, platforms, awards bodies,
              and academic researchers. Major changes require supermajority vote (7/9). Backward
              compatibility maintained — old ratings grandfathered with version label.
            </p>
          </div>
        </div>
      </section>

      {/* License & Citation */}
      <section className="mb-12">
        <h2 className="font-display text-2xl font-bold text-gpcs-text mb-4">
          License & Citation
        </h2>
        <div className="rounded-xl border border-gpcs-gold/20 bg-gpcs-gold/5 p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="rounded-full border border-gpcs-gold/40 bg-gpcs-gold/15 px-3 py-0.5 text-sm font-semibold text-gpcs-gold">
              CC BY 4.0
            </span>
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gpcs-muted hover:text-gpcs-gold transition-colors inline-flex items-center gap-1"
            >
              Creative Commons Attribution 4.0 <ExternalLink size={10} />
            </a>
          </div>
          <p className="text-sm text-gpcs-silver mb-4 leading-relaxed">
            You are free to share and adapt this framework for any purpose, provided you give
            appropriate credit.
          </p>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gpcs-muted uppercase tracking-wider mb-1">APA Citation</p>
              <p className="font-mono text-xs bg-gpcs-slate/60 rounded px-3 py-2 text-gpcs-silver">
                Stanton, D. (2025). <em>Game Project Classification Standard (GPCS): A Bond-Style Rating System for Game Projects</em> (Version {version}). CC BY 4.0.
              </p>
            </div>
            <div>
              <p className="text-xs text-gpcs-muted uppercase tracking-wider mb-1">Implementation Attribution</p>
              <p className="font-mono text-xs bg-gpcs-slate/60 rounded px-3 py-2 text-gpcs-silver">
                Classification system based on Devon Stanton&apos;s Game Project Classification Standard (GPCS v{versionShort})
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <a
          href="https://github.com/koldfu5ion/gpcs"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl border border-white/10 bg-gpcs-slate/20 p-5 hover:border-white/20 transition-colors"
        >
          <Github size={20} className="text-gpcs-silver" />
          <div>
            <p className="text-sm font-semibold text-gpcs-text">GitHub Repository</p>
            <p className="text-xs text-gpcs-muted">Issues, proposals, changelog</p>
          </div>
        </a>
        <Link
          href="/specification"
          className="flex items-center gap-3 rounded-xl border border-white/10 bg-gpcs-slate/20 p-5 hover:border-white/20 transition-colors"
        >
          <div className="flex h-5 w-5 items-center justify-center">
            <span className="font-display text-sm font-bold text-gpcs-gold">G</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-gpcs-text">Full Specification</p>
            <p className="text-xs text-gpcs-muted">Read the complete white paper</p>
          </div>
        </Link>
      </section>

      {/* Support this project */}
      <section className="mb-8 rounded-xl border border-gpcs-gold/20 bg-gpcs-gold/5 p-8">
        <h2 className="font-display text-2xl font-bold text-gpcs-text mb-2">
          Support This Project
        </h2>
        <p className="text-sm text-gpcs-silver mb-6 max-w-xl">
          GPCS is a solo, open-source initiative. A GitHub star signals industry interest and helps
          the standard gain visibility. If you find this work valuable, a Ko-fi helps sustain it.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://github.com/koldfu5ion/gpcs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-gpcs-gold/40 bg-gpcs-gold/10 px-5 py-3 text-sm font-semibold text-gpcs-gold hover:bg-gpcs-gold/20 transition-colors"
          >
            <Star size={16} />
            Star on GitHub
          </a>
          <a
            href="https://ko-fi.com/devonstanton"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-gpcs-border px-5 py-3 text-sm font-medium text-gpcs-silver hover:border-gpcs-gold/30 hover:text-gpcs-text transition-colors"
          >
            <Coffee size={16} />
            Support on Ko-fi
          </a>
        </div>
      </section>

      {/* Contact / feedback CTA */}
      <div className="rounded-xl border border-white/10 bg-gpcs-slate/20 p-8 text-center">
        <h2 className="font-display text-2xl font-bold text-gpcs-text mb-3">
          Feedback & Contributions
        </h2>
        <p className="text-sm text-gpcs-silver mb-6 max-w-lg mx-auto">
          GPCS is in active development. If you represent an awards body, grant programme, or
          platform and want to explore implementation, or if you have critique and suggestions,
          the author welcomes engagement.
        </p>
        <a
          href="mailto:devon.stanton@gmail.com"
          className="inline-flex items-center gap-2 rounded-lg bg-gpcs-gold px-6 py-3 text-sm font-semibold text-gpcs-navy hover:bg-gpcs-gold-light transition-colors"
        >
          Get in touch
          <ArrowRight size={16} />
        </a>
      </div>
    </div>
  );
}
