import { cn } from "@/lib/utils";
import type { CapacityTier } from "@/lib/gpcs/types";
import { TIER_HEX, TIER_DESCRIPTIONS } from "@/lib/gpcs/tiers";

const TIERS: { tier: CapacityTier; label: string; teamSize: string }[] = [
  { tier: "C", label: "C", teamSize: "1–4" },
  { tier: "B", label: "B", teamSize: "5–10" },
  { tier: "BB", label: "BB", teamSize: "10–15" },
  { tier: "BBB", label: "BBB", teamSize: "15–30" },
  { tier: "A", label: "A", teamSize: "30–80" },
  { tier: "AA", label: "AA", teamSize: "80–200" },
  { tier: "AAA", label: "AAA", teamSize: "200+" },
];

interface RatingScaleVisualProps {
  highlight?: CapacityTier;
  className?: string;
}

export default function RatingScaleVisual({ highlight, className }: RatingScaleVisualProps) {
  return (
    <div className={cn("flex w-full gap-1", className)}>
      {TIERS.map(({ tier, label, teamSize }) => {
        const color = TIER_HEX[tier];
        const isHighlighted = highlight === tier;

        return (
          <div
            key={tier}
            className={cn(
              "group relative flex-1 rounded-md p-3 transition-all duration-300 cursor-default",
              isHighlighted ? "scale-105 shadow-lg" : "hover:scale-105"
            )}
            style={{
              background: isHighlighted
                ? `${color}30`
                : `${color}12`,
              border: `1px solid ${color}${isHighlighted ? "60" : "30"}`,
              boxShadow: isHighlighted ? `0 4px 20px ${color}30` : undefined,
            }}
          >
            {/* Tier label */}
            <p
              className="font-display font-bold leading-none text-center text-sm sm:text-base"
              style={{ color }}
            >
              {label}
            </p>
            {/* Team size */}
            <p className="mt-1 text-center text-xs text-gpcs-muted hidden sm:block">
              {teamSize}
            </p>

            {/* Tooltip on hover */}
            <div
              className="absolute bottom-full left-1/2 z-10 mb-2 hidden w-48 -translate-x-1/2 rounded-md border bg-gpcs-slate p-2.5 text-xs shadow-xl group-hover:block"
              style={{ borderColor: `${color}40` }}
            >
              <p className="font-semibold mb-1" style={{ color }}>
                {label}-Tier
              </p>
              <p className="text-gpcs-muted leading-snug">
                {TIER_DESCRIPTIONS[tier].split("—")[1]?.trim() ?? TIER_DESCRIPTIONS[tier]}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
