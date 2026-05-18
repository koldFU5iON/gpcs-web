# Badge Download & Share Page — Design Spec
**Date:** 2026-05-18
**Status:** Approved

---

## Overview

After completing a GPCS rating, users can download a branded PNG badge and share their result via a dedicated `/share` page. A game name collected at the start of the survey personalises both the questions and the badge.

---

## Architecture & Data Flow

`gameName` is a plain string stored in `RatingForm` state — it is not part of `FormAnswers` and has no effect on scoring. It enters via `RatingStartModal` and flows as a prop to every downstream component that needs it.

```
RatingStartModal.onDismiss(gameName: string)
  → RatingForm state { gameName }
      → StudioStep            — personalises Q1, Q3, Q5 labels
      → RatingResult          — receives result + gameName
          → BadgeExport       — off-screen div sized for PNG export
          → Download button   — html-to-image toPng() → save file
          → Share button      — sessionStorage → push to /share
```

The `/share` page reads `gpcs_share_payload` from `sessionStorage` on mount. If the key is absent (direct navigation), it renders a prompt directing users to `/rate`. No server round-trip, no URL params, no result storage.

---

## Components

### Modified: `RatingStartModal`
- Add an optional text input labelled **"Game name (optional)"** below the temporal anchor explanation, above the CTA button.
- Change `onDismiss` signature from `() => void` to `(gameName: string) => void`.
- Trimmed empty string is treated as no name provided.

### Modified: `RatingForm`
- Add `gameName: string` to local state (default `""`).
- Update `onDismiss` call to capture the name.
- Pass `gameName` as a prop to `StudioStep` and `RatingResult`.

### Modified: `StudioStep`
- Accept `gameName?: string` prop.
- Inject into Q1, Q3, and Q5 question labels when present:
  - Q1: *"How large is the team working on **[name]**?"*
  - Q3: *"What is **[name]**'s studio shipping track record?"*
  - Q5: *"What is the studio's geographic footprint for **[name]**?"*

### Modified: `RatingBadge`
- Accept optional `gameName?: string` prop.
- When present, render the game name in the footer strip alongside `gpcstandard.org`.

### Modified: `RatingResult`
- Accept `gameName?: string` prop, pass to `RatingBadge` and badge export logic.
- Replace the existing "Read the full specification" secondary action with two new actions:
  - **Download badge** — triggers PNG download via `html-to-image`.
  - **Share** — writes payload to `sessionStorage`, routes to `/share`.
- Keep "Rate another project" button.

### New: `BadgeExport`
- A visually identical copy of `RatingBadge` sized for PNG export (560×700 CSS px, rendered at 2× = 1120×1400px output).
- Rendered off-screen (`position: absolute; left: -9999px`) inside `RatingResult` and passed by ref to the download utility.
- Uses inline styles (not Tailwind classes) so `html-to-image` captures them correctly without needing to inline the full stylesheet.

### New: `lib/badge/download.ts`
- `downloadBadge(element: HTMLElement, gameName?: string): Promise<void>`
- Calls `html-to-image` `toPng(element, { pixelRatio: 2 })`.
- Derives filename from game name: `gpcs-rating-hollow-knight.png` or `gpcs-rating.png`.

### New: `app/share/page.tsx` + `components/share/ShareView.tsx`
The `/share` route is a client component that reads `gpcs_share_payload` from `sessionStorage`.

**Payload shape written to sessionStorage:**
```ts
interface SharePayload {
  result: CalculationResult;
  gameName: string;
}
```

**ShareView layout (top to bottom):**
1. Page heading: *"[Game Name]'s GPCS Rating"* or *"Your GPCS Rating"*
2. Badge displayed at `lg` size (existing `RatingBadge`)
3. **Download badge** button — same `downloadBadge()` utility
4. **Share on Twitter/X** — opens `twitter.com/intent/tweet` with pre-composed text:
   > *"[Game Name] received a GPCS [display] rating — a structured classification of project scale and resource backing. Rate your own game at gpcstandard.org/rate"*
5. **Share on LinkedIn** — opens LinkedIn share shim with `gpcstandard.org/rate` as the URL
6. Placeholder card: *"Key art overlay — coming soon"* (seeds the phase-2 feature visually)
7. **Rate another project** link → `/rate`

**Empty state (no sessionStorage payload):**
Simple centred card: *"No rating found — complete the form to generate your badge."* with a link to `/rate`.

---

## Dependencies

- `html-to-image` — client-side PNG generation from DOM nodes. Install: `npm install html-to-image`.

---

## Out of Scope (Phase 2)

- Key art upload + badge stamp overlay → future `/share` enhancement.
- Shareable result URLs (requires server-side result storage).
- Square (1080×1080) badge variant.
- Embed code / iframe widget.

---

## File Checklist

**New files:**
- `components/rate/BadgeExport.tsx`
- `lib/badge/download.ts`
- `app/share/page.tsx`
- `components/share/ShareView.tsx`

**Modified files:**
- `components/rate/RatingStartModal.tsx`
- `components/rate/RatingForm.tsx`
- `components/rate/steps/StudioStep.tsx`
- `components/rate/RatingBadge.tsx`
- `components/rate/RatingResult.tsx`
