# Badge Download & Share Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** After rating a game, users can download a branded PNG badge and share their result via a `/share` page; a game name collected at the start of the form personalises questions and the badge.

**Architecture:** `gameName` is stored in `RatingForm` state (not `FormAnswers`) and passed as a prop downstream. `BadgeExport` is an off-screen, inline-styled copy of the badge that `html-to-image` snapshots to PNG. The `/share` page reads a `sessionStorage` payload written by the result screen — no server round-trip.

**Tech Stack:** Next.js 15 App Router, TypeScript, React, `html-to-image`, Tailwind CSS, Lucide icons, Framer Motion.

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `components/rate/RatingStartModal.tsx` | Add game name input; change `onDismiss` to `(gameName: string) => void` |
| Modify | `components/rate/RatingForm.tsx` | Store `gameName` in state; pass to StudioStep + RatingResult |
| Modify | `components/rate/steps/StudioStep.tsx` | Accept `gameName?` prop; inject into Q1, Q3, Q5 |
| Modify | `components/rate/RatingBadge.tsx` | Accept `gameName?` prop; render in footer |
| Modify | `components/rate/RatingResult.tsx` | Add Download + Share buttons; render off-screen BadgeExport |
| Create | `components/rate/BadgeExport.tsx` | Off-screen badge for PNG export — inline styles only |
| Create | `lib/share/types.ts` | `SharePayload` interface shared by result + share page |
| Create | `lib/badge/download.ts` | `downloadBadge()` using `html-to-image` |
| Create | `components/share/ShareView.tsx` | Share page UI — badge, download, social links, placeholder |
| Create | `app/share/page.tsx` | Route shell — metadata + renders ShareView |

---

## Task 1: Feature branch + install html-to-image

**Files:** none (setup only)

- [ ] **Step 1: Create feature branch**

```bash
git checkout -b feat/badge-download-share
```

- [ ] **Step 2: Install html-to-image**

```bash
npm install html-to-image
```

- [ ] **Step 3: Verify install**

```bash
grep "html-to-image" package.json
```
Expected: `"html-to-image": "^x.x.x"` appears in dependencies.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install html-to-image for badge PNG export"
```

---

## Task 2: Add game name input to RatingStartModal

**Files:**
- Modify: `components/rate/RatingStartModal.tsx`

- [ ] **Step 1: Verify the TypeScript check baseline passes**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 2: Replace the file with the updated version**

Full file content (adds `gameName` state, text input, and updates `onDismiss` signature):

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface RatingStartModalProps {
  onDismiss: (gameName: string) => void;
}

export default function RatingStartModal({ onDismiss }: RatingStartModalProps) {
  const [gameName, setGameName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss(gameName.trim());
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onDismiss, gameName]);

  const handleDismiss = () => onDismiss(gameName.trim());

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) handleDismiss(); }}
    >
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="rating-modal-title"
        className="w-full max-w-md rounded-2xl border border-gpcs-gold/25 bg-gpcs-surface p-8 shadow-2xl"
      >
        {/* Icon */}
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-gpcs-gold/30 bg-gpcs-gold/10">
          <Clock size={20} className="text-gpcs-gold" />
        </div>

        {/* Heading */}
        <h2
          id="rating-modal-title"
          className="font-display text-xl font-bold text-gpcs-text mb-3"
        >
          Rate as of launch day, not today
        </h2>

        {/* Body */}
        <p className="text-sm text-gpcs-silver leading-relaxed mb-5">
          GPCS measures the resources a project had available <em>before</em> it shipped — not
          what the studio looks like now. Every question should be answered as it was true on
          the day the game launched its 1.0 release.
        </p>

        {/* Key points */}
        <ul className="space-y-3 mb-6">
          {[
            {
              label: "Already released?",
              body: "Answer based on team size, track record, and backing at 1.0 launch — ignore commercial results and growth that came after.",
            },
            {
              label: "Not yet released?",
              body: "Answer based on your current situation — that's your launch-day snapshot.",
            },
          ].map(({ label, body }) => (
            <li key={label} className="flex gap-3 text-sm">
              <span className="mt-0.5 text-gpcs-gold shrink-0">→</span>
              <span className="text-gpcs-silver">
                <span className="font-semibold text-gpcs-text">{label} </span>
                {body}
              </span>
            </li>
          ))}
        </ul>

        {/* Game name input */}
        <div className="mb-6">
          <label
            htmlFor="game-name-input"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gpcs-muted"
          >
            Game name <span className="font-normal normal-case tracking-normal">(optional)</span>
          </label>
          <input
            ref={inputRef}
            id="game-name-input"
            type="text"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleDismiss(); }}
            placeholder="e.g. Hollow Knight"
            className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2.5 text-sm text-gpcs-text placeholder:text-gpcs-muted focus:border-gpcs-gold/40 focus:outline-none transition-colors"
          />
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={handleDismiss}
          className="w-full rounded-lg bg-gpcs-gold px-5 py-3 text-sm font-semibold text-gpcs-navy hover:bg-gpcs-gold-light transition-colors cursor-pointer"
        >
          Got it — start rating
        </button>
      </motion.div>
    </motion.div>
  );
}
```

