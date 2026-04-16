"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RotateCcw, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import type { CalculationResult } from "@/lib/gpcs/types";
import { TIER_HEX, TIER_DESCRIPTIONS } from "@/lib/gpcs/tiers";
import { INDEPENDENCE_LABELS, INDEPENDENCE_DESCRIPTIONS } from "@/lib/gpcs/independence";
import { GPCS_FALLBACK_VERSION } from "@/lib/gpcs/whitepaper";
import RatingBadge from "./RatingBadge";

interface RatingResultProps {
  result: CalculationResult;
  onReset: () => void;
}

function AnimatedScore({ target }: { target: number }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const steps = 60;
    const increment = target / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setCurrent(Math.min(Math.round(increment * step * 10) / 10, target));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{current.toFixed(1)}</span>;
}

function BreakdownRow({
  label,
  score,
  tier,
  weight,
}: {
  label: string;
  score: number;
  tier: string | null;
  weight: number;
}) {
  if (!tier) return null;
  const tierColor = TIER_HEX[tier as keyof typeof TIER_HEX] ?? "#8A9BB0";

  return (
    <div className="flex items-center justify-between py-2 text-sm">
      <span className="text-gpcs-muted">{label}</span>
      <div className="flex items-center gap-3">
        <span className="text-xs text-gpcs-muted">{Math.round(weight * 100)}%</span>
        <span className="w-12 text-right text-gpcs-silver">{score}</span>
        <span
          className="w-10 rounded px-1.5 py-0.5 text-center text-xs font-mono font-semibold"
          style={{ color: tierColor, background: `${tierColor}18` }}
        >
          {tier}
        </span>
      </div>
    </div>
  );
}

export default function RatingResult({ result, onReset }: RatingResultProps) {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const tierColor = TIER_HEX[result.capacityTier];
  const { breakdown } = result;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-2xl"
    >
      {/* Score counter */}
      <div className="mb-8 text-center">
        <p className="mb-1 text-sm uppercase tracking-widest text-gpcs-muted">
          Composite Score
        </p>
        <div className="font-display text-6xl font-bold" style={{ color: tierColor }}>
          <AnimatedScore target={result.compositeScore} />
        </div>
        <p className="mt-1 text-sm text-gpcs-muted">out of 100</p>
      </div>

      {/* Badge */}
      <div className="flex justify-center mb-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4, type: "spring", stiffness: 200 }}
          className="badge-glow"
        >
          <RatingBadge result={result} size="lg" />
        </motion.div>
      </div>

      {/* Tier description */}
      <div
        className="mb-6 rounded-lg p-4 text-sm text-gpcs-silver"
        style={{ background: `${tierColor}12`, borderLeft: `3px solid ${tierColor}60` }}
      >
        <p className="font-semibold mb-1" style={{ color: tierColor }}>
          {result.display} — {TIER_DESCRIPTIONS[result.capacityTier]}
        </p>
        <p className="text-gpcs-muted text-xs mt-1">
          {INDEPENDENCE_LABELS[result.independence]}: {INDEPENDENCE_DESCRIPTIONS[result.independence]}
        </p>
      </div>

      {/* Breakdown toggle */}
      <button
        onClick={() => setShowBreakdown(!showBreakdown)}
        className="mb-3 flex w-full items-center justify-between rounded-lg border border-white/10 px-4 py-3 text-sm text-gpcs-silver hover:border-white/20 transition-colors cursor-pointer"
      >
        <span>Score Breakdown</span>
        {showBreakdown ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {showBreakdown && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mb-6 rounded-lg border border-white/10 bg-gpcs-slate/30 px-4 py-2"
        >
          <BreakdownRow
            label="Studio"
            score={breakdown.studioScore}
            tier={breakdown.studioTier}
            weight={breakdown.weights.studio}
          />
          {breakdown.publisherTier && (
            <BreakdownRow
              label="Publisher / Funder"
              score={breakdown.publisherScore}
              tier={breakdown.publisherTier}
              weight={breakdown.weights.publisher}
            />
          )}
          {breakdown.otherScore > 0 && (
            <BreakdownRow
              label="Other Sources"
              score={breakdown.otherScore}
              tier={null}
              weight={breakdown.weights.other}
            />
          )}
          <div className="mt-2 border-t border-white/10 pt-2 flex justify-between text-xs text-gpcs-muted">
            <span>Composite (pre-constraints)</span>
            <span>{breakdown.compositeBeforeConstraints}</span>
          </div>
          {breakdown.floorApplied && (
            <p className="mt-1 text-xs text-amber-400/80">
              Floor constraint applied: studio tier limits maximum rating.
            </p>
          )}
          {breakdown.ceilingApplied && (
            <p className="mt-1 text-xs text-amber-400/80">
              Ceiling constraint applied: publisher support intensity set minimum rating.
            </p>
          )}
          {breakdown.supportIntensity && (
            <p className="mt-1 text-xs text-gpcs-muted">
              Publisher support intensity:{" "}
              <span className="text-gpcs-silver capitalize">
                {breakdown.supportIntensity.replace("_", " ")}
              </span>
            </p>
          )}
        </motion.div>
      )}

      {/* Next steps */}
      <div className="mb-8 rounded-lg border border-white/10 bg-gpcs-slate/30 p-5">
        <h3 className="mb-4 font-display text-base font-semibold text-gpcs-text">
          This is an Unverified self-assessment
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            {
              level: "Verified",
              desc: "Public evidence checked (LinkedIn, press releases, company registry). Free, takes days.",
              color: "#00E676",
            },
            {
              level: "Audited",
              desc: "Third-party CPA/CA reviews confidential financials, contracts & rosters. High credibility.",
              color: "#00C8FF",
            },
            {
              level: "Pilot Programme",
              desc: `Apply to have your project included in the v${GPCS_FALLBACK_VERSION} testing cohort via Unity Awards.`,
              color: "#FFD700",
            },
          ].map((item) => (
            <div
              key={item.level}
              className="rounded p-3 text-xs"
              style={{ background: `${item.color}12`, border: `1px solid ${item.color}25` }}
            >
              <p
                className="mb-1 font-semibold text-sm"
                style={{ color: item.color }}
              >
                {item.level}
              </p>
              <p className="text-gpcs-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

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
    </motion.div>
  );
}
