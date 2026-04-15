// ── Capacity Tiers ────────────────────────────────────────────────────────────

export type CapacityTier = "AAA" | "AA" | "A" | "BBB" | "BB" | "B" | "C";
export type TierModifier = "+" | "-" | null;

export interface RatingCode {
  tier: CapacityTier;
  modifier: TierModifier;
  display: string; // e.g. "A+" or "BBB"
}

// ── Independence Markers ─────────────────────────────────────────────────────

export type IndependenceTier = "I0" | "I1" | "I2" | "I3";

// ── Verification ─────────────────────────────────────────────────────────────

export type VerificationLevel = "Unverified" | "Verified" | "Audited";

// ── Form Answer Types ─────────────────────────────────────────────────────────

// Q1: Team size
export type TeamSizeBracket =
  | "1-4"
  | "5-10"
  | "10-15"
  | "15-30"
  | "30-80"
  | "80-200"
  | "200+";

// Q2: Infrastructure level
export type InfrastructureLevel =
  | "individual" // Individual workflows, no shared tools
  | "basic" // Basic shared tools, informal processes
  | "developing" // Small departments forming, some formal process
  | "structured" // Clear departmental structure, formal pipelines
  | "enterprise"; // Multiple departments, proprietary tech, full studios

// Q3: Track record
export type TrackRecordLevel =
  | "none" // No commercial releases
  | "hobbyist" // Hobbyist/jam projects only
  | "one_small" // One small commercial release
  | "multiple_mid" // Multiple mid-scope titles
  | "aaa_titles"; // Multiple AAA titles shipped

// Q4: Financial health
export type FinancialHealthLevel =
  | "self_funded" // Self-funded, limited runway
  | "bootstrapped" // Bootstrapped, sustainable but modest
  | "funded" // External funding secured, stable
  | "established" // Established revenue, strong balance sheet
  | "public_major"; // Publicly traded or major-owned

// Q5: Geographic footprint
export type GeographicFootprint =
  | "home_based" // Home-based or single small office
  | "local_office" // Local office presence
  | "regional" // Regional presence (1–2 countries)
  | "national" // National presence
  | "international"; // International offices/distributed globally

// Q6: Publisher-backed gate
export type PublisherBacked = boolean;

// Q7: Funding commitment
export type FundingCommitment = "full" | "partial" | "none";

// Q8: Publisher financial scale
export type PublisherFinancialScale =
  | "under_10k" // <$10K
  | "10k_50k" // $10K–$50K
  | "50k_250k" // $50K–$250K
  | "250k_1m" // $250K–$1M
  | "1m_5m" // $1M–$5M
  | "5m_30m" // $5M–$30M
  | "over_50m"; // $50M+

// Q9: Market reach
export type MarketReachLevel =
  | "none" // None/self-distribution only
  | "digital_limited" // Digital-only, limited marketing
  | "digital_strong" // Digital-focused, regional retail
  | "strong_digital_retail" // Strong digital + selective retail
  | "global"; // Global distribution + retail

// Q10: Support services
export type ServiceScope = "basic" | "standard" | "extensive";

export interface ServiceEntry {
  id: string;
  label: string;
  checked: boolean;
  scope: ServiceScope;
}

export const ALL_SERVICES: Omit<ServiceEntry, "checked" | "scope">[] = [
  { id: "advisory", label: "Advisory / strategic guidance" },
  { id: "qa", label: "QA / testing" },
  { id: "localisation", label: "Localisation" },
  { id: "marketing", label: "Marketing / PR" },
  { id: "community", label: "Community management" },
  { id: "live_ops", label: "Live ops / post-launch" },
  { id: "full_production", label: "Full production support" },
  { id: "platform_rels", label: "Platform relationships / co-marketing" },
];

// Q11: Publisher portfolio scale
export type PortfolioScale =
  | "1_2" // 1–2 concurrent projects
  | "3_5" // 3–5 concurrent projects
  | "6_10" // 6–10 concurrent projects
  | "over_10"; // 10+ concurrent projects

// Q12: Disclosure status
export type DisclosureStatus = "named" | "confidential" | "self_published";

// Q13: IP ownership
export type IPOwnership =
  | "studio_owns" // Studio retains full IP
  | "co_owned" // Co-owned (studio + publisher)
  | "publisher_owns" // Publisher owns IP
  | "platform_owns"; // Platform/parent company owns IP

