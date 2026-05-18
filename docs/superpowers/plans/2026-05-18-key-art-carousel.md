# Key Art Carousel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the "coming soon" placeholder on `/share` with a two-slide social asset carousel — a 1200×630 key art overlay and a 1080×1080 standalone badge card — with drag-to-reposition, live preview, and individual + bulk download.

**Architecture:** All processing is client-side. `buildBadgeElement()` gains a `width` param for proportional scaling. Two new download functions build full-res DOM containers, append to body, snapshot with `html-to-image`, then remove. Three new components (carousel shell + two slides) compose into a `<KeyArtCarousel>` that replaces the old download button and placeholder in `ShareView`.

**Tech Stack:** Next.js 15 App Router, TypeScript, React, `html-to-image` (already installed), Tailwind CSS, Lucide icons.

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `lib/badge/download.ts` | Add `width` param to `buildBadgeElement`; add `downloadKeyArtOverlay()` and `downloadSquareBadge()` |
| Create | `components/share/slides/SlideBadgeCard.tsx` | Slide 2: square badge preview + download |
| Create | `components/share/slides/SlideKeyArt.tsx` | Slide 1: upload zone, drag-to-pan preview, download |
| Create | `components/share/KeyArtCarousel.tsx` | Carousel shell: nav dots, arrows, Download All |
| Modify | `components/share/ShareView.tsx` | Remove old download button; add `<KeyArtCarousel>` |

---

## Task 1: Feature branch

**Files:** none (setup only)

- [ ] **Step 1: Create branch**

```bash
git checkout -b feat/key-art-carousel
```

- [ ] **Step 2: Verify TypeScript baseline**

