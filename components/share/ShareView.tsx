"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw, Twitter, Linkedin } from "lucide-react";
import type { SharePayload } from "@/lib/share/types";
import { SHARE_STORAGE_KEY } from "@/lib/share/types";
import RatingBadge from "@/components/rate/RatingBadge";
import KeyArtCarousel from "./KeyArtCarousel";
import { canShareFiles, shareWithFiles } from "@/lib/badge/share";

export default function ShareView() {
  const [payload, setPayload] = useState<SharePayload | null>(null);
  const getFilesRef = useRef<(() => Promise<File[]>) | null>(null);

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

  const shareText = `${gameName || "My game"} received a GPCS ${result.display} rating — a structured classification of project scale and resource backing.`;
  const shareUrl = "https://gpcstandard.org/rate";
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${shareText} Rate your own game at gpcstandard.org/rate`)}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  // Tries Web Share API with image files first; falls back to opening
  // the platform's URL intent (text-only share) if unsupported or aborted.
  const handleShare = async (e: React.MouseEvent<HTMLAnchorElement>, fallbackUrl: string) => {
    e.preventDefault();
    if (getFilesRef.current) {
      try {
        const files = await getFilesRef.current();
        if (files.length > 0 && canShareFiles(files)) {
          const shared = await shareWithFiles({ files, text: shareText, url: shareUrl });
          if (shared) return;
        }
      } catch {
        // fall through to URL intent
      }
    }
    window.open(fallbackUrl, "_blank", "noopener,noreferrer");
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

      {/* Social pack carousel */}
      <KeyArtCarousel
        result={result}
        gameName={displayName}
        onFilesAvailable={(fn) => { getFilesRef.current = fn; }}
      />

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => handleShare(e, tweetUrl)}
          className="flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-medium text-gpcs-silver hover:border-white/25 transition-colors"
        >
          <Twitter size={16} />
          Share on Twitter / X
        </a>

        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => handleShare(e, linkedInUrl)}
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