- [ ] **Step 3: Run TypeScript check**

```bash
npx tsc --noEmit
```
Expected: one error — `RatingForm.tsx` still passes `onDismiss` with the old signature. That's correct; fix it in Task 3.

---

## Task 3: Thread gameName through RatingForm

**Files:**
- Modify: `components/rate/RatingForm.tsx`

- [ ] **Step 1: Add `gameName` state and update the modal callback**

Find this block in `RatingForm.tsx`:

```tsx
  const [showModal, setShowModal] = useState(true);
  const [step, setStep] = useState(0);
```

Replace with:

```tsx
  const [showModal, setShowModal] = useState(true);
  const [gameName, setGameName] = useState("");
  const [step, setStep] = useState(0);
```

- [ ] **Step 2: Update the modal render to capture gameName**

Find:
```tsx
    {showModal && <RatingStartModal onDismiss={() => setShowModal(false)} />}
```

Replace with:
```tsx
    {showModal && (
      <RatingStartModal
        onDismiss={(name) => {
          setGameName(name);
          setShowModal(false);
        }}
      />
    )}
```

- [ ] **Step 3: Pass gameName to StudioStep**

Find:
```tsx
          {step === 0 && <StudioStep answers={answers} onChange={updateAnswers} />}
```

Replace with:
```tsx
          {step === 0 && <StudioStep answers={answers} onChange={updateAnswers} gameName={gameName} />}
```

- [ ] **Step 4: Pass gameName to RatingResult**

Find:
```tsx
    return <RatingResult result={result} onReset={reset} />;
```

Replace with:
```tsx
    return <RatingResult result={result} onReset={reset} gameName={gameName} />;
```

- [ ] **Step 5: TypeScript check**

```bash
npx tsc --noEmit
```
Expected: errors on `StudioStep` and `RatingResult` for the new props — those are fixed in Tasks 4 and 8. No errors on `RatingForm` itself.

- [ ] **Step 6: Commit**

```bash
git add components/rate/RatingStartModal.tsx components/rate/RatingForm.tsx
git commit -m "feat(rate): add game name input to start modal, thread through form"
```

---

## Task 4: Personalise StudioStep question labels

**Files:**
- Modify: `components/rate/steps/StudioStep.tsx`

- [ ] **Step 1: Add `gameName` to `StudioStepProps`**

Find:
```tsx
interface StudioStepProps {
  answers: FormAnswers;
  onChange: (updates: Partial<FormAnswers>) => void;
}
```

Replace with:
```tsx
interface StudioStepProps {
  answers: FormAnswers;
  onChange: (updates: Partial<FormAnswers>) => void;
  gameName?: string;
}
```

- [ ] **Step 2: Destructure `gameName` in the component signature**

Find:
```tsx
export default function StudioStep({ answers, onChange }: StudioStepProps) {
```

Replace with:
```tsx
export default function StudioStep({ answers, onChange, gameName }: StudioStepProps) {
  const project = gameName || "your game project";
```

- [ ] **Step 3: Inject game name into Q1, Q3, and Q5**

Find the Q1 `RadioCardGroup`:
```tsx
      <RadioCardGroup
        question="Q1. How large is the team working on this project?"
        hint="For released games: count only people who were on the project at 1.0 release, not today's headcount."
```

Replace with:
```tsx
      <RadioCardGroup
        question={`Q1. How large is the team working on ${project}?`}
        hint="For released games: count only people who were on the project at 1.0 release, not today's headcount."
```

Find the Q3 `RadioCardGroup`:
```tsx
      <RadioCardGroup
        question="Q3. What is the studio's shipping track record?"
        hint="For released games: count only titles shipped before this game's 1.0 release date — not subsequent releases."
```

