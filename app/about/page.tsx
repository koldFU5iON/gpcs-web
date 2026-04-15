import type { Metadata } from "next";
import Link from "next/link";
import { Github, ExternalLink, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "About the Game Project Classification Standard — author, governance, licensing, and how to contribute.",
};

export default function AboutPage() {
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
      <section className="mb-12 rounded-xl border border-white/10 bg-gpcs-slate/20 p-8">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gpcs-gold/15 border border-gpcs-gold/30">
            <span className="font-display text-2xl font-bold text-gpcs-gold">D</span>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-gpcs-text mb-1">
              Devon Stanton
            </h2>
            <p className="text-sm text-gpcs-muted mb-4">Creator, GPCS v0.5</p>
            <p className="text-sm text-gpcs-silver leading-relaxed max-w-xl">
              Devon Stanton created the Game Project Classification Standard to address the lack of
              structured, verifiable, and fair terminology in the game industry. GPCS draws on the
              bond-rating model used in financial markets to bring the same clarity and structural
              rigour to game project classification.
            </p>
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
              value: "v0.5.0",
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
            <h3 className="font-semibold text-gpcs-text mb-2">Current (v0.5)</h3>
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
                Stanton, D. (2025). <em>Game Project Classification Standard (GPCS): A Bond-Style Rating System for Game Projects</em> (Version 0.5). CC BY 4.0.
              </p>
            </div>
            <div>
              <p className="text-xs text-gpcs-muted uppercase tracking-wider mb-1">Implementation Attribution</p>
              <p className="font-mono text-xs bg-gpcs-slate/60 rounded px-3 py-2 text-gpcs-silver">
                Classification system based on Devon Stanton&apos;s Game Project Classification Standard (GPCS v0.5)
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
