import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/5 bg-gpcs-slate/30">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded border border-gpcs-gold/40 bg-gpcs-gold/10">
                <span className="font-display text-xs font-bold text-gpcs-gold">G</span>
              </div>
              <span className="font-display font-semibold text-gpcs-text">GPCS</span>
            </div>
            <p className="text-sm text-gpcs-muted leading-relaxed">
              Game Project Classification Standard. A bond-style rating framework
              for classifying game projects by production capacity and resource backing.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span className="rounded border border-gpcs-gold/30 bg-gpcs-gold/10 px-2 py-0.5 text-xs font-mono text-gpcs-gold">
                v0.5.0
              </span>
              <span className="text-xs text-gpcs-muted">Proposal under testing</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-gpcs-muted">
              Navigation
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/how-it-works", label: "How It Works" },
                { href: "/specification", label: "Specification" },
                { href: "/rate", label: "Rate Your Project" },
                { href: "/about", label: "About" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gpcs-silver hover:text-gpcs-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* License & Citation */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-gpcs-muted">
              License & Citation
            </h3>
            <p className="text-sm text-gpcs-muted mb-3">
              Licensed under{" "}
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gpcs-gold hover:underline inline-flex items-center gap-1"
              >
                CC BY 4.0 <ExternalLink size={11} />
              </a>
            </p>
            <p className="text-xs text-gpcs-muted font-mono bg-gpcs-slate/60 rounded px-3 py-2 leading-relaxed">
              Stanton, D. (2025). <em>Game Project Classification Standard v0.5</em>. CC BY 4.0.
            </p>
            <a
              href="https://github.com/koldfu5ion/gpcs"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm text-gpcs-silver hover:text-gpcs-gold transition-colors"
            >
              <Github size={14} />
              GitHub Repository
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gpcs-muted">
            &copy; 2025 Devon Stanton. Ratings are capacity-based, not quality judgements.
          </p>
          <p className="text-xs text-gpcs-muted">
            Not yet a ratified standard &mdash; proposal under testing.
          </p>
        </div>
      </div>
    </footer>
  );
}
