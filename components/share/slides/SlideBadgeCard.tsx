"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
import type { CalculationResult } from "@/lib/gpcs/types";
import { TIER_HEX } from "@/lib/gpcs/tiers";
import RatingBadge from "@/components/rate/RatingBadge";
import { dataUrlToFile } from "@/lib/badge/share";

type FileGenerator = () => Promise<File | null>;

interface SlideBadgeCardProps {
  result: CalculationResult;
  gameName?: string;
  onGenerator?: (gen: FileGenerator | null) => void;
}

function badgeCardFilename(gameName?: string): string {
  const slug = gameName
    ? gameName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    : null;
  return slug ? `gpcs-card-${slug}.png` : "gpcs-card.png";
}

export default function SlideBadgeCard({ result, gameName, onGenerator }: SlideBadgeCardProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const badgeRef = useRef<HTMLDivElement>(null);
  const tierColor = TIER_HEX[result.capacityTier];

  // Snapshots the live RatingBadge element. Used by both download and share.
  const captureBadge = useCallback(async (): Promise<string | null> => {
    if (!badgeRef.current) return null;
    const { toPng } = await import("html-to-image");
    // bg-gpcs-slate/80 is semi-transparent; composite against the page bg so
    // it renders identically to how it looks on screen
    return toPng(badgeRef.current, { pixelRatio: 2, backgroundColor: "#0A0A0F" });
  }, []);

  const generateFile = useCallback(async (): Promise<File | null> => {
    const dataUrl = await captureBadge();
    if (!dataUrl) return null;
    return dataUrlToFile(dataUrl, badgeCardFilename(gameName));
  }, [captureBadge, gameName]);

  useEffect(() => {
    if (onGenerator) onGenerator(generateFile);
  }, [generateFile, onGenerator]);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const dataUrl = await captureBadge();
      if (!dataUrl) return;
      const link = document.createElement("a");
      link.download = badgeCardFilename(gameName);
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Preview — ref wraps only the badge so snapshot excludes the container bg */}
      <div
        className="w-full rounded-lg flex items-center justify-center py-8"
        style={{ background: "#0A0A0F", border: `1px solid ${tierColor}15` }}
      >
        <div ref={badgeRef}>
          <RatingBadge result={result} size="lg" gameName={gameName} />
        </div>
      </div>

      {/* Slide label */}
      <div className="flex items-center justify-between text-xs text-gpcs-muted">
        <span className="font-semibold text-gpcs-silver">Slide 2 — Rating card</span>
        <span>2× PNG</span>
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
