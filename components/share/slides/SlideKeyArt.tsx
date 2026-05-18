"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Upload } from "lucide-react";
import type { CalculationResult } from "@/lib/gpcs/types";
import RatingBadge from "@/components/rate/RatingBadge";
import { downloadKeyArtOverlay, type KeyArtState } from "@/lib/badge/download";

interface SlideKeyArtProps {
  result: CalculationResult;
  gameName?: string;
  onImageReady: (ready: boolean) => void;
  onStateChange: (state: KeyArtState | null) => void;
}

const PREVIEW_W = 600;
const PREVIEW_H = 315;

const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

export default function SlideKeyArt({ result, gameName, onImageReady, onStateChange }: SlideKeyArtProps) {
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [scaledImgW, setScaledImgW] = useState(0);
  const [scaledImgH, setScaledImgH] = useState(0);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragStart = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);

  // Notify carousel of current downloadable state whenever pan or image changes
  useEffect(() => {
    if (imageDataUrl) {
      onStateChange({ imageDataUrl, panX, panY, scaledImgW, scaledImgH });
    } else {
      onStateChange(null);
    }
  }, [imageDataUrl, panX, panY, scaledImgW, scaledImgH, onStateChange]);

  const loadImage = (dataUrl: string) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.max(PREVIEW_W / img.naturalWidth, PREVIEW_H / img.naturalHeight);
      const sw = img.naturalWidth * scale;
      const sh = img.naturalHeight * scale;
      setScaledImgW(sw);
      setScaledImgH(sh);
      setPanX((PREVIEW_W - sw) / 2);
      setPanY((PREVIEW_H - sh) / 2);
      setImageDataUrl(dataUrl);
      onImageReady(true);
    };
    img.src = dataUrl;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (typeof ev.target?.result === "string") loadImage(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleClear = () => {
    setImageDataUrl(null);
    setHasInteracted(false);
    onImageReady(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const getCoords = (e: React.MouseEvent | React.TouchEvent) =>
    "touches" in e
      ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
      : { x: e.clientX, y: e.clientY };

  const onPointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    const { x, y } = getCoords(e);
    dragStart.current = { x, y, panX, panY };
    setIsDragging(true);
    if (!hasInteracted) setHasInteracted(true);
  };

  const onPointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragStart.current) return;
    const { x, y } = getCoords(e);
    setPanX(clamp(dragStart.current.panX + (x - dragStart.current.x), PREVIEW_W - scaledImgW, 0));
    setPanY(clamp(dragStart.current.panY + (y - dragStart.current.y), PREVIEW_H - scaledImgH, 0));
  };

  const onPointerUp = () => {
    dragStart.current = null;
    setIsDragging(false);
  };

  const handleDownload = async () => {
    if (!imageDataUrl) return;
    setIsDownloading(true);
    try {
      await downloadKeyArtOverlay({ imageDataUrl, panX, panY, scaledImgW, scaledImgH }, result, gameName);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!imageDataUrl) {
    return (
      <div className="flex flex-col gap-3">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full rounded-lg border-2 border-dashed border-white/15 flex flex-col items-center justify-center gap-2 text-gpcs-muted hover:border-white/25 transition-colors cursor-pointer"
          style={{ aspectRatio: "1200 / 630", minHeight: "120px" }}
        >
          <Upload size={20} />
          <span className="text-sm font-medium">Upload key art</span>
          <span className="text-xs">PNG, JPG, WEBP</span>
        </button>
        <p className="text-xs text-gpcs-muted text-center">
          Processed locally — never uploaded to a server.
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="flex items-center justify-between text-xs text-gpcs-muted">
          <span className="font-semibold text-gpcs-silver">Slide 1 — Key art</span>
          <span>1200 × 630px</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Preview */}
      <div
        className="relative w-full rounded-lg overflow-hidden select-none"
        style={{
          aspectRatio: "1200 / 630",
          cursor: isDragging ? "grabbing" : "grab",
          background: "#0a0a0f",
        }}
        onMouseDown={onPointerDown}
        onMouseMove={onPointerMove}
        onMouseUp={onPointerUp}
        onMouseLeave={onPointerUp}
        onTouchStart={onPointerDown}
        onTouchMove={onPointerMove}
        onTouchEnd={onPointerUp}
        onTouchCancel={onPointerUp}
      >
        {/* Repositionable image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageDataUrl}
          alt="Key art preview"
          draggable={false}
          style={{
            position: "absolute",
            width: `${scaledImgW}px`,
            height: `${scaledImgH}px`,
            top: `${panY}px`,
            left: `${panX}px`,
            pointerEvents: "none",
          }}
        />

        {/* Drag hint — hidden after first interaction */}
        {!hasInteracted && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="rounded-lg border border-white/20 bg-black/60 px-3 py-1.5 text-xs text-gpcs-silver">
              Drag to reposition
            </div>
          </div>
        )}

        {/* Badge preview at ~33% width — bottom-left */}
        <div className="absolute bottom-2 left-2 pointer-events-none" style={{ width: "33%" }}>
          <RatingBadge result={result} size="sm" gameName={gameName} />
        </div>

        {/* Change image */}
        <button
          onClick={(e) => { e.stopPropagation(); handleClear(); }}
          className="absolute top-2 right-2 rounded-md border border-white/20 bg-black/60 px-2 py-1 text-xs text-gpcs-silver hover:bg-black/80 transition-colors cursor-pointer"
        >
          Change ✕
        </button>
      </div>

      {/* Slide label */}
      <div className="flex items-center justify-between text-xs text-gpcs-muted">
        <span className="font-semibold text-gpcs-silver">Slide 1 — Key art</span>
        <span>1200 × 630px</span>
      </div>

      {/* Download button */}
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        aria-busy={isDownloading}
        className="flex items-center justify-center gap-2 rounded-lg border border-gpcs-gold/40 bg-gpcs-gold/10 px-4 py-2.5 text-sm font-semibold text-gpcs-gold hover:bg-gpcs-gold/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        <Download size={15} />
        {isDownloading ? "Generating…" : "Download slide 1"}
      </button>
    </div>
  );
}
