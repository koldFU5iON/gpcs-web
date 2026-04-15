import type { CapacityTier, TierModifier, RatingCode } from "./types";

// ── Tier Score Midpoints ──────────────────────────────────────────────────────

export const TIER_SCORES: Record<CapacityTier, number> = {
  AAA: 95,
  AA: 85,
  A: 75,
  BBB: 65,
  BB: 55,
  B: 45,
  C: 25,
};

// ── Tier Score Ranges ─────────────────────────────────────────────────────────

export const TIER_RANGES: Array<{
  tier: CapacityTier;
  min: number;
  max: number;
}> = [
  { tier: "AAA", min: 90, max: 100 },
  { tier: "AA", min: 80, max: 89.99 },
  { tier: "A", min: 70, max: 79.99 },
  { tier: "BBB", min: 60, max: 69.99 },
  { tier: "BB", min: 50, max: 59.99 },
  { tier: "B", min: 40, max: 49.99 },
  { tier: "C", min: 0, max: 39.99 },
];

// ── Tier Order (ascending) ────────────────────────────────────────────────────

export const TIER_ORDER: CapacityTier[] = [
  "C",
  "B",
  "BB",
  "BBB",
  "A",
  "AA",
  "AAA",
];

// ── Score → Tier ──────────────────────────────────────────────────────────────

export function scoresToTier(score: number): CapacityTier {
  for (const range of TIER_RANGES) {
    if (score >= range.min && score <= range.max) return range.tier;
  }
  return "C";
}

// ── Score → Rating Code (with +/- modifier) ───────────────────────────────────

export function scoreToRatingCode(score: number): RatingCode {
  const clampedScore = Math.max(0, Math.min(100, score));
  const range = TIER_RANGES.find(
    (r) => clampedScore >= r.min && clampedScore <= r.max
  );

  if (!range) {
    return { tier: "C", modifier: null, display: "C" };
  }

  const rangeSize = range.max - range.min;
  const position = (clampedScore - range.min) / rangeSize;

  let modifier: TierModifier = null;
  if (position >= 0.75) modifier = "+";
  else if (position <= 0.25) modifier = "-";

  // No +/- for AAA top or C bottom
  if (range.tier === "AAA" && modifier === "+") modifier = null;
  if (range.tier === "C" && modifier === "-") modifier = null;

  const display = modifier ? `${range.tier}${modifier}` : range.tier;

  return { tier: range.tier, modifier, display };
}

// ── Tier Index Helpers ────────────────────────────────────────────────────────

export function tierIndex(tier: CapacityTier): number {
  return TIER_ORDER.indexOf(tier);
}

export function tierAtIndex(index: number): CapacityTier {
  const clamped = Math.max(0, Math.min(TIER_ORDER.length - 1, index));
  return TIER_ORDER[clamped];
}

// ── Tier display labels ───────────────────────────────────────────────────────

export const TIER_LABELS: Record<CapacityTier, string> = {
  AAA: "AAA",
  AA: "AA",
  A: "A",
  BBB: "BBB",
  BB: "BB",
  B: "B",
  C: "C",
};

export const TIER_DESCRIPTIONS: Record<CapacityTier, string> = {
  AAA: "Major studio — 200+ staff, proprietary tech, multiple AAA titles shipped",
  AA: "Established studio — 80–200 staff, full departments, strong track record",
  A: "Experienced studio — 30–80 staff, departmental structure, 1–2 shipped titles",
  BBB: "Emerging studio — 15–30 staff, formal processes, first or early titles",
  BB: "Early-stage studio — 10–15 staff, ad-hoc processes, limited track record",
  B: "Small team — 5–10 staff, minimal formal process, hobby-to-commercial transition",
  C: "Solo / micro team — 1–4 people, no commercial releases, passion project scale",
};

export const TIER_COLORS: Record<CapacityTier, string> = {
  AAA: "tier-aaa",
  AA: "tier-aa",
  A: "tier-a",
  BBB: "tier-bbb",
  BB: "tier-bb",
  B: "tier-b",
  C: "tier-c",
};

export const TIER_HEX: Record<CapacityTier, string> = {
  AAA: "#FFD700",  // bright gold    — legendary
  AA:  "#FF6600",  // vivid orange   — elite
  A:   "#00C8FF",  // electric cyan  — strong
  BBB: "#00E676",  // neon green     — solid
  BB:  "#CF40FF",  // vivid purple   — mid
  B:   "#FF4081",  // vivid pink     — rising
  C:   "#607080",  // muted slate    — entry
};