```bash
npx tsc --noEmit
```
Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git commit --allow-empty -m "chore: start feat/key-art-carousel branch"
```

---

## Task 2: Extend `buildBadgeElement()` with proportional width scaling

**Files:**
- Modify: `lib/badge/download.ts`

The function currently hardcodes all pixel values for a 560px-wide badge. Add a `width` parameter (default `560`) and derive all measurements from it proportionally. The height maintains the current `500/560` aspect ratio.

- [ ] **Step 1: Replace `buildBadgeElement` with the scaled version**

Replace the entire `buildBadgeElement` function (lines 5–98 in `lib/badge/download.ts`) with:

```ts
function buildBadgeElement(result: CalculationResult, gameName?: string, width = 560): HTMLDivElement {
  const tierColor = TIER_HEX[result.capacityTier];
  const independenceLabel = INDEPENDENCE_LABELS[result.independence].replace(/^I\d — /, "");
  const s = width / 560; // scale factor
  const px = (n: number) => `${Math.round(n * s)}px`;

  const el = document.createElement("div");
  Object.assign(el.style, {
    position: "fixed", top: "0", left: "0", zIndex: "99999",
    pointerEvents: "none", width: `${width}px`, height: px(500),
    fontFamily: "'Courier New', Courier, monospace",
    background: "#131320", border: `1px solid ${tierColor}40`,
    borderRadius: px(12),
    boxShadow: `0 0 ${px(60)} ${tierColor}18, 0 0 ${px(120)} ${tierColor}08`,
    padding: `${px(32)} ${px(40)}`, boxSizing: "border-box", overflow: "hidden",
    display: "flex", flexDirection: "column",
  });

  // Top colour strip
  const strip = document.createElement("div");
  Object.assign(strip.style, {
    position: "absolute", top: "0", left: "0", right: "0", height: px(4),
    background: `linear-gradient(90deg, ${tierColor}60, ${tierColor}CC, ${tierColor}60)`,
    borderRadius: `${px(12)} ${px(12)} 0 0`,
  });
  el.appendChild(strip);

  // Header label
  const header = document.createElement("p");
  Object.assign(header.style, {
    fontSize: px(11), fontWeight: "600", letterSpacing: "0.2em",
    textTransform: "uppercase", color: "#55557A",
    marginBottom: px(20), marginTop: px(8),
  });
  header.textContent = "GPC Capacity Rating";
  el.appendChild(header);

  // Rating + independence row
  const ratingRow = document.createElement("div");
  Object.assign(ratingRow.style, { display: "flex", alignItems: "baseline", gap: px(16), marginBottom: px(10) });
  const ratingEl = document.createElement("span");
  Object.assign(ratingEl.style, { fontSize: px(96), fontWeight: "900", lineHeight: "1", color: tierColor });
  ratingEl.textContent = result.display;
  const indEl = document.createElement("span");
  Object.assign(indEl.style, { fontSize: px(36), fontWeight: "600", color: "#8888AA" });
  indEl.textContent = `/ ${result.independence}`;
  ratingRow.appendChild(ratingEl);
  ratingRow.appendChild(indEl);
  el.appendChild(ratingRow);

  // Independence label
  const indLabel = document.createElement("p");
  Object.assign(indLabel.style, { fontSize: px(14), color: "#55557A", marginBottom: px(32) });
  indLabel.textContent = independenceLabel;
  el.appendChild(indLabel);

  // Divider
  const divider = document.createElement("div");
  divider.style.borderTop = `1px solid ${tierColor}20`;
  divider.style.marginBottom = px(16);
  el.appendChild(divider);

  // Meta rows
  const metaWrap = document.createElement("div");
  Object.assign(metaWrap.style, { display: "flex", flexDirection: "column", gap: px(12) });
  for (const [label, value] of [
    ["Verification", result.verification],
    ["Version", `v${result.version}`],
    ["Score", String(result.compositeScore)],
  ] as const) {
    const row = document.createElement("div");
    Object.assign(row.style, { display: "flex", justifyContent: "space-between", fontSize: px(14) });
    const lEl = document.createElement("span"); lEl.style.color = "#55557A"; lEl.textContent = label;
    const vEl = document.createElement("span"); vEl.style.color = "#8888AA"; vEl.textContent = value;
    row.appendChild(lEl); row.appendChild(vEl);
    metaWrap.appendChild(row);
  }
  el.appendChild(metaWrap);

  // Footer
  const footer = document.createElement("div");
  Object.assign(footer.style, {
    borderTop: `1px solid ${tierColor}15`, paddingTop: px(20),
    marginTop: "auto", textAlign: "center",
  });
  const footerText = document.createElement("p");
  Object.assign(footerText.style, {
    fontSize: px(11), color: "#55557A",
    letterSpacing: "0.12em", textTransform: "uppercase",
  });
  footerText.textContent = `${gameName ? `${gameName} · ` : ""}gpcstandard.org · Unverified self-assessment`;
  footer.appendChild(footerText);
  el.appendChild(footer);

  return el;
}
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit
```
Expected: zero errors (the call sites still pass `result` and optional `gameName`; the new third param has a default).

- [ ] **Step 3: Commit**

```bash
git add lib/badge/download.ts
git commit -m "feat(badge): add proportional width param to buildBadgeElement"
```

---

## Task 3: Add `downloadKeyArtOverlay()` and `downloadSquareBadge()`

**Files:**
- Modify: `lib/badge/download.ts`

Add both functions after the existing `downloadBadge` export.

- [ ] **Step 1: Add a `KeyArtState` type at the top of `lib/badge/download.ts`** (after the imports)

```ts
export interface KeyArtState {
  imageDataUrl: string;
  panX: number;
  panY: number;
  scaledImgW: number;
  scaledImgH: number;
}
```

- [ ] **Step 2: Append `downloadKeyArtOverlay` to the bottom of `lib/badge/download.ts`**

```ts
export async function downloadKeyArtOverlay(
  state: KeyArtState,
  result: CalculationResult,
  gameName?: string,
): Promise<void> {
  const { toPng } = await import("html-to-image");
  const RATIO = 2; // preview is 600px wide, output is 1200px

  const container = document.createElement("div");
  Object.assign(container.style, {
    position: "fixed", top: "0", left: "0", zIndex: "99999",
    width: "1200px", height: "630px", overflow: "hidden", pointerEvents: "none",
  });

  // Key art layer
  const img = document.createElement("img");
  img.src = state.imageDataUrl;
  Object.assign(img.style, {
    position: "absolute",
    width: `${state.scaledImgW * RATIO}px`,
    height: `${state.scaledImgH * RATIO}px`,
    top: `${state.panY * RATIO}px`,
    left: `${state.panX * RATIO}px`,
    pointerEvents: "none",
  });
  container.appendChild(img);

  // Badge layer at 400px wide, bottom-left
  const badge = buildBadgeElement(result, gameName, 400);
  badge.style.position = "absolute";
  badge.style.top = "auto";
  badge.style.bottom = "32px";
  badge.style.left = "32px";
  badge.style.zIndex = "1";
  container.appendChild(badge);

  document.body.appendChild(container);
  await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));

  try {
    const dataUrl = await toPng(container, { pixelRatio: 1, width: 1200, height: 630 });
    const slug = gameName ? gameName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") : null;
    const filename = slug ? `gpcs-keyart-${slug}.png` : "gpcs-keyart.png";
    const link = document.createElement("a");
    link.download = filename; link.href = dataUrl;
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
  } finally {
    document.body.removeChild(container);
  }
}
```

- [ ] **Step 3: Append `downloadSquareBadge` to the bottom of `lib/badge/download.ts`**

```ts
export async function downloadSquareBadge(result: CalculationResult, gameName?: string): Promise<void> {
  const { toPng } = await import("html-to-image");
  const SIZE = 1080;

  const container = document.createElement("div");
  Object.assign(container.style, {
    position: "fixed", top: "0", left: "0", zIndex: "99999",
    width: `${SIZE}px`, height: `${SIZE}px`,
    background: "#0A0A0F",
    display: "flex", alignItems: "center", justifyContent: "center",
    pointerEvents: "none",
  });

  const badge = buildBadgeElement(result, gameName);
  badge.style.position = "relative";
  badge.style.top = "auto";
  badge.style.left = "auto";
  badge.style.zIndex = "auto";
  container.appendChild(badge);

  document.body.appendChild(container);
  await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));

  try {
    const dataUrl = await toPng(container, { pixelRatio: 1, width: SIZE, height: SIZE });
    const slug = gameName ? gameName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") : null;
    const filename = slug ? `gpcs-card-${slug}.png` : "gpcs-card.png";
    const link = document.createElement("a");
    link.download = filename; link.href = dataUrl;
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
  } finally {
    document.body.removeChild(container);
  }
}
```

- [ ] **Step 4: TypeScript check**

```bash
npx tsc --noEmit
```
Expected: zero errors.

- [ ] **Step 5: Commit**

```bash
git add lib/badge/download.ts
git commit -m "feat(badge): add downloadKeyArtOverlay and downloadSquareBadge"
```

---

## Task 4: Create `SlideBadgeCard.tsx`

**Files:**
- Create: `components/share/slides/SlideBadgeCard.tsx`

- [ ] **Step 1: Create the directory and file**

```bash
mkdir -p components/share/slides
```

```tsx
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
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit
```
Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add components/share/slides/SlideBadgeCard.tsx
git commit -m "feat(share): add SlideBadgeCard — 1080×1080 standalone badge slide"
```

