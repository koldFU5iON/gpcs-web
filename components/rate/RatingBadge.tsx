import { cn } from "@/lib/utils";
import type { CalculationResult } from "@/lib/gpcs/types";
import { TIER_HEX } from "@/lib/gpcs/tiers";
import { INDEPENDENCE_LABELS } from "@/lib/gpcs/independence";

interface RatingBadgeProps {
  result: CalculationResult;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function RatingBadge({
  result,
  size = "md",
  className,
}: RatingBadgeProps) {
  const tierColor = TIER_HEX[result.capacityTier];
  const independenceLabel = INDEPENDENCE_LABELS[result.independence];

  const sizeClasses = {
    sm: "p-4 w-56",
    md: "p-6 w-72",
    lg: "p-8 w-80",
  };

  const ratingSize = {
    sm: "text-3xl",
    md: "text-5xl",
    lg: "text-6xl",
  };

  return (
    <div
      className={cn(
        "relative rounded-lg border bg-gpcs-slate/80 font-mono",
        sizeClasses[size],
        className
      )}
      style={{
        borderColor: `${tierColor}40`,
        boxShadow: `0 0 40px ${tierColor}18, 0 0 80px ${tierColor}08`,
      }}
    >
      {/* Header strip */}
      <div
        className="absolute inset-x-0 top-0 h-1 rounded-t-lg"
        style={{ background: `linear-gradient(90deg, ${tierColor}60, ${tierColor}cc, ${tierColor}60)` }}
      />

      {/* Title */}
      <div className="mb-4 pt-1">
        <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-gpcs-muted">
          GPC Capacity Rating
        </p>
      </div>

      {/* Main rating */}
      <div className="mb-3 flex items-baseline gap-3">
        <span
          className={cn("font-display font-bold leading-none", ratingSize[size])}
          style={{ color: tierColor }}
        >
          {result.display}
        </span>
        <span className="text-xl font-semibold text-gpcs-silver">
          / {result.independence}
        </span>
      </div>

      {/* Independence label */}
      <p className="mb-4 text-xs text-gpcs-muted leading-snug">
        {independenceLabel.replace(/^I\d — /, "")}
      </p>

      {/* Divider */}
      <div className="my-3 border-t" style={{ borderColor: `${tierColor}20` }} />

      {/* Meta info */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-gpcs-muted">Verification</span>
          <span className="text-gpcs-silver">{result.verification}</span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-gpcs-muted">Version</span>
          <span className="text-gpcs-silver">v{result.version}</span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-gpcs-muted">Score</span>
          <span className="text-gpcs-silver">{result.compositeScore}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 border-t pt-3" style={{ borderColor: `${tierColor}15` }}>
        <p className="text-[10px] text-gpcs-muted text-center uppercase tracking-wider">
          gpcstandard.org &bull; Unverified self-assessment
        </p>
      </div>
    </div>
  );
}