Replace with:
```tsx
      <RadioCardGroup
        question={`Q3. What is the studio's shipping track record for ${project}?`}
        hint="For released games: count only titles shipped before this game's 1.0 release date — not subsequent releases."
```

Find the Q5 `RadioCardGroup`:
```tsx
      <RadioCardGroup
        question="Q5. What is the studio's geographic footprint?"
        hint="For released games: reflect your office structure as it existed at the time of this game's release."
```

Replace with:
```tsx
      <RadioCardGroup
        question={`Q5. What is the studio's geographic footprint for ${project}?`}
        hint="For released games: reflect your office structure as it existed at the time of this game's release."
```

- [ ] **Step 4: TypeScript check**

```bash
npx tsc --noEmit
```
Expected: StudioStep errors clear. Remaining errors are on `RatingBadge` and `RatingResult` (Tasks 5 and 8).

- [ ] **Step 5: Commit**

```bash
git add components/rate/steps/StudioStep.tsx
git commit -m "feat(rate): personalise Q1/Q3/Q5 labels with game name"
```

---

## Task 5: Update RatingBadge to show game name in footer

**Files:**
- Modify: `components/rate/RatingBadge.tsx`

- [ ] **Step 1: Add `gameName` to `RatingBadgeProps`**

Find:
```tsx
interface RatingBadgeProps {
  result: CalculationResult;
  size?: "sm" | "md" | "lg";
  className?: string;
}
```

Replace with:
```tsx
interface RatingBadgeProps {
  result: CalculationResult;
  size?: "sm" | "md" | "lg";
  className?: string;
  gameName?: string;
}
```

- [ ] **Step 2: Destructure `gameName` and update footer**

Find:
```tsx
export default function RatingBadge({
  result,
  size = "md",
  className,
}: RatingBadgeProps) {
```

Replace with:
```tsx
export default function RatingBadge({
  result,
  size = "md",
  className,
  gameName,
}: RatingBadgeProps) {
```

Find the footer `<p>`:
```tsx
        <p className="text-[10px] text-gpcs-muted text-center uppercase tracking-wider">
          gpcstandard.org &bull; Unverified self-assessment
        </p>
```

Replace with:
```tsx
        <p className="text-[10px] text-gpcs-muted text-center uppercase tracking-wider">
          {gameName ? `${gameName} · ` : ""}gpcstandard.org &bull; Unverified self-assessment
        </p>
```

- [ ] **Step 3: TypeScript check**

```bash
npx tsc --noEmit
```
Expected: RatingBadge errors clear.

- [ ] **Step 4: Commit**

```bash
git add components/rate/RatingBadge.tsx
git commit -m "feat(rate): show game name in rating badge footer"
```

---

## Task 6: Create BadgeExport — off-screen inline-styles component

**Files:**
- Create: `components/rate/BadgeExport.tsx`

This is the DOM node `html-to-image` snapshots. It must use **inline styles only** — no Tailwind — so that `html-to-image` captures all styles without needing to inline the full stylesheet. Dark-mode colours are hardcoded (badge is always dark regardless of site theme).

Colour reference used below:
- Surface: `#131320`
- Muted text: `#55557A`
- Silver text: `#8888AA`
- Body text: `#F0F0FA`
- Tier colour: from `TIER_HEX[result.capacityTier]`

- [ ] **Step 1: Create the file**

```tsx
"use client";

import { forwardRef } from "react";
import type { CalculationResult } from "@/lib/gpcs/types";
import { TIER_HEX } from "@/lib/gpcs/tiers";
import { INDEPENDENCE_LABELS } from "@/lib/gpcs/independence";

interface BadgeExportProps {
  result: CalculationResult;
  gameName?: string;
}

const BadgeExport = forwardRef<HTMLDivElement, BadgeExportProps>(
  ({ result, gameName }, ref) => {
    const tierColor = TIER_HEX[result.capacityTier];
    const independenceLabel = INDEPENDENCE_LABELS[result.independence].replace(/^I\d — /, "");

    return (
      <div
        ref={ref}
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
          width: "560px",
          height: "700px",
          fontFamily: "'Courier New', Courier, monospace",
          background: "#131320",
          border: `1px solid ${tierColor}40`,
          borderRadius: "12px",
          boxShadow: `0 0 60px ${tierColor}18, 0 0 120px ${tierColor}08`,
          padding: "40px",
          boxSizing: "border-box",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top colour strip */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: `linear-gradient(90deg, ${tierColor}60, ${tierColor}CC, ${tierColor}60)`,
            borderRadius: "12px 12px 0 0",
          }}
        />

        {/* Header label */}
        <p
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#55557A",
            marginBottom: "32px",
            marginTop: "8px",
          }}
        >
          GPC Capacity Rating
        </p>

        {/* Main rating + independence */}
        <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "12px" }}>
          <span
            style={{
              fontSize: "120px",
              fontWeight: 900,
              lineHeight: 1,
              color: tierColor,
            }}
          >
            {result.display}
          </span>
          <span style={{ fontSize: "36px", fontWeight: 600, color: "#8888AA" }}>
            / {result.independence}
          </span>
        </div>

        {/* Independence label */}
        <p style={{ fontSize: "14px", color: "#55557A", marginBottom: "32px" }}>
          {independenceLabel}
        </p>

        {/* Divider */}
        <div style={{ borderTop: `1px solid ${tierColor}20`, marginBottom: "24px" }} />

        {/* Meta rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", flex: 1 }}>
          {(
            [
              { label: "Verification", value: result.verification },
              { label: "Version",      value: `v${result.version}` },
              { label: "Score",        value: String(result.compositeScore) },
            ] as const
          ).map(({ label, value }) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
              <span style={{ color: "#55557A" }}>{label}</span>
              <span style={{ color: "#8888AA" }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            borderTop: `1px solid ${tierColor}15`,
            paddingTop: "20px",
            marginTop: "auto",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "11px",
              color: "#55557A",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            {gameName ? `${gameName} · ` : ""}gpcstandard.org · Rate your game
          </p>
        </div>
      </div>
    );
  }
);

BadgeExport.displayName = "BadgeExport";
export default BadgeExport;
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit
```
Expected: no new errors from this file. Remaining errors are in `RatingResult` (Task 8).

- [ ] **Step 3: Commit**

```bash
git add components/rate/BadgeExport.tsx
git commit -m "feat(rate): add off-screen BadgeExport component for PNG generation"
```

---

## Task 7: Create lib/share/types.ts and lib/badge/download.ts

**Files:**
- Create: `lib/share/types.ts`
- Create: `lib/badge/download.ts`

- [ ] **Step 1: Create `lib/share/types.ts`**

```ts
import type { CalculationResult } from "@/lib/gpcs/types";

export interface SharePayload {
  result: CalculationResult;
  gameName: string;
}

export const SHARE_STORAGE_KEY = "gpcs_share_payload";
```

- [ ] **Step 2: Create `lib/badge/download.ts`**

```ts
export async function downloadBadge(element: HTMLElement, gameName?: string): Promise<void> {
  const { toPng } = await import("html-to-image");
  const dataUrl = await toPng(element, { pixelRatio: 2 });

  const slug = gameName
    ? gameName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    : null;
  const filename = slug ? `gpcs-rating-${slug}.png` : "gpcs-rating.png";

  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
}
```

- [ ] **Step 3: TypeScript check**

```bash
npx tsc --noEmit
```
Expected: no errors from the two new files.

- [ ] **Step 4: Commit**

```bash
git add lib/share/types.ts lib/badge/download.ts
git commit -m "feat(badge): add SharePayload type and downloadBadge utility"
```

---

## Task 8: Update RatingResult — Download + Share buttons

**Files:**
- Modify: `components/rate/RatingResult.tsx`

- [ ] **Step 1: Update imports**

Find:
```tsx
import { RotateCcw, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import type { CalculationResult } from "@/lib/gpcs/types";
```

Replace with:
```tsx
import { RotateCcw, Download, Share2, ChevronDown, ChevronUp } from "lucide-react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { CalculationResult } from "@/lib/gpcs/types";
import { downloadBadge } from "@/lib/badge/download";
import { type SharePayload, SHARE_STORAGE_KEY } from "@/lib/share/types";
import BadgeExport from "./BadgeExport";
```

Note: remove the existing `useState` and `useEffect` imports and re-add as part of the combined import:

The final imports block should be:
```tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Download, Share2, ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import type { CalculationResult } from "@/lib/gpcs/types";
import { TIER_HEX, TIER_DESCRIPTIONS } from "@/lib/gpcs/tiers";
import { INDEPENDENCE_LABELS, INDEPENDENCE_DESCRIPTIONS } from "@/lib/gpcs/independence";
import { GPCS_FALLBACK_VERSION } from "@/lib/gpcs/whitepaper";
import { downloadBadge } from "@/lib/badge/download";
import { type SharePayload, SHARE_STORAGE_KEY } from "@/lib/share/types";
import RatingBadge from "./RatingBadge";
import BadgeExport from "./BadgeExport";
```

- [ ] **Step 2: Update `RatingResultProps` to accept `gameName`**

Find:
```tsx
interface RatingResultProps {
  result: CalculationResult;
  onReset: () => void;
}
```

Replace with:
```tsx
interface RatingResultProps {
  result: CalculationResult;
  onReset: () => void;
  gameName?: string;
}
```

- [ ] **Step 3: Add hooks and handlers inside `RatingResult`**

Find:
```tsx
export default function RatingResult({ result, onReset }: RatingResultProps) {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const tierColor = TIER_HEX[result.capacityTier];
```

Replace with:
```tsx
export default function RatingResult({ result, onReset, gameName }: RatingResultProps) {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const badgeRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const tierColor = TIER_HEX[result.capacityTier];

  const handleDownload = async () => {
    if (!badgeRef.current) return;
    setIsDownloading(true);
    try {
      await downloadBadge(badgeRef.current, gameName || undefined);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = () => {
    const payload: SharePayload = { result, gameName: gameName ?? "" };
    sessionStorage.setItem(SHARE_STORAGE_KEY, JSON.stringify(payload));
    router.push("/share");
  };
```

- [ ] **Step 4: Add BadgeExport off-screen node just before the return's opening motion.div**

Find (just before `<motion.div` in the return):
```tsx
  return (
    <motion.div
```

Replace with:
```tsx
  return (
    <>
    <BadgeExport ref={badgeRef} result={result} gameName={gameName || undefined} />
    <motion.div
```

- [ ] **Step 5: Close the fragment and pass gameName to RatingBadge**

Find the existing `<RatingBadge result={result} size="lg" />`:
```tsx
          <RatingBadge result={result} size="lg" />
```

Replace with:
```tsx
          <RatingBadge result={result} size="lg" gameName={gameName || undefined} />
```

- [ ] **Step 6: Replace action buttons**

Find:
```tsx
      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-sm font-medium text-gpcs-silver hover:border-white/30 hover:text-gpcs-text transition-colors cursor-pointer"
        >
          <RotateCcw size={16} />
          Rate another project
        </button>
        <a
          href="/specification"
          className="flex items-center justify-center gap-2 rounded-lg border border-gpcs-gold/30 bg-gpcs-gold/10 px-5 py-3 text-sm font-medium text-gpcs-gold hover:bg-gpcs-gold/20 transition-colors"
        >
          <ExternalLink size={16} />
          Read the full specification
        </a>
      </div>
```

Replace with:
```tsx
      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-sm font-medium text-gpcs-silver hover:border-white/30 hover:text-gpcs-text transition-colors cursor-pointer"
        >
          <RotateCcw size={16} />
          Rate another project
        </button>
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex items-center justify-center gap-2 rounded-lg border border-gpcs-gold/40 bg-gpcs-gold/10 px-5 py-3 text-sm font-semibold text-gpcs-gold hover:bg-gpcs-gold/20 disabled:opacity-50 transition-colors cursor-pointer"
        >
          <Download size={16} />
          {isDownloading ? "Generating…" : "Download badge"}
        </button>
        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 rounded-lg bg-gpcs-gold px-5 py-3 text-sm font-semibold text-gpcs-navy hover:bg-gpcs-gold-light transition-colors cursor-pointer"
        >
          <Share2 size={16} />
          Share
        </button>
      </div>
```

- [ ] **Step 7: Close the fragment at the end of the return**

The return currently ends with:
```tsx
    </motion.div>
  );
```

Replace with:
```tsx
    </motion.div>
    </>
  );
```

- [ ] **Step 8: TypeScript check**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 9: Commit**

```bash
git add components/rate/RatingResult.tsx
git commit -m "feat(rate): add Download and Share buttons to rating result"
```

---

## Task 9: Create ShareView component

**Files:**
- Create: `components/share/ShareView.tsx`

- [ ] **Step 1: Create the directory and file**

```bash
mkdir -p components/share
```

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Download, RotateCcw, Twitter, Linkedin } from "lucide-react";
import type { SharePayload } from "@/lib/share/types";
import { SHARE_STORAGE_KEY } from "@/lib/share/types";
import RatingBadge from "@/components/rate/RatingBadge";
import BadgeExport from "@/components/rate/BadgeExport";
import { downloadBadge } from "@/lib/badge/download";

export default function ShareView() {
  const [payload, setPayload] = useState<SharePayload | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const badgeRef = useRef<HTMLDivElement>(null);

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
    if (!badgeRef.current) return;
    setIsDownloading(true);
    try {
      await downloadBadge(badgeRef.current, displayName);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      {/* Off-screen export node */}
      <BadgeExport ref={badgeRef} result={result} gameName={displayName} />

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
          className="flex items-center justify-center gap-2 rounded-lg border border-gpcs-gold/40 bg-gpcs-gold/10 px-5 py-3 text-sm font-semibold text-gpcs-gold hover:bg-gpcs-gold/20 disabled:opacity-50 transition-colors cursor-pointer"
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
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/share/ShareView.tsx
git commit -m "feat(share): add ShareView component with download + social share"
```

---

## Task 10: Create /share page route

**Files:**
- Create: `app/share/page.tsx`

- [ ] **Step 1: Create the directory and page file**

```bash
mkdir -p app/share
```

```tsx
import type { Metadata } from "next";
import ShareView from "@/components/share/ShareView";

export const metadata: Metadata = {
  title: "Share Your GPCS Rating",
  description: "Download and share your GPCS project capacity rating badge.",
  alternates: { canonical: "https://gpcstandard.org/share" },
  openGraph: {
    url: "https://gpcstandard.org/share",
    title: "Share Your GPCS Rating",
    description: "Download and share your GPCS project capacity rating badge.",
  },
};

export default function SharePage() {
  return <ShareView />;
}
```

- [ ] **Step 2: TypeScript check — full clean pass**

```bash
npx tsc --noEmit
```
Expected: **zero errors**.

- [ ] **Step 3: Commit**

```bash
git add app/share/page.tsx
git commit -m "feat(share): add /share route"
```

---

## Task 11: Smoke test + push

- [ ] **Step 1: Start dev server**

```bash
npm start
```

- [ ] **Step 2: Complete a rating and verify game name personalisation**

Open `http://localhost:8080/rate`. The start modal should show a game name input field. Enter "Test Game". Click "Got it — start rating". Verify Q1 reads *"How large is the team working on Test Game?"*

- [ ] **Step 3: Complete all three steps and verify result screen**

Complete the form. On the result screen verify:
1. Badge footer shows "Test Game · gpcstandard.org · Unverified self-assessment"
2. Three action buttons present: "Rate another project", "Download badge", "Share"

- [ ] **Step 4: Test Download badge**

Click "Download badge". After a brief pause a PNG file named `gpcs-rating-test-game.png` should download. Open it — verify it looks like the badge with correct tier colour and "Test Game" in the footer.

- [ ] **Step 5: Test Share flow**

Click "Share". Browser should navigate to `/share`. Verify:
1. Heading reads "Test Game's GPCS Rating"
2. Badge renders at lg size with game name in footer
3. Download badge button works
4. Twitter/LinkedIn links are present
5. "Key art overlay — coming soon" placeholder is visible
6. "Rate another project" link returns to `/rate`

- [ ] **Step 6: Test empty state**

Navigate directly to `http://localhost:8080/share` in a fresh tab (no sessionStorage). Verify the empty state renders: "No rating found — complete the form to generate your badge."

- [ ] **Step 7: Test without a game name**

Repeat Steps 2–5 without entering a game name. Verify:
- Questions use "your game project" fallback
- Badge footer shows only "gpcstandard.org · Unverified self-assessment"
- Share page heading reads "Your GPCS Rating"
- Downloaded file is named `gpcs-rating.png`

- [ ] **Step 8: Push branch**

```bash
git push -u origin feat/badge-download-share
```

---

## Self-Review Notes

- `SharePayload` is defined once in `lib/share/types.ts` and imported by both `RatingResult` and `ShareView` — no duplication.
- `BadgeExport` uses `forwardRef` — the ref type matches `HTMLDivElement` everywhere it's consumed.
- `downloadBadge` uses a dynamic `import("html-to-image")` so the library is only loaded client-side, on demand.
- The fragment wrapper added in Task 8 (`<>…</>`) matches the fragment wrapper added in the earlier temporal anchor work — nesting is consistent.
- `gameName || undefined` is used consistently when passing to optional props, so empty string never reaches display logic.
- `SHARE_STORAGE_KEY` is exported from `lib/share/types.ts` and used as the single source of truth for the sessionStorage key in both write (RatingResult) and read (ShareView).