---

## Task 5: Create `SlideKeyArt.tsx`

**Files:**
- Create: `components/share/slides/SlideKeyArt.tsx`

This is the most complex component. It handles upload, cover-scale calculations, drag-to-pan, and calls back to the carousel with its current state for "Download All".

The preview container is 600×315px (half of the 1200×630 output). The `<img>` is absolutely positioned within it, tracked by `panX`/`panY` state (pixels at preview scale). Pan is constrained so the image always fills the frame.

- [ ] **Step 1: Create the file**

```tsx
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

  // Notify carousel of current downloadable state
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
      // Cover scale: ensure image fills PREVIEW_W × PREVIEW_H
      const scale = Math.max(PREVIEW_W / img.naturalWidth, PREVIEW_H / img.naturalHeight);
      const sw = img.naturalWidth * scale;
      const sh = img.naturalHeight * scale;
      setScaledImgW(sw);
      setScaledImgH(sh);
      // Start centred
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
    const dx = x - dragStart.current.x;
    const dy = y - dragStart.current.y;
    setPanX(clamp(dragStart.current.panX + dx, PREVIEW_W - scaledImgW, 0));
    setPanY(clamp(dragStart.current.panY + dy, PREVIEW_H - scaledImgH, 0));
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
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit
```
Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add components/share/slides/SlideKeyArt.tsx
git commit -m "feat(share): add SlideKeyArt — 1200×630 key art overlay with drag-to-pan"
```

---

## Task 6: Create `KeyArtCarousel.tsx`

**Files:**
- Create: `components/share/KeyArtCarousel.tsx`

The carousel shell manages active slide, key art readiness, and "Download All". It receives `keyArtState` from `SlideKeyArt` via `onStateChange` to enable Slide 1 in "Download All" without lifting all image state here.

- [ ] **Step 1: Create the file**

```tsx
"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import type { CalculationResult } from "@/lib/gpcs/types";
import { downloadKeyArtOverlay, downloadSquareBadge, type KeyArtState } from "@/lib/badge/download";
import SlideKeyArt from "./slides/SlideKeyArt";
import SlideBadgeCard from "./slides/SlideBadgeCard";

