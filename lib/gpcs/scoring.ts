import type {
  FormAnswers,
  CalculationResult,
  SupportIntensity,
  ScoreBreakdown,
  CapacityTier,
  TeamSizeBracket,
  InfrastructureLevel,
  TrackRecordLevel,
  FinancialHealthLevel,
  GeographicFootprint,
  PublisherFinancialScale,
  MarketReachLevel,
  PortfolioScale,
  FundingCommitment,
  ServiceEntry,
  OtherSource,
} from "./types";
import {
  TIER_SCORES,
  scoresToTier,
  scoreToRatingCode,
  tierIndex,
  tierAtIndex,
} from "./tiers";
import { computeIndependenceMarker } from "./independence";

// ── Question Answer → Score Maps ─────────────────────────────────────────────

const Q1_MAP: Record<TeamSizeBracket, CapacityTier> = {
  "1-4": "C",
  "5-10": "B",
  "10-15": "BB",
  "15-30": "BBB",
  "30-80": "A",
  "80-200": "AA",
  "200+": "AAA",
};

const Q2_MAP: Record<InfrastructureLevel, CapacityTier> = {
  individual: "C",
  basic: "B",
  developing: "BBB",
  structured: "A",
  enterprise: "AAA",
};

const Q3_MAP: Record<TrackRecordLevel, CapacityTier> = {
  none: "C",
  hobbyist: "B",
  one_small: "BBB",
  multiple_mid: "AA",
  aaa_titles: "AAA",
};

const Q4_MAP: Record<FinancialHealthLevel, CapacityTier> = {
  self_funded: "C",
  bootstrapped: "B",
  funded: "A",
  established: "AA",
  public_major: "AAA",
};

const Q5_MAP: Record<GeographicFootprint, CapacityTier> = {
  home_based: "C",
  local_office: "B",
  regional: "BBB",
  national: "A",
  international: "AAA",
};

const Q8_MAP: Record<PublisherFinancialScale, CapacityTier> = {
  under_10k: "C",
  "10k_50k": "B",
  "50k_250k": "BB",
  "250k_1m": "BBB",
  "1m_5m": "A",
  "5m_30m": "AA",
  over_50m: "AAA",
};

const Q9_MAP: Record<MarketReachLevel, CapacityTier> = {
  none: "C",
  digital_limited: "BB",
  digital_strong: "A",
  strong_digital_retail: "AA",
  global: "AAA",
};

const Q11_MAP: Record<PortfolioScale, CapacityTier> = {
  "1_2": "B",
  "3_5": "BBB",
  "6_10": "A",
  over_10: "AA",
};

const OTHER_SOURCE_TIERS: Record<string, CapacityTier> = {
  id_xbox: "BB",
  playstation_partners: "BBB",
  epic_megagrant: "BBB",
  government_grant: "BBB",
  kickstarter_under_100k: "B",
  kickstarter_over_100k: "BB",
  patreon_fig: "B",
  tech_partner_deal: "B",
};

// ── Studio Score (Q1–Q5) ──────────────────────────────────────────────────────

function computeStudioScore(answers: FormAnswers): number {
  const tiers: CapacityTier[] = [];

  if (answers.q1_teamSize) tiers.push(Q1_MAP[answers.q1_teamSize]);
  if (answers.q2_infrastructure) tiers.push(Q2_MAP[answers.q2_infrastructure]);
  if (answers.q3_trackRecord) tiers.push(Q3_MAP[answers.q3_trackRecord]);
  if (answers.q4_financialHealth) tiers.push(Q4_MAP[answers.q4_financialHealth]);
  if (answers.q5_geographicFootprint) tiers.push(Q5_MAP[answers.q5_geographicFootprint]);

  if (tiers.length === 0) return TIER_SCORES["C"];

  const scores = tiers.map((t) => TIER_SCORES[t]);
  return scores.reduce((a, b) => a + b, 0) / scores.length;
}

// ── Publisher Score (Q8, Q9, Q11) ────────────────────────────────────────────

function computePublisherScore(answers: FormAnswers): number {
  const tiers: CapacityTier[] = [];

  if (answers.q8_financialScale) tiers.push(Q8_MAP[answers.q8_financialScale]);
  if (answers.q9_marketReach) tiers.push(Q9_MAP[answers.q9_marketReach]);
  if (answers.q11_portfolioScale) tiers.push(Q11_MAP[answers.q11_portfolioScale]);

  if (tiers.length === 0) return TIER_SCORES["C"];

  const scores = tiers.map((t) => TIER_SCORES[t]);
  return scores.reduce((a, b) => a + b, 0) / scores.length;
}

// ── Support Intensity (Q7, Q10) ───────────────────────────────────────────────

export function computeSupportIntensity(
  q7: FundingCommitment | null,
  q10: ServiceEntry[]
): SupportIntensity {
  const serviceCount = q10.filter((s) => s.checked).length;
  const hasExtensive = q10.some((s) => s.checked && s.scope === "extensive");

  if (q7 === "full" && serviceCount >= 4 && hasExtensive) return "full";
  if (q7 === "partial" || serviceCount >= 2) return "standard";
  return "light_touch";
}

