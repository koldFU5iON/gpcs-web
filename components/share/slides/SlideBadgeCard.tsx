"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import type { CalculationResult } from "@/lib/gpcs/types";
import { TIER_HEX } from "@/lib/gpcs/tiers";
import RatingBadge from "@/components/rate/RatingBadge";
import { downloadSquareBadge } from "@/lib/badge/download";

interface SlideBadgeCardProps {
  result: CalculationResult;
  gameName?: string;
}

export default function SlideBadgeCard({ result, gameName }: SlideBadgeCardProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const tierColor = TIER_HEX[result.capacityTier];

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadSquareBadge(result, gameName);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Square preview */}
      <div
        className="w-full rounded-lg overflow-hidden flex items-center justify-center"
        style={{ aspectRatio: "1 / 1", background: "#0A0A0F", border: `1px solid ${tierColor}20` }}
      >
        <RatingBadge result={result} size="lg" gameName={gameName} />
      </div>

      {/* Slide label */}
      <div className="flex items-center justify-between text-xs text-gpcs-muted">
        <span className="font-semibold text-gpcs-silver">Slide 2 — Rating card</span>
        <span>1080 × 1080px</span>
      </div>

      {/* Download button */}
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        aria-busy={isDownloading}
        className="flex items-center justify-center gap-2 rounded-lg border border-gpcs-gold/40 bg-gpcs-gold/10 px-4 py-2.5 text-sm font-semibold text-gpcs-gold hover:bg-gpcs-gold/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        <Download size={15} />
        {isDownloading ? "Generating…" : "Download slide 2"}
      </button>
    </div>
  );
}