interface KeyArtCarouselProps {
  result: CalculationResult;
  gameName?: string;
}

export default function KeyArtCarousel({ result, gameName }: KeyArtCarouselProps) {
  const [activeSlide, setActiveSlide] = useState(1); // start on slide 2 (always available)
  const [keyArtReady, setKeyArtReady] = useState(false);
  const [keyArtState, setKeyArtState] = useState<KeyArtState | null>(null);
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);

  const handleDownloadAll = async () => {
    setIsDownloadingAll(true);
    try {
      // Always download slide 2
      await downloadSquareBadge(result, gameName);
      // Download slide 1 only if key art has been uploaded
      if (keyArtState) {
        await downloadKeyArtOverlay(keyArtState, result, gameName);
      }
    } finally {
      setIsDownloadingAll(false);
    }
  };

  const TOTAL_SLIDES = 2;

  return (
    <div className="rounded-xl border border-gpcs-border bg-gpcs-surface p-6">
      {/* Section label */}
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
          {/* Both slides are always mounted so SlideKeyArt retains its state when switching */}
          <div style={{ display: activeSlide === 0 ? "block" : "none" }}>
            <SlideKeyArt
              result={result}
              gameName={gameName}
              onImageReady={setKeyArtReady}
              onStateChange={setKeyArtState}
            />
          </div>
          <div style={{ display: activeSlide === 1 ? "block" : "none" }}>
            <SlideBadgeCard result={result} gameName={gameName} />
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
```

Note: both slides are always mounted (using `display: none` to hide the inactive one) so `SlideKeyArt` retains its uploaded image and pan state when the user navigates to slide 2 and back.

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit
```
Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add components/share/KeyArtCarousel.tsx
git commit -m "feat(share): add KeyArtCarousel shell with nav, slides, and Download All"
```

---

## Task 7: Update `ShareView.tsx`

**Files:**
- Modify: `components/share/ShareView.tsx`

Remove the old download button and placeholder. Add `<KeyArtCarousel>`.

- [ ] **Step 1: Update imports — remove `Download`, add `KeyArtCarousel`**

Find:
```tsx
import { useEffect, useState } from "react";
import { Download, RotateCcw, Twitter, Linkedin } from "lucide-react";
import type { SharePayload } from "@/lib/share/types";
import { SHARE_STORAGE_KEY } from "@/lib/share/types";
import RatingBadge from "@/components/rate/RatingBadge";
import { downloadBadge } from "@/lib/badge/download";
```

Replace with:
```tsx
import { useEffect, useState } from "react";
import { RotateCcw, Twitter, Linkedin } from "lucide-react";
import type { SharePayload } from "@/lib/share/types";
import { SHARE_STORAGE_KEY } from "@/lib/share/types";
import RatingBadge from "@/components/rate/RatingBadge";
import KeyArtCarousel from "./KeyArtCarousel";
```

- [ ] **Step 2: Remove `isDownloading` state, `handleDownload` function**

Find and delete these lines:
```tsx
  const [isDownloading, setIsDownloading] = useState(false);
```
and:
```tsx
  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadBadge(result, displayName);
    } finally {
      setIsDownloading(false);
    }
  };
```

- [ ] **Step 3: Replace the old download button and placeholder card with `<KeyArtCarousel>`**

Find:
```tsx
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
```

Replace with:
```tsx
      {/* Social pack carousel */}
      <KeyArtCarousel result={result} gameName={displayName} />

      {/* Actions */}
      <div className="flex flex-col gap-3">
