"use client";

import { useRef, useState } from "react";
import { downloadBadge } from "@/lib/badge/download";
import type { CalculationResult } from "@/lib/gpcs/types";

// Hardcoded mock result — no form needed
const MOCK_RESULT: CalculationResult = {
  capacityTier: "A",
  modifier: null,
  display: "A",
  independence: "I1",
  compositeScore: 75,
  verification: "Unverified",
  version: "0.5.0",
  breakdown: {
    studioScore: 75,
    studioTier: "A",
    publisherScore: 0,
    publisherTier: null,
    otherScore: 0,
    weights: { studio: 1, publisher: 0, other: 0 },
    compositeBeforeConstraints: 75,
    supportIntensity: null,
    floorApplied: false,
    ceilingApplied: false,
  },
};

const MOCK_GAME = "Debug Game";

export default function BadgeTestPage() {
  const captureRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<string>("");
  const [isDownloading, setIsDownloading] = useState(false);

  const tierColor = "#00C8FF";

  const handleDownload = async () => {
    setStatus("⏳ Capturing…");
    setIsDownloading(true);
    try {
      await downloadBadge(MOCK_RESULT, MOCK_GAME);
      setStatus("✅ Download triggered — check your downloads folder");
    } catch (e) {
      setStatus(`❌ Error: ${String(e)}`);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif", background: "#0a0a1a", minHeight: "100vh" }}>
      <h1 style={{ color: "#F0F0FA", marginBottom: "8px" }}>Badge Export — Debug Page</h1>
      <p style={{ color: "#55557A", marginBottom: "32px", fontSize: "14px" }}>
        This page renders the export element visibly so you can confirm it paints before worrying about capture.
      </p>

      {/* The badge rendered VISIBLY for debugging */}
      <div style={{ marginBottom: "32px" }}>
        <p style={{ color: "#55557A", fontSize: "12px", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          Export element (visible for debug):
        </p>
        <div
          ref={captureRef}
          style={{
            width: "560px",
            height: "500px",
            fontFamily: "'Courier New', Courier, monospace",
            background: "#131320",
            border: `1px solid ${tierColor}40`,
            borderRadius: "12px",
            boxShadow: `0 0 60px ${tierColor}18`,
            padding: "40px",
            boxSizing: "border-box",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          {/* Top colour strip */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "4px",
            background: `linear-gradient(90deg, ${tierColor}60, ${tierColor}CC, ${tierColor}60)`,
            borderRadius: "12px 12px 0 0",
          }} />
          <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#55557A", marginBottom: "32px", marginTop: "8px" }}>
            GPC Capacity Rating
          </p>
          <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "12px" }}>
            <span style={{ fontSize: "120px", fontWeight: 900, lineHeight: 1, color: tierColor }}>A</span>
            <span style={{ fontSize: "36px", fontWeight: 600, color: "#8888AA" }}>/ I1</span>
          </div>
          <p style={{ fontSize: "14px", color: "#55557A", marginBottom: "32px" }}>Partial Independence</p>
          <div style={{ borderTop: `1px solid ${tierColor}20`, marginBottom: "24px" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", flex: 1 }}>
            {[
              { label: "Verification", value: "Unverified" },
              { label: "Version", value: "v0.5.0" },
              { label: "Score", value: "75" },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                <span style={{ color: "#55557A" }}>{label}</span>
                <span style={{ color: "#8888AA" }}>{value}</span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${tierColor}15`, paddingTop: "20px", marginTop: "auto", textAlign: "center" }}>
            <p style={{ fontSize: "11px", color: "#55557A", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              {MOCK_GAME} · gpcstandard.org · Unverified self-assessment
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={handleDownload}
        disabled={isDownloading}
        style={{
          background: "#00C8FF", border: "none", borderRadius: "8px",
          padding: "12px 24px", fontSize: "14px", fontWeight: 700,
          color: "#0a0a1a", cursor: "pointer", marginBottom: "16px",
          display: "block",
        }}
      >
        {isDownloading ? "Capturing…" : "Download badge PNG"}
      </button>

      {status && (
        <p style={{ color: "#F0F0FA", fontSize: "14px", fontFamily: "monospace" }}>{status}</p>
      )}

      <p style={{ color: "#55557A", fontSize: "12px", marginTop: "32px" }}>
        If the element above renders correctly but the download is blank, the issue is in capture.
        If the element above is blank, the issue is in rendering.
      </p>
    </div>
  );
}
