"use client";

import { useEffect, useState } from "react";
import { RotateCcw, Twitter, Linkedin } from "lucide-react";
import type { SharePayload } from "@/lib/share/types";
import { SHARE_STORAGE_KEY } from "@/lib/share/types";
import RatingBadge from "@/components/rate/RatingBadge";
import KeyArtCarousel from "./KeyArtCarousel";

export default function ShareView() {
  const [payload, setPayload] = useState<SharePayload | null>(null);

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

      {/* Social pack carousel */}
      <KeyArtCarousel result={result} gameName={displayName} />

      {/* Actions */}
      <div className="flex flex-col gap-3">
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