```

- [ ] **Step 4: Remove the placeholder card JSX**

Find and delete:
```tsx
        {/* Phase 2 placeholder */}
        <div className="rounded-lg border border-dashed border-white/15 p-5 text-center">
          <p className="mb-1 text-sm font-semibold text-gpcs-muted">Key art overlay</p>
          <p className="text-xs text-gpcs-muted leading-relaxed">
            Stamp your GPCS badge onto game key art — coming soon.
          </p>
        </div>
```

- [ ] **Step 5: TypeScript check — full clean pass**

```bash
npx tsc --noEmit
```
Expected: **zero errors**.

- [ ] **Step 6: Commit**

```bash
git add components/share/ShareView.tsx
git commit -m "feat(share): wire KeyArtCarousel into ShareView, remove old download button"
```

---

## Task 8: Smoke test + push

- [ ] **Step 1: Start dev server**

```bash
npm start
```

- [ ] **Step 2: Navigate to `/share` without rating first**

Open `http://localhost:8080/share`. Empty state should show with link to `/rate`. Carousel should not appear.

- [ ] **Step 3: Complete a rating and reach the Share page**

Complete the rating form, click "Share" on the result screen. Verify the share page shows:
- Heading with game name (if provided)
- `RatingBadge` at lg size
- "Your social pack" section with carousel starting on Slide 2
- Navigation dots: "Key art 🔒" + "Rating card" (active)
- Left/right arrow buttons
- "Download all slides" button
- Social share links still present below

- [ ] **Step 4: Test Slide 2 — Rating card**

Click "Download slide 2". Verify a `gpcs-card-<game>.png` (or `gpcs-card.png`) downloads. Open it — should be a dark square 1080×1080 with the badge centred.

- [ ] **Step 5: Test Slide 1 navigation and upload**

Click the left arrow or "Key art 🔒" dot to switch to Slide 1. Verify the upload zone appears. Upload a JPEG image. Verify:
- Preview appears at the correct 1200:630 aspect ratio
- Badge is visible at bottom-left at ~33% preview width
- "Drag to reposition" hint is visible
- Dragging the image pans it correctly, hint disappears after first drag
- "Change ✕" button is visible and clears the image
- Dot label updates to "Key art" (lock removed)

- [ ] **Step 6: Test Slide 1 download**

With key art uploaded and positioned, click "Download slide 1". Verify a `gpcs-keyart-<game>.png` downloads. Open it — should be 1200×630 with the key art as background and the badge at bottom-left.

- [ ] **Step 7: Test Download All**

With key art uploaded: click "Download all slides". Two files should download sequentially (`gpcs-card-*.png` then `gpcs-keyart-*.png`). Without key art uploaded (navigate away, upload cleared): "Download all" should download only `gpcs-card-*.png`.

- [ ] **Step 8: Test state persistence across slide navigation**

Upload key art on Slide 1, drag to reposition, switch to Slide 2, switch back to Slide 1. Image and pan position should be preserved.

- [ ] **Step 9: Push branch**

```bash
git push -u origin feat/key-art-carousel
```

---

## Self-Review Notes

**Spec coverage check:**
- ✅ `buildBadgeElement` width param — Task 2
- ✅ `downloadKeyArtOverlay` — Task 3
- ✅ `downloadSquareBadge` — Task 3
- ✅ `KeyArtState` type exported from `lib/badge/download.ts` — Task 3
- ✅ `SlideBadgeCard` — Task 4
- ✅ `SlideKeyArt` with upload, drag-to-pan, cover scale, pan constraint, hint, Change button — Task 5
- ✅ `KeyArtCarousel` with dots, arrows, Download All, slide state persistence — Task 6
- ✅ `ShareView` updated — Task 7
- ✅ Slide 1 state preserved across navigation (both slides mounted, toggled with `display`) — Task 6
- ✅ Download All skips Slide 1 silently if no key art — Task 6
- ✅ `pixelRatio: 1` used for overlay/square downloads (containers are at target resolution) — Task 3

**Type consistency:**
- `KeyArtState` defined in `lib/badge/download.ts`, imported in `SlideKeyArt` and `KeyArtCarousel` — consistent
- `onStateChange: (state: KeyArtState | null) => void` in `SlideKeyArt` props, `setKeyArtState` in carousel — consistent
- `downloadKeyArtOverlay(state: KeyArtState, result, gameName)` — matches all call sites
