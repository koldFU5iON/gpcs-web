"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import type { CalculationResult } from "@/lib/gpcs/types";
import { downloadKeyArtOverlay, downloadSquareBadge, type KeyArtState } from "@/lib/badge/download";
import SlideKeyArt from "./slides/SlideKeyArt";
import SlideBadgeCard from "./slides/SlideBadgeCard";

type FileGenerator = () => Promise<File | null>;

interface KeyArtCarouselProps {
  result: CalculationResult;
  gameName?: string;
  onFilesAvailable?: (getFiles: () => Promise<File[]>) => void;
}

const TOTAL_SLIDES = 2;

export default function KeyArtCarousel({ result, gameName, onFilesAvailable }: KeyArtCarouselProps) {
  const [activeSlide, setActiveSlide] = useState(1); // start on slide 2 (always available)
  const [keyArtReady, setKeyArtReady] = useState(false);
  const [keyArtState, setKeyArtState] = useState<KeyArtState | null>(null);
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);

  // Slide-provided file generators, collected via callback. Refs not state
  // so updates don't trigger carousel re-renders.
  const keyArtGenRef = useRef<FileGenerator | null>(null);
  const badgeGenRef = useRef<FileGenerator | null>(null);

  // Expose aggregated getFiles() to parent (ShareView) once on mount —
  // the ref-based generators stay live across re-renders.
  useEffect(() => {
    if (!onFilesAvailable) return;
    onFilesAvailable(async () => {
      const files: File[] = [];
      if (keyArtGenRef.current) {
        const f = await keyArtGenRef.current();
        if (f) files.push(f);
      }
      if (badgeGenRef.current) {
        const f = await badgeGenRef.current();
        if (f) files.push(f);
      }
      return files;
    });
  }, [onFilesAvailable]);

  const handleDownloadAll = async () => {
    setIsDownloadingAll(true);
    try {
      await downloadSquareBadge(result, gameName);
      if (keyArtState) {
        await downloadKeyArtOverlay(keyArtState, result, gameName);
      }
    } finally {
      setIsDownloadingAll(false);
    }
  };

  return (
    <div className="rounded-xl border border-gpcs-border bg-gpcs-surface p-6">
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gpcs-muted">
        Your social pack
      </p>

      {/* Navigation dots */}
      <div className="flex items-center justify-center gap-4 mb-5">
        <button
          onClick={() => setActiveSlide(0)}
          className="flex items-center gap-1.5 text-xs transition-colors cursor-pointer"
          style={{ color: activeSlide === 0 ? "#F0F0FA" : "#55557A" }}
        >
          <span
            className="inline-flex h-2 w-2 rounded-full transition-colors"
            style={{ background: activeSlide === 0 ? "#00C8FF" : "#55557A" }}
          />
          {keyArtReady ? "Key art" : "Key art 🔒"}
        </button>
        <button
          onClick={() => setActiveSlide(1)}
          className="flex items-center gap-1.5 text-xs transition-colors cursor-pointer"
          style={{ color: activeSlide === 1 ? "#F0F0FA" : "#55557A" }}
        >
          <span
            className="inline-flex h-2 w-2 rounded-full transition-colors"
            style={{ background: activeSlide === 1 ? "#00C8FF" : "#55557A" }}
          />
          Rating card
        </button>
      </div>

      {/* Slide content with arrows */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveSlide((s) => Math.max(0, s - 1))}
          disabled={activeSlide === 0}
          className="shrink-0 rounded-lg border border-white/10 p-2 text-gpcs-muted hover:border-white/20 hover:text-gpcs-silver disabled:opacity-20 transition-colors cursor-pointer"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex-1 min-w-0">
          {/* Both slides always mounted — display:none preserves SlideKeyArt state */}
          <div style={{ display: activeSlide === 0 ? "block" : "none" }}>
            <SlideKeyArt
              result={result}
              gameName={gameName}
              onImageReady={setKeyArtReady}
              onStateChange={setKeyArtState}
              onGenerator={(gen) => { keyArtGenRef.current = gen; }}
            />
          </div>
          <div style={{ display: activeSlide === 1 ? "block" : "none" }}>
            <SlideBadgeCard
              result={result}
              gameName={gameName}
              onGenerator={(gen) => { badgeGenRef.current = gen; }}
            />
          </div>
        </div>

        <button
          onClick={() => setActiveSlide((s) => Math.min(TOTAL_SLIDES - 1, s + 1))}
          disabled={activeSlide === TOTAL_SLIDES - 1}
          className="shrink-0 rounded-lg border border-white/10 p-2 text-gpcs-muted hover:border-white/20 hover:text-gpcs-silver disabled:opacity-20 transition-colors cursor-pointer"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Download All */}
      <div className="mt-5 pt-5 border-t border-white/10">
        <button
          onClick={handleDownloadAll}
          disabled={isDownloadingAll}
          aria-busy={isDownloadingAll}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-gpcs-gold px-5 py-3 text-sm font-semibold text-gpcs-navy hover:bg-gpcs-gold-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <Download size={16} />
          {isDownloadingAll ? "Generating…" : "Download all slides"}
        </button>
        <p className="mt-2 text-xs text-gpcs-muted text-center">
          Post as a carousel on Instagram, Twitter / X, or LinkedIn.
          {!keyArtReady && " Upload key art on slide 1 to include it."}
        </p>
      </div>
    </div>
  );
}
