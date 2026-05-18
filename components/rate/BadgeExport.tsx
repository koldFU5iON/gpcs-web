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
          position: "fixed",
          top: 0,
          left: "-9999px",
          pointerEvents: "none",
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
            {gameName ? `${gameName} · ` : ""}gpcstandard.org · Unverified self-assessment
          </p>
        </div>
      </div>
    );
  }
);

BadgeExport.displayName = "BadgeExport";
export default BadgeExport;
