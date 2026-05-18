"use client";

import { useEffect, useState } from "react";
import { Download, RotateCcw, Twitter, Linkedin } from "lucide-react";
import type { SharePayload } from "@/lib/share/types";
import { SHARE_STORAGE_KEY } from "@/lib/share/types";
import RatingBadge from "@/components/rate/RatingBadge";
import { downloadBadge } from "@/lib/badge/download";

export default function ShareView() {
  const [payload, setPayload] = useState<SharePayload | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem(SHARE_STORAGE_KEY);
    if (!raw) return;
    try {
      setPayload(JSON.parse(raw));
    } catch {
      // malformed payload — show empty state
    }
  }, []);

  if (!payload) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-gpcs-muted">
          No rating found — complete the form to generate your badge.
        </p>
        <a href="/rate" className="text-sm text-gpcs-gold hover:underline">
          Rate your game →
        </a>
      </div>
    );
  }

  const { result, gameName } = payload;
  const displayName = gameName || undefined;
  const title = gameName ? `${gameName}'s GPCS Rating` : "Your GPCS Rating";

  const tweetText = encodeURIComponent(
    `${gameName || "My game"} received a GPCS ${result.display} rating — a structured classification of project scale and resource backing. Rate your own game at gpcstandard.org/rate`
  );
  const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://gpcstandard.org/rate")}`;

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadBadge(result, displayName);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      {/* Heading */}
      <div className="mb-8 text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gpcs-muted">
          GPCS Result
        </p>
        <h1 className="font-display text-3xl font-bold text-gpcs-text">{title}</h1>
      </div>

      {/* Badge */}
      <div className="mb-8 flex justify-center">
        <RatingBadge result={result} size="lg" gameName={displayName} />
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          aria-busy={isDownloading}
          className="flex items-center justify-center gap-2 rounded-lg border border-gpcs-gold/40 bg-gpcs-gold/10 px-5 py-3 text-sm font-semibold text-gpcs-gold hover:bg-gpcs-gold/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <Download size={16} />
          {isDownloading ? "Generating…" : "Download badge"}
        </button>

        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-medium text-gpcs-silver hover:border-white/25 transition-colors"
        >
          <Twitter size={16} />
          Share on Twitter / X
        </a>

        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-medium text-gpcs-silver hover:border-white/25 transition-colors"
        >
          <Linkedin size={16} />
          Share on LinkedIn
        </a>

        {/* Phase 2 placeholder */}
        <div className="rounded-lg border border-dashed border-white/15 p-5 text-center">
          <p className="mb-1 text-sm font-semibold text-gpcs-muted">Key art overlay</p>
          <p className="text-xs text-gpcs-muted leading-relaxed">
            Stamp your GPCS badge onto game key art — coming soon.
          </p>
        </div>

        <a
          href="/rate"
          className="flex items-center justify-center gap-2 rounded-lg border border-white/10 px-5 py-3 text-sm text-gpcs-silver hover:border-white/20 transition-colors"
        >
          <RotateCcw size={16} />
          Rate another project
        </a>
      </div>
    </div>
  );
}
