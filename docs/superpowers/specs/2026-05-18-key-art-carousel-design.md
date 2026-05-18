# Key Art Carousel — Design Spec
**Date:** 2026-05-18
**Status:** Approved

---

## Overview

Replace the "coming soon" placeholder on `/share` with an extensible social asset carousel. Users upload their game's key art, position it within a 1200×630 crop, and download a two-slide social pack: a key art overlay and a standalone square badge card. The carousel shell is designed to accept additional format slides in future without structural changes.

---

## Architecture

```
components/share/
  KeyArtCarousel.tsx       — carousel shell: navigation dots, slide switcher, Download All
  slides/
    SlideKeyArt.tsx        — Slide 1: 1200×630 key art + badge overlay
    SlideBadgeCard.tsx     — Slide 2: 1080×1080 standalone badge on dark background

lib/badge/download.ts      — extend with:
  downloadKeyArtOverlay()
  downloadSquareBadge()
```

`ShareView.tsx` — remove existing `isDownloading` state, `handleDownload`, and "Download badge" button. Replace the placeholder card with `<KeyArtCarousel result={result} gameName={displayName} />`.

`RatingResult.tsx` — unchanged. Its quick "Download badge" button stays as the fast-exit download from the result screen.

---

## Carousel Shell — `KeyArtCarousel.tsx`

Props: `result: CalculationResult`, `gameName?: string`

- Renders two slides, one active at a time
- Navigation: dot indicators (one per slide) + left/right arrow buttons
- Slide 1 dot shows a lock icon (`🔒`) until key art has been uploaded; clicking it while locked scrolls to the upload prompt
- **Download All** button below the carousel: downloads Slide 2 immediately; downloads Slide 1 only if key art has been uploaded (silently skips if not)
- Downloads are sequential with a single `isDownloading` state to disable the button during generation
- Each slide manages its own individual download button internally

---

## Slide 1 — Key Art Overlay — `SlideKeyArt.tsx`

**Output:** 1200×630px PNG

**Props:** `result: CalculationResult`, `gameName?: string`, `onImageReady: (ready: boolean) => void`

### Upload state (no image)
- Dashed upload zone with label "Upload key art (PNG, JPG, WEBP)"
- Privacy note: "Image is processed locally — never uploaded to a server."
- `<input type="file" accept="image/png,image/jpeg,image/webp">` hidden, triggered by clicking the zone
- `FileReader.readAsDataURL()` on selection → stores `imageDataUrl` in state
- Natural image dimensions measured via `new Image()` on load → stored for pan constraint calculations

### Preview state (image loaded)
- "Change image" button in top-right of the section header to clear and re-upload
- Preview container: `600×315px`, `overflow: hidden`, `cursor: grab`
- `<img>` inside, absolutely positioned, tracks `panX` / `panY` state (pixels at preview scale)
- Drag handlers (mousedown/mousemove/mouseup + touch equivalents) update pan offsets
- Pan constrained: `panX` clamped so image always fills the 600px preview width; `panY` clamped so image always fills the 315px preview height. Constraint formula:
  ```
  const scaleRatio = 600 / imgNaturalWidth * (imgNaturalWidth / imgNaturalHeight > 600/315 ? 1 : (315 / imgNaturalHeight));
  const scaledW = imgNaturalWidth * scaleRatio;
  const scaledH = imgNaturalHeight * scaleRatio;
  panX = clamp(panX, -(scaledW - 600), 0);
  panY = clamp(panY, -(scaledH - 315), 0);
  ```
- "Drag to reposition" hint overlay visible on first load, hidden after first drag interaction
- Badge rendered at bottom-left of preview with 16px margin at preview scale (maps to 32px at full res):
  - Uses `<RatingBadge>` component at a custom size class approximating ~200px wide in the preview (maps to ~400px at full res)
  - This is display-only; the download builds the badge via `buildBadgeElement()`
- Individual **Download** button below the preview

### Download — `downloadKeyArtOverlay(imageDataUrl, panX, panY, result, gameName)`
- `scaleRatio = 2` (preview is 600px wide, output is 1200px)
- Builds a `1200×630` container div, fixed to body at `top:0 left:0 z-index:99999`
- `<img>` inside at `position:absolute`, `width: scaledW * 2`, `height: scaledH * 2`, `top: panY * 2`, `left: panX * 2`
- Appends `buildBadgeElement(result, gameName)` at `position:absolute; bottom:32px; left:32px` with `width:400px`
- 2 rAF frames → `toPng(container, { pixelRatio: 1, width: 1200, height: 630 })` → download → remove
- Filename: `gpcs-keyart-<slug>.png` or `gpcs-keyart.png`

Note: `pixelRatio: 1` here (not 2) because the container is already built at the target resolution.

---

## Slide 2 — Badge Card — `SlideBadgeCard.tsx`

**Output:** 1080×1080px PNG

**Props:** `result: CalculationResult`, `gameName?: string`

- Always available — no upload required
- Preview: square container (full available width, `aspect-ratio: 1`), dark background `#0A0A0F`, badge centred
- Uses `<RatingBadge size="lg">` for the preview display
- Individual **Download** button below

### Download — `downloadSquareBadge(result, gameName)`
- Builds a `1080×1080` container, fixed to body
- Dark background `#0A0A0F`
- `buildBadgeElement(result, gameName)` centred via flexbox (`display:flex; align-items:center; justify-content:center`)
- 2 rAF frames → `toPng(container, { pixelRatio: 1, width: 1080, height: 1080 })` → download → remove
- Filename: `gpcs-card-<slug>.png` or `gpcs-card.png`

---

## `buildBadgeElement()` changes

The existing function in `lib/badge/download.ts` needs to accept an optional `width` override so it can be rendered at 400px (key art overlay) as well as its current default for the portrait download. Add a `width?: number` parameter (default `560`), and scale all font sizes and spacing proportionally.

Scale factor for key art context: `400 / 560 ≈ 0.714`

Computed values at 400px:
- Container: `400×357px` (maintaining current aspect ratio)
- Rating font: `96 × 0.714 ≈ 68px`
- Independence font: `36 × 0.714 ≈ 26px`
- Header/meta/footer fonts scale proportionally

---

## ShareView.tsx changes

**Remove:**
- `isDownloading` state
- `handleDownload` function
- "Download badge" button JSX

**Add:**
```tsx
import KeyArtCarousel from "./KeyArtCarousel";
// ...
<KeyArtCarousel result={result} gameName={displayName} />
```

The carousel replaces both the old download button and the placeholder card. Social share links (Twitter/LinkedIn) remain below the carousel unchanged.

---

## File Checklist

**New files:**
- `components/share/KeyArtCarousel.tsx`
- `components/share/slides/SlideKeyArt.tsx`
- `components/share/slides/SlideBadgeCard.tsx`

**Modified files:**
- `lib/badge/download.ts` — add `downloadKeyArtOverlay()`, `downloadSquareBadge()`, extend `buildBadgeElement()` with `width` param
- `components/share/ShareView.tsx` — remove old download, add `<KeyArtCarousel />`

---

## Out of Scope (Future Slides)

- Instagram Stories (1080×1920)
- Twitter/X header (1500×500)
- Press kit ZIP download
- Video/GIF output