// ── Other Sources Score (Q15) ─────────────────────────────────────────────────

function computeOtherScore(sources: OtherSource[]): number {
  const active = sources.filter((s) => s.checked);
  if (active.length === 0) return 0;

  const scores = active.map((s) => {
    const tier = OTHER_SOURCE_TIERS[s.type] ?? "B";
    return TIER_SCORES[tier];
  });

  return scores.reduce((a, b) => a + b, 0) / scores.length;
}

// ── Weight Computation ────────────────────────────────────────────────────────

function computeWeights(
  hasPublisher: boolean,
  hasOtherSources: boolean
): { studio: number; publisher: number; other: number } {
  if (!hasPublisher && !hasOtherSources) {
    return { studio: 1.0, publisher: 0, other: 0 };
  }
  if (!hasPublisher) {
    return { studio: 0.8, publisher: 0, other: 0.2 };
  }
  if (!hasOtherSources) {
    return { studio: 0.55, publisher: 0.45, other: 0 };
  }
  return { studio: 0.55, publisher: 0.35, other: 0.1 };
}

// ── Floor Constraint ──────────────────────────────────────────────────────────
// Project cannot exceed studio tier by more than 2 full tiers.

function applyFloorConstraint(
  compositeScore: number,
  studioTier: CapacityTier
): { score: number; applied: boolean } {
  const studioIdx = tierIndex(studioTier);
  const maxAllowedIdx = Math.min(studioIdx + 2, 6); // 6 = AAA index
  const maxAllowedTier = tierAtIndex(maxAllowedIdx);
  const maxAllowedScore = TIER_SCORES[maxAllowedTier];

  if (compositeScore > maxAllowedScore) {
    return { score: maxAllowedScore, applied: true };
  }
  return { score: compositeScore, applied: false };
}

// ── Ceiling Constraint ────────────────────────────────────────────────────────
// Project cannot fall too far below publisher tier.

function applyCeilingConstraint(
  compositeScore: number,
  publisherTier: CapacityTier,
  intensity: SupportIntensity
): { score: number; applied: boolean } {
  if (intensity === "light_touch") {
    return { score: compositeScore, applied: false };
  }

  const reduction = intensity === "full" ? 1 : 2;
  const publisherIdx = tierIndex(publisherTier);
  const minAllowedIdx = Math.max(publisherIdx - reduction, 0);
  const minAllowedTier = tierAtIndex(minAllowedIdx);
  const minAllowedScore = TIER_SCORES[minAllowedTier];

  if (compositeScore < minAllowedScore) {
    return { score: minAllowedScore, applied: true };
  }
  return { score: compositeScore, applied: false };
}

// ── Master Rating Calculator ──────────────────────────────────────────────────

export function calculateRating(answers: FormAnswers): CalculationResult {
  const studioScore = computeStudioScore(answers);
  const studioTier = scoresToTier(studioScore);

  const hasPublisher = answers.q6_publisherBacked === true;
  const publisherScore = hasPublisher ? computePublisherScore(answers) : 0;
  const publisherTier = hasPublisher ? scoresToTier(publisherScore) : null;
  const supportIntensity = hasPublisher
    ? computeSupportIntensity(answers.q7_fundingCommitment, answers.q10_services)
    : null;

  const otherScore = computeOtherScore(answers.q15_otherSources);
  const hasOtherSources = otherScore > 0;

  const weights = computeWeights(hasPublisher, hasOtherSources);

  let composite =
    studioScore * weights.studio +
    publisherScore * weights.publisher +
    otherScore * weights.other;

  const compositeBeforeConstraints = composite;

  // Apply floor constraint
  const floorResult = applyFloorConstraint(composite, studioTier);
  composite = floorResult.score;

  // Apply ceiling constraint
  let ceilingApplied = false;
  if (publisherTier && supportIntensity) {
    const ceilingResult = applyCeilingConstraint(
      composite,
      publisherTier,
      supportIntensity
    );
    composite = ceilingResult.score;
    ceilingApplied = ceilingResult.applied;
  }

  const roundedComposite = Math.round(composite * 10) / 10;
  const ratingCode = scoreToRatingCode(roundedComposite);

  const independence = computeIndependenceMarker(
    answers.q13_ipOwnership,
    answers.q14_creativeControl,
    hasPublisher
  );

  const breakdown: ScoreBreakdown = {
    studioScore: Math.round(studioScore * 10) / 10,
    studioTier,
    publisherScore: Math.round(publisherScore * 10) / 10,
    publisherTier,
    otherScore: Math.round(otherScore * 10) / 10,
    weights,
    compositeBeforeConstraints: Math.round(compositeBeforeConstraints * 10) / 10,
    supportIntensity,
    floorApplied: floorResult.applied,
    ceilingApplied,
  };

  return {
    capacityTier: ratingCode.tier,
    modifier: ratingCode.modifier,
    display: ratingCode.display,
    independence,
    compositeScore: roundedComposite,
    verification: "Unverified",
    version: "0.5",
    breakdown,
  };
}