// Q14: Creative control matrix
export interface CreativeControlMatrix {
  coreDesign: "studio" | "publisher" | "shared";
  scopeFeatures: "studio" | "publisher" | "shared";
  monetisation: "studio" | "publisher" | "shared";
  releaseTiming: "studio" | "publisher" | "shared";
}

// Q15: Other sources
export type OtherSourceType =
  | "id_xbox"
  | "playstation_partners"
  | "epic_megagrant"
  | "government_grant"
  | "kickstarter_under_100k"
  | "kickstarter_over_100k"
  | "patreon_fig"
  | "tech_partner_deal";

export interface OtherSource {
  type: OtherSourceType;
  label: string;
  checked: boolean;
}

export const ALL_OTHER_SOURCES: Omit<OtherSource, "checked">[] = [
  { type: "id_xbox", label: "ID@Xbox / Xbox Game Pass funding" },
  { type: "playstation_partners", label: "PlayStation Partners / console exclusivity deal" },
  { type: "epic_megagrant", label: "Epic MegaGrants / Unreal partnership" },
  { type: "government_grant", label: "Government / regional grant (Film Victoria, UK Games Fund, CMF, etc.)" },
  { type: "kickstarter_under_100k", label: "Community funding under $100K (Kickstarter, Patreon, Fig)" },
  { type: "kickstarter_over_100k", label: "Community funding over $100K" },
  { type: "patreon_fig", label: "Ongoing crowdfunding / Patreon" },
  { type: "tech_partner_deal", label: "Technology partner deal (Unity, Unreal licensing, middleware)" },
];

// ── Full Form State ───────────────────────────────────────────────────────────

export interface FormAnswers {
  // Studio
  q1_teamSize: TeamSizeBracket | null;
  q2_infrastructure: InfrastructureLevel | null;
  q3_trackRecord: TrackRecordLevel | null;
  q4_financialHealth: FinancialHealthLevel | null;
  q5_geographicFootprint: GeographicFootprint | null;
  // Publisher gate
  q6_publisherBacked: boolean | null;
  // Publisher (conditional on q6 = true)
  q7_fundingCommitment: FundingCommitment | null;
  q8_financialScale: PublisherFinancialScale | null;
  q9_marketReach: MarketReachLevel | null;
  q10_services: ServiceEntry[];
  q11_portfolioScale: PortfolioScale | null;
  q12_disclosureStatus: DisclosureStatus | null;
  // Independence
  q13_ipOwnership: IPOwnership | null;
  q14_creativeControl: CreativeControlMatrix;
  // Other sources
  q15_otherSources: OtherSource[];
}

export const defaultFormAnswers: FormAnswers = {
  q1_teamSize: null,
  q2_infrastructure: null,
  q3_trackRecord: null,
  q4_financialHealth: null,
  q5_geographicFootprint: null,
  q6_publisherBacked: null,
  q7_fundingCommitment: null,
  q8_financialScale: null,
  q9_marketReach: null,
  q10_services: ALL_SERVICES.map((s) => ({ ...s, checked: false, scope: "basic" as ServiceScope })),
  q11_portfolioScale: null,
  q12_disclosureStatus: null,
  q13_ipOwnership: null,
  q14_creativeControl: {
    coreDesign: "studio",
    scopeFeatures: "studio",
    monetisation: "studio",
    releaseTiming: "studio",
  },
  q15_otherSources: ALL_OTHER_SOURCES.map((s) => ({ ...s, checked: false })),
};

// ── Calculation Result ────────────────────────────────────────────────────────

export type SupportIntensity = "light_touch" | "standard" | "full";

export interface ScoreBreakdown {
  studioScore: number;
  studioTier: CapacityTier;
  publisherScore: number;
  publisherTier: CapacityTier | null;
  otherScore: number;
  weights: { studio: number; publisher: number; other: number };
  compositeBeforeConstraints: number;
  supportIntensity: SupportIntensity | null;
  floorApplied: boolean;
  ceilingApplied: boolean;
}

export interface CalculationResult {
  capacityTier: CapacityTier;
  modifier: TierModifier;
  display: string; // e.g. "A+" or "BBB-"
  independence: IndependenceTier;
  compositeScore: number;
  verification: VerificationLevel;
  version: string;
  breakdown: ScoreBreakdown;
}
